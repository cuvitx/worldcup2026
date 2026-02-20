import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

const roundColors: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  "round-of-32": { bg: "bg-primary/5 dark:bg-primary/30", border: "border-gray-200 dark:border-slate-700", text: "text-primary dark:text-secondary", badge: "bg-primary" },
  "round-of-16": { bg: "bg-primary/5 dark:bg-primary/30", border: "border-indigo-200 dark:border-indigo-800", text: "text-primary dark:text-secondary", badge: "bg-primary" },
  "quarter-final": { bg: "bg-primary/5 dark:bg-primary/30", border: "border-purple-200 dark:border-purple-800", text: "text-primary dark:text-secondary", badge: "bg-primary" },
  "semi-final": { bg: "bg-accent/10 dark:bg-accent/10", border: "border-accent/30 dark:border-accent/20", text: "text-accent dark:text-accent", badge: "bg-accent" },
  final: { bg: "bg-accent/5 dark:bg-accent/10", border: "border-accent/30 dark:border-accent/20", text: "text-accent dark:text-accent", badge: "bg-accent" },
};

export { roundColors };

function TeamSlot({ teamId, isWinner, label }: { teamId: string | null; isWinner?: boolean; label?: string }) {
  const team = teamId ? teamsById[teamId] : null;
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 italic">
        <span className="text-base">🏳</span>
        <span>{label ?? "À déterminer"}</span>
      </div>
    );
  }
  return (
    <Link
      href={`/equipe/${team.slug}`}
      className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
        isWinner ? "font-bold text-primary dark:text-secondary" : "text-gray-700 dark:text-gray-300"
      }`}
    >
      <span className="text-base" role="img" aria-label={`Drapeau de ${team.name}`}>{team.flag}</span>
      <span className="truncate">{team.name}</span>
      {isWinner && <span className="ml-auto text-xs text-success font-semibold">&#10003;</span>}
    </Link>
  );
}

export function MatchCard({
  matchId, homeTeamId, awayTeamId, homeLabel, awayLabel, winnerId, stage,
}: {
  matchId: string;
  homeTeamId: string | null;
  awayTeamId: string | null;
  homeLabel?: string;
  awayLabel?: string;
  winnerId: string | null;
  stage: string;
}) {
  const match = matches.find((m) => m.id === matchId);
  const colors = roundColors[stage] ?? roundColors["round-of-32"]!;
  const dateStr = match
    ? new Date(match.date + "T" + match.time + ":00Z").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })
    : "";

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} overflow-hidden min-w-[220px]`}>
      {match ? (
        <Link href={`/match/${match.slug}`} className="block">
          <div className="divide-y divide-gray-200">
            <TeamSlot teamId={homeTeamId} isWinner={winnerId === homeTeamId} label={homeLabel} />
            <TeamSlot teamId={awayTeamId} isWinner={winnerId === awayTeamId} label={awayLabel} />
          </div>
          <div className="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-300 bg-white/60 dark:bg-black/20 flex justify-between">
            <span>{dateStr}</span>
            <span className="text-gray-500">{match.slug}</span>
          </div>
        </Link>
      ) : (
        <div className="divide-y divide-gray-200">
          <TeamSlot teamId={homeTeamId} isWinner={winnerId === homeTeamId} label={homeLabel} />
          <TeamSlot teamId={awayTeamId} isWinner={winnerId === awayTeamId} label={awayLabel} />
        </div>
      )}
    </div>
  );
}
