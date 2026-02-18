import Link from "next/link";
import type { Team, Match } from "@repo/data/types";
import type { Stadium } from "@repo/data/types";
import type { City } from "@repo/data/types";

interface MatchHeroProps {
  match: Match;
  home: Team | undefined;
  away: Team | undefined;
  stadium: Stadium | undefined;
  city: City | null;
  stage: string;
  homeName: string;
  awayName: string;
  dateFormatted: string;
}

export function MatchHero({
  match,
  home,
  away,
  stadium,
  city,
  stage,
  homeName,
  awayName,
  dateFormatted,
}: MatchHeroProps) {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/match/calendrier" className="hover:text-primary">
                Calendrier
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              Pronostic {homeName} vs {awayName}
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-2 text-center text-sm text-gold font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Groupe ${match.group}` : ""}
            {match.matchday ? ` - Journee ${match.matchday}` : ""}
          </p>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-center md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-6xl">{home?.flag ?? "\ud83c\udff3\ufe0f"}</span>
              {home ? (
                <Link
                  href={`/equipe/${home.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {home.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">A determiner</p>
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
                  href={`/equipe/${away.slug}`}
                  className="mt-2 text-2xl font-extrabold hover:text-gold"
                >
                  {away.name}
                </Link>
              ) : (
                <p className="mt-2 text-2xl font-extrabold">A determiner</p>
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
    </>
  );
}
