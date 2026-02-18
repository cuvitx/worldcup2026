import { getLiveFixtures } from "@repo/api/football";

export async function GET() {
  try {
    const fixtures = await getLiveFixtures();

    return Response.json(fixtures, {
      headers: {
        "Cache-Control": "s-maxage=30, stale-while-revalidate=10",
      },
    });
  } catch {
    return Response.json([], {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
      },
    });
  }
}
