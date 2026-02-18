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
      <h2 className="mb-4 text-xl font-bold">Match Information</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Date</dt>
          <dd className="font-semibold">{dateFormatted}</dd>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Time (UTC)</dt>
          <dd className="font-semibold">{match.time}</dd>
        </div>
        {stadium && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Stadium</dt>
            <dd>
              <Link
                href={`/stadium/${stadium.slug}`}
                className="font-semibold text-accent hover:underline"
              >
                {stadium.name}
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">
                {stadium.capacity.toLocaleString("en-US")} seats
              </p>
            </dd>
          </div>
        )}
        {city && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">City</dt>
            <dd>
              <Link
                href={`/city/${city.slug}`}
                className="font-semibold text-accent hover:underline"
              >
                {city.name}
              </Link>
              <p className="text-xs text-gray-400 mt-0.5">
                {stadium?.country}
              </p>
            </dd>
          </div>
        )}
        <div className="rounded-lg bg-gray-50 p-4">
          <dt className="text-gray-500 mb-1">Stage</dt>
          <dd className="font-semibold">{stage}</dd>
        </div>
        {match.group && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Group</dt>
            <dd>
              <Link
                href={`/group/${match.group.toLowerCase()}`}
                className="font-semibold text-accent hover:underline"
              >
                Group {match.group}
              </Link>
            </dd>
          </div>
        )}
        {match.matchday && (
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-gray-500 mb-1">Matchday</dt>
            <dd className="font-semibold">Matchday {match.matchday}</dd>
          </div>
        )}
      </dl>
    </section>
  );
}
