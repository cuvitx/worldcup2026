#!/usr/bin/env bash
set -euo pipefail

# === Configuration ===
REPO_DIR="/srv/cdm2026/repo"
RELEASES_DIR="/srv/cdm2026/releases"
CURRENT_LINK="/srv/cdm2026/current"
KEEP_RELEASES=3
SERVICE_FR="cdm2026"
SERVICE_DE="wm2026-de"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
RELEASE_DIR="${RELEASES_DIR}/${TIMESTAMP}"
LOG_FILE="/srv/cdm2026/deploy.log"

# Which apps to build/deploy (override with: APPS="fr" ./deploy.sh)
APPS="${APPS:-fr de}"

# === Logging ===
exec > >(tee -a "$LOG_FILE") 2>&1
echo "============================================"
echo "Deploy started at $(date -u)"
echo "Release: ${TIMESTAMP}"
echo "============================================"

# === Step 1: Update repo ===
echo "[1/7] Fetching latest code..."
cd "$REPO_DIR"
git fetch origin main
git reset --hard origin/main
COMMIT=$(git rev-parse --short HEAD)
echo "Commit: ${COMMIT}"

# === Step 1b: Auto-provision DE infrastructure (if needed) ===
if echo "$APPS" | grep -q "de"; then
  SCRIPT_DIR="${REPO_DIR}/scripts/vps"

  # Install systemd service for DE if not present
  if [ ! -f /etc/systemd/system/wm2026-de.service ]; then
    echo "  [PROVISION] Installing wm2026-de.service..."
    cp "${SCRIPT_DIR}/wm2026-de.service" /etc/systemd/system/
    systemctl daemon-reload
    systemctl enable wm2026-de
    echo "  [PROVISION] wm2026-de.service installed and enabled."
  fi

  # Install nginx config for DE if not present
  if [ ! -f /etc/nginx/sites-available/wm2026-de ]; then
    echo "  [PROVISION] Installing nginx config for wm2026guide.de..."
    cp "${SCRIPT_DIR}/wm2026-de.nginx" /etc/nginx/sites-available/wm2026-de
    ln -sf /etc/nginx/sites-available/wm2026-de /etc/nginx/sites-enabled/
    if nginx -t 2>/dev/null; then
      systemctl reload nginx
      echo "  [PROVISION] nginx config installed and reloaded."
    else
      echo "  [PROVISION] WARNING: nginx config test failed — check manually."
      rm -f /etc/nginx/sites-available/wm2026-de /etc/nginx/sites-enabled/wm2026-de
    fi
  fi

  # Attempt SSL certificate if not yet provisioned
  if [ -f /etc/nginx/sites-available/wm2026-de ] && ! grep -q "ssl_certificate" /etc/nginx/sites-available/wm2026-de 2>/dev/null; then
    if command -v certbot &>/dev/null; then
      echo "  [PROVISION] Requesting SSL certificate for wm2026guide.de..."
      certbot --nginx -d wm2026guide.de -d www.wm2026guide.de --non-interactive --agree-tos --redirect 2>&1 || echo "  [PROVISION] SSL failed (DNS may not have propagated yet) — will retry next deploy."
    fi
  fi
fi

# === Step 2: Install dependencies ===
echo "[2/7] Installing dependencies..."
set -a; source /etc/cdm2026.env 2>/dev/null || true; set +a
npm ci

# === Step 3: Build ===
# Clear rate limiter BEFORE build so completed-match API calls aren't blocked
rm -f "${REPO_DIR}/.data/rate-limits.json" 2>/dev/null || true
for APP in $APPS; do
  echo "[3/8] Building apps/${APP}..."
  npm run build --workspace=apps/${APP}
done

# === Step 4: Create release ===
echo "[4/8] Creating release ${TIMESTAMP}..."
mkdir -p "$RELEASE_DIR"

# Exclude unused apps and build-time rate limit state (must not leak into runtime)
RSYNC_EXCLUDES="--exclude=.git --exclude=.turbo --exclude=apps/en --exclude=apps/es --exclude=.data"
rsync -a $RSYNC_EXCLUDES "$REPO_DIR/" "$RELEASE_DIR/"

# Reset rate limit counters so runtime starts fresh (build exhausts the quota)
rm -f "${RELEASE_DIR}/.data/rate-limits.json" 2>/dev/null || true
for APP in $APPS; do
  rm -f "${RELEASE_DIR}/apps/${APP}/.data/rate-limits.json" 2>/dev/null || true
done

# Preserve old static files from previous release (NOT ISR cache — fresh render)
for APP in $APPS; do
  # ISR cache: only copy fetch-cache (API responses), NOT page renders
  # This forces pages to re-render with fresh data while keeping API caches warm
  PREV_FETCH_CACHE="${CURRENT_LINK}/apps/${APP}/.next/cache/fetch-cache"
  NEW_FETCH_CACHE="${RELEASE_DIR}/apps/${APP}/.next/cache/fetch-cache"
  if [ -d "$PREV_FETCH_CACHE" ]; then
    echo "  Copying fetch-cache for ${APP}..."
    mkdir -p "$(dirname "$NEW_FETCH_CACHE")"
    cp -a "$PREV_FETCH_CACHE" "$NEW_FETCH_CACHE" 2>/dev/null || true
  fi

  # Copy old build's static files into new release (zero-downtime critical!)
  # This ensures cached HTML referencing old build hashes can still load CSS/JS
  PREV_STATIC="${CURRENT_LINK}/apps/${APP}/.next/static"
  NEW_STATIC="${RELEASE_DIR}/apps/${APP}/.next/static"
  if [ -d "$PREV_STATIC" ] && [ -d "$NEW_STATIC" ]; then
    echo "  Preserving old static files for ${APP} (zero-downtime)..."
    # Copy only directories that don't exist in new build (old build hashes)
    for dir in "$PREV_STATIC"/*/; do
      dirname=$(basename "$dir")
      if [ ! -d "${NEW_STATIC}/${dirname}" ]; then
        cp -a "$dir" "${NEW_STATIC}/${dirname}" 2>/dev/null || true
      fi
    done
    # Also copy top-level files (chunks, css, media) that might differ
    cp -rn "$PREV_STATIC"/* "$NEW_STATIC"/ 2>/dev/null || true
  fi
done

# Fix ownership so the deploy user can write ISR cache
chown -R deploy:deploy "$RELEASE_DIR"

# === Step 5: Swap symlink (atomic) ===
echo "[5/8] Swapping symlink..."
ln -sfn "$RELEASE_DIR" "${CURRENT_LINK}"

# === Step 6: Graceful restart services (zero-downtime) ===
echo "[6/8] Restarting services (graceful)..."
SERVICES_TO_RESTART="$SERVICE_FR"
HEALTH_PORTS="$SERVICE_FR:3000"
if echo "$APPS" | grep -q "de"; then
  SERVICES_TO_RESTART="$SERVICE_FR $SERVICE_DE"
  HEALTH_PORTS="$SERVICE_FR:3000 $SERVICE_DE:3002"
fi

# Install nginx cache config if not present (enables stale-while-revalidate)
CACHE_CONF="${REPO_DIR}/scripts/vps/nginx-cache.conf"
if [ -f "$CACHE_CONF" ] && [ ! -f /etc/nginx/conf.d/nginx-cache.conf ]; then
  echo "  Installing nginx proxy cache config..."
  sudo cp "$CACHE_CONF" /etc/nginx/conf.d/nginx-cache.conf
  sudo mkdir -p /var/cache/nginx/cdm2026-fr /var/cache/nginx/wm2026-de
  sudo chown www-data:www-data /var/cache/nginx/cdm2026-fr /var/cache/nginx/wm2026-de
fi

# --- FR nginx: ensure static files served from disk + proxy_cache ---
FR_NGINX=""
for candidate in /etc/nginx/sites-available/cdm2026 /etc/nginx/sites-available/cdm2026.fr /etc/nginx/sites-available/cdm2026-fr /etc/nginx/sites-available/www.cdm2026.fr; do
  if [ -f "$candidate" ]; then
    FR_NGINX="$candidate"
    break
  fi
done
if [ -z "$FR_NGINX" ]; then
  FR_NGINX=$(sudo grep -rl "proxy_pass.*127.0.0.1:3000" /etc/nginx/sites-available/ 2>/dev/null | head -1)
fi

if [ -n "$FR_NGINX" ] && [ -f "$FR_NGINX" ]; then
  echo "  [FR] nginx config: $FR_NGINX"
  NEEDS_PATCH=false

  # Check if static files are served from disk (key for zero-downtime)
  if ! sudo grep -q "alias.*/\.next/static" "$FR_NGINX" 2>/dev/null; then
    echo "  [FR] Static files NOT served from disk — patching..."
    NEEDS_PATCH=true
  fi

  # Check if proxy_cache is configured
  if ! sudo grep -q "proxy_cache" "$FR_NGINX" 2>/dev/null; then
    echo "  [FR] proxy_cache NOT configured — patching..."
    NEEDS_PATCH=true
  fi

  if [ "$NEEDS_PATCH" = true ]; then
    sudo cp "$FR_NGINX" "${FR_NGINX}.bak"
    sudo python3 -c "
import sys, re

with open('$FR_NGINX') as f:
    content = f.read()

changed = False

# 1. Add proxy_cache after proxy_pass :3000 (if not present)
if 'proxy_cache' not in content:
    marker = 'proxy_pass http://127.0.0.1:3000;'
    cache_block = '''
        # Zero-downtime: serve stale pages while Next.js restarts
        proxy_cache cdm2026fr;
        proxy_cache_valid 200 10m;
        proxy_cache_valid 404 1m;
        proxy_cache_use_stale error timeout updating http_500 http_502 http_503 http_504;
        proxy_cache_background_update on;
        proxy_cache_lock on;
        proxy_cache_revalidate on;
        add_header X-Cache-Status \\\$upstream_cache_status;
        proxy_cache_bypass \\\$http_authorization;
        proxy_no_cache \\\$http_authorization;
'''
    if marker in content:
        content = content.replace(marker, marker + cache_block, 1)
        print('  [FR] Inserted proxy_cache directives')
        changed = True
    else:
        print('  [FR] WARNING: proxy_pass :3000 marker not found')

# 2. Replace proxy-based /_next/static/ with disk alias (if present)
if 'alias' not in content or '.next/static' not in content:
    static_block = '''
    # Static assets — served directly from disk (survives Node.js restarts)
    location /_next/static/ {
        alias /srv/cdm2026/current/apps/fr/.next/static/;
        expires 365d;
        access_log off;
        add_header Cache-Control \"public, max-age=31536000, immutable\";
    }
'''
    # Remove existing /_next/static/ proxy block if present
    content = re.sub(
        r'\\n\\s*location /_next/static/\\s*\\{[^}]*proxy_pass[^}]*\\}',
        '',
        content
    )

    # Insert static block before the last closing brace of the main server block
    # Find the last server block's closing brace
    last_brace = content.rfind('}')
    if last_brace > 0:
        # Find second-to-last closing brace (end of location blocks, before server close)
        second_last = content.rfind('}', 0, last_brace)
        if second_last > 0:
            insert_pos = second_last + 1
            content = content[:insert_pos] + static_block + content[insert_pos:]
            print('  [FR] Added /_next/static/ alias block')
            changed = True

if changed:
    with open('$FR_NGINX', 'w') as f:
        f.write(content)
    print('  [FR] Config updated successfully')
else:
    print('  [FR] No changes needed')
"
    if ! sudo nginx -t 2>/dev/null; then
      echo "  [FR] WARNING: nginx test failed after patch — rolling back"
      sudo cp "${FR_NGINX}.bak" "$FR_NGINX"
    else
      echo "  [FR] nginx config patched successfully"
    fi
  else
    echo "  [FR] nginx already configured for zero-downtime"
  fi
else
  echo "  [FR] WARNING: could not find FR nginx config!"
fi

# --- DE nginx: always sync latest config (includes disk-served static files) ---
NGINX_DE="${REPO_DIR}/scripts/vps/wm2026-de.nginx"
if [ -f "$NGINX_DE" ] && [ -f /etc/nginx/sites-available/wm2026-de ]; then
  # Check if DE config serves static from disk (the key zero-downtime feature)
  if sudo grep -q "alias.*/\.next/static" /etc/nginx/sites-available/wm2026-de 2>/dev/null; then
    echo "  [DE] nginx already serves static from disk"
  else
    echo "  [DE] Updating nginx config (static files from disk)..."
    sudo cp /etc/nginx/sites-available/wm2026-de /etc/nginx/sites-available/wm2026-de.bak
    sudo cp "$NGINX_DE" /etc/nginx/sites-available/wm2026-de
    if command -v certbot &>/dev/null; then
      sudo certbot --nginx -d wm2026guide.de -d www.wm2026guide.de --non-interactive --agree-tos --redirect 2>/dev/null || true
    fi
    if ! sudo nginx -t 2>/dev/null; then
      echo "  [DE] WARNING: nginx test failed — rolling back"
      sudo cp /etc/nginx/sites-available/wm2026-de.bak /etc/nginx/sites-available/wm2026-de
    else
      echo "  [DE] nginx config updated"
    fi
  fi
fi

# Reload nginx (graceful — zero downtime)
if sudo nginx -t 2>/dev/null; then
  sudo systemctl reload nginx
  echo "  nginx reloaded."
fi

# Restart each service one at a time with health check
for SVC in $SERVICES_TO_RESTART; do
  if systemctl list-unit-files "${SVC}.service" &>/dev/null; then
    sudo systemctl restart "$SVC"
    echo "  Restarted ${SVC}, waiting for health..."
  else
    echo "  Skipping ${SVC} (service not installed yet)"
    continue
  fi

  # Wait for health (up to 15s)
  PORT=""
  for hp in $HEALTH_PORTS; do
    if [ "${hp%%:*}" = "$SVC" ]; then
      PORT="${hp##*:}"
      break
    fi
  done
  if [ -n "$PORT" ]; then
    for i in $(seq 1 15); do
      if curl -sf -o /dev/null --max-time 2 "http://127.0.0.1:${PORT}/" 2>/dev/null; then
        echo "  ${SVC} healthy after ${i}s."
        break
      fi
      sleep 1
    done
  fi
done

sleep 2
FAILED=0
for SVC in $SERVICES_TO_RESTART; do
  if systemctl list-unit-files "${SVC}.service" &>/dev/null; then
    if systemctl is-active --quiet "$SVC"; then
      echo "  ${SVC} is running."
    else
      echo "  ERROR: ${SVC} failed to start!"
      FAILED=1
    fi
  fi
done

# Purge nginx cache after successful deploy so new content is served
if [ "$FAILED" -eq 0 ]; then
  sudo rm -rf /var/cache/nginx/cdm2026-fr/* /var/cache/nginx/wm2026-de/* 2>/dev/null || true
  echo "  nginx cache purged (new content will be cached on next request)."
fi

if [ "$FAILED" -eq 1 ]; then
  echo "Rolling back..."
  PREV=$(ls -1d ${RELEASES_DIR}/*/ 2>/dev/null | sort | tail -2 | head -1)
  if [ -n "$PREV" ]; then
    ln -sfn "${PREV%/}" "${CURRENT_LINK}"
    for SVC in $SERVICES_TO_RESTART; do
      systemctl list-unit-files "${SVC}.service" &>/dev/null && sudo systemctl restart "$SVC"
    done
    echo "Rolled back to ${PREV}"
  fi
  exit 1
fi

# === Step 7: Minimal cache warm-up (API-friendly) ===
echo "[7/8] Warming cache (minimal — preserving API quota)..."
source /etc/cdm2026.env 2>/dev/null || true

# --- FR warm-up ---
FR_URL="http://127.0.0.1:3000"
echo "  [FR] Warming key pages..."
for p in "/" "/match/calendrier" "/match/aujourdhui" "/groupes" "/resultats"; do
  curl -s -o /dev/null --max-time 10 "${FR_URL}${p}"
done

# Warm today's match pages only (completed matches already have data from build)
MATCHES_FILE="${CURRENT_LINK}/packages/data/src/matches.ts"
TODAY=$(date +%Y-%m-%d)
TODAY_SLUGS=""
if [ -f "$MATCHES_FILE" ]; then
  TODAY_SLUGS=$(grep -B5 "date: \"${TODAY}" "$MATCHES_FILE" | grep -o 'slug: "[^"]*"' | sed 's/slug: "//;s/"//g' || true)
fi

if [ -n "$TODAY_SLUGS" ]; then
  echo "  Warming today's match pages..."
  for s in $TODAY_SLUGS; do
    curl -s -o /dev/null --max-time 10 "${FR_URL}/match/${s}" || true
    if echo "$APPS" | grep -q "de"; then
      curl -s -o /dev/null --max-time 10 "http://127.0.0.1:3002/spiel/${s}" 2>/dev/null || true
    fi
  done
  echo "  Warmed $(echo "$TODAY_SLUGS" | wc -w | tr -d ' ') match pages."
fi

# DE static pages warm-up
if echo "$APPS" | grep -q "de"; then
  DE_URL="http://127.0.0.1:3002"
  echo "  [DE] Warming key pages..."
  for p in "/" "/spiel/spielplan" "/spiel/heute" "/gruppen" "/ergebnisse"; do
    curl -s -o /dev/null --max-time 10 "${DE_URL}${p}" 2>/dev/null || true
  done
fi

echo "  Cache warming complete."

# === Step 8: Cleanup — keep only last N releases ===
echo "[8/8] Pruning old releases (keeping ${KEEP_RELEASES})..."
cd "$RELEASES_DIR"
ls -1d */ | sort | head -n -${KEEP_RELEASES} | while read -r dir; do
  echo "  Removing ${dir}..."
  rm -rf "${dir}"
done

echo "============================================"
echo "Deploy completed at $(date -u)"
echo "Commit: ${COMMIT}"
echo "Release: ${TIMESTAMP}"
echo "============================================"
