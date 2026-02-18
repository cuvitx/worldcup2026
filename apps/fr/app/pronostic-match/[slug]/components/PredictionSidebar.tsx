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
        <h3 className="mb-4 text-lg font-bold">Resume du pronostic</h3>
        {prediction ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Favori</span>
              <span className="font-semibold">
                {prediction.team1WinProb > prediction.team2WinProb
                  ? homeName
                  : prediction.team2WinProb > prediction.team1WinProb
                    ? awayName
                    : "Indecis"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Score predit</span>
              <span className="font-bold text-primary">
                {prediction.predictedScore}
              </span>
            </div>
            {odds && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cote 1</span>
                  <span className="font-semibold">{odds.home}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cote N</span>
                  <span className="font-semibold">{odds.draw}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Cote 2</span>
                  <span className="font-semibold">{odds.away}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Les pronostics détaillés pour ce match seront disponibles
            prochainement.
          </p>
        )}
      </div>

      {/* Team links */}
      {home && away && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Fiches équipes</h3>
          <div className="space-y-3">
            <Link
              href={`/equipe/${home.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
            >
              <span className="text-xl" role="img" aria-label={`Drapeau de ${home.name}`}>{home.flag}</span>
              <span className="font-medium">{home.name}</span>
            </Link>
            <Link
              href={`/equipe/${away.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
            >
              <span className="text-xl" role="img" aria-label={`Drapeau de ${away.name}`}>{away.flag}</span>
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
          <h3 className="mb-4 text-lg font-bold">Lieu du match</h3>
          <Link
            href={`/stade/${stadium.slug}`}
            className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
          >
            <p className="font-semibold">{stadium.name}</p>
            <p className="text-sm text-gray-500">
              {stadium.capacity.toLocaleString("fr-FR")} places &middot;{" "}
              {stadium.city}
            </p>
          </Link>
          {city && (
            <Link
              href={`/ville/${city.slug}`}
              className="mt-2 block text-sm text-accent hover:underline"
            >
              Guide de {city.name} &rarr;
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
          locale="fr"
        />
      )}

      {/* Injuries */}
      {enriched?.sources.hasInjuries && home && away && (
        <InjuriesWidget
          homeTeam={home.name}
          awayTeam={away.name}
          homeInjuries={enriched.injuries.home}
          awayInjuries={enriched.injuries.away}
          locale="fr"
        />
      )}

      {/* Live Odds */}
      {enriched?.sources.hasLiveOdds && home && away && (
        <OddsCompare
          odds={enriched.odds}
          homeTeam={home.name}
          awayTeam={away.name}
          locale="fr"
        />
      )}

      {/* Sidebar CTA */}
      <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
        <h3 className="mb-2 text-lg font-bold text-accent">
          Parier sur ce match
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
          Parier sur {featuredBookmaker.name} &rarr;
        </a>
        <p className="mt-2 text-xs text-gray-500 text-center">
          18+ | Pariez responsablement
        </p>
      </div>

      {/* Autres pronostics */}
      {relatedMatches.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Autres pronostics</h3>
          <div className="space-y-2">
            {relatedMatches.map((rm) => {
              const rmHome = teamsById[rm.homeTeamId];
              const rmAway = teamsById[rm.awayTeamId];
              return (
                <Link
                  key={rm.id}
                  href={`/pronostic-match/${rm.slug}`}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-3 text-sm transition-colors hover:border-accent"
                >
                  <span>
                    <span role="img" aria-label={`Drapeau de ${rmHome?.name ?? "Inconnu"}`}>{rmHome?.flag ?? "\ud83c\udff3\ufe0f"}</span>{" "}
                    {rmHome?.name ?? "TBD"} vs{" "}
                    {rmAway?.name ?? "TBD"}{" "}
                    <span role="img" aria-label={`Drapeau de ${rmAway?.name ?? "Inconnu"}`}>{rmAway?.flag ?? "\ud83c\udff3\ufe0f"}</span>
                  </span>
                  <span className="text-xs text-gray-500">
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
          Voir la fiche complète du match &rarr;
        </Link>
      </div>
    </div>
  );
}
