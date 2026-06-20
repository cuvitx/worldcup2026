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

// ── German slug mapping (French team ID → German slug) ───────────────
const _slugMap: Record<string, string> = {};
const _reverseSlugMap: Record<string, string> = {}; // German slug → French ID
for (const [frId, overlay] of Object.entries(teamsDE)) {
  if (overlay.slug) {
    _slugMap[frId] = overlay.slug;
    _reverseSlugMap[overlay.slug] = frId;
  }
}

/** Convert a French team slug to its German equivalent */
export function getGermanSlug(frenchSlug: string): string {
  return _slugMap[frenchSlug] ?? frenchSlug;
}

/** Convert a German team slug back to the French ID (for data lookups) */
export function getFrenchId(germanSlug: string): string {
  return _reverseSlugMap[germanSlug] ?? germanSlug;
}

/** Convert a French match slug (e.g. "mexique-vs-afrique-du-sud") to German */
export function getGermanMatchSlug(frenchMatchSlug: string): string {
  const parts = frenchMatchSlug.split("-vs-");
  if (parts.length !== 2) return frenchMatchSlug;
  return `${getGermanSlug(parts[0]!)}-vs-${getGermanSlug(parts[1]!)}`;
}

/** Convert a German match slug back to French (for data lookups) */
export function getFrenchMatchSlug(germanMatchSlug: string): string {
  const parts = germanMatchSlug.split("-vs-");
  if (parts.length !== 2) return germanMatchSlug;
  return `${getFrenchId(parts[0]!)}-vs-${getFrenchId(parts[1]!)}`;
}

// ── Teams ──────────────────────────────────────────────────────────────
export const teams: Team[] = _teams.map(applyTeam);

export const teamsById: Record<string, Team> = Object.fromEntries(
  Object.entries(_teamsById).map(([k, v]) => [k, applyTeam(v)])
);

// teamsBySlug keyed by GERMAN slugs (e.g. "deutschland" → Team)
export const teamsBySlug: Record<string, Team> = Object.fromEntries(
  teams.map((t) => [t.slug, t])
);

// Also keep French slug lookup for internal resolution
export const teamsByFrenchSlug: Record<string, Team> = Object.fromEntries(
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

// ── Matches (with German slugs) ──────────────────────────────────────
import {
  matches as _matches,
  matchesBySlug as _matchesBySlug,
} from "@repo/data/matches";
import type { Match } from "@repo/data/types";

export type { Match };

function localizeMatch(match: Match): Match {
  // Generate German match slug from team IDs
  const homeSlug = getGermanSlug(match.homeTeamId);
  const awaySlug = getGermanSlug(match.awayTeamId);
  const germanSlug = `${homeSlug}-vs-${awaySlug}`;
  return { ...match, slug: germanSlug };
}

export const matches: Match[] = _matches.map(localizeMatch);

// matchesBySlug keyed by GERMAN match slugs
export const matchesBySlug: Record<string, Match> = Object.fromEntries(
  matches.map((m) => [m.slug, m])
);

// Reverse lookup: German match slug → original French match slug
export const matchSlugToFrench: Record<string, string> = Object.fromEntries(
  _matches.map((m) => {
    const localized = localizeMatch(m);
    return [localized.slug, m.slug];
  })
);

// matchesByGroup keyed by group letter (e.g. "A" → Match[])
export const matchesByGroup: Record<string, Match[]> = {};
for (const match of matches) {
  if (match.group) {
    if (!matchesByGroup[match.group]) {
      matchesByGroup[match.group] = [];
    }
    matchesByGroup[match.group]!.push(match);
  }
}

// matchesByStadium keyed by stadiumId
export const matchesByStadium: Record<string, Match[]> = {};
for (const match of matches) {
  if (!matchesByStadium[match.stadiumId]) {
    matchesByStadium[match.stadiumId] = [];
  }
  matchesByStadium[match.stadiumId]!.push(match);
}

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
