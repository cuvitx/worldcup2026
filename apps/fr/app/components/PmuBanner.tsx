import {
  affiliateLinkAttributes,
  getAffiliateTrackingData,
  pmuTrackingUrl,
  type AffiliateTracking,
} from "@repo/data/affiliates";
import { GaTrackingPixel } from "./GaTrackingPixel";

interface PmuBannerProps {
  tracking?: AffiliateTracking;
  className?: string;
  compact?: boolean;
}

/**
 * Compact PMU banner — same premium visual DNA (dark gradient, gold accents)
 * in a single-row layout. Used in footer, info pages, and sidebars.
 * `compact` mode stacks vertically for sidebar usage.
 */
export function PmuBanner({
  tracking = "banner",
  className = "",
  compact = false,
}: PmuBannerProps) {
  const url = pmuTrackingUrl(tracking);
  const trackingData = getAffiliateTrackingData(tracking);
  const linkAttributes = affiliateLinkAttributes(tracking);

  if (compact) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-[#d4af37]/25 text-white shadow-lg ${className}`}
        style={{
          background:
            "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)",
        }}
      >
        <GaTrackingPixel variant="300x250" tracking={trackingData.affVar} />
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d4af37]/15 blur-3xl"
        />

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          {...linkAttributes}
          className="group relative flex flex-col items-center gap-3 px-4 py-4"
        >
          <img
            src="/partners/pmu-play.webp"
            alt="PMU Play"
            width={100}
            height={30}
            className="h-6 w-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
          />
          <div className="text-center">
            <p className="text-[#d4af37] font-bold text-xs uppercase tracking-wide">
              Bonus de bienvenue
            </p>
            <p className="text-white font-extrabold text-lg mt-0.5">
              100&nbsp;&euro; <span className="text-[#ffd700]">offerts</span>
            </p>
          </div>
          <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0c3b2e] shadow transition"
            style={{
              background:
                "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
            }}
          >
            {/* Shine */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
            />
            <span className="relative">J&apos;en profite</span>
            <span className="relative" aria-hidden="true">&rarr;</span>
          </span>
        </a>

        {/* Legal */}
        <div className="border-t border-white/5 bg-black/25 px-3 py-1.5">
          <p className="text-center text-[9px] leading-snug text-white/30">
            18+ | <a href="tel:0974751313" className="underline">09 74 75 13 13</a> | Jeu responsable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#d4af37]/25 text-white shadow-lg ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)",
      }}
    >
      <GaTrackingPixel variant="728x90" tracking={trackingData.affVar} />
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/15 blur-3xl"
      />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        {...linkAttributes}
        className="group relative flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-5 py-4 sm:px-6"
      >
        <img
          src="/partners/pmu-play.webp"
          alt="PMU Play"
          width={120}
          height={36}
          className="h-7 w-auto shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
        />

        <div className="flex-1 text-center sm:text-left">
          <p className="text-[#d4af37] font-bold text-xs sm:text-sm uppercase tracking-wide">
            Bonus de bienvenue
          </p>
          <p className="text-white font-extrabold text-xl sm:text-2xl mt-0.5">
            Jusqu&apos;à <span className="text-[#ffd700]">100&nbsp;&euro;</span> offerts en cash
          </p>
        </div>

        <span
          className="relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition"
          style={{
            background:
              "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
          }}
        >
          {/* Shine */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
          />
          <span className="relative">Parier maintenant</span>
          <span className="relative" aria-hidden="true">&rarr;</span>
        </span>
      </a>

      {/* Legal */}
      <div className="relative border-t border-white/5 bg-black/25 px-4 py-2 sm:px-5">
        <p className="text-center text-[10px] leading-snug text-white/30">
          18+ | Offre soumise à conditions |{" "}
          <a href="tel:0974751313" className="underline text-white/40 hover:text-white/60">
            09 74 75 13 13
          </a>{" "}
          | Jeu responsable
        </p>
      </div>
    </div>
  );
}
