"use client";

import { useState, useEffect, useRef } from "react";
import type { MatchData, RoundName } from "./types";
import { ROUND_LABELS, ROUND_COLORS } from "./types";
import { BracketMatchCard } from "./BracketMatchCard";

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
      {innerHeight && <div style={{ height: 0 }} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Round column
// ---------------------------------------------------------------------------

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
      <div className={`text-[11px] font-bold uppercase tracking-wider mb-3 px-3 py-1.5 rounded-full text-white shadow-sm ${colorClass} ${round === "F" ? "text-gray-900" : ""}`}>
        {label}
      </div>
      <div className={`flex flex-col flex-1 gap-2.5 w-full ${isFinal ? "justify-center" : "justify-around"}`}>
        {matches.map((match, i) => (
          <div key={match.id} className="relative">
            <BracketMatchCard
              match={match}
              onSelect={(teamId) => onPick(round, baseIndex + i, teamId)}
              isFinal={isFinal}
            />
            {!isFinal && (
              <div
                className="absolute right-0 top-1/2 w-3 border-t border-gray-300 translate-x-full opacity-50"
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
// Desktop bracket
// ---------------------------------------------------------------------------

export function DesktopBracket({
  rounds,
  onPick,
}: {
  rounds: Record<RoundName, MatchData[]>;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
}) {
  return (
    <BracketScaler>
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
    </BracketScaler>
  );
}
