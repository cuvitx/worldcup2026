import { pmuTrackingUrl } from "@repo/data/affiliates";

/**
 * GA (Gambling Affiliation) banner — renders a direct PMU Play image
 * with affiliate tracking link. Sharp, responsive, no iframe issues.
 */

const GA_IMAGES: Record<string, { src: string; w: number; h: number }> = {
  // Horizontal banners — all use the HD 1380x300 "Habillage générique CDM"
  "1380x300": { src: "https://static.gambling-affiliation.com/uploads/ads/67238.jpg", w: 1380, h: 300 },
  "1080x192": { src: "https://static.gambling-affiliation.com/uploads/ads/67238.jpg", w: 1380, h: 300 },
  "728x90":   { src: "https://static.gambling-affiliation.com/uploads/ads/67238.jpg", w: 1380, h: 300 },
  "370x90":   { src: "https://static.gambling-affiliation.com/uploads/ads/67238.jpg", w: 1380, h: 300 },
  // Square/sidebar — use the 1080x1080 "PMU Play"
  "300x250":  { src: "https://static.gambling-affiliation.com/uploads/ads/66790.jpg", w: 1080, h: 1080 },
};

interface GABannerProps {
  variant: "728x90" | "300x250" | "370x90" | "1380x300" | "1080x192";
  tracking?: string;
  className?: string;
}

export function GABanner({ variant, tracking = "", className = "" }: GABannerProps) {
  const image = GA_IMAGES[variant] ?? { src: "https://static.gambling-affiliation.com/uploads/ads/67238.jpg", w: 1380, h: 300 };

  return (
    <div className={`flex justify-center ${className}`}>
      <a
        href={pmuTrackingUrl(tracking || "banner")}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="block w-full"
      >
        <img
          src={image.src}
          alt="PMU Play — Jusqu'à 100€ en cash"
          width={image.w}
          height={image.h}
          className="w-full h-auto rounded-lg"
          loading="lazy"
        />
      </a>
    </div>
  );
}
