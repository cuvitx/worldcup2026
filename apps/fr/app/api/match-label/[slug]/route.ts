import { NextResponse } from "next/server";
import { matchesBySlug } from "@repo/data/matches";
import { resolveMatchTeamsWithResults } from "../../../../lib/knockout-match-teams-runtime";

export const revalidate = 60;

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const match = matchesBySlug[slug];

  if (!match) {
    return NextResponse.json({ error: "Match introuvable" }, { status: 404 });
  }

  const { homeName, awayName } = await resolveMatchTeamsWithResults(match);
  const response = NextResponse.json({
    label: `${homeName} vs ${awayName}`,
    homeName,
    awayName,
  });
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=240",
  );
  return response;
}
