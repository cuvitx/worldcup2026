import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { GroupCard } from "./components/GroupCard";
import { TeamCard } from "./components/TeamCard";

export const metadata: Metadata = {
  title: "World Cup 2026 | Predictions, Odds & Complete Guide",
  description:
    "Complete guide to the 2026 World Cup: predictions, bookmaker odds, analysis of 48 teams, schedule of 104 matches. Everything you need for the FIFA World Cup 2026.",
  alternates: getHomeAlternates(),
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            World Cup <span className="text-gold">2026</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Predictions, statistics and complete guide for the first ever 48-team
            World Cup. 104 matches, 210 players, 16 stadiums across the United
            States, Canada and Mexico.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/group/a"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
            >
              View groups
            </Link>
            <Link
              href="/match/schedule"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Match schedule
            </Link>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {[
            { value: "48", label: "Teams" },
            { value: "104", label: "Matches" },
            { value: "16", label: "Host Cities" },
            { value: "39", label: "Days" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Groups */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            The 12 groups
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {groups.map((group) => {
              const groupTeams = group.teams
                .map((id) => teamsById[id])
                .filter((t): t is NonNullable<typeof t> => t != null);
              return (
                <GroupCard
                  key={group.letter}
                  group={group}
                  teams={groupTeams}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Favorites */}
      <section className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Favorite teams
            </h2>
            <Link href="/teams" className="text-sm font-medium text-accent hover:underline">
              View all 48 teams &rarr;
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams
              .filter((t) => t.fifaRanking <= 10)
              .sort((a, b) => a.fifaRanking - b.fifaRanking)
              .map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
          </div>
        </div>
      </section>

      {/* Stadiums & Cities */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Stadiums and host cities
            </h2>
            <div className="flex gap-4">
              <Link href="/stadiums" className="text-sm font-medium text-accent hover:underline">
                All stadiums &rarr;
              </Link>
              <Link href="/cities" className="text-sm font-medium text-accent hover:underline">
                All cities &rarr;
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stadiums.slice(0, 8).map((stadium) => {
              const city = cities.find((c) => c.id === stadium.cityId);
              return (
                <Link
                  key={stadium.id}
                  href={`/stadium/${stadium.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {city?.name ?? stadium.city} &middot;{" "}
                    {stadium.capacity.toLocaleString("en-US")} seats
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-field py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">
            June 11 - July 19, 2026
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-field-light">
            The first ever 48-team World Cup takes place in the United States,
            Canada and Mexico. Discover all the teams, stadiums and predictions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/match/schedule"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Match schedule
            </Link>
            <Link
              href="/stadiums"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Stadium guide
            </Link>
            <Link
              href="/cities"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Host cities
            </Link>
            <Link
              href="/guides"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
