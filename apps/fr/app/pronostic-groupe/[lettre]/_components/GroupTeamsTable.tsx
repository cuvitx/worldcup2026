import Link from "next/link";
import type { teamsById } from "@repo/data/teams";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Team = NonNullable<(typeof teamsById)[string]>;
type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface SortedTeam {
  team: Team | undefined;
  pred: Prediction | undefined;
  id: string;
}

interface GroupTeamsTableProps {
  groupLetter: string;
  sortedTeams: SortedTeam[];
}

export function GroupTeamsTable({ groupLetter, sortedTeams }: GroupTeamsTableProps) {
  return (
    <section className="rounded-xl bg-white shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">
          Équipes du Groupe {groupLetter}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50-700/50 text-xs uppercase text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Équipe</th>
              <th className="px-4 py-3 text-center">FIFA</th>
              <th className="px-4 py-3 text-center">Conf.</th>
              <th className="px-4 py-3 text-center">CDM</th>
              <th className="px-4 py-3 text-left hidden sm:table-cell">Meilleur résultat</th>
              <th className="px-4 py-3 text-center">Proba qual.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedTeams.map(({ team, pred }, idx) => (
              <tr key={team!.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <Link href={`/equipe/${team!.slug}`} className="flex items-center gap-2 font-medium hover:text-primary transition-colors">
                    <span className="text-xl" aria-label={team!.name}>{team!.flag}</span>
                    <span>{team!.name}</span>
                    {team!.isHost && (
                      <span className="rounded bg-primary/10secondary/20 px-1.5 py-0.5 text-xs text-primary">Hôte</span>
                    )}
                  </Link>
                </td>
                <td className="px-4 py-3 text-center text-gray-600">{team!.fifaRanking > 0 ? `#${team!.fifaRanking}` : "—"}</td>
                <td className="px-4 py-3 text-center">
                  <span className="rounded-full bg-gray-100-700 px-3 py-1 text-xs font-medium text-gray-700">{team!.confederation}</span>
                </td>
                <td className="px-4 py-3 text-center text-gray-600">{team!.wcAppearances}</td>
                <td className="px-4 py-3 text-gray-600 text-xs hidden sm:table-cell">{team!.bestResult}</td>
                <td className="px-4 py-3 text-center">
                  {pred ? (
                    <span className={`font-bold text-sm ${idx < 2 ? "text-accent" : "text-gray-500"}`}>
                      {Math.round(pred.groupStageProb * 100)}%
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
