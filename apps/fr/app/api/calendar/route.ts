import { headers } from "next/headers";
import { rateLimit } from "../_lib/rate-limit";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

// ─── iCalendar helpers ────────────────────────────────────────────────────────

/**
 * Escape text for iCalendar: commas, semicolons and backslashes must be escaped.
 */
function icsEscape(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/**
 * Fold long iCalendar lines at 75 octets (RFC 5545 §3.1).
 */
function foldLine(line: string): string {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;

  const lines: string[] = [];
  let offset = 0;
  let first = true;
  while (offset < bytes.length) {
    const max = first ? 75 : 74; // continuation lines start with a space (1 byte)
    const chunk = bytes.slice(offset, offset + max);
    lines.push((first ? "" : " ") + new TextDecoder().decode(chunk));
    offset += max;
    first = false;
  }
  return lines.join("\r\n");
}

/**
 * Convert "YYYY-MM-DD" + "HH:MM" UTC → iCal DTSTART format: 20260611T190000Z
 */
function toIcalDate(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");
  return `${year}${month}${day}T${hour}${minute}00Z`;
}

/**
 * Add 2 hours to the start time for DTEND (default match duration + HT).
 */
function toIcalDateEnd(date: string, time: string): string {
  const [year, month, day] = date.split("-").map(Number) as [number, number, number];
  const [hour, minute] = time.split(":").map(Number) as [number, number];

  const d = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));
  d.setUTCHours(d.getUTCHours() + 2);

  const yy = d.getUTCFullYear().toString();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");

  return `${yy}${mm}${dd}T${hh}${mi}00Z`;
}

/**
 * Translate stage code to a human-readable French label.
 */
function stageLabel(stage: string, group?: string): string {
  switch (stage) {
    case "group":
      return group ? `Phase de groupes — Groupe ${group}` : "Phase de groupes";
    case "round-of-32":
      return "Trente-deuxièmes de finale";
    case "round-of-16":
      return "Huitièmes de finale";
    case "quarter-final":
      return "Quart de finale";
    case "semi-final":
      return "Demi-finale";
    case "third-place":
      return "Match pour la 3e place";
    case "final":
      return "⭐ FINALE ⭐";
    default:
      return stage;
  }
}

// ─── iCalendar generation ────────────────────────────────────────────────────

export async function GET(): Promise<Response> {
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? headersList.get("x-real-ip") ?? "unknown";
  if (!rateLimit(ip, 30)) {
    return Response.json({ error: "Trop de requêtes. Réessayez dans 1 minute." }, { status: 429 });
  }

  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines: string[] = [];

  // VCALENDAR header
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//CDM2026.fr//Coupe du Monde 2026//FR");
  lines.push("CALSCALE:GREGORIAN");
  lines.push("METHOD:PUBLISH");
  lines.push("X-WR-CALNAME:Coupe du Monde 2026");
  lines.push("X-WR-CALDESC:Calendrier complet des 104 matchs de la Coupe du Monde 2026 (USA / Canada / Mexique)");
  lines.push("X-WR-TIMEZONE:UTC");
  lines.push("REFRESH-INTERVAL;VALUE=DURATION:P1D");
  lines.push("COLOR:mediumblue");

  // Génerer un VEVENT par match
  for (const match of matches) {
    const homeTeam = teamsById[match.homeTeamId];
    const awayTeam = teamsById[match.awayTeamId];
    const stadium = stadiumsById[match.stadiumId];

    const homeName = homeTeam?.name ?? match.homeTeamId;
    const awayName = awayTeam?.name ?? match.awayTeamId;
    const homeFlag = homeTeam?.flag ?? "";
    const awayFlag = awayTeam?.flag ?? "";

    const stadiumName = stadium?.name ?? match.stadiumId;
    const stadiumCity = stadium?.city ?? "";
    const stadiumCountry = stadium?.country ?? "";

    const dtStart = toIcalDate(match.date, match.time);
    const dtEnd = toIcalDateEnd(match.date, match.time);
    const stage = stageLabel(match.stage, match.group);
    const uid = `cdm2026-${match.id}@cdm2026.fr`;
    const url = `https://www.cdm2026.fr/match/${match.slug}`;

    const summary = `${homeFlag} ${homeName} vs ${awayFlag} ${awayName} — CDM 2026`;
    const location = `${stadiumName}, ${stadiumCity}, ${stadiumCountry}`;
    const description = [
      `${stage}`,
      `${homeFlag} ${homeName} 🆚 ${awayFlag} ${awayName}`,
      `📍 ${stadiumName} — ${stadiumCity}`,
      `🕐 Coup d'envoi : ${match.time} UTC`,
      `🌐 ${url}`,
    ].join("\\n");

    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${now}`);
    lines.push(`DTSTART:${dtStart}`);
    lines.push(`DTEND:${dtEnd}`);
    lines.push(foldLine(`SUMMARY:${icsEscape(summary)}`));
    lines.push(foldLine(`LOCATION:${icsEscape(location)}`));
    lines.push(foldLine(`DESCRIPTION:${icsEscape(description)}`));
    lines.push(`URL:${url}`);
    lines.push(`CATEGORIES:Football,Coupe du Monde,CDM 2026,FIFA`);
    lines.push("STATUS:CONFIRMED");
    lines.push("TRANSP:TRANSPARENT");
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  // RFC 5545 requires CRLF line endings
  const icsContent = lines.join("\r\n") + "\r\n";

  return new Response(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cdm2026.ics"',
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
