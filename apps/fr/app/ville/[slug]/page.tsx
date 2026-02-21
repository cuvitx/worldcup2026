import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, citiesBySlug } from "@repo/data/cities";
import { stadiumsById } from "@repo/data/stadiums";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stageLabels } from "@repo/data/constants";
import { HeroImage } from "../../components/hero-image";
import { cityEnrichmentData } from "./city-enrichment";
import { BookOpen, Building2, Globe, Ticket, Tv } from "lucide-react"

export const revalidate = 86400;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};

  return {
    title: `${city.name} - Ville hôte Coupe du Monde 2026 | Guide complet`,
    description: `Guide complet de ${city.name} pour la Coupe du Monde 2026. Hôtels, transports, stades et activités. ${city.description}`,
    alternates: getAlternates("city", slug, "fr"),
  };
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();

  const cityStadiums = city.stadiumIds
    .map((id) => stadiumsById[id])
    .filter((s): s is NonNullable<typeof s> => s != null);

  // All matches in this city (across all stadiums)
  const cityMatches = cityStadiums
    .flatMap((s) => matchesByStadium[s.id] ?? [])
    .sort((a, b) => a.date.localeCompare(b.date));

  const enrichment = cityEnrichmentData[slug];

  return (
    <>
{/* Hero image */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <HeroImage
          src={`/images/cities/${slug}.jpg`}
          alt={city.name}
          fallbackEmoji=""
          overlayContent={
            <>
              <h1 className="text-2xl font-extrabold sm:text-4xl drop-shadow">{city.name}</h1>
              <p className="mt-1 text-sm text-gray-200 drop-shadow">
                {city.state}, {city.country} &middot; Ville hôte CDM 2026
              </p>
            </>
          }
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Présentation</h2>
              <p className="text-gray-700 leading-relaxed break-words">{city.description}</p>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {cityStadiums.length > 1 ? "Stades" : "Stade"} de la Coupe du Monde
              </h2>
              <div className="space-y-4">
                {cityStadiums.map((stadium) => (
                  <Link
                    key={stadium.id}
                    href={`/stade/${stadium.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div>
                      <p className="font-semibold">{stadium.name}</p>
                      <p className="text-sm text-gray-500">
                        {stadium.capacity.toLocaleString("fr-FR")} places &middot;
                        Toit {stadium.roofType === "retractable" ? "rétractable" : stadium.roofType === "fixed" ? "fixe" : "ouvert"}
                      </p>
                    </div>
                    <span className="text-primary">&rarr;</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Matches in this city */}
            {cityMatches.length > 0 && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Matchs à {city.name} ({cityMatches.length})
                </h2>
                <div className="space-y-2">
                  {cityMatches.map((match) => {
                    const home = teamsById[match.homeTeamId];
                    const away = teamsById[match.awayTeamId];
                    return (
                      <Link
                        key={match.id}
                        href={`/match/${match.slug}`}
                        className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-xs text-gray-500 w-12 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-base shrink-0" role="img" aria-label={home?.name ?? "Inconnu"}>{home?.flag ?? ""}</span>
                        <span className="font-medium flex-1 min-w-0 truncate text-sm">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-500 shrink-0">vs</span>
                        <span className="font-medium flex-1 min-w-0 truncate text-right text-sm">{away?.name ?? "TBD"}</span>
                        <span className="text-base shrink-0" role="img" aria-label={away?.name ?? "Inconnu"}>{away?.flag ?? ""}</span>
                        <span className="hidden sm:inline rounded-full px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary shrink-0">
                          {stageLabels[match.stage] ?? match.stage}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Enriched sections */}
            {enrichment && (
              <>
                {/* Météo */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/></svg> Météo en juin-juillet
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-primary/5 p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Juin</p>
                      <p className="text-2xl font-bold text-accent">
                        {enrichment.weather.juinMin} – {enrichment.weather.juinMax}C
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary/10 p-4 text-center">
                      <p className="text-xs text-gray-500 mb-1">Juillet</p>
                      <p className="text-2xl font-bold text-secondary">
                        {enrichment.weather.juilletMin} – {enrichment.weather.juilletMax}C
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">{enrichment.weather.description}</p>
                </section>

                {/* Transport */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                    Comment s&apos;y rendre
                  </h2>
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg> Aéroport principal</p>
                    <p className="text-sm text-gray-700">{enrichment.transport.aeroport}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block shrink-0"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg> Transports locaux</p>
                    <ul className="space-y-1">
                      {enrichment.transport.transports.map((t, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent mt-0.5 shrink-0"><path d="M20 6 9 17l-5-5"/></svg>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Budget */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                     Budget moyen
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="rounded-lg bg-gray-50 p-3 sm:p-4 text-center">
                      <p className="text-lg font-bold text-primary">
                        {enrichment.budget.hotelMin}–{enrichment.budget.hotelMax}
                        <span className="text-xs font-normal ml-1">{enrichment.budget.currency}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Hôtel / nuit</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 sm:p-4 text-center">
                      <p className="text-lg font-bold text-primary">
                        ~{enrichment.budget.repas}
                        <span className="text-xs font-normal ml-1">{enrichment.budget.currency}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Repas moyen</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 sm:p-4 text-center">
                      <p className="text-lg font-bold text-primary">
                        ~{enrichment.budget.biere}
                        <span className="text-xs font-normal ml-1">{enrichment.budget.currency}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Bière (50cl)</p>
                    </div>
                  </div>
                </section>

                {/* Activités */}
                <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                     Que faire en dehors des matchs
                  </h2>
                  <div className="space-y-4">
                    {enrichment.activities.map((activity, i) => (
                      <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                        <p className="font-semibold text-gray-900 mb-1">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Informations pratiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {(city.population / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-500">Population metro</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{city.timezone.split("/").pop()?.replace(/_/g, " ")}</p>
                  <p className="text-sm text-gray-500">Fuseau horaire</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiche ville</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pays</dt>
                  <dd className="font-medium">{city.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">État / Province</dt>
                  <dd className="font-medium">{city.state}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Population</dt>
                  <dd className="font-medium">{city.population.toLocaleString("fr-FR")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Fuseau horaire</dt>
                  <dd className="font-medium">{city.timezone}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres villes hôtes</h3>
              <ul className="space-y-2 text-sm">
                {cities
                  .filter((c) => c.id !== city.id)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={`/ville/${c.slug}`} className="text-primary hover:underline">
                        {c.name} ({c.country})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Hôtels à {city.name}</h3>
              <p className="text-sm text-gray-600">
                Trouvez les meilleurs hôtels près des stades pour la Coupe du Monde 2026.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={`/guide-ville/${city.slug}`} className="text-primary hover:underline">
                    <BookOpen className="h-5 w-5 inline-block" /> Guide complet de {city.name}
                  </Link>
                </li>
                <li>
                  <Link href="/villes" className="text-primary hover:underline">
                    <Building2 className="h-5 w-5 inline-block" /> Toutes les villes hôtes
                  </Link>
                </li>
                <li>
                  <Link href="/pays-hotes" className="text-primary hover:underline">
                    <Globe className="h-5 w-5 inline-block" /> Les 3 pays hôtes
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
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            name: city.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressRegion: city.state,
              addressCountry: city.country,
            },
          }),
        }}
      />
    </>
  );
}
