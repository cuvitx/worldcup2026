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
  openGraph: {
    title: "Recherche CDM 2026",
    description: "Trouvez une équipe, un joueur, un stade ou un match de la Coupe du Monde 2026.",
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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Recherche</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-2xl font-extrabold sm:text-3xl mb-1">
            🔍 Recherche CDM 2026
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Accédez à toutes les infos : équipes, joueurs, stades, matchs et villes.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 py-8" id="main-content">
        {/* Stats bar */}
        <div className="flex flex-wrap gap-4 mb-8 text-center">
          {[
            { emoji: "🌍", count: "48", label: "Équipes" },
            { emoji: "⚽", count: "966", label: "Joueurs" },
            { emoji: "📅", count: "104", label: "Matchs" },
            { emoji: "🏟️", count: "16", label: "Stades" },
            { emoji: "🌆", count: "16", label: "Villes" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex-1 min-w-[80px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3"
            >
              <div className="text-xl">{s.emoji}</div>
              <div className="font-extrabold text-gray-900 dark:text-gray-100 text-lg leading-tight">
                {s.count}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
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
