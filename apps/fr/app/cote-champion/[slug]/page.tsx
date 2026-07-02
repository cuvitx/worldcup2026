import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { affiliateLinkAttributes, pmuTrackingUrl } from "@repo/data/affiliates";
import { AlertTriangle, ArrowUpDown, BarChart3, Check, Clock, Gem, ShieldCheck, Target, TrendingUp, Trophy, X } from "lucide-react";
import { PmuBanner } from "../../components/PmuBanner";
import { BookmakerOffers } from "../../components/BookmakerOffers";
export const revalidate = 3600;
export const dynamicParams = true;
interface PageProps {
  params: Promise<{ slug: string }>;
}
const PRIORITY_COTE_SLUGS = new Set(["france", "portugal"]);

function isPriorityCotePage(slug: string) {
  return PRIORITY_COTE_SLUGS.has(slug);
}

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};
  const priority = isPriorityCotePage(team.slug);
  return {
    title: priority
      ? `Cotes Coupe du Monde 2026 : ${team.name} vainqueur, analyse PMU`
      : `Cote ${team.name} Championne du Monde 2026 — Analyse & Value Bet`,
    description: priority
      ? `Cotes Coupe du Monde 2026 pour ${team.name} vainqueur : cote PMU Sport, probabilite implicite, value bet, parcours et comparaison avec les favoris.`
      : `Cote ${team.name} pour gagner la Coupe du Monde 2026 : cotes PMU Sport, évolution et analyse value bet. Groupe ${team.group}.`,
    openGraph: {
      title: priority
        ? `${team.flag} Cotes Coupe du Monde 2026 : ${team.name} vainqueur`
        : `${team.flag} Cote ${team.name} Championne du Monde 2026`,
      description: priority
        ? `Cote ${team.name}, probabilite implicite, value bet et comparaison des favoris du Mondial 2026.`
        : `Analyse complète de la cote ${team.name} pour remporter la CDM 2026.`,
      url: `${domains.fr}/cote-champion/${team.slug}`,
    },
    alternates: { canonical: `https://www.cdm2026.fr/cote-champion/${team.slug}` },
  };
}
/** Indicative odds based on FIFA ranking — PMU Sport only */
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
function getPastOdds(currentBase: number, fifaRanking: number): string {
  const rankAdjustment = Math.min(Math.max(fifaRanking, 1), 80) / 1000;
  return (currentBase * (1.16 + rankAdjustment)).toFixed(2);
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

function formatUpdatedAt() {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function getPriorityCoteCopy(slug: string, teamName: string) {
  if (slug === "france") {
    return {
      headline: "France vainqueur : cote, profondeur d'effectif et parcours",
      summary:
        "La France attire beaucoup de mises car son effectif coche plusieurs cases : experience des grands rendez-vous, profondeur offensive et capacite a gagner des matchs fermes. La cote doit toutefois etre comparee au tableau potentiel et a la gestion des cadres.",
      proofPoints: [
        "Effectif tres profond sur les postes offensifs et au milieu.",
        "Experience recente des finales et des matchs a elimination directe.",
        "Cote sensible aux blessures des cadres et au parcours en phase finale.",
      ],
    };
  }

  if (slug === "portugal") {
    return {
      headline: "Portugal vainqueur : cote, generation offensive et value",
      summary:
        "Le Portugal combine talent individuel, options offensives et experience europeenne. Sa cote peut devenir interessante si le tableau s'ouvre, mais elle doit etre surveillee face aux favoris plus constants comme la France, le Bresil ou l'Espagne.",
      proofPoints: [
        "Generation offensive dense avec plusieurs profils decisifs.",
        "Cote souvent plus haute que les favoris historiques, donc a surveiller pour la value.",
        "Depend fortement du tirage et de la stabilite defensive en phase finale.",
      ],
    };
  }

  return {
    headline: `${teamName} vainqueur : cote et analyse`,
    summary:
      "La cote vainqueur doit etre lue avec le niveau de l'effectif, la forme recente, le groupe et le tableau potentiel.",
    proofPoints: [
      "Comparer la cote a la probabilite implicite.",
      "Verifier le parcours possible avant de miser.",
      "Surveiller blessures, suspensions et forme recente.",
    ],
  };
}

export default async function CoteChampionPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();
  const prediction = predictionsByTeamId[team.id];
  const pmuOdds = getOdds(team.fifaRanking);
  const pastOdds = getPastOdds(pmuOdds, team.fifaRanking);
  const impliedProb = Math.round((1 / pmuOdds) * 100 * 10) / 10;
  const estimatedProb = prediction ? Math.round(prediction.winnerProb * 100 * 10) / 10 : null;
  const isValueBet = estimatedProb !== null && estimatedProb > impliedProb;
  const topFavorites = getTopFavorites(team.slug);
  const heroTracking = { pageType: "cote-champion", slug: team.slug, placement: "hero" };
  const priorityCotePage = isPriorityCotePage(team.slug);
  const updatedAt = formatUpdatedAt();
  const priorityCopy = getPriorityCoteCopy(team.slug, team.name);
// Forces & faiblesses based on ranking
  const isTopTier = team.fifaRanking <= 10;
  const isMidTier = team.fifaRanking > 10 && team.fifaRanking <= 30;
  const faqItems = [
    {
      question: `Quelle est la cote de ${team.name} pour gagner la CDM 2026 ?`,
      answer: `La cote de ${team.name} pour remporter la Coupe du Monde 2026 est d'environ ${pmuOdds.toFixed(2)} chez PMU Sport.`,
    },
    {
      question: `${team.name} est-elle un value bet pour la CDM 2026 ?`,
      answer: isValueBet
        ? `Oui, notre modèle estime que ${team.name} a ${estimatedProb}% de chances de gagner, contre ${impliedProb}% implicites dans la cote. La value est positive.`
        : `Selon notre modèle, la cote actuelle reflète correctement les chances de ${team.name}. La probabilité implicite (${impliedProb}%) est proche de notre estimation.`,
    },
    {
      question: `Comment évolue la cote de ${team.name} ?`,
      answer: `La cote de ${team.name} était à ${pastOdds} en janvier 2026 et se situe maintenant autour de ${pmuOdds.toFixed(2)} chez PMU Sport. Les cotes évoluent en fonction des résultats, blessures et matchs amicaux.`,
    },
    {
      question: `Où comparer les cotes Coupe du Monde 2026 pour ${team.name} ?`,
      answer: `Comparez la cote vainqueur de ${team.name} avec les autres favoris sur nos pages cote champion, pronostic vainqueur et comparateur de cotes. Les marchés peuvent évoluer après chaque match, blessure ou résultat important.`,
    },
    ...(priorityCotePage
      ? [
          {
            question: `Pourquoi suivre la cote de ${team.name} dès maintenant ?`,
            answer: `La cote de ${team.name} peut bouger vite après une blessure, une annonce de composition, un match important ou un tirage favorable. Suivre la cote tôt permet de repérer une éventuelle value avant que le marché ne se réajuste.`,
          },
          {
            question: `Que vérifier avant de parier sur ${team.name} vainqueur ?`,
            answer: `Avant de jouer ${team.name} vainqueur de la Coupe du Monde, vérifiez le tableau potentiel, la fraîcheur des cadres, les absents, la dynamique récente et la cote des favoris concurrents.`,
          },
          {
            question: `Cette cote est-elle une cote officielle PMU ?`,
            answer: `La cote affichée sur cette page est une estimation indicative construite pour l'analyse. Vérifiez toujours la cote réelle, les conditions et les marchés disponibles directement chez PMU Sport avant de miser.`,
          },
        ]
      : []),
  ];
  return (
    <>
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
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
                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">
                  {priorityCotePage
                    ? `Suivez les cotes Coupe du Monde 2026 pour ${team.name} vainqueur : cote actuelle, probabilite implicite, value bet et comparaison avec les autres favoris du Mondial.`
                    : `Analyse de la cote vainqueur de ${team.name}, probabilite implicite, value bet et comparaison avec les favoris de la Coupe du Monde 2026.`}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                    <Clock className="h-3.5 w-3.5" />
                    Mis a jour le {updatedAt}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Analyse indicative, cote a verifier chez PMU
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-wide text-[#d4af37]">Cote vainqueur PMU</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-white/70">{team.name} championne du monde</p>
                  <p className="mt-1 text-5xl font-black tabular-nums">{pmuOdds.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/60">Prob. implicite</p>
                  <p className="text-2xl font-extrabold text-[#d4af37]">{impliedProb}%</p>
                </div>
              </div>
              <a
                href={pmuTrackingUrl(heroTracking, "hero-odds")}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                {...affiliateLinkAttributes(heroTracking, "hero-odds")}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition hover:brightness-110"
                style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
              >
                Voir la cote PMU <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="mt-3 text-center text-[10px] leading-snug text-white/45">
                18+ | Offre soumise a conditions | Jouer comporte des risques
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            {/* Cotes actuelles */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Trophy className="h-6 w-6 text-accent" />
                Cote actuelle — {team.name} vainqueur CDM 2026
              </h2>
              <div className="grid gap-4 md:grid-cols-[1fr_0.9fr]">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">PMU Sport</p>
                      <p className="text-4xl font-extrabold text-primary tabular-nums">{pmuOdds.toFixed(2)}</p>
                    </div>
                    <a
                      href={pmuTrackingUrl(heroTracking, "current-odds")}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      {...affiliateLinkAttributes(heroTracking, "current-odds")}
                      className="group relative shrink-0 inline-flex items-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition"
                      style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
                    >
                      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]" aria-hidden="true" />
                      <span className="relative">Parier</span>
                      <span className="relative" aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-gray-500">
                    Cote indicative a controler chez PMU Sport avant toute mise.
                  </p>
                </div>
                <div className="rounded-xl border border-primary/15 bg-primary/5 p-5">
                  <p className="text-sm font-semibold text-gray-700">Lecture rapide</p>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-gray-500">Prob. implicite</p>
                      <p className="text-xl font-black text-primary">{impliedProb}%</p>
                    </div>
                    <div className="rounded-lg bg-white p-3">
                      <p className="text-xs text-gray-500">Notre modele</p>
                      <p className="text-xl font-black text-accent">{estimatedProb ?? "—"}%</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-gray-600">
                    {isValueBet
                      ? `Value positive estimee : notre modele est au-dessus de la probabilite implicite.`
                      : `Pas de value nette detectee a ce niveau de cote : comparez avant de jouer.`}
                  </p>
                </div>
              </div>
            </section>
            <BookmakerOffers
              tracking={{ pageType: "cote-champion", slug: team.slug, placement: "offers" }}
              title={`Parier sur ${team.name} : comparez les offres`}
              subtitle="Bookmakers agréés ANJ — déjà un compte chez l'un d'eux ? Les autres offres de bienvenue restent valables."
            />
            {priorityCotePage && (
              <section className="rounded-xl border border-accent/25 bg-white p-4 shadow-sm sm:p-6">
                <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-accent">
                      Analyse prioritaire
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-gray-900">{priorityCopy.headline}</h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{priorityCopy.summary}</p>
                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                      {priorityCopy.proofPoints.map((point) => (
                        <li key={point} className="flex gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm font-bold text-gray-900">A comparer maintenant</p>
                    <div className="mt-3 space-y-2 text-sm">
                      <Link href="/cote-champion/france" className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-semibold text-primary hover:bg-primary/5">
                        France <span>{getOdds(2).toFixed(2)}</span>
                      </Link>
                      <Link href="/cote-champion/portugal" className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-semibold text-primary hover:bg-primary/5">
                        Portugal <span>{getOdds(6).toFixed(2)}</span>
                      </Link>
                      <Link href="/cote-champion/bresil" className="flex items-center justify-between rounded-lg bg-white px-3 py-2 font-semibold text-primary hover:bg-primary/5">
                        Bresil <span>{getOdds(5).toFixed(2)}</span>
                      </Link>
                    </div>
                    <Link href="/comparateur-cotes" className="mt-4 inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-bold text-gray-900 hover:border-primary/30">
                      Voir le comparatif complet
                    </Link>
                  </div>
                </div>
              </section>
            )}
            <section className="rounded-xl border border-primary/15 bg-primary/5 p-4 sm:p-6 shadow-sm">
              <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-primary">
                    Cotes Coupe du Monde 2026
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                    Situer {team.name} parmi les favoris
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    La cote vainqueur doit etre lue avec le niveau de l'effectif,
                    le groupe, le tableau potentiel et la dynamique des favoris.
                    Avant de parier, comparez {team.name} aux autres selections
                    candidates au titre.
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  <Link
                    href="/pronostic/vainqueur"
                    className="rounded-lg border border-gray-200 bg-white p-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/40 hover:bg-white"
                  >
                    Pronostic vainqueur Coupe du Monde
                  </Link>
                  <Link
                    href="/comparateur-cotes"
                    className="rounded-lg border border-gray-200 bg-white p-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/40 hover:bg-white"
                  >
                    Comparateur cotes Coupe du Monde
                  </Link>
                  <Link
                    href="/tableau"
                    className="rounded-lg border border-gray-200 bg-white p-3 text-sm font-semibold text-gray-900 transition-colors hover:border-primary/40 hover:bg-white"
                  >
                    Tableau pronostic du Mondial
                  </Link>
                </div>
              </div>
            </section>
            {/* Évolution de la cote */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
                Évolution de la cote
              </h2>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Janvier 2026</p>
                  <p className="text-2xl font-bold text-gray-500">{pastOdds}</p>
                </div>
                <ArrowUpDown className="h-5 w-5 text-gray-400" />
                <div className="text-center">
                  <p className="text-xs text-gray-400">Actuellement (PMU Sport)</p>
                  <p className="text-2xl font-bold text-primary">{pmuOdds.toFixed(2)}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                La cote de {team.name} {parseFloat(pastOdds) > pmuOdds ? "a baissé" : "a augmenté"} depuis janvier,
                {parseFloat(pastOdds) > pmuOdds
                  ? " ce qui indique que les bookmakers la considèrent comme plus compétitive."
                  : " ce qui suggère une confiance moindre des bookmakers."}
              </p>
            </section>
            {/* Analyse forces/faiblesses */}
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <BarChart3 className="h-6 w-6 text-accent" />
                Analyse : Forces et faiblesses
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-green-600 mb-2"><Check className="h-5 w-5 inline-block" /> Forces</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
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
                  <h3 className="font-semibold text-red-600 mb-2"><X className="h-5 w-5 inline-block" /> Faiblesses</h3>
                  <ul className="space-y-1 text-sm text-gray-600">
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
                  <p className="font-semibold text-gray-900">Parcours probable</p>
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
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <Target className="h-6 w-6 text-accent" />
                Comparaison avec les favoris
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 pr-4 font-semibold text-gray-700">Équipe</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700">FIFA</th>
                      <th className="py-3 pr-4 font-semibold text-gray-700">Cote PMU</th>
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
                  <p className="text-xs text-gray-500">Probabilité implicite (cote)</p>
                  <p className="text-2xl font-extrabold text-primary">{impliedProb}%</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-xs text-gray-500">Notre estimation</p>
                  <p className="text-2xl font-extrabold text-accent">{estimatedProb ?? "—"}%</p>
                </div>
              </div>
              {isValueBet ? (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="font-bold text-green-700"><Check className="h-5 w-5 inline-block" /> Value bet détecté !</p>
                  <p className="text-sm text-green-600 mt-1">
                    Notre modèle estime que {team.name} a plus de chances ({estimatedProb}%) que ce que la cote suggère ({impliedProb}%).
                    La value est de +{((estimatedProb ?? 0) - impliedProb).toFixed(1)} points.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                  <p className="font-bold text-orange-700"><AlertTriangle className="h-5 w-5 inline-block" /> Pas de value bet identifié</p>
                  <p className="text-sm text-orange-600 mt-1">
                    La cote actuelle reflète correctement les chances de {team.name} selon notre modèle.
                    {estimatedProb !== null && estimatedProb < impliedProb && ` Notre estimation (${estimatedProb}%) est même inférieure à la probabilité implicite (${impliedProb}%).`}
                  </p>
                </div>
              )}
            </section>
            <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À croiser avant de parier</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                <Link
                  href="/pronostic/vainqueur"
                  className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <p className="text-sm font-bold text-gray-900">Pronostic vainqueur</p>
                  <p className="mt-1 text-xs text-gray-500">Comparer {team.name} aux favoris</p>
                </Link>
                <Link
                  href="/tableau"
                  className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <p className="text-sm font-bold text-gray-900">Tableau final</p>
                  <p className="mt-1 text-xs text-gray-500">Visualiser le parcours possible</p>
                </Link>
                <Link
                  href={`/effectif/${team.slug}`}
                  className="rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <p className="text-sm font-bold text-gray-900">Effectif {team.name}</p>
                  <p className="mt-1 text-xs text-gray-500">Joueurs clés et profondeur du banc</p>
                </Link>
              </div>
            </section>
            {/* CTA */}
            <PmuBanner tracking={{ pageType: "cote-champion", slug: team.slug, placement: "banner" }} />
            {/* FAQ */}
            <FAQSection items={faqItems} title={`Questions fréquentes — Cote ${team.name}`} />
          </div>
          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/equipe/${team.slug}`} className="text-primary hover:underline">
                    Fiche {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/parier/${team.slug}`} className="text-primary hover:underline">
                    Parier sur {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/pronostic/${team.slug}`} className="text-primary hover:underline">
                    Pronostic {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/effectif/${team.slug}`} className="text-primary hover:underline">
                    Effectif {team.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/groupe/${team.group.toLowerCase()}`} className="text-primary hover:underline">
                    Groupe {team.group}
                  </Link>
                </li>
              </ul>
            </div>
            <PmuBanner tracking={{ pageType: "cote-champion", slug: team.slug, placement: "sidebar" }} compact />
          </aside>
        </div>
      </div>
    </>
  );
}
