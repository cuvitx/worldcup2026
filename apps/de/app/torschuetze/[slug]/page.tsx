import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "../../../lib/localized-data";
import { teamsById } from "../../../lib/localized-data";
import { scorerOddsById, topScorerRanking } from "@repo/data/scorers";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { predictionsByTeamId } from "@repo/data/predictions";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return players
    .filter((p) => p.position === "FW" || p.position === "MF")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  const team = teamsById[player.teamId];

  return {
    title: `Quote Torschütze ${player.name} WM 2026 | Statistiken, Tore & Prognose`,
    description: `Quote Torschütze ${player.name} (${team?.name}) für die WM 2026. ${player.goals} Tore in ${player.caps} Länderspielen, Quoten Anytime Scorer und Goldener Schuh.`,
    alternates: getAlternates("scorer", slug, "de"),
    openGraph: {
      title: `${team?.flag ?? ""} Quote Torschütze ${player.name} - WM 2026`,
      description: `Statistiken und Quoten Torschütze von ${player.name} für die WM 2026.`,
    },
  };
}

export default async function TorschützePage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player || (player.position !== "FW" && player.position !== "MF")) notFound();

  const team = teamsById[player.teamId];
  const scorer = scorerOddsById[player.id];
  const teamPred = team ? predictionsByTeamId[team.id] : undefined;
  const teammates = (team ? playersByTeamId[team.id] ?? [] : [])
    .filter((p) => p.id !== player.id && (p.position === "FW" || p.position === "MF"));

  const positionLabel = player.position === "FW" ? "Stürmer" : "Mittelfeldspieler";
  const goalsPerCap = player.caps > 0 ? (player.goals / player.caps).toFixed(3) : "0";

  // Find rank in top scorer ranking
  const topRank = topScorerRanking.findIndex((s) => s.playerId === player.id);

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl" role="img" aria-label={`Flagge von ${team?.name ?? "Unbekannt"}`}>{team?.flag ?? "\u26bd"}</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Quote Torschütze {player.name}
              </h1>
              <p className="mt-2 text-xl text-gray-300">
                {positionLabel} &middot; {player.club}
                {player.clubUpdatedAt && (
                  <span className="ml-2 text-sm text-gray-500">(Verein Stand {player.clubUpdatedAt})</span>
                )}
              </p>
              <p className="mt-1 text-gray-500">
                {team?.name} &middot; {player.caps} Länderspiele &middot; {player.goals} Tore
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scoring Stats */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Torstatistiken</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.goals}</p>
                  <p className="text-xs text-gray-500 mt-1">Tore in Länderspielen</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.caps}</p>
                  <p className="text-xs text-gray-500 mt-1">Länderspiele</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{goalsPerCap}</p>
                  <p className="text-xs text-gray-500 mt-1">Tore/Spiel</p>
                </div>
                <div className="rounded-lg bg-accent/10 p-4 text-center">
                  <p className="text-3xl font-extrabold text-accent">{scorer?.expectedGoals ?? "—"}</p>
                  <p className="text-xs text-gray-500 mt-1">Erwartete Tore WM</p>
                </div>
              </div>
              {scorer && (
                <p className="mt-4 text-sm text-gray-600">
                  Mit einem Verhältnis von {goalsPerCap} Toren pro Spiel in Länderspielen und einer Mannschaft, die voraussichtlich
                  mehrere Runden spielen wird, hat {player.name} eine Erwartung von <strong>{scorer.expectedGoals} Toren</strong> bei
                  der WM 2026 laut unserem Poisson-Modell.
                </p>
              )}
              {player.lastUpdated && (
                <p className="mt-2 text-xs text-gray-500">Statistiken Stand {player.lastUpdated}</p>
              )}
            </section>

            {/* Odds Table */}
            {scorer && (
              <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Torschützen-Quoten - {player.name}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="pb-3 font-medium text-gray-500">Markt</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Wahrscheinlichkeit</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Geschätzte Quote</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50 text-xs uppercase text-gray-500">
                        <td className="py-3 font-medium">Torschütze jederzeit (1+ Tor)</td>
                        <td className="py-3 text-right">{(scorer.anytimeScorerProb * 100).toFixed(1)}%</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over05GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-xs uppercase text-gray-500">
                        <td className="py-3 font-medium">2+ Tore im Turnier</td>
                        <td className="py-3 text-right">—</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over15GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-xs uppercase text-gray-500">
                        <td className="py-3 font-medium">3+ Tore im Turnier</td>
                        <td className="py-3 text-right">—</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over25GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 text-xs uppercase text-gray-500 bg-accent/5">
                        <td className="py-3 font-bold">Torschützenkönig WM 2026</td>
                        <td className="py-3 text-right">{(scorer.topScorerProb * 100).toFixed(2)}%</td>
                        <td className="py-3 text-right font-extrabold text-accent">{scorer.topScorerOdds}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Die Quoten werden durch unser statistisches Modell (Poisson-Verteilung + ELO-Rating) mit
                  einer Wettanbieter-Marge von ca. 8% geschätzt. Sie sind indikativ.
                </p>
              </section>
            )}

            {/* Analysis Text */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyse: {player.name} Torschütze WM 2026</h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
                <p>
                  {player.name} ({player.age} Jahre) spielt als {positionLabel} bei {player.club} und
                  hat {player.goals} Tore in {player.caps} Länderspielen für {team?.name ?? "seine Nationalmannschaft"} erzielt.
                </p>
                {team && teamPred && (
                  <p>
                    {team.name} steht auf Platz #{team.fifaRanking} der FIFA-Rangliste und hat{" "}
                    {(teamPred.winnerProb * 100).toFixed(1)}% Chancen, das Turnier laut unserem ELO-Modell zu gewinnen.
                    Je weiter die Mannschaft im Wettbewerb kommt, desto mehr Spiele hat {player.name}, um Tore zu erzielen.
                  </p>
                )}
                {scorer && scorer.expectedGoals >= 2 && (
                  <p>
                    Mit <strong>{scorer.expectedGoals} erwarteten Toren</strong> gehört {player.name} zu den gefährlichsten Torschützen
                    des Turniers. Die Anytime-Torschütze-Quote von {scorer.anytimeScorerOdds} spiegelt eine hohe Wahrscheinlichkeit wider,
                    mindestens ein Tor während der WM zu erzielen.
                  </p>
                )}
                {scorer && scorer.expectedGoals < 2 && scorer.expectedGoals >= 0.5 && (
                  <p>
                    Mit {scorer.expectedGoals} erwarteten Toren hat {player.name} das Profil eines gelegentlichen Torschützen
                    während des Turniers. Die Quote von {scorer.anytimeScorerOdds} kann einen Wert darstellen, wenn der Spieler zum
                    Zeitpunkt des Turniers in guter Form ist.
                  </p>
                )}
                <p>
                  Um auf {player.name} als Torschütze zu wetten, vergleichen Sie die Quoten bei den verschiedenen lizenzierten
                  Wettanbietern. Die tatsächlichen Quoten können im Vergleich zu unseren Schätzungen einen Wert bieten.
                </p>
              </div>
            </section>

            {/* Teammates */}
            {teammates.length > 0 && (
              <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Weitere Torschützen von {team?.name}</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {teammates.map((tm) => {
                    const tmScorer = scorerOddsById[tm.id];
                    return (
                      <Link
                        key={tm.id}
                        href={`/torschuetze/${tm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                      >
                        <div>
                          <p className="font-semibold">{tm.name}</p>
                          <p className="text-xs text-gray-500">{tm.position === "FW" ? "Stürmer" : "Mittelfeldspieler"} &middot; {tm.club}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{tmScorer?.expectedGoals ?? "—"} erw. Tore</p>
                          <p className="text-xs text-gray-500">Quote {tmScorer?.anytimeScorerOdds ?? "—"}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Affiliate CTA */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Wetten auf {player.name} Torschütze
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Vergleichen Sie die besten Sportwetten-Anbieter, um auf {player.name} als Torschütze bei der WM 2026 zu wetten.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-accent bg-accent/5" : "border-gray-200 bg-white"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-accentaccent px-3 py-0.5 text-xs font-bold text-black">
                          Empfohlen
                        </span>
                      )}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-bold">{bk.name}</p>
                        <p className="text-sm text-gray-500">{"★".repeat(bk.rating)}{"☆".repeat(5 - bk.rating)}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-extrabold text-field">{bk.bonus}</p>
                        <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href={bk.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured ? "bg-accent hover:bg-accent/80" : "bg-primary hover:bg-primary/90"
                          }`}
                        >
                          Wetten
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Torschützen-Profil</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Position</dt>
                  <dd className="font-medium">{positionLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Club</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Alter</dt>
                  <dd className="font-medium">{player.age} Jahre</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Länderspiele</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tore</dt>
                  <dd className="font-bold text-primary">{player.goals}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tore/Spiel-Verhältnis</dt>
                  <dd className="font-bold text-primary">{goalsPerCap}</dd>
                </div>
                {scorer && (
                  <>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <dt className="text-gray-500">Erw. Tore WM</dt>
                      <dd className="font-bold text-accent">{scorer.expectedGoals}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Quote Torschütze</dt>
                      <dd className="font-bold text-field">{scorer.anytimeScorerOdds}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Quote Torschützenkönig</dt>
                      <dd className="font-bold text-accent">{scorer.topScorerOdds}</dd>
                    </div>
                  </>
                )}
                {topRank >= 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Rangliste Torschütze</dt>
                    <dd className="font-bold text-accent">#{topRank + 1}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 space-y-2">
                <Link
                  href={`/spieler/${player.slug}`}
                  className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Vollständiges Spielerprofil &rarr;
                </Link>
                {team && (
                  <Link
                    href={`/mannschaft/${team.slug}`}
                    className="block w-full text-center rounded-lg border border-primary py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    <span role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span> Profil {team.name} &rarr;
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Wetten auf {player.name}
              </h3>
              {scorer && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quote Torschütze</span>
                    <span className="font-bold text-field">{scorer.anytimeScorerOdds}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Erwartete Tore</span>
                    <span className="font-bold text-accent">{scorer.expectedGoals}</span>
                  </div>
                </div>
              )}
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center rounded-xl bg-accent py-3.5 text-sm font-bold text-white hover:bg-accent/80 transition-colors"
              >
                {featuredBookmaker.bonus} bei {featuredBookmaker.name}
              </a>
              <p className="mt-2 text-xs text-gray-500 text-center">
                {featuredBookmaker.bonusDetail}
              </p>
            </div>

            {/* Guide link */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wett-Ratgeber Torschützen</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/ratgeber/torschuetzen-wetten" className="text-primary hover:underline">
                    So wetten Sie auf die Torschützen der WM 2026 &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/ratgeber/sportwetten-guide" className="text-primary hover:underline">
                    Vollständiger Ratgeber zum Wetten auf die WM &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: player.name,
            jobTitle: "Football Player",
            memberOf: {
              "@type": "SportsTeam",
              name: team?.name ?? "",
            },
            description: `Quote Torschütze ${player.name} für die WM 2026. ${player.goals} Tore in ${player.caps} Länderspielen.`,
            url: `https://www.wm2026guide.de/torschuetze/${player.slug}`,
          }),
        }}
      />
    </>
  );
}
