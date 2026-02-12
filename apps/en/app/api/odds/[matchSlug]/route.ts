import { matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { getOddsForMatch } from "@repo/api/odds";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ matchSlug: string }> }
) {
  const { matchSlug } = await params;
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
