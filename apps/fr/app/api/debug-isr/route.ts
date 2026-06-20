import { enrichMatchesWithResults, resolveApiFixtureId } from "@repo/api/football/match-results";
import { matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { generateFullMatchPreview } from "@repo/ai/generators";
import { getMatchPhase } from "@repo/data/tournament-state";

/**
 * GET /api/debug-isr?slug=pays-bas-vs-suede
 * Diagnostic endpoint to test the same code path as match detail pages.
 * Exercises: enrichMatchesWithResults, resolveApiFixtureId, generateFullMatchPreview
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

  // Step 1: enrichMatchesWithResults
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

  // Step 2: resolveApiFixtureId
  try {
    const fixtureId = await resolveApiFixtureId(staticMatch);
    steps.fixtureId = fixtureId;
  } catch (err) {
    steps.fixtureIdError = err instanceof Error ? err.message : String(err);
  }

  // Step 3: generateFullMatchPreview (with timeout)
  if (process.env.GEMINI_API_KEY) {
    try {
      const aiResult = await Promise.race([
        generateFullMatchPreview(slug, "fr", { includeExpert: false }),
        new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 15_000)),
      ]);
      steps.aiResult = aiResult === "timeout" ? "TIMEOUT_15s" : (aiResult ? "ok" : "null");
    } catch (err) {
      steps.aiError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    }
  } else {
    steps.aiResult = "skipped_no_key";
  }

  return Response.json(steps, {
    headers: { "Cache-Control": "no-store" },
  });
}
