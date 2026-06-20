import { getStaticAlternates } from "@repo/data/route-mapping";
import { RelatedLinks } from "../components/RelatedLinks";
import { PmuBanner } from "../components/PmuBanner";
import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "../../lib/localized-data";
import { stadiums } from "../../lib/localized-data";
export const metadata: Metadata = {
  title: "Die 16 Gastgeberstädte der WM 2026 | Guide & Infos",
  description:
    "Entdecken Sie die 16 Gastgeberstädte der WM 2026 in den USA, Kanada und Mexiko. Einwohner, Stadien, Zeitzonen.",
  alternates: getStaticAlternates("cities", "de"),
  openGraph: {
    title: "Die 16 Gastgeberstädte der WM 2026",
    description: "Entdecken Sie die 16 Gastgeberstädte der WM 2026 in den USA, Kanada und Mexiko.",
  },
};

export default function CitiesPage() {
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "🇺🇸 Vereinigte Staaten",
    Canada: "🇨🇦 Kanada",
    Mexico: "🇲🇽 Mexiko",
  };
  const countryFlags: Record<string, string> = {
    USA: "🇺🇸",
    Canada: "🇨🇦",
    Mexico: "🇲🇽",
  };

  return (
    <>
<section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">Gastgeberstädte</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Die 16 Gastgeberstädte der WM 2026</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            11 US-amerikanische, 3 mexikanische und 2 kanadische Städte richten die WM aus.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryCities = cities.filter((c) => c.country === country);
          return (
            <section key={country}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {countryLabels[country]} ({countryCities.length} Städte)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryCities.map((city) => {
                  const cityStadiums = stadiums.filter((s) => s.cityId === city.id);
                  return (
                    <Link
                      key={city.id}
                      href={`/stadt/${city.slug}`}
                      className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{countryFlags[country]}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">
                            {city.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {city.state}
                          </p>
                        </div>
                      </div>
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
                      <div className="mt-3 text-xs text-gray-500">
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

      {/* PMU Banner */}
      <section className="py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PmuBanner tracking="Städte" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Verwandte Seiten" links={[
          { href: "/stadien", title: "Die 16 Stadien", description: "Kapazität, Fotos und Spiele jedes Stadions", icon: "" },
          { href: "/stadien", title: "Stadionkarte", description: "Interaktive Karte der 16 Stadien", icon: "" },
          { href: "/gastgeber", title: "Gastgeberländer", description: "USA, Kanada und Mexiko: kompletter Guide", icon: "" },
          { href: "/tickets", title: "Tickets", description: "So kaufen Sie Ihre WM-2026-Tickets", icon: "" },
          { href: "/wo-schauen", title: "Wo schauen", description: "TV-Sender und Streaming WM 2026", icon: "" },
        ]} />
      </div>
    </>
  );
}
