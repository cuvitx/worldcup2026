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
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
         Programme TV — Matchs clés en France
      </h2>
      <p className="text-gray-600 mb-4 text-sm">
        Heures indiquées en <strong>heure française (CEST, UTC+2)</strong>. Les matchs de la 🇫🇷 France sont sur TF1 (gratuit).
      </p>

      {/* Mobile: cards */}
      <div className="md:hidden space-y-3">
        {featuredMatches.map((m) => (
          <div
            key={m.id}
            className={`rounded-xl border p-4 ${
              m.isFrance
                ? "bg-secondary/5secondary/10 border-secondary/30"
                : "bg-whiteslate-800 border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{m.date}</span>
              <span className="text-lg font-extrabold text-primary shrink-0">{m.timeFR}</span>
            </div>
            <p className="font-bold text-gray-900 text-sm mb-1">{m.match}</p>
            <p className="text-xs text-gray-500 mb-2">{m.stage} · {m.stadium}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {m.tvFR.map((ch) => (
                <span key={ch} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  ch === "TF1" || ch === "M6"
                    ? "bg-field/10field/20 text-field"
                    : "bg-primary/10secondary/20 text-primary"
                }`}>{ch}</span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 italic">{m.note}</span>
              {m.free && (
                <span className="text-[10px] font-bold bg-field/10field/20 text-field px-1.5 py-0.5 rounded-full">GRATUIT</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full text-sm bg-whiteslate-800">
          <thead className="bg-gray-50slate-700/50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">Date</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Heure 🇫🇷</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Match</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Phase</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Chaînes 🇫🇷</th>
            </tr>
          </thead>
          <tbody>
            {featuredMatches.map((m) => (
              <tr
                key={m.id}
                className={`border-t border-gray-100 ${
                  m.isFrance
                    ? "bg-primary/5secondary/10 hover:bg-primary/10"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-700 text-xs whitespace-nowrap">{m.date}</td>
                <td className="px-4 py-3 font-extrabold text-primary whitespace-nowrap">{m.timeFR}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-gray-900">{m.match}</div>
                  <div className="text-xs text-gray-400">{m.stadium}</div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{m.stage}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {m.tvFR.map((ch) => (
                      <span key={ch} className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        ch === "TF1" || ch === "M6"
                          ? "bg-field/10field/20 text-field"
                          : "bg-primary/10secondary/20 text-primary"
                      }`}>{ch}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 mt-3 italic">
        * Programme indicatif. Horaires en heure française (CEST, UTC+2).
        Légende : <span className="font-semibold text-field">Vert = Gratuit</span> · <span className="font-semibold text-primary">Bleu = Abonnement</span>
      </p>
    </section>
  );
}
