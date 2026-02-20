"use client";

import { useMemo } from "react";
import { ExternalLink } from "lucide-react";
import { bookmakers } from "@repo/data/affiliates";
import type { Bookmaker } from "@repo/data/affiliates";

interface BookmakerCTAProps {
  variant?: "inline" | "banner";
  bookmaker?: string;
}

function pickBookmaker(id?: string): Bookmaker {
  if (id) {
    const found = bookmakers.find((b) => b.id === id || b.slug === id);
    if (found) return found;
  }
  const top = bookmakers.filter((b) => b.highlight);
  const pool = top.length > 0 ? top : bookmakers.slice(0, 4);
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function BookmakerCTA({ variant = "inline", bookmaker }: BookmakerCTAProps) {
  const bk = useMemo(() => pickBookmaker(bookmaker), [bookmaker]);

  if (variant === "banner") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-accent p-6 text-white sm:p-8">
        <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-bold sm:text-xl">
              Meilleure cote sur {bk.name}
            </p>
            <p className="mt-1 text-white/90">
              {bk.bonus} {bk.bonusDetail}
            </p>
          </div>
          <a
            href={bk.url}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary transition-transform hover:scale-105"
          >
            Profiter de l&apos;offre
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="relative z-10 mt-4 text-xs text-white/70">
          18+ | Jouer comporte des risques : endettement, dependance. Appelez le 09 74 75 13 13 (appel non surtaxe).
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-foreground">
          Meilleure cote sur {bk.name} — {bk.bonus}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{bk.bonusDetail}</p>
      </div>
      <a
        href={bk.url}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent"
      >
        Voir l&apos;offre
        <ExternalLink className="h-4 w-4" />
      </a>
      <p className="w-full text-xs text-gray-400 sm:hidden">
        18+ | Jouer comporte des risques : endettement, dependance.
      </p>
    </div>
  );
}
