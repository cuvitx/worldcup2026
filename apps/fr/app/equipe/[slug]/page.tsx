/* eslint-disable @next/next/no-img-element */
import { HeroSection } from "@repo/ui/hero-section";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import { generateFullTeamAnalysis } from "@repo/ai/generators";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { groupsByLetter } from "@repo/data/groups";
import { playersByTeamId } from "@repo/data/players";
import { matchesByGroup } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import { getFlagPath, getISOCode } from "@repo/data/country-codes";
import { RelatedContent, type RelatedItem } from "../../components/RelatedContent";
import { TeamMainContent } from "./_components/TeamMainContent";
import { TeamSidebar } from "./_components/TeamSidebar";
import { ANJBanner } from "@repo/ui/anj-banner";

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
    title: `${team.name} - Coupe du Monde 2026 | Effectif, Stats & Pronostics`,
    description: `Tout sur ${team.name} à la Coupe du Monde 2026 : effectif, statistiques, historique, groupe ${team.group}, cotes et pronostics. ${team.description}`,
    alternates: getAlternates("team", slug, "fr"),
    openGraph: {
      title: `Équipe ${team.name} — CDM 2026`,
      description: `${team.flag} Fiche complète de ${team.name} pour la Coupe du Monde 2026. Groupe ${team.group}, classement FIFA #${team.fifaRanking}.`,
      images: ogImages,
    },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const group = groupsByLetter[team.group];
  const groupTeams = group
    ? group.teams
        .map((id) => teams.find((t) => t.id === id))
        .filter((t): t is NonNullable<typeof t> => t != null && t.id !== team.id)
    : [];

  const prediction = predictionsByTeamId[team.id];
  const teamPlayers = (playersByTeamId[team.id] ?? []).map(p => ({ ...p, number: p.number ?? undefined }));
  const teamMatches = (matchesByGroup[team.group] ?? []).filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  let enriched: Awaited<ReturnType<typeof generateFullTeamAnalysis>> | null = null;
  try {
    enriched = await generateFullTeamAnalysis(team.id, "fr");
  } catch {
    // AI generation failed — page renders with static data only
  }

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Équipes",url:"/equipes"},{name:"Groupe "+team.group,url:"/groupe/"+team.group.toLowerCase()},{name:team.name,url:"/equipe/"+team.slug}]} baseUrl={domains.fr} />

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

      {/* Team Header */}
      <HeroSection title={team.name} subtitle={`${team.confederation} · Classement FIFA #${team.fifaRanking} · Groupe ${team.group}`}>
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 mt-4">
            {getFlagPath(team.slug) ? (
              <div className="relative h-24 w-36 sm:h-32 sm:w-48 overflow-hidden rounded-xl shadow-lg border-2 border-white/20 shrink-0">
                <Image src={getFlagPath(team.slug)!} alt={`Drapeau de ${team.name}`} fill className="object-cover" priority sizes="(max-width: 640px) 144px, 192px" />
              </div>
            ) : (
              <span className="text-5xl sm:text-8xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            )}
            <div className="flex flex-wrap items-center gap-3">
              {team.isHost && (
                <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary">Pays hôte</span>
              )}
              <Link href={`/pronostic/${team.slug}`} className="inline-block rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent/80">
                Voir le pronostic &rarr;
              </Link>
            </div>
          </div>
      </HeroSection>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <TeamMainContent
            team={team}
            prediction={prediction}
            teamPlayers={teamPlayers}
            teamMatches={teamMatches}
            enriched={enriched}
            groupTeams={groupTeams}
          />
          <TeamSidebar
            team={team}
            prediction={prediction}
            groupTeams={groupTeams}
            enriched={enriched}
          />
        </div>
      </div>

      {/* Related content */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
        <RelatedContent
          items={[
            ...groupTeams
              .filter((t) => t.slug !== team.slug)
              .slice(0, 3)
              .map((t): RelatedItem => ({
                href: `/equipe/${t.slug}`,
                emoji: t.flag,
                title: t.name,
                description: `Groupe ${team.group} · FIFA #${t.fifaRanking}`,
              })),
            {
              href: '/pronostic-vainqueur',
              emoji: '🏆',
              title: 'Pronostic vainqueur',
              description: 'Qui va remporter la CDM 2026 ?',
            },
          ]}
        />
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: team.name,
            alternateName: team.code,
            sport: "Football",
            url: `${domains.fr}/equipe/${team.slug}`,
            description: team.description,
            memberOf: { "@type": "SportsOrganization", name: "FIFA World Cup 2026" },
          }),
        }}
      />
      <ANJBanner />
    </>
  );
}
