"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Accueil", emoji: "🏠" },
  { href: "/match/calendrier", label: "Matchs", emoji: "⚽" },
  { href: "/pronostic-vainqueur", label: "Pronostics", emoji: "📊" },
  { href: "/equipes", label: "Équipes", emoji: "🏆" },
  { href: "/recherche", label: "Recherche", emoji: "🔍" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      aria-label="Navigation principale mobile"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/95 border-t border-gray-200 dark:border-slate-700 safe-area-inset-bottom"
    >
      <ul className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ href, label, emoji }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex flex-col items-center justify-center h-full gap-0.5 px-1 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset",
                  "active:scale-95",
                  active
                    ? "text-accent dark:text-accent"
                    : "text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100",
                ].join(" ")}
              >
                {/* Indicator pill on active */}
                <span
                  className={[
                    "flex items-center justify-center w-10 h-6 rounded-full text-lg leading-none transition-all duration-200",
                    active
                      ? "bg-accent/10 dark:bg-accent/20 scale-110"
                      : "scale-100",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {emoji}
                </span>
                <span
                  className={[
                    "text-[10px] leading-none font-medium tracking-wide transition-all duration-200",
                    active ? "font-semibold" : "",
                  ].join(" ")}
                >
                  {label}
                </span>
                {/* Active dot */}
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-accent rounded-full" aria-hidden="true" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
