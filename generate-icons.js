// Génère les icônes PNG pour PWA + Apple + OG via sharp
// Run depuis: node generate-icons.js (avec sharp dispo dans apps/en)
const path = require('path');
const fs = require('fs');

// Use sharp from monorepo root node_modules
const sharp = require('/data/.openclaw/workspace/worldcup2026/node_modules/sharp');

const publicDir = '/data/.openclaw/workspace/worldcup2026/apps/fr/public';

// SVG icon for icon-192, icon-512, apple-touch-icon
const iconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <radialGradient id="ballGrad" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </radialGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  
  <!-- Background rounded square -->
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#bg)"/>
  
  <!-- Decorative subtle dots -->
  <circle cx="${size*0.15}" cy="${size*0.15}" r="${size*0.04}" fill="#3b82f6" opacity="0.3"/>
  <circle cx="${size*0.85}" cy="${size*0.15}" r="${size*0.04}" fill="#3b82f6" opacity="0.3"/>
  <circle cx="${size*0.15}" cy="${size*0.85}" r="${size*0.04}" fill="#3b82f6" opacity="0.3"/>
  <circle cx="${size*0.85}" cy="${size*0.85}" r="${size*0.04}" fill="#3b82f6" opacity="0.3"/>

  <!-- Football (soccer ball) - centered top portion -->
  <g transform="translate(${size*0.5}, ${size*0.44})">
    <circle cx="0" cy="0" r="${size*0.28}" fill="url(#ballGrad)" stroke="#94a3b8" stroke-width="${size*0.008}"/>
    <!-- Center pentagon -->
    <polygon points="0,${-size*0.16} ${size*0.09},${-size*0.05} ${size*0.056},${size*0.09} ${-size*0.056},${size*0.09} ${-size*0.09},${-size*0.05}" fill="#1e293b"/>
    <!-- Side patches -->
    <polygon points="${-size*0.22},${-size*0.08} ${-size*0.12},${-size*0.05} ${-size*0.056},${size*0.09} ${-size*0.165},${size*0.105} ${-size*0.245},${size*0.04}" fill="#1e293b"/>
    <polygon points="${size*0.22},${-size*0.08} ${size*0.12},${-size*0.05} ${size*0.056},${size*0.09} ${size*0.165},${size*0.105} ${size*0.245},${size*0.04}" fill="#1e293b"/>
    <polygon points="${-size*0.25},${-size*0.1} ${-size*0.19},${-size*0.19} ${-size*0.09},${-size*0.19} ${-size*0.09},${-size*0.05} ${-size*0.22},${-size*0.08}" fill="#1e293b" opacity="0"/>
    <!-- Top patches -->
    <polygon points="0,${-size*0.16} ${-size*0.09},${-size*0.22} ${-size*0.19},${-size*0.13} ${-size*0.12},${-size*0.05} ${size*0.0},${-size*0.16}" fill="#1e293b" opacity="0"/>
  </g>

  <!-- "CDM" text -->
  <text x="${size*0.5}" y="${size*0.79}" text-anchor="middle"
        font-family="Arial Black, Impact, sans-serif"
        font-weight="900" font-size="${size*0.16}" fill="white" letter-spacing="${size*0.008}">CDM</text>

  <!-- "2026" text with gold color -->
  <text x="${size*0.5}" y="${size*0.94}" text-anchor="middle"
        font-family="Arial Black, Impact, sans-serif"
        font-weight="900" font-size="${size*0.13}" fill="#fbbf24" letter-spacing="${size*0.01}">2026</text>
</svg>
`;

// OG image SVG (1200×630)
const ogSvg = fs.readFileSync(`${publicDir}/og-default.svg`, 'utf8');

async function generate() {
  console.log('Generating PNG icons with sharp...');
  
  // icon-192.png
  await sharp(Buffer.from(iconSvg(192)))
    .png()
    .toFile(`${publicDir}/icon-192.png`);
  console.log('✓ icon-192.png');

  // icon-512.png
  await sharp(Buffer.from(iconSvg(512)))
    .png()
    .toFile(`${publicDir}/icon-512.png`);
  console.log('✓ icon-512.png');

  // apple-touch-icon.png (180x180)
  await sharp(Buffer.from(iconSvg(180)))
    .png()
    .toFile(`${publicDir}/apple-touch-icon.png`);
  console.log('✓ apple-touch-icon.png');

  // og-default.jpg (from SVG)
  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(`${publicDir}/og-default.jpg`);
  console.log('✓ og-default.jpg');

  console.log('\nAll icons generated successfully!');
  
  // Print file sizes
  const files = ['icon-192.png', 'icon-512.png', 'apple-touch-icon.png', 'og-default.jpg'];
  for (const f of files) {
    const stat = fs.statSync(`${publicDir}/${f}`);
    console.log(`  ${f}: ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

generate().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
