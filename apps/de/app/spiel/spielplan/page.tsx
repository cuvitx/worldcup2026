import { getStaticAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Spielplan WM 2026 -- Alle 104 Spiele | Termine & Stadien",
  description:
    "Vollstaendiger Spielplan der Fussball-WM 2026. Alle 104 Spiele mit Datum, Uhrzeit und Stadion. Vom 11. Juni bis 19. Juli 2026.",
  alternates: getStaticAlternates("matchSchedule", "de"),
};

const stageLabels = stageLabelsI18n.de;

export default function SpielplanPage() {
  // Group matches by date
  const matchesByDate: Record<string, typeof matches> = {};
  for (const match of matches) {
    const arr = matchesByDate[match.date] ?? [];
    arr.push(match);
    matchesByDate[match.date] = arr;
  }
  const sortedDates = Object.keys(matchesByDate).sort();

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Spielplan WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            104 Spiele vom 11. Juni bis 19. Juli 2026
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8">
          {sortedDates.map((date) => {
            const dayMatches = matchesByDate[date]!;
            const dateObj = new Date(date + "T12:00:00");
            const formattedDate = dateObj.toLocaleDateString("de-DE", {
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
                    const homeLoc = home ? localizeTeam(home, "de") : null;
                    const awayLoc = away ? localizeTeam(away, "de") : null;
                    const stadium = stadiumsById[match.stadiumId];
                    const stageName =
                      stageLabels[match.stage] ?? match.stage;

                    return (
                      <Link
                        key={match.id}
                        href={`/spiel/${match.slug}`}
                        className="flex items-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white p-3 transition-colors hover:border-primary/30 hover:bg-primary/5 min-w-0"
                      >
                        <span className="text-sm font-semibold text-primary w-14 text-center shrink-0">
                          {match.time}
                        </span>
                        <span className="text-base shrink-0">
                          {home?.flag ?? ""}
                        </span>
                        <span className="font-medium truncate text-sm flex-1 min-w-0">
                          {homeLoc?.name ?? "TBD"}
                        </span>
                        <span className="text-xs text-gray-500 shrink-0">
                          vs
                        </span>
                        <span className="font-medium truncate text-right text-sm flex-1 min-w-0">
                          {awayLoc?.name ?? "TBD"}
                        </span>
                        <span className="text-base shrink-0">
                          {away?.flag ?? ""}
                        </span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0 hidden sm:block">
                          {match.group
                            ? `Gr. ${match.group}`
                            : stageName}
                        </span>
                        {stadium && (
                          <span className="text-xs text-gray-500 hidden lg:block shrink-0 w-36 text-right truncate">
                            {stadium.name}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
