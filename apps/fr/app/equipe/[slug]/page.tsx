import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import { Newsletter } from "@repo/ui/newsletter";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug, teamsById } from "@repo/data/teams";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import { estimatedOutrightOdds } from "@repo/data/affiliates";
import { getISOCode } from "@repo/data/country-codes";

import { PremiumHero } from "./_components/PremiumHero";
import { PremiumProbabilityBanner } from "./_components/PremiumProbabilityBanner";
import { PremiumMatchCalendar } from "./_components/PremiumMatchCalendar";
import { PremiumSquad } from "./_components/PremiumSquad";
import { PremiumHistory } from "./_components/PremiumHistory";
import { PremiumFAQ, generateFAQSchema } from "./_components/PremiumFAQ";
import { PremiumFinalCTA } from "./_components/PremiumFinalCTA";

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};

  const iso = getISOCode(slug);
  const ogImages = iso
    ? [{ url: `https://flagcdn.com/w320/${iso}.png`, width: 320, height: 213, alt: `Drapeau de ${team.name}` }]
    : [{ url: "https://cdm2026.fr/images/og-default.png", width: 1200, height: 630, alt: "CDM 2026" }];

  return {
    title: `${team.name} CDM 2026 — Effectif, Calendrier & Pronostics`,
    description: `${team.name} CDM 2026 : effectif complet, calendrier Groupe ${team.group}, pronostics vainqueur. ${team.bestResult}. ${team.description.substring(0, 120)}...`,
    alternates: getAlternates("team", slug, "fr"),
    openGraph: {
      title: `${team.flag} ${team.name} CDM 2026 — Effectif & Pronostics`,
      description: `${team.name} à la CDM 2026 : effectif complet, calendrier Groupe ${team.group}, cotes vainqueur, analyse. Classement FIFA #${team.fifaRanking}.`,
      url: `${domains.fr}/equipe/${team.slug}`,
      images: ogImages,
    },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const prediction = predictionsByTeamId[team.id];
  const teamPlayers = playersByTeamId[team.id] ?? [];
  const teamMatches = matches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  const winnerOdds = prediction ? estimatedOutrightOdds(prediction.winnerProb) : "—";
  const winPct = prediction ? Math.round(prediction.winnerProb * 100 * 10) / 10 : 0;

  const sportsTeamJsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    name: team.name,
    alternateName: team.code,
    sport: "Football",
    memberOf: { "@type": "SportsOrganization", name: "FIFA Coupe du Monde 2026" },
    url: `${domains.fr}/equipe/${team.slug}`,
    description: team.description,
  };

  const faqSchema = generateFAQSchema(team, prediction, winnerOdds);

  return (
    <>
      <BreadcrumbSchema 
        items={[
          {name:"Accueil",url:"/"},
          {name:"Équipes",url:"/equipes"},
          {name:"Groupe "+team.group,url:"/groupe/"+team.group.toLowerCase()},
          {name:team.name,url:"/equipe/"+team.slug}
        ]} 
        baseUrl={domains.fr} 
      />

      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/equipes" className="text-primary dark:text-secondary hover:underline">Équipes</Link></li>
            <li>/</li>
            <li><Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary dark:text-secondary hover:underline">Groupe {team.group}</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{team.name}</li>
          </ol>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <PremiumHero 
        team={team} 
        prediction={prediction}
        winnerOdds={winnerOdds}
        winPct={winPct}
      />

      {/* Probability Banner */}
      {prediction && (
        <PremiumProbabilityBanner 
          prediction={prediction} 
          teamName={team.name}
        />
      )}

      {/* Match Calendar */}
      {teamMatches.length > 0 && (
        <PremiumMatchCalendar 
          teamId={team.id}
          teamName={team.name}
          teamMatches={teamMatches}
        />
      )}

      {/* Squad / Effectif */}
      {teamPlayers.length > 0 && (
        <PremiumSquad 
          players={teamPlayers}
          teamSlug={team.slug}
          teamName={team.name}
        />
      )}

      {/* History */}
      <PremiumHistory team={team} />

      {/* FAQ Section */}
      <PremiumFAQ 
        team={team}
        prediction={prediction}
        winnerOdds={winnerOdds}
      />

      {/* Newsletter */}
      <Newsletter variant="banner" />

      {/* Final CTA */}
      <PremiumFinalCTA team={team} />

      {/* ANJ Banner */}

      {/* Schema.org JSON-LD */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsTeamJsonLd) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
    </>
  );
}
