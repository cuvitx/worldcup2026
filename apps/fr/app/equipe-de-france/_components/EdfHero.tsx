import Link from "next/link";

export function EdfHero({ winnerOdds, winPct }: { winnerOdds: string; winPct: number }) {
  return (
    <section
      className="relative py-16 md:py-24 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #002395 0%, #002395 33%, #FFFFFF 33%, #FFFFFF 66%, #ED2939 66%, #ED2939 100%)",
      }}
    >
      {/* Overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-[#002395]/85" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left: Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
              <span>Double championne du monde</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3">
              🇫🇷 Les Bleus à la conquête d&apos;une 3ᵉ étoile
            </h1>
            <p className="text-xl sm:text-2xl font-light text-white/70 mb-4">
              2ᵉ au classement FIFA · 13% de chances de titre · L&apos;effectif le plus complet du monde
            </p>
            <p className="text-gray-200 max-w-2xl leading-relaxed mb-6 text-sm md:text-base">
              Mbappé, Griezmann, Tchouaméni… La France débarque en 2026 avec une seule
              obsession : la 3ᵉ étoile. Groupe I · MetLife, Philadelphia, Boston.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-3 mb-6 max-w-sm mx-auto md:mx-0">
              <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-4 text-center">
                <p className="text-2xl font-extrabold text-secondary">{winnerOdds}</p>
                <p className="text-xs text-gray-300 mt-0.5">Cote titre</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-4 text-center">
                <p className="text-2xl font-extrabold text-white">{winPct}%</p>
                <p className="text-xs text-gray-300 mt-0.5">% de chance</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-4 text-center">
                <p className="text-2xl font-extrabold text-white">#2</p>
                <p className="text-xs text-gray-300 mt-0.5">FIFA Ranking</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="#calendrier" className="rounded-lg bg-white text-primary px-5 py-2.5 font-bold text-sm hover:bg-primary/5 transition-all hover:-translate-y-0.5">
                Voir les matchs des Bleus
              </a>
              <a href="#effectif" className="rounded-lg border border-white/30 bg-white/10 px-5 py-2.5 font-semibold text-sm hover:bg-white/20 transition-all">
                Découvrir l&apos;effectif
              </a>
              <Link
                href="/pronostic-vainqueur"
                className="rounded-lg border border-secondary/40 bg-secondary/15 px-5 py-2.5 font-semibold text-secondary text-sm hover:bg-secondary/25 transition-all"
              >
                Pronostic vainqueur
              </Link>
            </div>
          </div>

          {/* Right: Blason / Stats bloc */}
          <div className="shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-sm p-6 text-center min-w-[200px]">
              <div className="text-7xl mb-3">🇫🇷</div>
              <p className="font-extrabold text-xl text-white mb-1">France</p>
              <p className="text-secondary font-semibold text-sm mb-4">Champion 1998 &amp; 2018</p>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between gap-4">
                  <span>Confédération</span>
                  <span className="font-semibold text-white">UEFA</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Groupe</span>
                  <span className="font-semibold text-white">I</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Apparitions CDM</span>
                  <span className="font-semibold text-white">16</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>ELO Rating</span>
                  <span className="font-semibold text-secondary">2065</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
