"use client";

import { useEffect, useRef } from "react";

/**
 * GA (Gambling Affiliation) banner — loads a PMU Play visual creative.
 * The GA CPM script uses document.write() to inject its content.
 * We create a controlled iframe and write the script into it via
 * contentDocument.write(), so document.write() works naturally.
 */

/** Available banner script IDs from GA backoffice */
const GA_SCRIPTS = {
  "728x90": "p-ktSu91BxaZGtLk3-JxEMvon63xVw5PV-aEacCuJUA_GA7331V2",
  "300x250": "5xAZxfSvUmYyK6RUdeIFXMu8Q7jUZurFO0x6ZHXlYNY_GA7331V2",
  "370x90": "h4sOPUsxeJjJultZIo9JBOaL1yLFEpxYhrGf7Bv-t6g_GA7331V2",
  "1380x300": "bjjpByzimRUnt8pN84IYmkE-lLcTAeJ2cFZrik5KDsk_GA7331V2",
  "1080x192": "erBtbOD1NpCsXxVY4-DRg3DplRb7MGRy0FkjsvvXK3E_GA7331V2",
} as const;

const GA_SIZES: Record<keyof typeof GA_SCRIPTS, { w: number; h: number }> = {
  "728x90": { w: 728, h: 90 },
  "300x250": { w: 300, h: 250 },
  "370x90": { w: 370, h: 90 },
  "1380x300": { w: 1380, h: 300 },
  "1080x192": { w: 1080, h: 192 },
};

interface GABannerProps {
  variant: keyof typeof GA_SCRIPTS;
  tracking?: string;
  className?: string;
}

export function GABanner({ variant, tracking = "", className = "" }: GABannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clean previous iframe if any
    if (iframeRef.current) {
      iframeRef.current.remove();
      iframeRef.current = null;
    }

    const scriptId = GA_SCRIPTS[variant];
    const { w, h } = GA_SIZES[variant];
    const src = `https://www.gambling-affiliation.com/cpm/v=${scriptId}&aff_var_1=${encodeURIComponent(tracking)}`;

    // Create a real iframe and write the GA script into it.
    // The script's document.write() works because we control
    // the document lifecycle via contentDocument.write().
    const iframe = document.createElement("iframe");
    iframe.width = String(w);
    iframe.height = String(h);
    iframe.style.border = "none";
    iframe.style.maxWidth = "100%";
    iframe.style.overflow = "hidden";
    iframe.style.display = "block";
    iframe.scrolling = "no";
    iframe.title = `PMU Sport ${variant}`;
    container.appendChild(iframe);
    iframeRef.current = iframe;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`<!DOCTYPE html>
<html><head><style>*{margin:0;padding:0;}body{overflow:hidden;}</style></head>
<body><script type="text/javascript" charset="utf-8" src="${src}"><\/script></body></html>`);
      doc.close();
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.remove();
        iframeRef.current = null;
      }
    };
  }, [variant, tracking]);

  return (
    <div className={`flex justify-center ${className}`}>
      <div ref={containerRef} />
    </div>
  );
}
