import Link from "next/link";
import { teamsById } from "../../../lib/localized-data";
import { predictionsByTeamId } from "@repo/data/predictions";

export function ProbabilitiesTable() {
  return (
    <section className="rounded-xl bg-white p-4 sm:p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Wahrscheinlichkeiten pro Runde</h2>
      <p className="text-sm text-gray-500 mb-4">Chancen jeder Mannschaft, jede Runde zu erreichen, basierend auf ELO-Ranglisten.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left">
              <th className="pb-3 font-medium text-gray-500">Mannschaft</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Gruppenphase</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Achtelfinale</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Viertelfinale</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Halbfinale</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Finale</th>
              <th className="pb-3 font-medium text-gray-500 text-right">Weltmeister</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[...Object.values(predictionsByTeamId)]
              .sort((a, b) => b.winnerProb - a.winnerProb)
              .slice(0, 16)
              .map((pred) => {
                const team = teamsById[pred.teamId];
                if (!team) return null;
                return (
                  <tr key={pred.teamId} className="hover:bg-gray-50 transition-colors">
                    <td className="py-2.5">
                      <Link href={`/mannschaft/${team.slug}`} className="flex items-center gap-2 hover:text-primary text-gray-900">
                        <span role="img" aria-label={`Flagge von ${team.name}`}>{team.flag}</span>
                        <span className="font-medium">{team.name}</span>
                      </Link>
                    </td>
                    <td className="py-2.5 text-right">{(pred.groupStageProb * 100).toFixed(0)}%</td>
                    <td className="py-2.5 text-right">{(pred.roundOf16Prob * 100).toFixed(0)}%</td>
                    <td className="py-2.5 text-right">{(pred.quarterFinalProb * 100).toFixed(0)}%</td>
                    <td className="py-2.5 text-right">{(pred.semiFinalProb * 100).toFixed(0)}%</td>
                    <td className="py-2.5 text-right">{(pred.finalProb * 100).toFixed(0)}%</td>
                    <td className="py-2.5 text-right font-bold text-primary">
                      {pred.winnerProb >= 0.01 ? `${(pred.winnerProb * 100).toFixed(1)}%` : `${(pred.winnerProb * 100).toFixed(2)}%`}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
