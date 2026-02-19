"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ShareButtons } from "@repo/ui/share-buttons";
import type { MatchData, RoundName } from "./types";
import { ROUND_ORDER } from "./types";
import { buildR32Matches, buildEmptyMatches, loadState, saveState, clearState } from "./bracket-data";
import { ConfettiParticles } from "./ConfettiParticles";
import { ProgressBar } from "./ProgressBar";
import { DesktopBracket } from "./DesktopBracket";
import { MobileBracket } from "./MobileBracket";

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
    clearState();
  }, []);

  const champion = useMemo(() => {
    const final = rounds.F[0];
    if (!final?.winner) return null;
    return final.winner === final.team1?.id ? final.team1 : final.team2;
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
            className="relative z-10 flex flex-col items-center gap-3 py-8 px-6 text-center champion-glow rounded-2xl"
            style={{
              background: "linear-gradient(160deg, #0D3B66 0%, #0F1923 50%, #0D3B66 100%)",
              border: "2px solid rgba(245,166,35,0.6)",
            }}
          >
            <span className="text-3xl">🏆</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">
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
              text={`Mon pronostic CDM 2026 : ${champion.flag} ${champion.name} champion du monde ! 🏆 #CDM2026 #WorldCup2026`}
              label="Partager mon bracket"
            />
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 p-5 text-center">
          <p className="text-2xl mb-2">🏆</p>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Sélectionnez les vainqueurs pour simuler le tournoi
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
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
          className="shrink-0 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-300 transition-all"
        >
          🔄 Réinitialiser
        </button>
      </div>

      {/* Desktop bracket */}
      <div className="hidden lg:block pb-4">
        <DesktopBracket rounds={rounds} onPick={pickWinner} />
      </div>

      {/* Mobile bracket */}
      <div className="lg:hidden">
        <MobileBracket rounds={rounds} onPick={pickWinner} />
      </div>
    </div>
  );
}
