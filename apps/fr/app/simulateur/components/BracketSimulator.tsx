"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { ShareButtons } from "../../components/ShareButtons";
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
  winner: string | null;
}

type RoundName = "R32" | "R16" | "QF" | "SF" | "F";

const ROUND_LABELS: Record<RoundName, string> = {
  R32: "32e de finale",
  R16: "16e de finale",
  QF: "Quarts",
  SF: "Demis",
  F: "Finale",
};

const ROUND_COLORS: Record<RoundName, string> = {
  R32: "bg-slate-500",
  R16: "bg-secondary",
  QF: "bg-primary",
  SF: "bg-accent",
  F: "bg-gold",
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

function getQualifiedTeams() {
  const firstByGroup: Record<string, TeamInfo> = {};
  const secondByGroup: Record<string, TeamInfo> = {};
  const thirds: TeamInfo[] = [];

  for (const g of groups) {
    const sorted = getGroupTeamsSortedByRanking(g.letter);
    if (sorted[0]) firstByGroup[g.letter] = sorted[0];
    if (sorted[1]) secondByGroup[g.letter] = sorted[1];
    if (sorted[2]) thirds.push(sorted[2]);
  }

  const bestThirds = thirds
    .sort((a, b) => {
      if (a.fifaRanking === 0) return 1;
      if (b.fifaRanking === 0) return -1;
      return a.fifaRanking - b.fifaRanking;
    })
    .slice(0, 8);

  return { firstByGroup, secondByGroup, bestThirds };
}

function buildR32Matches(): MatchData[] {
  const { firstByGroup, secondByGroup, bestThirds } = getQualifiedTeams();

  const pairings: [string, string][] = [
    ["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"],
    ["I", "J"], ["K", "L"], ["B", "A"], ["D", "C"],
    ["F", "E"], ["H", "G"], ["J", "I"], ["L", "K"],
  ];

  const matches: MatchData[] = pairings.map(([g1, g2], i) => ({
    id: `R32-${i}`,
    team1: firstByGroup[g1] || null,
    team2: secondByGroup[g2] || null,
    winner: null,
  }));

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
// LocalStorage
// ---------------------------------------------------------------------------

const LS_KEY = "cdm2026-bracket-v2";

interface SavedState {
  rounds: Record<RoundName, MatchData[]>;
}

function loadState(): SavedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedState) : null;
  } catch {
    return null;
  }
}

function saveState(state: SavedState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch { /* quota */ }
}

// ---------------------------------------------------------------------------
// Confetti animation
// ---------------------------------------------------------------------------

function ConfettiParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    color: ["#FF6B35", "#f5a623", "#06D6A0", "#2EC4B6", "#a78bfa"][
      Math.floor(Math.random() * 5)
    ],
    size: `${6 + Math.random() * 8}px`,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute confetti-particle"
          style={{
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Progress indicator
// ---------------------------------------------------------------------------

function ProgressBar({ rounds }: { rounds: Record<RoundName, MatchData[]> }) {
  const totalMatches = ROUND_ORDER.reduce(
    (acc, r) => acc + rounds[r].filter((m) => m.team1 || m.team2).length,
    0
  );
  const filledMatches = ROUND_ORDER.reduce(
    (acc, r) => acc + rounds[r].filter((m) => m.winner).length,
    0
  );
  const pct = totalMatches > 0 ? Math.round((filledMatches / totalMatches) * 100) : 0;

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap font-medium">
        Progression
      </span>
      <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-gold transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-gray-700 dark:text-gray-200 whitespace-nowrap">
        {filledMatches}/{totalMatches}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function BracketSimulator() {
  const [rounds, setRounds] = useState<Record<RoundName, MatchData[]>>(() => ({
    R32: buildR32Matches(),
    R16: buildEmptyMatches("R16", 8),
    QF: buildEmptyMatches("QF", 4),
    SF: buildEmptyMatches("SF", 2),
    F: buildEmptyMatches("F", 1),
  }));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved?.rounds) setRounds(saved.rounds);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveState({ rounds });
  }, [rounds, loaded]);

  const pickWinner = useCallback((round: RoundName, matchIndex: number, teamId: string) => {
    setRounds((prev) => {
      const next = structuredClone(prev);
      const match = next[round][matchIndex];
      if (!match) return prev;

      if (match.winner === teamId) {
        match.winner = null;
        cascadeClear(next, round, matchIndex);
        return next;
      }

      match.winner = teamId;
      const winnerTeam = match.team1?.id === teamId ? match.team1 : match.team2;

      const roundIdx = ROUND_ORDER.indexOf(round);
      if (roundIdx < ROUND_ORDER.length - 1) {
        const nextRound = ROUND_ORDER[roundIdx + 1] as RoundName;
        const nextMatchIdx = Math.floor(matchIndex / 2);
        const slot: "team1" | "team2" = matchIndex % 2 === 0 ? "team1" : "team2";
        const nextMatch = next[nextRound]?.[nextMatchIdx];
        if (nextMatch) {
          const oldTeam = nextMatch[slot];
          if (oldTeam?.id !== winnerTeam?.id) {
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
  }, []);

  function cascadeClear(state: Record<RoundName, MatchData[]>, round: RoundName, matchIndex: number) {
    const roundIdx = ROUND_ORDER.indexOf(round);
    if (roundIdx >= ROUND_ORDER.length - 1) return;
    const nextRound = ROUND_ORDER[roundIdx + 1] as RoundName;
    const nextMatchIdx = Math.floor(matchIndex / 2);
    const slot: "team1" | "team2" = matchIndex % 2 === 0 ? "team1" : "team2";
    const nextMatch = state[nextRound]?.[nextMatchIdx];
    if (!nextMatch) return;
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
    if (typeof window !== "undefined") localStorage.removeItem(LS_KEY);
  }, []);

  const champion = useMemo(() => {
    const final = rounds.F[0];
    if (!final?.winner) return null;
    return final.winner === final.team1?.id ? final.team1 : final.team2;
  }, [rounds]);

  if (!loaded) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="mt-3 text-gray-500">Chargement du simulateur…</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Champion banner */}
      {champion ? (
        <div className="relative rounded-2xl overflow-hidden">
          <ConfettiParticles />
          <div
            className="relative z-10 flex flex-col items-center gap-3 py-8 px-6 text-center champion-glow rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #0D3B66 0%, #0F1923 50%, #0D3B66 100%)",
              border: "2px solid rgba(245,166,35,0.6)",
            }}
          >
            <span className="text-3xl">🏆</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gold mb-1">
                Votre champion CDM 2026
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-5xl">{champion.flag}</span>
                <p className="text-3xl font-extrabold text-white">{champion.name}</p>
              </div>
              {champion.fifaRanking > 0 && (
                <p className="text-sm text-gray-400 mt-1">#{champion.fifaRanking} FIFA</p>
              )}
            </div>
            <ShareButtons
              url="https://www.cdm2026.fr/simulateur"
              text={`Mon pronostic CDM 2026 : ${champion.flag} ${champion.name} champion du monde ! 🏆 #CDM2026 #WorldCup2026`}
              label="Partager mon bracket"
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-5 text-center">
          <p className="text-2xl mb-2">🏆</p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Sélectionnez les vainqueurs pour simuler le tournoi
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Cliquez sur une équipe pour la qualifier au tour suivant
          </p>
        </div>
      )}

      {/* Progress + Reset */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar rounds={rounds} />
        </div>
        <button
          onClick={reset}
          className="shrink-0 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 transition-all"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Desktop bracket */}
      <div className="hidden lg:block pb-4">
        <BracketScaler>
          <DesktopBracket rounds={rounds} onPick={pickWinner} />
        </BracketScaler>
      </div>

      {/* Mobile bracket */}
      <div className="lg:hidden">
        <MobileBracket rounds={rounds} onPick={pickWinner} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Bracket scaler — fits the bracket to available width
// ---------------------------------------------------------------------------

function BracketScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function recalc() {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (!container || !inner) return;
      // Reset scale to measure natural width
      inner.style.transform = "none";
      const containerW = container.clientWidth;
      const innerW = inner.scrollWidth;
      const naturalH = inner.scrollHeight;
      if (innerW > containerW) {
        const s = Math.max(0.4, containerW / innerW);
        setScale(s);
        setInnerHeight(naturalH * s);
      } else {
        setScale(1);
        setInnerHeight(undefined);
      }
      // Re-apply transform (will happen via React re-render)
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          ...(innerHeight ? { height: `${innerHeight}px`, marginBottom: 0 } : {}),
        }}
      >
        {children}
      </div>
      {/* Spacer to account for scaled height */}
      {innerHeight && <div style={{ height: 0 }} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop bracket
// ---------------------------------------------------------------------------

function DesktopBracket({
  rounds,
  onPick,
}: {
  rounds: Record<RoundName, MatchData[]>;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
}) {
  return (
    <div className="inline-flex items-stretch justify-center gap-1 lg:gap-1.5 xl:gap-2 2xl:gap-3 min-h-[800px]">
      <RoundColumn label={ROUND_LABELS.R32} matches={rounds.R32.slice(0, 8)} round="R32" onPick={onPick} baseIndex={0} />
      <RoundColumn label={ROUND_LABELS.R16} matches={rounds.R16.slice(0, 4)} round="R16" onPick={onPick} baseIndex={0} />
      <RoundColumn label={ROUND_LABELS.QF} matches={rounds.QF.slice(0, 2)} round="QF" onPick={onPick} baseIndex={0} />
      <RoundColumn label={ROUND_LABELS.SF} matches={rounds.SF.slice(0, 1)} round="SF" onPick={onPick} baseIndex={0} />
      <RoundColumn label={ROUND_LABELS.F} matches={rounds.F} round="F" onPick={onPick} baseIndex={0} isFinal />
      <RoundColumn label={ROUND_LABELS.SF} matches={rounds.SF.slice(1, 2)} round="SF" onPick={onPick} baseIndex={1} />
      <RoundColumn label={ROUND_LABELS.QF} matches={rounds.QF.slice(2, 4)} round="QF" onPick={onPick} baseIndex={2} />
      <RoundColumn label={ROUND_LABELS.R16} matches={rounds.R16.slice(4, 8)} round="R16" onPick={onPick} baseIndex={4} />
      <RoundColumn label={ROUND_LABELS.R32} matches={rounds.R32.slice(8, 16)} round="R32" onPick={onPick} baseIndex={8} />
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
  const colorClass = ROUND_COLORS[round];

  return (
    <div className="flex flex-col items-center min-w-[130px] w-[130px] lg:min-w-[145px] lg:w-[145px] xl:min-w-[160px] xl:w-[160px] 2xl:min-w-[180px] 2xl:w-[180px]">
      {/* Round label */}
      <div className={`text-[11px] font-bold uppercase tracking-wider mb-3 px-3 py-1.5 rounded-full text-white shadow-sm ${colorClass} ${round === "F" ? "text-gray-900" : ""}`}>
        {label}
      </div>

      {/* Matches */}
      <div className={`flex flex-col flex-1 gap-2.5 w-full ${isFinal ? "justify-center" : "justify-around"}`}>
        {matches.map((match, i) => (
          <div key={match.id} className="relative">
            <BracketMatchCard
              match={match}
              onSelect={(teamId) => onPick(round, baseIndex + i, teamId)}
              isFinal={isFinal}
            />
            {/* Connector line (right side, for non-final non-last columns) */}
            {!isFinal && (
              <div
                className="absolute right-0 top-1/2 w-3 border-t border-gray-300 dark:border-gray-600 translate-x-full opacity-50"
                style={{ marginTop: "-0.5px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile bracket
// ---------------------------------------------------------------------------

function MobileBracket({
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
          <div key={round} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Round header */}
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setExpandedRound(isExpanded ? round : round)}
            >
              <div className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full ${colorClass}`} />
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100">
                  {ROUND_LABELS[round]}
                </span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {filledCount}/{totalCount} ✓
              </span>
            </button>

            {/* Matches */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50 px-3 py-2 bg-gray-50 dark:bg-gray-900/30 space-y-2">
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

// ---------------------------------------------------------------------------
// Bracket match card
// ---------------------------------------------------------------------------

function BracketMatchCard({
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
          ? "border-green-300 dark:border-green-700 shadow-sm"
          : "border-gray-200 dark:border-gray-600"
      } ${isFinal ? "shadow-lg shadow-gold/10 border-gold/30" : ""} bg-white dark:bg-gray-800`}
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
      <div className="flex items-center gap-2 px-2.5 py-2 text-gray-400 dark:text-gray-600">
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
          ? "bg-emerald-50 dark:bg-emerald-900/30 font-bold"
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
            ? "text-emerald-800 dark:text-emerald-200"
            : "text-gray-800 dark:text-gray-200"
        }`}
      >
        {team.name}
      </span>
      {isWinner && (
        <span className="shrink-0 text-emerald-600 dark:text-emerald-400 text-xs font-bold">✓</span>
      )}
    </button>
  );
}
