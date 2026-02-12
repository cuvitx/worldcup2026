import { matchesBySlug } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { getWeatherForecast } from "@repo/api/weather";
import { getWeatherImpact } from "@repo/api";
import { getAltitudeImpact } from "@repo/api/factors";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ matchSlug: string }> }
) {
  const { matchSlug } = await params;
  const match = matchesBySlug[matchSlug];
  if (!match) {
    return Response.json({ error: "Match not found" }, { status: 404 });
  }

  const stadium = stadiumsById[match.stadiumId];
  if (!stadium) {
    return Response.json({ error: "Stadium not found" }, { status: 404 });
  }

  const forecast = await getWeatherForecast(
    stadium.latitude,
    stadium.longitude,
    match.date
  );

  const altitude = getAltitudeImpact(stadium.slug);
  const impact = getWeatherImpact(forecast, altitude.altitude);

  return Response.json(
    { forecast, altitude, impact },
    {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=300",
      },
    }
  );
}
