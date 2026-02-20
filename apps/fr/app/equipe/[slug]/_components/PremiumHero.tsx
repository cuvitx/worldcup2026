import Link from "next/link";
import type { Team } from "@repo/data";
import type { predictionsByTeamId } from "@repo/data/predictions";

type Prediction = NonNullable<(typeof predictionsByTeamId)[string]>;

interface PremiumHeroProps {
  team: Team;
  prediction?: Prediction;
  winnerOdds: string;
  winPct: number;
}

export function PremiumHero({ team, prediction, winnerOdds, winPct }: PremiumHeroProps) {
  return (
    <section className="relative py-16 md:py-24 text-white overflow-clip hero-animated">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-95" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            {/* Badge pill */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md text-xs font-semibold uppercase tracking-widest">
              <span>{team.confederation}</span>
              {team.isHost && <span>🏠 Pays hôte</span>}
            </div>
            
            {/* Title with flag */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3">
              {team.flag} {team.name} — CDM 2026
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-light text-white/70 mb-4">
              Groupe {team.group} · FIFA #{team.fifaRanking} · {team.bestResult}
            </p>
            
            {/* Description */}
            <p className="text-gray-200 max-w-2xl leading-relaxed mb-6 text-sm md:text-base line-clamp-3">
              {team.description.split('.')[0]}.
            </p>

            {/* Glassmorphism stats cards */}
            <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto md:mx-0">
              <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm shadow-sm p-5 hover:bg-white/15 transition-all text-center">
                <p className="text-2xl font-extrabold text-secondary">{winnerOdds}</p>
                <p className="text-xs text-white/80 mt-0.5">Cote titre</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm shadow-sm p-5 hover:bg-white/15 transition-all text-center">
                <p className="text-2xl font-extrabold text-secondary">{winPct}%</p>
                <p className="text-xs text-white/80 mt-0.5">% victoire</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm shadow-sm p-5 hover:bg-white/15 transition-all text-center">
                <p className="text-2xl font-extrabold text-white">#{team.fifaRanking}</p>
                <p className="text-xs text-white/80 mt-0.5">FIFA Rank</p>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a 
                href="#calendrier" 
                className="rounded-lg bg-accent text-white px-5 py-2.5 font-bold text-sm hover:bg-accent/80 transition-all hover:-translate-y-0.5"
              >
                📅 Voir les matchs
              </a>
              <a 
                href="#effectif" 
                className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-sm hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                👥 Découvrir l&apos;effectif
              </a>
              <Link
                href="/pronostic-vainqueur"
                className="rounded-lg border border-secondary/40 bg-secondary/15 px-5 py-2.5 font-semibold text-secondary text-sm hover:bg-secondary/25 transition-all"
              >
                🏆 Pronostic vainqueur
              </Link>
            </div>
          </div>

          {/* Team card */}
          <div className="shrink-0">
            <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm shadow-lg p-5 hover:bg-white/15 transition-all text-center min-w-[200px]">
              <div className="text-7xl mb-3">{team.flag}</div>
              <p className="font-extrabold text-xl mb-1 text-white">{team.name}</p>
              <p className="text-secondary font-semibold text-sm mb-4">{team.bestResult}</p>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex justify-between gap-4">
                  <span>Confédération</span>
                  <span className="font-semibold text-white">{team.confederation}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Groupe</span>
                  <span className="font-semibold text-white">{team.group}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Participations</span>
                  <span className="font-semibold text-white">{team.wcAppearances}</span>
                </div>
                {prediction && (
                  <div className="flex justify-between gap-4">
                    <span>ELO Rating</span>
                    <span className="font-semibold text-secondary">{prediction.eloRating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
