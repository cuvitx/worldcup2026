import { HeroSection } from "@repo/ui/hero-section";
import { FAQSection } from "@repo/ui/faq-section";
import { getStaticAlternates } from "@repo/data/route-mapping";
import type { Metadata } from "next";
import Link from "next/link";
import { groups } from "@repo/data/groups";
import { teamsById } from "@repo/data/teams";
import { predictionsByTeamId } from "@repo/data/predictions";
import { matches } from "@repo/data/matches";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import type { Match } from "@repo/data/types";
import { RelatedLinks } from "../components/RelatedLinks";
export const metadata: Metadata = {
  title: "Les 12 groupes de la WM 2026 | Rangliste & Prognoses",
  description:
    "Tous les groupes de la WM 2026 (A à L). Rangliste, équipes qualifiées, spielplan des matchs et pronostics pour chaque groupe.",
  alternates: getStaticAlternates("teams", "de"),
  openGraph: {
    title: "Les 12 groupes - WM 2026",
    description: "Groupes A à L de la CDM 2026 avec classement et pronostics.",
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
      question: "Combien de groupes y a-t-il dans la WM 2026 ?",
      answer: "La WM 2026 compte 12 groupes (de A à L). Chaque groupe est composé de 4 équipes, soit un total de 48 équipes participantes. C'est la première fois que le format passe de 32 à 48 équipes."
    },
    {
      question: "Combien d'équipes se qualifient par groupe ?",
      answer: "Les 2 premières équipes de chaque groupe se qualifient automatiquement pour les huitièmes de finale, soit 24 équipes. En plus de ces 24 équipes, les 8 meilleurs troisièmes parmi l'ensemble des 12 groupes se qualifient également, portant le total à 32 équipes qualifiées pour la phase à élimination directe."
    },
    {
      question: "Comment sont déterminés les meilleurs troisièmes ?",
      answer: "Les 8 meilleurs troisièmes sont classés selon les critères FIFA : nombre de points, puis différence de buts, puis nombre de buts marqués, puis fair-play, puis tirage au sort en dernier recours. Seuls les 8 meilleurs troisièmes sur les 12 groupes se qualifient."
    },
    {
      question: "Quels sont les groupes les plus relevés de la CDM 2026 ?",
      answer: "Les groupes les plus difficiles sont généralement ceux qui comportent plusieurs équipes du top 15 mondial. Le Groupe G (Espagne, Pays-Bas) et le Groupe H (Portugal, Danemark) sont considérés comme des « groupes de la mort  avec plusieurs favoris. La composition des groupes dépend du tirage au sort effectué fin 2025."
    },
    {
      question: "Quand se joue la phase de groupes de la CDM 2026 ?",
      answer: "La phase de groupes se déroule du 11 juin au 27 juin 2026. Chaque équipe joue 3 matchs de poule (un contre chaque adversaire de son groupe). Les matchs sont répartis sur les 16 stades des trois pays hôtes : États-Unis, Canada et Mexique."
    }
  ];

  return (
    <>
<HeroSection
        badge="Gruppenphase"
        title="Les 12 groupes de la CDM 2026"
        subtitle="48 équipes réparties en 12 groupes de 4. Les 2 premiers de chaque groupe et les 8 meilleurs 3e sont qualifiés."
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
                    Groupe {group.letter}
                  </h2>
                  <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                    Voir détails →
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
                            {standing.pts} pts
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
            Qualifié (top 2)
          </span>
          <span>% = chances de sortie de groupe</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/mannschaft",
              title: "Alle équipes",
              description: "Découvrez les 48 équipes qualifiées avec stats et pronostics.",
              icon: ""
            },
            {
              href: "/spiel/spielplan",
              title: " Spielplan des matchs",
              description: "Tous les matchs de la phase de groupes avec dates et horaires.",
              icon: ""
            },
            {
              href: "/prognose/vainqueur",
              title: "Prognose vainqueur",
              description: "Nos prédictions et cotes pour le vainqueur de la CDM 2026.",
              icon: ""
            }
          ]}
        />
      </div>

      <FAQSection title="Questions fréquentes sur les groupes" items={faqItems} />
    </>
  );
}
