import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teams, teamsById } from "@repo/data/teams";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { getHomeAlternates } from "@repo/data/route-mapping";
import { GroupCard } from "./components/GroupCard";
import { GroupAccordion } from "./components/GroupAccordion";
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
  openGraph: {
    title: "Coupe du Monde 2026 | Pronostics, Cotes & Guide Complet",
    description: "Pronostics, cotes, analyses des 48 équipes et calendrier des 104 matchs de la CDM 2026.",
    url: "https://cdm2026.fr",
  },
};

const homepageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CDM 2026 - Coupe du Monde",
    url: "https://cdm2026.fr",
    description: "Guide complet de la Coupe du Monde 2026 : pronostics, cotes, analyses des 48 équipes.",
    inLanguage: "fr",
  },
  {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "Coupe du Monde FIFA 2026",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    location: {
      "@type": "Place",
      name: "États-Unis, Canada, Mexique",
    },
    sport: "Football",
    description: "Première Coupe du Monde FIFA à 48 équipes. 104 matchs dans 16 stades.",
  },
];

export default function HomePage() {
  return (
    <>
      {homepageJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {/* Hero Section — animated gradient + dot pattern overlay */}
      <section className="hero-animated py-20 md:py-28 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl drop-shadow-lg">
            Coupe du Monde <span className="text-gold">2026</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300/90 leading-relaxed">
            Pronostics, statistiques et guide complet de la première Coupe du
            Monde à 48 équipes. 104 matchs, 210 joueurs, 16 stades à travers
            les États-Unis, le Canada et le Mexique.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/groupe/a"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 min-h-[44px] font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40"
            >
              Voir les groupes
            </Link>
            <Link
              href="/match/calendrier"
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-3.5 min-h-[44px] font-semibold text-white transition-all hover:bg-white/15"
            >
              Calendrier des matchs
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Key Stats */}
      <section className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {[
            { value: "48", label: "Équipes" },
            { value: "104", label: "Matchs" },
            { value: "16", label: "Villes hôtes" },
            { value: "39", label: "Jours" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-primary dark:text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="bg-gray-50 dark:bg-gray-800/50">
        <UpcomingMatches />
      </section>

      {/* Featured Prediction */}
      <section className="bg-white dark:bg-gray-900">
        <FeaturedPrediction />
      </section>

      {/* Groups */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Les 12 groupes
          </h2>
          <GroupAccordion
            groups={groups.map((group) => ({
              group,
              teams: group.teams
                .map((id) => teamsById[id])
                .filter((t): t is NonNullable<typeof t> => t != null),
            }))}
          />
        </div>
      </section>

      {/* Favorites */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Équipes favorites
            </h2>
            <Link href="/equipes" className="text-sm font-medium text-accent hover:underline">
              Voir les 48 équipes &rarr;
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="bg-gray-50 dark:bg-gray-800/50">
        <FeaturedBookmaker />
      </section>

      {/* Stades & Villes */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stadiums.slice(0, 8).map((stadium) => {
              const city = cities.find((c) => c.id === stadium.cityId);
              return (
                <Link
                  key={stadium.id}
                  href={`/stade/${stadium.slug}`}
                  className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all hover:shadow-md hover:border-accent/50"
                >
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{stadium.name}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {city?.name ?? stadium.city} &middot;{" "}
                    {stadium.capacity.toLocaleString("fr-FR")} places
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Pronostics */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">
            Pronostics les plus populaires
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "France", slug: "france", flag: "🇫🇷", ranking: 2 },
              { name: "Argentine", slug: "argentine", flag: "🇦🇷", ranking: 1 },
              { name: "Brésil", slug: "bresil", flag: "🇧🇷", ranking: 5 },
              { name: "Angleterre", slug: "angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", ranking: 4 },
              { name: "Espagne", slug: "espagne", flag: "🇪🇸", ranking: 3 },
              { name: "Allemagne", slug: "allemagne", flag: "🇩🇪", ranking: 11 },
            ].map((t) => (
              <Link
                key={t.slug}
                href={`/pronostic/${t.slug}`}
                className="flex items-center gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all hover:shadow-md hover:border-accent/50"
              >
                <span className="text-4xl" role="img" aria-label={`Drapeau de ${t.name}`}>{t.flag}</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100">Pronostic {t.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">#{t.ranking} FIFA</p>
                </div>
                <span className="ml-auto text-accent font-medium text-sm">&rarr;</span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/methodologie" className="text-sm font-medium text-accent hover:underline">
              Découvrir notre méthodologie de pronostics &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-field py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            11 juin – 19 juillet 2026
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-field-light leading-relaxed">
            La première Coupe du Monde à 48 équipes se déroule aux États-Unis,
            au Canada et au Mexique. Découvrez toutes les équipes, les stades et
            les pronostics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/match/calendrier"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 min-h-[44px] font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent/90 hover:shadow-xl"
            >
              Calendrier des matchs
            </Link>
            <Link
              href="/stade/metlife-stadium"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3.5 min-h-[44px] font-semibold transition-all hover:bg-white/20"
            >
              Guide des stades
            </Link>
            <Link
              href="/ville/new-york-new-jersey"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3.5 min-h-[44px] font-semibold transition-all hover:bg-white/20"
            >
              Villes hôtes
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center justify-center rounded-lg bg-white/10 px-6 py-3.5 min-h-[44px] font-semibold transition-all hover:bg-white/20"
            >
              Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
