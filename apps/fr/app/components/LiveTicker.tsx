"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getMatchDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00Z`);
}

export function LiveTicker() {
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Find next match or live match
  const now = new Date();
  const sortedMatches = [...matches].sort(
    (a, b) => getMatchDateTime(a.date, a.time).getTime() - getMatchDateTime(b.date, b.time).getTime()
  );

  // Live match: started less than 2h ago
  const liveMatch = sortedMatches.find((m) => {
    const start = getMatchDateTime(m.date, m.time);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
    return now >= start && now < end;
  });

  // Next upcoming match
  const nextMatch = liveMatch ?? sortedMatches.find((m) => getMatchDateTime(m.date, m.time) > now);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("ticker-dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (!nextMatch || dismissed) return;

    function tick() {
      const matchTime = getMatchDateTime(nextMatch!.date, nextMatch!.time);
      const diff = matchTime.getTime() - Date.now();

      if (diff <= 0 && diff > -2 * 60 * 60 * 1000) {
        setIsLive(true);
        setCountdown(null);
      } else if (diff > 0) {
        setIsLive(false);
        const totalSec = Math.floor(diff / 1000);
        setCountdown({
          days: Math.floor(totalSec / 86400),
          hours: Math.floor((totalSec % 86400) / 3600),
          minutes: Math.floor((totalSec % 3600) / 60),
          seconds: totalSec % 60,
        });
      } else {
        setCountdown(null);
        setIsLive(false);
      }
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [nextMatch, dismissed]);

  if (!mounted || dismissed || !nextMatch) return null;

  const homeTeam = teamsById[nextMatch.homeTeamId];
  const awayTeam = teamsById[nextMatch.awayTeamId];
  if (!homeTeam || !awayTeam) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("ticker-dismissed", "1");
  };

  const countdownText = countdown
    ? `dans ${countdown.days > 0 ? `${countdown.days}j ` : ""}${countdown.hours}h ${String(countdown.minutes).padStart(2, "0")}min ${String(countdown.seconds).padStart(2, "0")}s`
    : "";

  return (
    <div className="sticky top-[64px] z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 px-4 py-2.5 text-sm">
        <Link
          href={`/match/${nextMatch.slug}`}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity min-w-0"
        >
          {isLive && (
            <span className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-bold text-primary dark:text-secondary uppercase text-xs tracking-wide">
                En direct
              </span>
            </span>
          )}
          <span className="truncate">
            <span role="img" aria-label={homeTeam.name}>{homeTeam.flag}</span>{" "}
            <span className="font-semibold">{homeTeam.name}</span>
            {" "}vs{" "}
            <span role="img" aria-label={awayTeam.name}>{awayTeam.flag}</span>{" "}
            <span className="font-semibold">{awayTeam.name}</span>
          </span>
          {countdown && (
            <span className="text-gray-500 dark:text-gray-400 shrink-0 hidden sm:inline">
              — {countdownText}
            </span>
          )}
        </Link>
        {countdown && (
          <span className="text-gray-500 dark:text-gray-400 text-xs sm:hidden shrink-0">
            {countdownText}
          </span>
        )}
        <button
          type="button"
          onClick={handleDismiss}
          className="ml-2 shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
          aria-label="Fermer le ticker"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
