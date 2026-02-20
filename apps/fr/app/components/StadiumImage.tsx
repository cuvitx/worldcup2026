"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Affiche l'image d'un stade via next/image (avif/webp + lazy loading).
 * - containerClassName : classes appliquées au wrapper (dimensions, overflow…)
 * - className : classes appliquées à l'image elle-même (transitions, etc.)
 */
export function StadiumImage({
  slug,
  name,
  city,
  className = "",
  containerClassName = "w-full h-44",
}: {
  slug: string;
  name: string;
  city: string;
  className?: string;
  containerClassName?: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <Image
        src={`/images/stadiums/${slug}.jpg`}
        alt={`Stade ${name}, ${city}`}
        fill
        loading="lazy"
        className={`object-cover ${className}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        onError={() => setHidden(true)}
      />
    </div>
  );
}
