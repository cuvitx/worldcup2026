import type { Metadata } from "next";
import Link from "next/link";
import { matches, teamsById, stadiumsById, citiesById } from "../../lib/localized-data";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { Clock, MapPin, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Spielzeiten - WM 2026",
  description:
    "Alle Spielzeiten der 104 Spiele der WM 2026 in mitteleuropäischer Zeit (MEZ). Kompletter Spielplan vom 11. Juni bis 19. Juli 2026 mit Zeitzonen.",
  alternates: {
    canonical: "https://www.wm2026guide.de/spielzeiten",
  },
  openGraph: {
    title: "Spielzeiten - WM 2026",
    description:
      "Kompletter Spielplan der 104 Spiele der WM 2026 in MEZ. Zeitzonen, Stadien und Städte.",
    url: "https://www.wm2026guide.de/spielzeiten",
  },
};

export const revalidate = 300; // 5min ISR

const STAGE_LABELS: Record<string, string> = {
  group: "Gruppenphase",
  "round-of-32": "Sechzehntelfinale",
  "round-of-16": "Achtelfinale",
  "quarter-final": "Viertelfinale",
  "semi-final": "Halbfinale",
  "third-place": "Spiel um Platz 3",
  final: "Finale",
};

function formatDateDe(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getStageBadgeStyle(stage: string): string {
  switch (stage) {
    case "group":
      return "bg-blue-100 text-blue-800";
    case "round-of-32":
    case "round-of-16":
      return "bg-purple-100 text-purple-800";
    case "quarter-final":
      return "bg-amber-100 text-amber-800";
    case "semi-final":
      return "bg-orange-100 text-orange-800";
    case "third-place":
      return "bg-gray-100 text-gray-800";
    case "final":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

const TIMEZONE_INFO = [
  {
    zone: "Eastern Time (ET)",
    offset: "UTC\u22124 (Sommerzeit)",
    diffParis: "\u22126h",
    cities: "New York, Miami, Atlanta, Philadelphia, Boston",
  },
  {
    zone: "Central Time (CT)",
    offset: "UTC\u22125 (Sommerzeit)",
    diffParis: "\u22127h",
    cities: "Houston, Dallas, Kansas City, Mexiko-Stadt, Monterrey, Guadalajara",
  },
  {
    zone: "Pacific Time (PT)",
    offset: "UTC\u22127 (Sommerzeit)",
    diffParis: "\u22129h",
    cities: "Los Angeles, San Francisco, Seattle, Vancouver",
  },
];

export default async function SpielzeitenPage() {
  // Build team name map for API matching
  const teamNameMap: Record<string, string> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamNameMap[id] = t.name;
  }

  // Enrich static matches with real API results
  const enrichedMatches = await enrichMatchesWithResults(matches, teamNameMap);

  // Group matches by date
  const matchesByDate = new Map<string, typeof enrichedMatches>();
  for (const m of enrichedMatches) {
    const existing = matchesByDate.get(m.date) ?? [];
    existing.push(m);
    matchesByDate.set(m.date, existing);
  }

  // Sort dates
  const sortedDates = [...matchesByDate.keys()].sort();

  // Sort matches within each date by time
  for (const [, dayMatches] of matchesByDate) {
    dayMatches.sort((a, b) => a.time.localeCompare(b.time));
  }

  return (
    <>
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-8 h-8 text-white/80" />
            <p className="text-sm font-medium text-white/80 uppercase tracking-widest">
              Kompletter Spielplan
            </p>
          </div>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Spielzeiten &mdash; WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            104 Spiele vom 11. Juni bis 19. Juli 2026 &mdash; Uhrzeiten in
            mitteleuropäischer Zeit (MESZ, UTC+2)
          </p>
        </div>
      </section>

      {/* Timezone info section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-10 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-gray-900">
              Zeitzonen der Gastgeberstädte
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Die WM 2026 findet in 3 Ländern und 3 verschiedenen Zeitzonen
            statt. Alle unten aufgeführten Uhrzeiten werden in{" "}
            <strong>mitteleuropäischer Sommerzeit (MESZ, UTC+2)</strong> angezeigt.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {TIMEZONE_INFO.map((tz) => (
              <div
                key={tz.zone}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900 text-sm">
                  {tz.zone}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{tz.offset}</p>
                <p className="text-lg font-bold text-primary mt-2">
                  {tz.diffParis} vs MEZ
                </p>
                <div className="mt-3 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-600">{tz.cities}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-blue-50 border border-blue-100 p-4">
            <p className="text-sm text-blue-800">
              <strong>Beispiel:</strong> Ein Spiel um 21:00 Uhr MEZ
              entspricht 15:00 Uhr in New York (ET), 14:00 Uhr in Houston (CT) und 12:00 Uhr
              in Los Angeles (PT). Abendspiele in Mitteleuropa finden am
              frühen Nachmittag in Nordamerika statt.
            </p>
          </div>
        </div>
      </section>

      {/* Matches by date */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Spielplan nach Datum
        </h2>

        <div className="space-y-8">
          {sortedDates.map((date) => {
            const dayMatches = matchesByDate.get(date)!;
            return (
              <div key={date}>
                {/* Date header */}
                <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b-2 border-primary pb-2 mb-4">
                  <h3 className="text-lg font-bold text-gray-900 capitalize">
                    {formatDateDe(date)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {dayMatches.length} Spiel{dayMatches.length > 1 ? "e" : ""}
                  </p>
                </div>

                {/* Matches table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-20">
                          Uhrzeit
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          Spiel
                        </th>
                        <th className="py-2 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-20 hidden sm:table-cell">
                          Score
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Stadion
                        </th>
                        <th className="py-2 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-32 hidden lg:table-cell">
                          Phase
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {dayMatches.map((m) => {
                        const home = teamsById[m.homeTeamId];
                        const away = teamsById[m.awayTeamId];
                        const stadium = stadiumsById[m.stadiumId];
                        const city = stadium
                          ? citiesById[stadium.cityId]
                          : undefined;
                        const homeName = home?.name ?? m.homeTeamId;
                        const awayName = away?.name ?? m.awayTeamId;
                        const homeFlag = home?.flag ?? "";
                        const awayFlag = away?.flag ?? "";
                        const isFinished = m.status === "finished";
                        const isLive = m.status === "live";

                        return (
                          <tr
                            key={m.id}
                            className={`hover:bg-gray-50 transition-colors ${isLive ? "bg-green-50" : ""}`}
                          >
                            {/* Time */}
                            <td className="py-3 px-3">
                              <span
                                className={`font-mono font-bold text-base ${isLive ? "text-green-600" : "text-gray-900"}`}
                              >
                                {m.time}
                              </span>
                              {isLive && (
                                <span className="ml-1 inline-flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase">
                                  <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                  </span>
                                  Live
                                </span>
                              )}
                            </td>

                            {/* Teams */}
                            <td className="py-3 px-3">
                              <Link
                                href={`/spiel/${m.slug}`}
                                className="group flex items-center gap-2 hover:text-primary transition-colors"
                              >
                                <span className="text-base" title={homeName}>
                                  {homeFlag}
                                </span>
                                <span className="font-medium text-gray-900 group-hover:text-primary min-w-0 truncate">
                                  {homeName}
                                </span>
                                {/* Mobile score inline */}
                                <span className="sm:hidden text-xs font-bold text-gray-500 shrink-0">
                                  {isFinished
                                    ? `${m.homeScore}-${m.awayScore}`
                                    : "vs"}
                                </span>
                                <span className="hidden sm:inline text-gray-400 shrink-0">
                                  vs
                                </span>
                                <span className="font-medium text-gray-900 group-hover:text-primary min-w-0 truncate">
                                  {awayName}
                                </span>
                                <span className="text-base" title={awayName}>
                                  {awayFlag}
                                </span>
                              </Link>
                              {/* Stadium on mobile */}
                              <div className="md:hidden mt-1 flex items-center gap-1 text-xs text-gray-400">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate">
                                  {stadium?.name ?? m.stadiumId}
                                  {city ? `, ${city.name}` : ""}
                                </span>
                              </div>
                            </td>

                            {/* Score (desktop) */}
                            <td className="py-3 px-3 text-center hidden sm:table-cell">
                              {isFinished ? (
                                <span className="font-bold text-gray-900">
                                  {m.homeScore} - {m.awayScore}
                                </span>
                              ) : isLive ? (
                                <span className="font-bold text-green-600">
                                  {m.homeScore ?? 0} - {m.awayScore ?? 0}
                                </span>
                              ) : (
                                <span className="text-gray-400">&ndash;</span>
                              )}
                            </td>

                            {/* Stadium (desktop) */}
                            <td className="py-3 px-3 hidden md:table-cell">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-gray-700 truncate">
                                    {stadium?.name ?? m.stadiumId}
                                  </p>
                                  {city && (
                                    <p className="text-xs text-gray-400 truncate">
                                      {city.name},{" "}
                                      {city.country === "USA"
                                        ? "USA"
                                        : city.country}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Phase (desktop) */}
                            <td className="py-3 px-3 hidden lg:table-cell">
                              <span
                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${getStageBadgeStyle(m.stage)}`}
                              >
                                {STAGE_LABELS[m.stage] ?? m.stage}
                                {m.group ? ` \u2014 Gr. ${m.group}` : ""}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Informative section */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Die Spielzeiten der WM 2026 verstehen
          </h2>
          <div className="prose prose-gray max-w-none text-sm leading-relaxed space-y-4">
            <p>
              Die WM 2026 ist die erste Ausgabe, die in{" "}
              <strong>3 Ländern</strong> (USA, Mexiko, Kanada) und{" "}
              <strong>3 verschiedenen Zeitzonen</strong> ausgetragen wird. Für
              europäische Fans bedeutet das eine erhebliche Zeitverschiebung:
              Die Spiele finden hauptsächlich{" "}
              <strong>am Abend und in der Nacht in Mitteleuropa</strong> statt.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-white p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Spiele zur europäischen Primetime (18-23 Uhr)
                </h3>
                <p className="text-gray-600">
                  Die Spiele um 18, 19, 21 und 22 Uhr (MEZ)
                  entsprechen den frühen Nachmittagszeiten in
                  Nordamerika. Das sind die angenehmsten Uhrzeiten
                  für europäische Fans.
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Späte und nächtliche Spiele (00-06 Uhr)
                </h3>
                <p className="text-gray-600">
                  Spiele, die am Abend in den USA oder an der
                  Pazifikküste stattfinden, fallen mitten in die Nacht in Europa.
                  Für Spiele um 03 oder 04 Uhr sollten Sie sich auf eine lange Nacht einstellen!
                </p>
              </div>
            </div>
            <p>
              <strong>Tipp:</strong> Die Gruppenspiele Deutschlands werden
              voraussichtlich zu{" "}
              <strong>günstigen Abendzeiten (MEZ)</strong> ausgetragen,
              ideal zum gemeinsamen Verfolgen der DFB-Elf.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
