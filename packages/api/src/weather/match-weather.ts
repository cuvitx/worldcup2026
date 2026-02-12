// ============================================================================
// Match Weather Impact Analysis
// Evaluates how weather conditions affect match dynamics.
// ============================================================================

import type { WeatherForecast } from "./client";

export interface WeatherImpact {
  level: "none" | "low" | "medium" | "high";
  factors: string[];
  favoredStyle: "technical" | "physical" | "neutral";
}

/**
 * Analyze how weather + altitude affect a match.
 * @param weather - Weather forecast for the match
 * @param altitudeMeters - Stadium altitude in meters (e.g. Estadio Azteca = 2240m)
 */
export function getWeatherImpact(
  weather: WeatherForecast | null,
  altitudeMeters: number
): WeatherImpact {
  const factors: string[] = [];
  let level: WeatherImpact["level"] = "none";
  let favoredStyle: WeatherImpact["favoredStyle"] = "neutral";

  // Altitude impact (>1500m is significant, >2000m is major)
  if (altitudeMeters > 2000) {
    factors.push(`High altitude (${altitudeMeters}m) — reduced oxygen, ball travels faster`);
    level = "high";
    favoredStyle = "physical"; // Teams used to altitude have advantage
  } else if (altitudeMeters > 1500) {
    factors.push(`Moderate altitude (${altitudeMeters}m) — slight oxygen reduction`);
    level = level === "none" ? "low" : level;
  }

  if (!weather) {
    return { level, factors, favoredStyle };
  }

  // Extreme heat (>35C)
  if (weather.temperature > 35) {
    factors.push(`Extreme heat (${weather.temperature}°C) — fatigue risk, hydration breaks likely`);
    level = "high";
    favoredStyle = "technical"; // Slower pace favors technical teams
  } else if (weather.temperature > 30) {
    factors.push(`Hot conditions (${weather.temperature}°C) — increased fatigue`);
    level = level === "none" ? "medium" : level;
  } else if (weather.temperature < 5) {
    factors.push(`Cold conditions (${weather.temperature}°C) — muscle injury risk`);
    level = level === "none" ? "low" : level;
  }

  // Heavy rain
  if (weather.precipProbability > 0.7) {
    factors.push("High rain probability — slippery pitch, reduced ball control");
    level = level === "none" ? "medium" : level;
    favoredStyle = favoredStyle === "neutral" ? "physical" : favoredStyle;
  } else if (weather.precipProbability > 0.4) {
    factors.push("Moderate rain probability — pitch may be wet");
    level = level === "none" ? "low" : level;
  }

  // Strong wind
  if (weather.windSpeed > 10) {
    factors.push(`Strong wind (${weather.windSpeed} m/s) — affects long passes and set pieces`);
    level = level === "none" ? "medium" : level;
  } else if (weather.windSpeed > 6) {
    factors.push(`Moderate wind (${weather.windSpeed} m/s) — may affect aerial play`);
    level = level === "none" ? "low" : level;
  }

  // High UV
  if (weather.uvIndex > 8) {
    factors.push(`Very high UV (${weather.uvIndex}) — player discomfort, visibility challenges`);
    level = level === "none" ? "low" : level;
  }

  // High humidity
  if (weather.humidity > 85) {
    factors.push(`High humidity (${weather.humidity}%) — accelerated fatigue`);
    level = level === "none" ? "medium" : level;
  }

  return { level, factors, favoredStyle };
}
