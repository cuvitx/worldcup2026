import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { getAllArticles } from "../../lib/mdx";

export const metadata: Metadata = {
  title: "Actualités Coupe du Monde 2026 - Dernières News CDM 2026",
  description:
    "Toutes les actualités de la Coupe du Monde 2026 : stades, qualifications, billets, équipes, paris sportifs. Restez informé sur le Mondial.",
  alternates: {
    canonical: "https://www.cdm2026.fr/actualites",
  },
  openGraph: {
    title: "Actualités Coupe du Monde 2026",
    description: "Dernières news et infos sur la CDM 2026.",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ActualitesPage() {
  const articles = getAllArticles();

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
      question: "Quand a eu lieu le tirage au sort des groupes de la CDM 2026 ?",
      answer: "Le tirage au sort de la phase de groupes de la Coupe du Monde 2026 a eu lieu en décembre 2025. Il a déterminé la composition des 12 groupes de 4 équipes et définira le calendrier des matchs de poule. Le tirage respectera les chapeaux basés sur le classement FIFA et les règles de séparation géographique (maximum 2 équipes européennes par groupe, etc.)."
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Actualités Coupe du Monde 2026",
    url: "https://www.cdm2026.fr/actualites",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "NewsArticle",
          headline: article.title,
          datePublished: article.date,
          url: `https://www.cdm2026.fr/actualites/${article.slug}`,
          publisher: { "@type": "Organization", name: "CDM 2026" },
        },
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl mb-2">Actualités Coupe du Monde 2026</h1>
          <p className="text-gray-300 max-w-2xl">
            Analyses, guides et articles sur la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500 py-12">Aucun article pour le moment.</p>
        ) : (
          <>
            {/* Featured article */}
            {articles[0] && (
              <Link
                href={`/actualites/${articles[0].slug}`}
                className="group block rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-all mb-8 overflow-hidden"
              >
                <div className="grid md:grid-cols-[1fr_1fr] gap-0">
                  <div className="bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-12">
                    <span className="text-4xl sm:text-8xl">{articles[0].imageEmoji ?? "📝"}</span>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
                        {articles[0].category}
                      </span>
                      <time className="text-xs text-gray-500" dateTime={articles[0].date}>
                        {formatDate(articles[0].date)}
                      </time>
                      {articles[0].readingTime && (
                        <span className="text-xs text-gray-400">{articles[0].readingTime} min</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 transition-colors mb-3">
                      {articles[0].title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {articles[0].description}
                    </p>
                    <span className="text-sm font-bold text-primary">Lire l&apos;article →</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of articles */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.slice(1).map((article) => (
                <Link
                  key={article.slug}
                  href={`/actualites/${article.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                >
                  {article.imageEmoji && <div className="mb-3 text-2xl sm:text-4xl">{article.imageEmoji}</div>}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary">
                      {article.category}
                    </span>
                    <time className="text-xs text-gray-500" dateTime={article.date}>
                      {formatDate(article.date)}
                    </time>
                    {article.readingTime && (
                      <span className="text-xs text-gray-400">{article.readingTime} min</span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>

      <FAQSection title="Questions fréquentes sur la CDM 2026" items={faqItems} />
    </div>
  );
}
