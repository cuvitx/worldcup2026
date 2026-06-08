import { matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { getOddsForMatch } from "@repo/api/odds";
import { matchSlugSchema } from "@repo/api";

/**
 * Fetch betting odds for a specific match via match slug
 * @param {Request} _req - Next.js request object (unused)
 * @param {{ params: Promise<{ matchSlug: string }> }} params - Route params with match slug
 * @returns {Promise<Response>} JSON response with odds data or error
 * @example
 * // GET /api/odds/france-allemagne-demi-finale
 * // Returns: odds object with 5min cache
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ matchSlug: string }> }
) {
  const { matchSlug } = await params;

  const validated = matchSlugSchema.safeParse(matchSlug);
  if (!validated.success) {
    return Response.json({ error: "Invalid match slug" }, { status: 400 });
  }

  const match = matchesBySlug[matchSlug];
  if (!match) {
    return Response.json({ error: "Match not found" }, { status: 404 });
  }

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  if (!home || !away) {
    return Response.json({ error: "Teams not found" }, { status: 404 });
  }

  const odds = await getOddsForMatch(home.name, away.name);

  return Response.json(odds ?? { message: "Odds not available yet" }, {
    headers: {
      "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
    },
  });
}
