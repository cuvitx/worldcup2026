import type { CountryRecord } from "./palmares-data";

export function PalmaresByCountry({ countryRecords }: { countryRecords: CountryRecord[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        🌍 Palmarès par pays
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {countryRecords.map((cr, idx) => (
          <div
            key={cr.country}
            className={`rounded-xl border-2 p-5 shadow-sm transition-transform hover:-translate-y-1 ${
              idx === 0
                ? "border-secondary bg-secondary/5 dark:bg-secondary/10"
                : idx <= 2
                ? "border-gray-300 bg-gray-50 dark:bg-slate-800/40"
                : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{cr.flag}</span>
              <div>
                <div className="font-bold text-lg">{cr.country}</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">
                  {cr.confederation}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg bg-white dark:bg-slate-700 py-2">
                <div className="text-2xl font-extrabold text-primary">
                  {cr.titles}
                </div>
                <div className="text-xs text-gray-500">titre{cr.titles > 1 ? "s" : ""}</div>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-700 py-2">
                <div className="text-2xl font-extrabold text-gray-600 dark:text-gray-300">
                  {cr.finals}
                </div>
                <div className="text-xs text-gray-500">finale{cr.finals > 1 ? "s" : ""}</div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {cr.years.map((y) => (
                <span
                  key={y}
                  className="rounded bg-primary/10 dark:bg-primary/20 px-2 py-0.5 text-xs font-semibold text-primary"
                >
                  {y}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
