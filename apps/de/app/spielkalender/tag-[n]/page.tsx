import { domains } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { matches, teamsById, stadiumsById } from "../../../lib/localized-data";
import { EVENT_DATES } from "@repo/data/constants";
import { Clock, Users } from "lucide-react"

export const revalidate = 3600;

// ============================================================
//  Tournament dates: June 11 (day 1) to July 19 (day 39)
// ============================================================
const TOURNAMENT_START = new Date(EVENT_DATES.START);
const TOTAL_DAYS = EVENT_DATES.DURATION_DAYS;

function dayNumberToDate(n: number): string {
  const d = new Date(TOURNAMENT_START);
  d.setDate(d.getDate() + (n - 1));
  return d.toISOString().slice(0, 10); // "YYYY-MM-DD"
}

function formatDateDe(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return d.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  // Times are already in Europe/Paris (CEST) — reformat as HH:MM
  const [h, m] = time.split(":").map(Number);
  return `${String(h ?? 0).padStart(2, "0")}:${String(m ?? 0).padStart(2, "0")}`;
}

function stageLabel(stage: string, group?: string): string {
  const labels: Record<string, string> = {
    group: `Gruppenphase${group ? ` — Gruppe ${group}` : ""}`,
    "round-of-32": "Sechzehntelfinale",
    "round-of-16": "Achtelfinale",
    "quarter-final": "Viertelfinale",
    "semi-final": "Halbfinale",
    "third-place": "Spiel um Platz 3",
    final: "FINALE",
  };
  return labels[stage] ?? stage;
}

function stageBadgeClass(stage: string): string {
  if (stage === "final") return "bg-accent/20 text-accent font-bold";
  if (stage === "semi-final") return "bg-primary/20 text-primary font-semibold";
  if (stage === "quarter-final") return "bg-primary/20 text-primary";
  if (stage === "round-of-16" || stage === "round-of-32") return "bg-primary/10 text-primary";
  return "bg-gray-100 text-gray-600";
}

// ============================================================
//  Static params: generate pages for tag-1 to tag-39
// ============================================================
export async function generateStaticParams() {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => ({
    n: String(i + 1),
  }));
}

// ============================================================
//  Metadata
// ============================================================
interface PageProps {
  params: Promise<{ n: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { n } = await params;
  const dayNum = parseInt(n, 10);
  if (isNaN(dayNum) || dayNum < 1 || dayNum > TOTAL_DAYS) return {};

  const dateStr = dayNumberToDate(dayNum);
  const formattedDate = formatDateDe(dateStr);
  const dayMatches = matches.filter((m) => m.date === dateStr);

  return {
    title: `Tag ${dayNum} — ${formattedDate} | Spiele WM 2026`,
    description: `Programm Tag ${dayNum} der WM 2026 (${formattedDate}): ${dayMatches.length} Spiel${dayMatches.length > 1 ? "e" : ""} auf dem Programm. Uhrzeiten, Stadien und Mannschaften.`,
    openGraph: {
      title: `WM 2026 — Tag ${dayNum}: ${formattedDate}`,
      description: `${dayMatches.length} Spiel${dayMatches.length > 1 ? "e" : ""} an diesem Tag. Alle Uhrzeiten und Stadien.`,
    },
    alternates: {
      canonical: `${domains.de}/spielplan/tag-${dayNum}`,
    },
  };
}

// ============================================================
//  FAQ items (static — same for all day pages)
// ============================================================
const faqSpielplanItems = [
  {
    question: "Wann beginnt und endet die WM 2026?",
    answer:
      "Die WM 2026 beginnt am 11. Juni 2026 mit dem Eröffnungsspiel im Estadio Azteca in Mexiko-Stadt. Das große Finale findet am 19. Juli 2026 im MetLife Stadium in New York/New Jersey statt, also insgesamt 39 Tage Wettbewerb.",
  },
  {
    question: "Wie viele Spiele gibt es bei der WM 2026 insgesamt?",
    answer:
      "Die WM 2026 umfasst insgesamt 104 Spiele: 72 Gruppenspiele (12 Gruppen x 6 Spiele), dann 32 K.-o.-Spiele (16 Achtelfinale + 8 Viertelfinale + 4 Halbfinale + 1 Spiel um Platz 3 + 1 Finale). Das sind 24 Spiele mehr als 2022.",
  },
  {
    question: "In welcher Zeitzone werden die Spielzeiten angezeigt?",
    answer:
      "Die Uhrzeiten auf dieser Website werden in mitteleuropäischer Sommerzeit (MESZ, UTC+2) angezeigt. Die Spiele finden in amerikanischer Ortszeit statt (EDT = UTC-4, CDT = UTC-5, PDT = UTC-7), also in der Regel am europäischen Abend (zwischen 18 und 3 Uhr nachts je nach Zeitzone der Gastgeberstadt).",
  },
];

// ============================================================
//  Page component
// ============================================================
export default async function TagPage({ params }: PageProps) {
  const { n } = await params;
  const dayNum = parseInt(n, 10);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > TOTAL_DAYS) {
    notFound();
  }

  const dateStr = dayNumberToDate(dayNum);
  const formattedDate = formatDateDe(dateStr);

  // Matches for this day
  const dayMatches = matches
    .filter((m) => m.date === dateStr)
    .sort((a, b) => a.time.localeCompare(b.time));

  const hasPrev = dayNum > 1;
  const hasNext = dayNum < TOTAL_DAYS;

  return (
    <>
      {/* Structured data */}
{/* Breadcrumb */}
{/* Hero header */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-white/70 uppercase tracking-widest mb-1">
                WM 2026
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold">
                Tag {dayNum}
              </h1>
              <p className="mt-2 text-lg text-white/90 capitalize">{formattedDate}</p>
              <p className="mt-1 text-sm text-white/80">
                {dayMatches.length > 0
                  ? `${dayMatches.length} Spiel${dayMatches.length > 1 ? "e" : ""} auf dem Programm`
                  : "Keine Spiele an diesem Tag geplant"}
              </p>
            </div>

            {/* Day counter badge */}
            <div className="flex items-center gap-3 sm:text-right">
              <div className="rounded-2xl bg-white/10 px-5 py-3 text-center">
                <p className="text-3xl font-extrabold">{dayNum}</p>
                <p className="text-xs text-white/70">/ {TOTAL_DAYS} Tage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Navigation prev/next */}
        <div className="flex items-center justify-between mb-8 gap-4">
          {hasPrev ? (
            <Link
              href={`/spielplan/tag-${dayNum - 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              ← Tag {dayNum - 1}
            </Link>
          ) : (
            <div />
          )}
          <span className="text-sm text-gray-500">
            Tag {dayNum} / {TOTAL_DAYS}
          </span>
          {hasNext ? (
            <Link
              href={`/spielplan/tag-${dayNum + 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Tag {dayNum + 1} →
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Matches list */}
        {dayMatches.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow text-center">
            <p className="text-4xl mb-4"></p>
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Spielfreier Tag
            </p>
            <p className="text-sm text-gray-500">
              Am {formattedDate} sind keine Spiele geplant.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              {hasPrev && (
                <Link
                  href={`/spielplan/tag-${dayNum - 1}`}
                  className="rounded-lg bg-primary/10 px-4 py-2 text-sm text-primary font-medium hover:bg-primary/20"
                >
                  ← Vorheriger Tag
                </Link>
              )}
              {hasNext && (
                <Link
                  href={`/spielplan/tag-${dayNum + 1}`}
                  className="rounded-lg bg-primary px-4 py-2 text-sm text-white font-medium hover:bg-primary/90"
                >
                  Nächster Tag →
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {dayMatches.map((match) => {
              const homeTeam = teamsById[match.homeTeamId];
              const awayTeam = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];
              const formattedTime = formatTime(match.time);
              const stageLbl = stageLabel(match.stage, match.group);
              const badgeClass = stageBadgeClass(match.stage);
              const isFinal = match.stage === "final";

              return (
                <Link
                  key={match.id}
                  href={`/spiel/${match.slug}`}
                  className={`block rounded-xl border bg-white shadow-sm transition-all hover:shadow-md hover:border-primary/50 ${
                    isFinal
                      ? "border-primary/40 ring-2 ring-primary/20"
                      : "border-gray-200"
                  }`}
                >
                  <div className="p-5">
                    {/* Stage badge */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs ${badgeClass}`}>
                        {stageLbl}
                      </span>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span><Clock className="h-5 w-5 inline-block" /></span>
                          <span className="font-medium text-gray-800">{formattedTime} (MEZ)</span>
                          <span className="text-xs text-gray-500">| {match.time} CEST</span>
                        </span>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="flex items-center justify-center gap-4 sm:gap-8">
                      {/* Home team */}
                      <div className="flex flex-col items-center gap-2 text-center flex-1">
                        <span className="text-4xl sm:text-5xl" role="img" aria-label={homeTeam?.name ?? "Heimmannschaft"}>
                          {homeTeam?.flag ?? ""}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900 text-sm sm:text-base">
                            {homeTeam?.name ?? match.homeTeamId}
                          </p>
                          {homeTeam && (
                            <p className="text-xs text-gray-500">{homeTeam.code}</p>
                          )}
                        </div>
                      </div>

                      {/* VS */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <span className="text-xl font-extrabold text-gray-400">VS</span>
                        {isFinal && (
                          <span className="text-xs font-bold text-accent"> FINALE</span>
                        )}
                      </div>

                      {/* Away team */}
                      <div className="flex flex-col items-center gap-2 text-center flex-1">
                        <span className="text-4xl sm:text-5xl" role="img" aria-label={awayTeam?.name ?? "Auswärtsmannschaft"}>
                          {awayTeam?.flag ?? ""}
                        </span>
                        <div>
                          <p className="font-bold text-gray-900 text-sm sm:text-base">
                            {awayTeam?.name ?? match.awayTeamId}
                          </p>
                          {awayTeam && (
                            <p className="text-xs text-gray-500">{awayTeam.code}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stadium info */}
                    {stadium && (
                      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <span></span>
                          <span>{stadium.name}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span></span>
                          <span>{stadium.city}, {stadium.country}</span>
                        </span>
                        {stadium.capacity && (
                          <span className="flex items-center gap-1">
                            <span><Users className="h-5 w-5 inline-block" /></span>
                            <span>{stadium.capacity.toLocaleString("de-DE")} Plätze</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Navigation bottom */}
        <div className="mt-10 flex items-center justify-between gap-4">
          {hasPrev ? (
            <Link
              href={`/spielplan/tag-${dayNum - 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              ← Tag {dayNum - 1}
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/spiel/spielplan"
            className="rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Kompletter Spielplan
          </Link>
          {hasNext ? (
            <Link
              href={`/spielplan/tag-${dayNum + 1}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              Tag {dayNum + 1} →
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Quick jump: all days */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Schnellnavigation</h2>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: TOTAL_DAYS }, (_, i) => {
              const d = i + 1;
              const isActive = d === dayNum;
              // Count matches that day for visual feedback
              const dDate = dayNumberToDate(d);
              const cnt = matches.filter((m) => m.date === dDate).length;
              return (
                <Link
                  key={d}
                  href={`/spielplan/tag-${d}`}
                  title={`Tag ${d} — ${cnt} Spiel${cnt !== 1 ? "e" : ""}`}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : cnt > 0
                      ? "bg-gray-100 hover:bg-primary/20 text-gray-700"
                      : "bg-gray-50 text-gray-400 cursor-default"
                  }`}
                >
                  {d}
                  {cnt > 0 && !isActive && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Die grünen Punkte zeigen Tage mit Spielen an.
          </p>
        </div>
      </div>

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `WM 2026 — Tag ${dayNum}`,
            startDate: dateStr,
            endDate: dateStr,
            location: {
              "@type": "Place",
              name: "USA / Mexico / Canada",
            },
            organizer: {
              "@type": "Organization",
              name: "FIFA",
            },
            url: `${domains.de}/spielplan/tag-${dayNum}`,
            description: `Programm Tag ${dayNum} der WM 2026: ${dayMatches.length} Spiel(e).`,
          }),
        }}
      />
    </>
  );
}
