interface Record {
  icon: string;
  category: string;
  title: string;
  detail: string;
  badge: string;
  badgeColor: string;
}

interface RecordsGridProps {
  records: Record[];
}

export function RecordsGrid({ records }: RecordsGridProps) {
  return (
    <section id="records">
      <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
         Records historiques
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Les moments qui ont marqué l'histoire du football mondial.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {records.map((rec) => (
          <div
            key={rec.title}
            className="bg-whiteslate-800 rounded-xl border border-gray-100 p-5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">{rec.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {rec.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${rec.badgeColor}`}
                  >
                    {rec.badge}
                  </span>
                </div>
                <div className="font-bold text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors">
                  {rec.title}
                </div>
                <div className="text-xs text-gray-500">
                  {rec.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
