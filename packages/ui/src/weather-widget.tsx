/**
 * Translations for weather widget.
 */
const translations = {
  fr: { title: "Meteo du match", humidity: "Humidite", wind: "Vent" },
  en: { title: "Match weather", humidity: "Humidity", wind: "Wind" },
  es: { title: "Clima del partido", humidity: "Humedad", wind: "Viento" },
};

/**
 * Props for the WeatherWidget component.
 * 
 * @param temperature - Temperature in Celsius
 * @param condition - Weather condition (e.g., "Clear", "Rain", "Clouds")
 * @param humidity - Humidity percentage
 * @param windSpeed - Wind speed in km/h
 * @param locale - UI language: "fr" | "en" | "es" (default: "fr")
 */
interface WeatherWidgetProps {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  locale?: "fr" | "en" | "es";
}

/**
 * Weather condition to emoji mapping.
 */
const conditionIcons: Record<string, string> = {
  Clear: "☀",
  Clouds: "☁",
  Rain: "🌧",
  Drizzle: "🌦",
  Thunderstorm: "⛈",
  Snow: "❄",
  Mist: "🌫",
  Fog: "🌫",
  Haze: "🌫",
};

/**
 * WeatherWidget component — Displays match-day weather forecast.
 * 
 * Shows temperature, condition icon, humidity, and wind speed.
 * 
 * @example
 * ```tsx
 * <WeatherWidget
 *   temperature={22}
 *   condition="Clear"
 *   humidity={65}
 *   windSpeed={12}
 *   locale="fr"
 * />
 * ```
 */
export function WeatherWidget({ temperature, condition, humidity, windSpeed, locale }: WeatherWidgetProps) {
  const t = translations[locale ?? "fr"];
  const icon = conditionIcons[condition] ?? "🌤";

  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-sky-50 dark:from-slate-800 dark:to-slate-700 p-4">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wide">
        {t.title}
      </h4>
      <div className="flex items-center gap-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.round(temperature)}°C</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{condition}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 dark:text-gray-500">💧</span>
          <span className="text-gray-600 dark:text-gray-300">{t.humidity}: {humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 dark:text-gray-500">💨</span>
          <span className="text-gray-600 dark:text-gray-300">{t.wind}: {Math.round(windSpeed)} km/h</span>
        </div>
      </div>
    </div>
  );
}
