import { StatCard } from "@repo/ui/stat-card";

interface NotableResult {
  year: number;
  stage: string;
  detail?: string;
}

interface TeamHistoryData {
  participations: number;
  bestResult: string;
  yearsParticipated: number[];
  notableResults: NotableResult[];
  strengths: string[];
  weaknesses: string[];
  playingStyle?: string;
  anecdotes: string[];
}

interface TeamHistoryProps {
  history: TeamHistoryData | undefined;
  team: {
    name: string;
    wcAppearances: number;
    bestResult: string;
  };
}

export function TeamHistory({ history, team }: TeamHistoryProps) {
  return (
    <>
      {/* World Cup History */}
      <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Historique en Coupe du Monde</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard value={history?.participations ?? team.wcAppearances} label="Participations" />
          <StatCard value={history?.bestResult ?? team.bestResult} label="Meilleur résultat" />
        </div>

        {history && history.yearsParticipated.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Années de participation</h3>
            <div className="flex flex-wrap gap-2">
              {history.yearsParticipated.map((year) => (
                <span key={year} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20">
                  {year}
                </span>
              ))}
            </div>
          </div>
        )}

        {history && history.notableResults.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Résultats notables</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-left">
                    <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Année</th>
                    <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300">Stade</th>
                    <th className="px-3 py-2 font-semibold text-gray-600 dark:text-gray-300 hidden sm:table-cell">Détail</th>
                  </tr>
                </thead>
                <tbody>
                  {history.notableResults.map((result, idx) => (
                    <tr key={result.year} className={`border-b border-gray-100 dark:border-slate-700 ${idx % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-slate-700/30"}`}>
                      <td className="px-3 py-2 font-bold text-primary">{result.year}</td>
                      <td className="px-3 py-2 text-gray-800 dark:text-gray-200">{result.stage}</td>
                      <td className="px-3 py-2 text-gray-500 dark:text-gray-300 hidden sm:table-cell">{result.detail ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Palmarès CDM */}
      {history && (() => {
        const titles = history.notableResults.filter((r) => r.stage.includes("Champion"));
        return titles.length > 0 ? (
          <section className="rounded-xl border border-primary/30 dark:border-secondary/20 bg-primary/5 dark:bg-slate-800 p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span>🏆</span> Palmarès en Coupe du Monde
            </h2>
            <div className="flex flex-wrap gap-4 mb-4">
              {titles.map((title) => (
                <div key={title.year} className="flex flex-col items-center rounded-xl bg-primary/10 dark:bg-secondary/20 border border-primary/40 dark:border-secondary/30 px-5 py-4 min-w-[110px] text-center">
                  <span className="text-4xl mb-1">🏆</span>
                  <span className="text-2xl font-extrabold text-primary dark:text-secondary">{title.year}</span>
                  {title.detail && (
                    <span className="mt-1 text-xs text-gray-600 dark:text-gray-300 leading-snug max-w-[120px]">{title.detail}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-primary dark:text-secondary">
                {titles.length} titre{titles.length > 1 ? "s" : ""} mondial{titles.length > 1 ? "aux" : ""}
              </span>{" "}
              remporté{titles.length > 1 ? "s" : ""} en Coupe du Monde.
            </p>
          </section>
        ) : null;
      })()}

      {/* Forces & Faiblesses */}
      {history && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Forces &amp; Faiblesses</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400 uppercase tracking-wide">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 text-xs">✓</span>
                Forces
              </h3>
              <ul className="space-y-2">
                {history.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400 uppercase tracking-wide">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-xs">✗</span>
                Faiblesses
              </h3>
              <ul className="space-y-2">
                {history.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Style de jeu */}
      {history?.playingStyle && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Style de jeu</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {history.playingStyle}
          </p>
        </section>
      )}

      {/* Anecdotes */}
      {history && history.anecdotes.length > 0 && (
        <section className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Anecdotes &amp; Moments inoubliables</h2>
          <div className="space-y-4">
            {history.anecdotes.map((anecdote, idx) => (
              <div key={idx} className="flex gap-4 rounded-lg bg-gray-50 dark:bg-slate-700 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {idx + 1}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{anecdote}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
