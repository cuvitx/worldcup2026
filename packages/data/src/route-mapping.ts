// ============================================================================
// Cross-language Route Mapping
// Single source of truth for URL paths and hreflang alternates across FR/EN/ES.
// ============================================================================

export type Lang = "fr" | "en" | "es";

export const domains: Record<Lang, string> = {
  fr: "https://cdm2026.fr",
  en: "https://worldcup2026guide.com",
  es: "https://mundial2026.es",
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
  en: {
    team: "team",
    teams: "teams",
    match: "match",
    matchSchedule: "match/schedule",
    matchToday: "match/today",
    prediction: "prediction",
    predictionMatch: "prediction-match",
    group: "group",
    player: "player",
    players: "players",
    scorer: "scorer",
    scorers: "scorers",
    stadium: "stadium",
    stadiums: "stadiums",
    city: "city",
    cities: "cities",
    h2h: "h2h",
    bookmaker: "bookmaker",
    guide: "guide",
    guides: "guides",
    betting: "betting",
    about: "about",
    legal: "legal",
    responsibleGambling: "responsible-gambling",
    contact: "contact",
    faq: "faq",
    bracket: "bracket",
  },
  es: {
    team: "equipo",
    teams: "equipos",
    match: "match",
    matchSchedule: "match/calendario",
    matchToday: "match/hoy",
    prediction: "pronostico",
    predictionMatch: "pronostico-partido",
    group: "grupo",
    player: "jugador",
    players: "jugadores",
    scorer: "goleador",
    scorers: "goleadores",
    stadium: "estadio",
    stadiums: "estadios",
    city: "ciudad",
    cities: "ciudades",
    h2h: "h2h",
    bookmaker: "casa-apuestas",
    guide: "guia",
    guides: "guias",
    betting: "apuestas",
    about: "acerca-de",
    legal: "aviso-legal",
    responsibleGambling: "juego-responsable",
    contact: "contacto",
    faq: "faq",
    bracket: "cuadro",
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
    languages: {
      "fr": `${domains.fr}/${routePrefixes.fr[type]}/${slug}`,
      "en": `${domains.en}/${routePrefixes.en[type]}/${slug}`,
      "es": `${domains.es}/${routePrefixes.es[type]}/${slug}`,
      "x-default": `${domains.en}/${routePrefixes.en[type]}/${slug}`,
    },
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
    languages: {
      "fr": `${domains.fr}/${routePrefixes.fr[type]}`,
      "en": `${domains.en}/${routePrefixes.en[type]}`,
      "es": `${domains.es}/${routePrefixes.es[type]}`,
      "x-default": `${domains.en}/${routePrefixes.en[type]}`,
    },
  };
}

/**
 * Get hreflang alternates for the homepage.
 */
export function getHomeAlternates() {
  return {
    canonical: "/",
    languages: {
      "fr": domains.fr,
      "en": domains.en,
      "es": domains.es,
      "x-default": domains.en,
    },
  };
}
