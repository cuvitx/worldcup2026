interface TimeZone {
  city: string;
  utcOffset: string;
  frDiff: string;
  frTime: string;
}

interface ScheduleSlot {
  local: string;
  france: string;
  note: string;
  hot?: boolean;
}

interface TimeZoneSectionProps {
  timeZones: TimeZone[];
  typicalSchedule: ScheduleSlot[];
}

export function TimeZoneSection({ timeZones, typicalSchedule }: TimeZoneSectionProps) {
  return (
    <>
      {/* Décalage horaire */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          🕐 Décalage horaire — Villes hôtes → France
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          La CDM 2026 se joue en été (juin–juillet). La France est à l&apos;heure CEST (UTC+2).
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm bg-white dark:bg-slate-800">
            <thead className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Villes hôtes</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Fuseau local</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Décalage</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">Exemple (19h locale)</th>
              </tr>
            </thead>
            <tbody>
              {timeZones.map((tz) => (
                <tr key={tz.city} className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100 text-xs">{tz.city}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 font-mono text-xs">{tz.utcOffset}</td>
                  <td className="px-4 py-3 font-bold text-primary dark:text-secondary">{tz.frDiff}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-300 text-xs">{tz.frTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Horaires types */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          ⏰ Horaires types des matchs (EDT → France CEST)
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          La majorité des matchs de groupes se joue sur la côte Est américaine (EDT = UTC-4).
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {typicalSchedule.map((s) => (
            <div
              key={s.local}
              className={`rounded-xl p-4 border ${
                s.hot
                  ? "bg-field/5 dark:bg-field/10 border-field/20 dark:border-field/30"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="font-mono text-sm text-gray-500 dark:text-gray-300">{s.local}</div>
              <div className="text-2xl font-extrabold text-primary dark:text-secondary mt-1">{s.france}</div>
              <div className="text-xs text-gray-500 dark:text-gray-300 mt-1">{s.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/10 border border-[#FF6B35]/30 dark:border-[#FF6B35]/20 rounded-xl text-sm text-[#FF6B35] dark:text-[#FF6B35]">
          <p className="font-semibold">💡 Bon à savoir</p>
          <p className="mt-1">
            Les matchs de la France seront programmés en priorité sur des créneaux accessibles pour le public européen.
            TF1 diffusera tous les matchs des Bleus en clair, y compris ceux à l&apos;heure tardive.
          </p>
        </div>
      </section>
    </>
  );
}
