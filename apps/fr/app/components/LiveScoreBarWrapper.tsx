import { getTodaysMatches } from "@repo/data/tournament-state";
import { teamsById } from "@repo/data";
import { teamApiIds } from "@repo/data/api-football-ids";
import { matches } from "@repo/data/matches";
import type { LiveMatch, LiveTeamDisplayMap } from "@repo/ui/live-score-bar";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { needsKnockoutTeamResolution } from "../../lib/knockout-match-teams";
import { resolveMatchTeamsWithResults } from "../../lib/knockout-match-teams-runtime";
import { ConnectedLiveScoreBar } from "./ConnectedLiveScoreBar";

const STATUS_MAP: Record<string, LiveMatch["status"]> = {
  finished: "finished",
  live: "live",
  scheduled: "upcoming",
};

function teamNameMap() {
  return Object.fromEntries(
    Object.entries(teamsById).map(([id, team]) => [id, team.name]),
  );
}

function apiTeamDisplayMap(): LiveTeamDisplayMap {
  const map: LiveTeamDisplayMap = {};
  for (const [teamId, apiTeamId] of Object.entries(teamApiIds)) {
    const team = teamsById[teamId];
    if (team && apiTeamId) {
      map[apiTeamId] = { name: team.name, code: team.code, flag: team.flag };
    }
  }
  return map;
}

/**
 * Server-side wrapper for LiveScoreBar.
 * Enriches today's matches with API scores on the server (ISR),
 * so finished-match scores are in the initial HTML — no JS needed.
 * Client-side LiveDataProvider adds live updates on top.
 */
export async function LiveScoreBarWrapper() {
  const todaysMatches = getTodaysMatches();
  if (todaysMatches.length === 0) return null;

  const hasKnockoutSlots = todaysMatches.some(needsKnockoutTeamResolution);
  const namesByTeamId = teamNameMap();
  const sourceMatches = hasKnockoutSlots
    ? await enrichMatchesWithResults(matches, namesByTeamId)
    : await enrichMatchesWithResults(todaysMatches, namesByTeamId);
  const sourceById = new Map(sourceMatches.map((match) => [match.id, match]));
  const enriched = todaysMatches.map((match) => sourceById.get(match.id) ?? match);
  const matchDate = todaysMatches[0]!.date;

  const liveMatches: LiveMatch[] = await Promise.all(enriched.map(async (m) => {
    const needsResolution = needsKnockoutTeamResolution(m);
    const resolved = needsResolution
      ? await resolveMatchTeamsWithResults(m, "À déterminer", sourceMatches)
      : null;
    const homeTeamId = resolved?.homeTeamId ?? m.homeTeamId;
    const awayTeamId = resolved?.awayTeamId ?? m.awayTeamId;
    const home = resolved?.home ?? teamsById[homeTeamId];
    const away = resolved?.away ?? teamsById[awayTeamId];

    return {
      id: m.id,
      homeTeam: resolved?.homeName ?? home?.name ?? m.homeTeamId,
      awayTeam: resolved?.awayName ?? away?.name ?? m.awayTeamId,
      homeCode: home?.code,
      awayCode: away?.code,
      homeFlag: home?.flag,
      awayFlag: away?.flag,
      homeScore: m.homeScore ?? null,
      awayScore: m.awayScore ?? null,
      status: STATUS_MAP[m.status ?? "scheduled"] ?? "upcoming",
      elapsed: null,
      time: m.time,
      slug: m.slug,
      date: m.date,
      homeApiTeamId: teamApiIds[homeTeamId] ?? 0,
      awayApiTeamId: teamApiIds[awayTeamId] ?? 0,
    };
  }));

  return (
    <ConnectedLiveScoreBar
      todaysMatches={liveMatches}
      matchDate={matchDate}
      apiTeamDisplayMap={apiTeamDisplayMap()}
    />
  );
}
