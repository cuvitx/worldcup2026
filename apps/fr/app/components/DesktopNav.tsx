"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { megaMenus, type MenuKey } from "./NavLinks";

interface DesktopNavProps {
  activeMenu: MenuKey | null;
  setActiveMenu: (key: MenuKey | null) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

export function DesktopNav({ activeMenu, setActiveMenu, menuRef }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <div ref={menuRef} className="hidden md:flex items-center gap-1">
      {(Object.entries(megaMenus) as [MenuKey, (typeof megaMenus)[MenuKey]][]).map(([key, menu]) => (
        <div
          key={key}
          className="relative"
          onMouseEnter={() => setActiveMenu(key)}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <button
            onClick={() => setActiveMenu(activeMenu === key ? null : key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
              activeMenu === key ? "bg-white/10 text-white" : "text-white/80"
            }`}
            aria-expanded={activeMenu === key}
            aria-label={`${menu.label} — menu principal`}
          >
            <span>{menu.icon}</span>
            <span>{menu.label}</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className={`transition-transform duration-200 ${activeMenu === key ? "rotate-180" : ""}`}
            >
              <path d="M2 4l3 3 3-3" />
            </svg>
          </button>

          {activeMenu === key && (
            <div className="mega-menu">
              <div className="p-4">
                <div className={`grid gap-4 ${menu.sections.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {menu.sections.map((section) => (
                    <div key={section.title}>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 px-2">
                        {section.title}
                      </p>
                      <ul className="space-y-0.5">
                        {section.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-700 dark:text-text hover:bg-gray-100 dark:hover:bg-white/8 hover:text-secondary transition-colors"
                              onClick={() => setActiveMenu(null)}
                            >
                              <span>{link.label}</span>
                              {"sub" in link && link.sub && (
                                <span className="text-[10px] text-gray-500 ml-2 shrink-0">
                                  {link.sub}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <Link
        href="/match/calendrier"
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
          pathname.startsWith("/match") ? "text-accent" : "text-white/80"
        }`}
      >
        Calendrier
      </Link>
      <Link
        href="/live"
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 flex items-center gap-1 ${
          pathname === "/live" ? "text-accent" : "text-white/80"
        }`}
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        Live
      </Link>
    </div>
  );
}
