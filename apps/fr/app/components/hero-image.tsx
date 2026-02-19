"use client";

import Image from "next/image";
import { useState } from "react";

interface HeroImageProps {
  src: string;
  alt: string;
  overlayContent?: React.ReactNode;
  fallbackEmoji?: string;
}

export function HeroImage({ src, alt, overlayContent, fallbackEmoji = "🏙️" }: HeroImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-xl mb-8 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        <span className="text-7xl opacity-30">{fallbackEmoji}</span>
        {overlayContent && (
          <div className="absolute bottom-4 left-6 text-white">{overlayContent}</div>
        )}
      </div>
    );
  }

  return (
    <div className="relative h-64 sm:h-96 w-full overflow-hidden rounded-xl mb-8">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        priority
        sizes="(max-width: 1280px) 100vw, 1280px"
        onError={() => setHasError(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {overlayContent && (
        <div className="absolute bottom-4 left-6 text-white">{overlayContent}</div>
      )}
    </div>
  );
}
