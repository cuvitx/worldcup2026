import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { GroupCard } from "./components/GroupCard";
import { TeamCard } from "./components/TeamCard";
import { Countdown } from "./components/Countdown";
import { UpcomingMatches } from "./components/UpcomingMatches";
import { FeaturedPrediction } from "./components/FeaturedPrediction";
import { FeaturedBookmaker } from "./components/FeaturedBookmaker";

export const metadata: Metadata = {
  title: "Coupe du Monde 2026 | Pronostics, Cotes & Guide Complet",
  description:
    "Guide complet de la Coupe du Monde 2026 : pronostics, cotes des bookmakers, analyses des 48 équipes, calendrier des 104 matchs. Tout pour parier sur la CDM 2026.",
  alternates: getHomeAlternates(),
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            Coupe du Monde <span className="text-gold">2026</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Pronostics, statistiques et guide complet de la première Coupe du
            Monde à 48 équipes. 104 matchs, 210 joueurs, 16 stades a travers
            les États-Unis, le Canada et le Mexique.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/groupe/a"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Voir les groupes
            </Link>
            <Link
              href="/match/calendrier"
              className="rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Calendrier des matchs
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Key Stats */}
      <section className="border-b border-gray-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
          {[
            { value: "48", label: "Équipes" },
            { value: "104", label: "Matchs" },
            { value: "16", label: "Villes hotes" },
            { value: "39", label: "Jours" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <UpcomingMatches />

      {/* Featured Prediction */}
      <FeaturedPrediction />

      {/* Groups */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">
            Les 12 groupes
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
              Équipes favorites
            </h2>
            <Link href="/equipes" className="text-sm font-medium text-accent hover:underline">
              Voir les 48 équipes &rarr;
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {teams
              .filter((t) => t.fifaRanking > 0 && t.fifaRanking <= 10)
              .sort((a, b) => a.fifaRanking - b.fifaRanking)
              .map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
          </div>
        </div>
      </section>

      {/* Featured Bookmaker CTA */}
      <FeaturedBookmaker />

      {/* Stades & Villes */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Stades et villes hôtes
            </h2>
            <div className="flex gap-4">
              <Link href="/stades" className="text-sm font-medium text-accent hover:underline">
                Tous les stades &rarr;
              </Link>
              <Link href="/villes" className="text-sm font-medium text-accent hover:underline">
                Toutes les villes &rarr;
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stadiums.slice(0, 8).map((stadium) => {
              const city = cities.find((c) => c.id === stadium.cityId);
              return (
                <Link
                  key={stadium.id}
                  href={`/stade/${stadium.slug}`}
                  className="rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-accent hover:bg-accent/5"
                >
                  <p className="font-semibold">{stadium.name}</p>
                  <p className="text-sm text-gray-500">
                    {city?.name ?? stadium.city} &middot;{" "}
                    {stadium.capacity.toLocaleString("fr-FR")} places
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
            11 juin - 19 juillet 2026
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-field-light">
            La première Coupe du Monde à 48 équipes se déroule aux États-Unis,
            au Canada et au Mexique. Découvrez toutes les équipes, les stades et
            les pronostics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/match/calendrier"
              className="rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent/90"
            >
              Calendrier des matchs
            </Link>
            <Link
              href="/stade/metlife-stadium"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Guide des stades
            </Link>
            <Link
              href="/ville/new-york-new-jersey"
              className="rounded-lg bg-white/10 px-6 py-3 font-semibold transition-colors hover:bg-white/20"
            >
              Villes hotes
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
