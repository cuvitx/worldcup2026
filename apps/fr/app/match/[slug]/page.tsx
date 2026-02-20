import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { AiMatchPreview } from "@repo/ui/ai-match-preview";
import dynamic from "next/dynamic";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { domains, getAlternates } from "@repo/data/route-mapping";
import { getMatchPhase } from "@repo/data/tournament-state";
import { stageLabels, EXTERNAL_URLS } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchPredictionByPair } from "@repo/data/predictions";
import { ANJBanner } from "@repo/ui/anj-banner";
import {
  MatchHeroAdaptive,
  TeamComparison,
  PredictionCard,
  MatchSidebar,
  SameDayMatches,
} from "./_components";

const AiExpertInsight = dynamic(
  () => import("@repo/ui/ai-expert-insight").then((m) => ({ default: m.AiExpertInsight })),
  {
    loading: () => (
      <div className="rounded-xl border border-border bg-card p-6 animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      </div>
    ),
  }
);

export const revalidate = 300;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const stage = stageLabels[match.stage] ?? match.stage;
  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  return {
    title: `${homeName} vs ${awayName} - ${stage} | CDM 2026`,
    description: `${homeName} contre ${awayName}, ${stage} de la Coupe du Monde 2026. Le ${new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} au ${stadium?.name ?? "stade a confirmer"}.`,
    alternates: getAlternates("match", slug, "fr"),
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} — CDM 2026`,
      description: `${stage} - CDM 2026 | ${match.date} ${match.time} UTC`,
      images: [
        {
          url: `${domains.fr}/images/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${homeName} vs ${awayName} - CDM 2026`,
        },
      ],
    },
  };
}

export default async function MatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] ?? null : null;
  const stage = stageLabels[match.stage] ?? match.stage;
  const matchPhase = getMatchPhase(match.date, match.time);
  const isCompleted = matchPhase === "completed";

  // Fetch AI-enriched data
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "fr", {
      includeExpert: matchPhase === "upcoming",
    });
  } catch {
    // AI generation failed — page renders with static data only
  }

  const sameDayMatches = matches.filter(
    (m) => m.date === match.date && m.slug !== match.slug
  );

  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const prediction =
    home && away ? matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`] : undefined;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Calendrier", url: "/match/calendrier" },
          {
            name: (home?.name ?? "TBD") + " vs " + (away?.name ?? "TBD"),
            url: "/match/" + match.slug,
          },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap min-w-0">
            <li>
              <Link
                href="/"
                className="text-primary dark:text-secondary hover:underline py-2 inline-block"
              >
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/match/calendrier"
                className="text-primary dark:text-secondary hover:underline py-2 inline-block"
              >
                Calendrier
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium break-words min-w-0">
              {home?.name ?? "TBD"} vs {away?.name ?? "TBD"}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <MatchHeroAdaptive
        matchPhase={matchPhase}
        home={home}
        away={away}
        stadium={stadium}
        stage={stage}
        match={match}
        dateFormatted={dateFormatted}
      />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {home && away && <TeamComparison home={home} away={away} />}

            {enriched?.preview && (
              <AiMatchPreview
                preview={enriched.preview.preview}
                keyFactors={enriched.preview.keyFactors}
                prediction={enriched.preview.prediction}
                bettingAngle={enriched.preview.bettingAngle}
                grounded={enriched.preview.grounded}
                locale="fr"
              />
            )}

            {enriched?.expert && (
              <AiExpertInsight
                valueBets={enriched.expert.valueBets}
                matchAnalysis={enriched.expert.matchAnalysis}
                scorePrediction={enriched.expert.scorePrediction}
                keyInsight={enriched.expert.keyInsight}
                locale="fr"
              />
            )}

            {home && away && (
              <PredictionCard
                home={home}
                away={away}
                prediction={prediction}
                isCompleted={isCompleted}
                matchSlug={match.slug}
              />
            )}
          </div>

          {/* Sidebar */}
          <MatchSidebar
            stadium={stadium}
            city={city}
            stage={stage}
            match={match}
            dateFormatted={dateFormatted}
            home={home}
            away={away}
            enriched={enriched}
          />
        </div>
      </div>

      {/* Sidebar same-day matches */}
      {sameDayMatches.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-start-3">
              <SameDayMatches
                sameDayMatches={sameDayMatches}
                teamsById={teamsById}
                currentDate={match.date}
                isSidebar
              />
            </div>
          </div>
        </div>
      )}

      {/* Same-day matches full section */}
      <SameDayMatches
        sameDayMatches={sameDayMatches}
        teamsById={teamsById}
        currentDate={match.date}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${home?.name ?? "TBD"} vs ${away?.name ?? "TBD"} - Coupe du Monde 2026`,
            description: `${home?.name ?? "TBD"} contre ${away?.name ?? "TBD"}, ${stage} de la Coupe du Monde FIFA 2026.`,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            startDate: `${match.date}T${match.time}:00Z`,
            location: stadium
              ? {
                  "@type": "StadiumOrArena",
                  name: stadium.name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: stadium.city,
                    addressCountry: stadium.country,
                  },
                  maximumAttendeeCapacity: stadium.capacity,
                }
              : undefined,
            homeTeam: home ? { "@type": "SportsTeam", name: home.name } : undefined,
            awayTeam: away ? { "@type": "SportsTeam", name: away.name } : undefined,
            organizer: {
              "@type": "Organization",
              name: "FIFA",
              url: EXTERNAL_URLS.FIFA_SITE,
            },
            offers: {
              "@type": "Offer",
              url: `https://cdm2026.fr/billets`,
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
              price: "0",
              validFrom: "2025-01-01",
            },
            sport: "Football",
          }),
        }}
      />

      <ANJBanner />
    </>
  );
}
