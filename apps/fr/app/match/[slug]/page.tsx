import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { LiveMatchWidget } from "@repo/ui/live-match-widget";
import { AiMatchPreview } from "@repo/ui/ai-match-preview";
import { AiExpertInsight } from "@repo/ui/ai-expert-insight";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import { getMatchPhase } from "@repo/data/tournament-state";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchPredictionByPair } from "@repo/data/predictions";
import { estimatedMatchOdds, featuredBookmaker } from "@repo/data/affiliates";

export const revalidate = 300;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

const stageLabels: Record<string, string> = {
  group: "Phase de groupes",
  "round-of-32": "32e de finale",
  "round-of-16": "Huitième de finale",
  "quarter-final": "Quart de finale",
  "semi-final": "Demi-finale",
  "third-place": "Match pour la 3e place",
  final: "Finale",
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

  const homeName = home?.name ?? "A determiner";
  const awayName = away?.name ?? "A determiner";

  return {
    title: `${homeName} vs ${awayName} - ${stage} | CDM 2026`,
    description: `${homeName} contre ${awayName}, ${stage} de la Coupe du Monde 2026. Le ${new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} au ${stadium?.name ?? "stade a confirmer"}.`,
    alternates: getAlternates("match", slug, "fr"),
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} — CDM 2026`,
      description: `${stage} - CDM 2026 | ${match.date} ${match.time} UTC`,
      images: [{ url: `${domains.fr}/images/og-default.png`, width: 1200, height: 630, alt: `${homeName} vs ${awayName} - CDM 2026` }],
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
    enriched = await generateFullMatchPreview(slug, "fr", {
      includeExpert: matchPhase === "upcoming",
    });
  } catch {
    // AI generation failed — page renders with static data only
  }

  // Same-day matches for internal linking
  const sameDayMatches = matches.filter(
    (m) => m.date === match.date && m.slug !== match.slug
  );

  const dateFormatted = new Date(match.date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Calendrier",url:"/match/calendrier"},{name:(home?.name ?? "TBD")+" vs "+(away?.name ?? "TBD"),url:"/match/"+match.slug}]} baseUrl={domains.fr} />
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600 flex-wrap min-w-0">
            <li>
              <Link href="/" className="text-primary dark:text-secondary hover:underline py-2 inline-block">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendrier" className="text-primary dark:text-secondary hover:underline py-2 inline-block">
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

      {/* Adaptive Hero: LiveMatchWidget for live/recent matches, static for upcoming */}
      {isLive || isCompleted ? (
        <section className="bg-primary py-12 sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="mb-4 text-center text-sm text-secondary font-medium uppercase tracking-wide">
              {stage}
              {match.group ? ` - Groupe ${match.group}` : ""}
            </p>
            <LiveMatchWidget
              matchDate={match.date}
              matchTime={match.time}
              homeTeam={home?.name ?? "A determiner"}
              awayTeam={away?.name ?? "A determiner"}
              stadium={stadium?.name ?? "Stade a confirmer"}
              locale="fr"
            />
            <div className="mt-4 flex justify-center gap-8 text-white">
              {home && (
                <Link href={`/equipe/${home.slug}`} className="text-sm hover:text-secondary transition-colors">
                  <span role="img" aria-label={`Drapeau de ${home.name}`}>{home.flag}</span> {home.name}
                </Link>
              )}
              {away && (
                <Link href={`/equipe/${away.slug}`} className="text-sm hover:text-secondary transition-colors">
                  <span role="img" aria-label={`Drapeau de ${away.name}`}>{away.flag}</span> {away.name}
                </Link>
              )}
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-5 sm:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-center text-xs text-secondary font-medium uppercase tracking-wide">
              {stage}
              {match.group ? ` - Groupe ${match.group}` : ""}
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-2xl sm:text-4xl shrink-0" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? "🏳️"}</span>
                <div className="min-w-0">
                  {home ? (
                    <Link href={`/equipe/${home.slug}`} className="text-sm sm:text-2xl font-extrabold hover:text-secondary break-words block">
                      {home.name}
                    </Link>
                  ) : (
                    <p className="text-sm sm:text-2xl font-extrabold">TBD</p>
                  )}
                  {home && <p className="text-xs text-gray-200">#{home.fifaRanking} FIFA</p>}
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-secondary shrink-0">VS</span>
              <div className="flex items-center gap-2 min-w-0">
                <div className="min-w-0 text-right">
                  {away ? (
                    <Link href={`/equipe/${away.slug}`} className="text-sm sm:text-2xl font-extrabold hover:text-secondary break-words block">
                      {away.name}
                    </Link>
                  ) : (
                    <p className="text-sm sm:text-2xl font-extrabold">TBD</p>
                  )}
                  {away && <p className="text-xs text-gray-200">#{away.fifaRanking} FIFA</p>}
                </div>
                <span className="text-2xl sm:text-4xl shrink-0" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? "🏳️"}</span>
              </div>
            </div>
            <p className="mt-2 text-center text-sm text-gray-200">
              {match.time} UTC · {dateFormatted}
              {stadium ? ` · ${stadium.name}` : ""}
              {city ? `, ${city.name}` : ""}
            </p>
          </div>
        </section>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {home && away && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Comparaison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500">
                        <th className="py-3 px-3 text-left text-xs font-medium text-primary uppercase break-words">
                          {home.name}
                        </th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-600">
                          Critère
                        </th>
                        <th className="py-3 px-3 text-right text-xs font-medium text-primary uppercase break-words">
                          {away.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          label: "Classement FIFA",
                          v1: `#${home.fifaRanking}`,
                          v2: `#${away.fifaRanking}`,
                        },
                        {
                          label: "Confederation",
                          v1: home.confederation,
                          v2: away.confederation,
                        },
                        {
                          label: "Participations CDM",
                          v1: String(home.wcAppearances),
                          v2: String(away.wcAppearances),
                        },
                        {
                          label: "Meilleur résultat",
                          v1: home.bestResult,
                          v2: away.bestResult,
                        },
                      ].map((row) => (
                        <tr key={row.label}>
                          <td className="py-3 px-3 text-left text-sm font-medium text-gray-900 dark:text-white">
                            {row.v1}
                          </td>
                          <td className="py-3 px-3 text-center text-sm text-gray-600 dark:text-gray-300 break-words">
                            {row.label}
                          </td>
                          <td className="py-3 px-3 text-right text-sm font-medium text-gray-900 dark:text-white">
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
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Voir l&apos;historique complet des confrontations &rarr;
                  </Link>
                </div>
              </section>
            )}

            {enriched?.preview && (
              <AiMatchPreview preview={enriched.preview.preview} keyFactors={enriched.preview.keyFactors} prediction={enriched.preview.prediction} bettingAngle={enriched.preview.bettingAngle} grounded={enriched.preview.grounded} locale="fr" />
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

            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {isCompleted ? "Resultat & Analyse" : "Pronostic"}
              </h2>
              {home && away && (() => {
                const pred = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];
                if (!pred) return (
                  <p className="text-gray-600">
                    Les pronostics détaillés seront disponibles prochainement.
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
                      <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 text-center">
                        <p className="text-xl font-bold text-gray-600">{Math.round(pred.drawProb * 100)}%</p>
                        <p className="text-xs text-gray-500">Nul</p>
                        <p className="text-sm font-medium text-primary mt-1">{odds.draw}</p>
                      </div>
                      <div className="rounded-lg bg-field/10 p-3 text-center">
                        <p className="text-xl font-bold text-field">{Math.round(pred.team2WinProb * 100)}%</p>
                        <p className="text-xs text-gray-500">{away.name}</p>
                        <p className="text-sm font-medium text-primary mt-1">{odds.away}</p>
                      </div>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-3 text-center mb-4">
                      <p className="text-sm text-gray-500">Score predit</p>
                      <p className="text-2xl font-extrabold text-primary">{pred.predictedScore}</p>
                    </div>
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-primary text-sm">{featuredBookmaker.name}</p>
                          <p className="text-xs text-gray-600 truncate">{featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}</p>
                        </div>
                        <Link
                          href={`/pronostic-match/${match.slug}`}
                          className="shrink-0 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white hover:bg-accent/90 transition-colors"
                        >
                          Pronostic →
                        </Link>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">Cotes estimees, susceptibles d&apos;evoluer. 18+</p>
                  </>
                );
              })()}
            </section>
          </div>

          <div className="space-y-6">
            {stadium && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Lieu du match</h3>
                <Link
                  href={`/stade/${stadium.slug}`}
                  className="block rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {stadium.capacity.toLocaleString("fr-FR")} places &middot;{" "}
                    {stadium.city}
                  </p>
                </Link>
                {city && (
                  <Link
                    href={`/ville/${city.slug}`}
                    className="mt-2 block text-sm text-primary hover:underline"
                  >
                    Guide de {city.name} &rarr;
                  </Link>
                )}
              </div>
            )}

            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Infos match</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Phase</dt>
                  <dd className="font-medium">{stage}</dd>
                </div>
                {match.group && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Groupe</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/groupe/${match.group.toLowerCase()}`}
                        className="text-primary hover:underline"
                      >
                        Groupe {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.matchday && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Journee</dt>
                    <dd className="font-medium">J{match.matchday}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Date</dt>
                  <dd className="font-medium">{match.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Heure (UTC)</dt>
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
                locale="fr"
              />
            )}

            {enriched?.sources.hasInjuries && home && away && (
              <InjuriesWidget
                homeTeam={home.name}
                awayTeam={away.name}
                homeInjuries={enriched.injuries.home}
                awayInjuries={enriched.injuries.away}
                locale="fr"
              />
            )}

            {/* Same-day matches in sidebar */}
            {sameDayMatches.length > 0 && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Autres matchs du {match.date.slice(5)}</h3>
                <div className="space-y-2">
                  {sameDayMatches.slice(0, 5).map((m) => {
                    const mHome = teamsById[m.homeTeamId];
                    const mAway = teamsById[m.awayTeamId];
                    return (
                      <Link
                        key={m.slug}
                        href={`/match/${m.slug}`}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 text-sm"
                      >
                        <span role="img" aria-label={mHome?.name ?? ""}>{mHome?.flag ?? "🏳️"}</span>
                        <span className="flex-1 text-sm font-medium break-words">{mHome?.name ?? "TBD"} vs {mAway?.name ?? "TBD"}</span>
                        <span role="img" aria-label={mAway?.name ?? ""}>{mAway?.flag ?? "🏳️"}</span>
                        <span className="text-xs text-gray-500">{m.time}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {enriched?.sources.hasLiveOdds && home && away ? (
              <OddsCompare
                odds={enriched.odds}
                homeTeam={home.name}
                awayTeam={away.name}
                locale="fr"
              />
            ) : (
              <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Cotes du match
                </h3>
                <p className="text-sm text-gray-600">
                  Les cotes des bookmakers pour ce match seront disponibles
                  prochainement.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Same-day matches */}
      {sameDayMatches.length > 0 && (
        <section className="border-t border-gray-200 dark:border-slate-700 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Matchs de la même journée</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sameDayMatches.map((m) => {
                const mHome = teamsById[m.homeTeamId];
                const mAway = teamsById[m.awayTeamId];
                return (
                  <Link
                    key={m.slug}
                    href={`/match/${m.slug}`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <span className="text-xl" role="img" aria-label={`Drapeau de ${mHome?.name ?? "Inconnu"}`}>{mHome?.flag ?? "🏳️"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm break-words">
                        {mHome?.name ?? "TBD"} vs {mAway?.name ?? "TBD"}
                      </p>
                      <p className="text-xs text-gray-500">{m.time} UTC</p>
                    </div>
                    <span className="text-xl" role="img" aria-label={`Drapeau de ${mAway?.name ?? "Inconnu"}`}>{mAway?.flag ?? "🏳️"}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
            homeTeam: home
              ? { "@type": "SportsTeam", name: home.name }
              : undefined,
            awayTeam: away
              ? { "@type": "SportsTeam", name: away.name }
              : undefined,
            organizer: {
              "@type": "Organization",
              name: "FIFA",
              url: "https://www.fifa.com",
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
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
</>
  );
}
