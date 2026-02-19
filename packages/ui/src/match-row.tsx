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
      className={`flex items-center gap-2 sm:gap-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 px-3 sm:px-4 py-3 transition-colors hover:border-primary/30 hover:bg-primary/5 ${className}`}
    >
      <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 w-11 sm:w-14 text-center shrink-0">
        {time}
      </span>
      <div className="flex items-center gap-1.5 flex-1 min-w-0">
        <span className="text-base sm:text-lg shrink-0" role="img" aria-label={homeName}>{homeFlag}</span>
        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 break-words leading-tight">{homeName}</span>
      </div>
      <span className="text-xs font-bold text-gray-400 shrink-0">vs</span>
      <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 text-right break-words leading-tight">{awayName}</span>
        <span className="text-base sm:text-lg shrink-0" role="img" aria-label={awayName}>{awayFlag}</span>
      </div>
      {group && (
        <span className="text-[10px] sm:text-sm bg-gray-100 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-gray-600 dark:text-gray-300 shrink-0">
          {group}
        </span>
      )}
      {stadium && (
        <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block shrink-0 w-36 text-right truncate">
          {stadium}
        </span>
      )}
    </Link>
  );
}
