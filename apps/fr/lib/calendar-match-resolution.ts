import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import type { Match } from "@repo/data/types";
import { resolveMatchTeamsWithResults } from "./knockout-match-teams-runtime";

export type ResolvedCalendarMatch = Match & {
  homeName: string;
  awayName: string;
  homeFlag: string;
  awayFlag: string;
};

function isResolvedTeamId(teamId: string | undefined) {
  return Boolean(teamId && !teamId.startsWith("tbd-"));
}

function teamNameMap() {
  return Object.fromEntries(
    Object.entries(teamsById).map(([id, team]) => [id, team.name]),
  );
}

async function resolveMatchesFromSource(
  matchList: Match[],
  sourceMatches: Match[],
): Promise<ResolvedCalendarMatch[]> {
  const sourceById = new Map(sourceMatches.map((match) => [match.id, match]));

  return Promise.all(
    matchList.map(async (staticMatch) => {
      const match = sourceById.get(staticMatch.id) ?? staticMatch;
      const teams = await resolveMatchTeamsWithResults(
        match,
        "TBD",
        sourceMatches,
      );

      return {
        ...match,
        homeTeamId: teams.homeTeamId,
        awayTeamId: teams.awayTeamId,
        winnerTeamId: isResolvedTeamId(match.winnerTeamId)
          ? match.winnerTeamId
          : match.winnerSide === "home"
            ? teams.homeTeamId
            : match.winnerSide === "away"
              ? teams.awayTeamId
              : undefined,
        homeName: teams.home?.name ?? teams.homeName,
        awayName: teams.away?.name ?? teams.awayName,
        homeFlag: teams.home?.flag ?? "",
        awayFlag: teams.away?.flag ?? "",
      };
    }),
  );
}

export async function getResolvedCalendarMatches(
  matchList: Match[] = matches,
): Promise<ResolvedCalendarMatch[]> {
  const officialSeed = await resolveMatchesFromSource(matches, matches);
  const enrichedSeed = await enrichMatchesWithResults(officialSeed, teamNameMap());
  const firstPass = await resolveMatchesFromSource(matches, enrichedSeed);
  const secondPass = await resolveMatchesFromSource(matches, firstPass);

  return resolveMatchesFromSource(matchList, secondPass);
}
