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
    id: "pokerstars-sports",
    name: "PokerStars Sports",
    slug: "pokerstars-sports",
    url: "https://www.pokerstarssports.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/pokerstars-sports",
    bonus: "Jusqu'à 100€",
    bonusDetail: "en freebets sur votre 1er pari",
    logo: "/images/logos/pokerstars-sports.png",
    rating: 5,
    anjApproved: true,
    highlight: true,
  },
  {
    id: "betsson",
    name: "Betsson",
    slug: "betsson",
    url: "https://www.betsson.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/betsson",
    bonus: "Jusqu'à 100€",
    bonusDetail: "sur votre 1er pari",
    logo: "/images/logos/betsson.png",
    rating: 5,
    anjApproved: true,
    highlight: true,
  },
  {
    id: "pmu-sport",
    name: "PMU Sport",
    slug: "pmu-sport",
    url: "https://paris-sportifs.pmu.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/pmu-sport",
    bonus: "Jusqu'à 100€",
    bonusDetail: "en freebets sans condition",
    logo: "/images/logos/pmu-sport.png",
    rating: 4,
    anjApproved: true,
    highlight: false,
  },
  {
    id: "genybet",
    name: "Genybet",
    slug: "genybet",
    url: "https://www.genybet.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    bonusUrl: "/bonus/genybet",
    bonus: "Jusqu'à 150€",
    bonusDetail: "sur votre 1er pari sportif",
    logo: "/images/logos/genybet.png",
    rating: 4,
    anjApproved: true,
    highlight: false,
  },
];

/** Bookmaker mis en avant (PokerStars Sports par défaut) */
export const featuredBookmaker = bookmakers.find((b) => b.id === "pokerstars-sports")!;

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
