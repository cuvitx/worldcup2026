import type { WorldCupEdition } from "./palmares-data";

export function FinalesTable({ editions }: { editions: WorldCupEdition[] }) {
 return (
 <section>
 <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
 Tableau complet des finales
 </h2>
 <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead className="bg-primary text-white text-xs uppercase tracking-wide">
 <tr>
 <th className="px-4 py-3 text-left">Année</th>
 <th className="px-4 py-3 text-left">Pays hôte</th>
 <th className="px-4 py-3 text-left">Champion</th>
 <th className="px-4 py-3 text-center">Score</th>
 <th className="px-4 py-3 text-left">Finaliste</th>
 <th className="px-4 py-3 text-left hidden md:table-cell">3e place</th>
 <th className="px-4 py-3 text-left hidden lg:table-cell">Meilleur buteur</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-gray-100">
 {[...editions].reverse().map((ed) => (
 <tr
 key={ed.year}
 className="hover:bg-gray-50 transition-colors"
 >
 <td className="px-4 py-3 font-bold text-primary">
 {ed.year}
 </td>
 <td className="px-4 py-3 text-gray-600">
 <span className="mr-1">{ed.hostFlag}</span>
 {ed.host}
 </td>
 <td className="px-4 py-3">
 <span className="flex items-center gap-1.5 font-semibold">
 <span>{ed.winnerFlag}</span>
 <span>{ed.winner}</span>
 </span>
 </td>
 <td className="px-4 py-3 text-center">
 <span className="font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-xs">
 {ed.score}
 </span>
 </td>
 <td className="px-4 py-3 text-gray-600">
 <span className="flex items-center gap-1.5">
 <span>{ed.runnerUpFlag}</span>
 <span>{ed.runnerUp}</span>
 </span>
 </td>
 <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
 <span className="flex items-center gap-1">
 <span>{ed.thirdPlaceFlag}</span>
 <span>{ed.thirdPlace}</span>
 </span>
 </td>
 <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">
 {ed.topScorer} ({ed.topScorerGoals})
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>
 );
}
