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
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
}

interface LiveDataContextType {
  /** Raw live fixtures from /api/live — shared across all consumers */
  liveFixtures: ApiFixture[];
}

const LiveDataContext = createContext<LiveDataContextType>({
  liveFixtures: [],
});

/**
 * Hook to access centralized live fixture data.
 * Must be used within a LiveDataProvider.
 */
export function useLiveData() {
  return useContext(LiveDataContext);
}

/**
 * LiveDataProvider — Single source of truth for live match data.
 *
 * Polls /api/live once every 30s during the tournament window.
 * All consumers (LiveScoreBar, LiveMatchWidget) share the same data,
 * eliminating minute discrepancies between components.
 */
export function LiveDataProvider({ children }: { children: ReactNode }) {
  const [liveFixtures, setLiveFixtures] = useState<ApiFixture[]>([]);

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

  useEffect(() => {
    fetchLive();
    const interval = setInterval(fetchLive, 30000);
    return () => clearInterval(interval);
  }, [fetchLive]);

  return (
    <LiveDataContext.Provider value={{ liveFixtures }}>
      {children}
    </LiveDataContext.Provider>
  );
}
