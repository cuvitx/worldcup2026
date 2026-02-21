"use client";

import { useEffect, useState, useCallback } from "react";

export interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0]!.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table des matières"
      className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
        Sommaire
      </p>
      <ul className="space-y-0.5 border-l-2 border-gray-200">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const indent = item.level >= 3 ? "pl-6" : "pl-3";
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`block w-full text-left text-sm py-1 ${indent} transition-colors border-l-2 -ml-[2px] ${
                  isActive
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
