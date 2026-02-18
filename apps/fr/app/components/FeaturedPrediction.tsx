import Link from "next/link";

const prediction = {
  home: { name: "Mexique", flag: "🇲🇽", pct: 42 },
  draw: { label: "Nul", pct: 28 },
  away: { name: "Afrique du Sud", flag: "🇿🇦", pct: 30 },
  favoriCote: "2.15",
  slug: "mexique-vs-afrique-du-sud",
};

function Bar({ pct, accent }: { pct: number; accent?: boolean }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className={`h-full rounded-full transition-all ${accent ? "bg-accent" : "bg-primary/60"}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function FeaturedPrediction() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4">
        <div className="overflow-hidden rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10 p-6 dark:from-accent/10 dark:to-accent/20 md:p-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
            ⭐ Pronostic vedette
          </p>
          <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            <span role="img" aria-label={`Drapeau de ${prediction.home.name}`}>{prediction.home.flag}</span> {prediction.home.name} vs{" "}
            {prediction.away.name} <span role="img" aria-label={`Drapeau de ${prediction.away.name}`}>{prediction.away.flag}</span>
          </h3>

          <div className="space-y-3">
            {/* Home win */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                1 — {prediction.home.name}
              </span>
              <div className="flex-1">
                <Bar pct={prediction.home.pct} accent />
              </div>
              <span className="w-10 text-right text-sm font-bold text-gray-900 dark:text-white">
                {prediction.home.pct}%
              </span>
            </div>
            {/* Draw */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                N — Nul
              </span>
              <div className="flex-1">
                <Bar pct={prediction.draw.pct} />
              </div>
              <span className="w-10 text-right text-sm font-bold text-gray-900 dark:text-white">
                {prediction.draw.pct}%
              </span>
            </div>
            {/* Away win */}
            <div className="flex items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                2 — {prediction.away.name}
              </span>
              <div className="flex-1">
                <Bar pct={prediction.away.pct} />
              </div>
              <span className="w-10 text-right text-sm font-bold text-gray-900 dark:text-white">
                {prediction.away.pct}%
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Cote estimée du favori :{" "}
            <span className="font-bold text-accent">{prediction.favoriCote}</span>
          </p>

          <Link
            href={`/pronostic-match/${prediction.slug}`}
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
          >
            Voir le pronostic complet &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
