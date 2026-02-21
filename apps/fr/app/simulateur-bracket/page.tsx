import type { Metadata } from "next";

"use client";

import { useState, useCallback } from "react";
import Flag from "@repo/ui/flag";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { teamsById } from "@repo/data/teams";
import { Trophy, RotateCcw, Share2, ChevronRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MatchSlot {
  teamA: string | null; // team id or null (TBD)
  teamB: string | null;
  winner: string | null;
}

// ---------------------------------------------------------------------------
// FIFA 2026 projected bracket (48 teams → 32 in R32)
// Top 2 per group (24) + 8 best 3rd-placed teams
// Projected 1st/2nd/3rd based on FIFA ranking within each group
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  alternates: { canonical: "https://cdm2026.fr/simulateur-bracket" },
};

const PROJECTED = {
  A: { first: "mexique", second: "coree-du-sud", third: "afrique-du-sud" },
  B: { first: "suisse", second: "canada", third: "qatar" },
  C: { first: "bresil", second: "maroc", third: "ecosse" },
  D: { first: "etats-unis", second: "paraguay", third: "australie" },
  E: { first: "allemagne", second: "equateur", third: "cote-divoire" },
  F: { first: "pays-bas", second: "japon", third: "tunisie" },
  G: { first: "belgique", second: "iran", third: "egypte" },
  H: { first: "espagne", second: "uruguay", third: "arabie-saoudite" },
  I: { first: "france", second: "senegal", third: "norvege" },
  J: { first: "argentine", second: "autriche", third: "algerie" },
  K: { first: "portugal", second: "colombie", third: "ouzbekistan" },
  L: { first: "angleterre", second: "croatie", third: "ghana" },
} as const;

// Best 8 third-placed teams (projected by FIFA ranking)
const BEST_THIRDS = [
  "afrique-du-sud", // A3
  "ecosse",         // C3
  "australie",      // D3 — fixed below
  "cote-divoire",   // E3
  "tunisie",        // F3
  "egypte",         // G3
  "norvege",        // I3
  "algerie",        // J3
];

// ---------------------------------------------------------------------------
// R32 bracket: 16 matches
// FIFA-style pairing: 1A vs 3C/D/E, 2A vs 2C, 1B vs 3A/F/G, etc.
// Simplified realistic bracket for 48-team format
// ---------------------------------------------------------------------------

function buildInitialR32(): MatchSlot[] {
  const p = PROJECTED;
  return [
    // Left half (matches 0-7 → QF 0-3)
    { teamA: p.A.first, teamB: p.C.third, winner: null },       // M0: 1A vs 3C
    { teamA: p.C.second, teamB: p.D.second, winner: null },     // M1: 2C vs 2D
    { teamA: p.B.first, teamB: p.E.third, winner: null },       // M2: 1B vs 3E
    { teamA: p.D.first, teamB: p.F.third, winner: null },       // M3: 1D vs 3F
    { teamA: p.E.first, teamB: p.G.third, winner: null },       // M4: 1E vs 3G
    { teamA: p.F.second, teamB: p.H.second, winner: null },     // M5: 2F vs 2H
    { teamA: p.G.first, teamB: p.A.third, winner: null },       // M6: 1G vs 3A
    { teamA: p.H.first, teamB: p.B.second, winner: null },      // M7: 1H vs 2B
    // Right half (matches 8-15 → QF 4-7)
    { teamA: p.I.first, teamB: p.J.third, winner: null },       // M8: 1I vs 3J
    { teamA: p.J.second, teamB: p.K.second, winner: null },     // M9: 2J vs 2K
    { teamA: p.K.first, teamB: p.I.third, winner: null },       // M10: 1K vs 3I
    { teamA: p.L.first, teamB: p.L.second, winner: null },      // M11: 1L vs 2L — crossover
    { teamA: p.A.second, teamB: p.B.third, winner: null },      // M12: 2A vs — filler
    { teamA: p.C.first, teamB: p.D.third, winner: null },       // M13: 1C vs 3D
    { teamA: p.F.first, teamB: p.E.second, winner: null },      // M14: 1F vs 2E
    { teamA: p.I.second, teamB: p.J.first, winner: null },      // M15: 2I vs 1J
  ];
}

const ROUND_NAMES = [
  "16emes de finale",
  "Quarts de finale",
  "Demi-finales",
  "Finale",
] as const;

const ROUND_LABELS = [
  "16\u00e8mes",
  "Quarts",
  "Demis",
  "Finale",
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function getTeamLabel(id: string | null) {
  if (!id) return null;
  return teamsById[id] ?? null;
}

export default function SimulateurBracketPage() {
  // State: array per round. Round 0 = R32 (16 matches), Round 1 = QF (8), Round 2 = SF (4), Round 3 = F (1)
  const [rounds, setRounds] = useState<MatchSlot[][]>(() => {
    const r32 = buildInitialR32();
    const qf: MatchSlot[] = Array.from({ length: 8 }, () => ({ teamA: null, teamB: null, winner: null }));
    const sf: MatchSlot[] = Array.from({ length: 4 }, () => ({ teamA: null, teamB: null, winner: null }));
    const f: MatchSlot[] = [{ teamA: null, teamB: null, winner: null }];
    return [r32, qf, sf, f];
  });

  const champion = rounds[3]?.[0]?.winner ?? null;

  const selectWinner = useCallback((roundIdx: number, matchIdx: number, teamId: string) => {
    setRounds((prev) => {
      const next = prev.map((r) => r.map((m) => ({ ...m })));
      const match = next[roundIdx]![matchIdx]!;
      // If already selected same winner, do nothing
      if (match.winner === teamId) return prev;

      match.winner = teamId;

      // Propagate winner to next round
      if (roundIdx < 3) {
        const nextRound = next[roundIdx + 1]!;
        const nextMatchIdx = Math.floor(matchIdx / 2);
        const slot = matchIdx % 2 === 0 ? "teamA" : "teamB";
        const oldTeam = nextRound[nextMatchIdx]![slot];

        nextRound[nextMatchIdx]![slot] = teamId;

        // If the team that was in the next slot was a winner and it changed, cascade clear
        if (oldTeam && oldTeam !== teamId) {
          // Clear downstream from nextRound
          clearDownstream(next, roundIdx + 1, nextMatchIdx, oldTeam);
        }
      }

      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const r32 = buildInitialR32();
    const qf: MatchSlot[] = Array.from({ length: 8 }, () => ({ teamA: null, teamB: null, winner: null }));
    const sf: MatchSlot[] = Array.from({ length: 4 }, () => ({ teamA: null, teamB: null, winner: null }));
    const f: MatchSlot[] = [{ teamA: null, teamB: null, winner: null }];
    setRounds([r32, qf, sf, f]);
  }, []);

  const shareBracket = useCallback(() => {
    const lines: string[] = ["Mon Bracket CDM 2026 :"];
    for (let r = 0; r < rounds.length; r++) {
      lines.push(`\n${ROUND_NAMES[r]} :`);
      for (const m of rounds[r]!) {
        const a = getTeamLabel(m.teamA)?.name ?? "?";
        const b = getTeamLabel(m.teamB)?.name ?? "?";
        const w = getTeamLabel(m.winner)?.name ?? "?";
        lines.push(`  ${a} vs ${b} -> ${w}`);
      }
    }
    if (champion) {
      const cTeam = getTeamLabel(champion);
      lines.push(`\nChampion : ${cTeam?.name ?? "?"}`);
    }
    const text = lines.join("\n");
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    alert("Bracket copie dans le presse-papiers !");
  }, [rounds, champion]);

  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Simulateur", href: "/simulateur" },
          { label: "Bracket interactif" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Simulateur Bracket CDM 2026
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto text-secondary">
            Construisez votre bracket complet des phases finales. Cliquez sur chaque equipe
            pour la faire avancer, du 16eme de finale jusqu&apos;a la grande finale.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-0 z-30 bg-whiteslate-900 border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Trophy className="h-4 w-4" />
            {champion ? (
              <span className="font-semibold text-accent">
                Champion : {getTeamLabel(champion)?.name}
              </span>
            ) : (
              <span>Selectionnez les vainqueurs pour completer le bracket</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={shareBracket}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              Partager
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Bracket */}
      <div className="mx-auto max-w-[1600px] px-2 py-8">
        {/* Desktop: horizontal layout */}
        <div className="hidden lg:flex items-start gap-0 overflow-x-auto">
          {rounds.map((round, rIdx) => (
            <RoundColumn
              key={rIdx}
              roundIdx={rIdx}
              matches={round}
              label={ROUND_LABELS[rIdx]!}
              onSelect={selectWinner}
              totalRounds={rounds.length}
            />
          ))}
        </div>

        {/* Mobile: vertical layout */}
        <div className="lg:hidden space-y-8">
          {rounds.map((round, rIdx) => (
            <div key={rIdx}>
              <h2 className="text-lg font-bold mb-3 text-center">{ROUND_NAMES[rIdx]}</h2>
              <div className="space-y-3">
                {round.map((match, mIdx) => (
                  <MatchCard
                    key={mIdx}
                    match={match}
                    roundIdx={rIdx}
                    matchIdx={mIdx}
                    onSelect={selectWinner}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Champion banner */}
      {champion && (
        <div className="bg-accent/5 border-t-2 border-accent py-12 text-center">
          <p className="text-sm uppercase tracking-wider text-secondary mb-2">Votre champion</p>
          <div className="flex items-center justify-center gap-3">
            {getTeamLabel(champion) && (
              <Flag
                flag={getTeamLabel(champion)!.flag}
                name={getTeamLabel(champion)!.name}
                className="text-4xl"
              />
            )}
            <span className="text-3xl font-extrabold">{getTeamLabel(champion)?.name}</span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={shareBracket}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Partager mon bracket
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Recommencer
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clearDownstream(rounds: MatchSlot[][], fromRound: number, matchIdx: number, teamId: string) {
  const match = rounds[fromRound]?.[matchIdx];
  if (!match) return;

  if (match.winner === teamId) {
    match.winner = null;
    // Propagate
    if (fromRound < 3) {
      const nextMatchIdx = Math.floor(matchIdx / 2);
      const slot = matchIdx % 2 === 0 ? "teamA" : "teamB";
      const nextRound = rounds[fromRound + 1]!;
      if (nextRound[nextMatchIdx]![slot] === teamId) {
        nextRound[nextMatchIdx]![slot] = null;
        clearDownstream(rounds, fromRound + 1, nextMatchIdx, teamId);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Round column (desktop)
// ---------------------------------------------------------------------------

function RoundColumn({
  roundIdx,
  matches,
  label,
  onSelect,
  totalRounds,
}: {
  roundIdx: number;
  matches: MatchSlot[];
  label: string;
  onSelect: (r: number, m: number, t: string) => void;
  totalRounds: number;
}) {
  // Spacing grows with each round to visually center matches
  const gap = roundIdx === 0 ? "gap-2" : roundIdx === 1 ? "gap-6" : roundIdx === 2 ? "gap-16" : "gap-0";

  return (
    <div className="flex flex-col items-center min-w-[200px] flex-shrink-0">
      <div className="text-xs font-semibold uppercase tracking-wider text-secondary mb-4">
        {label}
      </div>
      <div className={`flex flex-col justify-center ${gap} flex-1`}>
        {matches.map((match, mIdx) => (
          <div key={mIdx} className="flex items-center">
            <MatchCard
              match={match}
              roundIdx={roundIdx}
              matchIdx={mIdx}
              onSelect={onSelect}
            />
            {roundIdx < totalRounds - 1 && (
              <div className="w-4 flex items-center justify-center text-gray-300">
                <ChevronRight className="h-3 w-3" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Match card
// ---------------------------------------------------------------------------

function MatchCard({
  match,
  roundIdx,
  matchIdx,
  onSelect,
}: {
  match: MatchSlot;
  roundIdx: number;
  matchIdx: number;
  onSelect: (r: number, m: number, t: string) => void;
}) {
  const teamA = getTeamLabel(match.teamA);
  const teamB = getTeamLabel(match.teamB);

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden w-[180px] bg-whiteslate-900 shadow-sm">
      <TeamRow
        team={teamA}
        teamId={match.teamA}
        isWinner={match.winner === match.teamA && match.teamA !== null}
        canSelect={match.teamA !== null && match.teamB !== null}
        onSelect={() => match.teamA && onSelect(roundIdx, matchIdx, match.teamA)}
      />
      <div className="border-t border-gray-100" />
      <TeamRow
        team={teamB}
        teamId={match.teamB}
        isWinner={match.winner === match.teamB && match.teamB !== null}
        canSelect={match.teamA !== null && match.teamB !== null}
        onSelect={() => match.teamB && onSelect(roundIdx, matchIdx, match.teamB)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Team row inside a match card
// ---------------------------------------------------------------------------

function TeamRow({
  team,
  teamId,
  isWinner,
  canSelect,
  onSelect,
}: {
  team: ReturnType<typeof getTeamLabel>;
  teamId: string | null;
  isWinner: boolean;
  canSelect: boolean;
  onSelect: () => void;
}) {
  if (!team) {
    return (
      <div className="px-3 py-2 text-xs text-gray-400 italic h-9 flex items-center">
        A determiner
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!canSelect}
      onClick={onSelect}
      className={`w-full px-3 py-2 flex items-center gap-2 text-sm transition-colors h-9 text-left ${
        isWinner
          ? "bg-accent text-white font-semibold"
          : canSelect
            ? "hover:bg-accent/10 cursor-pointer"
            : "opacity-60 cursor-default"
      }`}
    >
      <Flag flag={team.flag} name={team.name} className="text-base flex-shrink-0" />
      <span className="truncate">{team.name}</span>
    </button>
  );
}
