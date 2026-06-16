import Link from "next/link";
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
  /** When set, shows a "Prochain match" label linking to this match page */
  nextMatchSlug?: string;
}

/**
 * Premium PMU betting card — dark gradient, gold accents, glow effects,
 * shine animation on hover. Each odds box is a clickable affiliate link.
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
  nextMatchSlug,
}: MatchBettingCardProps) {
  const hasOdds = homeOdds && drawOdds && awayOdds;
  const url = pmuTrackingUrl(tracking);

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
    <div
      className="relative overflow-hidden rounded-2xl border border-[#d4af37]/25 text-white shadow-xl max-w-full"
      style={{ background: "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)" }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#d4af37]/15 blur-3xl"
      />

      {/* Top bar — Logo + Partenaire */}
      <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 sm:px-6">
        <img
          src="/partners/pmu-play.webp"
          alt="PMU Play"
          width={120}
          height={36}
          className="h-8 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        />
        <span className="whitespace-nowrap rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d4af37]">
          Partenaire
        </span>
      </div>

      <div className="relative">
        {/* Next match label */}
        {nextMatchSlug && (
          <Link
            href={`/match/${nextMatchSlug}`}
            className="flex items-center gap-2 px-5 py-2.5 sm:px-6 border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffd700] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] truncate min-w-0">
              Prochain match : {homeFlag} {homeName} vs {awayName} {awayFlag}
            </span>
            <span className="text-white/40 text-xs shrink-0">&rarr;</span>
          </Link>
        )}

        {/* Bonus banner — full-width gold bar with shine animation */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="group relative flex items-center justify-between gap-3 overflow-hidden px-5 py-3 text-[#0c3b2e] transition hover:brightness-110 sm:px-6"
          style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
        >
          {/* Shine sweep on hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
          />
          <div className="relative">
            <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#0c3b2e]/70">
              Bonus de bienvenue
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black leading-none sm:text-xl">Jusqu&apos;à 100&nbsp;€</span>
              <span className="text-[11px] font-bold leading-none">offerts</span>
            </div>
          </div>
          <div className="relative inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#0c3b2e] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37] shadow-lg">
            J&apos;en profite <span aria-hidden="true">&rarr;</span>
          </div>
        </a>

        {/* Odds section */}
        {hasOdds && (
          <div className="px-4 pb-1 pt-4 sm:px-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                Cotes 1&middot;N&middot;2 &middot; Coupe du Monde 2026
              </span>
              <span className="text-[10px] text-white/40">Temps r&eacute;glementaire</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <OddsBox
                label="Victoire"
                team={`${homeFlag} ${homeName}`}
                odds={homeOdds}
                isFavorite={favorite === "home"}
                href={url}
              />
              <OddsBox
                label="Nul"
                team="Match nul"
                odds={drawOdds}
                isFavorite={favorite === "draw"}
                href={url}
              />
              <OddsBox
                label="Victoire"
                team={`${awayFlag} ${awayName}`}
                odds={awayOdds}
                isFavorite={favorite === "away"}
                href={url}
              />
            </div>
          </div>
        )}

        {/* Big CTA button with shine */}
        <div className="relative p-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition hover:shadow-[#d4af37]/30"
            style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
            />
            <span className="relative sm:hidden">Parier &middot; 100&nbsp;€ offerts</span>
            <span className="relative hidden sm:inline">Parier maintenant sur PMU Play</span>
            <span className="relative" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Legal */}
      <div className="relative border-t border-white/5 bg-black/25 px-4 py-2.5 sm:px-5">
        <p className="text-center text-[10px] leading-snug text-white/30">
          Les jeux d&apos;argent et de hasard sont interdits aux mineurs. Jouer comporte des risques : endettement, d&eacute;pendance...{" "}
          <a href="tel:0974751313" className="underline text-white/40 hover:text-white/60">
            Appelez le 09 74 75 13 13
          </a>{" "}
          (appel non surtax&eacute;).
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
  href,
}: {
  label: string;
  team: string;
  odds: string;
  isFavorite: boolean;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className={`group relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-3 transition sm:py-3.5 ${
        isFavorite
          ? "border-[#d4af37] bg-[#d4af37]/[0.08] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_8px_24px_-12px_rgba(212,175,55,0.4)]"
          : "border-white/15 bg-white/[0.03] hover:border-[#d4af37]/60 hover:bg-[#d4af37]/[0.06]"
      }`}
    >
      {isFavorite && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#d4af37] px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#0c3b2e] shadow">
          Favori
        </span>
      )}
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-white/50">{label}</span>
      <span className="truncate min-w-0 max-w-full text-xs font-semibold text-white/90">{team}</span>
      <span className={`text-xl font-black tabular-nums sm:text-2xl ${
        isFavorite ? "text-[#ffd700]" : "text-[#d4af37]"
      }`}>
        {odds}
      </span>
    </a>
  );
}
