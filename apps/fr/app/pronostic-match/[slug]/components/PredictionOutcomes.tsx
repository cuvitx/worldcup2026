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
    <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div className="section-header mb-0">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Pronostic 1-N-2
          </h2>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {homeName} vs {awayName} · Probabilités estimées
        </p>
      </div>

      <div className="p-5">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 mb-5 sm:grid-cols-3">
          {outcomes.map((outcome) => {
            const isHighlighted = outcome.prob === maxProb;
            const pct = Math.round(outcome.prob * 100);
            return (
              <div
                key={outcome.key}
                className={`relative rounded-xl p-4 text-center transition-all ${
                  isHighlighted
                    ? "bg-accent/8 border-2 border-accent shadow-md shadow-accent/10"
                    : "bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
                }`}
              >
                {isHighlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold text-white shadow-sm whitespace-nowrap">
                    ⭐ Favori
                  </span>
                )}

                {/* Key: 1 / N / 2 */}
                <p
                  className={`text-2xl font-black mb-1 ${
                    isHighlighted
                      ? "text-accent"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {outcome.key}
                </p>

                {/* Percentage */}
                <p
                  className={`text-3xl font-extrabold leading-none ${
                    isHighlighted ? "text-accent" : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {pct}
                  <span className="text-lg font-bold">%</span>
                </p>

                {/* Label */}
                <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-tight">
                  {outcome.label}
                </p>

                {/* Visual bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isHighlighted ? "bg-accent" : "bg-gray-400 dark:bg-gray-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Full width progress bars for better readability */}
        <div className="space-y-3">
          {outcomes.map((outcome) => {
            const pct = Math.round(outcome.prob * 100);
            const isHighlighted = outcome.prob === maxProb;
            return (
              <div key={`bar-${outcome.key}`} className="flex items-center gap-3">
                <span className="w-6 text-sm font-bold text-gray-500 dark:text-gray-400 text-right shrink-0">
                  {outcome.key}
                </span>
                <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isHighlighted ? "bg-accent" : "bg-gray-400 dark:bg-gray-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className={`w-10 text-sm font-bold text-right shrink-0 ${
                    isHighlighted ? "text-accent" : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {pct}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 w-28 truncate shrink-0">
                  {outcome.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
