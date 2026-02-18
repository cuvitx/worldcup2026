import Link from "next/link";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import type { Team, Match, MatchPrediction, Stadium, City, Bookmaker } from "@repo/data";
import type { MatchPreviewData } from "@repo/ai/generators";
import { teamsById } from "@repo/data/teams";

interface PredictionSidebarProps {
  prediction: MatchPrediction | undefined;
  odds: { home: string; draw: string; away: string } | null;
  home: Team | undefined;
  away: Team | undefined;
  match: Match;
  stadium: Stadium | undefined;
  city: City | null;
  homeName: string;
  awayName: string;
  enriched: MatchPreviewData | null;
  featuredBookmaker: Bookmaker;
  relatedMatches: Match[];
}

export function PredictionSidebar({
  prediction,
  odds,
  home,
  away,
  match,
  stadium,
  city,
  homeName,
  awayName,
  enriched,
  featuredBookmaker,
  relatedMatches,
}: PredictionSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Match info card */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">Resumen del pronostico</h3>
        {prediction ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Favorito</span>
              <span className="font-semibold">
                {prediction.team1WinProb > prediction.team2WinProb
                  ? homeName
                  : prediction.team2WinProb > prediction.team1WinProb
                    ? awayName
                    : "Indeciso"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Resultado predicho</span>
              <span className="font-bold text-primary">
                {prediction.predictedScore}
              </span>
            </div>
            {odds && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cuota 1</span>
                  <span className="font-semibold">{odds.home}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cuota X</span>
                  <span className="font-semibold">{odds.draw}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cuota 2</span>
                  <span className="font-semibold">{odds.away}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Los pronosticos detallados para este partido estaran disponibles
            proximamente.
          </p>
        )}
      </div>

      {/* Team links */}
      {home && away && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Fichas de equipos</h3>
          <div className="space-y-3">
            <Link
              href={`/equipo/${home.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
            >
              <span className="text-xl">{home.flag}</span>
              <span className="font-medium">{home.name}</span>
            </Link>
            <Link
              href={`/equipo/${away.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
            >
              <span className="text-xl">{away.flag}</span>
              <span className="font-medium">{away.name}</span>
            </Link>
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
            >
              <span className="text-xl">&#9878;</span>
              <span className="font-medium">
                H2H {home.name} vs {away.name}
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Stadium card */}
      {stadium && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Sede del partido</h3>
          <Link
            href={`/estadio/${stadium.slug}`}
            className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
          >
            <p className="font-semibold">{stadium.name}</p>
            <p className="text-sm text-gray-500">
              {stadium.capacity.toLocaleString("es-ES")} plazas &middot;{" "}
              {stadium.city}
            </p>
          </Link>
          {city && (
            <Link
              href={`/ciudad/${city.slug}`}
              className="mt-2 block text-sm text-accent hover:underline"
            >
              Guia de {city.name} &rarr;
            </Link>
          )}
        </div>
      )}

      {/* Weather */}
      {enriched?.weather && (
        <WeatherWidget
          temperature={enriched.weather.temperature}
          condition={enriched.weather.condition}
          humidity={enriched.weather.humidity}
          windSpeed={enriched.weather.windSpeed}
          locale="es"
        />
      )}

      {/* Injuries */}
      {enriched?.sources.hasInjuries && home && away && (
        <InjuriesWidget
          homeTeam={home.name}
          awayTeam={away.name}
          homeInjuries={enriched.injuries.home}
          awayInjuries={enriched.injuries.away}
          locale="es"
        />
      )}

      {/* Live Odds */}
      {enriched?.sources.hasLiveOdds && home && away && (
        <OddsCompare
          odds={enriched.odds}
          homeTeam={home.name}
          awayTeam={away.name}
          locale="es"
        />
      )}

      {/* Sidebar CTA */}
      <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
        <h3 className="mb-2 text-lg font-bold text-accent">
          Apostar en este partido
        </h3>
        <p className="mb-3 text-sm text-gray-600">
          {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
        </p>
        <a
          href={featuredBookmaker.url}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="block w-full rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-accent/90 transition-colors"
        >
          Apostar en {featuredBookmaker.name} &rarr;
        </a>
        <p className="mt-2 text-xs text-gray-400 text-center">
          +18 | Apuesta con responsabilidad
        </p>
      </div>

      {/* Otros pronosticos */}
      {relatedMatches.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Otros pronosticos</h3>
          <div className="space-y-2">
            {relatedMatches.map((rm) => {
              const rmHome = teamsById[rm.homeTeamId];
              const rmAway = teamsById[rm.awayTeamId];
              return (
                <Link
                  key={rm.id}
                  href={`/pronostico-partido/${rm.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm transition-colors hover:border-accent"
                >
                  <span>
                    {rmHome?.flag ?? "\ud83c\udff3\ufe0f"}{" "}
                    {rmHome?.name ?? "TBD"} vs{" "}
                    {rmAway?.name ?? "TBD"}{" "}
                    {rmAway?.flag ?? "\ud83c\udff3\ufe0f"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {rm.date}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Link to match page */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <Link
          href={`/match/${match.slug}`}
          className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-primary/90 transition-colors"
        >
          Ver la ficha completa del partido &rarr;
        </Link>
      </div>
    </div>
  );
}
