#!/bin/bash

# List of files already manually updated (skip these)
SKIP_FILES=(
  "apps/fr/app/page.tsx"
  "apps/fr/app/palmares/page.tsx"
  "apps/fr/app/faq/page.tsx"
  "apps/fr/app/pronostic-vainqueur/page.tsx"
  "apps/fr/app/ou-regarder/page.tsx"
  "apps/fr/app/equipe-de-france/page.tsx"
  "apps/fr/app/billets/page.tsx"
  "apps/fr/app/methodologie/page.tsx"
)

# Get all files with BreadcrumbSchema
FILES=$(find apps/fr/app -name "page.tsx" -type f | xargs grep -l "BreadcrumbSchema" 2>/dev/null)

for file in $FILES; do
  # Check if file should be skipped
  skip=0
  for skip_file in "${SKIP_FILES[@]}"; do
    if [ "$file" = "$skip_file" ]; then
      skip=1
      break
    fi
  done
  
  if [ $skip -eq 1 ]; then
    echo "⏭️  Skipping $file (already updated)"
    continue
  fi
  
  # Check if already has new Breadcrumb
  if grep -q 'from "@repo/ui/breadcrumb"' "$file"; then
    echo "✓ $file already using new Breadcrumb"
    continue
  fi
  
  echo "📝 Processing $file..."
  echo "   Please update manually - structure varies too much for safe automation"
done

echo ""
echo "ℹ️  Remaining files need manual update. Use the Breadcrumb component:"
echo "   import { Breadcrumb } from '@repo/ui/breadcrumb';"
echo "   <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Page' }]} />"
