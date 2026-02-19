"use client";

import { useEffect, useState, useCallback, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import {
  BADGE_DEFS,
  BADGE_KEYS,
  TOTAL_STADIUMS,
  getLS,
  setLS,
  checkBadge,
  type BadgeDef,
  type BadgeState,
} from "./badges";

// Re-export for consumers
export { BADGE_DEFS } from "./badges";
export type { BadgeDef } from "./badges";

// Legacy compat — keep ALL_BADGES shape
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
  pronoCount: number;
  pronoCorrectStreak: number;
  visitDays: number;
  quizBestPercent: number;
  visitedStadiums: number;
}

// Map new badges to legacy Badge interface
export const ALL_BADGES: Badge[] = BADGE_DEFS.map((b) => ({
  id: b.id,
  emoji: b.emoji,
  name: b.name,
  description: b.description,
  check: () => false,
}));

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

interface BadgeContextType {
  stats: UserStats;
  unlockedBadges: string[];
  trackVote: () => void;
  trackQuizScore: (score: number) => void;
  trackBracketComplete: () => void;
  trackProno: () => void;
  trackPronoCorrect: () => void;
  trackPronoWrong: () => void;
}

const BadgeContext = createContext<BadgeContextType | null>(null);
export const useBadges = () => useContext(BadgeContext);

function BadgeToast({ badge, onDone }: { badge: BadgeDef; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3500);
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

export function BadgeSystem({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stats, setStats] = useState<UserStats>({
    visitedPages: [], votes: 0, quizScore: 0, bracketCompleted: false, streak: 0,
    pronoCount: 0, pronoCorrectStreak: 0, visitDays: 0, quizBestPercent: 0, visitedStadiums: 0,
  });
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [toastBadge, setToastBadge] = useState<BadgeDef | null>(null);
  const [toastQueue, setToastQueue] = useState<BadgeDef[]>([]);

  // Load from localStorage
  useEffect(() => {
    const visitedPages: string[] = getLS(BADGE_KEYS.visitedPages, []);
    const votes: number = getLS("cdm2026-votes", 0);
    const quizScore: number = getLS("cdm2026-quiz-score", 0);
    const bracketCompleted: boolean = getLS(BADGE_KEYS.bracketDone, false);
    const pronoCount: number = getLS(BADGE_KEYS.pronoCount, 0);
    const pronoCorrectStreak: number = getLS(BADGE_KEYS.pronoCorrectStreak, 0);
    const visitedStadiums: number = getLS(BADGE_KEYS.visitedStadiums, []).length || 0;
    const quizBestPercent: number = getLS(BADGE_KEYS.quizBestPercent, 0);

    // Visit days
    const visitDaysArr: string[] = getLS(BADGE_KEYS.visitDays, []);
    const today = todayStr();
    if (!visitDaysArr.includes(today)) {
      visitDaysArr.push(today);
      setLS(BADGE_KEYS.visitDays, visitDaysArr);
    }

    // Streak
    const lastDate = typeof window !== "undefined" ? localStorage.getItem(BADGE_KEYS.streakLastDate) || "" : "";
    let streak: number = getLS(BADGE_KEYS.streak, 0);
    if (lastDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      streak = lastDate === yesterday ? streak + 1 : 1;
      setLS(BADGE_KEYS.streak, streak);
      if (typeof window !== "undefined") localStorage.setItem(BADGE_KEYS.streakLastDate, today);
    }

    setStats({
      visitedPages, votes, quizScore, bracketCompleted, streak,
      pronoCount, pronoCorrectStreak, visitDays: visitDaysArr.length,
      quizBestPercent: quizBestPercent || (quizScore > 0 ? (quizScore / 20) * 100 : 0),
      visitedStadiums,
    });
    setUnlockedBadges(getLS(BADGE_KEYS.unlockedBadges, []));
  }, []);

  // Track page visits + stadium visits
  useEffect(() => {
    if (!pathname) return;
    setStats((prev) => {
      const updates: Partial<UserStats> = {};
      let changed = false;

      if (!prev.visitedPages.includes(pathname)) {
        updates.visitedPages = [...prev.visitedPages, pathname];
        setLS(BADGE_KEYS.visitedPages, updates.visitedPages);
        changed = true;
      }

      // Track stadium page visits
      if (pathname.startsWith("/stade/")) {
        const stadiumSlugs: string[] = getLS(BADGE_KEYS.visitedStadiums, []);
        const slug = pathname.replace("/stade/", "").replace(/\/$/, "");
        if (!stadiumSlugs.includes(slug)) {
          stadiumSlugs.push(slug);
          setLS(BADGE_KEYS.visitedStadiums, stadiumSlugs);
          updates.visitedStadiums = stadiumSlugs.length;
          changed = true;
        }
      }

      return changed ? { ...prev, ...updates } : prev;
    });
  }, [pathname]);

  // Check badges
  useEffect(() => {
    const currentUnlocked: string[] = getLS(BADGE_KEYS.unlockedBadges, []);
    const badgeState: BadgeState = {
      pronoCount: stats.pronoCount,
      pronoCorrectStreak: stats.pronoCorrectStreak,
      streak: stats.streak,
      visitDays: stats.visitDays,
      quizBestPercent: stats.quizBestPercent,
      bracketDone: stats.bracketCompleted,
      visitedStadiums: stats.visitedStadiums,
    };

    const newlyUnlocked: BadgeDef[] = [];
    for (const b of BADGE_DEFS) {
      if (!currentUnlocked.includes(b.id) && checkBadge(b.id, badgeState)) {
        currentUnlocked.push(b.id);
        newlyUnlocked.push(b);
      }
    }

    if (newlyUnlocked.length > 0) {
      setLS(BADGE_KEYS.unlockedBadges, currentUnlocked);
      setUnlockedBadges([...currentUnlocked]);
      setToastQueue((q) => [...q, ...newlyUnlocked]);
    }
  }, [stats]);

  // Toast queue
  useEffect(() => {
    if (!toastBadge && toastQueue.length > 0) {
      setToastBadge(toastQueue[0]!);
      setToastQueue((q) => q.slice(1));
    }
  }, [toastBadge, toastQueue]);

  const trackVote = useCallback(() => {
    setStats((prev) => {
      const v = prev.votes + 1;
      setLS("cdm2026-votes", v);
      return { ...prev, votes: v };
    });
  }, []);

  const trackQuizScore = useCallback((score: number) => {
    setStats((prev) => {
      const pct = (score / 20) * 100;
      const bestPct = Math.max(prev.quizBestPercent, pct);
      setLS("cdm2026-quiz-score", score);
      setLS(BADGE_KEYS.quizBestPercent, bestPct);
      return { ...prev, quizScore: score, quizBestPercent: bestPct };
    });
  }, []);

  const trackBracketComplete = useCallback(() => {
    setStats((prev) => {
      if (prev.bracketCompleted) return prev;
      setLS(BADGE_KEYS.bracketDone, true);
      return { ...prev, bracketCompleted: true };
    });
  }, []);

  const trackProno = useCallback(() => {
    setStats((prev) => {
      const c = prev.pronoCount + 1;
      setLS(BADGE_KEYS.pronoCount, c);
      return { ...prev, pronoCount: c };
    });
  }, []);

  const trackPronoCorrect = useCallback(() => {
    setStats((prev) => {
      const s = prev.pronoCorrectStreak + 1;
      setLS(BADGE_KEYS.pronoCorrectStreak, s);
      return { ...prev, pronoCorrectStreak: s };
    });
  }, []);

  const trackPronoWrong = useCallback(() => {
    setLS(BADGE_KEYS.pronoCorrectStreak, 0);
    setStats((prev) => ({ ...prev, pronoCorrectStreak: 0 }));
  }, []);

  return (
    <BadgeContext.Provider value={{
      stats, unlockedBadges, trackVote, trackQuizScore, trackBracketComplete,
      trackProno, trackPronoCorrect, trackPronoWrong,
    }}>
      {children}
      {toastBadge && <BadgeToast badge={toastBadge} onDone={() => setToastBadge(null)} />}
    </BadgeContext.Provider>
  );
}
