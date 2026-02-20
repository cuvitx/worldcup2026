import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsArticles, newsBySlug, newsCategories, type NewsCategory } from "@repo/data/news";
import { bookmakers } from "@repo/data/affiliates";
import { DISPLAY_LIMITS } from "@repo/data/constants";
import { RelatedContent, type RelatedItem } from "../../components/RelatedContent";

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

export function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = newsBySlug[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = newsBySlug[slug];
  if (!article) notFound();

  const related = newsArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, DISPLAY_LIMITS.RECENT_ARTICLES);

  const cta = bookmakers[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "CDM 2026" },
    publisher: {
      "@type": "Organization",
      name: "CDM 2026",
      url: "https://cdm2026.fr",
    },
    mainEntityOfPage: `https://cdm2026.fr/actualites/${article.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-gray-500 dark:text-gray-300">
          <ol className="flex items-center gap-1 flex-wrap">
            <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/actualites" className="text-primary dark:text-secondary hover:underline">Actualités</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{article.title}</li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Article */}
          <article className="max-w-none">
            <div className="mb-4 flex items-center gap-3">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[article.category]}`}>
                {newsCategories[article.category]}
              </span>
              <time className="text-sm text-gray-500 dark:text-gray-300" dateTime={article.date}>
                {formatDate(article.date)}
              </time>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl mb-4">
              {article.imageEmoji} {article.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 font-medium">
              {article.excerpt}
            </p>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {article.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Articles liés
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      href={`/actualites/${r.slug}`}
                      className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition dark:border-gray-700 dark:bg-slate-800"
                    >
                      <div className="text-2xl mb-2">{r.imageEmoji}</div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {r.title}
                      </h3>
                      <time className="text-xs text-gray-500 dark:text-gray-300 mt-1 block">
                        {formatDate(r.date)}
                      </time>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar CTA */}
          <aside className="hidden lg:block">
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Pariez sur la CDM 2026
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {cta?.name ?? "Bookmaker"} — Profitez des meilleures cotes sur tous les matchs de la Coupe du Monde.
              </p>
              <a
                href={cta?.url ?? "/paris-sportifs"}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Voir les offres →
              </a>
              <p className="mt-3 text-[10px] text-gray-500 text-center">
                18+ | Jouer comporte des risques | 09 74 75 13 13
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Related content */}
      <div className="mx-auto max-w-4xl px-4 pb-8">
        <RelatedContent
          items={newsArticles
            .filter((a) => a.id !== article.id)
            .slice(0, 4)
            .map((a): RelatedItem => ({
              href: `/actualites/${a.slug}`,
              emoji: a.imageEmoji,
              title: a.title,
              description: a.excerpt.slice(0, 80) + '…',
            }))}
        />
      </div>
    </>
  );
}
