import type { Metadata } from "next";
import Link from "next/link";
import { stadiums } from "@repo/data/stadiums";
import { StadiumMap } from "./StadiumMap";

export const metadata: Metadata = {
  title: "Carte des Stades CDM 2026 | Les 16 stades de la Coupe du Monde",
  description:
    "Carte interactive des 16 stades de la Coupe du Monde 2026 aux États-Unis, au Canada et au Mexique. Localisez chaque stade, sa capacité et ses matchs.",
  keywords: [
    "carte stades CDM 2026",
    "stades Coupe du Monde 2026",
    "carte USA Canada Mexique",
    "localisation stades football",
  ],
  openGraph: {
    title: "Carte interactive des 16 stades CDM 2026",
    description:
      "Localisez les 16 stades de la Coupe du Monde 2026 sur une carte interactive de l'Amérique du Nord.",
    url: "https://cdm2026.fr/carte-stades",
  },
};

const COUNTRY_LABELS: Record<string, string> = {
  USA: "🇺🇸 États-Unis",
  Canada: "🇨🇦 Canada",
  Mexico: "🇲🇽 Mexique",
};

const COUNTRY_COLORS: Record<string, string> = {
  USA:    "bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-slate-700",
  Canada: "bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-slate-700",
  Mexico: "bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-slate-700",
};

export default function CarteStadesPage() {
  const sortedByCountry = ["USA", "Canada", "Mexico"] as const;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cdm2026.fr/" },
      { "@type": "ListItem", position: 2, name: "Stades", item: "https://www.cdm2026.fr/stades" },
      { "@type": "ListItem", position: 3, name: "Carte des stades", item: "https://www.cdm2026.fr/carte-stades" },
    ],
  };

  const mapSchema = {
    "@context": "https://schema.org",
    "@type": "Map",
    name: "Carte des 16 stades de la Coupe du Monde 2026",
    description:
      "Carte interactive montrant la localisation des 16 stades de la CDM 2026 aux États-Unis, au Canada et au Mexique.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mapSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-primary dark:hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/stades" className="hover:text-primary dark:hover:text-primary transition-colors">
                Stades
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Carte interactive</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-3xl mb-1">
            🗺️ Carte des Stades — CDM 2026
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Les 16 stades de la Coupe du Monde 2026 aux États-Unis, au Canada et au Mexique.
          </p>
          <div className="flex gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-secondary border-2 border-secondary" />
              11 aux États-Unis
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-field border-2 border-field" />
              3 au Mexique
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary border-2 border-primary/20" />
              2 au Canada
            </span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12" id="main-content">
        {/* Interactive map */}
        <section className="mb-10" aria-label="Carte interactive">
          <StadiumMap />
          <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-2">
            Survolez un marqueur pour voir les détails · Cliquez pour accéder à la fiche du stade
          </p>
        </section>

        {/* Stadium list by country */}
        <section aria-labelledby="liste-stades">
          <h2
            id="liste-stades"
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
          >
            📋 Liste des 16 stades
          </h2>

          <div className="space-y-10">
            {sortedByCountry.map((country) => {
              const countryStadiums = stadiums
                .filter((s) => s.country === country)
                .sort((a, b) => b.capacity - a.capacity);

              return (
                <div key={country}>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {COUNTRY_LABELS[country]}
                    <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                      ({countryStadiums.length} stade{countryStadiums.length > 1 ? "s" : ""})
                    </span>
                  </h3>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {countryStadiums.map((stadium) => (
                      <Link
                        key={stadium.slug}
                        href={`/stade/${stadium.slug}`}
                        className={`
                          flex flex-col p-4 rounded-xl border transition-all duration-150
                          hover:shadow-md hover:-translate-y-0.5 group
                          ${COUNTRY_COLORS[country]}
                        `}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-bold text-sm leading-tight group-hover:underline">
                            {stadium.name}
                          </h4>
                          <svg
                            className="w-4 h-4 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                        <p className="text-xs opacity-75 mb-1">{stadium.city}</p>
                        <p className="text-xs font-semibold">
                          🏟️ {stadium.capacity.toLocaleString("fr-FR")} places
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats summary */}
        <section className="mt-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            📊 Chiffres clés
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-extrabold text-primary dark:text-secondary">16</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Stades</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary dark:text-secondary">
                {stadiums.reduce((s, st) => s + st.capacity, 0).toLocaleString("fr-FR")}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Places totales</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary dark:text-secondary">
                {Math.max(...stadiums.map((s) => s.capacity)).toLocaleString("fr-FR")}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Capacité max (Azteca)</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary dark:text-secondary">
                {Math.round(stadiums.reduce((s, st) => s + st.capacity, 0) / stadiums.length).toLocaleString("fr-FR")}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Capacité moyenne</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            href="/stades"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            🏟️ Voir tous les stades
          </Link>
          <Link
            href="/match/calendrier"
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-bold px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            📅 Calendrier des matchs
          </Link>
        </div>
      </main>
    </>
  );
}
