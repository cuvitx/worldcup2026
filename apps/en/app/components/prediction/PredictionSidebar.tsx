import Link from "next/link";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import { featuredBookmaker } from "@repo/data/affiliates";
import { teamsById } from "@repo/data/teams";
import type { Team, Match, Stadium, City } from "@repo/data/types";
import type { MatchPrediction } from "@repo/data/predictions";
import type { MatchPreviewData } from "@repo/ai/generators";

interface PredictionSidebarProps {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
  stadium: Stadium | undefined;
  city: City | null;
  prediction: MatchPrediction | undefined;
  odds: { home: string; draw: string; away: string } | null;
  enriched: MatchPreviewData | null;
  homeName: string;
  awayName: string;
  relatedMatches: Match[];
}

export function PredictionSidebar({
  match,
  home,
  away,
  stadium,
  city,
  prediction,
  odds,
  enriched,
  homeName,
  awayName,
  relatedMatches,
}: PredictionSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Prediction Summary */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">Prediction Summary</h3>
        {prediction ? (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Favourite</span>
              <span className="font-semibold">
                {prediction.team1WinProb > prediction.team2WinProb
                  ? homeName
                  : prediction.team2WinProb > prediction.team1WinProb
                    ? awayName
                    : "Undecided"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Predicted score</span>
              <span className="font-bold text-primary">
                {prediction.predictedScore}
              </span>
            </div>
            {odds && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Odds 1</span>
                  <span className="font-semibold">{odds.home}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Odds X</span>
                  <span className="font-semibold">{odds.draw}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Odds 2</span>
                  <span className="font-semibold">{odds.away}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            Detailed predictions for this match will be available
            soon.
          </p>
        )}
      </div>

      {/* Team Profiles */}
      {home && away && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Team Profiles</h3>
          <div className="space-y-3">
            <Link
              href={`/team/${home.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
            >
              <span className="text-xl">{home.flag}</span>
              <span className="font-medium">{home.name}</span>
            </Link>
            <Link
              href={`/team/${away.slug}`}
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

      {/* Match Venue */}
      {stadium && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Match Venue</h3>
          <Link
            href={`/stadium/${stadium.slug}`}
            className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-accent"
          >
            <p className="font-semibold">{stadium.name}</p>
            <p className="text-sm text-gray-500">
              {stadium.capacity.toLocaleString("en-US")} seats &middot;{" "}
              {stadium.city}
            </p>
          </Link>
          {city && (
            <Link
              href={`/city/${city.slug}`}
              className="mt-2 block text-sm text-accent hover:underline"
            >
              {city.name} city guide &rarr;
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
          locale="en"
        />
      )}

      {/* Injuries */}
      {enriched?.sources.hasInjuries && home && away && (
        <InjuriesWidget
          homeTeam={home.name}
          awayTeam={away.name}
          homeInjuries={enriched.injuries.home}
          awayInjuries={enriched.injuries.away}
          locale="en"
        />
      )}

      {/* Live Odds */}
      {enriched?.sources.hasLiveOdds && home && away && (
        <OddsCompare
          odds={enriched.odds}
          homeTeam={home.name}
          awayTeam={away.name}
          locale="en"
        />
      )}

      {/* Sidebar CTA */}
      <div className="rounded-lg bg-accent/5 border border-accent/20 p-6">
        <h3 className="mb-2 text-lg font-bold text-accent">
          Bet on this match
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
          Bet on {featuredBookmaker.name} &rarr;
        </a>
        <p className="mt-2 text-xs text-gray-400 text-center">
          18+ | Bet responsibly
        </p>
      </div>

      {/* Other Predictions */}
      {relatedMatches.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold">Other Predictions</h3>
          <div className="space-y-2">
            {relatedMatches.map((rm) => {
              const rmHome = teamsById[rm.homeTeamId];
              const rmAway = teamsById[rm.awayTeamId];
              return (
                <Link
                  key={rm.id}
                  href={`/prediction-match/${rm.slug}`}
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
          View full match details &rarr;
        </Link>
      </div>
    </div>
  );
}
