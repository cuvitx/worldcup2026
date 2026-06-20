import { enrichMatchesWithResults, resolveApiFixtureId, getMatchResults } from "@repo/api/football/match-results";
import { getWorldCupFixtures } from "@repo/api/football";
import { matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { teamApiIds } from "@repo/data/api-football-ids";
import { getMatchPhase } from "@repo/data/tournament-state";

/**
 * GET /api/debug-isr?slug=pays-bas-vs-suede
 * Diagnostic endpoint to test the same code path as match detail pages.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") ?? "pays-bas-vs-suede";

  const steps: Record<string, unknown> = {
    slug,
    isBuild: process.env.NEXT_PHASE === "phase-production-build",
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasApiKey: !!process.env.API_FOOTBALL_KEY,
    nextPhase: process.env.NEXT_PHASE ?? "not-set",
    timestamp: new Date().toISOString(),
  };

  const staticMatch = matchesBySlug[slug];
  if (!staticMatch) {
    return Response.json({ error: "match not found", ...steps });
  }

  steps.matchPhase = getMatchPhase(staticMatch.date, staticMatch.time);
  steps.teamApiIds = {
    home: teamApiIds[staticMatch.homeTeamId] ?? "missing",
    away: teamApiIds[staticMatch.awayTeamId] ?? "missing",
  };

  // Step 1: Raw API call — getWorldCupFixtures
  try {
    const fixtures = await getWorldCupFixtures();
    steps.fixturesCount = fixtures.length;
    if (fixtures.length > 0) {
      steps.fixturesSample = fixtures.slice(0, 3).map((f) => ({
        id: f.fixture.id,
        status: f.fixture.status.short,
        homeId: f.teams.home.id,
        awayId: f.teams.away.id,
        homeName: f.teams.home.name,
        awayName: f.teams.away.name,
        goals: `${f.goals.home ?? "?"}-${f.goals.away ?? "?"}`,
      }));
    }
  } catch (err) {
    steps.fixturesError = err instanceof Error ? err.message : String(err);
  }

  // Step 2: getMatchResults (parsed)
  try {
    const results = await getMatchResults();
    steps.matchResultsCount = results.length;
  } catch (err) {
    steps.matchResultsError = err instanceof Error ? err.message : String(err);
  }

  // Step 3: enrichMatchesWithResults
  try {
    const home = teamsById[staticMatch.homeTeamId];
    const away = teamsById[staticMatch.awayTeamId];
    const teamNameMap: Record<string, string> = {};
    if (home) teamNameMap[home.id] = home.name;
    if (away) teamNameMap[away.id] = away.name;
    const enriched = await enrichMatchesWithResults([staticMatch], teamNameMap);
    const match = enriched[0];
    steps.enrichOk = true;
    steps.enrichedScore = match ? `${match.homeScore ?? "null"}-${match.awayScore ?? "null"}` : "no match";
    steps.enrichedStatus = match?.status ?? "unknown";
  } catch (err) {
    steps.enrichOk = false;
    steps.enrichError = err instanceof Error ? err.message : String(err);
  }

  // Step 4: resolveApiFixtureId
  try {
    const fixtureId = await resolveApiFixtureId(staticMatch);
    steps.fixtureId = fixtureId;
  } catch (err) {
    steps.fixtureIdError = err instanceof Error ? err.message : String(err);
  }


  return Response.json(steps, {
    headers: { "Cache-Control": "no-store" },
  });
}
