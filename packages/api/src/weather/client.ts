// ============================================================================
// OpenWeatherMap Client — Match day weather forecasts
// Uses stadium coordinates from @repo/data to fetch forecasts.
// ============================================================================

import { OPENWEATHER } from "../config";
import { cachedFetch, CACHE_TTL } from "../cache";

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

interface OwmOneCallResponse {
  daily?: Array<{
    dt: number;
    temp: { day: number; min: number; max: number };
    feels_like: { day: number };
    humidity: number;
    wind_speed: number;
    pop: number;
    uvi: number;
    weather: Array<{ main: string; icon: string }>;
  }>;
  current?: {
    temp: number;
    feels_like: number;
    humidity: number;
    wind_speed: number;
    uvi: number;
    weather: Array<{ main: string; icon: string }>;
  };
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

  const cacheKey = `weather:${lat.toFixed(2)},${lon.toFixed(2)}:${matchDate}`;

  return cachedFetch(cacheKey, CACHE_TTL.WEATHER, async () => {
    const url = new URL(`${OPENWEATHER.baseUrl}/onecall`);
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
    url.searchParams.set("appid", OPENWEATHER.key);
    url.searchParams.set("units", "metric");
    url.searchParams.set("exclude", "minutely,hourly,alerts");

    const res = await fetch(url.toString());
    if (!res.ok) {
      console.error(`[weather] ${res.status} ${res.statusText}`);
      return null;
    }

    const data = (await res.json()) as OwmOneCallResponse;

    // Try to find the matching day in the forecast
    const matchTimestamp = new Date(matchDate).getTime() / 1000;
    const dayForecast = data.daily?.find((d) => {
      const dayStart = d.dt - 43200; // noon minus 12h
      const dayEnd = d.dt + 43200;
      return matchTimestamp >= dayStart && matchTimestamp <= dayEnd;
    });

    if (dayForecast) {
      return {
        temperature: dayForecast.temp.day,
        feelsLike: dayForecast.feels_like.day,
        humidity: dayForecast.humidity,
        windSpeed: dayForecast.wind_speed,
        precipProbability: dayForecast.pop,
        condition: dayForecast.weather[0]?.main ?? "Unknown",
        conditionIcon: dayForecast.weather[0]?.icon ?? "",
        uvIndex: dayForecast.uvi,
      };
    }

    // If match is today, use current weather
    if (data.current) {
      return {
        temperature: data.current.temp,
        feelsLike: data.current.feels_like,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_speed,
        precipProbability: 0,
        condition: data.current.weather[0]?.main ?? "Unknown",
        conditionIcon: data.current.weather[0]?.icon ?? "",
        uvIndex: data.current.uvi,
      };
    }

    return null;
  });
}
