import type { Metadata } from "next";
import Link from "next/link";
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
import { getAlternates } from "@repo/data/route-mapping";

import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { AiExpertInsight } from "@repo/ui/ai-expert-insight";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import { generateFullMatchPreview } from "@repo/ai/generators";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stageLabels: Record<string, string> = {
  group: "Fase de grupos",
  "round-of-32": "Dieciseisavos",
  "round-of-16": "Octavos de final",
  "quarter-final": "Cuartos de final",
  "semi-final": "Semifinal",
  "third-place": "Tercer puesto",
  final: "Final",
};

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];

  const homeName = home?.name ?? "Por determinar";
  const awayName = away?.name ?? "Por determinar";

  return {
    title: `Pronostico ${homeName} vs ${awayName} | Cuotas & Prediccion Mundial 2026`,
    description: `Pronostico ${homeName} vs ${awayName} Copa del Mundo 2026: cuotas estimadas, resultado predicho, analisis del partido e historial de enfrentamientos. Apuesta por ${homeName} - ${awayName} Mundial 2026.`,
    openGraph: {
      title: `${home?.flag ?? ""} Pronostico ${homeName} vs ${awayName} ${away?.flag ?? ""} | Mundial 2026`,
      description: `Cuotas, prediccion y analisis del partido ${homeName} - ${awayName}. Copa del Mundo 2026.`,
    },
    alternates: getAlternates("predictionMatch", slug, "es"),
  };
}

export default async function PronosticMatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  // Predictions
  const prediction =
    home && away
      ? matchPredictionByPair[`${home.id}:${away.id}`]
      : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;

  // Estimated odds
  const odds = prediction
    ? estimatedMatchOdds(
        prediction.team1WinProb,
        prediction.drawProb,
        prediction.team2WinProb
      )
    : null;

  // H2H
  const h2h =
    home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  // AI-enriched data
  const enriched = await generateFullMatchPreview(slug, "es", {
    includeExpert: true,
  });

  // Date formatting
  const dateFormatted = new Date(match.date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const homeName = home?.name ?? "Por determinar";
  const awayName = away?.name ?? "Por determinar";

  // Find the most likely outcome
  const outcomes = prediction
    ? [
        { key: "1", label: `Victoria ${homeName}`, prob: prediction.team1WinProb },
        { key: "X", label: "Empate", prob: prediction.drawProb },
        { key: "2", label: `Victoria ${awayName}`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));

  // Related matches (same matchday or group)
  const relatedMatches = matches.filter(
    (m) =>
      m.id !== match.id &&
      ((match.group && m.group === match.group) ||
        (match.matchday && m.matchday === match.matchday && m.stage === "group"))
  ).slice(0, 6);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Inicio",url:"/"}, {name:"Calendario",url:"/match/calendario"}, {name:"Pronostico",url:`/pronostico-partido/${match.slug}`}]} baseUrl={domains.es} />
      {/* Breadcrumb */}
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
              <Link href="/match/calendario" className="hover:text-primary">
                Calendario
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              Pronostico {homeName} vs {awayName}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-center text-sm text-gold font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Grupo ${match.group}` : ""}
            {match.matchday ? ` - Jornada ${match.matchday}` : ""}
          </p>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {home ? (
                <Link
                  href={`/equipo/${home.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {home.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">Por determinar</p>
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
              <span className="text-6xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {away ? (
                <Link
                  href={`/equipo/${away.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {away.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">Por determinar</p>
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

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1X2 Prediction */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold">
                  Pronostico 1X2: {homeName} vs {awayName}
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {outcomes.map((outcome) => {
                    const isHighlighted = outcome.prob === maxProb;
                    const pct = Math.round(outcome.prob * 100);
                    return (
                      <div
                        key={outcome.key}
                        className={`relative rounded-lg p-5 text-center transition-all ${
                          isHighlighted
                            ? "bg-accent/10 border-2 border-accent ring-2 ring-accent/20"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {isHighlighted && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                            Favorito
                          </span>
                        )}
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {outcome.key}
                        </p>
                        <p
                          className={`text-3xl font-extrabold ${
                            isHighlighted ? "text-accent" : "text-gray-700"
                          }`}
                        >
                          {pct}%
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {outcome.label}
                        </p>
                        {/* Visual bar */}
                        <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isHighlighted ? "bg-accent" : "bg-gray-400"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Resultado exacto predicho */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Resultado exacto predicho</h2>
                <div className="flex items-center justify-center gap-6 rounded-lg bg-primary/5 p-8">
                  <div className="text-center">
                    <span className="text-3xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {homeName}
                    </p>
                  </div>
                  <p className="text-5xl font-extrabold text-primary tracking-wider">
                    {prediction.predictedScore}
                  </p>
                  <div className="text-center">
                    <span className="text-3xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {awayName}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Resultado mas probable segun nuestro modelo de prediccion basado en los ratings ELO,
                  las estadisticas recientes y el historial de enfrentamientos.
                </p>
              </section>
            )}

            {/* Cuotas estimadas */}
            {odds && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Cuotas estimadas: {homeName} vs {awayName}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Cuotas decimales estimadas a partir de nuestro modelo de prediccion.
                  Compara con las ofertas de las casas de apuestas a continuacion.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="pb-3 text-left font-semibold text-gray-700">
                          Casa de apuestas
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Victoria {homeName}
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Empate
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Victoria {awayName}
                        </th>
                        <th className="pb-3 text-right font-semibold text-gray-700">
                          Bono
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* Estimated odds row */}
                      <tr className="bg-primary/5">
                        <td className="py-3 text-left font-medium text-primary">
                          Estimacion
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.home}
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.draw}
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.away}
                        </td>
                        <td className="py-3 text-right text-sm text-gray-400">
                          --
                        </td>
                      </tr>
                      {/* Bookmaker rows */}
                      {bookmakers.map((bk) => (
                        <tr
                          key={bk.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 text-left">
                            <a
                              href={bk.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="font-medium text-accent hover:underline"
                            >
                              {bk.name}
                            </a>
                            {bk.highlight && (
                              <span className="ml-2 inline-block rounded bg-gold/20 px-1.5 py-0.5 text-xs font-semibold text-gold">
                                Recomendado
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.home}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.draw}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.away}
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={bk.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="inline-block rounded bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent/90"
                            >
                              {bk.bonus}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  Cuotas estimadas, sujetas a cambios. Las cuotas reales pueden
                  variar segun las casas de apuestas.
                </p>
              </section>
            )}

            {/* Affiliate CTA Block */}
            <section className="rounded-lg bg-gradient-to-br from-accent to-accent/80 p-6 shadow-md text-white">
              <h2 className="mb-4 text-xl font-bold">
                Apostar en este partido
              </h2>
              {/* Featured bookmaker */}
              <div className="mb-6 rounded-lg bg-white/10 backdrop-blur-sm p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">{featuredBookmaker.name}</p>
                    <p className="text-sm text-white/80">
                      {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
                    </p>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: featuredBookmaker.rating }).map(
                        (_, i) => (
                          <span key={i} className="text-gold text-sm">
                            &#9733;
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <a
                    href={featuredBookmaker.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block rounded-lg bg-gold px-6 py-3 text-sm font-bold text-primary hover:bg-gold/90 transition-colors whitespace-nowrap"
                  >
                    {featuredBookmaker.name} - {featuredBookmaker.bonus} &rarr; Apostar ahora
                  </a>
                </div>
              </div>
              {/* Other bookmakers */}
              <div className="space-y-2">
                {bookmakers
                  .filter((bk) => bk.id !== featuredBookmaker.id)
                  .map((bk) => (
                    <a
                      key={bk.id}
                      href={bk.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <span className="font-semibold">{bk.name}</span>
                        <span className="ml-2 text-sm text-white/70">
                          {bk.bonus} {bk.bonusDetail}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gold">
                        Ver oferta &rarr;
                      </span>
                    </a>
                  ))}
              </div>
              <p className="mt-4 text-xs text-white/60">
                Cuotas estimadas, sujetas a cambios. Apuesta con responsabilidad. +18
              </p>
            </section>

            {/* Analisis del partido */}
            {home && away && prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Analisis del partido: {homeName} vs {awayName}
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                  <p>
                    Este partido de {stage.toLowerCase()}
                    {match.group ? ` del Grupo ${match.group}` : ""} enfrentara a{" "}
                    <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) contra{" "}
                    <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) el{" "}
                    {dateFormatted}
                    {stadium ? ` en el ${stadium.name}` : ""}.
                  </p>
                  <p>
                    Segun nuestro modelo de prediccion,{" "}
                    {prediction.team1WinProb > prediction.team2WinProb
                      ? `${homeName} es favorito con un ${Math.round(prediction.team1WinProb * 100)}% de probabilidades de victoria`
                      : prediction.team2WinProb > prediction.team1WinProb
                        ? `${awayName} es favorito con un ${Math.round(prediction.team2WinProb * 100)}% de probabilidades de victoria`
                        : "ambas selecciones estan igualadas segun nuestras estimaciones"}
                    . El resultado mas probable es{" "}
                    <strong>{prediction.predictedScore}</strong>.
                  </p>
                  {predHome && predAway && (
                    <p>
                      En terminos de rating ELO, {homeName} cuenta con una puntuacion de{" "}
                      <strong>{predHome.eloRating}</strong> frente a{" "}
                      <strong>{predAway.eloRating}</strong> de {awayName},
                      lo que supone una diferencia de{" "}
                      {Math.abs(predHome.eloRating - predAway.eloRating)} puntos
                      a favor de{" "}
                      {predHome.eloRating >= predAway.eloRating
                        ? homeName
                        : awayName}
                      .
                    </p>
                  )}
                  {home.fifaRanking < away.fifaRanking ? (
                    <p>
                      En el ranking FIFA, {homeName} ocupa el puesto{" "}
                      {home.fifaRanking}
                      <sup>o</sup> del mundo, es decir,{" "}
                      {away.fifaRanking - home.fifaRanking} posiciones por encima de{" "}
                      {awayName} ({away.fifaRanking}
                      <sup>o</sup>). Esta ventaja en la clasificacion se refleja en
                      las probabilidades de nuestro modelo.
                    </p>
                  ) : home.fifaRanking > away.fifaRanking ? (
                    <p>
                      En el ranking FIFA, {awayName} ocupa el puesto{" "}
                      {away.fifaRanking}
                      <sup>o</sup> del mundo, es decir,{" "}
                      {home.fifaRanking - away.fifaRanking} posiciones por encima de{" "}
                      {homeName} ({home.fifaRanking}
                      <sup>o</sup>). A pesar de ello, la ventaja de jugar como local podria
                      favorecer a {homeName}.
                    </p>
                  ) : null}
                  {match.stage === "group" && match.group && (
                    <p>
                      Este partido se disputa en el marco del{" "}
                      <Link
                        href={`/grupo/${match.group.toLowerCase()}`}
                        className="text-accent hover:underline"
                      >
                        Grupo {match.group}
                      </Link>{" "}
                      de la Copa del Mundo 2026. El resultado de este encuentro
                      sera determinante para la clasificacion a los dieciseisavos de final.
                    </p>
                  )}
                  {h2h && h2h.totalMatches > 0 && (
                    <p>
                      Historicamente, estas dos selecciones se han enfrentado{" "}
                      {h2h.totalMatches} veces con un balance de {h2h.team1Wins}{" "}
                      victoria{h2h.team1Wins > 1 ? "s" : ""} para {homeName},{" "}
                      {h2h.draws} empate{h2h.draws > 1 ? "s" : ""} y{" "}
                      {h2h.team2Wins} victoria{h2h.team2Wins > 1 ? "s" : ""}{" "}
                      para {awayName}.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Expert AI Analysis */}
            {enriched.expert && (
              <AiExpertInsight
                valueBets={enriched.expert.valueBets}
                matchAnalysis={enriched.expert.matchAnalysis}
                scorePrediction={enriched.expert.scorePrediction}
                keyInsight={enriched.expert.keyInsight}
              />
            )}

            {/* Historial H2H */}
            {home && away && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Historial de enfrentamientos
                </h2>
                {h2h && h2h.totalMatches > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg bg-accent/5 p-4 text-center">
                        <p className="text-3xl font-bold text-accent">
                          {h2h.team1Wins}
                        </p>
                        <p className="text-xs text-gray-500">
                          Victorias {homeName}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-3xl font-bold text-gray-600">
                          {h2h.draws}
                        </p>
                        <p className="text-xs text-gray-500">Empates</p>
                      </div>
                      <div className="rounded-lg bg-accent/5 p-4 text-center">
                        <p className="text-3xl font-bold text-accent">
                          {h2h.team2Wins}
                        </p>
                        <p className="text-xs text-gray-500">
                          Victorias {awayName}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {h2h.totalMatches}
                        </p>
                        <p className="text-xs text-gray-500">Partidos jugados</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {h2h.team1Goals} - {h2h.team2Goals}
                        </p>
                        <p className="text-xs text-gray-500">Goles anotados</p>
                      </div>
                    </div>
                    {h2h.lastMatch && (
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Ultimo partido:</span>{" "}
                        {h2h.lastMatch}
                        {h2h.lastMatchDate &&
                          ` (${new Date(h2h.lastMatchDate).toLocaleDateString(
                            "es-ES",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )})`}
                      </p>
                    )}
                    <div className="text-center">
                      <Link
                        href={`/h2h/${home.slug}-vs-${away.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Ver el historial completo de enfrentamientos &rarr;
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      {homeName} y {awayName} nunca se han enfrentado. La
                      Copa del Mundo 2026 sera su primer enfrentamiento
                      historico.
                    </p>
                    <div className="text-center">
                      <Link
                        href={`/h2h/${home.slug}-vs-${away.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        Ver la pagina de enfrentamiento &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Info del partido */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Informacion del partido</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Fecha</dt>
                  <dd className="font-semibold">{dateFormatted}</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Hora (UTC)</dt>
                  <dd className="font-semibold">{match.time}</dd>
                </div>
                {stadium && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Estadio</dt>
                    <dd>
                      <Link
                        href={`/estadio/${stadium.slug}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {stadium.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {stadium.capacity.toLocaleString("es-ES")} plazas
                      </p>
                    </dd>
                  </div>
                )}
                {city && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Ciudad</dt>
                    <dd>
                      <Link
                        href={`/ciudad/${city.slug}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {city.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {stadium?.country}
                      </p>
                    </dd>
                  </div>
                )}
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Fase</dt>
                  <dd className="font-semibold">{stage}</dd>
                </div>
                {match.group && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Grupo</dt>
                    <dd>
                      <Link
                        href={`/grupo/${match.group.toLowerCase()}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        Grupo {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.matchday && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Jornada</dt>
                    <dd className="font-semibold">Jornada {match.matchday}</dd>
                  </div>
                )}
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Match info card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Resumen del pronostico</h3>
              {prediction ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Favorito</span>
                    <span className="font-semibold">
                      {prediction.team1WinProb > prediction.team2WinProb
                        ? homeName
                        : prediction.team2WinProb > prediction.team1WinProb
                          ? awayName
                          : "Indeciso"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Resultado predicho</span>
                    <span className="font-bold text-primary">
                      {prediction.predictedScore}
                    </span>
                  </div>
                  {odds && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cuota 1</span>
                        <span className="font-semibold">{odds.home}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cuota X</span>
                        <span className="font-semibold">{odds.draw}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cuota 2</span>
                        <span className="font-semibold">{odds.away}</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Los pronosticos detallados para este partido estaran disponibles
                  proximamente.
                </p>
              )}
            </div>

            {/* Team links */}
            {home && away && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Fichas de equipos</h3>
                <div className="space-y-3">
                  <Link
                    href={`/equipo/${home.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">{home.flag}</span>
                    <span className="font-medium">{home.name}</span>
                  </Link>
                  <Link
                    href={`/equipo/${away.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">{away.flag}</span>
                    <span className="font-medium">{away.name}</span>
                  </Link>
                  <Link
                    href={`/h2h/${home.slug}-vs-${away.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">&#9878;</span>
                    <span className="font-medium">
                      H2H {home.name} vs {away.name}
                    </span>
                  </Link>
                </div>
              </div>
            )}

            {/* Stadium card */}
            {stadium && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Sede del partido</h3>
                <Link
                  href={`/estadio/${stadium.slug}`}
                  className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {stadium.capacity.toLocaleString("es-ES")} plazas &middot;{" "}
                    {stadium.city}
                  </p>
                </Link>
                {city && (
                  <Link
                    href={`/ciudad/${city.slug}`}
                    className="mt-2 block text-sm text-accent hover:underline"
                  >
                    Guia de {city.name} &rarr;
                  </Link>
                )}
              </div>
            )}

            {enriched.weather && (
              <WeatherWidget
                temperature={enriched.weather.temperature}
                condition={enriched.weather.condition}
                humidity={enriched.weather.humidity}
                windSpeed={enriched.weather.windSpeed}
              />
            )}

            {enriched.sources.hasInjuries && home && away && (
              <InjuriesWidget
                homeTeam={home.name}
                awayTeam={away.name}
                homeInjuries={enriched.injuries.home}
                awayInjuries={enriched.injuries.away}
              />
            )}

            {enriched.sources.hasLiveOdds && home && away && (
              <OddsCompare
                odds={enriched.odds}
                homeTeam={home.name}
                awayTeam={away.name}
              />
            )}

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Apostar en este partido
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
              </p>
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                Apostar en {featuredBookmaker.name} &rarr;
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">
                +18 | Apuesta con responsabilidad
              </p>
            </div>

            {/* Otros pronosticos */}
            {relatedMatches.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Otros pronosticos</h3>
                <div className="space-y-2">
                  {relatedMatches.map((rm) => {
                    const rmHome = teamsById[rm.homeTeamId];
                    const rmAway = teamsById[rm.awayTeamId];
                    return (
                      <Link
                        key={rm.id}
                        href={`/pronostico-partido/${rm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm transition-colors hover:border-accent"
                      >
                        <span>
                          {rmHome?.flag ?? "\ud83c\udff3\ufe0f"}{" "}
                          {rmHome?.name ?? "TBD"} vs{" "}
                          {rmAway?.name ?? "TBD"}{" "}
                          {rmAway?.flag ?? "\ud83c\udff3\ufe0f"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {rm.date}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Link to match page */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <Link
                href={`/match/${match.slug}`}
                className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              >
                Ver la ficha completa del partido &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD SportsEvent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${homeName} vs ${awayName} - Copa del Mundo 2026`,
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
            description: `Pronostico y cuotas para ${homeName} vs ${awayName}, ${stage} de la Copa del Mundo 2026.`,
            url: `https://mundial2026.es/pronostico-partido/${match.slug}`,
          }),
        }}
      />
    </>
  );
}
