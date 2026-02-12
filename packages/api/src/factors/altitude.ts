// ============================================================================
// Altitude Impact — Affects oxygen, ball physics, and player stamina
// Estadio Azteca (Mexico City) is at 2,240m — the highest WC 2026 venue.
// ============================================================================

/** Altitude in meters for each WC 2026 stadium */
export const venueAltitudes: Record<string, number> = {
  // Mexico — high altitude
  "estadio-azteca": 2240,
  "estadio-akron": 1566,
  "estadio-bbva": 532,
  "estadio-de-la-ciudad-de-los-deportes": 2240,
  // USA — mostly near sea level
  "metlife-stadium": 10,
  "att-stadium": 170,
  "hard-rock-stadium": 3,
  "sofi-stadium": 30,
  "arrowhead-stadium": 260,
  "nrg-stadium": 15,
  "lincoln-financial-field": 12,
  "mercedes-benz-stadium": 320,
  "lumen-field": 5,
  "gillette-stadium": 60,
  "levi-stadium": 15,
  // Canada
  "bmo-field": 76,
};

export interface AltitudeImpact {
  altitude: number;
  level: "none" | "low" | "medium" | "high";
  description: string;
  /** Performance multiplier: 1.0 = no effect, < 1.0 = disadvantage for visiting team */
  visitorPenalty: number;
}

/**
 * Calculate altitude impact for a match at a specific stadium.
 * Teams from high-altitude countries (Mexico, Colombia, etc.) are less affected.
 */
export function getAltitudeImpact(stadiumSlug: string): AltitudeImpact {
  const altitude = venueAltitudes[stadiumSlug] ?? 0;

  if (altitude > 2000) {
    return {
      altitude,
      level: "high",
      description: `Very high altitude (${altitude}m). Significant impact on oxygen levels, ball speed, and player stamina. Teams not accustomed to altitude will struggle in the second half.`,
      visitorPenalty: 0.85,
    };
  }

  if (altitude > 1500) {
    return {
      altitude,
      level: "medium",
      description: `Moderate altitude (${altitude}m). Noticeable reduction in oxygen. Players may tire faster, especially in extra time.`,
      visitorPenalty: 0.92,
    };
  }

  if (altitude > 500) {
    return {
      altitude,
      level: "low",
      description: `Low altitude (${altitude}m). Minimal impact on performance.`,
      visitorPenalty: 0.97,
    };
  }

  return {
    altitude,
    level: "none",
    description: "Near sea level. No altitude impact.",
    visitorPenalty: 1.0,
  };
}
