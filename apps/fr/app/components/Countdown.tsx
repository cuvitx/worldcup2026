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

  return (
    <section className="relative py-6 bg-[#0F1923]">
      <div className="mx-auto max-w-2xl px-4 text-center">
        {/* Match info — compact */}
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
          Match d&apos;ouverture · 11 juin 2026
        </p>
        <p className="text-white font-semibold text-base mb-4">
          🇲🇽 Mexique <span className="text-secondary mx-1.5">vs</span> 🇿🇦 Afrique du Sud
        </p>

        {/* Countdown — inline modern */}
        <div className="inline-flex items-baseline gap-1 text-white" suppressHydrationWarning>
          <span className="text-4xl sm:text-5xl font-bold tabular-nums">{val(time.days)}</span>
          <span className="text-sm text-gray-500 font-medium mr-2">j</span>

          <span className="text-4xl sm:text-5xl font-bold tabular-nums">{val(time.hours)}</span>
          <span className="text-sm text-gray-500 font-medium mr-2">h</span>

          <span className="text-4xl sm:text-5xl font-bold tabular-nums">{val(time.minutes)}</span>
          <span className="text-sm text-gray-500 font-medium mr-2">m</span>

          <span className="text-4xl sm:text-5xl font-bold tabular-nums text-secondary">{val(time.seconds)}</span>
          <span className="text-sm text-gray-500 font-medium">s</span>
        </div>

        <p className="text-gray-600 text-xs mt-3">
          Estadio Azteca, Mexico · 21h00 (Paris)
        </p>
      </div>
    </section>
  );
}
