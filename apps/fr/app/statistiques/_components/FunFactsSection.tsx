interface FunFact {
  emoji: string;
  fact: string;
}

interface FunFactsSectionProps {
  funFacts: FunFact[];
}

export function FunFactsSection({ funFacts }: FunFactsSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
         Saviez-vous que…
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
        Les anecdotes et curiosités méconnues de la Coupe du Monde.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {funFacts.map((ff, i) => (
          <div
            key={i}
            className="flex gap-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-5 shadow-sm hover:border-primary/30 transition-colors"
          >
            <span className="text-3xl flex-shrink-0">{ff.emoji}</span>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {ff.fact}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
