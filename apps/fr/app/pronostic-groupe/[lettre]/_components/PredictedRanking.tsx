import Link from "next/link";
import { probToOdds } from "@repo/data/affiliates";
import type { teamsById } from "@repo/data/teams";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Team = NonNullable<(typeof teamsById)[string]>;
type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface SortedTeam {
  team: Team | undefined;
  pred: Prediction | undefined;
  id: string;
}

const RANK_LABEL = ["🥇 1er", "🥈 2e", "🥉 3e", "4e"];
const RANK_COLOR = [
  "border-secondary bg-secondary/5 dark:bg-secondary/10",
  "border-gray-400 bg-gray-50 dark:bg-slate-800/40",
  "border-primary/20 bg-primary/5 dark:bg-primary/10",
  "border-red-300 bg-red-50 dark:bg-red-900/10",
];
const RANK_BADGE = [
  "bg-secondary text-gray-900",
  "bg-gray-300 text-gray-700",
  "bg-primary text-white",
  "bg-red-200 text-red-700",
];

interface PredictedRankingProps {
  sortedTeams: SortedTeam[];
}

export function PredictedRanking({ sortedTeams }: PredictedRankingProps) {
  return (
    <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">🏆 Classement prédit</h2>
      <div className="space-y-3">
        {sortedTeams.map(({ team, pred }, idx) => {
          const qual = idx < 2;
          return (
            <div key={team!.id} className={`rounded-xl border-2 p-4 ${RANK_COLOR[idx]}`}>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${RANK_BADGE[idx]}`}>{RANK_LABEL[idx]}</span>
                <span className="text-2xl" aria-label={team!.name}>{team!.flag}</span>
                <Link href={`/equipe/${team!.slug}`} className="font-bold text-lg hover:text-primary transition-colors">{team!.name}</Link>
                {qual && (
                  <span className="ml-auto rounded-full bg-success//15 dark:bg-success//10/30 px-2 py-0.5 text-xs font-semibold text-success dark:text-success">✅ Qualifié</span>
                )}
                {idx === 2 && (
                  <span className="ml-auto rounded-full bg-secondary/10 dark:bg-secondary/20 px-2 py-0.5 text-xs font-semibold text-secondary dark:text-secondary">⚠️ Meilleur 3e possible</span>
                )}
                {idx === 3 && (
                  <span className="ml-auto rounded-full bg-red-100 dark:bg-red-900/30 px-2 py-0.5 text-xs font-semibold text-red-600 dark:text-red-400">❌ Éliminé</span>
                )}
              </div>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-gray-600 dark:text-gray-300">
                <div>
                  <span className="block text-gray-400 uppercase">FIFA</span>
                  <span className="font-semibold">{team!.fifaRanking > 0 ? `#${team!.fifaRanking}` : "—"}</span>
                </div>
                {pred && (
                  <>
                    <div>
                      <span className="block text-gray-400 uppercase">ELO</span>
                      <span className="font-semibold">{pred.eloRating}</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 uppercase">Proba groupe</span>
                      <span className="font-semibold">{Math.round(pred.groupStageProb * 100)}%</span>
                    </div>
                    <div>
                      <span className="block text-gray-400 uppercase">Cote victoire</span>
                      <span className="font-semibold">{probToOdds(pred.winnerProb)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
