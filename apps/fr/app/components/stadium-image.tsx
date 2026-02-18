"use client";

import { useState } from "react";

export function StadiumImage({
  slug,
  name,
  city,
  className = "",
}: {
  slug: string;
  name: string;
  city: string;
  className?: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/stadiums/${slug}.jpg`}
      alt={`Stade ${name}, ${city}`}
      loading="lazy"
      className={className}
      onError={() => setHidden(true)}
    />
  );
}
