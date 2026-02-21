import fs from 'fs';

const BASE = 'https://cdm2026.fr';

const files = [
  // generateMetadata (static pages) - add alternates to return object
  { file: 'app/alcool-stades/page.tsx', type: 'genMeta', path: '/alcool-stades' },
  { file: 'app/assurance-voyage/page.tsx', type: 'genMeta', path: '/assurance-voyage' },
  { file: 'app/carte-sim-usa/page.tsx', type: 'genMeta', path: '/carte-sim-usa' },
  { file: 'app/comparateur-cotes/page.tsx', type: 'genMeta', path: '/comparateur-cotes' },
  { file: 'app/plan-du-site/equipes/page.tsx', type: 'genMeta', path: '/plan-du-site/equipes' },
  { file: 'app/plan-du-site/matchs/page.tsx', type: 'genMeta', path: '/plan-du-site/matchs' },
  { file: 'app/plan-du-site/page.tsx', type: 'genMeta', path: '/plan-du-site' },
  { file: 'app/plan-du-site/paris/page.tsx', type: 'genMeta', path: '/plan-du-site/paris' },
  { file: 'app/pourboires-usa/page.tsx', type: 'genMeta', path: '/pourboires-usa' },
  { file: 'app/regarder-cdm-au-travail/page.tsx', type: 'genMeta', path: '/regarder-cdm-au-travail' },

  // generateMetadata (dynamic pages) - add alternates with slug variable
  { file: 'app/cote-champion/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/ecrans-geants/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/effectif/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/guide-supporter/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/guide-ville/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/parier/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/securite/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },
  { file: 'app/sur-quelle-chaine/[slug]/page.tsx', type: 'genMetaDyn', slugExpr: null },

  // export const metadata - add alternates
  { file: 'app/billets/page.tsx', type: 'constMeta', path: '/billets' },
  { file: 'app/bonus/betclic/page.tsx', type: 'constMeta', path: '/bonus/betclic' },
  { file: 'app/bonus/page.tsx', type: 'constMeta', path: '/bonus' },
  { file: 'app/bonus/parionssport/page.tsx', type: 'constMeta', path: '/bonus/parionssport' },
  { file: 'app/bonus/unibet/page.tsx', type: 'constMeta', path: '/bonus/unibet' },
  { file: 'app/bonus/winamax/page.tsx', type: 'constMeta', path: '/bonus/winamax' },
  { file: 'app/calendrier/imprimer/page.tsx', type: 'constMeta', path: '/calendrier/imprimer' },
  { file: 'app/guide-paris/page.tsx', type: 'constMeta', path: '/guide-paris' },
  { file: 'app/meilleurs-bookmakers/page.tsx', type: 'constMeta', path: '/meilleurs-bookmakers' },
  { file: 'app/methodes-paiement/page.tsx', type: 'constMeta', path: '/methodes-paiement' },
  { file: 'app/ou-regarder/page.tsx', type: 'constMeta', path: '/ou-regarder' },
  { file: 'app/page.tsx', type: 'constMeta', path: '' },

  // No metadata - need special handling
  { file: 'app/admin/page.tsx', type: 'none', path: '/admin' },
  { file: 'app/calculateur-budget/page.tsx', type: 'none', path: '/calculateur-budget' },
  { file: 'app/comparateur-equipes/page.tsx', type: 'none', path: '/comparateur-equipes' },
  { file: 'app/profil/page.tsx', type: 'none', path: '/profil' },
  { file: 'app/pronostics/grille/page.tsx', type: 'none', path: '/pronostics/grille' },
  { file: 'app/quiz/drapeaux/page.tsx', type: 'none', path: '/quiz/drapeaux' },
  { file: 'app/quiz/stades/page.tsx', type: 'none', path: '/quiz/stades' },
  { file: 'app/quiz/supporter/page.tsx', type: 'none', path: '/quiz/supporter' },
  { file: 'app/simulateur-bracket/page.tsx', type: 'none', path: '/simulateur-bracket' },
];

let count = 0;

for (const entry of files) {
  let content = fs.readFileSync(entry.file, 'utf8');
  
  if (entry.type === 'genMeta') {
    // Find the return { in generateMetadata and add alternates
    // Look for the last property before closing }; of the return
    // Strategy: find `openGraph:` block end or last property, add alternates after
    const canonical = `${BASE}${entry.path}`;
    
    // Try to add alternates before the closing of the return object
    // Pattern: find the return statement's object and add alternates
    if (content.includes('openGraph:')) {
      // Add alternates after the openGraph block
      const ogMatch = content.match(/(openGraph:\s*\{[^}]*\},?\n)/);
      if (ogMatch) {
        const replacement = ogMatch[1].trimEnd().endsWith(',') ? ogMatch[1] : ogMatch[1].replace(/\n$/, ',\n');
        content = content.replace(ogMatch[1], replacement + `    alternates: { canonical: "${canonical}" },\n`);
      }
    } else {
      // No openGraph, add alternates after description
      const descMatch = content.match(/(description:\s*[^,]+,?\n)/);
      if (descMatch) {
        const replacement = descMatch[1].trimEnd().endsWith(',') ? descMatch[1] : descMatch[1].replace(/\n$/, ',\n');
        content = content.replace(descMatch[1], replacement + `    alternates: { canonical: "${canonical}" },\n`);
      }
    }
  } else if (entry.type === 'genMetaDyn') {
    // Dynamic pages - need to find the URL pattern used in openGraph
    const dirPath = entry.file.replace('/page.tsx', '').replace('app/', '').replace('/[slug]', '');
    
    // Find the openGraph url to understand what slug variable is used
    const urlMatch = content.match(/url:\s*`\$\{domains\.fr\}\/([\w-]+)\/\$\{([\w.]+)\}`/);
    if (urlMatch) {
      const slugVar = urlMatch[2]; // e.g., team.slug, slug, city.slug
      content = content.replace(
        /url:\s*`\$\{domains\.fr\}\/[\w-]+\/\$\{[\w.]+\}`,?\n/,
        (match) => {
          const m = match.trimEnd();
          const withComma = m.endsWith(',') ? m : m + ',';
          return withComma + `\n      },\n    alternates: { canonical: \`${BASE}/${dirPath}/\${${slugVar}}\` },\n`;
        }
      );
      // Remove the duplicate closing brace we just added - this approach is fragile
      // Let me use a simpler approach: just add alternates before the last };
    }
    
    // Simpler: just check if there's already alternates now
    if (!content.includes('alternates')) {
      // Find the openGraph url line and extract the slug expression
      const urlMatch2 = content.match(/url:\s*`\$\{domains\.fr\}\/([\w-]+)\/\$\{([\w.]+)\}`/);
      if (urlMatch2) {
        const slugVar = urlMatch2[2];
        // Add alternates after the openGraph closing brace
        // Find pattern: },\n  }; or },\n    };\n}
        // Actually let's find the openGraph block end and add after it
        const ogEndPattern = /(\s*url:\s*`[^`]+`,?\s*\n\s*\},?\s*\n)/;
        const ogEnd = content.match(ogEndPattern);
        if (ogEnd) {
          content = content.replace(ogEnd[0], ogEnd[0] + `    alternates: { canonical: \`${BASE}/${dirPath}/\${${slugVar}}\` },\n`);
        }
      }
    }
  } else if (entry.type === 'constMeta') {
    const canonical = `${BASE}${entry.path}`;
    // Find the last property in export const metadata and add alternates
    // Look for the closing }; of metadata or }: Metadata
    // Strategy: add before the closing of the metadata object
    
    // Find "export const metadata" block - add alternates
    if (content.includes('openGraph:')) {
      // Add after openGraph block
      // Find the openGraph closing
      const lines = content.split('\n');
      let braceCount = 0;
      let ogStart = -1;
      let ogEnd = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('openGraph:') || lines[i].includes('openGraph :')) {
          ogStart = i;
          braceCount = 0;
        }
        if (ogStart >= 0 && i >= ogStart) {
          for (const ch of lines[i]) {
            if (ch === '{') braceCount++;
            if (ch === '}') braceCount--;
          }
          if (braceCount === 0 && ogStart >= 0 && i > ogStart) {
            ogEnd = i;
            break;
          }
          if (braceCount === 0 && ogStart === i && lines[i].includes('}')) {
            ogEnd = i;
            break;
          }
        }
      }
      if (ogEnd >= 0) {
        const line = lines[ogEnd];
        const trimmed = line.trimEnd();
        if (!trimmed.endsWith(',')) {
          lines[ogEnd] = trimmed + ',';
        }
        lines.splice(ogEnd + 1, 0, `  alternates: { canonical: "${canonical}" },`);
        content = lines.join('\n');
      }
    } else {
      // Add after description line
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('description:') && !lines[i].includes('openGraph')) {
          // Find the end of description (could be multi-line)
          let j = i;
          while (j < lines.length && !lines[j].includes(',')) j++;
          const trimmed = lines[j].trimEnd();
          if (!trimmed.endsWith(',')) lines[j] = trimmed + ',';
          lines.splice(j + 1, 0, `  alternates: { canonical: "${canonical}" },`);
          content = lines.join('\n');
          break;
        }
      }
    }
  } else if (entry.type === 'none') {
    // No metadata at all - add export const metadata with Metadata import
    const canonical = `${BASE}${entry.path}`;
    if (!content.includes('import type { Metadata }') && !content.includes('import { Metadata }')) {
      // Add Metadata import
      if (content.startsWith('import')) {
        content = `import type { Metadata } from "next";\n` + content;
      } else {
        content = `import type { Metadata } from "next";\n\n` + content;
      }
    }
    // Add metadata export before the default export or first function/component
    const defaultExportMatch = content.match(/^(export default function|export default async function|function |const \w+ = )/m);
    if (defaultExportMatch) {
      const idx = content.indexOf(defaultExportMatch[0]);
      content = content.slice(0, idx) + `export const metadata: Metadata = {\n  alternates: { canonical: "${canonical}" },\n};\n\n` + content.slice(idx);
    }
  }
  
  fs.writeFileSync(entry.file, content);
  count++;
  console.log(`✅ ${entry.file}`);
}

console.log(`\nDone: ${count} files processed`);
