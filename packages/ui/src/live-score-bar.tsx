"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";

// ============================================================================
// LiveScoreBar — Slim ticker showing today's/live matches below the header.
// Polls /api/live every 30s for real-time scores during the tournament.
// Hides itself when the static data is stale (wrong date).
// ============================================================================

const translations = {
  fr: { halftime: "MI-T", extraBreak: "PAUSE PROL.", extraTime: "PROL.", penalties: "TAB", finished: "FIN", upcoming: "A VENIR", today: "MATCHS", live: "LIVE" },
  en: { halftime: "HT", extraBreak: "ET BREAK", extraTime: "ET", penalties: "PEN", finished: "FT", upcoming: "SOON", today: "MATCHS", live: "LIVE" },
  es: { halftime: "DT", extraBreak: "DESC. PRÓR.", extraTime: "PRÓR.", penalties: "PEN", finished: "FIN", upcoming: "PROX", today: "PARTIDOS", live: "LIVE" },
  de: { halftime: "HZ", extraBreak: "VL PAUSE", extraTime: "VL", penalties: "ELF", finished: "ENDE", upcoming: "DEMNÄCHST", today: "SPIELE", live: "LIVE" },
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
  statusShort?: string;
  elapsed: number | null;
  time: string;
  slug: string;
  date?: string;
  /** API-Football team ID for home/away swap detection */
  homeApiTeamId?: number;
  awayApiTeamId?: number;
}

export type LiveTeamDisplayMap = Record<
  number,
  { name: string; code?: string; flag?: string }
>;

/**
 * Raw API fixture shape passed from a centralized provider.
 * When provided, LiveScoreBar skips its own polling.
 */
interface ApiFixtureLike {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  teams: { home: { id?: number; name: string }; away: { id?: number; name: string } };
  goals: { home: number | null; away: number | null };
}

type FixtureMatchResult = {
  fixture: ApiFixtureLike;
  swapped: boolean;
  matchedBy: "api-team-ids" | "kickoff";
};

interface LiveScoreBarProps {
  todaysMatches: LiveMatch[];
  matchBasePath: string;
  matchDate?: string;
  apiEndpoint?: string;
  pollInterval?: number;
  locale?: "fr" | "en" | "es" | "de";
  /** When provided (from a centralized LiveDataProvider), skips internal polling */
  liveFixtures?: ApiFixtureLike[];
  /** Display metadata keyed by API-Football team ID. */
  apiTeamDisplayMap?: LiveTeamDisplayMap;
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

const dateLocales: Record<string, string> = { fr: "fr-FR", en: "en-US", es: "es-ES", de: "de-DE" };

function hasApiTeamIds(match: LiveMatch) {
  return (
    match.homeApiTeamId != null &&
    match.homeApiTeamId > 0 &&
    match.awayApiTeamId != null &&
    match.awayApiTeamId > 0
  );
}

function findFixtureForMatch(
  match: LiveMatch,
  fixtures: ApiFixtureLike[],
  matchDate: string,
): FixtureMatchResult | undefined {
  if (!match.time) return undefined;

  const kickoff = new Date(`${matchDate}T${match.time}:00+02:00`).getTime();
  const candidates = fixtures.filter((fixture) =>
    Math.abs(new Date(fixture.fixture.date).getTime() - kickoff) < 120000,
  );

  if (candidates.length === 0) return undefined;

  if (hasApiTeamIds(match)) {
    const exact = candidates.find(
      (fixture) =>
        fixture.teams.home.id === match.homeApiTeamId &&
        fixture.teams.away.id === match.awayApiTeamId,
    );
    if (exact) return { fixture: exact, swapped: false, matchedBy: "api-team-ids" as const };

    const swapped = candidates.find(
      (fixture) =>
        fixture.teams.home.id === match.awayApiTeamId &&
        fixture.teams.away.id === match.homeApiTeamId,
    );
    if (swapped) return { fixture: swapped, swapped: true, matchedBy: "api-team-ids" as const };
  }

  if (candidates.length === 1) {
    return { fixture: candidates[0]!, swapped: false, matchedBy: "kickoff" as const };
  }

  return undefined;
}

function applyFixtureToMatch(
  match: LiveMatch,
  result: FixtureMatchResult,
  apiTeamDisplayMap?: LiveTeamDisplayMap,
): LiveMatch {
  const { fixture, swapped } = result;
  const fixtureHome = swapped ? fixture.teams.away : fixture.teams.home;
  const fixtureAway = swapped ? fixture.teams.home : fixture.teams.away;
  const homeDisplay = fixtureHome.id ? apiTeamDisplayMap?.[fixtureHome.id] : undefined;
  const awayDisplay = fixtureAway.id ? apiTeamDisplayMap?.[fixtureAway.id] : undefined;
  const shouldReplaceTeams = result.matchedBy === "kickoff" || !hasApiTeamIds(match);

  return {
    ...match,
    homeTeam: shouldReplaceTeams
      ? homeDisplay?.name ?? fixtureHome.name ?? match.homeTeam
      : match.homeTeam,
    awayTeam: shouldReplaceTeams
      ? awayDisplay?.name ?? fixtureAway.name ?? match.awayTeam
      : match.awayTeam,
    homeCode: shouldReplaceTeams ? homeDisplay?.code : match.homeCode,
    awayCode: shouldReplaceTeams ? awayDisplay?.code : match.awayCode,
    homeFlag: shouldReplaceTeams ? homeDisplay?.flag : match.homeFlag,
    awayFlag: shouldReplaceTeams ? awayDisplay?.flag : match.awayFlag,
    homeScore: swapped ? fixture.goals.away : fixture.goals.home,
    awayScore: swapped ? fixture.goals.home : fixture.goals.away,
    status: mapApiStatus(fixture.fixture.status.short),
    statusShort: fixture.fixture.status.short,
    elapsed: fixture.fixture.status.elapsed,
    homeApiTeamId: shouldReplaceTeams ? fixtureHome.id ?? match.homeApiTeamId : match.homeApiTeamId,
    awayApiTeamId: shouldReplaceTeams ? fixtureAway.id ?? match.awayApiTeamId : match.awayApiTeamId,
  };
}

function isRealtimeStatus(status: LiveMatch["status"]): boolean {
  return status === "live" || status === "halftime";
}

function shouldApplyFixtureToMatch(match: LiveMatch, fixture: ApiFixtureLike): boolean {
  const nextStatus = mapApiStatus(fixture.fixture.status.short);
  const currentRealtime = isRealtimeStatus(match.status);
  const nextRealtime = isRealtimeStatus(nextStatus);

  if (currentRealtime && !nextRealtime) return false;
  if (currentRealtime && nextRealtime) {
    return (fixture.fixture.status.elapsed ?? -1) >= (match.elapsed ?? -1);
  }

  if (match.homeScore !== null && match.awayScore !== null) {
    return fixture.goals.home !== null && fixture.goals.away !== null;
  }

  return true;
}

function MatchPill({ match, t, currentDate, locale = "fr" }: { match: LiveMatch; t: typeof translations.fr; currentDate?: string; locale?: "fr" | "en" | "es" | "de" }) {
  const isLive = match.status === "live" || match.status === "halftime";
  const isFinished = match.status === "finished";
  const hasScore = match.homeScore !== null && match.awayScore !== null;
  const homeName = match.homeCode ?? match.homeTeam;
  const awayName = match.awayCode ?? match.awayTeam;
  const isFutureDate = match.date && currentDate && match.date > currentDate;
  const livePeriodLabel =
    match.statusShort === "BT"
      ? t.extraBreak
      : match.statusShort === "ET"
        ? match.elapsed
          ? `${match.elapsed}'`
          : t.extraTime
        : match.statusShort === "P"
          ? t.penalties
          : match.status === "halftime"
            ? t.halftime
            : match.elapsed
              ? `${match.elapsed}'`
              : null;

  return (
    <div
      className={`flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-[11px] leading-none text-white transition-colors ${
        isLive
          ? "bg-white/20 ring-1 ring-white/30"
          : "bg-white/10 hover:bg-white/15"
      }`}
    >
      {isLive && <StatusDot status={match.status} />}
      {match.homeFlag && <span className="inline-flex h-full items-center text-xs leading-none">{match.homeFlag}</span>}
      <span className="inline-flex h-full items-center font-semibold leading-none">{homeName}</span>
      {hasScore ? (
        <span className={`inline-flex items-center font-bold leading-none tabular-nums ${isLive ? "rounded bg-white/20 px-1.5 py-0.5" : ""}`}>
          {match.homeScore}-{match.awayScore}
        </span>
      ) : (
        <span className="flex h-full flex-col items-center justify-center text-white/50 tabular-nums leading-none">
          <span>{match.time}</span>
          {isFutureDate && (
            <span className="text-[9px] text-white/40">
              {new Date(match.date + "T00:00:00").toLocaleDateString(dateLocales[locale] ?? "fr-FR", { day: "numeric", month: "short" })}
            </span>
          )}
        </span>
      )}
      <span className="inline-flex h-full items-center font-semibold leading-none">{awayName}</span>
      {match.awayFlag && <span className="inline-flex h-full items-center text-xs leading-none">{match.awayFlag}</span>}
      {isLive && livePeriodLabel && (
        <span className="inline-flex items-center rounded bg-red-500/80 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">{livePeriodLabel}</span>
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
  apiTeamDisplayMap,
}: LiveScoreBarProps) {
  const t = translations[locale ?? "fr"];
  const [matches, setMatches] = useState<LiveMatch[]>(todaysMatches);
  const railRef = useRef<HTMLDivElement>(null);
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

  // When external live data is provided (from centralized provider), use it directly.
  // Prefer team API IDs to avoid mixing simultaneous kickoffs.
  useEffect(() => {
    if (!liveFixtures || liveFixtures.length === 0 || !matchDate) return;
    setMatches((prev) =>
      prev.map((m) => {
        const result = findFixtureForMatch(m, liveFixtures, matchDate);
        return result && shouldApplyFixtureToMatch(m, result.fixture)
          ? applyFixtureToMatch(m, result, apiTeamDisplayMap)
          : m;
      })
    );
  }, [liveFixtures, matchDate, apiTeamDisplayMap]);

  // Fetch today's results (one-time) to show scores for finished matches
  // Also fetches previous UTC day to catch matches crossing midnight
  // (e.g., 00:00 CEST = 22:00 UTC previous day)
  useEffect(() => {
    if (hasExternalData || !matchDate) return;
    let cancelled = false;
    const fetchResults = async () => {
      try {
        const prevDay = new Date(new Date(matchDate + "T12:00:00Z").getTime() - 86400000)
          .toISOString().slice(0, 10);

        const [res1, res2] = await Promise.all([
          fetch(`/api/fixtures?date=${matchDate}`),
          fetch(`/api/fixtures?date=${prevDay}`),
        ]);

        const d1 = res1.ok ? await res1.json() : [];
        const d2 = res2.ok ? await res2.json() : [];
        const allFixtures = [
          ...(Array.isArray(d1) ? d1 : []),
          ...(Array.isArray(d2) ? d2 : []),
        ];
        if (allFixtures.length === 0) return;
        if (cancelled) return;

        setMatches((prev) =>
          prev.map((m) => {
            const result = findFixtureForMatch(m, allFixtures as ApiFixtureLike[], matchDate);
            return result && shouldApplyFixtureToMatch(m, result.fixture)
              ? applyFixtureToMatch(m, result, apiTeamDisplayMap)
              : m;
          })
        );
      } catch {
        // Silently fail
      }
    };
    fetchResults();
    return () => {
      cancelled = true;
    };
  }, [hasExternalData, matchDate, apiTeamDisplayMap]);

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
        setMatches((prev) =>
          prev.map((m) => {
            if (!matchDate) return m;
            const result = findFixtureForMatch(m, data as ApiFixtureLike[], matchDate);
            return result && shouldApplyFixtureToMatch(m, result.fixture)
              ? applyFixtureToMatch(m, result, apiTeamDisplayMap)
              : m;
          })
        );
      }
    } catch {
      // Silently fail — keep showing static data
    }
  }, [apiEndpoint, hasExternalData, matchDate, apiTeamDisplayMap]);

  useEffect(() => {
    if (hasExternalData) return; // Skip: data comes from provider
    fetchLive();
    const interval = setInterval(fetchLive, pollInterval);
    return () => clearInterval(interval);
  }, [fetchLive, pollInterval, hasExternalData]);

  useEffect(() => {
    railRef.current?.scrollTo({ left: 0 });
  }, [matches.length]);

  if (matches.length === 0 || isStale) return null;

  const hasLive = matches.some((m) => m.status === "live" || m.status === "halftime");

  return (
    <div className="h-12 border-b border-white/5 bg-primary overflow-hidden">
      <div className="mx-auto h-full max-w-7xl min-w-0 px-0 sm:px-4">
        <div
          ref={railRef}
          className="scrollbar-hide flex h-full min-w-0 items-center justify-start gap-2 overflow-x-auto overscroll-x-contain px-4 py-0 lg:justify-center"
          style={{ paddingTop: 1 }}
        >
          <span className="flex h-7 shrink-0 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold uppercase leading-none tracking-wider text-white/70">
            {hasLive && <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />}
            {hasLive ? t.live : t.today}
          </span>
          <span className="h-4 w-px shrink-0 bg-white/10" />
          {matches.map((match) => (
            <a
              key={match.id}
              href={match.slug ? `${matchBasePath}/${match.slug}` : "#"}
              className="flex h-7 shrink-0 items-center"
            >
              <MatchPill match={match} t={t} currentDate={matchDate} locale={locale} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
});

function mapApiStatus(short: string): LiveMatch["status"] {
  const liveStatuses = ["1H", "2H", "BT", "ET", "P"];
  if (liveStatuses.includes(short)) return "live";
  if (short === "HT") return "halftime";
  if (["FT", "AET", "PEN"].includes(short)) return "finished";
  return "upcoming";
}
