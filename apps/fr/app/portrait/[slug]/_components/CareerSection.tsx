import type { PlayerData } from "./player-data";

export function CareerSection({ career }: { career: PlayerData["career"] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          ⚽ Parcours en club
        </h2>
        <div className="space-y-4">
          {career.map((c, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-3 p-5 rounded-xl bg-gray-50 dark:bg-gray-dark border border-gray-100 dark:border-white/5"
            >
              <div className="md:w-48 shrink-0">
                <p className="font-bold text-gray-900 dark:text-white">{c.club}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{c.period}</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
