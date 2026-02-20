import { salePhases } from "./billets-data";

export function PhasesDeVente() {
  return (
    <section className="bg-gray-50 dark:bg-slate-900/50 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
           Calendrier des phases de vente
        </h2>

        <div className="space-y-3">
          {salePhases.map((phase) => (
            <div
              key={phase.phase}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 flex items-start gap-4"
            >
              <div className={`shrink-0 mt-1 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                phase.statusColor === "green"
                  ? "bg-accent/15 dark:bg-accent/10 text-accent dark:text-accent"
                  : phase.statusColor === "blue"
                  ? "bg-primary/10 dark:bg-secondary/20 text-primary dark:text-secondary"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-300 line-through"
              }`}>
                {phase.status}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                <p className="text-sm text-primary font-medium mb-1"> {phase.period}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
