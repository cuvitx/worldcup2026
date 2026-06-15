import { GABanner } from "./GABanner";

interface InlineBettingCTAProps {
  /** Tracking identifier for this page (e.g., "homepage", "calendrier") */
  tracking: string;
}

/**
 * PMU Play visual banner CTA with GA impression tracking.
 * Shows the large banner on desktop, medium on mobile.
 */
export function InlineBettingCTA({ tracking }: InlineBettingCTAProps) {
  return (
    <div>
      {/* Full-width thin banner (desktop) */}
      <GABanner variant="1080x192" tracking={tracking} className="hidden sm:flex" />
      {/* Mobile banner */}
      <GABanner variant="370x90" tracking={tracking} className="flex sm:hidden" />
      <p className="text-[10px] text-gray-400 text-center mt-2">
        18+ | Offre soumise à conditions |{" "}
        <a href="tel:0974751313" className="underline">09 74 75 13 13</a>{" "}
        | <a href="/jeu-responsable" className="underline">Jeu responsable</a>
      </p>
    </div>
  );
}
