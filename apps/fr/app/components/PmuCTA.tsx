import { pmuTrackingUrl } from "@repo/data/affiliates";

interface PmuCTAProps {
  tracking?: string;
  teamName?: string;
}

/**
 * Custom PMU Play CTA — integrated design with gold/green PMU brand colors.
 * Much better conversion than generic banner images.
 */
export function PmuCTA({ tracking = "cta", teamName }: PmuCTAProps) {
  const heading = teamName
    ? `Pariez sur ${teamName} avec PMU Play`
    : "Pariez sur la Coupe du Monde avec PMU Play";

  return (
    <a
      href={pmuTrackingUrl(tracking)}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="block rounded-2xl overflow-hidden bg-gradient-to-r from-[#0a3d0a] via-[#145214] to-[#0d470d] border border-[#d4af37]/30 shadow-lg hover:shadow-xl transition-shadow group"
    >
      <div className="px-5 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Left — Text */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-[#d4af37] font-bold text-sm sm:text-base uppercase tracking-wide">
            {heading}
          </p>
          <p className="text-white text-2xl sm:text-3xl font-extrabold mt-1">
            Jusqu&apos;à <span className="text-[#ffd700]">100€</span> en cash offerts
          </p>
          <p className="text-white/60 text-xs mt-2">
            1er pari remboursé en cash | Offre de bienvenue
          </p>
        </div>

        {/* Right — CTA button */}
        <div className="shrink-0">
          <span className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#e5c453] text-[#0a3d0a] font-bold text-sm sm:text-base px-6 py-3 rounded-xl transition-colors group-hover:bg-[#e5c453] shadow-md">
            Profiter de l&apos;offre
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>

      {/* Legal footer */}
      <div className="bg-black/30 px-5 py-2 sm:px-8">
        <p className="text-[10px] text-white/50 text-center sm:text-left">
          18+ | Offre soumise à conditions | <span className="underline">09 74 75 13 13</span> | Jeu responsable
        </p>
      </div>
    </a>
  );
}
