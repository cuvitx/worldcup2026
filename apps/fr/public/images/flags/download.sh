#!/bin/bash
# Download flags for all 48 World Cup 2026 teams
# Using flagcdn.com SVG format

FLAGS_DIR="$(dirname "$0")"

declare -A TEAM_FLAGS=(
  ["mexique"]="mx"
  ["afrique-du-sud"]="za"
  ["coree-du-sud"]="kr"
  ["canada"]="ca"
  ["suisse"]="ch"
  ["qatar"]="qa"
  ["bresil"]="br"
  ["maroc"]="ma"
  ["ecosse"]="gb-sct"
  ["haiti"]="ht"
  ["etats-unis"]="us"
  ["paraguay"]="py"
  ["australie"]="au"
  ["allemagne"]="de"
  ["equateur"]="ec"
  ["cote-divoire"]="ci"
  ["curacao"]="cw"
  ["pays-bas"]="nl"
  ["japon"]="jp"
  ["tunisie"]="tn"
  ["belgique"]="be"
  ["iran"]="ir"
  ["egypte"]="eg"
  ["nouvelle-zelande"]="nz"
  ["espagne"]="es"
  ["uruguay"]="uy"
  ["arabie-saoudite"]="sa"
  ["cap-vert"]="cv"
  ["france"]="fr"
  ["senegal"]="sn"
  ["norvege"]="no"
  ["argentine"]="ar"
  ["autriche"]="at"
  ["algerie"]="dz"
  ["jordanie"]="jo"
  ["portugal"]="pt"
  ["colombie"]="co"
  ["ouzbekistan"]="uz"
  ["angleterre"]="gb-eng"
  ["croatie"]="hr"
  ["ghana"]="gh"
  ["panama"]="pa"
)

OK=0
FAIL=0

for SLUG in "${!TEAM_FLAGS[@]}"; do
  ISO="${TEAM_FLAGS[$SLUG]}"
  OUT_FILE="$FLAGS_DIR/${ISO}.svg"
  URL="https://flagcdn.com/${ISO}.svg"
  
  if [ -f "$OUT_FILE" ]; then
    echo "✓ $ISO already exists"
    ((OK++))
    continue
  fi
  
  HTTP=$(curl -s -o "$OUT_FILE" -w "%{http_code}" "$URL")
  if [ "$HTTP" -eq 200 ]; then
    echo "✓ Downloaded $ISO ($SLUG)"
    ((OK++))
  else
    rm -f "$OUT_FILE"
    echo "✗ Failed $ISO ($SLUG) — HTTP $HTTP"
    ((FAIL++))
  fi
done

echo ""
echo "Done: $OK OK, $FAIL failed"
