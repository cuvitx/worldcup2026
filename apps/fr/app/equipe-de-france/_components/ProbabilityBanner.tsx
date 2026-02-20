import type { predictionsByTeamId } from "@repo/data/predictions";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface ProbabilityBannerProps {
  prediction: Prediction;
}

export function ProbabilityBanner({ prediction }: ProbabilityBannerProps) {
  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-300 font-medium">Probabilités France CDM 2026 :</span>
          {[
            { label: "Sortir des groupes", value: prediction.groupStageProb },
            { label: "Top 16", value: prediction.roundOf16Prob },
            { label: "Quarts", value: prediction.quarterFinalProb },
            { label: "Demi-finales", value: prediction.semiFinalProb },
            { label: "Finale", value: prediction.finalProb },
            { label: "Vainqueur ", value: prediction.winnerProb },
          ].map((item) => (
            <span
              key={item.label}
              className="rounded-full px-3 py-1 bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary font-medium"
            >
              {item.label} : <strong>{Math.round(item.value * 100)}%</strong>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
