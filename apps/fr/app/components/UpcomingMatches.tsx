import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

const now = new Date();
const upcomingMatches = matches
  .filter((m) => new Date(`${m.date}T${m.time ?? "00:00"}Z`) >= now)
  .sort((a, b) => new Date(`${a.date}T${a.time ?? "00:00"}Z`).getTime() - new Date(`${b.date}T${b.time ?? "00:00"}Z`).getTime())
  .slice(0, 4);

function formatDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function UpcomingMatches() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Premiers matchs du tournoi
          </h2>
          <Link
            href="/match/calendrier"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voir le calendrier complet &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {upcomingMatches.map((match) => {
            const home = teamsById[match.homeTeamId];
            const away = teamsById[match.awayTeamId];
            const stadium = stadiumsById[match.stadiumId];
            return (
              <Link
                key={match.id}
                href={`/pronostic-match/${match.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-primary/30 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    Groupe {match.group} · Journée {match.matchday}
                  </span>
                  <span>{formatDate(match.date)}</span>
                </div>
                <div className="flex items-center justify-center gap-4 text-lg font-bold text-gray-900 dark:text-white">
                  <span className="text-right">
                    <span role="img" aria-label={`Drapeau de ${home?.name ?? match.homeTeamId}`}>{home?.flag ?? "🏳️"}</span> {home?.name ?? match.homeTeamId}
                  </span>
                  <span className="text-sm font-normal text-gray-500">vs</span>
                  <span className="text-left">
                    <span role="img" aria-label={`Drapeau de ${away?.name ?? match.awayTeamId}`}>{away?.flag ?? "🏳️"}</span> {away?.name ?? match.awayTeamId}
                  </span>
                </div>
                <div className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
                  {match.time} UTC · {stadium?.name ?? match.stadiumId}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
