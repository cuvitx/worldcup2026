import { StadiumImage } from "../components/stadium-image";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";

export const metadata: Metadata = {
  title: "Les 16 stades de la Coupe du Monde 2026 | Capacité, Ville & Matchs",
  description:
    "Guide complet des 16 stades de la Coupe du Monde 2026. Capacité, ville, pays, matchs programmés et informations pratiques.",
  alternates: getStaticAlternates("stadiums", "fr"),
  openGraph: {
    title: "Les 16 stades de la Coupe du Monde 2026",
    description: "Guide des 16 stades de la CDM 2026 : capacité, ville et matchs.",
  },
};

export default function StadiumsPage() {
  const sorted = [...stadiums].sort((a, b) => b.capacity - a.capacity);
  const countries = ["USA", "Canada", "Mexico"] as const;
  const countryLabels: Record<string, string> = {
    USA: "🇺🇸 États-Unis",
    Canada: "🇨🇦 Canada",
    Mexico: "🇲🇽 Mexique",
  };

  return (
    <>
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Stades</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Les 16 stades de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            11 stades aux États-Unis, 3 au Mexique et 2 au Canada accueilleront les 104 matchs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {countries.map((country) => {
          const countryStadiums = sorted.filter((s) => s.country === country);
          return (
            <section key={country}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {countryLabels[country]} ({countryStadiums.length} stades)
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stade/${stadium.slug}`}
                      className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="overflow-hidden">
                        <StadiumImage
                          slug={stadium.slug}
                          name={stadium.name}
                          city={stadium.city}
                          containerClassName="w-full h-44"
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-bold text-gray-900 dark:text-white">{stadium.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                          📍 {city?.name ?? stadium.city}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary dark:text-secondary">
                            🏟️ {stadium.capacity.toLocaleString("fr-FR")} places
                          </span>
                          <span className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                            {stadium.roofType === "retractable" ? "Toit rétractable" : stadium.roofType === "fixed" ? "Toit fixe" : "Ciel ouvert"}
                          </span>
                        </div>
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
