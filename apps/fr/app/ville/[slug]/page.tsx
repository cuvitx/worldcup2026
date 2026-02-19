import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, citiesBySlug } from "@repo/data/cities";
import { stadiumsById } from "@repo/data/stadiums";

export const revalidate = 86400;

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

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Villes",url:"/villes"},{name:city.name,url:"/ville/"+city.slug}]} baseUrl={domains.fr} />
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/villes" className="hover:text-primary">Villes</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{city.name}</li>
          </ol>
        </div>
      </nav>

      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-4xl sm:text-7xl">🏙️</span>
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">{city.name}</h1>
              <p className="mt-2 text-gray-300">
                {city.state}, {city.country} &middot; Ville hôte CDM 2026
              </p>
              <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white">
                {cityStadiums.length} stade{cityStadiums.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Présentation</h2>
              <p className="text-gray-700 leading-relaxed">{city.description}</p>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">
                {cityStadiums.length > 1 ? "Stades" : "Stade"} de la Coupe du Monde
              </h2>
              <div className="space-y-4">
                {cityStadiums.map((stadium) => (
                  <Link
                    key={stadium.id}
                    href={`/stade/${stadium.slug}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <div>
                      <p className="font-semibold">{stadium.name}</p>
                      <p className="text-sm text-gray-500">
                        {stadium.capacity.toLocaleString("fr-FR")} places &middot;
                        Toit {stadium.roofType === "retractable" ? "rétractable" : stadium.roofType === "fixed" ? "fixe" : "ouvert"}
                      </p>
                    </div>
                    <span className="text-accent">&rarr;</span>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Informations pratiques</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {(city.population / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Population metro</p>
                </div>
                <div className="rounded-lg bg-gray-50 dark:bg-slate-700 p-4 text-center">
                  <p className="text-lg font-bold text-primary">{city.timezone.split("/").pop()?.replace(/_/g, " ")}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Fuseau horaire</p>
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Fiche ville</h3>
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

            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Autres villes hôtes</h3>
              <ul className="space-y-2 text-sm">
                {cities
                  .filter((c) => c.id !== city.id)
                  .slice(0, 6)
                  .map((c) => (
                    <li key={c.id}>
                      <Link href={`/ville/${c.slug}`} className="hover:text-accent">
                        {c.name} ({c.country})
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-xl bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">Hôtels à {city.name}</h3>
              <p className="text-sm text-gray-600">
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
