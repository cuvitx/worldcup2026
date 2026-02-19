#!/usr/bin/env python3
"""Download city skyline images from Wikimedia Commons using the proper API."""
import urllib.request
import urllib.parse
import json
import os
import time

CITIES_DIR = "/data/.openclaw/workspace/worldcup2026/apps/fr/public/images/cities"
os.makedirs(CITIES_DIR, exist_ok=True)

ATTR_FILE = os.path.join(CITIES_DIR, "attributions.txt")

def api_get(params):
    """Query Wikimedia Commons API."""
    base = "https://commons.wikimedia.org/w/api.php"
    params["format"] = "json"
    url = base + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": "WorldCup2026Bot/1.0 (imagedownloader)"})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())

def get_image_url(filename):
    """Get the actual URL for a Wikimedia Commons file."""
    data = api_get({
        "action": "query",
        "titles": f"File:{filename}",
        "prop": "imageinfo",
        "iiprop": "url|extmetadata|mime",
        "iiurlwidth": 800,
    })
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        info = page.get("imageinfo", [{}])[0]
        url = info.get("thumburl") or info.get("url")
        mime = info.get("mime", "")
        meta = info.get("extmetadata", {})
        license_name = meta.get("LicenseShortName", {}).get("value", "Unknown")
        artist = meta.get("Artist", {}).get("value", "Unknown")
        # Strip HTML from artist
        import re
        artist = re.sub(r'<[^>]+>', '', artist)
        return url, license_name, artist, mime
    return None, None, None, None

def search_and_get_image(search_query, preferred_terms=None):
    """Search Wikimedia Commons and get the first JPEG image URL."""
    data = api_get({
        "action": "query",
        "list": "search",
        "srsearch": search_query,
        "srnamespace": 6,
        "srlimit": 10,
    })
    results = data.get("query", {}).get("search", [])
    
    for result in results:
        title = result["title"]
        filename = title.replace("File:", "")
        # Only JPEGs
        if not filename.lower().endswith((".jpg", ".jpeg")):
            continue
        # Skip if preferred terms specified and none match
        if preferred_terms:
            lower_fn = filename.lower()
            if not any(term.lower() in lower_fn for term in preferred_terms):
                continue
        
        url, license_name, artist, mime = get_image_url(filename)
        if url and "image/jpeg" in (mime or ""):
            return url, filename, license_name, artist
        time.sleep(0.1)
    
    # If no match with preferred terms, try without
    if preferred_terms:
        for result in results:
            title = result["title"]
            filename = title.replace("File:", "")
            if not filename.lower().endswith((".jpg", ".jpeg")):
                continue
            url, license_name, artist, mime = get_image_url(filename)
            if url and "image/jpeg" in (mime or ""):
                return url, filename, license_name, artist
            time.sleep(0.1)
    
    return None, None, None, None

def download_file(url, output_path):
    """Download a file from URL."""
    req = urllib.request.Request(
        url, 
        headers={"User-Agent": "WorldCup2026Bot/1.0 (imagedownloader)"}
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(output_path, "wb") as f:
        f.write(data)
    return len(data)

# Cities to download: (slug, search_query, preferred_terms)
cities = [
    ("new-york-new-jersey", "New York City skyline Manhattan", ["skyline", "manhattan", "nyc"]),
    ("dallas-fort-worth", "Dallas Texas skyline downtown", ["skyline", "dallas"]),
    ("miami", "Miami Florida skyline downtown", ["skyline", "miami"]),
    ("atlanta", "Atlanta Georgia skyline", ["skyline", "atlanta"]),
    ("seattle", "Seattle Washington skyline Space Needle", ["skyline", "seattle"]),
    ("houston", "Houston Texas skyline downtown", ["skyline", "houston"]),
    ("philadelphia", "Philadelphia Pennsylvania skyline", ["skyline", "philadelphia"]),
    ("kansas-city", "Kansas City Missouri skyline", ["skyline", "kansas"]),
    ("boston", None, None),  # already downloaded
    ("san-francisco-bay-area", None, None),  # already downloaded
    ("toronto", None, None),  # already downloaded
    ("los-angeles", "Los Angeles skyline downtown", ["skyline", "angeles"]),
    ("mexico-city", "Mexico City skyline panorama", ["mexico", "ciudad"]),
    ("guadalajara", "Guadalajara Mexico city panorama", ["guadalajara"]),
    ("monterrey", "Monterrey Mexico skyline", ["monterrey"]),
    ("vancouver", "Vancouver British Columbia skyline", ["skyline", "vancouver"]),
]

attributions = []

for slug, query, preferred in cities:
    output_path = os.path.join(CITIES_DIR, f"{slug}.jpg")
    
    if os.path.exists(output_path):
        size = os.path.getsize(output_path)
        print(f"✅ Already exists: {slug} ({size//1024} KB)")
        continue
    
    if query is None:
        print(f"⏭️  Skipping {slug} (no query)")
        continue
    
    print(f"🔍 Searching for: {slug} ({query})")
    
    try:
        url, filename, license_name, artist = search_and_get_image(query, preferred)
        
        if url:
            print(f"   Found: {filename[:60]} | {license_name}")
            size = download_file(url, output_path)
            print(f"   ✅ Downloaded ({size//1024} KB)")
            attributions.append(f"{slug}: {filename} | {license_name} | {artist}")
        else:
            print(f"   ❌ No suitable image found")
    except Exception as e:
        print(f"   ❌ Error: {e}")
    
    time.sleep(0.5)

# Write attributions
with open(ATTR_FILE, "w") as f:
    f.write("# City Images Attributions\n")
    f.write("# Source: Wikimedia Commons\n\n")
    for attr in attributions:
        f.write(attr + "\n")

print("\n=== Done ===")
for f in sorted(os.listdir(CITIES_DIR)):
    if f.endswith(".jpg"):
        size = os.path.getsize(os.path.join(CITIES_DIR, f))
        print(f"  {f}: {size//1024} KB")
