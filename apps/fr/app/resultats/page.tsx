import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { stageLabels } from "@repo/data/constants";
import { enrichMatchesWithResults } from "@repo/api/football/match-results";
import { RelatedLinks } from "../components/RelatedLinks";
import { PmuBanner } from "../components/PmuBanner";

const faqItems = [
  {
    question: "Comment sont calculés les scores affichés ?",
    answer:
      "Les scores sont mis à jour automatiquement via l'API officielle Football-Data. Pendant les matchs, les scores sont actualisés toutes les minutes. Une fois le match terminé, le score final est figé dans notre base de données.",
  },
  {
    question: "Quand les résultats sont-ils disponibles ?",
    answer:
      "Les résultats sont disponibles dès le coup de sifflet final de chaque match. La page est actualisée automatiquement toutes les 5 minutes pour refléter les derniers scores.",
  },
  {
    question: "Combien de matchs comporte la Coupe du Monde 2026 ?",
    answer:
      "La Coupe du Monde 2026 comprend 104 matchs au total : 72 matchs de phase de groupes (12 groupes de 4 équipes) et 32 matchs à élimination directe. Le tournoi se déroule du 11 juin au 19 juillet 2026 aux États-Unis, au Mexique et au Canada.",
  },
  {
    question: "Puis-je voir le détail de chaque match ?",
    answer:
      "Oui, cliquez sur n'importe quel résultat pour accéder à la page détaillée du match avec les statistiques complètes, les compositions, les buteurs et les temps forts de la rencontre.",
  },
];

export const metadata: Metadata = {
  title: "Résultats des matchs - Coupe du Monde 2026",
  description:
    "Tous les résultats et scores des matchs de la Coupe du Monde 2026. Retrouvez les scores finaux, buteurs et résumés de chaque rencontre du Mondial.",
  alternates: {
    canonical: "/resultats",
  },
  openGraph: {
    title: "Résultats des matchs - Coupe du Monde 2026",
    description:
      "Scores et résultats de tous les matchs de la CDM 2026. Phase de groupes et phase finale.",
  },
};

export const revalidate = 300; // 5min ISR

export default async function ResultatsPage() {
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
            Résultats Coupe du Monde 2026
          </h1>
          <p className="mt-2 text-gray-300">
            {finishedMatches.length > 0
              ? `${finishedMatches.length} match${finishedMatches.length > 1 ? "s" : ""} terminé${finishedMatches.length > 1 ? "s" : ""}`
              : "Aucun match terminé pour le moment"}
          </p>
        </div>
      </section>

      {/* CTA affilié */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-6">
        <PmuBanner tracking="resultats-top" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {finishedMatches.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-8 text-center">
            <p className="text-lg text-gray-600">
              Aucun match terminé pour le moment.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              La Coupe du Monde 2026 débute le 11 juin 2026.
            </p>
            <div className="mt-6">
              <Link
                href="/match/calendrier"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Voir le calendrier complet
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {sortedDates.map((date) => {
              const dayMatches = matchesByDate[date]!;
              const dateObj = new Date(date + "T12:00:00");
              const formattedDate = dateObj.toLocaleDateString("fr-FR", {
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
                          href={`/match/${match.slug}`}
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
                              aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}
                            >
                              {home?.flag ?? "\uD83C\uDFF3\uFE0F"}
                            </span>
                            <span className="font-medium truncate text-sm sm:text-base">
                              {home?.name ?? "A déterminer"}
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
                              {away?.name ?? "A déterminer"}
                            </span>
                            <span
                              className="text-base sm:text-lg shrink-0"
                              role="img"
                              aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}
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

      {/* CTA affilié */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <PmuBanner tracking="resultats" />
      </div>

      {/* Related links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <RelatedLinks
          variant="compact"
          links={[
            {
              href: "/match/calendrier",
              title: "Calendrier complet",
              description:
                "Consultez le programme des 104 matchs de la CDM 2026.",
              icon: "",
            },
            {
              href: "/groupes",
              title: "Les 12 groupes",
              description:
                "Classements et compositions de la phase de groupes.",
              icon: "",
            },
            {
              href: "/buteurs",
              title: "Classement buteurs",
              description:
                "Meilleurs buteurs et statistiques du tournoi.",
              icon: "",
            },
          ]}
        />
      </div>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 border-t border-gray-100">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions fréquentes — Résultats CDM 2026
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
