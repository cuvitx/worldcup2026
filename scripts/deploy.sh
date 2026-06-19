#!/usr/bin/env bash
set -euo pipefail

# === Configuration ===
REPO_DIR="/srv/cdm2026/repo"
RELEASES_DIR="/srv/cdm2026/releases"
CURRENT_LINK="/srv/cdm2026/current"
KEEP_RELEASES=3
SERVICE_NAME="cdm2026"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
RELEASE_DIR="${RELEASES_DIR}/${TIMESTAMP}"
LOG_FILE="/srv/cdm2026/deploy.log"

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

# === Step 2: Install dependencies ===
echo "[2/7] Installing dependencies..."
set -a; source /etc/cdm2026.env 2>/dev/null || true; set +a
npm ci

# === Step 3: Build ===
echo "[3/7] Building apps/fr..."
npm run build --workspace=apps/fr

# === Step 4: Create release ===
echo "[4/7] Creating release ${TIMESTAMP}..."
mkdir -p "$RELEASE_DIR"
rsync -a \
  --exclude=".git" \
  --exclude=".turbo" \
  --exclude="apps/en" \
  --exclude="apps/es" \
  "$REPO_DIR/" "$RELEASE_DIR/"

# Preserve ISR cache from previous release (avoids cold start API calls)
PREV_CACHE="${CURRENT_LINK}/apps/fr/.next/cache"
NEW_CACHE="${RELEASE_DIR}/apps/fr/.next/cache"
if [ -d "$PREV_CACHE" ]; then
  echo "  Copying ISR cache from previous release..."
  cp -a "$PREV_CACHE" "$NEW_CACHE" 2>/dev/null || true
fi

# Fix ownership so the deploy user can write ISR cache
chown -R deploy:deploy "$RELEASE_DIR"

# === Step 5: Swap symlink (atomic) ===
echo "[5/7] Swapping symlink..."
ln -sfn "$RELEASE_DIR" "${CURRENT_LINK}"

# === Step 6: Restart service ===
echo "[6/7] Restarting ${SERVICE_NAME}..."
sudo systemctl restart "$SERVICE_NAME"

sleep 3
if systemctl is-active --quiet "$SERVICE_NAME"; then
  echo "Service is running. Deploy successful!"
else
  echo "ERROR: Service failed to start! Rolling back..."
  PREV=$(ls -1d ${RELEASES_DIR}/*/ 2>/dev/null | sort | tail -2 | head -1)
  if [ -n "$PREV" ]; then
    ln -sfn "${PREV%/}" "${CURRENT_LINK}"
    sudo systemctl restart "$SERVICE_NAME"
    echo "Rolled back to ${PREV}"
  fi
  exit 1
fi

# === Step 7: Minimal cache warm-up (API-friendly) ===
echo "[7/7] Warming cache (minimal — preserving API quota)..."
SITE_URL="http://127.0.0.1:3000"
source /etc/cdm2026.env 2>/dev/null || true

# Warm only key static pages (no API calls needed)
echo "  Warming key pages..."
for p in "/" "/match/calendrier" "/match/aujourdhui" "/groupes" "/resultats"; do
  curl -s -o /dev/null --max-time 10 "${SITE_URL}${p}"
done
echo "  Key pages warmed."

# Warm only today and yesterday match pages (not all 104!)
MATCHES_FILE="${CURRENT_LINK}/packages/data/src/matches.ts"
if [ -f "$MATCHES_FILE" ]; then
  TODAY=$(date +%Y-%m-%d)
  YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)

  echo "  Warming match pages for ${TODAY} and ${YESTERDAY}..."
  TODAY_SLUGS=$(grep -B5 "date: \"${TODAY}\|date: \"${YESTERDAY}" "$MATCHES_FILE" | grep -o 'slug: "[^"]*"' | sed 's/slug: "//;s/"//g' || true)

  if [ -n "$TODAY_SLUGS" ]; then
    for s in $TODAY_SLUGS; do
      curl -s -o /dev/null --max-time 15 "${SITE_URL}/match/${s}"
      sleep 1
    done
    echo "  Today/yesterday match pages warmed ($(echo "$TODAY_SLUGS" | wc -w | tr -d ' ') pages)."
  else
    echo "  No matches today/yesterday — skipping match warm-up."
  fi
else
  echo "  WARNING: matches.ts not found, skipping match warm-up."
fi

echo "  Cache warming complete."

# === Cleanup: keep only last N releases ===
echo "Pruning old releases (keeping ${KEEP_RELEASES})..."
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
