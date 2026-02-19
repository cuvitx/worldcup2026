#!/bin/bash
# Visual QA — Screenshots at multiple viewports for review
# Usage: bash scripts/visual-qa.sh [base_url]

BASE="${1:-http://localhost:3099}"
OUT="/tmp/qa-screenshots"
rm -rf "$OUT" && mkdir -p "$OUT"

# Key pages to test
PAGES=(
  "/" 
  "/simulateur"
  "/groupe/A"
  "/pronostic-match/france-vs-senegal"
  "/equipe/france"
  "/quiz"
  "/classement-fifa"
  "/calendrier"
  "/comparateur"
  "/stade/metlife-stadium"
)

# Viewports: mobile, tablet, laptop, desktop
VIEWPORTS=(
  "375x812:mobile"
  "768x1024:tablet"
  "1280x900:laptop"
  "1920x1080:desktop"
)

echo "📸 Visual QA — $BASE"
echo "=========================="

for page in "${PAGES[@]}"; do
  slug=$(echo "$page" | sed 's/\//-/g' | sed 's/^-//' | sed 's/-$//')
  [ -z "$slug" ] && slug="home"
  
  for vp in "${VIEWPORTS[@]}"; do
    size="${vp%%:*}"
    label="${vp##*:}"
    filename="${slug}_${label}.png"
    
    chromium --headless --no-sandbox --disable-gpu \
      --screenshot="$OUT/$filename" \
      --window-size="$size" \
      "${BASE}${page}" 2>/dev/null
  done
  echo "✅ $page"
done

echo ""
echo "📁 Screenshots saved to $OUT"
echo "📊 Total: $(ls $OUT/*.png 2>/dev/null | wc -l) screenshots"
