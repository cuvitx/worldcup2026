// ============================================================================
// i18n — Translation overlay helpers
// FR data files are the source of truth. These helpers overlay translations
// for other languages without modifying the originals.
// ============================================================================

import type { Lang } from "./route-mapping";
import type { Team, Stadium, City, Player } from "./types";

// Translation overlay types — only the translatable string fields
export type TeamTranslation = Partial<Pick<Team, "name" | "slug" | "bestResult" | "description">>;
export type StadiumTranslation = Partial<Pick<Stadium, "description">>;
export type CityTranslation = Partial<Pick<City, "description">>;
export type PlayerTranslation = Partial<Pick<Player, "description">>;

// Translation registries (populated by translation files)
const teamTranslations = new Map<Lang, Map<string, TeamTranslation>>();
const stadiumTranslations = new Map<Lang, Map<string, StadiumTranslation>>();
const cityTranslations = new Map<Lang, Map<string, CityTranslation>>();
const playerTranslations = new Map<Lang, Map<string, PlayerTranslation>>();

/** Register translations for a language */
export function registerTeamTranslations(lang: Lang, translations: Record<string, TeamTranslation>) {
  const map = new Map(Object.entries(translations));
  teamTranslations.set(lang, map);
}

export function registerStadiumTranslations(lang: Lang, translations: Record<string, StadiumTranslation>) {
  const map = new Map(Object.entries(translations));
  stadiumTranslations.set(lang, map);
}

export function registerCityTranslations(lang: Lang, translations: Record<string, CityTranslation>) {
  const map = new Map(Object.entries(translations));
  cityTranslations.set(lang, map);
}

export function registerPlayerTranslations(lang: Lang, translations: Record<string, PlayerTranslation>) {
  const map = new Map(Object.entries(translations));
  playerTranslations.set(lang, map);
}

/** Localize a team — returns original for FR, overlays translation for other langs */
export function localizeTeam(team: Team, lang: Lang): Team {
  if (lang === "fr") return team;
  const overlay = teamTranslations.get(lang)?.get(team.id);
  return overlay ? { ...team, ...overlay } : team;
}

/** Localize a stadium */
export function localizeStadium(stadium: Stadium, lang: Lang): Stadium {
  if (lang === "fr") return stadium;
  const overlay = stadiumTranslations.get(lang)?.get(stadium.id);
  return overlay ? { ...stadium, ...overlay } : stadium;
}

/** Localize a city */
export function localizeCity(city: City, lang: Lang): City {
  if (lang === "fr") return city;
  const overlay = cityTranslations.get(lang)?.get(city.id);
  return overlay ? { ...city, ...overlay } : city;
}

/** Localize a player */
export function localizePlayer(player: Player, lang: Lang): Player {
  if (lang === "fr") return player;
  const overlay = playerTranslations.get(lang)?.get(player.id);
  return overlay ? { ...player, ...overlay } : player;
}

/** Batch localize — convenience for arrays */
export function localizeTeams(teams: Team[], lang: Lang): Team[] {
  if (lang === "fr") return teams;
  return teams.map((t) => localizeTeam(t, lang));
}

export function localizeStadiums(stadiums: Stadium[], lang: Lang): Stadium[] {
  if (lang === "fr") return stadiums;
  return stadiums.map((s) => localizeStadium(s, lang));
}

export function localizeCities(cities: City[], lang: Lang): City[] {
  if (lang === "fr") return cities;
  return cities.map((c) => localizeCity(c, lang));
}

export function localizePlayers(players: Player[], lang: Lang): Player[] {
  if (lang === "fr") return players;
  return players.map((p) => localizePlayer(p, lang));
}
