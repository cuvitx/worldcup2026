"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-06-11T21:00:00+02:00").getTime();

const labels = {
  fr: {
    days: "jours",
    hours: "heures",
    minutes: "min",
    seconds: "sec",
    opening: "Match d\u2019ouverture \u00b7 11 juin 2026",
    teamMX: "Mexique",
    teamZA: "Afrique du Sud",
    venue: "Estadio Azteca, Mexico",
  },
  de: {
    days: "Tage",
    hours: "Stunden",
    minutes: "Min.",
    seconds: "Sek.",
    opening: "Er\u00f6ffnungsspiel \u00b7 11. Juni 2026",
    teamMX: "Mexiko",
    teamZA: "S\u00fcdafrika",
    venue: "Estadio Azteca, Mexiko-Stadt",
  },
} as const;

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

export function Countdown({ lang = "fr" }: { lang?: "fr" | "de" } = {}) {
  const [time, setTime] = useState(getTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const val = (n: number) => (mounted ? String(n).padStart(2, "0") : "--");

  const t = labels[lang];

  const units: { key: keyof ReturnType<typeof getTimeLeft>; label: string }[] = [
    { key: "days", label: t.days },
    { key: "hours", label: t.hours },
    { key: "minutes", label: t.minutes },
    { key: "seconds", label: t.seconds },
  ];

  return (
    <section className="bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Countdown cards */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6" suppressHydrationWarning>
          {units.map((u, i) => (
            <div key={u.key} className="flex items-center gap-3 sm:gap-4">
              <div className="flex flex-col items-center rounded-xl bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm px-3 py-2.5 sm:px-5 sm:py-3 min-w-[56px] sm:min-w-[72px]">
                <span className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${u.key === "seconds" ? "text-accent" : "text-gray-900"}`}>
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
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">{t.opening}</span>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl sm:text-5xl">🇲🇽</span>
              <span className="text-sm font-bold text-gray-900">{t.teamMX}</span>
            </div>
            <span className="text-xs font-black text-primary bg-primary/10 rounded-full px-3 py-1">VS</span>
            <div className="flex flex-col items-center gap-1">
              <span className="text-4xl sm:text-5xl">🇿🇦</span>
              <span className="text-sm font-bold text-gray-900">{t.teamZA}</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{t.venue}</span>
        </div>
      </div>
    </section>
  );
}
