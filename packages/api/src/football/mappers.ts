// ============================================================================
// Map API-Football responses to @repo/data types
// Merges live API data with static data, preserving static as fallback.
// ============================================================================

import type { Team } from "@repo/data/types";
import type { ApiTeamStats, ApiInjury } from "./types";

export interface EnrichedTeamData {
  form: string | null;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  cleanSheets: number;
}

export interface InjuryInfo {
  playerName: string;
  type: string;
  reason: string;
}

/** Merge API team stats with static team data */
export function enrichTeamFromApi(
  _team: Team,
  apiStats: ApiTeamStats | null
): EnrichedTeamData | null {
  if (!apiStats) return null;

  return {
    form: apiStats.form || null,
    played: apiStats.fixtures.played.total,
    wins: apiStats.fixtures.wins.total,
    draws: apiStats.fixtures.draws.total,
    losses: apiStats.fixtures.loses.total,
    goalsFor: apiStats.goals.for.total.total,
    goalsAgainst: apiStats.goals.against.total.total,
    cleanSheets: apiStats.clean_sheet.total,
  };
}

/** Map API injuries to simplified format */
export function mapInjuries(apiInjuries: ApiInjury[]): InjuryInfo[] {
  return apiInjuries.map((injury) => ({
    playerName: injury.player.name,
    type: injury.type,
    reason: injury.reason,
  }));
}
