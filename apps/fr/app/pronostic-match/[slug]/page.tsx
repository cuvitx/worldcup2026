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
import { stageLabels } from "@repo/data/constants";
import { ShareButtons } from "@repo/ui/share-buttons";
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
  MatchTabsClient,
} from "./components";
import { RelatedContent, type RelatedItem } from "../../components/RelatedContent";

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

  const prediction =
    home && away ? matchPredictionByPair[`${home.id}:${away.id}`] : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;

  const odds = prediction
    ? estimatedMatchOdds(
        prediction.team1WinProb,
        prediction.drawProb,
        prediction.team2WinProb
      )
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

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
          <ol className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li>
              <Link href="/match/calendrier" className="hover:text-primary transition-colors">
                Calendrier
              </Link>
            </li>
            <li className="text-gray-300 dark:text-gray-600">/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium truncate">
              {homeName} vs {awayName}
            </li>
          </ol>
        </div>
      </nav>

      {/* Match Hero — Cinematic */}
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

      {/* Share buttons */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
          <ShareButtons
            url={`https://www.cdm2026.fr/pronostic-match/${match.slug}`}
            text={`Mon pronostic pour ${homeName} vs ${awayName} : ${prediction && prediction.team1WinProb > prediction.team2WinProb ? homeName : awayName} gagne ! 🏆 #CDM2026 #WorldCup2026`}
            label="Partager ce pronostic"
          />
        </div>
      </div>

      {/* Tabs — sticky below header */}
      <MatchTabsClient>
        {/* Tab 0: Pronostic */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {prediction && (
                <PredictionOutcomes
                  outcomes={outcomes}
                  maxProb={maxProb}
                  homeName={homeName}
                  awayName={awayName}
                />
              )}
              {prediction && (
                <PredictedScore
                  prediction={prediction}
                  home={home}
                  away={away}
                  homeName={homeName}
                  awayName={awayName}
                />
              )}
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
              {enriched?.expert && (
                <AiExpertInsight
                  valueBets={enriched.expert.valueBets}
                  matchAnalysis={enriched.expert.matchAnalysis}
                  scorePrediction={enriched.expert.scorePrediction}
                  keyInsight={enriched.expert.keyInsight}
                  locale="fr"
                />
              )}
            </div>
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

        {/* Tab 1: Cotes */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {odds && (
                <OddsTable
                  odds={odds}
                  homeName={homeName}
                  awayName={awayName}
                  bookmakers={bookmakers}
                />
              )}
              <BettingCta
                featuredBookmaker={featuredBookmaker}
                bookmakers={bookmakers}
                matchLabel={home && away ? `${home.name} vs ${away.name}` : undefined}
              />
            </div>
            <div className="space-y-4">
              {/* Compact vote */}
              <CommunityVote
                slug={match.slug}
                homeName={homeName}
                awayName={awayName}
                homeRanking={home?.fifaRanking ?? 50}
                awayRanking={away?.fifaRanking ?? 50}
              />
            </div>
          </div>
        </div>

        {/* Tab 2: Stats */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* ELO + proba stats */}
            {predHome && predAway ? (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="section-header mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-base">
                    Statistiques comparées
                  </h2>
                </div>
                <div className="space-y-4">
                  <StatDuelRow
                    label="ELO Rating"
                    home={predHome.eloRating}
                    away={predAway.eloRating}
                    homeName={homeName}
                    awayName={awayName}
                  />
                  <StatDuelRow
                    label="Finale (%)"
                    home={Math.round(predHome.finalProb * 100)}
                    away={Math.round(predAway.finalProb * 100)}
                    homeName={homeName}
                    awayName={awayName}
                    suffix="%"
                  />
                  <StatDuelRow
                    label="Champion (%)"
                    home={Math.round(predHome.winnerProb * 100)}
                    away={Math.round(predAway.winnerProb * 100)}
                    homeName={homeName}
                    awayName={awayName}
                    suffix="%"
                  />
                  <StatDuelRow
                    label="FIFA Ranking"
                    home={home?.fifaRanking ?? 50}
                    away={away?.fifaRanking ?? 50}
                    homeName={homeName}
                    awayName={awayName}
                    invertBetter
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
                Statistiques non disponibles pour ce match.
              </div>
            )}

            {/* Win probability radar-style */}
            {prediction && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <div className="section-header mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-base">
                    Probabilités de victoire
                  </h2>
                </div>
                <div className="flex items-center justify-around mb-6">
                  <div className="text-center">
                    <span className="text-3xl">{home?.flag ?? "🏳️"}</span>
                    <p className="text-sm font-bold mt-1">{homeName}</p>
                    <p className="text-2xl font-extrabold text-primary mt-1">
                      {Math.round(prediction.team1WinProb * 100)}%
                    </p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-xs text-gray-500 font-medium">Nul</p>
                    <p className="text-xl font-bold text-gray-600 dark:text-gray-300 mt-1">
                      {Math.round(prediction.drawProb * 100)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <span className="text-3xl">{away?.flag ?? "🏳️"}</span>
                    <p className="text-sm font-bold mt-1">{awayName}</p>
                    <p className="text-2xl font-extrabold text-secondary mt-1">
                      {Math.round(prediction.team2WinProb * 100)}%
                    </p>
                  </div>
                </div>
                {/* Visual stacked bar */}
                <div className="w-full h-4 rounded-full flex overflow-hidden gap-0.5 shadow-inner bg-gray-100 dark:bg-gray-700">
                  <div
                    className="h-full bg-primary rounded-l-full transition-all duration-700"
                    style={{ width: `${Math.round(prediction.team1WinProb * 100)}%` }}
                    title={`${homeName}: ${Math.round(prediction.team1WinProb * 100)}%`}
                  />
                  <div
                    className="h-full bg-gray-400 dark:bg-gray-500 transition-all duration-700"
                    style={{ width: `${Math.round(prediction.drawProb * 100)}%` }}
                    title={`Nul: ${Math.round(prediction.drawProb * 100)}%`}
                  />
                  <div
                    className="h-full bg-secondary rounded-r-full transition-all duration-700"
                    style={{ width: `${Math.round(prediction.team2WinProb * 100)}%` }}
                    title={`${awayName}: ${Math.round(prediction.team2WinProb * 100)}%`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>{homeName}</span>
                  <span>Nul</span>
                  <span>{awayName}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab 3: H2H */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {home && away ? (
            <H2HSection
              home={home}
              away={away}
              h2h={h2h}
              homeName={homeName}
              awayName={awayName}
            />
          ) : (
            <div className="text-center py-12 text-gray-500">
              Historique non disponible pour ce match.
            </div>
          )}
        </div>

        {/* Tab 4: Infos */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <MatchInfo
              match={match}
              stadium={stadium}
              city={city}
              stage={stage}
              dateFormatted={dateFormatted}
            />
            <CommunityVote
              slug={match.slug}
              homeName={homeName}
              awayName={awayName}
              homeRanking={home?.fifaRanking ?? 50}
              awayRanking={away?.fifaRanking ?? 50}
            />
          </div>
        </div>
      </MatchTabsClient>

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
            homeTeam: home ? { "@type": "SportsTeam", name: home.name } : undefined,
            awayTeam: away ? { "@type": "SportsTeam", name: away.name } : undefined,
            sport: "Football",
            description: `Pronostic et cotes pour ${homeName} vs ${awayName}, ${stage} de la Coupe du Monde 2026.`,
          }),
        }}
      />

      {/* Related content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <RelatedContent
          items={[
            ...(home ? [{
              href: `/equipe/${home.slug}`,
              emoji: home.flag,
              title: home.name,
              description: `Fiche équipe · FIFA #${home.fifaRanking}`,
            }] : []),
            ...(away ? [{
              href: `/equipe/${away.slug}`,
              emoji: away.flag,
              title: away.name,
              description: `Fiche équipe · FIFA #${away.fifaRanking}`,
            }] : []),
            ...matches
              .filter((m) => m.slug !== slug && m.date === match.date)
              .slice(0, 2)
              .map((m): RelatedItem => {
                const mHome = teamsById[m.homeTeamId];
                const mAway = teamsById[m.awayTeamId];
                return {
                  href: `/pronostic-match/${m.slug}`,
                  emoji: '⚽',
                  title: `${mHome?.name ?? 'TBD'} - ${mAway?.name ?? 'TBD'}`,
                  description: `Même jour · ${stageLabels[m.stage] ?? m.stage}`,
                };
              }),
          ]}
        />
      </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
</>
  );
}

// Inline stat duel row component (simple, no external file needed)
function StatDuelRow({
  label,
  home,
  away,
  homeName,
  awayName,
  suffix = "",
  invertBetter = false,
}: {
  label: string;
  home: number;
  away: number;
  homeName: string;
  awayName: string;
  suffix?: string;
  invertBetter?: boolean;
}) {
  const total = home + away || 1;
  const homePct = Math.round((home / total) * 100);
  const awayPct = 100 - homePct;

  const homeIsBetter = invertBetter ? home < away : home > away;
  const awayIsBetter = invertBetter ? away < home : away > home;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-sm font-bold ${homeIsBetter ? "text-primary" : "text-gray-700 dark:text-gray-300"}`}
        >
          {home}{suffix}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-300 font-medium">{label}</span>
        <span
          className={`text-sm font-bold ${awayIsBetter ? "text-secondary" : "text-gray-700 dark:text-gray-300"}`}
        >
          {away}{suffix}
        </span>
      </div>
      <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5">
        <div
          className={`h-full rounded-l-full transition-all duration-700 ${homeIsBetter ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"}`}
          style={{ width: `${homePct}%` }}
        />
        <div
          className={`h-full rounded-r-full transition-all duration-700 ${awayIsBetter ? "bg-secondary" : "bg-gray-200 dark:bg-gray-700"}`}
          style={{ width: `${awayPct}%` }}
        />
      </div>
    </div>
  );
}
