/** @todo Replace affiliate URLs with real tracking URLs from partner programs */
// ============================================================================
// Affiliate Configuration — Sports Betting Partners
// Single source of truth for all CTA blocks across the site.
// Update this file to change bookmaker, bonus, or link across every page.
// ============================================================================

export const AFFILIATE_URLS_ARE_PLACEHOLDERS = true;

export interface Bookmaker {
  id: string;
  name: string;
  slug: string;
  bonus: string;          // e.g. "100€ offerts"
  bonusDetail: string;    // e.g. "sur votre 1er pari"
  url: string;            // affiliate tracking URL (placeholder for now)
  rating: number;         // 1-5
  logo?: string;          // optional logo path
  highlight?: boolean;    // featured bookmaker
}

export const bookmakers: Bookmaker[] = [
  {
    id: "betclic",
    name: "Betclic",
    slug: "betclic",
    bonus: "100€ offerts",
    bonusDetail: "en freebets sur votre 1er pari",
    url: "https://www.betclic.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    rating: 5,
    logo: "/images/logos/betclic.png",
    highlight: true,
  },
  {
    id: "winamax",
    name: "Winamax",
    slug: "winamax",
    bonus: "100€ offerts",
    bonusDetail: "sur votre 1er pari",
    url: "https://www.winamax.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    rating: 5,
    logo: "/images/logos/winamax.png",
    highlight: true,
  },
  {
    id: "parionssport",
    name: "Parions Sport",
    slug: "parions-sport",
    bonus: "90€ offerts",
    bonusDetail: "en freebets sans condition",
    url: "https://www.enligne.parionssport.fdj.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    rating: 4,
    logo: "/images/logos/parionssport.png",
    highlight: false,
  },
  {
    id: "unibet",
    name: "Unibet",
    slug: "unibet",
    bonus: "100€ offerts",
    bonusDetail: "en paris gratuits",
    url: "https://www.unibet.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    rating: 4,
    logo: "/images/logos/unibet.png",
    highlight: false,
  },
  {
    id: "zebet",
    name: "ZEbet",
    slug: "zebet",
    bonus: "150€ offerts",
    bonusDetail: "sur votre 1er pari",
    url: "https://www.zebet.fr/?utm_source=mondial2026&utm_medium=affiliate&utm_campaign=cdm2026",
    rating: 4,
    logo: "/images/logos/zebet.png",
    highlight: false,
  },
];

export const featuredBookmaker = bookmakers.find((b) => b.id === "betclic")!;
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
