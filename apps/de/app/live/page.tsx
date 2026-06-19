import type { Metadata } from "next";
import Link from "next/link";
import { getTodaysMatches } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { localizeTeam } from "@repo/data/i18n";
import { getStaticAlternates } from "@repo/data/route-mapping";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Live-Ergebnisse -- WM 2026",
  description:
    "Live-Ergebnisse und Spielstaende der Fussball-WM 2026. Aktuelle Spiele in Echtzeit verfolgen.",
  alternates: getStaticAlternates("live", "de"),
};

export default function LivePage() {
  const todaysMatches = getTodaysMatches();

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Live-Ergebnisse
          </h1>
          <p className="mt-2 text-gray-300">
            WM 2026 -- Aktuelle Spiele und Ergebnisse
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
              const hasScore =
                match.homeScore != null && match.awayScore != null;

              return (
                <Link
                  key={match.id}
                  href={`/spiel/${match.slug}`}
                  className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
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
                  {hasScore ? (
                    <span className="font-bold text-lg shrink-0">
                      {match.homeScore} - {match.awayScore}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 shrink-0">
                      vs
                    </span>
                  )}
                  <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                    <span className="font-medium truncate text-right">
                      {awayLoc?.name ?? "TBD"}
                    </span>
                    <span className="text-lg">{away?.flag ?? ""}</span>
                  </div>
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
            <p className="text-lg text-gray-600">
              Aktuell keine Live-Spiele.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Besuche diese Seite waehrend der WM 2026 fuer
              Live-Ergebnisse.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/spiel/heute"
            className="rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
          >
            Spiele heute
          </Link>
          <Link
            href="/ergebnisse"
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
          >
            Alle Ergebnisse
          </Link>
          <Link
            href="/spiel/spielplan"
            className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-gray-900 font-medium hover:bg-gray-50 transition-colors"
          >
            Spielplan
          </Link>
        </div>
      </div>
    </>
  );
}
