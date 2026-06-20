// ============================================================================
// API-Football Client (v3 via RapidAPI)
// https://www.api-football.com/documentation-v3
// ============================================================================

import { API_FOOTBALL } from "../config";
import { cachedFetch, cacheGet, cacheSet, CACHE_TTL } from "../cache";
import { checkRateLimit, getRemainingRequests, forceExhaust } from "../rate-limiter";
import type {
  ApiResponse,
  ApiTeamStats,
  ApiFixture,
  ApiInjury,
  ApiLineup,
  ApiFixtureEvent,
  ApiFixtureStatistic,
  ApiFixturePlayer,
} from "./types";

export type { ApiLineup, ApiFixture, ApiFixtureEvent, ApiFixtureStatistic, ApiFixturePlayer };

const RATE_LIMIT_KEY = "api-football";
const RATE_LIMIT_CONFIG = {
  maxRequests: API_FOOTBALL.rateLimitPerDay,
  windowMs: 24 * 60 * 60 * 1000,
};

let lastRateLimitWarning = 0;

// In-flight dedup for rateLimitedCachedFetch — prevents burst of concurrent
// API calls for the same key after restart (which triggers per-minute rate limit)
const rlInflight = new Map<string, Promise<unknown>>();

/**
 * Wrapper around cachedFetch that respects rate limits.
 * If rate limited, returns cached data if available, otherwise returns fallback.
 * Never caches empty arrays to avoid persisting rate-limit errors.
 * Deduplicates concurrent calls for the same cache key (single-flight).
 */
async function rateLimitedCachedFetch<T>(
  cacheKey: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
  fallback: T
): Promise<T> {
  // Always try cache first (cachedFetch does this too, but we need it for rate-limit fallback)
  const cached = await cacheGet<T>(cacheKey);
  if (cached !== null) return cached;

  // Deduplicate: if another call for the same key is in-flight, wait for it
  const existing = rlInflight.get(cacheKey);
  if (existing) return existing as Promise<T>;

  const promise = (async (): Promise<T> => {
    try {
      if (!checkRateLimit(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG)) {
        const now = Date.now();
        if (now - lastRateLimitWarning > 600_000) {
          const remaining = getRemainingRequests(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG);
          console.warn(`[api-football] Daily rate limit reached (${API_FOOTBALL.rateLimitPerDay}/day), ${remaining} remaining`);
          lastRateLimitWarning = now;
        }
        return fallback;
      }

      // Fetch fresh data
      const data = await fetcher();

      // Only cache non-empty results — empty arrays from rate-limit errors
      // or missing data should not be persisted (especially with long TTLs)
      if (Array.isArray(data) && data.length === 0) {
        console.warn(`[api-football] Empty result for ${cacheKey}`);
        return fallback;
      }

      await cacheSet(cacheKey, data, ttlSeconds);
      return data;
    } finally {
      rlInflight.delete(cacheKey);
    }
  })();

  rlInflight.set(cacheKey, promise);
  return promise;
}

async function apiFetch<T>(endpoint: string, params: Record<string, string>): Promise<T[]> {
  // Skip API calls during build — data loads via ISR at runtime.
  // Without this, 40+ completed matches × 5 API calls = build timeout.
  if (process.env.NEXT_PHASE === "phase-production-build") return [];

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
    next: { revalidate: 300 },
  } as RequestInit);

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

    // Detect upstream rate limit — force-exhaust our local counter to stop further calls
    const errMsg = Object.values(json.errors).join(" ").toLowerCase();
    if (errMsg.includes("limit") || errMsg.includes("quota")) {
      forceExhaust(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG);
    }

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
export async function getLineup(fixtureId: number, finished = false): Promise<ApiLineup[]> {
  const cacheKey = `football:lineup:${fixtureId}`;
  const ttl = finished ? CACHE_TTL.TEAM_STATS : CACHE_TTL.INJURIES;
  const cached = await cacheGet<ApiLineup[]>(cacheKey);
  if (cached !== null && cached.length > 0) return cached;

  if (!checkRateLimit(RATE_LIMIT_KEY, RATE_LIMIT_CONFIG)) {
    return cached ?? [];
  }

  const data = await apiFetch<ApiLineup>("fixtures/lineups", {
    fixture: String(fixtureId),
  });

  // Only cache non-empty results — empty results (lineup not yet announced)
  // should be re-fetched on next page revalidation
  if (data.length > 0) {
    await cacheSet(cacheKey, data, ttl);
  }

  return data;
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
export async function getFixtureEvents(fixtureId: number, finished = false): Promise<ApiFixtureEvent[]> {
  return rateLimitedCachedFetch(
    `football:events:${fixtureId}`,
    finished ? CACHE_TTL.TEAM_STATS : CACHE_TTL.LIVE_SCORES,
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

/** Get statistics for a specific fixture */
export async function getFixtureStatistics(fixtureId: number, finished = false): Promise<ApiFixtureStatistic[]> {
  return rateLimitedCachedFetch(
    `football:stats:${fixtureId}`,
    finished ? CACHE_TTL.TEAM_STATS : CACHE_TTL.INJURIES,
    () =>
      apiFetch<ApiFixtureStatistic>("fixtures/statistics", {
        fixture: String(fixtureId),
      }),
    []
  );
}

/** Get fixtures for a specific date (YYYY-MM-DD) */
export async function getFixturesByDate(date: string): Promise<ApiFixture[]> {
  return rateLimitedCachedFetch(
    `football:fixtures:date:${date}`,
    CACHE_TTL.INJURIES, // 1h — results don't change often
    () =>
      apiFetch<ApiFixture>("fixtures", {
        league: String(API_FOOTBALL.worldCupLeagueId),
        season: String(API_FOOTBALL.season),
        date,
      }),
    []
  );
}

/** Get player ratings/statistics for a specific fixture */
export async function getFixturePlayers(fixtureId: number, finished = false): Promise<ApiFixturePlayer[]> {
  return rateLimitedCachedFetch(
    `football:players:${fixtureId}`,
    finished ? CACHE_TTL.TEAM_STATS : CACHE_TTL.INJURIES,
    () =>
      apiFetch<ApiFixturePlayer>("fixtures/players", {
        fixture: String(fixtureId),
      }),
    []
  );
}
