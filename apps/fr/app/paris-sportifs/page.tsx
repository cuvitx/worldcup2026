/* eslint-disable @next/next/no-img-element */
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides, guidesByCategory } from "@repo/data/guides";

export const metadata: Metadata = {
  title: "Paris sportifs CDM 2026 | Meilleurs bookmakers & guides",
  description:
    "Comparatif des meilleurs sites de paris sportifs pour la Coupe du Monde 2026. Avis, bonus, cotes et guides strategiques pour parier sur la CDM 2026.",
  alternates: getStaticAlternates("betting", "fr"),
  openGraph: {
    title: "Paris sportifs - Coupe du Monde 2026",
    description:
      "Meilleurs bookmakers, guides et stratégies pour parier sur la CDM 2026.",
  },
};

export default function ParisSportifsPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "Coupe du Monde 2026",
    stratégie: "Strategies de paris",
    bookmaker: "Bookmakers",
    debutant: "Debutant",
  };

  const categories = ["cdm2026", "stratégie", "bookmaker", "debutant"] as const;

  return (
    <>
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Paris sportifs</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Paris sportifs CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            Comparatif des meilleurs bookmakers, guides de paris et stratégies pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {/* Bookmaker Reviews */}
        <section className="rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Meilleurs sites de paris sportifs 2026</h2>
          <p className="mb-6 text-sm text-gray-600">
            Nos avis détaillés sur les {bookmakerReviews.length} bookmakers agréés en France pour parier sur la CDM 2026.
          </p>
          <div className="space-y-4">
            {bookmakerReviews.map((bk, i) => {
              const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
              return (
                <Link
                  key={bk.id}
                  href={`/bookmaker/${bk.slug}`}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-5 transition-all hover:shadow-md ${
                    i === 0 ? "border-secondary bg-secondary/5" : "border-gray-200 dark:border-slate-700 hover:border-primary/30"
                  }`}
                >
                  {i === 0 && (
                    <span className="absolute -top-3 left-4 rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-white">
                      #1 Recommande
                    </span>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      {bk.logo && <img src={bk.logo} alt={bk.name} className="h-10 w-10 rounded-lg object-contain" />}
                      <p className="text-xl font-bold">{bk.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{bk.tagline}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-secondary">{"★".repeat(Math.round(avgRating))}</span>
                      <span className="text-xs text-gray-500">{avgRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-extrabold text-field">{bk.bonus}</p>
                    <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Cotes</p>
                      <p className="font-bold text-primary">{bk.ratings.odds}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">App</p>
                      <p className="font-bold text-primary">{bk.ratings.app}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Live</p>
                      <p className="font-bold text-primary">{bk.ratings.live}/5</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white">
                      Voir l&apos;avis &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Guides by category */}
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          return (
            <section key={cat} className="rounded-xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-sm border border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{categoryLabels[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guide/${guide.slug}`}
                    className="rounded-xl border border-gray-200 dark:border-slate-700 p-4 sm:p-5 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.metaDescription}</p>
                    <p className="mt-2 text-xs font-medium text-primary">Lire le guide &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className="rounded-xl bg-primary/5 border border-primary/10 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Voir aussi</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/buteurs" className="rounded-lg bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cotes buteurs CDM 2026
            </Link>
            <Link href="/pronostic/france" className="rounded-lg bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Pronostic France
            </Link>
            <Link href="/match/calendrier" className="rounded-lg bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Calendrier des matchs
            </Link>
            <Link href="/equipes" className="rounded-lg bg-white dark:bg-slate-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Toutes les équipes
            </Link>
          </div>
        </section>
      </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
</>
  );
}
