#!/usr/bin/env node
/**
 * Updates match scores in packages/data/src/matches.ts from API-Football v3.
 *
 * Reads the API-Football team ID mapping from api-football-ids.ts, fetches
 * all World Cup 2026 fixtures, and updates matches that are finished but
 * don't yet have scores in the static data (or have incorrect scores).
 *
 * Environment:
 *   API_FOOTBALL_KEY — required, set as x-apisports-key header
 *
 * Usage:
 *   node scripts/update-scores.mjs
 *   node scripts/update-scores.mjs --dry-run   # preview changes without writing
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const MATCHES_PATH = path.join(ROOT, "packages/data/src/matches.ts");
const API_IDS_PATH = path.join(ROOT, "packages/data/src/api-football-ids.ts");

const DRY_RUN = process.argv.includes("--dry-run");

const API_KEY = process.env.API_FOOTBALL_KEY;
if (!API_KEY) {
  console.log("[update-scores] API_FOOTBALL_KEY not set — skipping score update.");
  process.exit(0);
}

const API_BASE = "https://v3.football.api-sports.io";
const FINISHED_STATUSES = new Set(["FT", "AET", "PEN"]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[update-scores] ${msg}`);
}

function warn(msg) {
  console.warn(`[update-scores] WARNING: ${msg}`);
}

// ─── Parse team API IDs from TypeScript source ───────────────────────────────

function parseTeamApiIds() {
  const content = fs.readFileSync(API_IDS_PATH, "utf8");

  // Extract the teamApiIds object block
  const match = content.match(/export\s+const\s+teamApiIds[^{]*\{([^}]+)\}/s);
  if (!match) {
    throw new Error("Could not parse teamApiIds from api-football-ids.ts");
  }

  const body = match[1];
  const mapping = {}; // slug → apiId
  const reverse = {}; // apiId → slug[]

  // Match each "slug": number entry
  const entryRegex = /"([^"]+)"\s*:\s*(\d+)/g;
  let m;
  while ((m = entryRegex.exec(body)) !== null) {
    const slug = m[1];
    const apiId = parseInt(m[2], 10);
    mapping[slug] = apiId;
    if (!reverse[apiId]) reverse[apiId] = [];
    reverse[apiId].push(slug);
  }

  return { mapping, reverse };
}

// ─── Fetch fixtures from API-Football ────────────────────────────────────────

async function fetchFixtures() {
  const url = `${API_BASE}/fixtures?league=1&season=2026`;
  log(`Fetching fixtures from ${url}`);

  const res = await fetch(url, {
    headers: {
      "x-apisports-key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`API-Football returned HTTP ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(`API-Football errors: ${JSON.stringify(data.errors)}`);
  }

  if (!data.response || !Array.isArray(data.response)) {
    throw new Error("API-Football returned unexpected response structure");
  }

  log(`Received ${data.response.length} fixtures from API`);
  return data.response;
}

// ─── Build a lookup of finished fixtures by team pair ────────────────────────

function buildFixtureLookup(fixtures) {
  // Key: "homeApiId-awayApiId" → fixture data
  // We also store reverse key for home/away swaps
  const lookup = {};

  for (const fix of fixtures) {
    const status = fix.fixture?.status?.short;
    if (!FINISHED_STATUSES.has(status)) continue;

    const homeId = fix.teams?.home?.id;
    const awayId = fix.teams?.away?.id;
    if (!homeId || !awayId) continue;

    const fixtureData = {
      homeApiId: homeId,
      awayApiId: awayId,
      homeGoals: fix.goals?.home,
      awayGoals: fix.goals?.away,
      halfTimeHome: fix.score?.halftime?.home,
      halfTimeAway: fix.score?.halftime?.away,
      status: status, // FT, AET, PEN
    };

    // Store by both possible pair orderings, with a flag indicating if swapped
    const key1 = `${homeId}-${awayId}`;
    lookup[key1] = { ...fixtureData, swapped: false };

    const key2 = `${awayId}-${homeId}`;
    lookup[key2] = { ...fixtureData, swapped: true };
  }

  return lookup;
}

// ─── Parse match blocks from matches.ts ──────────────────────────────────────

function parseMatchBlocks(content) {
  // Find each match object block: { id: "mXX", ... }
  // We'll find them by looking for id: "mXX" patterns and extracting the surrounding block
  const blocks = [];
  const blockRegex = /\{[^{}]*id:\s*"(m\d+)"[^{}]*\}/gs;
  let m;

  while ((m = blockRegex.exec(content)) !== null) {
    const fullBlock = m[0];
    const matchId = m[1];
    const startIdx = m.index;
    const endIdx = m.index + fullBlock.length;

    // Extract fields from the block
    const homeTeamMatch = fullBlock.match(/homeTeamId:\s*"([^"]+)"/);
    const awayTeamMatch = fullBlock.match(/awayTeamId:\s*"([^"]+)"/);
    const dateMatch = fullBlock.match(/date:\s*"([^"]+)"/);
    const statusMatch = fullBlock.match(/status:\s*"([^"]+)"/);
    const homeScoreMatch = fullBlock.match(/homeScore:\s*(\d+)/);
    const awayScoreMatch = fullBlock.match(/awayScore:\s*(\d+)/);
    const matchdayMatch = fullBlock.match(/matchday:\s*(\d+)/);

    blocks.push({
      matchId,
      fullBlock,
      startIdx,
      endIdx,
      homeTeamId: homeTeamMatch?.[1],
      awayTeamId: awayTeamMatch?.[1],
      date: dateMatch?.[1],
      status: statusMatch?.[1],
      homeScore: homeScoreMatch ? parseInt(homeScoreMatch[1], 10) : undefined,
      awayScore: awayScoreMatch ? parseInt(awayScoreMatch[1], 10) : undefined,
      hasMatchday: !!matchdayMatch,
      matchdayLine: matchdayMatch?.[0],
    });
  }

  return blocks;
}

// ─── Update matches.ts content ───────────────────────────────────────────────

function updateMatchesContent(content, blocks, fixtureLookup, teamMapping) {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  let updatedContent = content;
  let offset = 0; // Track offset as we modify the string
  const updates = [];

  for (const block of blocks) {
    if (!block.homeTeamId || !block.awayTeamId || !block.date) continue;

    // Skip future matches
    if (block.date >= today) continue;

    // Look up API IDs for both teams
    const homeApiId = teamMapping[block.homeTeamId];
    const awayApiId = teamMapping[block.awayTeamId];

    if (!homeApiId || !awayApiId) {
      // Can't match this fixture without API IDs
      continue;
    }

    // Try to find the fixture in our lookup (handles home/away swaps)
    const key = `${homeApiId}-${awayApiId}`;
    const fixture = fixtureLookup[key];

    if (!fixture) {
      // No finished fixture found for this match pair
      continue;
    }

    // Determine scores based on whether the API has teams swapped
    let homeScore, awayScore, htHome, htAway;
    if (fixture.swapped) {
      // API has our away team as home and vice versa
      homeScore = fixture.awayGoals;
      awayScore = fixture.homeGoals;
      htHome = fixture.halfTimeAway;
      htAway = fixture.halfTimeHome;
    } else {
      homeScore = fixture.homeGoals;
      awayScore = fixture.awayGoals;
      htHome = fixture.halfTimeHome;
      htAway = fixture.halfTimeAway;
    }

    if (homeScore === null || homeScore === undefined || awayScore === null || awayScore === undefined) {
      continue;
    }

    // Check if update is needed
    const alreadyFinished = block.status === "finished";
    const scoresMatch = block.homeScore === homeScore && block.awayScore === awayScore;

    if (alreadyFinished && scoresMatch) {
      // Already up to date
      continue;
    }

    // Build the updated block
    let newBlock = block.fullBlock;

    if (block.homeScore !== undefined && block.homeScore !== homeScore) {
      // Update existing homeScore
      newBlock = newBlock.replace(/homeScore:\s*\d+/, `homeScore: ${homeScore}`);
    }
    if (block.awayScore !== undefined && block.awayScore !== awayScore) {
      // Update existing awayScore
      newBlock = newBlock.replace(/awayScore:\s*\d+/, `awayScore: ${awayScore}`);
    }

    if (block.homeScore === undefined) {
      // Need to add homeScore, awayScore, status after matchday line
      // Find the matchday line to insert after it
      const matchdayRegex = /matchday:\s*\d+,/;
      const matchdayMatch = newBlock.match(matchdayRegex);

      if (matchdayMatch) {
        // Detect indentation from the matchday line
        const lineStart = newBlock.lastIndexOf("\n", newBlock.indexOf(matchdayMatch[0]));
        const lineContent = newBlock.slice(lineStart + 1);
        const indent = lineContent.match(/^(\s*)/)?.[1] || "    ";

        const insertAfter = newBlock.indexOf(matchdayMatch[0]) + matchdayMatch[0].length;
        const scoreLine = `\n${indent}homeScore: ${homeScore},\n${indent}awayScore: ${awayScore},`;

        newBlock = newBlock.slice(0, insertAfter) + scoreLine + newBlock.slice(insertAfter);
      }
    }

    // Add or update status
    if (!block.status) {
      // Add status: "finished" as const after awayScore
      const awayScoreRegex = /awayScore:\s*\d+,/;
      const awayScoreMatch = newBlock.match(awayScoreRegex);
      if (awayScoreMatch) {
        const lineStart = newBlock.lastIndexOf("\n", newBlock.indexOf(awayScoreMatch[0]));
        const lineContent = newBlock.slice(lineStart + 1);
        const indent = lineContent.match(/^(\s*)/)?.[1] || "    ";

        const insertAfter = newBlock.indexOf(awayScoreMatch[0]) + awayScoreMatch[0].length;
        const statusLine = `\n${indent}status: "finished" as const,`;

        newBlock = newBlock.slice(0, insertAfter) + statusLine + newBlock.slice(insertAfter);
      }
    } else if (block.status !== "finished") {
      // Update existing status to finished
      newBlock = newBlock.replace(/status:\s*"[^"]*"(\s*as\s*const)?/, `status: "finished" as const`);
    }

    // Apply the replacement to the full content
    if (newBlock !== block.fullBlock) {
      const adjustedStart = block.startIdx + offset;
      const adjustedEnd = block.endIdx + offset;

      updatedContent =
        updatedContent.slice(0, adjustedStart) +
        newBlock +
        updatedContent.slice(adjustedEnd);

      offset += newBlock.length - block.fullBlock.length;

      const action = alreadyFinished ? "corrected" : "added";
      updates.push({
        matchId: block.matchId,
        homeTeamId: block.homeTeamId,
        awayTeamId: block.awayTeamId,
        homeScore,
        awayScore,
        action,
      });
    }
  }

  return { updatedContent, updates };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  log("Starting score update...");

  // 1. Parse team API ID mapping
  const { mapping: teamMapping } = parseTeamApiIds();
  log(`Loaded ${Object.keys(teamMapping).length} team API ID mappings`);

  // 2. Fetch fixtures from API-Football
  let fixtures;
  try {
    fixtures = await fetchFixtures();
  } catch (err) {
    warn(`API fetch failed: ${err.message}`);
    log("Exiting without changes.");
    process.exit(0);
  }

  if (fixtures.length === 0) {
    log("No fixtures returned from API — exiting without changes.");
    process.exit(0);
  }

  // 3. Build fixture lookup
  const fixtureLookup = buildFixtureLookup(fixtures);
  const finishedCount = Object.keys(fixtureLookup).length / 2; // each fixture stored twice
  log(`Found ${finishedCount} finished fixtures`);

  // 4. Read matches.ts
  const matchesContent = fs.readFileSync(MATCHES_PATH, "utf8");

  // 5. Parse match blocks
  const blocks = parseMatchBlocks(matchesContent);
  log(`Parsed ${blocks.length} match blocks from matches.ts`);

  // 6. Update content
  const { updatedContent, updates } = updateMatchesContent(
    matchesContent,
    blocks,
    fixtureLookup,
    teamMapping,
  );

  if (updates.length === 0) {
    log("All scores are up to date — no changes needed.");
    process.exit(0);
  }

  // 7. Log updates
  log(`\n--- ${updates.length} match(es) to update ---`);
  for (const u of updates) {
    log(`  ${u.matchId}: ${u.homeTeamId} ${u.homeScore} - ${u.awayScore} ${u.awayTeamId} [${u.action}]`);
  }

  // 8. Write file
  if (DRY_RUN) {
    log("\n[DRY RUN] No file written.");
  } else {
    fs.writeFileSync(MATCHES_PATH, updatedContent, "utf8");
    log(`\nWrote updated scores to ${MATCHES_PATH}`);
  }

  log("Done.");
}

main().catch((err) => {
  console.error(`[update-scores] Fatal error: ${err.message}`);
  process.exit(1);
});
