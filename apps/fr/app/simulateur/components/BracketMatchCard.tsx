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
      data-simulator-match-id={match.id}
      className={`group overflow-hidden rounded-xl border bg-white transition-all ${
        winner
          ? "border-accent/45 shadow-[0_10px_24px_rgba(0,191,111,0.14)]"
          : "border-slate-200 shadow-[0_5px_16px_rgba(2,21,45,0.06)] hover:border-slate-300"
      } ${isFinal ? "border-primary/50 shadow-[0_14px_34px_rgba(245,166,35,0.22)]" : ""}`}
    >
      <TeamSlot
        team={team1}
        isWinner={winner === team1?.id}
        onSelect={() => team1 && onSelect(team1.id)}
        canPick={canPick}
      />
      <div className="h-px bg-gray-100" />
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
      <div className="flex min-h-11 items-center gap-2.5 px-3 py-2.5 text-slate-500">
        <span className="h-5 w-5 rounded bg-slate-100 ring-1 ring-slate-200" />
        <span className="truncate text-xs italic">À déterminer</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!canPick}
      onClick={onSelect}
      className={`flex min-h-11 w-full items-center gap-2.5 px-3 py-2.5 text-left transition-all ${
        isWinner
          ? "bg-accent/10 font-bold text-accent"
          : canPick
          ? "cursor-pointer text-slate-900 hover:bg-slate-50"
          : "cursor-default text-slate-700"
      }`}
    >
      <span
        className={`inline-flex h-7 w-8 shrink-0 items-center justify-center rounded-lg text-lg leading-none ring-1 ${
          isWinner ? "bg-white ring-accent/30" : "bg-slate-50 ring-slate-200"
        }`}
        role="img"
        aria-label={team.name}
      >
        {team.flag}
      </span>
      <span
        className={`min-w-0 flex-1 truncate text-[13px] leading-tight ${
          isWinner
            ? "text-accent"
            : "text-slate-800"
        }`}
      >
        {team.name}
      </span>
      {isWinner && (
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-black text-white">
          ✓
        </span>
      )}
    </button>
  );
}
