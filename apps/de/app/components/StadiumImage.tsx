"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Zeigt das Bild eines Stadions via next/image an (avif/webp + Lazy Loading).
 * - containerClassName: Klassen für den Wrapper (Abmessungen, Overflow...)
 * - className: Klassen für das Bild selbst (Übergänge usw.)
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
        alt={`Stadion ${name}, ${city}`}
        fill
        loading="lazy"
        className={`object-cover ${className}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        onError={() => setHidden(true)}
      />
    </div>
  );
}
