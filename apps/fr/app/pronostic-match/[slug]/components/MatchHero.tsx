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
    <section className="hero-animated relative overflow-hidden text-white py-12 sm:py-16">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stage badge */}
        <div className="flex justify-center mb-6 px-2">
          <span className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest text-white backdrop-blur-sm text-center max-w-full">
            {stage}
            {match.group ? ` — Groupe ${match.group}` : ""}
            {match.matchday ? ` · Journée ${match.matchday}` : ""}
          </span>
        </div>

        {/* Teams face-off */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 md:gap-8 max-w-2xl mx-auto px-2">
          {/* Home team */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="relative">
              <span
                className="text-5xl sm:text-7xl md:text-8xl block transition-transform hover:scale-110 duration-200"
                role="img"
                aria-label={`Drapeau de ${homeName}`}
              >
                {home?.flag ?? ""}
              </span>
            </div>
            {home ? (
              <Link
                href={`/equipe/${home.slug}`}
                className="text-base sm:text-xl md:text-2xl font-extrabold hover:text-accent transition-colors break-words text-center"
              >
                {home.name}
              </Link>
            ) : (
              <p className="text-base sm:text-xl md:text-2xl font-extrabold">À déterminer</p>
            )}
            {home && (
              <span className="text-xs font-medium text-gray-300 bg-white/8 rounded-full px-2.5 py-0.5">
                #{home.fifaRanking > 0 ? home.fifaRanking : "–"} FIFA
              </span>
            )}
          </div>

          {/* VS center */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <span
              className="text-2xl md:text-3xl font-black text-white"
              style={{  }}
            >
              VS
            </span>
            <span className="text-xs text-gray-300 font-medium tabular-nums">
              {match.time} UTC
            </span>
          </div>

          {/* Away team */}
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="relative">
              <span
                className="text-5xl sm:text-7xl md:text-8xl block transition-transform hover:scale-110 duration-200"
                role="img"
                aria-label={`Drapeau de ${awayName}`}
              >
                {away?.flag ?? ""}
              </span>
            </div>
            {away ? (
              <Link
                href={`/equipe/${away.slug}`}
                className="text-base sm:text-xl md:text-2xl font-extrabold hover:text-accent transition-colors break-words text-center"
              >
                {away.name}
              </Link>
            ) : (
              <p className="text-base sm:text-xl md:text-2xl font-extrabold">À déterminer</p>
            )}
            {away && (
              <span className="text-xs font-medium text-gray-300 bg-white/8 rounded-full px-2.5 py-0.5">
                #{away.fifaRanking > 0 ? away.fifaRanking : "–"} FIFA
              </span>
            )}
          </div>
        </div>

        {/* Match info bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <span className="text-xs"></span>
            {dateFormatted}
          </span>
          {stadium && (
            <span className="flex items-center gap-1.5">
              <span className="text-xs"></span>
              <Link
                href={`/stade/${stadium.slug}`}
                className="hover:text-white transition-colors"
              >
                {stadium.name}
              </Link>
              {city && (
                <span>
                  ,{" "}
                  <Link href={`/ville/${city.slug}`} className="hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </span>
              )}
            </span>
          )}
          {stadium && (
            <span className="flex items-center gap-1.5">
              <span className="text-xs"></span>
              {stadium.capacity.toLocaleString("fr-FR")} places
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
