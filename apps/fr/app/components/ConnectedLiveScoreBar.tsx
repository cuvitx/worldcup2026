"use client";

import { useState } from "react";
import {
  LiveScoreBar,
  type LiveMatch,
  type LiveTeamDisplayMap,
} from "@repo/ui/live-score-bar";
import { useLiveData } from "../providers/LiveDataProvider";

interface ConnectedLiveScoreBarProps {
  todaysMatches: LiveMatch[];
  matchDate: string;
  apiTeamDisplayMap: LiveTeamDisplayMap;
}

/** Get today's date as YYYY-MM-DD in local timezone. */
function getLocalToday(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

type ApiFixture = ReturnType<typeof useLiveData>["liveFixtures"][number];

const LIVE_STATUS_ORDER: Record<string, number> = {
  "1H": 1,
  HT: 2,
  "2H": 3,
  BT: 4,
  ET: 5,
  P: 6,
};

function isLiveStatus(short: string): boolean {
  return short in LIVE_STATUS_ORDER;
}

function hasScore(fixture: ApiFixture): boolean {
  return fixture.goals.home !== null && fixture.goals.away !== null;
}

function isFresherFixture(candidate: ApiFixture, current: ApiFixture): boolean {
  const candidateLive = isLiveStatus(candidate.fixture.status.short);
  const currentLive = isLiveStatus(current.fixture.status.short);

  if (candidateLive !== currentLive) return candidateLive;
  if (candidateLive && currentLive) {
    const candidateOrder = LIVE_STATUS_ORDER[candidate.fixture.status.short] ?? 0;
    const currentOrder = LIVE_STATUS_ORDER[current.fixture.status.short] ?? 0;
    if (candidateOrder !== currentOrder) return candidateOrder > currentOrder;

    return (candidate.fixture.status.elapsed ?? -1) >= (current.fixture.status.elapsed ?? -1);
  }

  return hasScore(candidate) && !hasScore(current);
}

function mergeFreshFixtures(liveFixtures: ApiFixture[], todaysFixtures: ApiFixture[]): ApiFixture[] {
  const byId = new Map<number, ApiFixture>();
  for (const fixture of [...todaysFixtures, ...liveFixtures]) {
    const current = byId.get(fixture.fixture.id);
    if (!current || isFresherFixture(fixture, current)) {
      byId.set(fixture.fixture.id, fixture);
    }
  }
  return [...byId.values()];
}

/**
 * Client bridge: reads centralized live data and passes it to LiveScoreBar.
 * When server-rendered data is stale (different date), hides the bar.
 */
export function ConnectedLiveScoreBar({
  todaysMatches,
  matchDate,
  apiTeamDisplayMap,
}: ConnectedLiveScoreBarProps) {
  const { liveFixtures, todaysFixtures } = useLiveData();
  const [clientToday] = useState(() => getLocalToday());
  const isStale = matchDate !== clientToday;

  // When server data is stale (wrong date), hide the bar entirely.
  // The next page load will server-render the correct date.
  if (isStale) return null;

  const allFixtures = mergeFreshFixtures(liveFixtures, todaysFixtures);

  return (
    <LiveScoreBar
      todaysMatches={todaysMatches}
      matchBasePath="/match"
      matchDate={matchDate}
      locale="fr"
      liveFixtures={allFixtures.length > 0 ? allFixtures : undefined}
      apiTeamDisplayMap={apiTeamDisplayMap}
    />
  );
}
