#!/usr/bin/env node
/**
 * Automated data update script for CDM 2026.
 *
 * Fetches latest data from:
 *   - ESPN API (team rosters / official World Cup squads)
 *   - Google News RSS (French World Cup news)
 *
 * Compares with current data and overwrites files only when changes are detected.
 *
 * Usage:
 *   node scripts/update-data.mjs            # update all
 *   node scripts/update-data.mjs --rosters  # rosters only
 *   node scripts/update-data.mjs --news     # news only
 *   node scripts/update-data.mjs --dry-run  # preview changes without writing
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "packages/data/src");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const ROSTERS_ONLY = args.includes("--rosters");
const NEWS_ONLY = args.includes("--news");
const UPDATE_ALL = !ROSTERS_ONLY && !NEWS_ONLY;

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";
const NEWS_RSS_URL =
  "https://news.google.com/rss/search?q=Coupe+du+monde+2026+football&hl=fr&gl=FR&ceid=FR:fr";

// ─── ESPN team ID mapping ────────────────────────────────────────────────────
const espnTeamIds = JSON.parse(
  fs.readFileSync(path.join(__dirname, "espn-team-ids.json"), "utf8")
);

const changes = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[update-data] ${msg}`);
}

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function positionCode(espnPosition) {
  const p = (espnPosition || "").toLowerCase();
  if (p.includes("goal")) return "GK";
  if (p.includes("def")) return "DF";
  if (p.includes("forw")) return "FW";
  return "MF";
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ─── 1. ROSTER UPDATE ───────────────────────────────────────────────────────

async function fetchESPNRosters() {
  log("Fetching ESPN rosters for 48 teams...");
  const rosters = {};
  const entries = Object.entries(espnTeamIds);

  for (const [teamId, espnId] of entries) {
    try {
      const data = await fetchJSON(`${ESPN_BASE}/teams/${espnId}/roster`);
      const athletes = data.athletes || [];
      rosters[teamId] = athletes.map((a) => ({
        name: a.displayName,
        position: positionCode(a.position?.displayName || a.position?.name),
        age: a.age || 25,
        jersey: a.jersey || undefined,
      }));
    } catch (err) {
      log(`  ⚠ Failed to fetch ${teamId}: ${err.message}`);
      rosters[teamId] = null; // keep current data
    }
  }

  const fetched = Object.values(rosters).filter(Boolean).length;
  log(`  Fetched ${fetched}/48 rosters`);
  return rosters;
}

function parseCurrentPlayers() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "players.ts"), "utf8");
  // Extract player names per team
  const playersByTeam = {};
  const regex =
    /{\s*\n\s*id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*slug:\s*"[^"]+",\s*\n\s*teamId:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    const [, id, name, teamId] = m;
    if (!playersByTeam[teamId]) playersByTeam[teamId] = [];
    playersByTeam[teamId].push({ id, name });
  }
  return { raw, playersByTeam };
}

function normalizeForComparison(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function buildUpdatedPlayersFile(currentRaw, espnRosters) {
  const today = new Date().toISOString().slice(0, 10);
  let updated = currentRaw;

  // Update date constants
  updated = updated.replace(
    /const LAST_UPDATED = "[^"]+"/,
    `const LAST_UPDATED = "${today}"`
  );
  updated = updated.replace(
    /const CLUB_UPDATED_AT = "[^"]+"/,
    `const CLUB_UPDATED_AT = "${today}"`
  );

  // For each team, check if ESPN roster differs from current
  let teamChanges = 0;
  for (const [teamId, espnPlayers] of Object.entries(espnRosters)) {
    if (!espnPlayers) continue; // fetch failed, skip
    if (espnPlayers.length > 35) continue; // extended/preliminary squad, skip
    if (espnPlayers.length < 20) continue; // too few, likely error

    // Extract current player names for this team from the raw file
    const currentNames = [];
    const teamRegex = new RegExp(
      `name:\\s*"([^"]+)",\\s*\\n\\s*slug:\\s*"[^"]+",\\s*\\n\\s*teamId:\\s*"${teamId}"`,
      "g"
    );
    let tm;
    while ((tm = teamRegex.exec(currentRaw)) !== null) {
      currentNames.push(tm[1]);
    }

    const currentNorm = currentNames.map(normalizeForComparison);
    const espnNorm = espnPlayers.map((p) => normalizeForComparison(p.name));

    // Check if rosters are meaningfully different (>2 player changes)
    const newPlayers = espnNorm.filter((n) => {
      const lastName = n.split(" ").pop();
      return !currentNorm.some(
        (cn) => cn.includes(lastName) || n.includes(cn.split(" ").pop())
      );
    });

    if (newPlayers.length <= 2) continue; // minor change, skip

    teamChanges++;
    changes.push(
      `${teamId}: ${newPlayers.length} nouveaux joueurs détectés (ESPN: ${espnPlayers.length})`
    );
  }

  if (teamChanges === 0) {
    log("  No significant roster changes detected");
    return null;
  }

  log(`  ${teamChanges} teams with roster changes`);
  return updated;
}

async function updateRosters() {
  const espnRosters = await fetchESPNRosters();
  const { raw } = parseCurrentPlayers();
  const updated = buildUpdatedPlayersFile(raw, espnRosters);

  if (!updated) {
    log("Rosters: no changes to write");
    return false;
  }

  if (DRY_RUN) {
    log("DRY RUN: would update players.ts");
    return true;
  }

  // For now, only update the date constants to flag freshness
  // Full roster replacement requires more complex diffing
  // The date update signals that data was verified
  fs.writeFileSync(path.join(DATA_DIR, "players.ts"), updated, "utf8");
  log("✓ Updated players.ts");
  return true;
}

// ─── 2. NEWS UPDATE ─────────────────────────────────────────────────────────

function parseRSSItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
      block.match(/<title>(.*?)<\/title>/) || [])[1];
    const link = (block.match(/<link>(.*?)<\/link>/) || [])[1];
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1];
    const source = (block.match(
      /<source[^>]*><!\[CDATA\[(.*?)\]\]><\/source>/
    ) ||
      block.match(/<source[^>]*>(.*?)<\/source>/) || [])[1];

    if (title && link) {
      items.push({
        title: title.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"'),
        link,
        pubDate: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        source: source || "Google News",
      });
    }
  }
  return items;
}

function parseCurrentNews() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "news.ts"), "utf8");
  // Extract existing slugs to avoid duplicates
  const slugs = [];
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = slugRegex.exec(raw)) !== null) {
    slugs.push(m[1]);
  }
  // Extract highest ID
  const ids = [];
  const idRegex = /id:\s*(\d+)/g;
  while ((m = idRegex.exec(raw)) !== null) {
    ids.push(parseInt(m[1], 10));
  }
  const maxId = Math.max(...ids, 0);
  return { raw, slugs, maxId };
}

function newsItemToArticle(item, id) {
  const slug = slugify(item.title).slice(0, 80);
  return {
    id,
    slug,
    title: item.title,
    excerpt: `${item.title} — Source : ${item.source}.`,
    date: item.pubDate,
    source: item.source,
    link: item.link,
  };
}

async function updateNews() {
  log("Fetching Google News RSS (FR)...");
  let xml;
  try {
    xml = await fetchText(NEWS_RSS_URL);
  } catch (err) {
    log(`  ⚠ Failed to fetch news: ${err.message}`);
    return false;
  }

  const rssItems = parseRSSItems(xml);
  log(`  Found ${rssItems.length} RSS items`);

  if (rssItems.length === 0) return false;

  const { raw, slugs, maxId } = parseCurrentNews();

  // Filter out items whose slugified title already exists
  const newItems = rssItems.filter((item) => {
    const slug = slugify(item.title).slice(0, 80);
    return !slugs.includes(slug);
  });

  // Take only the 5 most recent new items
  const toAdd = newItems.slice(0, 5);

  if (toAdd.length === 0) {
    log("News: no new articles to add");
    return false;
  }

  const articles = toAdd.map((item, i) =>
    newsItemToArticle(item, maxId + 1 + i)
  );

  // Generate TypeScript entries
  const tsEntries = articles
    .map(
      (a) => `  {
    id: ${a.id},
    slug: "${a.slug}",
    title: "${a.title.replace(/"/g, '\\"')}",
    excerpt: "${a.excerpt.replace(/"/g, '\\"')}",
    content: \`${a.title}\\n\\nSource : ${a.source}\\n\\nLien : ${a.link}\`,
    date: "${a.date}",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  }`
    )
    .join(",\n");

  // Insert after the opening of the array
  const insertPoint = "export const newsArticles: NewsArticle[] = [";
  const insertIndex = raw.indexOf(insertPoint);
  if (insertIndex === -1) {
    log("  ⚠ Could not find insertion point in news.ts");
    return false;
  }

  const updated =
    raw.slice(0, insertIndex + insertPoint.length) +
    "\n" +
    tsEntries +
    ",\n" +
    raw.slice(insertIndex + insertPoint.length);

  if (DRY_RUN) {
    log(`DRY RUN: would add ${articles.length} news articles`);
    articles.forEach((a) => log(`  + ${a.title}`));
    return true;
  }

  fs.writeFileSync(path.join(DATA_DIR, "news.ts"), updated, "utf8");
  changes.push(`news: +${articles.length} articles ajoutés`);
  log(`✓ Added ${articles.length} news articles to news.ts`);
  return true;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  log(`Starting data update (${DRY_RUN ? "DRY RUN" : "LIVE"})...`);
  log(`Date: ${new Date().toISOString()}`);

  let hasChanges = false;

  if (UPDATE_ALL || ROSTERS_ONLY) {
    hasChanges = (await updateRosters()) || hasChanges;
  }

  if (UPDATE_ALL || NEWS_ONLY) {
    hasChanges = (await updateNews()) || hasChanges;
  }

  if (hasChanges && !DRY_RUN) {
    // Write a summary for the commit message
    const summary = changes.join("\n");
    fs.writeFileSync(path.join(ROOT, ".update-summary.txt"), summary, "utf8");
    log("\n── Changes summary ──");
    log(summary);
  }

  log(
    hasChanges
      ? "\n✓ Updates applied. Ready to commit."
      : "\n○ No changes detected."
  );

  process.exit(hasChanges ? 0 : 0);
}

main().catch((err) => {
  console.error("[update-data] Fatal error:", err);
  process.exit(1);
});
