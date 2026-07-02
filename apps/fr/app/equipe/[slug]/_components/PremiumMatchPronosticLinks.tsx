import Link from "next/link";
import type { Team } from "@repo/data";
import type { matches as matchesType } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

type Match = (typeof matchesType)[number];
type ResolvedTeamMatch = Match & {
  homeName?: string;
  awayName?: string;
  homeFlag?: string;
  awayFlag?: string;
};

interface PremiumMatchPronosticLinksProps {
  team: Team;
  teamMatches: ResolvedTeamMatch[];
}

export function PremiumMatchPronosticLinks({ team, teamMatches }: PremiumMatchPronosticLinksProps) {
  if (teamMatches.length === 0) return null;

  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pronostics des matchs — {team.name}
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {teamMatches.map((match) => {
            const homeTeam = teamsById[match.homeTeamId];
            const awayTeam = teamsById[match.awayTeamId];
            const homeName = homeTeam?.name ?? match.homeName ?? "À déterminer";
            const awayName = awayTeam?.name ?? match.awayName ?? "À déterminer";
            const homeFlag = homeTeam?.flag ?? match.homeFlag ?? "";
            const awayFlag = awayTeam?.flag ?? match.awayFlag ?? "";

            return (
              <Link
                key={match.id}
                href={`/pronostic-match/${match.slug}`}
                className="group relative rounded-2xl border border-gray-200 bg-white p-5 hover:border-accent/40 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                {/* Date badge */}
                <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  {new Date(match.date).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                </span>

                {/* Flags row */}
                <div className="flex items-center justify-center gap-4 mb-3 mt-1">
                  <div className="text-center">
                    <span className="text-3xl block">{homeFlag}</span>
                    <span className="text-[10px] font-medium text-gray-500 mt-1 block">{homeName}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-300 uppercase">vs</span>
                  <div className="text-center">
                    <span className="text-3xl block">{awayFlag}</span>
                    <span className="text-[10px] font-medium text-gray-500 mt-1 block">{awayName}</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-3 border-t border-gray-100">
                  <span className="text-xs font-semibold text-accent group-hover:underline">
                    Voir le pronostic →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
