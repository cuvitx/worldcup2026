import { GABanner } from "./GABanner";

interface InlineBettingCTAProps {
  /** Tracking identifier for this page (e.g., "homepage", "calendrier") */
  tracking: string;
}

/**
 * PMU Play visual banner CTA — responsive HD image with affiliate link.
 */
export function InlineBettingCTA({ tracking }: InlineBettingCTAProps) {
  return (
    <div>
      <GABanner variant="1380x300" tracking={tracking} />
      <p className="text-[10px] text-gray-400 text-center mt-2">
        18+ | Offre soumise à conditions |{" "}
        <a href="tel:0974751313" className="underline">09 74 75 13 13</a>{" "}
        | <a href="/jeu-responsable" className="underline">Jeu responsable</a>
      </p>
    </div>
  );
}
