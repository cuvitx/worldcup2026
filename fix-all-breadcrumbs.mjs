#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BREADCRUMB_CONFIG = {
  'apps/fr/app/buteurs/page.tsx': [{name:"Accueil",url:"/"},{name:"Buteurs",url:"/buteurs"}],
  'apps/fr/app/calendrier/imprimer/page.tsx': [{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"},{name:"Imprimer",url:"/calendrier/imprimer"}],
  'apps/fr/app/contact/page.tsx': [{name:"Accueil",url:"/"},{name:"Contact",url:"/contact"}],
  'apps/fr/app/equipes/page.tsx': [{name:"Accueil",url:"/"},{name:"Équipes",url:"/equipes"}],
  'apps/fr/app/faq/page.tsx': [{name:"Accueil",url:"/"},{name:"FAQ",url:"/faq"}],
  'apps/fr/app/groupes/page.tsx': [{name:"Accueil",url:"/"},{name:"Groupes",url:"/groupes"}],
  'apps/fr/app/guide/guide-visa-esta/page.tsx': [{name:"Accueil",url:"/"},{name:"Guide",url:"/guides"},{name:"Guide Visa ESTA",url:"/guide/guide-visa-esta"}],
  'apps/fr/app/guides/page.tsx': [{name:"Accueil",url:"/"},{name:"Guides",url:"/guides"}],
  'apps/fr/app/joueurs/page.tsx': [{name:"Accueil",url:"/"},{name:"Joueurs",url:"/joueurs"}],
  'apps/fr/app/match/aujourdhui/page.tsx': [{name:"Accueil",url:"/"},{name:"Matchs",url:"/match/calendrier"},{name:"Aujourd'hui",url:"/match/aujourdhui"}],
  'apps/fr/app/match/calendrier/page.tsx': [{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"}],
  'apps/fr/app/mentions-legales/page.tsx': [{name:"Accueil",url:"/"},{name:"Mentions légales",url:"/mentions-legales"}],
  'apps/fr/app/methodologie/page.tsx': [{name:"Accueil",url:"/"},{name:"Méthodologie",url:"/methodologie"}],
  'apps/fr/app/newsletter/page.tsx': [{name:"Accueil",url:"/"},{name:"Newsletter",url:"/newsletter"}],
  'apps/fr/app/ou-regarder/page.tsx': [{name:"Accueil",url:"/"},{name:"Où regarder",url:"/ou-regarder"}],
  'apps/fr/app/palmares/page.tsx': [{name:"Accueil",url:"/"},{name:"Palmarès",url:"/palmares"}],
  'apps/fr/app/paris-sportifs/page.tsx': [{name:"Accueil",url:"/"},{name:"Paris sportifs",url:"/paris-sportifs"}],
  'apps/fr/app/pronostic-vainqueur/page.tsx': [{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Vainqueur",url:"/pronostic-vainqueur"}],
  'apps/fr/app/pronostics/grille/page.tsx': [{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Grille",url:"/pronostics/grille"}],
  'apps/fr/app/pronostics/leaderboard/page.tsx': [{name:"Accueil",url:"/"},{name:"Pronostics",url:"/pronostic"},{name:"Classement",url:"/pronostics/leaderboard"}],
  'apps/fr/app/stades/page.tsx': [{name:"Accueil",url:"/"},{name:"Stades",url:"/stades"}],
  'apps/fr/app/villes/page.tsx': [{name:"Accueil",url:"/"},{name:"Villes",url:"/villes"}],
  
  // Pages sans breadcrumb du tout
  'apps/fr/app/simulateur/page.tsx': [{name:"Accueil",url:"/"},{name:"Simulateur",url:"/simulateur"}],
  'apps/fr/app/quiz/page.tsx': [{name:"Accueil",url:"/"},{name:"Quiz",url:"/quiz"}],
  'apps/fr/app/live/page.tsx': [{name:"Accueil",url:"/"},{name:"Live",url:"/live"}],
  'apps/fr/app/profil/page.tsx': [{name:"Accueil",url:"/"},{name:"Profil",url:"/profil"}],
  'apps/fr/app/admin/page.tsx': [{name:"Accueil",url:"/"},{name:"Admin",url:"/admin"}],
  'apps/fr/app/carte-stades/page.tsx': [{name:"Accueil",url:"/"},{name:"Carte des stades",url:"/carte-stades"}],
  'apps/fr/app/comparateur-cotes/page.tsx': [{name:"Accueil",url:"/"},{name:"Comparateur de cotes",url:"/comparateur-cotes"}],
  'apps/fr/app/comparateur-joueurs/page.tsx': [{name:"Accueil",url:"/"},{name:"Comparateur de joueurs",url:"/comparateur-joueurs"}],
  'apps/fr/app/guide/glossaire/page.tsx': [{name:"Accueil",url:"/"},{name:"Guide",url:"/guides"},{name:"Glossaire",url:"/guide/glossaire"}],
};

function fixPage(filePath, breadcrumbItems) {
  const fullPath = path.join(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf-8');
  let modified = false;
  
  const hasSchemaImport = /import.*BreadcrumbSchema/.test(content);
  const hasBreadcrumbImport = /import { Breadcrumb }/.test(content);
  const hasDomainsImport = /import.*domains.*from.*@repo\/data\/route-mapping/.test(content);
  const hasSchemaJSX = /<BreadcrumbSchema/.test(content);
  const hasBreadcrumbJSX = /<Breadcrumb/.test(content);
  
  // Si déjà schema, skip
  if (hasSchemaJSX) {
    console.log(`⏭️  ${filePath} - déjà OK`);
    return;
  }
  
  // 1. Ajouter les imports manquants
  if (!hasSchemaImport || !hasDomainsImport || (!hasBreadcrumbImport && !hasBreadcrumbJSX)) {
    const lines = content.split('\n');
    
    // Trouver le dernier import
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        lastImportIndex = i;
      }
    }
    
    const newImports = [];
    if (!hasSchemaImport) {
      newImports.push('import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";');
    }
    if (!hasDomainsImport) {
      newImports.push('import { domains } from "@repo/data/route-mapping";');
    }
    if (!hasBreadcrumbImport && !hasBreadcrumbJSX) {
      newImports.push('import { Breadcrumb } from "@repo/ui/breadcrumb";');
    }
    
    if (newImports.length > 0 && lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, ...newImports);
      content = lines.join('\n');
      modified = true;
    }
  }
  
  // 2. Ajouter le schema JSX
  const itemsStr = JSON.stringify(breadcrumbItems);
  const schemaLine = `      <BreadcrumbSchema items={${itemsStr}} baseUrl={domains.fr} />`;
  
  // Chercher "return (\n" ou "return (<>\n"
  const returnRegex = /(\n {2}return \(\n( {4}<>\n)?)/;
  const match = content.match(returnRegex);
  
  if (match) {
    const insertPos = match.index + match[0].length;
    content = content.slice(0, insertPos) + schemaLine + '\n' + content.slice(insertPos);
    modified = true;
    
    // Si pas de breadcrumb visuel, ajouter aussi
    if (!hasBreadcrumbJSX) {
      const breadcrumbVisualItems = breadcrumbItems.map((item, i) => ({
        label: item.name,
        ...(i < breadcrumbItems.length - 1 ? { href: item.url } : {})
      }));
      const breadcrumbItemsStr = JSON.stringify(breadcrumbVisualItems, null, 10)
        .replace(/\n {10}/g, '\n          ');
      const breadcrumbLine = `      <Breadcrumb items={${breadcrumbItemsStr}} />`;
      
      const schemaPos = content.indexOf(schemaLine);
      const afterSchema = schemaPos + schemaLine.length;
      content = content.slice(0, afterSchema) + '\n' + breadcrumbLine + content.slice(afterSchema);
    }
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`✅ ${filePath}`);
  } else {
    console.log(`⚠️  ${filePath} - pas modifié`);
  }
}

console.log('🔧 Correction des breadcrumbs...\n');

let count = 0;
for (const [filePath, items] of Object.entries(BREADCRUMB_CONFIG)) {
  try {
    fixPage(filePath, items);
    count++;
  } catch (err) {
    console.error(`❌ ${filePath}:`, err.message);
  }
}

console.log(`\n✅ ${count} pages traitées !`);
console.log('\nVérification finale : node audit-breadcrumbs.js');
