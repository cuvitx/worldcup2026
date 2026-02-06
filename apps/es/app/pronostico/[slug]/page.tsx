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
    title: `Pronostico ${team.name} Mundial 2026 | Cuotas, Prediccion & Analisis`,
    description: `Pronostico ${team.name} Copa del Mundo 2026: cuotas, probabilidades de victoria, analisis ELO, predicciones de los partidos de grupo y jugadores clave. Toda la informacion para apostar por ${team.name}.`,
    openGraph: {
      title: `${team.flag} Pronostico ${team.name} - Mundial 2026`,
      description: `Cuotas y pronosticos ${team.name} para la Copa del Mundo 2026. Analisis completo, probabilidades y predicciones.`,
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
    GK: "Portero",
    DF: "Defensa",
    MF: "Centrocampista",
    FW: "Delantero",
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
        { label: "Fase de grupos", key: "groupStageProb" as const, value: prediction.groupStageProb },
        { label: "Dieciseisavos", key: "roundOf32Prob" as const, value: prediction.roundOf32Prob },
        { label: "Octavos de final", key: "roundOf16Prob" as const, value: prediction.roundOf16Prob },
        { label: "Cuartos de final", key: "quarterFinalProb" as const, value: prediction.quarterFinalProb },
        { label: "Semifinal", key: "semiFinalProb" as const, value: prediction.semiFinalProb },
        { label: "Final", key: "finalProb" as const, value: prediction.finalProb },
        { label: "Campeon", key: "winnerProb" as const, value: prediction.winnerProb },
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
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/equipos" className="hover:text-primary">
                Selecciones
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/equipo/${team.slug}`}
                className="hover:text-primary"
              >
                {team.name}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Pronostico</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6">
            <span className="text-7xl">{team.flag}</span>
            <div>
              <h1 className="text-4xl font-extrabold">
                Pronostico {team.name}
              </h1>
              <p className="mt-2 text-xl text-gray-300">
                Pronostico &amp; Cuotas Mundial 2026
              </p>
              <p className="mt-1 text-gray-400">
                {team.confederation} &middot; Ranking FIFA #
                {team.fifaRanking} &middot; Grupo {team.group}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* ============ Main Content ============ */}
          <div className="lg:col-span-2 space-y-8">
            {/* ELO Rating Card */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Rating ELO de {team.name}
                </h2>
                <div className="flex items-end gap-4 mb-4">
                  <p className="text-5xl font-extrabold text-primary">
                    {prediction.eloRating}
                  </p>
                  <p className="text-sm text-gray-500 pb-1">puntos ELO</p>
                </div>
                {/* Visual gauge */}
                <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent via-gold to-field"
                    style={{ width: `${eloPercent}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>{eloMin}</span>
                  <span>{eloMax}</span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  El rating ELO mide la fuerza relativa de cada seleccion. Cuanto
                  mayor sea la puntuacion, mas favorita se considera a la
                  seleccion. {team.name} se situa en el{" "}
                  {eloPercent > 75
                    ? "top tier mundial"
                    : eloPercent > 50
                      ? "parte alta de la clasificacion"
                      : eloPercent > 25
                        ? "zona media de la tabla"
                        : "parte baja de la clasificacion"}
                  .
                </p>
              </section>
            )}

            {/* Probability Table with Progress Bars */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Probabilidades por ronda - {team.name}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Probabilidades estimadas de {team.name} de alcanzar cada
                  ronda de la Copa del Mundo 2026, basadas en el modelo ELO.
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
                              ? "bg-gold"
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
                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <span className="inline-block h-3 w-3 rounded-full bg-primary" />
                  <span>Ronda intermedia</span>
                  <span className="ml-2 inline-block h-3 w-3 rounded-full bg-gold" />
                  <span>Victoria final</span>
                </div>
              </section>
            )}

            {/* Cuotas estimadas */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Cuotas estimadas - {team.name} campeon del Mundial 2026
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg bg-gold/10 border border-gold/30 p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      Cuota campeon Mundial
                    </p>
                    <p className="text-4xl font-extrabold text-gold">
                      {estimatedOutrightOdds(prediction.winnerProb)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">cuota decimal estimada</p>
                  </div>
                  <div className="rounded-lg bg-primary/5 border border-primary/10 p-4 text-center">
                    <p className="text-sm text-gray-500 mb-1">
                      Probabilidad de victoria
                    </p>
                    <p className="text-4xl font-extrabold text-primary">
                      {formatProb(prediction.winnerProb)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">segun el modelo ELO</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      label: "Pasar la fase de grupos",
                      odds: probToOdds(prediction.groupStageProb),
                    },
                    {
                      label: "Llegar a octavos",
                      odds: probToOdds(prediction.roundOf16Prob),
                    },
                    {
                      label: "Llegar a la final",
                      odds: probToOdds(prediction.finalProb),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-lg bg-gray-50 p-3 text-center"
                    >
                      <p className="text-lg font-bold text-primary">
                        {item.odds}
                      </p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Las cuotas se calculan a partir del modelo ELO con un margen
                  de casa de apuestas integrado (~8%). Son indicativas y pueden
                  diferir de las cuotas reales ofrecidas por los operadores.
                </p>
              </section>
            )}

            {/* Match Predictions for Group Stage */}
            {teamMatches.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Pronosticos de los partidos de grupo
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Predicciones para los partidos de {team.name} en el Grupo{" "}
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
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">
                              {opponent?.flag ?? "\ud83c\udff3\ufe0f"}
                            </span>
                            <div>
                              <p className="font-semibold">
                                {isHome ? "vs" : "@"}{" "}
                                {opponent?.name ?? "Por determinar"}
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
                                Resultado predicho
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
                                  : "bg-gray-50"
                              }`}
                            >
                              <p className="text-sm font-bold">
                                {Math.round(matchPred.team1WinProb * 100)}%
                              </p>
                              <p className="text-xs text-gray-500">
                                {teams.find(
                                  (t) => t.id === match.homeTeamId
                                )?.name ?? "Loc."}
                              </p>
                            </div>
                            <div
                              className={`rounded p-2 text-center ${
                                matchPred.drawProb >
                                  matchPred.team1WinProb &&
                                matchPred.drawProb > matchPred.team2WinProb
                                  ? "bg-field/10 border border-field/30"
                                  : "bg-gray-50"
                              }`}
                            >
                              <p className="text-sm font-bold">
                                {Math.round(matchPred.drawProb * 100)}%
                              </p>
                              <p className="text-xs text-gray-500">Empate</p>
                            </div>
                            <div
                              className={`rounded p-2 text-center ${
                                matchPred.team2WinProb >
                                  matchPred.team1WinProb &&
                                matchPred.team2WinProb > matchPred.drawProb
                                  ? "bg-field/10 border border-field/30"
                                  : "bg-gray-50"
                              }`}
                            >
                              <p className="text-sm font-bold">
                                {Math.round(matchPred.team2WinProb * 100)}%
                              </p>
                              <p className="text-xs text-gray-500">
                                {teams.find(
                                  (t) => t.id === match.awayTeamId
                                )?.name ?? "Vis."}
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="mt-3 flex gap-2">
                          <Link
                            href={`/match/${match.slug}`}
                            className="text-xs text-accent hover:underline"
                          >
                            Ver el partido &rarr;
                          </Link>
                          {opponent && (
                            <Link
                              href={`/h2h/${team.slug}-vs-${opponent.slug}`}
                              className="text-xs text-primary hover:underline"
                            >
                              Historial H2H &rarr;
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
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Jugadores clave de {team.name}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Los jugadores que marcaran la diferencia para {team.name} en
                  la Copa del Mundo 2026.
                </p>
                <div className="space-y-3">
                  {teamPlayers.map((player) => (
                    <Link
                      key={player.id}
                      href={`/jugador/${player.slug}`}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <div>
                        <p className="font-semibold">{player.name}</p>
                        <p className="text-sm text-gray-500">
                          {positionLabels[player.position]} &middot;{" "}
                          {player.club}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {player.caps} int. / {player.goals} goles
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ============ Affiliate CTA Section ============ */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold text-primary">
                Apostar por {team.name}
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Compara las mejores casas de apuestas deportivas autorizadas en
                Espana para apostar por {team.name} en la Copa del Mundo 2026.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured
                          ? "border-gold bg-gold/5"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white">
                          Recomendado
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
                          rel="noopener noreferrer sponsored"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured
                              ? "bg-gold hover:bg-gold/90"
                              : "bg-accent hover:bg-accent/90"
                          }`}
                        >
                          Apostar
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gray-400 text-center">
                Las cuotas son estimadas y pueden variar. Apuesta con
                responsabilidad. +18. El juego puede ser perjudicial: perdidas
                economicas, conflictos familiares, adiccion. Llama al 900 200
                225 (llamada gratuita).
              </p>
            </section>
          </div>

          {/* ============ Sidebar ============ */}
          <div className="space-y-6">
            {/* Quick Stats Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Ficha rapida</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ranking FIFA</dt>
                  <dd className="font-medium">#{team.fifaRanking}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Grupo</dt>
                  <dd className="font-medium">
                    <Link
                      href={`/grupo/${team.group.toLowerCase()}`}
                      className="text-accent hover:underline"
                    >
                      Grupo {team.group}
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Confederacion</dt>
                  <dd className="font-medium">{team.confederation}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Participaciones Mundial</dt>
                  <dd className="font-medium">{team.wcAppearances}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Mejor resultado</dt>
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
                      <dt className="text-gray-500">Cuota campeon</dt>
                      <dd className="font-bold text-gold">
                        {estimatedOutrightOdds(prediction.winnerProb)}
                      </dd>
                    </div>
                  </>
                )}
              </dl>
              <div className="mt-4">
                <Link
                  href={`/equipo/${team.slug}`}
                  className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Ver la ficha completa &rarr;
                </Link>
              </div>
            </div>

            {/* Related Teams (same group) */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">
                Selecciones del Grupo {team.group}
              </h3>
              <ul className="space-y-2">
                {groupTeams.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/equipo/${t.slug}`}
                      className="flex items-center justify-between gap-2 text-sm rounded-lg p-2 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span>{t.flag}</span>
                        <span className="font-medium">{t.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">
                        #{t.fifaRanking}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                <Link
                  href={`/grupo/${team.group.toLowerCase()}`}
                  className="text-sm text-accent hover:underline"
                >
                  Ver el Grupo {team.group} &rarr;
                </Link>
              </div>
            </div>

            {/* H2H Links */}
            {groupTeams.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">
                  Enfrentamientos directos
                </h3>
                <ul className="space-y-2">
                  {groupTeams.map((t) => (
                    <li key={t.id}>
                      <Link
                        href={`/h2h/${team.slug}-vs-${t.slug}`}
                        className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
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
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Apostar por {team.name}
              </h3>
              {prediction ? (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cuota campeon</span>
                    <span className="font-bold text-gold">
                      {estimatedOutrightOdds(prediction.winnerProb)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Pasar la fase de grupos</span>
                    <span className="font-bold text-field">
                      {Math.round(prediction.groupStageProb * 100)}%
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-4">
                  Los pronosticos estaran disponibles proximamente.
                </p>
              )}
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full text-center rounded-lg bg-accent py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                {featuredBookmaker.bonus} en {featuredBookmaker.name}
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">
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
            sport: "Football",
            memberOf: {
              "@type": "SportsOrganization",
              name: "FIFA World Cup 2026",
            },
            description: `Pronostico y cuotas para ${team.name} en la Copa del Mundo 2026. Rating ELO: ${prediction?.eloRating ?? "N/A"}.`,
            url: `https://mundial2026.es/pronostico/${team.slug}`,
          }),
        }}
      />
    </>
  );
}
