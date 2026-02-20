import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@repo/data/cities";
import { stadiums } from "@repo/data/stadiums";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Les 16 villes hôtes de la Coupe du Monde 2026 | Guide & Infos",
  description:
    "Découvrez les 16 villes hôtes de la Coupe du Monde 2026 aux États-Unis, au Canada et au Mexique. Population, stades, fuseaux horaires.",
  alternates: getStaticAlternates("cities", "fr"),
  openGraph: {
    title: "Les 16 villes hôtes de la Coupe du Monde 2026",
    description: "Découvrez les 16 villes hôtes de la CDM 2026 aux USA, Canada et Mexique.",
  },
};

export default function CitiesPage() {
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "🇺🇸 États-Unis",
    Canada: "🇨🇦 Canada",
    Mexico: "🇲🇽 Mexique",
  };
  const countryFlags: Record<string, string> = {
    USA: "🇺🇸",
    Canada: "🇨🇦",
    Mexico: "🇲🇽",
  };

  return (
    <>
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Villes","url":"/villes"}]} baseUrl={domains.fr} />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Villes hôtes" },
        ]}
      />
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Villes hôtes</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Les 16 villes hôtes de la CDM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            11 villes américaines, 3 villes mexicaines et 2 villes canadiennes accueillent le Mondial.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryCities = cities.filter((c) => c.country === country);
          return (
            <section key={country}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {countryLabels[country]} ({countryCities.length} villes)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryCities.map((city) => {
                  const cityStadiums = stadiums.filter((s) => s.cityId === city.id);
                  return (
                    <Link
                      key={city.id}
                      href={`/ville/${city.slug}`}
                      className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-5 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{countryFlags[country]}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                            {city.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            {city.state}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2.5 text-center">
                          <p className="text-xs text-gray-500 dark:text-gray-300">Population</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {(city.population / 1_000_000).toFixed(1)}M
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 p-2.5 text-center">
                          <p className="text-xs text-gray-500 dark:text-gray-300">Stades</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            {cityStadiums.length}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-300">
                         {cityStadiums.map((s) => s.name).join(", ") || "—"}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
