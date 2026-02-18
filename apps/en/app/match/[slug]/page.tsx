import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchPredictionByPair } from "@repo/data/predictions";
import { estimatedMatchOdds, featuredBookmaker } from "@repo/data/affiliates";
import { getAlternates, domains } from "@repo/data/route-mapping";
import { getMatchPhase } from "@repo/data/tournament-state";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { LiveMatchWidget } from "@repo/ui/live-match-widget";
import { AiMatchPreview } from "@repo/ui/ai-match-preview";
import { AiExpertInsight } from "@repo/ui/ai-expert-insight";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import { generateFullMatchPreview } from "@repo/ai/generators";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const stage = stageLabels[match.stage] ?? match.stage;

  const homeName = home?.name ?? "TBD";
  const awayName = away?.name ?? "TBD";

  return {
    alternates: getAlternates("match", slug, "en"),
    title: `${homeName} vs ${awayName} - ${stage} | WC 2026`,
    description: `${homeName} vs ${awayName}, ${stage} of the 2026 World Cup. On ${new Date(match.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })} at ${stadium?.name ?? "stadium TBC"}.`,
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""}`,
      description: `${stage} - WC 2026 | ${match.date} ${match.time} UTC`,
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
  const city = stadium ? citiesById[stadium.cityId] : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  const matchPhase = getMatchPhase(match.date, match.time);
  const isLive = matchPhase === "live";
  const isCompleted = matchPhase === "completed";

  // Fetch AI-enriched data (gracefully falls back to null if APIs unavailable)
  let enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "en", {
      includeExpert: matchPhase === "upcoming",
    });
  } catch {
    // AI generation failed — page renders with static data only
  }

  const dateFormatted = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbSchema items={[{name:"Home",url:"/"},{name:"Schedule",url:"/match/schedule"},{name:`${home?.name ?? "TBD"} vs ${away?.name ?? "TBD"}`,url:`/match/${match.slug}`}]} baseUrl={domains.en} />
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
              {home?.name ?? "TBD"} vs {away?.name ?? "TBD"}
            </li>
          </ol>
        </div>
      </nav>

      {/* Adaptive Hero: LiveMatchWidget for live/recent matches, static for upcoming */}
      {isLive || isCompleted ? (
        <section className="bg-primary py-8">
          <div className="mx-auto max-w-2xl px-4">
            <p className="mb-4 text-center text-sm text-gold font-medium uppercase tracking-wide">
              {stage}
              {match.group ? ` - Group ${match.group}` : ""}
            </p>
            <LiveMatchWidget
              matchDate={match.date}
              matchTime={match.time}
              homeTeam={home?.name ?? "TBD"}
              awayTeam={away?.name ?? "TBD"}
              stadium={stadium?.name ?? "Stadium TBC"}
              locale="en"
            />
            <div className="mt-4 flex justify-center gap-8 text-white">
              {home && (
                <Link href={`/team/${home.slug}`} className="text-sm hover:text-gold transition-colors">
                  {home.flag} {home.name}
                </Link>
              )}
              {away && (
                <Link href={`/team/${away.slug}`} className="text-sm hover:text-gold transition-colors">
                  {away.flag} {away.name}
                </Link>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-primary text-white py-12">
          <div className="mx-auto max-w-7xl px-4">
            <p className="mb-2 text-sm text-gold font-medium uppercase tracking-wide">
              {stage}
              {match.group ? ` - Group ${match.group}` : ""}
            </p>
            <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
              <div className="flex flex-col items-center">
                <span className="text-6xl">{home?.flag ?? "🏳️"}</span>
                {home ? (
                  <Link
                    href={`/team/${home.slug}`}
                    className="mt-2 text-2xl font-extrabold hover:text-gold"
                  >
                    {home.name}
                  </Link>
                ) : (
                  <p className="mt-2 text-2xl font-extrabold">TBD</p>
                )}
                {home && (
                  <p className="text-sm text-gray-400">#{home.fifaRanking} FIFA</p>
                )}
              </div>
              <div className="text-center">
                <span className="text-3xl font-bold text-gold">VS</span>
                <p className="mt-1 text-sm text-gray-400">{match.time} UTC</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-6xl">{away?.flag ?? "🏳️"}</span>
                {away ? (
                  <Link
                    href={`/team/${away.slug}`}
                    className="mt-2 text-2xl font-extrabold hover:text-gold"
                  >
                    {away.name}
                  </Link>
                ) : (
                  <p className="mt-2 text-2xl font-extrabold">TBD</p>
                )}
                {away && (
                  <p className="text-sm text-gray-400">#{away.fifaRanking} FIFA</p>
                )}
              </div>
            </div>
            <p className="mt-6 text-center text-gray-300">
              {dateFormatted}
              {stadium ? ` | ${stadium.name}` : ""}
              {city ? `, ${city.name}` : ""}
            </p>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {home && away && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left font-medium text-accent">
                          {home.name}
                        </th>
                        <th className="pb-3 text-center font-medium text-gray-500">
                          Criteria
                        </th>
                        <th className="pb-3 text-right font-medium text-accent">
                          {away.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        {
                          label: "FIFA Ranking",
                          v1: `#${home.fifaRanking}`,
                          v2: `#${away.fifaRanking}`,
                        },
                        {
                          label: "Confederation",
                          v1: home.confederation,
                          v2: away.confederation,
                        },
                        {
                          label: "WC Appearances",
                          v1: String(home.wcAppearances),
                          v2: String(away.wcAppearances),
                        },
                        {
                          label: "Best Result",
                          v1: home.bestResult,
                          v2: away.bestResult,
                        },
                      ].map((row) => (
                        <tr key={row.label}>
                          <td className="py-3 text-left font-medium">
                            {row.v1}
                          </td>
                          <td className="py-3 text-center text-gray-500">
                            {row.label}
                          </td>
                          <td className="py-3 text-right font-medium">
                            {row.v2}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-center">
                  <Link
                    href={`/h2h/${home.slug}-vs-${away.slug}`}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    View full head-to-head history &rarr;
                  </Link>
                </div>
              </section>
            )}

            {enriched?.preview && (
              <AiMatchPreview preview={enriched.preview.preview} keyFactors={enriched.preview.keyFactors} prediction={enriched.preview.prediction} bettingAngle={enriched.preview.bettingAngle} grounded={enriched.preview.grounded} locale="en" />
            )}

            {enriched?.expert && (
              <AiExpertInsight
                valueBets={enriched.expert.valueBets}
                matchAnalysis={enriched.expert.matchAnalysis}
                scorePrediction={enriched.expert.scorePrediction}
                keyInsight={enriched.expert.keyInsight}
                locale="en"
              />
            )}

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {isCompleted ? "Result & Analysis" : "Prediction"}
              </h2>
              {home && away && (() => {
                const pred = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];
                if (!pred) return (
                  <p className="text-gray-600">
                    Detailed predictions will be available soon.
                  </p>
                );
                const odds = estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb);
                return (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="rounded-lg bg-field/10 p-3 text-center">
                        <p className="text-xl font-bold text-field">{Math.round(pred.team1WinProb * 100)}%</p>
                        <p className="text-xs text-gray-500">{home.name}</p>
                        <p className="text-sm font-medium text-primary mt-1">{odds.home}</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-gray-600">{Math.round(pred.drawProb * 100)}%</p>
                        <p className="text-xs text-gray-500">Draw</p>
                        <p className="text-sm font-medium text-primary mt-1">{odds.draw}</p>
                      </div>
                      <div className="rounded-lg bg-field/10 p-3 text-center">
                        <p className="text-xl font-bold text-field">{Math.round(pred.team2WinProb * 100)}%</p>
                        <p className="text-xs text-gray-500">{away.name}</p>
                        <p className="text-sm font-medium text-primary mt-1">{odds.away}</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3 text-center mb-4">
                      <p className="text-sm text-gray-500">Predicted score</p>
                      <p className="text-2xl font-extrabold text-primary">{pred.predictedScore}</p>
                    </div>
                    <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-accent">{featuredBookmaker.name}</p>
                          <p className="text-sm text-gray-600">{featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}</p>
                        </div>
                        <Link
                          href={`/prediction-match/${match.slug}`}
                          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90"
                        >
                          View prediction &rarr;
                        </Link>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">Estimated odds, subject to change. 18+</p>
                  </>
                );
              })()}
            </section>
          </div>

          <div className="space-y-6">
            {stadium && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Match Venue</h3>
                <Link
                  href={`/stadium/${stadium.slug}`}
                  className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {stadium.capacity.toLocaleString("en-US")} seats &middot;{" "}
                    {stadium.city}
                  </p>
                </Link>
                {city && (
                  <Link
                    href={`/city/${city.slug}`}
                    className="mt-2 block text-sm text-accent hover:underline"
                  >
                    {city.name} city guide &rarr;
                  </Link>
                )}
              </div>
            )}

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Match Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Stage</dt>
                  <dd className="font-medium">{stage}</dd>
                </div>
                {match.group && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Group</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/group/${match.group.toLowerCase()}`}
                        className="text-accent hover:underline"
                      >
                        Group {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.matchday && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Matchday</dt>
                    <dd className="font-medium">MD{match.matchday}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Date</dt>
                  <dd className="font-medium">{match.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Time (UTC)</dt>
                  <dd className="font-medium">{match.time}</dd>
                </div>
              </dl>
            </div>

            {enriched?.weather && (
              <WeatherWidget
                temperature={enriched.weather.temperature}
                condition={enriched.weather.condition}
                humidity={enriched.weather.humidity}
                windSpeed={enriched.weather.windSpeed}
                locale="en"
              />
            )}

            {enriched?.sources.hasInjuries && home && away && (
              <InjuriesWidget
                homeTeam={home.name}
                awayTeam={away.name}
                homeInjuries={enriched.injuries.home}
                awayInjuries={enriched.injuries.away}
                locale="en"
              />
            )}

            {enriched?.sources.hasLiveOdds && home && away ? (
              <OddsCompare
                odds={enriched.odds}
                homeTeam={home.name}
                awayTeam={away.name}
                locale="en"
              />
            ) : (
              <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
                <h3 className="mb-2 text-lg font-bold text-accent">
                  Match Odds
                </h3>
                <p className="text-sm text-gray-600">
                  Bookmaker odds for this match will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${home?.name ?? "TBD"} vs ${away?.name ?? "TBD"} - World Cup 2026`,
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
          }),
        }}
      />
    </>
  );
}
