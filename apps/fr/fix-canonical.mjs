import fs from 'fs';

const BASE = 'https://cdm2026.fr';

// Pages that still need canonical (genMeta static that the first script missed)
const genMetaStatic = [
  { file: 'app/alcool-stades/page.tsx', path: '/alcool-stades' },
  { file: 'app/assurance-voyage/page.tsx', path: '/assurance-voyage' },
  { file: 'app/carte-sim-usa/page.tsx', path: '/carte-sim-usa' },
  { file: 'app/comparateur-cotes/page.tsx', path: '/comparateur-cotes' },
  { file: 'app/plan-du-site/equipes/page.tsx', path: '/plan-du-site/equipes' },
  { file: 'app/plan-du-site/matchs/page.tsx', path: '/plan-du-site/matchs' },
  { file: 'app/plan-du-site/page.tsx', path: '/plan-du-site' },
  { file: 'app/plan-du-site/paris/page.tsx', path: '/plan-du-site/paris' },
  { file: 'app/pourboires-usa/page.tsx', path: '/pourboires-usa' },
  { file: 'app/regarder-cdm-au-travail/page.tsx', path: '/regarder-cdm-au-travail' },
];

const genMetaDyn = [
  { file: 'app/cote-champion/[slug]/page.tsx', base: '/cote-champion' },
  { file: 'app/ecrans-geants/[slug]/page.tsx', base: '/ecrans-geants' },
  { file: 'app/effectif/[slug]/page.tsx', base: '/effectif' },
  { file: 'app/guide-supporter/[slug]/page.tsx', base: '/guide-supporter' },
  { file: 'app/guide-ville/[slug]/page.tsx', base: '/guide-ville' },
  { file: 'app/parier/[slug]/page.tsx', base: '/parier' },
  { file: 'app/securite/[slug]/page.tsx', base: '/securite' },
  { file: 'app/sur-quelle-chaine/[slug]/page.tsx', base: '/sur-quelle-chaine' },
];

function addAlternatesBeforeReturnClose(content, alternatesLine) {
  // Find the return { ... }; in generateMetadata and add alternates before the closing
  // Strategy: find "  };" that closes the return statement
  const lines = content.split('\n');
  let inGenMeta = false;
  let returnBraceCount = 0;
  let inReturn = false;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('generateMetadata')) inGenMeta = true;
    if (inGenMeta && lines[i].trim().startsWith('return {')) {
      inReturn = true;
      returnBraceCount = 0;
    }
    if (inReturn) {
      for (const ch of lines[i]) {
        if (ch === '{') returnBraceCount++;
        if (ch === '}') returnBraceCount--;
      }
      if (returnBraceCount === 0) {
        // This line closes the return object - insert alternates before it
        // Make sure previous line has comma
        const prev = lines[i - 1].trimEnd();
        if (!prev.endsWith(',') && !prev.endsWith('{')) {
          lines[i - 1] = lines[i - 1].trimEnd() + ',';
        }
        lines.splice(i, 0, alternatesLine);
        return lines.join('\n');
      }
    }
  }
  return content;
}

let count = 0;

for (const entry of genMetaStatic) {
  let content = fs.readFileSync(entry.file, 'utf8');
  if (content.includes('alternates')) { console.log(`⏭️  ${entry.file} (already has)`); continue; }
  const alt = `    alternates: { canonical: "${BASE}${entry.path}" },`;
  content = addAlternatesBeforeReturnClose(content, alt);
  fs.writeFileSync(entry.file, content);
  count++;
  console.log(`✅ ${entry.file}`);
}

for (const entry of genMetaDyn) {
  let content = fs.readFileSync(entry.file, 'utf8');
  if (content.includes('alternates')) { console.log(`⏭️  ${entry.file} (already has)`); continue; }
  
  // Find the slug variable used in openGraph url
  const urlMatch = content.match(/url:\s*`[^`]*\/([^/`]+)\$\{([^}]+)\}`/);
  let slugVar = 'slug';
  if (urlMatch) slugVar = urlMatch[2];
  
  const alt = `    alternates: { canonical: \`${BASE}${entry.base}/\${${slugVar}}\` },`;
  content = addAlternatesBeforeReturnClose(content, alt);
  fs.writeFileSync(entry.file, content);
  count++;
  console.log(`✅ ${entry.file}`);
}

console.log(`\nFixed: ${count} files`);
