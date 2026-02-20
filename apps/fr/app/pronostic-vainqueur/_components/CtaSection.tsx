import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-white dark:bg-slate-900 py-10 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-white hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-md"
          >
            📊 Comparer toutes les cotes
          </Link>
          <Link
            href="/equipe-de-france"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 dark:border-secondary/40 bg-secondary/5 dark:bg-secondary/10 px-6 py-3 font-semibold text-secondary dark:text-secondary hover:-translate-y-0.5 transition-all"
          >
            🇫🇷 Pronostic France
          </Link>
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary/30 bg-secondary/10 px-6 py-3 font-semibold text-secondary hover:bg-secondary/20 transition-all"
          >
            🏆 Simulateur de bracket
          </Link>
        </div>
      </div>
    </section>
  );
}
