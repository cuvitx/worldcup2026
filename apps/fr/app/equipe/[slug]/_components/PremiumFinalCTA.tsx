import Link from "next/link";
import type { Team } from "@repo/data";

interface PremiumFinalCTAProps {
  team: Team;
}

export function PremiumFinalCTA({ team }: PremiumFinalCTAProps) {
  return (
    <section 
      className="hero-animated py-10 border-t border-gray-100 dark:border-slate-700"
    >
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">
          {team.flag} Suivez {team.name} à la CDM 2026
        </h2>
        <p className="text-white/70 text-sm mb-6 max-w-lg mx-auto">
          Tous les matchs, cotes et pronostics pour {team.name}. Comparez les bookmakers
          et faites vos paris sur CDM2026.fr
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md sm:max-w-none mx-auto">
          <Link 
            href="/comparateur-cotes" 
            className="w-full sm:w-auto rounded-lg bg-white text-primary font-bold px-6 py-3 text-center hover:bg-primary/5 transition-all hover:-translate-y-0.5"
          >
            Comparer les cotes
          </Link>
          <Link 
            href={`/pronostic/${team.slug}`}
            className="w-full sm:w-auto rounded-lg border border-accent/40 bg-accent text-white font-bold px-6 py-3 text-center hover:bg-accent/80 transition-all"
          >
            Pronostic {team.name}
          </Link>
          <Link 
            href="/pronostic-vainqueur" 
            className="w-full sm:w-auto rounded-lg border border-secondary/40 bg-secondary/15 text-secondary font-bold px-6 py-3 text-center hover:bg-secondary/25 transition-all"
          >
            Pronostic vainqueur
          </Link>
        </div>
      </div>
    </section>
  );
}
