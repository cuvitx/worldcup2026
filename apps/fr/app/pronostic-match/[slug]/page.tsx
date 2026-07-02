import { generateFullMatchPreview } from "@repo/ai/generators";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { matches } from "@repo/data/matches";
import { getMatchPredictionForTeams, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import {
  affiliateLinkAttributes,
  estimatedMatchOdds,
  featuredBookmaker,
  pmuTrackingUrl,
} from "@repo/data/affiliates";
import { getOddsForMatch } from "@repo/api/football/odds";
import { stageLabels } from "@repo/data/constants";
import { MatchHero, MatchTabsClient } from "./components";
import {
  MatchStructuredData,
  RelatedMatchesSection,
  PredictionTab,
  OddsTab,
  StatsTab,
  H2HTab,
  InfoTab,
  MatchActions,
} from "./_components";
import {
  generateStaticResolvedMatchParams,
} from "../../../lib/knockout-match-teams";
import { resolveMatchTeamsWithResults } from "../../../lib/knockout-match-teams-runtime";

export const revalidate = 300;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateStaticResolvedMatchParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const { home, away, homeName, awayName } =
    await resolveMatchTeamsWithResults(match);
  const stage = stageLabels[match.stage] ?? match.stage;

  return {
    title: `Pronostic ${homeName} vs ${awayName} - ${stage}`,
    description: `Pronostic ${homeName} vs ${awayName} Coupe du Monde 2026 : cotes estimées, score prédit, analyse du match et historique des confrontations.`,
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

  const { home, away, homeName, awayName } =
    await resolveMatchTeamsWithResults(match);
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? (citiesById[stadium.cityId] ?? null) : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  const prediction = home && away ? getMatchPredictionForTeams(home.id, away.id) : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;
  const odds = prediction
    ? estimatedMatchOdds(prediction.team1WinProb, prediction.drawProb, prediction.team2WinProb)
    : null;
  const h2h = home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  // Fetch real bookmaker odds from API-Football (cached 1h)
  let realOdds: Awaited<ReturnType<typeof getOddsForMatch>> = null;
  try {
    realOdds = await getOddsForMatch(match.date, match.time);
  } catch {
    // API-Football unavailable — fallback to estimated odds
  }

  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await Promise.race([
      generateFullMatchPreview(slug, "fr", { includeExpert: true }),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 15_000)),
    ]);
  } catch {
    // AI generation failed — renders with static data only
  }

  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const outcomes = prediction
    ? [
        { key: "1", label: `Victoire ${homeName}`, prob: prediction.team1WinProb },
        { key: "N", label: "Match nul", prob: prediction.drawProb },
        { key: "2", label: `Victoire ${awayName}`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = outcomes.length ? Math.max(...outcomes.map((o) => o.prob)) : 0;
  const relatedMatchCandidates = matches
    .filter(
      (m) =>
        m.id !== match.id &&
        ((match.group && m.group === match.group) ||
          (match.matchday && m.matchday === match.matchday && m.stage === "group") ||
          (!match.group && !match.matchday && m.date === match.date))
    )
    .slice(0, 6);
  const relatedMatches = await Promise.all(
    relatedMatchCandidates.map(async (relatedMatch) => {
      const resolved = await resolveMatchTeamsWithResults(relatedMatch);
      return {
        match: relatedMatch,
        home: resolved.home,
        away: resolved.away,
        homeName: resolved.homeName,
        awayName: resolved.awayName,
      };
    }),
  );
  const matchHeroTracking = {
    pageType: "pronostic-match",
    slug: match.slug,
    placement: "hero",
  };

  return (
    <>

      <MatchHero home={home} away={away} match={match} stadium={stadium} city={city} stage={stage} homeName={homeName} awayName={awayName} dateFormatted={dateFormatted} />

      {/* Betting CTA — above fold, right after hero */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-2xl px-5 py-4 text-white flex flex-col sm:flex-row sm:items-center gap-4 border border-[#d4af37]/25" style={{ background: "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)" }}>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">Parier sur ce match</p>
            {odds && (
              <p className="text-sm text-white/70 mt-0.5">
                Cotes estimées : <span className="text-[#ffd700] font-semibold">{homeName} {odds.home}</span> · Nul {odds.draw} · <span className="text-[#ffd700] font-semibold">{awayName} {odds.away}</span>
              </p>
            )}
            <p className="text-[10px] text-white/40 mt-1">18+ | Offre soumise à conditions</p>
          </div>
          <a
            href={pmuTrackingUrl(matchHeroTracking)}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            {...affiliateLinkAttributes(matchHeroTracking)}
            className="shrink-0 inline-block rounded-xl px-6 py-3 text-sm font-bold text-[#0c3b2e] hover:brightness-110 transition-all text-center"
            style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
          >
            100€ offerts sur PMU Play →
          </a>
        </div>
      </div>

      <MatchActions matchSlug={match.slug} homeName={homeName} awayName={awayName} predictionText={`Mon pronostic pour ${homeName} vs ${awayName} : ${prediction && prediction.team1WinProb > prediction.team2WinProb ? homeName : awayName} gagne ! #CDM2026 #WorldCup2026`} />

      <MatchTabsClient>
        <PredictionTab prediction={prediction} outcomes={outcomes} maxProb={maxProb} home={home} away={away} homeName={homeName} awayName={awayName} match={match} predHome={predHome} predAway={predAway} h2h={h2h} stage={stage} dateFormatted={dateFormatted} stadium={stadium} city={city} enriched={enriched} odds={odds} featuredBookmaker={featuredBookmaker} relatedMatches={relatedMatches} />
        <OddsTab odds={odds} homeName={homeName} awayName={awayName} matchSlug={match.slug} homeRanking={home?.fifaRanking ?? 50} awayRanking={away?.fifaRanking ?? 50} realOdds={realOdds} />
        <StatsTab predHome={predHome} predAway={predAway} home={home} away={away} homeName={homeName} awayName={awayName} prediction={prediction} />
        <H2HTab home={home} away={away} h2h={h2h} homeName={homeName} awayName={awayName} />
        <InfoTab match={match} stadium={stadium} city={city} stage={stage} dateFormatted={dateFormatted} homeName={homeName} awayName={awayName} homeRanking={home?.fifaRanking ?? 50} awayRanking={away?.fifaRanking ?? 50} />
      </MatchTabsClient>
      <MatchStructuredData match={match} home={home} away={away} homeName={homeName} awayName={awayName} stadium={stadium} stage={stage} />
      <RelatedMatchesSection home={home} away={away} relatedMatches={relatedMatches} />
    </>
  );
}
