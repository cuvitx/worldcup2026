import { generateFullMatchPreview } from "@repo/ai/generators";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamsById, matches, stadiumsById, citiesById } from "../../../lib/localized-data";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { estimatedMatchOdds, featuredBookmaker, pmuTrackingUrl } from "@repo/data/affiliates";
import { getOddsForMatch } from "@repo/api/football/odds";
import { stageLabelsI18n } from "@repo/data/constants";
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

const stageLabels = stageLabelsI18n.de;

export const revalidate = 300;
export const dynamicParams = true;

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
  const homeName = home?.name ?? "Noch offen";
  const awayName = away?.name ?? "Noch offen";

  return {
    title: `Prognose ${homeName} vs ${awayName} | Quoten & Vorhersage WM 2026`,
    description: `Prognose ${homeName} vs ${awayName} WM 2026: geschätzte Quoten, vorhergesagtes Ergebnis, Spielanalyse und Direktvergleich.`,
    alternates: getAlternates("predictionMatch", slug, "de"),
    openGraph: {
      title: `${home?.flag ?? ""} Prognose ${homeName} vs ${awayName} ${away?.flag ?? ""} | WM 2026`,
      description: `Quoten, Prognose und Spielanalyse ${homeName} - ${awayName}. WM 2026.`,
    },
  };
}

export default async function PrognoseMatchPage({ params }: PageProps) {
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

  // Fetch real bookmaker odds from API-Football (cached 1h)
  let realOdds: Awaited<ReturnType<typeof getOddsForMatch>> = null;
  try {
    realOdds = await getOddsForMatch(match.date, match.time);
  } catch {
    // API-Football unavailable — fallback to estimated odds
  }

  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "en", { includeExpert: true });
  } catch {
    // AI generation failed — renders with static data only
  }

  const dateFormatted = new Date(match.date).toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const homeName = home?.name ?? "Noch offen";
  const awayName = away?.name ?? "Noch offen";
  const outcomes = prediction
    ? [
        { key: "1", label: `Sieg ${homeName}`, prob: prediction.team1WinProb },
        { key: "N", label: "Unentschieden", prob: prediction.drawProb },
        { key: "2", label: `Sieg ${awayName}`, prob: prediction.team2WinProb },
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

      <MatchHero home={home} away={away} match={match} stadium={stadium} city={city} stage={stage} homeName={homeName} awayName={awayName} dateFormatted={dateFormatted} />

      {/* Betting CTA — above fold, right after hero */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="rounded-2xl px-5 py-4 text-white flex flex-col sm:flex-row sm:items-center gap-4 border border-[#d4af37]/25" style={{ background: "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)" }}>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-base">Auf dieses Spiel wetten</p>
            {odds && (
              <p className="text-sm text-white/70 mt-0.5">
                Geschätzte Quoten: <span className="text-[#ffd700] font-semibold">{homeName} {odds.home}</span> · Unentschieden {odds.draw} · <span className="text-[#ffd700] font-semibold">{awayName} {odds.away}</span>
              </p>
            )}
            <p className="text-[10px] text-white/40 mt-1">18+ | Es gelten die AGB</p>
          </div>
          <a
            href={pmuTrackingUrl("match-hero-cta")}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="shrink-0 inline-block rounded-xl px-6 py-3 text-sm font-bold text-[#0c3b2e] hover:brightness-110 transition-all text-center"
            style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
          >
            Jetzt bei Betano wetten →
          </a>
        </div>
      </div>

      <MatchActions matchSlug={match.slug} homeName={homeName} awayName={awayName} predictionText={`Meine Prognose für ${homeName} vs ${awayName}: ${prediction && prediction.team1WinProb > prediction.team2WinProb ? homeName : awayName} gewinnt! #WM2026 #WorldCup2026`} />

      <MatchTabsClient>
        <PredictionTab prediction={prediction} outcomes={outcomes} maxProb={maxProb} home={home} away={away} homeName={homeName} awayName={awayName} match={match} predHome={predHome} predAway={predAway} h2h={h2h} stage={stage} dateFormatted={dateFormatted} stadium={stadium} city={city} enriched={enriched} odds={odds} featuredBookmaker={featuredBookmaker} relatedMatches={relatedMatches} />
        <OddsTab odds={odds} homeName={homeName} awayName={awayName} matchSlug={match.slug} homeRanking={home?.fifaRanking ?? 50} awayRanking={away?.fifaRanking ?? 50} realOdds={realOdds} />
        <StatsTab predHome={predHome} predAway={predAway} home={home} away={away} homeName={homeName} awayName={awayName} prediction={prediction} />
        <H2HTab home={home} away={away} h2h={h2h} homeName={homeName} awayName={awayName} />
        <InfoTab match={match} stadium={stadium} city={city} stage={stage} dateFormatted={dateFormatted} homeName={homeName} awayName={awayName} homeRanking={home?.fifaRanking ?? 50} awayRanking={away?.fifaRanking ?? 50} />
      </MatchTabsClient>
      <MatchStructuredData match={match} home={home} away={away} homeName={homeName} awayName={awayName} stadium={stadium} stage={stage} />
      <RelatedMatchesSection currentMatch={match} allMatches={matches} home={home} away={away} slug={slug} />
    </>
  );
}
