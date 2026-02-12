import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { teamsById } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";
import { h2hByPair } from "@repo/data/h2h";
import { stadiumsById } from "@repo/data/stadiums";
import { citiesById } from "@repo/data/cities";
import {
  bookmakers,
  featuredBookmaker,
  estimatedMatchOdds,
} from "@repo/data/affiliates";
import { getAlternates, getStaticAlternates, domains } from "@repo/data/route-mapping";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";

export const revalidate = 300;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const stageLabels: Record<string, string> = {
  group: "Group Stage",
  "round-of-32": "Round of 32",
  "round-of-16": "Round of 16",
  "quarter-final": "Quarter-final",
  "semi-final": "Semi-final",
  "third-place": "Third Place Match",
  final: "Final",
};

export async function generateStaticParams() {
  return matches.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) return {};

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];

  const homeName = home?.name ?? "TBD";
  const awayName = away?.name ?? "TBD";

  return {
    alternates: getAlternates("predictionMatch", slug, "en"),
    title: `${homeName} vs ${awayName} Prediction | Odds & Analysis WC 2026`,
    description: `${homeName} vs ${awayName} prediction for the 2026 World Cup: estimated odds, predicted score, match analysis and head-to-head history. Bet on ${homeName} - ${awayName} WC 2026.`,
    openGraph: {
      title: `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""} Prediction | WC 2026`,
      description: `Odds, prediction and analysis for ${homeName} - ${awayName}. 2026 World Cup.`,
    },
  };
}

export default async function PredictionMatchPage({ params }: PageProps) {
  const { slug } = await params;
  const match = matches.find((m) => m.slug === slug);
  if (!match) notFound();

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];
  const city = stadium ? citiesById[stadium.cityId] : null;
  const stage = stageLabels[match.stage] ?? match.stage;

  // Predictions
  const prediction =
    home && away
      ? matchPredictionByPair[`${home.id}:${away.id}`]
      : undefined;
  const predHome = home ? predictionsByTeamId[home.id] : undefined;
  const predAway = away ? predictionsByTeamId[away.id] : undefined;

  // Estimated odds
  const odds = prediction
    ? estimatedMatchOdds(
        prediction.team1WinProb,
        prediction.drawProb,
        prediction.team2WinProb
      )
    : null;

  // H2H
  const h2h =
    home && away ? h2hByPair[`${home.id}:${away.id}`] : undefined;

  // Date formatting
  const dateFormatted = new Date(match.date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const homeName = home?.name ?? "TBD";
  const awayName = away?.name ?? "TBD";

  // Find the most likely outcome
  const outcomes = prediction
    ? [
        { key: "1", label: `${homeName} win`, prob: prediction.team1WinProb },
        { key: "X", label: "Draw", prob: prediction.drawProb },
        { key: "2", label: `${awayName} win`, prob: prediction.team2WinProb },
      ]
    : [];
  const maxProb = Math.max(...outcomes.map((o) => o.prob));

  // Related matches (same matchday or group)
  const relatedMatches = matches.filter(
    (m) =>
      m.id !== match.id &&
      ((match.group && m.group === match.group) ||
        (match.matchday && m.matchday === match.matchday && m.stage === "group"))
  ).slice(0, 6);

  return (
    <>
      <BreadcrumbSchema items={[{name:"Home",url:"/"},{name:"Schedule",url:"/match/schedule"},{name:"Prediction",url:`/prediction-match/${match.slug}`}]} baseUrl={domains.en} />
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/schedule" className="hover:text-primary">
                Schedule
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              {homeName} vs {awayName} Prediction
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-center text-sm text-gold font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Group ${match.group}` : ""}
            {match.matchday ? ` - Matchday ${match.matchday}` : ""}
          </p>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {home ? (
                <Link
                  href={`/team/${home.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {home.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">TBD</p>
              )}
              {home && (
                <p className="text-sm text-gray-400">#{home.fifaRanking} FIFA</p>
              )}
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold text-gold">VS</span>
              <p className="mt-1 text-sm text-gray-400">{match.time} UTC</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-6xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {away ? (
                <Link
                  href={`/team/${away.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {away.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">TBD</p>
              )}
              {away && (
                <p className="text-sm text-gray-400">#{away.fifaRanking} FIFA</p>
              )}
            </div>
          </div>
          <p className="mt-6 text-center text-gray-300">
            {dateFormatted}
            {stadium ? ` | ${stadium.name}` : ""}
            {city ? `, ${city.name}` : ""}
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1X2 Prediction */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-bold">
                  1X2 Prediction: {homeName} vs {awayName}
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {outcomes.map((outcome) => {
                    const isHighlighted = outcome.prob === maxProb;
                    const pct = Math.round(outcome.prob * 100);
                    return (
                      <div
                        key={outcome.key}
                        className={`relative rounded-lg p-5 text-center transition-all ${
                          isHighlighted
                            ? "bg-accent/10 border-2 border-accent ring-2 ring-accent/20"
                            : "bg-gray-50 border border-gray-200"
                        }`}
                      >
                        {isHighlighted && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-white">
                            Favourite
                          </span>
                        )}
                        <p className="text-sm font-medium text-gray-500 mb-1">
                          {outcome.key}
                        </p>
                        <p
                          className={`text-3xl font-extrabold ${
                            isHighlighted ? "text-accent" : "text-gray-700"
                          }`}
                        >
                          {pct}%
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {outcome.label}
                        </p>
                        {/* Visual bar */}
                        <div className="mt-3 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isHighlighted ? "bg-accent" : "bg-gray-400"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Predicted Exact Score */}
            {prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">Predicted Exact Score</h2>
                <div className="flex items-center justify-center gap-6 rounded-lg bg-primary/5 p-8">
                  <div className="text-center">
                    <span className="text-3xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {homeName}
                    </p>
                  </div>
                  <p className="text-5xl font-extrabold text-primary tracking-wider">
                    {prediction.predictedScore}
                  </p>
                  <div className="text-center">
                    <span className="text-3xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      {awayName}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Most likely score based on our prediction model using ELO ratings,
                  recent statistics and head-to-head history.
                </p>
              </section>
            )}

            {/* Estimated Odds */}
            {odds && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Estimated Odds: {homeName} vs {awayName}
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                  Estimated decimal odds from our prediction model.
                  Compare with the bookmaker offers below.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="pb-3 text-left font-semibold text-gray-700">
                          Bookmaker
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          {homeName} Win
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          Draw
                        </th>
                        <th className="pb-3 text-center font-semibold text-gray-700">
                          {awayName} Win
                        </th>
                        <th className="pb-3 text-right font-semibold text-gray-700">
                          Bonus
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* Estimated odds row */}
                      <tr className="bg-primary/5">
                        <td className="py-3 text-left font-medium text-primary">
                          Estimate
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.home}
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.draw}
                        </td>
                        <td className="py-3 text-center font-bold text-primary">
                          {odds.away}
                        </td>
                        <td className="py-3 text-right text-sm text-gray-400">
                          --
                        </td>
                      </tr>
                      {/* Bookmaker rows */}
                      {bookmakers.map((bk) => (
                        <tr
                          key={bk.id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-3 text-left">
                            <a
                              href={bk.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="font-medium text-accent hover:underline"
                            >
                              {bk.name}
                            </a>
                            {bk.highlight && (
                              <span className="ml-2 inline-block rounded bg-gold/20 px-1.5 py-0.5 text-xs font-semibold text-gold">
                                Recommended
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.home}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.draw}
                          </td>
                          <td className="py-3 text-center font-semibold">
                            {odds.away}
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={bk.url}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="inline-block rounded bg-accent px-3 py-1 text-xs font-bold text-white hover:bg-accent/90"
                            >
                              {bk.bonus}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  Estimated odds, subject to change. Actual odds may
                  vary between bookmakers.
                </p>
              </section>
            )}

            {/* Affiliate CTA Block */}
            <section className="rounded-lg bg-gradient-to-br from-accent to-accent/80 p-6 shadow-md text-white">
              <h2 className="mb-4 text-xl font-bold">
                Bet on this match
              </h2>
              {/* Featured bookmaker */}
              <div className="mb-6 rounded-lg bg-white/10 backdrop-blur-sm p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold">{featuredBookmaker.name}</p>
                    <p className="text-sm text-white/80">
                      {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
                    </p>
                    <div className="mt-1 flex items-center gap-0.5">
                      {Array.from({ length: featuredBookmaker.rating }).map(
                        (_, i) => (
                          <span key={i} className="text-gold text-sm">
                            &#9733;
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <a
                    href={featuredBookmaker.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-block rounded-lg bg-gold px-6 py-3 text-sm font-bold text-primary hover:bg-gold/90 transition-colors whitespace-nowrap"
                  >
                    {featuredBookmaker.name} - {featuredBookmaker.bonus} &rarr; Bet now
                  </a>
                </div>
              </div>
              {/* Other bookmakers */}
              <div className="space-y-2">
                {bookmakers
                  .filter((bk) => bk.id !== featuredBookmaker.id)
                  .map((bk) => (
                    <a
                      key={bk.id}
                      href={bk.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                      <div>
                        <span className="font-semibold">{bk.name}</span>
                        <span className="ml-2 text-sm text-white/70">
                          {bk.bonus} {bk.bonusDetail}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gold">
                        See offer &rarr;
                      </span>
                    </a>
                  ))}
              </div>
              <p className="mt-4 text-xs text-white/60">
                Estimated odds, subject to change. Bet responsibly. 18+
              </p>
            </section>

            {/* Match Analysis */}
            {home && away && prediction && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Match Analysis: {homeName} vs {awayName}
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                  <p>
                    This {stage.toLowerCase()} match
                    {match.group ? ` in Group ${match.group}` : ""} will see{" "}
                    <strong>{homeName}</strong> (#{home.fifaRanking} FIFA) face{" "}
                    <strong>{awayName}</strong> (#{away.fifaRanking} FIFA) on{" "}
                    {dateFormatted}
                    {stadium ? ` at ${stadium.name}` : ""}.
                  </p>
                  <p>
                    According to our prediction model,{" "}
                    {prediction.team1WinProb > prediction.team2WinProb
                      ? `${homeName} is the favourite with a ${Math.round(prediction.team1WinProb * 100)}% chance of winning`
                      : prediction.team2WinProb > prediction.team1WinProb
                        ? `${awayName} is the favourite with a ${Math.round(prediction.team2WinProb * 100)}% chance of winning`
                        : "both teams are evenly matched according to our estimates"}
                    . The most likely score is{" "}
                    <strong>{prediction.predictedScore}</strong>.
                  </p>
                  {predHome && predAway && (
                    <p>
                      In terms of ELO rating, {homeName} has a score of{" "}
                      <strong>{predHome.eloRating}</strong> compared to{" "}
                      <strong>{predAway.eloRating}</strong> for {awayName},
                      a gap of{" "}
                      {Math.abs(predHome.eloRating - predAway.eloRating)} points
                      in favour of{" "}
                      {predHome.eloRating >= predAway.eloRating
                        ? homeName
                        : awayName}
                      .
                    </p>
                  )}
                  {home.fifaRanking < away.fifaRanking ? (
                    <p>
                      In the FIFA rankings, {homeName} sits at{" "}
                      {home.fifaRanking}
                      <sup>th</sup> in the world,{" "}
                      {away.fifaRanking - home.fifaRanking} places above{" "}
                      {awayName} ({away.fifaRanking}
                      <sup>th</sup>). This ranking advantage is reflected in
                      our model&apos;s probabilities.
                    </p>
                  ) : home.fifaRanking > away.fifaRanking ? (
                    <p>
                      In the FIFA rankings, {awayName} sits at{" "}
                      {away.fifaRanking}
                      <sup>th</sup> in the world,{" "}
                      {home.fifaRanking - away.fifaRanking} places above{" "}
                      {homeName} ({home.fifaRanking}
                      <sup>th</sup>). However, home advantage could play
                      in favour of {homeName}.
                    </p>
                  ) : null}
                  {match.stage === "group" && match.group && (
                    <p>
                      This match takes place in{" "}
                      <Link
                        href={`/group/${match.group.toLowerCase()}`}
                        className="text-accent hover:underline"
                      >
                        Group {match.group}
                      </Link>{" "}
                      of the 2026 World Cup. The result of this encounter
                      will be decisive for qualification to the Round of 32.
                    </p>
                  )}
                  {h2h && h2h.totalMatches > 0 && (
                    <p>
                      Historically, these two teams have met{" "}
                      {h2h.totalMatches} times with a record of {h2h.team1Wins}{" "}
                      win{h2h.team1Wins !== 1 ? "s" : ""} for {homeName},{" "}
                      {h2h.draws} draw{h2h.draws !== 1 ? "s" : ""} and{" "}
                      {h2h.team2Wins} win{h2h.team2Wins !== 1 ? "s" : ""}{" "}
                      for {awayName}.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Head-to-Head History */}
            {home && away && (
              <section className="rounded-lg bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-bold">
                  Head-to-Head History
                </h2>
                {h2h && h2h.totalMatches > 0 ? (
                  <>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg bg-accent/5 p-4 text-center">
                        <p className="text-3xl font-bold text-accent">
                          {h2h.team1Wins}
                        </p>
                        <p className="text-xs text-gray-500">
                          {homeName} wins
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-4 text-center">
                        <p className="text-3xl font-bold text-gray-600">
                          {h2h.draws}
                        </p>
                        <p className="text-xs text-gray-500">Draws</p>
                      </div>
                      <div className="rounded-lg bg-accent/5 p-4 text-center">
                        <p className="text-3xl font-bold text-accent">
                          {h2h.team2Wins}
                        </p>
                        <p className="text-xs text-gray-500">
                          {awayName} wins
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {h2h.totalMatches}
                        </p>
                        <p className="text-xs text-gray-500">Matches played</p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 text-center">
                        <p className="text-xl font-bold text-primary">
                          {h2h.team1Goals} - {h2h.team2Goals}
                        </p>
                        <p className="text-xs text-gray-500">Goals scored</p>
                      </div>
                    </div>
                    {h2h.lastMatch && (
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Last match:</span>{" "}
                        {h2h.lastMatch}
                        {h2h.lastMatchDate &&
                          ` (${new Date(h2h.lastMatchDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )})`}
                      </p>
                    )}
                    <div className="text-center">
                      <Link
                        href={`/h2h/${home.slug}-vs-${away.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        View full head-to-head history &rarr;
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      {homeName} and {awayName} have never met before. The
                      2026 World Cup will be their first ever encounter.
                    </p>
                    <div className="text-center">
                      <Link
                        href={`/h2h/${home.slug}-vs-${away.slug}`}
                        className="text-sm font-medium text-accent hover:underline"
                      >
                        View head-to-head page &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Match Information */}
            <section className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Match Information</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Date</dt>
                  <dd className="font-semibold">{dateFormatted}</dd>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Time (UTC)</dt>
                  <dd className="font-semibold">{match.time}</dd>
                </div>
                {stadium && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Stadium</dt>
                    <dd>
                      <Link
                        href={`/stadium/${stadium.slug}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {stadium.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {stadium.capacity.toLocaleString("en-US")} seats
                      </p>
                    </dd>
                  </div>
                )}
                {city && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">City</dt>
                    <dd>
                      <Link
                        href={`/city/${city.slug}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {city.name}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {stadium?.country}
                      </p>
                    </dd>
                  </div>
                )}
                <div className="rounded-lg bg-gray-50 p-4">
                  <dt className="text-gray-500 mb-1">Stage</dt>
                  <dd className="font-semibold">{stage}</dd>
                </div>
                {match.group && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Group</dt>
                    <dd>
                      <Link
                        href={`/group/${match.group.toLowerCase()}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        Group {match.group}
                      </Link>
                    </dd>
                  </div>
                )}
                {match.matchday && (
                  <div className="rounded-lg bg-gray-50 p-4">
                    <dt className="text-gray-500 mb-1">Matchday</dt>
                    <dd className="font-semibold">Matchday {match.matchday}</dd>
                  </div>
                )}
              </dl>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prediction Summary */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">Prediction Summary</h3>
              {prediction ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Favourite</span>
                    <span className="font-semibold">
                      {prediction.team1WinProb > prediction.team2WinProb
                        ? homeName
                        : prediction.team2WinProb > prediction.team1WinProb
                          ? awayName
                          : "Undecided"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Predicted score</span>
                    <span className="font-bold text-primary">
                      {prediction.predictedScore}
                    </span>
                  </div>
                  {odds && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Odds 1</span>
                        <span className="font-semibold">{odds.home}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Odds X</span>
                        <span className="font-semibold">{odds.draw}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Odds 2</span>
                        <span className="font-semibold">{odds.away}</span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Detailed predictions for this match will be available
                  soon.
                </p>
              )}
            </div>

            {/* Team Profiles */}
            {home && away && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Team Profiles</h3>
                <div className="space-y-3">
                  <Link
                    href={`/team/${home.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">{home.flag}</span>
                    <span className="font-medium">{home.name}</span>
                  </Link>
                  <Link
                    href={`/team/${away.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">{away.flag}</span>
                    <span className="font-medium">{away.name}</span>
                  </Link>
                  <Link
                    href={`/h2h/${home.slug}-vs-${away.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                  >
                    <span className="text-xl">&#9878;</span>
                    <span className="font-medium">
                      H2H {home.name} vs {away.name}
                    </span>
                  </Link>
                </div>
              </div>
            )}

            {/* Match Venue */}
            {stadium && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Match Venue</h3>
                <Link
                  href={`/stadium/${stadium.slug}`}
                  className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {stadium.capacity.toLocaleString("en-US")} seats &middot;{" "}
                    {stadium.city}
                  </p>
                </Link>
                {city && (
                  <Link
                    href={`/city/${city.slug}`}
                    className="mt-2 block text-sm text-accent hover:underline"
                  >
                    {city.name} city guide &rarr;
                  </Link>
                )}
              </div>
            )}

            {/* Sidebar CTA */}
            <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
              <h3 className="mb-2 text-lg font-bold text-accent">
                Bet on this match
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
              </p>
              <a
                href={featuredBookmaker.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-accent/90 transition-colors"
              >
                Bet on {featuredBookmaker.name} &rarr;
              </a>
              <p className="mt-2 text-xs text-gray-400 text-center">
                18+ | Bet responsibly
              </p>
            </div>

            {/* Other Predictions */}
            {relatedMatches.length > 0 && (
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-bold">Other Predictions</h3>
                <div className="space-y-2">
                  {relatedMatches.map((rm) => {
                    const rmHome = teamsById[rm.homeTeamId];
                    const rmAway = teamsById[rm.awayTeamId];
                    return (
                      <Link
                        key={rm.id}
                        href={`/prediction-match/${rm.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm transition-colors hover:border-accent"
                      >
                        <span>
                          {rmHome?.flag ?? "\ud83c\udff3\ufe0f"}{" "}
                          {rmHome?.name ?? "TBD"} vs{" "}
                          {rmAway?.name ?? "TBD"}{" "}
                          {rmAway?.flag ?? "\ud83c\udff3\ufe0f"}
                        </span>
                        <span className="text-xs text-gray-400">
                          {rm.date}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Link to match page */}
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <Link
                href={`/match/${match.slug}`}
                className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-primary/90 transition-colors"
              >
                View full match details &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD SportsEvent */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportsEvent",
            name: `${homeName} vs ${awayName} - World Cup 2026`,
            eventStatus: "https://schema.org/EventScheduled",
            startDate: `${match.date}T${match.time}:00Z`,
            location: stadium
              ? {
                  "@type": "StadiumOrArena",
                  name: stadium.name,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: stadium.city,
                    addressCountry: stadium.country,
                  },
                }
              : undefined,
            homeTeam: home
              ? { "@type": "SportsTeam", name: home.name }
              : undefined,
            awayTeam: away
              ? { "@type": "SportsTeam", name: away.name }
              : undefined,
            sport: "Football",
            description: `Prediction and odds for ${homeName} vs ${awayName}, ${stage} of the 2026 World Cup.`,
            url: `https://worldcup2026guide.com/prediction-match/${match.slug}`,
          }),
        }}
      />
    </>
  );
}
