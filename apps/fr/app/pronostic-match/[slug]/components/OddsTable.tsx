import type { Bookmaker } from "@repo/data";

interface OddsTableProps {
  odds: { home: string; draw: string; away: string };
  homeName: string;
  awayName: string;
  bookmakers: Bookmaker[];
}

// Parse a decimal odds string to float
function parseOdds(o: string): number {
  return parseFloat(o) || 0;
}

// Find best odds across all bookmakers + estimate
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
    <section className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-slate-900/50">
        <div className="section-header mb-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-base">
            Comparateur de cotes
          </h2>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-300">
          Cotes estimées · Vérifier avant pari
        </span>
      </div>

      {/* Scrollable table on mobile */}
      <div className="overflow-x-auto">

      {/* Column headers */}
      <div className="grid grid-cols-[minmax(100px,1fr)_repeat(3,70px)_90px] sm:grid-cols-[1fr_repeat(3,80px)_100px] px-4 sm:px-5 py-2 text-xs font-semibold text-gray-500 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 min-w-[420px]">
        <span>Bookmaker</span>
        <span className="text-center truncate" title={`Victoire ${homeName}`}>1 {homeName.length > 8 ? homeName.slice(0, 8) + "…" : homeName}</span>
        <span className="text-center">N</span>
        <span className="text-center truncate" title={`Victoire ${awayName}`}>2 {awayName.length > 8 ? awayName.slice(0, 8) + "…" : awayName}</span>
        <span className="text-right">Bonus</span>
      </div>

      {/* Estimation row */}
      <div className="grid grid-cols-[minmax(100px,1fr)_repeat(3,70px)_90px] sm:grid-cols-[1fr_repeat(3,80px)_100px] items-center px-4 sm:px-5 py-3 bg-primary/5 dark:bg-primary/20 border-b border-gray-100 dark:border-gray-700 min-w-[420px]">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-primary dark:bg-gray-700 text-gold text-[9px] font-bold flex items-center justify-center shrink-0">AI</span>
          <span className="text-sm font-bold text-primary dark:text-gray-100">Estimation CDM</span>
        </div>
        <OddsCell value={odds.home} isBest={parseOdds(odds.home) >= bestHome} />
        <OddsCell value={odds.draw} isBest={parseOdds(odds.draw) >= bestDraw} />
        <OddsCell value={odds.away} isBest={parseOdds(odds.away) >= bestAway} />
        <span className="text-right text-xs text-gray-400 dark:text-gray-400">—</span>
      </div>

      {/* Bookmaker rows */}
      {bookmakers.map((bk) => (
        <div
          key={bk.id}
          className="grid grid-cols-[minmax(100px,1fr)_repeat(3,70px)_90px] sm:grid-cols-[1fr_repeat(3,80px)_100px] items-center px-4 sm:px-5 py-3 border-b border-gray-50 dark:border-gray-700/50 last:border-b-0 hover:bg-gray-50 dark:bg-slate-700 dark:hover:bg-gray-700/30 transition-colors min-w-[420px]"
        >
          <div className="flex items-center gap-2 min-w-0">
            {/* Bookmaker logo placeholder */}
            <div className="w-7 h-7 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-primary dark:text-gray-200 shrink-0 uppercase">
              {bk.name.slice(0, 2)}
            </div>
            <div className="min-w-0">
              <a
                href={bk.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="text-sm font-semibold text-primary hover:underline truncate block"
              >
                {bk.name}
              </a>
              {bk.highlight && (
                <span className="text-[10px] bg-gold/15 text-gold rounded px-1 py-0.5 font-bold uppercase">
                  Recommandé
                </span>
              )}
            </div>
          </div>
          <OddsCell value={odds.home} isBest={parseOdds(odds.home) >= bestHome} />
          <OddsCell value={odds.draw} isBest={parseOdds(odds.draw) >= bestDraw} />
          <OddsCell value={odds.away} isBest={parseOdds(odds.away) >= bestAway} />
          <div className="flex justify-end">
            <a
              href={bk.url}
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-block rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-white hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              {bk.bonus}
            </a>
          </div>
        </div>
      ))}

      </div>{/* end overflow-x-auto */}

      {/* Footer */}
      <div className="px-5 py-3 bg-gray-50 dark:bg-slate-900/30 text-[11px] text-gray-400 dark:text-gray-400">
        * Cotes estimées à partir de notre modèle. Les cotes réelles peuvent varier.{" "}
        <span className="text-green-600 dark:text-green-400 font-semibold">Vert = meilleure valeur</span>
      </div>
    </section>
  );
}

function OddsCell({ value, isBest }: { value: string; isBest: boolean }) {
  return (
    <div className="flex justify-center">
      <span
        className={`inline-block rounded-lg px-2.5 py-1 text-sm font-bold tabular-nums transition-all ${
          isBest
            ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700/50"
            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
