import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains, getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { groups, groupsBySlug } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { matchesByGroup } from "@repo/data/matches";
import { predictionsByTeamId } from "@repo/data/predictions";
import { groupPredictionsByGroup } from "@repo/data/predictions-2026";

import { GroupTeamsTable } from "./_components/GroupTeamsTable";
import { PredictedRanking } from "./_components/PredictedRanking";
import { EnrichedPrediction } from "./_components/EnrichedPrediction";
import { QualificationPronostic } from "./_components/QualificationPronostic";
import { ForceAnalysis } from "./_components/ForceAnalysis";
import { GroupCalendar } from "./_components/GroupCalendar";
import { QualificationOdds } from "./_components/QualificationOdds";
import { GroupSidebar } from "./_components/GroupSidebar";
import { ANJBanner } from "@repo/ui/anj-banner";

export const revalidate = 3600;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ lettre: string }>;
}

export async function generateStaticParams() {
  return groups.map((group) => ({ lettre: group.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
  if (!group) return {};

  const groupTeams = group.teams
    .map((id) => teamsById[id])
    .filter((t): t is NonNullable<typeof t> => t != null && !t.id.startsWith("barrage"));
  const teamNames = groupTeams.map((t) => t.name).join(", ");

  return {
    title: `Pronostic Groupe ${group.letter} CDM 2026 | Analyse & Qualification`,
    description: `Pronostic Groupe ${group.letter} Coupe du Monde 2026 : ${teamNames}. Classement prédit, analyse des forces, cotes qualification et calendrier complet du groupe.`,
    alternates: getAlternates("group", lettre, "fr"),
    openGraph: {
      title: `Pronostic Groupe ${group.letter} - CDM 2026`,
      description: `${teamNames} — Qui se qualifie ? Analyse et pronostics du Groupe ${group.letter}.`,
    },
  };
}

function getSortedGroupTeams(group: { teams: string[] }) {
  return group.teams
    .map((id) => {
      const team = teamsById[id];
      const pred = predictionsByTeamId[id];
      return { team, pred, id };
    })
    .filter((x): x is { team: NonNullable<(typeof teamsById)[string]>; pred: typeof x.pred; id: string } => x.team != null)
    .sort((a, b) => {
      const probA = a.pred?.groupStageProb ?? 0;
      const probB = b.pred?.groupStageProb ?? 0;
      if (probB !== probA) return probB - probA;
      const eloA = a.pred?.eloRating ?? 0;
      const eloB = b.pred?.eloRating ?? 0;
      return eloB - eloA;
    });
}

export default async function PronosticGroupPage({ params }: PageProps) {
  const { lettre } = await params;
  const group = groupsBySlug[lettre];
  if (!group) notFound();

  const sortedTeams = getSortedGroupTeams(group);
  const groupMatches = matchesByGroup[group.letter] ?? [];
  const allGroupTeams = group.teams
    .map((id) => teamsById[id])
    .filter((t): t is NonNullable<typeof t> => t != null);

  const enrichedPrediction = groupPredictionsByGroup[group.letter];
  const enrichedSorted = enrichedPrediction
    ? [...enrichedPrediction.teams].sort((a, b) => a.rank - b.rank)
    : [];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Pronostics", url: "/pronostic" },
          { name: `Pronostic Groupe ${group.letter}`, url: `/pronostic-groupe/${lettre}` },
        ]}
        baseUrl={domains.fr}
      />

      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
            <li><Link href="/" className="hover:text-primary transition-colors">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/pronostic" className="hover:text-primary transition-colors">Pronostics</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Groupe {group.letter}</li>
          </ol>
        </div>
      </nav>

      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-1">Pronostic · Coupe du Monde 2026</p>
              <h1 className="text-3xl font-extrabold sm:text-5xl">Groupe {group.letter}</h1>
              <p className="mt-3 text-gray-300 text-lg">
                {allGroupTeams.map((t) => t.flag).join("  ")} &nbsp;
                {allGroupTeams.map((t) => t.name).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <GroupTeamsTable groupLetter={group.letter} sortedTeams={sortedTeams} />
            <PredictedRanking sortedTeams={sortedTeams} />
            <EnrichedPrediction enrichedSorted={enrichedSorted} />
            <QualificationPronostic sortedTeams={sortedTeams} />
            <ForceAnalysis sortedTeams={sortedTeams} groupLetter={group.letter} />
            <GroupCalendar groupLetter={group.letter} groupMatches={groupMatches} />
            <QualificationOdds sortedTeams={sortedTeams} />
          </div>
          <GroupSidebar groupLetter={group.letter} lettre={lettre} sortedTeams={sortedTeams} />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `Coupe du Monde 2026 — Groupe ${group.letter}`,
            sport: "Football",
            startDate: groupMatches[0]?.date ?? "2026-06-11",
            competitor: allGroupTeams.map((t) => ({ "@type": "SportsTeam", name: t.name })),
          }),
        }}
      />
      <ANJBanner />
    </>
  );
}
