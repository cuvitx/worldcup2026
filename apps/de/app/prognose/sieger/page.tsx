import type { Metadata } from "next";
import { Newsletter } from "@repo/ui/newsletter";
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
  title: "Prognose Sieger WM 2026 — Wer wird die WM gewinnen?",
  description:
    "Prognose Sieger WM 2026: Argentinien 15%, Frankreich 13%, Spanien 12%. Vergleichen Sie die Quoten, entdecken Sie unsere Favoriten und wagen Sie eine Wette.",
  alternates: {
    canonical: "https://www.wm2026guide.de/prognose/sieger",
  },
  openGraph: {
    title: "Prognose Sieger WM 2026 — Wer wird gewinnen?",
    description:
      "Top 10 der Favoriten WM 2026, Quoten Betano, vollständige Analyse. Entdecken Sie unsere Sieger-Prognose.",
    url: "https://www.wm2026guide.de/prognose/sieger",
  },
};

export default function PrognoseVainqueurPage() {
  return (
    <>

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
        title="Häufig gestellte Fragen — Prognose Sieger WM 2026"
        items={faqItems} 
      />

      {/* Newsletter CTA */}
      <Newsletter variant="banner" locale="de" />

      {/* Final CTA */}
      <CtaSection />

    </>
  );
}
