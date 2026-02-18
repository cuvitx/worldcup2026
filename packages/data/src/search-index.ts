import { teams } from "./teams";
import { matches } from "./matches";
import { players } from "./players";
import { stadiums } from "./stadiums";
import { cities } from "./cities";
import { teamsById } from "./teams";
import { routePrefixes, type Lang } from "./route-mapping";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "team" | "match" | "player" | "stadium" | "city";
}

const typeLabels: Record<Lang, Record<SearchItem["type"], string>> = {
  fr: {
    team: "Équipe",
    match: "Match",
    player: "Joueur",
    stadium: "Stade",
    city: "Ville",
  },
  en: {
    team: "Team",
    match: "Match",
    player: "Player",
    stadium: "Stadium",
    city: "City",
  },
  es: {
    team: "Equipo",
    match: "Partido",
    player: "Jugador",
    stadium: "Estadio",
    city: "Ciudad",
  },
};

export { typeLabels as searchTypeLabels };

const stageLabels: Record<Lang, Record<string, string>> = {
  fr: {
    group: "Phase de groupes",
    "round-of-32": "32e de finale",
    "round-of-16": "8e de finale",
    "quarter-final": "Quart de finale",
    "semi-final": "Demi-finale",
    "third-place": "Match pour la 3e place",
    final: "Finale",
  },
  en: {
    group: "Group stage",
    "round-of-32": "Round of 32",
    "round-of-16": "Round of 16",
    "quarter-final": "Quarter-final",
    "semi-final": "Semi-final",
    "third-place": "Third place play-off",
    final: "Final",
  },
  es: {
    group: "Fase de grupos",
    "round-of-32": "Dieciseisavos de final",
    "round-of-16": "Octavos de final",
    "quarter-final": "Cuartos de final",
    "semi-final": "Semifinal",
    "third-place": "Partido por el 3er puesto",
    final: "Final",
  },
};

const positionLabels: Record<Lang, Record<string, string>> = {
  fr: { GK: "Gardien", DF: "Defenseur", MF: "Milieu", FW: "Attaquant" },
  en: { GK: "Goalkeeper", DF: "Defender", MF: "Midfielder", FW: "Forward" },
  es: { GK: "Portero", DF: "Defensa", MF: "Centrocampista", FW: "Delantero" },
};

export function buildSearchIndex(lang: Lang): SearchItem[] {
  const prefixes = routePrefixes[lang];
  const items: SearchItem[] = [];

  // Teams
  for (const team of teams) {
    items.push({
      title: `${team.flag} ${team.name}`,
      description: `${team.confederation} - Groupe ${team.group} - FIFA #${team.fifaRanking}`,
      href: `/${prefixes.team}/${team.slug}`,
      type: "team",
    });
  }

  // Matches (only group stage with known teams to keep size manageable)
  for (const match of matches) {
    const home = teamsById[match.homeTeamId];
    const away = teamsById[match.awayTeamId];
    if (!home || !away) continue;

    const stageLookup = stageLabels[lang];
    const stage = (stageLookup ? stageLookup[match.stage] : undefined) ?? match.stage;
    const dateFormatted = new Date(match.date + "T00:00:00Z").toLocaleDateString(
      lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-US",
      { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }
    );

    items.push({
      title: `${home.flag} ${home.name} vs ${away.flag} ${away.name}`,
      description: `${stage} - ${dateFormatted}`,
      href: `/${prefixes.match}/${match.slug}`,
      type: "match",
    });
  }

  // Players
  for (const player of players) {
    const team = teamsById[player.teamId];
    const posLookup = positionLabels[lang];
    const pos = (posLookup ? posLookup[player.position] : undefined) ?? player.position;
    items.push({
      title: player.name,
      description: `${pos} - ${team?.name ?? player.teamId} - ${player.club}`,
      href: `/${prefixes.player}/${player.slug}`,
      type: "player",
    });
  }

  // Stadiums
  for (const stadium of stadiums) {
    items.push({
      title: stadium.name,
      description: `${stadium.city}, ${stadium.country} - ${stadium.capacity.toLocaleString()} places`,
      href: `/${prefixes.stadium}/${stadium.slug}`,
      type: "stadium",
    });
  }

  // Cities
  for (const city of cities) {
    items.push({
      title: city.name,
      description: `${city.state}, ${city.country}`,
      href: `/${prefixes.city}/${city.slug}`,
      type: "city",
    });
  }

  return items;
}
