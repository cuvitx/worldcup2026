import type { MatchData, RoundName } from "./types";
import { ROUND_ORDER } from "./types";

export function ProgressBar({ rounds }: { rounds: Record<RoundName, MatchData[]> }) {
  const totalMatches = ROUND_ORDER.reduce(
    (acc, r) => acc + rounds[r].filter((m) => m.team1 || m.team2).length,
    0
  );
  const filledMatches = ROUND_ORDER.reduce(
    (acc, r) => acc + rounds[r].filter((m) => m.winner).length,
    0
  );
  const pct = totalMatches > 0 ? Math.round((filledMatches / totalMatches) * 100) : 0;

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs text-gray-500 whitespace-nowrap font-medium">
        Progression
      </span>
      <div className="flex-1 h-2 rounded-full bg-gray-200gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 whitespace-nowrap">
        {filledMatches}/{totalMatches}
      </span>
    </div>
  );
}
