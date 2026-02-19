import { ticketPhases } from "./billets-data";

export function PrixParPhase() {
  return (
    <section id="prix" className="bg-gray-50 dark:bg-slate-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          💰 Prix des billets par phase
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
          Tarifs officiels FIFA en USD (convertibles en EUR selon taux de change). Phase de groupes à la finale.
        </p>

        <div className="space-y-4">
          {ticketPhases.map((phase) => (
            <div
              key={phase.phase}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
            >
              <div className={`flex items-center gap-3 px-5 py-4 ${
                phase.color === "gold"
                  ? "bg-gradient-to-r from-yellow-900/80 to-yellow-700/80 text-white"
                  : phase.color === "purple"
                  ? "bg-gradient-to-r from-purple-900/80 to-purple-700/80 text-white"
                  : phase.color === "orange"
                  ? "bg-gradient-to-r from-orange-700/80 to-orange-600/80 text-white"
                  : phase.color === "green"
                  ? "bg-gradient-to-r from-green-800/80 to-green-700/80 text-white"
                  : "bg-gradient-to-r from-blue-800/80 to-blue-700/80 text-white"
              }`}>
                <span className="text-2xl">{phase.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                  <p className="text-sm opacity-80">📅 {phase.dates}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {phase.catPrices.map((cat) => (
                    <div
                      key={cat.cat}
                      className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 text-center"
                    >
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">{cat.cat}</p>
                      <p className="text-base font-extrabold text-gray-900 dark:text-white">{cat.price}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{cat.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-300 italic">ℹ️ {phase.note}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
          * Prix indicatifs basés sur les annonces FIFA 2025. Les prix finaux seront confirmés sur fifa.com/tickets.
          Taux de change USD/EUR fluctue — prévoir ~0.92 EUR par USD.
        </p>
      </div>
    </section>
  );
}
