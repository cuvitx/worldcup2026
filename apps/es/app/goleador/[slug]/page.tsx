import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
import { scorerOddsById, topScorerRanking } from "@repo/data/scorers";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { predictionsByTeamId } from "@repo/data/predictions";
import { getAlternates } from "@repo/data/route-mapping";

import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const revalidate = 3600;

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
    title: `Cuota goleador ${player.name} Mundial 2026 | Goles, stats y pronostico`,
    description: `Cuota goleador ${player.name} (${team?.name}) para el Mundial 2026. ${player.goals} goles en ${player.caps} partidos internacionales, probabilidades de goles, cuotas anytime scorer y maximo goleador.`,
    openGraph: {
      title: `${team?.flag ?? ""} Cuota goleador ${player.name} - Mundial 2026`,
      description: `Stats y cuotas de goleador de ${player.name} para el Mundial 2026.`,
    },
    alternates: getAlternates("scorer", slug, "es"),
  };
}

export default async function GoleadorPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player || (player.position !== "FW" && player.position !== "MF")) notFound();

  const team = teamsById[player.teamId];
  const scorer = scorerOddsById[player.id];
  const teamPred = team ? predictionsByTeamId[team.id] : undefined;
  const teammates = (team ? playersByTeamId[team.id] ?? [] : [])
    .filter((p) => p.id !== player.id && (p.position === "FW" || p.position === "MF"));

  const positionLabel = player.position === "FW" ? "Delantero" : "Centrocampista";
  const goalsPerCap = player.caps > 0 ? (player.goals / player.caps).toFixed(3) : "0";

  // Find rank in top scorer ranking
  const topRank = topScorerRanking.findIndex((s) => s.playerId === player.id);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Inicio",url:"/"}, {name:"Goleadores",url:"/goleadores"}, {name:player.name,url:`/goleador/${player.slug}`}]} baseUrl={domains.es} />
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/goleadores" className="hover:text-primary">Goleadores</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{player.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6">
            <span className="text-7xl">{team?.flag ?? "\u26bd"}</span>
            <div>
              <h1 className="text-4xl font-extrabold">
                Cuota goleador {player.name}
              </h1>
              <p className="mt-2 text-xl text-gray-300">
                {positionLabel} &middot; {player.club}
              </p>
              <p className="mt-1 text-gray-400">
                {team?.name} &middot; {player.caps} partidos intl. &middot; {player.goals} goles
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scoring Stats */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Estadisticas de goles</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.goals}</p>
                  <p className="text-xs text-gray-500 mt-1">Goles internacionales</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.caps}</p>
                  <p className="text-xs text-gray-500 mt-1">Partidos intl.</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{goalsPerCap}</p>
                  <p className="text-xs text-gray-500 mt-1">Goles/partido</p>
                </div>
                <div className="rounded-lg bg-gold/10 p-4 text-center">
                  <p className="text-3xl font-extrabold text-gold">{scorer?.expectedGoals ?? "—"}</p>
                  <p className="text-xs text-gray-500 mt-1">Goles esperados Mundial</p>
                </div>
              </div>
              {scorer && (
                <p className="mt-4 text-sm text-gray-600">
                  Con un ratio de {goalsPerCap} goles por partido internacional y un equipo capaz de avanzar
                  varias rondas, {player.name} tiene una esperanza de <strong>{scorer.expectedGoals} goles</strong> durante
                  el Mundial 2026 segun nuestro modelo de Poisson.
                </p>
              )}
            </section>

            {/* Odds Table */}
            {scorer && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Tabla de cuotas - {player.name}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="pb-3 font-medium text-gray-500">Mercado</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Probabilidad</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Cuota estimada</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 font-medium">Goleador en cualquier momento (1+ gol)</td>
                        <td className="py-3 text-right">{(scorer.anytimeScorerProb * 100).toFixed(1)}%</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over05GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 font-medium">2+ goles en el torneo</td>
                        <td className="py-3 text-right">—</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over15GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 font-medium">3+ goles en el torneo</td>
                        <td className="py-3 text-right">—</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over25GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gold/5">
                        <td className="py-3 font-bold">Maximo goleador Mundial 2026</td>
                        <td className="py-3 text-right">{(scorer.topScorerProb * 100).toFixed(2)}%</td>
                        <td className="py-3 text-right font-extrabold text-gold">{scorer.topScorerOdds}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Las cuotas son estimadas por nuestro modelo estadistico (distribucion de Poisson + rating ELO) con
                  un margen de casa de apuestas de ~8%. Son indicativas.
                </p>
              </section>
            )}

            {/* Analysis Text */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Analisis: {player.name} goleador Mundial 2026</h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
                <p>
                  {player.name} ({player.age} anos) juega como {positionLabel.toLowerCase()} en {player.club} y
                  cuenta con {player.goals} goles en {player.caps} partidos internacionales con {team?.name ?? "su seleccion"}.
                </p>
                {team && teamPred && (
                  <p>
                    {team.name} ocupa el puesto #{team.fifaRanking} en el ranking FIFA y tiene un{" "}
                    {(teamPred.winnerProb * 100).toFixed(1)}% de probabilidades de ganar el torneo segun nuestro modelo ELO.
                    Cuanto mas avance el equipo en la competicion, mas partidos tendra {player.name} para marcar.
                  </p>
                )}
                {scorer && scorer.expectedGoals >= 2 && (
                  <p>
                    Con <strong>{scorer.expectedGoals} goles esperados</strong>, {player.name} es uno de los goleadores mas
                    peligrosos del torneo. La cuota de goleador en cualquier momento de {scorer.anytimeScorerOdds} refleja una probabilidad
                    alta de marcar al menos un gol durante el Mundial.
                  </p>
                )}
                {scorer && scorer.expectedGoals < 2 && scorer.expectedGoals >= 0.5 && (
                  <p>
                    Con {scorer.expectedGoals} goles esperados, {player.name} tiene un perfil de goleador ocasional durante
                    el torneo. La cuota de {scorer.anytimeScorerOdds} puede representar valor si el jugador esta en
                    buena forma en el momento del torneo.
                  </p>
                )}
                <p>
                  Para apostar por {player.name} como goleador, compara las cuotas en las diferentes casas de apuestas.
                  Las cuotas reales pueden ofrecer valor respecto a nuestras estimaciones.
                </p>
              </div>
            </section>

            {/* Teammates */}
            {teammates.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Otros goleadores de {team?.name}</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {teammates.map((tm) => {
                    const tmScorer = scorerOddsById[tm.id];
                    return (
                      <Link
                        key={tm.id}
                        href={`/goleador/${tm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                      >
                        <div>
                          <p className="font-semibold">{tm.name}</p>
                          <p className="text-xs text-gray-500">{tm.position === "FW" ? "Delantero" : "Centrocampista"} &middot; {tm.club}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{tmScorer?.expectedGoals ?? "—"} goles esp.</p>
                          <p className="text-xs text-gray-400">Cuota {tmScorer?.anytimeScorerOdds ?? "—"}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Affiliate CTA */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold text-primary">
                Apostar por {player.name} goleador
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Compara las mejores casas de apuestas deportivas para apostar por {player.name} como goleador en el Mundial 2026.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-gold bg-gold/5" : "border-gray-200 bg-white"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white">
                          Recomendado
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
                          rel="noopener noreferrer sponsored"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured ? "bg-gold hover:bg-gold/90" : "bg-accent hover:bg-accent/90"
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
                18+. Los juegos de azar conllevan riesgos. Juega responsablemente. 900 200 225.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Ficha del goleador</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Posicion</dt>
                  <dd className="font-medium">{positionLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Club</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Edad</dt>
                  <dd className="font-medium">{player.age} anos</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Partidos intl.</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Goles</dt>
                  <dd className="font-bold text-primary">{player.goals}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ratio goles/partido</dt>
                  <dd className="font-bold text-primary">{goalsPerCap}</dd>
                </div>
                {scorer && (
                  <>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <dt className="text-gray-500">Goles esperados Mundial</dt>
                      <dd className="font-bold text-gold">{scorer.expectedGoals}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Cuota goleador</dt>
                      <dd className="font-bold text-field">{scorer.anytimeScorerOdds}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Cuota max. goleador</dt>
                      <dd className="font-bold text-gold">{scorer.topScorerOdds}</dd>
                    </div>
                  </>
                )}
                {topRank >= 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Ranking goleador</dt>
                    <dd className="font-bold text-gold">#{topRank + 1}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 space-y-2">
                <Link
                  href={`/jugador/${player.slug}`}
                  className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Ficha completa del jugador &rarr;
                </Link>
                {team && (
                  <Link
                    href={`/equipo/${team.slug}`}
                    className="block w-full text-center rounded-lg border border-primary py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    {team.flag} Ficha {team.name} &rarr;
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Apostar por {player.name}
              </h3>
              {scorer && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cuota goleador</span>
                    <span className="font-bold text-field">{scorer.anytimeScorerOdds}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Goles esperados</span>
                    <span className="font-bold text-gold">{scorer.expectedGoals}</span>
                  </div>
                </div>
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

            {/* Guide link */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Guias apuestas goleadores</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guia/parier-buteurs" className="text-accent hover:underline">
                    Como apostar a los goleadores del Mundial 2026 &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/guia/comment-parier-cdm-2026" className="text-accent hover:underline">
                    Guia completa para apostar en el Mundial &rarr;
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
            description: `Cuota goleador ${player.name} para el Mundial 2026. ${player.goals} goles en ${player.caps} partidos internacionales.`,
            url: `https://mundial2026.es/goleador/${player.slug}`,
          }),
        }}
      />
    </>
  );
}
