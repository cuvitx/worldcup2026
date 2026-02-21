import fs from 'fs';

const BASE = 'https://cdm2026.fr';

const pages = [
  { page: 'app/admin/page.tsx', layout: 'app/admin/layout.tsx', path: '/admin' },
  { page: 'app/calculateur-budget/page.tsx', layout: 'app/calculateur-budget/layout.tsx', path: '/calculateur-budget' },
  { page: 'app/comparateur-equipes/page.tsx', layout: 'app/comparateur-equipes/layout.tsx', path: '/comparateur-equipes' },
  { page: 'app/profil/page.tsx', layout: 'app/profil/layout.tsx', path: '/profil' },
  { page: 'app/pronostics/grille/page.tsx', layout: 'app/pronostics/grille/layout.tsx', path: '/pronostics/grille' },
  { page: 'app/quiz/drapeaux/page.tsx', layout: 'app/quiz/drapeaux/layout.tsx', path: '/quiz/drapeaux' },
  { page: 'app/quiz/stades/page.tsx', layout: 'app/quiz/stades/layout.tsx', path: '/quiz/stades' },
  { page: 'app/quiz/supporter/page.tsx', layout: 'app/quiz/supporter/layout.tsx', path: '/quiz/supporter' },
  { page: 'app/simulateur-bracket/page.tsx', layout: 'app/simulateur-bracket/layout.tsx', path: '/simulateur-bracket' },
];

for (const entry of pages) {
  // Remove metadata from page.tsx
  let pageContent = fs.readFileSync(entry.page, 'utf8');
  // Remove the import and metadata export we added
  pageContent = pageContent.replace(/import type \{ Metadata \} from "next";\n\n?/, '');
  pageContent = pageContent.replace(/export const metadata: Metadata = \{\n  alternates: \{ canonical: "[^"]*" \},\n\};\n\n?/, '');
  fs.writeFileSync(entry.page, pageContent);
  
  // Add canonical to layout.tsx
  let layoutContent = fs.readFileSync(entry.layout, 'utf8');
  if (layoutContent.includes('alternates') || layoutContent.includes('canonical')) {
    console.log(`⏭️  ${entry.layout} already has canonical`);
    continue;
  }
  
  if (layoutContent.includes('export const metadata')) {
    // Add alternates to existing metadata
    // Find closing }; of metadata
    const lines = layoutContent.split('\n');
    let braceCount = 0;
    let inMeta = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('export const metadata')) inMeta = true;
      if (inMeta) {
        for (const ch of lines[i]) {
          if (ch === '{') braceCount++;
          if (ch === '}') braceCount--;
        }
        if (braceCount === 0 && inMeta) {
          // Insert before this closing line
          const prev = lines[i - 1].trimEnd();
          if (!prev.endsWith(',') && !prev.endsWith('{')) {
            lines[i - 1] = lines[i - 1].trimEnd() + ',';
          }
          lines.splice(i, 0, `  alternates: { canonical: "${BASE}${entry.path}" },`);
          layoutContent = lines.join('\n');
          break;
        }
      }
    }
  } else {
    // No metadata in layout - add it
    if (!layoutContent.includes('import type { Metadata }')) {
      layoutContent = `import type { Metadata } from "next";\n` + layoutContent;
    }
    layoutContent = layoutContent.replace(
      'export default function',
      `export const metadata: Metadata = {\n  alternates: { canonical: "${BASE}${entry.path}" },\n};\n\nexport default function`
    );
  }
  
  fs.writeFileSync(entry.layout, layoutContent);
  console.log(`✅ ${entry.layout}`);
}
