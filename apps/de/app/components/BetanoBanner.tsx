interface BetanoBannerProps {
  className?: string;
  compact?: boolean;
}

/**
 * Compact Betano banner — premium visual DNA (dark gradient, gold accents)
 * in a single-row layout. Used in footer, info pages, and sidebars.
 * `compact` mode stacks vertically for sidebar usage.
 */
export function BetanoBanner({
  className = "",
  compact = false,
}: BetanoBannerProps) {
  const url = "#"; // Placeholder — replace with actual Betano affiliate URL

  if (compact) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl border border-[#d4af37]/25 text-white shadow-lg ${className}`}
        style={{
          background:
            "linear-gradient(135deg, #0a1628 0%, #1a2a4a 40%, #2a4a6a 100%)",
        }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#d4af37]/15 blur-3xl"
        />

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="group relative flex flex-col items-center gap-3 px-4 py-4"
        >
          <span className="text-lg font-extrabold tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            Betano
          </span>
          <div className="text-center">
            <p className="text-[#d4af37] font-bold text-xs uppercase tracking-wide">
              Willkommensbonus
            </p>
            <p className="text-white font-extrabold text-lg mt-0.5">
              Bis zu <span className="text-[#ffd700]">100&nbsp;&euro;</span>
            </p>
          </div>
          <span className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0a1628] shadow transition"
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
            <span className="relative">Jetzt wetten</span>
            <span className="relative" aria-hidden="true">&rarr;</span>
          </span>
        </a>

        {/* Legal */}
        <div className="border-t border-white/5 bg-black/25 px-3 py-1.5">
          <p className="text-center text-[9px] leading-snug text-white/30">
            18+ | <a href="tel:08001372700" className="underline">0800 1 37 27 00</a> | Verantwortungsvoll spielen
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
          "linear-gradient(135deg, #0a1628 0%, #1a2a4a 40%, #2a4a6a 100%)",
      }}
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/15 blur-3xl"
      />

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="group relative flex flex-col sm:flex-row items-center gap-3 sm:gap-5 px-5 py-4 sm:px-6"
      >
        <span className="text-xl font-extrabold tracking-tight text-white shrink-0 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
          Betano
        </span>

        <div className="flex-1 text-center sm:text-left">
          <p className="text-[#d4af37] font-bold text-xs sm:text-sm uppercase tracking-wide">
            Willkommensbonus
          </p>
          <p className="text-white font-extrabold text-xl sm:text-2xl mt-0.5">
            Bis zu <span className="text-[#ffd700]">100&nbsp;&euro;</span> in Wettguthaben
          </p>
        </div>

        <span
          className="relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-black uppercase tracking-wider text-[#0a1628] shadow-lg transition"
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
          <span className="relative">Jetzt wetten</span>
          <span className="relative" aria-hidden="true">&rarr;</span>
        </span>
      </a>

      {/* Legal */}
      <div className="relative border-t border-white/5 bg-black/25 px-4 py-2 sm:px-5">
        <p className="text-center text-[10px] leading-snug text-white/30">
          18+ | Angebot unterliegt Bedingungen |{" "}
          <a href="tel:08001372700" className="underline text-white/40 hover:text-white/60">
            0800 1 37 27 00
          </a>{" "}
          | Verantwortungsvoll spielen
        </p>
      </div>
    </div>
  );
}
