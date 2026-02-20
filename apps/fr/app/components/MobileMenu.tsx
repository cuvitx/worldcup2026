"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { megaMenus, type MenuKey } from "./NavLinks";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<MenuKey | null>(null);
  const pathname = usePathname();

  return (
    <div className="md:hidden border-t border-white/10 animate-[slideDown_200ms_ease-out] bg-deep">
      <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
        {(Object.entries(megaMenus) as [MenuKey, (typeof megaMenus)[MenuKey]][]).map(([key, menu]) => (
          <div key={key}>
            <button
              onClick={() => setExpanded(expanded === key ? null : key)}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              aria-expanded={expanded === key}
              aria-label={`${menu.label} — sous-menu`}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden="true">{menu.icon}</span>
                <span>{menu.label}</span>
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`transition-transform duration-200 ${expanded === key ? "rotate-180" : ""}`}
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </button>
            {expanded === key && (
              <div className="pl-4 pb-2 animate-fadeIn">
                {menu.sections.map((section) => (
                  <div key={section.title} className="mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-3 py-1">
                      {section.title}
                    </p>
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        <Link
          href="/match/calendrier"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          Calendrier des matchs
        </Link>
        <Link
          href="/live"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          Scores en direct
        </Link>
        <Link
          href="/profil"
          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          Mon profil
        </Link>
        <Link
          href="/recherche"
          className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors ${
            pathname === "/recherche" ? "text-accent" : "text-white"
          }`}
          onClick={onClose}
        >
          Recherche
        </Link>
      </div>
    </div>
  );
}
