export function RecordsSection({ records }: { records: { icon: string; label: string; value: string; detail: string }[] }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
         Records &amp; stats marquantes
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {records.map((rec) => (
          <div
            key={rec.label}
            className="rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:border-primary/30 transition-colors"
          >
            <div className="text-3xl mb-3">{rec.icon}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              {rec.label}
            </div>
            <div className="font-bold text-lg mb-1">{rec.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {rec.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
