"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { teams as allTeams } from "@repo/data/teams";
import { groups } from "@repo/data/groups";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TeamInfo {
  id: string;
  name: string;
  flag: string;
  code: string;
  fifaRanking: number;
}

interface MatchData {
  id: string;
  team1: TeamInfo | null;
  team2: TeamInfo | null;
  winner: string | null; // team id
}

type RoundName = "R32" | "R16" | "QF" | "SF" | "F";

const ROUND_LABELS: Record<RoundName, string> = {
  R32: "32e de finale",
  R16: "16e de finale",
  QF: "Quarts de finale",
  SF: "Demi-finales",
  F: "Finale",
};

const ROUND_ORDER: RoundName[] = ["R32", "R16", "QF", "SF", "F"];

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------

const teamsMap = new Map(allTeams.map((t) => [t.id, t]));

function getGroupTeamsSortedByRanking(groupLetter: string): TeamInfo[] {
  const group = groups.find((g) => g.letter === groupLetter);
  if (!group) return [];
  return group.teams
    .map((id) => teamsMap.get(id))
    .filter(Boolean)
    .sort((a, b) => {
      // 0 ranking (TBD) goes last
      if (a!.fifaRanking === 0) return 1;
      if (b!.fifaRanking === 0) return -1;
      return a!.fifaRanking - b!.fifaRanking;
    })
    .map((t) => ({
      id: t!.id,
      name: t!.name,
      flag: t!.flag,
      code: t!.code,
      fifaRanking: t!.fifaRanking,
    }));
}

/** Get top 2 from each group + 8 best 3rd-placed teams = 32 teams */
function getQualifiedTeams(): {
  firstByGroup: Record<string, TeamInfo>;
  secondByGroup: Record<string, TeamInfo>;
  bestThirds: TeamInfo[];
} {
  const firstByGroup: Record<string, TeamInfo> = {};
  const secondByGroup: Record<string, TeamInfo> = {};
  const thirds: TeamInfo[] = [];

  const groupLetters = groups.map((g) => g.letter);
  for (const letter of groupLetters) {
    const sorted = getGroupTeamsSortedByRanking(letter);
    if (sorted[0]) firstByGroup[letter] = sorted[0];
    if (sorted[1]) secondByGroup[letter] = sorted[1];
    if (sorted[2]) thirds.push(sorted[2]);
  }

  // Best 8 third-placed teams by ranking
  const bestThirds = thirds
    .sort((a, b) => {
      if (a.fifaRanking === 0) return 1;
      if (b.fifaRanking === 0) return -1;
      return a.fifaRanking - b.fifaRanking;
    })
    .slice(0, 8);

  return { firstByGroup, secondByGroup, bestThirds };
}

/**
 * Build initial R32 matchups.
 * Pairs: 1st of group X vs 2nd of next group, plus 4 matches for best thirds.
 */
function buildR32Matches(): MatchData[] {
  const { firstByGroup, secondByGroup, bestThirds } = getQualifiedTeams();

  // 12 matches: 1st vs 2nd cross-group pairings
  const pairings: [string, string][] = [
    ["A", "B"], // 1A vs 2B
    ["C", "D"], // 1C vs 2D
    ["E", "F"], // 1E vs 2F
    ["G", "H"], // 1G vs 2H
    ["I", "J"], // 1I vs 2J
    ["K", "L"], // 1K vs 2L
    ["B", "A"], // 1B vs 2A
    ["D", "C"], // 1D vs 2C
    ["F", "E"], // 1F vs 2E
    ["H", "G"], // 1H vs 2G
    ["J", "I"], // 1J vs 2I
    ["L", "K"], // 1L vs 2K
  ];

  const matches: MatchData[] = pairings.map(([g1, g2], i) => ({
    id: `R32-${i}`,
    team1: firstByGroup[g1] || null,
    team2: secondByGroup[g2] || null,
    winner: null,
  }));

  // 4 matches for best thirds (paired 1-8, 2-7, 3-6, 4-5)
  for (let i = 0; i < 4; i++) {
    matches.push({
      id: `R32-${12 + i}`,
      team1: bestThirds[i] || null,
      team2: bestThirds[7 - i] || null,
      winner: null,
    });
  }

  return matches;
}

function buildEmptyMatches(round: RoundName, count: number): MatchData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${round}-${i}`,
    team1: null,
    team2: null,
    winner: null,
  }));
}

// ---------------------------------------------------------------------------
// Local storage
// ---------------------------------------------------------------------------

const LS_KEY = "cdm2026-bracket-simulator";

interface SavedState {
  rounds: Record<RoundName, MatchData[]>;
}

function loadState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedState;
  } catch {
    return null;
  }
}

function saveState(state: SavedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    /* quota exceeded — ignore */
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BracketSimulator() {
  const [rounds, setRounds] = useState<Record<RoundName, MatchData[]>>(() => {
    return {
      R32: buildR32Matches(),
      R16: buildEmptyMatches("R16", 8),
      QF: buildEmptyMatches("QF", 4),
      SF: buildEmptyMatches("SF", 2),
      F: buildEmptyMatches("F", 1),
    };
  });
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadState();
    if (saved?.rounds) {
      setRounds(saved.rounds);
    }
    setLoaded(true);
  }, []);

  // Save on change
  useEffect(() => {
    if (loaded) {
      saveState({ rounds });
    }
  }, [rounds, loaded]);

  /** When a winner is picked, cascade: advance winner to next round & clear downstream */
  const pickWinner = useCallback(
    (round: RoundName, matchIndex: number, teamId: string) => {
      setRounds((prev) => {
        const next = structuredClone(prev);
        const match = next[round][matchIndex];
        if (!match) return prev;

        // Toggle: if already selected, deselect
        if (match.winner === teamId) {
          match.winner = null;
          // Clear downstream
          cascadeClear(next, round, matchIndex);
          return next;
        }

        match.winner = teamId;
        const winnerTeam =
          match.team1?.id === teamId ? match.team1 : match.team2;

        // Advance to next round
        const roundIdx = ROUND_ORDER.indexOf(round);
        if (roundIdx < ROUND_ORDER.length - 1) {
          const nextRound = ROUND_ORDER[roundIdx + 1] as RoundName;
          const nextMatchIdx = Math.floor(matchIndex / 2);
          const slot: "team1" | "team2" = matchIndex % 2 === 0 ? "team1" : "team2";
          const nextMatch = next[nextRound]?.[nextMatchIdx];
          if (nextMatch) {
            // If the team in that slot changed, clear downstream
            const oldTeam = nextMatch[slot];
            if (oldTeam?.id !== winnerTeam?.id) {
              // Clear this slot's winner if it was the old team
              if (nextMatch.winner === oldTeam?.id) {
                nextMatch.winner = null;
                cascadeClear(next, nextRound, nextMatchIdx);
              }
            }
            nextMatch[slot] = winnerTeam || null;
          }
        }

        return next;
      });
    },
    []
  );

  /** Clear winner and downstream from a specific match */
  function cascadeClear(
    state: Record<RoundName, MatchData[]>,
    round: RoundName,
    matchIndex: number
  ) {
    const roundIdx = ROUND_ORDER.indexOf(round);
    if (roundIdx >= ROUND_ORDER.length - 1) return;

    const nextRound = ROUND_ORDER[roundIdx + 1] as RoundName;
    const nextMatchIdx = Math.floor(matchIndex / 2);
    const slot: "team1" | "team2" = matchIndex % 2 === 0 ? "team1" : "team2";
    const nextMatch = state[nextRound]?.[nextMatchIdx];
    if (!nextMatch) return;

    // If the winner was from this slot, clear it
    if (nextMatch.winner === nextMatch[slot]?.id) {
      nextMatch.winner = null;
      cascadeClear(state, nextRound, nextMatchIdx);
    }
    nextMatch[slot] = null;
  }

  const reset = useCallback(() => {
    const fresh = {
      R32: buildR32Matches(),
      R16: buildEmptyMatches("R16", 8),
      QF: buildEmptyMatches("QF", 4),
      SF: buildEmptyMatches("SF", 2),
      F: buildEmptyMatches("F", 1),
    };
    setRounds(fresh);
    if (typeof window !== "undefined") {
      localStorage.removeItem(LS_KEY);
    }
  }, []);

  const champion = useMemo(() => {
    const final = rounds.F[0];
    if (!final?.winner) return null;
    return final.winner === final.team1?.id ? final.team1 : final.team2;
  }, [rounds]);

  if (!loaded) {
    return (
      <div className="text-center py-20 text-gray-400">
        Chargement du simulateur…
      </div>
    );
  }

  return (
    <div>
      {/* Champion banner */}
      <div className="mb-6 text-center">
        {champion ? (
          <div className="inline-flex items-center gap-3 bg-yellow-50 border-2 border-yellow-400 rounded-xl px-6 py-4 text-xl font-bold text-yellow-800">
            🏆 Votre champion : {champion.flag} {champion.name}
          </div>
        ) : (
          <p className="text-gray-500">
            Sélectionnez les vainqueurs pour simuler le tableau final.
          </p>
        )}
      </div>

      {/* Reset button */}
      <div className="mb-6 text-center">
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium text-gray-700 transition-colors"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Desktop: horizontal bracket */}
      <div className="hidden lg:block">
        <DesktopBracket rounds={rounds} onPick={pickWinner} />
      </div>

      {/* Mobile: vertical list */}
      <div className="lg:hidden">
        <MobileBracket rounds={rounds} onPick={pickWinner} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop bracket (horizontal)
// ---------------------------------------------------------------------------

function DesktopBracket({
  rounds,
  onPick,
}: {
  rounds: Record<RoundName, MatchData[]>;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
}) {
  // Split bracket into left side (first half) and right side (second half)
  // Left: R32[0-7] → R16[0-3] → QF[0-1] → SF[0]
  // Right: R32[8-15] → R16[4-7] → QF[2-3] → SF[1]
  // Center: Final

  const leftR32 = rounds.R32.slice(0, 8);
  const rightR32 = rounds.R32.slice(8, 16);
  const leftR16 = rounds.R16.slice(0, 4);
  const rightR16 = rounds.R16.slice(4, 8);
  const leftQF = rounds.QF.slice(0, 2);
  const rightQF = rounds.QF.slice(2, 4);
  const leftSF = rounds.SF.slice(0, 1);
  const rightSF = rounds.SF.slice(1, 2);

  return (
    <div className="flex items-stretch justify-center gap-2 min-h-[800px] overflow-x-auto">
      {/* Left side */}
      <RoundColumn
        label="32e"
        matches={leftR32}
        round="R32"
        onPick={onPick}
        baseIndex={0}
      />
      <RoundColumn
        label="16e"
        matches={leftR16}
        round="R16"
        onPick={onPick}
        baseIndex={0}
      />
      <RoundColumn
        label="Quarts"
        matches={leftQF}
        round="QF"
        onPick={onPick}
        baseIndex={0}
      />
      <RoundColumn
        label="Demis"
        matches={leftSF}
        round="SF"
        onPick={onPick}
        baseIndex={0}
      />

      {/* Final */}
      <RoundColumn
        label="Finale"
        matches={rounds.F.slice(0, 1)}
        round="F"
        onPick={onPick}
        baseIndex={0}
        isFinal
      />

      {/* Right side (reversed order) */}
      <RoundColumn
        label="Demis"
        matches={rightSF}
        round="SF"
        onPick={onPick}
        baseIndex={1}
      />
      <RoundColumn
        label="Quarts"
        matches={rightQF}
        round="QF"
        onPick={onPick}
        baseIndex={2}
      />
      <RoundColumn
        label="16e"
        matches={rightR16}
        round="R16"
        onPick={onPick}
        baseIndex={4}
      />
      <RoundColumn
        label="32e"
        matches={rightR32}
        round="R32"
        onPick={onPick}
        baseIndex={8}
      />
    </div>
  );
}

function RoundColumn({
  label,
  matches,
  round,
  onPick,
  baseIndex,
  isFinal,
}: {
  label: string;
  matches: MatchData[];
  round: RoundName;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
  baseIndex: number;
  isFinal?: boolean;
}) {
  const actualRound = round;

  return (
    <div className="flex flex-col items-center min-w-[150px]">
      <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 bg-gray-100 px-3 py-1 rounded-full">
        {label}
      </div>
      <div
        className={`flex flex-col justify-around flex-1 gap-2 ${
          isFinal ? "justify-center" : ""
        }`}
      >
        {matches.map((match, i) => (
          <MatchCard
            key={match.id}
            match={match}
            onSelect={(teamId) =>
              onPick(actualRound, baseIndex + i, teamId)
            }
            compact
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile bracket (vertical)
// ---------------------------------------------------------------------------

function MobileBracket({
  rounds,
  onPick,
}: {
  rounds: Record<RoundName, MatchData[]>;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
}) {
  return (
    <div className="space-y-8">
      {ROUND_ORDER.map((round) => (
        <div key={round}>
          <div className="mb-3">
            <span className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              {ROUND_LABELS[round]}
            </span>
          </div>
          <div
            className="space-y-3"
            style={{
              paddingLeft: `${ROUND_ORDER.indexOf(round) * 12}px`,
            }}
          >
            {rounds[round].map((match, i) => (
              <MatchCard
                key={match.id}
                match={match}
                onSelect={(teamId) => onPick(round, i, teamId)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Match card
// ---------------------------------------------------------------------------

function MatchCard({
  match,
  onSelect,
  compact,
}: {
  match: MatchData;
  onSelect: (teamId: string) => void;
  compact?: boolean;
}) {
  const { team1, team2, winner } = match;

  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden ${
        compact ? "text-sm" : ""
      }`}
    >
      <TeamRow
        team={team1}
        isWinner={winner === team1?.id}
        onSelect={() => team1 && onSelect(team1.id)}
        compact={compact}
        disabled={!team1 || !team2}
      />
      <div className="border-t border-gray-100" />
      <TeamRow
        team={team2}
        isWinner={winner === team2?.id}
        onSelect={() => team2 && onSelect(team2.id)}
        compact={compact}
        disabled={!team1 || !team2}
      />
    </div>
  );
}

function TeamRow({
  team,
  isWinner,
  onSelect,
  compact,
  disabled,
}: {
  team: TeamInfo | null;
  isWinner: boolean;
  onSelect: () => void;
  compact?: boolean;
  disabled: boolean;
}) {
  if (!team) {
    return (
      <div
        className={`flex items-center gap-2 ${
          compact ? "px-2 py-1.5" : "px-3 py-2"
        } text-gray-300`}
      >
        <span className="text-base">⬜</span>
        <span className="italic text-xs">À déterminer</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className={`w-full flex items-center gap-2 text-left transition-colors ${
        compact ? "px-2 py-1.5" : "px-3 py-2"
      } ${
        isWinner
          ? "bg-emerald-100 text-emerald-900 font-bold"
          : "hover:bg-gray-50"
      } ${disabled ? "cursor-default opacity-60" : "cursor-pointer"}`}
    >
      <span className="text-base leading-none">{team.flag}</span>
      <span className={compact ? "text-xs" : "text-sm"}>{team.name}</span>
      {isWinner && <span className="ml-auto text-emerald-600 text-xs">✓</span>}
    </button>
  );
}
