#!/bin/bash
# Download player photos from Wikipedia API (pageimages)
# Only free images from Wikimedia Commons

DEST="/data/.openclaw/workspace/worldcup2026/apps/fr/public/images/players"
ATTR="$DEST/attributions.txt"
FAILED=""
SUCCESS=0

# Existing files (without .jpg)
existing=$(ls "$DEST"/*.jpg 2>/dev/null | xargs -I{} basename {} .jpg)

download_player() {
  local slug="$1"
  local filename="$2"
  local wiki_name="$3"
  
  # Skip if already exists
  if echo "$existing" | grep -qx "$filename"; then
    return 0
  fi
  
  echo ">> Downloading: $wiki_name -> $filename.jpg"
  
  # Query Wikipedia for page image
  local encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$wiki_name'))")
  local api_url="https://en.wikipedia.org/w/api.php?action=query&titles=${encoded}&prop=pageimages&piprop=original&format=json"
  
  local response=$(curl -s -H "User-Agent: WorldCup2026Bot/1.0 (contact@example.com)" "$api_url")
  local img_url=$(echo "$response" | python3 -c "
import json,sys
d=json.load(sys.stdin)
pages=d.get('query',{}).get('pages',{})
for p in pages.values():
    o=p.get('original',{})
    if o: print(o.get('source','')); break
" 2>/dev/null)
  
  if [ -z "$img_url" ]; then
    echo "   NO IMAGE FOUND"
    FAILED="$FAILED\n$slug|$wiki_name"
    return 1
  fi
  
  # Download
  local tmp="/tmp/player_${filename}"
  curl -sL -H "User-Agent: WorldCup2026Bot/1.0" -o "${tmp}_orig" "$img_url"
  
  if [ ! -s "${tmp}_orig" ]; then
    echo "   DOWNLOAD FAILED"
    FAILED="$FAILED\n$slug|$wiki_name"
    return 1
  fi
  
  # Resize to 400x400 max, convert to jpg
  npx sharp-cli -i "${tmp}_orig" -o "$DEST/${filename}.jpg" -- resize 400 400 --fit inside --withoutEnlargement 2>/dev/null
  
  if [ ! -s "$DEST/${filename}.jpg" ]; then
    # Try just copying if sharp fails
    cp "${tmp}_orig" "$DEST/${filename}.jpg" 2>/dev/null
  fi
  
  if [ -s "$DEST/${filename}.jpg" ]; then
    echo "   OK: $DEST/${filename}.jpg"
    echo "${filename}.jpg | Source: Wikipedia/Wikimedia Commons | $img_url" >> "$ATTR"
    SUCCESS=$((SUCCESS + 1))
  else
    echo "   RESIZE FAILED"
    FAILED="$FAILED\n$slug|$wiki_name"
  fi
  
  rm -f "${tmp}_orig"
  sleep 1
}

echo "=== Player Photo Downloader ==="
echo ""

# Priority players from key teams (not already having photos)
# Format: slug|filename|Wikipedia article name

# France (missing)
download_player "griezmann" "antoine-griezmann" "Antoine Griezmann"
download_player "maignan" "mike-maignan" "Mike Maignan"
download_player "saliba" "william-saliba" "William Saliba"
download_player "kounde" "jules-kounde" "Jules Koundé"
download_player "theo-hernandez" "theo-hernandez" "Theo Hernandez"
download_player "upamecano" "dayot-upamecano" "Dayot Upamecano"
download_player "rabiot" "adrien-rabiot" "Adrien Rabiot"
download_player "kante" "ngolo-kante" "N'Golo Kanté"
download_player "dembele" "ousmane-dembele" "Ousmane Dembélé"
download_player "thuram-marcus" "marcus-thuram" "Marcus Thuram"
download_player "olise" "michael-olise" "Michael Olise"
download_player "barcola" "bradley-barcola" "Bradley Barcola"
download_player "zaire-emery" "warren-zaire-emery" "Warren Zaïre-Emery"
download_player "pavard" "benjamin-pavard" "Benjamin Pavard"
download_player "fofana-youssouf" "youssouf-fofana" "Youssouf Fofana"

# Argentina (missing)
download_player "martinez-lautaro" "lautaro-martinez" "Lautaro Martínez"
download_player "de-paul" "rodrigo-de-paul" "Rodrigo De Paul"
download_player "dibu-martinez" "emiliano-martinez" "Emiliano Martínez"
download_player "alvarez-julian" "julian-alvarez" "Julián Álvarez"
download_player "mac-allister" "alexis-mac-allister" "Alexis Mac Allister"
download_player "enzo-fernandez" "enzo-fernandez" "Enzo Fernández"
download_player "di-maria" "angel-di-maria" "Ángel Di María"
download_player "otamendi" "nicolas-otamendi" "Nicolás Otamendi"
download_player "romero-cristian" "cristian-romero" "Cristian Romero"
download_player "garnacho" "alejandro-garnacho" "Alejandro Garnacho"
download_player "molina" "nahuel-molina" "Nahuel Molina"

# England (missing)
download_player "foden" "phil-foden" "Phil Foden"
download_player "rice" "declan-rice" "Declan Rice"
download_player "pickford" "jordan-pickford" "Jordan Pickford"
download_player "walker" "kyle-walker" "Kyle Walker (footballer)"
download_player "stones" "john-stones" "John Stones"
download_player "shaw" "luke-shaw" "Luke Shaw"
download_player "guehi" "marc-guehi" "Marc Guéhi"
download_player "mainoo" "kobbie-mainoo" "Kobbie Mainoo"
download_player "gordon" "anthony-gordon" "Anthony Gordon (footballer)"
download_player "watkins" "ollie-watkins" "Ollie Watkins"

# Spain (missing)
download_player "morata" "alvaro-morata" "Álvaro Morata"
download_player "simon" "unai-simon" "Unai Simón"
download_player "carvajal" "dani-carvajal" "Dani Carvajal"
download_player "nico-williams" "nico-williams" "Nico Williams"
download_player "olmo" "dani-olmo" "Dani Olmo"
download_player "laporte" "aymeric-laporte" "Aymeric Laporte"
download_player "cucurella" "marc-cucurella" "Marc Cucurella"
download_player "le-normand" "robin-le-normand" "Robin Le Normand"
download_player "fabian-ruiz" "fabian-ruiz" "Fabián Ruiz"

# Brazil (missing)
download_player "rodrygo" "rodrygo" "Rodrygo"
download_player "casemiro" "casemiro" "Casemiro"
download_player "marquinhos" "marquinhos-footballer" "Marquinhos (footballer, born 1994)"
download_player "raphinha" "raphinha" "Raphinha"
download_player "militao" "eder-militao" "Éder Militão"
download_player "paqueta" "lucas-paqueta" "Lucas Paquetá"
download_player "endrick" "endrick" "Endrick"

# Germany (missing)
download_player "havertz" "kai-havertz" "Kai Havertz"
download_player "rudiger" "antonio-rudiger" "Antonio Rüdiger"
download_player "gundogan" "ilkay-gundogan" "İlkay Gündoğan"
download_player "sane" "leroy-sane" "Leroy Sané"
download_player "fullkrug" "niclas-fullkrug" "Niclas Füllkrug"
download_player "kimmich" "joshua-kimmich" "Joshua Kimmich"
download_player "ter-stegen" "marc-andre-ter-stegen" "Marc-André ter Stegen"
download_player "schlotterbeck" "nico-schlotterbeck" "Nico Schlotterbeck"

# Portugal (missing)
download_player "bernardo-silva" "bernardo-silva" "Bernardo Silva"
download_player "bruno-fernandes" "bruno-fernandes" "Bruno Fernandes"
download_player "dias" "ruben-dias" "Rúben Dias"
download_player "rafael-leao" "rafael-leao" "Rafael Leão"
download_player "joao-felix" "joao-felix" "João Félix"
download_player "cancelo" "joao-cancelo" "João Cancelo"
download_player "vitinha" "vitinha-footballer" "Vitinha (footballer, born 2000)"

# Other stars (missing)
download_player "de-bruyne" "kevin-de-bruyne" "Kevin De Bruyne"
download_player "hakimi" "achraf-hakimi" "Achraf Hakimi"
download_player "salah" "mohamed-salah" "Mohamed Salah"
download_player "lewandowski" "robert-lewandowski" "Robert Lewandowski"
download_player "haaland" "erling-haaland" "Erling Haaland"
download_player "modric" "luka-modric" "Luka Modrić"
download_player "osimhen" "victor-osimhen" "Victor Osimhen"
download_player "son" "son-heung-min" "Son Heung-min"
download_player "valverde" "federico-valverde" "Federico Valverde"

echo ""
echo "=== DONE ==="
echo "Downloaded: $SUCCESS photos"
echo ""
echo "Failed players:"
echo -e "$FAILED"
