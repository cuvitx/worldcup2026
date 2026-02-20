"use client";

import { useState, useEffect } from "react";

interface CommunityVoteProps {
  slug: string;
  homeName: string;
  awayName: string;
  homeRanking: number;
  awayRanking: number;
}

function generateMockResults(homeRanking: number, awayRanking: number) {
  // Lower ranking = better team. Generate realistic % based on FIFA rankings.
  const hr = homeRanking || 50;
  const ar = awayRanking || 50;
  
  // Strength ratio: better ranked team gets more votes
  const homeStrength = 1 / (hr + 5);
  const awayStrength = 1 / (ar + 5);
  const total = homeStrength + awayStrength;
  
  const homeBase = (homeStrength / total) * 100;
  const awayBase = (awayStrength / total) * 100;
  
  // Draw typically 15-25%
  const drawPct = Math.round(15 + Math.min(10, 10 * (1 - Math.abs(homeBase - awayBase) / 50)));
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
  const [voted, setVoted] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [animate, setAnimate] = useState(false);

  const storageKey = `community-vote-${slug}`;
  const results = generateMockResults(homeRanking, awayRanking);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setVoted(saved);
      setShowResults(true);
      // Delay animation for already-voted state too
      requestAnimationFrame(() => setAnimate(true));
    }
  }, [storageKey]);

  const handleVote = (choice: string) => {
    localStorage.setItem(storageKey, choice);
    setVoted(choice);
    setShowResults(true);
    // Trigger animation after render
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
  };

  const options = [
    { key: "1", label: homeName, pct: results.home, color: "bg-secondary", colorLight: "bg-secondary/20", text: "text-secondary" },
    { key: "N", label: "Match nul", pct: results.draw, color: "bg-gray-400", colorLight: "bg-gray-400/20", text: "text-gray-400" },
    { key: "2", label: awayName, pct: results.away, color: "bg-secondary", colorLight: "bg-secondary/20", text: "text-secondary" },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-slate-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        L&apos;avis de la communauté
      </h2>
      <p className="mb-5 text-sm text-gray-500 dark:text-gray-300">
        {showResults
          ? `${results.totalVotes.toLocaleString("fr-FR")} votes`
          : "Quel est votre pronostic pour ce match ?"}
      </p>

      {!showResults ? (
        <div className="grid grid-cols-3 gap-3">
          {options.map((opt) => (
            <button
              key={opt.key}
              onClick={() => handleVote(opt.key)}
              className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 px-3 py-4 font-semibold transition-all hover:scale-[1.03] hover:shadow-md dark:border-gray-600 ${
                opt.key === "1"
                  ? "hover:border-secondary hover:bg-secondary/10 dark:hover:border-secondary dark:hover:bg-secondary/10"
                  : opt.key === "N"
                    ? "hover:border-gray-400 hover:bg-gray-50 dark:bg-slate-700 dark:hover:border-gray-400 dark:hover:bg-gray-700/40"
                    : "hover:border-secondary hover:bg-secondary/5 dark:hover:border-secondary dark:hover:bg-secondary/10"
              }`}
            >
              <span className="text-2xl font-black text-gray-500 dark:text-gray-600 group-hover:text-gray-500">
                {opt.key}
              </span>
              <span className="text-center text-xs leading-tight text-gray-700 dark:text-gray-300 sm:text-sm">
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
                <span className={`text-sm font-medium min-w-0 truncate ${voted === opt.key ? opt.text + " font-bold" : "text-gray-700 dark:text-gray-300"}`}>
                  {voted === opt.key && "✓ "}{opt.label}
                </span>
                <span className={`text-sm font-bold tabular-nums shrink-0 ${voted === opt.key ? opt.text : "text-gray-600 dark:text-gray-300"}`}>
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
