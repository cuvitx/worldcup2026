#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all page.tsx files that have BreadcrumbSchema
const files = execSync(
  'find apps/fr/app -name "page.tsx" -type f | xargs grep -l "BreadcrumbSchema"',
  { cwd: __dirname + '/..', encoding: 'utf-8' }
)
  .trim()
  .split('\n')
  .filter(Boolean);

console.log(`Found ${files.length} files with BreadcrumbSchema`);

let totalModified = 0;

files.forEach((file) => {
  const fullPath = path.join(__dirname, '..', file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;

  // Check if already using new Breadcrumb component
  if (content.includes('from "@repo/ui/breadcrumb"')) {
    console.log(`✓ ${file} already using new Breadcrumb`);
    return;
  }

  // 1. Add Breadcrumb import if not present
  if (!content.includes('import { Breadcrumb }')) {
    // Remove old imports
    content = content.replace(/import { BreadcrumbSchema } from "@repo\/ui\/breadcrumb-schema";\n/g, '');
    content = content.replace(/import { domains } from "@repo\/data\/route-mapping";\n/g, '');
    content = content.replace(/import Link from "next\/link";\n/g, '');
    
    // Add new import at the top with other @repo/ui imports
    const importRegex = /(import [^;]+ from "@repo\/ui\/[^"]+";)/;
    if (importRegex.test(content)) {
      content = content.replace(importRegex, '$1\nimport { Breadcrumb } from "@repo/ui/breadcrumb";');
    } else {
      // Add after type imports
      content = content.replace(/(import type { Metadata }[^;]*;)/,
        '$1\nimport { Breadcrumb } from "@repo/ui/breadcrumb";');
    }
    modified = true;
  }

  // 2. Remove JSON-LD breadcrumb schema if present
  content = content.replace(/\s*const breadcrumbJsonLd = \{[^}]+\};\s*/gs, '\n');
  content = content.replace(/\s*<script type="application\/ld\+json"[^>]*dangerouslySetInnerHTML=\{\{ __html: JSON\.stringify\(breadcrumbJsonLd\) \}\} \/>\s*/g, '');
  
  // 3. Remove old BreadcrumbSchema component
  content = content.replace(/\s*<BreadcrumbSchema\s+items=\{[^}]+\}\s+baseUrl=\{domains\.fr\}\s+\/>\s*/gs, '');

  // 4. Replace breadcrumb nav HTML with Breadcrumb component
  // This is tricky because breadcrumbs vary. Let's use a regex to extract the items
  const navRegex = /<nav className="bg-white[^>]*>\s*<div[^>]*>\s*<ol[^>]*>(.*?)<\/ol>\s*<\/div>\s*<\/nav>/gs;
  const navMatch = content.match(navRegex);
  
  if (navMatch) {
    const navHtml = navMatch[0];
    const items = [];
    
    // Extract breadcrumb items
    const itemRegex = /<li[^>]*>(?:<Link href="([^"]*)"[^>]*>([^<]+)<\/Link>|<span[^>]*>([^<]+)<\/span>|([^<]+))<\/li>/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(navHtml)) !== null) {
      if (itemMatch[0].includes('/') || itemMatch[0].includes('•')) continue; // Skip separators
      
      const href = itemMatch[1];
      const linkText = itemMatch[2];
      const spanText = itemMatch[3];
      const plainText = itemMatch[4];
      
      const label = linkText || spanText || plainText;
      if (label && label.trim()) {
        items.push({ label: label.trim(), href: href || undefined });
      }
    }

    if (items.length > 0) {
      // Generate new Breadcrumb component
      const breadcrumbItems = items.map((item, i) => {
        if (i === items.length - 1) {
          return `          { label: "${item.label}" }`;
        }
        return `          { label: "${item.label}", href: "${item.href}" }`;
      }).join(',\n');

      const newBreadcrumb = `      <Breadcrumb\n        items={[\n${breadcrumbItems},\n        ]}\n      />`;
      
      content = content.replace(navRegex, newBreadcrumb);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✓ Modified ${file}`);
    totalModified++;
  }
});

console.log(`\n✅ Modified ${totalModified} files`);
