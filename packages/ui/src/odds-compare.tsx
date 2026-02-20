/**
 * Translations for odds comparison table.
 */
const translations = {
  fr: { title: "Cotes des bookmakers", draw: "Nul", disclaimer: "Cotes indicatives issues des bookmakers. Meilleures cotes en vert. 18+. Jouez responsablement." },
  en: { title: "Bookmaker odds", draw: "Draw", disclaimer: "Indicative bookmaker odds. Best odds in green. 18+. Gamble responsibly." },
  es: { title: "Cuotas de casas de apuestas", draw: "Empate", disclaimer: "Cuotas indicativas de casas de apuestas. Mejores cuotas en verde. 18+. Juegue responsablemente." },
};

/**
 * Props for the OddsCompare component.
 * 
 * @param odds - Array of bookmaker odds (bookmaker, home, draw, away)
 * @param homeTeam - Home team name
 * @param awayTeam - Away team name
 * @param locale - UI language: "fr" | "en" | "es" (default: "fr")
 */
interface OddsCompareProps {
  odds: Array<{
    bookmaker: string;
    home: number;
    draw: number;
    away: number;
  }>;
  homeTeam: string;
  awayTeam: string;
  locale?: "fr" | "en" | "es";
}

/**
 * OddsCompare component — Bookmaker odds comparison table with best odds highlighting.
 * 
 * Best odds for each outcome (home, draw, away) are highlighted in green.
 * Responsive: table on desktop, cards on mobile.
 * 
 * @example
 * ```tsx
 * <OddsCompare
 *   odds={[
 *     { bookmaker: "Bet365", home: 2.10, draw: 3.20, away: 3.50 },
 *     { bookmaker: "Unibet", home: 2.05, draw: 3.30, away: 3.40 }
 *   ]}
 *   homeTeam="France"
 *   awayTeam="Brésil"
 *   locale="fr"
 * />
 * ```
 */
export function OddsCompare({ odds, homeTeam, awayTeam, locale }: OddsCompareProps) {
  const t = translations[locale ?? "fr"];

  if (odds.length === 0) return null;

  // Find best odds for each outcome
  const bestHome = Math.max(...odds.map(o => o.home));
  const bestDraw = Math.max(...odds.map(o => o.draw));
  const bestAway = Math.max(...odds.map(o => o.away));

  return (
    <div className="rounded-lg bg-white dark:bg-slate-800 p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
        {t.title}
      </h4>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              <th className="pb-2 text-left font-medium">Bookmaker</th>
              <th className="pb-2 text-center font-medium">{homeTeam}</th>
              <th className="pb-2 text-center font-medium">{t.draw}</th>
              <th className="pb-2 text-center font-medium">{awayTeam}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
            {odds.slice(0, 5).map((o) => (
              <tr key={o.bookmaker}>
                <td className="py-2 font-medium text-gray-700 dark:text-gray-200">{o.bookmaker}</td>
                <td className={`py-2 text-center font-mono ${o.home === bestHome ? "font-bold text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                  {o.home.toFixed(2)}
                </td>
                <td className={`py-2 text-center font-mono ${o.draw === bestDraw ? "font-bold text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                  {o.draw.toFixed(2)}
                </td>
                <td className={`py-2 text-center font-mono ${o.away === bestAway ? "font-bold text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                  {o.away.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="space-y-2 md:hidden">
        {odds.slice(0, 5).map((o) => (
          <div key={o.bookmaker} className="rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-slate-700 p-3">
            <div className="mb-2 text-xs font-semibold text-gray-700 dark:text-gray-200">{o.bookmaker}</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">{homeTeam}</div>
                <div className={`font-mono text-sm ${o.home === bestHome ? "font-bold text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                  {o.home.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">{t.draw}</div>
                <div className={`font-mono text-sm ${o.draw === bestDraw ? "font-bold text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                  {o.draw.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400">{awayTeam}</div>
                <div className={`font-mono text-sm ${o.away === bestAway ? "font-bold text-accent" : "text-gray-600 dark:text-gray-300"}`}>
                  {o.away.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        {t.disclaimer}
      </p>
    </div>
  );
}
