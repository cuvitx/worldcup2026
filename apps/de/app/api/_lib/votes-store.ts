import { promises as fs } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface VoteCounts {
  home: number;
  draw: number;
  away: number;
}

export type VoteChoice = "home" | "draw" | "away";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const DATA_DIR = process.env.VOTES_DATA_DIR ?? join(process.cwd(), ".data");
const VOTES_FILE = join(DATA_DIR, "votes.json");
const IPS_FILE = join(DATA_DIR, "votes-ips.json");
const IP_SALT = process.env.VOTES_IP_SALT ?? "wm2026-votes-salt-2026";

// ---------------------------------------------------------------------------
// In-memory cache
// ---------------------------------------------------------------------------
let votesCache: Record<string, VoteCounts> | null = null;
let ipsCache: Record<string, string[]> | null = null;
let dirReady = false;

// Debounced write state
let writeTimer: ReturnType<typeof setTimeout> | null = null;
let writePromise: Promise<void> = Promise.resolve();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Hash an IP address (GDPR-safe — irreversible, truncated) */
export function hashIp(ip: string): string {
  return createHash("sha256")
    .update(ip + IP_SALT)
    .digest("hex")
    .slice(0, 16);
}

async function ensureDir(): Promise<void> {
  if (dirReady) return;
  await fs.mkdir(DATA_DIR, { recursive: true });
  dirReady = true;
}

/** Atomic write: temp file → rename */
async function atomicWrite(filePath: string, data: unknown): Promise<void> {
  const tmp = filePath + ".tmp";
  await fs.writeFile(tmp, JSON.stringify(data), "utf-8");
  await fs.rename(tmp, filePath);
}

async function loadJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function loadVotes(): Promise<Record<string, VoteCounts>> {
  if (votesCache) return votesCache;
  await ensureDir();
  votesCache = await loadJson<Record<string, VoteCounts>>(VOTES_FILE, {});
  return votesCache;
}

async function loadIps(): Promise<Record<string, string[]>> {
  if (ipsCache) return ipsCache;
  await ensureDir();
  ipsCache = await loadJson<Record<string, string[]>>(IPS_FILE, {});
  return ipsCache;
}

/** Debounced disk write — collapses multiple rapid votes into one I/O */
function scheduleWrite(): void {
  if (writeTimer) clearTimeout(writeTimer);
  writeTimer = setTimeout(() => {
    writeTimer = null;
    // Chain onto writePromise for sequential writes
    writePromise = writePromise
      .then(async () => {
        await ensureDir();
        if (votesCache) await atomicWrite(VOTES_FILE, votesCache);
        if (ipsCache) await atomicWrite(IPS_FILE, ipsCache);
      })
      .catch((err) => {
        console.error("[votes-store] Write error:", err);
      });
  }, 500);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Get vote counts for a match (returns zeros if no votes yet) */
export async function getVotes(slug: string): Promise<VoteCounts> {
  const data = await loadVotes();
  return data[slug] ?? { home: 0, draw: 0, away: 0 };
}

/** Cast a vote. Returns updated counts + whether the IP already voted. */
export async function castVote(
  slug: string,
  choice: VoteChoice,
  ipHash: string,
): Promise<{ counts: VoteCounts; alreadyVoted: boolean }> {
  const [votes, ips] = await Promise.all([loadVotes(), loadIps()]);

  // Check duplicate
  const slugIps = ips[slug] ?? [];
  if (slugIps.includes(ipHash)) {
    return { counts: votes[slug] ?? { home: 0, draw: 0, away: 0 }, alreadyVoted: true };
  }

  // Initialize if needed
  if (!votes[slug]) {
    votes[slug] = { home: 0, draw: 0, away: 0 };
  }
  votes[slug][choice]++;

  // Record IP hash
  if (!ips[slug]) ips[slug] = [];
  ips[slug].push(ipHash);

  // Persist (debounced)
  scheduleWrite();

  return { counts: votes[slug], alreadyVoted: false };
}
