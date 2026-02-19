import type { Metadata } from "next";
import Link from "next/link";
import { Newsletter } from "@repo/ui/newsletter";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
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
import { FaqSection, faqItems } from "./_components/FaqSection";
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
      { "@type": "ListItem", position: 2, name: "Équipes", item: "https://cdm2026.fr/equipes" },
      { "@type": "ListItem", position: 3, name: "Équipe de France", item: "https://cdm2026.fr/equipe-de-france" },
    ],
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }} />

      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Équipes", url: "/equipes" },
          { name: "Équipe de France", url: "/equipe-de-france" },
        ]}
        baseUrl={domains.fr}
      />

      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/equipes" className="text-primary dark:text-secondary hover:underline">Équipes</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">🇫🇷 Équipe de France</li>
          </ol>
        </div>
      </nav>

      <HeroSection winnerOdds={winnerOdds} winPct={winPct} />
      {prediction && <ProbabilityBanner prediction={prediction} />}
      <MatchCalendar franceMatches={franceMatches} />
      <SquadSection players={francePlayers} />
      <PronosticSection prediction={prediction} />
      <HistoryTable />
      <AnecdotesSection />
      <MatchPronosticLinks franceMatches={franceMatches} />
      <FaqSection />
      <Newsletter variant="banner" />
      <FinalCTA />
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
    </>
  );
}
