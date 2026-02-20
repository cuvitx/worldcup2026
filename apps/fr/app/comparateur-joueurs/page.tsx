import type { Metadata } from "next";
import Link from "next/link";
import { RelatedLinks } from "../components/RelatedLinks";
import dynamic from "next/dynamic";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { Breadcrumb } from "@repo/ui/breadcrumb";

const PlayerComparator = dynamic(() => import("./PlayerComparator").then((mod) => ({ default: mod.PlayerComparator })), {
  loading: () => (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="animate-pulse text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Chargement du comparateur...</p>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Comparateur de joueurs | Stats côte à côte",
  description:
    "Comparez les statistiques des meilleurs joueurs de la Coupe du Monde 2026. Goals, passes décisives, dribbles, notes et plus encore.",
  alternates: {
    canonical: "https://cdm2026.fr/comparateur-joueurs",
  },
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
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Comparateur de joueurs","url":"/comparateur-joueurs"}]} baseUrl={domains.fr} />
      <Breadcrumb items={[
          {
                    "label": "Accueil",
                    "href": "/"
          },
          {
                    "label": "Comparateur de joueurs"
          }
]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Comparateur de joueurs</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Statistiques</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Comparateur de Joueurs</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Sélectionnez 2 ou 3 joueurs pour comparer leurs statistiques côte à côte.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <PlayerComparator />

        {/* CTA affilié */}
        <div className="mt-10 rounded-xl bg-gradient-to-r from-primary to-primary/80 p-6 text-center text-white shadow-lg">
          <p className="text-lg font-bold mb-2">Envie de parier sur vos joueurs préférés ?</p>
          <p className="text-sm text-white/70 mb-4">Comparez les cotes et profitez des meilleurs bonus.</p>
          <a
            href="/comparateur-cotes"
            className="inline-block rounded-xl bg-accent px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-accent/80"
          >
            Voir le comparateur de cotes &rarr;
          </a>
          <p className="mt-3 text-xs text-white/80">18+. Pariez responsablement.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/joueurs", title: "Joueurs clés", description: "Les 210 joueurs stars de la CDM 2026", icon: "⚽" },
          { href: "/buteurs", title: "Meilleurs buteurs", description: "Classement des buteurs du tournoi", icon: "🥅" },
          { href: "/h2h", title: "Face-à-face", description: "Historique des confrontations entre équipes", icon: "⚔️" },
          { href: "/equipes", title: "Les 48 équipes", description: "Effectifs complets par sélection", icon: "🏟️" },
        ]} />
      </div>
    </>
  );
}
