/**
 * Debug script: test the exact same API call chain as match pages
 * Usage: npx tsx scripts/debug-match-data.ts
 */

import { resolveApiFixtureId } from "../packages/api/src/football/match-results";
import { getFixtureEvents, getLineup, getFixtureStatistics, getFixturePlayers } from "../packages/api/src/football/client";
import { teamApiIds } from "../packages/data/src/api-football-ids";
import type { Match } from "../packages/data/src/types";

// Mexico vs South Africa (completed June 11)
const testMatch: Match = {
  id: "m01",
  slug: "mexique-vs-afrique-du-sud",
  homeTeamId: "mexique",
  awayTeamId: "afrique-du-sud",
  date: "2026-06-11",
  time: "21:00",
  stadiumId: "estadio-azteca",
  stage: "group",
  group: "A",
  matchday: 1,
  homeScore: 2,
  awayScore: 0,
  status: "finished",
};

async function main() {
  console.log("=== Debug Match Data Flow ===\n");

  console.log("1. Team API IDs:");
  console.log(`   Home (mexique): ${teamApiIds["mexique"]}`);
  console.log(`   Away (afrique-du-sud): ${teamApiIds["afrique-du-sud"]}`);

  console.log("\n2. Resolving fixture ID...");
  const fixtureId = await resolveApiFixtureId(testMatch);
  console.log(`   Fixture ID: ${fixtureId}`);

  if (!fixtureId) {
    console.error("   FAILED: No fixture ID found!");
    process.exit(1);
  }

  console.log("\n3. Fetching match data...");
  const [events, lineups, statistics, players] = await Promise.all([
    getFixtureEvents(fixtureId, true).catch((e) => { console.error("   Events error:", e); return []; }),
    getLineup(fixtureId, true).catch((e) => { console.error("   Lineups error:", e); return []; }),
    getFixtureStatistics(fixtureId, true).catch((e) => { console.error("   Stats error:", e); return []; }),
    getFixturePlayers(fixtureId, true).catch((e) => { console.error("   Players error:", e); return []; }),
  ]);

  console.log(`\n4. Results:`);
  console.log(`   Events:     ${events.length} items`);
  console.log(`   Lineups:    ${lineups.length} items (need exactly 2)`);
  console.log(`   Statistics: ${statistics.length} items (need exactly 2)`);
  console.log(`   Players:    ${players.length} items (need >= 2)`);

  if (lineups.length > 0) {
    for (const l of lineups) {
      console.log(`   Lineup: ${(l as any).team?.name} | Formation: ${(l as any).formation}`);
    }
  }

  if (statistics.length > 0) {
    for (const s of statistics) {
      console.log(`   Stats: ${(s as any).team?.name} | ${(s as any).statistics?.length ?? 0} stat types`);
    }
  }

  if (players.length > 0) {
    for (const p of players) {
      console.log(`   Players: ${(p as any).team?.name} | ${(p as any).players?.length ?? 0} players`);
    }
  }

  console.log("\n=== Done ===");
}

main().catch(console.error);
