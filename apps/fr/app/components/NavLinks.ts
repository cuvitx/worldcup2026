import { routePrefixes, domains, type Lang } from "@repo/data/route-mapping";

export const CURRENT_LANG = "fr" as const;

export const langOptions: Array<{ lang: Lang; flag: string; label: string }> = [
  { lang: "fr", flag: "🇫🇷", label: "Français" },
  { lang: "en", flag: "🇬🇧", label: "English" },
  { lang: "es", flag: "🇪🇸", label: "Español" },
];

function convertPath(pathname: string, fromLang: Lang, toLang: Lang): string {
  if (pathname === "/") return "/";
  const segments = pathname.replace(/^\//, "").split("/");
  const fromPrefixes = routePrefixes[fromLang] as Record<string, string>;
  const toPrefixes = routePrefixes[toLang] as Record<string, string>;
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

export function getUrlForLang(pathname: string, targetLang: Lang): string {
  const convertedPath = convertPath(pathname, CURRENT_LANG, targetLang);
  return `${domains[targetLang]}${convertedPath}`;
}

// Mega menu definitions
interface MenuLink {
  href: string;
  label: string;
  sub?: string;
}

interface MenuSection {
  title: string;
  links: MenuLink[];
}

export interface MegaMenuDef {
  label: string;
  icon: string;
  sections: MenuSection[];
}

export const megaMenus = {
  equipes: {
    label: "Équipes & Groupes",
    icon: "",
    sections: [
      {
        title: "Favoris",
        links: [
          { href: "/equipe/france", label: "🇫🇷 France", sub: "#2 FIFA" },
          { href: "/equipe/argentine", label: "🇦🇷 Argentine", sub: "#1 FIFA" },
          { href: "/equipe/espagne", label: "🇪🇸 Espagne", sub: "#3 FIFA" },
          { href: "/equipe/angleterre", label: "󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", sub: "#4 FIFA" },
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
          { href: "/groupe/g", label: "Groupe G" },
          { href: "/groupe/h", label: "Groupe H" },
          { href: "/groupe/i", label: "Groupe I" },
          { href: "/groupe/j", label: "Groupe J" },
          { href: "/groupe/k", label: "Groupe K" },
          { href: "/groupe/l", label: "Groupe L" },
          { href: "/groupes", label: "Tous les groupes →" },
        ],
      },
      {
        title: "Explorer",
        links: [
          { href: "/equipes", label: "Toutes les équipes →" },
          { href: "/joueurs", label: "Joueurs clés" },
          { href: "/portrait/kylian-mbappe", label: "Portraits joueurs" },
          { href: "/buteurs", label: "Cotes buteurs" },
          { href: "/h2h", label: "Confrontations H2H" },
        ],
      },
    ],
  },
  pronostics: {
    label: "Pronostics & Paris",
    icon: "",
    sections: [
      {
        title: "Pronostics",
        links: [
          { href: "/pronostic-vainqueur", label: "Pronostic vainqueur" },
          { href: "/equipe-de-france", label: "🇫🇷 Équipe de France" },
          { href: "/pronostic/france", label: "Pronostic France" },
          { href: "/pronostic/argentine", label: "🇦🇷 Argentine" },
          { href: "/pronostic/espagne", label: "🇪🇸 Espagne" },
          { href: "/palmares", label: "Palmarès CDM" },
        ],
      },
      {
        title: "Paris sportifs",
        links: [
          { href: "/paris-sportifs", label: "Guide paris CDM" },
          { href: "/comparateur-cotes", label: "Comparateur cotes" },
          { href: "/bookmaker/betclic", label: "Betclic" },
          { href: "/bookmaker/winamax", label: "Winamax" },
          { href: "/billets", label: "Billets CDM 2026" },
        ],
      },
    ],
  },
  interactif: {
    label: "Interactif",
    icon: "",
    sections: [
      {
        title: "Outils",
        links: [
          { href: "/simulateur", label: "Simulateur bracket" },
          { href: "/quiz", label: "Quiz CDM 2026" },
          { href: "/comparateur-joueurs", label: "Comparateur joueurs" },
          { href: "/live", label: "Scores en direct" },
        ],
      },
      {
        title: "Contenu",
        links: [
          { href: "/actualites", label: "Actualités" },
          { href: "/guides", label: "Guides" },
          { href: "/guide-ville/new-york", label: "Guides villes" },
          { href: "/ou-regarder", label: "Où regarder" },
          { href: "/carte-stades", label: "Carte des stades" },
          { href: "/recherche", label: "Recherche" },
          { href: "/profil", label: "Mon profil" },
        ],
      },
    ],
  },
} as const;

export type MenuKey = keyof typeof megaMenus;
