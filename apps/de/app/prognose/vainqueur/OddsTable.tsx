import Link from "next/link";
import { teams } from "@repo/data/teams";
import {
  top10Favorites,
} from "@repo/data/predictions-2026";
import {
  pmuTrackingUrl,
} from "@repo/data/affiliates";

export function OddsTable() {
  return (
    <section id="cotes" className="bg-white py-12 border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Cotes vainqueur CDM 2026 — PMU Sport
        </h2>
        <p className="text-sm text-gray-600 mb-1">
          Cotes décimales PMU Sport. Mises à jour : <span className="font-semibold text-gray-700">juin 2026</span>.
        </p>
        <p className="text-xs text-gray-600 mb-6">
          ↑ Tendance haussière vs. cotes d&apos;ouverture (déc. 2025) · ↓ Tendance baissière · → Stable
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs uppercase text-gray-500text-gray-700">
                <th className="text-left px-3 sm:px-4 py-3 font-bold">Équipe</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold whitespace-nowrap text-primary">Cote PMU Sport</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold text-accent whitespace-nowrap">Moy.</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold text-primary whitespace-nowrap">Proba.</th>
                <th className="text-center px-2 sm:px-4 py-3 font-bold text-gray-600 whitespace-nowrap hidden sm:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody>
              {top10Favorites.map((fav, i) => {
                const team = teams.find((t) => t.id === fav.teamId);
                if (!team) return null;
                const trendIcon = fav.trend === "up" ? "↑" : fav.trend === "down" ? "↓" : "→";
                const trendColor =
                  fav.trend === "up"
                    ? "text-accent"
                    : fav.trend === "down"
                    ? "text-red-500"
                    : "text-gray-600";
                const impliedPct = Math.round(fav.impliedProbability * 100 * 10) / 10;

                return (
                  <tr
                    key={fav.teamId}
                    className={`border-t border-gray-100 ${
                      i % 2 === 0 ? "bg-white/50" : "bg-gray-50/50"
                    } hover:bg-primary/5 transition-colors`}
                  >
                    {/* Team */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === 0 ? "bg-accent/20 text-accent" :
                          i === 1 ? "bg-gray-200 text-gray-700" :
                          i === 2 ? "bg-primary/10 text-primary" :
                          "bg-gray-100 text-gray-500"
                        }`}>{i + 1}</span>
                        <span className="text-xl">{team.flag}</span>
                        <Link href={`/mannschaft/${team.slug}`} className="font-medium text-gray-900 hover:text-primary transition-colors">
                          {team.name}
                        </Link>
                      </div>
                    </td>
                    {/* PMU Sport */}
                    <td className="px-2 sm:px-4 py-3 text-center">
                      <span className="inline-block px-2 py-1 rounded font-bold text-sm bg-accent/10 text-accent border border-accent/30">
                        {fav.pmuSport.toFixed(2)}
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
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            <span className="text-accent font-semibold">↑ Tendance haussière</span>
            <span className="text-red-500 font-semibold">↓ Tendance baissière</span>
            <span>→ Stable</span>
          </div>
          <p className="text-xs text-gray-600 max-w-xs text-right">
            Source : PMU Sport. Cotes décimales. Jeu responsable — 18+.
          </p>
        </div>

        {/* Bookmaker CTA */}
        <div className="mt-6">
          <a
            href={pmuTrackingUrl("prono-vainqueur")}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div>
              <p className="font-bold text-gray-900">PMU Sport</p>
              <p className="text-sm text-primary font-semibold">100€ offerts</p>
              <p className="text-xs text-gray-600">en freebets sans condition</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-white">
                100€ offerts →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
