"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T19:00:00Z").getTime();

/**
 * Calculate time remaining until World Cup 2026 opening match.
 */
function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, TARGET - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * Countdown component — Live countdown to World Cup 2026 opening match (Mexico vs South Africa).
 * 
 * Updates every second. Displays days, hours, minutes, and seconds remaining.
 * Handles SSR hydration with suppressHydrationWarning.
 * 
 * @example
 * ```tsx
 * <Countdown />
 * ```
 */
export function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const val = (n: number) => (mounted ? String(n).padStart(2, "0") : "--");

  return (
    <section className="py-5 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Left — match info */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇲🇽</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">Mexique</span>
            </div>
            <span className="text-xs font-black text-primary">VS</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-900 dark:text-white">Afrique du Sud</span>
              <span className="text-2xl">🇿🇦</span>
            </div>
          </div>

          {/* Right — countdown */}
          <div className="flex items-center gap-1" suppressHydrationWarning>
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">{val(time.days)}</span>
              <span className="text-[10px] text-gray-500 font-medium uppercase">jours</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600 font-light text-lg mb-3">:</span>
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">{val(time.hours)}</span>
              <span className="text-[10px] text-gray-500 font-medium uppercase">heures</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600 font-light text-lg mb-3">:</span>
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">{val(time.minutes)}</span>
              <span className="text-[10px] text-gray-500 font-medium uppercase">min</span>
            </div>
            <span className="text-gray-300 dark:text-gray-600 font-light text-lg mb-3">:</span>
            <div className="flex flex-col items-center min-w-[40px]">
              <span className="text-2xl font-bold tabular-nums text-secondary">{val(time.seconds)}</span>
              <span className="text-[10px] text-gray-500 font-medium uppercase">sec</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center sm:text-right text-[11px] text-gray-400 mt-1">
          Match d&apos;ouverture · 11 juin 2026 · Estadio Azteca, Mexico
        </p>
      </div>
    </section>
  );
}
