"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

/**
 * Raw API-Football fixture shape (subset used by live components).
 */
export interface ApiFixture {
  fixture: {
    id: number;
    date: string;
    status: { short: string; elapsed: number | null };
  };
  teams: { home: { id?: number; name: string }; away: { id?: number; name: string } };
  goals: { home: number | null; away: number | null };
}

interface LiveDataContextType {
  /** Raw live fixtures from /api/live — shared across all consumers */
  liveFixtures: ApiFixture[];
  /** All fixtures for today (live + finished + upcoming) from /api/fixtures */
  todaysFixtures: ApiFixture[];
}

const LiveDataContext = createContext<LiveDataContextType>({
  liveFixtures: [],
  todaysFixtures: [],
});

/**
 * Hook to access centralized live fixture data.
 * Must be used within a LiveDataProvider.
 */
export function useLiveData() {
  return useContext(LiveDataContext);
}

/** Get today's date as YYYY-MM-DD in local timezone. */
function getLocalToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * LiveDataProvider — Single source of truth for live match data.
 *
 * - Polls /api/live every 30s for in-progress matches
 * - Fetches /api/fixtures?date=TODAY once on mount (+ every 5min)
 *   to get scores of finished matches
 *
 * All consumers (LiveScoreBar, LiveMatchWidget) share the same data.
 */
export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [liveFixtures, setLiveFixtures] = useState<ApiFixture[]>([]);
  const [todaysFixtures, setTodaysFixtures] = useState<ApiFixture[]>([]);

  const fetchLive = useCallback(async () => {
    const tournamentStart = new Date("2026-06-11T00:00:00+02:00");
    const tournamentEnd = new Date("2026-07-19T23:59:59+02:00");
    const now = new Date();
    if (now < tournamentStart || now > tournamentEnd) return;

    try {
      const res = await fetch("/api/live");
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data)) setLiveFixtures(data);
    } catch {
      // Silently fail — keep previous data
    }
  }, []);

  const fetchTodaysFixtures = useCallback(async () => {
    const tournamentStart = new Date("2026-06-11T00:00:00+02:00");
    const tournamentEnd = new Date("2026-07-19T23:59:59+02:00");
    const now = new Date();
    if (now < tournamentStart || now > tournamentEnd) return;

    try {
      const today = getLocalToday();
      // Also fetch previous UTC day for matches crossing midnight
      // (e.g., 00:00 CEST = 22:00 UTC previous day)
      const prevDay = new Date(new Date(today + "T12:00:00Z").getTime() - 86400000)
        .toISOString().slice(0, 10);

      const [res1, res2] = await Promise.all([
        fetch(`/api/fixtures?date=${today}`),
        fetch(`/api/fixtures?date=${prevDay}`),
      ]);

      const d1 = res1.ok ? await res1.json() : [];
      const d2 = res2.ok ? await res2.json() : [];

      // Merge and deduplicate by fixture ID
      const seen = new Set<number>();
      const merged: ApiFixture[] = [];
      for (const f of [...(Array.isArray(d1) ? d1 : []), ...(Array.isArray(d2) ? d2 : [])]) {
        if (!seen.has(f.fixture.id)) {
          seen.add(f.fixture.id);
          merged.push(f);
        }
      }

      setTodaysFixtures(merged);
    } catch {
      // Silently fail
    }
  }, []);

  useEffect(() => {
    fetchLive();
    fetchTodaysFixtures();
    const liveInterval = setInterval(fetchLive, 30000);
    const fixturesInterval = setInterval(fetchTodaysFixtures, 300000); // every 5min
    return () => {
      clearInterval(liveInterval);
      clearInterval(fixturesInterval);
    };
  }, [fetchLive, fetchTodaysFixtures]);

  return (
    <LiveDataContext.Provider value={{ liveFixtures, todaysFixtures }}>
      {children}
    </LiveDataContext.Provider>
  );
}
