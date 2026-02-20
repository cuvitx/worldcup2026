import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";

interface MatchData {
  id: string;
  slug: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  time?: string;
  stadiumId: string;
  group?: string;
  stage?: string;
  matchday?: number;
}

interface UpcomingMatchesProps {
  upcomingMatches: MatchData[];
  teamsById: Record<string, { id: string; name: string; flag: string }>;
  stadiumsById: Record<string, { id: string; name: string; city: string }>;
}

function formatMatchDate(date: string) {
  return new Date(date + "T00:00:00Z").toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function UpcomingMatches({ upcomingMatches, teamsById, stadiumsById }: UpcomingMatchesProps) {
  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5">
            Phase de groupes
          </p>
          <SectionHeading title="Prochains matchs" linkHref="/match/calendrier" linkLabel="Calendrier complet →" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {upcomingMatches.length === 0 ? (
            <p className="col-span-3 text-center text-gray-500 py-8">
              Aucun match à venir.
            </p>
          ) : (
            upcomingMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];

              return (
                <Link
                  key={match.id}
                  href={`/pronostic-match/${match.slug}`}
                  className="group relative flex flex-col rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                >
                  <div className="h-0.5 bg-primary" />

                  <div className="flex items-center justify-between px-4 pt-3 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {match.group ? `Groupe ${match.group}` : match.stage}
                      {match.matchday ? ` · J${match.matchday}` : ""}
                    </span>
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-300">
                      {formatMatchDate(match.date)}
                      {match.time && (
                        <span className="ml-1 text-gray-500"> {match.time}</span>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 px-4 py-4">
                    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-4xl drop-shadow-sm" role="img" aria-label={home?.name}>
                        {home?.flag ?? "🏳️"}
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100 text-center truncate w-full">
                        {home?.name ?? match.homeTeamId}
                      </span>
                    </div>

                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-xs font-black text-primary tracking-widest">VS</span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                      <span className="text-4xl drop-shadow-sm" role="img" aria-label={away?.name}>
                        {away?.flag ?? "🏳️"}
                      </span>
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100 text-center truncate w-full">
                        {away?.name ?? match.awayTeamId}
                      </span>
                    </div>
                  </div>

                  {stadium && (
                    <div className="px-4 pb-4 mt-auto">
                      <div className="flex items-center gap-1.5 rounded-xl bg-gray-50 dark:bg-slate-800/60 px-3 py-2">
                        <span className="text-sm"></span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-gray-700 dark:text-gray-300 truncate">
                            {stadium.name}
                          </p>
                          <p className="text-[9px] text-gray-500 dark:text-gray-400">
                            {stadium.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="px-4 pb-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="block text-center text-[11px] font-bold text-primary">
                      Voir le pronostic →
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
