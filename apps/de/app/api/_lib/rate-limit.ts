/**
 * Simple in-memory rate limiter (no external dependency needed for now)
 * @module rate-limit
 */
const requests = new Map<string, { count: number; resetAt: number }>();

/**
 * Check if an IP address is within rate limits
 * @param {string} ip - Client IP address
 * @param {number} [limit=10] - Maximum requests allowed per window
 * @param {number} [windowMs=60000] - Time window in milliseconds (default 1 minute)
 * @returns {boolean} True if request is allowed, false if rate limit exceeded
 * @example
 * if (!rateLimit(ip, 30)) {
 *   return Response.json({ error: "Too many requests" }, { status: 429 });
 * }
 */
export function rateLimit(ip: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = requests.get(ip);
  if (!entry || now > entry.resetAt) {
    requests.set(ip, { count: 1, resetAt: now + windowMs });
    return true; // allowed
  }
  entry.count++;
  if (entry.count > limit) return false; // blocked
  return true;
}

// Cleanup old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of requests) {
      if (now > val.resetAt) requests.delete(key);
    }
  }, 300_000);
}
