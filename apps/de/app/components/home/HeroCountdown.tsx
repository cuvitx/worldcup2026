"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T21:00:00+02:00").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

const units = [
  { key: "days", label: "Tage" },
  { key: "hours", label: "Stunden" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sek" },
] as const;

export function HeroCountdown() {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-5 sm:px-8">
      {/* Match info */}
      <div className="flex items-center gap-3 text-sm">
        <span className="text-xl">🇲🇽</span>
        <span className="font-bold text-white">Mexiko</span>
        <span className="font-black text-secondary text-xs">VS</span>
        <span className="font-bold text-white">Südafrika</span>
        <span className="text-xl">🇿🇦</span>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-1 sm:gap-2" suppressHydrationWarning>
        {units.map(({ key, label }, i) => (
          <div key={key} className="flex items-center gap-1 sm:gap-2">
            <div className="flex flex-col items-center">
              <span className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${key === "seconds" ? "text-secondary" : "text-white"}`}>
                {mounted ? String(time[key]).padStart(2, "0") : "--"}
              </span>
              <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wide">{label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="text-white/20 font-light text-lg mb-3">:</span>
            )}
          </div>
        ))}
      </div>

      {/* Sub info */}
      <p className="text-[11px] text-gray-300">
        Eröffnungsspiel · 11. Juni 2026 · Estadio Azteca, Mexiko-Stadt
      </p>
    </div>
  );
}
