import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { ConfederationFilter } from "./confederation-filter";

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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-primary dark:hover:text-accent">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Équipes</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Les 48 équipes de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            Classement FIFA, groupe, pronostics et fiche complète de chaque sélection qualifiée.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Ranking Table */}
        <section className="rounded-xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-10">
          <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Classement FIFA des 48 équipes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-600 text-left">
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">#</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Équipe</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Conf.</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">Groupe</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Chances CDM</th>
                  <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">Pronostic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {sorted.map((team) => {
                  const pred = predictionsByTeamId[team.id];
                  return (
                    <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 border-b border-gray-100 dark:border-gray-700/40 transition-colors">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">{team.fifaRanking}</td>
                      <td className="py-3">
                        <Link href={`/equipe/${team.slug}`} className="flex items-center gap-2 hover:text-accent">
                          <span className="text-lg" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                          <span className="font-medium text-gray-900 dark:text-white">{team.name}</span>
                          {team.isHost && <span className="text-xs text-gold font-semibold">(Hôte)</span>}
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400">{team.confederation}</td>
                      <td className="py-3">
                        <Link href={`/groupe/${team.group.toLowerCase()}`} className="hover:text-accent text-gray-700 dark:text-gray-300">{team.group}</Link>
                      </td>
                      <td className="py-3 text-right">
                        {pred ? (
                          <span className="font-bold text-primary dark:text-accent">
                            {pred.winnerProb >= 0.01
                              ? `${(pred.winnerProb * 100).toFixed(1)}%`
                              : `${(pred.winnerProb * 100).toFixed(2)}%`}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <Link href={`/pronostic/${team.slug}`} className="text-accent hover:underline text-sm font-medium">
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

        {/* By Confederation with filter */}
        <ConfederationFilter teams={sorted} />
      </div>
    </>
  );
}
