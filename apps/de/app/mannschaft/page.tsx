import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { ConfederationFilter } from "./confederation-filter";
import { RelatedLinks } from "../components/RelatedLinks";
export const metadata: Metadata = {
  title: "Les 48 Mannschafts der WM 2026 | Rangliste, Stats & Prognoses",
  description:
    "Liste complète des 48 Mannschafts qualifiées für die WM 2026. Rangliste FIFA, groupe, historique et pronostics pour chaque sélection.",
  alternates: getStaticAlternates("teams", "de"),
  openGraph: {
    title: "48 Mannschafts - WM 2026",
    description: "Alle Mannschafts qualifiées pour la CDM 2026 aux États-Unis, Canada et Mexique.",
  },
};

export default function TeamsPage() {
  const sorted = [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);

  return (
    <>
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Les 48 Mannschafts de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            Rangliste FIFA, groupe, pronostics et fiche complète de chaque sélection qualifiée.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* By Confederation with filter */}
        <ConfederationFilter teams={sorted} />

        {/* Ranking Table */}
        <section className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200 mb-10 mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Rangliste FIFA des 48 Mannschafts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">#</th>
                  <th className="pb-3 font-medium text-gray-500">Mannschaft</th>
                  <th className="pb-3 font-medium text-gray-500 hidden sm:table-cell">Conf.</th>
                  <th className="pb-3 font-medium text-gray-500">Gr.</th>
                  <th className="pb-3 font-medium text-gray-500 text-right hidden sm:table-cell">Chances</th>
                  <th className="pb-3 font-medium text-gray-500 text-right">Prognose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((team) => {
                  const pred = predictionsByTeamId[team.id];
                  return (
                    <tr key={team.id} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                      <td className="py-3 font-medium text-gray-900">{team.fifaRanking}</td>
                      <td className="py-3">
                        <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-2 hover:text-primary min-w-0">
                          <span className="text-lg shrink-0" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
                          <span className="font-medium text-gray-900 truncate">{team.name}</span>
                          {team.isHost && <span className="text-xs text-accent font-semibold">(Hôte)</span>}
                        </Link>
                      </td>
                      <td className="py-3 text-gray-500 hidden sm:table-cell">{team.confederation}</td>
                      <td className="py-3">
                        <Link href={`/gruppe/${team.group.toLowerCase()}`} className="hover:text-primary text-gray-700">{team.group}</Link>
                      </td>
                      <td className="py-3 text-right hidden sm:table-cell">
                        {pred ? (
                          <span className="font-bold text-accent">
                            {pred.winnerProb >= 0.01
                              ? `${(pred.winnerProb * 100).toFixed(1)}%`
                              : `${(pred.winnerProb * 100).toFixed(2)}%`}
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <Link href={`/prognose/${team.slug}`} className="text-primary hover:underline text-sm font-medium">
                          Prognose →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/gruppen",
              title: " Les 12 groupes",
              description: "Composition et classements des groupes A à L.",
              icon: ""
            },
            {
              href: "/spiel/spielplan",
              title: " Spielplan complet",
              description: "Tous les matchs avec dates, horaires et stades.",
              icon: ""
            },
            {
              href: "/prognose/sieger",
              title: "Qui va gagner ?",
              description: "Nos pronostics et cotes pour le vainqueur de la CDM 2026.",
              icon: ""
            }
          ]}
        />

      </div>
    </>
  );
}
