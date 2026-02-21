// ============================================================================
// Bookmakers — Centralized data for all bookmaker references across the site.
// Single source of truth: bonus, URLs, ratings, ANJ status, logos.
// ============================================================================

export interface Bookmaker {
  id: string;
  name: string;
  slug: string;
  url: string;            // lien affilié
  bonusUrl: string;       // page bonus interne (ex: "/bonus/winamax")
  bonus: string;          // ex: "100€ offerts"
  bonusDetail: string;    // ex: "en freebets sur votre 1er pari"
  logo: string;           // chemin vers le logo PNG
  rating: number;         // note sur 5
  anjApproved: boolean;   // agréé ANJ (Autorité Nationale des Jeux)
  highlight?: boolean;    // bookmaker mis en avant
}

export const bookmakers: Bookmaker[] = [
  {
    id: "betclic",
    name: "Betclic",
    slug: "betclic",
    url: "https://www.betclic.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/betclic",
    bonus: "Jusqu'à 100€",
    bonusDetail: "en freebets sans conditions de mise",
    logo: "/images/logos/betclic.png",
    rating: 5,
    anjApproved: true,
    highlight: true,
  },
  {
    id: "winamax",
    name: "Winamax",
    slug: "winamax",
    url: "https://www.winamax.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/winamax",
    bonus: "Jusqu'à 100€",
    bonusDetail: "1er pari remboursé en freebets si perdu",
    logo: "/images/logos/winamax.png",
    rating: 5,
    anjApproved: true,
    highlight: true,
  },
  {
    id: "unibet",
    name: "Unibet",
    slug: "unibet",
    url: "https://www.unibet.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/unibet",
    bonus: "Jusqu'à 100€",
    bonusDetail: "remboursés en freebets sur 1er pari",
    logo: "/images/logos/unibet.png",
    rating: 4,
    anjApproved: true,
    highlight: false,
  },
  {
    id: "parionssport",
    name: "Parions Sport",
    slug: "parions-sport",
    url: "https://www.enligne.parionssport.fdj.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/parionssport",
    bonus: "Jusqu'à 90€",
    bonusDetail: "offerts en freebets",
    logo: "/images/logos/parionssport.png",
    rating: 4,
    anjApproved: true,
    highlight: false,
  },
  {
    id: "zebet",
    name: "ZEbet",
    slug: "zebet",
    url: "https://www.zebet.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/zebet",
    bonus: "Jusqu'à 150€",
    bonusDetail: "sur votre 1er pari",
    logo: "/images/logos/zebet.png",
    rating: 4,
    anjApproved: true,
    highlight: false,
  },
];

/** Bookmaker mis en avant (Betclic par défaut) */
export const featuredBookmaker = bookmakers.find((b) => b.id === "betclic")!;

/** Tous les bookmakers mis en avant */
export const highlightedBookmakers = bookmakers.filter((b) => b.highlight);

/** Lookup par id */
export function getBookmakerById(id: string): Bookmaker | undefined {
  return bookmakers.find((b) => b.id === id);
}

/** Lookup par slug */
export function getBookmakerBySlug(slug: string): Bookmaker | undefined {
  return bookmakers.find((b) => b.slug === slug);
}
