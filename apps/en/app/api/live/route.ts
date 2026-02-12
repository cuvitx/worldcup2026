import { getLiveFixtures } from "@repo/api/football";

export async function GET() {
  const fixtures = await getLiveFixtures();

  return Response.json(fixtures, {
    headers: {
      "Cache-Control": "s-maxage=30, stale-while-revalidate=10",
    },
  });
}
