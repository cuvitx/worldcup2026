import Link from "next/link";
import type { matches as matchesType } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { matchPredictionByPair } from "@repo/data/predictions";
import { estimatedMatchOdds } from "@repo/data/affiliates";

type Match = (typeof matchesType)[number];

interface PremiumMatchCalendarProps {
  teamId: string;
  teamName: string;
  teamMatches: Match[];
}

export function PremiumMatchCalendar({ teamId, teamName, teamMatches }: PremiumMatchCalendarProps) {
  return (
    <section id="calendrier" className="bg-gray-50 dark:bg-slate-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Calendrier des matchs — {teamName}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Groupe {teamsById[teamId]?.group} · CDM 2026 · Heure locale (Paris)
        </p>

        <div className="space-y-3">
          {teamMatches.map((match) => {
            const homeTeam = teamsById[match.homeTeamId];
            const awayTeam = teamsById[match.awayTeamId];
            const stadium = stadiumsById[match.stadiumId];
            const isHome = match.homeTeamId === teamId;

            const pred = matchPredictionByPair[`${match.homeTeamId}:${match.awayTeamId}`];
            const odds = pred
              ? estimatedMatchOdds(pred.team1WinProb, pred.drawProb, pred.team2WinProb)
              : undefined;

            const teamWinOdds = isHome ? odds?.home : odds?.away;

            const dateObj = new Date(`${match.date}T${match.time ?? "00:00"}Z`);
            const dateStr = dateObj.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const timeStr = dateObj.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Europe/Paris",
            });

            return (
              <div
                key={match.id}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-primary/30 dark:hover:border-secondary/40"
              >
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="shrink-0 text-center hidden sm:block w-20">
                    <p className="text-xs text-gray-400 dark:text-gray-400 capitalize">
                      {dateObj.toLocaleDateString("fr-FR", { weekday: "short" })}
                    </p>
                    <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {dateObj.getDate()}/{dateObj.getMonth() + 1}
                    </p>
                    <p className="text-xs text-primary">{timeStr}</p>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xl">{homeTeam?.flag ?? "🏳️"}</span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                        {homeTeam?.name ?? match.homeTeamId}
                      </span>
                      <span className="text-gray-400 dark:text-gray-400 font-bold">vs</span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                        {awayTeam?.name ?? match.awayTeamId}
                      </span>
                      <span className="text-xl">{awayTeam?.flag ?? "🏳️"}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {match.group && (
                        <span className="text-xs bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary px-2 py-0.5 rounded font-medium">
                          Groupe {match.group}
                        </span>
                      )}
                      {stadium && (
                        <span className="text-xs text-gray-500 dark:text-gray-300">
                          {stadium.name}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 dark:text-gray-400 sm:hidden">
                        {dateStr} · {timeStr}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    {teamWinOdds && teamWinOdds !== "—" && (
                      <div>
                        <p className="text-lg font-extrabold text-accent">{teamWinOdds}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-300">victoire</p>
                      </div>
                    )}
                    <Link
                      href={`/pronostic-match/${match.slug}`}
                      className="mt-1 inline-flex text-xs text-primary hover:underline font-medium"
                    >
                      Pronostic →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          <Link href="/match/calendrier" className="text-sm text-primary hover:underline font-medium">
            Voir le calendrier complet des 104 matchs →
          </Link>
        </div>
      </div>
    </section>
  );
}
