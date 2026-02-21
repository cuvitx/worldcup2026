"use client";

import { useEffect, useState, useCallback, memo } from "react";

// ============================================================================
// LiveScoreBar — Horizontal scrollable bar showing live/today's matches
// Polls /api/live every 30s for real-time scores.
// Falls back to static match data when no API key is configured.
// ============================================================================

/**
 * Translations for live score bar.
 */
const translations = {
  fr: { halftime: "MI-T", finished: "FIN", upcoming: "A VENIR", today: "Aujourd'hui" },
  en: { halftime: "HT", finished: "FT", upcoming: "SOON", today: "Today" },
  es: { halftime: "DT", finished: "FIN", upcoming: "PROX", today: "Hoy" },
};

/**
 * A single live match data structure.
 */
export interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "upcoming" | "live" | "halftime" | "finished";
  elapsed: number | null;
  time: string;
  slug: string;
}

/**
 * Props for the LiveScoreBar component.
 * 
 * @param todaysMatches - Today's matches from static data as fallback
 * @param matchBasePath - Base path for match links (e.g. "/match" for FR)
 * @param apiEndpoint - API endpoint to poll (default: "/api/live")
 * @param pollInterval - Polling interval in ms (default: 30000)
 * @param locale - UI language
 */
interface LiveScoreBarProps {
  /** Today's matches from static data as fallback */
  todaysMatches: LiveMatch[];
  /** Base path for match links (e.g. "/match" for FR, "/match" for EN) */
  matchBasePath: string;
  /** API endpoint to poll */
  apiEndpoint?: string;
  /** Polling interval in ms (default 30000) */
  pollInterval?: number;
  locale?: "fr" | "en" | "es";
}

/**
 * StatusBadge — Match status badge (LIVE, HT, FT, UPCOMING).
 */
function StatusBadge({ status, elapsed, t }: { status: LiveMatch["status"]; elapsed: number | null; t: { halftime: string; finished: string; upcoming: string } }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
        {elapsed ? `${elapsed}'` : "LIVE"}
      </span>
    );
  }
  if (status === "halftime") {
    return (
      <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
        {t.halftime}
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="rounded-full bg-gray-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
        {t.finished}
      </span>
    );
  }
  return (
    <span className="rounded-full bg-primary/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
      {status === "upcoming" ? t.upcoming : status}
    </span>
  );
}

function MatchCard({ match, t }: { match: LiveMatch; t: { halftime: string; finished: string; upcoming: string } }) {
  const isLive = match.status === "live" || match.status === "halftime";

  return (
    <div
      className={`flex shrink-0 flex-col items-center gap-1 rounded-lg px-3 py-2 min-w-[140px] ${
        isLive ? "bg-white/20 ring-1 ring-white/30" : "bg-white/10"
      }`}
    >
      <StatusBadge status={match.status} elapsed={match.elapsed} t={t} />
      <div className="flex w-full items-center justify-between gap-2 text-xs font-semibold">
        <span className="truncate">{match.homeTeam}</span>
        {match.homeScore !== null && match.awayScore !== null ? (
          <span className={`font-bold ${isLive ? "text-gold" : ""}`}>
            {match.homeScore} - {match.awayScore}
          </span>
        ) : (
          <span className="text-white/60">{match.time}</span>
        )}
        <span className="truncate text-right">{match.awayTeam}</span>
      </div>
    </div>
  );
}

/**
 * LiveScoreBar component — Horizontal scrollable bar showing today's/live matches with real-time scores.
 * 
 * Polls API every 30s during tournament. Falls back to static data when API unavailable.
 * 
 * @example
 * ```tsx
 * <LiveScoreBar
 *   todaysMatches={staticMatches}
 *   matchBasePath="/match"
 *   locale="fr"
 * />
 * ```
 */
export const LiveScoreBar = memo(function LiveScoreBar({
  todaysMatches,
  matchBasePath,
  apiEndpoint = "/api/live",
  pollInterval = 30000,
  locale,
}: LiveScoreBarProps) {
  const t = translations[locale ?? "fr"];
  const [matches, setMatches] = useState<LiveMatch[]>(todaysMatches);

  const fetchLive = useCallback(async () => {
    // Don't poll before tournament starts (June 11, 2026)
    const tournamentStart = new Date("2026-06-11T00:00:00Z");
    const tournamentEnd = new Date("2026-07-19T23:59:59Z");
    const now = new Date();
    if (now < tournamentStart || now > tournamentEnd) return;

    try {
      const res = await fetch(apiEndpoint);
      if (!res.ok) return;
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const liveMatches: LiveMatch[] = data.map(
          (f: {
            fixture: { id: number; status: { short: string; elapsed: number | null } };
            teams: { home: { name: string }; away: { name: string } };
            goals: { home: number | null; away: number | null };
          }) => ({
            id: String(f.fixture.id),
            homeTeam: f.teams.home.name,
            awayTeam: f.teams.away.name,
            homeScore: f.goals.home,
            awayScore: f.goals.away,
            status: mapApiStatus(f.fixture.status.short),
            elapsed: f.fixture.status.elapsed,
            time: "",
            slug: "",
          })
        );
        setMatches((prev) => mergeLiveData(prev, liveMatches));
      }
    } catch {
      // Silently fail — keep showing static data
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, pollInterval);
    return () => clearInterval(interval);
  }, [fetchLive, pollInterval]);

  if (matches.length === 0) return null;

  return (
    <div className="bg-accent border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-3 overflow-x-auto py-2 scrollbar-hide">
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-white/50">
            {t.today}
          </span>
          {matches.map((match) => (
            <a
              key={match.id}
              href={match.slug ? `${matchBasePath}/${match.slug}` : "#"}
              className="contents"
            >
              <MatchCard match={match} t={t} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

function mapApiStatus(short: string): LiveMatch["status"] {
  const liveStatuses = ["1H", "2H", "ET", "P"];
  if (liveStatuses.includes(short)) return "live";
  if (short === "HT") return "halftime";
  if (["FT", "AET", "PEN"].includes(short)) return "finished";
  return "upcoming";
}

function mergeLiveData(staticMatches: LiveMatch[], liveMatches: LiveMatch[]): LiveMatch[] {
  const liveById = new Map(liveMatches.map((m) => [m.id, m]));
  return staticMatches.map((m) => {
    const live = liveById.get(m.id);
    if (!live) return m;
    return {
      ...m,
      homeScore: live.homeScore,
      awayScore: live.awayScore,
      status: live.status,
      elapsed: live.elapsed,
    };
  });
}
