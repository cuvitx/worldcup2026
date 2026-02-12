// ============================================================================
// Travel Fatigue & Jet Lag Impact
// Calculates fatigue based on timezone difference and rest days.
// ============================================================================

/** Timezone offsets (UTC) for WC 2026 host cities */
export const cityTimezones: Record<string, number> = {
  // USA Eastern (UTC-5)
  "new-york-new-jersey": -5,
  miami: -5,
  philadelphia: -5,
  "boston-foxborough": -5,
  atlanta: -5,
  // USA Central (UTC-6)
  "dallas-fort-worth": -6,
  houston: -6,
  "kansas-city": -6,
  // USA Pacific (UTC-8)
  "los-angeles": -8,
  "san-francisco-bay-area": -8,
  seattle: -8,
  // Mexico (UTC-6)
  "mexico-city": -6,
  guadalajara: -6,
  monterrey: -6,
  // Canada Eastern (UTC-5)
  toronto: -5,
};

/** Approximate home timezone for each confederation */
export const confederationTimezones: Record<string, number> = {
  UEFA: 1, // Central Europe average
  CONMEBOL: -3, // South America average
  CONCACAF: -6, // Central/North America average
  CAF: 1, // Africa average
  AFC: 5, // Asia average
  OFC: 12, // Oceania average
};

export interface TravelFatigue {
  timezoneGap: number;
  level: "none" | "low" | "medium" | "high";
  description: string;
  /** Days needed to fully adjust (rule of thumb: 1 day per hour of timezone change) */
  adjustmentDays: number;
  /** Performance penalty: 1.0 = no effect, < 1.0 = disadvantage */
  performancePenalty: number;
}

/**
 * Calculate travel fatigue for a team playing in a specific city.
 * @param teamConfederation - Team's confederation (UEFA, CONMEBOL, etc.)
 * @param citySlug - Host city slug
 * @param daysSinceArrival - How many days the team has been in the host city
 */
export function getTravelFatigue(
  teamConfederation: string,
  citySlug: string,
  daysSinceArrival = 7
): TravelFatigue {
  const cityTz = cityTimezones[citySlug] ?? -6;
  const homeTz = confederationTimezones[teamConfederation] ?? 0;
  const gap = Math.abs(cityTz - homeTz);
  const adjustmentDays = gap; // 1 day per hour rule

  // If team has been there long enough, jet lag is resolved
  const effectiveGap = Math.max(0, gap - daysSinceArrival);

  if (effectiveGap <= 1) {
    return {
      timezoneGap: gap,
      level: "none",
      description: gap === 0
        ? "Home timezone — no jet lag."
        : `${gap}h timezone difference, but well-adjusted after ${daysSinceArrival} days.`,
      adjustmentDays,
      performancePenalty: 1.0,
    };
  }

  if (effectiveGap <= 3) {
    return {
      timezoneGap: gap,
      level: "low",
      description: `${gap}h timezone difference. Minor residual fatigue (${effectiveGap}h unadjusted).`,
      adjustmentDays,
      performancePenalty: 0.97,
    };
  }

  if (effectiveGap <= 6) {
    return {
      timezoneGap: gap,
      level: "medium",
      description: `${gap}h timezone difference. Significant jet lag still affecting performance (${effectiveGap}h unadjusted).`,
      adjustmentDays,
      performancePenalty: 0.93,
    };
  }

  return {
    timezoneGap: gap,
    level: "high",
    description: `${gap}h timezone difference. Severe jet lag — peak performance unlikely (${effectiveGap}h unadjusted).`,
    adjustmentDays,
    performancePenalty: 0.88,
  };
}
