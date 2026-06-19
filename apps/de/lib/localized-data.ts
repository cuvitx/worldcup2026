/**
 * Localized data re-exports for the DE app.
 *
 * Every page that displays team / stadium / city / player data should import
 * from this module instead of directly from @repo/data/*. This ensures the
 * translation overlay is applied automatically.
 */

import "@repo/data/translations/register-de";

import {
  teams as _teams,
  teamsById as _teamsById,
  teamsBySlug as _teamsBySlug,
} from "@repo/data/teams";
import {
  stadiums as _stadiums,
  stadiumsById as _stadiumsById,
  stadiumsBySlug as _stadiumsBySlug,
} from "@repo/data/stadiums";
import {
  cities as _cities,
  citiesById as _citiesById,
  citiesBySlug as _citiesBySlug,
} from "@repo/data/cities";
import {
  players as _players,
  playersById as _playersById,
  playersBySlug as _playersBySlug,
  playersByTeamId as _playersByTeamId,
  LAST_UPDATED,
} from "@repo/data/players";
import {
  localizeTeam,
  localizeStadium,
  localizeCity,
  localizePlayer,
} from "@repo/data/i18n";
import type { Team, Stadium, City, Player } from "@repo/data/types";

const LANG = "de" as const;

// ── Teams ──────────────────────────────────────────────────────────────
export const teams: Team[] = _teams.map((t) => localizeTeam(t, LANG));

export const teamsById: Record<string, Team> = Object.fromEntries(
  Object.entries(_teamsById).map(([k, v]) => [k, localizeTeam(v, LANG)])
);

export const teamsBySlug: Record<string, Team> = Object.fromEntries(
  Object.entries(_teamsBySlug).map(([k, v]) => [k, localizeTeam(v, LANG)])
);

// ── Stadiums ───────────────────────────────────────────────────────────
export const stadiums: Stadium[] = _stadiums.map((s) => localizeStadium(s, LANG));

export const stadiumsById: Record<string, Stadium> = Object.fromEntries(
  Object.entries(_stadiumsById).map(([k, v]) => [k, localizeStadium(v, LANG)])
);

export const stadiumsBySlug: Record<string, Stadium> = Object.fromEntries(
  Object.entries(_stadiumsBySlug).map(([k, v]) => [k, localizeStadium(v, LANG)])
);

// ── Cities ─────────────────────────────────────────────────────────────
export const cities: City[] = _cities.map((c) => localizeCity(c, LANG));

export const citiesById: Record<string, City> = Object.fromEntries(
  Object.entries(_citiesById).map(([k, v]) => [k, localizeCity(v, LANG)])
);

export const citiesBySlug: Record<string, City> = Object.fromEntries(
  Object.entries(_citiesBySlug).map(([k, v]) => [k, localizeCity(v, LANG)])
);

// ── Players ────────────────────────────────────────────────────────────
export const players: Player[] = _players.map((p) => localizePlayer(p, LANG));

export const playersById: Record<string, Player> = Object.fromEntries(
  Object.entries(_playersById).map(([k, v]) => [k, localizePlayer(v, LANG)])
);

export const playersBySlug: Record<string, Player> = Object.fromEntries(
  Object.entries(_playersBySlug).map(([k, v]) => [k, localizePlayer(v, LANG)])
);

export const playersByTeamId: Record<string, Player[]> = Object.fromEntries(
  Object.entries(_playersByTeamId).map(([k, v]) => [
    k,
    v.map((p) => localizePlayer(p, LANG)),
  ])
);

export { LAST_UPDATED };
