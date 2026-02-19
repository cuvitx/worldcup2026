import { StadiumImage } from "../components/stadium-image";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";

export const metadata: Metadata = {
  title: "Les 16 stades de la Coupe du Monde 2026 | Capacite, Ville & Matchs",
  description:
    "Guide complet des 16 stades de la Coupe du Monde 2026. Capacite, ville, pays, matchs programmes et informations pratiques.",
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
            <li className="text-gray-900 font-medium">Stades</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Les 16 stades de la CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            11 stades aux États-Unis, 3 au Mexique et 2 au Canada accueilleront les 104 matchs.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {countries.map((country) => {
          const countryStadiums = sorted.filter((s) => s.country === country);
          return (
            <section key={country} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{countryLabels[country]} ({countryStadiums.length} stades)</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {countryStadiums.map((stadium) => {
                  const city = cities.find((c) => c.id === stadium.cityId);
                  return (
                    <Link
                      key={stadium.id}
                      href={`/stade/${stadium.slug}`}
                      className="rounded-lg border border-gray-200 overflow-hidden transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <StadiumImage
                        slug={stadium.slug}
                        name={stadium.name}
                        city={stadium.city}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <p className="font-semibold">{stadium.name}</p>
                        <p className="text-sm text-gray-500">
                          {city?.name ?? stadium.city} &middot; {stadium.capacity.toLocaleString("fr-FR")} places
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {stadium.roofType === "retractable" ? "Toit retractable" : stadium.roofType === "fixed" ? "Toit fixe" : "Ciel ouvert"}
                        </p>
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
