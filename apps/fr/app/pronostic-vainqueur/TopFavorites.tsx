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
    <section id="top10" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span></span> Top 10 des favoris CDM 2026
          </h2>
          <p className="text-sm text-gray-600 mt-1">Classement par probabilité de victoire (modèle ELO + cotes bookmakers)</p>
        </div>

        <div className="space-y-3">
          {top10.map(({ pred, team }, index) => {
            if (!team) return null;
            const winPct = Math.round(pred.winnerProb * 100 * 10) / 10;
            const fav = favoritesByTeamId[team.id];
            const approxOdds = fav ? fav.avgOdds.toFixed(2) : estimatedOutrightOdds(pred.winnerProb);
            const trendIcon = fav ? (fav.trend === "up" ? " ↑" : fav.trend === "down" ? " ↓" : "") : "";
            const trendColor = fav?.trend === "up" ? "text-accent" : fav?.trend === "down" ? "text-red-400" : "";
            const args = teamArguments[team.id];

            return (
              <div
                key={team.id}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header row */}
                <div className="flex items-center gap-4 px-5 py-4">
                  {/* Rank */}
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg ${
                    index === 0 ? "bg-accent/20 text-accent border-2 border-accent/50" :
                    index === 1 ? "bg-gray-200-600 text-gray-700" :
                    index === 2 ? "bg-primary/10primary/20 text-primary" :
                    "bg-gray-100-700 text-gray-600"
                  }`}>
                    {index + 1}
                  </div>

                  {/* Flag + Name */}
                  <span className="text-4xl shrink-0">{team.flag}</span>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/equipe/${team.slug}`}
                      className="text-lg font-bold text-gray-900 hover:text-primary transition-colors"
                    >
                      {team.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-xs text-gray-600">
                        #{team.fifaRanking} FIFA
                      </span>
                      <span className="text-xs text-gray-600">
                        ELO {pred.eloRating}
                      </span>
                      <span className="text-xs bg-gray-100-700 text-gray-600 px-2 py-0.5 rounded">
                        {team.bestResult}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="text-2xl font-extrabold text-primary">
                      {winPct < 1 ? "<1" : winPct}%
                    </p>
                    <p className="text-xs text-gray-600">chance titre</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-bold text-accent">
                      {approxOdds}
                      {trendIcon && (
                        <span className={`text-sm ml-1 font-bold ${trendColor}`}>{trendIcon}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-600">
                      {fav ? "cote moy. marché" : "cote approx."}
                    </p>
                  </div>
                </div>

                {/* Real bookmaker odds strip (if in top10Favorites) */}
                {fav && (
                  <div className="flex gap-1.5 px-5 pb-2 overflow-x-auto">
                    <span className="shrink-0 rounded bg-primary/10primary/20 border border-primary/20 px-2 py-1 text-[11px] font-bold text-primary text-center whitespace-nowrap">
                      Winamax {fav.winamax.toFixed(2)}
                    </span>
                    <span className="shrink-0 rounded bg-accent/10 border border-accent/30 px-2 py-1 text-[11px] font-bold text-accent text-center whitespace-nowrap">
                      Bet365 {fav.bet365.toFixed(2)}
                    </span>
                    <span className="shrink-0 rounded bg-accent/10 border border-accent/30 px-2 py-1 text-[11px] font-bold text-accent text-center whitespace-nowrap">
                      DraftKings {fav.draftkings.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Mobile: chance titre */}
                <div className="flex sm:hidden items-center gap-4 px-5 pb-3">
                  <span className="text-xl font-extrabold text-primary">{winPct < 1 ? "<1" : winPct}%</span>
                  <span className="text-sm text-gray-600">chance de gagner le titre</span>
                </div>

                {/* Probability bar */}
                <div className="px-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${Math.min(pred.winnerProb * 100 * 7, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 shrink-0 w-20 text-right">
                      finale: {Math.round(pred.finalProb * 100)}%
                    </span>
                  </div>
                </div>

                {/* Pro/Con */}
                {args && (
                  <div className="grid sm:grid-cols-2 gap-0 border-t border-gray-100">
                    <div className="p-4 bg-accent/10accent/10">
                      <p className="text-xs font-bold text-accent mb-2">Points forts</p>
                      <ul className="space-y-1">
                        {args.pros.slice(0, 3).map((pro, i) => (
                          <li key={i} className="text-xs text-gray-700">
                            • {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50/50red-900/10 border-t sm:border-t-0 sm:border-l border-gray-100">
                      <p className="text-xs font-bold text-red-600 mb-2">Points faibles</p>
                      <ul className="space-y-1">
                        {args.cons.slice(0, 3).map((con, i) => (
                          <li key={i} className="text-xs text-gray-700">
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
