"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { buildSearchIndex } from "@repo/data/search-index";

const SearchDialog = dynamic(
  () => import("@repo/ui/search-dialog").then((m) => ({ default: m.SearchDialog })),
  {
    loading: () => (
      <div className="w-9 h-9 rounded-lg animate-pulse bg-white/10" aria-label="Chargement de la recherche" />
    ),
    ssr: false,
  }
);

import { type MenuKey } from "./NavLinks";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchData = useMemo(() => buildSearchIndex("fr"), []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  return (
    <header className="hero-animated sticky top-0 z-50 backdrop-blur-[12px] text-white border-b border-white/10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none rounded"
        >
          <img src="/images/logo-navbar.png?v=2" srcSet="/images/logo-navbar.png?v=2 2x, /images/logo-navbar@3x.png?v=2 3x" alt="CDM 2026" width={130} height={80} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <DesktopNav activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuRef={menuRef} />

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <SearchDialog lang="fr" data={searchData} onNavigate={(href) => router.push(href)} />

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-1 rounded-lg text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <line x1="5" y1="5" x2="17" y2="17" />
                  <line x1="5" y1="17" x2="17" y2="5" />
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="15" x2="19" y2="15" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  );
}
