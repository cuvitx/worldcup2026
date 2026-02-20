import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import {
  GoalsChart,
  TopScorersSection,
  TitledCountriesSection,
  RecordsGrid,
  FunFactsSection,
} from "./_components";
import {
  topScorers,
  titledCountries,
  goalsByEdition,
  records,
  funFacts,
} from "./_data/stats-data";

export const metadata: Metadata = {
  title: "Statistiques Coupe du Monde - Records et chiffres clés | CDM 2026",
  description:
    "Toutes les statistiques de la Coupe du Monde FIFA : top buteurs all-time, pays les plus titrés, buts par édition, records historiques et fun facts. De 1930 à 2026.",
  openGraph: {
    title: "Statistiques Coupe du Monde - Records et chiffres clés",
    description:
      "Top buteurs, pays titrés, buts par édition et records historiques de la Coupe du Monde FIFA depuis 1930.",
    url: "https://cdm2026.fr/statistiques",
  },
  alternates: {
    canonical: "https://cdm2026.fr/statistiques",
  },
};

export default function StatistiquesPage() {
  const maxGoals = Math.max(...goalsByEdition.map((e) => e.goals));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Statistiques Coupe du Monde - Records et chiffres clés",
    description:
      "Toutes les statistiques historiques de la Coupe du Monde FIFA depuis 1930 : buteurs, pays, buts par édition et records.",
    url: "https://cdm2026.fr/statistiques",
    mainEntity: {
      "@type": "Dataset",
      name: "Statistiques Coupe du Monde FIFA 1930–2022",
      description: "Données historiques complètes de la CDM",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Statistiques CDM",
        item: "https://cdm2026.fr/statistiques",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Statistiques CDM", url: "/statistiques" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Fil d'Ariane */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li>
              <Link
                href="/"
                className="hover:text-primary dark:hover:text-white transition-colors"
              >
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Statistiques</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-success uppercase tracking-widest mb-2">
            Coupe du Monde FIFA · 1930–2026
          </p>
          <h1 className="text-2xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            📊 Statistiques &amp; Records
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
            92 ans de football mondial condensés en chiffres, graphiques et records inédits.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            {[
              { val: "22", label: "Éditions" },
              { val: "2 788", label: "Buts marqués" },
              { val: "16", label: "Buts Klose (record)" },
              { val: "48", label: "Équipes en 2026" },
            ].map(({ val, label }) => (
              <div key={label} className="rounded-xl bg-white/10 px-6 py-3 min-w-[110px]">
                <div className="text-3xl font-extrabold text-white">{val}</div>
                <div className="text-xs text-gray-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-16">
        {/* Top buteurs */}
        <TopScorersSection topScorers={topScorers} />

        {/* Pays titrés */}
        <TitledCountriesSection titledCountries={titledCountries} />

        {/* Buts par édition */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            📈 Buts marqués par édition (1930–2022)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
            Survolez les barres pour voir le détail. Édition 1954 : 5,38 buts/match — record
            absolu.
          </p>
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
            <GoalsChart goalsByEdition={goalsByEdition} />
            {/* Tableau compact */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-center">
                <thead>
                  <tr className="text-gray-400 uppercase border-b border-gray-100 dark:border-slate-700">
                    <th className="py-2 px-2 text-left">Édition</th>
                    <th className="py-2 px-2">Équipes</th>
                    <th className="py-2 px-2">Matchs</th>
                    <th className="py-2 px-2">Buts</th>
                    <th className="py-2 px-2">Moy/match</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-700/50">
                  {[...goalsByEdition].reverse().map((ed) => (
                    <tr
                      key={ed.year}
                      className={`hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors ${
                        ed.goals === maxGoals ? "bg-primary/5 dark:bg-primary/10" : ""
                      }`}
                    >
                      <td className="py-1.5 px-2 font-bold text-primary text-left">
                        {ed.year}
                      </td>
                      <td className="py-1.5 px-2 text-gray-600 dark:text-gray-300">
                        {ed.teams}
                      </td>
                      <td className="py-1.5 px-2 text-gray-600 dark:text-gray-300">
                        {ed.matches}
                      </td>
                      <td className="py-1.5 px-2 font-bold text-gray-900 dark:text-gray-100">
                        {ed.goals}
                        {ed.goals === maxGoals && (
                          <span className="ml-1 text-primary text-[9px]">★</span>
                        )}
                      </td>
                      <td className="py-1.5 px-2 text-gray-500">{ed.avg.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Records */}
        <RecordsGrid records={records} />

        {/* Fun facts */}
        <FunFactsSection funFacts={funFacts} />

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-primary to-primary text-white p-8 text-center shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            🌟 Explorez toute l'histoire
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Des statistiques aux pronostics, découvrez tout ce que vous devez savoir sur le
            Mondial 2026.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/histoire"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary font-bold px-6 py-3 hover:bg-gray-100 transition-colors"
            >
              📅 Timeline historique
            </Link>
            <Link
              href="/palmares"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
              🏆 Palmarès complet
            </Link>
            <Link
              href="/pronostic-vainqueur"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
              🎯 Pronostic 2026
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
