import Link from "next/link";
import { teams } from "@repo/data/teams";
import {
  top10Favorites,
} from "@repo/data/predictions-2026";
import {
  bookmakers,
} from "@repo/data/affiliates";

export function OddsTable() {
  return (
    <section id="cotes" className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Cotes vainqueur CDM 2026 — Multi-bookmakers
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
          Cotes décimales réelles collectées auprès de Winamax, Bet365 et DraftKings. Mises à jour : <span className="font-semibold text-gray-700 dark:text-gray-200">février 2026</span>.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-6">
          ↑ Tendance haussière vs. cotes d&apos;ouverture (déc. 2025) · ↓ Tendance baissière · → Stable
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-700/50 text-xs uppercase text-gray-500text-gray-700 dark:text-gray-300">
                <th className="text-left px-3 sm:px-4 py-3 font-bold">Équipe</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold whitespace-nowrap text-[#FF6600] hidden sm:table-cell">Winamax</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold whitespace-nowrap text-[#00A0A0] hidden lg:table-cell">Bet365</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold whitespace-nowrap text-[#53B648] hidden lg:table-cell">DraftKings</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold text-accent whitespace-nowrap">Cote</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold text-primary whitespace-nowrap">Proba.</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold text-gray-600 dark:text-gray-300 whitespace-nowrap hidden sm:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody>
              {top10Favorites.map((fav, i) => {
                const team = teams.find((t) => t.id === fav.teamId);
                if (!team) return null;
                const trendIcon = fav.trend === "up" ? "↑" : fav.trend === "down" ? "↓" : "→";
                const trendColor =
                  fav.trend === "up"
                    ? "text-accent dark:text-accent"
                    : fav.trend === "down"
                    ? "text-red-500 dark:text-red-400"
                    : "text-gray-600 dark:text-gray-400";
                const impliedPct = Math.round(fav.impliedProbability * 100 * 10) / 10;
                const bestOdds = Math.max(fav.winamax, fav.bet365, fav.draftkings);

                return (
                  <tr
                    key={fav.teamId}
                    className={`border-t border-gray-100 dark:border-slate-700/50 ${
                      i % 2 === 0 ? "bg-white dark:bg-slate-800/50" : "bg-gray-50/50 dark:bg-slate-800"
                    } hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors`}
                  >
                    {/* Team */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-accent/20 text-accent" :
                          i === 1 ? "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-gray-200" :
                          i === 2 ? "bg-primary/10 dark:bg-primary/20 text-primary" :
                          "bg-gray-100 dark:bg-slate-700 text-gray-500"
                        }`}>{i + 1}</span>
                        <span className="text-xl">{team.flag}</span>
                        <Link href={`/equipe/${team.slug}`} className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
                          {team.name}
                        </Link>
                      </div>
                    </td>
                    {/* Winamax */}
                    <td className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`inline-block px-2 py-1 rounded font-bold text-sm ${fav.winamax === bestOdds ? "bg-accent/10 text-accent border border-accent/30" : "text-gray-700 dark:text-gray-200"}`}>
                        {fav.winamax.toFixed(2)}
                      </span>
                    </td>
                    {/* Bet365 */}
                    <td className="px-2 sm:px-4 py-3 text-center hidden lg:table-cell">
                      <span className={`inline-block px-2 py-1 rounded font-bold text-sm ${fav.bet365 === bestOdds ? "bg-accent/10 text-accent border border-accent/30" : "text-gray-700 dark:text-gray-200"}`}>
                        {fav.bet365.toFixed(2)}
                      </span>
                    </td>
                    {/* DraftKings */}
                    <td className="px-2 sm:px-4 py-3 text-center hidden lg:table-cell">
                      <span className={`inline-block px-2 py-1 rounded font-bold text-sm ${fav.draftkings === bestOdds ? "bg-accent/10 text-accent border border-accent/30" : "text-gray-700 dark:text-gray-200"}`}>
                        {fav.draftkings.toFixed(2)}
                      </span>
                    </td>
                    {/* Moyenne */}
                    <td className="px-2 sm:px-4 py-3 text-center">
                      <span className="font-bold text-accent">{fav.avgOdds.toFixed(2)}</span>
                    </td>
                    {/* Proba implicite */}
                    <td className="px-2 sm:px-4 py-3 text-center">
                      <span className="font-bold text-primary text-sm">{impliedPct}%</span>
                    </td>
                    {/* Tendance */}
                    <td className={`px-2 sm:px-4 py-3 text-center text-lg font-bold hidden sm:table-cell ${trendColor}`}>
                      {trendIcon}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Légende + note */}
        <div className="mt-4 flex flex-wrap gap-4 items-start justify-between">
          <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-300">
            <span><span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" /> = Meilleure cote du moment</span>
            <span className="text-accent dark:text-accent font-semibold">↑ Tendance haussière</span>
            <span className="text-red-500 dark:text-red-400 font-semibold">↓ Tendance baissière</span>
            <span>→ Stable</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs text-right">
            Sources : Winamax (football.fr), Bet365 (covers.com), DraftKings (nbcsports.com). Cotes décimales. Jeu responsable — 18+.
          </p>
        </div>

        {/* Bookmaker CTAs */}
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {bookmakers.slice(0, 3).map((bm) => (
            <a
              key={bm.id}
              href={bm.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className={`flex items-center justify-between rounded-xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                bm.highlight
                  ? "border-primary/20 bg-primary/5 dark:bg-primary/10"
                  : "border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800"
              }`}
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{bm.name}</p>
                <p className="text-sm text-primary font-semibold">{bm.bonus}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">{bm.bonusDetail}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-white">
                  Voir →
                </span>
                <p className="text-[10px] text-gray-500 mt-1">{"".repeat(bm.rating)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
