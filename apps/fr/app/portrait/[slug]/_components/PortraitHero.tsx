import type { PlayerData } from "./player-data";

export function PortraitHero({ player }: { player: PlayerData }) {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1628] via-[#0F1923] to-[#162A3E] text-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
              {player.flag} {player.nationality}
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              {player.name}
            </h1>
            <p className="text-lg text-white/70 mb-6">{player.fullName}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wide">Poste</p>
                <p className="text-lg font-bold mt-1">{player.position}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wide">Club</p>
                <p className="text-lg font-bold mt-1">{player.club}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wide">Naissance</p>
                <p className="text-lg font-bold mt-1">{player.birthDate}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-white/50 uppercase tracking-wide">Taille</p>
                <p className="text-lg font-bold mt-1">{player.height}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                {player.intCaps} sélections
              </span>
              <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                {player.intGoals} buts internationaux
              </span>
              <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
                Pied {player.foot.toLowerCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
