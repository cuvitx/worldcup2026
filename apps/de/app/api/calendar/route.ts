import { NextResponse } from "next/server";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const revalidate = 3600; // 1h cache

export async function GET() {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CDM2026//WM 2026//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:WM 2026",
    "X-WR-TIMEZONE:Europe/Paris",
  ];

  for (const match of matches) {
    const home = teamsById[match.homeTeamId];
    const away = teamsById[match.awayTeamId];
    const stadium = stadiumsById[match.stadiumId];
    const homeName = home?.name ?? "TBD";
    const awayName = away?.name ?? "TBD";

    // Format date: YYYYMMDD
    const dateClean = match.date.replace(/-/g, "");
    // Format start time: HHMMSS
    const timeClean = (match.time || "00:00").replace(":", "") + "00";

    // Compute end time by adding 135 minutes (2h15) to start time
    const timeParts = (match.time || "00:00").split(":").map(Number);
    const totalMin = (timeParts[0] ?? 0) * 60 + (timeParts[1] ?? 0) + 135;
    const endH = String(Math.floor(totalMin / 60) % 24).padStart(2, "0");
    const endM = String(totalMin % 60).padStart(2, "0");

    const uid = `${match.slug}@wm2026guide.de`;
    const summary = `${home?.flag ?? ""} ${homeName} vs ${awayName} ${away?.flag ?? ""}`.trim();
    const location = stadium ? `${stadium.name}, ${stadium.city}` : "";
    const description = `WM 2026 - ${homeName} vs ${awayName}\\nhttps://www.wm2026guide.de/spiel/${match.slug}`;

    lines.push("BEGIN:VEVENT");
    lines.push(`DTSTART;TZID=Europe/Paris:${dateClean}T${timeClean}`);
    lines.push(`DTEND;TZID=Europe/Paris:${dateClean}T${endH}${endM}00`);
    lines.push(`UID:${uid}`);
    lines.push(`SUMMARY:${escapeIcal(summary)}`);
    if (location) lines.push(`LOCATION:${escapeIcal(location)}`);
    lines.push(`DESCRIPTION:${escapeIcal(description)}`);
    lines.push("BEGIN:VALARM");
    lines.push("TRIGGER:-PT30M");
    lines.push("ACTION:DISPLAY");
    lines.push(`DESCRIPTION:${escapeIcal(summary)} dans 30 minutes`);
    lines.push("END:VALARM");
    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  const ics = lines.join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="cdm2026-spielplan.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function escapeIcal(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}
