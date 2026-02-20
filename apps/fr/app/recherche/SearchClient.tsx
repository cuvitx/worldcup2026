"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { SearchItem } from "@repo/data/search-index";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSearch({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconClose({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const TYPE_ICONS: Record<SearchItem["type"], React.ReactNode> = {
  team: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  match: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  player: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  ),
  stadium: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  city: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const TYPE_LABELS: Record<SearchItem["type"], string> = {
  team: "Équipes",
  player: "Joueurs",
  match: "Matchs",
  stadium: "Stades",
  city: "Villes",
};

const TYPE_COLORS: Record<SearchItem["type"], string> = {
  team: "text-primary dark:text-white bg-primary/10 dark:bg-primary/20",
  player: "text-field dark:text-field bg-field/10 dark:bg-field/20",
  match: "text-accent dark:text-secondary bg-accent/10 dark:bg-secondary/20",
  stadium: "text-accent dark:text-accent bg-accent//10 dark:bg-accent//10",
  city: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30",
};

// ─── Normalize + filter ───────────────────────────────────────────────────────

function normalize(str: string): string {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function matchesQuery(query: string, item: SearchItem): boolean {
  if (!query.trim()) return false;
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  const haystack = normalize(`${item.title} ${item.description}`);
  return tokens.every((t) => haystack.includes(t));
}

// ─── Type order ───────────────────────────────────────────────────────────────
const TYPE_ORDER: SearchItem["type"][] = ["team", "player", "match", "stadium", "city"];

// ─── Suggestion chips ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { label: "🇫🇷 France", query: "France" },
  { label: "🇧🇷 Brésil", query: "Brésil" },
  { label: "🇦🇷 Argentine", query: "Argentine" },
  { label: "MetLife", query: "MetLife" },
  { label: "🌆 New York", query: "New York" },
  { label: "Mbappe", query: "Mbappe" },
  { label: "Finale", query: "Finale" },
];

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  data: SearchItem[];
  initialQuery?: string;
}

export function SearchClient({ data, initialQuery = "" }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || searchParams.get("q") || "");
  const [activeType, setActiveType] = useState<SearchItem["type"] | "all">("all");
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Sync query to URL (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.replace(`/recherche?${params.toString()}`, { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  // Filter results
  const allResults = useMemo(() => {
    if (!query.trim()) return [];
    return data.filter((item) => matchesQuery(query, item));
  }, [query, data]);

  // Group by type
  const grouped = useMemo(() => {
    const groups: Partial<Record<SearchItem["type"], SearchItem[]>> = {};
    for (const item of allResults) {
      if (!groups[item.type]) groups[item.type] = [];
      groups[item.type]!.push(item);
    }
    return groups;
  }, [allResults]);

  // Filtered by active type
  const displayResults = useMemo(() => {
    if (activeType === "all") return grouped;
    if (grouped[activeType]) return { [activeType]: grouped[activeType]! };
    return {};
  }, [grouped, activeType]);

  const totalCount = allResults.length;
  const typeOrder = TYPE_ORDER.filter((t) => grouped[t]);

  const clearQuery = useCallback(() => {
    setQuery("");
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <IconSearch className="w-5 h-5 text-gray-500 dark:text-gray-300" />
        </div>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une équipe, un joueur, un stade..."
          className="
            w-full pl-12 pr-12 py-4 text-base
            bg-white dark:bg-slate-800
            border-2 border-gray-200 dark:border-gray-600
            rounded-2xl shadow-sm
            text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
            transition-all duration-200
          "
          autoComplete="off"
          spellCheck={false}
          aria-label="Rechercher"
          aria-controls="search-results"
        />
        {query && (
          <button
            onClick={clearQuery}
            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Effacer la recherche"
          >
            <IconClose />
          </button>
        )}
      </div>

      {/* Empty state / suggestions */}
      {!query && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Recherchez parmi{" "}
            <strong className="text-gray-700 dark:text-gray-200">48 équipes</strong>,{" "}
            <strong className="text-gray-700 dark:text-gray-200">966 joueurs</strong>,{" "}
            <strong className="text-gray-700 dark:text-gray-200">104 matchs</strong>,{" "}
            <strong className="text-gray-700 dark:text-gray-200">16 stades</strong>{" "}
            et bien plus.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.query}
                onClick={() => setQuery(s.query)}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {query && totalCount === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">😕</div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Aucun résultat pour{" "}
            <strong className="text-gray-900 dark:text-gray-100">« {query} »</strong>
          </p>
          <p className="text-gray-400 dark:text-gray-400 mt-2 text-sm">
            Essayez un autre terme ou vérifiez l&apos;orthographe
          </p>
        </div>
      )}

      {/* Results header + type filter tabs */}
      {query && totalCount > 0 && (
        <>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              <strong className="text-gray-900 dark:text-gray-100">{totalCount}</strong> résultat{totalCount > 1 ? "s" : ""} pour{" "}
              <strong className="text-gray-900 dark:text-gray-100">« {query} »</strong>
            </p>
          </div>

          {/* Type filter tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveType("all")}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeType === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Tout ({totalCount})
            </button>
            {typeOrder.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  activeType === type
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {TYPE_LABELS[type]} ({grouped[type]?.length ?? 0})
              </button>
            ))}
          </div>

          {/* Grouped results */}
          <div id="search-results" className="space-y-8" role="region" aria-label="Résultats de recherche">
            {TYPE_ORDER.filter((t) => displayResults[t]).map((type) => {
              const items = displayResults[type]!;
              return (
                <section key={type} aria-labelledby={`group-${type}`}>
                  {/* Group header */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`p-1.5 rounded-lg ${TYPE_COLORS[type]}`}>
                      {TYPE_ICONS[type]}
                    </span>
                    <h2 id={`group-${type}`} className="font-bold text-gray-900 dark:text-gray-100">
                      {TYPE_LABELS[type]}
                    </h2>
                    <span className="text-xs text-gray-400 dark:text-gray-400 ml-1">
                      {items.length} résultat{items.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Items grid */}
                  <div className="grid gap-2 sm:grid-cols-2">
                    {items.slice(0, activeType === "all" ? 6 : 50).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="
                          flex items-center gap-3 p-3 rounded-xl
                          bg-white dark:bg-slate-800
                          border border-gray-200 dark:border-gray-700
                          hover:border-primary/40 hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-700/50
                          transition-all duration-150 group
                        "
                      >
                        <span className={`p-2 rounded-lg shrink-0 ${TYPE_COLORS[type]}`}>
                          {TYPE_ICONS[type]}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate group-hover:text-primary dark:group-hover:text-primary transition-colors">
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-300 truncate mt-0.5">
                            {item.description}
                          </div>
                        </div>
                        <svg className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0 group-hover:text-primary dark:group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    ))}
                  </div>

                  {/* Show more */}
                  {activeType === "all" && items.length > 6 && (
                    <button
                      onClick={() => setActiveType(type)}
                      className="mt-2 text-sm text-primary dark:text-secondary hover:underline font-medium"
                    >
                      Voir les {items.length - 6} autres {TYPE_LABELS[type].toLowerCase()} →
                    </button>
                  )}
                </section>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
