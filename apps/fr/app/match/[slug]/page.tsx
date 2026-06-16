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
import { enrichMatchesWithResults, resolveApiFixtureId } from "@repo/api/football/match-results";
import { getFixtureEvents, getLineup, getFixtureStatistics } from "@repo/api/football";
import type { ApiFixtureEvent, ApiLineup, ApiFixtureStatistic } from "@repo/api/football";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchPredictionByPair } from "@repo/data/predictions";
import { pmuTrackingUrl, estimatedMatchOdds } from "@repo/data/affiliates";
import { teamApiIds } from "@repo/data/api-football-ids";
import { FAQSection } from "@repo/ui/faq-section";
import { MatchBettingCard } from "../../components/MatchBettingCard";
import {
  MatchHeroAdaptive,
  TeamComparison,
  PredictionCard,
  MatchSidebar,
  SameDayMatches,
  MatchEventsTimeline,
  MatchLineups,
  MatchStatistics,
  UpcomingPronosticsGrid,
} from "./_components";
import { MatchContextBar } from "../../components/MatchContextBar";
import { BarChart3, Sparkles, Swords, TrendingUp, Trophy } from "lucide-react"

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
    description: `${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026. Le ${new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} au ${stadium?.name ?? "stade a confirmer"}. Pronostics, cotes et composition.`,
    alternates: getAlternates("match", slug, "fr"),
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} — CDM 2026`,
      description: `${stage} - CDM 2026 | ${match.date} ${match.time} (heure de Paris)`,
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

function buildMatchFAQ(
  homeName: string,
  awayName: string,
  dateFormatted: string,
  time: string,
  stadium: { name: string; city?: string; capacity?: number; slug?: string } | undefined,
  stage: string,
  prediction: { team1WinProb: number; drawProb: number; team2WinProb: number } | undefined,
  odds: { home: string; draw: string; away: string } | null,
  slug: string,
  group: string | undefined,
): Array<{ question: string; answer: string }> {
  const items: Array<{ question: string; answer: string }> = [];

  items.push({
    question: `Quand a lieu ${homeName} vs ${awayName} ?`,
    answer: `Le match ${homeName} vs ${awayName} se joue le ${dateFormatted} à ${time} (heure de Paris), dans le cadre de la ${stage} de la Coupe du Monde 2026${stadium ? ` au ${stadium.name}${stadium.city ? ` (${stadium.city})` : ""}` : ""}.`,
  });

  items.push({
    question: `Où regarder ${homeName} vs ${awayName} en direct ?`,
    answer: `Les matchs de la Coupe du Monde 2026 sont diffusés en France sur TF1, beIN Sports et M6. Consultez notre page dédiée pour connaître la chaîne qui diffuse ${homeName} vs ${awayName}.`,
  });

  if (prediction) {
    const homeWin = Math.round(prediction.team1WinProb * 100);
    const draw = Math.round(prediction.drawProb * 100);
    const awayWin = Math.round(prediction.team2WinProb * 100);
    const favorite = homeWin >= awayWin ? homeName : awayName;
    const favPct = Math.max(homeWin, awayWin);
    items.push({
      question: `Quel est le pronostic pour ${homeName} vs ${awayName} ?`,
      answer: `Selon notre modèle, ${favorite} est favori avec ${favPct}% de chances de victoire. Le nul est estimé à ${draw}%. Retrouvez l'analyse complète sur notre page pronostic de ce match.`,
    });
  }

  if (odds) {
    items.push({
      question: `Quelles sont les cotes de ${homeName} vs ${awayName} ?`,
      answer: `Les cotes estimées pour ce match sont : victoire ${homeName} à ${odds.home}, match nul à ${odds.draw}, victoire ${awayName} à ${odds.away}. Pariez avec jusqu'à 100€ offerts chez PMU Play.`,
    });
  }

  if (stadium) {
    items.push({
      question: `Dans quel stade se joue ${homeName} vs ${awayName} ?`,
      answer: `Le match se dispute au ${stadium.name}${stadium.city ? `, situé à ${stadium.city}` : ""}${stadium.capacity ? `. Le stade peut accueillir ${stadium.capacity.toLocaleString("fr-FR")} spectateurs` : ""}.`,
    });
  }

  items.push({
    question: `Quelle est la composition de ${homeName} pour ce match ?`,
    answer: `Les compositions officielles sont généralement annoncées environ 1 heure avant le coup d'envoi. Consultez cette page le jour du match pour retrouver les équipes de départ de ${homeName} et ${awayName}.`,
  });

  if (group) {
    items.push({
      question: `${homeName} et ${awayName} sont-ils dans le même groupe ?`,
      answer: `Oui, ${homeName} et ${awayName} s'affrontent dans le Groupe ${group} de la Coupe du Monde 2026. Chaque groupe est composé de 4 équipes, les deux premières se qualifiant pour les huitièmes de finale.`,
    });
  }

  return items;
}

export default async function MatchPage({ params }: PageProps) {
  const { slug } = await params;
  const staticMatch = matchesBySlug[slug];
  if (!staticMatch) notFound();

  const home = teamsById[staticMatch.homeTeamId];
  const away = teamsById[staticMatch.awayTeamId];

  // Enrich with real API scores
  const teamNameMap: Record<string, string> = {};
  if (home) teamNameMap[home.id] = home.name;
  if (away) teamNameMap[away.id] = away.name;
  const enrichedMatches = await enrichMatchesWithResults([staticMatch], teamNameMap);
  const match = enrichedMatches[0] ?? staticMatch;
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] ?? null : null;
  const stage = stageLabels[match.stage] ?? match.stage;
  const matchPhase = getMatchPhase(match.date, match.time);
  const isCompleted = matchPhase === "completed";

  // AI-enriched data: skip during build (no API keys), fetch at runtime via ISR
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  const isBuild = process.env.NEXT_PHASE === "phase-production-build" || !process.env.GEMINI_API_KEY;
  if (!isBuild) {
    try {
      enriched = await generateFullMatchPreview(slug, "fr", {
        includeExpert: matchPhase === "upcoming",
      });
    } catch {
      // AI generation failed — page renders with static data only
    }
  }

  // Fetch match events, lineups, and statistics for live/completed matches
  let events: ApiFixtureEvent[] = [];
  let lineups: ApiLineup[] = [];
  let statistics: ApiFixtureStatistic[] = [];

  if (!isBuild && (matchPhase === "live" || matchPhase === "completed")) {
    const fixtureId = await resolveApiFixtureId(match);
    if (fixtureId) {
      const [ev, lu, st] = await Promise.all([
        getFixtureEvents(fixtureId).catch(() => [] as ApiFixtureEvent[]),
        getLineup(fixtureId).catch(() => [] as ApiLineup[]),
        getFixtureStatistics(fixtureId).catch(() => [] as ApiFixtureStatistic[]),
      ]);
      events = ev;
      lineups = lu;
      statistics = st;
    }
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

  const matchOdds = prediction
    ? estimatedMatchOdds(prediction.team1WinProb, prediction.drawProb, prediction.team2WinProb)
    : null;

  // When match is completed, find the next upcoming match to promote instead
  let nextMatch: (typeof matches)[number] | undefined = undefined;
  let nextHome: typeof home = undefined;
  let nextAway: typeof away = undefined;
  let nextOdds: typeof matchOdds = null;


  // Upcoming pronostics for the grid (completed match pages)
  let upcomingPronostics: Array<{
    slug: string;
    date: string;
    time: string;
    homeName: string;
    homeFlag: string;
    awayName: string;
    awayFlag: string;
    prediction?: { team1WinProb: number; drawProb: number; team2WinProb: number };
  }> = [];

  if (isCompleted) {
    const now = new Date();
    const upcoming = matches
      .filter((m) => {
        const kickoff = new Date(`${m.date}T${m.time || "00:00"}:00+02:00`);
        return kickoff > now && m.homeTeamId && m.awayTeamId;
      })
      .sort((a, b) => {
        const da = new Date(`${a.date}T${a.time || "00:00"}:00+02:00`);
        const db = new Date(`${b.date}T${b.time || "00:00"}:00+02:00`);
        return da.getTime() - db.getTime();
      });

    const first = upcoming[0];
    if (first) {
      nextMatch = first;
      nextHome = teamsById[first.homeTeamId];
      nextAway = teamsById[first.awayTeamId];
      const nextPred = nextHome && nextAway
        ? matchPredictionByPair[`${first.homeTeamId}:${first.awayTeamId}`]
        : undefined;
      nextOdds = nextPred
        ? estimatedMatchOdds(nextPred.team1WinProb, nextPred.drawProb, nextPred.team2WinProb)
        : null;
    }

    // Build pronostics grid data (4 upcoming matches)
    upcomingPronostics = upcoming.slice(0, 4).map((m) => {
      const h = teamsById[m.homeTeamId];
      const a = teamsById[m.awayTeamId];
      const pred = matchPredictionByPair[`${m.homeTeamId}:${m.awayTeamId}`];
      return {
        slug: m.slug,
        date: m.date,
        time: m.time,
        homeName: h?.name ?? "TBD",
        homeFlag: h?.flag ?? "",
        awayName: a?.name ?? "TBD",
        awayFlag: a?.flag ?? "",
        prediction: pred ? {
          team1WinProb: Math.round(pred.team1WinProb * 100),
          drawProb: Math.round(pred.drawProb * 100),
          team2WinProb: Math.round(pred.team2WinProb * 100),
        } : undefined,
      };
    });
  }

  return (
    <>
{/* Breadcrumb */}
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

      {/* Betting Card — overlaps hero for seamless dark-to-dark flow */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 mb-6">
        <div className="max-w-xl mx-auto lg:max-w-2xl">
          {isCompleted && nextMatch && nextHome && nextAway ? (
            <MatchBettingCard
              homeName={nextHome.name}
              homeFlag={nextHome.flag}
              awayName={nextAway.name}
              awayFlag={nextAway.flag}
              homeOdds={nextOdds?.home}
              drawOdds={nextOdds?.draw}
              awayOdds={nextOdds?.away}
              tracking="next-match"
              nextMatchSlug={nextMatch.slug}
            />
          ) : (
            <MatchBettingCard
              homeName={home?.name ?? "Équipe A"}
              homeFlag={home?.flag ?? ""}
              awayName={away?.name ?? "Équipe B"}
              awayFlag={away?.flag ?? ""}
              homeOdds={matchOdds?.home}
              drawOdds={matchOdds?.draw}
              awayOdds={matchOdds?.away}
              tracking="match"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {home && away && <TeamComparison home={home} away={away} />}

            {events.length > 0 && home && away && (
              <MatchEventsTimeline
                events={events}
                homeTeamId={teamApiIds[match.homeTeamId] ?? 0}
                homeName={home.name}
                awayName={away.name}
              />
            )}

            {lineups.length === 2 && home && away && (
              <MatchLineups
                lineups={lineups}
                homeName={home.name}
                homeFlag={home.flag}
                awayName={away.name}
                awayFlag={away.flag}
              />
            )}

            {statistics.length === 2 && home && away && (
              <MatchStatistics
                statistics={statistics}
                homeName={home.name}
                awayName={away.name}
              />
            )}

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

      {/* FAQ Section */}
      {home && away && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FAQSection
            title={`Questions fréquentes — ${home.name} vs ${away.name}`}
            items={buildMatchFAQ(home.name, away.name, dateFormatted, match.time, stadium, stage, prediction, matchOdds, match.slug, match.group)}
          />
        </div>
      )}

      {/* Same-day matches */}
      {sameDayMatches.length > 0 && (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-8">
          <SameDayMatches
            sameDayMatches={sameDayMatches}
            teamsById={teamsById}
            currentDate={match.date}
          />
        </div>
      )}

      {/* Upcoming pronostics grid (completed matches only) */}
      {isCompleted && upcomingPronostics.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <UpcomingPronosticsGrid matches={upcomingPronostics} />
        </div>
      )}

      {/* Contextual internal links */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">À explorer aussi</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home && away && (
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl shrink-0"><Swords className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">Face-à-face {home.name} vs {away.name}</p>
                <p className="text-xs text-gray-500">Historique des confrontations</p>
              </div>
            </Link>
          )}
          {home && (
            <Link
              href={`/pronostic/${home.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl"><Sparkles className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Pronostic {home.name}</p>
                <p className="text-xs text-gray-500">Analyse et prédictions CDM 2026</p>
              </div>
            </Link>
          )}
          {away && (
            <Link
              href={`/pronostic/${away.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl"><Sparkles className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Pronostic {away.name}</p>
                <p className="text-xs text-gray-500">Analyse et prédictions CDM 2026</p>
              </div>
            </Link>
          )}
          {match.group && (
            <Link
              href={`/pronostic-groupe/${match.group.toLowerCase()}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl"><BarChart3 className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Pronostic Groupe {match.group}</p>
                <p className="text-xs text-gray-500">Classement prédit et qualifiés</p>
              </div>
            </Link>
          )}
          <Link
            href="/classement-fifa"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><Trophy className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Classement FIFA</p>
              <p className="text-xs text-gray-500">Ranking mondial des 48 équipes</p>
            </div>
          </Link>
          <Link
            href="/comparateur-cotes"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><TrendingUp className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Comparateur de cotes</p>
              <p className="text-xs text-gray-500">Meilleurs bookmakers pour ce match</p>
            </div>
          </Link>
        </div>
      </section>

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
            startDate: `${match.date}T${match.time || "00:00"}:00+02:00`,
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
              url: `https://www.cdm2026.fr/billets`,
              availability: "https://schema.org/InStock",
              priceCurrency: "USD",
              price: "0",
              validFrom: "2025-01-01",
            },
            sport: "Football",
          }),
        }}
      />

      {/* Contextual navigation */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-6">
        <MatchContextBar matchSlug={match.slug} />
      </div>
      
    </>
  );
}
