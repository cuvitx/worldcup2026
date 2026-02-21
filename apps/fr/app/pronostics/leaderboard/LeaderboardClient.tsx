"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Share2 } from "lucide-react";

// --- Types ---
interface Player {
  pseudo: string;
  points: number;
  totalPronos: number;
  exactResults: number;
  correctWinner: number;
  isCurrentUser?: boolean;
}

// --- Fake players for demo ---
const FAKE_NAMES = [
  "Zizou_Fan", "LeBrésilien", "GoalMaster", "PronoKing", "Mbappe4Ever",
  "TikiTaka", "FutbolLoco", "ElMago", "Weltmeister", "AzzurriFan",
  "SambaKick", "Threelions", "OranjeArmy", "LesBleus2026", "Goleador",
  "SoccerNerd", "MatchDay", "HattrickHero", "PenaltyPro", "VAR_Victim",
];

function generateFakePlayers(): Player[] {
  // Seed-based pseudo-random for consistency within a session
  return FAKE_NAMES.map((pseudo) => {
    const totalPronos = 10 + Math.floor(Math.random() * 40);
    const exactResults = Math.floor(Math.random() * Math.min(totalPronos, 15));
    const correctWinner = Math.floor(Math.random() * (totalPronos - exactResults));
    const points = exactResults * 3 + correctWinner * 1;
    return { pseudo, points, totalPronos, exactResults, correctWinner };
  });
}

function getUserPseudo(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cdm2026-pseudo");
}

function getUserPronoStats(): Player | null {
  if (typeof window === "undefined") return null;
  const pseudo = getUserPseudo();
  if (!pseudo) return null;
  try {
    const pronos = JSON.parse(localStorage.getItem("cdm2026-user-pronos") || "[]") as Array<{
      exact?: boolean;
      correctWinner?: boolean;
    }>;
    const totalPronos = pronos.length;
    const exactResults = pronos.filter((p) => p.exact).length;
    const correctWinner = pronos.filter((p) => !p.exact && p.correctWinner).length;
    const points = exactResults * 3 + correctWinner;
    return { pseudo, points, totalPronos, exactResults, correctWinner, isCurrentUser: true };
  } catch {
    return { pseudo, points: 0, totalPronos: 0, exactResults: 0, correctWinner: 0, isCurrentUser: true };
  }
}

// --- Component ---
export function LeaderboardClient() {
  const [fakePlayers] = useState(generateFakePlayers);
  const [pseudo, setPseudo] = useState("");
  const [hasPseudo, setHasPseudo] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = getUserPseudo();
    if (p) {
      setPseudo(p);
      setHasPseudo(true);
    }
  }, []);

  const savePseudo = () => {
    const trimmed = pseudo.trim();
    if (!trimmed) return;
    localStorage.setItem("cdm2026-pseudo", trimmed);
    setHasPseudo(true);
  };

  const players = useMemo(() => {
    const all = [...fakePlayers];
    const userPlayer = getUserPronoStats();
    if (userPlayer && hasPseudo) {
      // Replace or add
      const idx = all.findIndex((p) => p.pseudo === userPlayer.pseudo);
      if (idx >= 0) all[idx] = userPlayer;
      else all.push(userPlayer);
    }
    return all.sort((a, b) => b.points - a.points || b.exactResults - a.exactResults);
  }, [fakePlayers, hasPseudo]);

  const shareClassement = () => {
    const userPlayer = players.find((p) => p.isCurrentUser);
    const rank = userPlayer ? players.indexOf(userPlayer) + 1 : null;
    const text = userPlayer
      ? `CDM 2026 — Classement Pronostics\n${rank}${rank === 1 ? "er" : "e"} avec ${userPlayer.points} pts (${userPlayer.totalPronos} pronos)\n\n https://www.cdm2026.fr/pronostics/leaderboard`
      : `Classement Pronostics CDM 2026\n https://www.cdm2026.fr/pronostics/leaderboard`;

    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {});
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="text-primary hover:underline">Accueil</Link>
        <span className="mx-2">›</span>
        <Link href="/pronostic" className="text-primary hover:underline">Pronostics</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800">Classement</span>
      </nav>

      <h1 className="mb-2 text-3xl font-bold">Classement Pronostics</h1>
      <p className="mb-6 text-gray-500">
        3 pts pour un résultat exact · 1 pt pour le bon vainqueur
      </p>

      {/* Pseudo input */}
      {!hasPseudo && (
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="mb-3 text-sm font-medium text-primary">
            Choisis un pseudo pour apparaître dans le classement :
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={pseudo}
              onChange={(e) => setPseudo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && savePseudo()}
              placeholder="Ton pseudo..."
              maxLength={20}
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            <button
              onClick={savePseudo}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary/90"
            >
              Valider
            </button>
          </div>
        </div>
      )}

      {/* Top 3 podium */}
      <div className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
        {[1, 0, 2].map((idx) => {
          const p = players[idx];
          if (!p) return null;
          const rank = idx + 1;
          const medals = ["", "", ""];
          const heights = ["h-28 sm:h-36", "h-36 sm:h-44", "h-24 sm:h-28"];
          const bgs = [
            "from-yellow-400 to-amber-500",
            "from-yellow-500 to-yellow-600",
            "from-orange-400 to-amber-500",
          ];
          return (
            <div key={p.pseudo} className={`flex flex-col items-center justify-end ${idx === 0 ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}>
              <span className="text-2xl sm:text-4xl mb-1">{medals[rank - 1]}</span>
              <p className={`text-xs sm:text-sm font-bold truncate max-w-full ${p.isCurrentUser ? "text-accent" : ""}`}>
                {p.pseudo}
              </p>
              <p className="text-xs text-gray-500">{p.points} pts</p>
              <div className={`mt-2 w-full rounded-t-xl bg-gradient-to-b ${bgs[rank - 1]} ${heights[rank - 1]}`} />
            </div>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
              <th className="px-4 py-3 w-12">#</th>
              <th className="px-4 py-3">Pseudo</th>
              <th className="px-4 py-3 text-right">Points</th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">Pronos</th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">Exacts</th>
              <th className="hidden px-4 py-3 text-right md:table-cell">% Réussite</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {players.map((p, i) => {
              const rank = i + 1;
              const successRate = p.totalPronos > 0
                ? Math.round(((p.exactResults + p.correctWinner) / p.totalPronos) * 100)
                : 0;
              return (
                <tr
                  key={p.pseudo}
                  className={`transition-colors ${
                    p.isCurrentUser
                      ? "bg-primary/5 font-semiboldsecondary/10"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 font-bold text-gray-400">
                    {rank <= 3 ? ["", "", ""][rank - 1] : rank}
                  </td>
                  <td className={`px-4 py-3 ${p.isCurrentUser ? "text-accent" : ""}`}>
                    {p.pseudo}
                    {p.isCurrentUser && <span className="ml-2 text-xs opacity-70">(toi)</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-bold">{p.points}</td>
                  <td className="hidden px-4 py-3 text-right text-gray-500 sm:table-cell">{p.totalPronos}</td>
                  <td className="hidden px-4 py-3 text-right text-gray-500 sm:table-cell">{p.exactResults}</td>
                  <td className="hidden px-4 py-3 text-right md:table-cell">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                      successRate >= 50
                        ? "bg-accent/15 text-accent"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {successRate}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Share button */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={shareClassement}
          className="flex-1 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95 inline-flex items-center justify-center gap-2"
        >
          {!copied && <Share2 className="w-4 h-4" />}
          {copied ? "Copié !" : "Partager mon classement"}
        </button>
        <Link
          href="/profil"
          className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-bold text-white shadow-lg text-center transition-transform hover:scale-[1.02] active:scale-95"
        >
          Mes badges
        </Link>
      </div>

      {/* Scoring explanation */}
      <div className="mt-8 rounded-xl bg-gray-50 p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Comment ça marche ?</h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-accent">●</span>
            <span><strong>3 points</strong> — Résultat exact (bon score)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-accent">●</span>
            <span><strong>1 point</strong> — Bon vainqueur (ou match nul correctement prédit)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-0.5 text-red-500">●</span>
            <span><strong>0 point</strong> — Mauvais pronostic</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
