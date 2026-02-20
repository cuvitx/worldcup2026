#!/bin/bash
echo "🔍 Verifying template upgrade..."
echo ""

echo "✅ Premium components created:"
ls -1 apps/fr/app/equipe/\[slug\]/_components/Premium*.tsx | wc -l
echo ""

echo "📄 Premium component files:"
ls -1 apps/fr/app/equipe/\[slug\]/_components/Premium*.tsx
echo ""

echo "📊 Line counts:"
wc -l apps/fr/app/equipe/\[slug\]/_components/Premium*.tsx | tail -1
echo ""

echo "🔀 Redirect configured:"
grep -A 3 "equipe-de-france" apps/fr/next.config.js
echo ""

echo "✅ All checks complete!"
