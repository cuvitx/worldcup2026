import { HeroSection } from "@repo/ui/hero-section";
import { FAQSection } from "@repo/ui/faq-section";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teamsById, matches } from "../../lib/localized-data";
import { predictionsByTeamId } from "@repo/data/predictions";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import type { Match } from "@repo/data/types";
import { RelatedLinks } from "../components/RelatedLinks";
export const metadata: Metadata = {
  title: "Die 12 Gruppen der WM 2026 | Tabelle & Prognosen",
  description:
    "Alle Gruppen der WM 2026 (A bis L). Tabelle, qualifizierte Mannschaften, Spielplan und Prognosen für jede Gruppe.",
  alternates: getStaticAlternates("teams", "de"),
  openGraph: {
    title: "Die 12 Gruppen - WM 2026",
    description: "Gruppen A bis L der WM 2026 mit Tabelle und Prognosen.",
  },
};

export const revalidate = 300; // 5min ISR

export default async function GroupsPage() {
  // Build team name map and enrich matches with API results
  const teamNameMap: Record<string, string> = {};
  for (const [id, t] of Object.entries(teamsById)) {
    if (t) teamNameMap[id] = t.name;
  }
  const enrichedMatches = await enrichMatchesWithResults(matches, teamNameMap);

  // Group enriched matches by group letter
  const enrichedMatchesByGroup: Record<string, Match[]> = {};
  for (const m of enrichedMatches) {
    if (m.group) {
      const arr = enrichedMatchesByGroup[m.group] ?? [];
      arr.push(m);
      enrichedMatchesByGroup[m.group] = arr;
    }
  }
  const faqItems = [
    {
      question: "Wie viele Gruppen gibt es bei der WM 2026?",
      answer: "Die WM 2026 umfasst 12 Gruppen (A bis L). Jede Gruppe besteht aus 4 Mannschaften, insgesamt 48 teilnehmende Mannschaften. Es ist das erste Mal, dass das Format von 32 auf 48 Mannschaften erweitert wird."
    },
    {
      question: "Wie viele Mannschaften qualifizieren sich pro Gruppe?",
      answer: "Die 2 erstplatzierten Mannschaften jeder Gruppe qualifizieren sich automatisch für das Achtelfinale, also 24 Mannschaften. Zusätzlich qualifizieren sich die 8 besten Gruppendritten aus allen 12 Gruppen, sodass insgesamt 32 Mannschaften in die K.-o.-Runde einziehen."
    },
    {
      question: "Wie werden die besten Gruppendritten ermittelt?",
      answer: "Die 8 besten Gruppendritten werden nach FIFA-Kriterien gerankt: Punktzahl, dann Tordifferenz, dann Anzahl geschossener Tore, dann Fair Play, dann Losentscheid als letztes Mittel. Nur die 8 besten Gruppendritten von 12 Gruppen qualifizieren sich."
    },
    {
      question: "Welche sind die stärksten Gruppen der WM 2026?",
      answer: "Die schwierigsten Gruppen sind in der Regel jene mit mehreren Mannschaften aus den Top 15 der Weltrangliste. Gruppe G (Spanien, Niederlande) und Gruppe H (Portugal, Dänemark) gelten als Todesgruppen mit mehreren Favoriten. Die Gruppenzusammensetzung wurde Ende 2025 ausgelost."
    },
    {
      question: "Wann findet die Gruppenphase der WM 2026 statt?",
      answer: "Die Gruppenphase läuft vom 11. Juni bis 27. Juni 2026. Jede Mannschaft spielt 3 Gruppenspiele (je eines gegen jeden Gruppengegner). Die Spiele verteilen sich auf 16 Stadien in den drei Gastgeberländern: USA, Kanada und Mexiko."
    }
  ];

  return (
    <>
<HeroSection
        badge="Gruppenphase"
        title="Die 12 Gruppen der WM 2026"
        subtitle="48 Mannschaften aufgeteilt in 12 Gruppen zu je 4. Die 2 Erstplatzierten jeder Gruppe und die 8 besten Dritten sind qualifiziert."
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const gMatches = enrichedMatchesByGroup[group.letter] ?? [];
            const hasResults = gMatches.some((m) => m.status === "finished");

            // Compute standings if results exist
            const standingsMap = new Map<string, { pts: number; gd: number; gf: number; played: number }>();
            for (const id of group.teams) {
              standingsMap.set(id, { pts: 0, gd: 0, gf: 0, played: 0 });
            }
            for (const m of gMatches) {
              if (m.status !== "finished" || m.homeScore == null || m.awayScore == null) continue;
              const h = standingsMap.get(m.homeTeamId);
              const a = standingsMap.get(m.awayTeamId);
              if (!h || !a) continue;
              h.played++; a.played++;
              h.gf += m.homeScore; a.gf += m.awayScore;
              h.gd += m.homeScore - m.awayScore;
              a.gd += m.awayScore - m.homeScore;
              if (m.homeScore > m.awayScore) { h.pts += 3; }
              else if (m.homeScore < m.awayScore) { a.pts += 3; }
              else { h.pts += 1; a.pts += 1; }
            }

            const groupTeams = group.teams
              .map((id) => {
                const team = teamsById[id];
                const pred = predictionsByTeamId[id];
                const standing = standingsMap.get(id);
                return { team, pred, id, standing };
              })
              .sort((a, b) => {
                if (hasResults) {
                  const ptsA = a.standing?.pts ?? 0;
                  const ptsB = b.standing?.pts ?? 0;
                  if (ptsB !== ptsA) return ptsB - ptsA;
                  const gdA = a.standing?.gd ?? 0;
                  const gdB = b.standing?.gd ?? 0;
                  if (gdB !== gdA) return gdB - gdA;
                  return (b.standing?.gf ?? 0) - (a.standing?.gf ?? 0);
                }
                return (b.pred?.eloRating ?? 0) - (a.pred?.eloRating ?? 0);
              });

            return (
              <Link
                key={group.letter}
                href={`/gruppe/${group.slug}`}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                {/* Header */}
                <div className="hero-animated px-4 py-3 flex items-center justify-between">
                  <h2 className="text-xl sm:text-2xl font-bold text-accent">
                    Gruppe {group.letter}
                  </h2>
                  <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                    Details ansehen →
                  </span>
                </div>

                {/* Teams table */}
                <div className="divide-y divide-gray-100">
                  {groupTeams.map(({ team, pred, id, standing }, idx) => {
                    const isQualified = idx < 2;
                    return (
                      <div
                        key={id}
                        className={`flex items-center gap-3 px-4 py-3 text-sm ${
                          isQualified
                            ? "bg-accent/5"
                            : ""
                        }`}
                      >
                        <span className="w-5 text-center text-xs font-bold text-gray-600">
                          {idx + 1}
                        </span>
                        <span className="text-xl" role="img" aria-label={team?.name ?? id}>
                          {team?.flag ?? ""}
                        </span>
                        <span className={`flex-1 font-medium break-words text-sm ${
                          isQualified
                            ? "text-accent"
                            : "text-gray-800"
                        }`}>
                          {team?.name ?? id}
                        </span>
                        {hasResults && standing ? (
                          <span className="text-xs font-bold text-[#022149] tabular-nums">
                            {standing.pts} Pkt
                          </span>
                        ) : (
                          <>
                            {team && (
                              <span className="text-xs text-gray-500">
                                #{team.fifaRanking}
                              </span>
                            )}
                            {pred && (
                              <span className="text-xs font-bold text-primary tabular-nums">
                                {(pred.groupStageProb * 100).toFixed(0)}%
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-8 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded bg-accent/10 border border-accent/30" />
            Qualifiziert (Top 2)
          </span>
          <span>% = Chancen auf Gruppenqualifikation</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/mannschaft",
              title: "Alle Mannschaften",
              description: "Entdecken Sie die 48 qualifizierten Mannschaften mit Statistiken und Prognosen.",
              icon: ""
            },
            {
              href: "/spiel/spielplan",
              title: "Spielplan",
              description: "Alle Spiele der Gruppenphase mit Daten und Uhrzeiten.",
              icon: ""
            },
            {
              href: "/prognose/sieger",
              title: "Prognose Sieger",
              description: "Unsere Vorhersagen und Quoten für den Sieger der WM 2026.",
              icon: ""
            }
          ]}
        />
      </div>

      <FAQSection title="Häufige Fragen zu den Gruppen" items={faqItems} />
    </>
  );
}
