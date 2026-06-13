import { getTodaysMatches } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data";
import type { LiveMatch } from "@repo/ui/live-score-bar";
import { ConnectedLiveScoreBar } from "./ConnectedLiveScoreBar";

/**
 * Server-side wrapper for LiveScoreBar.
 * Shows today's matches only.
 */
export function LiveScoreBarWrapper() {
  const todaysMatches = getTodaysMatches();
  if (todaysMatches.length === 0) return null;

  const matchDate = todaysMatches[0]!.date;

  const liveMatches: LiveMatch[] = todaysMatches.map((m) => ({
    id: m.id,
    homeTeam: teamsById[m.homeTeamId]?.name ?? m.homeTeamId,
    awayTeam: teamsById[m.awayTeamId]?.name ?? m.awayTeamId,
    homeCode: teamsById[m.homeTeamId]?.code,
    awayCode: teamsById[m.awayTeamId]?.code,
    homeFlag: teamsById[m.homeTeamId]?.flag,
    awayFlag: teamsById[m.awayTeamId]?.flag,
    homeScore: null,
    awayScore: null,
    status: "upcoming" as const,
    elapsed: null,
    time: m.time,
    slug: m.slug,
    date: m.date,
  }));

  return (
    <ConnectedLiveScoreBar
      todaysMatches={liveMatches}
      matchDate={matchDate}
    />
  );
}
