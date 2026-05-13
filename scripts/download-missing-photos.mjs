#!/usr/bin/env node
/**
 * Download missing player photos from Wikipedia + TheSportsDB (fallback).
 *
 * Strategy:
 *   1. Wikipedia page/summary API → thumbnail (free, CC license)
 *   2. TheSportsDB searchplayers API → cutout/thumb (free tier)
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
const TEAM_FILTER = args.includes("--team")
  ? args[args.indexOf("--team") + 1]
  : null;

const DELAY_MS = 300;
const UA = "CDM2026Bot/1.0 (https://cdm2026.fr)";

function log(msg) {
  console.log(`[photos] ${msg}`);
}
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function slugifyName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getAllPlayers() {
  const raw = fs.readFileSync(
    path.join(ROOT, "packages/data/src/players.ts"),
    "utf8"
  );
  const players = [];
  const regex =
    /{\s*\n\s*id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*slug:\s*"([^"]+)",\s*\n\s*teamId:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    players.push({ id: m[1], name: m[2], slug: m[3], teamId: m[4] });
  }
  return players;
}

function getExistingPhotos() {
  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    return new Set();
  }
  return new Set(
    fs.readdirSync(IMAGES_DIR).map((f) => f.replace(/\.(jpg|jpeg|png|webp|JPG|svg)$/, ""))
  );
}

function getExistingMapping() {
  const raw = fs.readFileSync(PLAYER_IMAGES_TS, "utf8");
  const map = {};
  const regex = /["']?([^"'\s:]+)["']?\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    map[m[1]] = m[2];
  }
  return map;
}

// ─── Source 1: Wikipedia ─────────────────────────────────────────────────────

async function fetchFromWikipedia(playerName) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(playerName)}`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.originalimage?.source || data.thumbnail?.source || null;
  } catch {
    return null;
  }
}

// ─── Source 2: TheSportsDB ───────────────────────────────────────────────────

async function fetchFromSportsDB(playerName) {
  try {
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`;
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (!res.ok) return null;
    const data = await res.json();
    const p = data.player?.[0];
    if (!p) return null;
    // Prefer cutout (transparent bg), then thumb
    return p.strCutout || p.strThumb || null;
  } catch {
    return null;
  }
}

// ─── Download image ──────────────────────────────────────────────────────────

async function downloadImage(imageUrl, destPath) {
  try {
    const res = await fetch(imageUrl, {
      headers: { "User-Agent": UA },
      redirect: "follow",
    });
    if (!res.ok) return false;
    const buffer = Buffer.from(await res.arrayBuffer());
    if (buffer.length < 500) return false;
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch {
    return false;
  }
}

function getExtFromUrl(url) {
  const m = url.match(/\.(jpg|jpeg|png|webp|svg)/i);
  return m ? m[1].toLowerCase() : "jpg";
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  log(`Starting photo download (${DRY_RUN ? "DRY RUN" : "LIVE"})...`);

  const players = getAllPlayers();
  const existingPhotos = getExistingPhotos();
  const existingMapping = getExistingMapping();

  let missing = players.filter((p) => {
    const filename =
      existingMapping[p.id] || existingMapping[p.slug] || slugifyName(p.name);
    return !existingPhotos.has(filename);
  });

  if (TEAM_FILTER) {
    missing = missing.filter((p) => p.teamId === TEAM_FILTER);
    log(`Filtered to team: ${TEAM_FILTER}`);
  }

  log(`Total: ${players.length} | Existing: ${existingPhotos.size} | Missing: ${missing.length}`);

  if (DRY_RUN) {
    missing.slice(0, 10).forEach((p) => log(`  ${p.name} (${p.teamId})`));
    if (missing.length > 10) log(`  ... +${missing.length - 10} more`);
    return;
  }

  let wiki = 0,
    sportsdb = 0,
    failed = 0;
  const newMappings = [];

  for (let i = 0; i < missing.length; i++) {
    const player = missing[i];
    const filename = slugifyName(player.name);
    const progress = `[${i + 1}/${missing.length}]`;

    // Try Wikipedia first
    let imageUrl = await fetchFromWikipedia(player.name);
    let source = "wiki";

    // Fallback to TheSportsDB
    if (!imageUrl) {
      await sleep(DELAY_MS);
      imageUrl = await fetchFromSportsDB(player.name);
      source = "sportsdb";
    }

    if (!imageUrl) {
      log(`  ${progress} ✗ ${player.name} (${player.teamId}) — no image`);
      failed++;
      await sleep(DELAY_MS);
      continue;
    }

    const ext = getExtFromUrl(imageUrl);
    const destPath = path.join(IMAGES_DIR, `${filename}.${ext}`);
    const ok = await downloadImage(imageUrl, destPath);

    if (ok) {
      if (source === "wiki") wiki++;
      else sportsdb++;
      newMappings.push({ id: player.id, slug: player.slug, filename });
      if ((wiki + sportsdb) % 50 === 0) {
        log(`  ${progress} ✓ ${player.name} [${source}] — ${wiki + sportsdb} total`);
      }
    } else {
      failed++;
    }

    await sleep(DELAY_MS);
  }

  // Update player-images.ts
  if (newMappings.length > 0) {
    let raw = fs.readFileSync(PLAYER_IMAGES_TS, "utf8");
    const insertBefore = "\n};\n";
    const insertPoint = raw.lastIndexOf(insertBefore);
    if (insertPoint > -1) {
      const newEntries = newMappings
        .map((m) => `  "${m.id}": "${m.filename}",`)
        .join("\n");
      raw =
        raw.slice(0, insertPoint) +
        "\n\n  // Auto-downloaded " +
        new Date().toISOString().slice(0, 10) +
        "\n" +
        newEntries +
        raw.slice(insertPoint);
      fs.writeFileSync(PLAYER_IMAGES_TS, raw, "utf8");
    }
  }

  log(`\n=== Done ===`);
  log(`Wikipedia: ${wiki} | TheSportsDB: ${sportsdb} | Failed: ${failed}`);
  log(`Total photos: ${existingPhotos.size + wiki + sportsdb}`);
}

main().catch((err) => {
  console.error("[photos] Fatal:", err);
  process.exit(1);
});
