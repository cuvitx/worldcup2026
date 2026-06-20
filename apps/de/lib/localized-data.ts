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

// ── Players (with auto-generated German descriptions) ──────────────────

const positionLabelsDE: Record<string, string> = {
  GK: "Torhüter",
  DF: "Verteidiger",
  MF: "Mittelfeldspieler",
  FW: "Stürmer",
};

/** Generate a German description from player stats when no translation exists */
function autoDescriptionDE(player: Player): string {
  if (!player.description) return "";
  const pos = positionLabelsDE[player.position] ?? player.position;
  const team = teamsById[player.teamId];
  const teamName = team?.name ?? player.teamId;
  if (player.caps > 0 && player.goals > 0) {
    return `${pos} von ${player.club}. ${player.caps} Länderspiele und ${player.goals} Tore für ${teamName}.`;
  }
  if (player.caps > 0) {
    return `${pos} von ${player.club}. ${player.caps} Länderspiele für ${teamName}.`;
  }
  return `${pos} von ${player.club}.`;
}

// Star player translations (proper German descriptions)
const playerDescriptionsDE: Record<string, string> = {
  wirtz: "Wunderkind des deutschen Fußballs, genialer Spielmacher bei Bayer Leverkusen.",
  bellingham: "Kompletter Mittelfeldspieler, weit über sein Alter hinaus gereift, künftiger Ballon-d'Or-Kandidat.",
  saka: "Elektrischer und entscheidender Flügelspieler, fähig jede Abwehr aus dem Gleichgewicht zu bringen.",
  kane: "Treffsicherer Torjäger und vorbildlicher Kapitän, bester Torschütze der englischen Geschichte.",
  messi: "Lebende Legende des Fußballs, für viele der beste Spieler aller Zeiten.",
  vinicius: "Genialer Flügelspieler, Ballon-d'Or-Gewinner und Star von Real Madrid.",
  son: "Kapitän und Star, bester asiatischer Fußballspieler der Geschichte.",
  modric: "Lebende Legende, Ballon d'Or 2018, zeitloser Maestro im Mittelfeld.",
  pedri: "Eleganter und kreativer Mittelfeldspieler, Erbe des Tiki-Taka aus Barcelona.",
  rodri: "Defensiver Mittelfeldspieler, Ballon d'Or 2024, Metronom und Chef des spanischen Spiels.",
  yamal: "Wunderkind aus Barcelona, technisches Phänomen mit beeindruckender Reife.",
  tchouameni: "Kraftvoller und technisch versierter defensiver Mittelfeldspieler, Meister der Balleroberung.",
  mbappe: "Explosiver Stürmer und außergewöhnlicher Torjäger, einer der besten Spieler der Welt.",
  hakimi: "Weltklasse-Rechtsverteidiger, Star von PSG und des marokkanischen Fußballs.",
  haaland: "Tormaschine und körperliches Phänomen, einer der besten Stürmer der Welt.",
  valverde: "Kompletter Box-to-Box-Mittelfeldspieler, Kraft und Technik vereint.",
};

function applyPlayer(player: Player): Player {
  const desc = playerDescriptionsDE[player.slug];
  if (desc) return { ...player, description: desc };
  if (player.description) return { ...player, description: autoDescriptionDE(player) };
  return player;
}

export const players: Player[] = _players.map(applyPlayer);

export const playersById: Record<string, Player> = Object.fromEntries(
  Object.entries(_playersById).map(([k, v]) => [k, applyPlayer(v)])
);

export const playersBySlug: Record<string, Player> = Object.fromEntries(
  Object.entries(_playersBySlug).map(([k, v]) => [k, applyPlayer(v)])
);

export const playersByTeamId: Record<string, Player[]> = Object.fromEntries(
  Object.entries(_playersByTeamId).map(([k, v]) => [k, v.map(applyPlayer)])
);

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

// ── Stage Labels (German) ──────────────────────────────────────────────
import { stageLabelsI18n } from "@repo/data/constants";
export const stageLabels = stageLabelsI18n.de;

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

// ── Team WC History (yearly results) ────────────────────────────────
import { teamWcHistory as _teamWcHistory } from "@repo/data/team-wc-history";
import type { WcEdition } from "@repo/data/team-wc-history";

export type { WcEdition };

export const teamWcHistory: Record<string, WcEdition[]> = Object.fromEntries(
  Object.entries(_teamWcHistory).map(([k, v]) => {
    const overlay = teamWcHistoryDE[k];
    return [k, overlay ? overlay : v];
  })
);

// ── Team World Cup History (detailed: bestResult, strengths, anecdotes) ──
import { teamWorldCupHistory as _teamWorldCupHistory } from "@repo/data/team-history";
import type { TeamHistoryEntry } from "@repo/data/team-history";
import { teamHistoryDE } from "@repo/data/translations/team-history.de";
export type { TeamHistoryEntry };

/** French→German stage name mapping for notableResults */
const stageFrToDE: Record<string, string> = {
  "Champion": "Weltmeister",
  "Finaliste": "Finalist",
  "3e place": "Dritter Platz",
  "4e place": "Vierter Platz",
  "Quart de finale": "Viertelfinale",
  "Quart de finaliste": "Viertelfinalist",
  "Demi-finale": "Halbfinale",
  "Demi-finaliste": "Halbfinalist",
  "8e de finale": "Achtelfinale",
  "Huitième de finale": "Achtelfinale",
  "Phase de groupes": "Gruppenphase",
  "1er tour": "Vorrunde",
  "2e tour": "Zweite Runde",
  "Non participante": "Nicht teilgenommen",
};

function translateStage(stage: string): string {
  // Direct match
  if (stageFrToDE[stage]) return stageFrToDE[stage];
  // Partial match (e.g., "Phase de groupes (2e)")
  for (const [fr, de] of Object.entries(stageFrToDE)) {
    if (stage.startsWith(fr)) {
      return de + stage.slice(fr.length);
    }
  }
  return stage;
}

function translateBestResult(bestResult: string): string {
  // Handle patterns like "Champion (1958, 1962)" or "Quart de finaliste (1970, 1986)"
  const match = bestResult.match(/^([^(]+?)(\s*\(.*\))?$/);
  if (!match) return bestResult;
  const term = match[1]!.trim();
  const years = match[2] ?? "";
  const translated = stageFrToDE[term] ?? term;
  return `${translated}${years}`;
}

function localizeTeamHistory(entry: TeamHistoryEntry): TeamHistoryEntry {
  const overlay = teamHistoryDE[entry.teamId];
  if (overlay) {
    // Full overlay available — merge
    return { ...entry, ...overlay };
  }
  // Fallback: at minimum translate stage names
  return {
    ...entry,
    bestResult: translateBestResult(entry.bestResult),
    notableResults: entry.notableResults.map((r) => ({
      ...r,
      stage: translateStage(r.stage),
    })),
  };
}

export const teamWorldCupHistory: Record<string, TeamHistoryEntry> = Object.fromEntries(
  Object.entries(_teamWorldCupHistory).map(([k, v]) => [k, localizeTeamHistory(v)])
);
