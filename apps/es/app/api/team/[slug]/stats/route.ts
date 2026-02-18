import { teamsBySlug } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { playersByTeamId } from "@repo/data/players";
import { matches } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { getAltitudeImpact } from "@repo/api/factors";
import { getTravelFatigue, teamSlugSchema } from "@repo/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const validated = teamSlugSchema.safeParse(slug);
  if (!validated.success) {
    return Response.json({ error: "Invalid team slug" }, { status: 400 });
  }

  const team = teamsBySlug[slug];
  if (!team) {
    return Response.json({ error: "Team not found" }, { status: 404 });
  }

  const prediction = predictionsByTeamId[team.id] ?? null;
  const players = playersByTeamId[team.id] ?? [];

  // Calculate travel fatigue based on team's first match venue
  const firstMatch = matches.find(m => m.homeTeamId === team.id || m.awayTeamId === team.id);
  const firstStadium = firstMatch ? stadiumsById[firstMatch.stadiumId] : null;
  const citySlug = firstStadium?.cityId ?? "new-york-new-jersey";
  const travelFatigue = getTravelFatigue(team.confederation, citySlug);

  // Altitude impact at Mexico City (worst case)
  const altitudeImpactMexico = getAltitudeImpact("estadio-azteca");

  return Response.json(
    {
      team,
      prediction,
      playerCount: players.length,
      travelFatigue,
      altitudeImpactMexico,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=86400, stale-while-revalidate=3600",
      },
    }
  );
}
