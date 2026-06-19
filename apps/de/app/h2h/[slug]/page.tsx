import React from "react";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "../../../lib/localized-data";
import { h2hByPair } from "@repo/data/h2h";
import { predictionsByTeamId, matchPredictionByPair } from "@repo/data/predictions";
import { matches } from "@repo/data/matches";
import { getMatchPhase } from "@repo/data/tournament-state";
import { PmuCTA } from "../../components/PmuCTA";

export const revalidate = 300;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate all possible team vs team combinations
export async function generateStaticParams() {
  const realTeams = teams.filter((t) => !t.slug.startsWith("barrage-") && !t.slug.startsWith("intercontinental-"));
  const params: { slug: string }[] = [];
  for (let i = 0; i < realTeams.length; i++) {
    for (let j = i + 1; j < realTeams.length; j++) {
      const t1 = realTeams[i];
      const t2 = realTeams[j];
      if (t1 && t2) {
        params.push({ slug: `${t1.slug}-vs-${t2.slug}` });
      }
    }
  }
  return params;
}

function parseSlug(slug: string) {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  const slug1 = parts[0] as string;
  const slug2 = parts[1] as string;
  const team1 = teamsBySlug[slug1];
  const team2 = teamsBySlug[slug2];
  if (!team1 || !team2) return null;
  return { team1, team2 };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  const { team1, team2 } = parsed;
  return {
    title: `${team1.name} vs ${team2.name} - Historie, Statistiken & Prognose WM 2026`,
    description: `${team1.name} gegen ${team2.name}: Konfrontationshistorie, vergleichende Statistiken, Prognose und Quoten für die WM 2026.`,
    alternates: getAlternates("h2h", slug, "de"),
    openGraph: {
      title: `${team1.flag} ${team1.name} vs ${team2.name} ${team2.flag}`,
      description: `Vollständige Analyse ${team1.name} - ${team2.name}. Historie, Statistiken und Prognose WM 2026.`,
    },
  };
}

export default async function H2HPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { team1, team2 } = parsed;
  const sameGroup = team1.group === team2.group;
  const h2h = h2hByPair[`${team1.id}:${team2.id}`];
  const pred1 = predictionsByTeamId[team1.id];
  const pred2 = predictionsByTeamId[team2.id];
  const matchPred = matchPredictionByPair[`${team1.id}:${team2.id}`];

  return (
    <>
{/* Breadcrumbs */}
{/* Header */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-6xl" role="img" aria-label={`Flagge von ${team1.name}`}>{team1.flag}</span>
              <Link href={`/mannschaft/${team1.slug}`} className="mt-2 text-2xl font-extrabold text-white hover:text-accent">
                {team1.name}
              </Link>
              <p className="text-sm text-gray-300">#{team1.fifaRanking} FIFA</p>
            </div>
            <span className="text-3xl font-bold text-white">VS</span>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-6xl" role="img" aria-label={`Flagge von ${team2.name}`}>{team2.flag}</span>
              <Link href={`/mannschaft/${team2.slug}`} className="mt-2 text-2xl font-extrabold text-white hover:text-accent">
                {team2.name}
              </Link>
              <p className="text-sm text-gray-300">#{team2.fifaRanking} FIFA</p>
            </div>
          </div>
          {sameGroup && (
            <p className="mt-4 text-center text-gray-300">
              Diese beiden Mannschaften sind in der{" "}
              <Link href={`/gruppe/${team1.group.toLowerCase()}`} className="underline">
                Gruppe {team1.group}
              </Link>
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Comparison — visual face-to-face */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Vergleich</h2>
              <div className="space-y-4">
                {[
                  { label: "Rangliste FIFA", v1: `#${team1.fifaRanking}`, v2: `#${team2.fifaRanking}`, n1: team1.fifaRanking, n2: team2.fifaRanking, invert: true },
                  { label: "WM-Teilnahmen", v1: String(team1.wcAppearances), v2: String(team2.wcAppearances), n1: team1.wcAppearances, n2: team2.wcAppearances, invert: false },
                ].map((row) => {
                  const max = Math.max(row.n1, row.n2) || 1;
                  const pct1 = row.invert ? ((max - row.n1 + 1) / (max + 1)) * 100 : (row.n1 / max) * 100;
                  const pct2 = row.invert ? ((max - row.n2 + 1) / (max + 1)) * 100 : (row.n2 / max) * 100;
                  return (
                    <div key={row.label}>
                      <p className="text-xs font-semibold text-gray-500 text-center mb-2">{row.label}</p>
                      <div className="flex items-center gap-3">
                        <span className="w-16 text-right text-sm font-bold text-primary">{row.v1}</span>
                        <div className="flex-1 flex gap-1">
                          <div className="flex-1 h-5 rounded-l-full bg-gray-100 overflow-hidden flex justify-end">
                            <div className="h-full rounded-l-full bg-primary transition-all duration-700" style={{ width: `${pct1}%` }} />
                          </div>
                          <div className="flex-1 h-5 rounded-r-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-r-full bg-primary transition-all duration-700" style={{ width: `${pct2}%` }} />
                          </div>
                        </div>
                        <span className="w-16 text-left text-sm font-bold text-primary">{row.v2}</span>
                      </div>
                    </div>
                  );
                })}
                {/* Text rows */}
                <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
                  {[
                    { label: "Konföderation", v1: team1.confederation, v2: team2.confederation },
                    { label: "WM-Gruppe 2026", v1: team1.group, v2: team2.group },
                    { label: "Bestes Ergebnis", v1: team1.bestResult, v2: team2.bestResult },
                  ].map((row) => (
                    <React.Fragment key={row.label}>
                      <div className="text-right font-medium">{row.v1}</div>
                      <div className="text-center text-gray-500 text-xs leading-5">{row.label}</div>
                      <div className="text-left font-medium">{row.v2}</div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </section>

            {/* Historical H2H */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Konfrontationshistorie</h2>
              {h2h && h2h.totalMatches > 0 ? (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-6 sm:gap-4">
                    <div className="rounded-lg bg-primary/5 p-2 text-center sm:p-4">
                      <p className="text-xl font-bold text-primary sm:text-3xl">{h2h.team1Wins}</p>
                      <p className="text-xs text-gray-500">Siege {team1.name}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2 text-center sm:p-4">
                      <p className="text-xl font-bold text-gray-600 sm:text-3xl">{h2h.draws}</p>
                      <p className="text-xs text-gray-500">Unentschieden</p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-2 text-center sm:p-4">
                      <p className="text-xl font-bold text-primary sm:text-3xl">{h2h.team2Wins}</p>
                      <p className="text-xs text-gray-500">Siege {team2.name}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="text-xl font-bold text-primary">{h2h.totalMatches}</p>
                      <p className="text-xs text-gray-500">Gespielte Spiele</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="text-xl font-bold text-primary">{h2h.team1Goals} - {h2h.team2Goals}</p>
                      <p className="text-xs text-gray-500">Erzielte Tore</p>
                    </div>
                  </div>
                  {h2h.lastMatch && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Letztes Spiel :</span> {h2h.lastMatch}
                      {h2h.lastMatchDate && ` (${new Date(h2h.lastMatchDate).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })})`}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-gray-600">
                  {team1.name} und {team2.name} sind sich noch nie begegnet. Die WM 2026 könnte ihre erste historische Konfrontation werden.
                </p>
              )}
            </section>

            {/* Prediction */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prognose</h2>
              {matchPred ? (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-6 sm:gap-4">
                    <div className="rounded-lg bg-field/10 p-2 text-center sm:p-4">
                      <p className="text-lg font-bold text-field sm:text-2xl">{Math.round(matchPred.team1WinProb * 100)}%</p>
                      <p className="text-xs text-gray-500 truncate">{team1.name}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-2 text-center sm:p-4">
                      <p className="text-lg font-bold text-gray-600 sm:text-2xl">{Math.round(matchPred.drawProb * 100)}%</p>
                      <p className="text-xs text-gray-500">Unentschieden</p>
                    </div>
                    <div className="rounded-lg bg-field/10 p-2 text-center sm:p-4">
                      <p className="text-lg font-bold text-field sm:text-2xl">{Math.round(matchPred.team2WinProb * 100)}%</p>
                      <p className="text-xs text-gray-500 truncate">{team2.name}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary/5 p-4 text-center mb-4">
                    <p className="text-sm text-gray-500">Vorhergesagtes Ergebnis</p>
                    <p className="text-3xl font-extrabold text-primary">{matchPred.predictedScore}</p>
                  </div>
                </>
              ) : pred1 && pred2 ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Laut unserem ELO-Modell ist {pred1.eloRating > pred2.eloRating ? team1.name : team2.name} der Favorit
                    mit einer Wertung von {Math.max(pred1.eloRating, pred2.eloRating)} gegenüber {Math.min(pred1.eloRating, pred2.eloRating)}.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="text-lg font-bold text-primary">{pred1.eloRating}</p>
                      <p className="text-xs text-gray-500">ELO {team1.name}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="text-lg font-bold text-primary">{pred2.eloRating}</p>
                      <p className="text-xs text-gray-500">ELO {team2.name}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Die Prognosen werden in Kürze verfügbar sein.
                </p>
              )}
            </section>

            {/* PMU CTA */}
            <PmuCTA tracking="h2h" heading="Auf dieses Duell bei Betano wetten" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Team Links */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Mannschaftsprofile</h3>
              <div className="space-y-3">
                <Link
                  href={`/mannschaft/${team1.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
                >
                  <span className="text-xl" role="img" aria-label={`Flagge von ${team1.name}`}>{team1.flag}</span>
                  <span className="font-medium">{team1.name}</span>
                </Link>
                <Link
                  href={`/mannschaft/${team2.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
                >
                  <span className="text-xl" role="img" aria-label={`Flagge von ${team2.name}`}>{team2.flag}</span>
                  <span className="font-medium">{team2.name}</span>
                </Link>
              </div>
            </div>

            {/* Betting CTA */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quoten {team1.name} vs {team2.name}
              </h3>
              <p className="text-sm text-gray-600">
                Vergleichen Sie die Quoten der Buchmacher für dieses Spiel.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify((() => {
            const h2hMatch = matches.find(
              (m) =>
                (m.homeTeamId === team1.id && m.awayTeamId === team2.id) ||
                (m.homeTeamId === team2.id && m.awayTeamId === team1.id),
            );
            const isMatchCompleted = h2hMatch
              ? h2hMatch.status === "finished" || getMatchPhase(h2hMatch.date, h2hMatch.time) === "completed"
              : false;
            return {
              "@context": "https://schema.org",
              "@type": "SportsEvent",
              name: `${team1.name} vs ${team2.name} - WM 2026`,
              eventStatus: isMatchCompleted
                ? "https://schema.org/EventCompleted"
                : "https://schema.org/EventScheduled",
              sport: "Football",
              homeTeam: { "@type": "SportsTeam", name: team1.name },
              awayTeam: { "@type": "SportsTeam", name: team2.name },
            };
          })()),
        }}
      />
</>
  );
}
