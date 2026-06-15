"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GABanner } from "./GABanner";

const DISMISSED_KEY = "pmu-popup-dismissed";
const LEGAL_PATHS = ["/mentions-legales", "/jeu-responsable"];
const SHOW_DELAY_MS = 3000;

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
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative pointer-events-auto rounded-2xl bg-white shadow-2xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            aria-label="Fermer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* PMU 300x250 banner */}
          <GABanner variant="300x250" tracking="popup" />

          {/* Legal */}
          <p className="bg-gray-50 px-3 py-2 text-[10px] text-gray-400 text-center">
            18+ | Offre soumise à conditions | <a href="/jeu-responsable" className="underline">Jeu responsable</a>
          </p>
        </div>
      </div>
    </>
  );
}
