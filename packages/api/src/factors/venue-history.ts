// ============================================================================
// Venue History — Historical performance context for WC 2026 stadiums
// ============================================================================

interface VenueInfo {
  name: string;
  previousWorldCupMatches: number;
  hostCountryAdvantage: boolean;
  roofType: "open" | "retractable" | "fixed";
  surfaceType: "natural" | "hybrid" | "artificial";
  notes: string;
}

/** Context information for WC 2026 venues */
export const venueHistory: Record<string, VenueInfo> = {
  "estadio-azteca": {
    name: "Estadio Azteca",
    previousWorldCupMatches: 19,
    hostCountryAdvantage: true,
    roofType: "open",
    surfaceType: "hybrid",
    notes: "Iconic venue — hosted 2 WC finals (1970, 1986). Highest altitude venue (2,240m). Mexico's fortress with 87,523 capacity.",
  },
  "metlife-stadium": {
    name: "MetLife Stadium",
    previousWorldCupMatches: 0,
    hostCountryAdvantage: true,
    roofType: "open",
    surfaceType: "natural",
    notes: "Largest WC 2026 venue (82,500). Will host the Final. Open-air stadium in East Rutherford, NJ.",
  },
  "att-stadium": {
    name: "AT&T Stadium",
    previousWorldCupMatches: 0,
    hostCountryAdvantage: true,
    roofType: "retractable",
    surfaceType: "artificial",
    notes: "Retractable roof — weather-neutral. 80,000 capacity. Massive video board may affect visiting teams.",
  },
  "hard-rock-stadium": {
    name: "Hard Rock Stadium",
    previousWorldCupMatches: 0,
    hostCountryAdvantage: true,
    roofType: "open",
    surfaceType: "natural",
    notes: "Miami heat and humidity can be a significant factor. Partial canopy offers some shade. 65,326 capacity.",
  },
  "sofi-stadium": {
    name: "SoFi Stadium",
    previousWorldCupMatches: 0,
    hostCountryAdvantage: true,
    roofType: "fixed",
    surfaceType: "natural",
    notes: "Fixed roof eliminates weather factor. State-of-the-art facility in Los Angeles. 70,240 capacity.",
  },
};

/**
 * Get venue context for a specific stadium.
 * Returns null if no venue history is available.
 */
export function getVenueContext(stadiumSlug: string): VenueInfo | null {
  return venueHistory[stadiumSlug] ?? null;
}

/**
 * Check if a stadium has a roof (eliminates weather impact).
 */
export function isWeatherProtected(stadiumSlug: string): boolean {
  const venue = venueHistory[stadiumSlug];
  return venue?.roofType === "fixed" || venue?.roofType === "retractable";
}
