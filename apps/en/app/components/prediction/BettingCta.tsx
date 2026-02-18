import { bookmakers, featuredBookmaker } from "@repo/data/affiliates";

export function BettingCta() {
  return (
    <section className="rounded-lg bg-gradient-to-br from-accent to-accent/80 p-6 shadow-md text-white">
      <h2 className="mb-4 text-xl font-bold">
        Bet on this match
      </h2>
      {/* Featured bookmaker */}
      <div className="mb-6 rounded-lg bg-white/10 backdrop-blur-sm p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold">{featuredBookmaker.name}</p>
            <p className="text-sm text-white/80">
              {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
            </p>
            <div className="mt-1 flex items-center gap-0.5">
              {Array.from({ length: featuredBookmaker.rating }).map(
                (_, i) => (
                  <span key={i} className="text-gold text-sm">
                    &#9733;
                  </span>
                )
              )}
            </div>
          </div>
          <a
            href={featuredBookmaker.url}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-block rounded-lg bg-gold px-6 py-3 text-sm font-bold text-primary hover:bg-gold/90 transition-colors whitespace-nowrap"
          >
            {featuredBookmaker.name} - {featuredBookmaker.bonus} &rarr; Bet now
          </a>
        </div>
      </div>
      {/* Other bookmakers */}
      <div className="space-y-2">
        {bookmakers
          .filter((bk) => bk.id !== featuredBookmaker.id)
          .map((bk) => (
            <a
              key={bk.id}
              href={bk.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 hover:bg-white/10 transition-colors"
            >
              <div>
                <span className="font-semibold">{bk.name}</span>
                <span className="ml-2 text-sm text-white/70">
                  {bk.bonus} {bk.bonusDetail}
                </span>
              </div>
              <span className="text-sm font-medium text-gold">
                See offer &rarr;
              </span>
            </a>
          ))}
      </div>
      <p className="mt-4 text-xs text-white/60">
        Estimated odds, subject to change. Bet responsibly. 18+
      </p>
    </section>
  );
}
