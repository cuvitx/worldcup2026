"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@repo/ui/theme-toggle";
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

import { CURRENT_LANG, langOptions, getUrlForLang, type MenuKey } from "./NavLinks";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchData = useMemo(() => buildSearchIndex("fr"), []);

  const currentOption = langOptions.find((o) => o.lang === CURRENT_LANG)!;
  const otherOptions = langOptions.filter((o) => o.lang !== CURRENT_LANG);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
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
    setLangOpen(false);
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
          <img src="/images/logo-navbar.png" srcSet="/images/logo-navbar.png 2x, /images/logo-navbar@3x.png 3x" alt="CDM 2026" width={130} height={80} className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <DesktopNav activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuRef={menuRef} />

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/recherche"
            aria-label="Page de recherche"
            className={`hidden md:flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none ${
              pathname === "/recherche" ? "text-accent" : "text-white/80"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>

          <SearchDialog lang="fr" data={searchData} onNavigate={(href) => router.push(href)} />
          <ThemeToggle />

          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-white/80 hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Changer de langue"
              aria-expanded={langOpen}
            >
              <span>{currentOption.flag}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[150px] rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-xl ring-1 ring-black/8 z-50 overflow-hidden animate-scaleIn">
                {otherOptions.map((opt) => (
                  <a
                    key={opt.lang}
                    href={getUrlForLang(pathname, opt.lang)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 dark:bg-slate-700 transition-colors"
                    hrefLang={opt.lang}
                  >
                    <span>{opt.flag}</span>
                    <span className="font-medium">{opt.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

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
