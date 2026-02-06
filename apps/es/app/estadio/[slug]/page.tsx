import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stadiums, stadiumsBySlug } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return stadiums.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) return {};

  return {
    title: `${stadium.name} - Estadio Copa del Mundo 2026 | ${stadium.city}`,
    description: `Guia completa del ${stadium.name} en ${stadium.city} para la Copa del Mundo 2026. Capacidad ${stadium.capacity.toLocaleString("es-ES")} plazas. ${stadium.description}`,
  };
}

export default async function StadiumPage({ params }: PageProps) {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) notFound();

  const city = citiesById[stadium.cityId];
  const stadiumMatches = matchesByStadium[stadium.id] ?? [];

  const stageLabels: Record<string, string> = {
    group: "Fase de grupos",
    "round-of-32": "Dieciseisavos de final",
    "round-of-16": "Octavos de final",
    "quarter-final": "Cuartos de final",
    "semi-final": "Semifinal",
    "third-place": "Tercer puesto",
    final: "Final",
  };

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/estadios" className="hover:text-primary">Estadios</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{stadium.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">{stadium.name}</h1>
          <p className="mt-2 text-gray-300">
            {stadium.city}, {stadium.country} &middot;{" "}
            {stadium.capacity.toLocaleString("es-ES")} plazas
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Presentacion</h2>
              <p className="text-gray-700 leading-relaxed">{stadium.description}</p>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Caracteristicas</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stadium.capacity.toLocaleString("es-ES")}
                  </p>
                  <p className="text-sm text-gray-500">Capacidad</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary capitalize">
                    {stadium.roofType === "retractable"
                      ? "Retractil"
                      : stadium.roofType === "fixed"
                        ? "Fijo"
                        : "Abierto"}
                  </p>
                  <p className="text-sm text-gray-500">Techo</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{stadium.country}</p>
                  <p className="text-sm text-gray-500">Pais</p>
                </div>
              </div>
            </section>

            {/* Matches at this stadium */}
            {stadiumMatches.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Partidos en el {stadium.name} ({stadiumMatches.length})
                </h2>
                <div className="space-y-2">
                  {stadiumMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                      >
                        <span className="text-xs text-gray-500 w-16 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-lg">{home?.flag ?? "🏳️"}</span>
                        <span className="font-medium flex-1">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-400">vs</span>
                        <span className="font-medium flex-1 text-right">{away?.name ?? "TBD"}</span>
                        <span className="text-lg">{away?.flag ?? "🏳️"}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0">
                          {stageLabels[match.stage] ?? match.stage}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Informacion</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ciudad</dt>
                  <dd className="font-medium">
                    {city ? (
                      <Link href={`/ciudad/${city.slug}`} className="text-accent hover:underline">
                        {stadium.city}
                      </Link>
                    ) : (
                      stadium.city
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pais</dt>
                  <dd className="font-medium">{stadium.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Capacidad</dt>
                  <dd className="font-medium">{stadium.capacity.toLocaleString("es-ES")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Techo</dt>
                  <dd className="font-medium capitalize">
                    {stadium.roofType === "retractable"
                      ? "Retractil"
                      : stadium.roofType === "fixed"
                        ? "Fijo"
                        : "Abierto"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Other stadiums */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Otros estadios</h3>
              <ul className="space-y-2 text-sm">
                {stadiums
                  .filter((s) => s.id !== stadium.id)
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.id}>
                      <Link href={`/estadio/${s.slug}`} className="hover:text-accent">
                        {s.name} ({s.city})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "StadiumOrArena",
            name: stadium.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: stadium.city,
              addressCountry: stadium.country,
            },
            maximumAttendeeCapacity: stadium.capacity,
            geo: {
              "@type": "GeoCoordinates",
              latitude: stadium.latitude,
              longitude: stadium.longitude,
            },
          }),
        }}
      />
    </>
  );
}
