import { getFixturesByDate } from "@repo/api/football";

function isRecentFixtureDate(date: string): boolean {
  const requested = Date.parse(`${date}T12:00:00Z`);
  if (Number.isNaN(requested)) return false;

  const now = new Date();
  const todayNoonUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    12,
    0,
    0,
  );

  return Math.abs(requested - todayNoonUtc) / 3_600_000 <= 36;
}

/**
 * GET /api/fixtures?date=2026-06-11
 * Returns fixtures for a given date (finished, live, or upcoming).
 * Used by LiveMatchWidget to display final scores for completed matches.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json([], { status: 400 });
  }

  try {
    const fixtures = await getFixturesByDate(date);
    const cacheControl = isRecentFixtureDate(date)
      ? "s-maxage=30, stale-while-revalidate=10"
      : "s-maxage=300, stale-while-revalidate=60";

    return Response.json(fixtures, {
      headers: {
        "Cache-Control": cacheControl,
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
