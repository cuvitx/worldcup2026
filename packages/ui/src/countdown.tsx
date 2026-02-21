"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T19:00:00Z").getTime();

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

export function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const val = (n: number) => (mounted ? String(n).padStart(2, "0") : "--");

  const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
    { key: "days", label: "jours" },
    { key: "hours", label: "heures" },
    { key: "minutes", label: "min" },
    { key: "seconds", label: "sec" },
  ];

  return (
    <section className="bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Countdown cards */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6" suppressHydrationWarning>
          {units.map((u, i) => (
            <div key={u.key} className="flex items-center gap-3 sm:gap-4">
              <div className="flex flex-col items-center rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm px-3 py-2.5 sm:px-5 sm:py-3 min-w-[56px] sm:min-w-[72px]">
                <span className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${u.key === "seconds" ? "text-secondary" : "text-gray-900"}`}>
                  {val(time[u.key])}
                </span>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {u.label}
                </span>
              </div>
              {i < units.length - 1 && (
                <span className="text-gray-300 font-light text-xl sm:text-2xl">:</span>
              )}
            </div>
          ))}
        </div>

        {/* Opening match — bigger flags */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Match d&apos;ouverture · 11 juin 2026</span>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl sm:text-5xl">🇲🇽</span>
              <span className="text-sm font-bold text-gray-900">Mexique</span>
            </div>
            <span className="text-xs font-black text-primary bg-primary/10 rounded-full px-3 py-1">VS</span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl sm:text-5xl">🇿🇦</span>
              <span className="text-sm font-bold text-gray-900">Afrique du Sud</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">Estadio Azteca, Mexico</span>
        </div>
      </div>
    </section>
  );
}
