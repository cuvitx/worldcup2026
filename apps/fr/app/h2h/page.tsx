import type { Metadata } from "next";
import Link from "next/link";
import { RelatedLinks } from "../components/RelatedLinks";
import { teams } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { H2HSelector } from "./h2h-selector";

export const metadata: Metadata = {
  title: "Confrontations H2H — Comparer deux équipes | CDM 2026",
  description:
    "Comparez deux équipes de la Coupe du Monde 2026 : historique des confrontations, statistiques, classement FIFA et pronostic.",
  alternates: {
    canonical: "https://cdm2026.fr/h2h",
  },
  openGraph: {
    title: "Confrontations H2H — CDM 2026",
    description:
      "Historique et stats face-à-face de toutes les équipes qualifiées pour la Coupe du Monde 2026.",
  },
};

// Popular matchups to feature
const popularMatchups = [
  ["france", "allemagne"],
  ["bresil", "argentine"],
  ["espagne", "portugal"],
  ["france", "bresil"],
  ["angleterre", "etats-unis"],
  ["argentine", "allemagne"],
  ["france", "espagne"],
  ["bresil", "allemagne"],
  ["pays-bas", "argentine"],
  ["france", "angleterre"],
  ["mexique", "etats-unis"],
  ["japon", "coree-du-sud"],
];

export default function H2HIndexPage() {
  // Build group matchups from actual match data
  const groupMatchups = matches
    .filter((m) => m.stage === "group" && m.homeTeamId && m.awayTeamId)
    .slice(0, 12)
    .map((m) => {
      const home = teamsById[m.homeTeamId];
      const away = teamsById[m.awayTeamId];
      if (!home || !away) return null;
      return { home, away, slug: `${home.slug}-vs-${away.slug}` };
    })
    .filter(Boolean);

  // Build popular matchup data
  const popularData = popularMatchups
    .map(([s1, s2]) => {
      const t1 = teams.find((t) => t.slug === s1);
      const t2 = teams.find((t) => t.slug === s2);
      if (!t1 || !t2) return null;
      return { home: t1, away: t2, slug: `${t1.slug}-vs-${t2.slug}` };
    })
    .filter(Boolean);

  const teamList = teams
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, "fr"))
    .map((t) => ({ slug: t.slug, name: t.name, flag: t.flag }));

  return (
    <>
{/* Breadcrumbs */}
{/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">Analyse comparative</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">
            Confrontations H2H
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Comparez n&apos;importe quelles équipes de la Coupe du Monde 2026 :
            historique, stats, classement FIFA et pronostic.
          </p>
        </div>
      </section>

      {/* Team Selector */}
      <section className="bg-gray-50 py-10 sm:py-12 dark:bg-slate-800/50">
        <div className="mx-auto max-w-3xl px-4">
          <H2HSelector teams={teamList} />
        </div>
      </section>

      {/* Popular Matchups */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Confrontations populaires
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularData.map(
              (m) =>
                m && (
                  <Link
                    key={m.slug}
                    href={`/h2h/${m.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.home.flag}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {m.home.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">VS</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {m.away.name}
                      </span>
                      <span className="text-xl">{m.away.flag}</span>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Group Stage Matchups */}
      <section className="border-t border-gray-200 bg-gray-50 py-10 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Matchs de la phase de groupes
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groupMatchups.map(
              (m) =>
                m && (
                  <Link
                    key={m.slug}
                    href={`/h2h/${m.slug}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-primary/30 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-primary/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.home.flag}</span>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {m.home.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-gray-500">VS</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {m.away.name}
                      </span>
                      <span className="text-xl">{m.away.flag}</span>
                    </div>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>

      {/* All Teams Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Toutes les équipes
          </h2>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
            Cliquez sur une équipe pour voir toutes ses confrontations possibles.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {teams
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name, "fr"))
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/equipe/${t.slug}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:border-primary/30 hover:bg-primary/5 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-primary/50"
                >
                  <span>{t.flag}</span>
                  <span className="truncate">{t.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks variant="compact" title="Pages liées" links={[
          { href: "/equipes", title: "Les 48 équipes", description: "Fiches complètes de chaque sélection", icon: "🏟️" },
          { href: "/match/calendrier", title: "Calendrier des matchs", description: "Tous les matchs de la CDM 2026", icon: "📅" },
          { href: "/classement-fifa", title: "Classement FIFA", description: "Ranking mondial des 48 équipes", icon: "🏆" },
          { href: "/comparateur-joueurs", title: "Comparateur joueurs", description: "Comparez les stars du mondial", icon: "👥" },
          { href: "/statistiques", title: "Statistiques", description: "Chiffres et stats de la CDM 2026", icon: "📊" },
        ]} />
      </div>
    </>
  );
}
