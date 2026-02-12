interface WeatherWidgetProps {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const conditionIcons: Record<string, string> = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Fog: "🌫️",
  Haze: "🌫️",
};

export function WeatherWidget({ temperature, condition, humidity, windSpeed }: WeatherWidgetProps) {
  const icon = conditionIcons[condition] ?? "🌤️";

  return (
    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-sky-50 p-4">
      <h4 className="mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
        Meteo du match
      </h4>
      <div className="flex items-center gap-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <p className="text-2xl font-bold text-gray-900">{Math.round(temperature)}°C</p>
          <p className="text-sm text-gray-500">{condition}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400">💧</span>
          <span className="text-gray-600">Humidite: {humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400">💨</span>
          <span className="text-gray-600">Vent: {Math.round(windSpeed)} km/h</span>
        </div>
      </div>
    </div>
  );
}
