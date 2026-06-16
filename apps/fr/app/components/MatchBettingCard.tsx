import { pmuTrackingUrl } from "@repo/data/affiliates";

interface MatchBettingCardProps {
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
  homeOdds?: string;
  drawOdds?: string;
  awayOdds?: string;
  tracking?: string;
}

/**
 * Premium PMU betting card — combines odds display + CTA in one integrated widget.
 * Inspired by top affiliate sites with PMU branding (green/gold).
 */
export function MatchBettingCard({
  homeName,
  homeFlag,
  awayName,
  awayFlag,
  homeOdds,
  drawOdds,
  awayOdds,
  tracking = "match",
}: MatchBettingCardProps) {
  const hasOdds = homeOdds && drawOdds && awayOdds;

  // Determine the favorite (lowest odds)
  let favorite: "home" | "draw" | "away" | null = null;
  if (hasOdds) {
    const h = parseFloat(homeOdds);
    const d = parseFloat(drawOdds);
    const a = parseFloat(awayOdds);
    const min = Math.min(h, d, a);
    if (min === h) favorite = "home";
    else if (min === a) favorite = "away";
    else favorite = "draw";
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-lg">
      {/* Header — PMU branding */}
      <div className="bg-gradient-to-r from-[#0a3d0a] via-[#145214] to-[#0d470d] px-5 py-4 sm:px-6 flex items-center justify-between">
        <div>
          <p className="text-[#d4af37] font-extrabold text-lg sm:text-xl tracking-tight">PMU PLAY</p>
          <p className="text-white/80 text-xs font-medium mt-0.5">BONUS DE BIENVENUE</p>
          <p className="text-white font-bold text-base sm:text-lg">
            Jusqu&apos;à <span className="text-[#ffd700]">100&nbsp;€</span> offerts
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[10px] font-semibold text-[#0a3d0a] bg-white/90 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            Partenaire
          </span>
          <a
            href={pmuTrackingUrl(tracking)}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-flex items-center gap-1.5 bg-[#d4af37] hover:bg-[#e5c453] text-[#0a3d0a] font-bold text-sm px-4 py-2 rounded-lg transition-colors shadow"
          >
            J&apos;en profite
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Odds section */}
      {hasOdds && (
        <div className="px-5 py-4 sm:px-6">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Cotes 1&middot;N&middot;2 &middot; Coupe du Monde 2026
            <span className="float-right font-normal normal-case">Temps r&eacute;glementaire</span>
          </p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {/* Home */}
            <OddsBox
              label={`Victoire`}
              team={`${homeFlag} ${homeName}`}
              odds={homeOdds}
              isFavorite={favorite === "home"}
            />
            {/* Draw */}
            <OddsBox
              label="Nul"
              team="Match nul"
              odds={drawOdds}
              isFavorite={favorite === "draw"}
            />
            {/* Away */}
            <OddsBox
              label={`Victoire`}
              team={`${awayFlag} ${awayName}`}
              odds={awayOdds}
              isFavorite={favorite === "away"}
            />
          </div>
        </div>
      )}

      {/* Big CTA button */}
      <div className="px-5 pb-4 sm:px-6">
        <a
          href={pmuTrackingUrl(tracking)}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="block w-full text-center bg-[#c5a028] hover:bg-[#d4af37] text-[#0a3d0a] font-bold text-sm sm:text-base py-3 rounded-xl transition-colors shadow-md"
        >
          PARIER MAINTENANT SUR PMU PLAY &rarr;
        </a>
      </div>

      {/* Legal */}
      <div className="bg-gray-50 px-5 py-2.5 sm:px-6 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          Les jeux d&apos;argent et de hasard sont interdits aux mineurs. Jouer comporte des risques : endettement, d&eacute;pendance...{" "}
          <a href="tel:0974751313" className="underline">Appelez le 09 74 75 13 13</a> (appel non surtax&eacute;).
        </p>
      </div>
    </div>
  );
}

function OddsBox({
  label,
  team,
  odds,
  isFavorite,
}: {
  label: string;
  team: string;
  odds: string;
  isFavorite: boolean;
}) {
  return (
    <div className={`relative rounded-xl border-2 px-3 py-3 text-center transition-colors ${
      isFavorite ? "border-[#c5a028] bg-[#fdfaf0]" : "border-gray-200 bg-white"
    }`}>
      {isFavorite && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white bg-[#c5a028] px-2 py-0.5 rounded-full uppercase">
          Favori
        </span>
      )}
      <p className="text-[10px] font-semibold text-gray-400 uppercase">{label}</p>
      <p className="text-xs text-gray-600 mt-0.5 truncate">{team}</p>
      <p className={`text-2xl sm:text-3xl font-extrabold mt-1 ${
        isFavorite ? "text-[#0a3d0a]" : "text-gray-800"
      }`}>
        {odds}
      </p>
    </div>
  );
}
