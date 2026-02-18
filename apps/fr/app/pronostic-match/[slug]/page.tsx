import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { AiExpertInsight } from "@repo/ui/ai-expert-insight";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import {
  bookmakers,
  featuredBookmaker,
  estimatedMatchOdds,
} from "@repo/data/affiliates";
import CommunityVote from "../../components/CommunityVote";
import Link from "next/link";
import {
  MatchHero,
  PredictionOutcomes,
  PredictedScore,
  OddsTable,
  BettingCta,
  MatchAnalysis,
  H2HSection,
  MatchInfo,
  PredictionSidebar,
} from "./components";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32e de finale",
  "round-of-16": "8e de finale",
  "quarter-final": "Quart de finale",
  "semi-final": "Demi-finale",
  "third-place": "Match pour la 3e place",
  final: "Finale",
};

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];

  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  return {
    title: `Pronostic ${homeName} vs ${awayName} | Cotes & Prediction CDM 2026`,
    description: `Pronostic ${homeName} vs ${awayName} Coupe du Monde 2026 : cotes estimees, score predit, analyse du match et historique des confrontations. Pariez sur ${homeName} - ${awayName} CDM 2026.`,
    alternates: getAlternates("predictionMatch", slug, "fr"),
    openGraph: {
      title: `${home?.flag ?? ""} Pronostic ${homeName} vs ${awayName} ${away?.flag ?? ""} | CDM 2026`,
      description: `Cotes, prediction et analyse du match ${homeName} - ${awayName}. Coupe du Monde 2026.`,
    },
  };
}

export default async function PronosticMatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? (citiesById[stadium.cityId] ?? null) : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  // Predictions
  const prediction =
    home && away
      ? matchPredictionByPair[`${home.id}:${away.id}`]
      : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;

  // Estimated odds
  const odds = prediction
    ? estimatedMatchOdds(
        prediction.team1WinProb,
        prediction.drawProb,
        prediction.team2WinProb
      )
    : null;

  // H2H
  const h2h =
    home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  // AI-enriched data (weather, live odds, injuries, expert analysis)
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "fr", {
      includeExpert: true,
    });
  } catch {
    // AI generation failed — page renders with static data only
  }

  // Date formatting
  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  // Find the most likely outcome
  const outcomes = prediction
    ? [
        { key: "1", label: `Victoire ${homeName}`, prob: prediction.team1WinProb },
        { key: "N", label: "Match nul", prob: prediction.drawProb },
        { key: "2", label: `Victoire ${awayName}`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));

  // Related matches (same matchday or group)
  const relatedMatches = matches.filter(
    (m) =>
      m.id !== match.id &&
      ((match.group && m.group === match.group) ||
        (match.matchday && m.matchday === match.matchday && m.stage === "group"))
  ).slice(0, 6);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"},{name:"Pronostic "+homeName+" vs "+awayName,url:"/pronostic-match/"+match.slug}]} baseUrl={domains.fr} />
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendrier" className="hover:text-primary">
                Calendrier
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              Pronostic {homeName} vs {awayName}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <MatchHero
        home={home}
        away={away}
        match={match}
        stadium={stadium}
        city={city}
        stage={stage}
        homeName={homeName}
        awayName={awayName}
        dateFormatted={dateFormatted}
      />

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1N2 Prediction */}
            {prediction && (
              <PredictionOutcomes
                outcomes={outcomes}
                maxProb={maxProb}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Score exact predit */}
            {prediction && (
              <PredictedScore
                prediction={prediction}
                home={home}
                away={away}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Cotes estimees */}
            {odds && (
              <OddsTable
                odds={odds}
                homeName={homeName}
                awayName={awayName}
                bookmakers={bookmakers}
              />
            )}

            {/* Affiliate CTA Block */}
            <BettingCta
              featuredBookmaker={featuredBookmaker}
              bookmakers={bookmakers}
              matchLabel={home && away ? `${home.name} vs ${away.name}` : undefined}
            />

            {home && away && prediction && (
              <MatchAnalysis
                match={match}
                home={home}
                away={away}
                prediction={prediction}
                predHome={predHome}
                predAway={predAway}
                h2h={h2h}
                stage={stage}
                homeName={homeName}
                awayName={awayName}
                dateFormatted={dateFormatted}
                stadium={stadium}
              />
            )}

            {/* Expert AI Analysis (Claude) */}
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
              <H2HSection
                home={home}
                away={away}
                h2h={h2h}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Community Vote 1N2 */}
            <CommunityVote
              slug={match.slug}
              homeName={homeName}
              awayName={awayName}
              homeRanking={home?.fifaRanking ?? 50}
              awayRanking={away?.fifaRanking ?? 50}
            />

            <MatchInfo
              match={match}
              stadium={stadium}
              city={city}
              stage={stage}
              dateFormatted={dateFormatted}
            />
          </div>

          {/* Sidebar */}
          <PredictionSidebar
            prediction={prediction}
            odds={odds}
            home={home}
            away={away}
            match={match}
            stadium={stadium}
            city={city}
            homeName={homeName}
            awayName={awayName}
            enriched={enriched}
            featuredBookmaker={featuredBookmaker}
            relatedMatches={relatedMatches}
          />
        </div>
      </div>

      {/* JSON-LD SportsEvent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${homeName} vs ${awayName} - Coupe du Monde 2026`,
            eventStatus: "https://schema.org/EventScheduled",
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
                }
              : undefined,
            homeTeam: home
              ? { "@type": "SportsTeam", name: home.name }
              : undefined,
            awayTeam: away
              ? { "@type": "SportsTeam", name: away.name }
              : undefined,
            sport: "Football",
            description: `Pronostic et cotes pour ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026.`,
          }),
        }}
      />
    </>
  );
}
