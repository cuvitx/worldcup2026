"use client";

import { useBadges, ALL_BADGES } from "../components/BadgeSystem";

export default function ProfilPage() {
  const ctx = useBadges();

  if (!ctx) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  const { stats, unlockedBadges } = ctx;

  const shareText = () => {
    const earned = ALL_BADGES.filter((b) => unlockedBadges.includes(b.id));
    const text = earned.length
      ? `🏅 Mes badges CDM 2026 :\n${earned.map((b) => `${b.emoji} ${b.name}`).join("\n")}\n🔥 Streak : ${stats.streak} jour(s)\n\nhttps://mondial2026.fr/profil`
      : "Je n'ai pas encore de badges CDM 2026 ! 🏟️\nhttps://mondial2026.fr/profil";
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => alert("Copié dans le presse-papier !")).catch(() => {});
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold dark:text-white">Mon Profil 🏅</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Tes stats et badges — sans compte, tout est local.</p>

      {/* Streak — big animated flame */}
      <div className="mb-8 flex items-center gap-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-5 text-white shadow-lg">
        <span className="text-5xl animate-pulse drop-shadow-lg">🔥</span>
        <div>
          <p className="text-sm font-medium opacity-90">Streak actuel</p>
          <p className="text-4xl font-extrabold tracking-tight">{stats.streak} jour{stats.streak !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Stats cards with icons */}
      <div className="mb-10 grid grid-cols-3 gap-4">
        {[
          { label: "Pages visitées", value: stats.visitedPages.length, icon: "📄" },
          { label: "Votes", value: stats.votes, icon: "🗳️" },
          { label: "Score quiz", value: stats.quizScore ? `${stats.quizScore}/20` : "—", icon: "🧠" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl bg-white p-5 text-center shadow-md border border-gray-100 dark:bg-slate-800 dark:border-slate-700 transition-transform hover:scale-[1.03]"
          >
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-slate-700 text-2xl">
              {s.icon}
            </div>
            <p className="text-2xl font-bold dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges — grid 3x2 with glow/lock */}
      <h2 className="mb-4 text-xl font-bold dark:text-white">Badges</h2>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {ALL_BADGES.map((badge) => {
          const unlocked = unlockedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`relative rounded-xl p-5 text-center transition-all duration-300 ${
                unlocked
                  ? "bg-white shadow-lg shadow-yellow-200/50 ring-2 ring-yellow-400 dark:bg-slate-800 dark:shadow-yellow-500/20"
                  : "bg-gray-100 opacity-50 grayscale dark:bg-slate-800/50"
              }`}
            >
              {!unlocked && (
                <div className="absolute top-2 right-2 text-gray-400 dark:text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <span className="text-4xl block">{badge.emoji}</span>
              <p className="mt-2 font-bold text-sm dark:text-white">{badge.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{badge.description}</p>
              {unlocked && (
                <span className="mt-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 font-semibold dark:bg-green-900/30 dark:text-green-400">
                  ✅ Débloqué
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Share */}
      <button
        onClick={shareText}
        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
      >
        Partager mes badges 🚀
      </button>
    </div>
  );
}
