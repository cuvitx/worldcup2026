import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

const stageLabels: Record<string, string> = {
  group: "Fase de grupos",
  "round-of-32": "Dieciseisavos de final",
  "round-of-16": "Octavos de final",
  "quarter-final": "Cuartos de final",
  "semi-final": "Semifinal",
  "third-place": "Tercer puesto",
  final: "Final",
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

  const homeName = home?.name ?? "Por determinar";
  const awayName = away?.name ?? "Por determinar";

  return {
    title: `${homeName} vs ${awayName} - ${stage} | Mundial 2026`,
    description: `${homeName} contra ${awayName}, ${stage} de la Copa del Mundo 2026. El ${new Date(match.date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })} en el ${stadium?.name ?? "estadio por confirmar"}.`,
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""}`,
      description: `${stage} - Mundial 2026 | ${match.date} ${match.time} UTC`,
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

  const dateFormatted = new Date(match.date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
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
              {home?.name ?? "TBD"} vs {away?.name ?? "TBD"}
            </li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-sm text-gold font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Grupo ${match.group}` : ""}
          </p>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl">{home?.flag ?? "🏳️"}</span>
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
              <span className="text-6xl">{away?.flag ?? "🏳️"}</span>
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

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {home && away && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Comparacion</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="pb-3 text-left font-medium text-accent">
                          {home.name}
                        </th>
                        <th className="pb-3 text-center font-medium text-gray-500">
                          Criterio
                        </th>
                        <th className="pb-3 text-right font-medium text-accent">
                          {away.name}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        {
                          label: "Ranking FIFA",
                          v1: `#${home.fifaRanking}`,
                          v2: `#${away.fifaRanking}`,
                        },
                        {
                          label: "Confederacion",
                          v1: home.confederation,
                          v2: away.confederation,
                        },
                        {
                          label: "Participaciones Mundial",
                          v1: String(home.wcAppearances),
                          v2: String(away.wcAppearances),
                        },
                        {
                          label: "Mejor resultado",
                          v1: home.bestResult,
                          v2: away.bestResult,
                        },
                      ].map((row) => (
                        <tr key={row.label}>
                          <td className="py-3 text-left font-medium">
                            {row.v1}
                          </td>
                          <td className="py-3 text-center text-gray-500">
                            {row.label}
                          </td>
                          <td className="py-3 text-right font-medium">
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
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Ver el historial completo de enfrentamientos &rarr;
                  </Link>
                </div>
              </section>
            )}

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Pronostico</h2>
              <p className="text-gray-600">
                Nuestro algoritmo de prediccion analizara las probabilidades de cada
                equipo. Los pronosticos detallados estaran disponibles a medida que
                se acerque el partido.
              </p>
            </section>
          </div>

          <div className="space-y-6">
            {stadium && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Lugar del partido</h3>
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

            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Info del partido</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Fase</dt>
                  <dd className="font-medium">{stage}</dd>
                </div>
                {match.group && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Grupo</dt>
                    <dd className="font-medium">
                      <Link
                        href={`/grupo/${match.group.toLowerCase()}`}
                        className="text-accent hover:underline"
                      >
                        Grupo {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.matchday && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Jornada</dt>
                    <dd className="font-medium">J{match.matchday}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">Fecha</dt>
                  <dd className="font-medium">{match.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Hora (UTC)</dt>
                  <dd className="font-medium">{match.time}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Cuotas del partido
              </h3>
              <p className="text-sm text-gray-600">
                Las cuotas de las casas de apuestas para este partido estaran disponibles
                proximamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${home?.name ?? "TBD"} vs ${away?.name ?? "TBD"} - Copa del Mundo 2026`,
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
          }),
        }}
      />
    </>
  );
}
