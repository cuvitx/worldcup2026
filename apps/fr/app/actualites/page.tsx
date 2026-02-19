import type { Metadata } from "next";
import Link from "next/link";
import { newsArticles, newsCategories, type NewsCategory } from "@repo/data/news";

export const metadata: Metadata = {
  title: "Actualités Coupe du Monde 2026 - Dernières News CDM 2026",
  description:
    "Toutes les actualités de la Coupe du Monde 2026 : stades, qualifications, billets, équipes, paris sportifs. Restez informé sur le Mondial.",
  openGraph: {
    title: "Actualités Coupe du Monde 2026",
    description: "Dernières news et infos sur la CDM 2026.",
  },
};

const categoryColors: Record<NewsCategory, string> = {
  transferts: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  stades: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  billets: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  equipes: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  paris: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const newsJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Actualités Coupe du Monde 2026",
  url: "https://mondial2026.fr/actualites",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: newsArticles.map((article, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: article.title.fr,
        datePublished: article.date,
        url: `https://mondial2026.fr/actualites#${article.id}`,
        publisher: { "@type": "Organization", name: "CDM 2026" },
      },
    })),
  },
};

export default function ActualitesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        <ol className="flex items-center gap-1">
          <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
          <li>/</li>
          <li className="text-gray-900 dark:text-white font-medium">Actualités</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl mb-2">
        Actualités Coupe du Monde 2026
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Toutes les dernières informations sur la Coupe du Monde 2026 : stades, équipes, billets, paris sportifs et plus encore.
      </p>

      {/* Articles grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {newsArticles.map((article) => (
          <Link
            key={article.id}
            href={`/actualites/${article.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-slate-800"
          >
            <div className="mb-3 text-4xl">{article.imageEmoji}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[article.category]}`}>
                {newsCategories[article.category]}
              </span>
              <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={article.date}>
                {formatDate(article.date)}
              </time>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
