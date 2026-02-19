import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { HeroImage } from "../../components/hero-image";
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
    openGraph: {
      title: `${stadium.name} — CDM 2026`,
      description: `${stadium.city}, ${stadium.country} · ${stadium.capacity.toLocaleString("fr-FR")} places`,
      images: [
        {
          url: `https://cdm2026.fr/images/stadiums/${stadium.slug}.jpg`,
          width: 1280,
          height: 720,
          alt: `${stadium.name}, ${stadium.city}`,
        },
      ],
    },
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
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      {/* Stadium hero image */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <HeroImage
          src={`/images/stadiums/${stadium.slug}.jpg`}
          alt={`${stadium.name}, ${stadium.city}`}
          fallbackEmoji="🏟️"
          overlayContent={
            <>
              <p className="text-sm font-medium drop-shadow">{stadium.city}, {stadium.country}</p>
              <p className="text-xs text-gray-300 drop-shadow">{stadium.capacity.toLocaleString("fr-FR")} places</p>
            </>
          }
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
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
                {stadium.yearBuilt && (
                  <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stadium.yearBuilt}</p>
                    <p className="text-sm text-gray-500">Année de construction</p>
                  </div>
                )}
                {stadium.distanceFromCenter && (
                  <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stadium.distanceFromCenter} km</p>
                    <p className="text-sm text-gray-500">Du centre-ville</p>
                  </div>
                )}
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{stadium.country}</p>
                  <p className="text-sm text-gray-500">Pays</p>
                </div>
              </div>
            </section>

            {/* Équipe résidente + GPS + Carte mini */}
            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Localisation &amp; équipe résidente</h2>
              <div className="space-y-4">
                {stadium.homeTeam && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🏈</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-0.5">Équipe résidente</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{stadium.homeTeam}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">📍</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-0.5">Coordonnées GPS</p>
                    <p className="text-sm font-mono text-gray-900 dark:text-white">
                      {stadium.latitude.toFixed(4)}° N, {Math.abs(stadium.longitude).toFixed(4)}° O
                    </p>
                  </div>
                </div>
                {stadium.distanceFromCenter && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">🚗</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-0.5">Distance du centre-ville</p>
                      <p className="text-sm text-gray-900 dark:text-white">≈ {stadium.distanceFromCenter} km</p>
                    </div>
                  </div>
                )}
                {/* Mini map link */}
                <div className="mt-4 rounded-lg bg-primary/5 dark:bg-primary/20 border border-gray-200 dark:border-slate-700 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🗺️</span>
                      <div>
                        <p className="text-sm font-semibold text-primary dark:text-gray-200">Voir sur la carte des stades</p>
                        <p className="text-xs text-primary dark:text-secondary">Positionnement de tous les stades CDM 2026</p>
                      </div>
                    </div>
                    <Link
                      href={`/carte-stades#${stadium.slug}`}
                      className="shrink-0 rounded-lg bg-primary hover:bg-primary/80 text-white text-sm font-medium px-4 py-2 transition-colors"
                    >
                      Voir la carte →
                    </Link>
                  </div>
                </div>
                {/* External map link */}
                <div className="mt-2">
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${stadium.latitude}&mlon=${stadium.longitude}&zoom=15`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                  >
                    <span>🔗</span>
                    Ouvrir dans OpenStreetMap
                  </a>
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
                        <span className="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary shrink-0">
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
                {stadium.yearBuilt && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Construction</dt>
                    <dd className="font-medium">{stadium.yearBuilt}</dd>
                  </div>
                )}
                {stadium.distanceFromCenter && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Distance centre</dt>
                    <dd className="font-medium">≈ {stadium.distanceFromCenter} km</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-500">GPS</dt>
                  <dd className="font-mono text-xs text-right">
                    {stadium.latitude.toFixed(4)}, {stadium.longitude.toFixed(4)}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Teams playing at this stadium */}
            {(() => {
              const playingTeams = [
                ...new Map(
                  stadiumMatches.flatMap((m) => [
                    [m.homeTeamId, teamsById[m.homeTeamId]],
                    [m.awayTeamId, teamsById[m.awayTeamId]],
                  ])
                ).entries(),
              ]
                .map(([, t]) => t)
                .filter((t): t is NonNullable<typeof t> => t != null);
              if (playingTeams.length === 0) return null;
              return (
                <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h3 className="mb-4 text-lg font-bold">Équipes qui jouent ici</h3>
                  <ul className="space-y-2 text-sm">
                    {playingTeams.map((t) => (
                      <li key={t.id}>
                        <Link
                          href={`/equipe/${t.slug}`}
                          className="flex items-center gap-2 hover:text-accent transition-colors"
                        >
                          <span role="img" aria-label={`Drapeau de ${t.name}`}>{t.flag}</span>
                          <span>{t.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}

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
