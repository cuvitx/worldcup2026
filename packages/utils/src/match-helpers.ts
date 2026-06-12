import type { Match } from "@repo/data/types";

/**
 * Build a Date from match date/time (Europe/Paris CEST).
 * We parse as UTC-equivalent by appending "+02:00" so that
 * Date.getTime() returns the correct absolute instant.
 */
function toMatchDate(date: string, time: string): Date {
  return new Date(`${date}T${time}:00+02:00`);
}

/**
 * Get upcoming matches (future only)
 */
export function getUpcomingMatches(matches: Match[]): Match[] {
  const now = new Date();
  return matches.filter((m) => {
    const matchDate = toMatchDate(m.date, m.time ?? "00:00");
    return matchDate >= now;
  });
}

/**
 * Get past matches (already played)
 */
export function getPastMatches(matches: Match[]): Match[] {
  const now = new Date();
  return matches.filter((m) => {
    const matchDate = toMatchDate(m.date, m.time ?? "00:00");
    return matchDate < now;
  });
}

/**
 * Check if a match is currently live
 * A match is considered live if it's within 2 hours of kickoff time
 */
export function isMatchLive(match: Match): boolean {
  const now = new Date();
  const matchDate = toMatchDate(match.date, match.time ?? "00:00");
  const twoHoursMs = 2 * 60 * 60 * 1000;
  const diff = now.getTime() - matchDate.getTime();

  // Match is live if kickoff was in the past but within 2 hours
  return diff >= 0 && diff < twoHoursMs;
}

/**
 * Format match date for display
 * @param match - The match object
 * @param locale - Locale for formatting (default: 'fr-FR')
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatMatchDate(
  match: Match,
  locale = "fr-FR",
  options?: Intl.DateTimeFormatOptions
): string {
  const matchDate = toMatchDate(match.date, match.time ?? "00:00");
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  };

  return matchDate.toLocaleString(locale, options ?? defaultOptions);
}
