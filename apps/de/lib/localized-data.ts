/**
 * Localized data re-exports for the DE app.
 *
 * Directly merges German translations onto the raw FR data objects.
 * This avoids any module-evaluation-order issues with the global registry.
 */

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
import type { Team, Stadium, City, Player } from "@repo/data/types";

// Import translation data directly (no registry dependency)
import { teamsDE } from "@repo/data/translations/teams.de";
import { stadiumsDE } from "@repo/data/translations/stadiums.de";
import { citiesDE } from "@repo/data/translations/cities.de";
import { teamContentDE } from "@repo/data/translations/team-content.de";
import { teamWcHistoryDE } from "@repo/data/translations/team-wc-history.de";

// ── Helpers ────────────────────────────────────────────────────────────
function applyTeam(team: Team): Team {
  const overlay = teamsDE[team.id];
  return overlay ? { ...team, ...overlay } : team;
}

function applyStadium(stadium: Stadium): Stadium {
  const overlay = stadiumsDE[stadium.id];
  return overlay ? { ...stadium, ...overlay } : stadium;
}

function applyCity(city: City): City {
  const overlay = citiesDE[city.id];
  return overlay ? { ...city, ...overlay } : city;
}

// ── Teams ──────────────────────────────────────────────────────────────
export const teams: Team[] = _teams.map(applyTeam);

export const teamsById: Record<string, Team> = Object.fromEntries(
  Object.entries(_teamsById).map(([k, v]) => [k, applyTeam(v)])
);

export const teamsBySlug: Record<string, Team> = Object.fromEntries(
  Object.entries(_teamsBySlug).map(([k, v]) => [k, applyTeam(v)])
);

// ── Stadiums ───────────────────────────────────────────────────────────
export const stadiums: Stadium[] = _stadiums.map(applyStadium);

export const stadiumsById: Record<string, Stadium> = Object.fromEntries(
  Object.entries(_stadiumsById).map(([k, v]) => [k, applyStadium(v)])
);

export const stadiumsBySlug: Record<string, Stadium> = Object.fromEntries(
  Object.entries(_stadiumsBySlug).map(([k, v]) => [k, applyStadium(v)])
);

// ── Cities ─────────────────────────────────────────────────────────────
export const cities: City[] = _cities.map(applyCity);

export const citiesById: Record<string, City> = Object.fromEntries(
  Object.entries(_citiesById).map(([k, v]) => [k, applyCity(v)])
);

export const citiesBySlug: Record<string, City> = Object.fromEntries(
  Object.entries(_citiesBySlug).map(([k, v]) => [k, applyCity(v)])
);

// ── Players (no DE translations yet — pass through) ────────────────────
export const players: Player[] = _players;
export const playersById = _playersById;
export const playersBySlug = _playersBySlug;
export const playersByTeamId = _playersByTeamId;

export { LAST_UPDATED };

// ── Team Content (editorial: strengths, weaknesses, anecdotes) ──────
import { teamContent as _teamContent } from "@repo/data/team-content";
import type { TeamEditorialContent } from "@repo/data/team-content";

export type { TeamEditorialContent };

export const teamContent: Record<string, TeamEditorialContent> = Object.fromEntries(
  Object.entries(_teamContent).map(([k, v]) => {
    const overlay = teamContentDE[k];
    return [k, overlay ? overlay : v];
  })
);

// ── Team WC History ─────────────────────────────────────────────────
import { teamWcHistory as _teamWcHistory } from "@repo/data/team-wc-history";
import type { WcEdition } from "@repo/data/team-wc-history";

export type { WcEdition };

export const teamWcHistory: Record<string, WcEdition[]> = Object.fromEntries(
  Object.entries(_teamWcHistory).map(([k, v]) => {
    const overlay = teamWcHistoryDE[k];
    return [k, overlay ? overlay : v];
  })
);
