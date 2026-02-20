import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import {
  GoalsChart,
  TopScorersSection,
  TitledCountriesSection,
  RecordsGrid,
  FunFactsSection,
} from "./_components";
import { TableOfContents } from "@repo/ui";
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

  const faqItems = [
    {
      question: "Quel pays a remporté le plus de Coupes du Monde ?",
      answer: "Le Brésil détient le record avec 5 titres de champion du monde (1958, 1962, 1970, 1994, 2002). L'Allemagne et l'Italie suivent avec 4 titres chacun. L'Argentine en compte 3 (1978, 1986, 2022), tandis que la France et l'Uruguay en ont remporté 2. Le Brésil est la seule nation à avoir participé à toutes les éditions de la Coupe du Monde sans exception depuis 1930."
    },
    {
      question: "Combien de buts ont été marqués en moyenne par Coupe du Monde ?",
      answer: "En moyenne, environ 2,8 buts par match sont marqués en Coupe du Monde. L'édition 1954 en Suisse détient le record avec 5,38 buts par match (140 buts en 26 matchs). Les éditions modernes tendent vers 2,5 à 3 buts par match en raison de l'évolution tactique du football, plus défensive. La CDM 2022 au Qatar a vu 172 buts en 64 matchs, soit 2,69 buts/match."
    },
    {
      question: "Quel est le record de victoires consécutives en Coupe du Monde ?",
      answer: "Le Brésil détient le record avec 11 victoires consécutives entre 2002 et 2006. Cette série exceptionnelle inclut les 7 matchs victorieux de la campagne 2002 (titre remporté) et les 4 premiers matchs de 2006 avant leur élimination en quarts contre la France. L'Allemagne a également réalisé une série impressionnante de 10 victoires entre 2014 et 2018."
    },
    {
      question: "Combien de joueurs ont marqué plus de 10 buts en Coupe du Monde ?",
      answer: "Seulement 5 joueurs ont franchi la barre des 10 buts en carrière en Coupe du Monde : Miroslav Klose (16 buts), Ronaldo Nazário (15), Gerd Müller (14), Just Fontaine (13) et Lionel Messi (13). Kylian Mbappé (12 buts à 25 ans) est le plus jeune joueur encore en activité capable de rejoindre ce club très fermé dès la CDM 2026."
    },
    {
      question: "Quelle est la plus large victoire de l'histoire de la CDM ?",
      answer: "La plus large victoire en Coupe du Monde est le 9-0 de la Hongrie contre la Corée du Sud lors de l'édition 1954 en Suisse. D'autres scores fleuve incluent le 8-0 de l'Allemagne contre l'Arabie Saoudite en 2002 et le 7-1 de l'Allemagne contre le Brésil en demi-finale 2014. Ce dernier match, appelé 'Mineirazo', reste le plus traumatisant pour le football brésilien."
    },
    {
      question: "Combien de pays ont déjà remporté la Coupe du Monde ?",
      answer: "Seulement 8 pays ont remporté la Coupe du Monde depuis sa création en 1930 : le Brésil (5 titres), l'Allemagne (4), l'Italie (4), l'Argentine (3), la France (2), l'Uruguay (2), l'Angleterre (1) et l'Espagne (1). Aucun pays d'Asie, d'Afrique ou d'Amérique du Nord n'a jamais soulevé le trophée. Les Pays-Bas détiennent le triste record de 3 finales perdues sans jamais gagner."
    }
  ];

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
{/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Coupe du Monde FIFA · 1930–2026</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
             Statistiques &amp; Records
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:grid lg:grid-cols-[1fr_220px] lg:gap-8">
        <div className="space-y-16">
        {/* Top buteurs */}
        <TopScorersSection topScorers={topScorers} />

        {/* Pays titrés */}
        <TitledCountriesSection titledCountries={titledCountries} />

        {/* Buts par édition */}
        <section>
          <h2 id="buts-edition" className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
             Buts marqués par édition (1930–2022)
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
             Explorez toute l'histoire
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
               Timeline historique
            </Link>
            <Link
              href="/palmares"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
               Palmarès complet
            </Link>
            <Link
              href="/pronostic-vainqueur"
              className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 text-white font-bold px-6 py-3 hover:bg-white/30 transition-colors"
            >
               Pronostic 2026
            </Link>
          </div>
        </section>
        </div>
        <TableOfContents items={[
          { id: "top-buteurs", label: "Top buteurs", level: 2 },
          { id: "pays-titres", label: "Pays titrés", level: 2 },
          { id: "buts-edition", label: "Buts par édition", level: 2 },
          { id: "records", label: "Records", level: 2 },
          { id: "fun-facts", label: "Fun facts", level: 2 },
        ]} />
      </div>

      <FAQSection title="❓ Questions sur les statistiques de la CDM" items={faqItems} />
    </>
  );
}
