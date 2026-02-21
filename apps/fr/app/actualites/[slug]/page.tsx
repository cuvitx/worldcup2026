import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, getMdxSlugs } from "../../../lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../../../lib/mdx-components";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { newsArticles } from "@repo/data/news";
const categoryColors: Record<string, string> = {
  analyse: "bg-blue-100 text-blue-800",
  guide: "bg-accent/10 text-accent",
  portrait: "bg-purple-100 text-purple-800",
  actualite: "bg-primary/10 text-primary",
  pronostic: "bg-accent/10 text-accent",
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
  const mdxSlugs = getMdxSlugs().map((slug) => ({ slug }));
  const newsSlugs = newsArticles.map((a) => ({ slug: a.slug }));
  // Dedupe
  const seen = new Set(mdxSlugs.map((s) => s.slug));
  const combined = [...mdxSlugs];
  for (const s of newsSlugs) {
    if (!seen.has(s.slug)) {
      combined.push(s);
      seen.add(s.slug);
    }
  }
  return combined;
}

function getNewsArticle(slug: string) {
  return newsArticles.find((a) => a.slug === slug) ?? null;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mdx = getArticleBySlug(slug);
  if (mdx) {
    const { frontmatter: fm } = mdx;
    return {
      title: fm.title,
      description: fm.description,
      alternates: { canonical: `https://www.cdm2026.fr/actualites/${slug}` },
      openGraph: { title: fm.title, description: fm.description, type: "article", publishedTime: fm.date, ...(fm.image ? { images: [fm.image] } : {}) },
    };
  }
  const news = getNewsArticle(slug);
  if (news) {
    return {
      title: news.title,
      description: news.excerpt,
      alternates: { canonical: `https://www.cdm2026.fr/actualites/${slug}` },
      openGraph: { title: news.title, description: news.excerpt, type: "article", publishedTime: news.date },
    };
  }
  return {};
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const mdx = getArticleBySlug(slug);
  const news = !mdx ? getNewsArticle(slug) : null;
  if (!mdx && !news) notFound();

  // Unified article data
  const title = mdx ? mdx.frontmatter.title : news!.title;
  const description = mdx ? mdx.frontmatter.description : news!.excerpt;
  const date = mdx ? mdx.frontmatter.date : news!.date;
  const category = mdx ? mdx.frontmatter.category : (news!.category as string);
  const tags = mdx ? mdx.frontmatter.tags : news!.tags;
  const readingTime = mdx ? mdx.frontmatter.readingTime : Math.max(1, Math.round((news!.content?.split(/\s+/).length ?? 100) / 200));
  const author = mdx ? mdx.frontmatter.author : "Xavier C.";
  const content = mdx ? mdx.content : news!.content;
  const related = mdx ? getRelatedArticles(slug, 4) : [];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    datePublished: date,
    author: { "@type": "Organization", name: author },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://www.cdm2026.fr" },
    mainEntityOfPage: `https://www.cdm2026.fr/actualites/${slug}`,
  };

  return (
    <>
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumb items={[{label:"Accueil",href:"/"},{label:"Actualités",href:"/actualites"},{label:title}]} />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[category] ?? categoryColors.actualite ?? "bg-primary/10 text-primary"}`}>
              {categoryLabels[category] ?? category}
            </span>
            <time className="text-sm text-gray-300" dateTime={date}>
              {formatDate(date)}
            </time>
            {readingTime && (
              <span className="text-sm text-gray-300">· {readingTime} min de lecture</span>
            )}
          </div>
          <h1 className="text-2xl font-extrabold sm:text-4xl mb-2">{title}</h1>
          <p className="text-gray-300 max-w-2xl">{description}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Content */}
        <article className="prose prose-lg max-w-none prose-a:text-primary prose-headings:text-gray-900">
          {mdx ? (
            <MDXRemote source={content} components={mdxComponents} />
          ) : (
            content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          )}
        </article>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share Buttons */}
        <div className="mt-8 flex items-center gap-3 border-t border-gray-200 pt-6">
          <span className="text-sm font-medium text-gray-600">Partager :</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://www.cdm2026.fr/actualites/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium hover:bg-gray-200 transition"
          >
            𝕏 Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.cdm2026.fr/actualites/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium hover:bg-gray-200 transition"
          >
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${title} https://www.cdm2026.fr/actualites/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium hover:bg-gray-200 transition"
          >
            WhatsApp
          </a>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-8 text-center text-white">
          <h3 className="text-xl font-bold mb-2">Restez informé sur la CDM 2026</h3>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Articles liés
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/actualites/${r.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${categoryColors[r.category] ?? ""}`}>
                      {categoryLabels[r.category] ?? r.category}
                    </span>
                    <time className="text-xs text-gray-500">{formatDate(r.date)}</time>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900">{r.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
