import { wcHistory } from "./edf-data";

export function HistoriqueTable() {
  return (
    <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📜 Historique en Coupe du Monde (1930–2022)
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          16 participations, 2 titres, 2 finales perdues, 2 troisièmes places.
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <table className="w-full text-sm min-w-[480px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-gray-700 dark:text-gray-300">
                <th className="text-left px-4 py-3 font-bold">Année</th>
                <th className="text-left px-4 py-3 font-bold">Résultat</th>
                <th className="text-left px-4 py-3 font-bold hidden sm:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {wcHistory.map((edition, i) => (
                <tr
                  key={edition.year}
                  className={`border-t border-gray-100 dark:border-slate-700/50 ${
                    edition.result.includes("CHAMPION")
                      ? "bg-primary/5 dark:bg-secondary/10"
                      : edition.result.includes("Finaliste")
                      ? "bg-gray-50/50 dark:bg-slate-800/50"
                      : i % 2 === 0
                      ? "bg-white dark:bg-slate-800/30"
                      : "bg-gray-50/30 dark:bg-slate-800/60"
                  }`}
                >
                  <td className="px-4 py-2.5 font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {edition.year}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${
                      edition.result.includes("CHAMPION")
                        ? "text-accent text-base"
                        : edition.result.includes("Finaliste")
                        ? "text-gray-600 dark:text-gray-200"
                        : edition.result === "Non participante" || edition.result === "Non qualifiée"
                        ? "text-gray-400 dark:text-gray-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {edition.flag !== "—" && edition.flag !== "" && (
                        <span className="mr-1">{edition.flag}</span>
                      )}
                      {edition.flag === "" && <span className="mr-1 text-accent"></span>}
                      {edition.result}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-xs text-gray-500 dark:text-gray-300 hidden sm:table-cell max-w-xs">
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
