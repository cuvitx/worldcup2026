"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LiveMatchWidget } from "@repo/ui/live-match-widget";
import type { Team } from "@repo/data/types";
import type { Stadium } from "@repo/data/types";
import type { MatchPhase } from "@repo/data/tournament-state";
import { teamApiIds } from "@repo/data/api-football-ids";
import { useLiveData } from "../../../providers/LiveDataProvider";

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
    homeScore?: number;
    awayScore?: number;
    halfTimeHome?: number;
    halfTimeAway?: number;
    status?: "scheduled" | "live" | "finished";
    homeTeamId: string;
    awayTeamId: string;
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
  const { liveFixtures, todaysFixtures } = useLiveData();

  // Merge live + today's fixtures (dedup by fixture ID)
  // Don't use ternary — it drops finished fixtures when any live fixture exists
  const seenIds = new Set<number>();
  const allFixtures: typeof liveFixtures = [];
  for (const f of [...liveFixtures, ...todaysFixtures]) {
    if (!seenIds.has(f.fixture.id)) {
      seenIds.add(f.fixture.id);
      allFixtures.push(f);
    }
  }

  // Client-side phase detection: override server matchPhase when stale ISR cache
  const [clientPhase, setClientPhase] = useState<MatchPhase>(matchPhase);
  useEffect(() => {
    const kickoff = new Date(`${match.date}T${match.time}:00+02:00`);
    const now = new Date();
    const diffH = (now.getTime() - kickoff.getTime()) / 3600000;
    if (matchPhase === "upcoming" && diffH >= -0.05 && diffH < 4) {
      setClientPhase("live");
    } else if (matchPhase === "upcoming" && diffH >= 4) {
      setClientPhase("completed");
    }
  }, [match.date, match.time, matchPhase]);

  const isLive = clientPhase === "live";
  const isCompleted = clientPhase === "completed";
  const hasScore = match.homeScore != null && match.awayScore != null;

  // Match with known score (from server enrichment) — show final result
  // Use hasScore alone so we don't wait for clientPhase to catch up
  if (hasScore && match.status === "finished") {
    return (
      <section className="hero-animated text-white pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <p className="mb-2 text-sm text-secondary font-medium uppercase tracking-wide">
            {stage}{match.group ? ` - Groupe ${match.group}` : ""}
          </p>
          <p className="mb-6 text-xs text-gray-400 uppercase tracking-wider">Terminé</p>

          <div className="flex items-center justify-center gap-6 sm:gap-12 mb-6">
            {/* Home */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-1 max-w-[180px]">
              <span className="text-4xl sm:text-6xl">{home?.flag ?? ""}</span>
              {home ? (
                <Link href={`/mannschaft/${home.slug}`} className="text-base sm:text-xl font-extrabold hover:text-secondary transition-colors text-center leading-tight">
                  {home.name}
                </Link>
              ) : (
                <p className="text-base sm:text-xl font-extrabold">Noch offen</p>
              )}
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="text-4xl sm:text-6xl font-black tabular-nums">{match.homeScore}</span>
              <span className="text-lg sm:text-2xl font-bold text-gray-400">-</span>
              <span className="text-4xl sm:text-6xl font-black tabular-nums">{match.awayScore}</span>
            </div>

            {/* Away */}
            <div className="flex flex-col items-center gap-2 min-w-0 flex-1 max-w-[180px]">
              <span className="text-4xl sm:text-6xl">{away?.flag ?? ""}</span>
              {away ? (
                <Link href={`/mannschaft/${away.slug}`} className="text-base sm:text-xl font-extrabold hover:text-secondary transition-colors text-center leading-tight">
                  {away.name}
                </Link>
              ) : (
                <p className="text-base sm:text-xl font-extrabold">Noch offen</p>
              )}
            </div>
          </div>

          {match.halfTimeHome != null && match.halfTimeAway != null && (
            <p className="text-sm text-gray-400 mt-1">
              MT : {match.halfTimeHome} - {match.halfTimeAway}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300 mt-4">
            <span>{dateFormatted}</span>
            {stadium && <span>{stadium.name}</span>}
          </div>
        </div>
      </section>
    );
  }

  // Live match or completed without score — use LiveMatchWidget
  if (isLive || isCompleted) {
    return (
      <section className="hero-animated pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
          <p className="mb-4 text-center text-sm text-secondary font-medium uppercase tracking-wide">
            {stage}
            {match.group ? ` - Groupe ${match.group}` : ""}
          </p>
          <LiveMatchWidget
            matchDate={match.date}
            matchTime={match.time}
            homeTeam={home?.name ?? "Noch offen"}
            awayTeam={away?.name ?? "Noch offen"}
            stadium={stadium?.name ?? "Stadion a confirmer"}
            locale="de"
            liveFixtures={allFixtures.length > 0 ? allFixtures : undefined}
            homeApiTeamId={teamApiIds[match.homeTeamId] ?? 0}
            awayApiTeamId={teamApiIds[match.awayTeamId] ?? 0}
          />
          <div className="mt-4 flex justify-center gap-8 text-white">
            {home && (
              <Link
                href={`/mannschaft/${home.slug}`}
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
                href={`/mannschaft/${away.slug}`}
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
    <section className="hero-animated text-white pt-14 pb-20 sm:pt-20 sm:pb-24">
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-2 backdrop-blur-md max-w-full">
          <span className="shrink-0 h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-secondary truncate">
            {stage}
            {match.group ? ` — Groupe ${match.group}` : ""}
          </span>
        </div>

        {/* Teams face-off */}
        <div className="flex items-center justify-center gap-4 sm:gap-12 mb-6">
          {/* Home */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-0 flex-1 max-w-[180px] sm:max-w-none">
            <span className="text-4xl sm:text-7xl" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>
              {home?.flag ?? ""}
            </span>
            {home ? (
              <Link href={`/mannschaft/${home.slug}`} className="text-base sm:text-2xl font-extrabold hover:text-secondary transition-colors text-center leading-tight">
                {home.name}
              </Link>
            ) : (
              <p className="text-base sm:text-2xl font-extrabold text-center leading-tight">Noch offen</p>
            )}
            {home && (
              <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-xs text-gray-300">
                #{home.fifaRanking} FIFA
              </span>
            )}
          </div>

          {/* VS */}
          <span className="text-xl sm:text-3xl font-black text-secondary shrink-0">VS</span>

          {/* Away */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-0 flex-1 max-w-[180px] sm:max-w-none">
            <span className="text-4xl sm:text-7xl" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>
              {away?.flag ?? ""}
            </span>
            {away ? (
              <Link href={`/mannschaft/${away.slug}`} className="text-base sm:text-2xl font-extrabold hover:text-secondary transition-colors text-center leading-tight">
                {away.name}
              </Link>
            ) : (
              <p className="text-base sm:text-2xl font-extrabold text-center leading-tight">Noch offen</p>
            )}
            {away && (
              <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] sm:text-xs text-gray-300">
                #{away.fifaRanking} FIFA
              </span>
            )}
          </div>
        </div>

        {/* Match info */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-300">
          <span>{dateFormatted}</span>
          {stadium && <span>{stadium.name.trim()}{stadium.city ? `, ${stadium.city.trim()}` : ""}</span>}
          {stadium?.capacity && <span>{stadium.capacity.toLocaleString("de-DE")} places</span>}
        </div>
      </div>
    </section>
  );
}
