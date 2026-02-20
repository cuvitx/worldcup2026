/* eslint-disable @next/next/no-img-element */

interface TVChannel {
  name: string;
  type: string;
  matches: string;
  details: string;
  logo: string;
  free: boolean;
}

interface TVFranceSectionProps {
  tvFranceDetailed: TVChannel[];
}

export function TVFranceSection({ tvFranceDetailed }: TVFranceSectionProps) {
  return (
    <section className="mb-14">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🇫🇷 Droits TV en France — Détail par chaîne
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {tvFranceDetailed.map((ch) => (
          <div
            key={ch.name}
            className={`rounded-2xl border p-6 flex flex-col ${
              ch.free
                ? "bg-field/5 dark:bg-field/10 border-field/20 dark:border-field/30"
                : "bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <img src={ch.logo} alt={ch.name} className="h-12 w-12 rounded-lg object-contain" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{ch.name}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    ch.free
                      ? "bg-field/10 dark:bg-field/20 text-field dark:text-field"
                      : "bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary"
                  }`}
                >
                  {ch.type}
                </span>
              </div>
            </div>
            <p className="text-lg font-bold text-primary dark:text-secondary mb-2">{ch.matches}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">{ch.details}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-accent/10 dark:bg-accent/10 border border-accent/30 dark:border-accent/20 rounded-xl text-sm text-accent dark:text-accent">
        <p className="font-semibold">⚠️ Note importante</p>
        <p className="mt-1">
          Les droits TV de TF1 sont encore en cours de finalisation. M6 a confirmé 54 matchs.
          beIN Sports reste le seul diffuseur de l&apos;intégralité (104 matchs). Cette page sera mise à jour dès confirmation officielle.
        </p>
      </div>
    </section>
  );
}
