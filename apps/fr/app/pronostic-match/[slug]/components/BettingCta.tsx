import type { Bookmaker } from "@repo/data";

interface BettingCtaProps {
  featuredBookmaker: Bookmaker;
  bookmakers: Bookmaker[];
  matchLabel?: string;
}

export function BettingCta({
  featuredBookmaker,
  bookmakers,
  matchLabel,
}: BettingCtaProps) {
  const title = matchLabel ? `Parier sur ${matchLabel}` : "Parier sur ce match";

  return (
    <section className="hero-animated rounded-2xl p-6 text-white overflow-clip">
      <div className="relative z-10">
        <h2 className="text-xl font-bold text-white mb-4">{title}</h2>

        {/* Featured bookmaker */}
        <a
          href={featuredBookmaker.url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="block mb-4 rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm p-4 hover:bg-white/15 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            {featuredBookmaker.logo && (
              <img src={featuredBookmaker.logo} alt={featuredBookmaker.name} className="w-8 h-8 rounded-lg bg-white p-0.5 object-contain" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">{featuredBookmaker.name}</p>
              <p className="text-sm text-white/70">{featuredBookmaker.bonus} — {featuredBookmaker.bonusDetail}</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30 rounded-full px-2 py-0.5 shrink-0">
              Recommandé
            </span>
          </div>
          <div className="rounded-xl bg-accent text-white text-center py-2.5 font-bold text-sm hover:bg-accent/80 transition-all">
            {featuredBookmaker.bonus} → Parier maintenant
          </div>
        </a>

        {/* Other bookmakers */}
        <div className="space-y-1.5">
          {bookmakers
            .filter((bk) => bk.id !== featuredBookmaker.id)
            .map((bk) => (
              <a
                key={bk.id}
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="flex items-center justify-between rounded-lg bg-white/5 border border-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {bk.logo && <img src={bk.logo} alt={bk.name} className="w-6 h-6 rounded object-contain shrink-0" loading="lazy" />}
                  <span className="font-semibold text-sm">{bk.name}</span>
                  <span className="text-xs text-white/50 hidden sm:inline">{bk.bonus}</span>
                </div>
                <span className="text-xs font-semibold text-accent shrink-0">
                  Voir l&apos;offre →
                </span>
              </a>
            ))}
        </div>

        <p className="mt-3 text-[10px] text-white/50">
          Cotes estimées, susceptibles d&apos;évoluer. Pariez responsablement. 18+
        </p>
      </div>
    </section>
  );
}
