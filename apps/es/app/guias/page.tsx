import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidesByCategory } from "@repo/data/guides";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  title: "Guias de apuestas deportivas Mundial 2026 | Estrategias y consejos",
  description:
    "Todas nuestras guias de apuestas deportivas para el Mundial 2026. Estrategias, consejos, guias para principiantes y analisis de casas de apuestas.",
  openGraph: {
    title: "Guias de apuestas deportivas - Mundial 2026",
    description:
      "Guias completas para apostar en el Mundial 2026.",
  },
  alternates: getStaticAlternates("guides", "es"),
};

export default function GuiasPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "Mundial 2026",
    strategie: "Estrategias de apuestas",
    bookmaker: "Casas de apuestas y comparativas",
    debutant: "Guias para principiantes",
  };
  const categoryDescriptions: Record<string, string> = {
    cdm2026: "Todo lo que necesitas saber para apostar en el Mundial 2026.",
    strategie: "Estrategias avanzadas para maximizar tus ganancias.",
    bookmaker: "Comparativas y analisis de las mejores casas de apuestas.",
    debutant: "Los fundamentos de las apuestas deportivas para empezar bien.",
  };

  const categories = ["cdm2026", "strategie", "bookmaker", "debutant"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Inicio</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Guias</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Guias de apuestas Mundial 2026</h1>
          <p className="mt-2 text-gray-300">
            {guides.length} guias completas para apostar en el Mundial 2026. Estrategias, consejos para principiantes y analisis de casas de apuestas.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* All guides by category */}
        {categories.map((cat) => {
          const catGuides = guidesByCategory[cat];
          if (!catGuides || catGuides.length === 0) return null;
          return (
            <section key={cat} className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-1 text-xl font-bold">{categoryLabels[cat]}</h2>
              <p className="mb-4 text-sm text-gray-500">{categoryDescriptions[cat]}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {catGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/guia/${guide.slug}`}
                    className="rounded-lg border border-gray-200 p-5 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <h3 className="font-bold mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.intro}</p>
                    <p className="mt-3 text-xs font-bold text-accent">Leer la guia &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bookmaker reviews links */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Opiniones casas de apuestas</h2>
          <p className="mb-4 text-sm text-gray-500">
            Analisis y opiniones detalladas de las mejores casas de apuestas deportivas.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmakerReviews.map((bk) => (
              <Link
                key={bk.id}
                href={`/casa-apuestas/${bk.slug}`}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
              >
                <div>
                  <p className="font-bold">{bk.name}</p>
                  <p className="text-xs text-gray-500">{bk.tagline}</p>
                </div>
                <p className="font-bold text-field">{bk.bonus}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="rounded-lg bg-primary/5 p-6">
          <h2 className="mb-4 text-lg font-bold">Ver tambien</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/apuestas" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Apuestas deportivas Mundial 2026
            </Link>
            <Link href="/goleadores" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cuotas goleadores
            </Link>
            <Link href="/pronostico/mexico" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Pronostico Mexico
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
