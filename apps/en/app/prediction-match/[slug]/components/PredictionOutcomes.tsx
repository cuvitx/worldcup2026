interface Outcome {
  key: string;
  label: string;
  prob: number;
}

interface PredictionOutcomesProps {
  outcomes: Outcome[];
  maxProb: number;
  homeName: string;
  awayName: string;
}

export function PredictionOutcomes({
  outcomes,
  maxProb,
  homeName,
  awayName,
}: PredictionOutcomesProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">
        1X2 Prediction: {homeName} vs {awayName}
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
                  Favourite
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
  );
}
