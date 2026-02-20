import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero-animated py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary backdrop-blur-sm">
          <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
          CDM 2026 · Pronostic vainqueur
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          🏆 Argentine, France, Espagne :{" "}
          <span className="gradient-text">qui décroche le titre ?</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-200 mb-6">
          Modèle ELO + cotes bookmakers + 48 analyses d&apos;équipes. Le classement qui
          dérange — mis à jour en temps réel.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <a
            href="#top10"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            🔥 Top 10 des favoris
          </a>
          <a
            href="#analyse-top5"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            💡 Pourquoi ils peuvent gagner
          </a>
          <a
            href="#cotes"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            💰 Meilleures cotes
          </a>
          <a
            href="#historique"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            🏟️ Avantage domicile
          </a>
          <a
            href="#dark-horses"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            🐴 Les surprises possibles
          </a>
        </div>
      </div>
    </section>
  );
}
