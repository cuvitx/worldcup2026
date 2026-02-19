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
      <h1 className="mb-2 text-3xl font-bold">Mon Profil 🏅</h1>
      <p className="mb-8 text-gray-500 dark:text-gray-400">Tes stats et badges — sans compte, tout est local.</p>

      {/* Streak */}
      <div className="mb-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 text-white shadow-lg">
        <span className="text-4xl">🔥</span>
        <div>
          <p className="text-sm font-medium opacity-90">Streak actuel</p>
          <p className="text-3xl font-extrabold">{stats.streak} jour{stats.streak !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Pages visitées", value: stats.visitedPages.length, emoji: "📄" },
          { label: "Votes", value: stats.votes, emoji: "🗳️" },
          { label: "Score quiz", value: stats.quizScore ? `${stats.quizScore}/20` : "—", emoji: "🧠" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white p-4 text-center shadow dark:bg-slate-800">
            <p className="text-2xl">{s.emoji}</p>
            <p className="mt-1 text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badges */}
      <h2 className="mb-4 text-xl font-bold">Badges</h2>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {ALL_BADGES.map((badge) => {
          const unlocked = unlockedBadges.includes(badge.id);
          return (
            <div
              key={badge.id}
              className={`rounded-xl p-4 text-center transition-all ${
                unlocked
                  ? "bg-white shadow-lg ring-2 ring-yellow-400 dark:bg-slate-800"
                  : "bg-gray-100 opacity-50 grayscale dark:bg-slate-800/50"
              }`}
            >
              <span className="text-4xl">{badge.emoji}</span>
              <p className="mt-2 font-bold text-sm">{badge.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{badge.description}</p>
              {unlocked && <span className="mt-1 inline-block text-xs text-green-600 font-medium">✅ Débloqué</span>}
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
