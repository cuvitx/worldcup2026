"use client";

import { useState } from "react";
import { LiveScoreBar, type LiveMatch } from "@repo/ui/live-score-bar";
import { useLiveData } from "../providers/LiveDataProvider";

interface ConnectedLiveScoreBarProps {
  todaysMatches: LiveMatch[];
  matchDate: string;
}

/** Get today's date as YYYY-MM-DD in local timezone. */
function getLocalToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

/**
 * Client bridge: reads centralized live data and passes it to LiveScoreBar.
 * When server-rendered data is stale (different date), hides the bar.
 */
export function ConnectedLiveScoreBar({ todaysMatches, matchDate }: ConnectedLiveScoreBarProps) {
  const { liveFixtures, todaysFixtures } = useLiveData();
  const [clientToday] = useState(() => getLocalToday());
  const isStale = matchDate !== clientToday;

  // When server data is stale (wrong date), hide the bar entirely.
  // The next page load will server-render the correct date.
  if (isStale) return null;

  // Merge live + today's fixtures: live first (fresher elapsed), then finished
  // Dedup by fixture ID so each match appears only once
  const seenIds = new Set<number>();
  const allFixtures: typeof liveFixtures = [];
  for (const f of [...liveFixtures, ...todaysFixtures]) {
    if (!seenIds.has(f.fixture.id)) {
      seenIds.add(f.fixture.id);
      allFixtures.push(f);
    }
  }

  return (
    <LiveScoreBar
      todaysMatches={todaysMatches}
      matchBasePath="/spiel"
      matchDate={matchDate}
      locale="de"
      liveFixtures={allFixtures.length > 0 ? allFixtures : undefined}
    />
  );
}
