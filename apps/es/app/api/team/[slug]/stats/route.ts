import { teamsBySlug } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { playersByTeamId } from "@repo/data/players";
import { getAltitudeImpact } from "@repo/api/factors";
import { getTravelFatigue } from "@repo/api";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  if (!team) {
    return Response.json({ error: "Team not found" }, { status: 404 });
  }

  const prediction = predictionsByTeamId[team.id] ?? null;
  const players = playersByTeamId[team.id] ?? [];

  // Calculate travel fatigue for US venues (most common)
  const travelFatigue = getTravelFatigue(team.confederation, "new-york-new-jersey");

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
