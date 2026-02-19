import { featuredBookmaker } from "@repo/data/affiliates";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-secondary" : "text-gray-400"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function FeaturedBookmaker() {
  const bk = featuredBookmaker;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Meilleur bonus du moment
        </h2>
        <div className="mx-auto max-w-2xl rounded-xl border-2 border-yellow-500/60 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-md dark:from-yellow-950/20 dark:to-slate-800 dark:border-yellow-600/40">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            {/* Logo placeholder */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
              B
            </div>
            <div className="flex-1">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {bk.name}
              </p>
              <p className="text-2xl font-extrabold text-primary">
                {bk.bonus}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {bk.bonusDetail}
              </p>
              <div className="mt-2">
                <Stars rating={bk.rating} />
              </div>
            </div>
            <a
              href={bk.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-block shrink-0 rounded-lg bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Ouvrir un compte →
            </a>
          </div>
          <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-300">
            18+ | Jeu responsable — Les jeux d&apos;argent sont interdits aux mineurs. Appelez le 09 74 75 13 13.
          </p>
        </div>
      </div>
    </section>
  );
}
