import { probToOdds } from "@repo/data/affiliates";
import type { teamsById } from "@repo/data/teams";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Team = NonNullable<(typeof teamsById)[string]>;
type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface SortedTeam {
  team: Team | undefined;
  pred: Prediction | undefined;
  id: string;
}

interface QualificationOddsProps {
  sortedTeams: SortedTeam[];
}

export function QualificationOdds({ sortedTeams }: QualificationOddsProps) {
  return (
    <section className="rounded-xl bg-white dark:bg-slate-800 p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💰 Cotes de qualification (estimées)</h2>
      <p className="text-xs text-gray-400 dark:text-gray-400 mb-4">
        Cotes calculées à partir des probabilités ELO avec marge bookmaker (8%). À titre indicatif.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2 text-left">Équipe</th>
              <th className="px-4 py-2 text-center">Qual. groupes</th>
              <th className="px-4 py-2 text-center">1/8 de finale</th>
              <th className="px-4 py-2 text-center">1/4 de finale</th>
              <th className="px-4 py-2 text-center">Vainqueur</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {sortedTeams.map(({ team, pred }) => (
              <tr key={team!.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span>{team!.flag}</span>
                    <span className="font-medium">{team!.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-mono font-bold text-success dark:text-success">{pred ? probToOdds(pred.groupStageProb / 1.08) : "—"}</td>
                <td className="px-4 py-3 text-center font-mono">{pred ? probToOdds(pred.roundOf16Prob / 1.08) : "—"}</td>
                <td className="px-4 py-3 text-center font-mono text-gray-500 dark:text-gray-300">{pred ? probToOdds(pred.quarterFinalProb / 1.08) : "—"}</td>
                <td className="px-4 py-3 text-center font-mono text-gray-400 dark:text-gray-400">{pred ? probToOdds(pred.winnerProb / 1.08) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
