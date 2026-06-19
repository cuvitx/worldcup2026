import type { Metadata } from "next";
import Link from "next/link";
import { getTodaysMatches, getNextMatch } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { localizeTeam } from "@repo/data/i18n";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Spiele heute -- WM 2026",
  description:
    "Alle Spiele der WM 2026, die heute stattfinden. Anstoßzeiten, Mannschaften, Stadien und Live-Ergebnisse.",
  alternates: getStaticAlternates("matchToday", "de"),
};

export default function HeutePage() {
  const todaysMatches = getTodaysMatches();
  const nextMatch = getNextMatch();

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Spiele heute
          </h1>
          <p className="mt-2 text-gray-300">
            {todaysMatches.length > 0
              ? `${todaysMatches.length} Spiel${todaysMatches.length > 1 ? "e" : ""} heute`
              : "Heute keine Spiele geplant"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {todaysMatches.length > 0 ? (
          <div className="space-y-3">
            {todaysMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const homeLoc = home ? localizeTeam(home, "de") : null;
              const awayLoc = away ? localizeTeam(away, "de") : null;
              const stadium = stadiumsById[match.stadiumId];

              return (
                <Link
                  key={match.id}
                  href={`/spiel/${match.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                >
                  <span className="text-sm font-semibold text-primary w-14 text-center shrink-0">
                    {match.time}
                  </span>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg">{home?.flag ?? ""}</span>
                    <span className="font-medium truncate">
                      {homeLoc?.name ?? "TBD"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0">vs</span>
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className="font-medium truncate text-right">
                      {awayLoc?.name ?? "TBD"}
                    </span>
                    <span className="text-lg">{away?.flag ?? ""}</span>
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
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8 text-center">
            <p className="text-lg text-gray-600">Heute keine Spiele.</p>
            {nextMatch &&
              (() => {
                const home = teamsById[nextMatch.homeTeamId];
                const away = teamsById[nextMatch.awayTeamId];
                const homeLoc = home ? localizeTeam(home, "de") : null;
                const awayLoc = away ? localizeTeam(away, "de") : null;
                const stadium = stadiumsById[nextMatch.stadiumId];
                const matchDate = new Date(
                  nextMatch.date
                ).toLocaleDateString("de-DE", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                });
                return (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-3">
                      Naechstes Spiel:
                    </p>
                    <Link
                      href={`/spiel/${nextMatch.slug}`}
                      className="inline-block rounded-lg border border-gray-200 bg-gray-50 px-6 py-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <p className="text-sm text-gray-500 mb-1">
                        {matchDate} um {nextMatch.time} Uhr
                      </p>
                      <p className="font-semibold text-gray-900">
                        {home?.flag} {homeLoc?.name ?? "TBD"} vs{" "}
                        {awayLoc?.name ?? "TBD"} {away?.flag}
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

        <div className="mt-8 text-center">
          <Link
            href="/spiel/spielplan"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Vollstaendiger Spielplan
          </Link>
        </div>
      </div>
    </>
  );
}
