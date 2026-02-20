import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";
import type { Match } from "@repo/data/types";
import type { Team } from "@repo/data/types";

interface SameDayMatchesProps {
  sameDayMatches: Match[];
  teamsById: Record<string, Team | undefined>;
  currentDate: string;
  isSidebar?: boolean;
}

export function SameDayMatches({
  sameDayMatches,
  teamsById,
  currentDate,
  isSidebar = false,
}: SameDayMatchesProps) {
  if (sameDayMatches.length === 0) return null;

  if (isSidebar) {
    return (
      <Card hover padding="md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Autres matchs du {currentDate.slice(5)}
        </h3>
        <div className="space-y-2">
          {sameDayMatches.slice(0, 5).map((m) => {
            const mHome = teamsById[m.homeTeamId];
            const mAway = teamsById[m.awayTeamId];
            return (
              <Link
                key={m.slug}
                href={`/match/${m.slug}`}
                className="flex items-center gap-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2.5 transition-all hover:border-primary/30 hover:shadow-sm"
              >
                <span className="text-sm font-bold text-primary tabular-nums shrink-0">
                  {m.time}
                </span>
                <span className="text-base shrink-0" role="img" aria-label={mHome?.name ?? ""}>{mHome?.flag ?? "🏳"}</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate flex-1">{mHome?.name ?? "TBD"}</span>
                <span className="text-[10px] font-bold text-gray-400 shrink-0">vs</span>
                <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate flex-1 text-right">{mAway?.name ?? "TBD"}</span>
                <span className="text-base shrink-0" role="img" aria-label={mAway?.name ?? ""}>{mAway?.flag ?? "🏳"}</span>
              </Link>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <section className="border-t border-gray-200 dark:border-slate-700 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Matchs de la même journée" />
        <div className="space-y-3 max-w-2xl mx-auto">
          {sameDayMatches.map((m) => {
            const mHome = teamsById[m.homeTeamId];
            const mAway = teamsById[m.awayTeamId];
            return (
              <Link
                key={m.slug}
                href={`/match/${m.slug}`}
                className="flex items-center gap-3 w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <span className="text-sm font-bold text-primary tabular-nums shrink-0">
                  {m.time}
                </span>
                <span className="text-lg shrink-0" role="img" aria-label={mHome?.name ?? ""}>{mHome?.flag ?? "🏳"}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate flex-1">{mHome?.name ?? "TBD"}</span>
                <span className="text-xs font-bold text-gray-400 shrink-0">vs</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate flex-1 text-right">{mAway?.name ?? "TBD"}</span>
                <span className="text-lg shrink-0" role="img" aria-label={mAway?.name ?? ""}>{mAway?.flag ?? "🏳"}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
