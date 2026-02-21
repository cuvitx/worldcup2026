"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Stadium } from "@repo/data/types";

const COUNTRY_FLAG: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  Mexico: "🇲🇽",
};

interface StadiumCarouselProps {
  stadiums: Stadium[];
}

export function StadiumCarousel({ stadiums }: StadiumCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <div className="relative group/carousel">
      {/* Scroll buttons */}
      <button
        type="button"
        onClick={() => scroll("left")}
        aria-label="Défiler à gauche"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -translate-x-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-gray-200 shadow-xl text-gray-700 hover:bg-white backdrop-blur-sm text-xl font-bold"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => scroll("right")}
        aria-label="Défiler à droite"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 translate-x-1 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 border border-gray-200 shadow-xl text-gray-700 hover:bg-white backdrop-blur-sm text-xl font-bold"
      >
        ›
      </button>

      {/* Left/right fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent z-[5] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-[5] pointer-events-none" />

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 px-1 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {stadiums.map((stadium) => (
          <Link
            key={stadium.id}
            href={`/stade/${stadium.slug}`}
            className="group/card flex-none w-56 snap-start rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            {/* Image container */}
            <div className="relative h-36 bg-gradient-to-br from-blue-900/80 to-gray-900 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/stadiums/${stadium.slug}.jpg`}
                alt={`${stadium.name}, ${stadium.city}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Country flag badge */}
              <span className="absolute top-2 right-2 text-xl z-10 drop-shadow-md">
                {COUNTRY_FLAG[stadium.country] ?? ""}
              </span>
              {/* Capacity badge */}
              <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-black/50 text-white px-2 py-0.5 rounded-full backdrop-blur-sm z-10">
                {(stadium.capacity / 1000).toFixed(0)}K places
              </span>
            </div>

            {/* Card info */}
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-900 text-xs leading-snug mb-1 line-clamp-1 group-hover/card:text-primary transition-colors">
                {stadium.name}
              </h3>
              <p className="text-[10px] text-gray-500 truncate">
                {stadium.city}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
