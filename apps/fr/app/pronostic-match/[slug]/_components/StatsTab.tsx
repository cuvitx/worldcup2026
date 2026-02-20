import type { Team, MatchPrediction, TeamPrediction } from "@repo/data";
import { ComparedStatsCard } from "./ComparedStatsCard";
import { WinProbabilityCard } from "./WinProbabilityCard";

interface StatsTabProps {
  predHome: TeamPrediction | undefined;
  predAway: TeamPrediction | undefined;
  home: Team | undefined;
  away: Team | undefined;
  homeName: string;
  awayName: string;
  prediction: MatchPrediction | undefined;
}

export function StatsTab({
  predHome,
  predAway,
  home,
  away,
  homeName,
  awayName,
  prediction,
}: StatsTabProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {predHome && predAway && home && away ? (
          <ComparedStatsCard
            predHome={predHome}
            predAway={predAway}
            home={home}
            away={away}
            homeName={homeName}
            awayName={awayName}
          />
        ) : (
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
            Statistiques non disponibles pour ce match.
          </div>
        )}

        {prediction && (
          <WinProbabilityCard
            prediction={prediction}
            home={home}
            away={away}
            homeName={homeName}
            awayName={awayName}
          />
        )}
      </div>
    </div>
  );
}
