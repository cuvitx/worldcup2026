"use client";

import { LiveScoreBar, type LiveMatch } from "@repo/ui/live-score-bar";
import { useLiveData } from "../providers/LiveDataProvider";

interface ConnectedLiveScoreBarProps {
  todaysMatches: LiveMatch[];
  matchDate: string;
}

/**
 * Client bridge: reads centralized live data and passes it to LiveScoreBar.
 */
export function ConnectedLiveScoreBar({ todaysMatches, matchDate }: ConnectedLiveScoreBarProps) {
  const { liveFixtures } = useLiveData();

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
