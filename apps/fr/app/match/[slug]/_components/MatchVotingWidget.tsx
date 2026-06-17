"use client";

import { useState, useEffect, useCallback } from "react";
import { BarChart3, Check } from "lucide-react";

interface VoteCounts {
  home: number;
  draw: number;
  away: number;
  total: number;
}

type VoteChoice = "home" | "draw" | "away";

interface MatchVotingWidgetProps {
  slug: string;
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
  isFinished?: boolean;
}

const STORAGE_KEY_PREFIX = "cdm2026-vote-";

export function MatchVotingWidget({
  slug,
  homeName,
  homeFlag,
  awayName,
  awayFlag,
  isFinished = false,
}: MatchVotingWidgetProps) {
  const [voted, setVoted] = useState<VoteChoice | null>(null);
  const [counts, setCounts] = useState<VoteCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  const storageKey = STORAGE_KEY_PREFIX + slug;

  // Load saved vote + fetch counts
  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as VoteChoice | null;
    if (saved && ["home", "draw", "away"].includes(saved)) {
      setVoted(saved);
    }

    fetch(`/api/votes/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: VoteCounts | null) => {
        if (data) setCounts(data);
        setLoading(false);
        // Trigger bar animation if results should show
        if (saved || isFinished) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setAnimate(true));
          });
        }
      })
      .catch(() => setLoading(false));
  }, [slug, storageKey]);

  const handleVote = useCallback(
    async (choice: VoteChoice) => {
      if (submitting || voted) return;
      setSubmitting(true);

      // Optimistic update
      setVoted(choice);
      setCounts((prev) => {
        const base = prev ?? { home: 0, draw: 0, away: 0, total: 0 };
        return {
          ...base,
          [choice]: base[choice] + 1,
          total: base.total + 1,
        };
      });
      localStorage.setItem(storageKey, choice);

      // Trigger bar animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });

      try {
        const res = await fetch(`/api/votes/${slug}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ vote: choice }),
        });
        const data = await res.json();

        if (res.ok || res.status === 409) {
          // Update with server-authoritative counts
          setCounts({
            home: data.home,
            draw: data.draw,
            away: data.away,
            total: data.total,
          });
          setJustVoted(res.ok);
          if (res.ok) {
            setTimeout(() => setJustVoted(false), 3000);
          }
        }
      } catch {
        // Keep optimistic state — localStorage ensures vote is remembered
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, voted, slug, storageKey],
  );

  // Hide widget for finished matches with no votes
  const total = counts?.total ?? 0;
  if (isFinished && !loading && total === 0) return null;

  // Compute percentages
  const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0);

  const options: Array<{
    key: VoteChoice;
    badge: string;
    label: string;
    flag: string;
    pct: number;
    count: number;
    color: string;
    colorLight: string;
    textColor: string;
    hoverBorder: string;
    hoverBg: string;
  }> = [
    {
      key: "home",
      badge: "1",
      label: homeName,
      flag: homeFlag,
      pct: pct(counts?.home ?? 0),
      count: counts?.home ?? 0,
      color: "bg-primary",
      colorLight: "bg-primary/15",
      textColor: "text-primary",
      hoverBorder: "hover:border-primary",
      hoverBg: "hover:bg-primary/5",
    },
    {
      key: "draw",
      badge: "N",
      label: "Match nul",
      flag: "🤝",
      pct: pct(counts?.draw ?? 0),
      count: counts?.draw ?? 0,
      color: "bg-gray-400",
      colorLight: "bg-gray-400/15",
      textColor: "text-gray-500",
      hoverBorder: "hover:border-gray-400",
      hoverBg: "hover:bg-gray-50",
    },
    {
      key: "away",
      badge: "2",
      label: awayName,
      flag: awayFlag,
      pct: pct(counts?.away ?? 0),
      count: counts?.away ?? 0,
      color: "bg-accent",
      colorLight: "bg-accent/15",
      textColor: "text-accent",
      hoverBorder: "hover:border-accent",
      hoverBg: "hover:bg-accent/5",
    },
  ];

  // Ensure percentages sum to 100 when total > 0
  if (total > 0) {
    const sum = options.reduce((s, o) => s + o.pct, 0);
    if (sum !== 100) {
      // Add/subtract diff from the largest
      const largest = options.reduce((a, b) => (a.pct >= b.pct ? a : b));
      largest.pct += 100 - sum;
    }
  }

  const showResults = isFinished || voted !== null;

  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-gray-400" />
          <h2 className="font-bold text-lg text-gray-900">
            {isFinished
              ? "Les pronostics de la communauté"
              : showResults
                ? "L'avis de la communauté"
                : "Qui va gagner ?"}
          </h2>
        </div>
        {showResults && total > 0 && (
          <span className="text-xs text-gray-400 font-medium tabular-nums">
            {total.toLocaleString("fr-FR")} vote{total > 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="p-5">
        {loading ? (
          /* Skeleton */
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-24 rounded-xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : !showResults ? (
          /* Vote buttons */
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Votez pour le résultat">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleVote(opt.key)}
                disabled={submitting}
                role="radio"
                aria-checked="false"
                aria-label={`Voter ${opt.key === "draw" ? "match nul" : `victoire ${opt.label}`}`}
                className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 px-3 py-5 font-semibold transition-all ${opt.hoverBorder} ${opt.hoverBg} hover:scale-[1.03] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer`}
              >
                <span className="text-2xl">{opt.flag}</span>
                <span className="text-2xl font-black text-gray-400 group-hover:text-gray-600 transition-colors">
                  {opt.badge}
                </span>
                <span className="text-center text-xs leading-tight text-gray-600 sm:text-sm font-medium">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        ) : (
          /* Results */
          <div className="space-y-4">
            {options.map((opt) => {
              const isUserChoice = voted === opt.key;
              return (
                <div key={opt.key}>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-sm font-medium min-w-0 truncate flex items-center gap-1.5 ${
                        isUserChoice ? `${opt.textColor} font-bold` : "text-gray-700"
                      }`}
                    >
                      {isUserChoice && (
                        <Check className="h-4 w-4 shrink-0" />
                      )}
                      <span className="text-base mr-1">{opt.flag}</span>
                      {opt.label}
                    </span>
                    <span
                      className={`text-sm font-bold tabular-nums shrink-0 ${
                        isUserChoice ? opt.textColor : "text-gray-500"
                      }`}
                    >
                      {opt.pct}%
                    </span>
                  </div>
                  <div
                    className={`h-3 w-full overflow-hidden rounded-full ${opt.colorLight}`}
                  >
                    <div
                      className={`h-full rounded-full ${opt.color} transition-all duration-700 ease-out`}
                      style={{ width: animate ? `${opt.pct}%` : "0%" }}
                      role="progressbar"
                      aria-valuenow={opt.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              );
            })}

            {/* Thank you message */}
            {justVoted && (
              <p className="text-center text-sm text-emerald-600 font-medium animate-pulse">
                Merci pour votre vote !
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
