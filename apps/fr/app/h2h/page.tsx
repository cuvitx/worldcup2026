import type { Metadata } from "next";
import Link from "next/link";
import { teams } from "@repo/data/teams";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { H2HSelector } from "./h2h-selector";

export const metadata: Metadata = {
  title: "Confrontations H2H — Comparer deux équipes | CDM 2026",
  description:
    "Comparez deux équipes de la Coupe du Monde 2026 : historique des confrontations, statistiques, classement FIFA et pronostic.",
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
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Confrontations H2H", url: "/h2h" },
        ]}
        baseUrl={domains.fr}
      />

      {/* Breadcrumbs */}
      <nav className="border-b border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="text-primary dark:text-secondary hover:underline">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-gray-900 dark:text-white">
              Confrontations H2H
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-3 text-2xl font-extrabold sm:text-4xl">
            ⚔️ Confrontations H2H
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-300 sm:text-base">
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
            🔥 Confrontations populaires
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
            📅 Matchs de la phase de groupes
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
            🌍 Toutes les équipes
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
    </>
  );
}
