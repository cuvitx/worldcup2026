import type { Metadata } from "next";
import Link from "next/link";
import { getTodaysMatches, getNextMatch } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "Today's Matches - World Cup 2026",
  description:
    "See which World Cup 2026 matches are being played today. Kick-off times, teams, stadiums, groups, and links to predictions for every game.",
  alternates: getStaticAlternates("matchToday", "en"),
};

export default function TodayPage() {
  const todaysMatches = getTodaysMatches();
  const nextMatch = getNextMatch();

  return (
    <>
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
            <li className="text-gray-900 font-medium">Today&apos;s Matches</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Today&apos;s Matches</h1>
          <p className="mt-2 text-gray-300">
            {todaysMatches.length > 0
              ? `${todaysMatches.length} match${todaysMatches.length > 1 ? "es" : ""} today`
              : "No matches scheduled today"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {todaysMatches.length > 0 ? (
          <div className="space-y-3">
            {todaysMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];

              return (
                <Link
                  key={match.id}
                  href={`/match/${match.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <span className="text-sm font-semibold text-accent w-14 text-center shrink-0">
                    {match.time}
                  </span>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg">{home?.flag ?? "\u{1F3F3}\u{FE0F}"}</span>
                    <span className="font-medium truncate">
                      {home?.name ?? "TBD"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">vs</span>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className="font-medium truncate text-right">
                      {away?.name ?? "TBD"}
                    </span>
                    <span className="text-lg">{away?.flag ?? "\u{1F3F3}\u{FE0F}"}</span>
                  </div>
                  {match.group && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0">
                      Gr. {match.group}
                    </span>
                  )}
                  {stadium && (
                    <span className="text-xs text-gray-400 hidden sm:block shrink-0 w-36 text-right truncate">
                      {stadium.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
            <p className="text-lg text-gray-600">
              No matches today.
            </p>
            {nextMatch && (() => {
              const home = teamsById[nextMatch.homeTeamId];
              const away = teamsById[nextMatch.awayTeamId];
              const stadium = stadiumsById[nextMatch.stadiumId];
              const matchDate = new Date(nextMatch.date).toLocaleDateString(
                "en-US",
                { weekday: "long", day: "numeric", month: "long" }
              );
              return (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-3">Next match:</p>
                  <Link
                    href={`/match/${nextMatch.slug}`}
                    className="inline-block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 transition-colors hover:border-accent hover:bg-accent/5"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      {matchDate} at {nextMatch.time} UTC
                    </p>
                    <p className="font-semibold text-gray-900">
                      {home?.flag} {home?.name ?? "TBD"} vs{" "}
                      {away?.name ?? "TBD"} {away?.flag}
                    </p>
                    {stadium && (
                      <p className="text-sm text-gray-500 mt-1">
                        {stadium.name}
                      </p>
                    )}
                  </Link>
                </div>
              );
            })()}
          </div>
        )}

        {/* Quick link to full schedule */}
        <div className="mt-8 text-center">
          <Link
            href="/match/schedule"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
          >
            View Full Schedule
          </Link>
        </div>
      </div>
    </>
  );
}
