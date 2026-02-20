import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsArticles, newsBySlug, newsCategories, type NewsCategory } from "@repo/data/news";
import { bookmakers } from "@repo/data/affiliates";
import { DISPLAY_LIMITS } from "@repo/data/constants";
import { RelatedContent, type RelatedItem } from "../../components/RelatedContent";
import { getArticleBySlug, getRelatedArticles, getMdxSlugs } from "../../../lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../../../lib/mdx-components";

const categoryColors: Record<NewsCategory | string, string> = {
  transferts: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  stades: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  billets: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  equipes: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-white",
  paris: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-secondary",
  analyse: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  guide: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  portrait: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  actualite: "bg-primary/10 text-primary dark:bg-secondary/20 dark:text-secondary",
  pronostic: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const categoryLabels: Record<string, string> = {
  analyse: "Analyse",
  guide: "Guide",
  portrait: "Portrait",
  actualite: "Actualité",
  pronostic: "Pronostic",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function generateStaticParams() {
  const dataParams = newsArticles.map((article) => ({ slug: article.slug }));
  const mdxParams = getMdxSlugs().map((slug) => ({ slug }));
  // Deduplicate
  const seen = new Set(dataParams.map((p) => p.slug));
  const merged = [...dataParams];
  for (const p of mdxParams) {
    if (!seen.has(p.slug)) merged.push(p);
  }
  return merged;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  // Try MDX first
  const mdx = getArticleBySlug(slug);
  if (mdx) {
    const { frontmatter: fm } = mdx;
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `https://cdm2026.fr/actualites/${slug}` },
      openGraph: {
        title: fm.title,
        description: fm.description,
        type: "article",
        publishedTime: fm.date,
        ...(fm.image ? { images: [fm.image] } : {}),
      },
    };
  }

  // Fallback to data
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

  /* ── MDX article ── */
  const mdx = getArticleBySlug(slug);
  if (mdx) {
    const { frontmatter: fm, content } = mdx;
    const related = getRelatedArticles(slug, 4);

    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: "https://cdm2026.fr" },
        { "@type": "ListItem", position: 2, name: "Actualités", item: "https://cdm2026.fr/actualites" },
        { "@type": "ListItem", position: 3, name: fm.title, item: `https://cdm2026.fr/actualites/${slug}` },
      ],
    };

    const articleJsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: fm.title,
      description: fm.description,
      datePublished: fm.date,
      ...(fm.updated ? { dateModified: fm.updated } : {}),
      author: { "@type": "Organization", name: fm.author },
      publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
      mainEntityOfPage: `https://cdm2026.fr/actualites/${slug}`,
      ...(fm.image ? { image: fm.image } : {}),
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap">
              <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
              <li>/</li>
              <li><Link href="/actualites" className="text-primary dark:text-secondary hover:underline">Actualités</Link></li>
              <li>/</li>
              <li className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{fm.title}</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero-animated text-white py-12 sm:py-16">
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[fm.category] ?? categoryColors.actualite}`}>
                {categoryLabels[fm.category] ?? fm.category}
              </span>
              <time className="text-sm text-gray-300" dateTime={fm.date}>
                {formatDate(fm.date)}
              </time>
              {fm.readingTime && (
                <span className="text-sm text-gray-300">· {fm.readingTime} min de lecture</span>
              )}
            </div>
            <h1 className="text-2xl font-extrabold sm:text-4xl mb-2">{fm.title}</h1>
            <p className="text-gray-300 max-w-2xl">{fm.description}</p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          {/* MDX Content */}
          <article className="prose prose-lg dark:prose-invert max-w-none prose-a:text-primary dark:prose-a:text-secondary prose-headings:text-gray-900 dark:prose-headings:text-white">
            <MDXRemote source={content} components={mdxComponents} />
          </article>

          {/* Tags */}
          {fm.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {fm.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-8 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 pt-6">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Partager :</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fm.title)}&url=${encodeURIComponent(`https://cdm2026.fr/actualites/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              𝕏 Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://cdm2026.fr/actualites/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${fm.title} https://cdm2026.fr/actualites/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              WhatsApp
            </a>
          </div>

          {/* Newsletter CTA */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">🏆 Restez informé sur la CDM 2026</h3>
            <p className="text-sm text-white/80 mb-4">
              Recevez les dernières analyses, pronostics et actualités directement.
            </p>
            <Link
              href="/actualites"
              className="inline-block rounded-lg bg-white text-primary font-bold px-6 py-2 hover:bg-gray-100 transition"
            >
              Voir toutes les actualités →
            </Link>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Articles liés
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/actualites/${r.slug}`}
                    className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition dark:border-gray-700 dark:bg-slate-800"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[r.category] ?? ""}`}>
                        {categoryLabels[r.category] ?? r.category}
                      </span>
                      <time className="text-xs text-gray-500 dark:text-gray-300">{formatDate(r.date)}</time>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{r.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-300 mt-1 line-clamp-2">{r.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </>
    );
  }

  /* ── Fallback: data-driven article ── */
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
                className="block w-full rounded-xl bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white hover:opacity-90 transition"
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
