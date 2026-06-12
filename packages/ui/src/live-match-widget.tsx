"use client";

import { useEffect, useState, useCallback } from "react";

// ============================================================================
// LiveMatchWidget — Real-time score widget for individual match pages
// Shows score, minute, and live events. Polls every 30s when match is live.
// ============================================================================

/**
 * Translations for live match widget.
 */
const translations = {
  fr: { halftime: "MI-TEMPS", live: "EN DIRECT", finished: "TERMINE", dateLocale: "fr-FR", timezone: "Europe/Paris" },
  en: { halftime: "HALF TIME", live: "LIVE", finished: "FINISHED", dateLocale: "en-US", timezone: "America/New_York" },
  es: { halftime: "DESCANSO", live: "EN VIVO", finished: "FINALIZADO", dateLocale: "es-ES", timezone: "Europe/Madrid" },
};

/**
 * A match event (goal, card, substitution).
 */
interface MatchEvent {
  minute: number;
  extra: number | null;
  team: string;
  player: string;
  type: "goal" | "card" | "substitution";
  detail: string;
}

/**
 * Live match data structure.
 */
interface LiveMatchData {
  homeScore: number | null;
  awayScore: number | null;
  status: "upcoming" | "live" | "halftime" | "finished";
  elapsed: number | null;
  events: MatchEvent[];
}

/**
 * Props for the LiveMatchWidget component.
 * 
 * @param matchDate - Match date in ISO format (e.g., "2026-06-11")
 * @param matchTime - Match time in Europe/Paris CEST (e.g., "21:00")
 * @param homeTeam - Home team name
 * @param awayTeam - Away team name
 * @param stadium - Stadium name for display
 * @param fixtureId - API-Football fixture ID (optional)
 * @param apiEndpoint - API endpoint for live data (default: "/api/live")
 * @param locale - UI language
 */
/**
 * Raw API fixture shape passed from a centralized provider.
 */
interface ApiFixtureLike {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
}

interface LiveMatchWidgetProps {
  /** Match date in ISO format (2026-06-11) */
  matchDate: string;
  /** Match time in Europe/Paris CEST (21:00) */
  matchTime: string;
  homeTeam: string;
  awayTeam: string;
  /** Stadium name for display */
  stadium: string;
  /** API-Football fixture ID if known */
  fixtureId?: string;
  /** API endpoint for live data */
  apiEndpoint?: string;
  locale?: "fr" | "en" | "es";
  /** When provided (from a centralized LiveDataProvider), skips internal polling */
  liveFixtures?: ApiFixtureLike[];
}

const STATUS_MAP: Record<string, LiveMatchData["status"]> = {
  "1H": "live",
  "2H": "live",
  ET: "live",
  P: "live",
  HT: "halftime",
  FT: "finished",
  AET: "finished",
  PEN: "finished",
};

/**
 * EventIcon — Icon for match event type (goal, card, substitution).
 */
function EventIcon({ type }: { type: MatchEvent["type"] }) {
  if (type === "goal") return <span>&#9917;</span>;
  if (type === "card") return <span>&#128997;</span>;
  return <span>&#8644;</span>;
}

/**
 * LiveMatchWidget component — Real-time score and events widget for match pages.
 * 
 * Polls API every 30s when match is live (30min to +4h window).
 * Shows score, minute, status, and key events.
 * 
 * @example
 * ```tsx
 * <LiveMatchWidget
 *   matchDate="2026-06-11"
 *   matchTime="21:00"
 *   homeTeam="Mexique"
 *   awayTeam="Afrique du Sud"
 *   stadium="Estadio Azteca"
 *   locale="fr"
 * />
 * ```
 */
export function LiveMatchWidget({
  matchDate,
  matchTime,
  homeTeam,
  awayTeam,
  stadium,
  apiEndpoint = "/api/live",
  locale,
  liveFixtures,
}: LiveMatchWidgetProps) {
  const hasExternalData = !!liveFixtures;
  const t = translations[locale ?? "fr"];

  const [data, setData] = useState<LiveMatchData>({
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    elapsed: null,
    events: [],
  });

  // Determine initial status from date/time
  useEffect(() => {
    const matchStart = new Date(`${matchDate}T${matchTime}:00+02:00`);
    const now = new Date();
    const diffMs = now.getTime() - matchStart.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours > 3) {
      setData((prev) => ({ ...prev, status: "finished" }));
    } else if (diffHours > 0) {
      setData((prev) => ({ ...prev, status: "live" }));
    }
  }, [matchDate, matchTime]);

  const findMatchInFixtures = useCallback(
    (fixtures: Array<{
      fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
      teams: { home: { name: string }; away: { name: string } };
      goals: { home: number | null; away: number | null };
    }>) => {
      // Match by kickoff time (most reliable across languages)
      // Convert Paris time back to UTC for API comparison
      const parisDate = new Date(`${matchDate}T${matchTime}:00+02:00`);
      const kickoffUTC = parisDate.toISOString().slice(0, 19);
      const byTime = fixtures.find((f) => f.fixture.date.startsWith(kickoffUTC));
      if (byTime) return byTime;

      // Fallback: fuzzy match on team names (first word)
      return fixtures.find(
        (f) =>
          f.teams.home.name.toLowerCase().includes(homeTeam.toLowerCase().split(" ")[0] ?? "") ||
          f.teams.away.name.toLowerCase().includes(awayTeam.toLowerCase().split(" ")[0] ?? "")
      );
    },
    [matchDate, matchTime, homeTeam, awayTeam]
  );

  // When external live data is provided (from centralized provider), use it directly
  useEffect(() => {
    if (!liveFixtures || liveFixtures.length === 0) return;

    const match = findMatchInFixtures(liveFixtures);
    if (!match) return;

    setData({
      homeScore: match.goals.home,
      awayScore: match.goals.away,
      status: STATUS_MAP[match.fixture.status.short] ?? "upcoming",
      elapsed: match.fixture.status.elapsed,
      events: [],
    });
  }, [liveFixtures, findMatchInFixtures]);

  // Internal polling — only when NO external provider
  const fetchLive = useCallback(async () => {
    if (hasExternalData) return; // Skip: data comes from provider
    try {
      const res = await fetch(apiEndpoint);
      if (!res.ok) return;
      const fixtures = await res.json();

      if (!Array.isArray(fixtures)) return;

      const match = findMatchInFixtures(fixtures);
      if (!match) return;

      setData({
        homeScore: match.goals.home,
        awayScore: match.goals.away,
        status: STATUS_MAP[match.fixture.status.short] ?? "upcoming",
        elapsed: match.fixture.status.elapsed,
        events: [],
      });
    } catch {
      // Silently fail
    }
  }, [apiEndpoint, findMatchInFixtures, hasExternalData]);

  // Fetch final score for completed matches (one-time)
  useEffect(() => {
    const matchStart = new Date(`${matchDate}T${matchTime}:00+02:00`);
    const now = new Date();
    const diffHours = (now.getTime() - matchStart.getTime()) / (1000 * 60 * 60);

    if (diffHours <= 3) return; // Not finished yet

    const fetchResult = async () => {
      try {
        const res = await fetch(`/api/fixtures?date=${matchDate}`);
        if (!res.ok) return;
        const fixtures = await res.json();
        if (!Array.isArray(fixtures)) return;

        const match = findMatchInFixtures(fixtures);
        if (!match) return;

        setData({
          homeScore: match.goals.home,
          awayScore: match.goals.away,
          status: STATUS_MAP[match.fixture.status.short] ?? "finished",
          elapsed: null,
          events: [],
        });
      } catch {
        // Silently fail — keep showing static data
      }
    };

    fetchResult();
  }, [matchDate, matchTime, findMatchInFixtures]);

  // Poll only when match could be live AND no external provider
  useEffect(() => {
    if (hasExternalData) return; // Skip: data comes from provider
    const matchStart = new Date(`${matchDate}T${matchTime}:00+02:00`);
    const now = new Date();
    const diffMs = now.getTime() - matchStart.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // Only poll if match is within -30min to +4h window
    if (diffHours > -0.5 && diffHours < 4) {
      fetchLive();
      const interval = setInterval(fetchLive, 60000);
      return () => clearInterval(interval);
    }
  }, [matchDate, matchTime, fetchLive, hasExternalData]);

  const isLive = data.status === "live" || data.status === "halftime";
  const isFinished = data.status === "finished";

  return (
    <div
      className={`overflow-hidden rounded-xl ${
        isLive
          ? "ring-2 ring-red-500 bg-gradient-to-b from-primary to-secondary"
          : "bg-gradient-to-b from-primary to-secondary"
      }`}
    >
      {/* Status bar */}
      <div className={`px-4 py-1.5 text-center text-xs font-bold ${
        isLive ? "bg-red-600 text-white" : isFinished ? "bg-gray-600 text-white" : "bg-field text-white"
      }`}>
        {isLive && data.elapsed && (
          <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
        )}
        {isLive
          ? data.status === "halftime"
            ? t.halftime
            : `${t.live} — ${data.elapsed}'`
          : isFinished
            ? t.finished
            : formatMatchDateTime(matchDate, matchTime, t.dateLocale, t.timezone)}
      </div>

      {/* Score */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 px-3 sm:px-6 py-6 text-white">
        <div className="flex-1 min-w-0 text-right">
          <p className="text-sm sm:text-lg font-bold truncate">{homeTeam}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {data.homeScore !== null && data.awayScore !== null ? (
            <div className={`flex items-center gap-2 text-3xl sm:text-4xl font-black ${isLive ? "text-gold" : ""}`}>
              <span>{data.homeScore}</span>
              <span className="text-white/60">-</span>
              <span>{data.awayScore}</span>
            </div>
          ) : (
            <div className="text-xl sm:text-2xl font-bold text-white/60">VS</div>
          )}
        </div>

        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm sm:text-lg font-bold truncate">{awayTeam}</p>
        </div>
      </div>

      {/* Stadium */}
      <div className="border-t border-white/10 px-4 py-2 text-center text-xs text-white/70">
        {stadium}
      </div>

      {/* Events */}
      {data.events.length > 0 && (
        <div className="border-t border-white/10 px-4 py-2">
          {data.events.map((event, i) => (
            <div key={i} className="flex items-center gap-2 py-1 text-xs text-white/80">
              <span className="font-mono text-white/70">
                {event.minute}&apos;{event.extra ? `+${event.extra}` : ""}
              </span>
              <EventIcon type={event.type} />
              <span>{event.player}</span>
              <span className="text-white/60">({event.team})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatMatchDateTime(date: string, time: string, dateLocale: string, timezone: string): string {
  const d = new Date(`${date}T${time}:00+02:00`);
  return d.toLocaleDateString(dateLocale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
}
