import Link from "next/link";
import type { Team } from "@repo/data/types";

/**
 * Props for the TeamCard component.
 * 
 * @param team - Team data object
 * @param compact - Use compact layout (default: false)
 */
interface TeamCardProps {
  team: Team;
  compact?: boolean;
}

/**
 * TeamCard component — Clickable card displaying team info (flag, name, group, ranking).
 * 
 * @example
 * ```tsx
 * <TeamCard
 *   team={{
 *     slug: "france",
 *     name: "France",
 *     flag: "🇫🇷",
 *     group: "A",
 *     fifaRanking: 4,
 *     confederation: "UEFA",
 *     isHost: false
 *   }}
 * />
 * ```
 */
export function TeamCard({ team, compact = false }: TeamCardProps) {
  if (compact) {
    return (
      <Link
        href={`/equipe/${team.slug}`}
        className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-all hover:border-primary/30 hover:shadow-sm hover:bg-gray-50"
      >
        <span className="text-2xl shrink-0" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 break-words">{team.name}</p>
          <p className="text-xs text-gray-500">
            Groupe {team.group} · #{team.fifaRanking || "–"} FIFA
          </p>
        </div>
        {team.isHost && (
          <span className="shrink-0 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-bold text-accent uppercase">
            Hôte
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={`/equipe/${team.slug}`}
      className="group relative flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Ranking badge */}
      {team.fifaRanking > 0 && team.fifaRanking <= 10 && (
        <span className="absolute top-3 right-3 text-[10px] font-bold text-accent bg-accent/10 rounded px-1.5 py-0.5">
          #{team.fifaRanking}
        </span>
      )}

      <span
        className="text-4xl shrink-0 transition-transform group-hover:scale-110 duration-200"
        role="img"
        aria-label={`Drapeau de ${team.name}`}
      >
        {team.flag}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 break-words">{team.name}</h3>
        <p className="mt-0.5 text-sm text-gray-500">
          Groupe {team.group} · {team.confederation}
          {team.fifaRanking > 0 ? ` · #${team.fifaRanking} FIFA` : ""}
        </p>
        {team.isHost && (
          <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
            Pays hôte
          </span>
        )}
      </div>

      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0">›</span>
    </Link>
  );
}
