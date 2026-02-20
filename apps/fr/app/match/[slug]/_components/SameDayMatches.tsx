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
                className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 text-sm"
              >
                <span role="img" aria-label={mHome?.name ?? ""}>
                  {mHome?.flag ?? "🏳"}
                </span>
                <span className="flex-1 text-sm font-medium break-words">
                  {mHome?.name ?? "TBD"} vs {mAway?.name ?? "TBD"}
                </span>
                <span role="img" aria-label={mAway?.name ?? ""}>
                  {mAway?.flag ?? "🏳"}
                </span>
                <span className="text-xs text-gray-500">{m.time}</span>
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
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sameDayMatches.map((m) => {
            const mHome = teamsById[m.homeTeamId];
            const mAway = teamsById[m.awayTeamId];
            return (
              <Link
                key={m.slug}
                href={`/match/${m.slug}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
              >
                <span
                  className="text-xl"
                  role="img"
                  aria-label={`Drapeau de ${mHome?.name ?? "Inconnu"}`}
                >
                  {mHome?.flag ?? "🏳"}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm break-words">
                    {mHome?.name ?? "TBD"} vs {mAway?.name ?? "TBD"}
                  </p>
                  <p className="text-xs text-gray-500">{m.time} UTC</p>
                </div>
                <span
                  className="text-xl"
                  role="img"
                  aria-label={`Drapeau de ${mAway?.name ?? "Inconnu"}`}
                >
                  {mAway?.flag ?? "🏳"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
