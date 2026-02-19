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
      className="block rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 dark:">
        Groupe {group.letter}
      </h3>
      <ul className="space-y-2.5">
        {teams.map((team) => (
          <li key={team.id} className="flex items-center gap-2.5 text-sm">
            <span className="text-lg shrink-0" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium truncate flex-1">{team.name}</span>
            <span className="ml-auto text-xs text-gray-400 dark:text-gray-400 shrink-0">
              #{team.fifaRanking}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
}
