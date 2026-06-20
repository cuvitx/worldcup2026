import type { Metadata } from "next";
import Link from "next/link";
import { matches, teamsById, stadiumsById } from "../../lib/localized-data";
import { stageLabelsI18n } from "@repo/data/constants";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { RelatedLinks } from "../components/RelatedLinks";
import { PmuBanner } from "../components/PmuBanner";

const stageLabels = stageLabelsI18n.de;

const faqItems = [
  {
    question: "Wie werden die angezeigten Ergebnisse berechnet?",
    answer:
      "Die Ergebnisse werden automatisch über die offizielle Football-Data-API aktualisiert. Während der Spiele werden die Ergebnisse jede Minute aktualisiert. Nach Spielende wird das Endergebnis in unserer Datenbank festgehalten.",
  },
  {
    question: "Wann sind die Ergebnisse verfügbar?",
    answer:
      "Die Ergebnisse sind ab dem Schlusspfiff jedes Spiels verfügbar. Die Seite wird automatisch alle 5 Minuten aktualisiert, um die neuesten Ergebnisse anzuzeigen.",
  },
  {
    question: "Wie viele Spiele umfasst die WM 2026?",
    answer:
      "Die WM 2026 umfasst insgesamt 104 Spiele: 72 Gruppenspiele (12 Gruppen mit je 4 Mannschaften) und 32 K.o.-Spiele. Das Turnier findet vom 11. Juni bis 19. Juli 2026 in den USA, Mexiko und Kanada statt.",
  },
  {
    question: "Kann ich die Details jedes Spiels sehen?",
    answer:
      "Ja, klicken Sie auf ein beliebiges Ergebnis, um zur detaillierten Spielseite mit vollständigen Statistiken, Aufstellungen, Torschützen und Highlights zu gelangen.",
  },
];

export const metadata: Metadata = {
  title: "Spielergebnisse - WM 2026",
  description:
    "Alle Ergebnisse und Spielstände der WM 2026. Endergebnisse, Torschützen und Zusammenfassungen jedes Spiels der Weltmeisterschaft.",
  alternates: {
    canonical: "/ergebnisse",
  },
  openGraph: {
    title: "Spielergebnisse - WM 2026",
    description:
      "Ergebnisse und Spielstände aller Spiele der WM 2026. Gruppenphase und Finalrunde.",
  },
};

export const revalidate = 300; // 5min ISR

export default async function ErgebnissePage() {
  // Build team name map for API matching
  const teamNameMap: Record<string, string> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamNameMap[id] = t.name;
  }

  // Enrich static matches with real API results
  const enrichedMatches = await enrichMatchesWithResults(matches, teamNameMap);

  // Filter finished matches and sort by date (most recent first)
  const finishedMatches = enrichedMatches
    .filter((m) => m.status === "finished")
    .sort((a, b) => {
      // Sort by date descending, then by time descending
      const dateCompare = b.date.localeCompare(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.time.localeCompare(a.time);
    });

  // Group matches by date for display
  const matchesByDate: Record<string, typeof finishedMatches> = {};
  for (const match of finishedMatches) {
    const arr = matchesByDate[match.date] ?? [];
    arr.push(match);
    matchesByDate[match.date] = arr;
  }

  const sortedDates = Object.keys(matchesByDate).sort((a, b) =>
    b.localeCompare(a)
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Ergebnisse WM 2026
          </h1>
          <p className="mt-2 text-gray-300">
            {finishedMatches.length > 0
              ? `${finishedMatches.length} Spiel${finishedMatches.length > 1 ? "e" : ""} beendet`
              : "Noch keine Spiele beendet"}
          </p>
        </div>
      </section>

      {/* CTA Affiliate */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6">
        <PmuBanner tracking="ergebnisse-top" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {finishedMatches.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8 text-center">
            <p className="text-lg text-gray-600">
              Noch keine Spiele beendet.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Die WM 2026 beginnt am 11. Juni 2026.
            </p>
            <div className="mt-6">
              <Link
                href="/spiel/spielplan"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Kompletten Spielplan anzeigen
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => {
              const dayMatches = matchesByDate[date]!;
              const dateObj = new Date(date + "T12:00:00");
              const formattedDate = dateObj.toLocaleDateString("de-DE", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div key={date}>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 capitalize">
                    {formattedDate}
                  </h2>
                  <div className="space-y-2">
                    {dayMatches.map((match) => {
                      const home = teamsById[match.homeTeamId];
                      const away = teamsById[match.awayTeamId];
                      const stadium = stadiumsById[match.stadiumId];
                      const stageName =
                        stageLabels[match.stage] ?? match.stage;

                      return (
                        <Link
                          key={match.id}
                          href={`/spiel/${match.slug}`}
                          className="flex items-center gap-3 sm:gap-4 rounded-lg border border-gray-200 bg-white p-3 sm:p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                        >
                          {/* Time */}
                          <span className="text-xs text-gray-500 w-11 text-center shrink-0">
                            {match.time}
                          </span>

                          {/* Home team */}
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
                            <span
                              className="text-base sm:text-lg shrink-0"
                              role="img"
                              aria-label={`Flagge von ${home?.name ?? "Unbekannt"}`}
                            >
                              {home?.flag ?? "\uD83C\uDFF3\uFE0F"}
                            </span>
                            <span className="font-medium truncate text-sm sm:text-base">
                              {home?.name ?? "Noch offen"}
                            </span>
                          </div>

                          {/* Score */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="bg-gray-900 text-white text-sm font-bold rounded px-2 py-0.5 min-w-[28px] text-center">
                              {match.homeScore ?? "-"}
                            </span>
                            <span className="text-xs text-gray-400">-</span>
                            <span className="bg-gray-900 text-white text-sm font-bold rounded px-2 py-0.5 min-w-[28px] text-center">
                              {match.awayScore ?? "-"}
                            </span>
                          </div>

                          {/* Away team */}
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 justify-end">
                            <span className="font-medium truncate text-right text-sm sm:text-base">
                              {away?.name ?? "Noch offen"}
                            </span>
                            <span
                              className="text-base sm:text-lg shrink-0"
                              role="img"
                              aria-label={`Flagge von ${away?.name ?? "Unbekannt"}`}
                            >
                              {away?.flag ?? "\uD83C\uDFF3\uFE0F"}
                            </span>
                          </div>

                          {/* Group/Stage badge */}
                          <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0 hidden sm:block">
                            {match.group
                              ? `Gr. ${match.group}`
                              : stageName}
                          </span>

                          {/* Stadium */}
                          {stadium && (
                            <span className="text-xs text-gray-500 hidden lg:block shrink-0 w-36 text-right truncate">
                              {stadium.name}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Affiliate */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <PmuBanner tracking="ergebnisse" />
      </div>

      {/* Related links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/spiel/spielplan",
              title: "Kompletter Spielplan",
              description:
                "Sehen Sie das Programm aller 104 Spiele der WM 2026.",
              icon: "",
            },
            {
              href: "/gruppen",
              title: "Die 12 Gruppen",
              description:
                "Tabellen und Zusammensetzung der Gruppenphase.",
              icon: "",
            },
            {
              href: "/torschuetzen",
              title: "Torschützenliste",
              description:
                "Beste Torschützen und Turnierstatistiken.",
              icon: "",
            },
          ]}
        />
      </div>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Häufig gestellte Fragen — Ergebnisse WM 2026
          </h2>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-600 group-open:rotate-45 transition-transform">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14" />
                        <path d="M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {item.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
