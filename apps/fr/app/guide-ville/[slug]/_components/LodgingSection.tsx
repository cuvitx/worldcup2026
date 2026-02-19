import type { CityGuide } from "./city-data";

export function LodgingSection({ lodging }: { lodging: CityGuide["lodging"] }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🏨 Où loger
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {lodging.map((l, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-900 dark:text-white">{l.quartier}</h3>
                <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {l.budget}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{l.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
