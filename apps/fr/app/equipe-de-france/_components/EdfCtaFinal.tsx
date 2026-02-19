import Link from "next/link";

export function EdfCtaFinal() {
  return (
    <section className="py-10 border-t border-gray-100 dark:border-slate-700"
      style={{ background: "linear-gradient(135deg, #002395 0%, #1a237e 50%, #c62828 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          🇫🇷 Allez les Bleus !
        </h2>
        <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
          La France vise la 3e étoile. Suivez tous les matchs, comparez les cotes
          et faites vos pronostics sur CDM2026.fr
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/comparateur-cotes" className="rounded-lg bg-white text-primary font-bold px-6 py-3 hover:bg-primary/5 transition-all hover:-translate-y-0.5">
            📊 Comparer les cotes
          </Link>
          <Link href="/pronostic-vainqueur" className="rounded-lg border border-secondary/40 bg-secondary/15 text-secondary font-bold px-6 py-3 hover:bg-secondary/25 transition-all">
            🏆 Pronostic vainqueur
          </Link>
          <Link href="/billets" className="rounded-lg border border-white/20 bg-white/10 text-white font-semibold px-6 py-3 hover:bg-white/20 transition-all">
            🎟️ Billets CDM 2026
          </Link>
        </div>
      </div>
    </section>
  );
}
