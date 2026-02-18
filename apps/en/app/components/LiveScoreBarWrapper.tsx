import { getTodaysMatches } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data";
import { LiveScoreBar, type LiveMatch } from "@repo/ui/live-score-bar";

/**
 * Server-side wrapper for LiveScoreBar.
 * Prepares today's static match data as fallback, then hydrates
 * with live API data on the client.
 */
export function LiveScoreBarWrapper() {
  const todaysMatches = getTodaysMatches();

  if (todaysMatches.length === 0) return null;

  const liveMatches: LiveMatch[] = todaysMatches.map((m) => ({
    id: m.id,
    homeTeam: teamsById[m.homeTeamId]?.name ?? m.homeTeamId,
    awayTeam: teamsById[m.awayTeamId]?.name ?? m.awayTeamId,
    homeScore: null,
    awayScore: null,
    status: "upcoming",
    elapsed: null,
    time: m.time,
    slug: m.slug,
  }));

  return (
    <LiveScoreBar
      todaysMatches={liveMatches}
      matchBasePath="/match"
      locale="en"
    />
  );
}
