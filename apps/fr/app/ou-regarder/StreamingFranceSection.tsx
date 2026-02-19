interface StreamingService {
  name: string;
  url: string;
  desc: string;
  price?: string;
}

interface StreamingFranceSectionProps {
  gratuit: StreamingService[];
  payant: StreamingService[];
}

export function StreamingFranceSection({ gratuit, payant }: StreamingFranceSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        💻 Streaming en France — Gratuit vs Payant
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gratuit */}
        <div className="rounded-2xl border border-field/20 dark:border-field/30 overflow-hidden">
          <div className="bg-field/5 dark:bg-field/10 px-6 py-4 border-b border-field/20 dark:border-field/30">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-field">✅ Streaming gratuit</h3>
            <p className="text-sm text-field dark:text-field">Aucun abonnement requis</p>
          </div>
          <div className="p-6 space-y-3 bg-white dark:bg-slate-800">
            {gratuit.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block p-4 rounded-xl bg-field/5 dark:bg-field/10 hover:bg-field/10 dark:hover:bg-field/20 transition-colors"
              >
                <span className="font-bold text-gray-900 dark:text-gray-100">{s.name}</span>
                <span className="ml-2 text-xs font-bold bg-field/10 dark:bg-field/20 text-field dark:text-field px-2 py-0.5 rounded-full">
                  Gratuit
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Payant */}
        <div className="rounded-2xl border border-secondary/20 dark:border-secondary/30 overflow-hidden">
          <div className="bg-secondary/5 dark:bg-secondary/10 px-6 py-4 border-b border-secondary/20 dark:border-secondary/30">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">🔒 Streaming payant</h3>
            <p className="text-sm text-secondary dark:text-secondary">Abonnement requis — 104 matchs</p>
          </div>
          <div className="p-6 space-y-3 bg-white dark:bg-slate-800">
            {payant.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block p-4 rounded-xl bg-secondary/5 dark:bg-secondary/10 hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-gray-900 dark:text-gray-100">{s.name}</span>
                  <span className="text-xs font-bold bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary px-2 py-0.5 rounded-full">
                    {s.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
