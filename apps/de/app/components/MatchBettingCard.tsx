import Link from "next/link";
import {
  affiliateLinkAttributes,
  getAffiliateTrackingData,
  pmuTrackingUrl,
  type AffiliateTracking,
} from "@repo/data/affiliates";
import { GaTrackingPixel } from "./GaTrackingPixel";

interface MatchBettingCardProps {
  homeName: string;
  homeFlag: string;
  awayName: string;
  awayFlag: string;
  homeOdds?: string;
  drawOdds?: string;
  awayOdds?: string;
  tracking?: AffiliateTracking;
  /** When set, shows a "Nächstes Spiel" label linking to this match page */
  nextMatchSlug?: string;
}

/**
 * Premium Betano betting card — dark gradient, gold accents, glow effects,
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
  const trackingData = getAffiliateTrackingData(tracking);
  const bonusUrl = pmuTrackingUrl(trackingData, "bonus-bar");
  const ctaUrl = pmuTrackingUrl(trackingData, "main-cta");
  const homeOddsUrl = pmuTrackingUrl(trackingData, "odds-home");
  const drawOddsUrl = pmuTrackingUrl(trackingData, "odds-draw");
  const awayOddsUrl = pmuTrackingUrl(trackingData, "odds-away");
  const bonusAttributes = affiliateLinkAttributes(trackingData, "bonus-bar");
  const ctaAttributes = affiliateLinkAttributes(trackingData, "main-cta");
  const homeOddsAttributes = affiliateLinkAttributes(trackingData, "odds-home");
  const drawOddsAttributes = affiliateLinkAttributes(trackingData, "odds-draw");
  const awayOddsAttributes = affiliateLinkAttributes(trackingData, "odds-away");

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
      <GaTrackingPixel variant="728x90" tracking={trackingData.affVar} />
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#d4af37]/15 blur-3xl"
      />

      {/* Top bar — Logo + Partner */}
      <div className="relative flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 sm:px-6">
        <img
          src="/partners/pmu-play.webp"
          alt="Betano"
          width={120}
          height={36}
          className="h-8 w-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
        />
        <span className="whitespace-nowrap rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d4af37]">
          Partner
        </span>
      </div>

      <div className="relative">
        {/* Next match label */}
        {nextMatchSlug && (
          <Link
            href={`/spiel/${nextMatchSlug}`}
            className="flex items-center gap-2 px-5 py-2.5 sm:px-6 border-b border-white/5 hover:bg-white/5 transition-colors"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffd700] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] truncate min-w-0">
              N&auml;chstes Spiel: {homeFlag} {homeName} vs {awayName} {awayFlag}
            </span>
            <span className="text-white/40 text-xs shrink-0">&rarr;</span>
          </Link>
        )}

        {/* Bonus banner — full-width gold bar with shine animation */}
        <a
          href={bonusUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          {...bonusAttributes}
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
              Willkommensbonus
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black leading-none sm:text-xl">Jetzt bei Betano</span>
              <span className="text-[11px] font-bold leading-none">wetten</span>
            </div>
          </div>
          <div className="relative inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#0c3b2e] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37] shadow-lg">
            Jetzt sichern <span aria-hidden="true">&rarr;</span>
          </div>
        </a>

        {/* Odds section */}
        {hasOdds && (
          <div className="px-4 pb-1 pt-4 sm:px-5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                Quoten 1&middot;X&middot;2 &middot; WM 2026
              </span>
              <span className="text-[10px] text-white/40">Regul&auml;re Spielzeit</span>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <OddsBox
                label="Sieg"
                team={`${homeFlag} ${homeName}`}
                odds={homeOdds}
                isFavorite={favorite === "home"}
                href={homeOddsUrl}
                trackingAttributes={homeOddsAttributes}
              />
              <OddsBox
                label="Unentschieden"
                team="Remis"
                odds={drawOdds}
                isFavorite={favorite === "draw"}
                href={drawOddsUrl}
                trackingAttributes={drawOddsAttributes}
              />
              <OddsBox
                label="Sieg"
                team={`${awayFlag} ${awayName}`}
                odds={awayOdds}
                isFavorite={favorite === "away"}
                href={awayOddsUrl}
                trackingAttributes={awayOddsAttributes}
              />
            </div>
          </div>
        )}

        {/* Big CTA button with shine */}
        <div className="relative p-4">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            {...ctaAttributes}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition hover:shadow-[#d4af37]/30"
            style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
            />
            <span className="relative sm:hidden">Jetzt wetten</span>
            <span className="relative hidden sm:inline">Jetzt bei Betano wetten</span>
            <span className="relative" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>

      {/* Legal */}
      <div className="relative border-t border-white/5 bg-black/25 px-4 py-2.5 sm:px-5">
        <p className="text-center text-[10px] leading-snug text-white/30">
          Gl&uuml;cksspiel kann s&uuml;chtig machen. Spielen Sie verantwortungsvoll.{" "}
          <a href="tel:08001372700" className="underline text-white/40 hover:text-white/60">
            Hilfe: 0800 1 37 27 00
          </a>{" "}
          (BZgA, kostenlos).
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
  trackingAttributes,
}: {
  label: string;
  team: string;
  odds: string;
  isFavorite: boolean;
  href: string;
  trackingAttributes: ReturnType<typeof affiliateLinkAttributes>;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      {...trackingAttributes}
      className={`group relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-3 transition sm:py-3.5 ${
        isFavorite
          ? "border-[#d4af37] bg-[#d4af37]/[0.08] shadow-[0_0_0_1px_rgba(212,175,55,0.35),0_8px_24px_-12px_rgba(212,175,55,0.4)]"
          : "border-white/15 bg-white/[0.03] hover:border-[#d4af37]/60 hover:bg-[#d4af37]/[0.06]"
      }`}
    >
      {isFavorite && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-[#d4af37] px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-[#0c3b2e] shadow">
          Favorit
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
