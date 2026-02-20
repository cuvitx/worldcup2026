import type { Team } from "@repo/data/types";

/**
 * Get teams by group letter
 */
export function getTeamsByGroup(teams: Team[], groupLetter: string): Team[] {
  return teams.filter((t) => t.group === groupLetter);
}

/**
 * Get a single team by slug
 */
export function getTeamBySlug(teams: Team[], slug: string): Team | undefined {
  return teams.find((t) => t.slug === slug);
}

/**
 * Sort teams by FIFA ranking (ascending = best first)
 */
export function sortTeamsByRanking(teams: Team[]): Team[] {
  return [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);
}

/**
 * Get top N teams by FIFA ranking
 */
export function getTopTeams(teams: Team[], limit: number): Team[] {
  return sortTeamsByRanking(teams).slice(0, limit);
}
