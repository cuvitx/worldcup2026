import Link from "next/link";

interface MatchRowProps {
  homeFlag: string;
  homeName: string;
  awayFlag: string;
  awayName: string;
  time: string;
  group?: string;
  stadium?: string;
  href: string;
  className?: string;
}

export function MatchRow({
  homeFlag,
  homeName,
  awayFlag,
  awayName,
  time,
  group,
  stadium,
  href,
  className = "",
}: MatchRowProps) {
  return (
    <Link
      href={href}
      className={`block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 transition-all hover:border-primary/30 hover:shadow-md ${className}`}
    >
      {/* Main row: time | home vs away | group */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-primary tabular-nums w-12 shrink-0">
          {time}
        </span>

        {/* Home team */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-lg shrink-0" role="img" aria-label={homeName}>{homeFlag}</span>
          <span className="text-sm font-semibold text-gray-900 truncate">{homeName}</span>
        </div>

        <span className="text-xs font-bold text-gray-400 shrink-0">vs</span>

        {/* Away team */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
          <span className="text-sm font-semibold text-gray-900 truncate text-right">{awayName}</span>
          <span className="text-lg shrink-0" role="img" aria-label={awayName}>{awayFlag}</span>
        </div>

        {group && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-medium shrink-0">
            {group}
          </span>
        )}
      </div>

      {/* Sub row: stadium (visible on sm+) */}
      {stadium && (
        <div className="mt-1.5 pl-12 hidden sm:block">
          <span className="text-xs text-gray-500 truncate">{stadium}</span>
        </div>
      )}
    </Link>
  );
}
