import type { Metadata } from "next";
import { Newsletter } from "@repo/ui/newsletter";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { teamsById } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import { estimatedOutrightOdds } from "@repo/data/affiliates";

import { HeroSection } from "./_components/HeroSection";
import { ProbabilityBanner } from "./_components/ProbabilityBanner";
import { MatchCalendar } from "./_components/MatchCalendar";
import { SquadSection } from "./_components/SquadSection";
import { PronosticSection } from "./_components/PronosticSection";
import { HistoryTable } from "./_components/HistoryTable";
import { AnecdotesSection } from "./_components/AnecdotesSection";
import { MatchPronosticLinks } from "./_components/MatchPronosticLinks";
import { faqItems } from "./_components/FaqSection";
import { FinalCTA } from "./_components/FinalCTA";

export const metadata: Metadata = {
  title: "Équipe de France CDM 2026 — Effectif, Calendrier & Pronostics",
  description:
    "Équipe de France CDM 2026 : effectif Bleus, calendrier Groupe I, pronostics vainqueur. Double championne (1998, 2018). La 3e étoile est possible !",
  openGraph: {
    title: "🇫🇷 Équipe de France CDM 2026 — Bleus, Effectif & Pronostics",
    description:
      "Les Bleus à la CDM 2026 : effectif complet des joueurs, calendrier Groupe I, cotes vainqueur, analyse forces/faiblesses. Double champion du monde.",
    url: "https://cdm2026.fr/equipe-de-france",
  },
};

export default function EquipeDeFrancePage() {
  const team = teamsById["france"];
  const francePlayers = playersByTeamId["france"] ?? [];
  const prediction = predictionsByTeamId["france"];

  const franceMatches = matches.filter(
    (m) => m.homeTeamId === "france" || m.awayTeamId === "france"
  );

  const winnerOdds = prediction ? estimatedOutrightOdds(prediction.winnerProb) : "—";
  const winPct = prediction ? Math.round(prediction.winnerProb * 100 * 10) / 10 : 0;

  const sportsTeamJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: "Équipe de France de Football",
    sport: "Football",
    memberOf: { "@type": "SportsOrganization", name: "FIFA Coupe du Monde 2026" },
    url: "https://cdm2026.fr/equipe-de-france",
    description: team?.description ?? "",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }} />

      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Équipes", href: "/equipes" },
          { label: "🇫🇷 Équipe de France" },
        ]}
      />

      <HeroSection winnerOdds={winnerOdds} winPct={winPct} />
      {prediction && <ProbabilityBanner prediction={prediction} />}
      <MatchCalendar franceMatches={franceMatches} />
      <SquadSection players={francePlayers} />
      <PronosticSection prediction={prediction} />
      <HistoryTable />
      <AnecdotesSection />
      <MatchPronosticLinks franceMatches={franceMatches} />
      <FAQSection 
        title="❓ Questions fréquentes — Équipe de France CDM 2026"
        items={faqItems} 
      />
      <Newsletter variant="banner" />
      <FinalCTA />
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
    </>
  );
}
