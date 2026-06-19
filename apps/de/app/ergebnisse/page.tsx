import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Ergebnisse WM 2026 -- Alle Spielergebnisse",
  description:
    "Alle Ergebnisse und Spielstaende der Fussball-WM 2026. Gruppenphase und K.o.-Runde im Ueberblick.",
  alternates: { canonical: "/ergebnisse" },
  openGraph: {
    title: "Ergebnisse -- WM 2026",
    description:
      "Ergebnisse und Spielstaende aller Spiele der WM 2026.",
  },
};

const stageLabels = stageLabelsI18n.de;

export default function ErgebnissePage() {
  // Filter finished matches, sort by date descending
  const finishedMatches = matches
    .filter((m) => m.status === "finished")
    .sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.time.localeCompare(a.time);
    });

  // Group by date
  const matchesByDate: Record<string, typeof finishedMatches> = {};
  for (const match of finishedMatches) {
    const arr = matchesByDate[match.date] ?? [];
    arr.push(match);
    matchesByDate[match.date] = arr;
  }
  const sortedDates = Object.keys(matchesByDate).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Ergebnisse WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            {finishedMatches.length > 0
              ? `${finishedMatches.length} Spiel${finishedMatches.length > 1 ? "e" : ""} beendet`
              : "Noch keine Spiele beendet"}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {finishedMatches.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8 text-center">
            <p className="text-lg text-gray-600">
              Noch keine Spiele beendet.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Die WM 2026 beginnt am 11. Juni 2026.
            </p>
            <div className="mt-6">
              <Link
                href="/spiel/spielplan"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Vollstaendiger Spielplan
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => {
              const dayMatches = matchesByDate[date]!;
              const formattedDate = new Date(
                date + "T12:00:00"
              ).toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={date}>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 capitalize">
                    {formattedDate}
                  </h2>
                  <div className="space-y-2">
                    {dayMatches.map((match) => {
                      const home = teamsById[match.homeTeamId];
                      const away = teamsById[match.awayTeamId];
                      const homeLoc = home
                        ? localizeTeam(home, "de")
                        : null;
                      const awayLoc = away
                        ? localizeTeam(away, "de")
                        : null;
                      const stadium = stadiumsById[match.stadiumId];

                      return (
                        <Link
                          key={match.id}
                          href={`/spiel/${match.slug}`}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          <span className="text-xs text-gray-500 w-11 text-center shrink-0">
                            {match.time}
                          </span>
                          <span className="text-base shrink-0">
                            {home?.flag ?? ""}
                          </span>
                          <span className="font-medium truncate text-sm flex-1 min-w-0">
                            {homeLoc?.name ?? "TBD"}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="bg-gray-900 text-white text-sm font-bold rounded px-2 py-0.5 min-w-[28px] text-center">
                              {match.homeScore ?? "-"}
                            </span>
                            <span className="text-xs text-gray-400">-</span>
                            <span className="bg-gray-900 text-white text-sm font-bold rounded px-2 py-0.5 min-w-[28px] text-center">
                              {match.awayScore ?? "-"}
                            </span>
                          </div>
                          <span className="font-medium truncate text-right text-sm flex-1 min-w-0">
                            {awayLoc?.name ?? "TBD"}
                          </span>
                          <span className="text-base shrink-0">
                            {away?.flag ?? ""}
                          </span>
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0 hidden sm:block">
                            {match.group
                              ? `Gr. ${match.group}`
                              : stageLabels[match.stage] ?? match.stage}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
