import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";

export const metadata: Metadata = {
  title: "Calendario de partidos - Copa del Mundo 2026",
  description:
    "Calendario completo de los 104 partidos de la Copa del Mundo 2026. Fase de grupos, dieciseisavos, octavos, cuartos, semifinales y final. Del 11 de junio al 19 de julio de 2026.",
};

const stageLabels: Record<string, string> = {
  group: "Fase de grupos",
  "round-of-32": "Dieciseisavos de final",
  "round-of-16": "Octavos de final",
  "quarter-final": "Cuartos de final",
  "semi-final": "Semifinales",
  "third-place": "Tercer puesto",
  final: "Final",
};

const stageOrder = [
  "group",
  "round-of-32",
  "round-of-16",
  "quarter-final",
  "semi-final",
  "third-place",
  "final",
];

export default function CalendarioPage() {
  // Group matches by stage
  const matchesByStage = new Map<string, typeof matches>();
  for (const stage of stageOrder) {
    const stageMatches = matches.filter((m) => m.stage === stage);
    if (stageMatches.length > 0) {
      matchesByStage.set(stage, stageMatches);
    }
  }

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Inicio
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Calendario de partidos</li>
          </ol>
        </div>
      </nav>

      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Calendario de partidos</h1>
          <p className="mt-2 text-gray-300">
            104 partidos del 11 de junio al 19 de julio de 2026
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b border-gray-200 bg-white py-4 sticky top-0 z-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap gap-2">
            {stageOrder.map((stage) => {
              const count = matches.filter((m) => m.stage === stage).length;
              if (count === 0) return null;
              return (
                <a
                  key={stage}
                  href={`#${stage}`}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  {stageLabels[stage]} ({count})
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-12">
        {Array.from(matchesByStage.entries()).map(([stage, stageMatches]) => {
          // Group by date within stage
          const byDate = new Map<string, typeof matches>();
          for (const match of stageMatches) {
            const existing = byDate.get(match.date) ?? [];
            existing.push(match);
            byDate.set(match.date, existing);
          }

          return (
            <section key={stage} id={stage}>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                {stageLabels[stage]}
              </h2>

              <div className="space-y-6">
                {Array.from(byDate.entries()).map(([date, dateMatches]) => (
                  <div key={date}>
                    <h3 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      {new Date(date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </h3>
                    <div className="space-y-2">
                      {dateMatches.map((match) => {
                        const home = teamsById[match.homeTeamId];
                        const away = teamsById[match.awayTeamId];
                        const stadium = stadiumsById[match.stadiumId];

                        return (
                          <Link
                            key={match.id}
                            href={`/match/${match.slug}`}
                            className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-accent hover:bg-accent/5"
                          >
                            <span className="text-sm text-gray-500 w-12 text-center shrink-0">
                              {match.time}
                            </span>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-lg">
                                {home?.flag ?? "🏳️"}
                              </span>
                              <span className="font-medium truncate">
                                {home?.name ?? "Por determinar"}
                              </span>
                            </div>
                            <span className="text-xs text-gray-400 shrink-0">
                              vs
                            </span>
                            <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                              <span className="font-medium truncate text-right">
                                {away?.name ?? "Por determinar"}
                              </span>
                              <span className="text-lg">
                                {away?.flag ?? "🏳️"}
                              </span>
                            </div>
                            {match.group && (
                              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500 shrink-0">
                                Gr. {match.group}
                              </span>
                            )}
                            {stadium && (
                              <span className="text-xs text-gray-400 hidden sm:block shrink-0 w-32 text-right truncate">
                                {stadium.name}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
