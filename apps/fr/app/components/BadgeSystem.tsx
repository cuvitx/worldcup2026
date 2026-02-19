"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { usePathname } from "next/navigation";

// --- Types ---
export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  check: (stats: UserStats) => boolean;
}

export interface UserStats {
  visitedPages: string[];
  votes: number;
  quizScore: number;
  bracketCompleted: boolean;
  streak: number;
}

// --- Badges definition ---
const BADGES: Badge[] = [
  { id: "explorer", emoji: "🌍", name: "Explorateur", description: "Visiter 10+ pages différentes", check: (s) => s.visitedPages.length >= 10 },
  { id: "predictor", emoji: "🎯", name: "Pronostiqueur", description: "Faire 5+ votes communautaires", check: (s) => s.votes >= 5 },
  { id: "expert", emoji: "🧠", name: "Expert", description: "Score quiz > 15/20", check: (s) => s.quizScore > 15 },
  { id: "complete", emoji: "🏆", name: "Complet", description: "Terminer le simulateur de bracket", check: (s) => s.bracketCompleted },
  { id: "loyal", emoji: "🔥", name: "Fidèle", description: "3+ jours consécutifs de visite", check: (s) => s.streak >= 3 },
];

// Superfan added dynamically
const SUPERFAN: Badge = { id: "superfan", emoji: "⭐", name: "Superfan", description: "Débloquer tous les autres badges", check: () => false };

export const ALL_BADGES = [...BADGES, SUPERFAN];

// --- localStorage keys ---
const KEYS = {
  visitedPages: "cdm2026-visited-pages",
  streak: "cdm2026-streak",
  streakLastDate: "cdm2026-streak-last-date",
  votes: "cdm2026-votes",
  quizScore: "cdm2026-quiz-score",
  bracketDone: "cdm2026-bracket-done",
  unlockedBadges: "cdm2026-unlocked-badges",
};

// --- Helpers ---
function getJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

function setJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// --- Context for toast ---
interface BadgeContextType {
  stats: UserStats;
  unlockedBadges: string[];
  trackVote: () => void;
  trackQuizScore: (score: number) => void;
  trackBracketComplete: () => void;
}

const BadgeContext = createContext<BadgeContextType | null>(null);
export const useBadges = () => useContext(BadgeContext);

// --- Toast component ---
function BadgeToast({ badge, onDone }: { badge: Badge; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-[slideUp_300ms_ease-out] pointer-events-auto">
      <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 px-5 py-3 text-white shadow-2xl">
        <span className="text-3xl">{badge.emoji}</span>
        <div>
          <p className="text-xs font-medium opacity-90">Badge débloqué !</p>
          <p className="font-bold">{badge.name}</p>
        </div>
      </div>
    </div>
  );
}

// --- Main component ---
export function BadgeSystem({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stats, setStats] = useState<UserStats>({ visitedPages: [], votes: 0, quizScore: 0, bracketCompleted: false, streak: 0 });
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [toastBadge, setToastBadge] = useState<Badge | null>(null);
  const [toastQueue, setToastQueue] = useState<Badge[]>([]);

  // Load stats from localStorage on mount
  useEffect(() => {
    const visitedPages: string[] = getJSON(KEYS.visitedPages, []);
    const votes: number = getJSON(KEYS.votes, 0);
    const quizScore: number = getJSON(KEYS.quizScore, 0);
    const bracketCompleted: boolean = getJSON(KEYS.bracketDone, false);

    // Streak logic
    const lastDate = localStorage.getItem(KEYS.streakLastDate) || "";
    let streak: number = getJSON(KEYS.streak, 0);
    const today = todayStr();

    if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (lastDate === yesterday) {
        streak += 1;
      } else if (lastDate !== today) {
        streak = 1;
      }
      setJSON(KEYS.streak, streak);
      localStorage.setItem(KEYS.streakLastDate, today);
    }

    const loaded: UserStats = { visitedPages, votes, quizScore, bracketCompleted, streak };
    setStats(loaded);
    setUnlockedBadges(getJSON(KEYS.unlockedBadges, []));
  }, []);

  // Track page visits
  useEffect(() => {
    if (!pathname) return;
    setStats((prev) => {
      if (prev.visitedPages.includes(pathname)) return prev;
      const updated = [...prev.visitedPages, pathname];
      setJSON(KEYS.visitedPages, updated);
      return { ...prev, visitedPages: updated };
    });
  }, [pathname]);

  // Check badges whenever stats change
  useEffect(() => {
    const currentUnlocked = getJSON<string[]>(KEYS.unlockedBadges, []);
    const newlyUnlocked: Badge[] = [];

    for (const badge of BADGES) {
      if (!currentUnlocked.includes(badge.id) && badge.check(stats)) {
        currentUnlocked.push(badge.id);
        newlyUnlocked.push(badge);
      }
    }

    // Superfan check
    if (!currentUnlocked.includes("superfan") && BADGES.every((b) => currentUnlocked.includes(b.id))) {
      currentUnlocked.push("superfan");
      newlyUnlocked.push(SUPERFAN);
    }

    if (newlyUnlocked.length > 0) {
      setJSON(KEYS.unlockedBadges, currentUnlocked);
      setUnlockedBadges([...currentUnlocked]);
      setToastQueue((q) => [...q, ...newlyUnlocked]);
    }
  }, [stats]);

  // Toast queue processing
  useEffect(() => {
    if (!toastBadge && toastQueue.length > 0) {
      setToastBadge(toastQueue[0]!);
      setToastQueue((q) => q.slice(1));
    }
  }, [toastBadge, toastQueue]);

  const trackVote = useCallback(() => {
    setStats((prev) => {
      const v = prev.votes + 1;
      setJSON(KEYS.votes, v);
      return { ...prev, votes: v };
    });
  }, []);

  const trackQuizScore = useCallback((score: number) => {
    setStats((prev) => {
      if (score <= prev.quizScore) return prev;
      setJSON(KEYS.quizScore, score);
      return { ...prev, quizScore: score };
    });
  }, []);

  const trackBracketComplete = useCallback(() => {
    setStats((prev) => {
      if (prev.bracketCompleted) return prev;
      setJSON(KEYS.bracketDone, true);
      return { ...prev, bracketCompleted: true };
    });
  }, []);

  return (
    <BadgeContext.Provider value={{ stats, unlockedBadges, trackVote, trackQuizScore, trackBracketComplete }}>
      {children}
      {toastBadge && <BadgeToast badge={toastBadge} onDone={() => setToastBadge(null)} />}
    </BadgeContext.Provider>
  );
}
