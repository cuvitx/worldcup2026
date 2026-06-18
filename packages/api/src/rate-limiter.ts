/**
 * Persistent rate limiter for API clients.
 * Persists counter to disk so restarts don't reset the limit.
 * Resets at midnight UTC to match API-Football's daily limit cycle.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number; // kept for interface compat, but reset is midnight-aligned
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const counters = new Map<string, RateLimitEntry>();

const DATA_DIR = process.env.VOTES_DATA_DIR ?? join(process.cwd(), ".data");
const RATE_LIMIT_FILE = join(DATA_DIR, "rate-limits.json");

/** Next midnight UTC timestamp */
function nextMidnightUTC(): number {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
  return tomorrow.getTime();
}

/** Load persisted counters from disk (once at startup) */
let loaded = false;
function loadFromDisk(): void {
  if (loaded) return;
  loaded = true;
  try {
    const raw = readFileSync(RATE_LIMIT_FILE, "utf-8");
    const data = JSON.parse(raw) as Record<string, RateLimitEntry>;
    const now = Date.now();
    for (const [key, entry] of Object.entries(data)) {
      // Only restore if not expired
      if (entry.resetAt > now) {
        counters.set(key, entry);
      }
    }
  } catch {
    // File doesn't exist or is corrupt — start fresh
  }
}

/** Persist counters to disk */
function saveToDisk(): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    const data: Record<string, RateLimitEntry> = {};
    for (const [key, entry] of counters) {
      data[key] = entry;
    }
    writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data), "utf-8");
  } catch {
    // Non-critical — worst case we lose the counter on restart
  }
}

export function checkRateLimit(key: string, config: RateLimitConfig): boolean {
  loadFromDisk();
  const now = Date.now();
  const entry = counters.get(key);

  if (!entry || now >= entry.resetAt) {
    counters.set(key, { count: 1, resetAt: nextMidnightUTC() });
    saveToDisk();
    return true; // allowed
  }

  if (entry.count >= config.maxRequests) {
    return false; // rate limited
  }

  entry.count++;
  saveToDisk();
  return true; // allowed
}

export function getRemainingRequests(key: string, config: RateLimitConfig): number {
  loadFromDisk();
  const entry = counters.get(key);
  if (!entry || Date.now() >= entry.resetAt) return config.maxRequests;
  return Math.max(0, config.maxRequests - entry.count);
}
