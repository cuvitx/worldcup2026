interface OddsCompareProps {
  odds: Array<{
    bookmaker: string;
    home: number;
    draw: number;
    away: number;
  }>;
  homeTeam: string;
  awayTeam: string;
}

export function OddsCompare({ odds, homeTeam, awayTeam }: OddsCompareProps) {
  if (odds.length === 0) return null;

  // Find best odds for each outcome
  const bestHome = Math.max(...odds.map(o => o.home));
  const bestDraw = Math.max(...odds.map(o => o.draw));
  const bestAway = Math.max(...odds.map(o => o.away));

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Cotes des bookmakers
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500">
              <th className="pb-2 text-left font-medium">Bookmaker</th>
              <th className="pb-2 text-center font-medium">{homeTeam}</th>
              <th className="pb-2 text-center font-medium">Nul</th>
              <th className="pb-2 text-center font-medium">{awayTeam}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {odds.slice(0, 5).map((o) => (
              <tr key={o.bookmaker}>
                <td className="py-2 font-medium text-gray-700">{o.bookmaker}</td>
                <td className={`py-2 text-center font-mono ${o.home === bestHome ? "font-bold text-green-600" : "text-gray-600"}`}>
                  {o.home.toFixed(2)}
                </td>
                <td className={`py-2 text-center font-mono ${o.draw === bestDraw ? "font-bold text-green-600" : "text-gray-600"}`}>
                  {o.draw.toFixed(2)}
                </td>
                <td className={`py-2 text-center font-mono ${o.away === bestAway ? "font-bold text-green-600" : "text-gray-600"}`}>
                  {o.away.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        Cotes en temps reel. Meilleures cotes en vert. 18+. Jouez responsablement.
      </p>
    </div>
  );
}
