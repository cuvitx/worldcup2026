export function QuickStats() {
  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "104", label: "Matchs CDM 2026", icon: "⚽" },
            { value: "16", label: "Stades dans 3 pays", icon: "🏟️" },
            { value: "5M+", label: "Billets disponibles", icon: "🎟️" },
            { value: "19/07", label: "Date de la finale", icon: "🏆" },
          ].map((stat) => (
            <div key={stat.label} className="text-center py-2">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-2xl font-extrabold text-primary dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
