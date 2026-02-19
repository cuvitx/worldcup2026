#!/bin/bash
# Optimize images > 200KB - resize to max 1280px wide, quality 80%
set -e

BASE="/data/.openclaw/workspace/worldcup2026"
cd "$BASE"

IMAGES=$(find apps/fr/public/images -name "*.jpg" -size +200k)
COUNT=0
SAVED=0

for img in $IMAGES; do
  BEFORE=$(stat -c%s "$img")
  # Optimize: resize to max 1280px wide, keep aspect ratio, quality 80
  npx sharp-cli --input "$img" --output "$img" resize 1280 -- --quality 80 2>/dev/null || \
  npx --yes sharp-cli --input "$img" --output "$img" resize 1280 2>/dev/null || true
  
  AFTER=$(stat -c%s "$img")
  DIFF=$((BEFORE - AFTER))
  SAVED=$((SAVED + DIFF))
  COUNT=$((COUNT + 1))
  echo "[$COUNT] $img: ${BEFORE}B → ${AFTER}B (saved ${DIFF}B)"
done

echo ""
echo "Done: optimized $COUNT images, saved ~${SAVED} bytes total"
