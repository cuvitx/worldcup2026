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
import { teamContent } from "@repo/data/team-content";

import { PremiumHero } from "./_components/PremiumHero";
import { PremiumProbabilityBanner } from "./_components/PremiumProbabilityBanner";
import { PremiumMatchCalendar } from "./_components/PremiumMatchCalendar";
import { PremiumSquad } from "./_components/PremiumSquad";
import { PremiumHistory } from "./_components/PremiumHistory";
import { PremiumFAQ, generateFAQSchema } from "./_components/PremiumFAQ";
import { PremiumPronostic } from "./_components/PremiumPronostic";
import { PremiumAnecdotes } from "./_components/PremiumAnecdotes";
import { PremiumMatchPronosticLinks } from "./_components/PremiumMatchPronosticLinks";
import { PremiumFinalCTA } from "./_components/PremiumFinalCTA";
import { TeamQuickNav } from "../../components/TeamQuickNav";
import { BarChart3, ClipboardList, Medal, Sparkles, Trophy, Users } from "lucide-react"

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
    : [{ url: "https://www.cdm2026.fr/images/og-default.png", width: 1200, height: 630, alt: "CDM 2026" }];

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
  const content = teamContent[team.slug];

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
{/* Breadcrumbs */}
{/* Premium Hero + Probability (single hero-animated section) */}
      <section className="hero-animated text-white">
        <PremiumHero 
          team={team} 
          prediction={prediction}
          winnerOdds={winnerOdds}
          winPct={winPct}
        />
        {prediction && (
          <PremiumProbabilityBanner 
            prediction={prediction} 
            teamName={team.name}
          />
        )}
      </section>

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

      {/* Pronostic & Odds */}
      <PremiumPronostic team={team} prediction={prediction} content={content} />

      {/* History */}
      <PremiumHistory team={team} />

      {/* Anecdotes */}
      <PremiumAnecdotes team={team} content={content} />

      {/* Match Pronostic Links */}
      <PremiumMatchPronosticLinks team={team} teamMatches={teamMatches} />

      {/* FAQ Section */}
      <PremiumFAQ 
        team={team}
        prediction={prediction}
        winnerOdds={winnerOdds}
      />

      {/* Related internal links */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">À explorer aussi</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href={`/groupe/${team.group.toLowerCase()}`}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><ClipboardList className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Groupe {team.group}</p>
              <p className="text-xs text-gray-500">Classement, matchs et pronostics du groupe</p>
            </div>
          </Link>
          <Link
            href={`/pronostic/${team.slug}`}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><Sparkles className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Pronostic {team.name}</p>
              <p className="text-xs text-gray-500">Analyse détaillée et cotes vainqueur</p>
            </div>
          </Link>
          <Link
            href={`/pronostic-groupe/${team.group.toLowerCase()}`}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><BarChart3 className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Pronostic Groupe {team.group}</p>
              <p className="text-xs text-gray-500">Qui se qualifie ? Notre prédiction</p>
            </div>
          </Link>
          <Link
            href="/classement-fifa"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><Trophy className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Classement FIFA</p>
              <p className="text-xs text-gray-500">{team.name} est #{team.fifaRanking} mondial</p>
            </div>
          </Link>
          <Link
            href="/pronostic/vainqueur"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><Medal className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Pronostic vainqueur CDM 2026</p>
              <p className="text-xs text-gray-500">Favoris et cotes pour le titre</p>
            </div>
          </Link>
          <Link
            href="/comparateur-joueurs"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><Users className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Comparateur de joueurs</p>
              <p className="text-xs text-gray-500">Comparez les stars de la CDM 2026</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter variant="banner" />

      {/* Quick Nav & Sidebar */}
      <TeamQuickNav teamSlug={team.slug} />
      

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
