import { NextResponse } from "next/server";
import { matches } from "@repo/data/matches";
import { stadiumsById } from "@repo/data/stadiums";
import { getResolvedCalendarMatches } from "../../../lib/calendar-match-resolution";

export const revalidate = 300;

export async function GET() {
  const resolvedMatches = await getResolvedCalendarMatches(matches);
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CDM2026//Coupe du Monde 2026//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Coupe du Monde 2026",
    "X-WR-TIMEZONE:Europe/Paris",
  ];

  for (const match of resolvedMatches) {
    const stadium = stadiumsById[match.stadiumId];
    const homeName = match.homeName;
    const awayName = match.awayName;

    // Format date: YYYYMMDD
    const dateClean = match.date.replace(/-/g, "");
    // Format start time: HHMMSS
    const timeClean = (match.time || "00:00").replace(":", "") + "00";

    // Compute end time by adding 135 minutes (2h15) to start time
    const timeParts = (match.time || "00:00").split(":").map(Number);
    const totalMin = (timeParts[0] ?? 0) * 60 + (timeParts[1] ?? 0) + 135;
    const endH = String(Math.floor(totalMin / 60) % 24).padStart(2, "0");
    const endM = String(totalMin % 60).padStart(2, "0");

    const uid = `${match.slug}@cdm2026.fr`;
    const summary = `${match.homeFlag} ${homeName} vs ${awayName} ${match.awayFlag}`.trim();
    const location = stadium ? `${stadium.name}, ${stadium.city}` : "";
    const description = `Coupe du Monde 2026 - ${homeName} vs ${awayName}\\nhttps://www.cdm2026.fr/match/${match.slug}`;

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
      "Content-Disposition": 'attachment; filename="cdm2026-calendrier.ics"',
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
