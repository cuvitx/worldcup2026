import Link from "next/link";
import type { Team, Match, Stadium, City } from "@repo/data";

interface MatchHeroProps {
  home: Team | undefined;
  away: Team | undefined;
  match: Match;
  stadium: Stadium | undefined;
  city: City | null;
  stage: string;
  homeName: string;
  awayName: string;
  dateFormatted: string;
}

export function MatchHero({
  home,
  away,
  match,
  stadium,
  city,
  stage,
  homeName,
  awayName,
  dateFormatted,
}: MatchHeroProps) {
  return (
    <section className="bg-primary text-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-2 text-center text-sm text-gold font-medium uppercase tracking-wide">
          {stage}
          {match.group ? ` - Grupo ${match.group}` : ""}
          {match.matchday ? ` - Jornada ${match.matchday}` : ""}
        </p>
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
          <div className="flex flex-col items-center">
            <span className="text-6xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
            {home ? (
              <Link
                href={`/equipo/${home.slug}`}
                className="mt-2 text-2xl font-extrabold hover:text-gold"
              >
                {home.name}
              </Link>
            ) : (
              <p className="mt-2 text-2xl font-extrabold">Por determinar</p>
            )}
            {home && (
              <p className="text-sm text-gray-400">#{home.fifaRanking} FIFA</p>
            )}
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-gold">VS</span>
            <p className="mt-1 text-sm text-gray-400">{match.time} UTC</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl">{away?.flag ?? "\ud83c\udff3\ufe0f"}</span>
            {away ? (
              <Link
                href={`/equipo/${away.slug}`}
                className="mt-2 text-2xl font-extrabold hover:text-gold"
              >
                {away.name}
              </Link>
            ) : (
              <p className="mt-2 text-2xl font-extrabold">Por determinar</p>
            )}
            {away && (
              <p className="text-sm text-gray-400">#{away.fifaRanking} FIFA</p>
            )}
          </div>
        </div>
        <p className="mt-6 text-center text-gray-300">
          {dateFormatted}
          {stadium ? ` | ${stadium.name}` : ""}
          {city ? `, ${city.name}` : ""}
        </p>
      </div>
    </section>
  );
}
