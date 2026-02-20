#!/bin/bash
# Simple purge script using sed

cd /data/.openclaw/workspace/worldcup2026/apps/fr/app

# Function to replace in file
replace_in_file() {
    local file="$1"
    local before="$2"
    local after="$3"
    
    if grep -q "$before" "$file"; then
        sed -i "s/${before}/${after}/g" "$file"
        echo "  ✓ $file"
    fi
}

echo "🔍 Purging hex colors..."

# Primary colors
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
    -e 's/bg-\[#0D3B66\]/bg-primary/g' \
    -e 's/bg-\[#0d3b66\]/bg-primary/g' \
    -e 's/text-\[#0D3B66\]/text-primary/g' \
    -e 's/text-\[#0d3b66\]/text-primary/g' \
    -e 's/border-\[#0D3B66\]/border-primary/g' \
    -e 's/border-\[#0d3b66\]/border-primary/g' \
    {} \;

find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
    -e 's/bg-\[#FF6B35\]/bg-accent/g' \
    -e 's/bg-\[#ff6b35\]/bg-accent/g' \
    -e 's/text-\[#FF6B35\]/text-accent/g' \
    -e 's/text-\[#ff6b35\]/text-accent/g' \
    -e 's/border-\[#FF6B35\]/border-accent/g' \
    -e 's/border-\[#ff6b35\]/border-accent/g' \
    {} \;

find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
    -e 's/bg-\[#2EC4B6\]/bg-secondary/g' \
    -e 's/bg-\[#2ec4b6\]/bg-secondary/g' \
    -e 's/text-\[#2EC4B6\]/text-secondary/g' \
    -e 's/text-\[#2ec4b6\]/text-secondary/g' \
    -e 's/border-\[#2EC4B6\]/border-secondary/g' \
    -e 's/border-\[#2ec4b6\]/border-secondary/g' \
    {} \;

find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
    -e 's/bg-\[#06D6A0\]/bg-success/g' \
    -e 's/bg-\[#06d6a0\]/bg-success/g' \
    -e 's/text-\[#06D6A0\]/text-success/g' \
    -e 's/border-\[#06D6A0\]/border-success/g' \
    {} \;

find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
    -e 's/bg-\[#060D18\]/bg-deep/g' \
    -e 's/bg-\[#060d18\]/bg-deep/g' \
    -e 's/bg-\[#080E1A\]/bg-deep/g' \
    -e 's/bg-\[#080e1a\]/bg-deep/g' \
    {} \;

# RGBA borders
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i \
    -e 's/border-\[rgba(255,255,255,0\.1)\]/border-white\/10/g' \
    -e 's/border-\[rgba(255, 255, 255, 0\.1)\]/border-white\/10/g' \
    -e 's/border-\[rgba(255,\s*255,\s*255,\s*0\.1)\]/border-white\/10/g' \
    {} \;

echo "✅ Done!"

# Count remaining
remaining=$(grep -r "#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" 2>/dev/null | wc -l)
echo "📊 Remaining hex colors: $remaining"
