import { Clock } from "lucide-react"
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
      <section id="decalage-horaire" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <Clock className="h-5 w-5 inline-block" /> Décalage horaire — Villes hôtes → France
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          La CDM 2026 se joue en été (juin–juillet). La France est à l&apos;heure CEST (UTC+2).
        </p>

        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm bg-white">
            <thead className="bg-gray-50-700/50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Villes hôtes</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Fuseau local</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Décalage</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Exemple (19h locale)</th>
              </tr>
            </thead>
            <tbody>
              {timeZones.map((tz) => (
                <tr key={tz.city} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 text-xs">{tz.city}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">{tz.utcOffset}</td>
                  <td className="px-4 py-3 font-bold text-primary">{tz.frDiff}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{tz.frTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Horaires types */}
      <section id="horaires-types" className="mb-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Horaires types des matchs (EDT → France CEST)
        </h2>
        <p className="text-gray-600 mb-4 text-sm">
          La majorité des matchs de groupes se joue sur la côte Est américaine (EDT = UTC-4).
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {typicalSchedule.map((s) => (
            <div
              key={s.local}
              className={`rounded-xl p-4 border ${
                s.hot
                  ? "bg-field/5field/10 border-field/20"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="font-mono text-sm text-gray-500">{s.local}</div>
              <div className="text-2xl font-extrabold text-primary mt-1">{s.france}</div>
              <div className="text-xs text-gray-500 mt-1">{s.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-accent/10accent/10 border border-accent/30 rounded-xl text-sm text-accent">
          <p className="font-semibold"> Bon à savoir</p>
          <p className="mt-1">
            Les matchs de la France seront programmés en priorité sur des créneaux accessibles pour le public européen.
            TF1 diffusera tous les matchs des Bleus en clair, y compris ceux à l&apos;heure tardive.
          </p>
        </div>
      </section>
    </>
  );
}
