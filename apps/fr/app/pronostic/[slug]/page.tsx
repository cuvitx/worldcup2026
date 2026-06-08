import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { groupsByLetter } from "@repo/data/groups";
import { playersByTeamId } from "@repo/data/players";
import { matchesByGroup } from "@repo/data/matches";

import { EloRatingCard } from "./_components/EloRatingCard";
import { ProbabilityStages } from "./_components/ProbabilityStages";
import { EstimatedOdds } from "./_components/EstimatedOdds";
import { MatchPredictions } from "./_components/MatchPredictions";
import { KeyPlayers } from "./_components/KeyPlayers";
import { AffiliateSection } from "./_components/AffiliateSection";
import { PronosticSidebar } from "./_components/PronosticSidebar";

export const revalidate = 300;
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

  return {
    title: `Pronostic ${team.name} CDM 2026 | Cotes, Prediction & Analyse`,
    description: `Pronostic ${team.name} Coupe du Monde 2026 : cotes, probabilités de victoire, analyse ELO et prédictions des matchs de groupe.`,
    alternates: getAlternates("prediction", slug, "fr"),
    openGraph: {
      title: `${team.flag} Pronostic ${team.name} - CDM 2026`,
      description: `Cotes et pronostics ${team.name} pour la Coupe du Monde 2026. Analyse complete, probabilites et predictions.`,
    },
  };
}

export default async function PronosticTeamPage({ params }: PageProps) {
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
  const teamPlayers = playersByTeamId[team.id] ?? [];
  const teamMatches = (matchesByGroup[team.group] ?? []).filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  return (
    <>
<section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">Pronostic {team.name}</h1>
              <p className="mt-2 text-xl text-gray-300">Pronostic &amp; Cotes CDM 2026</p>
              <p className="mt-1 text-gray-500">{team.confederation} &middot; Classement FIFA #{team.fifaRanking} &middot; Groupe {team.group}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {prediction && <EloRatingCard teamName={team.name} eloRating={prediction.eloRating} />}
            {prediction && <ProbabilityStages teamName={team.name} prediction={prediction} />}
            {prediction && <EstimatedOdds teamName={team.name} prediction={prediction} />}
            <MatchPredictions teamName={team.name} teamId={team.id} teamGroup={team.group} teamMatches={teamMatches} />
            <KeyPlayers teamName={team.name} players={teamPlayers} />
            <AffiliateSection teamName={team.name} />
          </div>
          <PronosticSidebar team={team} prediction={prediction} groupTeams={groupTeams} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: team.name,
            alternateName: team.code,
            sport: "Football",
            memberOf: { "@type": "SportsOrganization", name: "FIFA World Cup 2026" },
            description: `Pronostic et cotes pour ${team.name}à la Coupe du Monde 2026. Rating ELO : ${prediction?.eloRating ?? "N/A"}.`,
            url: `https://www.cdm2026.fr/pronostic/${team.slug}`,
          }),
        }}
      />
    </>
  );
}
