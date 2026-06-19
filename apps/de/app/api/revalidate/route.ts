import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate — Force ISR revalidation for match pages.
 * Called by deploy script after restart to immediately refresh pages
 * without waiting for the revalidate TTL to expire.
 *
 * Body: { "paths": ["/spiel/france-vs-senegal", ...] }
 * Or:   { "all": true } to revalidate all match pages
 *
 * Protected by a secret token to prevent abuse.
 */
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { paths?: string[]; all?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const revalidated: string[] = [];

  if (body.all) {
    // Revalidate the match layout which covers all match/[slug] pages
    revalidatePath("/spiel", "layout");
    // Also revalidate key aggregate pages
    revalidatePath("/spiel/spielplan");
    revalidatePath("/spiel/heute");
    revalidatePath("/gruppen");
    revalidatePath("/");
    revalidated.push("/match (all)", "/spiel/spielplan", "/spiel/heute", "/gruppen", "/");
  } else if (body.paths && Array.isArray(body.paths)) {
    for (const path of body.paths) {
      if (typeof path === "string" && path.startsWith("/")) {
        revalidatePath(path);
        revalidated.push(path);
      }
    }
  }

  return NextResponse.json({ revalidated, count: revalidated.length });
}
