import type { Match } from "@repo/data/types";

/**
 * Get upcoming matches (future only)
 */
export function getUpcomingMatches(matches: Match[]): Match[] {
  const now = new Date();
  return matches.filter((m) => {
    const matchDate = new Date(`${m.date}T${m.time ?? "00:00"}Z`);
    return matchDate >= now;
  });
}

/**
 * Get past matches (already played)
 */
export function getPastMatches(matches: Match[]): Match[] {
  const now = new Date();
  return matches.filter((m) => {
    const matchDate = new Date(`${m.date}T${m.time ?? "00:00"}Z`);
    return matchDate < now;
  });
}

/**
 * Check if a match is currently live
 * A match is considered live if it's within 2 hours of kickoff time
 */
export function isMatchLive(match: Match): boolean {
  const now = new Date();
  const matchDate = new Date(`${match.date}T${match.time ?? "00:00"}Z`);
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
  const matchDate = new Date(`${match.date}T${match.time ?? "00:00"}Z`);
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
