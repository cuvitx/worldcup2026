// ============================================================================
// API-Football Client (v3 via RapidAPI)
// https://www.api-football.com/documentation-v3
// ============================================================================

import { API_FOOTBALL } from "../config";
import { cachedFetch, cacheGet, CACHE_TTL } from "../cache";
import { checkRateLimit, getRemainingRequests } from "../rate-limiter";
import type {
  ApiResponse,
  ApiTeamStats,
  ApiFixture,
  ApiInjury,
  ApiLineup,
  ApiFixtureEvent,
} from "./types";

const RATE_LIMIT_KEY = "api-football";
const RATE_LIMIT_CONFIG = {
  maxRequests: API_FOOTBALL.rateLimitPerDay,
  windowMs: 24 * 60 * 60 * 1000,
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
  // Always try cache first (cachedFetch does this too, but we need it for rate-limit fallback)
  const cached = await cacheGet<T>(cacheKey);

  if (!checkRateLimit(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG)) {
    const remaining = getRemainingRequests(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG);
    console.warn(`[api-football] Daily rate limit reached (${API_FOOTBALL.rateLimitPerDay}/day), ${remaining} remaining`);
    return cached ?? fallback;
  }

  return cachedFetch(cacheKey, ttlSeconds, fetcher);
}

async function apiFetch<T>(endpoint: string, params: Record<string, string>): Promise<T[]> {
  if (!API_FOOTBALL.key) {
    console.warn(`[api-football] No API key configured, skipping: ${endpoint}`);
    return [];
  }

  const url = new URL(`${API_FOOTBALL.baseUrl}/${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": API_FOOTBALL.key,
    },
  });

  if (!res.ok) {
    console.error(`[api-football] ${res.status} ${res.statusText} for ${endpoint}`);
    return [];
  }

  let json: ApiResponse<T>;
  try {
    json = (await res.json()) as ApiResponse<T>;
  } catch (error) {
    console.error(`[api-football] JSON parse error for ${endpoint}:`, error instanceof Error ? error.message : error);
    return [];
  }

  if (json.errors && Object.keys(json.errors).length > 0) {
    console.warn(`[api-football] API errors:`, json.errors);
    return [];
  }

  return Array.isArray(json.response) ? json.response : [];
}

/** Get team statistics for a specific league/season */
export async function getTeamStats(
  apiTeamId: number,
  leagueId = API_FOOTBALL.worldCupLeagueId,
  season = API_FOOTBALL.season
): Promise<ApiTeamStats | null> {
  const data = await rateLimitedCachedFetch(
    `football:team-stats:${apiTeamId}:${season}`,
    CACHE_TTL.TEAM_STATS,
    () =>
      apiFetch<ApiTeamStats>("teams/statistics", {
        team: String(apiTeamId),
        league: String(leagueId),
        season: String(season),
      }),
    []
  );
  return data[0] ?? null;
}

/** Get injuries for a team */
export async function getInjuries(apiTeamId: number): Promise<ApiInjury[]> {
  return rateLimitedCachedFetch(
    `football:injuries:${apiTeamId}`,
    CACHE_TTL.INJURIES,
    () =>
      apiFetch<ApiInjury>("injuries", {
        team: String(apiTeamId),
        league: String(API_FOOTBALL.worldCupLeagueId),
        season: String(API_FOOTBALL.season),
      }),
    []
  );
}

/** Get lineup for a specific fixture */
export async function getLineup(fixtureId: number): Promise<ApiLineup[]> {
  return rateLimitedCachedFetch(
    `football:lineup:${fixtureId}`,
    CACHE_TTL.TEAM_STATS,
    () =>
      apiFetch<ApiLineup>("fixtures/lineups", {
        fixture: String(fixtureId),
      }),
    []
  );
}

/** Get live fixtures (currently in progress) */
export async function getLiveFixtures(): Promise<ApiFixture[]> {
  return rateLimitedCachedFetch(
    "football:live",
    CACHE_TTL.LIVE_SCORES,
    () =>
      apiFetch<ApiFixture>("fixtures", {
        live: "all",
        league: String(API_FOOTBALL.worldCupLeagueId),
      }),
    []
  );
}

/** Get fixture events (goals, cards, substitutions) */
export async function getFixtureEvents(fixtureId: number): Promise<ApiFixtureEvent[]> {
  return rateLimitedCachedFetch(
    `football:events:${fixtureId}`,
    CACHE_TTL.LIVE_SCORES,
    () =>
      apiFetch<ApiFixtureEvent>("fixtures/events", {
        fixture: String(fixtureId),
      }),
    []
  );
}

/** Get all fixtures for the World Cup */
export async function getWorldCupFixtures(): Promise<ApiFixture[]> {
  return rateLimitedCachedFetch(
    `football:fixtures:wc${API_FOOTBALL.season}`,
    CACHE_TTL.TEAM_STATS,
    () =>
      apiFetch<ApiFixture>("fixtures", {
        league: String(API_FOOTBALL.worldCupLeagueId),
        season: String(API_FOOTBALL.season),
      }),
    []
  );
}
