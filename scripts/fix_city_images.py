#!/usr/bin/env python3
"""Fix narrow/portrait city images."""
import urllib.request, urllib.parse, json, time, os

CITIES_DIR = "/data/.openclaw/workspace/worldcup2026/apps/fr/public/images/cities"

def api_get(params):
    base = 'https://commons.wikimedia.org/w/api.php'
    params['format'] = 'json'
    url = base + '?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': 'WorldCup2026Bot/1.0'})
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())

def get_image_info(filename):
    data = api_get({
        'action': 'query',
        'titles': f'File:{filename}',
        'prop': 'imageinfo',
        'iiprop': 'url|mime|dimensions',
        'iiurlwidth': 1200,
    })
    pages = data['query']['pages']
    for p in pages.values():
        info = p.get('imageinfo', [{}])[0]
        return info
    return {}

def download_file(url, output_path):
    req = urllib.request.Request(url, headers={'User-Agent': 'WorldCup2026Bot/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    with open(output_path, 'wb') as f:
        f.write(data)
    return len(data)

def search_good_image(query, min_ratio=0.4):
    """Find a JPEG image with good aspect ratio (height >= width * min_ratio)."""
    data = api_get({'action':'query','list':'search','srsearch':query,'srnamespace':6,'srlimit':20})
    
    for result in data['query']['search']:
        fn = result['title'].replace('File:', '')
        if not fn.lower().endswith(('.jpg', '.jpeg')):
            continue
        
        info = get_image_info(fn)
        if not info or 'image/jpeg' not in info.get('mime', ''):
            continue
        
        w = info.get('thumbwidth') or info.get('width', 0)
        h = info.get('thumbheight') or info.get('height', 0)
        if not w or not h:
            continue
        
        ratio = h / w
        if ratio < min_ratio or ratio > 1.5:
            print(f'    Skip {fn[:50]} ({w}x{h}, ratio={ratio:.2f})')
            continue
        
        url = info.get('thumburl') or info.get('url')
        print(f'  ✓ Found: {fn[:60]} ({w}x{h})')
        return url, fn
        
        time.sleep(0.1)
    
    return None, None

# Fix these cities that had bad aspect ratios
fixes = [
    ("boston", "Boston Massachusetts skyline downtown waterfront"),
    ("dallas-fort-worth", "Dallas Texas downtown skyline aerial view"),
    ("los-angeles", "Los Angeles California city skyline view"),
    ("miami", "Miami Florida downtown skyline bay"),
    ("atlanta", "Atlanta Georgia downtown skyline aerial"),
    ("mexico-city", "Mexico City downtown zocalo skyline"),
]

for slug, query in fixes:
    output_path = os.path.join(CITIES_DIR, f"{slug}.jpg")
    print(f"\n🔍 Searching better image for: {slug}")
    
    url, filename = search_good_image(query, min_ratio=0.45)
    
    if url:
        try:
            size = download_file(url, output_path)
            print(f"  ✅ Downloaded {slug} ({size//1024} KB)")
        except Exception as e:
            print(f"  ❌ Download failed: {e}")
    else:
        print(f"  ❌ No good image found for {slug}")
    
    time.sleep(1)

print("\n=== Final status ===")
import struct
def get_jpeg_dims(path):
    with open(path, 'rb') as f:
        data = f.read(64000)
    i = 0
    while i < len(data) - 9:
        if data[i] == 0xFF and data[i+1] in (0xC0, 0xC2):
            h = struct.unpack('>H', data[i+5:i+7])[0]
            w = struct.unpack('>H', data[i+7:i+9])[0]
            return w, h
        i += 1
    return None, None

for f in sorted(os.listdir(CITIES_DIR)):
    if f.endswith('.jpg'):
        w, h = get_jpeg_dims(os.path.join(CITIES_DIR, f))
        size = os.path.getsize(os.path.join(CITIES_DIR, f)) // 1024
        ratio = f"{h/w:.2f}" if w and h else "?"
        status = "✅" if w and h and 0.4 <= h/w <= 1.5 else "⚠️"
        print(f"  {status} {f}: {w}x{h} ratio={ratio} ({size}KB)")
