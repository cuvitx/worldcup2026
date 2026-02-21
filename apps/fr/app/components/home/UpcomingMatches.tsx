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
    <section className="bg-whitegray-950 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary mb-1.5">
            Phase de groupes
          </p>
          <SectionHeading title="Prochains matchs" linkHref="/match/calendrier" linkLabel="Calendrier complet →" />
        </div>

        <div className="flex flex-col gap-3">
          {upcomingMatches.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
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
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-whiteslate-900 px-4 sm:px-6 py-4 hover:border-primary/20 hover:shadow-md transition-all"
                >
                  {/* Date & Info */}
                  <div className="hidden sm:flex flex-col items-center shrink-0 w-20 text-center">
                    <span className="text-xs font-semibold text-gray-900">
                      {formatMatchDate(match.date)}
                    </span>
                    {match.time && (
                      <span className="text-xs text-gray-500">{match.time}</span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary mt-1">
                      {match.group ? `Gr. ${match.group}` : match.stage}
                    </span>
                  </div>

                  {/* Separator */}
                  <div className="hidden sm:block w-px h-10 bg-gray-200gray-700 shrink-0" />

                  {/* Teams */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-2xl shrink-0">{home?.flag ?? ""}</span>
                      <span className="text-sm font-bold text-gray-900 truncate">
                        {home?.name ?? match.homeTeamId}
                      </span>
                    </div>

                    <span className="text-[10px] font-black text-gray-400 tracking-widest shrink-0">VS</span>

                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className="text-sm font-bold text-gray-900 truncate text-right">
                        {away?.name ?? match.awayTeamId}
                      </span>
                      <span className="text-2xl shrink-0">{away?.flag ?? ""}</span>
                    </div>
                  </div>

                  {/* Stadium */}
                  {stadium && (
                    <>
                      <div className="hidden md:block w-px h-10 bg-gray-200gray-700 shrink-0" />
                      <div className="hidden md:block shrink-0 w-40">
                        <p className="text-xs font-medium text-gray-700 truncate">{stadium.name}</p>
                        <p className="text-[10px] text-gray-500">{stadium.city}</p>
                      </div>
                    </>
                  )}

                  {/* Mobile date */}
                  <div className="sm:hidden flex flex-col items-end shrink-0 text-right">
                    <span className="text-[10px] font-semibold text-gray-600">{formatMatchDate(match.date)}</span>
                    {match.time && <span className="text-[10px] text-gray-500">{match.time}</span>}
                  </div>

                  {/* Arrow */}
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-primary shrink-0 transition-colors hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
