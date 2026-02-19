import Link from "next/link";
import type { Group, Team } from "@repo/data/types";

interface GroupCardProps {
  group: Group;
  teams: Team[];
}

export function GroupCard({ group, teams }: GroupCardProps) {
  return (
    <Link
      href={`/groupe/${group.slug}`}
      className="block rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <h3 className="mb-3 text-lg font-bold text-primary">
        Groupe {group.letter}
      </h3>
      <ul className="space-y-2">
        {teams.map((team) => (
          <li key={team.id} className="flex items-center gap-2 text-sm">
            <span className="text-lg" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            <span>{team.name}</span>
            <span className="ml-auto text-xs text-gray-500">
              #{team.fifaRanking}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
