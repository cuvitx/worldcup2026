"use client";

import { useEffect, useRef, useState } from "react";

// ── Couleurs disponibles ────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  accent: "bg-primary",
  gold: "bg-gold",
  green: "bg-field",
  blue: "bg-secondary",
  purple: "bg-secondary",
  orange: "bg-primary",
  teal: "bg-secondary",
};

// ── StatBar simple (barre horizontale animée au scroll) ────────────────────

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
          <span className="text-gray-600 dark:text-gray-400 font-medium truncate pr-2">{label}</span>
          {showValue && (
            <span className="font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
              {value}{suffix}
            </span>
          )}
        </div>
      )}
      {layout === "inline" && (
        <span className={`${textClass} text-gray-600 dark:text-gray-400 font-medium block mb-1`}>{label}</span>
      )}
      <div
        className={`w-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${heightClass}`}
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
        <span className={`${textClass} font-bold text-gray-900 dark:text-gray-100 mt-0.5 block`}>
          {value}{suffix}
        </span>
      )}
    </div>
  );
}

// ── DuelStatBar : comparatif gauche/droite ─────────────────────────────────

interface DuelStatBarProps {
  label: string;
  home: number;
  away: number;
  homeName?: string;
  awayName?: string;
  suffix?: string;
}

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
        <span className={`text-sm font-bold ${homeWins ? "text-primary" : "text-gray-700 dark:text-gray-300"}`}>
          {home}{suffix}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</span>
        <span className={`text-sm font-bold ${awayWins ? "text-primary" : "text-gray-700 dark:text-gray-300"}`}>
          {away}{suffix}
        </span>
      </div>
      <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5 bg-gray-100 dark:bg-gray-700">
        <div
          className={`h-full rounded-l-full transition-all ease-out duration-700 ${homeWins ? "bg-primary" : "bg-gray-400 dark:bg-gray-500"}`}
          style={{ width: visible ? `${homePct}%` : "0%" }}
        />
        <div
          className={`h-full rounded-r-full transition-all ease-out duration-700 ${awayWins ? "bg-secondary" : "bg-gray-300 dark:bg-gray-600"}`}
          style={{ width: visible ? `${awayPct}%` : "0%" }}
        />
      </div>
      {(homeName || awayName) && (
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[10px] text-gray-400 truncate max-w-[80px]">{homeName}</span>
          <span className="text-[10px] text-gray-400 truncate max-w-[80px] text-right">{awayName}</span>
        </div>
      )}
    </div>
  );
}
