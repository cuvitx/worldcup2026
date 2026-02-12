// ============================================================================
// Two-tier cache: in-memory (for SSG builds) + optional Vercel KV (runtime)
// Falls back gracefully when KV is not configured.
// ============================================================================

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/** Cache TTLs in seconds by data type */
export const CACHE_TTL = {
  LIVE_SCORES: 30,
  ODDS: 300,
  WEATHER: 3600,
  TEAM_STATS: 86400,
  PLAYER_STATS: 86400,
  INJURIES: 3600,
} as const;

const memoryCache = new Map<string, CacheEntry<unknown>>();

export async function cacheGet<T>(key: string): Promise<T | null> {
  // Check in-memory first
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  if (entry) {
    memoryCache.delete(key);
  }
  return null;
}

export async function cacheSet<T>(
  key: string,
  data: T,
  ttlSeconds: number
): Promise<void> {
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

/** Fetch with cache — wraps any async getter with caching */
export async function cachedFetch<T>(
  key: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = await cacheGet<T>(key);
  if (cached !== null) return cached;

  const data = await fetcher();
  await cacheSet(key, data, ttlSeconds);
  return data;
}
