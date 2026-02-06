import Link from "next/link";
import type { Team } from "@repo/data/types";

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      href={`/team/${team.slug}`}
      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <span className="text-3xl">{team.flag}</span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-gray-900">{team.name}</h3>
        <p className="text-sm text-gray-500">
          Group {team.group} &middot; {team.confederation} &middot; #{team.fifaRanking} FIFA
        </p>
      </div>
      {team.isHost && (
        <span className="rounded-full bg-gold/10 px-2 py-1 text-xs font-medium text-gold">
          Host
        </span>
      )}
    </Link>
  );
}
