import Link from "next/link";

interface DarkHorsesProps {
  darkHorses: Array<{
    pred: {
      winnerProb: number;
      quarterFinalProb: number;
      eloRating: number;
    };
    team: {
      id: string;
      slug: string;
      name: string;
      flag: string;
      fifaRanking: number;
      bestResult: string;
    };
  }>;
}

export function DarkHorses({ darkHorses }: DarkHorsesProps) {
  return (
    <section id="dark-horses" className="bg-gray-50slate-900/50 py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
           Dark Horses — Les outsiders à surveiller
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Ces équipes peuvent créer la surprise et aller loin dans le tournoi.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {darkHorses.map(({ pred, team }) => {
            if (!team) return null;
            const winPct = (pred.winnerProb * 100).toFixed(1);
            const qfPct = Math.round(pred.quarterFinalProb * 100);

            return (
              <Link
                key={team.id}
                href={`/equipe/${team.slug}`}
                className="group rounded-xl border border-gray-200 bg-whiteslate-800 p-5 shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{team.flag}</span>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {team.name}
                    </p>
                    <p className="text-xs text-gray-600">#{team.fifaRanking} FIFA · ELO {pred.eloRating}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="rounded-lg bg-gray-50slate-700 p-2.5 text-center">
                    <p className="text-lg font-bold text-primary">{winPct}%</p>
                    <p className="text-[10px] text-gray-600">chance titre</p>
                  </div>
                  <div className="rounded-lg bg-gray-50slate-700 p-2.5 text-center">
                    <p className="text-lg font-bold text-accent">{qfPct}%</p>
                    <p className="text-[10px] text-gray-600">quart de finale</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                  {team.bestResult}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Special mention: hosts */}
        <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10accent/10 p-5">
          <h3 className="text-lg font-semibold text-gray-900 text-accent mb-2">
            Les pays organisateurs : avantage terrain
          </h3>
          <p className="text-sm text-accent leading-relaxed">
            États-Unis, Canada et Mexique jouent à domicile. Historiquement, le pays hôte
            bénéficie d&apos;un bonus de 6 à 8 points ELO grce au soutien du public et à la
            connaissance des terrains. Le Canada (Alphonso Davies) et le Mexique (Azteca) sont
            particulièrement à surveiller.
          </p>
        </div>
      </div>
    </section>
  );
}
