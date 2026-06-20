import { getFixturesByDate } from "@repo/api/football";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json([], { status: 400 });
  }

  try {
    const fixtures = await getFixturesByDate(date);

    return Response.json(fixtures, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60",
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
