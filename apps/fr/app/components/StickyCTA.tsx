"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { affiliateLinkAttributes, pmuTrackingUrl } from "@repo/data/affiliates";

const DISMISSED_KEY = "pmu-popup-dismissed";
const LEGAL_PATHS = ["/mentions-legales", "/jeu-responsable"];
const SHOW_DELAY_MS = 20000;

const PMU_IMAGE_DESKTOP = "/partners/pmu-popup-desktop.jpg";
const PMU_IMAGE_MOBILE = "/partners/pmu-popup-mobile.jpg";
const POPUP_TRACKING = { pageType: "global", slug: "popup", placement: "sticky" };

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (LEGAL_PATHS.includes(pathname)) return;

    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />
      {/* Popup */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="relative w-[85vw] max-w-[700px]">
          {/* Close button — inside the container, top-right corner */}
          <button
            onClick={(e) => { e.stopPropagation(); dismiss(); }}
            className="absolute top-2 right-2 z-[10000] flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black transition-colors shadow-lg backdrop-blur-sm"
            aria-label="Fermer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* HD image with affiliate link */}
          <a
            href={pmuTrackingUrl(POPUP_TRACKING)}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            {...affiliateLinkAttributes(POPUP_TRACKING)}
            className="block rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Mobile */}
            <img
              src={PMU_IMAGE_MOBILE}
              alt="PMU Play — Jusqu'à 100€ en cash"
              className="block sm:hidden w-full h-auto rounded-2xl"
            />
            {/* Desktop */}
            <img
              src={PMU_IMAGE_DESKTOP}
              alt="PMU Play — Jusqu'à 100€ en cash"
              className="hidden sm:block w-full h-auto rounded-2xl"
            />
          </a>

          {/* Legal */}
          <p className="mt-2 text-[10px] text-white/70 text-center">
            18+ | Offre soumise à conditions | <a href="/jeu-responsable" className="underline">Jeu responsable</a>
          </p>
        </div>
      </div>
    </>
  );
}
