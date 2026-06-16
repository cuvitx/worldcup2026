import type { ApiFixtureStatistic } from "@repo/api/football";

interface MatchStatisticsProps {
  statistics: ApiFixtureStatistic[];
  homeName: string;
  awayName: string;
}

const STAT_LABELS: Record<string, string> = {
  "Ball Possession": "Possession",
  "Total Shots": "Tirs",
  "Shots on Goal": "Tirs cadrés",
  "Corner Kicks": "Corners",
  Fouls: "Fautes",
  Offsides: "Hors-jeu",
  "Yellow Cards": "Cartons jaunes",
  "Red Cards": "Cartons rouges",
};

const STAT_ORDER = [
  "Ball Possession",
  "Total Shots",
  "Shots on Goal",
  "Corner Kicks",
  "Fouls",
  "Offsides",
  "Yellow Cards",
  "Red Cards",
];

function parseValue(value: number | string | null): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === "number") return value;
  // Handle percentage strings like "65%"
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
}

function formatValue(value: number | string | null): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string") return value;
  return String(value);
}

function StatRow({
  label,
  homeRaw,
  awayRaw,
}: {
  label: string;
  homeRaw: number | string | null;
  awayRaw: number | string | null;
}) {
  const homeNum = parseValue(homeRaw);
  const awayNum = parseValue(awayRaw);
  const homeDisplay = formatValue(homeRaw);
  const awayDisplay = formatValue(awayRaw);

  // Both null — skip rendering (handled by caller), but guard here too
  if (homeNum === null && awayNum === null) return null;

  // Compute proportional widths for the bar
  const total = (homeNum ?? 0) + (awayNum ?? 0);
  const homePct = total > 0 ? ((homeNum ?? 0) / total) * 100 : 50;
  const awayPct = total > 0 ? ((awayNum ?? 0) / total) * 100 : 50;

  // Determine which side is higher for color
  const homeHigher = (homeNum ?? 0) >= (awayNum ?? 0);
  const awayHigher = (awayNum ?? 0) >= (homeNum ?? 0);

  return (
    <div className="flex flex-col gap-1.5">
      {/* Labels & values */}
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900 text-sm">{homeDisplay}</span>
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          {label}
        </span>
        <span className="font-bold text-gray-900 text-sm">{awayDisplay}</span>
      </div>

      {/* Comparison bar */}
      <div className="flex items-center gap-0.5">
        {/* Home bar — grows from right to left */}
        <div className="flex-1 flex justify-end">
          <div
            className={`h-2 rounded-full ${homeHigher ? "bg-emerald-500" : "bg-gray-200"}`}
            style={{ width: `${homePct}%` }}
          />
        </div>

        {/* Away bar — grows from left to right */}
        <div className="flex-1 flex justify-start">
          <div
            className={`h-2 rounded-full ${awayHigher ? "bg-emerald-500" : "bg-gray-200"}`}
            style={{ width: `${awayPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function MatchStatistics({
  statistics,
  homeName,
  awayName,
}: MatchStatisticsProps) {
  if (statistics.length !== 2) return null;

  const home = statistics[0]!;
  const away = statistics[1]!;

  // Build lookup maps for quick access
  const homeMap = new Map(
    home.statistics.map((s) => [s.type, s.value]),
  );
  const awayMap = new Map(
    away.statistics.map((s) => [s.type, s.value]),
  );

  // Filter to only stats present in data (at least one side non-null)
  const visibleStats = STAT_ORDER.filter((key) => {
    const hv = homeMap.get(key) ?? null;
    const av = awayMap.get(key) ?? null;
    return hv !== null || av !== null;
  });

  if (visibleStats.length === 0) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="font-bold text-lg text-gray-900">
          Statistiques du match
        </h3>
      </div>

      {/* Team names row */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <span className="text-sm font-semibold text-gray-700">
          {homeName}
        </span>
        <span className="text-sm font-semibold text-gray-700">
          {awayName}
        </span>
      </div>

      {/* Stats rows */}
      <div className="flex flex-col gap-4 px-5 pb-5">
        {visibleStats.map((key) => (
          <StatRow
            key={key}
            label={STAT_LABELS[key] ?? key}
            homeRaw={homeMap.get(key) ?? null}
            awayRaw={awayMap.get(key) ?? null}
          />
        ))}
      </div>
    </div>
  );
}
