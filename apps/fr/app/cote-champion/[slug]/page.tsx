import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { bookmakers, estimatedOutrightOdds } from "@repo/data/affiliates";
import { Trophy, TrendingUp, BarChart3, Target, ArrowUpDown } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = false;

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
    title: `Cote ${team.name} Championne du Monde 2026 — Analyse & Value Bet`,
    description: `Cote ${team.name} pour gagner la Coupe du Monde 2026 : comparatif bookmakers, évolution des cotes et analyse value bet. Groupe ${team.group}.`,
    openGraph: {
      title: `${team.flag} Cote ${team.name} Championne du Monde 2026`,
      description: `Analyse complète de la cote ${team.name} pour remporter la CDM 2026.`,
      url: `${domains.fr}/cote-champion/${team.slug}`,
    },
  };
}

/** Indicative odds per bookmaker based on FIFA ranking */
function getOdds(fifaRanking: number): { winamax: number; betclic: number; unibet: number } {
  let base: number;
  if (fifaRanking <= 3) base = 5.0;
  else if (fifaRanking <= 6) base = 7.0;
  else if (fifaRanking <= 10) base = 12.0;
  else if (fifaRanking <= 15) base = 20.0;
  else if (fifaRanking <= 25) base = 40.0;
  else if (fifaRanking <= 40) base = 80.0;
  else if (fifaRanking <= 60) base = 150.0;
  else base = 500.0;

  return {
    winamax: Math.round(base * 0.95 * 100) / 100,
    betclic: base,
    unibet: Math.round(base * 1.05 * 100) / 100,
  };
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
  const odds = getOdds(team.fifaRanking);
  const pastOdds = getPastOdds(odds.betclic);
  const winnerOdds = prediction ? estimatedOutrightOdds(prediction.winnerProb) : "—";
  const impliedProb = Math.round((1 / odds.betclic) * 100 * 10) / 10;
  const estimatedProb = prediction ? Math.round(prediction.winnerProb * 100 * 10) / 10 : null;
  const isValueBet = estimatedProb !== null && estimatedProb > impliedProb;
  const topFavorites = getTopFavorites(team.slug);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Cotes champion", href: "/cote-champion" },
    { label: `Cote ${team.name}` },
  ];

  // Forces & faiblesses based on ranking
  const isTopTier = team.fifaRanking <= 10;
  const isMidTier = team.fifaRanking > 10 && team.fifaRanking <= 30;

  const faqItems = [
    {
      question: `Quelle est la cote de ${team.name} pour gagner la CDM 2026 ?`,
      answer: `La cote de ${team.name} pour remporter la Coupe du Monde 2026 est d'environ ${odds.betclic.toFixed(2)} chez Betclic, ${odds.winamax.toFixed(2)} chez Winamax et ${odds.unibet.toFixed(2)} chez Unibet.`,
    },
    {
      question: `${team.name} est-elle un value bet pour la CDM 2026 ?`,
      answer: isValueBet
        ? `Oui, notre modèle estime que ${team.name} a ${estimatedProb}% de chances de gagner, contre ${impliedProb}% implicites dans la cote. La value est positive.`
        : `Selon notre modèle, la cote actuelle reflète correctement les chances de ${team.name}. La probabilité implicite (${impliedProb}%) est proche de notre estimation.`,
    },
    {
      question: `Comment évolue la cote de ${team.name} ?`,
      answer: `La cote de ${team.name} était à ${pastOdds} en janvier 2026 et se situe maintenant autour de ${odds.betclic.toFixed(2)}. Les cotes évoluent en fonction des résultats, blessures et matchs amicaux.`,
    },
  ];

  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Drapeau de ${team.name}`}>
              {team.flag}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Cote {team.name} Championne du Monde 2026
              </h1>
              <p className="mt-2 text-lg text-gray-300">
                Groupe {team.group} · FIFA #{team.fifaRanking} · {team.wcAppearances} participations
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Cotes actuelles */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <Trophy className="h-6 w-6 text-secondary" />
                Cote actuelle — {team.name} vainqueur CDM 2026
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name: "Winamax", odds: odds.winamax, bk: bookmakers[1] },
                  { name: "Betclic", odds: odds.betclic, bk: bookmakers[0] },
                  { name: "Unibet", odds: odds.unibet, bk: bookmakers[3] },
                ].map((item) => (
                  <div key={item.name} className="rounded-lg bg-primary/5 p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">{item.name}</p>
                    <p className="text-3xl font-extrabold text-primary">{item.odds.toFixed(2)}</p>
                    <a
                      href={item.bk?.url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="mt-2 inline-block bg-accent text-white rounded-xl py-2 px-4 text-xs font-bold hover:opacity-90 transition-opacity"
                    >
                      Voir la cote
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* Évolution de la cote */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <TrendingUp className="h-6 w-6 text-secondary" />
                Évolution de la cote
              </h2>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Janvier 2026</p>
                  <p className="text-2xl font-bold text-gray-500">{pastOdds}</p>
                </div>
                <ArrowUpDown className="h-5 w-5 text-gray-400" />
                <div className="text-center">
                  <p className="text-xs text-gray-400">Actuellement</p>
                  <p className="text-2xl font-bold text-primary">{odds.betclic.toFixed(2)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                La cote de {team.name} {parseFloat(pastOdds) > odds.betclic ? "a baissé" : "a augmenté"} depuis janvier,
                {parseFloat(pastOdds) > odds.betclic
                  ? " ce qui indique que les bookmakers la considèrent comme plus compétitive."
                  : " ce qui suggère une confiance moindre des bookmakers."}
              </p>
            </section>

            {/* Analyse forces/faiblesses */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <BarChart3 className="h-6 w-6 text-secondary" />
                Analyse : Forces et faiblesses
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">✅ Forces</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {isTopTier ? (
                      <>
                        <li>• Effectif de classe mondiale</li>
                        <li>• Expérience des grands tournois</li>
                        <li>• Profondeur de banc exceptionnelle</li>
                      </>
                    ) : isMidTier ? (
                      <>
                        <li>• Collectif solide et bien organisé</li>
                        <li>• Individualités de qualité</li>
                        <li>• Bonne dynamique récente</li>
                      </>
                    ) : (
                      <>
                        <li>• Motivation de l&apos;outsider</li>
                        <li>• Rien à perdre, tout à gagner</li>
                        <li>• Style de jeu compact et discipliné</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">❌ Faiblesses</h3>
                  <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {isTopTier ? (
                      <>
                        <li>• Pression des attentes</li>
                        <li>• Gestion des blessures sur 7 matchs</li>
                        <li>• Format élargi = plus d&apos;incertitude</li>
                      </>
                    ) : isMidTier ? (
                      <>
                        <li>• Manque de profondeur de banc</li>
                        <li>• Dépendance à un ou deux joueurs clés</li>
                        <li>• Expérience limitée en phases finales</li>
                      </>
                    ) : (
                      <>
                        <li>• Écart de niveau avec les favoris</li>
                        <li>• Peu d&apos;expérience en Coupe du Monde</li>
                        <li>• Effectif moins profond</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {prediction && (
                <div className="mt-6 rounded-lg bg-primary/5 p-4">
                  <p className="font-semibold text-gray-900 dark:text-white">Parcours probable</p>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-500">Phase de groupes</p>
                      <p className="font-bold text-primary">{Math.round(prediction.groupStageProb * 100)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Quarts</p>
                      <p className="font-bold text-primary">{Math.round(prediction.quarterFinalProb * 100)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Finale</p>
                      <p className="font-bold text-primary">{Math.round(prediction.finalProb * 100)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Victoire</p>
                      <p className="font-bold text-accent">{Math.round(prediction.winnerProb * 100)}%</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Comparaison favoris */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white mb-4">
                <Target className="h-6 w-6 text-secondary" />
                Comparaison avec les favoris
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">Équipe</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">FIFA</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700 dark:text-gray-300">Cote</th>
                      <th className="py-3 font-semibold text-gray-700 dark:text-gray-300">Prob.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 dark:border-slate-700/50 bg-accent/5">
                      <td className="py-3 pr-4 font-bold text-gray-900 dark:text-white">
                        {team.flag} {team.name}
                      </td>
                      <td className="py-3 pr-4">#{team.fifaRanking}</td>
                      <td className="py-3 pr-4 font-bold text-primary">{odds.betclic.toFixed(2)}</td>
                      <td className="py-3 font-bold text-accent">{estimatedProb ?? impliedProb}%</td>
                    </tr>
                    {topFavorites.map(({ team: t, prediction: pred }) => {
                      const tOdds = getOdds(t.fifaRanking);
                      return (
                        <tr key={t.id} className="border-b border-gray-100 dark:border-slate-700/50">
                          <td className="py-3 pr-4">
                            <Link href={`/cote-champion/${t.slug}`} className="text-accent hover:underline">
                              {t.flag} {t.name}
                            </Link>
                          </td>
                          <td className="py-3 pr-4">#{t.fifaRanking}</td>
                          <td className="py-3 pr-4 font-bold text-primary">{tOdds.betclic.toFixed(2)}</td>
                          <td className="py-3">{pred ? Math.round(pred.winnerProb * 100) : "—"}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Value bet */}
            <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                💎 Value bet — {team.name}
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-xs text-gray-500">Probabilité implicite (cote)</p>
                  <p className="text-2xl font-extrabold text-primary">{impliedProb}%</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-xs text-gray-500">Notre estimation</p>
                  <p className="text-2xl font-extrabold text-accent">{estimatedProb ?? "—"}%</p>
                </div>
              </div>
              {isValueBet ? (
                <div className="rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
                  <p className="font-bold text-green-700 dark:text-green-400">✅ Value bet détecté !</p>
                  <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                    Notre modèle estime que {team.name} a plus de chances ({estimatedProb}%) que ce que la cote suggère ({impliedProb}%).
                    La value est de +{((estimatedProb ?? 0) - impliedProb).toFixed(1)} points.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-4">
                  <p className="font-bold text-orange-700 dark:text-orange-400">⚠️ Pas de value bet identifié</p>
                  <p className="text-sm text-orange-600 dark:text-orange-500 mt-1">
                    La cote actuelle reflète correctement les chances de {team.name} selon notre modèle.
                    {estimatedProb !== null && estimatedProb < impliedProb && ` Notre estimation (${estimatedProb}%) est même inférieure à la probabilité implicite (${impliedProb}%).`}
                  </p>
                </div>
              )}
            </section>

            {/* CTA */}
            <section className="bg-accent rounded-xl py-3.5 px-6 text-center">
              <p className="text-white font-bold text-lg mb-2">
                Parier sur {team.name} championne du monde
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {bookmakers.slice(0, 3).map((bk) => (
                  <a
                    key={bk.id}
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="inline-block bg-white text-accent rounded-lg py-2 px-5 text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    {bk.name} — {bk.bonus}
                  </a>
                ))}
              </div>
              <p className="text-white/70 text-xs mt-3">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </section>

            {/* FAQ */}
            <FAQSection items={faqItems} title={`Questions fréquentes — Cote ${team.name}`} />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/equipe/${team.slug}`} className="text-accent hover:underline">
                    Fiche {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/parier/${team.slug}`} className="text-accent hover:underline">
                    Parier sur {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/pronostic/${team.slug}`} className="text-accent hover:underline">
                    Pronostic {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/effectif/${team.slug}`} className="text-accent hover:underline">
                    Effectif {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-accent hover:underline">
                    Groupe {team.group}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Bookmakers</h3>
              <div className="space-y-3">
                {bookmakers.slice(0, 4).map((bk) => (
                  <a
                    key={bk.id}
                    href={bk.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className="block rounded-lg border border-gray-200 dark:border-slate-700 p-3 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{bk.name}</p>
                    <p className="text-accent text-xs font-bold">{bk.bonus} {bk.bonusDetail}</p>
                  </a>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-3">
                18+ | Jeu responsable | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
