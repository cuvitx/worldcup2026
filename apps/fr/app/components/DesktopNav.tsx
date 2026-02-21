"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Radio } from "lucide-react";
import { megaMenus, type MenuKey, type MenuLink } from "./NavLinks";

interface DesktopNavProps {
  activeMenu: MenuKey | null;
  setActiveMenu: (key: MenuKey | null) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}

function LinkIcon({ link }: { link: MenuLink }) {
  if (link.flagEmoji) {
    return <span className="shrink-0">{link.flagEmoji}</span>;
  }
  if (link.icon) {
    const Icon = link.icon;
    return <Icon className="h-4 w-4 text-gray-400 shrink-0" />;
  }
  return null;
}

export function DesktopNav({ activeMenu, setActiveMenu, menuRef }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <div ref={menuRef} className="hidden md:flex items-center gap-1">
      {(Object.entries(megaMenus) as [MenuKey, (typeof megaMenus)[MenuKey]][]).map(([key, menu]) => {
        const MenuIcon = menu.icon;
        return (
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
              <MenuIcon className="h-4 w-4" />
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
                        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2 px-2">
                          {section.title}
                        </p>
                        <ul className="space-y-0.5">
                          {section.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                                onClick={() => setActiveMenu(null)}
                              >
                                <LinkIcon link={link} />
                                <span className="flex-1">{link.label}</span>
                                {link.sub && (
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
        );
      })}

      <Link
        href="/match/calendrier"
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
          pathname.startsWith("/match") ? "text-accent" : "text-white/80"
        }`}
      >
        <Calendar className="h-4 w-4" />
        Calendrier
      </Link>
      <Link
        href="/live"
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 flex items-center gap-1.5 ${
          pathname === "/live" ? "text-accent" : "text-white/80"
        }`}
      >
        <span className="relative flex items-center">
          <span className="absolute inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse -left-2.5" />
          <Radio className="h-4 w-4" />
        </span>
        Live
      </Link>
    </div>
  );
}
