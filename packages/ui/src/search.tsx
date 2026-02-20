"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { teams } from "@repo/data/teams";
import { players } from "@repo/data/players";
import { stadiums } from "@repo/data/stadiums";
import { cities } from "@repo/data/cities";
import { routePrefixes } from "@repo/data/route-mapping";
import type { Lang } from "@repo/data/route-mapping";

type SearchResultType = "team" | "player" | "stadium" | "city";

interface SearchResult {
  name: string;
  slug: string;
  type: SearchResultType;
  extra?: string; // e.g. team flag, player team, stadium city
  href: string;
}

const MAX_RESULTS = 8;

const typeLabels: Record<Lang, Record<SearchResultType, string>> = {
  fr: { team: "Equipe", player: "Joueur", stadium: "Stade", city: "Ville" },
  en: { team: "Team", player: "Player", stadium: "Stadium", city: "City" },
  es: { team: "Equipo", player: "Jugador", stadium: "Estadio", city: "Ciudad" },
};

const placeholders: Record<Lang, string> = {
  fr: "Rechercher...",
  en: "Search...",
  es: "Buscar...",
};

/**
 * Normalize a string for fuzzy matching: lowercase, remove accents/diacritics.
 */
function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Simple fuzzy match: checks if all characters of the query appear in order
 * within the target string (after normalization). Falls back to includes() first.
 */
function fuzzyMatch(query: string, target: string): boolean {
  const nq = normalize(query);
  const nt = normalize(target);

  // Exact substring match first
  if (nt.includes(nq)) return true;

  // Simple sequential character match
  let qi = 0;
  for (let ti = 0; ti < nt.length && qi < nq.length; ti++) {
    if (nt[ti] === nq[qi]) qi++;
  }
  return qi === nq.length;
}

/**
 * Score a match (lower is better). Substring matches rank higher than fuzzy-only.
 */
function matchScore(query: string, target: string): number {
  const nq = normalize(query);
  const nt = normalize(target);

  if (nt === nq) return 0; // exact
  if (nt.startsWith(nq)) return 1; // starts with
  if (nt.includes(nq)) return 2; // substring
  return 3; // fuzzy
}

function buildHref(lang: Lang, type: SearchResultType, slug: string): string {
  const prefixes = routePrefixes[lang];
  const prefix = prefixes[type];
  return `/${prefix}/${slug}`;
}

// Pre-compute team lookup for player extra info
const teamsById: Record<string, { name: string; flag: string }> = {};
for (const t of teams) {
  teamsById[t.id] = { name: t.name, flag: t.flag };
}

/**
 * Props for the Search component.
 * 
 * @param lang - UI language: "fr" | "en" | "es"
 */
export interface SearchProps {
  lang: Lang;
}

/**
 * Search component — Global search with fuzzy matching for teams, players, stadiums, and cities.
 * 
 * Features:
 * - Fuzzy matching with accent normalization
 * - Keyboard navigation (arrow keys, Enter, Escape)
 * - Results ranked by match quality
 * - Type-specific icons and badges
 * - Responsive dropdown
 * 
 * @example
 * ```tsx
 * <Search lang="fr" />
 * ```
 */
export function Search({ lang }: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim();
    if (q.length < 2) return [];

    const all: (SearchResult & { score: number })[] = [];

    // Search teams (exclude TBD/Barrage teams)
    for (const t of teams) {
      if (t.code === "TBD") continue;
      if (fuzzyMatch(q, t.name) || fuzzyMatch(q, t.code)) {
        all.push({
          name: t.name,
          slug: t.slug,
          type: "team",
          extra: t.flag,
          href: buildHref(lang, "team", t.slug),
          score: matchScore(q, t.name),
        });
      }
    }

    // Search players
    for (const p of players) {
      if (fuzzyMatch(q, p.name)) {
        const team = teamsById[p.teamId];
        all.push({
          name: p.name,
          slug: p.slug,
          type: "player",
          extra: team ? `${team.flag} ${team.name}` : undefined,
          href: buildHref(lang, "player", p.slug),
          score: matchScore(q, p.name),
        });
      }
    }

    // Search stadiums
    for (const s of stadiums) {
      if (fuzzyMatch(q, s.name) || fuzzyMatch(q, s.city)) {
        all.push({
          name: s.name,
          slug: s.slug,
          type: "stadium",
          extra: s.city,
          href: buildHref(lang, "stadium", s.slug),
          score: matchScore(q, s.name),
        });
      }
    }

    // Search cities
    for (const c of cities) {
      if (fuzzyMatch(q, c.name)) {
        all.push({
          name: c.name,
          slug: c.slug,
          type: "city",
          extra: c.country,
          href: buildHref(lang, "city", c.slug),
          score: matchScore(q, c.name),
        });
      }
    }

    // Sort by score (best match first), then alphabetically
    all.sort((a, b) => a.score - b.score || a.name.localeCompare(b.name));

    return all.slice(0, MAX_RESULTS);
  }, [query, lang]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(-1);
  }, [results]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < results.length) {
            const result = results[activeIndex];
            if (result) {
              window.location.href = result.href;
            }
          }
          break;
        case "Escape":
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, results, activeIndex]
  );

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll("li");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const typeIcons: Record<SearchResultType, React.ReactNode> = {
    team: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    player: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    stadium: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    city: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {/* Magnifying glass icon */}
        <svg
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-white/60"
          width="16"
          height="16"
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
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.trim().length >= 2);
          }}
          onFocus={() => {
            if (query.trim().length >= 2) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[lang]}
          className="w-full rounded-lg bg-white/10 py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 outline-none focus:bg-white/20 focus:ring-2 focus:ring-accent transition-colors"
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-controls="search-results"
        />
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <ul
          id="search-results"
          ref={listRef}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[380px] overflow-y-auto rounded-lg bg-white text-gray-900 shadow-xl ring-1 ring-black/10"
        >
          {results.map((result, idx) => (
            <li
              key={`${result.type}-${result.slug}`}
              role="option"
              aria-selected={idx === activeIndex}
            >
              <a
                href={result.href}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-gray-100 ${
                  idx === activeIndex ? "bg-gray-100" : ""
                } ${idx === 0 ? "rounded-t-lg" : ""} ${
                  idx === results.length - 1 ? "rounded-b-lg" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {/* Icon */}
                <span className="flex-shrink-0 text-gray-400">
                  {typeIcons[result.type]}
                </span>

                {/* Name & extra */}
                <span className="flex-1 min-w-0">
                  <span className="block truncate font-medium">
                    {result.extra && result.type === "team" && (
                      <span className="mr-1.5">{result.extra}</span>
                    )}
                    {result.name}
                  </span>
                  {result.extra && result.type !== "team" && (
                    <span className="block truncate text-xs text-gray-500">
                      {result.extra}
                    </span>
                  )}
                </span>

                {/* Type badge */}
                <span className="flex-shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                  {typeLabels[lang][result.type]}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* No results message */}
      {isOpen && query.trim().length >= 2 && results.length === 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg bg-white p-4 text-center text-sm text-gray-500 shadow-xl ring-1 ring-black/10">
          {lang === "fr"
            ? "Aucun resultat"
            : lang === "es"
              ? "Sin resultados"
              : "No results"}
        </div>
      )}
    </div>
  );
}
