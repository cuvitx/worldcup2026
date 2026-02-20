import { ticketCategories } from "./data";

export function TicketCategoriesSection() {
  return (
    <section className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🎫 Les catégories de billets
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {ticketCategories.map((cat) => (
            <div
              key={cat.cat}
              className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cat.emoji}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{cat.cat}</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 shrink-0">👥</span>
                  <span className="text-gray-700 dark:text-gray-300"><strong>Public :</strong> {cat.target}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 shrink-0"></span>
                  <span className="text-gray-700 dark:text-gray-300"><strong>Accès :</strong> {cat.access}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
