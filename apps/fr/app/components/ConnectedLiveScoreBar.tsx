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
  const { liveFixtures } = useLiveData();
  const [clientToday] = useState(() => getLocalToday());
  const isStale = matchDate !== clientToday;

  // When server data is stale (wrong date), hide the bar entirely.
  // The next page load will server-render the correct date.
  if (isStale) return null;

  return (
    <LiveScoreBar
      todaysMatches={todaysMatches}
      matchBasePath="/match"
      matchDate={matchDate}
      locale="fr"
      liveFixtures={liveFixtures.length > 0 ? liveFixtures : undefined}
    />
  );
}
