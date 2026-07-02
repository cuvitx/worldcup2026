"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ShareButtons } from "@repo/ui/share-buttons";
import { affiliateLinkAttributes, pmuTrackingUrl } from "@repo/data/affiliates";
import { top10Favorites } from "@repo/data/predictions-2026";
import type { MatchData, RoundName } from "./types";
import { ROUND_ORDER } from "./types";
import { buildR32Matches, buildEmptyMatches, loadState, saveState, clearState } from "./bracket-data";
import { ConfettiParticles } from "./ConfettiParticles";
import { ProgressBar } from "./ProgressBar";
import { DesktopBracket } from "./DesktopBracket";
import { MobileBracket } from "./MobileBracket";
import { RefreshCw, Trophy } from "lucide-react";

type NextSlot = {
  nextMatchIdx: number;
  slot: "team1" | "team2";
};

const R32_ADVANCEMENT: NextSlot[] = [
  { nextMatchIdx: 0, slot: "team1" },
  { nextMatchIdx: 2, slot: "team1" },
  { nextMatchIdx: 1, slot: "team1" },
  { nextMatchIdx: 0, slot: "team2" },
  { nextMatchIdx: 2, slot: "team2" },
  { nextMatchIdx: 1, slot: "team2" },
  { nextMatchIdx: 3, slot: "team1" },
  { nextMatchIdx: 3, slot: "team2" },
  { nextMatchIdx: 5, slot: "team2" },
  { nextMatchIdx: 5, slot: "team1" },
  { nextMatchIdx: 4, slot: "team2" },
  { nextMatchIdx: 4, slot: "team1" },
  { nextMatchIdx: 7, slot: "team1" },
  { nextMatchIdx: 6, slot: "team2" },
  { nextMatchIdx: 6, slot: "team1" },
  { nextMatchIdx: 7, slot: "team2" },
];

function getNextSlot(round: RoundName, matchIndex: number): NextSlot | null {
  if (round === "R32") return R32_ADVANCEMENT[matchIndex] ?? null;

  return {
    nextMatchIdx: Math.floor(matchIndex / 2),
    slot: matchIndex % 2 === 0 ? "team1" : "team2",
  };
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
        const nextSlot = getNextSlot(round, matchIndex);
        if (!nextSlot) return next;
        const { nextMatchIdx, slot } = nextSlot;
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
    const nextSlot = getNextSlot(round, matchIndex);
    if (!nextSlot) return;
    const { nextMatchIdx, slot } = nextSlot;
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
    clearState();
  }, []);

  const champion = useMemo(() => {
    const final = rounds.F[0];
    if (!final?.winner) return null;
    return final.winner === final.team1?.id ? final.team1 : final.team2;
  }, [rounds]);

  const championOdds = useMemo(() => {
    if (!champion) return null;
    return top10Favorites.find((fav) => fav.teamId === champion.id)?.pmuSport ?? null;
  }, [champion]);

  const championTracking = useMemo(
    () =>
      champion
        ? { pageType: "simulateur", slug: champion.id, placement: "champion-cta" }
        : null,
    [champion]
  );

  const progressSummary = useMemo(() => {
    const completed = ROUND_ORDER.flatMap((round) => rounds[round]).filter((match) => match.winner).length;
    return { completed, total: 31 };
  }, [rounds]);

  if (!loaded) {
    return (
      <div className="text-center py-20">
        <div className="inline-block w-8 h-8 border-2 border-primary/20 border-t-transparent rounded-full animate-spin" />
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
            className="relative z-10 flex flex-col items-center gap-3 py-8 px-6 text-center rounded-2xl"
            style={{
              background: "linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)",
              border: "2px solid rgba(245,166,35,0.6)",
            }}
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-gray-950 shadow-lg">
              <Trophy className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                Votre champion CDM 2026
              </p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl sm:text-5xl">{champion.flag}</span>
                <p className="text-3xl font-extrabold text-white">{champion.name}</p>
              </div>
              {champion.fifaRanking > 0 && (
                <p className="text-sm text-gray-500 mt-1">#{champion.fifaRanking} FIFA</p>
              )}
            </div>
            <ShareButtons
              url="https://www.cdm2026.fr/simulateur"
              text={`Mon pronostic CDM 2026 : ${champion.flag} ${champion.name} champion du monde ! #CDM2026 #WorldCup2026`}
              label="Partager mon bracket"
            />
            {/* CTA PMU post-simulation : l'utilisateur vient de designer son champion */}
            {championTracking && (
              <div className="mt-1 flex flex-col items-center gap-1.5">
                <a
                  href={pmuTrackingUrl(championTracking)}
                  target="_blank"
                  rel="noopener noreferrer sponsored nofollow"
                  {...affiliateLinkAttributes(championTracking)}
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-black text-[#0c3b2e] shadow-lg transition hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
                  }}
                >
                  Parier sur {champion.name} champion
                  {championOdds ? ` — cote ${championOdds.toFixed(2)}` : ""} →
                </a>
                <p className="text-[10px] text-white/60">
                  1er pari remboursé en cash · PMU Play · 18+ · Jouez responsablement
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(2,21,45,0.06)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                Simulateur phase finale
              </p>
              <p className="mt-1 text-lg font-extrabold text-slate-950">
                Sélectionnez les vainqueurs pour construire votre finale
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Le parcours suit les affiches officielles des 16es vers la finale.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">
              <span className="text-primary">{progressSummary.completed}</span>
              <span className="text-white/50">/</span>
              <span>{progressSummary.total}</span>
              <span className="text-xs font-bold uppercase text-white/60">choix</span>
            </div>
          </div>
        </div>
      )}

      {/* Progress + Reset */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex-1">
          <ProgressBar rounds={rounds} />
        </div>
        <button
          onClick={reset}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-100"
        >
          <RefreshCw className="h-4 w-4" /> Réinitialiser
        </button>
      </div>

      {/* Desktop bracket */}
      <div className="hidden overflow-hidden rounded-[22px] bg-slate-50/70 p-3 lg:block">
        <DesktopBracket rounds={rounds} onPick={pickWinner} />
      </div>

      {/* Mobile bracket */}
      <div className="lg:hidden">
        <MobileBracket rounds={rounds} onPick={pickWinner} />
      </div>
    </div>
  );
}
