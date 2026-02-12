import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { players, playersBySlug, playersByTeamId } from "@repo/data/players";
import { teamsById } from "@repo/data/teams";
import { scorerOddsById, topScorerRanking } from "@repo/data/scorers";
import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";
import { predictionsByTeamId } from "@repo/data/predictions";
import { getAlternates, getStaticAlternates, domains } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return players
    .filter((p) => p.position === "FW" || p.position === "MF")
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  const team = teamsById[player.teamId];

  return {
    alternates: getAlternates("scorer", slug, "en"),
    title: `Scorer Odds ${player.name} World Cup 2026 | Goals, Stats & Prediction`,
    description: `Scorer odds for ${player.name} (${team?.name}) at the 2026 World Cup. ${player.goals} goals in ${player.caps} caps, goal probabilities, anytime scorer and top scorer odds.`,
    openGraph: {
      title: `${team?.flag ?? ""} Scorer Odds ${player.name} - World Cup 2026`,
      description: `Stats and scorer odds for ${player.name} at the 2026 World Cup.`,
    },
  };
}

export default async function ScorerPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player || (player.position !== "FW" && player.position !== "MF")) notFound();

  const team = teamsById[player.teamId];
  const scorer = scorerOddsById[player.id];
  const teamPred = team ? predictionsByTeamId[team.id] : undefined;
  const teammates = (team ? playersByTeamId[team.id] ?? [] : [])
    .filter((p) => p.id !== player.id && (p.position === "FW" || p.position === "MF"));

  const positionLabel = player.position === "FW" ? "Forward" : "Midfielder";
  const goalsPerCap = player.caps > 0 ? (player.goals / player.caps).toFixed(3) : "0";

  // Find rank in top scorer ranking
  const topRank = topScorerRanking.findIndex((s) => s.playerId === player.id);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Home",url:"/"},{name:"Scorers",url:"/scorers"},{name:player.name,url:`/scorer/${player.slug}`}]} baseUrl={domains.en} />
      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link href="/scorers" className="hover:text-primary">Scorers</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{player.name}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6">
            <span className="text-7xl">{team?.flag ?? "\u26bd"}</span>
            <div>
              <h1 className="text-4xl font-extrabold">
                Scorer Odds {player.name}
              </h1>
              <p className="mt-2 text-xl text-gray-300">
                {positionLabel} &middot; {player.club}
              </p>
              <p className="mt-1 text-gray-400">
                {team?.name} &middot; {player.caps} caps &middot; {player.goals} goals
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scoring Stats */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Goal Statistics</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.goals}</p>
                  <p className="text-xs text-gray-500 mt-1">International Goals</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{player.caps}</p>
                  <p className="text-xs text-gray-500 mt-1">Caps</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center">
                  <p className="text-3xl font-extrabold text-primary">{goalsPerCap}</p>
                  <p className="text-xs text-gray-500 mt-1">Goals/Match</p>
                </div>
                <div className="rounded-lg bg-gold/10 p-4 text-center">
                  <p className="text-3xl font-extrabold text-gold">{scorer?.expectedGoals ?? "\u2014"}</p>
                  <p className="text-xs text-gray-500 mt-1">Expected WC Goals</p>
                </div>
              </div>
              {scorer && (
                <p className="mt-4 text-sm text-gray-600">
                  With a ratio of {goalsPerCap} goals per international match and a team likely to progress through
                  several rounds, {player.name} has an expected <strong>{scorer.expectedGoals} goals</strong> during
                  the 2026 World Cup according to our Poisson model.
                </p>
              )}
            </section>

            {/* Odds Table */}
            {scorer && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Scorer Odds - {player.name}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="pb-3 font-medium text-gray-500">Market</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Probability</th>
                        <th className="pb-3 font-medium text-gray-500 text-right">Estimated Odds</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 font-medium">Anytime Scorer (1+ goal)</td>
                        <td className="py-3 text-right">{(scorer.anytimeScorerProb * 100).toFixed(1)}%</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over05GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 font-medium">2+ goals in the tournament</td>
                        <td className="py-3 text-right">&mdash;</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over15GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 font-medium">3+ goals in the tournament</td>
                        <td className="py-3 text-right">&mdash;</td>
                        <td className="py-3 text-right font-bold text-field">{scorer.over25GoalsOdds}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 bg-gold/5">
                        <td className="py-3 font-bold">Top Scorer World Cup 2026</td>
                        <td className="py-3 text-right">{(scorer.topScorerProb * 100).toFixed(2)}%</td>
                        <td className="py-3 text-right font-extrabold text-gold">{scorer.topScorerOdds}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs text-gray-400">
                  Odds are estimated by our statistical model (Poisson distribution + ELO rating) with
                  a bookmaker margin of ~8%. These are indicative only.
                </p>
              </section>
            )}

            {/* Analysis Text */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Analysis: {player.name} World Cup 2026 Scorer</h2>
              <div className="prose prose-sm max-w-none text-gray-700 space-y-3">
                <p>
                  {player.name} ({player.age} years old) plays as a {positionLabel.toLowerCase()} for {player.club} and
                  has scored {player.goals} goals in {player.caps} caps for {team?.name ?? "his national team"}.
                </p>
                {team && teamPred && (
                  <p>
                    {team.name} is ranked #{team.fifaRanking} in the FIFA rankings and has a{" "}
                    {(teamPred.winnerProb * 100).toFixed(1)}% chance of winning the tournament according to our ELO model.
                    The further the team advances in the competition, the more matches {player.name} will have to score.
                  </p>
                )}
                {scorer && scorer.expectedGoals >= 2 && (
                  <p>
                    With <strong>{scorer.expectedGoals} expected goals</strong>, {player.name} is among the most
                    dangerous scorers in the tournament. The anytime scorer odds of {scorer.anytimeScorerOdds} reflect a
                    high probability of scoring at least one goal during the World Cup.
                  </p>
                )}
                {scorer && scorer.expectedGoals < 2 && scorer.expectedGoals >= 0.5 && (
                  <p>
                    With {scorer.expectedGoals} expected goals, {player.name} has the profile of an occasional scorer during
                    the tournament. The odds of {scorer.anytimeScorerOdds} may represent value if the player is in
                    form when the tournament begins.
                  </p>
                )}
                <p>
                  To bet on {player.name} as a scorer, compare the odds across different licensed bookmakers.
                  Actual odds may offer value compared to our estimates.
                </p>
              </div>
            </section>

            {/* Teammates */}
            {teammates.length > 0 && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Other {team?.name} Scorers</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {teammates.map((tm) => {
                    const tmScorer = scorerOddsById[tm.id];
                    return (
                      <Link
                        key={tm.id}
                        href={`/scorer/${tm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent hover:bg-accent/5"
                      >
                        <div>
                          <p className="font-semibold">{tm.name}</p>
                          <p className="text-xs text-gray-500">{tm.position === "FW" ? "Forward" : "Midfielder"} &middot; {tm.club}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">{tmScorer?.expectedGoals ?? "\u2014"} exp. goals</p>
                          <p className="text-xs text-gray-400">Odds {tmScorer?.anytimeScorerOdds ?? "\u2014"}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Affiliate CTA */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-bold text-primary">
                Bet on {player.name} to Score
              </h2>
              <p className="mb-6 text-sm text-gray-600">
                Compare the best sports betting sites to bet on {player.name} as a scorer at the 2026 World Cup.
              </p>
              <div className="space-y-4">
                {bookmakers.map((bk) => {
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
                          rel="noopener noreferrer sponsored"
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Scorer Profile</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Position</dt>
                  <dd className="font-medium">{positionLabel}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Club</dt>
                  <dd className="font-medium">{player.club}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Age</dt>
                  <dd className="font-medium">{player.age}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Caps</dt>
                  <dd className="font-medium">{player.caps}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Goals</dt>
                  <dd className="font-bold text-primary">{player.goals}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Goals/Match Ratio</dt>
                  <dd className="font-bold text-primary">{goalsPerCap}</dd>
                </div>
                {scorer && (
                  <>
                    <div className="border-t border-gray-100 pt-3 flex justify-between">
                      <dt className="text-gray-500">Expected WC Goals</dt>
                      <dd className="font-bold text-gold">{scorer.expectedGoals}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Scorer Odds</dt>
                      <dd className="font-bold text-field">{scorer.anytimeScorerOdds}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Top Scorer Odds</dt>
                      <dd className="font-bold text-gold">{scorer.topScorerOdds}</dd>
                    </div>
                  </>
                )}
                {topRank >= 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Scorer Ranking</dt>
                    <dd className="font-bold text-gold">#{topRank + 1}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-4 space-y-2">
                <Link
                  href={`/player/${player.slug}`}
                  className="block w-full text-center rounded-lg bg-primary py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
                >
                  Full Player Profile &rarr;
                </Link>
                {team && (
                  <Link
                    href={`/team/${team.slug}`}
                    className="block w-full text-center rounded-lg border border-primary py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                  >
                    {team.flag} {team.name} Profile &rarr;
                  </Link>
                )}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Bet on {player.name}
              </h3>
              {scorer && (
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Scorer Odds</span>
                    <span className="font-bold text-field">{scorer.anytimeScorerOdds}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Expected Goals</span>
                    <span className="font-bold text-gold">{scorer.expectedGoals}</span>
                  </div>
                </div>
              )}
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full text-center rounded-lg bg-accent py-3 text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                {featuredBookmaker.bonus} on {featuredBookmaker.name}
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">
                {featuredBookmaker.bonusDetail}
              </p>
            </div>

            {/* Guide link */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold">Scorer Betting Guides</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/guide/parier-buteurs" className="text-accent hover:underline">
                    How to Bet on World Cup 2026 Scorers &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/guide/comment-parier-cdm-2026" className="text-accent hover:underline">
                    Complete World Cup Betting Guide &rarr;
                  </Link>
                </li>
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
            "@type": "Person",
            name: player.name,
            jobTitle: "Football Player",
            memberOf: {
              "@type": "SportsTeam",
              name: team?.name ?? "",
            },
            description: `Scorer odds for ${player.name} at the 2026 World Cup. ${player.goals} goals in ${player.caps} caps.`,
            url: `https://worldcup2026guide.com/scorer/${player.slug}`,
          }),
        }}
      />
    </>
  );
}
