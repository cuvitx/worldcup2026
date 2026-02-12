import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@repo/data/cities";
import { stadiums } from "@repo/data/stadiums";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Las 16 ciudades sede de la Copa del Mundo 2026 | Guia & Informacion",
  description:
    "Descubre las 16 ciudades sede de la Copa del Mundo 2026 en Estados Unidos, Canada y Mexico. Poblacion, estadios, zonas horarias.",
  alternates: getStaticAlternates("cities", "es"),
};

export default function CitiesPage() {
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "Estados Unidos",
    Canada: "Canada",
    Mexico: "Mexico",
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Ciudades sede</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Las 16 ciudades sede del Mundial 2026</h1>
          <p className="mt-2 text-gray-300">
            11 ciudades estadounidenses, 3 ciudades mexicanas y 2 ciudades canadienses acogen el Mundial.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {countries.map((country) => {
          const countryCities = cities.filter((c) => c.country === country);
          return (
            <section key={country} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{countryLabels[country]} ({countryCities.length} ciudades)</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {countryCities.map((city) => {
                  const cityStadiums = stadiums.filter((s) => s.cityId === city.id);
                  return (
                    <Link
                      key={city.id}
                      href={`/ciudad/${city.slug}`}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <p className="font-semibold">{city.name}</p>
                      <p className="text-sm text-gray-500">
                        {city.state} &middot; {city.population.toLocaleString("es-ES")} hab.
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {cityStadiums.length} estadio{cityStadiums.length > 1 ? "s" : ""}: {cityStadiums.map((s) => s.name).join(", ")}
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
