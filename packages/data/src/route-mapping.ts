// ============================================================================
// Cross-language Route Mapping
// Single source of truth for URL paths and hreflang alternates across all langs.
// ============================================================================

export type Lang = "fr" | "de";

export const domains: Record<Lang, string> = {
  fr: "https://www.cdm2026.fr",
  de: "https://www.wm2026guide.de",
};

/** Default language (used as x-default hreflang) */
export const defaultLang: Lang = "fr";

/** Languages with live sites — add "de" here when wm2026guide.de goes live */
export const activeLangs: Lang[] = ["fr"];

export type RouteType =
  | "team" | "teams"
  | "match" | "matchSchedule" | "matchToday"
  | "prediction" | "predictionMatch"
  | "group" | "groups"
  | "player" | "players"
  | "scorer" | "scorers"
  | "stadium" | "stadiums"
  | "city" | "cities"
  | "h2h"
  | "bookmaker" | "guide" | "guides"
  | "betting"
  | "about" | "legal" | "responsibleGambling" | "contact" | "faq"
  | "bracket" | "results" | "live";

// Route type -> localized path prefix (without leading or trailing slash)
export const routePrefixes: Record<Lang, Record<RouteType, string>> = {
  fr: {
    team: "equipe",
    teams: "equipes",
    match: "match",
    matchSchedule: "match/calendrier",
    matchToday: "match/aujourdhui",
    prediction: "pronostic",
    predictionMatch: "pronostic-match",
    group: "groupe",
    groups: "groupes",
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
    results: "resultats",
    live: "live",
  },
  de: {
    team: "mannschaft",
    teams: "mannschaften",
    match: "spiel",
    matchSchedule: "spiel/spielplan",
    matchToday: "spiel/heute",
    prediction: "prognose",
    predictionMatch: "prognose-spiel",
    group: "gruppe",
    groups: "gruppen",
    player: "spieler",
    players: "spieler",
    scorer: "torschuetze",
    scorers: "torschuetzen",
    stadium: "stadion",
    stadiums: "stadien",
    city: "stadt",
    cities: "staedte",
    h2h: "h2h",
    bookmaker: "wettanbieter",
    guide: "ratgeber",
    guides: "ratgeber",
    betting: "sportwetten",
    about: "ueber-uns",
    legal: "impressum",
    responsibleGambling: "verantwortungsvolles-spielen",
    contact: "kontakt",
    faq: "faq",
    bracket: "turnierbaum",
    results: "ergebnisse",
    live: "live",
  },
};

/**
 * Slug mapping between languages for a given route type.
 * Used when generating cross-language hreflang links for dynamic pages.
 * Returns undefined if no mapping exists (page doesn't exist in target lang).
 */
export type SlugMapper = (slug: string, fromLang: Lang, toLang: Lang) => string | undefined;

/**
 * Get hreflang alternates for a dynamic page (with slug).
 * Generates canonical + language alternates for all active languages.
 */
export function getAlternates(
  type: RouteType,
  slug: string,
  currentLang: Lang,
  slugMapper?: SlugMapper,
) {
  const currentPrefix = routePrefixes[currentLang][type];
  const languages: Record<string, string> = {};

  for (const lang of activeLangs) {
    const targetSlug = slugMapper ? slugMapper(slug, currentLang, lang) : slug;
    if (targetSlug === undefined) continue;
    const prefix = routePrefixes[lang][type];
    languages[lang] = `${domains[lang]}/${prefix}/${targetSlug}`;
  }

  // x-default points to the default language
  if (languages[defaultLang]) {
    languages["x-default"] = languages[defaultLang];
  }

  return {
    canonical: `/${currentPrefix}/${slug}`,
    languages,
  };
}

/**
 * Get hreflang alternates for a static page (no slug).
 */
export function getStaticAlternates(type: RouteType, currentLang: Lang) {
  const currentPrefix = routePrefixes[currentLang][type];
  const languages: Record<string, string> = {};

  for (const lang of activeLangs) {
    const prefix = routePrefixes[lang][type];
    languages[lang] = `${domains[lang]}/${prefix}`;
  }

  if (languages[defaultLang]) {
    languages["x-default"] = languages[defaultLang];
  }

  return {
    canonical: `/${currentPrefix}`,
    languages,
  };
}

/**
 * Get hreflang alternates for the homepage.
 */
export function getHomeAlternates(currentLang: Lang = "fr") {
  const languages: Record<string, string> = {};

  for (const lang of activeLangs) {
    languages[lang] = domains[lang];
  }

  languages["x-default"] = domains[defaultLang];

  return {
    canonical: "/",
    languages,
  };
}
