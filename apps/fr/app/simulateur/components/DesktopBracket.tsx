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
  items,
  round,
  onPick,
  isFinal,
  connectorSide = "right",
}: {
  label: string;
  items: Array<{ match: MatchData; index: number }>;
  round: RoundName;
  onPick: (round: RoundName, matchIndex: number, teamId: string) => void;
  isFinal?: boolean;
  connectorSide?: "left" | "right" | "none";
}) {
  const colorClass = ROUND_COLORS[round];

  return (
    <div className="flex w-[168px] min-w-[168px] flex-col items-center xl:w-[184px] xl:min-w-[184px] 2xl:w-[200px] 2xl:min-w-[200px]">
      <div className={`mb-4 rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white shadow-sm ring-1 ring-black/5 ${colorClass} ${round === "F" ? "text-gray-900" : ""}`}>
        {label}
      </div>
      <div className={`flex w-full flex-1 flex-col gap-4 ${isFinal ? "justify-center" : "justify-around"}`}>
        {items.map(({ match, index }) => (
          <div key={match.id} className="relative">
            <BracketMatchCard
              match={match}
              onSelect={(teamId) => onPick(round, index, teamId)}
              isFinal={isFinal}
            />
            {connectorSide !== "none" && (
              <div
                className={`absolute top-1/2 w-5 border-t-2 ${
                  match.winner ? "border-accent/60" : "border-slate-300/70"
                } ${
                  connectorSide === "right"
                    ? "right-0 translate-x-full"
                    : "left-0 -translate-x-full"
                }`}
                style={{ marginTop: "-0.5px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function pickItems(matches: MatchData[], indexes: number[]) {
  return indexes
    .map((index) => ({ match: matches[index], index }))
    .filter((item): item is { match: MatchData; index: number } => Boolean(item.match));
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
  const leftFirstRound = [0, 3, 2, 5, 1, 4, 6, 7];
  const rightFirstRound = [11, 10, 9, 8, 14, 13, 12, 15];

  return (
    <BracketScaler>
      <div className="inline-flex min-h-[720px] items-stretch justify-center gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-6 py-5 shadow-[0_18px_50px_rgba(2,21,45,0.08)]">
        <RoundColumn label={ROUND_LABELS.R32} items={pickItems(rounds.R32, leftFirstRound)} round="R32" onPick={onPick} />
        <RoundColumn label={ROUND_LABELS.R16} items={pickItems(rounds.R16, [0, 1, 2, 3])} round="R16" onPick={onPick} />
        <RoundColumn label={ROUND_LABELS.QF} items={pickItems(rounds.QF, [0, 1])} round="QF" onPick={onPick} />
        <RoundColumn label={ROUND_LABELS.SF} items={pickItems(rounds.SF, [0])} round="SF" onPick={onPick} />
        <RoundColumn label={ROUND_LABELS.F} items={pickItems(rounds.F, [0])} round="F" onPick={onPick} isFinal connectorSide="none" />
        <RoundColumn label={ROUND_LABELS.SF} items={pickItems(rounds.SF, [1])} round="SF" onPick={onPick} connectorSide="left" />
        <RoundColumn label={ROUND_LABELS.QF} items={pickItems(rounds.QF, [2, 3])} round="QF" onPick={onPick} connectorSide="left" />
        <RoundColumn label={ROUND_LABELS.R16} items={pickItems(rounds.R16, [4, 5, 6, 7])} round="R16" onPick={onPick} connectorSide="left" />
        <RoundColumn label={ROUND_LABELS.R32} items={pickItems(rounds.R32, rightFirstRound)} round="R32" onPick={onPick} connectorSide="left" />
      </div>
    </BracketScaler>
  );
}
