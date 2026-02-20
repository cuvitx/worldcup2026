import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import {
  TopFavorites,
  OddsTable,
  WhyTheyCanWin,
  HostHistory,
  DarkHorses,
  HeroSection,
  ConfederationChart,
  FaqSection,
  SimulatorCta,
  MethodologySection,
  CtaSection,
} from "./_components";
import {
  faqItems,
  top10,
  darkHorses,
  teamArguments,
  whyTheyCanWin,
  cdmHomeStats,
  homeWins,
  totalEditions,
  homeWinPct,
} from "./_data/vainqueur-data";

export const metadata: Metadata = {
  title: "Pronostic Vainqueur CDM 2026 — Qui va gagner la Coupe du Monde ?",
  description:
    "Pronostic vainqueur CDM 2026 : Argentine 15%, France 13%, Espagne 12%. Comparez les cotes, découvrez nos favoris et osez parier.",
  openGraph: {
    title: "Pronostic Vainqueur CDM 2026 — Qui va gagner ?",
    description:
      "Top 10 des favoris CDM 2026, cotes comparées Betclic/Winamax, analyse complète. Découvrez notre pronostic vainqueur.",
    url: "https://cdm2026.fr/pronostic-vainqueur",
  },
};

export default function PronosticVainqueurPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Pronostic vainqueur",
        item: "https://cdm2026.fr/pronostic-vainqueur",
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
          { name: "Pronostic vainqueur CDM 2026", url: "/pronostic-vainqueur" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb nav */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 flex-wrap">
            <li>
              <Link href="/" className="text-primary dark:text-secondary hover:underline">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Pronostic vainqueur</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <HeroSection />

      {/* Confederation Chart */}
      <ConfederationChart top10={top10} />

      {/* Top 10 Favorites */}
      <TopFavorites top10={top10} teamArguments={teamArguments} />

      {/* Why They Can Win */}
      <WhyTheyCanWin top10={top10} whyTheyCanWin={whyTheyCanWin} />

      {/* Host History */}
      <HostHistory
        cdmHomeStats={cdmHomeStats}
        homeWins={homeWins}
        totalEditions={totalEditions}
        homeWinPct={homeWinPct}
      />

      {/* Simulator CTA */}
      <SimulatorCta />

      {/* Odds Table */}
      <OddsTable />

      {/* Dark Horses */}
      <DarkHorses darkHorses={darkHorses} />

      {/* Methodology */}
      <MethodologySection />

      {/* FAQ */}
      <FaqSection faqItems={faqItems} />

      {/* Newsletter CTA */}
      <Newsletter variant="banner" />

      {/* Final CTA */}
      <CtaSection />

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques :
        endettement, isolement, dépendance. Pour être aidé, appelez le{" "}
        <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
    </>
  );
}
