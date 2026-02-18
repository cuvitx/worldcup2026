import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { predictionsByTeamId, type TeamPrediction } from "@repo/data/predictions";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "World Cup 2026 Bracket | Full Knockout Stage Draw & Predictions",
  description:
    "Complete FIFA World Cup 2026 knockout bracket: Round of 32, Round of 16, Quarter-Finals, Semi-Finals and Final. ELO-based predictions for every match.",
  alternates: getStaticAlternates("bracket", "en"),
  openGraph: {
    title: "World Cup 2026 Bracket",
    description:
      "Visualize the complete knockout bracket for the 2026 FIFA World Cup in the USA, Canada & Mexico.",
  },
};

// ---------------------------------------------------------------------------
// Bracket data helpers
// ---------------------------------------------------------------------------

/** Get the predicted group winner (1st) and runner-up (2nd) based on ELO */
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

// Build predicted group standings for all 12 groups
const groupStandings: Record<string, { first: string | null; second: string | null; third: string | null }> = {};
for (const g of groups) {
  groupStandings[g.letter] = getPredictedGroupPositions(g.letter);
}

// R32 bracket structure based on the FIFA World Cup 2026 bracket
const r32Bracket: Array<{
  matchId: string;
  homeLabel: string;
  awayLabel: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
}> = [
  { matchId: "m73", homeLabel: "2A", awayLabel: "2B", homeTeamId: groupStandings.A?.second ?? null, awayTeamId: groupStandings.B?.second ?? null },
  { matchId: "m74", homeLabel: "1C", awayLabel: "2F", homeTeamId: groupStandings.C?.first ?? null, awayTeamId: groupStandings.F?.second ?? null },
  { matchId: "m75", homeLabel: "1E", awayLabel: "3rd ABCDF", homeTeamId: groupStandings.E?.first ?? null, awayTeamId: null },
  { matchId: "m76", homeLabel: "1F", awayLabel: "2C", homeTeamId: groupStandings.F?.first ?? null, awayTeamId: groupStandings.C?.second ?? null },
  { matchId: "m77", homeLabel: "2E", awayLabel: "2I", homeTeamId: groupStandings.E?.second ?? null, awayTeamId: groupStandings.I?.second ?? null },
  { matchId: "m78", homeLabel: "1I", awayLabel: "3rd CDFGH", homeTeamId: groupStandings.I?.first ?? null, awayTeamId: null },
  { matchId: "m79", homeLabel: "1A", awayLabel: "3rd CEFHI", homeTeamId: groupStandings.A?.first ?? null, awayTeamId: null },
  { matchId: "m80", homeLabel: "1L", awayLabel: "3rd EHIJK", homeTeamId: groupStandings.L?.first ?? null, awayTeamId: null },
  { matchId: "m81", homeLabel: "1G", awayLabel: "3rd AEHIJ", homeTeamId: groupStandings.G?.first ?? null, awayTeamId: null },
  { matchId: "m82", homeLabel: "1D", awayLabel: "3rd BEFIJ", homeTeamId: groupStandings.D?.first ?? null, awayTeamId: null },
  { matchId: "m83", homeLabel: "1H", awayLabel: "2J", homeTeamId: groupStandings.H?.first ?? null, awayTeamId: groupStandings.J?.second ?? null },
  { matchId: "m84", homeLabel: "2K", awayLabel: "2L", homeTeamId: groupStandings.K?.second ?? null, awayTeamId: groupStandings.L?.second ?? null },
  { matchId: "m85", homeLabel: "1B", awayLabel: "3rd EFGIJ", homeTeamId: groupStandings.B?.first ?? null, awayTeamId: null },
  { matchId: "m86", homeLabel: "2D", awayLabel: "2G", homeTeamId: groupStandings.D?.second ?? null, awayTeamId: groupStandings.G?.second ?? null },
  { matchId: "m87", homeLabel: "1J", awayLabel: "2H", homeTeamId: groupStandings.J?.first ?? null, awayTeamId: groupStandings.H?.second ?? null },
  { matchId: "m88", homeLabel: "1K", awayLabel: "2L", homeTeamId: groupStandings.K?.first ?? null, awayTeamId: groupStandings.L?.second ?? null },
];

// R16 pairs: winners of R32 matches face each other
const r16Pairs = [
  { matchId: "m89", from: [0, 1] },
  { matchId: "m90", from: [2, 3] },
  { matchId: "m91", from: [4, 5] },
  { matchId: "m92", from: [6, 7] },
  { matchId: "m93", from: [8, 9] },
  { matchId: "m94", from: [10, 11] },
  { matchId: "m95", from: [12, 13] },
  { matchId: "m96", from: [14, 15] },
];

const qfPairs = [
  { matchId: "m97", from: [0, 1] },
  { matchId: "m98", from: [2, 3] },
  { matchId: "m99", from: [4, 5] },
  { matchId: "m100", from: [6, 7] },
];

const sfPairs = [
  { matchId: "m101", from: [0, 1] },
  { matchId: "m102", from: [2, 3] },
];

const finalMatch = { matchId: "m104", from: [0, 1] };

/** Pick predicted winner between two teams based on ELO */
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

// Compute R32 winners
const r32Winners = r32Bracket.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

// Compute R16
const r16Matches = r16Pairs.map((pair) => {
  const home = r32Winners[pair.from[0]!] ?? null;
  const away = r32Winners[pair.from[1]!] ?? null;
  return { matchId: pair.matchId, homeTeamId: home, awayTeamId: away };
});
const r16Winners = r16Matches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

// Compute QF
const qfMatches = qfPairs.map((pair) => {
  const home = r16Winners[pair.from[0]!] ?? null;
  const away = r16Winners[pair.from[1]!] ?? null;
  return { matchId: pair.matchId, homeTeamId: home, awayTeamId: away };
});
const qfWinners = qfMatches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

// Compute SF
const sfMatches = sfPairs.map((pair) => {
  const home = qfWinners[pair.from[0]!] ?? null;
  const away = qfWinners[pair.from[1]!] ?? null;
  return { matchId: pair.matchId, homeTeamId: home, awayTeamId: away };
});
const sfWinners = sfMatches.map((m) => predictedWinner(m.homeTeamId, m.awayTeamId));

// Final
const finalMatchData = {
  matchId: finalMatch.matchId,
  homeTeamId: sfWinners[finalMatch.from[0]!] ?? null,
  awayTeamId: sfWinners[finalMatch.from[1]!] ?? null,
};
const champion = predictedWinner(finalMatchData.homeTeamId, finalMatchData.awayTeamId);

// ---------------------------------------------------------------------------
// UI Components
// ---------------------------------------------------------------------------

const roundColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  "round-of-32": { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", badge: "bg-blue-600" },
  "round-of-16": { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-800", badge: "bg-indigo-600" },
  "quarter-final": { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", badge: "bg-purple-600" },
  "semi-final": { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-800", badge: "bg-amber-600" },
  final: { bg: "bg-yellow-50", border: "border-yellow-300", text: "text-yellow-800", badge: "bg-yellow-600" },
};

function TeamSlot({ teamId, isWinner, label }: { teamId: string | null; isWinner?: boolean; label?: string }) {
  const team = teamId ? teamsById[teamId] : null;
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 italic">
        <span className="text-base">🏳️</span>
        <span>{label ?? "TBD"}</span>
      </div>
    );
  }
  return (
    <Link
      href={`/team/${team.slug}`}
      className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-100 rounded ${
        isWinner ? "font-bold text-primary" : "text-gray-700"
      }`}
    >
      <span className="text-base">{team.flag}</span>
      <span className="truncate">{team.name}</span>
      {isWinner && <span className="ml-auto text-xs text-green-600 font-semibold">&#10003;</span>}
    </Link>
  );
}

function MatchCard({
  matchId,
  homeTeamId,
  awayTeamId,
  homeLabel,
  awayLabel,
  winnerId,
  stage,
}: {
  matchId: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeLabel?: string;
  awayLabel?: string;
  winnerId: string | null;
  stage: string;
}) {
  const match = matches.find((m) => m.id === matchId);
  const colors = roundColors[stage] ?? roundColors["round-of-32"]!;
  const dateStr = match
    ? new Date(match.date + "T" + match.time + ":00Z").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} overflow-hidden min-w-[220px]`}>
      {match ? (
        <Link href={`/match/${match.slug}`} className="block">
          <div className="divide-y divide-gray-200">
            <TeamSlot teamId={homeTeamId} isWinner={winnerId === homeTeamId} label={homeLabel} />
            <TeamSlot teamId={awayTeamId} isWinner={winnerId === awayTeamId} label={awayLabel} />
          </div>
          <div className="px-3 py-1.5 text-xs text-gray-500 bg-white/60 flex justify-between">
            <span>{dateStr}</span>
            <span className="text-gray-400">{match.slug}</span>
          </div>
        </Link>
      ) : (
        <div className="divide-y divide-gray-200">
          <TeamSlot teamId={homeTeamId} isWinner={winnerId === homeTeamId} label={homeLabel} />
          <TeamSlot teamId={awayTeamId} isWinner={winnerId === awayTeamId} label={awayLabel} />
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BracketPage() {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Bracket</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">World Cup 2026 Bracket</h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Complete knockout stage bracket: Round of 32, Round of 16, Quarter-Finals,
            Semi-Finals and the Final. Predictions based on ELO ratings.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {/* Champion prediction */}
        {champion && teamsById[champion] && (
          <section className="rounded-xl border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 text-center">
            <p className="text-sm font-medium text-amber-700 uppercase tracking-wide mb-2">Predicted Champion</p>
            <Link href={`/team/${teamsById[champion]!.slug}`} className="inline-flex items-center gap-3 hover:opacity-80">
              <span className="text-5xl">{teamsById[champion]!.flag}</span>
              <span className="text-3xl font-extrabold text-gray-900">{teamsById[champion]!.name}</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Based on ELO ratings and group stage predictions
            </p>
          </section>
        )}

        {/* ============================================================ */}
        {/* DESKTOP BRACKET */}
        {/* ============================================================ */}
        <section className="hidden lg:block overflow-x-auto">
          <div className="flex gap-6 items-start min-w-max pb-4">
            {/* Round of 32 */}
            <div className="space-y-3 shrink-0">
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-32"]!.badge}`}>
                  Round of 32
                </span>
              </div>
              {r32Bracket.map((m, i) => (
                <MatchCard
                  key={m.matchId}
                  matchId={m.matchId}
                  homeTeamId={m.homeTeamId}
                  awayTeamId={m.awayTeamId}
                  homeLabel={m.homeLabel}
                  awayLabel={m.awayLabel}
                  winnerId={r32Winners[i] ?? null}
                  stage="round-of-32"
                />
              ))}
            </div>

            {/* Round of 16 */}
            <div className="space-y-3 shrink-0 pt-[36px]">
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-16"]!.badge}`}>
                  Round of 16
                </span>
              </div>
              {r16Matches.map((m, i) => (
                <div key={m.matchId} className="mb-[52px]">
                  <MatchCard
                    matchId={m.matchId}
                    homeTeamId={m.homeTeamId}
                    awayTeamId={m.awayTeamId}
                    winnerId={r16Winners[i] ?? null}
                    stage="round-of-16"
                  />
                </div>
              ))}
            </div>

            {/* Quarter-finals */}
            <div className="space-y-3 shrink-0 pt-[108px]">
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["quarter-final"]!.badge}`}>
                  Quarter-Finals
                </span>
              </div>
              {qfMatches.map((m, i) => (
                <div key={m.matchId} className="mb-[172px]">
                  <MatchCard
                    matchId={m.matchId}
                    homeTeamId={m.homeTeamId}
                    awayTeamId={m.awayTeamId}
                    winnerId={qfWinners[i] ?? null}
                    stage="quarter-final"
                  />
                </div>
              ))}
            </div>

            {/* Semi-finals */}
            <div className="space-y-3 shrink-0 pt-[252px]">
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["semi-final"]!.badge}`}>
                  Semi-Finals
                </span>
              </div>
              {sfMatches.map((m, i) => (
                <div key={m.matchId} className="mb-[412px]">
                  <MatchCard
                    matchId={m.matchId}
                    homeTeamId={m.homeTeamId}
                    awayTeamId={m.awayTeamId}
                    winnerId={sfWinners[i] ?? null}
                    stage="semi-final"
                  />
                </div>
              ))}
            </div>

            {/* Final */}
            <div className="space-y-3 shrink-0 pt-[480px]">
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors.final!.badge}`}>
                  Final
                </span>
              </div>
              <MatchCard
                matchId={finalMatchData.matchId}
                homeTeamId={finalMatchData.homeTeamId}
                awayTeamId={finalMatchData.awayTeamId}
                winnerId={champion}
                stage="final"
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* MOBILE BRACKET */}
        {/* ============================================================ */}
        <div className="lg:hidden space-y-10">
          {/* Round of 32 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${roundColors["round-of-32"]!.badge}`} />
              Round of 32
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {r32Bracket.map((m, i) => (
                <MatchCard
                  key={m.matchId}
                  matchId={m.matchId}
                  homeTeamId={m.homeTeamId}
                  awayTeamId={m.awayTeamId}
                  homeLabel={m.homeLabel}
                  awayLabel={m.awayLabel}
                  winnerId={r32Winners[i] ?? null}
                  stage="round-of-32"
                />
              ))}
            </div>
          </section>

          {/* Round of 16 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${roundColors["round-of-16"]!.badge}`} />
              Round of 16
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {r16Matches.map((m, i) => (
                <MatchCard
                  key={m.matchId}
                  matchId={m.matchId}
                  homeTeamId={m.homeTeamId}
                  awayTeamId={m.awayTeamId}
                  winnerId={r16Winners[i] ?? null}
                  stage="round-of-16"
                />
              ))}
            </div>
          </section>

          {/* Quarter-finals */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${roundColors["quarter-final"]!.badge}`} />
              Quarter-Finals
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {qfMatches.map((m, i) => (
                <MatchCard
                  key={m.matchId}
                  matchId={m.matchId}
                  homeTeamId={m.homeTeamId}
                  awayTeamId={m.awayTeamId}
                  winnerId={qfWinners[i] ?? null}
                  stage="quarter-final"
                />
              ))}
            </div>
          </section>

          {/* Semi-finals */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${roundColors["semi-final"]!.badge}`} />
              Semi-Finals
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {sfMatches.map((m, i) => (
                <MatchCard
                  key={m.matchId}
                  matchId={m.matchId}
                  homeTeamId={m.homeTeamId}
                  awayTeamId={m.awayTeamId}
                  winnerId={sfWinners[i] ?? null}
                  stage="semi-final"
                />
              ))}
            </div>
          </section>

          {/* Final */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${roundColors.final!.badge}`} />
              Final
            </h2>
            <div className="max-w-sm">
              <MatchCard
                matchId={finalMatchData.matchId}
                homeTeamId={finalMatchData.homeTeamId}
                awayTeamId={finalMatchData.awayTeamId}
                winnerId={champion}
                stage="final"
              />
            </div>
          </section>
        </div>

        {/* ============================================================ */}
        {/* Tournament Probabilities Summary */}
        {/* ============================================================ */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Tournament Probabilities by Round</h2>
          <p className="text-sm text-gray-500 mb-4">
            Each team&#39;s chances of reaching each round, based on ELO ratings.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">Team</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Group Stage</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">R16</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">QF</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">SF</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Final</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Winner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[...Object.values(predictionsByTeamId)]
                  .sort((a, b) => b.winnerProb - a.winnerProb)
                  .slice(0, 16)
                  .map((pred) => {
                    const team = teamsById[pred.teamId];
                    if (!team) return null;
                    return (
                      <tr key={pred.teamId} className="hover:bg-gray-50">
                        <td className="py-2.5">
                          <Link href={`/team/${team.slug}`} className="flex items-center gap-2 hover:text-accent">
                            <span>{team.flag}</span>
                            <span className="font-medium">{team.name}</span>
                          </Link>
                        </td>
                        <td className="py-2.5 text-right">{(pred.groupStageProb * 100).toFixed(0)}%</td>
                        <td className="py-2.5 text-right">{(pred.roundOf16Prob * 100).toFixed(0)}%</td>
                        <td className="py-2.5 text-right">{(pred.quarterFinalProb * 100).toFixed(0)}%</td>
                        <td className="py-2.5 text-right">{(pred.semiFinalProb * 100).toFixed(0)}%</td>
                        <td className="py-2.5 text-right">{(pred.finalProb * 100).toFixed(0)}%</td>
                        <td className="py-2.5 text-right font-bold text-primary">
                          {pred.winnerProb >= 0.01
                            ? `${(pred.winnerProb * 100).toFixed(1)}%`
                            : `${(pred.winnerProb * 100).toFixed(2)}%`}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* SEO text */}
        <section className="prose max-w-none">
          <h2>How Does the 2026 World Cup Knockout Bracket Work?</h2>
          <p>
            The 2026 FIFA World Cup features 48 teams across 12 groups of 4. After the group stage,
            the top 2 from each group (24 teams) plus the 8 best third-place teams advance to the
            knockout stage, totaling 32 teams.
          </p>
          <p>
            The knockout bracket starts with the Round of 32 (16 matches), followed by the Round of 16
            (8 matches), Quarter-Finals (4 matches), Semi-Finals (2 matches), and the Grand Final at
            MetLife Stadium in New York on July 19, 2026.
          </p>
          <h3>Bracket Predictions</h3>
          <p>
            The predictions shown on this page are based on team ELO ratings. The team with the higher
            ELO rating is predicted as the winner of each matchup. These predictions will be updated as
            the tournament progresses with actual results.
          </p>
        </section>
      </div>
    </>
  );
}
