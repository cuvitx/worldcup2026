import Link from "next/link";
import type { LiveWinnerForecast } from "../_data/vainqueur-data";

interface HeroSectionProps {
  forecast: LiveWinnerForecast;
}

function formatUpdatedAt(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris",
  }).format(new Date(value));
}

export function HeroSection({ forecast }: HeroSectionProps) {
  const leader = forecast.leader;
  const leaderPct = leader
    ? Math.round(leader.pred.winnerProb * 100 * 10) / 10
    : null;

  return (
    <section className="hero-animated py-12 sm:py-16 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-secondary backdrop-blur-sm">
          <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
          CDM 2026 · Live forecast
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          {leader ? `${leader.team.name} en tête du forecast : ` : "Forecast vainqueur : "}
          <span className="gradient-text">qui décroche le titre ?</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-200 mb-6">
          Probabilités recalculées avec les résultats officiels, les équipes éliminées,
          le tableau restant, le modèle ELO et les cotes disponibles. Mis à jour le{" "}
          <span className="font-semibold text-white">{formatUpdatedAt(forecast.updatedAt)}</span>.
        </p>
        <div className="mx-auto mb-6 grid max-w-3xl gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/65">
              Favori live
            </p>
            <p className="mt-1 text-xl font-extrabold text-white">
              {leader ? `${leader.team.flag} ${leader.team.name}` : "À suivre"}
            </p>
            <p className="text-sm font-semibold text-secondary">
              {leaderPct != null ? `${leaderPct}% titre` : "probabilité en calcul"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/65">
              En course
            </p>
            <p className="mt-1 text-2xl font-extrabold text-white">
              {forecast.activeTeams.length}
            </p>
            <p className="text-sm text-white/75">équipes encore vivantes</p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/65">
              À 0%
            </p>
            <p className="mt-1 text-2xl font-extrabold text-white">
              {forecast.eliminatedTeams.length}
            </p>
            <p className="text-sm text-white/75">équipes éliminées</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <a
            href="#top10"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Top 10 des favoris
          </a>
          <a
            href="#analyse-top5"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Pourquoi ils peuvent gagner
          </a>
          <a
            href="#cotes"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Meilleures cotes
          </a>
          <a
            href="#historique"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Avantage domicile
          </a>
          <a
            href="#dark-horses"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-medium text-white hover:bg-white/20 transition-all"
          >
            Les surprises possibles
          </a>
        </div>
      </div>
    </section>
  );
}
