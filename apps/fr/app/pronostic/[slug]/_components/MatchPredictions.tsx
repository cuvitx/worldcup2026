import Link from "next/link";
import { teams } from "@repo/data/teams";
import { matchPredictionByPair } from "@repo/data/predictions";
import type { matches as matchesType } from "@repo/data/matches";

type Match = (typeof matchesType)[number];
type Team = (typeof teams)[number];

interface MatchPredictionsProps {
  teamName: string;
  teamId: string;
  teamGroup: string;
  teamMatches: Match[];
}

export function MatchPredictions({ teamName, teamId, teamGroup, teamMatches }: MatchPredictionsProps) {
  if (teamMatches.length === 0) return null;

  return (
    <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pronostics des matchs de groupe</h2>
      <p className="mb-4 text-sm text-gray-600">Predictions pour les matchs de {teamName} dans le Groupe {teamGroup}.</p>
      <div className="space-y-4">
        {teamMatches.map((match) => {
          const opponent = teams.find((t) => t.id === (match.homeTeamId === teamId ? match.awayTeamId : match.homeTeamId));
          const isHome = match.homeTeamId === teamId;
          const matchPred = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];

          return (
            <div key={match.id} className="rounded-lg border border-gray-200 dark:border-slate-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{opponent?.flag ?? "🏳️"}</span>
                  <div>
                    <p className="font-semibold">{isHome ? "vs" : "@"} {opponent?.name ?? "A determiner"}</p>
                    <p className="text-xs text-gray-500">J{match.matchday} &middot; {match.date} &middot; {match.time} UTC</p>
                  </div>
                </div>
                {matchPred && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">{matchPred.predictedScore}</p>
                    <p className="text-xs text-gray-500">Score predit</p>
                  </div>
                )}
              </div>
              {matchPred && (
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { prob: matchPred.team1WinProb, label: teams.find((t) => t.id === match.homeTeamId)?.name ?? "Dom." },
                    { prob: matchPred.drawProb, label: "Nul" },
                    { prob: matchPred.team2WinProb, label: teams.find((t) => t.id === match.awayTeamId)?.name ?? "Ext." },
                  ].map((item, i) => {
                    const isHighest = i === 0
                      ? item.prob > matchPred.team2WinProb && item.prob > matchPred.drawProb
                      : i === 1
                      ? item.prob > matchPred.team1WinProb && item.prob > matchPred.team2WinProb
                      : item.prob > matchPred.team1WinProb && item.prob > matchPred.drawProb;
                    return (
                      <div key={i} className={`rounded p-2 text-center ${isHighest ? "bg-field/10 border border-field/30" : "bg-gray-50 dark:bg-slate-700"}`}>
                        <p className="text-sm font-bold">{Math.round(item.prob * 100)}%</p>
                        <p className="text-xs text-gray-500">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <Link href={`/match/${match.slug}`} className="text-xs text-primary hover:underline">Voir le match &rarr;</Link>
                {opponent && <Link href={`/h2h/${teams.find(t => t.id === teamId)?.slug}-vs-${opponent.slug}`} className="text-xs text-primary hover:underline">Historique H2H &rarr;</Link>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
