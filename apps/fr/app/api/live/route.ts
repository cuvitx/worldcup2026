import { getLiveFixtures } from "@repo/api/football";

/**
 * Fetch live football fixtures from external API
 * @returns {Promise<Response>} JSON response with live fixtures or empty array
 * @example
 * // GET /api/live
 * // Returns array of live fixtures with 30s cache
 */
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
