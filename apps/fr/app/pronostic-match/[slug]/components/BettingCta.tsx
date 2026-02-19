import Image from "next/image";
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
  return (
    <section className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-6 shadow-md text-white">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {matchLabel ? `Parier sur ${matchLabel}` : "Parier sur ce match"}
      </h2>
      {/* Featured bookmaker */}
      <div className="mb-6 rounded-lg bg-white/10 backdrop-blur-sm p-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {featuredBookmaker.logo && <Image src={featuredBookmaker.logo} alt={`Logo ${featuredBookmaker.name}`} width={40} height={40} className="h-10 w-10 rounded-lg bg-white p-1 object-contain" />}
            <p className="text-lg font-bold">{featuredBookmaker.name}</p>
            <p className="text-sm text-white/80">
              {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
            </p>
            <div className="mt-1 flex items-center gap-0.5">
              {Array.from({ length: featuredBookmaker.rating }).map(
                (_, i) => (
                  <span key={i} className="text-secondary text-sm">
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
            className="inline-block rounded-lg bg-secondary px-6 py-3 text-sm font-bold text-primary hover:bg-secondary/90 transition-colors whitespace-nowrap"
          >
            {featuredBookmaker.name} - {featuredBookmaker.bonus} &rarr; {matchLabel ? `Parier sur ${matchLabel}` : "Parier maintenant"}
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
              <div className="flex items-center gap-2">
                {bk.logo && <Image src={bk.logo} alt={`Logo ${bk.name}`} width={24} height={24} className="h-6 w-6 rounded object-contain" />}
                <span className="font-semibold">{bk.name}</span>
                <span className="ml-2 text-sm text-white/70">
                  {bk.bonus} {bk.bonusDetail}
                </span>
              </div>
              <span className="text-sm font-medium text-secondary">
                Voir l&apos;offre &rarr;
              </span>
            </a>
          ))}
      </div>
      <p className="mt-4 text-xs text-white/80">
        Cotes estimées, susceptibles d&apos;évoluer. Pariez responsablement. 18+
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        🔞 Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance.
        Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé).
      </p>
    </section>
  );
}
