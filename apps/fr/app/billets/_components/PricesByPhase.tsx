import { ticketPhases } from "./data";

const phaseIcons: Record<string, React.ReactNode> = {
  group: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 2a15 15 0 0 1 0 20m0-20a15 15 0 0 0 0 20M2 12h20"/></svg>,
  medal: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>,
  target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  flame: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  trophy: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
};

export function PricesByPhase() {
  return (
    <section id="prix" className="bg-gray-50 dark:bg-slate-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
           Prix des billets par phase
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
                  ? "bg-accent text-white"
                  : "bg-gradient-to-r from-blue-800/80 to-blue-700/80 text-white"
              }`}>
                <span className="text-2xl">{phaseIcons[phase.icon] ?? phase.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                  <p className="text-sm opacity-80"> {phase.dates}</p>
                </div>
              </div>

              <div className="p-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {phase.catPrices.map((cat) => (
                    <div key={cat.cat} className="rounded-lg bg-gray-50 dark:bg-slate-700 p-3 text-center">
                      <p className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-1">{cat.cat}</p>
                      <p className="text-base font-extrabold text-gray-900 dark:text-white">{cat.price}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{cat.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-300 italic">ℹ {phase.note}</p>
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
