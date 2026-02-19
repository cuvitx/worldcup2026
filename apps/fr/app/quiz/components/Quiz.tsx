"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { questions, categoryLabels, difficultyLabels, type Question, type Difficulty } from "../data/questions";

type Category = Question["category"] | "all";
type DifficultyFilter = Difficulty | "all";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

const QUESTIONS_PER_GAME = 20;
const TIMER_SECONDS = 30;

export default function Quiz() {
  const [phase, setPhase] = useState<"menu" | "playing" | "result">("menu");
  const [category, setCategory] = useState<Category>("all");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("all");
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of questions) {
      counts[q.category] = (counts[q.category] || 0) + 1;
    }
    return counts;
  }, []);

  const startGame = useCallback((cat: Category) => {
    setCategory(cat);
    let pool = cat === "all" ? questions : questions.filter((q) => q.category === cat);
    if (difficulty !== "all") pool = pool.filter((q) => q.difficulty === difficulty);
    const picked = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    setGameQuestions(picked);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setTimeLeft(TIMER_SECONDS);
    setPhase("playing");
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (phase !== "playing" || !timerEnabled || selected !== null) return;
    if (timeLeft <= 0) {
      // Time's up — treat as wrong
      setSelected(-1);
      setTimeout(() => nextQuestion(), 2000);
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timerEnabled, selected, timeLeft]);

  const currentQuestion = gameQuestions[currentIndex];

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= gameQuestions.length) {
      setPhase("result");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(TIMER_SECONDS);
    }
  }, [currentIndex, gameQuestions.length]);

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null || !currentQuestion) return;
      setSelected(idx);
      if (idx === currentQuestion.correctIndex) {
        setScore((s) => s + 1);
      }
      setTimeout(() => nextQuestion(), 2000);
    },
    [selected, currentQuestion, nextQuestion]
  );

  const scoreEmoji = score > 15 ? "🏆" : score > 10 ? "⭐" : score > 5 ? "👍" : "🤔";
  const scoreMessage =
    score > 15
      ? "Excellent ! Tu es un vrai expert du football !"
      : score > 10
        ? "Très bien ! Tu connais bien la Coupe du Monde !"
        : score > 5
          ? "Pas mal ! Tu as de bonnes bases."
          : "Continue à apprendre, la CDM 2026 arrive bientôt !";

  const shareText = `J'ai obtenu ${score}/${gameQuestions.length} au Quiz Coupe du Monde 2026 ! ${scoreEmoji} Teste tes connaissances toi aussi !`;

  // MENU
  if (phase === "menu") {
    return (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">Choisissez une catégorie</h2>
        <p className="text-center text-gray-500 mb-6">ou jouez avec toutes les questions</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => startGame("all")}
            className="rounded-xl border-2 border-secondary/50 bg-secondary/5 dark:bg-secondary/10 p-5 text-left hover:bg-secondary/10 dark:hover:bg-secondary/15 transition-colors shadow-sm"
          >
            <span className="text-3xl">🌍</span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">Toutes les catégories</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{questions.length} questions</p>
          </button>

          {(Object.keys(categoryLabels) as Question["category"][]).map((cat) => (
            <button
              key={cat}
              onClick={() => startGame(cat)}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800/50 p-5 text-left shadow-sm hover:border-secondary/50 hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-colors"
            >
              <span className="text-3xl">{categoryLabels[cat].emoji}</span>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-2">{categoryLabels[cat].label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{categoryCounts[cat] || 0} questions</p>
            </button>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <span className="text-sm text-gray-600 dark:text-gray-300 mr-1">Difficulté :</span>
          <button
            onClick={() => setDifficulty("all")}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${difficulty === "all" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50"}`}
          >
            Toutes
          </button>
          {(Object.keys(difficultyLabels) as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${difficulty === d ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50"}`}
            >
              {difficultyLabels[d].emoji} {difficultyLabels[d].label}
            </button>
          ))}
        </div>

        <label className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={timerEnabled}
            onChange={(e) => setTimerEnabled(e.target.checked)}
            className="accent-secondary"
          />
          ⏱️ Timer (30s par question)
        </label>
      </div>
    );
  }

  // RESULT
  if (phase === "result") {
    return (
      <div className="max-w-lg mx-auto text-center">
        <div className="text-4xl mb-4 sm:text-7xl">{scoreEmoji}</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {score}/{gameQuestions.length}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{scoreMessage}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setPhase("menu")}
            className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 font-semibold text-white transition-colors"
          >
            🔄 Rejouer
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: "Quiz CDM 2026", text: shareText });
              } else {
                navigator.clipboard.writeText(shareText);
                alert("Score copié dans le presse-papier !");
              }
            }}
            className="px-6 py-3 rounded-lg bg-field hover:bg-field/90 font-semibold text-white transition-colors"
          >
            📤 Partager mon score
          </button>
        </div>
      </div>
    );
  }

  // PLAYING
  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / gameQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>
          Question {currentIndex + 1}/{gameQuestions.length}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {categoryLabels[currentQuestion.category].emoji} {categoryLabels[currentQuestion.category].label}
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            {difficultyLabels[currentQuestion.difficulty].emoji} {difficultyLabels[currentQuestion.difficulty].label}
          </span>
          {timerEnabled && (
            <span className={`font-mono ${timeLeft <= 10 ? "text-red-400" : ""}`}>
              ⏱️ {timeLeft}s
            </span>
          )}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700/50 rounded-full mb-6 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-full" />
        </div>
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{currentQuestion.question}</h3>

      {/* Options */}
      <div className="grid gap-3">
        {currentQuestion.options.map((opt, idx) => {
          let classes = "w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-300 ease-out ";
          if (selected === null) {
            classes += "border-gray-200 dark:border-gray-600 bg-white dark:bg-slate-800/50 text-gray-900 dark:text-gray-100 hover:border-secondary/40 hover:bg-secondary/5 dark:hover:bg-secondary/10 hover:shadow-lg hover:shadow-secondary/10 hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer active:scale-[0.98]";
          } else if (idx === currentQuestion.correctIndex) {
            classes += "border-success bg-success//10 dark:bg-success//15 text-success dark:text-success shadow-lg shadow-success//20 scale-[1.01]";
          } else if (idx === selected) {
            classes += "border-red-500 bg-red-50 dark:bg-red-500/20 text-red-700 dark:text-red-300 shadow-lg shadow-red-500/20 animate-[shake_0.4s_ease-in-out]";
          } else {
            classes += "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800/30 text-gray-400 dark:text-gray-400 opacity-50";
          }

          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={selected !== null} className={classes}>
              <span className="mr-2 font-bold text-gray-500">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected !== null && (
        <div
          className={`mt-4 p-4 rounded-xl text-sm animate-[fadeSlideIn_0.3s_ease-out] ${
            selected === currentQuestion.correctIndex
              ? "bg-success//10 dark:bg-success//10 border border-success//30 dark:border-success//20 text-success dark:text-success"
              : "bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300"
          }`}
        >
          {selected === currentQuestion.correctIndex ? "✅ Bonne réponse ! " : "❌ Mauvaise réponse. "}
          {currentQuestion.explanation}
        </div>
      )}

      {/* Score */}
      <div className="text-center text-sm text-gray-500 mt-4">
        Score actuel : {score}/{currentIndex + (selected !== null ? 1 : 0)}
      </div>
    </div>
  );
}
