const wcHistory = [
  { year: 1930, result: "Non participante", flag: "—", note: "Voyage trop long vers l'Uruguay" },
  { year: 1934, result: "1/8 de finale", flag: "🟡", note: "Éliminée par l'Autriche" },
  { year: 1938, result: "Quart de finale", flag: "🟢", note: "Battue par l'Italie (future championne)" },
  { year: 1950, result: "Phase de groupes", flag: "🔴", note: "Retrait lors du tournoi" },
  { year: 1954, result: "Quart de finale", flag: "🟢", note: "Battue par l'Allemagne" },
  { year: 1958, result: "3e place", flag: "🟢", note: "Just Fontaine : record 13 buts en 1 CDM" },
  { year: 1962, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1966, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1970, result: "Non qualifiée", flag: "—", note: "" },
  { year: 1974, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1978, result: "Phase de groupes", flag: "🔴", note: "" },
  { year: 1982, result: "4e place", flag: "🟡", note: "Tragédie de Séville — Schumacher/Battiston" },
  { year: 1986, result: "3e place", flag: "🟢", note: "Platini au sommet, battue par l'Allemagne" },
  { year: 1990, result: "Non qualifiée", flag: "—", note: "" },
  { year: 1994, result: "Non qualifiée", flag: "—", note: "Défaite contre la Bulgarie (Kostadinov)" },
  { year: 1998, result: "CHAMPIONNE", flag: "", note: "Zidane ×2, 3-0 vs Brésil en finale. À domicile !" },
  { year: 2002, result: "Phase de groupes", flag: "🔴", note: "Tenant sortant éliminé sans marquer" },
  { year: 2006, result: "Finaliste", flag: "🟡", note: "Zidane coup de tête sur Materazzi, bat. aux tirs au but" },
  { year: 2010, result: "Phase de groupes", flag: "🔴", note: "Grève historique des joueurs" },
  { year: 2014, result: "Quart de finale", flag: "🟢", note: "Battue par l'Allemagne (1-0)" },
  { year: 2018, result: "CHAMPIONNE", flag: "", note: "4-2 vs Croatie en finale. 2e étoile !" },
  { year: 2022, result: "Finaliste", flag: "🟡", note: "Mbappé ×3 en finale, but bat. aux t.a.b. vs Argentine" },
];

export function HistoryTable() {
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
