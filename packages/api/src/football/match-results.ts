// ============================================================================
// Match Results — Enrich static match data with real API-Football scores
// Used by group/calendar pages via ISR for automatic score updates.
// ============================================================================

import type { Match } from "@repo/data/types";
import type { ApiFixture } from "./types";
import { getWorldCupFixtures } from "./client";
import { cachedFetch, CACHE_TTL } from "../cache";

/** Status mapping from API-Football short codes to our internal status */
const API_STATUS_MAP: Record<string, Match["status"]> = {
  FT: "finished",
  AET: "finished",
  PEN: "finished",
  "1H": "live",
  "2H": "live",
  ET: "live",
  P: "live",
  HT: "live",
  NS: "scheduled",
  TBD: "scheduled",
};

export interface MatchResult {
  homeScore: number;
  awayScore: number;
  status: NonNullable<Match["status"]>;
}

/**
 * Fetch all World Cup fixture results from API-Football.
 * Returns a map of kickoff timestamp → result for matching against static data.
 * Cached for 5 minutes (same as ISR revalidation).
 */
export async function getMatchResults(): Promise<Map<string, MatchResult>> {
  const fixtures = await cachedFetch<ApiFixture[]>(
    "football:wc-results",
    CACHE_TTL.ODDS, // 5 min
    () => getWorldCupFixtures()
  );

  const results = new Map<string, MatchResult>();

  for (const f of fixtures) {
    const status = API_STATUS_MAP[f.fixture.status.short];
    if (!status || (status === "scheduled" && f.goals.home == null)) continue;

    // Build a key from date + teams for matching
    // Use fixture date (ISO) truncated to YYYY-MM-DD + team names
    const dateStr = f.fixture.date.slice(0, 10);
    const key = buildFixtureKey(dateStr, f.teams.home.name, f.teams.away.name);

    results.set(key, {
      homeScore: f.goals.home ?? 0,
      awayScore: f.goals.away ?? 0,
      status,
    });
  }

  return results;
}

function buildFixtureKey(date: string, homeName: string, awayName: string): string {
  return `${date}:${normalize(homeName)}:${normalize(awayName)}`;
}

function normalize(name: string): string {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

/**
 * Enrich an array of static matches with real API results.
 * Falls back to static data if API is unavailable.
 */
export async function enrichMatchesWithResults(
  matches: Match[],
  teamNameMap: Record<string, string> // teamId → team name for matching
): Promise<Match[]> {
  let results: Map<string, MatchResult>;
  try {
    results = await getMatchResults();
  } catch {
    // API unavailable — return static data unchanged
    return matches;
  }

  if (results.size === 0) return matches;

  return matches.map((match) => {
    // If already has score in static data, keep it
    if (match.status === "finished" && match.homeScore != null) return match;

    const homeName = teamNameMap[match.homeTeamId] ?? match.homeTeamId;
    const awayName = teamNameMap[match.awayTeamId] ?? match.awayTeamId;

    // Try to find matching fixture in API results
    const key = buildFixtureKey(match.date, homeName, awayName);
    const result = results.get(key);

    // Also try with swapped date (timezone differences — match at 03:00 CEST may be previous day UTC)
    if (!result) {
      // Try previous day
      const prevDate = shiftDate(match.date, -1);
      const prevKey = buildFixtureKey(prevDate, homeName, awayName);
      const prevResult = results.get(prevKey);
      if (prevResult) {
        return { ...match, ...prevResult };
      }

      // Try next day
      const nextDate = shiftDate(match.date, 1);
      const nextKey = buildFixtureKey(nextDate, homeName, awayName);
      const nextResult = results.get(nextKey);
      if (nextResult) {
        return { ...match, ...nextResult };
      }

      return match;
    }

    return { ...match, ...result };
  });
}

function shiftDate(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
