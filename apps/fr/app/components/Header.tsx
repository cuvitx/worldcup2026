"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SearchDialog } from "@repo/ui/search-dialog";
import { ThemeToggle } from "@repo/ui/theme-toggle";
import { buildSearchIndex } from "@repo/data/search-index";

const CURRENT_LANG = "fr" as const;

const domains = {
  fr: "https://cdm2026.fr",
  en: "https://worldcup2026guide.com",
  es: "https://mundial2026.es",
};

const routePrefixes: Record<string, Record<string, string>> = {
  fr: {
    team: "équipe", teams: "équipes", match: "match", matchSchedule: "match/calendrier",
    prediction: "pronostic", predictionMatch: "pronostic-match", group: "groupe",
    player: "joueur", players: "joueurs", scorer: "buteur", scorers: "buteurs",
    stadium: "stade", stadiums: "stades", city: "ville", cities: "villes",
    h2h: "h2h", bookmaker: "bookmaker", guide: "guide", guides: "guides",
    betting: "paris-sportifs", about: "a-propos", legal: "mentions-legales",
    responsibleGambling: "jeu-responsable",
  },
  en: {
    team: "team", teams: "teams", match: "match", matchSchedule: "match/schedule",
    prediction: "prediction", predictionMatch: "prediction-match", group: "group",
    player: "player", players: "players", scorer: "scorer", scorers: "scorers",
    stadium: "stadium", stadiums: "stadiums", city: "city", cities: "cities",
    h2h: "h2h", bookmaker: "bookmaker", guide: "guide", guides: "guides",
    betting: "betting", about: "about", legal: "legal",
    responsibleGambling: "responsible-gambling",
  },
  es: {
    team: "equipo", teams: "equipos", match: "match", matchSchedule: "match/calendario",
    prediction: "pronostico", predictionMatch: "pronostico-partido", group: "grupo",
    player: "jugador", players: "jugadores", scorer: "goleador", scorers: "goleadores",
    stadium: "estadio", stadiums: "estadios", city: "ciudad", cities: "ciudades",
    h2h: "h2h", bookmaker: "casa-apuestas", guide: "guia", guides: "guias",
    betting: "apuestas", about: "acerca-de", legal: "aviso-legal",
    responsibleGambling: "juego-responsable",
  },
};

const langOptions = [
  { lang: "fr" as const, flag: "\u{1F1EB}\u{1F1F7}", label: "Fran\u00E7ais" },
  { lang: "en" as const, flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
  { lang: "es" as const, flag: "\u{1F1EA}\u{1F1F8}", label: "Espa\u00F1ol" },
];

function convertPath(pathname: string, fromLang: string, toLang: string): string {
  if (pathname === "/") return "/";
  const segments = pathname.replace(/^\//, "").split("/");
  // Try matching longest prefix first (e.g. match/calendrier before match)
  const fromPrefixes = routePrefixes[fromLang];
  const toPrefixes = routePrefixes[toLang];
  if (!fromPrefixes || !toPrefixes) return "/";

  // Sort route keys by prefix length descending so longer prefixes match first
  const sortedKeys = Object.keys(fromPrefixes).sort(
    (a, b) => (fromPrefixes[b] ?? "").split("/").length - (fromPrefixes[a] ?? "").split("/").length
  );

  for (const key of sortedKeys) {
    const fromPrefix = fromPrefixes[key];
    if (!fromPrefix) continue;
    const fromParts = fromPrefix.split("/");
    const pathStart = segments.slice(0, fromParts.length).join("/");
    if (pathStart === fromPrefix) {
      const slug = segments.slice(fromParts.length).join("/");
      const toPrefix = toPrefixes[key];
      return slug ? `/${toPrefix}/${slug}` : `/${toPrefix}`;
    }
  }
  // Fallback: return homepage
  return "/";
}

function getUrlForLang(pathname: string, targetLang: string): string {
  const convertedPath = convertPath(pathname, CURRENT_LANG, targetLang);
  return `${domains[targetLang as keyof typeof domains]}${convertedPath}`;
}

const navLinks = [
  { href: "/equipes", label: "Équipes" },
  { href: "/groupe/a", label: "Groupes" },
  { href: "/match/calendrier", label: "Calendrier" },
  { href: "/pronostic/france", label: "Pronostics" },
  { href: "/stades", label: "Stades" },
  { href: "/joueurs", label: "Joueurs" },
  { href: "/buteurs", label: "Buteurs" },
  { href: "/paris-sportifs", label: "Paris sportifs" },
  { href: "/actualites", label: "Actualités" },
  { href: "/live", label: "Live" },
  { href: "/simulateur", label: "Simulateur" },
  { href: "/comparateur-joueurs", label: "Comparateur" },
  { href: "/profil", label: "Mon profil 🏅" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchData = useMemo(() => buildSearchIndex("fr"), []);

  const currentOption = langOptions.find((o) => o.lang === CURRENT_LANG)!;
  const otherOptions = langOptions.filter((o) => o.lang !== CURRENT_LANG);

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-primary/90 backdrop-blur-md text-white border-b border-white/5">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none rounded">
          <span className="text-gold">⚽ CDM</span> 2026
        </Link>

        {/* Desktop nav */}
        <ul className="hidden gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative py-1 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none rounded hover:text-gold after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-gold after:transition-all after:duration-300 ${pathname.startsWith(link.href) ? "text-gold after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Profile link */}
          <Link href="/profil" className="hidden sm:flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-white/10 transition-colors">
            Mon profil 🏅
          </Link>

          {/* Search command palette */}
          <SearchDialog lang="fr" data={searchData} onNavigate={(href) => router.push(href)} />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Changer de langue"
              aria-expanded={langOpen}
            >
              <span>{currentOption.flag}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 5l3 3 3-3" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[140px] rounded-lg bg-white text-gray-900 shadow-lg ring-1 ring-black/5 z-50">
                {otherOptions.map((opt) => (
                  <a
                    key={opt.lang}
                    href={getUrlForLang(pathname, opt.lang)}
                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
                    hrefLang={opt.lang}
                  >
                    <span>{opt.flag}</span>
                    <span>{opt.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden p-2 -mr-2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none rounded"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-white/10 animate-[slideDown_200ms_ease-out]">
          <ul className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none ${pathname.startsWith(link.href) ? "bg-white/15 text-gold" : "hover:bg-white/10"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
