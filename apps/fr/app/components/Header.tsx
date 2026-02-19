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
  { lang: "fr" as const, flag: "🇫🇷", label: "Français" },
  { lang: "en" as const, flag: "🇬🇧", label: "English" },
  { lang: "es" as const, flag: "🇪🇸", label: "Español" },
];

function convertPath(pathname: string, fromLang: string, toLang: string): string {
  if (pathname === "/") return "/";
  const segments = pathname.replace(/^\//, "").split("/");
  const fromPrefixes = routePrefixes[fromLang];
  const toPrefixes = routePrefixes[toLang];
  if (!fromPrefixes || !toPrefixes) return "/";
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
  return "/";
}

function getUrlForLang(pathname: string, targetLang: string): string {
  const convertedPath = convertPath(pathname, CURRENT_LANG, targetLang);
  return `${domains[targetLang as keyof typeof domains]}${convertedPath}`;
}

// Mega menu definitions
const megaMenus = {
  equipes: {
    label: "Équipes & Groupes",
    icon: "🌍",
    sections: [
      {
        title: "Favoris",
        links: [
          { href: "/equipe/france", label: "🇫🇷 France", sub: "#2 FIFA" },
          { href: "/equipe/argentine", label: "🇦🇷 Argentine", sub: "#1 FIFA" },
          { href: "/equipe/espagne", label: "🇪🇸 Espagne", sub: "#3 FIFA" },
          { href: "/equipe/angleterre", label: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", sub: "#4 FIFA" },
          { href: "/equipe/bresil", label: "🇧🇷 Brésil", sub: "#5 FIFA" },
        ],
      },
      {
        title: "Groupes",
        links: [
          { href: "/groupe/a", label: "Groupe A" },
          { href: "/groupe/b", label: "Groupe B" },
          { href: "/groupe/c", label: "Groupe C" },
          { href: "/groupe/d", label: "Groupe D" },
          { href: "/groupe/e", label: "Groupe E" },
          { href: "/groupe/f", label: "Groupe F" },
        ],
      },
      {
        title: "Explorer",
        links: [
          { href: "/equipes", label: "Toutes les équipes →" },
          { href: "/joueurs", label: "Joueurs clés" },
          { href: "/buteurs", label: "Cotes buteurs" },
          { href: "/h2h", label: "Confrontations H2H" },
        ],
      },
    ],
  },
  pronostics: {
    label: "Pronostics & Paris",
    icon: "💰",
    sections: [
      {
        title: "Pronostics",
        links: [
          { href: "/pronostic/france", label: "🇫🇷 France" },
          { href: "/pronostic/bresil", label: "🇧🇷 Brésil" },
          { href: "/pronostic/argentine", label: "🇦🇷 Argentine" },
          { href: "/pronostic/espagne", label: "🇪🇸 Espagne" },
          { href: "/pronostic/allemagne", label: "🇩🇪 Allemagne" },
        ],
      },
      {
        title: "Paris sportifs",
        links: [
          { href: "/paris-sportifs", label: "Guide paris CDM" },
          { href: "/comparateur-cotes", label: "Comparateur cotes" },
          { href: "/bookmaker/betclic", label: "Betclic" },
          { href: "/bookmaker/winamax", label: "Winamax" },
          { href: "/match/calendrier", label: "Calendrier matchs" },
        ],
      },
    ],
  },
  interactif: {
    label: "Interactif",
    icon: "⚡",
    sections: [
      {
        title: "Outils",
        links: [
          { href: "/simulateur", label: "🏆 Simulateur bracket" },
          { href: "/quiz", label: "🧩 Quiz CDM 2026" },
          { href: "/comparateur-joueurs", label: "⚖️ Comparateur joueurs" },
          { href: "/live", label: "⚡ Scores en direct" },
        ],
      },
      {
        title: "Contenu",
        links: [
          { href: "/actualites", label: "📰 Actualités" },
          { href: "/guides", label: "📖 Guides" },
          { href: "/ou-regarder", label: "📺 Où regarder" },
          { href: "/profil", label: "🏅 Mon profil" },
        ],
      },
    ],
  },
};

type MenuKey = keyof typeof megaMenus;

export function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<MenuKey | null>(null);
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

  // Close on route change
  useEffect(() => {
    setOpen(false);
    setActiveMenu(null);
    setLangOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-primary/95 backdrop-blur-md text-white border-b border-white/8">
      {/* Skip to content */}
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
          className="text-lg font-extrabold tracking-tight hover:opacity-90 transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none rounded"
        >
          <span className="text-gold">⚽ CDM</span>{" "}
          <span className="text-white">2026</span>
        </Link>

        {/* Desktop mega-menu nav */}
        <div ref={menuRef} className="hidden md:flex items-center gap-1">
          {(Object.entries(megaMenus) as [MenuKey, typeof megaMenus[MenuKey]][]).map(([key, menu]) => (
            <div key={key} className="relative">
              <button
                onMouseEnter={() => setActiveMenu(key)}
                onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
                  activeMenu === key ? "bg-white/10 text-white" : "text-gray-300"
                }`}
                aria-expanded={activeMenu === key}
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
                  className={`transition-transform duration-200 ${activeMenu === key ? "rotate-180" : ""}`}
                >
                  <path d="M2 4l3 3 3-3" />
                </svg>
              </button>

              {/* Mega menu dropdown */}
              {activeMenu === key && (
                <div
                  className="mega-menu p-4"
                  onMouseLeave={() => setActiveMenu(null)}
                >
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
                                className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-accent transition-colors"
                                onClick={() => setActiveMenu(null)}
                              >
                                <span>{link.label}</span>
                                {"sub" in link && link.sub && (
                                  <span className="text-[10px] text-gray-400 ml-2 shrink-0">
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
              )}
            </div>
          ))}

          {/* Direct links */}
          <Link
            href="/match/calendrier"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 ${
              pathname.startsWith("/match") ? "text-gold" : "text-gray-300"
            }`}
          >
            📅 Calendrier
          </Link>
          <Link
            href="/live"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10 flex items-center gap-1 ${
              pathname === "/live" ? "text-gold" : "text-gray-300"
            }`}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </Link>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5">
          {/* Search */}
          <SearchDialog lang="fr" data={searchData} onNavigate={(href) => router.push(href)} />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Language switcher */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
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
                className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
              >
                <path d="M2 4l3 3 3-3" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 min-w-[150px] rounded-xl bg-white text-gray-900 shadow-xl ring-1 ring-black/8 z-50 overflow-hidden animate-scaleIn">
                {otherOptions.map((opt) => (
                  <a
                    key={opt.lang}
                    href={getUrlForLang(pathname, opt.lang)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors"
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
            className="md:hidden p-2 -mr-1 rounded-lg hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
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

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 animate-[slideDown_200ms_ease-out] bg-primary/98">
          <div className="px-4 py-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {(Object.entries(megaMenus) as [MenuKey, typeof megaMenus[MenuKey]][]).map(([key, menu]) => (
              <div key={key}>
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{menu.icon}</span>
                    <span>{menu.label}</span>
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`transition-transform duration-200 ${mobileExpanded === key ? "rotate-180" : ""}`}
                  >
                    <path d="M2 4l3 3 3-3" />
                  </svg>
                </button>
                {mobileExpanded === key && (
                  <div className="pl-4 pb-2 animate-fadeIn">
                    {menu.sections.map((section) => (
                      <div key={section.title} className="mb-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 px-3 py-1">
                          {section.title}
                        </p>
                        {section.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/8 hover:text-white transition-colors"
                            onClick={() => setOpen(false)}
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

            {/* Direct links */}
            <Link
              href="/match/calendrier"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              onClick={() => setOpen(false)}
            >
              📅 Calendrier des matchs
            </Link>
            <Link
              href="/live"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              onClick={() => setOpen(false)}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Scores en direct
            </Link>
            <Link
              href="/profil"
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              onClick={() => setOpen(false)}
            >
              🏅 Mon profil
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
