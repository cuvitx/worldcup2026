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

  const blocks = [
    { value: time.days, label: "Jours" },
    { value: time.hours, label: "Heures" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ];

  return (
    <section
      className="relative overflow-hidden py-8"
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #1a0a1a 100%)",
      }}
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-4xl px-4">
        {/* Match label */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
              Compte à rebours
            </p>
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
          </div>
          <p className="text-white font-bold text-lg">
            🇲🇽 Mexique <span className="text-accent mx-2">vs</span> 🇿🇦 Afrique du Sud
          </p>
          <p className="text-gray-400 text-xs mt-0.5">
            11 juin 2026 · 21h00 (Paris) · Estadio Azteca, Mexico
          </p>
        </div>

        {/* Countdown blocks */}
        <div className="flex justify-center gap-3 md:gap-6">
          {blocks.map((b, i) => (
            <div key={b.label} className="flex flex-col items-center">
              {/* Card */}
              <div
                className="relative flex items-center justify-center rounded-xl overflow-hidden"
                style={{
                  width: "clamp(60px, 16vw, 90px)",
                  height: "clamp(60px, 16vw, 90px)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Separator line (flip card aesthetic) */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-black/30 z-10" />

                {/* Value */}
                <span
                  className="relative z-20 font-extrabold tabular-nums text-white"
                  style={{ fontSize: "clamp(22px, 6vw, 40px)" }}
                  suppressHydrationWarning
                >
                  {mounted ? String(b.value).padStart(2, "0") : "--"}
                </span>

                {/* Corner accent */}
                {i === 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-gold" />
                )}
              </div>

              {/* Label */}
              <span className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {b.label}
              </span>

              {/* Colon separator */}
              {i < blocks.length - 1 && (
                <span
                  className="absolute text-accent font-bold text-2xl"
                  style={{ marginTop: "calc(clamp(60px, 16vw, 90px) / 2 - 10px)" }}
                >
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
