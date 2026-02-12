// ============================================================================
// Two-tier cache: Upstash Redis (shared across sites) + in-memory (fallback)
// Falls back gracefully when Redis is not configured.
// ============================================================================

import { Redis } from "@upstash/redis";

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

// In-memory fallback
const memoryCache = new Map<string, CacheEntry<unknown>>();

// Lazy-init Redis client (only when env vars are set)
let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (url && token) {
    redis = new Redis({ url, token });
  }
  return redis;
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  // Check in-memory first (fastest)
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined;
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data;
  }
  if (entry) memoryCache.delete(key);

  // Check Redis
  const kv = getRedis();
  if (kv) {
    try {
      const data = await kv.get<T>(key);
      if (data !== null && data !== undefined) {
        // Backfill in-memory cache (use a short TTL to avoid stale data)
        memoryCache.set(key, { data, expiresAt: Date.now() + 60_000 });
        return data;
      }
    } catch {
      // Redis unavailable, continue with null
    }
  }

  return null;
}

export async function cacheSet<T>(
  key: string,
  data: T,
  ttlSeconds: number
): Promise<void> {
  // Always write to in-memory
  memoryCache.set(key, {
    data,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });

  // Write to Redis if available
  const kv = getRedis();
  if (kv) {
    try {
      await kv.set(key, data, { ex: ttlSeconds });
    } catch {
      // Redis unavailable, in-memory cache is still set
    }
  }
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
