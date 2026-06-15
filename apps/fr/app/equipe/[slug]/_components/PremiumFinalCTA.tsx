import Link from "next/link";
import type { Team } from "@repo/data";
import { pmuTrackingUrl } from "@repo/data/affiliates";

interface PremiumFinalCTAProps {
  team: Team;
}

export function PremiumFinalCTA({ team }: PremiumFinalCTAProps) {
  return (
    <section 
      className="hero-animated py-10 border-t border-gray-100"
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
          <a
            href={pmuTrackingUrl(`equipe-${team.slug}`)}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="w-full sm:w-auto rounded-lg bg-white text-primary font-bold px-6 py-3 text-center hover:scale-105 transition-all"
          >
            100€ offerts sur PMU Sport &rarr;
          </a>
          <Link
            href={`/pronostic/${team.slug}`}
            className="w-full sm:w-auto rounded-lg border border-accent/40 bg-accent text-white font-bold px-6 py-3 text-center hover:bg-accent/80 transition-all"
          >
            Pronostic {team.name}
          </Link>
          <Link
            href="/pronostic/vainqueur"
            className="w-full sm:w-auto rounded-lg border border-accent/40 bg-accent/15 text-accent font-bold px-6 py-3 text-center hover:bg-accent/25 transition-all"
          >
            Pronostic vainqueur
          </Link>
        </div>
        <p className="text-[10px] text-white/40 mt-4">18+ | Offre soumise à conditions</p>
      </div>
    </section>
  );
}
