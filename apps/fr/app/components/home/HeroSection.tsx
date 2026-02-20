import Link from "next/link";
import { Countdown } from "@repo/ui/countdown";
import { EVENT_DATES } from "@repo/data/constants";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden text-white" style={{ background: "linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)" }}>
      {/* Background — stade fantôme */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/stadiums/metlife-stadium.jpg')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-deep/40 to-primary" />

      {/* Orbs décoratifs */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center pt-16 sm:pt-20">
        {/* Badge event */}
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Coupe du Monde 2026 · {EVENT_DATES.RANGE_FR.replace(" 2026", "")}
          </span>
        </div>

        {/* Headline principale */}
        <h1 className="mb-4 text-4xl font-black tracking-tight leading-none sm:text-5xl md:text-6xl lg:text-7xl">
          <span
            className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.02em" }}
          >
            Chaque match.
          </span>
          <span
            className="block bg-gradient-to-r from-secondary via-secondary/80 to-secondary bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.02em" }}
          >
            Chaque pari.
          </span>
          <span
            className="block bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            style={{ letterSpacing: "-0.02em" }}
          >
            Chaque champion.
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-xl text-base text-gray-200 leading-relaxed sm:text-lg">
          Pronostics d&apos;experts · Cotes live · Analyses exclusives
          <br />
          <span className="text-sm text-gray-300">
            🇺🇸 États-Unis · 🇨🇦 Canada · 🇲🇽 Mexique — 48 équipes · 104 matchs
          </span>
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          <Link
            href="/pronostic-vainqueur"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-sm font-bold text-white shadow-lg shadow-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/90 w-full sm:w-auto"
          >
            <span className="text-base">🎯</span>
            Mes pronostics
            <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
          <Link
            href="/simulateur"
            className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 w-full sm:w-auto"
          >
            <span className="text-base">🏆</span>
            Créer mon bracket
            <span className="opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </div>

        {/* Countdown intégré dans le hero */}
        <Countdown />
      </div>

      {/* Arrow scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/80 text-xl">
        ↓
      </div>
    </section>
  );
}
