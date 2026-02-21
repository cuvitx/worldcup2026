import type { Bookmaker } from "@repo/data";

interface OddsTableProps {
  odds: { home: string; draw: string; away: string };
  homeName: string;
  awayName: string;
  bookmakers: Bookmaker[];
}

function parseOdds(o: string): number {
  return parseFloat(o) || 0;
}

function findBest(values: number[]): number {
  return Math.max(...values.filter((v) => v > 0));
}

export function OddsTable({ odds, homeName, awayName, bookmakers }: OddsTableProps) {
  const allHome = [parseOdds(odds.home)];
  const allDraw = [parseOdds(odds.draw)];
  const allAway = [parseOdds(odds.away)];

  const bestHome = findBest(allHome);
  const bestDraw = findBest(allDraw);
  const bestAway = findBest(allAway);

  return (
    <section className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900">
          Comparateur de cotes
        </h2>
        <span className="text-[10px] sm:text-xs text-gray-500">
          Cotes estimées
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_repeat(3,52px)] sm:grid-cols-[1fr_repeat(3,80px)_110px] px-4 sm:px-5 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
        <span>Bookmaker</span>
        <span className="text-center">1</span>
        <span className="text-center">N</span>
        <span className="text-center">2</span>
        <span className="text-right hidden sm:block">Bonus</span>
      </div>

      {/* Estimation row */}
      <div className="grid grid-cols-[1fr_repeat(3,52px)] sm:grid-cols-[1fr_repeat(3,80px)_110px] items-center px-4 sm:px-5 py-3 bg-primary/5 border-b border-gray-100">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">AI</span>
          <span className="text-xs sm:text-sm font-bold text-primary truncate">Estimation</span>
        </div>
        <OddsCell value={odds.home} isBest={parseOdds(odds.home) >= bestHome} />
        <OddsCell value={odds.draw} isBest={parseOdds(odds.draw) >= bestDraw} />
        <OddsCell value={odds.away} isBest={parseOdds(odds.away) >= bestAway} />
        <span className="text-right text-xs text-gray-400 hidden sm:block">—</span>
      </div>

      {/* Bookmaker rows */}
      {bookmakers.map((bk) => (
        <div
          key={bk.id}
          className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          {/* Main row */}
          <div className="grid grid-cols-[1fr_repeat(3,52px)] sm:grid-cols-[1fr_repeat(3,80px)_110px] items-center px-4 sm:px-5 py-3">
            <div className="flex items-center gap-2 min-w-0">
              {bk.logo ? (
                <img src={bk.logo} alt={bk.name} className="w-6 h-6 sm:w-7 sm:h-7 rounded-md object-contain shrink-0" loading="lazy" />
              ) : (
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px] font-bold text-primary shrink-0 uppercase">
                  {bk.name.slice(0, 2)}
                </div>
              )}
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate block">
                  {bk.name}
                </span>
                {bk.highlight && (
                  <span className="text-[9px] sm:text-[10px] bg-accent/15 text-accent rounded px-1 py-0.5 font-bold uppercase">
                    Recommandé
                  </span>
                )}
              </div>
            </div>
            <OddsCell value={odds.home} isBest={parseOdds(odds.home) >= bestHome} />
            <OddsCell value={odds.draw} isBest={parseOdds(odds.draw) >= bestDraw} />
            <OddsCell value={odds.away} isBest={parseOdds(odds.away) >= bestAway} />
            {/* Bonus visible on desktop */}
            <div className="hidden sm:flex justify-end">
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-3 py-2 text-xs font-bold text-white hover:bg-accent/80 transition-colors whitespace-nowrap"
              >
                {bk.bonus}
              </a>
            </div>
          </div>
          {/* Bonus CTA on mobile — full width */}
          <div className="sm:hidden px-4 pb-3 -mt-1">
            <a
              href={bk.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="flex items-center justify-center w-full rounded-xl bg-accent py-2.5 text-xs font-bold text-white hover:bg-accent/80 transition-colors"
            >
              {bk.bonus}
            </a>
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="px-4 sm:px-5 py-2.5 bg-gray-50/30 text-[11px] text-gray-400">
        * Cotes estimées. Les cotes réelles peuvent varier.{" "}
        <span className="text-accent font-semibold">Surligné = meilleure valeur</span>
      </div>
    </section>
  );
}

function OddsCell({ value, isBest }: { value: string; isBest: boolean }) {
  return (
    <div className="flex justify-center">
      <span
        className={`inline-block rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 text-[11px] sm:text-sm font-bold tabular-nums ${
          isBest
            ? "bg-accent/10 text-accent border border-accent/30"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
