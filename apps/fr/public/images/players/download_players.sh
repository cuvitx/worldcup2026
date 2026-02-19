#!/bin/bash
# Script de téléchargement des images de joueurs depuis Wikimedia/Wikipedia
# Usage: bash download_players.sh

OUTDIR="$(dirname "$0")"
ATTR_FILE="$OUTDIR/attributions.txt"
UA="WorldCup2026Bot/1.0 (https://worldcup2026.example.com)"

echo "# Attributions des images de joueurs" > "$ATTR_FILE"
echo "# Générées le $(date)" >> "$ATTR_FILE"
echo "" >> "$ATTR_FILE"

fetch_player() {
  local wiki_title="$1"
  local slug="$2"
  local outfile="$OUTDIR/${slug}.jpg"

  echo "→ $wiki_title ($slug)"

  # Appel API Wikipedia pour obtenir l'image principale
  local api_url="https://en.wikipedia.org/w/api.php?action=query&titles=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$wiki_title'))")&prop=pageimages&pithumbsize=600&pilicense=any&format=json"

  local json
  json=$(curl -sL -H "User-Agent: $UA" "$api_url")

  local img_url
  img_url=$(echo "$json" | python3 -c "
import sys, json
data = json.load(sys.stdin)
pages = data.get('query',{}).get('pages',{})
for pid, page in pages.items():
    thumb = page.get('thumbnail',{})
    if thumb:
        print(thumb.get('source',''))
        break
" 2>/dev/null)

  if [ -z "$img_url" ]; then
    echo "  ✗ Pas d'image trouvée pour $wiki_title"
    return 1
  fi

  # Télécharger l'image
  curl -sL -H "User-Agent: $UA" "$img_url" -o "$outfile"

  # Vérifier que c'est bien une image
  local ftype
  ftype=$(file "$outfile" 2>/dev/null)

  if echo "$ftype" | grep -qiE "JPEG|PNG|WebP|image"; then
    local size
    size=$(wc -c < "$outfile")
    echo "  ✓ OK ($size bytes) — $ftype"

    # Récupérer les infos d'attribution depuis Commons
    local commons_title
    commons_title=$(echo "$img_url" | sed 's|.*/||' | sed 's|/[0-9]*px-.*||' | python3 -c "import sys,urllib.parse; print(urllib.parse.unquote(sys.stdin.read().strip()))")

    echo "## $slug" >> "$ATTR_FILE"
    echo "Joueur: $wiki_title" >> "$ATTR_FILE"
    echo "Source: $img_url" >> "$ATTR_FILE"
    echo "Origine: Wikimedia Commons / Wikipedia" >> "$ATTR_FILE"
    echo "Licence: CC BY-SA ou domaine public (voir page Commons)" >> "$ATTR_FILE"
    echo "" >> "$ATTR_FILE"
    return 0
  else
    echo "  ✗ Fichier invalide: $ftype"
    rm -f "$outfile"
    return 1
  fi
}

# Liste des joueurs: "Wikipedia Title" "slug"
fetch_player "Kylian Mbappé" "kylian-mbappe"
fetch_player "Lionel Messi" "lionel-messi"
fetch_player "Cristiano Ronaldo" "cristiano-ronaldo"
fetch_player "Erling Haaland" "erling-haaland"
fetch_player "Vinícius Júnior" "vinicius-jr"
fetch_player "Jude Bellingham" "jude-bellingham"
fetch_player "Mohamed Salah" "mohamed-salah"
fetch_player "Kevin De Bruyne" "kevin-de-bruyne"
fetch_player "Harry Kane" "harry-kane"
fetch_player "Robert Lewandowski" "robert-lewandowski"
fetch_player "Luka Modrić" "luka-modric"
fetch_player "Pedri" "pedri"
fetch_player "Gavi (footballer)" "gavi"
fetch_player "Bukayo Saka" "bukayo-saka"
fetch_player "Phil Foden" "phil-foden"
fetch_player "Lamine Yamal" "lamine-yamal"
fetch_player "Florian Wirtz" "florian-wirtz"
fetch_player "Jamal Musiala" "jamal-musiala"
fetch_player "Victor Osimhen" "victor-osimhen"
fetch_player "Son Heung-min" "son-heung-min"
fetch_player "Federico Valverde" "federico-valverde"
fetch_player "Rodri" "rodri"
fetch_player "Alisson Becker" "alisson-becker"
fetch_player "Thibaut Courtois" "thibaut-courtois"
fetch_player "Manuel Neuer" "manuel-neuer"
fetch_player "Achraf Hakimi" "achraf-hakimi"
fetch_player "Trent Alexander-Arnold" "trent-alexander-arnold"
fetch_player "Eduardo Camavinga" "eduardo-camavinga"
fetch_player "Aurélien Tchouaméni" "aurelien-tchouameni"
fetch_player "Cole Palmer" "cole-palmer"

echo ""
echo "=== Terminé ==="
ls -la "$OUTDIR"/*.jpg 2>/dev/null | wc -l | xargs echo "Images téléchargées:"
