"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ============================================================================
// Types
// ============================================================================

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  type: "team" | "match" | "player" | "stadium" | "city";
}

interface SearchDialogProps {
  lang: "fr" | "en" | "es";
  data: SearchItem[];
  onNavigate: (href: string) => void;
}

// ============================================================================
// Translations
// ============================================================================

const translations = {
  fr: {
    placeholder: "Rechercher une equipe, un match, un joueur...",
    noResults: "Aucun resultat",
    close: "Fermer",
    searchLabel: "Rechercher",
    typeLabels: {
      team: "Equipes",
      match: "Matchs",
      player: "Joueurs",
      stadium: "Stades",
      city: "Villes",
    } as Record<string, string>,
  },
  en: {
    placeholder: "Search for a team, match, player...",
    noResults: "No results found",
    close: "Close",
    searchLabel: "Search",
    typeLabels: {
      team: "Teams",
      match: "Matches",
      player: "Players",
      stadium: "Stadiums",
      city: "Cities",
    } as Record<string, string>,
  },
  es: {
    placeholder: "Buscar un equipo, partido, jugador...",
    noResults: "Sin resultados",
    close: "Cerrar",
    searchLabel: "Buscar",
    typeLabels: {
      team: "Equipos",
      match: "Partidos",
      player: "Jugadores",
      stadium: "Estadios",
      city: "Ciudades",
    } as Record<string, string>,
  },
};

// ============================================================================
// Fuzzy-ish matching: normalize accents + lowercase + check all query tokens
// ============================================================================

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(query: string, item: SearchItem): boolean {
  if (!query) return false;
  const normalizedQuery = normalize(query);
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const haystack = normalize(`${item.title} ${item.description}`);
  return tokens.every((token) => haystack.includes(token));
}

// ============================================================================
// Type icons (SVG inline)
// ============================================================================

function TypeIcon({ type }: { type: SearchItem["type"] }) {
  const className = "w-4 h-4 shrink-0 text-gray-400";
  switch (type) {
    case "team":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "match":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case "player":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case "stadium":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    case "city":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
}

// ============================================================================
// Search Dialog Component
// ============================================================================

export function SearchDialog({ lang, data, onNavigate }: SearchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  // Ctrl/Cmd+K to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      // Small delay so the dialog is rendered before focusing
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  // Filter and group results
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return data.filter((item) => matchesQuery(query, item)).slice(0, 8);
  }, [query, data]);

  // Group results by type
  const grouped = useMemo(() => {
    const groups: Record<string, SearchItem[]> = {};
    for (const item of results) {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type]!.push(item);
    }
    return groups;
  }, [results]);

  // Flat list for keyboard navigation
  const flatResults = results;

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      close();
      onNavigate(href);
    },
    [close, onNavigate]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % Math.max(flatResults.length, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + flatResults.length) % Math.max(flatResults.length, 1));
          break;
        case "Enter":
          e.preventDefault();
          if (flatResults[activeIndex]) {
            navigateTo(flatResults[activeIndex].href);
          }
          break;
        case "Escape":
          e.preventDefault();
          close();
          break;
      }
    },
    [flatResults, activeIndex, navigateTo, close]
  );

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // Track the global flat index across grouped rendering
  let globalIndex = 0;

  return (
    <>
      {/* Search trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
        aria-label={t.searchLabel}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-mono">
          <span className="text-[11px]">{typeof navigator !== "undefined" && /Mac|iPhone/.test(navigator.userAgent) ? "\u2318" : "Ctrl"}</span>K
        </kbd>
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

          {/* Dialog */}
          <div
            className="relative w-full max-w-lg rounded-lg bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t.searchLabel}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
              <svg
                className="w-5 h-5 text-gray-400 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder}
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={close}
                className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Esc
              </button>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {query.trim() && flatResults.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-gray-500">
                  {t.noResults}
                </div>
              )}

              {Object.entries(grouped).map(([type, items]) => (
                <div key={type}>
                  <div className="sticky top-0 bg-gray-50/90 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {t.typeLabels[type] ?? type}
                  </div>
                  {items.map((item) => {
                    const idx = globalIndex++;
                    return (
                      <button
                        key={item.href}
                        data-index={idx}
                        onClick={() => navigateTo(item.href)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          idx === activeIndex
                            ? "bg-blue-50 text-blue-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <TypeIcon type={item.type} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{item.title}</div>
                          <div className="truncate text-xs text-gray-500">{item.description}</div>
                        </div>
                        {idx === activeIndex && (
                          <svg
                            className="w-4 h-4 text-gray-400 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer hint */}
            {flatResults.length > 0 && (
              <div className="flex items-center gap-4 border-t border-gray-200 px-4 py-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 font-mono text-[10px]">&uarr;</kbd>
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 font-mono text-[10px]">&darr;</kbd>
                  {lang === "fr" ? "naviguer" : lang === "es" ? "navegar" : "navigate"}
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 font-mono text-[10px]">&crarr;</kbd>
                  {lang === "fr" ? "ouvrir" : lang === "es" ? "abrir" : "open"}
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-gray-200 bg-gray-50 px-1 py-0.5 font-mono text-[10px]">Esc</kbd>
                  {lang === "fr" ? "fermer" : lang === "es" ? "cerrar" : "close"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
