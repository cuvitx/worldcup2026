import { salePhases } from "./data";

export function SalePhasesSection() {
  return (
    <section id="phases-vente" className="bg-gray-50 py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
           Calendrier des phases de vente
        </h2>

        <div className="space-y-3">
          {salePhases.map((phase) => (
            <div
              key={phase.phase}
              className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4"
            >
              <div className={`shrink-0 mt-1 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                phase.statusColor === "green"
                  ? "bg-accent/15 text-accent"
                  : phase.statusColor === "blue"
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-500 line-through"
              }`}>
                {phase.status}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{phase.phase}</h3>
                <p className="text-sm text-primary font-medium mb-1"> {phase.period}</p>
                <p className="text-sm text-gray-600">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
