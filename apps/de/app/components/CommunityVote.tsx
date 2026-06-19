"use client";

import { useState, useEffect, useCallback } from "react";

interface CommunityVoteProps {
  slug: string;
  homeName: string;
  awayName: string;
  homeRanking: number;
  awayRanking: number;
}

type VoteChoice = "home" | "draw" | "away";

interface VoteCounts {
  home: number;
  draw: number;
  away: number;
  total: number;
}

const STORAGE_KEY_PREFIX = "cdm2026-vote-";

/** Fallback mock results when API is unavailable */
function generateMockResults(homeRanking: number, awayRanking: number) {
  const hr = homeRanking || 50;
  const ar = awayRanking || 50;
  const homeStrength = 1 / (hr + 5);
  const awayStrength = 1 / (ar + 5);
  const total = homeStrength + awayStrength;
  const homeBase = (homeStrength / total) * 100;
  const drawPct = Math.round(15 + Math.min(10, 10 * (1 - Math.abs(homeBase - (100 - homeBase)) / 50)));
  const remaining = 100 - drawPct;
  const homePct = Math.round((homeBase / 100) * remaining);
  const awayPct = 100 - drawPct - homePct;
  return {
    home: homePct,
    draw: drawPct,
    away: awayPct,
    totalVotes: 847 + Math.abs((homeRanking * 13 + awayRanking * 7) % 412),
  };
}

export default function CommunityVote({
  slug,
  homeName,
  awayName,
  homeRanking,
  awayRanking,
}: CommunityVoteProps) {
  const [voted, setVoted] = useState<VoteChoice | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [counts, setCounts] = useState<VoteCounts | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const storageKey = STORAGE_KEY_PREFIX + slug;

  // Fallback data
  const mock = generateMockResults(homeRanking, awayRanking);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as VoteChoice | null;
    if (saved && ["home", "draw", "away"].includes(saved)) {
      setVoted(saved);
      setShowResults(true);
    }

    fetch(`/api/votes/${slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: VoteCounts | null) => {
        if (data) setCounts(data);
        if (saved) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setAnimate(true));
          });
        }
      })
      .catch(() => {
        // API unavailable — mock will be used
      });
  }, [slug, storageKey]);

  const handleVote = useCallback(
    async (choice: VoteChoice) => {
      if (submitting || voted) return;
      setSubmitting(true);
      setVoted(choice);
      setShowResults(true);
      localStorage.setItem(storageKey, choice);

      // Optimistic count update
      setCounts((prev) => {
        const base = prev ?? { home: 0, draw: 0, away: 0, total: 0 };
        return { ...base, [choice]: base[choice] + 1, total: base.total + 1 };
      });

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
          setCounts({ home: data.home, draw: data.draw, away: data.away, total: data.total });
        }
      } catch {
        // Keep optimistic state
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, voted, slug, storageKey],
  );

  // Use API counts if available, otherwise mock
  const total = counts?.total ?? mock.totalVotes;
  const pctHome = counts ? (total > 0 ? Math.round((counts.home / total) * 100) : 0) : mock.home;
  const pctDraw = counts ? (total > 0 ? Math.round((counts.draw / total) * 100) : 0) : mock.draw;
  const pctAway = counts ? (total > 0 ? Math.round((counts.away / total) * 100) : 0) : mock.away;

  const options = [
    { key: "1" as const, choice: "home" as VoteChoice, label: homeName, pct: pctHome, color: "bg-primary", colorLight: "bg-primary/20", text: "text-primary" },
    { key: "N" as const, choice: "draw" as VoteChoice, label: "Match nul", pct: pctDraw, color: "bg-gray-400", colorLight: "bg-gray-400/20", text: "text-gray-400" },
    { key: "2" as const, choice: "away" as VoteChoice, label: awayName, pct: pctAway, color: "bg-accent", colorLight: "bg-accent/20", text: "text-accent" },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        L&apos;avis de la communauté
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        {showResults
          ? `${total.toLocaleString("de-DE")} votes`
          : "Quel est votre pronostic pour ce match ?"}
      </p>

      {!showResults ? (
        <div className="grid grid-cols-3 gap-3">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleVote(opt.choice)}
              disabled={submitting}
              className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 px-3 py-4 font-semibold transition-all hover:scale-[1.03] hover:shadow-md ${
                opt.key === "1"
                  ? "hover:border-primary hover:bg-primary/10"
                  : opt.key === "N"
                    ? "hover:border-gray-400 hover:bg-gray-50"
                    : "hover:border-accent hover:bg-accent/5"
              } disabled:opacity-50 disabled:pointer-events-none cursor-pointer`}
            >
              <span className="text-2xl font-black text-gray-500 group-hover:text-gray-500">
                {opt.key}
              </span>
              <span className="text-center text-xs leading-tight text-gray-700 sm:text-sm">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {options.map((opt) => (
            <div key={opt.key} className="relative">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className={`text-sm font-medium min-w-0 truncate ${voted === opt.choice ? opt.text + " font-bold" : "text-gray-700"}`}>
                  {voted === opt.choice && <><svg className="w-4 h-4 inline-block text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>{" "}</>}{opt.label}
                </span>
                <span className={`text-sm font-bold tabular-nums shrink-0 ${voted === opt.choice ? opt.text : "text-gray-600"}`}>
                  {opt.pct}%
                </span>
              </div>
              <div className={`h-3 w-full overflow-hidden rounded-full ${opt.colorLight}`}>
                <div
                  className={`h-full rounded-full ${opt.color} transition-all duration-700 ease-out`}
                  style={{ width: animate ? `${opt.pct}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
