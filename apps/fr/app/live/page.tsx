import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { Countdown } from "@repo/ui/countdown";
import { EVENT_DATES } from "@repo/data/constants";
import { InlineBettingCTA } from "../components/InlineBettingCTA";
import {
  getTournamentPhase,
  getTodaysMatches,
  getMatchesByDate,
  getMatchPhase,
} from "@repo/data/tournament-state";
import { LiveMatchWidget } from "@repo/ui/live-match-widget";

export const metadata: Metadata = {
  title: "Résultats en direct - Coupe du Monde 2026",
  description:
    "Suivez les résultats en direct de la Coupe du Monde 2026. Scores, buteurs, événements minute par minute.",
  alternates: {
    canonical: "https://www.cdm2026.fr/live",
  },
  openGraph: {
    title: "Résultats en direct - Coupe du Monde 2026",
    description:
      "Scores en direct, buteurs et événements minute par minute pour tous les matchs de la Coupe du Monde 2026.",
    type: "website",
  },
};

// Force dynamic rendering so tournament phase is always current
export const dynamic = "force-dynamic";

function formatDate(date: string): string {
  return new Date(date + "T12:00:00Z").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  // Times are already in Europe/Paris (CEST)
  return time;
}

function formatDateShort(date: string): string {
  return new Date(date + "T12:00:00Z").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/** Get the first N upcoming matches */
function getNextMatches(count: number) {
  const now = new Date();
  return matches
    .filter((m) => new Date(`${m.date}T${m.time}:00+02:00`) > now)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, count);
}

/** Get yesterday's date in ISO format */
function getYesterdayISO(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.cdm2026.fr",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Résultats en direct",
      item: "https://www.cdm2026.fr/live",
    },
  ],
};

export default function LivePage() {
  const phase = getTournamentPhase();
  const isPreTournament = phase === "pre-tournament";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-accent">En direct</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Résultats en direct</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Scores, buteurs et événements minute par minute
          </p>
        </div>
      </section>

      {isPreTournament ? <PreTournamentContent /> : <TournamentActiveContent />}
    </>
  );
}

/** Content shown before the tournament starts */
function PreTournamentContent() {
  const nextMatches = matches
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, 4);

  return (
    <>
      <Countdown />

      <section className="bg-white py-8">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-5 text-center shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1.5 text-gray-700 font-semibold text-sm mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/></svg>
              <span>En attente du coup d&apos;envoi</span>
            </div>
            <p className="text-gray-900 text-base font-medium">
              Les résultats en direct seront disponibles dès le 11 juin 2026
            </p>
            <p className="text-gray-500 text-sm mt-1 mb-4">
              Scores actualisés en temps réel, événements et compositions d&apos;équipe
            </p>
            <Link
              href="/match/calendrier"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Voir le calendrier complet
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gray-50/50 py-8">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prochains matchs</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {nextMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];
              return (
                <Link
                  key={match.id}
                  href={`/match/${match.slug}`}
                  className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="text-xs text-gray-500 mb-3">
                    {formatDate(match.date)} · {formatTime(match.time)}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-lg">{home?.flag}</span>
                      <span>{home?.name ?? match.homeTeamId}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">VS</span>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span>{away?.name ?? match.awayTeamId}</span>
                      <span className="text-lg">{away?.flag}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {stadium?.name} · {stadium?.city}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/** Content shown during the tournament */
function TournamentActiveContent() {
  const todaysMatches = getTodaysMatches();
  const yesterdayMatches = getMatchesByDate(getYesterdayISO());
  const nextMatches = getNextMatches(4);

  return (
    <>
      {/* Today's matches with live widgets */}
      {todaysMatches.length > 0 && (
        <section className="bg-white py-8">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Matchs du jour — {formatDateShort(todaysMatches[0]!.date)}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {todaysMatches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                const stadium = stadiumsById[match.stadiumId];
                return (
                  <Link key={match.id} href={`/match/${match.slug}`} className="block">
                    <LiveMatchWidget
                      matchDate={match.date}
                      matchTime={match.time}
                      homeTeam={home?.name ?? match.homeTeamId}
                      awayTeam={away?.name ?? match.awayTeamId}
                      stadium={stadium?.name ?? ""}
                      locale="fr"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Yesterday's results */}
      {yesterdayMatches.length > 0 && (
        <section className="bg-gray-50/50 py-8">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Résultats d&apos;hier — {formatDateShort(yesterdayMatches[0]!.date)}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {yesterdayMatches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                const stadium = stadiumsById[match.stadiumId];
                return (
                  <Link key={match.id} href={`/match/${match.slug}`} className="block">
                    <LiveMatchWidget
                      matchDate={match.date}
                      matchTime={match.time}
                      homeTeam={home?.name ?? match.homeTeamId}
                      awayTeam={away?.name ?? match.awayTeamId}
                      stadium={stadium?.name ?? ""}
                      locale="fr"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Betting CTA */}
      <section className="bg-white py-6">
        <div className="mx-auto max-w-3xl px-4">
          <InlineBettingCTA tracking="live" />
        </div>
      </section>

      {/* No matches today/yesterday — show a notice */}
      {todaysMatches.length === 0 && yesterdayMatches.length === 0 && (
        <section className="bg-white py-8">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-gray-500 text-lg">Pas de match prévu aujourd&apos;hui</p>
          </div>
        </section>
      )}

      {/* Upcoming matches */}
      {nextMatches.length > 0 && (
        <section className="bg-white py-8">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prochains matchs</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {nextMatches.map((match) => {
                const home = teamsById[match.homeTeamId];
                const away = teamsById[match.awayTeamId];
                const stadium = stadiumsById[match.stadiumId];
                return (
                  <Link
                    key={match.id}
                    href={`/match/${match.slug}`}
                    className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-primary hover:shadow-md transition-all"
                  >
                    <div className="text-xs text-gray-500 mb-3">
                      {formatDate(match.date)} · {formatTime(match.time)}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span className="text-lg">{home?.flag}</span>
                        <span>{home?.name ?? match.homeTeamId}</span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">VS</span>
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <span>{away?.name ?? match.awayTeamId}</span>
                        <span className="text-lg">{away?.flag}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {stadium?.name} · {stadium?.city}
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/match/calendrier"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Voir le calendrier complet
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
