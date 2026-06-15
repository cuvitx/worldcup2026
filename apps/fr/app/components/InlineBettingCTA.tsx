import { pmuTrackingUrl } from "@repo/data/affiliates";

interface InlineBettingCTAProps {
  /** Tracking identifier for this page (e.g., "homepage", "calendrier") */
  tracking: string;
  /** Optional heading text */
  title?: string;
  /** Optional subtitle */
  subtitle?: string;
}

/**
 * Lightweight server component for PMU Sport CTA banners.
 * Uses page-specific tracking via aff_var_1 for Gambling Affiliation analytics.
 */
export function InlineBettingCTA({
  tracking,
  title = "100€ offerts en freebets",
  subtitle = "Pariez sur la Coupe du Monde 2026 avec PMU Sport",
}: InlineBettingCTAProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-primary to-accent p-5 sm:p-6">
      <a
        href={pmuTrackingUrl(tracking)}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="group flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-white"
      >
        <div>
          <p className="text-lg font-bold sm:text-xl">{title}</p>
          <p className="mt-0.5 text-sm text-white/70">{subtitle}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-primary transition-transform group-hover:scale-105 self-start sm:self-center whitespace-nowrap">
          Parier sur PMU Sport &rarr;
        </span>
      </a>
      <p className="text-[10px] text-white/50 text-center mt-3">
        18+ | Offre soumise à conditions |{" "}
        <a href="tel:0974751313" className="underline">09 74 75 13 13</a>{" "}
        | <a href="/jeu-responsable" className="underline">Jeu responsable</a>
      </p>
    </div>
  );
}
