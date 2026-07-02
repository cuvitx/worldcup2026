import { groups } from "@repo/data/groups";
import { predictionsByTeamId } from "@repo/data/predictions";
import type { Match } from "@repo/data/types";
import { computeGroupStandings } from "@repo/data";

export interface BracketMatchData {
  matchId: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeLabel?: string;
  awayLabel?: string;
}

export interface BracketData {
  r32Bracket: BracketMatchData[];
  r32Winners: Array<string | null>;
  r16Matches: BracketMatchData[];
  r16Winners: Array<string | null>;
  qfMatches: BracketMatchData[];
  qfWinners: Array<string | null>;
  sfMatches: BracketMatchData[];
  sfWinners: Array<string | null>;
  finalMatchData: BracketMatchData;
  champion: string | null;
}

function getPredictedGroupPositions(groupLetter: string) {
  const group = groups.find((g) => g.letter === groupLetter);
  if (!group) return { first: null, second: null, third: null };
  const teamPreds = group.teams
    .map((tid) => ({ teamId: tid, pred: predictionsByTeamId[tid] }))
    .sort((a, b) => (b.pred?.eloRating ?? 0) - (a.pred?.eloRating ?? 0));
  return {
    first: teamPreds[0]?.teamId ?? null,
    second: teamPreds[1]?.teamId ?? null,
    third: teamPreds[2]?.teamId ?? null,
  };
}

function getGroupPositions(groupLetter: string, matchList: Match[]) {
  const standings = computeGroupStandings(groupLetter, matchList);
  const hasPlayedMatches = standings.some((standing) => standing.played > 0);

  if (!hasPlayedMatches) return getPredictedGroupPositions(groupLetter);

  return {
    first: standings[0]?.teamId ?? null,
    second: standings[1]?.teamId ?? null,
    third: standings[2]?.teamId ?? null,
  };
}

function predictedWinner(teamAId: string | null, teamBId: string | null): string | null {
  if (!teamAId && !teamBId) return null;
  if (!teamAId) return teamBId;
  if (!teamBId) return teamAId;
  const a = predictionsByTeamId[teamAId];
  const b = predictionsByTeamId[teamBId];
  if (!a && !b) return null;
  if (!a) return teamBId;
  if (!b) return teamAId;
  return a.eloRating >= b.eloRating ? teamAId : teamBId;
}

const r16Pairs = [
  { from: [0, 1] }, { from: [2, 3] }, { from: [4, 5] }, { from: [6, 7] },
  { from: [8, 9] }, { from: [10, 11] }, { from: [12, 13] }, { from: [14, 15] },
];

const qfPairs = [{ from: [0, 1] }, { from: [2, 3] }, { from: [4, 5] }, { from: [6, 7] }];
const sfPairs = [{ from: [0, 1] }, { from: [2, 3] }];

export function buildBracketData(matchList: Match[]): BracketData {
  const groupStandings: Record<string, { first: string | null; second: string | null; third: string | null }> = {};
  for (const g of groups) {
    groupStandings[g.letter] = getGroupPositions(g.letter, matchList);
  }

  const r32Bracket = [
    { matchId: "m73", homeLabel: "2A", awayLabel: "2B", homeTeamId: groupStandings.A?.second ?? null, awayTeamId: groupStandings.B?.second ?? null },
    { matchId: "m74", homeLabel: "1C", awayLabel: "2F", homeTeamId: groupStandings.C?.first ?? null, awayTeamId: groupStandings.F?.second ?? null },
    { matchId: "m75", homeLabel: "1E", awayLabel: "3e ABCDF", homeTeamId: groupStandings.E?.first ?? null, awayTeamId: null },
    { matchId: "m76", homeLabel: "1F", awayLabel: "2C", homeTeamId: groupStandings.F?.first ?? null, awayTeamId: groupStandings.C?.second ?? null },
    { matchId: "m77", homeLabel: "2E", awayLabel: "2I", homeTeamId: groupStandings.E?.second ?? null, awayTeamId: groupStandings.I?.second ?? null },
    { matchId: "m78", homeLabel: "1I", awayLabel: "3e CDFGH", homeTeamId: groupStandings.I?.first ?? null, awayTeamId: null },
    { matchId: "m79", homeLabel: "1A", awayLabel: "3e CEFHI", homeTeamId: groupStandings.A?.first ?? null, awayTeamId: null },
    { matchId: "m80", homeLabel: "1L", awayLabel: "3e EHIJK", homeTeamId: groupStandings.L?.first ?? null, awayTeamId: null },
    { matchId: "m81", homeLabel: "1G", awayLabel: "3e AEHIJ", homeTeamId: groupStandings.G?.first ?? null, awayTeamId: null },
    { matchId: "m82", homeLabel: "1D", awayLabel: "3e BEFIJ", homeTeamId: groupStandings.D?.first ?? null, awayTeamId: null },
    { matchId: "m83", homeLabel: "1H", awayLabel: "2J", homeTeamId: groupStandings.H?.first ?? null, awayTeamId: groupStandings.J?.second ?? null },
    { matchId: "m84", homeLabel: "2K", awayLabel: "2L", homeTeamId: groupStandings.K?.second ?? null, awayTeamId: groupStandings.L?.second ?? null },
    { matchId: "m85", homeLabel: "1B", awayLabel: "3e EFGIJ", homeTeamId: groupStandings.B?.first ?? null, awayTeamId: null },
    { matchId: "m86", homeLabel: "2D", awayLabel: "2G", homeTeamId: groupStandings.D?.second ?? null, awayTeamId: groupStandings.G?.second ?? null },
    { matchId: "m87", homeLabel: "1J", awayLabel: "2H", homeTeamId: groupStandings.J?.first ?? null, awayTeamId: groupStandings.H?.second ?? null },
    { matchId: "m88", homeLabel: "1K", awayLabel: "2L", homeTeamId: groupStandings.K?.first ?? null, awayTeamId: groupStandings.L?.second ?? null },
  ];

  const r32Winners = r32Bracket.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));
  const r16Matches = r16Pairs.map((pair, i) => {
    const home = r32Winners[pair.from[0]!] ?? null;
    const away = r32Winners[pair.from[1]!] ?? null;
    return { matchId: `m${89 + i}`, homeTeamId: home, awayTeamId: away };
  });
  const r16Winners = r16Matches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));
  const qfMatches = qfPairs.map((pair, i) => {
    const home = r16Winners[pair.from[0]!] ?? null;
    const away = r16Winners[pair.from[1]!] ?? null;
    return { matchId: `m${97 + i}`, homeTeamId: home, awayTeamId: away };
  });
  const qfWinners = qfMatches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));
  const sfMatches = sfPairs.map((pair, i) => {
    const home = qfWinners[pair.from[0]!] ?? null;
    const away = qfWinners[pair.from[1]!] ?? null;
    return { matchId: `m${101 + i}`, homeTeamId: home, awayTeamId: away };
  });
  const sfWinners = sfMatches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));
  const finalMatchData = {
    matchId: "m104",
    homeTeamId: sfWinners[0] ?? null,
    awayTeamId: sfWinners[1] ?? null,
  };
  const champion = predictedWinner(finalMatchData.homeTeamId, finalMatchData.awayTeamId);

  return {
    r32Bracket,
    r32Winners,
    r16Matches,
    r16Winners,
    qfMatches,
    qfWinners,
    sfMatches,
    sfWinners,
    finalMatchData,
    champion,
  };
}

export const fallbackBracketData = buildBracketData([]);
export const {
  r32Bracket,
  r32Winners,
  r16Matches,
  r16Winners,
  qfMatches,
  qfWinners,
  sfMatches,
  sfWinners,
  finalMatchData,
  champion,
} = fallbackBracketData;
