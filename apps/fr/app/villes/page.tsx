import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@repo/data/cities";
import { stadiums } from "@repo/data/stadiums";

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
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="hover:text-primary dark:hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Villes hôtes</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Les 16 villes hôtes de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            11 villes américaines, 3 villes mexicaines et 2 villes canadiennes accueillent le Mondial.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryCities = cities.filter((c) => c.country === country);
          return (
            <section key={country}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">
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
                        🏟️ {cityStadiums.map((s) => s.name).join(", ") || "—"}
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
