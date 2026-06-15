// ============================================================================
// Match Results — Enrich static match data with real API-Football scores
// Used by group/calendar pages via ISR for automatic score updates.
// ============================================================================

import type { Match } from "@repo/data/types";
import type { ApiFixture } from "./types";
import { getWorldCupFixtures } from "./client";
import { teamApiIds } from "@repo/data/api-football-ids";
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
  apiHomeTeamId: number;
  apiAwayTeamId: number;
}

/**
 * Fetch all World Cup fixture results from API-Football.
 * Returns a map of kickoff timestamp (rounded to minute) → result.
 * Cached for 5 minutes (same as ISR revalidation).
 */
export async function getMatchResults(): Promise<Map<number, MatchResult>> {
  const fixtures = await cachedFetch<ApiFixture[]>(
    "football:wc-results",
    CACHE_TTL.ODDS, // 5 min
    () => getWorldCupFixtures()
  );

  const results = new Map<number, MatchResult>();

  for (const f of fixtures) {
    const status = API_STATUS_MAP[f.fixture.status.short];
    if (!status || (status === "scheduled" && f.goals.home == null)) continue;

    // Key by kickoff timestamp rounded to nearest minute (timezone-safe)
    const kickoff = Math.round(new Date(f.fixture.date).getTime() / 60000);

    results.set(kickoff, {
      homeScore: f.goals.home ?? 0,
      awayScore: f.goals.away ?? 0,
      status,
      apiHomeTeamId: f.teams.home.id,
      apiAwayTeamId: f.teams.away.id,
    });
  }

  return results;
}


/**
 * Enrich an array of static matches with real API results.
 * Matches by kickoff timestamp (timezone-safe, language-independent).
 * Detects home/away swaps between our data and the API using team IDs.
 * Falls back to static data if API is unavailable.
 */
export async function enrichMatchesWithResults(
  matches: Match[],
  _teamNameMap?: Record<string, string> // kept for backward compat, no longer used
): Promise<Match[]> {
  let results: Map<number, MatchResult>;
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

    // Match by kickoff timestamp (rounded to minute) — timezone & language safe
    const kickoff = Math.round(
      new Date(`${match.date}T${match.time}:00+02:00`).getTime() / 60000
    );

    const result = results.get(kickoff);
    if (!result) return match;

    // Check if home/away are swapped between our data and the API
    const ourHomeApiId = teamApiIds[match.homeTeamId] ?? 0;
    const swapped = ourHomeApiId > 0 && ourHomeApiId === result.apiAwayTeamId;

    return {
      ...match,
      homeScore: swapped ? result.awayScore : result.homeScore,
      awayScore: swapped ? result.homeScore : result.awayScore,
      status: result.status,
    };
  });
}

