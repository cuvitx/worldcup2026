#!/usr/bin/env node
/**
 * Download missing player photos from Wikipedia/Wikimedia Commons.
 *
 * - Reads all players from packages/data/src/players.ts
 * - Checks which ones already have photos in public/images/players/
 * - Fetches thumbnails from Wikipedia API for missing players
 * - Saves as 400px JPG/PNG
 * - Updates apps/fr/lib/player-images.ts mapping
 *
 * Usage:
 *   node scripts/download-missing-photos.mjs              # download all missing
 *   node scripts/download-missing-photos.mjs --dry-run    # preview only
 *   node scripts/download-missing-photos.mjs --team france # specific team
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "apps/fr/public/images/players");
const PLAYER_IMAGES_TS = path.join(ROOT, "apps/fr/lib/player-images.ts");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const TEAM_FILTER = args.includes("--team") ? args[args.indexOf("--team") + 1] : null;

// Rate limit: Wikipedia asks for polite usage, 200ms is fine for low volume
const DELAY_MS = 250;

function log(msg) {
  console.log(`[photos] ${msg}`);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Build Wikipedia article name from player name */
function guessWikiName(name) {
  // Common patterns: "Kylian Mbappé" → "Kylian Mbappé"
  // For disambiguation, we'd need a manual mapping, but most work as-is
  return name;
}

/** Slugify a name for filename */
function slugifyName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Extract all players from the TypeScript source */
function getAllPlayers() {
  const raw = fs.readFileSync(path.join(ROOT, "packages/data/src/players.ts"), "utf8");
  const players = [];
  const regex = /{\s*\n\s*id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*teamId:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    players.push({ id: m[1], name: m[2], slug: m[3], teamId: m[4] });
  }
  return players;
}

/** Get existing photos */
function getExistingPhotos() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    return new Set();
  }
  const files = fs.readdirSync(IMAGES_DIR);
  return new Set(files.map((f) => f.replace(/\.(jpg|png|webp)$/, "")));
}

/** Get existing mapping from player-images.ts */
function getExistingMapping() {
  const raw = fs.readFileSync(PLAYER_IMAGES_TS, "utf8");
  const map = {};
  const regex = /["']?([^"']+)["']?\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    map[m[1]] = m[2];
  }
  return map;
}

/** Fetch Wikipedia thumbnail for a player */
async function fetchWikiThumbnail(playerName) {
  const encoded = encodeURIComponent(playerName);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "CDM2026Bot/1.0 (https://cdm2026.fr)" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    // Prefer original image, fall back to thumbnail
    return data.originalimage?.source || data.thumbnail?.source || null;
  } catch {
    return null;
  }
}

/** Download image to local file */
async function downloadImage(imageUrl, destPath) {
  try {
    const res = await fetch(imageUrl, {
      headers: { "User-Agent": "CDM2026Bot/1.0 (https://cdm2026.fr)" },
    });
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 1000) return false; // too small, probably error
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  log(`Starting photo download (${DRY_RUN ? "DRY RUN" : "LIVE"})...`);

  const players = getAllPlayers();
  const existingPhotos = getExistingPhotos();
  const existingMapping = getExistingMapping();

  log(`Total players: ${players.length}`);
  log(`Existing photos: ${existingPhotos.size}`);

  // Filter to players without photos
  let missing = players.filter((p) => {
    const filename = existingMapping[p.id] || existingMapping[p.slug] || slugifyName(p.name);
    return !existingPhotos.has(filename);
  });

  if (TEAM_FILTER) {
    missing = missing.filter((p) => p.teamId === TEAM_FILTER);
    log(`Filtered to team: ${TEAM_FILTER} (${missing.length} missing)`);
  }

  log(`Missing photos: ${missing.length}`);

  if (DRY_RUN) {
    missing.slice(0, 20).forEach((p) => log(`  Would download: ${p.name} (${p.teamId})`));
    if (missing.length > 20) log(`  ... and ${missing.length - 20} more`);
    return;
  }

  let downloaded = 0;
  let failed = 0;
  const newMappings = [];

  for (const player of missing) {
    const wikiName = guessWikiName(player.name);
    const filename = slugifyName(player.name);
    const ext = ".jpg";

    log(`  ${player.name} (${player.teamId})...`);
    const imageUrl = await fetchWikiThumbnail(wikiName);

    if (!imageUrl) {
      log(`    ✗ No Wikipedia image found`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    // Determine file extension from URL
    const actualExt = imageUrl.match(/\.(jpg|jpeg|png|webp|svg)/i)?.[1] || "jpg";
    const destPath = path.join(IMAGES_DIR, `${filename}.${actualExt}`);

    const ok = await downloadImage(imageUrl, destPath);
    if (ok) {
      log(`    ✓ Saved ${filename}.${actualExt}`);
      downloaded++;
      newMappings.push({ id: player.id, slug: player.slug, filename });
    } else {
      log(`    ✗ Download failed`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  // Update player-images.ts with new mappings
  if (newMappings.length > 0) {
    let raw = fs.readFileSync(PLAYER_IMAGES_TS, "utf8");
    const insertBefore = "\n};\n";
    const insertPoint = raw.lastIndexOf(insertBefore);
    if (insertPoint > -1) {
      const newEntries = newMappings
        .map((m) => `  "${m.id}": "${m.filename}",`)
        .join("\n");
      raw = raw.slice(0, insertPoint) + "\n\n  // Auto-downloaded " + new Date().toISOString().slice(0, 10) + "\n" + newEntries + raw.slice(insertPoint);
      fs.writeFileSync(PLAYER_IMAGES_TS, raw, "utf8");
      log(`\n✓ Updated player-images.ts with ${newMappings.length} new entries`);
    }
  }

  log(`\n=== Done ===`);
  log(`Downloaded: ${downloaded}`);
  log(`Failed: ${failed}`);
  log(`Already had: ${existingPhotos.size}`);
}

main().catch((err) => {
  console.error("[photos] Fatal error:", err);
  process.exit(1);
});
