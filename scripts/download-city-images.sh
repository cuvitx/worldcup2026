#!/bin/bash
# Download city skyline images from Wikimedia Commons
set -e

CITIES_DIR="/data/.openclaw/workspace/worldcup2026/apps/fr/public/images/cities"
mkdir -p "$CITIES_DIR"

# Attribution file
ATTR_FILE="$CITIES_DIR/attributions.txt"
echo "# City Images Attributions" > "$ATTR_FILE"
echo "# Sources: Wikimedia Commons (CC-BY, CC-BY-SA, Public Domain)" >> "$ATTR_FILE"
echo "" >> "$ATTR_FILE"

# Function to download image with known Wikimedia filename
download_wikimedia() {
  local slug="$1"
  local filename="$2"  # e.g. "New_York_City_skyline.jpg"
  local attribution="$3"
  local output="$CITIES_DIR/${slug}.jpg"
  
  if [ -f "$output" ]; then
    echo "✅ Already exists: $slug"
    return 0
  fi
  
  # URL-encode the filename (basic)
  local encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$filename'))")
  
  # Try 800px thumbnail first
  local thumb_url="https://commons.wikimedia.org/wiki/Special:FilePath/${encoded}?width=800"
  
  echo "📥 Downloading $slug..."
  if curl -sL --max-time 30 -A "Mozilla/5.0" -o "$output" "$thumb_url"; then
    local size=$(stat -c%s "$output" 2>/dev/null || echo 0)
    if [ "$size" -gt 10000 ]; then
      echo "✅ Downloaded $slug ($(($size / 1024)) KB)"
      echo "${slug}: ${filename} | ${attribution}" >> "$ATTR_FILE"
      return 0
    fi
  fi
  
  # Fallback: try direct image path
  local direct_url="https://upload.wikimedia.org/wikipedia/commons/${filename}"
  echo "🔄 Trying direct URL for $slug..."
  if curl -sL --max-time 30 -A "Mozilla/5.0" -o "$output" "$direct_url"; then
    local size=$(stat -c%s "$output" 2>/dev/null || echo 0)
    if [ "$size" -gt 10000 ]; then
      echo "✅ Downloaded $slug from direct URL ($(($size / 1024)) KB)"
      echo "${slug}: ${filename} | ${attribution}" >> "$ATTR_FILE"
      return 0
    fi
  fi
  
  rm -f "$output"
  echo "❌ Failed to download $slug"
  return 1
}

# New York / New Jersey - Iconic Manhattan skyline
download_wikimedia "new-york-new-jersey" \
  "New_York_City_Skyline_at_night_HDR_edit1.jpg" \
  "CC-BY-SA 3.0 | King of Hearts"

# Dallas - Downtown skyline
download_wikimedia "dallas-fort-worth" \
  "Dallas_Skyline_From_Reunion_Tower_2015.jpg" \
  "CC-BY-SA 4.0 | Nandaro"

# Miami - Downtown
download_wikimedia "miami" \
  "Miami_FL_USA_-_Downtown_Miami_-_panoramio.jpg" \
  "CC-BY-SA 3.0 | Phillip Pessar"

# Atlanta
download_wikimedia "atlanta" \
  "Atlanta_skyline_from_Buckhead_2018.jpg" \
  "CC-BY-SA 4.0"

# Seattle
download_wikimedia "seattle" \
  "Seattle_Center_as_seen_from_the_Space_Needle.jpg" \
  "CC-BY-SA 3.0"

# Houston
download_wikimedia "houston" \
  "Houston_Downtown_2012.jpg" \
  "CC0 | Michael Stravato"

# Philadelphia
download_wikimedia "philadelphia" \
  "Philadelphia_skyline_from_South_Street_Bridge_January_2020.jpg" \
  "CC-BY-SA 4.0 | Wikibearwithme"

# Kansas City
download_wikimedia "kansas-city" \
  "Kansas_City_Missouri_Skyline_by_Kris_Arnold.jpg" \
  "CC-BY-SA 2.0 | Kris Arnold"

# Boston
download_wikimedia "boston" \
  "Boston_-_panoramio_(23).jpg" \
  "CC-BY-SA 3.0"

# San Francisco Bay Area
download_wikimedia "san-francisco-bay-area" \
  "San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg" \
  "CC-BY-SA 4.0 | King of Hearts"

# Los Angeles
download_wikimedia "los-angeles" \
  "Downtown_Los_Angeles_at_Night_by_Howcheng.jpg" \
  "CC-BY-SA 3.0 | Howcheng"

# Mexico City
download_wikimedia "mexico-city" \
  "Paseo_de_la_Reforma,_Ciudad_de_Mexico.jpg" \
  "CC-BY-SA 4.0"

# Guadalajara
download_wikimedia "guadalajara" \
  "Centro_Guadalajara.jpg" \
  "CC-BY-SA 3.0"

# Monterrey
download_wikimedia "monterrey" \
  "Monterrey_from_Cerro_de_la_Silla.jpg" \
  "CC-BY-SA 4.0"

# Toronto
download_wikimedia "toronto" \
  "Toronto_-_ON_-_Toronto_Skyline4.jpg" \
  "CC-BY-SA 3.0 | Taxiarchos228"

# Vancouver
download_wikimedia "vancouver" \
  "Vancouver_Canada_Place_and_downtown_from_North_Vancouver.jpg" \
  "CC-BY-SA 3.0"

echo ""
echo "=== Download complete ==="
ls -lh "$CITIES_DIR"/*.jpg 2>/dev/null | awk '{print $5, $9}' || echo "No files downloaded"
