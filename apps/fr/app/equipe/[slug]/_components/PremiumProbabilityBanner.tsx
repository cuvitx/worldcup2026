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

  const winnerPct = Math.round(prediction.winnerProb * 100);

  return (
    <div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left — Title + highlight */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold">
                Probabilités {teamName}
              </h3>
            </div>
            <p className="text-sm text-gray-300 mb-6">
              Parcours estimé lors de la Coupe du Monde 2026, basé sur notre modèle ELO.
            </p>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-5 text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Chance de victoire</p>
              <p className="text-5xl font-extrabold text-accent">{winnerPct}%</p>
            </div>
          </div>

          {/* Right — Bars */}
          <div className="lg:w-2/3 space-y-3">
            {stages.map((item) => {
              const pct = Math.round(item.value * 100);
              const isWinner = item.label === "Vainqueur";
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-xs text-gray-300 w-36 sm:w-44 shrink-0 text-right font-medium">
                    {item.label}
                  </span>
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                      className={`h-full rounded-full transition-all ${isWinner ? "bg-accent" : "bg-accent"}`}
                      style={{ width: `${Math.max(pct, 2)}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold w-12 text-right tabular-nums ${isWinner ? "text-accent" : "text-white"}`}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
