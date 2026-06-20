// ============================================================================
// API-Football Odds — Fetch real bookmaker odds for World Cup matches
// ============================================================================

import { API_FOOTBALL } from "../config";
import { cachedFetch, CACHE_TTL } from "../cache";

interface OddsValue {
  value: string;
  odd: string;
}

interface OddsBet {
  id: number;
  name: string;
  values: OddsValue[];
}

interface OddsBookmaker {
  id: number;
  name: string;
  bets: OddsBet[];
}

interface OddsFixture {
  fixture: { id: number; date: string };
  bookmakers: OddsBookmaker[];
}

export interface MatchOddsResult {
  homeWin: number;
  draw: number;
  awayWin: number;
  bookmakers: {
    name: string;
    homeWin: number;
    draw: number;
    awayWin: number;
  }[];
}

/**
 * Fetch all World Cup match odds from API-Football.
 * Cached for 30 minutes (odds don't change rapidly).
 */
async function fetchAllOdds(): Promise<OddsFixture[]> {
  if (process.env.NEXT_PHASE === "phase-production-build") return [];
  if (!API_FOOTBALL.key) {
    console.warn("[api-football] No API key configured, skipping: odds");
    return [];
  }

  return cachedFetch<OddsFixture[]>(
    `football:odds:wc${API_FOOTBALL.season}`,
    CACHE_TTL.INJURIES, // 1h cache — odds don't change rapidly
    async () => {
      const url = new URL(`${API_FOOTBALL.baseUrl}/odds`);
      url.searchParams.set("league", String(API_FOOTBALL.worldCupLeagueId));
      url.searchParams.set("season", String(API_FOOTBALL.season));
      url.searchParams.set("bet", "1"); // Match Winner (1X2)

      const res = await fetch(url.toString(), {
        headers: { "x-apisports-key": API_FOOTBALL.key },
        next: { revalidate: 300 },
      } as RequestInit);

      if (!res.ok) {
        console.error(`[api-football] Odds fetch failed: ${res.status}`);
        return [];
      }

      const json = await res.json();
      return Array.isArray(json.response) ? json.response : [];
    }
  );
}

/**
 * Get odds for a specific fixture by fixture ID.
 */
export async function getOddsForFixture(fixtureId: number): Promise<MatchOddsResult | null> {
  const allOdds = await fetchAllOdds();
  const fixture = allOdds.find((o) => o.fixture.id === fixtureId);
  if (!fixture || fixture.bookmakers.length === 0) return null;

  return parseFixtureOdds(fixture);
}

/**
 * Get odds for a match by date and approximate kickoff time.
 */
export async function getOddsForMatch(matchDate: string, matchTime: string): Promise<MatchOddsResult | null> {
  const allOdds = await fetchAllOdds();
  if (allOdds.length === 0) return null;

  // Match by date (API-Football fixture.date is ISO)
  const kickoff = new Date(`${matchDate}T${matchTime}:00+02:00`).getTime();

  const fixture = allOdds.find((o) => {
    const fixtureTime = new Date(o.fixture.date).getTime();
    return Math.abs(fixtureTime - kickoff) < 7200000; // 2h tolerance
  });

  if (!fixture || fixture.bookmakers.length === 0) return null;
  return parseFixtureOdds(fixture);
}

function parseFixtureOdds(fixture: OddsFixture): MatchOddsResult {
  const bookmakers: MatchOddsResult["bookmakers"] = [];

  for (const bk of fixture.bookmakers) {
    // Find the "Match Winner" bet (bet id 1)
    const matchWinner = bk.bets.find((b) => b.id === 1 || b.name === "Match Winner");
    if (!matchWinner) continue;

    const home = matchWinner.values.find((v) => v.value === "Home");
    const draw = matchWinner.values.find((v) => v.value === "Draw");
    const away = matchWinner.values.find((v) => v.value === "Away");

    if (home && draw && away) {
      bookmakers.push({
        name: bk.name,
        homeWin: parseFloat(home.odd),
        draw: parseFloat(draw.odd),
        awayWin: parseFloat(away.odd),
      });
    }
  }

  if (bookmakers.length === 0) return { homeWin: 0, draw: 0, awayWin: 0, bookmakers: [] };

  // Calculate average
  const avgHome = bookmakers.reduce((s, b) => s + b.homeWin, 0) / bookmakers.length;
  const avgDraw = bookmakers.reduce((s, b) => s + b.draw, 0) / bookmakers.length;
  const avgAway = bookmakers.reduce((s, b) => s + b.awayWin, 0) / bookmakers.length;

  return {
    homeWin: Math.round(avgHome * 100) / 100,
    draw: Math.round(avgDraw * 100) / 100,
    awayWin: Math.round(avgAway * 100) / 100,
    bookmakers,
  };
}
