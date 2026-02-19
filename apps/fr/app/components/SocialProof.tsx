'use client';

import { useEffect, useRef, useState } from 'react';

interface Counter {
  value: number;
  label: string;
  emoji: string;
}

const COUNTERS: Counter[] = [
  { value: 47832, label: 'fans ont soumis leur bracket', emoji: '🏆' },
  { value: 12500, label: 'pronostics réalisés', emoji: '🎯' },
  { value: 202, label: 'questions au quiz', emoji: '🧩' },
];

function formatNumber(n: number): string {
  return n.toLocaleString('fr-FR');
}

function AnimatedCounter({ target, started }: { target: number; started: boolean }) {
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

  return <span>{formatNumber(current)}</span>;
}

export function SocialProof() {
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
      className="py-12 sm:py-16 bg-gradient-to-r from-primary/5 via-primary to-primary/5 dark:from-primary/10 dark:via-primary/10 dark:to-primary/10 border-y border-gray-200 dark:border-gray-700/40"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {COUNTERS.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2">
              <span className="text-3xl">{c.emoji}</span>
              <span className="text-3xl sm:text-4xl font-black text-primary tabular-nums">
                <AnimatedCounter target={c.value} started={visible} />
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
