import type { Metadata } from "next";
import { PlayerComparator } from "./PlayerComparator";

export const metadata: Metadata = {
  title: "Comparateur de joueurs | Stats côte à côte",
  description:
    "Comparez les statistiques des meilleurs joueurs de la Coupe du Monde 2026. Goals, passes décisives, dribbles, notes et plus encore.",
  openGraph: {
    title: "Comparateur de joueurs CDM 2026",
    description:
      "Comparez les stats des stars du Mondial 2026 : Mbappé, Haaland, Vinicius, Bellingham et plus.",
  },
};

export default function ComparateurJoueursPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Comparateur joueurs", item: "https://cdm2026.fr/comparateur-joueurs" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-2">⚽ Comparateur de Joueurs</h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Sélectionnez 2 ou 3 joueurs pour comparer leurs statistiques côte à côte.
        </p>
        <PlayerComparator />

        {/* CTA affilié */}
        <div className="mt-10 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center text-white shadow-lg">
          <p className="text-lg font-bold mb-2">Envie de parier sur vos joueurs préférés ?</p>
          <p className="text-sm text-blue-100 mb-4">Comparez les cotes et profitez des meilleurs bonus.</p>
          <a
            href="#"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-block rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-blue-900 transition-colors hover:bg-yellow-300"
          >
            Voir les cotes sur Winamax &rarr;
          </a>
          <p className="mt-3 text-xs text-blue-200">18+. Pariez responsablement.</p>
        </div>
      </section>
    </>
  );
}
