/**
 * Simple in-memory rate limiter for API clients.
 * Tracks request counts per time window and rejects when limit is exceeded.
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // time window in milliseconds
}

const counters = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const entry = counters.get(key);

  if (!entry || now >= entry.resetAt) {
    counters.set(key, { count: 1, resetAt: now + config.windowMs });
    return true; // allowed
  }

  if (entry.count >= config.maxRequests) {
    return false; // rate limited
  }

  entry.count++;
  return true; // allowed
}

export function getRemainingRequests(key: string, config: RateLimitConfig): number {
  const entry = counters.get(key);
  if (!entry || Date.now() >= entry.resetAt) return config.maxRequests;
  return Math.max(0, config.maxRequests - entry.count);
}
