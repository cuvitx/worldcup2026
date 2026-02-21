import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-white py-10 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/comparateur-cotes"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-white hover:bg-accent/80 hover:-translate-y-0.5 transition-all shadow-md"
          >
            Comparer toutes les cotes
          </Link>
          <Link
            href="/equipe/france"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5secondary/10 px-6 py-3 font-semibold text-primary hover:-translate-y-0.5 transition-all"
          >
            🇫🇷 Pronostic France
          </Link>
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 font-semibold text-primary hover:bg-primary/20 transition-all"
          >
            Simulateur de bracket
          </Link>
        </div>
      </div>
    </section>
  );
}
