import Link from "next/link";
import { teams } from "@repo/data/teams";
import {
  favoritesByTeamId,
} from "@repo/data/predictions-2026";
import {
  estimatedOutrightOdds,
} from "@repo/data/affiliates";

interface TopFavoritesProps {
  top10: Array<{
    pred: {
      teamId: string;
      winnerProb: number;
      finalProb: number;
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
  teamArguments: Record<string, { pros: string[]; cons: string[] }>;
}

export function TopFavorites({ top10, teamArguments }: TopFavoritesProps) {
  return (
    <section id="top10" className="bg-gray-50 dark:bg-slate-900/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🥇</span> Top 10 des favoris CDM 2026
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Classement par probabilité de victoire (modèle ELO + cotes bookmakers)</p>
        </div>

        <div className="space-y-3">
          {top10.map(({ pred, team }, index) => {
            if (!team) return null;
            const winPct = Math.round(pred.winnerProb * 100 * 10) / 10;
            const fav = favoritesByTeamId[team.id];
            const approxOdds = fav ? fav.avgOdds.toFixed(2) : estimatedOutrightOdds(pred.winnerProb);
            const trendIcon = fav ? (fav.trend === "up" ? " ↑" : fav.trend === "down" ? " ↓" : "") : "";
            const trendColor = fav?.trend === "up" ? "text-success" : fav?.trend === "down" ? "text-red-400" : "";
            const args = teamArguments[team.id];

            return (
              <div
                key={team.id}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Rank */}
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg ${
                    index === 0 ? "bg-secondary/20 text-secondary border-2 border-secondary/50" :
                    index === 1 ? "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200" :
                    index === 2 ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-secondary" :
                    "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300"
                  }`}>
                    {index + 1}
                  </div>

                  {/* Flag + Name */}
                  <span className="text-4xl shrink-0">{team.flag}</span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/equipe/${team.slug}`}
                      className="text-lg font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
                    >
                      {team.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        #{team.fifaRanking} FIFA
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-300">
                        ELO {pred.eloRating}
                      </span>
                      <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                        {team.bestResult}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="text-2xl font-extrabold text-primary">
                      {winPct < 1 ? "<1" : winPct}%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">chance titre</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-bold text-secondary">
                      {approxOdds}
                      {trendIcon && (
                        <span className={`text-sm ml-1 font-bold ${trendColor}`}>{trendIcon}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {fav ? "cote moy. marché" : "cote approx."}
                    </p>
                  </div>
                </div>

                {/* Real bookmaker odds strip (if in top10Favorites) */}
                {fav && (
                  <div className="grid grid-cols-3 gap-1.5 px-5 pb-2">
                    <span className="rounded bg-primary/10 dark:bg-primary/20 border border-primary/20 px-2 py-1 text-xs font-bold text-primary dark:text-secondary text-center">
                      Winamax {fav.winamax.toFixed(2)}
                    </span>
                    <span className="rounded bg-secondary/10 border border-secondary/30 px-2 py-1 text-xs font-bold text-secondary text-center">
                      Bet365 {fav.bet365.toFixed(2)}
                    </span>
                    <span className="rounded bg-success//10 border border-success//30 px-2 py-1 text-xs font-bold text-success text-center">
                      DraftKings {fav.draftkings.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Mobile: chance titre */}
                <div className="flex sm:hidden items-center gap-4 px-5 pb-3">
                  <span className="text-xl font-extrabold text-primary">{winPct < 1 ? "<1" : winPct}%</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">chance de gagner le titre</span>
                </div>

                {/* Probability bar */}
                <div className="px-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${Math.min(pred.winnerProb * 100 * 7, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 shrink-0 w-20 text-right">
                      finale: {Math.round(pred.finalProb * 100)}%
                    </span>
                  </div>
                </div>

                {/* Pro/Con */}
                {args && (
                  <div className="grid sm:grid-cols-2 gap-0 border-t border-gray-100 dark:border-slate-700">
                    <div className="p-4 bg-success//10 dark:bg-success//10">
                      <p className="text-xs font-bold text-success dark:text-success mb-2">✅ Points forts</p>
                      <ul className="space-y-1">
                        {args.pros.slice(0, 3).map((pro, i) => (
                          <li key={i} className="text-xs text-gray-700 dark:text-gray-300">
                            • {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50/50 dark:bg-red-900/10 border-t sm:border-t-0 sm:border-l border-gray-100 dark:border-slate-700">
                      <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-2">⚠️ Points faibles</p>
                      <ul className="space-y-1">
                        {args.cons.slice(0, 3).map((con, i) => (
                          <li key={i} className="text-xs text-gray-700 dark:text-gray-300">
                            • {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
