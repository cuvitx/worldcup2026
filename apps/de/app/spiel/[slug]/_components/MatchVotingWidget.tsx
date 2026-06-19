"use client";

import { useState, useEffect, useCallback } from "react";
import { GaTrackingPixel } from "../../../components/GaTrackingPixel";

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
  odds?: { home: string; draw: string; away: string } | null;
  predictedScore?: string | null;
  pmuUrl?: string;
}

const STORAGE_KEY_PREFIX = "cdm2026-vote-";

export function MatchVotingWidget({
  slug,
  homeName,
  homeFlag,
  awayName,
  awayFlag,
  isFinished = false,
  odds,
  predictedScore,
  pmuUrl,
}: MatchVotingWidgetProps) {
  const [voted, setVoted] = useState<VoteChoice | null>(null);
  const [counts, setCounts] = useState<VoteCounts | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [justVoted, setJustVoted] = useState(false);

  const storageKey = STORAGE_KEY_PREFIX + slug;

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
        if (saved || isFinished) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setAnimate(true));
          });
        }
      })
      .catch(() => setLoading(false));
  }, [slug, storageKey, isFinished]);

  const handleVote = useCallback(
    async (choice: VoteChoice) => {
      if (submitting || voted || isFinished) return;
      setSubmitting(true);
      setVoted(choice);
      setCounts((prev) => {
        const base = prev ?? { home: 0, draw: 0, away: 0, total: 0 };
        return { ...base, [choice]: base[choice] + 1, total: base.total + 1 };
      });
      localStorage.setItem(storageKey, choice);

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
          setJustVoted(res.ok);
          if (res.ok) setTimeout(() => setJustVoted(false), 3000);
        }
      } catch {
        // Keep optimistic state
      } finally {
        setSubmitting(false);
      }
    },
    [submitting, voted, isFinished, slug, storageKey],
  );

  const total = counts?.total ?? 0;
  if (isFinished && !loading && total === 0) return null;

  const pct = (n: number) => (total > 0 ? Math.round((n / total) * 100) : 0);

  const pctHome = pct(counts?.home ?? 0);
  const pctDraw = pct(counts?.draw ?? 0);
  const pctAway = pct(counts?.away ?? 0);

  // Fix rounding to 100%
  const sum = pctHome + pctDraw + pctAway;
  const adjustment = total > 0 ? 100 - sum : 0;

  const options = [
    {
      key: "home" as VoteChoice,
      badge: "1",
      label: homeName,
      flag: homeFlag,
      pct: pctHome + (adjustment !== 0 && pctHome >= pctDraw && pctHome >= pctAway ? adjustment : 0),
      odd: odds?.home,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      pctColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-400",
      hoverBg: "hover:bg-emerald-100",
      barColor: "bg-emerald-500",
      barBg: "bg-emerald-100",
    },
    {
      key: "draw" as VoteChoice,
      badge: "N",
      label: "Nul",
      flag: "🤝",
      pct: pctDraw + (adjustment !== 0 && pctDraw > pctHome && pctDraw >= pctAway ? adjustment : 0),
      odd: odds?.draw,
      bg: "bg-gray-50",
      border: "border-gray-200",
      pctColor: "text-gray-600",
      hoverBorder: "hover:border-gray-400",
      hoverBg: "hover:bg-gray-100",
      barColor: "bg-gray-400",
      barBg: "bg-gray-200",
    },
    {
      key: "away" as VoteChoice,
      badge: "2",
      label: awayName,
      flag: awayFlag,
      pct: pctAway + (adjustment !== 0 && pctAway > pctHome && pctAway > pctDraw ? adjustment : 0),
      odd: odds?.away,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      pctColor: "text-emerald-600",
      hoverBorder: "hover:border-emerald-400",
      hoverBg: "hover:bg-emerald-100",
      barColor: "bg-emerald-500",
      barBg: "bg-emerald-100",
    },
  ];

  const showResults = isFinished || voted !== null;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-xl font-bold text-gray-900">Prognose</h2>
      </div>

      <div className="px-6 pb-4">
        {loading ? (
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-28 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : !showResults ? (
          /* ── Vote mode: clickable cards ── */
          <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Votez pour le résultat">
            {options.map((opt) => (
              <button
                key={opt.key}
                onClick={() => handleVote(opt.key)}
                disabled={submitting}
                role="radio"
                aria-checked="false"
                aria-label={`Voter ${opt.key === "draw" ? "match nul" : `victoire ${opt.label}`}`}
                className={`group flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 ${opt.border} ${opt.bg} px-3 py-4 transition-all ${opt.hoverBorder} ${opt.hoverBg} hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer`}
              >
                <span className={`text-2xl font-black ${opt.pctColor}`}>?</span>
                <span className="text-sm font-semibold text-gray-700 text-center leading-tight truncate max-w-full">
                  {opt.label}
                </span>
                {opt.odd && (
                  <span className="text-sm font-bold text-gray-900">{opt.odd}</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          /* ── Results mode: percentage cards ── */
          <div className="grid grid-cols-3 gap-3">
            {options.map((opt) => {
              const isUserChoice = voted === opt.key;
              return (
                <div
                  key={opt.key}
                  className={`relative flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-4 transition-all ${
                    isUserChoice
                      ? `${opt.border} ${opt.bg} ring-2 ring-emerald-400/50`
                      : `${opt.border} ${opt.bg}`
                  }`}
                >
                  {isUserChoice && (
                    <span className="absolute top-2 right-2">
                      <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </span>
                  )}
                  <span className={`text-2xl font-black tabular-nums ${opt.pctColor}`}>
                    {animate ? opt.pct : 0}%
                  </span>
                  <span className="text-sm font-semibold text-gray-700 text-center leading-tight truncate max-w-full">
                    {opt.label}
                  </span>
                  {opt.odd && (
                    <span className="text-sm font-bold text-gray-900">{opt.odd}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Score prédit */}
        {predictedScore && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex flex-col items-center gap-0.5 rounded-xl border-2 border-gray-200 bg-gray-50 px-8 py-3 w-full">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Score prédit</span>
              <span className="text-2xl font-black text-gray-900 tabular-nums">{predictedScore}</span>
            </div>
          </div>
        )}

        {/* Vote count */}
        {showResults && total > 0 && (
          <p className="mt-3 text-center text-xs text-gray-400">
            {total.toLocaleString("de-DE")} vote{total > 1 ? "s" : ""}
            {justVoted && <span className="ml-2 text-emerald-500 font-medium">Merci pour votre vote !</span>}
          </p>
        )}
      </div>

      {/* PMU CTA */}
      {pmuUrl && (
        <>
          <div className="relative mx-6 mb-4 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
            <GaTrackingPixel variant="370x90" tracking={`match-vote-${slug}`} />
            <a
              href={pmuUrl}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="group flex items-center gap-3 px-4 py-3"
            >
              <img
                src="/partners/pmu-play.webp"
                alt="PMU Sport"
                width={80}
                height={24}
                className="h-5 w-auto shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900">PMU Sport</p>
                <p className="text-xs text-gray-500">100&euro; offerts en freebets sans condition</p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white transition-colors group-hover:bg-emerald-700">
                Prognose&nbsp;&rarr;
              </span>
            </a>
          </div>
          <div className="px-6 pb-4">
            <p className="text-[10px] text-gray-400 leading-snug">
              Cotes estimées, susceptibles d&apos;évoluer. 18+ |{" "}
              <a href="tel:0974751313" className="underline hover:text-gray-500">09 74 75 13 13</a>{" "}
              | Jeu responsable
            </p>
          </div>
        </>
      )}
    </section>
  );
}
