// ============================================================================
// The Odds API Client — Real bookmaker odds
// https://the-odds-api.com/liveapi/guides/v4/
// ============================================================================

import { ODDS_API } from "../config";
import { cachedFetch, cacheGet, CACHE_TTL } from "../cache";
import { checkRateLimit, getRemainingRequests } from "../rate-limiter";
import type { OddsApiResponse, MatchOdds, OutrightOdds } from "./types";

const RATE_LIMIT_KEY = "odds-api";
const RATE_LIMIT_CONFIG = {
  maxRequests: ODDS_API.rateLimitPerMonth,
  windowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
};

/**
 * Wrapper around cachedFetch that respects rate limits.
 * If rate limited, returns cached data if available, otherwise returns fallback.
 */
async function rateLimitedCachedFetch<T>(
  cacheKey: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  const cached = await cacheGet<T>(cacheKey);

  if (!checkRateLimit(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG)) {
    const remaining = getRemainingRequests(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG);
    console.warn(`[odds-api] Monthly rate limit reached (${ODDS_API.rateLimitPerMonth}/month), ${remaining} remaining`);
    return cached ?? fallback;
  }

  return cachedFetch(cacheKey, ttlSeconds, fetcher);
}

async function oddsFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T[]> {
  if (!ODDS_API.key) {
    console.warn("[odds-api] No API key configured, skipping");
    return [];
  }

  const url = new URL(`${ODDS_API.baseUrl}/${endpoint}`);
  url.searchParams.set("apiKey", ODDS_API.key);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.error(`[odds-api] ${res.status} ${res.statusText}`);
    return [];
  }

  try {
    return (await res.json()) as T[];
  } catch (error) {
    console.error("[odds-api] JSON parse error:", error instanceof Error ? error.message : error);
    return [];
  }
}

/** Get match odds (1X2) for World Cup fixtures */
export async function getMatchOdds(): Promise<MatchOdds[]> {
  return rateLimitedCachedFetch("odds:match-odds", CACHE_TTL.ODDS, async () => {
    const data = await oddsFetch<OddsApiResponse>(
      `sports/${ODDS_API.sport}/odds`,
      {
        regions: "eu",
        markets: "h2h",
        oddsFormat: "decimal",
      }
    );

    return data.map(mapToMatchOdds);
  }, []);
}

/** Get outright (tournament winner) odds */
export async function getOutrightOdds(): Promise<OutrightOdds[]> {
  return rateLimitedCachedFetch("odds:outright", CACHE_TTL.ODDS, async () => {
    const data = await oddsFetch<OddsApiResponse>(
      `sports/${ODDS_API.sport}/odds`,
      {
        regions: "eu",
        markets: "outrights",
        oddsFormat: "decimal",
      }
    );

    return data.flatMap((event) =>
      event.bookmakers.map((bk) => ({
        bookmaker: bk.title,
        outcomes: (bk.markets[0]?.outcomes ?? []).map((o) => ({
          team: o.name,
          odds: o.price,
        })),
        lastUpdate: bk.last_update,
      }))
    );
  }, []);
}

/** Find match odds for a specific matchup */
export async function getOddsForMatch(
  homeTeam: string,
  awayTeam: string
): Promise<MatchOdds | null> {
  const allOdds = await getMatchOdds();
  return (
    allOdds.find(
      (o) =>
        normalize(o.homeTeam) === normalize(homeTeam) &&
        normalize(o.awayTeam) === normalize(awayTeam)
    ) ?? null
  );
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z]/g, "");
}

function mapToMatchOdds(event: OddsApiResponse): MatchOdds {
  const bookmakers = event.bookmakers.map((bk) => {
    const h2h = bk.markets.find((m) => m.key === "h2h");
    const outcomes = h2h?.outcomes ?? [];
    const home = outcomes.find((o) => o.name === event.home_team);
    const away = outcomes.find((o) => o.name === event.away_team);
    const draw = outcomes.find((o) => o.name === "Draw");

    return {
      name: bk.title,
      homeWin: home?.price ?? 0,
      draw: draw?.price ?? 0,
      awayWin: away?.price ?? 0,
      lastUpdate: bk.last_update,
    };
  });

  const avg = (field: "homeWin" | "draw" | "awayWin") => {
    const vals = bookmakers.map((b) => b[field]).filter((v) => v > 0);
    return vals.length > 0 ? vals.reduce((a: number, b: number) => a + b, 0) / vals.length : 0;
  };

  return {
    homeTeam: event.home_team,
    awayTeam: event.away_team,
    commenceTime: event.commence_time,
    bookmakers,
    average: {
      homeWin: Number(avg("homeWin").toFixed(2)),
      draw: Number(avg("draw").toFixed(2)),
      awayWin: Number(avg("awayWin").toFixed(2)),
    },
  };
}
