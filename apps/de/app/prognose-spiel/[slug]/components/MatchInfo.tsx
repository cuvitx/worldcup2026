import Link from "next/link";
import type { Match, Stadium, City } from "@repo/data";

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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Spielinformationen</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Datum</dt>
          <dd className="font-semibold">{dateFormatted}</dd>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Uhrzeit (UTC)</dt>
          <dd className="font-semibold">{match.time}</dd>
        </div>
        {stadium && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Stadion</dt>
            <dd>
              <Link
                href={`/stadion/${stadium.slug}`}
                className="font-semibold text-primary hover:underline"
              >
                {stadium.name}
              </Link>
              <p className="text-xs text-gray-500 mt-0.5">
                {stadium.capacity.toLocaleString("de-DE")} Plaetze
              </p>
            </dd>
          </div>
        )}
        {city && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Stadt</dt>
            <dd>
              <Link
                href={`/stadt/${city.slug}`}
                className="font-semibold text-primary hover:underline"
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
            <dt className="text-gray-500 mb-1">Gruppe</dt>
            <dd>
              <Link
                href={`/gruppe/${match.group.toLowerCase()}`}
                className="font-semibold text-primary hover:underline"
              >
                Gruppe {match.group}
              </Link>
            </dd>
          </div>
        )}
        {match.matchday && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Spieltag</dt>
            <dd className="font-semibold">Spieltag {match.matchday}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
