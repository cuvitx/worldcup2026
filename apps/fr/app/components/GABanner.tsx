"use client";

import { useEffect, useRef } from "react";

/**
 * GA (Gambling Affiliation) banner — loads a PMU Play visual creative.
 * The script injects the banner (image + tracking) at its position.
 */

/** Available banner script IDs from GA backoffice */
const GA_SCRIPTS = {
  /** Large banner (728x90 or similar desktop format) */
  large: "p-ktSu91BxaZGtLk3-JxEMvon63xVw5PV-aEacCuJUA_GA7331V2",
  /** Square/medium banner (300x250 or similar) */
  medium: "5xAZxfSvUmYyK6RUdeIFXMu8Q7jUZurFO0x6ZHXlYNY_GA7331V2",
} as const;

interface GABannerProps {
  /** Which banner size to display */
  variant: keyof typeof GA_SCRIPTS;
  /** Page-specific tracking value for aff_var_1 */
  tracking?: string;
  /** Additional CSS classes for the container */
  className?: string;
}

export function GABanner({ variant, tracking = "", className = "" }: GABannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || loadedRef.current) return;
    loadedRef.current = true;

    const scriptId = GA_SCRIPTS[variant];
    const src = `https://www.gambling-affiliation.com/cpm/v=${scriptId}&aff_var_1=${encodeURIComponent(tracking)}`;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.src = src;
    containerRef.current.appendChild(script);

    return () => {
      loadedRef.current = false;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [variant, tracking]);

  return (
    <div className={`flex justify-center ${className}`}>
      <div ref={containerRef} />
      <noscript>
        <a
          href={`https://www.gambling-affiliation.com/cpc/v=ak0CEPFp.xNc0Zux4eAz9mltNCb6fU43LYUUbJ-hUbE_GA7331V2&aff_var_1=${tracking}`}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white"
        >
          100€ offerts sur PMU Sport &rarr;
        </a>
      </noscript>
    </div>
  );
}
