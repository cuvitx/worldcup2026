import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { HeroImage } from "../../components/hero-image";
import { notFound } from "next/navigation";
import { stadiums, stadiumsBySlug } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stageLabels } from "@repo/data/constants";
import { BookOpen, Car, CircleDot, Map, Ticket, Tv } from "lucide-react"

export const revalidate = 86400;
export const dynamicParams = false;

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

  return (
    <>
{/* Breadcrumbs */}
{/* Header */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl"></span>
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <HeroImage
          src={`/images/stadiums/${stadium.slug}.jpg`}
          alt={`${stadium.name}, ${stadium.city}`}
          fallbackEmoji=""
          overlayContent={
            <>
              <p className="text-sm font-medium drop-shadow">{stadium.city}, {stadium.country}</p>
              <p className="text-xs text-gray-300 drop-shadow">{stadium.capacity.toLocaleString("fr-FR")} places</p>
            </>
          }
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8 min-w-0">
            <section className="rounded-xl border border-gray-200 bg-whiteslate-800 p-6 shadow-sm overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation</h2>
              <p className="text-gray-700 leading-relaxed break-words">{stadium.description}</p>
            </section>

            <section className="rounded-xl border border-gray-200 bg-whiteslate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50slate-700 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stadium.capacity.toLocaleString("fr-FR")}
                  </p>
                  <p className="text-sm text-gray-500">Capacité</p>
                </div>
                <div className="rounded-lg bg-gray-50slate-700 p-4 text-center">
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
                  <div className="rounded-lg bg-gray-50slate-700 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stadium.yearBuilt}</p>
                    <p className="text-sm text-gray-500">Année de construction</p>
                  </div>
                )}
                {stadium.distanceFromCenter && (
                  <div className="rounded-lg bg-gray-50slate-700 p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{stadium.distanceFromCenter} km</p>
                    <p className="text-sm text-gray-500">Du centre-ville</p>
                  </div>
                )}
                <div className="rounded-lg bg-gray-50slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{stadium.country}</p>
                  <p className="text-sm text-gray-500">Pays</p>
                </div>
              </div>
            </section>

            {/* Équipe résidente + GPS + Carte mini */}
            <section className="rounded-xl border border-gray-200 bg-whiteslate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Localisation &amp; équipe résidente</h2>
              <div className="space-y-4">
                {stadium.homeTeam && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5"><CircleDot className="h-5 w-5 inline-block" /></span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Équipe résidente</p>
                      <p className="text-sm font-medium text-gray-900">{stadium.homeTeam}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5"></span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Coordonnées GPS</p>
                    <p className="text-sm font-mono text-gray-900">
                      {stadium.latitude.toFixed(4)} N, {Math.abs(stadium.longitude).toFixed(4)} O
                    </p>
                  </div>
                </div>
                {stadium.distanceFromCenter && (
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5"><Car className="h-5 w-5 inline-block" /></span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Distance du centre-ville</p>
                      <p className="text-sm text-gray-900">≈ {stadium.distanceFromCenter} km</p>
                    </div>
                  </div>
                )}
                {/* Mini map link */}
                <div className="mt-4 rounded-lg bg-primary/5primary/20 border border-gray-200 p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl shrink-0"></span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-primary">Voir sur la carte des stades</p>
                        <p className="text-xs text-primary">Positionnement de tous les stades CDM 2026</p>
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
                    className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                    Ouvrir dans OpenStreetMap
                  </a>
                </div>
              </div>
            </section>

            {/* Matches at this stadium */}
            {stadiumMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-whiteslate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
                        className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-xs text-gray-500 w-12 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-base shrink-0" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? ""}</span>
                        <span className="font-medium flex-1 min-w-0 break-words text-sm">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-500 shrink-0">vs</span>
                        <span className="font-medium flex-1 min-w-0 truncate text-right text-sm">{away?.name ?? "TBD"}</span>
                        <span className="text-base shrink-0" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? ""}</span>
                        <span className="hidden sm:inline rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary shrink-0">
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
            <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Ville</dt>
                  <dd className="font-medium">
                    {city ? (
                      <Link href={`/ville/${city.slug}`} className="text-primary hover:underline">
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
                <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Équipes qui jouent ici</h3>
                  <ul className="space-y-2 text-sm">
                    {playingTeams.map((t) => (
                      <li key={t.id}>
                        <Link
                          href={`/equipe/${t.slug}`}
                          className="flex items-center gap-2 hover:text-primary transition-colors"
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

            {/* Useful links */}
            <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                {city && (
                  <li>
                    <Link href={`/guide-ville/${city.slug}`} className="text-primary hover:underline">
                      <BookOpen className="h-5 w-5 inline-block" /> Guide de {city.name}
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/carte-stades" className="text-primary hover:underline">
                    <Map className="h-5 w-5 inline-block" /> Carte des stades
                  </Link>
                </li>
                <li>
                  <Link href="/billets" className="text-primary hover:underline">
                    <Ticket className="h-5 w-5 inline-block" /> Acheter des billets
                  </Link>
                </li>
                <li>
                  <Link href="/ou-regarder" className="text-primary hover:underline">
                    <Tv className="h-5 w-5 inline-block" /> Où regarder les matchs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Other stadiums */}
            <div className="rounded-xl border border-gray-200 bg-whiteslate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres stades</h3>
              <ul className="space-y-2 text-sm">
                {stadiums
                  .filter((s) => s.id !== stadium.id)
                  .slice(0, 5)
                  .map((s) => (
                    <li key={s.id}>
                      <Link href={`/stade/${s.slug}`} className="text-primary hover:underline">
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
