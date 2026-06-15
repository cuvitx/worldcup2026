import { getTodaysMatches } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data";
import { teamApiIds } from "@repo/data/api-football-ids";
import type { LiveMatch } from "@repo/ui/live-score-bar";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { ConnectedLiveScoreBar } from "./ConnectedLiveScoreBar";

const STATUS_MAP: Record<string, LiveMatch["status"]> = {
  finished: "finished",
  live: "live",
  scheduled: "upcoming",
};

/**
 * Server-side wrapper for LiveScoreBar.
 * Enriches today's matches with API scores on the server (ISR),
 * so finished-match scores are in the initial HTML — no JS needed.
 * Client-side LiveDataProvider adds live updates on top.
 */
export async function LiveScoreBarWrapper() {
  const todaysMatches = getTodaysMatches();
  if (todaysMatches.length === 0) return null;

  // Server-side score enrichment (same as match pages)
  const enriched = await enrichMatchesWithResults(todaysMatches);
  const matchDate = todaysMatches[0]!.date;

  const liveMatches: LiveMatch[] = enriched.map((m) => ({
    id: m.id,
    homeTeam: teamsById[m.homeTeamId]?.name ?? m.homeTeamId,
    awayTeam: teamsById[m.awayTeamId]?.name ?? m.awayTeamId,
    homeCode: teamsById[m.homeTeamId]?.code,
    awayCode: teamsById[m.awayTeamId]?.code,
    homeFlag: teamsById[m.homeTeamId]?.flag,
    awayFlag: teamsById[m.awayTeamId]?.flag,
    homeScore: m.homeScore ?? null,
    awayScore: m.awayScore ?? null,
    status: STATUS_MAP[m.status ?? "scheduled"] ?? "upcoming",
    elapsed: null,
    time: m.time,
    slug: m.slug,
    date: m.date,
    homeApiTeamId: teamApiIds[m.homeTeamId] ?? 0,
    awayApiTeamId: teamApiIds[m.awayTeamId] ?? 0,
  }));

  return (
    <ConnectedLiveScoreBar
      todaysMatches={liveMatches}
      matchDate={matchDate}
    />
  );
}
