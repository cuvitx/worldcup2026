import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";

export const metadata: Metadata = {
  title: "Les 12 groupes de la Coupe du Monde 2026 | Classement & Pronostics",
  description:
    "Tous les groupes de la Coupe du Monde 2026 (A à L). Classement, équipes qualifiées et pronostics pour chaque groupe.",
  alternates: getStaticAlternates("teams", "fr"),
  openGraph: {
    title: "Les 12 groupes - Coupe du Monde 2026",
    description: "Groupes A à L de la CDM 2026 avec classement et pronostics.",
  },
};

export default function GroupsPage() {
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-primary dark:hover:text-accent">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Groupes</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Les 12 groupes de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            48 équipes réparties en 12 groupes de 4. Les 2 premiers de chaque groupe et les 8 meilleurs 3e sont qualifiés.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const groupTeams = group.teams
              .map((id) => {
                const team = teamsById[id];
                const pred = predictionsByTeamId[id];
                return { team, pred, id };
              })
              .sort((a, b) => (b.pred?.eloRating ?? 0) - (a.pred?.eloRating ?? 0));

            return (
              <Link
                key={group.letter}
                href={`/groupe/${group.slug}`}
                className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden shadow-sm hover:shadow-md hover:border-accent dark:hover:border-accent transition-all duration-200"
              >
                {/* Header */}
                <div className="bg-primary dark:bg-gray-900 px-4 py-3 flex items-center justify-between">
                  <h2 className="text-lg font-extrabold text-white">
                    Groupe {group.letter}
                  </h2>
                  <span className="text-xs text-gray-300 group-hover:text-accent transition-colors">
                    Voir détails →
                  </span>
                </div>

                {/* Teams table */}
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  {groupTeams.map(({ team, pred, id }, idx) => {
                    const isQualified = idx < 2;
                    return (
                      <div
                        key={id}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${
                          isQualified
                            ? "bg-green-50/60 dark:bg-green-900/20"
                            : ""
                        }`}
                      >
                        <span className="w-5 text-center text-xs font-bold text-gray-400 dark:text-gray-500">
                          {idx + 1}
                        </span>
                        <span className="text-xl" role="img" aria-label={team?.name ?? id}>
                          {team?.flag ?? "🏳️"}
                        </span>
                        <span className={`flex-1 font-medium truncate ${
                          isQualified 
                            ? "text-green-700 dark:text-green-400" 
                            : "text-gray-800 dark:text-gray-200"
                        }`}>
                          {team?.name ?? id}
                        </span>
                        {team && (
                          <span className="text-xs text-gray-400 dark:text-gray-500">
                            #{team.fifaRanking}
                          </span>
                        )}
                        {pred && (
                          <span className="text-xs font-bold text-primary dark:text-accent tabular-nums">
                            {(pred.groupStageProb * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-700" />
            Qualifié (top 2)
          </span>
          <span>% = chances de sortie de groupe</span>
        </div>
      </div>
    </>
  );
}
