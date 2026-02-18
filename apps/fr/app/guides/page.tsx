import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidesByCategory } from "@repo/data/guides";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";

export const metadata: Metadata = {
  title: "Guides paris sportifs CDM 2026 | Strategies & conseils",
  description:
    "Tous nos guides de paris sportifs pour la Coupe du Monde 2026. Strategies, conseils, guides debutants et analyses de bookmakers.",
  alternates: getStaticAlternates("guides", "fr"),
  openGraph: {
    title: "Guides paris sportifs - CDM 2026",
    description:
      "Guides complets pour parier sur la Coupe du Monde 2026.",
  },
};

export default function GuidesPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "Coupe du Monde 2026",
    stratégie: "Strategies de paris",
    bookmaker: "Bookmakers & comparatifs",
    debutant: "Guides debutant",
  };
  const categoryDescriptions: Record<string, string> = {
    cdm2026: "Tout ce qu'il faut savoir pour parier sur la CDM 2026.",
    stratégie: "Strategies avancées pour maximiser vos gains.",
    bookmaker: "Comparatifs et analyses des meilleurs bookmakers.",
    debutant: "Les bases des paris sportifs pour bien debuter.",
  };

  const categories = ["cdm2026", "stratégie", "bookmaker", "debutant"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Accueil</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Guides</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Guides paris sportifs CDM 2026</h1>
          <p className="mt-2 text-gray-300">
            {guides.length} guides complets pour parier sur la Coupe du Monde 2026. Strategies, conseils debutants et analyses de bookmakers.
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
                    href={`/guide/${guide.slug}`}
                    className="rounded-lg border border-gray-200 p-5 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <h3 className="font-bold mb-2">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.intro}</p>
                    <p className="mt-3 text-xs font-bold text-accent">Lire le guide &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bookmaker reviews links */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Avis bookmakers</h2>
          <p className="mb-4 text-sm text-gray-500">
            Tests et avis détaillés des meilleurs bookmakers agréés en France.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bookmakerReviews.map((bk) => (
              <Link
                key={bk.id}
                href={`/bookmaker/${bk.slug}`}
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
          <h2 className="mb-4 text-lg font-bold">Voir aussi</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/paris-sportifs" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Paris sportifs CDM 2026
            </Link>
            <Link href="/buteurs" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Cotes buteurs
            </Link>
            <Link href="/pronostic/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Pronostic France
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
