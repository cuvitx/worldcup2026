import type { Metadata } from "next";
import Link from "next/link";
import { getTodaysMatches, getNextMatch } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
  title: "Matchs du jour - Coupe du Monde 2026",
  description:
    "Découvrez les matchs de la Coupe du Monde 2026 qui se jouent aujourd'hui. Horaires, équipes, stades et liens vers les pronostics de chaque rencontre.",
  alternates: getStaticAlternates("matchToday", "fr"),
};

export default function AujourdhuiPage() {
  const todaysMatches = getTodaysMatches();
  const nextMatch = getNextMatch();

  return (
    <>
      <nav className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendrier" className="hover:text-primary">
                Calendrier
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium">Matchs du jour</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">Matchs du jour</h1>
          <p className="mt-2 text-gray-300">
            {todaysMatches.length > 0
              ? `${todaysMatches.length} match${todaysMatches.length > 1 ? "s" : ""} aujourd'hui`
              : "Aucun match programme aujourd'hui"}
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
                  className="flex items-center gap-4 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <span className="text-sm font-semibold text-primary w-14 text-center shrink-0">
                    {match.time}
                  </span>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag ?? "\u{1F3F3}\u{FE0F}"}</span>
                    <span className="font-medium truncate">
                      {home?.name ?? "A determiner"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">vs</span>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className="font-medium truncate text-right">
                      {away?.name ?? "A determiner"}
                    </span>
                    <span className="text-lg" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag ?? "\u{1F3F3}\u{FE0F}"}</span>
                  </div>
                  {match.group && (
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0">
                      Gr. {match.group}
                    </span>
                  )}
                  {stadium && (
                    <span className="text-xs text-gray-500 hidden sm:block shrink-0 w-36 text-right truncate">
                      {stadium.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow text-center">
            <p className="text-lg text-gray-600">
              Aucun match aujourd&apos;hui.
            </p>
            {nextMatch && (() => {
              const home = teamsById[nextMatch.homeTeamId];
              const away = teamsById[nextMatch.awayTeamId];
              const stadium = stadiumsById[nextMatch.stadiumId];
              const matchDate = new Date(nextMatch.date).toLocaleDateString(
                "fr-FR",
                { weekday: "long", day: "numeric", month: "long" }
              );
              return (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-3">Prochain match :</p>
                  <Link
                    href={`/match/${nextMatch.slug}`}
                    className="inline-block rounded-lg border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700 px-6 py-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <p className="text-sm text-gray-500 mb-1">
                      {matchDate} a {nextMatch.time} UTC
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      <span role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag}</span> {home?.name ?? "A determiner"} vs{" "}
                      {away?.name ?? "A determiner"} <span role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag}</span>
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

        {/* Quick link to full calendar */}
        <div className="mt-8 text-center">
          <Link
            href="/match/calendrier"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Voir le calendrier complet
          </Link>
        </div>
      </div>
    </>
  );
}
