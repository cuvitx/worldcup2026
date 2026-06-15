/**
 * Simple in-memory rate limiter for API clients.
 * Resets at midnight UTC to match API-Football's daily limit cycle.
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // kept for interface compat, but reset is midnight-aligned
}

const counters = new Map<string, { count: number; resetAt: number }>();

/** Next midnight UTC timestamp */
function nextMidnightUTC(): number {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return tomorrow.getTime();
}

export function checkRateLimit(key: string, config: RateLimitConfig): boolean {
  const now = Date.now();
  const entry = counters.get(key);

  if (!entry || now >= entry.resetAt) {
    counters.set(key, { count: 1, resetAt: nextMidnightUTC() });
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
