export function WhyDecisive({ reasons }: { reasons: string[] }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          🔥 Pourquoi il sera décisif en 2026
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-accent/5 to-transparent border border-accent/10"
            >
              <span className="text-2xl font-extrabold text-accent shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-gray-700 dark:text-gray-300">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
