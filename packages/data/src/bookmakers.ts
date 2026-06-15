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
    id: "pmu-sport",
    name: "PMU Sport",
    slug: "pmu-sport",
    url: "https://www.gambling-affiliation.com/cpc/v=ak0CEPFp.xNc0Zux4eAz9mltNCb6fU43LYUUbJ-hUbE_GA7331V2&aff_var_1=cdm2026",
    bonusUrl: "/bonus/pmu-sport",
    bonus: "Jusqu'à 100€",
    bonusDetail: "en freebets sans condition",
    logo: "/images/logos/pmu-sport.png",
    rating: 4,
    anjApproved: true,
    highlight: true,
  },
];

/** Bookmaker mis en avant (PMU Sport) */
export const featuredBookmaker = bookmakers.find((b) => b.id === "pmu-sport")!;

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
