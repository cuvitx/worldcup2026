import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { bookmakerReviews, bookmakerReviewsBySlug } from "@repo/data/bookmaker-reviews";
import { guides, guidesById } from "@repo/data/guides";

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
    title: `Opinion ${bk.name} 2026 | Bono, cuotas y analisis completo`,
    description: `Opinion ${bk.name} para el Mundial 2026. ${bk.bonus} ${bk.bonusDetail}. Analisis completo: cuotas, aplicacion, apuestas en directo, retiros y servicio al cliente.`,
    openGraph: {
      title: `Opinion ${bk.name} - Apuestas deportivas Mundial 2026`,
      description: `Analisis y opinion completa de ${bk.name}. ${bk.bonus} de bono para el Mundial 2026.`,
    },
  };
}

export default async function CasaApuestasPage({ params }: PageProps) {
  const { slug } = await params;
  const bk = bookmakerReviewsBySlug[slug];
  if (!bk) notFound();

  const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
  const ratingLabels: Record<string, string> = {
    bonus: "Bono",
    odds: "Cuotas",
    app: "Aplicacion",
    live: "Apuestas en directo",
    support: "Atencion al cliente",
    withdrawal: "Retiros",
  };

  const relatedGuides = bk.sections.length > 0
    ? guides.filter((g) => g.relatedBookmakerIds.includes(bk.id)).slice(0, 4)
    : [];

  const otherBookmakers = bookmakerReviews.filter((b) => b.id !== bk.id);

  return (
    <>
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li><Link href="/apuestas" className="hover:text-primary">Apuestas</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{bk.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold">Opinion {bk.name} 2026</h1>
              <p className="mt-2 text-xl text-gray-300">{bk.tagline}</p>
              <p className="mt-1 text-gray-400">
                Fundado en {bk.foundedYear} &middot; Licencia {bk.license}
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
                rel="noopener noreferrer sponsored"
                className="mt-3 inline-block rounded-lg bg-gold px-6 py-3 text-sm font-bold text-white hover:bg-gold/90 transition-colors"
              >
                Abrir una cuenta
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Presentacion de {bk.name}</h2>
              <p className="text-gray-700">{bk.description}</p>
            </section>

            {/* Ratings */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Notas detalladas</h2>
              <div className="space-y-3">
                {Object.entries(bk.ratings).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{ratingLabels[key] ?? key}</span>
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
                <p className="text-sm text-gray-500">Nota global</p>
                <p className="text-4xl font-extrabold text-gold">{avgRating.toFixed(1)}/5</p>
              </div>
            </section>

            {/* Pros & Cons */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold">Ventajas y desventajas</h2>
              <p className="mb-4 text-sm text-gray-600">{bk.prosConsIntro}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-field/5 border border-field/20 p-4">
                  <h3 className="font-bold text-field mb-3">Ventajas</h3>
                  <ul className="space-y-2">
                    {bk.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-field mt-0.5">+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                  <h3 className="font-bold text-red-600 mb-3">Desventajas</h3>
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
              <section key={i} className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">{section.title}</h2>
                <p className="text-gray-700">{section.content}</p>
              </section>
            ))}

            {/* CTA */}
            <section className="rounded-lg bg-gold/5 border-2 border-gold p-6 text-center">
              <h2 className="mb-2 text-2xl font-extrabold text-gold">{bk.bonus}</h2>
              <p className="mb-4 text-gray-600">{bk.bonusDetail} en {bk.name}</p>
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-block rounded-lg bg-gold px-8 py-4 text-lg font-bold text-white hover:bg-gold/90 transition-colors"
              >
                Registrarse en {bk.name}
              </a>
              <p className="mt-3 text-xs text-gray-400">
                18+. Los juegos de azar conllevan riesgos. Juega responsablemente. 900 200 225.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Info {bk.name}</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Bono</dt>
                  <dd className="font-bold text-field">{bk.bonus}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Deposito minimo</dt>
                  <dd className="font-medium">{bk.minDeposit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Plazo de retiro</dt>
                  <dd className="font-medium text-right max-w-[60%]">{bk.withdrawalTime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Aplicacion</dt>
                  <dd className="font-medium">{bk.appAvailable ? "iOS & Android" : "No"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Streaming en directo</dt>
                  <dd className="font-medium">{bk.liveStreaming ? "Si" : "No"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Cash out</dt>
                  <dd className="font-medium">{bk.cashOut ? "Si" : "No"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Licencia</dt>
                  <dd className="font-medium">{bk.license}</dd>
                </div>
              </dl>
            </div>

            {/* Payment methods */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Metodos de pago</h3>
              <div className="flex flex-wrap gap-2">
                {bk.paymentMethods.map((method) => (
                  <span key={method} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Guides */}
            {relatedGuides.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Guias relacionadas</h3>
                <ul className="space-y-2">
                  {relatedGuides.map((guide) => (
                    <li key={guide.id}>
                      <Link href={`/guia/${guide.slug}`} className="text-sm text-accent hover:underline">
                        {guide.title} &rarr;
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Other bookmakers */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Otras casas de apuestas</h3>
              <ul className="space-y-2">
                {otherBookmakers.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={`/casa-apuestas/${other.slug}`}
                      className="flex items-center justify-between text-sm hover:text-accent transition-colors"
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
              name: "Mundial 2026",
            },
            reviewRating: {
              "@type": "Rating",
              ratingValue: avgRating.toFixed(1),
              bestRating: "5",
            },
            description: `Opinion ${bk.name} para el Mundial 2026. ${bk.bonus} de bono.`,
            url: `https://mundial2026.es/casa-apuestas/${bk.slug}`,
          }),
        }}
      />
    </>
  );
}
