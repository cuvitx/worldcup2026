interface StatDuelRowProps {
  label: string;
  home: number;
  away: number;
  homeName: string;
  awayName: string;
  suffix?: string;
  invertBetter?: boolean;
}

export function StatDuelRow({
  label,
  home,
  away,
  homeName,
  awayName,
  suffix = "",
  invertBetter = false,
}: StatDuelRowProps) {
  const total = home + away || 1;
  const homePct = Math.round((home / total) * 100);
  const awayPct = 100 - homePct;

  const homeIsBetter = invertBetter ? home < away : home > away;
  const awayIsBetter = invertBetter ? away < home : away > home;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-sm font-bold ${homeIsBetter ? "text-primary" : "text-gray-700 dark:text-gray-300"}`}
        >
          {home}
          {suffix}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-300 font-medium">
          {label}
        </span>
        <span
          className={`text-sm font-bold ${awayIsBetter ? "text-accent" : "text-gray-700 dark:text-gray-300"}`}
        >
          {away}
          {suffix}
        </span>
      </div>
      <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5">
        <div
          className={`h-full rounded-l-full transition-all duration-700 ${homeIsBetter ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
          style={{ width: `${homePct}%` }}
        />
        <div
          className={`h-full rounded-r-full transition-all duration-700 ${awayIsBetter ? "bg-accent" : "bg-gray-200 dark:bg-gray-700"}`}
          style={{ width: `${awayPct}%` }}
        />
      </div>
    </div>
  );
}
