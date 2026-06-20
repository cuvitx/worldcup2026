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
for APP in $APPS; do
  echo "[3/8] Building apps/${APP}..."
  npm run build --workspace=apps/${APP}
done

# === Step 4: Create release ===
echo "[4/8] Creating release ${TIMESTAMP}..."
mkdir -p "$RELEASE_DIR"

# Only exclude unused apps
RSYNC_EXCLUDES="--exclude=.git --exclude=.turbo --exclude=apps/en --exclude=apps/es"
rsync -a $RSYNC_EXCLUDES "$REPO_DIR/" "$RELEASE_DIR/"

# Preserve ISR cache from previous release for each app
for APP in $APPS; do
  PREV_CACHE="${CURRENT_LINK}/apps/${APP}/.next/cache"
  NEW_CACHE="${RELEASE_DIR}/apps/${APP}/.next/cache"
  if [ -d "$PREV_CACHE" ]; then
    echo "  Copying ISR cache for ${APP}..."
    cp -a "$PREV_CACHE" "$NEW_CACHE" 2>/dev/null || true
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

# Update nginx site configs (always sync latest)
NGINX_DE="${REPO_DIR}/scripts/vps/wm2026-de.nginx"
if [ -f "$NGINX_DE" ] && [ -f /etc/nginx/sites-available/wm2026-de ]; then
  # Only update if SSL is already configured (don't overwrite certbot changes)
  if grep -q "proxy_cache" /etc/nginx/sites-available/wm2026-de 2>/dev/null; then
    echo "  nginx DE config already has proxy_cache."
  else
    echo "  Updating nginx DE config with proxy_cache..."
    # Merge: keep SSL lines from current config, add cache directives
    sudo cp "$NGINX_DE" /etc/nginx/sites-available/wm2026-de.new
    if sudo nginx -t -c /dev/stdin <<< "events {} http { include /etc/nginx/conf.d/*.conf; include /etc/nginx/sites-available/wm2026-de.new; }" 2>/dev/null; then
      sudo cp /etc/nginx/sites-available/wm2026-de /etc/nginx/sites-available/wm2026-de.bak
      # Re-run certbot to apply SSL to new config
      sudo cp "$NGINX_DE" /etc/nginx/sites-available/wm2026-de
      if command -v certbot &>/dev/null; then
        sudo certbot --nginx -d wm2026guide.de -d www.wm2026guide.de --non-interactive --agree-tos --redirect 2>/dev/null || true
      fi
    fi
    sudo rm -f /etc/nginx/sites-available/wm2026-de.new
  fi
fi

# Reload nginx to pick up cache config (graceful — no downtime)
if sudo nginx -t 2>/dev/null; then
  sudo systemctl reload nginx
  echo "  nginx reloaded (proxy_cache active)."
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

# Warm today/yesterday match pages (FR)
MATCHES_FILE="${CURRENT_LINK}/packages/data/src/matches.ts"
if [ -f "$MATCHES_FILE" ]; then
  TODAY=$(date +%Y-%m-%d)
  YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)
  TODAY_SLUGS=$(grep -B5 "date: \"${TODAY}\|date: \"${YESTERDAY}" "$MATCHES_FILE" | grep -o 'slug: "[^"]*"' | sed 's/slug: "//;s/"//g' || true)
  if [ -n "$TODAY_SLUGS" ]; then
    for s in $TODAY_SLUGS; do
      curl -s -o /dev/null --max-time 15 "${FR_URL}/match/${s}"
      sleep 1
    done
    echo "  [FR] Warmed $(echo "$TODAY_SLUGS" | wc -w | tr -d ' ') match pages."
  fi
fi

# --- DE warm-up (if deployed) ---
if echo "$APPS" | grep -q "de"; then
  DE_URL="http://127.0.0.1:3002"
  echo "  [DE] Warming key pages..."
  for p in "/" "/spiel/spielplan" "/spiel/heute" "/gruppen" "/ergebnisse"; do
    curl -s -o /dev/null --max-time 10 "${DE_URL}${p}" 2>/dev/null || true
  done

  # Warm today/yesterday match pages (DE — same slugs, different route)
  if [ -n "${TODAY_SLUGS:-}" ]; then
    for s in $TODAY_SLUGS; do
      curl -s -o /dev/null --max-time 15 "${DE_URL}/spiel/${s}" 2>/dev/null || true
      sleep 1
    done
    echo "  [DE] Warmed match pages."
  fi
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
