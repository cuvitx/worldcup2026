import { Card } from "@repo/ui/card";
import { DataRow } from "@repo/ui/data-row";
import { WeatherWidget } from "@repo/ui/weather-widget";
import { OddsCompare } from "@repo/ui/odds-compare";
import { InjuriesWidget } from "@repo/ui/injuries-widget";
import Link from "next/link";
import type { Team } from "@repo/data/types";
import type { Stadium } from "@repo/data/types";
import type { City } from "@repo/data/types";
import type { generateFullMatchPreview } from "@repo/ai/generators";

interface MatchSidebarProps {
  stadium: Stadium | undefined;
  city: City | null;
  stage: string;
  match: {
    group?: string;
    matchday?: number;
    date: string;
    time: string;
  };
  dateFormatted: string;
  home: Team | undefined;
  away: Team | undefined;
  enriched: Awaited<ReturnType<typeof generateFullMatchPreview>> | null;
}

export function MatchSidebar({
  stadium,
  city,
  stage,
  match,
  dateFormatted,
  home,
  away,
  enriched,
}: MatchSidebarProps) {
  return (
    <div className="space-y-6">
      {stadium && (
        <Card hover padding="md">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Lieu du match
          </h3>
          <Link
            href={`/stade/${stadium.slug}`}
            className="block rounded-lg border border-gray-200 dark:border-slate-700 p-3 transition-colors hover:border-primary/30"
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
        </Card>
      )}

      <Card hover padding="md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Infos match
        </h3>
        <dl className="space-y-3 text-sm">
          <DataRow label="Phase" value={stage} />
          {match.group && (
            <DataRow label="Groupe">
              <Link
                href={`/groupe/${match.group.toLowerCase()}`}
                className="text-primary hover:underline"
              >
                Groupe {match.group}
              </Link>
            </DataRow>
          )}
          {match.matchday && <DataRow label="Journée" value={`J${match.matchday}`} />}
          <DataRow label="Date" value={dateFormatted} />
          <DataRow label="Heure (UTC)" value={match.time} />
        </dl>
      </Card>

      {enriched?.weather && (
        <WeatherWidget
          temperature={enriched.weather.temperature}
          condition={enriched.weather.condition}
          humidity={enriched.weather.humidity}
          windSpeed={enriched.weather.windSpeed}
          locale="fr"
        />
      )}

      {enriched?.sources.hasInjuries && home && away && (
        <InjuriesWidget
          homeTeam={home.name}
          awayTeam={away.name}
          homeInjuries={enriched.injuries.home}
          awayInjuries={enriched.injuries.away}
          locale="fr"
        />
      )}

      {enriched?.sources.hasLiveOdds && home && away ? (
        <OddsCompare
          odds={enriched.odds}
          homeTeam={home.name}
          awayTeam={away.name}
          locale="fr"
        />
      ) : (
        <div className="rounded-xl bg-primary/5 border border-primary/20 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Cotes du match
          </h3>
          <p className="text-sm text-gray-600">
            Les cotes des bookmakers pour ce match seront disponibles
            prochainement.
          </p>
        </div>
      )}
    </div>
  );
}
