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
  getLiveWinnerForecast,
  teamArguments,
  whyTheyCanWin,
  cdmHomeStats,
  homeWins,
  totalEditions,
  homeWinPct,
} from "./_data/vainqueur-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Pronostic vainqueur CDM 2026 live — Forecast Coupe du Monde",
  description:
    "Pronostic vainqueur CDM 2026 live : probabilités recalculées avec les résultats, le tableau restant, les équipes éliminées et les cotes disponibles.",
  alternates: {
    canonical: "https://www.cdm2026.fr/pronostic/vainqueur",
  },
  openGraph: {
    title: "Pronostic vainqueur CDM 2026 live — Qui va gagner ?",
    description:
      "Forecast live du vainqueur CDM 2026 avec résultats, tableau, équipes encore en course et cotes PMU Sport.",
    url: "https://www.cdm2026.fr/pronostic/vainqueur",
  },
};

export default async function PronosticVainqueurPage() {
  const forecast = await getLiveWinnerForecast();

  return (
    <>

      {/* Hero */}
      <HeroSection forecast={forecast} />

      {/* Odds Table — au-dessus de la ligne de flottaison : intention money maximale */}
      <OddsTable forecast={forecast} />

      {/* Confederation Chart */}
      <ConfederationChart top10={forecast.top10} />

      {/* Top 10 Favorites */}
      <TopFavorites
        top10={forecast.top10}
        eliminatedTeams={forecast.eliminatedTeams}
        teamArguments={teamArguments}
      />

      {/* Why They Can Win */}
      <WhyTheyCanWin top10={forecast.top10} whyTheyCanWin={whyTheyCanWin} />

      {/* Host History */}
      <HostHistory
        cdmHomeStats={cdmHomeStats}
        homeWins={homeWins}
        totalEditions={totalEditions}
        homeWinPct={homeWinPct}
      />

      {/* Simulator CTA */}
      <SimulatorCta />

      {/* Dark Horses */}
      <DarkHorses darkHorses={forecast.darkHorses} />

      {/* Methodology */}
      <MethodologySection forecast={forecast} />

      {/* FAQ */}
      <FAQSection 
        title="Questions fréquentes — Pronostic vainqueur CDM 2026"
        items={faqItems} 
      />

      {/* Newsletter CTA */}
      <Newsletter variant="banner" />

      {/* Final CTA */}
      <CtaSection />

    </>
  );
}
