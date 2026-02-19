import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teams, teamsBySlug } from "@repo/data/teams";
import { predictionsByTeamId, matchPredictionByPair } from "@repo/data/predictions";
import { groupsByLetter } from "@repo/data/groups";
import { playersByTeamId } from "@repo/data/players";
import { matchesByGroup } from "@repo/data/matches";
import {
  bookmakers,
  featuredBookmaker,
  estimatedOutrightOdds,
  probToOdds,
} from "@repo/data/affiliates";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) return {};

  return {
    title: `Pronostic ${team.name} CDM 2026 | Cotes, Prediction & Analyse`,
    description: `Pronostic ${team.name} Coupe du Monde 2026 : cotes, probabilites de victoire, analyse ELO, predictions des matchs de groupe et joueurs cles. Toutes les infos pour parier sur ${team.name}.`,
    alternates: getAlternates("prediction", slug, "fr"),
    openGraph: {
      title: `${team.flag} Pronostic ${team.name} - CDM 2026`,
      description: `Cotes et pronostics ${team.name} pour la Coupe du Monde 2026. Analyse complete, probabilites et predictions.`,
    },
  };
}

export default async function PronosticTeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) notFound();

  const group = groupsByLetter[team.group];
  const groupTeams = group
    ? group.teams
        .map((id) => teams.find((t) => t.id === id))
        .filter(
          (t): t is NonNullable<typeof t> => t != null && t.id !== team.id
        )
    : [];

  const prediction = predictionsByTeamId[team.id];
  const teamPlayers = playersByTeamId[team.id] ?? [];
  const teamMatches = (matchesByGroup[team.group] ?? []).filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  const positionLabels: Record<string, string> = {
    GK: "Gardien",
    DF: "Defenseur",
    MF: "Milieu",
    FW: "Attaquant",
  };

  // ELO gauge: min 1400, max 2100 range
  const eloMin = 1400;
  const eloMax = 2100;
  const eloPercent = prediction
    ? Math.min(
        100,
        Math.max(0, ((prediction.eloRating - eloMin) / (eloMax - eloMin)) * 100)
      )
    : 0;

  const stages = prediction
    ? [
        { label: "Phase de groupes", key: "groupStageProb" as const, value: prediction.groupStageProb },
        { label: "32e de finale", key: "roundOf32Prob" as const, value: prediction.roundOf32Prob },
        { label: "8e de finale", key: "roundOf16Prob" as const, value: prediction.roundOf16Prob },
        { label: "Quart de finale", key: "quarterFinalProb" as const, value: prediction.quarterFinalProb },
        { label: "Demi-finale", key: "semiFinalProb" as const, value: prediction.semiFinalProb },
        { label: "Finale", key: "finalProb" as const, value: prediction.finalProb },
        { label: "Vainqueur", key: "winnerProb" as const, value: prediction.winnerProb },
      ]
    : [];

  const formatProb = (p: number) =>
    p >= 0.01
      ? `${(p * 100).toFixed(1)}%`
      : p >= 0.001
        ? `${(p * 100).toFixed(2)}%`
        : `${(p * 100).toFixed(3)}%`;

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Pronostics",url:"/equipes"},{name:team.name,url:"/pronostic/"+team.slug}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="text-primary dark:text-secondary hover:underline">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/equipes" className="text-primary dark:text-secondary hover:underline">
                Équipes
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/equipe/${team.slug}`}
                className="text-primary dark:text-secondary hover:underline"
              >
                {team.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Pronostic</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                Pronostic {team.name}
              </h1>
              <p className="mt-2 text-xl text-gray-300">
                Pronostic &amp; Cotes CDM 2026
              </p>
              <p className="mt-1 text-gray-500">
                {team.confederation} &middot; Classement FIFA #
                {team.fifaRanking} &middot; Groupe {team.group}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ============ Main Content ============ */}
          <div className="lg:col-span-2 space-y-8">
            {/* ELO Rating Card */}
            {prediction && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Rating ELO de {team.name}
                </h2>
                <div className="flex items-end gap-4 mb-4">
                  <p className="text-3xl font-extrabold text-primary sm:text-5xl">
                    {prediction.eloRating}
                  </p>
                  <p className="text-sm text-gray-500 pb-1">points ELO</p>
                </div>
                {/* Visual gauge */}
                <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-secondary to-field"
                    style={{ width: `${eloPercent}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>{eloMin}</span>
                  <span>{eloMax}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Le rating ELO mesure la force relative de chaque équipe. Plus
                  le score est eleve, plus l&apos;équipe est consideree comme
                  favorite. {team.name} se situe dans le{" "}
                  {eloPercent > 75
                    ? "top tier mondial"
                    : eloPercent > 50
                      ? "haut du classement"
                      : eloPercent > 25
                        ? "milieu de tableau"
                        : "bas du classement"}
                  .
                </p>
              </section>
            )}

            {/* Probability Table with Progress Bars */}
            {prediction && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Probabilites par tour - {team.name}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Probabilites estimees de {team.name} d&apos;atteindre chaque
                  tour de la Coupe du Monde 2026, basees sur le modele ELO.
                </p>
                <div className="space-y-3">
                  {stages.map((stage) => (
                    <div key={stage.key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {stage.label}
                        </span>
                        <span className="text-sm font-bold text-primary">
                          {formatProb(stage.value)}
                        </span>
                      </div>
                      <div className="relative h-3 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className={`absolute inset-y-0 left-0 rounded-full ${
                            stage.key === "winnerProb"
                              ? "bg-secondary"
                              : "bg-primary"
                          }`}
                          style={{
                            width: `${Math.max(1, stage.value * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <span className="inline-block h-3 w-3 rounded-full bg-primary" />
                  <span>Tour intermediaire</span>
                  <span className="ml-2 inline-block h-3 w-3 rounded-full bg-secondary" />
                  <span>Victoire finale</span>
                </div>
              </section>
            )}

            {/* Cotes estimees */}
            {prediction && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Cotes estimees - {team.name} vainqueur CDM 2026
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-secondary/10 border border-secondary/30 p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      Cote vainqueur CDM
                    </p>
                    <p className="text-2xl font-extrabold text-secondary sm:text-4xl">
                      {estimatedOutrightOdds(prediction.winnerProb)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">cote decimale estimee</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      Probabilite de victoire
                    </p>
                    <p className="text-2xl font-extrabold text-primary sm:text-4xl">
                      {formatProb(prediction.winnerProb)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">selon le modele ELO</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Passer les groupes",
                      odds: probToOdds(prediction.groupStageProb),
                    },
                    {
                      label: "Atteindre les 8e",
                      odds: probToOdds(prediction.roundOf16Prob),
                    },
                    {
                      label: "Atteindre la finale",
                      odds: probToOdds(prediction.finalProb),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 text-center"
                    >
                      <p className="text-lg font-bold text-primary">
                        {item.odds}
                      </p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Les cotes sont calculées a partir du modele ELO avec une marge
                  bookmaker integree (~8%). Elles sont indicatives et peuvent
                  differer des cotes réelles proposees par les opérateurs.
                </p>
              </section>
            )}

            {/* Match Predictions for Group Stage */}
            {teamMatches.length > 0 && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Pronostics des matchs de groupe
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Predictions pour les matchs de {team.name} dans le Groupe{" "}
                  {team.group}.
                </p>
                <div className="space-y-4">
                  {teamMatches.map((match) => {
                    const opponent = teams.find(
                      (t) =>
                        t.id ===
                        (match.homeTeamId === team.id
                          ? match.awayTeamId
                          : match.homeTeamId)
                    );
                    const isHome = match.homeTeamId === team.id;
                    const matchPred =
                      matchPredictionByPair[
                        `${match.homeTeamId}:${match.awayTeamId}`
                      ];

                    return (
                      <div
                        key={match.id}
                        className="rounded-lg border border-gray-200 dark:border-slate-700 p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {opponent?.flag ?? "\ud83c\udff3\ufe0f"}
                            </span>
                            <div>
                              <p className="font-semibold">
                                {isHome ? "vs" : "@"}{" "}
                                {opponent?.name ?? "A determiner"}
                              </p>
                              <p className="text-xs text-gray-500">
                                J{match.matchday} &middot; {match.date} &middot;{" "}
                                {match.time} UTC
                              </p>
                            </div>
                          </div>
                          {matchPred && (
                            <div className="text-right">
                              <p className="text-lg font-bold text-primary">
                                {matchPred.predictedScore}
                              </p>
                              <p className="text-xs text-gray-500">
                                Score predit
                              </p>
                            </div>
                          )}
                        </div>
                        {matchPred && (
                          <div className="grid grid-cols-3 gap-2">
                            <div
                              className={`rounded p-2 text-center ${
                                matchPred.team1WinProb >
                                  matchPred.team2WinProb &&
                                matchPred.team1WinProb > matchPred.drawProb
                                  ? "bg-field/10 border border-field/30"
                                  : "bg-gray-50 dark:bg-slate-700"
                              }`}
                            >
                              <p className="text-sm font-bold">
                                {Math.round(matchPred.team1WinProb * 100)}%
                              </p>
                              <p className="text-xs text-gray-500">
                                {teams.find(
                                  (t) => t.id === match.homeTeamId
                                )?.name ?? "Dom."}
                              </p>
                            </div>
                            <div
                              className={`rounded p-2 text-center ${
                                matchPred.drawProb >
                                  matchPred.team1WinProb &&
                                matchPred.drawProb > matchPred.team2WinProb
                                  ? "bg-field/10 border border-field/30"
                                  : "bg-gray-50 dark:bg-slate-700"
                              }`}
                            >
                              <p className="text-sm font-bold">
                                {Math.round(matchPred.drawProb * 100)}%
                              </p>
                              <p className="text-xs text-gray-500">Nul</p>
                            </div>
                            <div
                              className={`rounded p-2 text-center ${
                                matchPred.team2WinProb >
                                  matchPred.team1WinProb &&
                                matchPred.team2WinProb > matchPred.drawProb
                                  ? "bg-field/10 border border-field/30"
                                  : "bg-gray-50 dark:bg-slate-700"
                              }`}
                            >
                              <p className="text-sm font-bold">
                                {Math.round(matchPred.team2WinProb * 100)}%
                              </p>
                              <p className="text-xs text-gray-500">
                                {teams.find(
                                  (t) => t.id === match.awayTeamId
                                )?.name ?? "Ext."}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="mt-3 flex gap-2">
                          <Link
                            href={`/match/${match.slug}`}
                            className="text-xs text-primary hover:underline"
                          >
                            Voir le match &rarr;
                          </Link>
                          {opponent && (
                            <Link
                              href={`/h2h/${team.slug}-vs-${opponent.slug}`}
                              className="text-xs text-primary hover:underline"
                            >
                              Historique H2H &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Key Players */}
            {teamPlayers.length > 0 && (
              <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Joueurs cles de {team.name}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Les joueurs qui feront la difference pour {team.name} lors de
                  la Coupe du Monde 2026.
                </p>
                <div className="space-y-3">
                  {teamPlayers.map((player) => (
                    <Link
                      key={player.id}
                      href={`/joueur/${player.slug}`}
                      className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold truncate">{player.name}</p>
                        <p className="text-sm text-gray-500 truncate">
                          {positionLabels[player.position]} &middot;{" "}
                          {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {player.caps} sel. / {player.goals} buts
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ============ Affiliate CTA Section ============ */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Parier sur {team.name}
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Comparez les meilleurs sites de paris sportifs agreees en France
                pour parier sur {team.name}à la Coupe du Monde 2026.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured
                          ? "border-secondary bg-secondary/5"
                          : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-white">
                          Recommande
                        </span>
                      )}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-bold">{bk.name}</p>
                        <p className="text-sm text-gray-500">
                          {"★".repeat(bk.rating)}
                          {"☆".repeat(5 - bk.rating)}
                        </p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-extrabold text-field">
                          {bk.bonus}
                        </p>
                        <p className="text-xs text-gray-500">
                          {bk.bonusDetail}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href={bk.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured
                              ? "bg-secondary hover:bg-secondary/90"
                              : "bg-primary hover:bg-primary/90"
                          }`}
                        >
                          Parier sur {team.name}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gray-500 text-center">
                Les cotes sont estimees et susceptibles d&apos;evoluer. Pariez
                responsablement. 18+. Les jeux d&apos;argent et de hasard
                peuvent être dangereux : pertes d&apos;argent, conflits
                familiaux, addiction. Appelez le 09 74 75 13 13 (appel non
                surtaxe).
              </p>
            </section>
          </div>

          {/* ============ Sidebar ============ */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fiche rapide</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Classement FIFA</dt>
                  <dd className="font-medium">#{team.fifaRanking}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Groupe</dt>
                  <dd className="font-medium">
                    <Link
                      href={`/groupe/${team.group.toLowerCase()}`}
                      className="text-primary hover:underline"
                    >
                      Groupe {team.group}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Confederation</dt>
                  <dd className="font-medium">{team.confederation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Participations CDM</dt>
                  <dd className="font-medium">{team.wcAppearances}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Meilleur résultat</dt>
                  <dd className="font-medium text-right max-w-[55%]">
                    {team.bestResult}
                  </dd>
                </div>
                {prediction && (
                  <>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <dt className="text-gray-500">Rating ELO</dt>
                      <dd className="font-bold text-primary">
                        {prediction.eloRating}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Cote vainqueur</dt>
                      <dd className="font-bold text-secondary">
                        {estimatedOutrightOdds(prediction.winnerProb)}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
              <div className="mt-4">
                <Link
                  href={`/equipe/${team.slug}`}
                  className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Voir la fiche complète &rarr;
                </Link>
              </div>
            </div>

            {/* Related Teams (same group) */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Équipes du Groupe {team.group}
              </h3>
              <ul className="space-y-2">
                {groupTeams.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/equipe/${t.slug}`}
                      className="flex items-center justify-between gap-2 text-sm rounded-lg p-2 hover:bg-gray-50 dark:bg-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span role="img" aria-label={`Drapeau de ${t.name}`}>{t.flag}</span>
                        <span className="font-medium">{t.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        #{t.fifaRanking}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <Link
                  href={`/groupe/${team.group.toLowerCase()}`}
                  className="text-sm text-primary hover:underline"
                >
                  Voir le Groupe {team.group} &rarr;
                </Link>
              </div>
            </div>

            {/* H2H Links */}
            {groupTeams.length > 0 && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Confrontations directes
                </h3>
                <ul className="space-y-2">
                  {groupTeams.map((t) => (
                    <li key={t.id}>
                      <Link
                        href={`/h2h/${team.slug}-vs-${t.slug}`}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary transition-colors"
                      >
                        <span>
                          {team.flag} vs {t.flag}
                        </span>
                        <span className="font-medium">
                          {team.name} - {t.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Parier sur {team.name}
              </h3>
              {prediction ? (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cote vainqueur</span>
                    <span className="font-bold text-secondary">
                      {estimatedOutrightOdds(prediction.winnerProb)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Passer les groupes</span>
                    <span className="font-bold text-field">
                      {Math.round(prediction.groupStageProb * 100)}%
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">
                  Les pronostics seront disponibles prochainement.
                </p>
              )}
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center rounded-lg bg-accent py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              >
                {featuredBookmaker.bonus} sur {featuredBookmaker.name}
              </a>
              <p className="mt-2 text-xs text-gray-500 text-center">
                {featuredBookmaker.bonusDetail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsTeam",
            name: team.name,
            alternateName: team.code,
            sport: "Football",
            memberOf: {
              "@type": "SportsOrganization",
              name: "FIFA World Cup 2026",
            },
            description: `Pronostic et cotes pour ${team.name}à la Coupe du Monde 2026. Rating ELO : ${prediction?.eloRating ?? "N/A"}.`,
            url: `https://cdm2026.fr/pronostic/${team.slug}`,
          }),
        }}
      />
    </>
  );
}
