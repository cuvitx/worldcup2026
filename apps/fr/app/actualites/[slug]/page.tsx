import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles, getMdxSlugs } from "../../../lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "../../../lib/mdx-components";
import { Breadcrumb } from "@repo/ui/breadcrumb";
const categoryColors: Record<string, string> = {
  analyse: "bg-blue-100 text-blue-800blue-900/30",
  guide: "bg-accent/10 text-accentaccent/10",
  portrait: "bg-purple-100 text-purple-800purple-900/30",
  actualite: "bg-primary/10 text-primarysecondary/20",
  pronostic: "bg-accent/10 text-accentaccent/10",
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
  return getMdxSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mdx = getArticleBySlug(slug);
  if (!mdx) return {};
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const mdx = getArticleBySlug(slug);
  if (!mdx) notFound();

  const { frontmatter: fm, content } = mdx;
  const related = getRelatedArticles(slug, 4);

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
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumb items={[{label:"Accueil",href:"/"},{label:"Actualités",href:"/actualites"},{label:fm.title}]} />

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
        <article className="prose prose-lg max-w-none prose-a:text-primary prose-headings:text-gray-900">
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        {/* Tags */}
        {fm.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {fm.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600gray-700"
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
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(fm.title)}&url=${encodeURIComponent(`https://cdm2026.fr/actualites/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium hover:bg-gray-200 transition"
          >
            𝕏 Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://cdm2026.fr/actualites/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-medium hover:bg-gray-200 transition"
          >
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${fm.title} https://cdm2026.fr/actualites/${slug}`)}`}
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
