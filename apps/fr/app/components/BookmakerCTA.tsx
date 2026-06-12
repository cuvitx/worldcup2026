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
  return (top.length > 0 ? top : bookmakers)[0]!;
}

function ANJLine() {
  return (
    <p className="text-[10px] text-gray-400 text-center mt-2">
      18+ | Les paris sportifs sont interdits aux mineurs. Jouer comporte des risques.{" "}
      <a href="tel:0974751313" className="underline">09 74 75 13 13</a>{" "}
      | <a href="https://www.anj.fr" target="_blank" rel="noopener noreferrer" className="underline">ANJ.fr</a>
    </p>
  );
}

export function BookmakerCTA({ variant = "inline", bookmaker }: BookmakerCTAProps) {
  const bk = useMemo(() => pickBookmaker(bookmaker), [bookmaker]);

  if (variant === "banner") {
    return (
      <div>
        <a
          href={bk.url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="group block rounded-2xl bg-gradient-to-r from-primary to-accent p-5 sm:p-6 text-white transition-shadow hover:shadow-lg"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-lg font-bold sm:text-xl">
                {bk.bonus} {bk.bonusDetail}
              </p>
              <p className="mt-0.5 text-sm text-white/70">
                sur {bk.name}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-bold text-primary transition-transform group-hover:scale-105 self-start sm:self-center">
              Profiter de l&apos;offre
              <ExternalLink className="h-4 w-4" />
            </span>
          </div>
        </a>
        <ANJLine />
      </div>
    );
  }

  return (
    <div>
      <a
        href={bk.url}
        target="_blank"
        rel="noopener noreferrer sponsored nofollow"
        className="group flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:border-primary/30"
      >
        <div>
          <p className="font-medium text-foreground">
            {bk.bonus} {bk.bonusDetail}
          </p>
          <p className="text-sm text-gray-500">{bk.name}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-accent self-start sm:self-center">
          Voir l&apos;offre
          <ExternalLink className="h-4 w-4" />
        </span>
      </a>
      <ANJLine />
    </div>
  );
}
