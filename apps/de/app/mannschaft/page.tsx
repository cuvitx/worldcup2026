import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "../../lib/localized-data";
import { predictionsByTeamId } from "@repo/data/predictions";
import { ConfederationFilter } from "./confederation-filter";
import { RelatedLinks } from "../components/RelatedLinks";
export const metadata: Metadata = {
  title: "Die 48 Mannschaften der WM 2026 | Rangliste, Stats & Prognosen",
  description:
    "Vollständige Liste der 48 qualifizierten Mannschaften für die WM 2026. FIFA-Rangliste, Gruppe, Historie und Prognosen für jeden Kader.",
  alternates: getStaticAlternates("teams", "de"),
  openGraph: {
    title: "48 Mannschaften - WM 2026",
    description: "Alle 48 qualifizierten Mannschaften für die WM 2026 in den USA, Kanada und Mexiko.",
  },
};

export default function TeamsPage() {
  const sorted = [...teams].sort((a, b) => a.fifaRanking - b.fifaRanking);

  return (
    <>
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Die 48 Mannschaften der WM 2026</h1>
          <p className="mt-2 text-gray-300">
            FIFA-Rangliste, Gruppe, Prognosen und vollständiges Profil jedes qualifizierten Kaders.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* By Confederation with filter */}
        <ConfederationFilter teams={sorted} />

        {/* Ranking Table */}
        <section className="rounded-xl bg-white p-4 sm:p-6 sm:p-8 shadow-sm border border-gray-200 mb-10 mt-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">FIFA-Rangliste der 48 Mannschaften</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="pb-3 font-medium text-gray-500">#</th>
                  <th className="pb-3 font-medium text-gray-500">Mannschaft</th>
                  <th className="pb-3 font-medium text-gray-500 hidden sm:table-cell">Conf.</th>
                  <th className="pb-3 font-medium text-gray-500">Gr.</th>
                  <th className="pb-3 font-medium text-gray-500 text-right hidden sm:table-cell">Chancen</th>
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
                          <span className="text-lg shrink-0" role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span>
                          <span className="font-medium text-gray-900 truncate">{team.name}</span>
                          {team.isHost && <span className="text-xs text-accent font-semibold">(Gastgeber)</span>}
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
              title: " Die 12 Gruppen",
              description: "Zusammensetzung und Tabellen der Gruppen A bis L.",
              icon: ""
            },
            {
              href: "/spiel/spielplan",
              title: " Vollständiger Spielplan",
              description: "Alle Spiele mit Datum, Uhrzeit und Stadien.",
              icon: ""
            },
            {
              href: "/prognose/sieger",
              title: "Wer wird Weltmeister?",
              description: "Unsere Prognosen und Quoten für den Sieger der WM 2026.",
              icon: ""
            }
          ]}
        />

      </div>
    </>
  );
}
