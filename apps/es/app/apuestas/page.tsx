import type { Metadata } from "next";
import Link from "next/link";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides, guidesByCategory } from "@repo/data/guides";

export const metadata: Metadata = {
  title: "Apuestas deportivas Mundial 2026 | Mejores casas de apuestas y guias",
  description:
    "Comparativa de las mejores casas de apuestas deportivas para el Mundial 2026. Opiniones, bonos, cuotas y guias estrategicas para apostar en el Mundial 2026.",
  openGraph: {
    title: "Apuestas deportivas - Mundial 2026",
    description:
      "Mejores casas de apuestas, guias y estrategias para apostar en el Mundial 2026.",
  },
};

export default function ApuestasPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "Mundial 2026",
    strategie: "Estrategias de apuestas",
    bookmaker: "Casas de apuestas",
    debutant: "Principiante",
  };

  const categories = ["cdm2026", "strategie", "bookmaker", "debutant"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Apuestas</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Apuestas deportivas Mundial 2026</h1>
          <p className="mt-2 text-gray-300">
            Comparativa de las mejores casas de apuestas, guias de apuestas y estrategias para el Mundial 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Bookmaker Reviews */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Mejores casas de apuestas deportivas 2026</h2>
          <p className="mb-6 text-sm text-gray-600">
            Nuestras opiniones detalladas sobre las {bookmakerReviews.length} casas de apuestas para apostar en el Mundial 2026.
          </p>
          <div className="space-y-4">
            {bookmakerReviews.map((bk, i) => {
              const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
              return (
                <Link
                  key={bk.id}
                  href={`/casa-apuestas/${bk.slug}`}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-5 transition-all hover:shadow-md ${
                    i === 0 ? "border-gold bg-gold/5" : "border-gray-200 hover:border-accent"
                  }`}
                >
                  {i === 0 && (
                    <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white">
                      #1 Recomendado
                    </span>
                  )}
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xl font-bold">{bk.name}</p>
                    <p className="text-sm text-gray-500">{bk.tagline}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-gold">{"★".repeat(Math.round(avgRating))}</span>
                      <span className="text-xs text-gray-400">{avgRating.toFixed(1)}/5</span>
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-2xl font-extrabold text-field">{bk.bonus}</p>
                    <p className="text-xs text-gray-500">{bk.bonusDetail}</p>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Cuotas</p>
                      <p className="font-bold text-primary">{bk.ratings.odds}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">App</p>
                      <p className="font-bold text-primary">{bk.ratings.app}/5</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Live</p>
                      <p className="font-bold text-primary">{bk.ratings.live}/5</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white">
                      Ver opinion &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Guides by category */}
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          return (
            <section key={cat} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">{categoryLabels[cat]}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guia/${guide.slug}`}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <h3 className="font-semibold mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.metaDescription}</p>
                    <p className="mt-2 text-xs font-medium text-accent">Leer la guia &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className="rounded-lg bg-primary/5 p-6">
          <h2 className="mb-4 text-lg font-bold">Ver tambien</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/goleadores" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cuotas goleadores Mundial 2026
            </Link>
            <Link href="/pronostico/mexico" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Pronostico Mexico
            </Link>
            <Link href="/match/calendario" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Calendario de partidos
            </Link>
            <Link href="/equipos" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Todas las selecciones
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
