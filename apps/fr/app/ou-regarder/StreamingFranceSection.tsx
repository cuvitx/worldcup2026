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
    <section id="streaming-france" className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
         Streaming en France — Gratuit vs Payant
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gratuit */}
        <div className="rounded-2xl border border-field/20 overflow-hidden">
          <div className="bg-field/5field/10 px-6 py-4 border-b border-field/20">
            <h3 className="text-lg font-semibold text-gray-900 text-field"><svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg> Streaming gratuit</h3>
            <p className="text-sm text-field">Aucun abonnement requis</p>
          </div>
          <div className="p-6 space-y-3 bg-white">
            {gratuit.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block p-4 rounded-xl bg-field/5field/10 hover:bg-field/10 transition-colors"
              >
                <span className="font-bold text-gray-900">{s.name}</span>
                <span className="ml-2 text-xs font-bold bg-field/10field/20 text-field px-2 py-0.5 rounded-full">
                  Gratuit
                </span>
                <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>

        {/* Payant */}
        <div className="rounded-2xl border border-primary/20 overflow-hidden">
          <div className="bg-primary/5secondary/10 px-6 py-4 border-b border-primary/20">
            <h3 className="text-lg font-semibold text-gray-900"><svg className="w-4 h-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Streaming payant</h3>
            <p className="text-sm text-primary">Abonnement requis — 104 matchs</p>
          </div>
          <div className="p-6 space-y-3 bg-white">
            {payant.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block p-4 rounded-xl bg-primary/5secondary/10 hover:bg-primary/10 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-gray-900">{s.name}</span>
                  <span className="text-xs font-bold bg-primary/10secondary/20 text-primary px-2 py-0.5 rounded-full">
                    {s.price}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
