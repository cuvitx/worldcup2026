import { StadiumImage } from "../../components/stadium-image";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { stadiums, stadiumsBySlug } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

export const revalidate = 86400;

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
    title: `${stadium.name} - Stade Coupe du Monde 2026 | ${stadium.city}`,
    description: `Guide complet du ${stadium.name} à ${stadium.city} pour la Coupe du Monde 2026. Capacité ${stadium.capacity.toLocaleString("fr-FR")} places. ${stadium.description}`,
    alternates: getAlternates("stadium", slug, "fr"),
  };
}

export default async function StadiumPage({ params }: PageProps) {
  const { slug } = await params;
  const stadium = stadiumsBySlug[slug];
  if (!stadium) notFound();

  const city = citiesById[stadium.cityId];
  const stadiumMatches = matchesByStadium[stadium.id] ?? [];

  const stageLabels: Record<string, string> = {
    group: "Phase de groupes",
    "round-of-32": "32e de finale",
    "round-of-16": "8e de finale",
    "quarter-final": "Quart de finale",
    "semi-final": "Demi-finale",
    "third-place": "3e place",
    final: "Finale",
  };

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Stades",url:"/stades"},{name:stadium.name,url:"/stade/"+stadium.slug}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/stades" className="hover:text-primary">Stades</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{stadium.name}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl">🏟️</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">{stadium.name}</h1>
              <p className="mt-2 text-gray-300">
                {stadium.city}, {stadium.country} &middot;{" "}
                {stadium.capacity.toLocaleString("fr-FR")} places
              </p>
              <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                {stadium.roofType === "retractable" ? "Toit rétractable" : stadium.roofType === "fixed" ? "Toit fixe" : "Toit ouvert"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stadium image */}
      <div className="mx-auto max-w-7xl px-4 mt-8">
        <StadiumImage
          slug={stadium.slug}
          name={stadium.name}
          city={stadium.city}
          className="w-full h-auto rounded-lg shadow-md object-cover max-h-[400px]"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Présentation</h2>
              <p className="text-gray-700 leading-relaxed">{stadium.description}</p>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Caractéristiques</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stadium.capacity.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-sm text-gray-500">Capacité</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary capitalize">
                    {stadium.roofType === "retractable"
                      ? "Rétractable"
                      : stadium.roofType === "fixed"
                        ? "Fixe"
                        : "Ouvert"}
                  </p>
                  <p className="text-sm text-gray-500">Toit</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{stadium.country}</p>
                  <p className="text-sm text-gray-500">Pays</p>
                </div>
              </div>
            </section>

            {/* Matches at this stadium */}
            {stadiumMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Matchs au {stadium.name} ({stadiumMatches.length})
                </h2>
                <div className="space-y-2">
                  {stadiumMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                      >
                        <span className="text-xs text-gray-500 w-16 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-lg" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? "🏳️"}</span>
                        <span className="font-medium flex-1">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-500">vs</span>
                        <span className="font-medium flex-1 text-right">{away?.name ?? "TBD"}</span>
                        <span className="text-lg" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? "🏳️"}</span>
                        <span className="rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 shrink-0">
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
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Informations</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ville</dt>
                  <dd className="font-medium">
                    {city ? (
                      <Link href={`/ville/${city.slug}`} className="text-accent hover:underline">
                        {stadium.city}
                      </Link>
                    ) : (
                      stadium.city
                    )}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pays</dt>
                  <dd className="font-medium">{stadium.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Capacité</dt>
                  <dd className="font-medium">{stadium.capacity.toLocaleString("fr-FR")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Toit</dt>
                  <dd className="font-medium capitalize">
                    {stadium.roofType === "retractable"
                      ? "Rétractable"
                      : stadium.roofType === "fixed"
                        ? "Fixe"
                        : "Ouvert"}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Other stadiums */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Autres stades</h3>
              <ul className="space-y-2 text-sm">
                {stadiums
                  .filter((s) => s.id !== stadium.id)
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.id}>
                      <Link href={`/stade/${s.slug}`} className="hover:text-accent">
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
