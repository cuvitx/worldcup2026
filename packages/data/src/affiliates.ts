// ============================================================================
// Affiliate Configuration — Sports Betting Partners
// Single source of truth for all CTA blocks across the site.
// Update this file to change bookmaker, bonus, or link across every page.
// ============================================================================

export const AFFILIATE_URLS_ARE_PLACEHOLDERS = false;

/** Base Gambling Affiliation tracking link for PMU PLAY */
const PMU_GA_BASE = "https://www.gambling-affiliation.com/cpc/v=ak0CEPFp.xNc0Zux4eAz9mltNCb6fU43LYUUbJ-hUbE_GA7331V2";

export const PMU_AFFILIATE_PROGRAM = "pmu-play";

export type AffiliateProgramId =
  | "pmu-play"
  | "pokerstars-sports"
  | "betsson"
  | "genybet";

interface AffiliateProgramConfig {
  id: AffiliateProgramId;
  name: string;
  /**
   * Lien CPC Gambling Affiliation de la campagne (format
   * https://www.gambling-affiliation.com/cpc/v=TOKEN).
   * null = campagne pas encore cablee : les offres de ce programme
   * ne sont pas rendues sur le site.
   */
  baseUrl: string | null;
}

export const AFFILIATE_PROGRAMS: Record<AffiliateProgramId, AffiliateProgramConfig> = {
  "pmu-play": {
    id: "pmu-play",
    name: "PMU Play",
    baseUrl: PMU_GA_BASE,
  },
  "pokerstars-sports": {
    id: "pokerstars-sports",
    name: "PokerStars Sports",
    // TODO(xavier): coller le lien CPC de la campagne "PokerStars - France - Sport - CPA".
    baseUrl: null,
  },
  betsson: {
    id: "betsson",
    name: "Betsson",
    // TODO(xavier): coller le lien CPC de la campagne "Betsson - France - Sport - CPA".
    baseUrl: null,
  },
  genybet: {
    id: "genybet",
    name: "Genybet",
    // TODO(xavier): coller le lien CPC de la campagne "Genybet - France - Sport - CPA".
    baseUrl: null,
  },
};

export interface AffiliateTrackingInput {
  pageType: string;
  slug?: string;
  placement?: string;
}

export interface AffiliateTrackingData {
  affVar: string;
  pageType: string;
  slug: string;
  placement: string;
  affiliateProgram: AffiliateProgramId;
}

export type AffiliateTracking = string | AffiliateTrackingInput;

const LEGACY_TRACKING_MAP: Record<string, AffiliateTrackingInput> = {
  article: { pageType: "article", slug: "unknown", placement: "cta" },
  banner: { pageType: "global", slug: "default", placement: "banner" },
  "bet-of-the-day": { pageType: "homepage", slug: "bet-of-the-day", placement: "card" },
  billets: { pageType: "billets", slug: "index", placement: "banner" },
  bonus: { pageType: "bonus", slug: "pmu-sport", placement: "list" },
  bookmakers: { pageType: "bookmakers", slug: "index", placement: "table" },
  buteurs: { pageType: "buteurs", slug: "index", placement: "cta" },
  calendrier: { pageType: "match-calendrier", slug: "index", placement: "banner" },
  "calendrier-inline": { pageType: "match-calendrier", slug: "index", placement: "inline" },
  "calendrier-top": { pageType: "match-calendrier", slug: "index", placement: "top" },
  "classement-fifa": { pageType: "classement-fifa", slug: "index", placement: "banner" },
  comparateur: { pageType: "bookmakers", slug: "comparateur", placement: "table" },
  "comparateur-cotes": { pageType: "comparateur-cotes", slug: "index", placement: "banner" },
  "cote-buteur": { pageType: "cote-buteur", slug: "unknown", placement: "cta" },
  "cote-carton": { pageType: "cote-carton-jaune", slug: "unknown", placement: "cta" },
  cdm2026: { pageType: "site", slug: "global", placement: "legacy" },
  cta: { pageType: "global", slug: "default", placement: "cta" },
  effectif: { pageType: "effectif", slug: "unknown", placement: "cta" },
  "equipe-calendar": { pageType: "equipe", slug: "unknown", placement: "calendar" },
  "global-footer": { pageType: "global", slug: "footer", placement: "banner" },
  groupe: { pageType: "groupe", slug: "unknown", placement: "sidebar" },
  h2h: { pageType: "h2h", slug: "unknown", placement: "cta" },
  homepage: { pageType: "homepage", slug: "index", placement: "banner" },
  joueur: { pageType: "joueur", slug: "unknown", placement: "sidebar" },
  live: { pageType: "live", slug: "index", placement: "banner" },
  match: { pageType: "match", slug: "unknown", placement: "card" },
  "match-hero-cta": { pageType: "pronostic-match", slug: "unknown", placement: "hero" },
  "match-sidebar": { pageType: "pronostic-match", slug: "unknown", placement: "sidebar" },
  "ou-regarder": { pageType: "ou-regarder", slug: "index", placement: "banner" },
  parier: { pageType: "parier", slug: "unknown", placement: "cta" },
  "paris-sportifs": { pageType: "paris-sportifs", slug: "index", placement: "cta" },
  popup: { pageType: "global", slug: "popup", placement: "sticky" },
  "prono-buteurs": { pageType: "pronostic", slug: "buteurs", placement: "cta" },
  "prono-special": { pageType: "pronostic", slug: "special", placement: "cta" },
  "prono-vainqueur": { pageType: "pronostic", slug: "vainqueur", placement: "odds-table" },
  pronostic: { pageType: "pronostic", slug: "unknown", placement: "cta" },
  "pronostics-grid": { pageType: "match", slug: "related-pronostics", placement: "grid" },
  resultats: { pageType: "resultats", slug: "index", placement: "banner" },
  "resultats-top": { pageType: "resultats", slug: "index", placement: "top" },
  stade: { pageType: "stade", slug: "unknown", placement: "sidebar" },
  stades: { pageType: "stades", slug: "index", placement: "banner" },
  stats: { pageType: "stats", slug: "unknown", placement: "cta" },
  villes: { pageType: "villes", slug: "index", placement: "banner" },
};

function cleanTrackingSegment(value: string | undefined, fallback: string): string {
  const clean = (value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return clean || fallback;
}

function parseLegacyTracking(value: string | undefined): AffiliateTrackingInput {
  const raw = (value ?? "").trim();

  if (raw.includes("--")) {
    const [pageType = "site", slug = "index", placement = "link"] = raw.split("--");
    return { pageType, slug, placement };
  }

  if (raw.includes(":")) {
    const [pageType = "site", slug = "index", placement = "link"] = raw.split(":");
    return { pageType, slug, placement };
  }

  const tracking = cleanTrackingSegment(raw, "site");

  const mapped = LEGACY_TRACKING_MAP[tracking];
  if (mapped) return mapped;

  if (tracking.startsWith("cote-champion-")) {
    const suffix = tracking.replace(/^cote-champion-/, "");
    const slug = suffix.replace(/-sidebar$/, "");
    return {
      pageType: "cote-champion",
      slug,
      placement: suffix.endsWith("-sidebar") ? "sidebar" : "hero",
    };
  }

  if (tracking.startsWith("match-")) {
    const suffix = tracking.replace(/^match-/, "");
    const slug = suffix.replace(/-sidebar$/, "");
    return {
      pageType: "match",
      slug,
      placement: suffix.endsWith("-sidebar") ? "sidebar" : "card",
    };
  }

  return { pageType: tracking, slug: "index", placement: "link" };
}

export function getAffiliateTrackingData(
  tracking?: AffiliateTracking,
  placementOverride?: string,
  program: AffiliateProgramId = PMU_AFFILIATE_PROGRAM
): AffiliateTrackingData {
  const parsed =
    typeof tracking === "object" && tracking !== null
      ? tracking
      : parseLegacyTracking(tracking);

  const pageType = cleanTrackingSegment(parsed.pageType, "site");
  const slug = cleanTrackingSegment(parsed.slug, "index");
  const placement = cleanTrackingSegment(placementOverride ?? parsed.placement, "link");
  // Separateur "--" : Gambling Affiliation n'accepte que [a-z0-9-] dans aff_var_1.
  // Les valeurs avec ":" (encodees %3A) arrivaient VIDES dans le rapport conversions
  // (toutes les conversions depuis le 26 juin). "--" est non ambigu car les segments
  // nettoyes par cleanTrackingSegment ne contiennent jamais deux tirets consecutifs.
  const affVar = `${pageType}--${slug}--${placement}`;

  return {
    affVar,
    pageType,
    slug,
    placement,
    affiliateProgram: program,
  };
}

export function affiliateLinkAttributes(
  tracking?: AffiliateTracking,
  placementOverride?: string,
  program: AffiliateProgramId = PMU_AFFILIATE_PROGRAM
) {
  const data = getAffiliateTrackingData(tracking, placementOverride, program);

  return {
    "data-aff-var": data.affVar,
    "data-page-type": data.pageType,
    "data-slug": data.slug,
    "data-placement": data.placement,
    "data-affiliate-program": data.affiliateProgram,
  };
}

/**
 * Build a Gambling Affiliation tracking URL for any partner program.
 * Returns null when the campaign link is not wired yet (baseUrl null).
 */
export function affiliateTrackingUrl(
  program: AffiliateProgramId,
  tracking?: AffiliateTracking,
  placementOverride?: string
): string | null {
  const baseUrl = AFFILIATE_PROGRAMS[program].baseUrl;
  if (!baseUrl) return null;
  const { affVar } = getAffiliateTrackingData(tracking, placementOverride, program);
  return `${baseUrl}&aff_var_1=${encodeURIComponent(affVar)}`;
}

/** Build PMU tracking URL with a canonical attribution variable. */
export function pmuTrackingUrl(
  tracking?: AffiliateTracking,
  placementOverride?: string
): string {
  const { affVar } = getAffiliateTrackingData(tracking, placementOverride);
  return `${PMU_GA_BASE}&aff_var_1=${encodeURIComponent(affVar)}`;
}

export interface Bookmaker {
  id: string;
  name: string;
  slug: string;
  program: AffiliateProgramId;
  bonus: string;          // e.g. "100€ offerts"
  bonusDetail: string;    // e.g. "sur votre 1er pari"
  url: string;            // affiliate tracking URL
  rating: number;         // 1-5
  logo?: string;          // optional logo path
  highlight?: boolean;    // featured bookmaker
}

/**
 * Catalogue partenaires Gambling Affiliation (campagnes actives cdm2026.fr).
 * Ordre = priorite d'affichage (payout CPA decroissant, PMU garde en 2e pour
 * la familiarite de la marque FR). Un bookmaker n'apparait sur le site que si
 * la baseUrl de son programme est cablee dans AFFILIATE_PROGRAMS.
 */
const PARTNER_BOOKMAKERS: Array<Omit<Bookmaker, "url">> = [
  {
    id: "pokerstars-sports",
    name: "PokerStars Sports",
    slug: "pokerstars-sports",
    program: "pokerstars-sports",
    bonus: "Jusqu'à 100€ remboursés",
    bonusDetail: "en freebets si votre 1er pari est perdant",
    rating: 4.9,
    logo: "/images/logos/pokerstars-sports.png",
    highlight: true,
  },
  {
    id: "pmu-sport",
    name: "PMU Play",
    slug: "pmu-sport",
    program: "pmu-play",
    bonus: "100€ offerts",
    bonusDetail: "1er pari remboursé en cash, sans condition",
    rating: 4.8,
    logo: "/images/logos/pmu-sport.png",
    highlight: true,
  },
  {
    id: "betsson",
    name: "Betsson",
    slug: "betsson",
    program: "betsson",
    bonus: "Jusqu'à 100€ + 10€",
    bonusDetail: "sur le 1er dépôt + freebet à la validation du compte",
    rating: 4.6,
    logo: "/images/logos/betsson.png",
  },
  {
    id: "genybet",
    name: "Genybet",
    slug: "genybet",
    program: "genybet",
    bonus: "Freebets offerts",
    bonusDetail: "paris gratuits pour les nouveaux joueurs",
    rating: 4.3,
    logo: "/images/logos/genybet.png",
  },
];

export const bookmakers: Bookmaker[] = PARTNER_BOOKMAKERS.filter(
  (b) => AFFILIATE_PROGRAMS[b.program].baseUrl !== null
).map((b) => ({
  ...b,
  url: affiliateTrackingUrl(b.program, {
    pageType: "bookmakers",
    slug: b.slug,
    placement: "table",
  })!,
}));

export const featuredBookmaker = bookmakers[0]!;
export const highlightedBookmakers = bookmakers.filter((b) => b.highlight);

// Utility: convert ELO probability to approximate decimal odds
export function probToOdds(prob: number): string {
  if (prob <= 0) return "—";
  const odds = 1 / prob;
  return odds >= 100 ? "—" : odds.toFixed(2);
}

// Utility: generate estimated odds for a match from ELO probabilities
export function estimatedMatchOdds(
  team1WinProb: number,
  drawProb: number,
  team2WinProb: number
): { home: string; draw: string; away: string } {
  // Add ~8% margin (typical bookmaker margin)
  const margin = 1.08;
  return {
    home: probToOdds(team1WinProb / margin),
    draw: probToOdds(drawProb / margin),
    away: probToOdds(team2WinProb / margin),
  };
}

// Utility: generate estimated outright odds from tournament win probability
export function estimatedOutrightOdds(winnerProb: number): string {
  return probToOdds(winnerProb);
}
