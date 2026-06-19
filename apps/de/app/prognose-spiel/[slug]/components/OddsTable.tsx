import { pmuTrackingUrl } from "@repo/data/affiliates";

interface BookmakerOdds {
  name: string;
  homeWin: number;
  draw: number;
  awayWin: number;
}

interface OddsTableProps {
  odds: { home: string; draw: string; away: string };
  homeName: string;
  awayName: string;
  realOdds?: {
    homeWin: number;
    draw: number;
    awayWin: number;
    bookmakers: BookmakerOdds[];
  } | null;
  matchSlug: string;
}

function findBest(values: number[]): number {
  return Math.max(...values.filter((v) => v > 0));
}

export function OddsTable({ odds, homeName, awayName, realOdds, matchSlug }: OddsTableProps) {
  const hasRealOdds = realOdds && realOdds.bookmakers.length > 0;

  // Use real odds or estimated
  const displayBookmakers = hasRealOdds
    ? realOdds.bookmakers.slice(0, 6)
    : [];

  const avgOdds = hasRealOdds
    ? { home: realOdds.homeWin, draw: realOdds.draw, away: realOdds.awayWin }
    : { home: parseFloat(odds.home) || 0, draw: parseFloat(odds.draw) || 0, away: parseFloat(odds.away) || 0 };

  // Compute best values across all bookmakers
  const allHome = hasRealOdds ? displayBookmakers.map((b) => b.homeWin) : [avgOdds.home];
  const allDraw = hasRealOdds ? displayBookmakers.map((b) => b.draw) : [avgOdds.draw];
  const allAway = hasRealOdds ? displayBookmakers.map((b) => b.awayWin) : [avgOdds.away];

  const bestHome = findBest(allHome);
  const bestDraw = findBest(allDraw);
  const bestAway = findBest(allAway);

  const pmuUrl = pmuTrackingUrl(matchSlug);

  return (
    <section className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900">
          Quotenvergleich
        </h2>
        <span className="text-[10px] sm:text-xs text-gray-500">
          {hasRealOdds ? "Echte Quoten" : "Geschaetzte Quoten"}
        </span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_repeat(3,52px)] sm:grid-cols-[1fr_repeat(3,80px)] px-4 sm:px-5 py-2 text-xs font-semibold text-gray-500 border-b border-gray-100">
        <span>Bookmaker</span>
        <span className="text-center">1</span>
        <span className="text-center">N</span>
        <span className="text-center">2</span>
      </div>

      {/* Average / estimation row */}
      <div className="grid grid-cols-[1fr_repeat(3,52px)] sm:grid-cols-[1fr_repeat(3,80px)] items-center px-4 sm:px-5 py-3 bg-primary/5 border-b border-gray-100">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-full bg-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">
            {hasRealOdds ? "Ø" : "AI"}
          </span>
          <span className="text-xs sm:text-sm font-bold text-primary truncate">
            {hasRealOdds ? "Durchschnitt" : "Schaetzung"}
          </span>
        </div>
        <OddsCell value={avgOdds.home} isBest={false} />
        <OddsCell value={avgOdds.draw} isBest={false} />
        <OddsCell value={avgOdds.away} isBest={false} />
      </div>

      {/* Bookmaker rows */}
      {displayBookmakers.map((bk) => (
        <div
          key={bk.name}
          className="grid grid-cols-[1fr_repeat(3,52px)] sm:grid-cols-[1fr_repeat(3,80px)] items-center px-4 sm:px-5 py-3 border-b border-gray-50 last:border-b-0"
        >
          <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate">{bk.name}</span>
          <OddsCell value={bk.homeWin} isBest={bk.homeWin >= bestHome} />
          <OddsCell value={bk.draw} isBest={bk.draw >= bestDraw} />
          <OddsCell value={bk.awayWin} isBest={bk.awayWin >= bestAway} />
        </div>
      ))}

      {/* PMU CTA */}
      <div className="px-4 sm:px-5 py-4 bg-accent/5 border-t border-gray-100">
        <a
          href={pmuUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-accent py-3 text-sm font-bold text-white hover:bg-accent/80 transition-colors"
        >
          Jetzt bei Betano wetten — Willkommensbonus
        </a>
        <p className="mt-2 text-[10px] text-gray-400 text-center">
          18+ | Verantwortungsvolles Spielen | Quoten koennen variieren
        </p>
      </div>
    </section>
  );
}

function OddsCell({ value, isBest }: { value: number; isBest: boolean }) {
  if (!value || value <= 0) return <div className="flex justify-center"><span className="text-gray-300">—</span></div>;
  return (
    <div className="flex justify-center">
      <span
        className={`inline-block rounded-lg px-1.5 py-0.5 sm:px-2 sm:py-1 text-[11px] sm:text-sm font-bold tabular-nums ${
          isBest
            ? "bg-accent/10 text-accent border border-accent/30"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {value.toFixed(2)}
      </span>
    </div>
  );
}
