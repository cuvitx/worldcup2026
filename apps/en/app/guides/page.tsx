import type { Metadata } from "next";
import Link from "next/link";
import { guides, guidesByCategory } from "@repo/data/guides";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  alternates: getStaticAlternates("guides", "en"),
  title: "World Cup 2026 Betting Guides | Strategies & Tips",
  description:
    "All our betting guides for the 2026 World Cup. Strategies, tips, beginner guides and bookmaker reviews.",
  openGraph: {
    title: "Betting Guides - World Cup 2026",
    description:
      "Complete guides for betting on the 2026 World Cup.",
  },
};

export default function GuidesPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "World Cup 2026",
    strategie: "Betting Strategies",
    bookmaker: "Bookmakers & Comparisons",
    debutant: "Beginner Guides",
  };
  const categoryDescriptions: Record<string, string> = {
    cdm2026: "Everything you need to know to bet on the 2026 World Cup.",
    strategie: "Advanced strategies to maximize your returns.",
    bookmaker: "Comparisons and reviews of the best bookmakers.",
    debutant: "The basics of sports betting to get started.",
  };

  const categories = ["cdm2026", "strategie", "bookmaker", "debutant"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Guides</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">World Cup 2026 Betting Guides</h1>
          <p className="mt-2 text-gray-300">
            {guides.length} complete guides for betting on the 2026 World Cup. Strategies, beginner tips and bookmaker reviews.
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
                    <p className="mt-3 text-xs font-bold text-accent">Read guide &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Bookmaker reviews links */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Bookmaker Reviews</h2>
          <p className="mb-4 text-sm text-gray-500">
            Detailed tests and reviews of the best licensed bookmakers.
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
          <h2 className="mb-4 text-lg font-bold">See Also</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/betting" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              World Cup 2026 Betting
            </Link>
            <Link href="/scorers" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Scorer Odds
            </Link>
            <Link href="/prediction/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              France Prediction
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
