import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import { matches, teamsById, stadiumsById } from "../../../lib/localized-data";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import CalendarViewWrapper from "./CalendarViewWrapper";
import { FileText } from "lucide-react";
import { RelatedLinks } from "../../components/RelatedLinks";
import { PmuBanner } from "../../components/PmuBanner";

const faqSpielplanItems = [
  {
    question: "Wann beginnt die WM 2026?",
    answer:
      "Die WM 2026 beginnt am 11. Juni 2026 mit dem Eroffnungsspiel im Aztekenstadion in Mexiko-Stadt (Mexiko). Das Finale findet am 19. Juli 2026 im MetLife Stadium in New York/New Jersey statt. Das Turnier erstreckt sich uber 39 Tage.",
  },
  {
    question: "Wie viele Spiele hat die WM 2026?",
    answer:
      "Die WM 2026 umfasst insgesamt 104 Spiele: 72 Gruppenspiele (12 Gruppen x 3 Spiele + 1 Spiel pro Gruppe), 32 K.o.-Spiele (Achtelfinale, Viertelfinale, Halbfinale, Spiel um Platz 3 und Finale). Das sind 40 Spiele mehr als bei den Ausgaben mit 32 Mannschaften.",
  },
  {
    question: "Welcher Sender ubertragt die WM 2026 in Deutschland?",
    answer:
      "In Deutschland ubertragen ARD und ZDF die WM 2026 im Free-TV. MagentaTV bietet die vollstandige Ubertragung aller 104 Spiele. Die Spiele konnen auch via Streaming uber die ARD/ZDF-Mediathek (kostenlos) und MagentaTV verfolgt werden.",
  },
  {
    question: "Wo finden die Spiele der deutschen Mannschaft statt?",
    answer:
      "Die Gruppenspiele der deutschen Nationalmannschaft finden in den USA, Mexiko oder Kanada statt. Bei Qualifikation fur die K.o.-Runde konnen die Spiele in anderen Austragungsorten stattfinden.",
  },
];

export const metadata: Metadata = {
  title: "Spielplan - WM 2026",
  description:
    "Vollstandiger Spielplan der 104 Spiele der WM 2026. Gruppenphase, Achtelfinale, Viertelfinale, Halbfinale und Finale. Vom 11. Juni bis 19. Juli 2026.",
  alternates: getStaticAlternates("matchSchedule", "de"),
};

export const revalidate = 300; // 5min ISR — auto-refresh scores

export default async function SpielplanPage() {
  // Build team name map for API matching
  const teamNameMap: Record<string, string> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamNameMap[id] = t.name;
  }

  // Enrich static matches with real API results
  const enrichedMatches = await enrichMatchesWithResults(matches, teamNameMap);

  // Serialize data for client component
  const matchData = enrichedMatches.map((m) => ({
    id: m.id,
    slug: m.slug,
    homeTeamId: m.homeTeamId,
    awayTeamId: m.awayTeamId,
    date: m.date,
    time: m.time,
    stadiumId: m.stadiumId,
    stage: m.stage,
    group: m.group,
    homeScore: m.homeScore,
    awayScore: m.awayScore,
    status: m.status,
  }));

  const teamData: Record<string, { id: string; name: string; flag: string }> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamData[id] = { id: t.id, name: t.name, flag: t.flag };
  }

  const stadiumData: Record<string, { id: string; name: string }> = {};
  for (const [id, s] of Object.entries(stadiumsById)) {
    if (s) stadiumData[id] = { id: s.id, name: s.name };
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSpielplanItems.map((item) => ({
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
          <h1 className="text-2xl font-extrabold sm:text-4xl">Spielplan</h1>
          <p className="mt-2 text-gray-300">
            104 Spiele vom 11. Juni bis 19. Juli 2026
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="/api/calendar"
              download="wm2026.ics"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              Spielplan
            </a>
            <a
              href="/spielkalender/drucken"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <FileText className="w-4 h-4" />
              PDF
            </a>
          </div>
        </div>
      </section>

      {/* CTA affilié — bannière haute visibilité */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6">
        <PmuBanner tracking="spielplan-top" />
      </div>

      <CalendarViewWrapper
        matches={matchData}
        teamsById={teamData}
        stadiumsById={stadiumData}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <PmuBanner tracking="spielplan" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/gruppen",
              title: " Die 12 Gruppen",
              description: "Zusammensetzung und Tabellen der Gruppenphase.",
              icon: ""
            },
            {
              href: "/stadien",
              title: " Die 16 Stadien",
              description: "Entdecken Sie die Stadien der WM 2026.",
              icon: ""
            },
            {
              href: "/wo-schauen",
              title: " Wo schauen",
              description: "TV-Sender und Streaming fur alle Spiele.",
              icon: ""
            }
          ]}
        />
      </div>

      {/* ===== FAQ ===== */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Haufig gestellte Fragen — Spielplan WM 2026
          </h2>
          <div className="space-y-3">
            {faqSpielplanItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-semibold text-gray-900 hover:text-primary transition-colors list-none">
                    {item.question}
                    <span className="ml-4 shrink-0 text-gray-600 group-open:rotate-45 transition-transform">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
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
