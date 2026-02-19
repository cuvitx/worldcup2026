import type { Metadata } from "next";
import Link from "next/link";
import { matches } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stadiumsById } from "@repo/data/stadiums";
import { Countdown } from "../components/Countdown";

export const metadata: Metadata = {
  title: "Résultats en direct - Coupe du Monde 2026",
  description:
    "Suivez les résultats en direct de la Coupe du Monde 2026. Scores, buteurs, événements minute par minute. Disponible dès le 11 juin 2026.",
  openGraph: {
    title: "Résultats en direct - Coupe du Monde 2026",
    description:
      "Scores en direct, buteurs et événements minute par minute pour tous les matchs de la Coupe du Monde 2026.",
    type: "website",
  },
};

const OPENING_DATE = "2026-06-11";

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
        item: "https://www.coupe-du-monde-2026.fr",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Résultats en direct",
        item: "https://www.coupe-du-monde-2026.fr/live",
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
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary">
                Accueil
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium">Résultats en direct</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold">Résultats en direct</h1>
          <p className="mt-2 text-gray-300">
            Scores, buteurs et événements minute par minute
          </p>
        </div>
      </section>

      {/* Countdown */}
      <Countdown />

      {/* Pre-tournament notice */}
      <section className="bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-700 py-6">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-800 px-4 py-2 text-amber-800 dark:text-amber-100 font-semibold text-sm mb-3">
            <span>📡</span>
            <span>En attente du coup d&apos;envoi</span>
          </div>
          <p className="text-amber-900 dark:text-amber-100 text-lg font-medium">
            Les résultats en direct seront disponibles dès le 11 juin 2026
          </p>
          <p className="text-amber-700 dark:text-amber-300 text-sm mt-1">
            Scores actualisés en temps réel, événements et compositions d&apos;équipe
          </p>
        </div>
      </section>

      {/* Next 4 matches */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
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
                  className="block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 hover:border-primary hover:shadow-md transition-all"
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
      <section className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Aperçu du suivi en direct
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Voici à quoi ressemblera le suivi pendant le tournoi
          </p>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
            {/* Match header */}
            <div className="bg-primary text-white px-6 py-4">
              <div className="flex items-center justify-between text-xs text-gray-300 mb-3">
                <span>Phase de groupes · Groupe A</span>
                <span className="inline-flex items-center gap-2 bg-red-600/90 px-3 py-1 rounded-full">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-100" />
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
                  <span className="text-5xl font-extrabold tabular-nums">2</span>
                  <span className="text-2xl text-gray-500">-</span>
                  <span className="text-5xl font-extrabold tabular-nums">1</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-3xl">🇿🇦</span>
                  <span className="text-sm font-semibold">Afrique du Sud</span>
                </div>
              </div>
            </div>

            {/* Events timeline */}
            <div className="px-6 py-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Événements du match
              </h3>
              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[2.35rem] top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-600" />
                <div className="space-y-0">
                {[
                  { minute: "12'", icon: "⚽", text: "H. Lozano (Mexique)", side: "home" },
                  { minute: "34'", icon: "🟨", text: "S. Xulu (Afrique du Sud)", side: "away" },
                  { minute: "41'", icon: "⚽", text: "P. Tau (Afrique du Sud)", side: "away" },
                  { minute: "45'", icon: "⏱️", text: "Mi-temps : 1 - 1", side: "center" },
                  { minute: "58'", icon: "🔄", text: "E. Álvarez ↔ C. Rodríguez (Mexique)", side: "home" },
                  { minute: "63'", icon: "⚽", text: "R. Jiménez (Mexique)", side: "home" },
                ].map((evt, i) => (
                  <div
                    key={i}
                    className={`relative flex items-center gap-3 text-sm py-3 ${
                      evt.side === "center" ? "justify-center text-gray-500 font-medium" : ""
                    }`}
                  >
                    <span className="w-10 text-right text-xs font-mono text-gray-400 dark:text-gray-500 font-semibold shrink-0">
                      {evt.minute}
                    </span>
                    <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-sm shrink-0">
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
                ⚠️ Exemple fictif — Les vrais scores seront disponibles le 11 juin 2026
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
