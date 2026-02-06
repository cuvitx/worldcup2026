// ============================================================================
// Affiliate Configuration — Sports Betting Partners
// Single source of truth for all CTA blocks across the site.
// Update this file to change bookmaker, bonus, or link across every page.
// ============================================================================

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
    url: "#betclic",
    rating: 5,
    highlight: true,
  },
  {
    id: "winamax",
    name: "Winamax",
    slug: "winamax",
    bonus: "100€ offerts",
    bonusDetail: "sur votre 1er pari",
    url: "#winamax",
    rating: 5,
    highlight: true,
  },
  {
    id: "parionssport",
    name: "Parions Sport",
    slug: "parions-sport",
    bonus: "90€ offerts",
    bonusDetail: "en freebets sans condition",
    url: "#parionssport",
    rating: 4,
    highlight: false,
  },
  {
    id: "unibet",
    name: "Unibet",
    slug: "unibet",
    bonus: "100€ offerts",
    bonusDetail: "en paris gratuits",
    url: "#unibet",
    rating: 4,
    highlight: false,
  },
  {
    id: "zebet",
    name: "ZEbet",
    slug: "zebet",
    bonus: "150€ offerts",
    bonusDetail: "sur votre 1er pari",
    url: "#zebet",
    rating: 4,
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
