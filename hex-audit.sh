#!/bin/bash
cd /data/.openclaw/workspace/worldcup2026/apps/fr/app

echo "📊 Audit des couleurs hex restantes"
echo "===================================="
echo ""

echo "📄 Par fichier :"
grep -r "#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" -l | while read file; do
    count=$(grep "#[0-9A-Fa-f]\{6\}" "$file" | wc -l)
    echo "  $file: $count"
done

echo ""
echo "🎨 Catégories :"

echo ""
echo "1. Metadata/Config (PWA, theme, OG) - OK à garder :"
grep -r "#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" | grep -E "(themeColor|background:|opengraph|pwa-icon|route\.tsx)" | wc -l

echo ""
echo "2. Gradients inline (style=) - Complexes, OK :"
grep -r "linear-gradient.*#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" | wc -l

echo ""
echo "3. Print CSS - OK :"
grep -r "#[0-9A-Fa-f]\{6\}" ./calendrier/imprimer --include="*.tsx" 2>/dev/null | wc -l

echo ""
echo "4. Data/Constants (arrays, defaults) - OK :"
grep -r "const.*=.*#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" | wc -l

echo ""
echo "5. Commentaires - OK :"
grep -r "//.*#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" | wc -l

echo ""
echo "6. Branding tiers (Winamax, Bet365...) :"
grep -r "text-\[#[0-9A-Fa-f]\{6\}\]" . --include="*.tsx" | wc -l

echo ""
echo "📌 Total hex restants :"
grep -r "#[0-9A-Fa-f]\{6\}" . --include="*.tsx" --include="*.ts" | wc -l
