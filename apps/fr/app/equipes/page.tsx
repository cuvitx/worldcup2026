import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { ConfederationFilter } from "./confederation-filter";
import { Breadcrumb } from "@repo/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Les 48 équipes de la Coupe du Monde 2026 | Classement, Stats & Pronostics",
  description:
    "Liste complète des 48 équipes qualifiées pour la Coupe du Monde 2026. Classement FIFA, groupe, historique et pronostics pour chaque sélection.",
  alternates: getStaticAlternates("teams", "fr"),
  openGraph: {
    title: "48 équipes - Coupe du Monde 2026",
    description: "Toutes les équipes qualifiées pour la CDM 2026 aux États-Unis, Canada et Mexique.",
  },
};

export default function TeamsPage() {
  const sorted = [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Équipes" },
        ]}
      />
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Les 48 équipes de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            Classement FIFA, groupe, pronostics et fiche complète de chaque sélection qualifiée.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* By Confederation with filter */}
        <ConfederationFilter teams={sorted} />

        {/* Ranking Table */}
        <section className="rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-10 mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Classement FIFA des 48 équipes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 text-left">
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-300">#</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-300">Équipe</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-300 hidden sm:table-cell">Conf.</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-300">Gr.</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-300 text-right hidden sm:table-cell">Chances</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-300 text-right">Pronostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {sorted.map((team) => {
                  const pred = predictionsByTeamId[team.id];
                  return (
                    <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 border-b border-gray-100 dark:border-gray-700/40 transition-colors">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">{team.fifaRanking}</td>
                      <td className="py-3">
                        <Link href={`/equipe/${team.slug}`} className="flex items-center gap-2 hover:text-primary min-w-0">
                          <span className="text-lg shrink-0" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                          <span className="font-medium text-gray-900 dark:text-white truncate">{team.name}</span>
                          {team.isHost && <span className="text-xs text-amber-500 dark:text-amber-400 font-semibold">(Hôte)</span>}
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-300 hidden sm:table-cell">{team.confederation}</td>
                      <td className="py-3">
                        <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-primary text-gray-700 dark:text-gray-300">{team.group}</Link>
                      </td>
                      <td className="py-3 text-right hidden sm:table-cell">
                        {pred ? (
                          <span className="font-bold text-amber-500 dark:text-amber-400">
                            {pred.winnerProb >= 0.01
                              ? `${(pred.winnerProb * 100).toFixed(1)}%`
                              : `${(pred.winnerProb * 100).toFixed(2)}%`}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <Link href={`/pronostic/${team.slug}`} className="text-primary hover:underline text-sm font-medium">
                          Pronostic →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </>
  );
}
