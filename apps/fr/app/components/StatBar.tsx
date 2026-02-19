interface StatBarProps {
  label: string;
  value: number; // 0-100 percentage
  maxValue?: number; // denominator (default 100)
  color?: "accent" | "gold" | "green" | "blue" | "purple";
  showValue?: boolean;
  suffix?: string;
  size?: "sm" | "md";
}

const colorMap: Record<string, string> = {
  accent: "bg-accent",
  gold: "bg-gold",
  green: "bg-emerald-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
};

export function StatBar({
  label,
  value,
  maxValue = 100,
  color = "accent",
  showValue = true,
  suffix = "%",
  size = "md",
}: StatBarProps) {
  const pct = Math.min(100, Math.round((value / maxValue) * 100));
  const barColor = colorMap[color] ?? "bg-accent";
  const displayValue = maxValue === 100 ? value : value;

  return (
    <div className="w-full">
      <div className={`flex items-center justify-between mb-1 ${size === "sm" ? "text-xs" : "text-sm"}`}>
        <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>
        {showValue && (
          <span className="font-bold text-gray-900 dark:text-gray-100">
            {displayValue}{suffix}
          </span>
        )}
      </div>
      <div className={`w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${size === "sm" ? "h-1.5" : "h-2"}`}>
        <div
          className={`h-full rounded-full stat-bar-fill ${barColor}`}
          style={{ "--target-width": `${pct}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

interface DuelStatBarProps {
  label: string;
  home: number;
  away: number;
  homeName?: string;
  awayName?: string;
  suffix?: string;
}

/** Two-sided stat bar comparing home vs away (like SoFaScore) */
export function DuelStatBar({ label, home, away, homeName, awayName, suffix = "" }: DuelStatBarProps) {
  const total = home + away || 1;
  const homePct = Math.round((home / total) * 100);
  const awayPct = 100 - homePct;

  const homeWins = home > away;
  const awayWins = away > home;

  return (
    <div className="w-full">
      {/* Label + values */}
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm font-bold ${homeWins ? "text-accent" : "text-gray-700 dark:text-gray-300"}`}>
          {home}{suffix}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</span>
        <span className={`text-sm font-bold ${awayWins ? "text-accent" : "text-gray-700 dark:text-gray-300"}`}>
          {away}{suffix}
        </span>
      </div>
      {/* Bar */}
      <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5 bg-gray-100 dark:bg-gray-700">
        <div
          className={`h-full rounded-l-full transition-all duration-700 ${homeWins ? "bg-accent" : "bg-gray-400 dark:bg-gray-500"}`}
          style={{ width: `${homePct}%` }}
        />
        <div
          className={`h-full rounded-r-full transition-all duration-700 ${awayWins ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"}`}
          style={{ width: `${awayPct}%` }}
        />
      </div>
      {/* Names (optional) */}
      {(homeName || awayName) && (
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[10px] text-gray-400 truncate max-w-[80px]">{homeName}</span>
          <span className="text-[10px] text-gray-400 truncate max-w-[80px] text-right">{awayName}</span>
        </div>
      )}
    </div>
  );
}
