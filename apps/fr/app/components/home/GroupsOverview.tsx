import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";

interface GroupData {
  letter: string;
  slug: string;
  teams: string[];
}

interface GroupsOverviewProps {
  groups: GroupData[];
  teamsById: Record<string, { id: string; name: string; flag: string; fifaRanking: number; isHost: boolean }>;
}

export function GroupsOverview({ groups, teamsById }: GroupsOverviewProps) {
  return (
    <section className="bg-gray-50-900/60 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent mb-1.5">
            12 groupes · 48 équipes
          </p>
          <SectionHeading title="Groupes en un coup d'œil" linkHref="/groupes" linkLabel="Voir tous les groupes →" />
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {groups.map((group) => {
            const groupTeams = group.teams
              .map((id) => teamsById[id])
              .filter((t): t is NonNullable<typeof t> => t != null)
              .sort((a, b) => {
                if (a.fifaRanking === 0) return 1;
                if (b.fifaRanking === 0) return -1;
                return a.fifaRanking - b.fifaRanking;
              });

            return (
              <Link
                key={group.slug}
                href={`/groupe/${group.slug}`}
                className="group block rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-primary to-deep">
                  <span className="text-xs font-black text-accent">
                    GROUPE {group.letter}
                  </span>
                  <span className="text-[10px] text-gray-500 group-hover:text-accent transition-colors">
                    {groupTeams.length} éq.
                  </span>
                </div>

                <div className="divide-y divide-gray-50 py-1">
                  {groupTeams.map((team, i) => (
                    <div
                      key={team.id}
                      className={`flex items-center gap-2 px-3 py-1.5 ${
                        i < 2
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      <span className="text-xs text-gray-500 w-3 shrink-0 font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm shrink-0" role="img" aria-label={team.name}>
                        {team.flag}
                      </span>
                      <span className="text-[11px] font-semibold truncate flex-1">
                        {team.name}
                      </span>
{/* host badge removed */}
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
