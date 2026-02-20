interface FeaturedMatch {
  id: string;
  date: string;
  timeFR: string;
  match: string;
  stage: string;
  stadium: string;
  tvFR: string[];
  isFrance: boolean;
  note: string;
  free: boolean;
}

interface TVScheduleSectionProps {
  featuredMatches: FeaturedMatch[];
}

export function TVScheduleSection({ featuredMatches }: TVScheduleSectionProps) {
  return (
    <section id="programme-tv" className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
         Programme TV — Matchs clés en France
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
        Heures indiquées en <strong>heure française (CEST, UTC+2)</strong>. Les matchs de la 🇫🇷 France sont sur TF1 (gratuit).
      </p>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {featuredMatches.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-4 ${
              m.isFrance
                ? "bg-secondary/5 dark:bg-secondary/10 border-secondary/30 dark:border-secondary/40"
                : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wide">{m.date}</span>
              <span className="text-lg font-extrabold text-primary dark:text-secondary shrink-0">{m.timeFR}</span>
            </div>
            <p className="font-bold text-gray-900 dark:text-gray-100 text-sm mb-1">{m.match}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300 mb-2">{m.stage} · {m.stadium}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {m.tvFR.map((ch) => (
                <span key={ch} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  ch === "TF1" || ch === "M6"
                    ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                    : "bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary"
                }`}>{ch}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 italic">{m.note}</span>
              {m.free && (
                <span className="text-[10px] font-bold bg-field/10 dark:bg-field/20 text-field dark:text-field px-1.5 py-0.5 rounded-full">GRATUIT</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <table className="w-full text-sm bg-white dark:bg-slate-800">
          <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Heure 🇫🇷</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Match</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Phase</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Chaînes 🇫🇷</th>
            </tr>
          </thead>
          <tbody>
            {featuredMatches.map((m) => (
              <tr
                key={m.id}
                className={`border-t border-gray-100 dark:border-gray-700 ${
                  m.isFrance
                    ? "bg-primary/5 dark:bg-secondary/10 hover:bg-primary/10 dark:hover:bg-secondary/15"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-300 text-xs whitespace-nowrap">{m.date}</td>
                <td className="px-4 py-3 font-extrabold text-primary dark:text-secondary whitespace-nowrap">{m.timeFR}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{m.match}</div>
                  <div className="text-xs text-gray-400 dark:text-gray-400">{m.stadium}</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-300 whitespace-nowrap">{m.stage}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {m.tvFR.map((ch) => (
                      <span key={ch} className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        ch === "TF1" || ch === "M6"
                          ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                          : "bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary"
                      }`}>{ch}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-400 mt-3 italic">
        * Programme indicatif. Horaires en heure française (CEST, UTC+2).
        Légende : <span className="font-semibold text-field dark:text-field">Vert = Gratuit</span> · <span className="font-semibold text-primary dark:text-secondary">Bleu = Abonnement</span>
      </p>
    </section>
  );
}
