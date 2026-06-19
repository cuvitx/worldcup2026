import { headers } from "next/headers";
import { matchesBySlug } from "@repo/data/matches";
import { rateLimit } from "../../_lib/rate-limit";
import { getVotes, castVote, hashIp } from "../../_lib/votes-store";
import type { VoteChoice } from "../../_lib/votes-store";

export const dynamic = "force-dynamic";

function getClientIp(h: Headers): string {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

// ---------------------------------------------------------------------------
// GET /api/votes/[slug]
// ---------------------------------------------------------------------------
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!matchesBySlug[slug]) {
    return Response.json({ error: "Match not found" }, { status: 404 });
  }

  const counts = await getVotes(slug);
  const total = counts.home + counts.draw + counts.away;

  return Response.json({ ...counts, total });
}

// ---------------------------------------------------------------------------
// POST /api/votes/[slug]
// ---------------------------------------------------------------------------
export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const h = await headers();
  const ip = getClientIp(h);

  // Rate limit: 5 requests per minute per IP
  if (!rateLimit(ip, 5)) {
    return Response.json(
      { error: "rate_limit", message: "Zu viele Anfragen. Versuchen Sie es in einer Minute erneut." },
      { status: 429 },
    );
  }

  if (!matchesBySlug[slug]) {
    return Response.json({ error: "Match not found" }, { status: 404 });
  }

  // Parse and validate body
  let vote: VoteChoice;
  try {
    const body = await req.json();
    if (!body.vote || !["home", "draw", "away"].includes(body.vote)) {
      return Response.json(
        { error: "invalid_vote", message: "Vote must be 'home', 'draw', or 'away'." },
        { status: 400 },
      );
    }
    vote = body.vote as VoteChoice;
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const ipHash = hashIp(ip);
  const { counts, alreadyVoted } = await castVote(slug, vote, ipHash);
  const total = counts.home + counts.draw + counts.away;

  if (alreadyVoted) {
    return Response.json(
      { error: "already_voted", message: "Sie haben bereits für dieses Spiel abgestimmt.", ...counts, total },
      { status: 409 },
    );
  }

  return Response.json({ success: true, ...counts, total });
}
