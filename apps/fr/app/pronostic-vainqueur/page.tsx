import type { Metadata } from "next";
import { Newsletter } from "@repo/ui/newsletter";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import {
  TopFavorites,
  OddsTable,
  WhyTheyCanWin,
  HostHistory,
  DarkHorses,
  HeroSection,
  ConfederationChart,
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
  alternates: {
    canonical: "https://cdm2026.fr/pronostic-vainqueur",
  },
  openGraph: {
    title: "Pronostic Vainqueur CDM 2026 — Qui va gagner ?",
    description:
      "Top 10 des favoris CDM 2026, cotes comparées Betclic/Winamax, analyse complète. Découvrez notre pronostic vainqueur.",
    url: "https://cdm2026.fr/pronostic-vainqueur",
  },
};

export default function PronosticVainqueurPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Pronostic vainqueur" },
        ]}
      />

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
      <FAQSection 
        title="❓ Questions fréquentes — Pronostic vainqueur CDM 2026"
        items={faqItems} 
      />

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
