import Link from "next/link";
import { teams } from "@repo/data/teams";
import {
  favoritesByTeamId,
} from "@repo/data/predictions-2026";
import {
  estimatedOutrightOdds,
} from "@repo/data/affiliates";
import type { LiveForecastTeam } from "./_data/vainqueur-data";

interface TopFavoritesProps {
  top10: LiveForecastTeam[];
  eliminatedTeams?: LiveForecastTeam[];
  teamArguments: Record<string, { pros: string[]; cons: string[] }>;
}

function formatDelta(delta: number) {
  const points = Math.round(delta * 100 * 10) / 10;
  if (Math.abs(points) < 0.1) return "stable";
  return `${points > 0 ? "+" : ""}${points} pts`;
}

export function TopFavorites({ top10, eliminatedTeams = [], teamArguments }: TopFavoritesProps) {
  const notableEliminated = eliminatedTeams.slice(0, 6);

  return (
    <section id="top10" className="bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span></span> Top 10 live des favoris CDM 2026
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Classement recalculé avec les résultats, les équipes encore en course et le chemin restant.
          </p>
        </div>

        <div className="space-y-3">
          {top10.map((row, index) => {
            const { pred, team } = row;
            if (!team) return null;
            const winPct = Math.round(pred.winnerProb * 100 * 10) / 10;
            const basePct = Math.round(pred.baseWinnerProb * 100 * 10) / 10;
            const fav = favoritesByTeamId[team.id];
            const approxOdds = fav ? fav.avgOdds.toFixed(2) : estimatedOutrightOdds(pred.winnerProb);
            const trendIcon = fav ? (fav.trend === "up" ? " ↑" : fav.trend === "down" ? " ↓" : "") : "";
            const trendColor = fav?.trend === "up" ? "text-accent" : fav?.trend === "down" ? "text-red-400" : "";
            const args = teamArguments[team.id];
            const delta = formatDelta(pred.deltaWinnerProb);

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
                    index === 1 ? "bg-gray-200 text-gray-700" :
                    index === 2 ? "bg-primary/10 text-primary" :
                    "bg-gray-100 text-gray-600"
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
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {team.bestResult}
                      </span>
                      <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded font-semibold">
                        {row.currentStageLabel}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="text-2xl font-extrabold text-primary">
                      {winPct < 1 ? "<1" : winPct}%
                    </p>
                    <p className="text-xs text-gray-600">chance titre</p>
                    <p className={`text-[11px] font-semibold ${pred.deltaWinnerProb >= 0 ? "text-accent" : "text-red-500"}`}>
                      {delta} vs pré-tournoi
                    </p>
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

                {/* Real bookmaker odds strip (PMU Sport) */}
                {fav && (
                  <div className="flex gap-1.5 px-5 pb-2 overflow-x-auto">
                    <span className="shrink-0 rounded bg-accent/10 border border-accent/30 px-2 py-1 text-[11px] font-bold text-accent text-center whitespace-nowrap">
                      PMU Sport {fav.pmuSport.toFixed(2)}
                    </span>
                  </div>
                )}

                {/* Mobile: chance titre */}
                <div className="flex sm:hidden items-center gap-4 px-5 pb-3">
                  <span className="text-xl font-extrabold text-primary">{winPct < 1 ? "<1" : winPct}%</span>
                  <span className="text-sm text-gray-600">
                    chance de gagner le titre · base {basePct}% · {delta}
                  </span>
                </div>

                {/* Probability bar */}
                <div className="px-5 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
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
                    <div className="p-4 bg-accent/10">
                      <p className="text-xs font-bold text-accent mb-2">Points forts</p>
                      <ul className="space-y-1">
                        {args.pros.slice(0, 3).map((pro, i) => (
                          <li key={i} className="text-xs text-gray-700">
                            • {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50/50 border-t sm:border-t-0 sm:border-l border-gray-100">
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
                {row.latestMatch && (
                  <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-600">
                    Dernier signal : <span className="font-semibold text-gray-800">{row.latestMatch}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {notableEliminated.length > 0 && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Équipes sorties du forecast actif
                </h3>
                <p className="text-sm text-gray-600">
                  Elles restent dans l'historique du modèle, mais leur chance de titre live est désormais à 0%.
                </p>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
                Éliminées
              </span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {notableEliminated.map((row) => (
                <div
                  key={row.team.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {row.team.flag} {row.team.name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {row.eliminatedBy ? `Sortie par ${row.eliminatedBy}` : "Hors tableau"}
                    </p>
                  </div>
                  <span className="ml-3 rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                    0%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
