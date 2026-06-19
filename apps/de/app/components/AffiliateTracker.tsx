"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global click listener that tracks all affiliate link clicks via GA4.
 * Detects links with rel="sponsored" (all bookmaker CTAs use this).
 * Sends: affiliate_click event with bookmaker name, page, and CTA type.
 */
export function AffiliateTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[rel*="sponsored"]');
      if (!anchor) return;

      const url = anchor.href;
      // Extract bookmaker name from URL domain
      const hostname = new URL(url).hostname.replace("www.", "").replace("enligne.", "");
      const bookmaker = hostname.split(".")[0] ?? hostname;

      // Detect CTA type from context
      const isSticky = !!anchor.closest('[class*="fixed"]');
      const isBanner = !!anchor.closest('[class*="gradient"]');
      const ctaType = isSticky ? "sticky" : isBanner ? "banner" : "inline";

      if (typeof window.gtag === "function") {
        window.gtag("event", "affiliate_click", {
          bookmaker,
          cta_type: ctaType,
          page_path: pathname,
          outbound_url: url,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
