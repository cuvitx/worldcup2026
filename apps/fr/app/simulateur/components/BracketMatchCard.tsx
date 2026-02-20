import type { TeamInfo, MatchData } from "./types";

export function BracketMatchCard({
  match,
  onSelect,
  isFinal,
}: {
  match: MatchData;
  onSelect: (teamId: string) => void;
  isFinal?: boolean;
}) {
  const { team1, team2, winner } = match;
  const canPick = !!(team1 && team2);

  return (
    <div
      className={`rounded-xl overflow-hidden border transition-all ${
        winner
          ? "border-accent/30 dark:border-accent/20 shadow-sm"
          : "border-gray-200 dark:border-gray-600"
      } ${isFinal ? "shadow-lg shadow-primary/10 border-primary/30" : ""} bg-white dark:bg-slate-800`}
    >
      <TeamSlot
        team={team1}
        isWinner={winner === team1?.id}
        onSelect={() => team1 && onSelect(team1.id)}
        canPick={canPick}
      />
      <div className="h-px bg-gray-100 dark:bg-gray-700" />
      <TeamSlot
        team={team2}
        isWinner={winner === team2?.id}
        onSelect={() => team2 && onSelect(team2.id)}
        canPick={canPick}
      />
    </div>
  );
}

function TeamSlot({
  team,
  isWinner,
  onSelect,
  canPick,
}: {
  team: TeamInfo | null;
  isWinner: boolean;
  onSelect: () => void;
  canPick: boolean;
}) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 px-2.5 py-2 text-gray-500 dark:text-gray-600">
        <span className="text-base opacity-40">⬜</span>
        <span className="text-xs italic">À déterminer</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!canPick}
      onClick={onSelect}
      className={`w-full flex items-center gap-2 px-2.5 py-2 text-left transition-all ${
        isWinner
          ? "bg-accent/10 dark:bg-secondary/10 font-bold"
          : canPick
          ? "hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-gray-700/60 cursor-pointer"
          : "cursor-default opacity-60"
      }`}
    >
      <span className="text-base leading-none shrink-0" role="img" aria-label={team.name}>
        {team.flag}
      </span>
      <span
        className={`text-xs truncate flex-1 ${
          isWinner
            ? "text-accent dark:text-secondary"
            : "text-gray-800 dark:text-gray-200"
        }`}
      >
        {team.name}
      </span>
      {isWinner && (
        <span className="shrink-0 text-accent dark:text-secondary text-xs font-bold">✓</span>
      )}
    </button>
  );
}
