import { Card } from "@repo/ui/card";
import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";
import type { Team } from "@repo/data/types";

interface TeamComparisonProps {
  home: Team;
  away: Team;
}

export function TeamComparison({ home, away }: TeamComparisonProps) {
  const comparisonRows = [
    {
      label: "Classement FIFA",
      v1: `#${home.fifaRanking}`,
      v2: `#${away.fifaRanking}`,
    },
    { label: "Confédération", v1: home.confederation, v2: away.confederation },
    {
      label: "Participations CDM",
      v1: String(home.wcAppearances),
      v2: String(away.wcAppearances),
    },
    { label: "Meilleur résultat", v1: home.bestResult, v2: away.bestResult },
  ];

  return (
    <Card>
      <SectionHeading title="Comparaison" />
      <div className="space-y-3">
        {comparisonRows.map((row) => (
          <div
            key={row.label}
            className="rounded-lg bg-gray-50 dark:bg-slate-700/50 p-3"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 font-medium">
              {row.label}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm shrink-0">{home.flag}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white break-words">
                  {row.v1}
                </span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-sm font-bold text-gray-900 dark:text-white break-words text-right">
                  {row.v2}
                </span>
                <span className="text-sm shrink-0">{away.flag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Link
          href={`/h2h/${home.slug}-vs-${away.slug}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Voir l&apos;historique complet des confrontations &rarr;
        </Link>
      </div>
    </Card>
  );
}
