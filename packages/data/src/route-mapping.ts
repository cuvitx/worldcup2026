// ============================================================================
// Cross-language Route Mapping
// Single source of truth for URL paths and hreflang alternates across FR/EN/ES.
// ============================================================================

export type Lang = "fr";

export const domains: Record<Lang, string> = {
  fr: "https://www.cdm2026.fr",
};

// Route type -> localized path prefix (without leading or trailing slash)
export const routePrefixes = {
  fr: {
    team: "equipe",
    teams: "equipes",
    match: "match",
    matchSchedule: "match/calendrier",
    matchToday: "match/aujourdhui",
    prediction: "pronostic",
    predictionMatch: "pronostic-match",
    group: "groupe",
    player: "joueur",
    players: "joueurs",
    scorer: "buteur",
    scorers: "buteurs",
    stadium: "stade",
    stadiums: "stades",
    city: "ville",
    cities: "villes",
    h2h: "h2h",
    bookmaker: "bookmaker",
    guide: "guide",
    guides: "guides",
    betting: "paris-sportifs",
    about: "a-propos",
    legal: "mentions-legales",
    responsibleGambling: "jeu-responsable",
    contact: "contact",
    faq: "faq",
    bracket: "tableau",
  },
} as const;

export type RouteType = keyof typeof routePrefixes.fr;

/**
 * Get hreflang alternates for a dynamic page (with slug).
 * Used in generateMetadata() to add canonical + language alternates.
 */
export function getAlternates(type: RouteType, slug: string, currentLang: Lang) {
  const currentPrefix = routePrefixes[currentLang][type];
  return {
    canonical: `/${currentPrefix}/${slug}`,
  };
}

/**
 * Get hreflang alternates for a static page (no slug).
 * Used for index pages like /equipes, /joueurs, /stades, etc.
 */
export function getStaticAlternates(type: RouteType, currentLang: Lang) {
  const currentPrefix = routePrefixes[currentLang][type];
  return {
    canonical: `/${currentPrefix}`,
  };
}

/**
 * Get hreflang alternates for the homepage.
 */
export function getHomeAlternates() {
  return {
    canonical: "/",
  };
}
