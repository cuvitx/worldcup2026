"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { featuredBookmaker } from "@repo/data/affiliates";

const DISMISSED_KEY = "sticky-cta-dismissed";
const LEGAL_PATHS = ["/mentions-legales", "/jeu-responsable"];

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (LEGAL_PATHS.includes(pathname)) {
      setVisible(false);
      return;
    }
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    setVisible(!dismissed);
  }, [pathname]);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
      <div className="flex items-center justify-between gap-3 bg-white/90 backdrop-blur-sm border-t border-gray-200 px-4 py-3 shadow-lg dark:bg-slate-900/90 dark:border-slate-700">
        <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
          🎁 <span className="text-red-600">{featuredBookmaker.bonus}</span>{" "}
          <span className="text-gray-500 font-normal text-xs">{featuredBookmaker.bonusDetail}</span>
        </p>
        <div className="flex items-center gap-2">
          <a
            href={featuredBookmaker.url}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors whitespace-nowrap"
          >
            Parier →
          </a>
          <button
            onClick={dismiss}
            className="p-1 text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Fermer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
