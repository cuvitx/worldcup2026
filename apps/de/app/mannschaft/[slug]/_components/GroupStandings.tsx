import Link from "next/link";
import type { Match, Team } from "@repo/data/types";

interface GroupStandingsProps {
  group: string;
  groupTeams: Team[];
  groupMatches: Match[];
  currentTeamId: string;
}

interface Standing {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

function computeStandings(teams: Team[], matches: Match[]): Standing[] {
  const map = new Map<string, Standing>();

  for (const team of teams) {
    map.set(team.id, {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  }

  for (const m of matches) {
    if (m.status !== "finished" || m.homeScore == null || m.awayScore == null) continue;

    const home = map.get(m.homeTeamId);
    const away = map.get(m.awayTeamId);
    if (!home || !away) continue;

    home.played++;
    away.played++;
    home.goalsFor += m.homeScore;
    home.goalsAgainst += m.awayScore;
    away.goalsFor += m.awayScore;
    away.goalsAgainst += m.homeScore;

    if (m.homeScore > m.awayScore) {
      home.won++;
      home.points += 3;
      away.lost++;
    } else if (m.homeScore < m.awayScore) {
      away.won++;
      away.points += 3;
      home.lost++;
    } else {
      home.drawn++;
      away.drawn++;
      home.points += 1;
      away.points += 1;
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goalsFor - a.goalsAgainst;
    const diffB = b.goalsFor - b.goalsAgainst;
    if (diffB !== diffA) return diffB - diffA;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return 0;
  });
}

export function GroupStandings({
  group,
  groupTeams,
  groupMatches,
  currentTeamId,
}: GroupStandingsProps) {
  const standings = computeStandings(groupTeams, groupMatches);
  const hasResults = standings.some((s) => s.played > 0);

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-lg text-gray-900">
              Rangliste Groupe {group}
            </h2>
            <Link
              href={`/gruppe/${group.toLowerCase()}`}
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Voir le groupe &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-semibold w-8">#</th>
                  <th className="px-2 py-3 text-left font-semibold">Équipe</th>
                  <th className="px-2 py-3 text-center font-semibold">J</th>
                  <th className="px-2 py-3 text-center font-semibold">V</th>
                  <th className="px-2 py-3 text-center font-semibold">N</th>
                  <th className="px-2 py-3 text-center font-semibold">D</th>
                  <th className="px-2 py-3 text-center font-semibold hidden sm:table-cell">BP</th>
                  <th className="px-2 py-3 text-center font-semibold hidden sm:table-cell">BC</th>
                  <th className="px-2 py-3 text-center font-semibold">Diff</th>
                  <th className="px-3 py-3 text-center font-semibold">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {standings.map((s, idx) => {
                  const isCurrent = s.team.id === currentTeamId;
                  const isQualified = idx < 2;
                  const diff = s.goalsFor - s.goalsAgainst;

                  return (
                    <tr
                      key={s.team.id}
                      className={`${isCurrent ? "bg-emerald-50/60" : ""} ${isQualified && hasResults ? "border-l-2 border-l-emerald-400" : ""}`}
                    >
                      <td className="px-4 py-3 text-gray-400 font-medium tabular-nums">
                        {idx + 1}
                      </td>
                      <td className="px-2 py-3">
                        <Link
                          href={`/mannschaft/${s.team.slug}`}
                          className={`flex items-center gap-2 hover:text-emerald-600 transition-colors ${isCurrent ? "font-bold text-gray-900" : "text-gray-700"}`}
                        >
                          <span className="text-base">{s.team.flag}</span>
                          <span className="truncate">{s.team.name}</span>
                        </Link>
                      </td>
                      <td className="px-2 py-3 text-center text-gray-600 tabular-nums">
                        {s.played}
                      </td>
                      <td className="px-2 py-3 text-center text-gray-600 tabular-nums">
                        {s.won}
                      </td>
                      <td className="px-2 py-3 text-center text-gray-600 tabular-nums">
                        {s.drawn}
                      </td>
                      <td className="px-2 py-3 text-center text-gray-600 tabular-nums">
                        {s.lost}
                      </td>
                      <td className="px-2 py-3 text-center text-gray-600 tabular-nums hidden sm:table-cell">
                        {s.goalsFor}
                      </td>
                      <td className="px-2 py-3 text-center text-gray-600 tabular-nums hidden sm:table-cell">
                        {s.goalsAgainst}
                      </td>
                      <td className="px-2 py-3 text-center tabular-nums font-medium">
                        <span className={diff > 0 ? "text-emerald-600" : diff < 0 ? "text-red-500" : "text-gray-500"}>
                          {diff > 0 ? `+${diff}` : diff}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center font-bold tabular-nums text-gray-900">
                        {s.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {hasResults && (
            <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50/50">
              <p className="text-[11px] text-gray-400">
                <span className="inline-block w-2 h-2 rounded-sm bg-emerald-400 mr-1 align-middle" />
                Qualifié pour les huitièmes de finale
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
