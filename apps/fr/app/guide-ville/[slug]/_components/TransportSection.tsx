export function TransportSection({ cityName, transport }: { cityName: string; transport: string }) {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
          🚌 Se déplacer à {cityName}
        </h2>
        <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#162A3E] border border-gray-100 dark:border-white/5">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{transport}</p>
        </div>
      </div>
    </section>
  );
}
