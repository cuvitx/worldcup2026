import { getTodaysMatches } from "@repo/data/tournament-state";
import { matches as allMatches } from "@repo/data/matches";
import { teamsById } from "@repo/data";
import type { LiveMatch } from "@repo/ui/live-score-bar";
import { ConnectedLiveScoreBar } from "./ConnectedLiveScoreBar";

/**
 * Server-side wrapper for LiveScoreBar.
 * Shows today's matches + next day's upcoming matches.
 */
export function LiveScoreBarWrapper() {
  const todaysMatches = getTodaysMatches();
  const todayISO = new Date().toISOString().slice(0, 10);

  // Get next day's matches if today has few matches or to fill the bar
  const futureDates = [...new Set(
    allMatches
      .filter((m) => m.date > todayISO)
      .map((m) => m.date)
  )].sort();
  const nextDate = futureDates[0];
  const nextDayMatches = nextDate
    ? allMatches.filter((m) => m.date === nextDate).sort((a, b) => a.time.localeCompare(b.time))
    : [];

  const combined = [...todaysMatches, ...nextDayMatches];
  if (combined.length === 0) return null;

  const matchDate = todayISO;

  const liveMatches: LiveMatch[] = combined.map((m) => ({
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
