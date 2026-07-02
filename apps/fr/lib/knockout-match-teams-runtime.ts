import { getFixturesByDate, type ApiFixture } from "@repo/api/football";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { teamApiIds } from "@repo/data/api-football-ids";
import { matches } from "@repo/data/matches";
import { knockoutSlotLabelsByMatchId } from "@repo/data";
import { teamsById } from "@repo/data/teams";
import type { Match, Team } from "@repo/data/types";
import {
  needsKnockoutTeamResolution,
  resolveMatchTeams,
  type ResolvedMatchTeams,
} from "./knockout-match-teams";

type OfficialFixtureTeams = {
  home: Team;
  away: Team;
};

const apiTeamIdToTeam = new Map<number, Team>(
  Object.entries(teamApiIds).flatMap(([teamId, apiTeamId]) => {
    if (teamId.startsWith("barrage-")) return [];
    const team = teamsById[teamId];
    return team && apiTeamId > 0 ? [[apiTeamId, team]] : [];
  }),
);

const officialFixtureTeamsCache = new Map<
  string,
  Promise<OfficialFixtureTeams | null>
>();

const knownOfficialKnockoutTeamIdsByMatchId: Record<string, [string, string]> = {
  m73: ["afrique-du-sud", "canada"],
  m74: ["bresil", "japon"],
  m75: ["allemagne", "paraguay"],
  m76: ["pays-bas", "maroc"],
  m77: ["cote-divoire", "norvege"],
  m78: ["france", "suede"],
  m79: ["mexique", "equateur"],
  m80: ["angleterre", "rd-congo"],
  m81: ["belgique", "senegal"],
  m82: ["etats-unis", "bosnie-herzegovine"],
  m83: ["espagne", "autriche"],
  m84: ["portugal", "croatie"],
  m85: ["suisse", "algerie"],
  m86: ["australie", "egypte"],
  m87: ["argentine", "cap-vert"],
  m88: ["colombie", "ghana"],
};

function resolveKnownOfficialFixtureTeams(match: Match): OfficialFixtureTeams | null {
  const teamIds = knownOfficialKnockoutTeamIdsByMatchId[match.id];
  if (!teamIds) return null;

  const home = teamsById[teamIds[0]];
  const away = teamsById[teamIds[1]];
  if (!home || !away) return null;

  return { home, away };
}

function isWinnerDrivenMatch(match: Match) {
  return (knockoutSlotLabelsByMatchId[match.id] ?? []).some((label) =>
    label.startsWith("Vainqueur "),
  );
}

function kickoffDateUtc(match: Match) {
  return new Date(`${match.date}T${match.time}:00+02:00`)
    .toISOString()
    .slice(0, 10);
}

function kickoffMinute(match: Match) {
  return Math.round(
    new Date(`${match.date}T${match.time}:00+02:00`).getTime() / 60000,
  );
}

function fixtureKickoffMinute(fixture: ApiFixture) {
  return Math.round(new Date(fixture.fixture.date).getTime() / 60000);
}

function getTeamFromFixtureSide(fixture: ApiFixture, side: "home" | "away") {
  return apiTeamIdToTeam.get(fixture.teams[side].id);
}

async function resolveOfficialFixtureTeams(
  match: Match,
): Promise<OfficialFixtureTeams | null> {
  if (!needsKnockoutTeamResolution(match)) return null;

  const cacheKey = `${match.id}:${match.date}:${match.time}`;
  const cached = officialFixtureTeamsCache.get(cacheKey);
  if (cached) return cached;

  const promise = (async () => {
    const knownOfficialTeams = resolveKnownOfficialFixtureTeams(match);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return knownOfficialTeams;
    }

    const fixtureDates = Array.from(new Set([kickoffDateUtc(match), match.date]));
    const fixtures = (
      await Promise.all(fixtureDates.map((date) => getFixturesByDate(date)))
    ).flat();
    const kickoff = kickoffMinute(match);
    const candidates = fixtures.filter(
      (fixture) => fixtureKickoffMinute(fixture) === kickoff,
    );

    if (candidates.length !== 1) return knownOfficialTeams;

    const fixture = candidates[0];
    if (!fixture) return knownOfficialTeams;

    const home = getTeamFromFixtureSide(fixture, "home");
    const away = getTeamFromFixtureSide(fixture, "away");
    if (!home || !away) return knownOfficialTeams;

    return { home, away };
  })();

  officialFixtureTeamsCache.set(cacheKey, promise);
  promise
    .then((result) => {
      if (!result) officialFixtureTeamsCache.delete(cacheKey);
    })
    .catch(() => officialFixtureTeamsCache.delete(cacheKey));

  return promise;
}

export async function getKnockoutResolutionMatches(match: Match) {
  if (!needsKnockoutTeamResolution(match)) return matches;

  const officialSeed = await resolveSourceMatches(matches);
  const enrichedMatches = await enrichMatchesWithResults(officialSeed, {});
  const firstPass = await resolveSourceMatches(enrichedMatches);
  return resolveSourceMatches(firstPass);
}

async function resolveSourceMatches(sourceMatches: Match[]): Promise<Match[]> {
  const sourceById = new Map(sourceMatches.map((sourceMatch) => [
    sourceMatch.id,
    sourceMatch,
  ]));

  return Promise.all(
    matches.map(async (staticMatch) => {
      const match = sourceById.get(staticMatch.id) ?? staticMatch;
      const resolved = resolveMatchTeams(match, sourceMatches);
      const officialTeams = isWinnerDrivenMatch(staticMatch)
        ? null
        : await resolveOfficialFixtureTeams(match);
      const home = officialTeams?.home ?? resolved.home;
      const away = officialTeams?.away ?? resolved.away;

      return {
        ...match,
        homeTeamId: home?.id ?? resolved.homeTeamId,
        awayTeamId: away?.id ?? resolved.awayTeamId,
      };
    }),
  );
}

export async function resolveMatchTeamsWithResults(
  match: Match,
  fallback = "À déterminer",
  sourceMatches?: Match[],
): Promise<ResolvedMatchTeams> {
  const resolvedSourceMatches =
    sourceMatches ?? (await getKnockoutResolutionMatches(match));
  const resolved = resolveMatchTeams(match, resolvedSourceMatches, fallback);
  const officialTeams = isWinnerDrivenMatch(match)
    ? null
    : await resolveOfficialFixtureTeams(match);

  if (!officialTeams) return resolved;

  return {
    ...resolved,
    home: officialTeams.home,
    away: officialTeams.away,
    homeSlot: {
      teamId: officialTeams.home.id,
      label: officialTeams.home.name,
      status: "official",
    },
    awaySlot: {
      teamId: officialTeams.away.id,
      label: officialTeams.away.name,
      status: "official",
    },
    homeTeamId: officialTeams.home.id,
    awayTeamId: officialTeams.away.id,
    homeName: officialTeams.home.name,
    awayName: officialTeams.away.name,
  };
}
