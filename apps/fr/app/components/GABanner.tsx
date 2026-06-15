"use client";

/**
 * GA (Gambling Affiliation) banner — loads a PMU Play visual creative.
 * Uses an iframe so the GA script can freely use document.write().
 */

/** Available banner script IDs from GA backoffice */
const GA_SCRIPTS = {
  /** 728x90 — Desktop leaderboard */
  "728x90": "p-ktSu91BxaZGtLk3-JxEMvon63xVw5PV-aEacCuJUA_GA7331V2",
  /** 300x250 — Medium rectangle (sidebar, mobile) */
  "300x250": "5xAZxfSvUmYyK6RUdeIFXMu8Q7jUZurFO0x6ZHXlYNY_GA7331V2",
  /** 370x90 — Mobile banner */
  "370x90": "h4sOPUsxeJjJultZIo9JBOaL1yLFEpxYhrGf7Bv-t6g_GA7331V2",
  /** 1380x300 — Habillage CDM (hero banner) */
  "1380x300": "bjjpByzimRUnt8pN84IYmkE-lLcTAeJ2cFZrik5KDsk_GA7331V2",
  /** 1080x192 — Full-width thin banner */
  "1080x192": "erBtbOD1NpCsXxVY4-DRg3DplRb7MGRy0FkjsvvXK3E_GA7331V2",
} as const;

/** Pixel dimensions for each variant */
const GA_SIZES: Record<keyof typeof GA_SCRIPTS, { w: number; h: number }> = {
  "728x90": { w: 728, h: 90 },
  "300x250": { w: 300, h: 250 },
  "370x90": { w: 370, h: 90 },
  "1380x300": { w: 1380, h: 300 },
  "1080x192": { w: 1080, h: 192 },
};

interface GABannerProps {
  /** Which banner size to display */
  variant: keyof typeof GA_SCRIPTS;
  /** Page-specific tracking value for aff_var_1 */
  tracking?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

export function GABanner({ variant, tracking = "", className = "" }: GABannerProps) {
  const scriptId = GA_SCRIPTS[variant];
  const { w, h } = GA_SIZES[variant];
  const src = `https://www.gambling-affiliation.com/cpm/v=${scriptId}&aff_var_1=${encodeURIComponent(tracking)}`;

  // The GA script uses document.write() — only works inside an iframe
  const srcDoc = `<!DOCTYPE html>
<html><head><style>*{margin:0;padding:0;}body{display:flex;justify-content:center;align-items:center;min-height:100%;background:transparent;overflow:hidden;}</style></head>
<body><script type="text/javascript" charset="utf-8" src="${src}"><\/script></body></html>`;

  return (
    <div className={`flex justify-center ${className}`}>
      <iframe
        srcDoc={srcDoc}
        width={w}
        height={h}
        style={{ border: "none", maxWidth: "100%", overflow: "hidden", background: "transparent" }}
        scrolling="no"
        title={`PMU Sport ${variant}`}
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation allow-same-origin"
      />
    </div>
  );
}
