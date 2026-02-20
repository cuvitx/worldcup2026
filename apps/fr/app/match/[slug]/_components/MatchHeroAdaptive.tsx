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
      <section className="hero-animated py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
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
    <section className="hero-animated text-white py-14 sm:py-20">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
            {stage}
            {match.group ? ` — Groupe ${match.group}` : ""}
          </span>
        </div>

        {/* Teams face-off */}
        <div className="flex items-center justify-center gap-6 sm:gap-12 mb-6">
          {/* Home */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>
              {home?.flag ?? "🏳️"}
            </span>
            {home ? (
              <Link href={`/equipe/${home.slug}`} className="text-lg sm:text-2xl font-extrabold hover:text-secondary transition-colors">
                {home.name}
              </Link>
            ) : (
              <p className="text-lg sm:text-2xl font-extrabold">À déterminer</p>
            )}
            {home && (
              <span className="inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs text-gray-300">
                #{home.fifaRanking} FIFA
              </span>
            )}
          </div>

          {/* VS */}
          <span className="text-2xl sm:text-3xl font-black text-secondary">VS</span>

          {/* Away */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl sm:text-7xl" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>
              {away?.flag ?? "🏳️"}
            </span>
            {away ? (
              <Link href={`/equipe/${away.slug}`} className="text-lg sm:text-2xl font-extrabold hover:text-secondary transition-colors">
                {away.name}
              </Link>
            ) : (
              <p className="text-lg sm:text-2xl font-extrabold">À déterminer</p>
            )}
            {away && (
              <span className="inline-block rounded-full bg-white/10 px-3 py-0.5 text-xs text-gray-300">
                #{away.fifaRanking} FIFA
              </span>
            )}
          </div>
        </div>

        {/* Match info */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300">
          <span>📅 {dateFormatted}</span>
          {stadium && <span>📍 {stadium.name}{stadium.city ? `, ${stadium.city}` : ""}</span>}
          {stadium?.capacity && <span>🏟️ {stadium.capacity.toLocaleString("fr-FR")} places</span>}
        </div>
      </div>
    </section>
  );
}
