import { groups } from "@repo/data/groups";
import { predictionsByTeamId } from "@repo/data/predictions";
import { teamsById } from "@repo/data/teams";

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

const groupStandings: Record<string, { first: string | null; second: string | null; third: string | null }> = {};
for (const g of groups) {
  groupStandings[g.letter] = getPredictedGroupPositions(g.letter);
}

export const r32Bracket = [
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

export const r32Winners = r32Bracket.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

const r16Pairs = [
  { from: [0, 1] }, { from: [2, 3] }, { from: [4, 5] }, { from: [6, 7] },
  { from: [8, 9] }, { from: [10, 11] }, { from: [12, 13] }, { from: [14, 15] },
];

export const r16Matches = r16Pairs.map((pair, i) => {
  const home = r32Winners[pair.from[0]!] ?? null;
  const away = r32Winners[pair.from[1]!] ?? null;
  return { matchId: `m${89 + i}`, homeTeamId: home, awayTeamId: away };
});
export const r16Winners = r16Matches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

const qfPairs = [{ from: [0, 1] }, { from: [2, 3] }, { from: [4, 5] }, { from: [6, 7] }];
export const qfMatches = qfPairs.map((pair, i) => {
  const home = r16Winners[pair.from[0]!] ?? null;
  const away = r16Winners[pair.from[1]!] ?? null;
  return { matchId: `m${97 + i}`, homeTeamId: home, awayTeamId: away };
});
export const qfWinners = qfMatches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

const sfPairs = [{ from: [0, 1] }, { from: [2, 3] }];
export const sfMatches = sfPairs.map((pair, i) => {
  const home = qfWinners[pair.from[0]!] ?? null;
  const away = qfWinners[pair.from[1]!] ?? null;
  return { matchId: `m${101 + i}`, homeTeamId: home, awayTeamId: away };
});
export const sfWinners = sfMatches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

export const finalMatchData = {
  matchId: "m104",
  homeTeamId: sfWinners[0] ?? null,
  awayTeamId: sfWinners[1] ?? null,
};
export const champion = predictedWinner(finalMatchData.homeTeamId, finalMatchData.awayTeamId);
