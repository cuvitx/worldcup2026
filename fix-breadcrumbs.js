#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Mapping des pages vers leurs breadcrumbs
const breadcrumbConfig = {
  // Pages simples
  'apps/fr/app/simulateur/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Simulateur",url:"/simulateur"}],
    label: 'Simulateur'
  },
  'apps/fr/app/quiz/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Quiz",url:"/quiz"}],
    label: 'Quiz'
  },
  'apps/fr/app/live/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Live",url:"/live"}],
    label: 'Live'
  },
  'apps/fr/app/profil/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Profil",url:"/profil"}],
    label: 'Profil'
  },
  'apps/fr/app/admin/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Admin",url:"/admin"}],
    label: 'Admin'
  },
  'apps/fr/app/carte-stades/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Carte des stades",url:"/carte-stades"}],
    label: 'Carte des stades'
  },
  'apps/fr/app/comparateur-cotes/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Comparateur de côtes",url:"/comparateur-cotes"}],
    label: 'Comparateur de côtes'
  },
  'apps/fr/app/comparateur-joueurs/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Comparateur de joueurs",url:"/comparateur-joueurs"}],
    label: 'Comparateur de joueurs'
  },
  'apps/fr/app/guide/glossaire/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Guide",url:"/guides"},{name:"Glossaire",url:"/guide/glossaire"}],
    label: 'Glossaire'
  },
  'apps/fr/app/actualites/[slug]/page.tsx': {
    dynamic: true,
    template: 'items={[{name:"Accueil",url:"/"},{name:"Actualités",url:"/actualites"},{name:article.title,url:`/actualites/${params.slug}`}]}'
  },
  
  // Pages avec breadcrumb mais sans schema
  'apps/fr/app/a-propos/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"À propos",url:"/a-propos"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/billets/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Billets",url:"/billets"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/buteurs/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Buteurs",url:"/buteurs"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/calendrier/imprimer/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"},{name:"Imprimer",url:"/calendrier/imprimer"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/contact/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Contact",url:"/contact"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/equipes/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Équipes",url:"/equipes"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/faq/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"FAQ",url:"/faq"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/groupes/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Groupes",url:"/groupes"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/guide/guide-visa-esta/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Guide",url:"/guides"},{name:"Guide Visa ESTA",url:"/guide/guide-visa-esta"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/guides/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Guides",url:"/guides"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/joueurs/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Joueurs",url:"/joueurs"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/match/aujourdhui/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Matchs",url:"/match/calendrier"},{name:"Aujourd'hui",url:"/match/aujourdhui"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/match/calendrier/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/mentions-legales/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Mentions légales",url:"/mentions-legales"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/methodologie/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Méthodologie",url:"/methodologie"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/newsletter/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Newsletter",url:"/newsletter"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/ou-regarder/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Où regarder",url:"/ou-regarder"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/palmares/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Palmarès",url:"/palmares"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/paris-sportifs/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Paris sportifs",url:"/paris-sportifs"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/pronostic-vainqueur/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Vainqueur",url:"/pronostic-vainqueur"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/pronostics/grille/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Grille",url:"/pronostics/grille"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/pronostics/leaderboard/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Classement",url:"/pronostics/leaderboard"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/stades/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Stades",url:"/stades"}],
    hasVisualBreadcrumb: true
  },
  'apps/fr/app/villes/page.tsx': {
    items: [{name:"Accueil",url:"/"},{name:"Villes",url:"/villes"}],
    hasVisualBreadcrumb: true
  },
};

function addImports(content, needsBreadcrumb, needsSchema, needsDomains) {
  const lines = content.split('\n');
  const lastImportIndex = lines.findIndex((line, i) => 
    line.startsWith('import ') && 
    (i === lines.length - 1 || !lines[i + 1]?.startsWith('import '))
  );
  
  const imports = [];
  if (needsBreadcrumb) {
    imports.push('import { Breadcrumb } from "@repo/ui/breadcrumb";');
  }
  if (needsSchema) {
    imports.push('import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";');
  }
  if (needsDomains) {
    imports.push('import { domains } from "@repo/data/route-mapping";');
  }
  
  if (lastImportIndex >= 0) {
    lines.splice(lastImportIndex + 1, 0, ...imports);
  } else {
    // No imports found, add at the beginning
    lines.unshift(...imports, '');
  }
  
  return lines.join('\n');
}

function addBreadcrumbToJSX(content, config) {
  // Find the return statement
  const returnMatch = content.match(/(return\s*\(\s*(?:<>)?)/);
  if (!returnMatch) {
    console.log('⚠️  No return statement found');
    return content;
  }
  
  const itemsStr = JSON.stringify(config.items).replace(/"/g, '"');
  const breadcrumbJSX = `      <Breadcrumb items={${itemsStr}} />`;
  const schemaJSX = `      <BreadcrumbSchema items={${itemsStr}} baseUrl={domains.fr} />`;
  
  // Insert after <> or after return (
  const insertPoint = returnMatch.index + returnMatch[0].length;
  const before = content.substring(0, insertPoint);
  const after = content.substring(insertPoint);
  
  // Check if there's already a breadcrumb component or nav
  if (config.hasVisualBreadcrumb) {
    // Only add schema
    return before + '\n' + schemaJSX + '\n' + after;
  } else {
    // Add both
    return before + '\n' + schemaJSX + '\n' + breadcrumbJSX + '\n' + after;
  }
}

function processFile(filePath, config) {
  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  const hasBreadcrumbImport = /import.*Breadcrumb.*from.*@repo\/ui\/breadcrumb/.test(content);
  const hasSchemaImport = /import.*BreadcrumbSchema.*from.*@repo\/ui\/breadcrumb-schema/.test(content);
  const hasDomainsImport = /import.*domains.*from.*@repo\/data\/route-mapping/.test(content);
  
  const needsBreadcrumb = !config.hasVisualBreadcrumb && !hasBreadcrumbImport;
  const needsSchema = !hasSchemaImport;
  const needsDomains = !hasDomainsImport;
  
  if (!needsBreadcrumb && !needsSchema) {
    console.log(`✅ ${filePath} - déjà OK`);
    return;
  }
  
  // Add imports
  content = addImports(content, needsBreadcrumb, needsSchema, needsDomains);
  
  // Add JSX
  content = addBreadcrumbToJSX(content, config);
  
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`✅ ${filePath} - corrigé`);
}

// Process all files
console.log('🔧 Correction des breadcrumbs...\n');

for (const [filePath, config] of Object.entries(breadcrumbConfig)) {
  if (config.dynamic) {
    console.log(`⏭️  ${filePath} - skip (dynamique, à corriger manuellement)`);
    continue;
  }
  
  try {
    processFile(filePath, config);
  } catch (err) {
    console.error(`❌ ${filePath} - erreur:`, err.message);
  }
}

console.log('\n✅ Correction terminée !');
console.log('\nVérifiez avec: node audit-breadcrumbs.js');
