"use client";

import { useState } from "react";
import type { MatchData, RoundName } from "./types";
import { ROUND_LABELS, ROUND_COLORS, ROUND_ORDER } from "./types";
import { BracketMatchCard } from "./BracketMatchCard";

export function MobileBracket({
  rounds,
  onPick,
}: {
  rounds: Record<RoundName, MatchData[]>;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
}) {
  const [expandedRound, setExpandedRound] = useState<RoundName>("R32");

  return (
    <div className="space-y-3">
      {ROUND_ORDER.map((round) => {
        const isExpanded = expandedRound === round;
        const colorClass = ROUND_COLORS[round];
        const filledCount = rounds[round].filter((m) => m.winner).length;
        const totalCount = rounds[round].filter((m) => m.team1 || m.team2).length;

        return (
          <div key={round} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(2,21,45,0.06)]">
            <button
              className="flex w-full items-center justify-between px-4 py-3.5 transition-colors hover:bg-slate-50"
              onClick={() => setExpandedRound(isExpanded ? round : round)}
            >
              <div className="flex items-center gap-2">
                <span className={`inline-block h-3 w-3 rounded-full ${colorClass}`} />
                <span className="text-sm font-black text-slate-950">
                  {ROUND_LABELS[round]}
                </span>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600">
                {filledCount}/{totalCount} ✓
              </span>
            </button>

            <div className="space-y-2.5 bg-slate-50/60 px-3 py-3">
              {rounds[round].map((match, i) => (
                <BracketMatchCard
                  key={match.id}
                  match={match}
                  onSelect={(teamId) => onPick(round, i, teamId)}
                  isFinal={round === "F"}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
