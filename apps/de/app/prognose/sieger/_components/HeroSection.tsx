import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero-animated py-12 sm:py-16 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary backdrop-blur-sm">
          <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
          WM 2026 · Sieger-Prognose
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Argentinien, Frankreich, Spanien:{" "}
          <span className="gradient-text">Wer holt den Titel?</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-200 mb-6">
          ELO-Modell + Buchmacher-Quoten + 48 Teamanalysen. Das Ranking, das
          provoziert — in Echtzeit aktualisiert.
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <a
            href="#top10"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Top 10 der Favoriten
          </a>
          <a
            href="#analyse-top5"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Warum sie gewinnen können
          </a>
          <a
            href="#cotes"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Beste Quoten
          </a>
          <a
            href="#geschichte"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Heimvorteil
          </a>
          <a
            href="#dark-horses"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Mögliche Überraschungen
          </a>
        </div>
      </div>
    </section>
  );
}
