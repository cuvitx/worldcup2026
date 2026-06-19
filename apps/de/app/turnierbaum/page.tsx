import { getStaticAlternates } from "@repo/data/route-mapping";
import { localizeTeam } from "@repo/data/i18n";
import { stageLabelsI18n } from "@repo/data/constants";
import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Turnierbaum WM 2026 | K.o.-Runde & Finalrunde",
  description:
    "Turnierbaum der Fussball-WM 2026: Zwischenrunde, Achtelfinale, Viertelfinale, Halbfinale und Finale. Alle Paarungen der K.o.-Phase.",
  alternates: getStaticAlternates("bracket", "de"),
  openGraph: {
    title: "Turnierbaum -- WM 2026",
    description:
      "Die komplette K.o.-Phase der WM 2026 im Ueberblick.",
  },
};

const stageLabels = stageLabelsI18n.de;

export default function TurnierbaumPage() {
  const knockoutMatches = matches.filter((m) => m.stage !== "group");

  // Group by stage
  const matchesByStage: Record<string, typeof knockoutMatches> = {};
  for (const match of knockoutMatches) {
    const arr = matchesByStage[match.stage] ?? [];
    arr.push(match);
    matchesByStage[match.stage] = arr;
  }

  const stageOrder = [
    "round-of-32",
    "round-of-16",
    "quarter-final",
    "semi-final",
    "third-place",
    "final",
  ];

  return (
    <>
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Turnierbaum WM 2026
          </h1>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Die komplette K.o.-Phase: Zwischenrunde, Achtelfinale,
            Viertelfinale, Halbfinale und Finale.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {stageOrder.map((stage) => {
          const stageMatches = matchesByStage[stage];
          if (!stageMatches || stageMatches.length === 0) return null;
          const stageName = stageLabels[stage] ?? stage;

          return (
            <section key={stage}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {stageName} ({stageMatches.length} Spiele)
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {stageMatches.map((match) => {
                  const home = teamsById[match.homeTeamId];
                  const away = teamsById[match.awayTeamId];
                  const homeLoc = home ? localizeTeam(home, "de") : null;
                  const awayLoc = away ? localizeTeam(away, "de") : null;
                  const dateStr = new Date(match.date).toLocaleDateString(
                    "de-DE",
                    { day: "numeric", month: "short" }
                  );
                  const hasScore =
                    match.homeScore != null && match.awayScore != null;

                  return (
                    <Link
                      key={match.id}
                      href={`/spiel/${match.slug}`}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                    >
                      <span className="text-xs text-gray-500 w-12 shrink-0">
                        {dateStr}
                      </span>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-lg shrink-0">
                          {home?.flag ?? ""}
                        </span>
                        <span className="font-medium truncate text-sm">
                          {homeLoc?.name ?? "TBD"}
                        </span>
                      </div>
                      {hasScore ? (
                        <span className="text-sm font-bold text-gray-900 shrink-0">
                          {match.homeScore} - {match.awayScore}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 shrink-0">
                          vs
                        </span>
                      )}
                      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                        <span className="font-medium truncate text-right text-sm">
                          {awayLoc?.name ?? "TBD"}
                        </span>
                        <span className="text-lg shrink-0">
                          {away?.flag ?? ""}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">
                        {match.time}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
