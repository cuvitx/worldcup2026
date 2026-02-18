// ============================================================================
// OpenWeatherMap Client — Match day weather forecasts
// Uses stadium coordinates from @repo/data to fetch forecasts.
// Uses the free 2.5 API (forecast endpoint for 5-day/3h forecasts).
// ============================================================================

import { OPENWEATHER } from "../config";
import { cachedFetch, CACHE_TTL } from "../cache";
import { checkRateLimit } from "../rate-limiter";

export interface WeatherForecast {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipProbability: number;
  condition: string;
  conditionIcon: string;
  uvIndex: number;
}

interface OwmForecastResponse {
  list?: Array<{
    dt: number;
    main: { temp: number; feels_like: number; humidity: number };
    wind: { speed: number };
    pop: number;
    weather: Array<{ main: string; icon: string }>;
  }>;
}

interface OwmCurrentResponse {
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  weather: Array<{ main: string; icon: string }>;
}

/** Fetch weather forecast for a specific location and date */
export async function getWeatherForecast(
  lat: number,
  lon: number,
  matchDate: string
): Promise<WeatherForecast | null> {
  if (!OPENWEATHER.key) {
    console.warn("[weather] No API key configured, skipping forecast");
    return null;
  }

  if (!checkRateLimit("openweather", { maxRequests: 1000, windowMs: 24 * 60 * 60 * 1000 })) {
    console.warn("[weather] Daily rate limit reached");
    return null;
  }

  const cacheKey = `weather:${lat.toFixed(2)},${lon.toFixed(2)}:${matchDate}`;

  return cachedFetch(cacheKey, CACHE_TTL.WEATHER, async () => {
    const matchTimestamp = new Date(matchDate).getTime() / 1000;
    const now = Date.now() / 1000;
    const daysUntilMatch = (matchTimestamp - now) / 86400;

    // If match is within 5 days, use the forecast endpoint
    if (daysUntilMatch > 0 && daysUntilMatch <= 5) {
      try {
        const url = new URL(`${OPENWEATHER.baseUrl}/forecast`);
        url.searchParams.set("lat", String(lat));
        url.searchParams.set("lon", String(lon));
        url.searchParams.set("appid", OPENWEATHER.key);
        url.searchParams.set("units", "metric");

        const res = await fetch(url.toString());
        if (!res.ok) {
          console.error(`[weather] Forecast ${res.status} ${res.statusText}`);
          return null;
        }

        const data = (await res.json()) as OwmForecastResponse;

        // Find the closest 3h slot to the match time
        const closest = data.list?.reduce((prev, curr) =>
          Math.abs(curr.dt - matchTimestamp) < Math.abs(prev.dt - matchTimestamp) ? curr : prev
        );

        if (closest) {
          return {
            temperature: Math.round(closest.main.temp),
            feelsLike: Math.round(closest.main.feels_like),
            humidity: closest.main.humidity,
            windSpeed: Math.round(closest.wind.speed * 3.6), // m/s → km/h
            precipProbability: closest.pop,
            condition: closest.weather[0]?.main ?? "Unknown",
            conditionIcon: closest.weather[0]?.icon ?? "",
            uvIndex: 0, // Not available in free API
          };
        }
      } catch (error) {
        console.error("[weather] Forecast fetch failed:", error instanceof Error ? error.message : error);
      }
    }

    // Fallback: use current weather (for today's matches or when forecast unavailable)
    try {
      const url = new URL(`${OPENWEATHER.baseUrl}/weather`);
      url.searchParams.set("lat", String(lat));
      url.searchParams.set("lon", String(lon));
      url.searchParams.set("appid", OPENWEATHER.key);
      url.searchParams.set("units", "metric");

      const res = await fetch(url.toString());
      if (!res.ok) {
        console.error(`[weather] Current ${res.status} ${res.statusText}`);
        return null;
      }

      const data = (await res.json()) as OwmCurrentResponse;

      return {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s → km/h
        precipProbability: 0,
        condition: data.weather[0]?.main ?? "Unknown",
        conditionIcon: data.weather[0]?.icon ?? "",
        uvIndex: 0,
      };
    } catch (error) {
      console.error("[weather] Current fetch failed:", error instanceof Error ? error.message : error);
      return null;
    }
  });
}
