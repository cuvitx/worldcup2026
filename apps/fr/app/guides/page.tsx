import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidesByCategory } from "@repo/data/guides";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";

export const metadata: Metadata = {
  title: "Guides paris sportifs CDM 2026 | Strategies & conseils",
  description:
    "Tous nos guides de paris sportifs pour la Coupe du Monde 2026. Strategies, conseils, guides debutants et analyses de bookmakers.",
  alternates: getStaticAlternates("guides", "fr"),
  openGraph: {
    title: "Guides paris sportifs - CDM 2026",
    description: "Guides complets pour parier sur la Coupe du Monde 2026.",
  },
};

const guidesJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Guides paris sportifs CDM 2026",
  description: "Tous nos guides de paris sportifs pour la Coupe du Monde 2026.",
  url: "https://cdm2026.fr/guides",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: guides.map((guide, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://cdm2026.fr/guide/${guide.slug}`,
      name: guide.title,
    })),
  },
};

const categoryEmojis: Record<string, string> = {
  cdm2026: "🏆",
  stratégie: "🧠",
  bookmaker: "📚",
  debutant: "🎓",
};

export default function GuidesPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "Coupe du Monde 2026",
    stratégie: "Strategies de paris",
    bookmaker: "Bookmakers & comparatifs",
    debutant: "Guides debutant",
  };
  const categoryDescriptions: Record<string, string> = {
    cdm2026: "Tout ce qu'il faut savoir pour parier sur la CDM 2026.",
    stratégie: "Strategies avancées pour maximiser vos gains.",
    bookmaker: "Comparatifs et analyses des meilleurs bookmakers.",
    debutant: "Les bases des paris sportifs pour bien debuter.",
  };

  const categories = ["cdm2026", "stratégie", "bookmaker", "debutant"] as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesJsonLd) }}
      />
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Guides</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Guides paris sportifs CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            {guides.length} guides complets pour parier sur la Coupe du Monde 2026. Strategies, conseils debutants et analyses de bookmakers.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          const emoji = categoryEmojis[cat] || "📌";
          return (
            <section key={cat} className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span className="text-2xl">{emoji}</span> {categoryLabels[cat]}
              </h2>
              <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">{categoryDescriptions[cat]}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guide/${guide.slug}`}
                    className="group rounded-xl border border-gray-200 dark:border-gray-600 p-5 transition-all hover:border-accent hover:bg-accent/5 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div className="text-3xl mb-3">{emoji}</div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-accent transition-colors">{guide.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">{guide.intro}</p>
                    <p className="text-sm font-bold text-accent">Lire →</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bookmaker reviews */}
        <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <span className="text-2xl">⭐</span> Avis bookmakers
          </h2>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Tests et avis détaillés des meilleurs bookmakers agréés en France.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmakerReviews.map((bk) => (
              <Link
                key={bk.id}
                href={`/bookmaker/${bk.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 p-4 transition-all hover:border-accent hover:bg-accent/5 hover:shadow-md"
              >
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">{bk.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{bk.tagline}</p>
                </div>
                <p className="font-bold text-field">{bk.bonus}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-xl bg-primary/5 dark:bg-primary/10 p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">Voir aussi</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/paris-sportifs" className="rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Paris sportifs CDM 2026
            </Link>
            <Link href="/buteurs" className="rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cotes buteurs
            </Link>
            <Link href="/pronostic/france" className="rounded-lg bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Pronostic France
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
