import { StatBar } from "@repo/ui/stat-bar";

interface Scorer {
  name: string;
  country: string;
  goals: number;
  editions: string;
}

interface TopScorersSectionProps {
  topScorers: Scorer[];
}

export function TopScorersSection({ topScorers }: TopScorersSectionProps) {
  const maxGoals = Math.max(...topScorers.map((s) => s.goals));

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
         Top buteurs all-time
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
        Meilleurs réalisateurs de l'histoire de la Coupe du Monde FIFA.
      </p>
      <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
        <div className="space-y-4">
          {topScorers.map((scorer, i) => (
            <div key={scorer.name} className="flex items-center gap-3">
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === 0
                    ? "bg-accent text-white"
                    : i === 1
                    ? "bg-gray-300 text-gray-700"
                    : i === 2
                    ? "bg-accent//80 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {scorer.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {scorer.country}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 hidden sm:inline">
                    {scorer.editions}
                  </span>
                </div>
                <StatBar
                  label=""
                  value={scorer.goals}
                  maxValue={maxGoals}
                  color={i === 0 ? "gold" : i < 3 ? "accent" : "blue"}
                  suffix=" buts"
                  size="md"
                  layout="default"
                  showValue={true}
                  animDelay={i * 60}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
