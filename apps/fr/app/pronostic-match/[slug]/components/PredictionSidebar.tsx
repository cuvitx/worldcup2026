import Link from "next/link";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import type { Team, Match, MatchPrediction, Stadium, City, Bookmaker } from "@repo/data";
import type { MatchPreviewData } from "@repo/ai/generators";
import { affiliateLinkAttributes, pmuTrackingUrl } from "@repo/data/affiliates";
import { BetOfTheDay } from "../../../components/BetOfTheDay";
import type { RelatedPronosticMatch } from "../_components/RelatedMatchesSection";

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
  relatedMatches: RelatedPronosticMatch[];
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
  const matchSidebarTracking = {
    pageType: "pronostic-match",
    slug: match.slug,
    placement: "sidebar",
  };

  return (
    <div className="space-y-6">
      {/* Pari du jour — widget compact */}
      <BetOfTheDay compact />

      {/* Match info card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume du pronostic</h3>
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
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fiches équipes</h3>
          <div className="space-y-3">
            <Link
              href={`/equipe/${home.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
            >
              <span className="text-xl" role="img" aria-label={`Drapeau de ${home.name}`}>{home.flag}</span>
              <span className="font-medium">{home.name}</span>
            </Link>
            <Link
              href={`/equipe/${away.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
            >
              <span className="text-xl" role="img" aria-label={`Drapeau de ${away.name}`}>{away.flag}</span>
              <span className="font-medium">{away.name}</span>
            </Link>
            <Link
              href={`/h2h/${home.slug}-vs-${away.slug}`}
              className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
            >
              <span className="font-medium">
                H2H {home.name} vs {away.name}
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Stadium card */}
      {stadium && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lieu du match</h3>
          <Link
            href={`/stade/${stadium.slug}`}
            className="block rounded-lg border border-gray-200 p-3 transition-colors hover:border-primary/30"
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
              className="mt-2 block text-sm text-primary hover:underline"
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
      <div className="rounded-xl overflow-hidden border border-[#d4af37]/25 text-white" style={{ background: "linear-gradient(135deg, #041511 0%, #0c3b2e 40%, #1a6e4f 100%)" }}>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Parier sur ce match
          </h3>
          <p className="mb-3 text-sm text-white/70">
            {featuredBookmaker.bonus} {featuredBookmaker.bonusDetail}
          </p>
          <a
            href={pmuTrackingUrl(matchSidebarTracking)}
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            {...affiliateLinkAttributes(matchSidebarTracking)}
            className="block w-full rounded-xl px-4 py-3.5 text-center text-sm font-bold text-[#0c3b2e] hover:brightness-110 transition"
            style={{ background: "linear-gradient(90deg, #b8941f, #d4af37, #e5c453, #d4af37, #b8941f)" }}
          >
            Parier sur PMU Play &rarr;
          </a>
          <p className="mt-2 text-xs text-white/50 text-center">
            18+ | Pariez responsablement
          </p>
        </div>
      </div>

      {/* Autres pronostics */}
      {relatedMatches.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Autres pronostics</h3>
          <div className="space-y-2">
            {relatedMatches.map((rm) => {
              return (
                <Link
                  key={rm.match.id}
                  href={`/pronostic-match/${rm.match.slug}`}
                  className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 p-3 text-sm transition-colors hover:border-primary/30"
                >
                  <span className="min-w-0 truncate">
                    {rm.home?.flag && (
                      <>
                        <span role="img" aria-label={`Drapeau de ${rm.homeName}`}>{rm.home.flag}</span>{" "}
                      </>
                    )}
                    {rm.homeName} vs {rm.awayName}{" "}
                    {rm.away?.flag && (
                      <span role="img" aria-label={`Drapeau de ${rm.awayName}`}>{rm.away.flag}</span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500 shrink-0">
                    {rm.match.date}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Link to match page */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md transition-shadow">
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
