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
          <div key={round} className="rounded-xl border border-gray-200 overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50-700 transition-colors"
              onClick={() => setExpandedRound(isExpanded ? round : round)}
            >
              <div className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full ${colorClass}`} />
                <span className="font-bold text-sm text-gray-900">
                  {ROUND_LABELS[round]}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {filledCount}/{totalCount} ✓
              </span>
            </button>

            <div className="divide-y divide-gray-100 px-3 py-2 bg-gray-50-900/30 space-y-2">
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
