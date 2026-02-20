"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  url: string;
  text: string;
  label?: string;
}

/**
 * ShareButtons — Single "Share" button using the native Web Share API on mobile,
 * with a "Copy link" fallback on desktop.
 */
export function ShareButtons({ url, text, label = "Partager ce pronostic" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({ title: text, text, url });
        return;
      } catch {
        // User cancelled or error — fall through to copy
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 py-3 border-t border-gray-200 dark:border-gray-700">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-accent/20 transition-all hover:bg-accent/80 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 min-h-[44px]"
        aria-label="Partager"
      >
        {copied ? (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            Copié !
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Partager
          </>
        )}
      </button>
    </div>
  );
}
