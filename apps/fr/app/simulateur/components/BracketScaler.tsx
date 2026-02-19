"use client";

import { useRef, useState, useEffect } from "react";

export function BracketScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    function recalc() {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (!container || !inner) return;
      inner.style.transform = "none";
      const containerW = container.clientWidth;
      const innerW = inner.scrollWidth;
      const naturalH = inner.scrollHeight;
      if (innerW > containerW) {
        const s = Math.max(0.4, containerW / innerW);
        setScale(s);
        setInnerHeight(naturalH * s);
      } else {
        setScale(1);
        setInnerHeight(undefined);
      }
    }
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <div
        ref={innerRef}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          ...(innerHeight ? { height: `${innerHeight}px`, marginBottom: 0 } : {}),
        }}
      >
        {children}
      </div>
      {innerHeight && <div style={{ height: 0 }} />}
    </div>
  );
}
