"use client";

import { useState, useEffect } from "react";
import { LiveScoreBar, type LiveMatch } from "@repo/ui/live-score-bar";
import { useLiveData } from "../providers/LiveDataProvider";
import type { ApiFixture } from "../providers/LiveDataProvider";

const STATUS_MAP: Record<string, LiveMatch["status"]> = {
  "1H": "live",
  "2H": "live",
  ET: "live",
  P: "live",
  HT: "halftime",
  FT: "finished",
  AET: "finished",
  PEN: "finished",
  NS: "upcoming",
  TBD: "upcoming",
};

interface ConnectedLiveScoreBarProps {
  todaysMatches: LiveMatch[];
  matchDate: string;
}

/** Get today's date as YYYY-MM-DD in local timezone. */
function getLocalToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/** Convert API fixtures to LiveMatch format for display. */
function fixturesToLiveMatches(fixtures: ApiFixture[]): LiveMatch[] {
  return fixtures.map((f) => ({
    id: String(f.fixture.id),
    homeTeam: f.teams.home.name,
    awayTeam: f.teams.away.name,
    homeScore: f.goals.home,
    awayScore: f.goals.away,
    status: STATUS_MAP[f.fixture.status.short] ?? "upcoming",
    elapsed: f.fixture.status.elapsed,
    time: new Date(f.fixture.date).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    }),
    slug: "",
  }));
}

/**
 * Client bridge: reads centralized live data and passes it to LiveScoreBar.
 * When server-rendered data is stale (different date), builds match list
 * from today's API fixtures client-side.
 */
export function ConnectedLiveScoreBar({ todaysMatches, matchDate }: ConnectedLiveScoreBarProps) {
  const { liveFixtures, todaysFixtures } = useLiveData();
  const [clientToday] = useState(() => getLocalToday());
  const isStale = matchDate !== clientToday;

  // When server data is stale, use today's fixtures from API instead
  const effectiveMatches = isStale && todaysFixtures.length > 0
    ? fixturesToLiveMatches(todaysFixtures)
    : todaysMatches;

  const effectiveDate = isStale ? clientToday : matchDate;

  // Don't render if stale and no API data yet
  if (isStale && todaysFixtures.length === 0) return null;

  return (
    <LiveScoreBar
      todaysMatches={effectiveMatches}
      matchBasePath="/match"
      matchDate={effectiveDate}
      locale="fr"
      liveFixtures={liveFixtures.length > 0 ? liveFixtures : undefined}
    />
  );
}
