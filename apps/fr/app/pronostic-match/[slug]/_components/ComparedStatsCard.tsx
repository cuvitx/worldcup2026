import type { TeamPrediction, Team } from "@repo/data";
import { StatDuelRow } from "./StatDuelRow";

interface ComparedStatsCardProps {
  predHome: TeamPrediction;
  predAway: TeamPrediction;
  home: Team;
  away: Team;
  homeName: string;
  awayName: string;
}

export function ComparedStatsCard({
  predHome,
  predAway,
  home,
  away,
  homeName,
  awayName,
}: ComparedStatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Statistiques comparées
      </h2>
      <div className="space-y-4">
        <StatDuelRow
          label="ELO Rating"
          home={predHome.eloRating}
          away={predAway.eloRating}
          homeName={homeName}
          awayName={awayName}
        />
        <StatDuelRow
          label="Finale (%)"
          home={Math.round(predHome.finalProb * 100)}
          away={Math.round(predAway.finalProb * 100)}
          homeName={homeName}
          awayName={awayName}
          suffix="%"
        />
        <StatDuelRow
          label="Champion (%)"
          home={Math.round(predHome.winnerProb * 100)}
          away={Math.round(predAway.winnerProb * 100)}
          homeName={homeName}
          awayName={awayName}
          suffix="%"
        />
        <StatDuelRow
          label="FIFA Ranking"
          home={home.fifaRanking ?? 50}
          away={away.fifaRanking ?? 50}
          homeName={homeName}
          awayName={awayName}
          invertBetter
        />
      </div>
    </div>
  );
}
