import type { PlayerData } from "./player-data";

export function WorldCupHistory({ history }: { history: PlayerData["worldCupHistory"] }) {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🏆 Historique en Coupe du Monde
        </h2>
        {history.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {history.map((wc, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-extrabold text-accent">{wc.year}</span>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">
                    {wc.result}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{wc.note}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic">
            Ce joueur n&apos;a pas encore participé à une Coupe du Monde senior.
          </p>
        )}
      </div>
    </section>
  );
}
