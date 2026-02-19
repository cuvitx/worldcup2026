import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { getAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bookmakerReviews, bookmakerReviewsBySlug } from "@repo/data/bookmaker-reviews";
import { guides, guidesById } from "@repo/data/guides";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return bookmakerReviews.map((bk) => ({ slug: bk.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bk = bookmakerReviewsBySlug[slug];
  if (!bk) return {};

  return {
    title: `Avis ${bk.name} 2026 | Bonus, cotes & test complet`,
    description: `Avis ${bk.name} pour la Coupe du Monde 2026. ${bk.bonus} ${bk.bonusDetail}. Test complet : cotes, application, paris en direct, retrait et service client.`,
    alternates: getAlternates("bookmaker", slug, "fr"),
    openGraph: {
      title: `Avis ${bk.name} - Paris sportifs CDM 2026`,
      description: `Test et avis complet de ${bk.name}. ${bk.bonus} de bonus pour la CDM 2026.`,
    },
  };
}

export default async function BookmakerPage({ params }: PageProps) {
  const { slug } = await params;
  const bk = bookmakerReviewsBySlug[slug];
  if (!bk) notFound();

  const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
  const ratingLabels: Record<string, string> = {
    bonus: "Bonus",
    odds: "Cotes",
    app: "Application",
    live: "Paris en direct",
    support: "Support client",
    withdrawal: "Retrait",
  };

  const relatedGuides = bk.sections.length > 0
    ? guides.filter((g) => g.relatedBookmakerIds.includes(bk.id)).slice(0, 4)
    : [];

  const otherBookmakers = bookmakerReviews.filter((b) => b.id !== bk.id);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Accueil",url:"/"},{name:"Paris sportifs",url:"/paris-sportifs"},{name:bk.name,url:"/bookmaker/"+bk.slug}]} baseUrl={domains.fr} />
      {/* Breadcrumbs */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 flex-wrap min-w-0">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/paris-sportifs" className="hover:text-primary">Paris sportifs</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">{bk.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <h1 className="text-2xl font-extrabold sm:text-4xl">Avis {bk.name} 2026</h1>
              <p className="mt-2 text-xl text-gray-300">{bk.tagline}</p>
              <p className="mt-1 text-gray-500">
                Fonde en {bk.foundedYear} &middot; Licence {bk.license}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-2xl text-gold">{"★".repeat(Math.round(avgRating))}</span>
                <span className="text-lg font-bold">{avgRating.toFixed(1)}/5</span>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-6 text-center">
              <p className="text-3xl font-extrabold text-gold">{bk.bonus}</p>
              <p className="text-sm text-gray-300">{bk.bonusDetail}</p>
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="mt-3 inline-block rounded-lg bg-gold px-6 py-3 text-sm font-bold text-white hover:bg-gold/90 transition-colors"
              >
                Ouvrir un compte
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">Presentation de {bk.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{bk.description}</p>
            </section>

            {/* Ratings */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">Notes détaillées</h2>
              <div className="space-y-3">
                {Object.entries(bk.ratings).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{ratingLabels[key] ?? key}</span>
                      <span className="text-sm font-bold text-primary">{value}/5</span>
                    </div>
                    <div className="relative h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-primary"
                        style={{ width: `${(value / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-gold/10 border border-gold/30 p-4 text-center">
                <p className="text-sm text-gray-500">Note globale</p>
                <p className="text-2xl font-extrabold text-gold sm:text-4xl">{avgRating.toFixed(1)}/5</p>
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 dark:">Avantages et inconvenients</h2>
              <p className="mb-4 text-sm text-gray-600">{bk.prosConsIntro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-field/5 border border-field/20 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-field mb-3">Avantages</h3>
                  <ul className="space-y-2">
                    {bk.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-field mt-0.5">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-red-600 mb-3">Inconvenients</h3>
                  <ul className="space-y-2">
                    {bk.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">-</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            {bk.sections.map((section, i) => (
              <section key={i} className="rounded-lg bg-white dark:bg-slate-800 p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 dark:">{section.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
              </section>
            ))}

            {/* CTA */}
            <section className="rounded-lg bg-gold/5 border-2 border-gold p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-gold">{bk.bonus}</h2>
              <p className="mb-4 text-gray-600">{bk.bonusDetail} sur {bk.name}</p>
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-block rounded-lg bg-gold px-8 py-4 text-lg font-bold text-white hover:bg-gold/90 transition-colors"
              >
                S&apos;inscrire sur {bk.name}
              </a>
              <p className="mt-3 text-xs text-gray-500">
                18+. Les jeux d&apos;argent comportent des risques. Jouez responsablement. 09 74 75 13 13.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 dark:">Infos {bk.name}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bonus</dt>
                  <dd className="font-bold text-field">{bk.bonus}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Depot minimum</dt>
                  <dd className="font-medium">{bk.minDeposit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Delai retrait</dt>
                  <dd className="font-medium text-right max-w-[60%]">{bk.withdrawalTime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Application</dt>
                  <dd className="font-medium">{bk.appAvailable ? "iOS & Android" : "Non"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Live streaming</dt>
                  <dd className="font-medium">{bk.liveStreaming ? "Oui" : "Non"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Cash out</dt>
                  <dd className="font-medium">{bk.cashOut ? "Oui" : "Non"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Licence</dt>
                  <dd className="font-medium">{bk.license}</dd>
                </div>
              </dl>
            </div>

            {/* Payment methods */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 dark:">Moyens de paiement</h3>
              <div className="flex flex-wrap gap-2">
                {bk.paymentMethods.map((method) => (
                  <span key={method} className="rounded-full bg-gray-100 dark:bg-slate-700 px-3 py-1 text-xs font-medium text-gray-700">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 dark:">Guides utiles</h3>
                <ul className="space-y-2">
                  {relatedGuides.map((guide) => (
                    <li key={guide.id}>
                      <Link href={`/guide/${guide.slug}`} className="text-sm text-primary hover:underline">
                        {guide.title} &rarr;
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Other bookmakers */}
            <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 dark:">Autres bookmakers</h3>
              <ul className="space-y-2">
                {otherBookmakers.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/bookmaker/${other.slug}`}
                      className="flex items-center justify-between text-sm hover:text-primary transition-colors"
                    >
                      <span className="font-medium">{other.name}</span>
                      <span className="text-field">{other.bonus}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            itemReviewed: {
              "@type": "Organization",
              name: bk.name,
            },
            author: {
              "@type": "Organization",
              name: "CDM 2026",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: avgRating.toFixed(1),
              bestRating: 5,
              worstRating: 1,
            },
            description: `Avis ${bk.name} pour la CDM 2026. ${bk.bonus} de bonus.`,
            url: `${domains.fr}/bookmaker/${bk.slug}`,
          }),
        }}
      />
    </>
  );
}
