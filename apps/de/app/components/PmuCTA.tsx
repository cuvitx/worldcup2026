import {
  affiliateLinkAttributes,
  getAffiliateTrackingData,
  pmuTrackingUrl,
  type AffiliateTracking,
} from "@repo/data/affiliates";

interface PmuCTAProps {
  tracking?: AffiliateTracking;
  teamName?: string;
  heading?: string;
  subheading?: string;
}

/**
 * Premium Betano CTA — same visual DNA as MatchBettingCard
 * (dark emerald gradient, gold accents, glow, shine sweep)
 * but without odds. Used on contextual pages (prognose, mannschaft, h2h, etc.)
 */
export function PmuCTA({
  tracking = "cta",
  teamName,
  heading,
  subheading,
}: PmuCTAProps) {
  const trackingData = getAffiliateTrackingData(tracking);
  const bonusUrl = pmuTrackingUrl(trackingData, "bonus-bar");
  const ctaUrl = pmuTrackingUrl(trackingData, "main-cta");
  const bonusAttributes = affiliateLinkAttributes(trackingData, "bonus-bar");
  const ctaAttributes = affiliateLinkAttributes(trackingData, "main-cta");

  const displayHeading =
    heading ??
    (teamName
      ? `Auf ${teamName} wetten mit Betano`
      : "Auf die WM wetten mit Betano");

  const displaySubheading =
    subheading ?? "Willkommensbonus | Es gelten die AGB";

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#d4af37]/25 text-white shadow-xl"
      style={{
        background:
          "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)",
      }}
    >
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
        {/* Bonus banner — full-width gold bar with shine */}
        <a
          href={bonusUrl}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          {...bonusAttributes}
          className="group relative flex items-center justify-between gap-3 overflow-hidden px-5 py-3 text-[#0c3b2e] transition hover:brightness-110 sm:px-6"
          style={{
            background:
              "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
          }}
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
              <span className="text-lg font-black leading-none sm:text-xl">
                Jetzt bei Betano
              </span>
              <span className="text-[11px] font-bold leading-none">
                wetten
              </span>
            </div>
          </div>
          <div className="relative inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-[#0c3b2e] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#d4af37] shadow-lg">
            Jetzt sichern <span aria-hidden="true">&rarr;</span>
          </div>
        </a>

        {/* Contextual heading */}
        <div className="px-5 py-4 sm:px-6">
          <p className="text-[#d4af37] font-bold text-sm sm:text-base uppercase tracking-wide">
            {displayHeading}
          </p>
          <p className="text-white/50 text-xs mt-1">{displaySubheading}</p>
        </div>

        {/* Big CTA button with shine */}
        <div className="relative px-4 pb-4">
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            {...ctaAttributes}
            className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 text-sm font-black uppercase tracking-wider text-[#0c3b2e] shadow-lg transition hover:shadow-[#d4af37]/30"
            style={{
              background:
                "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)",
            }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-[400%]"
            />
            <span className="relative">Jetzt bei Betano wetten</span>
            <span className="relative" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* Legal */}
      <div className="relative border-t border-white/5 bg-black/25 px-4 py-2.5 sm:px-5">
        <p className="text-center text-[10px] leading-snug text-white/30">
          Gl&uuml;cksspiel kann s&uuml;chtig machen. Spielen Sie verantwortungsvoll.{" "}
          <a
            href="tel:08001372700"
            className="underline text-white/40 hover:text-white/60"
          >
            Hilfe: 0800 1 37 27 00
          </a>{" "}
          (BZgA, kostenlos).
        </p>
      </div>
    </div>
  );
}
