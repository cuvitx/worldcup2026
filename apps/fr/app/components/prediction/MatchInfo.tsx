import Link from "next/link";
import type { Match, Stadium, City } from "@repo/data/types";

interface MatchInfoProps {
  match: Match;
  stadium: Stadium | undefined;
  city: City | null;
  stage: string;
  dateFormatted: string;
}

export function MatchInfo({
  match,
  stadium,
  city,
  stage,
  dateFormatted,
}: MatchInfoProps) {
  return (
    <section className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Informations du match</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Date</dt>
          <dd className="font-semibold">{dateFormatted}</dd>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Heure (UTC)</dt>
          <dd className="font-semibold">{match.time}</dd>
        </div>
        {stadium && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Stade</dt>
            <dd>
              <Link
                href={`/stade/${stadium.slug}`}
                className="font-semibold text-accent hover:underline"
              >
                {stadium.name}
              </Link>
              <p className="text-xs text-gray-500 mt-0.5">
                {stadium.capacity.toLocaleString("fr-FR")} places
              </p>
            </dd>
          </div>
        )}
        {city && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Ville</dt>
            <dd>
              <Link
                href={`/ville/${city.slug}`}
                className="font-semibold text-accent hover:underline"
              >
                {city.name}
              </Link>
              <p className="text-xs text-gray-500 mt-0.5">
                {stadium?.country}
              </p>
            </dd>
          </div>
        )}
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Phase</dt>
          <dd className="font-semibold">{stage}</dd>
        </div>
        {match.group && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Groupe</dt>
            <dd>
              <Link
                href={`/groupe/${match.group.toLowerCase()}`}
                className="font-semibold text-accent hover:underline"
              >
                Groupe {match.group}
              </Link>
            </dd>
          </div>
        )}
        {match.matchday && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Journee</dt>
            <dd className="font-semibold">Journee {match.matchday}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
