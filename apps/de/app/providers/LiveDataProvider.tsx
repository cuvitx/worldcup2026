"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

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
  liveFixtures: ApiFixture[];
  todaysFixtures: ApiFixture[];
}

const LiveDataContext = createContext<LiveDataContextType>({
  liveFixtures: [],
  todaysFixtures: [],
});

export function useLiveData() {
  return useContext(LiveDataContext);
}

function getLocalToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

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
      const prevDay = new Date(new Date(today + "T12:00:00Z").getTime() - 86400000)
        .toISOString().slice(0, 10);

      const [res1, res2] = await Promise.all([
        fetch(`/api/fixtures?date=${today}`),
        fetch(`/api/fixtures?date=${prevDay}`),
      ]);

      const d1 = res1.ok ? await res1.json() : [];
      const d2 = res2.ok ? await res2.json() : [];

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
    const liveInterval = setInterval(fetchLive, 60000);
    const fixturesInterval = setInterval(fetchTodaysFixtures, 300000);
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
