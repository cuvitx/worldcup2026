import type { MatchPrediction } from "@repo/data/predictions";
import type { Team } from "@repo/data/types";

interface PredictionOutcomesProps {
  prediction: MatchPrediction;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
}

export function PredictionOutcomes({
  prediction,
  home,
  away,
  homeName,
  awayName,
}: PredictionOutcomesProps) {
  const outcomes = [
    { key: "1", label: `Victoire ${homeName}`, prob: prediction.team1WinProb },
    { key: "N", label: "Match nul", prob: prediction.drawProb },
    { key: "2", label: `Victoire ${awayName}`, prob: prediction.team2WinProb },
  ];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));

  return (
    <>
      {/* 1N2 Prediction */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold">
          Pronostic 1N2 : {homeName} vs {awayName}
        </h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {outcomes.map((outcome) => {
            const isHighlighted = outcome.prob === maxProb;
            const pct = Math.round(outcome.prob * 100);
            return (
              <div
                key={outcome.key}
                className={`relative rounded-lg p-5 text-center transition-all ${
                  isHighlighted
                    ? "bg-accent/10 border-2 border-accent ring-2 ring-accent/20"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                {isHighlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                    Favori
                  </span>
                )}
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {outcome.key}
                </p>
                <p
                  className={`text-3xl font-extrabold ${
                    isHighlighted ? "text-accent" : "text-gray-700"
                  }`}
                >
                  {pct}%
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {outcome.label}
                </p>
                {/* Visual bar */}
                <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isHighlighted ? "bg-accent" : "bg-gray-400"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Score exact predit */}
      <section className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold">Score exact predit</h2>
        <div className="flex items-center justify-center gap-6 rounded-lg bg-primary/5 p-8">
          <div className="text-center">
            <span className="text-3xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
            <p className="mt-1 text-sm font-medium text-gray-600">
              {homeName}
            </p>
          </div>
          <p className="text-5xl font-extrabold text-primary tracking-wider">
            {prediction.predictedScore}
          </p>
          <div className="text-center">
            <span className="text-3xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
            <p className="mt-1 text-sm font-medium text-gray-600">
              {awayName}
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-gray-500">
          Score le plus probable selon notre modele de prediction base sur les ratings ELO,
          les statistiques récentes et l&apos;historique des confrontations.
        </p>
      </section>
    </>
  );
}
