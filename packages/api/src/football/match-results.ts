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
  halfTimeHome: number | null;
  halfTimeAway: number | null;
  status: NonNullable<Match["status"]>;
  apiHomeTeamId: number;
  apiAwayTeamId: number;
  /** Kickoff timestamp rounded to minute (for fallback matching) */
  kickoffMin: number;
}

/**
 * Fetch all World Cup fixture results from API-Football.
 * Returns an array of results with team IDs for matching.
 * Multiple matches can share the same kickoff time (e.g. group stage day 3).
 */
export async function getMatchResults(): Promise<MatchResult[]> {
  // Use short TTL (90s) during match hours, long TTL (30 min) otherwise.
  // Without this, a score cached at the 71st minute stays stale for 30 min
  // — showing "EN DIRECT" long after the match has finished.
  const hour = new Date().getUTCHours();
  const isMatchWindow = hour >= 14 || hour <= 4; // 14:00–04:00 UTC (16:00–06:00 CEST)
  const ttl = isMatchWindow ? 90 : 1800;

  const fixtures = await cachedFetch<ApiFixture[]>(
    "football:wc-results",
    ttl,
    () => getWorldCupFixtures()
  );

  if (fixtures.length === 0) {
    console.warn(`[getMatchResults] getWorldCupFixtures returned 0 fixtures`);
  }

  const results: MatchResult[] = [];

  for (const f of fixtures) {
    const status = API_STATUS_MAP[f.fixture.status.short];
    if (!status || (status === "scheduled" && f.goals.home == null)) continue;

    results.push({
      homeScore: f.goals.home ?? 0,
      awayScore: f.goals.away ?? 0,
      halfTimeHome: f.score?.halftime?.home ?? null,
      halfTimeAway: f.score?.halftime?.away ?? null,
      status,
      apiHomeTeamId: f.teams.home.id,
      apiAwayTeamId: f.teams.away.id,
      kickoffMin: Math.round(new Date(f.fixture.date).getTime() / 60000),
    });
  }

  if (fixtures.length > 0) {
    console.log(`[getMatchResults] ${fixtures.length} fixtures → ${results.length} results`);
  }

  return results;
}


/**
 * Resolve the API-Football fixture ID for a static match.
 * Reuses the cached World Cup fixtures to avoid extra API calls.
 * Returns null if no match found or during build.
 */
export async function resolveApiFixtureId(match: Match): Promise<number | null> {
  // Skip during build — data loads via ISR at runtime
  if (process.env.NEXT_PHASE === "phase-production-build") return null;

  let fixtures: ApiFixture[];
  try {
    fixtures = await cachedFetch<ApiFixture[]>(
      "football:wc-results",
      1800,
      () => getWorldCupFixtures()
    );
  } catch (err) {
    console.error(`[resolveApiFixtureId] Exception for ${match.slug}:`, err instanceof Error ? err.message : err);
    return null;
  }

  // Retry once: if cache returned empty, bypass cache and fetch directly
  if (fixtures.length === 0) {
    console.warn(`[resolveApiFixtureId] Empty fixtures for ${match.slug}, retrying directly...`);
    try {
      fixtures = await getWorldCupFixtures();
    } catch {
      return null;
    }
  }

  if (fixtures.length === 0) {
    console.warn(`[resolveApiFixtureId] Still no fixtures after retry for ${match.slug}`);
    return null;
  }

  const ourHomeApiId = teamApiIds[match.homeTeamId] ?? 0;
  const ourAwayApiId = teamApiIds[match.awayTeamId] ?? 0;

  // Strategy 1: Match by team API IDs (most reliable — avoids same-kickoff collisions)
  if (ourHomeApiId > 0 && ourAwayApiId > 0) {
    for (const f of fixtures) {
      const homeMatch = f.teams.home.id === ourHomeApiId || f.teams.away.id === ourHomeApiId;
      const awayMatch = f.teams.home.id === ourAwayApiId || f.teams.away.id === ourAwayApiId;
      if (homeMatch && awayMatch) return f.fixture.id;
    }
  }

  // Strategy 2: Match by kickoff timestamp (fallback when team IDs unavailable)
  const kickoff = Math.round(
    new Date(`${match.date}T${match.time}:00+02:00`).getTime() / 60000
  );

  for (const f of fixtures) {
    const fKickoff = Math.round(new Date(f.fixture.date).getTime() / 60000);
    if (fKickoff === kickoff) return f.fixture.id;
  }

  return null;
}

/**
 * Enrich an array of static matches with real API results.
 * - Skips entirely during build (avoids rate limiting)
 * - At runtime, only fetches if at least one match needs enrichment
 *   (i.e. not already finished with a score in static data)
 * Detects home/away swaps between our data and the API using team IDs.
 * Falls back to static data if API is unavailable.
 */
export async function enrichMatchesWithResults(
  matches: Match[],
  _teamNameMap?: Record<string, string> // kept for backward compat, no longer used
): Promise<Match[]> {
  // Skip during build — scores are in static data, live enrichment via ISR
  if (process.env.NEXT_PHASE === "phase-production-build") return matches;

  // Only call API if at least one match is today/yesterday AND doesn't have a score yet.
  // No point fetching for matches 10 days in the future.
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const yesterday = new Date(now.getTime() - 86400000).toISOString().slice(0, 10);

  const needsEnrichment = matches.some(
    (m) =>
      (m.date === todayStr || m.date === yesterday) &&
      !(m.status === "finished" && m.homeScore != null)
  );
  if (!needsEnrichment) return matches;

  let results: MatchResult[];
  try {
    results = await getMatchResults();
  } catch (err) {
    console.warn(`[enrichMatch] getMatchResults threw:`, err instanceof Error ? err.message : err);
    return matches;
  }

  if (results.length === 0) {
    console.warn(`[enrichMatch] getMatchResults returned 0 results (matches: ${matches.map(m => m.slug).join(", ")})`);
    return matches;
  }

  return matches.map((match) => {
    // If already has score in static data, keep it
    if (match.status === "finished" && match.homeScore != null) return match;

    const ourHomeApiId = teamApiIds[match.homeTeamId] ?? 0;
    const ourAwayApiId = teamApiIds[match.awayTeamId] ?? 0;

    // Strategy 1: Match by team API IDs (handles simultaneous kickoffs)
    let result: MatchResult | undefined;
    if (ourHomeApiId > 0 && ourAwayApiId > 0) {
      result = results.find((r) => {
        const hasHome = r.apiHomeTeamId === ourHomeApiId || r.apiAwayTeamId === ourHomeApiId;
        const hasAway = r.apiHomeTeamId === ourAwayApiId || r.apiAwayTeamId === ourAwayApiId;
        return hasHome && hasAway;
      });
    }

    // Strategy 2: Fallback to kickoff timestamp (when team IDs unavailable)
    // Only use if exactly one result matches (avoids simultaneous-match collisions)
    if (!result) {
      const kickoff = Math.round(
        new Date(`${match.date}T${match.time}:00+02:00`).getTime() / 60000
      );
      const timeMatches = results.filter((r) => r.kickoffMin === kickoff);
      if (timeMatches.length === 1) {
        result = timeMatches[0];
      }
      if (!result) return match;
    }

    // Check if home/away are swapped between our data and the API
    const swapped = ourHomeApiId > 0 && ourHomeApiId === result.apiAwayTeamId;

    return {
      ...match,
      homeScore: swapped ? result.awayScore : result.homeScore,
      awayScore: swapped ? result.homeScore : result.awayScore,
      halfTimeHome: (swapped ? result.halfTimeAway : result.halfTimeHome) ?? undefined,
      halfTimeAway: (swapped ? result.halfTimeHome : result.halfTimeAway) ?? undefined,
      status: result.status,
    };
  });
}

