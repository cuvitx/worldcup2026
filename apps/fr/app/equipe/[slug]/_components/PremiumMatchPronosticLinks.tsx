import Link from "next/link";
import type { Team } from "@repo/data";
import type { matches as matchesType } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

type Match = (typeof matchesType)[number];

interface PremiumMatchPronosticLinksProps {
  team: Team;
  teamMatches: Match[];
}

export function PremiumMatchPronosticLinks({ team, teamMatches }: PremiumMatchPronosticLinksProps) {
  if (teamMatches.length === 0) return null;

  return (
    <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Pronostics des matchs — {team.name}
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {teamMatches.map((match) => {
            const homeTeam = teamsById[match.homeTeamId];
            const awayTeam = teamsById[match.awayTeamId];

            return (
              <Link
                key={match.id}
                href={`/pronostic-match/${match.slug}`}
                className="group rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-lg">{homeTeam?.flag ?? "🏳️"}</span>
                  <span className="text-xs font-bold text-gray-400">VS</span>
                  <span className="text-lg">{awayTeam?.flag ?? "🏳️"}</span>
                </div>
                <p className="text-sm font-bold text-gray-900 dark:text-white text-center group-hover:text-primary transition-colors">
                  {homeTeam?.name ?? match.homeTeamId} vs {awayTeam?.name ?? match.awayTeamId}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 text-center mt-1">
                  {new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                </p>
                <p className="text-xs text-primary text-center mt-2 font-medium group-hover:underline">
                  Voir le pronostic →
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
