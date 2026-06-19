"use client";

/**
 * Invisible Gambling Affiliation CPM tracking pixel.
 * Loads the GA script in a hidden iframe to:
 * 1. Track impressions
 * 2. Set the conversion attribution cookie
 *
 * Use alongside custom CTA components to preserve conversion tracking.
 */

const GA_SCRIPT_IDS: Record<string, string> = {
  "728x90": "p-ktSu91BxaZGtLk3-JxEMvon63xVw5PV-aEacCuJUA_GA7331V2",
  "300x250": "5xAZxfSvUmYyK6RUdeIFXMu8Q7jUZurFO0x6ZHXlYNY_GA7331V2",
  "370x90": "h4sOPUsxeJjJultZIo9JBOaL1yLFEpxYhrGf7Bv-t6g_GA7331V2",
  "1380x300": "bjjpByzimRUnt8pN84IYmkE-lLcTAeJ2cFZrik5KDsk_GA7331V2",
  "1080x192": "erBtbOD1NpCsXxVY4-DRg3DplRb7MGRy0FkjsvvXK3E_GA7331V2",
};

interface GaTrackingPixelProps {
  variant?: string;
  tracking?: string;
}

export function GaTrackingPixel({
  variant = "370x90",
  tracking = "",
}: GaTrackingPixelProps) {
  const scriptId = GA_SCRIPT_IDS[variant];
  if (!scriptId) return null;

  return (
    <iframe
      src={`/api/ga-banner?v=${variant}&t=${encodeURIComponent(tracking)}`}
      width={1}
      height={1}
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
        border: "none",
        overflow: "hidden",
      }}
      tabIndex={-1}
      aria-hidden="true"
      loading="lazy"
      title=""
    />
  );
}
