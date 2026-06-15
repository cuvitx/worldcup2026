"use client";

/**
 * GA (Gambling Affiliation) banner — loads a PMU Play visual creative.
 * Renders an iframe pointing to /api/ga-banner which serves the GA CPM
 * script in a real HTML page where document.write() works naturally.
 */

const GA_SIZES: Record<string, { w: number; h: number }> = {
  "728x90": { w: 728, h: 90 },
  "300x250": { w: 300, h: 250 },
  "370x90": { w: 370, h: 90 },
  "1380x300": { w: 1380, h: 300 },
  "1080x192": { w: 1080, h: 192 },
};

interface GABannerProps {
  variant: "728x90" | "300x250" | "370x90" | "1380x300" | "1080x192";
  tracking?: string;
  className?: string;
}

export function GABanner({ variant, tracking = "", className = "" }: GABannerProps) {
  const size = GA_SIZES[variant] ?? { w: 728, h: 90 };
  const { w, h } = size;

  return (
    <div className={`flex justify-center ${className}`}>
      <iframe
        src={`/api/ga-banner?v=${variant}&t=${encodeURIComponent(tracking)}`}
        width={w}
        height={h}
        style={{ border: "none", maxWidth: "100%", overflow: "hidden" }}
        scrolling="no"
        title={`PMU Sport ${variant}`}
      />
    </div>
  );
}
