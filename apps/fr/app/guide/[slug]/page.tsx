import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, guidesBySlug, guidesById } from "@repo/data/guides";
import { bookmakerReviewsById } from "@repo/data/bookmaker-reviews";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { AuthorBox } from "../../components/AuthorBox";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesBySlug[slug];
  if (!guide) return {};

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: getAlternates("guide", slug, "fr"),
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

const sectionIcons = ["🎯", "📊", "💡", "⚡", "🔑", "📋", "🏆", "🎲", "📈", "🛡️"];

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guidesBySlug[slug];
  if (!guide) notFound();

  const relatedGuides = guide.relatedGuideIds
    .map((id) => guidesById[id])
    .filter((g): g is NonNullable<typeof g> => g != null);

  const relatedBookmakers = guide.relatedBookmakerIds
    .map((id) => bookmakerReviewsById[id])
    .filter((b): b is NonNullable<typeof b> => b != null);

  const categoryLabels: Record<string, string> = {
    cdm2026: "Coupe du Monde 2026",
    stratégie: "Strategies",
    bookmaker: "Bookmakers",
    debutant: "Debutant",
  };

  // Insert CTA after every 2 sections
  const ctaInterval = 2;

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Guides",url:"/guides"},{name:guide.title,url:"/guide/"+guide.slug}]} baseUrl={domains.fr} />
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/guides" className="hover:text-primary">Guides</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">{guide.title}</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium mb-3">
            {categoryLabels[guide.category] ?? guide.category}
          </span>
          <h1 className="text-2xl font-extrabold sm:text-4xl">{guide.title}</h1>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl">{guide.intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-6 min-w-0">
            {/* Sections with interleaved CTAs */}
            {guide.sections.map((section, i) => (
              <div key={i}>
                <section id={`section-${i}`} className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span className="text-2xl">{sectionIcons[i % sectionIcons.length]}</span>
                    {section.title}
                  </h2>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p>{section.content}</p>
                  </div>
                </section>

                {/* CTA between sections */}
                {(i + 1) % ctaInterval === 0 && i < guide.sections.length - 1 && (
                  <div className="my-6 rounded-xl bg-gradient-to-r from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 border border-accent/20 p-5 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 dark:text-gray-100">🎯 Prêt à parier ?</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{featuredBookmaker.bonus} chez {featuredBookmaker.name}</p>
                    </div>
                    <a
                      href={featuredBookmaker.url}
                      target="_blank"
                      rel="noopener noreferrer sponsored nofollow"
                      className="shrink-0 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
                    >
                      Voir l&apos;offre →
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Bookmaker CTA block */}
            <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="mb-2 text-xl font-bold text-primary">
                Meilleurs bookmakers pour la CDM 2026
              </h2>
              <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                Comparez les meilleurs sites de paris sportifs agréés en France.
              </p>
              <div className="space-y-4">
                {bookmakers.slice(0, 3).map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-gold bg-gold/5 dark:bg-gold/10" : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white">
                          Recommande
                        </span>
                      )}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{bk.name}</p>
                        <p className="text-sm text-gray-500">{"★".repeat(bk.rating)}{"☆".repeat(5 - bk.rating)}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-extrabold text-field">{bk.bonus}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{bk.bonusDetail}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <a
                          href={bk.url}
                          target="_blank"
                          rel="noopener noreferrer sponsored nofollow"
                          className={`inline-block rounded-lg px-6 py-3 text-sm font-bold text-white transition-colors ${
                            isFeatured ? "bg-gold hover:bg-gold/90" : "bg-accent hover:bg-accent/90"
                          }`}
                        >
                          Parier
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gray-500 text-center">
                18+. Les jeux d&apos;argent comportent des risques. Jouez responsablement.
              </p>
            </section>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Guides recommandes</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedGuides.map((rg) => (
                    <Link
                      key={rg.id}
                      href={`/guide/${rg.slug}`}
                      className="rounded-xl border border-gray-200 dark:border-gray-600 p-4 transition-all hover:border-accent hover:bg-accent/5 hover:shadow-md"
                    >
                      <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">{rg.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{rg.metaDescription}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Other Guides */}
            {guides.filter((g) => g.id !== guide.id && !guide.relatedGuideIds.includes(g.id)).length > 0 && (
              <section className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">Guides liés</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {guides
                    .filter((g) => g.id !== guide.id && !guide.relatedGuideIds.includes(g.id))
                    .slice(0, 4)
                    .map((g) => (
                      <Link
                        key={g.id}
                        href={`/guide/${g.slug}`}
                        className="rounded-xl border border-gray-200 dark:border-gray-600 p-4 transition-all hover:border-accent hover:bg-accent/5 hover:shadow-md"
                      >
                        <h3 className="font-semibold mb-1 text-gray-900 dark:text-gray-100">{g.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{g.metaDescription}</p>
                      </Link>
                    ))}
                </div>
              </section>
            )}

            <AuthorBox />
          </div>

          {/* Sidebar - Sticky TOC + CTA */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              {/* Table of Contents */}
              <nav className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="mb-3 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">📑 Sommaire</h3>
                <ol className="space-y-2">
                  {guide.sections.map((section, i) => (
                    <li key={i}>
                      <a
                        href={`#section-${i}`}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
                      >
                        <span className="shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="line-clamp-2">{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {/* CTA */}
              <div className="rounded-xl bg-accent/5 dark:bg-accent/10 border border-accent/20 p-5">
                <h3 className="mb-2 text-lg font-bold text-accent">Commencer a parier</h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Profitez des bonus de bienvenue pour la CDM 2026.
                </p>
                <a
                  href={featuredBookmaker.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  className="block w-full text-center rounded-lg bg-accent py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
                >
                  {featuredBookmaker.bonus} sur {featuredBookmaker.name}
                </a>
                <p className="mt-2 text-xs text-gray-500 text-center">{featuredBookmaker.bonusDetail}</p>
              </div>

              {/* Related Bookmakers */}
              {relatedBookmakers.length > 0 && (
                <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                  <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Bookmakers cites</h3>
                  <ul className="space-y-2">
                    {relatedBookmakers.map((rb) => (
                      <li key={rb.id}>
                        <Link
                          href={`/bookmaker/${rb.slug}`}
                          className="flex items-center justify-between text-sm hover:text-accent transition-colors"
                        >
                          <span className="font-medium text-gray-700 dark:text-gray-300">{rb.name}</span>
                          <span className="text-field font-bold">{rb.bonus}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* All guides */}
              <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Tous nos guides</h3>
                <ul className="space-y-2">
                  {guides
                    .filter((g) => g.id !== guide.id)
                    .slice(0, 6)
                    .map((g) => (
                      <li key={g.id}>
                        <Link href={`/guide/${g.slug}`} className="text-sm text-accent hover:underline">
                          {g.title} →
                        </Link>
                      </li>
                    ))}
                </ul>
                <div className="mt-3">
                  <Link href="/guides" className="text-sm font-medium text-primary hover:underline">
                    Voir tous les guides →
                  </Link>
                </div>
              </div>

              {/* Explorer */}
              <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="mb-4 text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Explorer</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/buteurs" className="text-accent hover:underline">Cotes buteurs CDM 2026 →</Link></li>
                  <li><Link href="/paris-sportifs" className="text-accent hover:underline">Paris sportifs CDM 2026 →</Link></li>
                  <li><Link href="/pronostic/france" className="text-accent hover:underline">Pronostic France →</Link></li>
                  <li><Link href="/match/calendrier" className="text-accent hover:underline">Calendrier des matchs →</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.metaDescription,
            datePublished: "2025-01-15",
            dateModified: "2025-02-15",
            author: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
            publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr", logo: { "@type": "ImageObject", url: "https://cdm2026.fr/icon-512.png" } },
            mainEntityOfPage: `${domains.fr}/guide/${guide.slug}`,
            url: `${domains.fr}/guide/${guide.slug}`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guide.sections.map((section) => ({
              "@type": "Question",
              name: section.title,
              acceptedAnswer: {
                "@type": "Answer",
                text: section.content.slice(0, 500),
              },
            })),
          }),
        }}
      />
    </>
  );
}
