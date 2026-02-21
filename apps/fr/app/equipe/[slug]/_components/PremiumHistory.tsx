import type { Team } from "@repo/data";
import { teamWcHistory, type WcEdition } from "@repo/data/team-wc-history";

interface PremiumHistoryProps {
  team: Team;
}

function countResults(history: WcEdition[]) {
  let titles = 0, finals = 0, semis = 0, participations = 0;
  for (const e of history) {
    if (e.result.includes("CHAMPION")) titles++;
    else if (e.result.includes("Finaliste")) finals++;
    else if (e.result.includes("3e place") || e.result.includes("4e place")) semis++;
    if (!e.result.includes("Non qualifi") && !e.result.includes("Non participant") && !e.result.includes("N'existait pas")) participations++;
  }
  return { titles, finals, semis, participations };
}

function summaryLine(stats: ReturnType<typeof countResults>) {
  const parts: string[] = [];
  parts.push(`${stats.participations} participation${stats.participations > 1 ? "s" : ""}`);
  if (stats.titles > 0) parts.push(`${stats.titles} titre${stats.titles > 1 ? "s" : ""}`);
  if (stats.finals > 0) parts.push(`${stats.finals} finale${stats.finals > 1 ? "s" : ""} perdue${stats.finals > 1 ? "s" : ""}`);
  if (stats.semis > 0) parts.push(`${stats.semis} demi-finale${stats.semis > 1 ? "s" : ""}`);
  return parts.join(", ") + ".";
}

export function PremiumHistory({ team }: PremiumHistoryProps) {
  const history = teamWcHistory[team.slug];
  
  if (!history || history.length === 0) {
    // Fallback: simple stats display
    return (
      <section className="bg-white py-12 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Historique en Coupe du Monde
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
              <p className="text-3xl font-extrabold text-gray-900">{team.wcAppearances}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Participations</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
              <p className="text-lg font-extrabold text-accent">{team.bestResult}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Meilleur résultat</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-center">
              <p className="text-3xl font-extrabold text-gray-900">#{team.fifaRanking}</p>
              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">Classement FIFA</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-600 leading-relaxed">{team.description}</p>
          </div>
        </div>
      </section>
    );
  }

  const stats = countResults(history);

  return (
    <section className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Historique en Coupe du Monde (1930–2022)
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {summaryLine(stats)}
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase text-gray-700">
                <th className="text-left px-4 py-3 font-bold">Année</th>
                <th className="text-left px-4 py-3 font-bold">Résultat</th>
                <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {history.map((edition, i) => (
                <tr
                  key={edition.year}
                  className={`border-t border-gray-100 ${
                    edition.result.includes("CHAMPION")
                      ? "bg-primary/5"
                      : edition.result.includes("Finaliste")
                      ? "bg-gray-50/50"
                      : i % 2 === 0
                      ? "bg-white/30"
                      : "bg-gray-50/30"
                  }`}
                >
                  <td className="px-4 py-2.5 font-bold text-gray-900 whitespace-nowrap">
                    {edition.year}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${
                      edition.result.includes("CHAMPION")
                        ? "text-accent text-base"
                        : edition.result.includes("Finaliste")
                        ? "text-gray-600"
                        : edition.result.includes("Non qualifi") || edition.result.includes("Non participant") || edition.result.includes("N'existait pas")
                        ? "text-gray-400"
                        : "text-gray-700"
                    }`}>
                      {edition.flag && edition.flag !== "—" && edition.flag !== "" && (
                        <span className="mr-1">{edition.flag}</span>
                      )}
                      {edition.result}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-500 hidden sm:table-cell max-w-xs">
                    {edition.note}
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
