"use client";

import Link from "next/link";
import { LiveMatchWidget } from "@repo/ui/live-match-widget";
import type { Team } from "@repo/data/types";
import type { Stadium } from "@repo/data/types";
import type { MatchPhase } from "@repo/data/tournament-state";

interface MatchHeroAdaptiveProps {
  matchPhase: MatchPhase;
  home: Team | undefined;
  away: Team | undefined;
  stadium: Stadium | undefined;
  stage: string;
  match: {
    date: string;
    time: string;
    group?: string;
    slug: string;
  };
  dateFormatted: string;
}

export function MatchHeroAdaptive({
  matchPhase,
  home,
  away,
  stadium,
  stage,
  match,
  dateFormatted,
}: MatchHeroAdaptiveProps) {
  const isLive = matchPhase === "live";
  const isCompleted = matchPhase === "completed";

  if (isLive || isCompleted) {
    return (
      <section className="bg-primary py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <p className="mb-4 text-center text-sm text-secondary font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Groupe ${match.group}` : ""}
          </p>
          <LiveMatchWidget
            matchDate={match.date}
            matchTime={match.time}
            homeTeam={home?.name ?? "A determiner"}
            awayTeam={away?.name ?? "A determiner"}
            stadium={stadium?.name ?? "Stade a confirmer"}
            locale="fr"
          />
          <div className="mt-4 flex justify-center gap-8 text-white">
            {home && (
              <Link
                href={`/equipe/${home.slug}`}
                className="text-sm hover:text-secondary transition-colors"
              >
                <span role="img" aria-label={`Drapeau de ${home.name}`}>
                  {home.flag}
                </span>{" "}
                {home.name}
              </Link>
            )}
            {away && (
              <Link
                href={`/equipe/${away.slug}`}
                className="text-sm hover:text-secondary transition-colors"
              >
                <span role="img" aria-label={`Drapeau de ${away.name}`}>
                  {away.flag}
                </span>{" "}
                {away.name}
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-5 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-center text-xs text-secondary font-medium uppercase tracking-wide">
          {stage}
          {match.group ? ` - Groupe ${match.group}` : ""}
        </p>
        <div className="flex items-center justify-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="text-2xl sm:text-4xl shrink-0"
              role="img"
              aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}
            >
              {home?.flag ?? "🏳️"}
            </span>
            <div className="min-w-0">
              {home ? (
                <Link
                  href={`/equipe/${home.slug}`}
                  className="text-sm sm:text-2xl font-extrabold hover:text-secondary break-words block"
                >
                  {home.name}
                </Link>
              ) : (
                <p className="text-sm sm:text-2xl font-extrabold">TBD</p>
              )}
              {home && <p className="text-xs text-gray-200">#{home.fifaRanking} FIFA</p>}
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-secondary shrink-0">VS</span>
          <div className="flex items-center gap-2 min-w-0">
            <div className="min-w-0 text-right">
              {away ? (
                <Link
                  href={`/equipe/${away.slug}`}
                  className="text-sm sm:text-2xl font-extrabold hover:text-secondary break-words block"
                >
                  {away.name}
                </Link>
              ) : (
                <p className="text-sm sm:text-2xl font-extrabold">TBD</p>
              )}
              {away && <p className="text-xs text-gray-200">#{away.fifaRanking} FIFA</p>}
            </div>
            <span
              className="text-2xl sm:text-4xl shrink-0"
              role="img"
              aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}
            >
              {away?.flag ?? "🏳️"}
            </span>
          </div>
        </div>
        <p className="mt-2 text-center text-sm text-gray-200">
          {match.time} UTC · {dateFormatted}
          {stadium ? ` · ${stadium.name}` : ""}
        </p>
      </div>
    </section>
  );
}
