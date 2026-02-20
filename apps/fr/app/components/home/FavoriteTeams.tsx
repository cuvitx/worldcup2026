import { SectionHeading } from "@repo/ui/section-heading";
import Link from "next/link";
import { predictionsByTeamId } from "@repo/data/predictions";
import { estimatedOutrightOdds } from "@repo/data/affiliates";
import { favoritesByTeamId } from "@repo/data/predictions-2026";

interface FavoriteTeamsProps {
  topTeams: Array<{
    id: string;
    slug: string;
    name: string;
    flag: string;
    fifaRanking: number;
    group: string;
  }>;
}

export function FavoriteTeams({ topTeams }: FavoriteTeamsProps) {
  return (
    <section className="bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400 mb-1.5">
            Cotes Vainqueur
          </p>
          <SectionHeading title="Équipes favorites" subtitle="Top 5 FIFA · Pronostics & chances de titre" linkHref="/pronostic-vainqueur" linkLabel="Tous les pronostics →" />
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {topTeams.map((team, index) => {
            const pred = predictionsByTeamId[team.id];
            const favData = favoritesByTeamId[team.id];
            const winPct = pred ? Math.round(pred.winnerProb * 100) : null;
            const outrightOdds = favData ? favData.avgOdds.toFixed(2) : pred ? estimatedOutrightOdds(pred.winnerProb) : null;
            const trendIcon = favData?.trend === "up" ? " ↑" : favData?.trend === "down" ? " ↓" : null;
            const medals = ["🥇", "🥈", "🥉"];

            return (
              <Link
                key={team.id}
                href={`/equipe/${team.slug}`}
                className="group relative flex flex-col items-center rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900 p-5 shadow-sm text-center hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {index < 3 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                <span className="absolute top-2.5 left-2.5 text-[11px] font-black">
                  {index < 3 ? medals[index] : (
                    <span className="bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-gray-300 px-1.5 py-0.5 rounded text-[10px]">
                      #{team.fifaRanking}
                    </span>
                  )}
                </span>

                <span
                  className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
                  role="img"
                  aria-label={team.name}
                >
                  {team.flag}
                </span>

                <p className="text-sm font-extrabold text-gray-900 dark:text-gray-100 mb-1">
                  {team.name}
                </p>

                {winPct !== null && winPct > 0 && (
                  <div className="w-full mt-1.5 mb-2">
                    <div className="flex justify-between text-[9px] text-gray-500 mb-1">
                      <span>Chances</span>
                      <span className="font-bold text-primary">
                        {winPct < 1 ? "<1" : winPct}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-slate-800 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-primary to-amber-400 h-1 rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(winPct * 4, 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {outrightOdds && (
                  <div className="mt-1 w-full rounded-xl border border-amber-400/30 bg-amber-400/5 dark:bg-amber-400/10 px-3 py-2">
                    <p className="text-[9px] text-gray-500 dark:text-gray-300 mb-0.5">
                      {favData ? "Cote moy. marché" : "Cote vainqueur"}
                    </p>
                    <p className="text-lg font-black text-amber-500 dark:text-amber-400">
                      {outrightOdds}
                      {trendIcon && (
                        <span className={`text-xs ml-0.5 font-bold ${favData?.trend === "up" ? "text-success" : "text-red-400"}`}>
                          {trendIcon}
                        </span>
                      )}
                    </p>
                    {favData && (
                      <p className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Proba : {Math.round(favData.impliedProbability * 100)}%
                      </p>
                    )}
                  </div>
                )}

                <p className="text-[9px] text-gray-500 dark:text-gray-600 mt-2">
                  Groupe {team.group}
                </p>
              </Link>
            );
          })}
        </div>

        <p className="mt-4 text-center text-[10px] text-gray-500 dark:text-gray-600">
          * Cotes indicatives basées sur nos modèles. Vérifiez sur les bookmakers agréés.
          Pariez responsablement. 18+
        </p>
      </div>
    </section>
  );
}
