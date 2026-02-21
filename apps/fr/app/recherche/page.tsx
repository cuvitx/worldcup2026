import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { buildSearchIndex } from "@repo/data/search-index";
import { SearchClient } from "./SearchClient";
export const metadata: Metadata = {
  title: "Recherche | CDM 2026 — Équipes, Joueurs, Stades, Matchs",
  description:
    "Recherchez parmi toutes les entités de la Coupe du Monde 2026 : 48 équipes, 966 joueurs, 16 stades, 104 matchs, 16 villes.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://www.cdm2026.fr/recherche",
  },
  openGraph: {
    title: "Recherche CDM 2026",
    description: "Trouvez une équipe, un joueur, un stade ou un match de la Coupe du Monde 2026.",
    url: "https://www.cdm2026.fr/recherche",
  },
};

// Build index at server build-time — imported as static data on the client
function buildStaticIndex() {
  return buildSearchIndex("fr");
}

export default function RecherchePage() {
  // The index is built server-side and serialized as a prop to the client component
  const searchData = buildStaticIndex();

  return (
    <>
{/* Breadcrumb */}
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-3xl mb-1">
             Recherche CDM 2026
          </h1>
          <p className="text-gray-200 text-sm sm:text-base">
            Accédez à toutes les infos : équipes, joueurs, stades, matchs et villes.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12" id="main-content">
        {/* Stats bar */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
          {[
            { icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', count: "48", label: "Équipes" },
            { icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', count: "966", label: "Joueurs" },
            { icon: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>', count: "104", label: "Matchs" },
            { icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V2"/><path d="M8 7V2"/><path d="M2 13h20"/>', count: "16", label: "Stades" },
            { icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', count: "16", label: "Villes" },
          ].map((s) => (
            <div
              key={s.label}
              className="group relative bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 text-center hover:border-accent/40 hover:shadow-md transition-all"
            >
              <div className="mx-auto mb-2 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" dangerouslySetInnerHTML={{ __html: s.icon }} />
              </div>
              <div className="font-extrabold text-gray-900 text-2xl leading-tight">
                {s.count}
              </div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Client search — Suspense boundary needed for useSearchParams */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <SearchClient data={searchData} />
        </Suspense>
      </main>
    </>
  );
}
