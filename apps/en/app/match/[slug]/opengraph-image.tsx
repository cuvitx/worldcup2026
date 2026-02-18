import { ImageResponse } from "next/og";
import { matchesBySlug } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
export const alt = "Match WC 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const match = matchesBySlug[slug];
  if (!match) return new ImageResponse(<div>Match not found</div>);

  const home = teamsById[match.homeTeamId];
  const away = teamsById[match.awayTeamId];
  const stadium = stadiumsById[match.stadiumId];

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px", marginBottom: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "64px" }}>{home?.flag ?? "🏳️"}</span>
            <span style={{ fontSize: "32px", fontWeight: "bold", marginTop: "8px" }}>{home?.name ?? "TBD"}</span>
          </div>
          <span style={{ fontSize: "48px", color: "#d4af37", fontWeight: "bold" }}>VS</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{ fontSize: "64px" }}>{away?.flag ?? "🏳️"}</span>
            <span style={{ fontSize: "32px", fontWeight: "bold", marginTop: "8px" }}>{away?.name ?? "TBD"}</span>
          </div>
        </div>
        <div style={{ fontSize: "20px", color: "#94a3b8", marginTop: "10px" }}>
          {stadium?.name ?? ""} • {new Date(match.date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <div style={{ fontSize: "16px", color: "#d4af37", fontWeight: "bold", marginTop: "20px", letterSpacing: "2px" }}>
          WORLD CUP 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
