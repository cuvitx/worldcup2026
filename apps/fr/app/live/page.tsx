import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { Countdown } from "@repo/ui/countdown";
import { EVENT_DATES } from "@repo/data/constants";

export const metadata: Metadata = {
  title: "Résultats en direct - Coupe du Monde 2026",
  description:
    "Suivez les résultats en direct de la Coupe du Monde 2026. Scores, buteurs, événements minute par minute. Disponible dès le 11 juin 2026.",
  alternates: {
    canonical: "https://cdm2026.fr/live",
  },
  openGraph: {
    title: "Résultats en direct - Coupe du Monde 2026",
    description:
      "Scores en direct, buteurs et événements minute par minute pour tous les matchs de la Coupe du Monde 2026.",
    type: "website",
  },
};

const OPENING_DATE = EVENT_DATES.START;

/** Get the first 4 matches of the tournament */
function getNextMatches() {
  return matches
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, 4);
}

function formatDate(date: string): string {
  return new Date(date + "T12:00:00Z").toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const utcHour = parseInt(h!, 10);
  const parisHour = utcHour + 2; // CEST (summer)
  return `${String(parisHour).padStart(2, "0")}:${m}`;
}

export default function LivePage() {
  const nextMatches = getNextMatches();

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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700">
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li>
              <Link href="/" className="text-primary dark:text-secondary hover:underline">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Résultats en direct</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="animate-pulse inline-block w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">En direct</span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-5xl mb-4">Résultats en direct</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Scores, buteurs et événements minute par minute
          </p>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Pre-tournament notice */}
      <section className="bg-accent//10 dark:bg-accent//10 border-y border-accent//30 dark:border-accent//20 py-6">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent//15 dark:bg-accent//15 px-4 py-2 text-accent dark:text-accent font-semibold text-sm mb-3">
            <span>📡</span>
            <span>En attente du coup d&apos;envoi</span>
          </div>
          <p className="text-accent dark:text-accent text-lg font-medium">
            Les résultats en direct seront disponibles dès le 11 juin 2026
          </p>
          <p className="text-accent dark:text-accent text-sm mt-1">
            Scores actualisés en temps réel, événements et compositions d&apos;équipe
          </p>
        </div>
      </section>

      {/* Next 4 matches */}
      <section className="bg-white dark:bg-slate-900 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Prochains matchs
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {nextMatches.map((match) => {
              const home = teamsById[match.homeTeamId];
              const away = teamsById[match.awayTeamId];
              const stadium = stadiumsById[match.stadiumId];
              return (
                <Link
                  key={match.id}
                  href={`/match/${match.slug}`}
                  className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 p-5 hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="text-xs text-gray-500 mb-3">
                    {formatDate(match.date)} · {formatTime(match.time)}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span className="text-lg" role="img" aria-label={`Drapeau de ${home?.name ?? "Inconnu"}`}>{home?.flag}</span>
                      <span>{home?.name ?? match.homeTeamId}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">VS</span>
                    <div className="flex items-center gap-2 text-sm font-semibold">
                      <span>{away?.name ?? match.awayTeamId}</span>
                      <span className="text-lg" role="img" aria-label={`Drapeau de ${away?.name ?? "Inconnu"}`}>{away?.flag}</span>
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

      {/* Mock live match */}
      <section className="bg-gray-50 dark:bg-slate-800 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Aperçu du suivi en direct
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Voici à quoi ressemblera le suivi pendant le tournoi
          </p>

          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow overflow-hidden">
            {/* Match header */}
            <div className="bg-primary text-white px-6 py-4">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Phase de groupes · Groupe A</span>
                <span className="inline-flex items-center gap-2 bg-primary/90 px-3 py-1 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                  </span>
                  <span className="font-bold text-white text-xs uppercase tracking-wider">LIVE — 67&apos;</span>
                </span>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">🇲🇽</span>
                  <span className="text-sm font-semibold">Mexique</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold tabular-nums sm:text-5xl">2</span>
                  <span className="text-2xl text-gray-500">-</span>
                  <span className="text-3xl font-extrabold tabular-nums sm:text-5xl">1</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">🇿🇦</span>
                  <span className="text-sm font-semibold">Afrique du Sud</span>
                </div>
              </div>
            </div>

            {/* Events timeline */}
            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Événements du match
              </h3>
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[2.35rem] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-600" />
                <div className="space-y-0">
                {[
                  { minute: "12'", icon: "", text: "H. Lozano (Mexique)", side: "home" },
                  { minute: "34'", icon: "🟨", text: "S. Xulu (Afrique du Sud)", side: "away" },
                  { minute: "41'", icon: "", text: "P. Tau (Afrique du Sud)", side: "away" },
                  { minute: "45'", icon: "⏱", text: "Mi-temps : 1 - 1", side: "center" },
                  { minute: "58'", icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>, text: "E. Álvarez ↔ C. Rodríguez (Mexique)", side: "home" },
                  { minute: "63'", icon: "", text: "R. Jiménez (Mexique)", side: "home" },
                ].map((evt, i) => (
                  <div
                    key={i}
                    className={`relative flex items-center gap-3 text-sm py-3 ${
                      evt.side === "center" ? "justify-center text-gray-500 font-medium" : ""
                    }`}
                  >
                    <span className="w-10 text-right text-xs font-mono text-gray-400 dark:text-gray-400 font-semibold shrink-0">
                      {evt.minute}
                    </span>
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-gray-600 shadow-sm shrink-0">
                      {evt.icon}
                    </span>
                    <span className={`text-gray-800 dark:text-gray-200 ${evt.side === "center" ? "bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs" : ""}`}>{evt.text}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* Demo badge */}
            <div className="border-t border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 px-6 py-3 text-center">
              <span className="text-xs text-gray-500 font-medium">
                Exemple fictif — Les vrais scores seront disponibles le 11 juin 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
