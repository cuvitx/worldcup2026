import type { predictionsByTeamId } from "@repo/data/predictions";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface PremiumProbabilityBannerProps {
  prediction: Prediction;
  teamName: string;
}

export function PremiumProbabilityBanner({ prediction, teamName }: PremiumProbabilityBannerProps) {
  const stages = [
    { label: "Sortir des groupes", value: prediction.groupStageProb },
    { label: "Top 32", value: prediction.roundOf32Prob },
    { label: "Top 16", value: prediction.roundOf16Prob },
    { label: "Quarts de finale", value: prediction.quarterFinalProb },
    { label: "Demi-finales", value: prediction.semiFinalProb },
    { label: "Finale", value: prediction.finalProb },
    { label: "Vainqueur", value: prediction.winnerProb },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
          Probabilités {teamName} — CDM 2026
        </h3>
        <div className="space-y-2">
          {stages.map((item) => {
            const pct = Math.round(item.value * 100);
            return (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 dark:text-gray-400 w-32 sm:w-40 shrink-0 text-right">
                  {item.label}
                </span>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${Math.max(pct, 1)}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white w-10 text-right tabular-nums">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
