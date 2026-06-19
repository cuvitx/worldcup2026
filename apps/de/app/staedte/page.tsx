import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@repo/data/cities";
import { stadiums } from "@repo/data/stadiums";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Die 16 Austragungsorte der WM 2026 | Staedte & Infos",
  description:
    "Alle 16 Austragungsorte der Fussball-WM 2026 in den USA, Kanada und Mexiko. Einwohner, Stadien und Zeitzonen.",
  alternates: getStaticAlternates("cities", "de"),
  openGraph: {
    title: "Die 16 Austragungsorte der WM 2026",
    description:
      "Alle 16 Staedte der WM 2026 in den USA, Kanada und Mexiko.",
  },
};

export default function StaedtePage() {
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "Vereinigte Staaten",
    Canada: "Kanada",
    Mexico: "Mexiko",
  };

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Die 16 Austragungsorte der WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            11 Staedte in den USA, 3 in Mexiko und 2 in Kanada.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryCities = cities.filter((c) => c.country === country);
          return (
            <section key={country}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {countryLabels[country]} ({countryCities.length} Staedte)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryCities.map((city) => {
                  const cityStadiums = stadiums.filter(
                    (s) => s.cityId === city.id
                  );
                  return (
                    <Link
                      key={city.id}
                      href={`/stadt/${city.slug}`}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all hover:-translate-y-0.5"
                    >
                      <p className="font-bold text-lg text-gray-900">
                        {city.name}
                      </p>
                      <p className="text-sm text-gray-500">{city.state}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-gray-50 p-2.5 text-center">
                          <p className="text-xs text-gray-500">Einwohner</p>
                          <p className="text-sm font-bold text-gray-900">
                            {(city.population / 1_000_000).toFixed(1)}M
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-50 p-2.5 text-center">
                          <p className="text-xs text-gray-500">Stadien</p>
                          <p className="text-sm font-bold text-gray-900">
                            {cityStadiums.length}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3 text-xs text-gray-500">
                        {cityStadiums.map((s) => s.name).join(", ") || "--"}
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
