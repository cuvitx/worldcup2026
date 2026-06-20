import { AiMatchPreview } from "@repo/ui/ai-match-preview";
import dynamic from "next/dynamic";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { domains, getAlternates } from "@repo/data/route-mapping";
import { getMatchPhase } from "@repo/data/tournament-state";
import { stageLabels, EXTERNAL_URLS } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug, teamsById, stadiumsById, citiesById } from "../../../lib/localized-data";
import { enrichMatchesWithResults, resolveApiFixtureId } from "@repo/api/football/match-results";
import { getFixtureEvents, getLineup, getFixtureStatistics, getFixturePlayers } from "@repo/api/football";
import type { ApiFixtureEvent, ApiLineup, ApiFixtureStatistic, ApiFixturePlayer } from "@repo/api/football";
import { matchPredictionByPair } from "@repo/data/predictions";
import { pmuTrackingUrl, estimatedMatchOdds } from "@repo/data/affiliates";
import { teamApiIds } from "@repo/data/api-football-ids";
import { getEspnTeamName } from "@repo/data/espn-team-names";
import { resolveEspnEventId, getEspnPlayByPlay } from "@repo/api/espn";
import { FAQSection } from "@repo/ui/faq-section";
import { MatchBettingCard } from "../../components/MatchBettingCard";
import {
  MatchHeroAdaptive,
  TeamComparison,
  MatchSidebar,
  SameDayMatches,
  MatchEventsTimeline,
  MatchLineups,
  MatchStatistics,
  MatchPlayerRatings,
  UpcomingPrognosesGrid,
  MatchCommentary,
  MatchVotingWidget,
} from "./_components";
import type { CommentaryPlay } from "./_components";
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

export const revalidate = 300; // 5min — was 30s, caused 60K+ API calls/day
export const dynamicParams = true;

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
  const homeName = home?.name ?? "Noch offen";
  const awayName = away?.name ?? "Noch offen";

  const hasScore = match.homeScore != null && match.awayScore != null;
  const dateStr = new Date(match.date).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });

  const title = hasScore
    ? `${homeName} ${match.homeScore}-${match.awayScore} ${awayName} — Ergebnis ${stage} | WM 2026`
    : `${homeName} vs ${awayName} - ${stage} | WM 2026`;

  const description = hasScore
    ? `${homeName} ${match.homeScore}-${match.awayScore} ${awayName}, Ergebnis ${stage} der WM 2026. Am ${dateStr} im ${stadium?.name ?? "Stadion wird noch bekannt gegeben"}. Ergebnis, Zusammenfassung, Aufstellungen und Statistiken.`
    : `${homeName} vs ${awayName}, ${stage} der WM 2026. Am ${dateStr} im ${stadium?.name ?? "Stadion wird noch bekannt gegeben"}. Prognosen, Quoten und Aufstellung.`;

  const ogTitle = hasScore
    ? `${home?.flag ?? ""} ${homeName} ${match.homeScore}-${match.awayScore} ${awayName} ${away?.flag ?? ""} — WM 2026`
    : `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} — WM 2026`;

  const ogDescription = hasScore
    ? `Ergebnis ${stage} - WM 2026 | ${homeName} ${match.homeScore}-${match.awayScore} ${awayName}`
    : `${stage} - WM 2026 | ${match.date} ${match.time} (Pariser Zeit)`;

  return {
    title,
    description,
    alternates: getAlternates("match", slug, "de"),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      locale: "de_DE",
      siteName: "WM 2026",
      images: [
        {
          url: `${domains.de}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: `${homeName} vs ${awayName} - WM 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
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
  postMatch?: {
    homeScore: number;
    awayScore: number;
    goalEvents: Array<{ minute: string; player: string; team: string; detail: string }>;
    hasLineups: boolean;
  },
): Array<{ question: string; answer: string }> {
  const items: Array<{ question: string; answer: string }> = [];
  const isFinished = postMatch != null;

  if (isFinished) {
    // Post-match FAQ — result-focused for featured snippets
    const { homeScore, awayScore, goalEvents } = postMatch;
    const resultText = homeScore === awayScore
      ? `Unentschieden ${homeScore}-${awayScore}`
      : homeScore > awayScore
        ? `Sieg von ${homeName} ${homeScore}-${awayScore}`
        : `Sieg von ${awayName} ${awayScore}-${homeScore}`;

    items.push({
      question: `Was ist das Ergebnis von ${homeName} vs ${awayName}?`,
      answer: `Das Spiel ${homeName} vs ${awayName} endete ${homeScore}-${awayScore} (${resultText}), am ${dateFormatted}${stadium ? ` im ${stadium.name}` : ""}, im Rahmen der ${stage} der WM 2026.`,
    });

    if (goalEvents.length > 0) {
      const scorersList = goalEvents
        .map((g) => `${g.player} (${g.minute}', ${g.team}${g.detail === "Own Goal" ? ", Eigentor" : g.detail === "Penalty" ? ", Elfm." : ""})`)
        .join(", ");
      items.push({
        question: `Wer hat bei ${homeName} vs ${awayName} getroffen?`,
        answer: `Die Torschutzen in diesem Spiel waren: ${scorersList}.`,
      });
    }

    if (postMatch.hasLineups) {
      items.push({
        question: `Wie war die Aufstellung von ${homeName} und ${awayName}?`,
        answer: `Die offiziellen Aufstellungen von ${homeName} und ${awayName} sind auf dieser Seite verfugbar. Sehen Sie sich den Abschnitt "Aufstellungen" oben an, um die Startelf, Ersatzspieler und Spielerbewertungen zu sehen.`,
      });
    }
  } else {
    // Pre-match FAQ
    items.push({
      question: `Wann findet ${homeName} vs ${awayName} statt?`,
      answer: `Das Spiel ${homeName} vs ${awayName} findet am ${dateFormatted} um ${time} Uhr (Pariser Zeit) statt, im Rahmen der ${stage} der WM 2026${stadium ? ` im ${stadium.name}${stadium.city ? ` (${stadium.city})` : ""}` : ""}.`,
    });

    items.push({
      question: `Wie ist die Aufstellung von ${homeName} fur dieses Spiel?`,
      answer: `Die offiziellen Aufstellungen werden in der Regel etwa 1 Stunde vor Anpfiff bekannt gegeben. Besuchen Sie diese Seite am Spieltag, um die Startaufstellungen von ${homeName} und ${awayName} zu sehen.`,
    });
  }

  // Common questions (pre + post)
  items.push({
    question: `Wo kann man ${homeName} vs ${awayName} live sehen?`,
    answer: `Die Spiele der WM 2026 werden in Deutschland auf ARD, ZDF und MagentaTV ubertragen. Besuchen Sie unsere spezielle Seite, um zu erfahren, welcher Sender ${homeName} vs ${awayName} ubertragt.`,
  });

  if (prediction) {
    const homeWin = Math.round(prediction.team1WinProb * 100);
    const draw = Math.round(prediction.drawProb * 100);
    const awayWin = Math.round(prediction.team2WinProb * 100);
    const favorite = homeWin >= awayWin ? homeName : awayName;
    const favPct = Math.max(homeWin, awayWin);
    items.push({
      question: `Was ist die Prognose fur ${homeName} vs ${awayName}?`,
      answer: `Laut unserem Modell ist ${favorite} mit ${favPct}% Siegchance der Favorit. Ein Unentschieden wird auf ${draw}% geschatzt. Die vollstandige Analyse finden Sie auf unserer Prognoseseite fur dieses Spiel.`,
    });
  }

  if (odds && !isFinished) {
    items.push({
      question: `Wie sind die Quoten fur ${homeName} vs ${awayName}?`,
      answer: `Die geschatzten Quoten fur dieses Spiel sind: Sieg ${homeName} bei ${odds.home}, Unentschieden bei ${odds.draw}, Sieg ${awayName} bei ${odds.away}. Jetzt bei Betano wetten.`,
    });
  }

  if (stadium) {
    items.push({
      question: `In welchem Stadion findet ${homeName} vs ${awayName} statt?`,
      answer: `Das Spiel findet im ${stadium.name} statt${stadium.city ? `, in ${stadium.city}` : ""}${stadium.capacity ? `. Das Stadion fasst ${stadium.capacity.toLocaleString("de-DE")} Zuschauer` : ""}.`,
    });
  }

  if (group) {
    items.push({
      question: `Sind ${homeName} und ${awayName} in derselben Gruppe?`,
      answer: `Ja, ${homeName} und ${awayName} treffen in Gruppe ${group} der WM 2026 aufeinander. Jede Gruppe besteht aus 4 Mannschaften, die beiden Erstplatzierten qualifizieren sich fur das Achtelfinale.`,
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

  // Skip most external API calls during static build to avoid rate limit exhaustion.
  // Exception: completed matches fetch events/lineups/stats at build time so that
  // deploy doesn't wipe ISR-regenerated data (the results are stable & Redis-cached).
  const isBuild = process.env.NEXT_PHASE === "phase-production-build";

  // AI-enriched data: needs Gemini key
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  if (!isBuild && process.env.GEMINI_API_KEY) {
    try {
      enriched = await generateFullMatchPreview(slug, "en", {
        includeExpert: matchPhase === "upcoming",
      });
    } catch {
      // AI generation failed — page renders with static data only
    }
  }

  // Fetch match events, lineups, statistics and player ratings for live/completed matches.
  // Skipped during build — ISR + post-deploy warm-up handles enrichment at runtime.
  let events: ApiFixtureEvent[] = [];
  let lineups: ApiLineup[] = [];
  let statistics: ApiFixtureStatistic[] = [];
  let fixturePlayers: ApiFixturePlayer[] = [];

  if (!isBuild && (matchPhase === "live" || matchPhase === "completed")) {
    const fixtureId = await resolveApiFixtureId(match);
    if (fixtureId) {
      const [ev, lu, st, pl] = await Promise.all([
        getFixtureEvents(fixtureId, isCompleted).catch(() => [] as ApiFixtureEvent[]),
        getLineup(fixtureId, isCompleted).catch(() => [] as ApiLineup[]),
        getFixtureStatistics(fixtureId, isCompleted).catch(() => [] as ApiFixtureStatistic[]),
        getFixturePlayers(fixtureId, isCompleted).catch(() => [] as ApiFixturePlayer[]),
      ]);
      events = ev;

      // Reorder API data so index [0] = our home team, [1] = away team
      const homeApiId = teamApiIds[match.homeTeamId];
      if (homeApiId) {
        const reorder = <T extends { team: { id: number } }>(arr: T[]): T[] => {
          if (arr.length === 2 && arr[0]!.team.id !== homeApiId) {
            return [arr[1]!, arr[0]!];
          }
          return arr;
        };
        lineups = reorder(lu);
        statistics = reorder(st);
        fixturePlayers = reorder(pl);
      } else {
        lineups = lu;
        statistics = st;
        fixturePlayers = pl;
      }
    }
  }

  // Build player ratings map for lineups (playerId -> rating string)
  const playerRatingsMap = new Map<number, string>();
  for (const teamData of fixturePlayers) {
    for (const p of teamData.players) {
      const rating = p.statistics[0]?.games?.rating;
      if (rating) {
        playerRatingsMap.set(p.player.id, rating);
      }
    }
  }

  // Fetch ESPN play-by-play commentary for live AND completed matches
  // ESPN provides real-time commentary during live matches
  let commentaryPlays: CommentaryPlay[] = [];
  if (!isBuild && (matchPhase === "live" || matchPhase === "completed") && home && away) {
    try {
      const espnHomeTeam = getEspnTeamName(match.homeTeamId);
      const espnAwayTeam = getEspnTeamName(match.awayTeamId);
      const espnEventId = await resolveEspnEventId(match.date, espnHomeTeam, espnAwayTeam);
      if (espnEventId) {
        const rawPlays = await getEspnPlayByPlay(espnEventId, matchPhase === "live");
        commentaryPlays = rawPlays.map((p) => {
          let type: CommentaryPlay["type"] = "other";
          if (p.scoringPlay) type = "goal";
          else if (p.redCard) type = "red-card";
          else if (p.yellowCard) type = "yellow-card";
          else if (p.substitution) type = "substitution";
          else if (p.type?.id === "106" || p.type?.text === "Shot On Target") type = "shot";
          else if (p.type?.id === "80") type = "kickoff";
          else if (p.type?.id === "83") type = "fulltime";

          return {
            id: p.id,
            minute: p.clock?.displayValue ?? "",
            text: p.text || p.shortText || "",
            type,
            homeScore: p.homeScore ?? 0,
            awayScore: p.awayScore ?? 0,
            period: p.period?.number ?? 1,
          };
        }).filter((p) => p.text.length > 0);
      }
    } catch {
      // ESPN API unavailable — commentary section simply won't render
    }
  }

  const sameDayMatches = matches.filter(
    (m) => m.date === match.date && m.slug !== match.slug
  );

  const dateFormatted = new Date(match.date).toLocaleDateString("de-DE", {
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


  // Upcoming Prognoses for the grid (completed match pages)
  let upcomingPrognoses: Array<{
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

    // Build Prognoses grid data (4 upcoming matches)
    upcomingPrognoses = upcoming.slice(0, 4).map((m) => {
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
              homeName={home?.name ?? "Mannschaft A"}
              homeFlag={home?.flag ?? ""}
              awayName={away?.name ?? "Mannschaft B"}
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8 min-w-0">
            {home && away && <TeamComparison home={home} away={away} />}

            {home && away && (
              <MatchVotingWidget
                slug={match.slug}
                homeName={home.name}
                homeFlag={home.flag}
                awayName={away.name}
                awayFlag={away.flag}
                isFinished={isCompleted}
                odds={matchOdds}
                predictedScore={prediction?.predictedScore}
                pmuUrl={pmuTrackingUrl(`match-${match.slug}`)}
              />
            )}

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
                playerRatings={playerRatingsMap.size > 0 ? playerRatingsMap : undefined}
              />
            )}

            {fixturePlayers.length >= 2 && home && away && (
              <MatchPlayerRatings
                players={fixturePlayers}
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

            {commentaryPlays.length > 0 && home && away && (
              <MatchCommentary
                plays={commentaryPlays}
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
                locale="de"
              />
            )}

            {enriched?.expert && (
              <AiExpertInsight
                valueBets={enriched.expert.valueBets}
                matchAnalysis={enriched.expert.matchAnalysis}
                scorePrediction={enriched.expert.scorePrediction}
                keyInsight={enriched.expert.keyInsight}
                locale="de"
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
            title={`Haufig gestellte Fragen — ${home.name} vs ${away.name}`}
            items={buildMatchFAQ(home.name, away.name, dateFormatted, match.time, stadium, stage, prediction, matchOdds, match.slug, match.group,
              isCompleted && match.homeScore != null && match.awayScore != null ? {
                homeScore: match.homeScore,
                awayScore: match.awayScore,
                goalEvents: events
                  .filter((e) => e.type === "Goal")
                  .map((e) => ({
                    minute: `${e.time.elapsed}${e.time.extra ? `+${e.time.extra}` : ""}`,
                    player: e.player.name,
                    team: e.team.name,
                    detail: e.detail,
                  })),
                hasLineups: lineups.length === 2,
              } : undefined,
            )}
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

      {/* Upcoming Prognoses grid (completed matches only) */}
      {isCompleted && upcomingPrognoses.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <UpcomingPrognosesGrid matches={upcomingPrognoses} />
        </div>
      )}

      {/* Contextual internal links */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Entdecken Sie auch</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {home && away && (
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl shrink-0"><Swords className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">Direktvergleich {home.name} vs {away.name}</p>
                <p className="text-xs text-gray-500">Bisherige Begegnungen</p>
              </div>
            </Link>
          )}
          {home && (
            <Link
              href={`/prognose/${home.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl"><Sparkles className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Prognose {home.name}</p>
                <p className="text-xs text-gray-500">Analyse und Vorhersagen WM 2026</p>
              </div>
            </Link>
          )}
          {away && (
            <Link
              href={`/prognose/${away.slug}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl"><Sparkles className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Prognose {away.name}</p>
                <p className="text-xs text-gray-500">Analyse und Vorhersagen WM 2026</p>
              </div>
            </Link>
          )}
          {match.group && (
            <Link
              href={`/prognose-gruppe/${match.group.toLowerCase()}`}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <span className="text-2xl"><BarChart3 className="h-5 w-5 inline-block" /></span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900">Prognose Gruppe {match.group}</p>
                <p className="text-xs text-gray-500">Vorhergesagte Tabelle und Qualifizierte</p>
              </div>
            </Link>
          )}
          <Link
            href="/fifa-ranking"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><Trophy className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">FIFA-Rangliste</p>
              <p className="text-xs text-gray-500">Weltrangliste der 48 Mannschaften</p>
            </div>
          </Link>
          <Link
            href="/quotenvergleich"
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <span className="text-2xl"><TrendingUp className="h-5 w-5 inline-block" /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Quotenvergleich</p>
              <p className="text-xs text-gray-500">Beste Wettanbieter fur dieses Spiel</p>
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
            name: `${home?.name ?? "TBD"} vs ${away?.name ?? "TBD"} - WM 2026`,
            description: `${home?.name ?? "TBD"} gegen ${away?.name ?? "TBD"}, ${stage} der FIFA WM 2026.`,
            eventStatus: isCompleted
              ? "https://schema.org/EventCompleted"
              : "https://schema.org/EventScheduled",
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
              url: `https://www.wm2026guide.de/Tickets`,
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
