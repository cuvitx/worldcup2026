import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { domains, getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { bookmakers, featuredBookmaker, estimatedMatchOdds } from "@repo/data/affiliates";
import { stageLabels } from "@repo/data/constants";
import { MatchHero, MatchTabsClient } from "./components";
import {
  BreadcrumbNav,
  MatchStructuredData,
  RelatedMatchesSection,
  PredictionTab,
  OddsTab,
  StatsTab,
  H2HTab,
  InfoTab,
  MatchActions,
} from "./_components";

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
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  return {
    title: `Pronostic ${homeName} vs ${awayName} | Cotes & Prediction CDM 2026`,
    description: `Pronostic ${homeName} vs ${awayName} Coupe du Monde 2026 : cotes estimees, score predit, analyse du match et historique des confrontations.`,
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

  const prediction = home && away ? matchPredictionByPair[`${home.id}:${away.id}`] : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;
  const odds = prediction
    ? estimatedMatchOdds(prediction.team1WinProb, prediction.drawProb, prediction.team2WinProb)
    : null;
  const h2h = home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "fr", { includeExpert: true });
  } catch {
    // AI generation failed — renders with static data only
  }

  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";
  const outcomes = prediction
    ? [
        { key: "1", label: `Victoire ${homeName}`, prob: prediction.team1WinProb },
        { key: "N", label: "Match nul", prob: prediction.drawProb },
        { key: "2", label: `Victoire ${awayName}`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));
  const relatedMatches = matches
    .filter(
      (m) =>
        m.id !== match.id &&
        ((match.group && m.group === match.group) ||
          (match.matchday && m.matchday === match.matchday && m.stage === "group"))
    )
    .slice(0, 6);

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Calendrier", url: "/match/calendrier" },
          { name: `Pronostic ${homeName} vs ${awayName}`, url: `/pronostic-match/${match.slug}` },
        ]}
        baseUrl={domains.fr}
      />

      <BreadcrumbNav homeName={homeName} awayName={awayName} />
      <MatchHero home={home} away={away} match={match} stadium={stadium} city={city} stage={stage} homeName={homeName} awayName={awayName} dateFormatted={dateFormatted} />
      <MatchActions matchSlug={match.slug} homeName={homeName} awayName={awayName} predictionText={`Mon pronostic pour ${homeName} vs ${awayName} : ${prediction && prediction.team1WinProb > prediction.team2WinProb ? homeName : awayName} gagne ! #CDM2026 #WorldCup2026`} />
      <MatchTabsClient>
        <PredictionTab prediction={prediction} outcomes={outcomes} maxProb={maxProb} home={home} away={away} homeName={homeName} awayName={awayName} match={match} predHome={predHome} predAway={predAway} h2h={h2h} stage={stage} dateFormatted={dateFormatted} stadium={stadium} city={city} enriched={enriched} odds={odds} featuredBookmaker={featuredBookmaker} relatedMatches={relatedMatches} />
        <OddsTab odds={odds} homeName={homeName} awayName={awayName} bookmakers={bookmakers} featuredBookmaker={featuredBookmaker} matchSlug={match.slug} homeRanking={home?.fifaRanking ?? 50} awayRanking={away?.fifaRanking ?? 50} />
        <StatsTab predHome={predHome} predAway={predAway} home={home} away={away} homeName={homeName} awayName={awayName} prediction={prediction} />
        <H2HTab home={home} away={away} h2h={h2h} homeName={homeName} awayName={awayName} />
        <InfoTab match={match} stadium={stadium} city={city} stage={stage} dateFormatted={dateFormatted} homeName={homeName} awayName={awayName} homeRanking={home?.fifaRanking ?? 50} awayRanking={away?.fifaRanking ?? 50} />
      </MatchTabsClient>
      <MatchStructuredData match={match} home={home} away={away} homeName={homeName} awayName={awayName} stadium={stadium} stage={stage} />
      <RelatedMatchesSection currentMatch={match} allMatches={matches} home={home} away={away} slug={slug} />
    </>
  );
}
