import Link from "next/link";

export function SimulatorCta() {
  return (
    <section
      id="simulateur-cta"
      className="py-12"
      style={{
        background:
          "linear-gradient(160deg, var(--color-primary) 0%, var(--color-deep) 50%, var(--color-primary) 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          <span className="text-accent"></span>
          Simulateur interactif
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Construisez votre propre bracket
        </h2>
        <p className="text-gray-300/80 text-sm leading-relaxed mb-6 max-w-xl mx-auto">
          Notre simulateur de bracket vous permet de rejouer l&apos;intégralité de la
          CDM 2026 — de la phase de groupes à la finale. Testez vos propres pronostics,
          créez des scénarios alternatifs et partagez votre tableau avec vos amis.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/simulateur"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 font-bold text-white hover:-translate-y-1 transition-all text-base"
          >
             Lancer le simulateur bracket
          </Link>
          <Link
            href="/tableau"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 font-semibold text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all text-base"
          >
             Voir le tableau officiel
          </Link>
        </div>
        <p className="mt-4 text-[11px] text-gray-500">
          Basé sur 100 000 simulations Monte Carlo · Mis à jour en temps réel
        </p>
      </div>
    </section>
  );
}
