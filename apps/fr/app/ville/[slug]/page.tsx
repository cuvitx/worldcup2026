import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
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
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Villes",url:"/villes"},{name:city.name,url:"/ville/"+city.slug}]} baseUrl={domains.fr} />
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/villes" className="text-primary dark:text-secondary hover:underline">Villes</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{city.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero image */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <HeroImage
          src={`/images/cities/${slug}.jpg`}
          alt={city.name}
          fallbackEmoji="🏙"
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
            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Présentation</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words">{city.description}</p>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {cityStadiums.length > 1 ? "Stades" : "Stade"} de la Coupe du Monde
              </h2>
              <div className="space-y-4">
                {cityStadiums.map((stadium) => (
                  <Link
                    key={stadium.id}
                    href={`/stade/${stadium.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-slate-700 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
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
              <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
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
                        className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-xs text-gray-500 w-12 shrink-0">{match.date.slice(5)}</span>
                        <span className="text-base shrink-0" role="img" aria-label={home?.name ?? "Inconnu"}>{home?.flag ?? "🏳"}</span>
                        <span className="font-medium flex-1 min-w-0 truncate text-sm">{home?.name ?? "TBD"}</span>
                        <span className="text-xs text-gray-500 shrink-0">vs</span>
                        <span className="font-medium flex-1 min-w-0 truncate text-right text-sm">{away?.name ?? "TBD"}</span>
                        <span className="text-base shrink-0" role="img" aria-label={away?.name ?? "Inconnu"}>{away?.flag ?? "🏳"}</span>
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
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    🌤 Météo en juin-juillet
                  </h2>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="rounded-lg bg-primary/5 dark:bg-primary/20 p-4 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Juin</p>
                      <p className="text-2xl font-bold text-accent dark:text-secondary">
                        {enrichment.weather.juinMin} – {enrichment.weather.juinMax}C
                      </p>
                    </div>
                    <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 p-4 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-300 mb-1">Juillet</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {enrichment.weather.juilletMin} – {enrichment.weather.juilletMax}C
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">{enrichment.weather.description}</p>
                </section>

                {/* Transport */}
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    🚗 Comment s'y rendre
                  </h2>
                  <div className="mb-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300 mb-1">✈ Aéroport principal</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{enrichment.transport.aeroport}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-300 mb-2">🚌 Transports locaux</p>
                    <ul className="space-y-1">
                      {enrichment.transport.transports.map((t, i) => (
                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <span className="text-accent mt-0.5">✓</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Budget */}
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                     Budget moyen
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 sm:p-4 text-center">
                      <p className="text-lg font-bold text-primary">
                        {enrichment.budget.hotelMin}–{enrichment.budget.hotelMax}
                        <span className="text-xs font-normal ml-1">{enrichment.budget.currency}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Hôtel / nuit</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 sm:p-4 text-center">
                      <p className="text-lg font-bold text-primary">
                        ~{enrichment.budget.repas}
                        <span className="text-xs font-normal ml-1">{enrichment.budget.currency}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Repas moyen</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 sm:p-4 text-center">
                      <p className="text-lg font-bold text-primary">
                        ~{enrichment.budget.biere}
                        <span className="text-xs font-normal ml-1">{enrichment.budget.currency}</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">Bière (50cl)</p>
                    </div>
                  </div>
                </section>

                {/* Activités */}
                <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                     Que faire en dehors des matchs
                  </h2>
                  <div className="space-y-4">
                    {enrichment.activities.map((activity, i) => (
                      <div key={i} className="rounded-lg border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 p-4">
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{activity.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Informations pratiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {(city.population / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Population metro</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{city.timezone.split("/").pop()?.replace(/_/g, " ")}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Fuseau horaire</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fiche ville</h3>
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

            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Autres villes hôtes</h3>
              <ul className="space-y-2 text-sm">
                {cities
                  .filter((c) => c.id !== city.id)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={`/ville/${c.slug}`} className="text-primary dark:text-secondary hover:underline">
                        {c.name} ({c.country})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Hôtels à {city.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Trouvez les meilleurs hôtels près des stades pour la Coupe du Monde 2026.
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
