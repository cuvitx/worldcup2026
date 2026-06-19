import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Die 16 Stadien der WM 2026 | Kapazitaet, Stadt & Spiele",
  description:
    "Alle 16 Stadien der Fussball-WM 2026. Kapazitaet, Stadt, Land und geplante Spiele in den USA, Kanada und Mexiko.",
  alternates: getStaticAlternates("stadiums", "de"),
  openGraph: {
    title: "Die 16 Stadien der WM 2026",
    description:
      "Alle WM-Stadien 2026: Kapazitaet, Standort und Spielplan.",
  },
};

export default function StadienPage() {
  const sorted = [...stadiums].sort((a, b) => b.capacity - a.capacity);
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
            Die 16 Stadien der WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            11 Stadien in den USA, 3 in Mexiko und 2 in Kanada fuer 104 Spiele.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryStadiums = sorted.filter(
            (s) => s.country === country
          );
          return (
            <section key={country}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {countryLabels[country]} ({countryStadiums.length} Stadien)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  const roofLabel =
                    stadium.roofType === "retractable"
                      ? "Schiebedach"
                      : stadium.roofType === "fixed"
                        ? "Festes Dach"
                        : "Offenes Dach";
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stadion/${stadium.slug}`}
                      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all hover:-translate-y-0.5"
                    >
                      <p className="font-bold text-gray-900">
                        {stadium.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {city?.name ?? stadium.city}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-accent">
                          {stadium.capacity.toLocaleString("de-DE")} Plaetze
                        </span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {roofLabel}
                        </span>
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
