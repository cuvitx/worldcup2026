"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useBadges, ALL_BADGES } from "@repo/ui/badge-system";
import { EVENT_DATES } from "@repo/data/constants";

/* ─── Team data for onboarding ─────────────────────────────── */

const TEAMS = [
  { slug: "france", flag: "🇫🇷", name: "France" },
  { slug: "bresil", flag: "🇧🇷", name: "Brésil" },
  { slug: "argentine", flag: "🇦🇷", name: "Argentine" },
  { slug: "allemagne", flag: "🇩🇪", name: "Allemagne" },
  { slug: "espagne", flag: "🇪🇸", name: "Espagne" },
  { slug: "angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "Angleterre" },
  { slug: "portugal", flag: "🇵🇹", name: "Portugal" },
  { slug: "pays-bas", flag: "🇳🇱", name: "Pays-Bas" },
  { slug: "belgique", flag: "🇧🇪", name: "Belgique" },
  { slug: "italie", flag: "🇮🇹", name: "Italie" },
  { slug: "japon", flag: "🇯🇵", name: "Japon" },
  { slug: "maroc", flag: "🇲🇦", name: "Maroc" },
  { slug: "etats-unis", flag: "🇺🇸", name: "États-Unis" },
  { slug: "mexique", flag: "🇲🇽", name: "Mexique" },
  { slug: "senegal", flag: "🇸🇳", name: "Sénégal" },
  { slug: "croatie", flag: "🇭🇷", name: "Croatie" },
  { slug: "uruguay", flag: "🇺🇾", name: "Uruguay" },
  { slug: "colombie", flag: "🇨🇴", name: "Colombie" },
  { slug: "cameroun", flag: "🇨🇲", name: "Cameroun" },
  { slug: "coree-du-sud", flag: "🇰🇷", name: "Corée du Sud" },
  { slug: "australie", flag: "🇦🇺", name: "Australie" },
  { slug: "canada", flag: "🇨🇦", name: "Canada" },
  { slug: "suisse", flag: "🇨🇭", name: "Suisse" },
  { slug: "danemark", flag: "🇩🇰", name: "Danemark" },
];

/* ─── Mock upcoming matches (static for now) ───────────────── */

function getUpcomingMatchesForTeam(teamName: string) {
  const CDM_START = new Date(EVENT_DATES.START);
  return [
    { opponent: "Phase de groupes - Match 1", date: CDM_START, stage: "Groupe" },
    { opponent: "Phase de groupes - Match 2", date: new Date("2026-06-16"), stage: "Groupe" },
    { opponent: "Phase de groupes - Match 3", date: new Date("2026-06-21"), stage: "Groupe" },
  ];
}

function daysUntil(date: Date): number {
  const now = new Date();
  return Math.max(0, Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

/* ─── Component ────────────────────────────────────────────── */

export default function ProfilPage() {
  const ctx = useBadges();
  const [myTeamSlug, setMyTeamSlug] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cdm2026_my_team");
      if (saved) {
        setMyTeamSlug(saved);
      } else {
        setShowOnboarding(true);
      }
    } catch {}
    setLoaded(true);
  }, []);

  const selectTeam = (slug: string) => {
    setMyTeamSlug(slug);
    setShowOnboarding(false);
    try {
      localStorage.setItem("cdm2026_my_team", slug);
    } catch {}
  };

  const myTeam = TEAMS.find((t) => t.slug === myTeamSlug);
  const upcomingMatches = myTeam ? getUpcomingMatchesForTeam(myTeam.name) : [];
  const nextMatch = upcomingMatches[0];
  const daysToNext = nextMatch ? daysUntil(nextMatch.date) : null;

  if (!loaded || !ctx) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 text-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  const { stats, unlockedBadges } = ctx;

  const shareText = () => {
    const earned = ALL_BADGES.filter((b) => unlockedBadges.includes(b.id));
    const teamPart = myTeam ? `\nMon équipe : ${myTeam.flag} ${myTeam.name}` : "";
    const text = earned.length
      ? `Mes badges CDM 2026 :\n${earned.map((b) => `${b.emoji} ${b.name}`).join("\n")}\nStreak : ${stats.streak} jour(s)${teamPart}\n\nhttps://cdm2026.fr/profil`
      : `Je n'ai pas encore de badges CDM 2026 ! ${teamPart}\nhttps://cdm2026.fr/profil`;
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => alert("Copié dans le presse-papier !")).catch(() => {});
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-300" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap min-w-0">
          <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
          <li>/</li>
          <li className="text-gray-800 dark:text-gray-200 font-medium">Mon Profil</li>
        </ol>
      </nav>

      <h1 className="mb-2 text-3xl font-bold dark:text-white">Mon CDM 2026 </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-300">Ton espace perso — sans compte, tout est local.</p>

      {/* ─── Onboarding / Team selector ─── */}
      {showOnboarding ? (
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow mb-10 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quelle est ton équipe ?</h2>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-300">
            Choisis l&apos;équipe que tu vas supporter pendant la CDM 2026 !
          </p>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {TEAMS.map((team) => (
              <button
                key={team.slug}
                onClick={() => selectTeam(team.slug)}
                className="flex flex-col items-center gap-1 rounded-xl border border-gray-200 bg-white p-3 text-center transition-all hover:border-primary/40 hover:shadow-md active:scale-95 dark:border-slate-600 dark:bg-slate-700 dark:hover:border-secondary/50"
              >
                <span className="text-2xl">{team.flag}</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-tight">{team.name}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-gray-600 dark:text-gray-400">
            Tu pourras changer plus tard !
          </p>
        </div>
      ) : myTeam ? (
        /* ─── Team dashboard ─── */
        <div className="mb-10 space-y-4">
          {/* Team header */}
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-4 py-3 text-white shadow-lg">
            <span className="text-3xl sm:text-4xl shrink-0">{myTeam.flag}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium opacity-80">Tu supportes</p>
              <p className="text-lg font-extrabold tracking-tight sm:text-xl break-words">{myTeam.name}</p>
              {daysToNext !== null && nextMatch && (
                <p className="mt-0.5 text-xs opacity-90">
                  {daysToNext === 0
                    ? "🔴 Match aujourd'hui !"
                    : `Prochain match dans ${daysToNext}j · ${nextMatch.date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}`}
                </p>
              )}
            </div>
            <Link
              href={`/equipe/${myTeam.slug}`}
              className="shrink-0 text-sm font-medium text-white/90 hover:text-white underline underline-offset-2 transition"
            >
              Voir fiche →
            </Link>
          </div>

          {/* Upcoming matches */}
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Prochains matchs</h3>
            <div className="space-y-2">
              {upcomingMatches.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-slate-700/50"
                >
                  <div>
                    <p className="text-sm font-medium dark:text-white">{m.opponent}</p>
                    <p className="text-xs text-gray-500">{m.stage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-accent dark:text-secondary">
                      {daysUntil(m.date)}j
                    </p>
                    <p className="text-xs text-gray-500">
                      {m.date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/pronostic-vainqueur"
              className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="text-2xl block mb-1"></span>
              <span className="text-sm font-medium dark:text-white">Mes pronostics</span>
            </Link>
            <Link
              href="/quiz/supporter"
              className="rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <span className="text-2xl block mb-1"></span>
              <span className="text-sm font-medium dark:text-white">Quiz supporter</span>
            </Link>
          </div>

          <button
            onClick={() => setShowOnboarding(true)}
            className="text-sm text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline"
          >
            Changer d&apos;équipe
          </button>
        </div>
      ) : null}

      {/* Streak — big animated flame */}
      <div className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5 text-white shadow-lg">
        <span className="text-3xl animate-pulse drop-shadow-lg sm:text-5xl"></span>
        <div>
          <p className="text-sm font-medium text-white/95">Streak actuel</p>
          <p className="text-2xl font-extrabold tracking-tight sm:text-4xl">{stats.streak} jour{stats.streak !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Stats cards with icons */}
      <div className="mb-10 grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "Pages visitées", value: stats.visitedPages.length, icon: "📄" },
          { label: "Votes", value: stats.votes, icon: "🗳" },
          { label: "Score quiz", value: stats.quizScore ? `${stats.quizScore}/20` : "—", icon: "🧠" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white p-5 text-center shadow-md border border-gray-100 dark:bg-slate-800 dark:border-slate-700 transition-transform hover:scale-[1.03]"
          >
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-slate-700 text-2xl">
              {s.icon}
            </div>
            <p className="text-2xl font-bold dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges — grid 3x2 with glow/lock */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Badges</h2>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {ALL_BADGES.map((badge) => {
          const unlocked = unlockedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`relative rounded-xl p-5 text-center transition-all duration-300 ${
                unlocked
                  ? "bg-white shadow-lg shadow-yellow-200/50 ring-2 ring-yellow-400 dark:bg-slate-800 dark:shadow-yellow-500/20"
                  : "bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 opacity-60"
              }`}
            >
              {!unlocked && (
                <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <span className="text-4xl block">{badge.emoji}</span>
              <p className="mt-2 font-bold text-sm dark:text-white">{badge.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">{badge.description}</p>
              {unlocked && (
                <span className="mt-2 inline-block rounded-full bg-field/10 px-2 py-0.5 text-xs text-field font-semibold dark:bg-field/20 dark:text-field">
                  Débloqué
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Share */}
      <button
        onClick={shareText}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
      >
        Partager mes badges 🚀
      </button>
    </div>
  );
}
