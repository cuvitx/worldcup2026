import { ImageResponse } from "next/og";
import { teams } from "@repo/data/teams";
export const alt = "Equipo Mundial 2026";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const team = teams.find(t => t.slug === slug);
  if (!team) return new ImageResponse(<div>Team not found</div>);

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "linear-gradient(135deg, #1e3a5f 0%, #0a1628 100%)", color: "white", fontFamily: "sans-serif" }}>
        <span style={{ fontSize: "96px" }}>{team.flag}</span>
        <span style={{ fontSize: "48px", fontWeight: "bold", marginTop: "16px" }}>{team.name}</span>
        <div style={{ display: "flex", gap: "24px", marginTop: "16px", fontSize: "20px", color: "#94a3b8" }}>
          <span>FIFA #{team.fifaRanking}</span>
          <span>•</span>
          <span>Grupo {team.group}</span>
          <span>•</span>
          <span>{team.confederation}</span>
        </div>
        <div style={{ fontSize: "16px", color: "#d4af37", fontWeight: "bold", marginTop: "24px", letterSpacing: "2px" }}>
          COPA DEL MUNDO 2026
        </div>
      </div>
    ),
    { ...size }
  );
}
