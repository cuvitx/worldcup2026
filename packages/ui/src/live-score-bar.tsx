"use client";

import { useEffect, useState, useCallback, memo } from "react";

// ============================================================================
// LiveScoreBar — Slim ticker showing today's/live matches below the header.
// Polls /api/live every 30s for real-time scores during the tournament.
// Hides itself when the static data is stale (wrong date).
// ============================================================================

const translations = {
  fr: { halftime: "MI-T", finished: "FIN", upcoming: "A VENIR", today: "MATCHS", live: "LIVE" },
  en: { halftime: "HT", finished: "FT", upcoming: "SOON", today: "MATCHS", live: "LIVE" },
  es: { halftime: "DT", finished: "FIN", upcoming: "PROX", today: "PARTIDOS", live: "LIVE" },
};

export interface LiveMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeCode?: string;
  awayCode?: string;
  homeFlag?: string;
  awayFlag?: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "upcoming" | "live" | "halftime" | "finished";
  elapsed: number | null;
  time: string;
  slug: string;
  date?: string;
}

/**
 * Raw API fixture shape passed from a centralized provider.
 * When provided, LiveScoreBar skips its own polling.
 */
interface ApiFixtureLike {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
}

interface LiveScoreBarProps {
  todaysMatches: LiveMatch[];
  matchBasePath: string;
  matchDate?: string;
  apiEndpoint?: string;
  pollInterval?: number;
  locale?: "fr" | "en" | "es";
  /** When provided (from a centralized LiveDataProvider), skips internal polling */
  liveFixtures?: ApiFixtureLike[];
}

function StatusDot({ status }: { status: LiveMatch["status"] }) {
  if (status === "live" || status === "halftime") {
    return <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />;
  }
  if (status === "finished") {
    return <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />;
  }
  return <span className="h-1.5 w-1.5 rounded-full bg-accent" />;
}

function MatchPill({ match, t, currentDate }: { match: LiveMatch; t: typeof translations.fr; currentDate?: string }) {
  const isLive = match.status === "live" || match.status === "halftime";
  const isFinished = match.status === "finished";
  const hasScore = match.homeScore !== null && match.awayScore !== null;
  const homeName = match.homeCode ?? match.homeTeam;
  const awayName = match.awayCode ?? match.awayTeam;
  const isFutureDate = match.date && currentDate && match.date > currentDate;

  return (
    <div
      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] leading-none text-white transition-colors ${
        isLive
          ? "bg-white/20 ring-1 ring-white/30"
          : "bg-white/10 hover:bg-white/15"
      }`}
    >
      {isLive && <StatusDot status={match.status} />}
      {match.homeFlag && <span className="text-xs">{match.homeFlag}</span>}
      <span className="font-semibold">{homeName}</span>
      {hasScore ? (
        <span className={`font-bold tabular-nums ${isLive ? "rounded bg-white/20 px-1.5 py-0.5" : ""}`}>
          {match.homeScore}-{match.awayScore}
        </span>
      ) : (
        <span className="text-white/50 tabular-nums flex flex-col items-center leading-none">
          <span>{match.time}</span>
          {isFutureDate && (
            <span className="text-[9px] text-white/40">
              {new Date(match.date + "T00:00:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
            </span>
          )}
        </span>
      )}
      <span className="font-semibold">{awayName}</span>
      {match.awayFlag && <span className="text-xs">{match.awayFlag}</span>}
      {isLive && match.elapsed && (
        <span className="rounded bg-red-500/80 px-1.5 py-0.5 text-[10px] font-bold text-white">{match.elapsed}&apos;</span>
      )}
    </div>
  );
}

export const LiveScoreBar = memo(function LiveScoreBar({
  todaysMatches,
  matchBasePath,
  matchDate,
  apiEndpoint = "/api/live",
  pollInterval = 30000,
  locale,
  liveFixtures,
}: LiveScoreBarProps) {
  const t = translations[locale ?? "fr"];
  const [matches, setMatches] = useState<LiveMatch[]>(todaysMatches);
  const [isStale, setIsStale] = useState(false);
  const hasExternalData = !!liveFixtures;

  // Client-side: check if the static data is for today
  useEffect(() => {
    if (!matchDate) return;
    const now = new Date();
    const clientToday = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    if (matchDate !== clientToday) {
      setIsStale(true);
    }
  }, [matchDate]);

  // When external live data is provided (from centralized provider), use it directly
  // Match by kickoff time (not by ID — static IDs are slugs, API IDs are numeric)
  useEffect(() => {
    if (!liveFixtures || liveFixtures.length === 0 || !matchDate) return;
    setMatches((prev) =>
      prev.map((m) => {
        if (!m.time) return m;
        const kickoff = new Date(`${matchDate}T${m.time}:00+02:00`).getTime();
        const fixture = liveFixtures.find((f) =>
          Math.abs(new Date(f.fixture.date).getTime() - kickoff) < 120000
        );
        if (!fixture) return m;
        return {
          ...m,
          homeScore: fixture.goals.home,
          awayScore: fixture.goals.away,
          status: mapApiStatus(fixture.fixture.status.short),
          elapsed: fixture.fixture.status.elapsed,
        };
      })
    );
  }, [liveFixtures, matchDate]);

  // Fetch today's results (one-time) to show scores for finished matches
  useEffect(() => {
    if (!matchDate) return;
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/fixtures?date=${matchDate}`);
        if (!res.ok) return;
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) return;

        setMatches((prev) =>
          prev.map((m) => {
            // Convert Paris time to UTC for API comparison
            const parisDate = new Date(`${matchDate}T${m.time}:00+02:00`);
            const kickoffUTC = parisDate.toISOString().slice(0, 19);
            const apiMatch = data.find(
              (f: { fixture: { date: string } }) =>
                f.fixture.date.startsWith(kickoffUTC)
            ) as {
              fixture: { status: { short: string; elapsed: number | null } };
              goals: { home: number | null; away: number | null };
            } | undefined;
            if (!apiMatch) return m;
            return {
              ...m,
              homeScore: apiMatch.goals.home,
              awayScore: apiMatch.goals.away,
              status: mapApiStatus(apiMatch.fixture.status.short),
              elapsed: apiMatch.fixture.status.elapsed,
            };
          })
        );
      } catch {
        // Silently fail
      }
    };
    fetchResults();
  }, [matchDate]);

  // Internal polling — only when NO external provider
  const fetchLive = useCallback(async () => {
    if (hasExternalData) return; // Skip: data comes from provider
    const tournamentStart = new Date("2026-06-11T00:00:00+02:00");
    const tournamentEnd = new Date("2026-07-19T23:59:59+02:00");
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
  }, [apiEndpoint, hasExternalData]);

  useEffect(() => {
    if (hasExternalData) return; // Skip: data comes from provider
    fetchLive();
    const interval = setInterval(fetchLive, pollInterval);
    return () => clearInterval(interval);
  }, [fetchLive, pollInterval, hasExternalData]);

  if (matches.length === 0 || isStale) return null;

  const hasLive = matches.some((m) => m.status === "live" || m.status === "halftime");

  return (
    <div className="border-b border-white/5 bg-primary">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 scrollbar-hide">
          <span className="shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70 leading-none">
            {hasLive && <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />}
            {hasLive ? t.live : t.today}
          </span>
          <span className="h-3 w-px bg-white/10 shrink-0" />
          {matches.map((match) => (
            <a
              key={match.id}
              href={match.slug ? `${matchBasePath}/${match.slug}` : "#"}
              className="contents"
            >
              <MatchPill match={match} t={t} currentDate={matchDate} />
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
