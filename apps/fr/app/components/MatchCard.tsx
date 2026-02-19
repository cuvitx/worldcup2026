import Link from "next/link";

interface MatchCardProps {
  slug: string;
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
  date: string;
  time?: string;
  group?: string;
  matchday?: number;
  stage?: string;
  odds?: { home: string; draw: string; away: string };
  isHot?: boolean;
  isTop?: boolean;
  compact?: boolean;
}

function formatDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function MatchCard({
  slug,
  homeName,
  homeFlag,
  awayName,
  awayFlag,
  date,
  time,
  group,
  matchday,
  stage,
  odds,
  isHot,
  isTop,
  compact = false,
}: MatchCardProps) {
  return (
    <Link
      href={`/pronostic-match/${slug}`}
      className="match-card block"
    >
      {/* Top bar: meta info + badges */}
      <div className={`flex items-center justify-between ${compact ? "px-3 py-1.5" : "px-4 py-2"} border-b border-gray-100 dark:border-white/5`}>
        <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {stage && stage !== "group"
            ? stage
            : group
            ? `Groupe ${group}${matchday ? ` · J${matchday}` : ""}`
            : matchday
            ? `Journée ${matchday}`
            : ""}
        </span>
        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {isHot && <span className="badge-hot">🔥 Hot</span>}
          {isTop && <span className="badge-top">⭐ Top</span>}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {formatDate(date)}
            {time && <span className="ml-1 text-gray-400">{time}</span>}
          </span>
        </div>
      </div>

      {/* Teams row */}
      <div className={`flex items-center ${compact ? "px-3 py-2.5 gap-2" : "px-4 py-3.5 gap-3"}`}>
        {/* Home team */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
          <span
            className={`font-semibold truncate text-gray-900 dark:text-gray-100 ${compact ? "text-sm" : "text-base"}`}
          >
            {homeName}
          </span>
          <span className={compact ? "text-xl" : "text-2xl"} role="img" aria-label={`Drapeau ${homeName}`}>
            {homeFlag}
          </span>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center shrink-0">
          <span className={`font-bold text-accent ${compact ? "text-xs" : "text-sm"}`}>VS</span>
        </div>

        {/* Away team */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className={compact ? "text-xl" : "text-2xl"} role="img" aria-label={`Drapeau ${awayName}`}>
            {awayFlag}
          </span>
          <span
            className={`font-semibold truncate text-gray-900 dark:text-gray-100 ${compact ? "text-sm" : "text-base"}`}
          >
            {awayName}
          </span>
        </div>

        {/* Arrow */}
        <span className="text-accent text-sm shrink-0 ml-1">›</span>
      </div>

      {/* Odds row (optional) */}
      {odds && (
        <div className={`flex items-center justify-center gap-2 ${compact ? "px-3 pb-2.5" : "px-4 pb-3.5"} border-t border-gray-50 dark:border-white/5 pt-2`}>
          <OddPill label="1" value={odds.home} />
          <OddPill label="N" value={odds.draw} />
          <OddPill label="2" value={odds.away} />
          <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">Pronostic →</span>
        </div>
      )}
    </Link>
  );
}

function OddPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="text-[10px] text-gray-400 font-medium">{label}</span>
      <span className="odds-badge text-xs">{value}</span>
    </div>
  );
}
