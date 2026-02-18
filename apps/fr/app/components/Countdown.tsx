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

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: time.days, label: "Jours" },
    { value: time.hours, label: "Heures" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Secondes" },
  ];

  return (
    <section className="bg-gradient-to-r from-primary via-primary/90 to-accent py-10">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">
          🇲🇽 Mexique vs Afrique du Sud 🇿🇦 — Match d&apos;ouverture
        </p>
        <p className="mb-6 text-gray-300 text-sm">
          11 juin 2026 · 21h00 (heure de Paris) · Estadio Azteca, Mexico
        </p>
        <div className="flex justify-center gap-4 md:gap-8">
          {blocks.map((b) => (
            <div key={b.label} className="flex flex-col items-center">
              <span className="text-4xl font-extrabold tabular-nums text-white md:text-6xl">
                {String(b.value).padStart(2, "0")}
              </span>
              <span className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-300 md:text-sm">
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
