"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Global click listener that tracks all affiliate link clicks via GA4.
 * Detects links with rel="sponsored" (all bookmaker CTAs use this).
 * Sends: affiliate_click event with clean attribution fields matching aff_var.
 */
export function AffiliateTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function getUrl(url: string): URL | null {
      try {
        return new URL(url);
      } catch {
        return null;
      }
    }

    function parseAffVar(affVar: string) {
      const [pageType = "unknown", slug = "unknown", placement = "inline"] =
        affVar.split(":");

      return { pageType, slug, placement };
    }

    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[rel*="sponsored"]');
      if (!anchor) return;

      const url = anchor.href;
      const parsedUrl = getUrl(url);
      // Extract bookmaker name from URL domain
      const hostname =
        parsedUrl?.hostname.replace("www.", "").replace("enligne.", "") ??
        "unknown";
      const bookmaker = hostname.split(".")[0] ?? hostname;
      const affVar =
        anchor.dataset.affVar ??
        parsedUrl?.searchParams.get("aff_var_1") ??
        "";
      const parsedAffVar = parseAffVar(affVar);

      // Detect CTA type from context
      const isSticky = !!anchor.closest('[class*="fixed"]');
      const isBanner = !!anchor.closest('[class*="gradient"]');
      const ctaType = isSticky ? "sticky" : isBanner ? "banner" : "inline";
      const placement = anchor.dataset.placement ?? parsedAffVar.placement ?? ctaType;

      if (typeof window.gtag === "function") {
        window.gtag("event", "affiliate_click", {
          bookmaker,
          affiliate_program: anchor.dataset.affiliateProgram ?? bookmaker,
          aff_var: affVar,
          page_type: anchor.dataset.pageType ?? parsedAffVar.pageType,
          page_slug: anchor.dataset.slug ?? parsedAffVar.slug,
          placement,
          cta_type: ctaType,
          page_path: pathname,
          outbound_domain: hostname,
          outbound_url: url,
        });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
