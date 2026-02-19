import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { groups } from "@repo/data/groups";
import { predictionsByTeamId, type TeamPrediction } from "@repo/data/predictions";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tableau final CDM 2026 | Bracket et phase a elimination directe",
  description:
    "Tableau final de la Coupe du Monde 2026 : bracket complet des 32e, 16e, quarts, demis et finale. Pronostics et équipes favorites pour chaque tour.",
  alternates: getStaticAlternates("bracket", "fr"),
  openGraph: {
    title: "Tableau final - Coupe du Monde 2026",
    description:
      "Visualisez le bracket complet de la phase a elimination directe du Mondial 2026.",
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
// Format: [homeLabel, awayLabel, matchIndex in knockout matches]
// homeLabel/awayLabel reference group positions like "1A", "2B", "3rd ABCDF", etc.
const r32Bracket: Array<{
  matchId: string;
  homeLabel: string;
  awayLabel: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
}> = [
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

// R16 pairs: winners of R32 matches face each other
const r16Pairs = [
  { matchId: "m89", from: [0, 1] },   // R32-1 vs R32-2
  { matchId: "m90", from: [2, 3] },   // R32-3 vs R32-4
  { matchId: "m91", from: [4, 5] },   // R32-5 vs R32-6
  { matchId: "m92", from: [6, 7] },   // R32-7 vs R32-8
  { matchId: "m93", from: [8, 9] },   // R32-9 vs R32-10
  { matchId: "m94", from: [10, 11] }, // R32-11 vs R32-12
  { matchId: "m95", from: [12, 13] }, // R32-13 vs R32-14
  { matchId: "m96", from: [14, 15] }, // R32-15 vs R32-16
];

// QF pairs: winners of R16 matches
const qfPairs = [
  { matchId: "m97", from: [0, 1] },
  { matchId: "m98", from: [2, 3] },
  { matchId: "m99", from: [4, 5] },
  { matchId: "m100", from: [6, 7] },
];

// SF pairs
const sfPairs = [
  { matchId: "m101", from: [0, 1] },
  { matchId: "m102", from: [2, 3] },
];

// Final
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
  "round-of-32": { bg: "bg-primary/5 dark:bg-primary/30", border: "border-gray-200 dark:border-slate-700", text: "text-primary dark:text-secondary", badge: "bg-primary" },
  "round-of-16": { bg: "bg-primary/50 dark:bg-primary/950/30", border: "border-indigo-200 dark:border-indigo-800", text: "text-secondary800 dark:text-secondary300", badge: "bg-primary/600" },
  "quarter-final": { bg: "bg-primary/50 dark:bg-primary/950/30", border: "border-purple-200 dark:border-purple-800", text: "text-secondary800 dark:text-secondary300", badge: "bg-primary/600" },
  "semi-final": { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800", text: "text-amber-800 dark:text-amber-300", badge: "bg-amber-600" },
  final: { bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-300 dark:border-yellow-700", text: "text-yellow-800 dark:text-yellow-300", badge: "bg-yellow-600" },
};

function TeamSlot({ teamId, isWinner, label }: { teamId: string | null; isWinner?: boolean; label?: string }) {
  const team = teamId ? teamsById[teamId] : null;
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 italic">
        <span className="text-base">🏳️</span>
        <span>{label ?? "À déterminer"}</span>
      </div>
    );
  }
  return (
    <Link
      href={`/equipe/${team.slug}`}
      className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
        isWinner ? "font-bold text-primary dark:text-accent" : "text-gray-700 dark:text-gray-300"
      }`}
    >
      <span className="text-base" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
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
    ? new Date(match.date + "T" + match.time + ":00Z").toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
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
          <div className="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-black/20 flex justify-between">
            <span>{dateStr}</span>
            <span className="text-gray-500">{match.slug}</span>
          </div>
        </Link>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            <TeamSlot teamId={homeTeamId} isWinner={winnerId === homeTeamId} label={homeLabel} />
            <TeamSlot teamId={awayTeamId} isWinner={winnerId === awayTeamId} label={awayLabel} />
          </div>
        </>
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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-primary dark:hover:text-accent">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Tableau final</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Tableau final CDM 2026</h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Bracket complet de la phase a elimination directe : 32e de finale, 16e de finale,
            quarts de finale, demi-finales et finale. Pronostics bases sur les classements ELO.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-12">
        {/* Champion prediction */}
        {champion && teamsById[champion] && (
          <section className="rounded-xl border-2 border-yellow-400 dark:border-yellow-600 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 p-6 text-center">
            <p className="text-sm font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2">🏆 Champion prédit</p>
            <Link href={`/equipe/${teamsById[champion]!.slug}`} className="inline-flex items-center gap-3 hover:opacity-80">
              <span className="text-3xl sm:text-5xl" role="img" aria-label={`Drapeau de ${teamsById[champion]!.name}`}>{teamsById[champion]!.flag}</span>
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{teamsById[champion]!.name}</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Base sur les classements ELO et les pronostics de la phase de groupes
            </p>
          </section>
        )}

        {/* ============================================================ */}
        {/* DESKTOP BRACKET — horizontal scrollable */}
        {/* ============================================================ */}
        <section className="hidden lg:block overflow-x-auto">
          <div className="flex gap-6 items-start min-w-max pb-4">
            {/* Round of 32 */}
            <div className="space-y-3 shrink-0">
              <div className="text-center mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-32"]!.badge}`}>
                  32e de finale
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
                  16e de finale
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
                  Quarts de finale
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
                  Demi-finales
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
                  Finale
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
        {/* MOBILE BRACKET — horizontal scrollable */}
        {/* ============================================================ */}
        <section className="lg:hidden overflow-x-auto -mx-4 px-4">
          <div className="flex gap-4 items-start min-w-max pb-4">
            {/* Round of 32 */}
            <div className="space-y-2 shrink-0 w-[200px]">
              <div className="text-center mb-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-32"]!.badge}`}>
                  32e
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
            <div className="space-y-2 shrink-0 w-[200px] pt-[28px]">
              <div className="text-center mb-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["round-of-16"]!.badge}`}>
                  16e
                </span>
              </div>
              {r16Matches.map((m, i) => (
                <div key={m.matchId} className="mb-[40px]">
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
            <div className="space-y-2 shrink-0 w-[200px] pt-[80px]">
              <div className="text-center mb-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["quarter-final"]!.badge}`}>
                  Quarts
                </span>
              </div>
              {qfMatches.map((m, i) => (
                <div key={m.matchId} className="mb-[130px]">
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
            <div className="space-y-2 shrink-0 w-[200px] pt-[180px]">
              <div className="text-center mb-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors["semi-final"]!.badge}`}>
                  Demis
                </span>
              </div>
              {sfMatches.map((m, i) => (
                <div key={m.matchId} className="mb-[300px]">
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
            <div className="space-y-2 shrink-0 w-[200px] pt-[350px]">
              <div className="text-center mb-3">
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold text-white ${roundColors.final!.badge}`}>
                  Finale
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
        {/* MOBILE BRACKET — vertical fallback (accordion style) */}
        {/* ============================================================ */}
        <div className="hidden space-y-10">
          {/* Round of 32 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className={`inline-block w-3 h-3 rounded-full ${roundColors["round-of-32"]!.badge}`} />
              32e de finale
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
              16e de finale
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
              Quarts de finale
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
              Demi-finales
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
              Finale
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
        <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Probabilités par tour</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Chances de chaque équipe d&#39;atteindre chaque tour, basees sur les classements ELO.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 text-left">
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Équipe</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Sortie groupes</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">16e</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Quarts</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Demis</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Finale</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Champion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {[...Object.values(predictionsByTeamId)]
                  .sort((a, b) => b.winnerProb - a.winnerProb)
                  .slice(0, 16)
                  .map((pred) => {
                    const team = teamsById[pred.teamId];
                    if (!team) return null;
                    return (
                      <tr key={pred.teamId} className="hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-2.5">
                          <Link href={`/equipe/${team.slug}`} className="flex items-center gap-2 hover:text-accent text-gray-900 dark:text-white">
                            <span role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
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
          <h2>Comment fonctionne le tableau final de la Coupe du Monde 2026 ?</h2>
          <p>
            La Coupe du Monde 2026 accueille 48 équipes reparties en 12 groupes de 4. A l&#39;issue de la phase de
            groupes, les deux premiers de chaque groupe (24 équipes) et les 8 meilleurs troisièmes se qualifiént
            pour la phase a elimination directe, soit 32 équipes au total.
          </p>
          <p>
            Le tableau final commence par les 32e de finale (16 matchs), suivis des 16e de finale (8 matchs),
            des quarts de finale (4 matchs), des demi-finales (2 matchs), et enfin la grande finale au
            MetLife Stadium de New York le 19 juillet 2026.
          </p>
          <h3>Pronostics du bracket</h3>
          <p>
            Les pronostics affiches sur cette page sont bases sur les classements ELO des équipes. L&#39;équipe
            avec le meilleur classement ELO est predite comme vainqueur de chaque confrontation. Ces pronostics
            seront mis à jour au fur et a mesure de l&#39;avancée du tournoi avec les résultats réels.
          </p>
        </section>
      </div>
    </>
  );
}
