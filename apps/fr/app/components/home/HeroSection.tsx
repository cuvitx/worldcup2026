import Link from "next/link";
import { EVENT_DATES } from "@repo/data/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-white">
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center pt-16 sm:pt-20">
        {/* Badge event */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Coupe du Monde 2026 · {EVENT_DATES.RANGE_FR.replace(" 2026", "")}
          </span>
        </div>

        {/* Drapeaux pays hôtes */}
        <div className="mb-6 flex items-center justify-center gap-4 text-4xl sm:text-5xl">
          <span title="États-Unis">🇺🇸</span>
          <span title="Mexique">🇲🇽</span>
          <span title="Canada">🇨🇦</span>
        </div>

        {/* Headline */}
        <h1 className="mb-4 text-4xl font-black tracking-tight leading-none sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-white" style={{ letterSpacing: "-0.02em" }}>
            Coupe du Monde 2026
          </span>
          <span className="block text-secondary mt-2" style={{ letterSpacing: "-0.02em" }}>
            Le guide ultime du Mondial
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base text-gray-300 leading-relaxed sm:text-lg">
          Pronostics, analyses et cotes pour les{" "}
          <span className="font-semibold text-white">104 matchs</span> —{" "}
          <span className="font-semibold text-white">48 équipes</span> —{" "}
          <span className="font-semibold text-white">16 stades</span>
          <br />
          <span className="text-sm text-gray-300">
            Du 11 juin au 19 juillet 2026
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link
            href="/pronostic/vainqueur"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/80 w-full sm:w-auto"
          >
            <span className="text-base"></span>
            Mes pronostics
            <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            href="/simulateur"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 w-full sm:w-auto"
          >
            <span className="text-base"></span>
            Créer mon bracket
            <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

      </div>

      {/* Arrow scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/40 text-xl">
        ↓
      </div>
    </section>
  );
}
