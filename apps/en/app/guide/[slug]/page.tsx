import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, guidesBySlug, guidesById } from "@repo/data/guides";
import { bookmakerReviewsById } from "@repo/data/bookmaker-reviews";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { getAlternates, getStaticAlternates, domains } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

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
    alternates: getAlternates("guide", slug, "en"),
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

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
    cdm2026: "World Cup 2026",
    strategie: "Strategies",
    bookmaker: "Bookmakers",
    debutant: "Beginner",
  };

  return (
    <>
      <BreadcrumbSchema items={[{name:"Home",url:"/"},{name:"Guides",url:"/guides"},{name:guide.title,url:`/guide/${guide.slug}`}]} baseUrl={domains.en} />
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link href="/guides" className="hover:text-primary">Guides</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{guide.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium mb-3">
            {categoryLabels[guide.category] ?? guide.category}
          </span>
          <h1 className="text-4xl font-extrabold">{guide.title}</h1>
          <p className="mt-3 text-lg text-gray-300 max-w-3xl">{guide.intro}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Table of Contents */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-bold">Table of Contents</h2>
              <ol className="space-y-2 list-decimal list-inside">
                {guide.sections.map((section, i) => (
                  <li key={i} className="text-sm text-accent">
                    <a href={`#section-${i}`} className="hover:underline">{section.title}</a>
                  </li>
                ))}
              </ol>
            </section>

            {/* Sections */}
            {guide.sections.map((section, i) => (
              <section key={i} id={`section-${i}`} className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">{section.title}</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p>{section.content}</p>
                </div>
              </section>
            ))}

            {/* Bookmaker CTA (mid-article) */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold text-primary">
                Best Bookmakers for the 2026 World Cup
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Compare the best licensed sports betting sites.
              </p>
              <div className="space-y-4">
                {bookmakers.slice(0, 3).map((bk) => {
                  const isFeatured = bk.id === featuredBookmaker.id;
                  return (
                    <div
                      key={bk.id}
                      className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-4 transition-shadow hover:shadow-md ${
                        isFeatured ? "border-gold bg-gold/5" : "border-gray-200 bg-white"
                      }`}
                    >
                      {isFeatured && (
                        <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white">
                          Recommended
                        </span>
                      )}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-bold">{bk.name}</p>
                        <p className="text-sm text-gray-500">{"★".repeat(bk.rating)}{"☆".repeat(5 - bk.rating)}</p>
                      </div>
                      <div className="flex-1 text-center">
                        <p className="text-lg font-extrabold text-field">{bk.bonus}</p>
                        <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
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
                          Bet Now
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-gray-400 text-center">
                18+. Gambling involves risk. Please gamble responsibly.
              </p>
            </section>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Recommended Guides</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedGuides.map((rg) => (
                    <Link
                      key={rg.id}
                      href={`/guide/${rg.slug}`}
                      className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                    >
                      <h3 className="font-semibold mb-1">{rg.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{rg.metaDescription}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">Start Betting</h3>
              <p className="mb-4 text-sm text-gray-600">
                Take advantage of welcome bonuses for the 2026 World Cup.
              </p>
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="block w-full text-center rounded-lg bg-accent py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                {featuredBookmaker.bonus} on {featuredBookmaker.name}
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">{featuredBookmaker.bonusDetail}</p>
            </div>

            {/* Related Bookmakers */}
            {relatedBookmakers.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Mentioned Bookmakers</h3>
                <ul className="space-y-2">
                  {relatedBookmakers.map((rb) => (
                    <li key={rb.id}>
                      <Link
                        href={`/bookmaker/${rb.slug}`}
                        className="flex items-center justify-between text-sm hover:text-accent transition-colors"
                      >
                        <span className="font-medium">{rb.name}</span>
                        <span className="text-field font-bold">{rb.bonus}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* All guides */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">All Guides</h3>
              <ul className="space-y-2">
                {guides
                  .filter((g) => g.id !== guide.id)
                  .slice(0, 6)
                  .map((g) => (
                    <li key={g.id}>
                      <Link href={`/guide/${g.slug}`} className="text-sm text-accent hover:underline">
                        {g.title} &rarr;
                      </Link>
                    </li>
                  ))}
              </ul>
              <div className="mt-3">
                <Link href="/guides" className="text-sm font-medium text-primary hover:underline">
                  View all guides &rarr;
                </Link>
              </div>
            </div>

            {/* Cross-links */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Explore</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/scorers" className="text-accent hover:underline">World Cup 2026 Scorer Odds &rarr;</Link></li>
                <li><Link href="/betting" className="text-accent hover:underline">World Cup 2026 Betting &rarr;</Link></li>
                <li><Link href="/prediction/france" className="text-accent hover:underline">France Prediction &rarr;</Link></li>
                <li><Link href="/match/schedule" className="text-accent hover:underline">Match Schedule &rarr;</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.title,
            description: guide.metaDescription,
            author: {
              "@type": "Organization",
              name: "WC 2026",
            },
            publisher: {
              "@type": "Organization",
              name: "WC 2026",
            },
            url: `${domains.en}/guide/${guide.slug}`,
          }),
        }}
      />
      {/* JSON-LD FAQPage */}
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
