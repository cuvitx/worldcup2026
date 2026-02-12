import type { Metadata } from "next";
import Link from "next/link";
import { bookmakerReviews } from "@repo/data/bookmaker-reviews";
import { guides, guidesByCategory } from "@repo/data/guides";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const metadata: Metadata = {
  alternates: getStaticAlternates("betting", "en"),
  title: "World Cup 2026 Betting | Best Bookmakers & Guides",
  description:
    "Comparison of the best sports betting sites for the 2026 World Cup. Reviews, bonuses, odds and strategy guides for betting on the World Cup 2026.",
  openGraph: {
    title: "Betting - World Cup 2026",
    description:
      "Best bookmakers, guides and strategies for betting on the 2026 World Cup.",
  },
};

export default function BettingPage() {
  const categoryLabels: Record<string, string> = {
    cdm2026: "World Cup 2026",
    strategie: "Betting Strategies",
    bookmaker: "Bookmakers",
    debutant: "Beginner",
  };

  const categories = ["cdm2026", "strategie", "bookmaker", "debutant"] as const;

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Betting</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">World Cup 2026 Betting</h1>
          <p className="mt-2 text-gray-300">
            Comparison of the best bookmakers, betting guides and strategies for the 2026 World Cup.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Bookmaker Reviews */}
        <section className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold">Best Sports Betting Sites 2026</h2>
          <p className="mb-6 text-sm text-gray-600">
            Our detailed reviews of {bookmakerReviews.length} licensed bookmakers for betting on the 2026 World Cup.
          </p>
          <div className="space-y-4">
            {bookmakerReviews.map((bk, i) => {
              const avgRating = Object.values(bk.ratings).reduce((a, b) => a + b, 0) / 6;
              return (
                <Link
                  key={bk.id}
                  href={`/bookmaker/${bk.slug}`}
                  className={`relative flex flex-col sm:flex-row items-center gap-4 rounded-lg border-2 p-5 transition-all hover:shadow-md ${
                    i === 0 ? "border-gold bg-gold/5" : "border-gray-200 hover:border-accent"
                  }`}
                >
                  {i === 0 && (
                    <span className="absolute -top-3 left-4 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-white">
                      #1 Recommended
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
                      <p className="text-xs text-gray-500">Odds</p>
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
                      Read Review &rarr;
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
                    href={`/guide/${guide.slug}`}
                    className="rounded-lg border border-gray-200 p-4 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <h3 className="font-semibold mb-1">{guide.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{guide.metaDescription}</p>
                    <p className="mt-2 text-xs font-medium text-accent">Read guide &rarr;</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        {/* Cross-links */}
        <section className="rounded-lg bg-primary/5 p-6">
          <h2 className="mb-4 text-lg font-bold">See Also</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/scorers" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              World Cup 2026 Scorer Odds
            </Link>
            <Link href="/prediction/france" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              France Prediction
            </Link>
            <Link href="/match/schedule" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              Match Schedule
            </Link>
            <Link href="/teams" className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-primary border border-primary/20 hover:bg-primary hover:text-white transition-colors">
              All Teams
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
