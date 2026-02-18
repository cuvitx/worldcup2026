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
import { getAlternates, domains } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { AiExpertInsight } from "@repo/ui/ai-expert-insight";
import { generateFullMatchPreview } from "@repo/ai/generators";
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
  group: "Group Stage",
  "round-of-32": "Round of 32",
  "round-of-16": "Round of 16",
  "quarter-final": "Quarter-final",
  "semi-final": "Semi-final",
  "third-place": "Third Place Match",
  final: "Final",
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

  const homeName = home?.name ?? "TBD";
  const awayName = away?.name ?? "TBD";

  return {
    alternates: getAlternates("predictionMatch", slug, "en"),
    title: `${homeName} vs ${awayName} Prediction | Odds & Analysis WC 2026`,
    description: `${homeName} vs ${awayName} prediction for the 2026 World Cup: estimated odds, predicted score, match analysis and head-to-head history. Bet on ${homeName} - ${awayName} WC 2026.`,
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} Prediction | WC 2026`,
      description: `Odds, prediction and analysis for ${homeName} - ${awayName}. 2026 World Cup.`,
    },
  };
}

export default async function PredictionMatchPage({ params }: PageProps) {
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

  // AI-enriched data
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "en", {
      includeExpert: true,
    });
  } catch {
    // AI generation failed — page renders with static data only
  }

  // Date formatting
  const dateFormatted = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const homeName = home?.name ?? "TBD";
  const awayName = away?.name ?? "TBD";

  // Find the most likely outcome
  const outcomes = prediction
    ? [
        { key: "1", label: `${homeName} win`, prob: prediction.team1WinProb },
        { key: "X", label: "Draw", prob: prediction.drawProb },
        { key: "2", label: `${awayName} win`, prob: prediction.team2WinProb },
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
      <BreadcrumbSchema items={[{name:"Home",url:"/"},{name:"Schedule",url:"/match/schedule"},{name:"Prediction",url:`/prediction-match/${match.slug}`}]} baseUrl={domains.en} />
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/schedule" className="hover:text-primary">
                Schedule
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {homeName} vs {awayName} Prediction
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
            {/* 1X2 Prediction */}
            {prediction && (
              <PredictionOutcomes
                outcomes={outcomes}
                maxProb={maxProb}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Predicted Exact Score */}
            {prediction && (
              <PredictedScore
                prediction={prediction}
                home={home}
                away={away}
                homeName={homeName}
                awayName={awayName}
              />
            )}

            {/* Estimated Odds */}
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

            {/* Expert AI Analysis */}
            {enriched?.expert && (
              <AiExpertInsight
                valueBets={enriched.expert.valueBets}
                matchAnalysis={enriched.expert.matchAnalysis}
                scorePrediction={enriched.expert.scorePrediction}
                keyInsight={enriched.expert.keyInsight}
                locale="en"
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
            name: `${homeName} vs ${awayName} - World Cup 2026`,
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
            description: `Prediction and odds for ${homeName} vs ${awayName}, ${stage} of the 2026 World Cup.`,
            url: `https://worldcup2026guide.com/prediction-match/${match.slug}`,
          }),
        }}
      />
    </>
  );
}
