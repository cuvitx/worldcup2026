"use client";

import { useEffect, useRef, useState } from "react";

// ── Couleurs disponibles ────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  accent: "bg-primary",
  gold: "bg-accent",
  green: "bg-field",
  blue: "bg-accent",
  purple: "bg-accent",
  orange: "bg-primary",
  teal: "bg-accent",
};

// ── StatBar simple (barre horizontale animée au scroll) ────────────────────

/**
 * Props for the StatBar component.
 * 
 * @param label - Stat label (e.g., "Possession")
 * @param value - Stat value
 * @param maxValue - Maximum value for percentage calculation (default: 100)
 * @param color - Bar color theme
 * @param showValue - Display numeric value (default: true)
 * @param suffix - Optional suffix for value (e.g., "%", " km")
 * @param size - Bar height: "sm" | "md" | "lg" (default: "md")
 * @param layout - "default" (label + value above bar) or "inline" (stacked)
 * @param animDelay - Animation delay in ms for cascading lists
 */
interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: "accent" | "gold" | "green" | "blue" | "purple" | "orange" | "teal" | "secondary" | "field";
  showValue?: boolean;
  suffix?: string;
  size?: "sm" | "md" | "lg";
  /** Affiche le label à gauche et la valeur à droite (défaut) */
  layout?: "default" | "inline";
  /** Délai d'animation (ms) pour les listes en cascade */
  animDelay?: number;
}

/**
 * StatBar component — Animated horizontal progress bar with IntersectionObserver trigger.
 * 
 * @example
 * ```tsx
 * <StatBar
 *   label="Possession"
 *   value={65}
 *   maxValue={100}
 *   color="accent"
 *   suffix="%"
 *   size="md"
 * />
 * ```
 */
export function StatBar({
  label,
  value,
  maxValue = 100,
  color = "accent",
  showValue = true,
  suffix = "",
  size = "md",
  layout = "default",
  animDelay = 0,
}: StatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const pct = Math.min(100, Math.round((value / maxValue) * 100));
  const barColor = colorMap[color] ?? "bg-primary";
  const heightClass = size === "sm" ? "h-1.5" : size === "lg" ? "h-4" : "h-2.5";
  const textClass = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm";

  return (
    <div ref={ref} className="w-full">
      {layout === "default" && (
        <div className={`flex items-center justify-between mb-1.5 ${textClass}`}>
          <span className="text-gray-600 font-medium truncate pr-2">{label}</span>
          {showValue && (
            <span className="font-bold text-gray-900 whitespace-nowrap">
              {value}{suffix}
            </span>
          )}
        </div>
      )}
      {layout === "inline" && (
        <span className={`${textClass} text-gray-600 font-medium block mb-1`}>{label}</span>
      )}
      <div
        className={`w-full rounded-full overflow-hidden bg-gray-200 ${heightClass}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={maxValue}
        aria-label={label}
      >
        <div
          className={`h-full rounded-full ${barColor} transition-all ease-out`}
          style={{
            width: visible ? `${pct}%` : "0%",
            transitionDuration: "900ms",
            transitionDelay: `${animDelay}ms`,
          }}
        />
      </div>
      {layout === "inline" && showValue && (
        <span className={`${textClass} font-bold text-gray-900 mt-0.5 block`}>
          {value}{suffix}
        </span>
      )}
    </div>
  );
}

// ── DuelStatBar : comparatif gauche/droite ─────────────────────────────────

/**
 * Props for the DuelStatBar component.
 * 
 * @param label - Stat label (e.g., "Shots on target")
 * @param home - Home team value
 * @param away - Away team value
 * @param homeName - Optional home team name
 * @param awayName - Optional away team name
 * @param suffix - Optional suffix (e.g., "%")
 */
interface DuelStatBarProps {
  label: string;
  home: number;
  away: number;
  homeName?: string;
  awayName?: string;
  suffix?: string;
}

/**
 * DuelStatBar component — Bi-directional stat bar for head-to-head comparisons.
 * 
 * @example
 * ```tsx
 * <DuelStatBar
 *   label="Tirs cadrés"
 *   home={12}
 *   away={8}
 *   homeName="France"
 *   awayName="Brésil"
 * />
 * ```
 */
export function DuelStatBar({
  label,
  home,
  away,
  homeName,
  awayName,
  suffix = "",
}: DuelStatBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const total = home + away || 1;
  const homePct = Math.round((home / total) * 100);
  const awayPct = 100 - homePct;
  const homeWins = home > away;
  const awayWins = away > home;

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-sm font-bold ${homeWins ? "text-primary" : "text-gray-700"}`}>
          {home}{suffix}
        </span>
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <span className={`text-sm font-bold ${awayWins ? "text-primary" : "text-gray-700"}`}>
          {away}{suffix}
        </span>
      </div>
      <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5 bg-gray-100">
        <div
          className={`h-full rounded-l-full transition-all ease-out duration-700 ${homeWins ? "bg-primary" : "bg-gray-400"}`}
          style={{ width: visible ? `${homePct}%` : "0%" }}
        />
        <div
          className={`h-full rounded-r-full transition-all ease-out duration-700 ${awayWins ? "bg-accent" : "bg-gray-300"}`}
          style={{ width: visible ? `${awayPct}%` : "0%" }}
        />
      </div>
      {(homeName || awayName) && (
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[10px] text-gray-500 truncate max-w-[80px]">{homeName}</span>
          <span className="text-[10px] text-gray-500 truncate max-w-[80px] text-right">{awayName}</span>
        </div>
      )}
    </div>
  );
}
