import type { ReactElement } from "react";
import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

const BG = "#0D3B66";
const ACCENT = "#00B865";
const WHITE = "#FFFFFF";
const LIGHT = "rgba(255,255,255,0.7)";

function safeLoad<T>(fn: () => T, fallback: T): T {
  try { return fn(); } catch { return fallback; }
}

/* ── Data lookups ── */
function findTeam(slug: string) {
  const teams = safeLoad(() => require("@repo/data/teams").teams as any[], []);
  return teams.find((t: any) => t.slug === slug);
}
function findMatch(slug: string) {
  const matches = safeLoad(() => require("@repo/data/matches").matches as any[], []);
  return matches.find((m: any) => m.slug === slug);
}
function findPlayer(slug: string) {
  const players = safeLoad(() => require("@repo/data/players").players as any[], []);
  return players.find((p: any) => p.slug === slug);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "default";
  const slug = searchParams.get("slug") || "";
  const title = searchParams.get("title") || "";

  let content: ReactElement;

  switch (type) {
    case "equipe": {
      const team = findTeam(slug);
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: BG, padding: "60px" }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>{team?.flag || "🏆"}</div>
          <div style={{ fontSize: 64, fontWeight: 800, color: WHITE, textAlign: "center", lineHeight: 1.1 }}>
            {team?.name || slug}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
            {team?.fifaRanking && <div style={{ fontSize: 28, color: ACCENT, fontWeight: 700 }}>FIFA #{team.fifaRanking}</div>}
            {team?.group && <div style={{ fontSize: 28, color: LIGHT }}>Groupe {team.group}</div>}
          </div>
          <div style={{ fontSize: 24, color: LIGHT, marginTop: 40 }}>CDM 2026 — Coupe du Monde FIFA</div>
        </div>
      );
      break;
    }

    case "match": {
      const match = findMatch(slug);
      const home = match ? findTeam(match.homeTeamSlug || match.home) : null;
      const away = match ? findTeam(match.awayTeamSlug || match.away) : null;
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: BG, padding: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 64 }}>{home?.flag || "🏳️"}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: WHITE, marginTop: 12 }}>{home?.name || "Équipe 1"}</div>
            </div>
            <div style={{ fontSize: 48, fontWeight: 800, color: ACCENT }}>VS</div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 64 }}>{away?.flag || "🏳️"}</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: WHITE, marginTop: 12 }}>{away?.name || "Équipe 2"}</div>
            </div>
          </div>
          {match?.date && <div style={{ fontSize: 24, color: LIGHT, marginTop: 32 }}>{match.date}</div>}
          {match?.stadium && <div style={{ fontSize: 22, color: LIGHT, marginTop: 8 }}>{match.stadium}</div>}
          <div style={{ fontSize: 24, color: LIGHT, marginTop: 40 }}>CDM 2026 — Coupe du Monde FIFA</div>
        </div>
      );
      break;
    }

    case "joueur": {
      const player = findPlayer(slug);
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: BG, padding: "60px" }}>
          <div style={{ fontSize: 72 }}>⚽</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: WHITE, textAlign: "center", marginTop: 16, lineHeight: 1.1 }}>
            {player?.name || slug}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
            {player?.position && <div style={{ fontSize: 28, color: ACCENT, fontWeight: 700 }}>{player.position}</div>}
            {player?.team && <div style={{ fontSize: 28, color: LIGHT }}>{player.team}</div>}
          </div>
          <div style={{ fontSize: 24, color: LIGHT, marginTop: 40 }}>CDM 2026 — Coupe du Monde FIFA</div>
        </div>
      );
      break;
    }

    case "pronostic":
    case "article": {
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: BG, padding: "60px 80px" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 4, marginBottom: 24 }}>
            {type === "pronostic" ? "Pronostic" : "Article"}
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: WHITE, textAlign: "center", lineHeight: 1.2 }}>
            {title || slug.replace(/-/g, " ")}
          </div>
          <div style={{ fontSize: 24, color: LIGHT, marginTop: 40 }}>CDM 2026 — Coupe du Monde FIFA</div>
        </div>
      );
      break;
    }

    default: {
      content = (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: BG, padding: "60px" }}>
          <div style={{ fontSize: 72 }}>🏆</div>
          <div style={{ fontSize: 56, fontWeight: 800, color: WHITE, marginTop: 16 }}>CDM 2026</div>
          <div style={{ fontSize: 32, color: ACCENT, marginTop: 12 }}>Coupe du Monde FIFA</div>
          <div style={{ fontSize: 24, color: LIGHT, marginTop: 32 }}>États-Unis • Mexique • Canada</div>
        </div>
      );
    }
  }

  return new ImageResponse(content, { width: 1200, height: 630 });
}
