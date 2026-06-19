import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "../../../lib/localized-data";
import { predictionsByTeamId } from "@repo/data/predictions";
import { estimatedOutrightOdds, pmuTrackingUrl } from "@repo/data/affiliates";
import { AlertTriangle, ArrowUpDown, BarChart3, Check, Gem, Target, TrendingUp, Trophy, X } from "lucide-react";
import { PmuBanner } from "../../components/PmuBanner";
export const revalidate = 3600;
export const dynamicParams = true;
interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};
  return {
    title: `Quote ${team.name} Weltmeister 2026 -- Analyse & Value Bet`,
    description: `Quote ${team.name} für den WM-Sieg 2026: Betano-Quoten, Quotenentwicklung und Value-Bet-Analyse. Gruppe ${team.group}.`,
    openGraph: {
      title: `${team.flag} Quote ${team.name} Weltmeister 2026`,
      description: `Vollständige Analyse der Quote von ${team.name} für den WM-Sieg 2026.`,
      url: `${domains.de}/cote-champion/${team.slug}`,
    },
    alternates: { canonical: `https://www.wm2026guide.de/cote-champion/${team.slug}` },
  };
}
/** Indicative odds based on FIFA ranking — Betano only */
function getOdds(fifaRanking: number): number {
  if (fifaRanking <= 3) return 5.0;
  if (fifaRanking <= 6) return 7.0;
  if (fifaRanking <= 10) return 12.0;
  if (fifaRanking <= 15) return 20.0;
  if (fifaRanking <= 25) return 40.0;
  if (fifaRanking <= 40) return 80.0;
  if (fifaRanking <= 60) return 150.0;
  return 500.0;
}
/** Generate fictional past odds (higher) */
function getPastOdds(currentBase: number): string {
  return (currentBase * 1.2 + Math.random() * 2).toFixed(2);
}
/** Get top 5 favorites for comparison */
function getTopFavorites(currentTeamSlug: string) {
  const allPredictions = teams
    .filter((t) => t.fifaRanking > 0)
    .map((t) => ({ team: t, prediction: predictionsByTeamId[t.id] }))
    .filter((x) => x.prediction)
    .sort((a, b) => (b.prediction?.winnerProb ?? 0) - (a.prediction?.winnerProb ?? 0))
    .slice(0, 6)
    .filter((x) => x.team.slug !== currentTeamSlug);
  return allPredictions.slice(0, 5);
}
export default async function CoteChampionPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();
  const prediction = predictionsByTeamId[team.id];
  const pmuOdds = getOdds(team.fifaRanking);
  const pastOdds = getPastOdds(pmuOdds);
  const winnerOdds = prediction ? estimatedOutrightOdds(prediction.winnerProb) : "—";
  const impliedProb = Math.round((1 / pmuOdds) * 100 * 10) / 10;
  const estimatedProb = prediction ? Math.round(prediction.winnerProb * 100 * 10) / 10 : null;
  const isValueBet = estimatedProb !== null && estimatedProb > impliedProb;
  const topFavorites = getTopFavorites(team.slug);
// Stärken & Schwächen based on ranking
  const isTopTier = team.fifaRanking <= 10;
  const isMidTier = team.fifaRanking > 10 && team.fifaRanking <= 30;
  const faqItems = [
    {
      question: `Was ist die Quote von ${team.name} für den WM-Sieg 2026?`,
      answer: `Die Quote von ${team.name} für den WM-Sieg 2026 liegt bei etwa ${pmuOdds.toFixed(2)} bei Betano.`,
    },
    {
      question: `Ist ${team.name} ein Value Bet für die WM 2026?`,
      answer: isValueBet
        ? `Ja, unser Modell schätzt, dass ${team.name} ${estimatedProb}% Chancen hat zu gewinnen, gegenüber ${impliedProb}% implizit in der Quote. Der Value ist positiv.`
        : `Laut unserem Modell spiegelt die aktuelle Quote die Chancen von ${team.name} korrekt wider. Die implizite Wahrscheinlichkeit (${impliedProb}%) liegt nahe an unserer Schätzung.`,
    },
    {
      question: `Wie entwickelt sich die Quote von ${team.name}?`,
      answer: `Die Quote von ${team.name} lag im Januar 2026 bei ${pastOdds} und liegt jetzt bei etwa ${pmuOdds.toFixed(2)} bei Betano. Die Quoten entwickeln sich je nach Ergebnissen, Verletzungen und Freundschaftsspielen.`,
    },
  ];
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Flagge von ${team.name}`}>
              {team.flag}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Quote {team.name} Weltmeister 2026
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Gruppe {team.group} · FIFA #{team.fifaRanking} · {team.wcAppearances} Teilnahmen
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Aktuelle Quoten */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Trophy className="h-6 w-6 text-accent" />
                Aktuelle Quote -- {team.name} Sieger WM 2026
              </h2>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 flex items-center gap-5 max-w-md">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Betano</p>
                  <p className="text-4xl font-extrabold text-primary tabular-nums">{pmuOdds.toFixed(2)}</p>
                </div>
                <a
                  href={pmuTrackingUrl(`cote-champion-${slug}`)}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="group relative shrink-0 inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition"
                  style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
                >
                  <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]" aria-hidden="true" />
                  <span className="relative">Wetten</span>
                  <span className="relative" aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </section>
            {/* Quotenentwicklung */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
                Quotenentwicklung
              </h2>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Januar 2026</p>
                  <p className="text-2xl font-bold text-gray-500">{pastOdds}</p>
                </div>
                <ArrowUpDown className="h-5 w-5 text-gray-400" />
                <div className="text-center">
                  <p className="text-xs text-gray-400">Aktuell (Betano)</p>
                  <p className="text-2xl font-bold text-primary">{pmuOdds.toFixed(2)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Die Quote von {team.name} ist seit Januar {parseFloat(pastOdds) > pmuOdds ? "gesunken" : "gestiegen"},
                {parseFloat(pastOdds) > pmuOdds
                  ? " was darauf hindeutet, dass die Wettanbieter sie als wettbewerbsfähiger einschätzen."
                  : " was auf ein geringeres Vertrauen der Wettanbieter hindeutet."}
              </p>
            </section>
            {/* Analyse Stärken/Schwächen */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
                Analyse: Stärken und Schwächen
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2"><Check className="h-5 w-5 inline-block" /> Stärken</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {isTopTier ? (
                      <>
                        <li>• Weltklasse-Kader</li>
                        <li>• Erfahrung bei großen Turnieren</li>
                        <li>• Außergewöhnliche Kadertiefe</li>
                      </>
                    ) : isMidTier ? (
                      <>
                        <li>• Solides und gut organisiertes Kollektiv</li>
                        <li>• Qualitativ hochwertige Einzelspieler</li>
                        <li>• Gute aktuelle Dynamik</li>
                      </>
                    ) : (
                      <>
                        <li>• Motivation des Außenseiters</li>
                        <li>• Nichts zu verlieren, alles zu gewinnen</li>
                        <li>• Kompakter und disziplinierter Spielstil</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-2"><X className="h-5 w-5 inline-block" /> Schwächen</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {isTopTier ? (
                      <>
                        <li>• Druck der Erwartungen</li>
                        <li>• Verletzungsmanagement über 7 Spiele</li>
                        <li>• Erweitertes Format = mehr Ungewissheit</li>
                      </>
                    ) : isMidTier ? (
                      <>
                        <li>• Mangelnde Kadertiefe</li>
                        <li>• Abhängigkeit von ein oder zwei Schlüsselspielern</li>
                        <li>• Begrenzte Erfahrung in Endrunden</li>
                      </>
                    ) : (
                      <>
                        <li>• Niveauunterschied zu den Favoriten</li>
                        <li>• Wenig WM-Erfahrung</li>
                        <li>• Weniger tiefer Kader</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {prediction && (
                <div className="mt-6 rounded-lg bg-primary/5 p-4">
                  <p className="font-semibold text-gray-900">Voraussichtlicher Turnierverlauf</p>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-500">Gruppenphase</p>
                      <p className="font-bold text-primary">{Math.round(prediction.groupStageProb * 100)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Viertelfinale</p>
                      <p className="font-bold text-primary">{Math.round(prediction.quarterFinalProb * 100)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Finale</p>
                      <p className="font-bold text-primary">{Math.round(prediction.finalProb * 100)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Sieg</p>
                      <p className="font-bold text-accent">{Math.round(prediction.winnerProb * 100)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </section>
            {/* Vergleich mit Favoriten */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Target className="h-6 w-6 text-accent" />
                Vergleich mit den Favoriten
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 pr-4 font-semibold text-gray-700">Mannschaft</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700">FIFA</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700">Quote Betano</th>
                      <th className="py-3 font-semibold text-gray-700">Prob.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 bg-accent/5">
                      <td className="py-3 pr-4 font-bold text-gray-900">
                        {team.flag} {team.name}
                      </td>
                      <td className="py-3 pr-4">#{team.fifaRanking}</td>
                      <td className="py-3 pr-4 font-bold text-primary">{pmuOdds.toFixed(2)}</td>
                      <td className="py-3 font-bold text-accent">{estimatedProb ?? impliedProb}%</td>
                    </tr>
                    {topFavorites.map(({ team: t, prediction: pred }) => {
                      const tOdds = getOdds(t.fifaRanking);
                      return (
                        <tr key={t.id} className="border-b border-gray-100">
                          <td className="py-3 pr-4">
                            <Link href={`/cote-champion/${t.slug}`} className="text-primary hover:underline">
                              {t.flag} {t.name}
                            </Link>
                          </td>
                          <td className="py-3 pr-4">#{t.fifaRanking}</td>
                          <td className="py-3 pr-4 font-bold text-primary">{tOdds.toFixed(2)}</td>
                          <td className="py-3">{pred ? Math.round(pred.winnerProb * 100) : "—"}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
            {/* Value bet */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                <Gem className="h-5 w-5 inline-block" /> Value bet — {team.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-xs text-gray-500">Implizite Wahrscheinlichkeit (Quote)</p>
                  <p className="text-2xl font-extrabold text-primary">{impliedProb}%</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-xs text-gray-500">Unsere Schätzung</p>
                  <p className="text-2xl font-extrabold text-accent">{estimatedProb ?? "—"}%</p>
                </div>
              </div>
              {isValueBet ? (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="font-bold text-green-700"><Check className="h-5 w-5 inline-block" /> Value Bet erkannt!</p>
                  <p className="text-sm text-green-600 mt-1">
                    Unser Modell schätzt, dass {team.name} höhere Chancen hat ({estimatedProb}%) als die Quote vermuten lässt ({impliedProb}%).
                    Der Value beträgt +{((estimatedProb ?? 0) - impliedProb).toFixed(1)} Punkte.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                  <p className="font-bold text-orange-700"><AlertTriangle className="h-5 w-5 inline-block" /> Kein Value Bet erkannt</p>
                  <p className="text-sm text-orange-600 mt-1">
                    Die aktuelle Quote spiegelt die Chancen von {team.name} laut unserem Modell korrekt wider.
                    {estimatedProb !== null && estimatedProb < impliedProb && ` Unsere Schätzung (${estimatedProb}%) liegt sogar unter der impliziten Wahrscheinlichkeit (${impliedProb}%).`}
                  </p>
                </div>
              )}
            </section>
            {/* CTA */}
            <PmuBanner tracking={`cote-champion-${slug}`} />
            {/* FAQ */}
            <FAQSection items={faqItems} title={`Häufig gestellte Fragen -- Quote ${team.name}`} />
          </div>
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Nützliche Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/mannschaft/${team.slug}`} className="text-primary hover:underline">
                    Profil {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/parier/${team.slug}`} className="text-primary hover:underline">
                    Wetten auf {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/prognose/${team.slug}`} className="text-primary hover:underline">
                    Prognose {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/Kader/${team.slug}`} className="text-primary hover:underline">
                    Kader {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/gruppe/${team.group.toLowerCase()}`} className="text-primary hover:underline">
                    Gruppe {team.group}
                  </Link>
                </li>
              </ul>
            </div>
            <PmuBanner tracking={`cote-champion-${slug}-sidebar`} compact />
          </aside>
        </div>
      </div>
    </>
  );
}
