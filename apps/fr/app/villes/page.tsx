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
};

export default function CitiesPage() {
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "États-Unis",
    Canada: "Canada",
    Mexico: "Mexique",
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Villes hotes</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Les 16 villes hôtes de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            11 villes americaines, 3 villes mexicaines et 2 villes canadiennes accueillent le Mondial.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {countries.map((country) => {
          const countryCities = cities.filter((c) => c.country === country);
          return (
            <section key={country} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{countryLabels[country]} ({countryCities.length} villes)</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {countryCities.map((city) => {
                  const cityStadiums = stadiums.filter((s) => s.cityId === city.id);
                  return (
                    <Link
                      key={city.id}
                      href={`/ville/${city.slug}`}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <p className="font-semibold">{city.name}</p>
                      <p className="text-sm text-gray-500">
                        {city.state} &middot; {city.population.toLocaleString("fr-FR")} hab.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {cityStadiums.length} stade{cityStadiums.length > 1 ? "s" : ""} : {cityStadiums.map((s) => s.name).join(", ")}
                      </p>
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
