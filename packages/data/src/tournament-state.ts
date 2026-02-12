import type { Match } from "./types";
import { matches } from "./matches";

// ============================================================================
// Tournament phase detection & match scheduling utilities
// ============================================================================

export type TournamentPhase =
  | "pre-tournament"
  | "group-stage"
  | "round-of-32"
  | "round-of-16"
  | "quarter-finals"
  | "semi-finals"
  | "final"
  | "completed";

export type MatchPhase = "upcoming" | "live" | "completed";

const TOURNAMENT_START = "2026-06-11";
const TOURNAMENT_END = "2026-07-19";

/** Build a UTC Date from a match date (ISO) and time (HH:MM UTC). */
function matchDateTime(matchDate: string, matchTime: string): Date {
  return new Date(`${matchDate}T${matchTime}:00Z`);
}

/**
 * Get the current tournament phase based on today's date.
 *
 * Looks at the stages of recent / today's matches to determine which
 * phase the tournament is currently in. Falls back to date-based checks
 * for pre-tournament and completed states.
 */
export function getTournamentPhase(): TournamentPhase {
  const now = new Date();
  const startDate = new Date(`${TOURNAMENT_START}T00:00:00Z`);
  const endDate = new Date(`${TOURNAMENT_END}T23:59:59Z`);

  if (now < startDate) return "pre-tournament";
  if (now > endDate) return "completed";

  // Find the most recent match that has started (or is live)
  const sortedDesc = [...matches]
    .map((m) => ({ match: m, dt: matchDateTime(m.date, m.time) }))
    .filter(({ dt }) => dt <= now)
    .sort((a, b) => b.dt.getTime() - a.dt.getTime());

  if (sortedDesc.length === 0) {
    // Tournament date range but no match has started yet (first day before kickoff)
    return "pre-tournament";
  }

  const latestStage = sortedDesc[0]!.match.stage;

  const stageToPhase: Record<Match["stage"], TournamentPhase> = {
    group: "group-stage",
    "round-of-32": "round-of-32",
    "round-of-16": "round-of-16",
    "quarter-final": "quarter-finals",
    "semi-final": "semi-finals",
    "third-place": "final", // third-place and final share the "final" phase
    final: "final",
  };

  return stageToPhase[latestStage];
}

/**
 * Days until the first match (June 11, 2026).
 * Returns a negative number if the tournament has already started.
 */
export function getDaysUntilKickoff(): number {
  const now = new Date();
  const start = new Date(`${TOURNAMENT_START}T00:00:00Z`);
  const diffMs = start.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/** Get today's matches sorted by time (UTC). */
export function getTodaysMatches(): Match[] {
  const todayISO = new Date().toISOString().slice(0, 10);
  return matches
    .filter((m) => m.date === todayISO)
    .sort((a, b) => a.time.localeCompare(b.time));
}

/**
 * Get the next upcoming match (first match whose start time is still in
 * the future).
 */
export function getNextMatch(): Match | null {
  const now = new Date();
  const upcoming = matches
    .filter((m) => matchDateTime(m.date, m.time) > now)
    .sort(
      (a, b) =>
        matchDateTime(a.date, a.time).getTime() -
        matchDateTime(b.date, b.time).getTime(),
    );
  return upcoming[0] ?? null;
}

/**
 * Determine whether a specific match is upcoming, live, or completed.
 *
 * - **live** : current time is between match start and +3 h after start.
 * - **completed** : current time is > 3 h after start.
 * - **upcoming** : otherwise (match has not started yet).
 */
export function getMatchPhase(matchDate: string, matchTime: string): MatchPhase {
  const now = new Date();
  const start = matchDateTime(matchDate, matchTime);
  const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // +3 hours

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "live";
  return "completed";
}

/** Get matches for a specific date (ISO format, e.g. "2026-06-11"). */
export function getMatchesByDate(date: string): Match[] {
  return matches
    .filter((m) => m.date === date)
    .sort((a, b) => a.time.localeCompare(b.time));
}

/** Get all match dates as a sorted array of unique ISO date strings. */
export function getMatchDates(): string[] {
  const dates = new Set(matches.map((m) => m.date));
  return [...dates].sort();
}
