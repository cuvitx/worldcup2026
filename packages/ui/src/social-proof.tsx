'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A single social proof counter.
 * 
 * @param value - Target number
 * @param label - Counter label
 * @param emoji - Display emoji
 */
interface Counter {
  value: number;
  label: string;
  emoji: string;
}

const COUNTERS_FR: Counter[] = [
  { value: 48, label: 'équipes qualifiées', emoji: '' },
  { value: 104, label: 'matchs à pronostiquer', emoji: '' },
  { value: 202, label: 'questions au quiz', emoji: '🧩' },
];

const COUNTERS_DE: Counter[] = [
  { value: 48, label: 'qualifizierte Teams', emoji: '' },
  { value: 104, label: 'Spiele zum Tippen', emoji: '' },
  { value: 202, label: 'Quizfragen', emoji: '🧩' },
];

function formatNumber(n: number, lang: "fr" | "de" = "fr"): string {
  return n.toLocaleString(lang === "de" ? "de-DE" : "fr-FR");
}

function AnimatedCounter({ target, started, lang = "fr" }: { target: number; started: boolean; lang?: "fr" | "de" }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        // ease-out
        const progress = step / steps;
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(target * eased));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  return <span>{formatNumber(current, lang)}</span>;
}

/**
 * SocialProof component — Animated stats counters (teams, matches, quiz questions).
 * 
 * Triggers animation on scroll into view with ease-out timing.
 * 
 * @example
 * ```tsx
 * <SocialProof />
 * ```
 */
export function SocialProof({ lang = "fr" }: { lang?: "fr" | "de" } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-12 sm:py-16 hero-animated border-y border-white/10"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {(lang === "de" ? COUNTERS_DE : COUNTERS_FR).map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{c.emoji}</span>
              <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
                <AnimatedCounter target={c.value} started={visible} lang={lang} />
              </span>
              <span className="text-sm text-gray-300 font-medium">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
