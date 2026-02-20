import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { newsArticles, newsCategories, type NewsCategory } from "@repo/data/news";
import { getAllArticles } from "../../lib/mdx";

export const metadata: Metadata = {
  title: "Actualités Coupe du Monde 2026 - Dernières News CDM 2026",
  description:
    "Toutes les actualités de la Coupe du Monde 2026 : stades, qualifications, billets, équipes, paris sportifs. Restez informé sur le Mondial.",
  alternates: {
    canonical: "https://cdm2026.fr/actualites",
  },
  openGraph: {
    title: "Actualités Coupe du Monde 2026",
    description: "Dernières news et infos sur la CDM 2026.",
  },
};

const categoryColors: Record<NewsCategory, string> = {
  transferts: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  stades: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  billets: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  equipes: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white",
  paris: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
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
  url: "https://cdm2026.fr/actualites",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: newsArticles.map((article, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "NewsArticle",
        headline: article.title,
        datePublished: article.date,
        url: `https://cdm2026.fr/actualites#${article.id}`,
        publisher: { "@type": "Organization", name: "CDM 2026" },
      },
    })),
  },
};

export default function ActualitesPage() {
  const featured = newsArticles[0];
  const rest = newsArticles.slice(1);

  const faqItems = [
    {
      question: "Quand commence la Coupe du Monde 2026 ?",
      answer: "La Coupe du Monde 2026 débute le jeudi 11 juin 2026 avec le match d'ouverture à l'Estadio Azteca de Mexico City (Mexique). Le tournoi se termine le dimanche 19 juillet 2026 avec la finale au MetLife Stadium de New York/New Jersey. La compétition s'étale sur 39 jours avec 104 matchs au total, contre 64 matchs pour les éditions précédentes à 32 équipes."
    },
    {
      question: "Où se déroule la Coupe du Monde 2026 ?",
      answer: "La Coupe du Monde 2026 se déroule dans 3 pays : États-Unis (11 stades), Canada (2 stades) et Mexique (3 stades). C'est la première fois qu'une CDM est organisée sur 3 nations et la première en Amérique du Nord depuis 1994. Les 16 villes hôtes incluent New York, Los Angeles, Mexico City, Toronto, Vancouver, Dallas, Miami et bien d'autres. La finale aura lieu au MetLife Stadium (New York/NJ)."
    },
    {
      question: "Combien d'équipes participeront à la CDM 2026 ?",
      answer: "48 équipes participeront à la Coupe du Monde 2026, contre 32 lors des éditions précédentes. Cette expansion historique permet d'inclure davantage de nations et augmente le nombre de matchs à 104 (contre 64 auparavant). Les 48 équipes seront réparties en 12 groupes de 4, avec 32 équipes se qualifiant pour la phase à élimination directe (les 2 premiers de chaque groupe + les 8 meilleurs troisièmes)."
    },
    {
      question: "La France est-elle qualifiée pour la CDM 2026 ?",
      answer: "Oui, la France s'est qualifiée pour la Coupe du Monde 2026 en terminant première de son groupe lors des éliminatoires européens. Les Bleus, vice-champions du monde 2022 et champions du monde 2018, font partie des grands favoris du tournoi. Sous la direction de Didier Deschamps, l'équipe dispose d'un effectif exceptionnel avec Kylian Mbappé, Antoine Griezmann, Aurélien Tchouaméni et de nombreux jeunes talents."
    },
    {
      question: "Quand aura lieu le tirage au sort des groupes de la CDM 2026 ?",
      answer: "Le tirage au sort de la phase de groupes de la Coupe du Monde 2026 aura lieu en décembre 2025 ou janvier 2026 (date exacte à confirmer par la FIFA). Il déterminera la composition des 12 groupes de 4 équipes et définira le calendrier des matchs de poule. Le tirage respectera les chapeaux basés sur le classement FIFA et les règles de séparation géographique (maximum 2 équipes européennes par groupe, etc.)."
    }
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
      />
      <BreadcrumbSchema items={[{ name: "Accueil", url: "/" }, { name: "Actualités", url: "/actualites" }]} baseUrl={domains.fr} />
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Actualités</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl mb-2">Actualités Coupe du Monde 2026</h1>
          <p className="text-gray-300 max-w-2xl">
            Toutes les dernières informations sur la Coupe du Monde 2026 : stades, équipes, billets, paris sportifs et plus encore.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">

      {/* Featured article */}
      {featured && (
        <Link
          href={`/actualites/${featured.slug}`}
          className="group block rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all mb-8 overflow-hidden"
        >
          <div className="grid md:grid-cols-[1fr_1fr] gap-0">
            <div className="bg-gradient-to-br from-primary/10 to-primary/10 dark:from-primary/20 dark:to-primary/20 flex items-center justify-center p-12">
              <span className="text-4xl sm:text-8xl">{featured.imageEmoji}</span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[featured.category]}`}>
                  {newsCategories[featured.category]}
                </span>
                <time className="text-xs text-gray-500 dark:text-gray-300" dateTime={featured.date}>
                  {formatDate(featured.date)}
                </time>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors mb-3">
                {featured.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                {featured.excerpt}
              </p>
              <span className="text-sm font-bold text-primary">Lire l&apos;article →</span>
            </div>
          </div>
        </Link>
      )}

      {/* Rest of articles grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((article) => (
          <Link
            key={article.id}
            href={`/actualites/${article.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-slate-800"
          >
            <div className="mb-3 text-2xl sm:text-4xl">{article.imageEmoji}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[article.category]}`}>
                {newsCategories[article.category]}
              </span>
              <time className="text-xs text-gray-500 dark:text-gray-300" dateTime={article.date}>
                {formatDate(article.date)}
              </time>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors line-clamp-2 mb-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {article.excerpt}
            </p>
          </Link>
        ))}
      </div>
      {/* MDX Articles */}
      {(() => {
        const mdxArticles = getAllArticles();
        if (mdxArticles.length === 0) return null;
        return (
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📝 Analyses &amp; Articles</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mdxArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/actualites/${article.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-gray-700 dark:bg-slate-800"
                >
                  {article.imageEmoji && <div className="mb-3 text-2xl sm:text-4xl">{article.imageEmoji}</div>}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary">
                      {article.category}
                    </span>
                    <time className="text-xs text-gray-500 dark:text-gray-300" dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                    {article.readingTime && (
                      <span className="text-xs text-gray-400">{article.readingTime} min</span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}
      </div>

      <FAQSection title="Questions fréquentes sur la CDM 2026" items={faqItems} />
</div>
  );
}
