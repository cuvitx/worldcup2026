"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Flag, RotateCcw, ArrowRight, Check, X, Trophy } from "lucide-react";

interface Team {
  name: string;
  flag: string;
}

const teams: Team[] = [
  { name: "Argentine", flag: "🇦🇷" }, { name: "France", flag: "🇫🇷" }, { name: "Brésil", flag: "🇧🇷" },
  { name: "Angleterre", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" }, { name: "Espagne", flag: "🇪🇸" }, { name: "Allemagne", flag: "🇩🇪" },
  { name: "Portugal", flag: "🇵🇹" }, { name: "Pays-Bas", flag: "🇳🇱" }, { name: "Belgique", flag: "🇧🇪" },
  { name: "Italie", flag: "🇮🇹" }, { name: "Croatie", flag: "🇭🇷" }, { name: "Uruguay", flag: "🇺🇾" },
  { name: "Colombie", flag: "🇨🇴" }, { name: "Mexique", flag: "🇲🇽" }, { name: "États-Unis", flag: "🇺🇸" },
  { name: "Canada", flag: "🇨🇦" }, { name: "Japon", flag: "🇯🇵" }, { name: "Corée du Sud", flag: "🇰🇷" },
  { name: "Australie", flag: "🇦🇺" }, { name: "Arabie Saoudite", flag: "🇸🇦" }, { name: "Iran", flag: "🇮🇷" },
  { name: "Qatar", flag: "🇶🇦" }, { name: "Maroc", flag: "🇲🇦" }, { name: "Sénégal", flag: "🇸🇳" },
  { name: "Cameroun", flag: "🇨🇲" }, { name: "Ghana", flag: "🇬🇭" }, { name: "Nigeria", flag: "🇳🇬" },
  { name: "Tunisie", flag: "🇹🇳" }, { name: "Égypte", flag: "🇪🇬" }, { name: "Côte d'Ivoire", flag: "🇨🇮" },
  { name: "Afrique du Sud", flag: "🇿🇦" }, { name: "Mali", flag: "🇲🇱" }, { name: "Équateur", flag: "🇪🇨" },
  { name: "Paraguay", flag: "🇵🇾" }, { name: "Suisse", flag: "🇨🇭" }, { name: "Danemark", flag: "🇩🇰" },
  { name: "Autriche", flag: "🇦🇹" }, { name: "Serbie", flag: "🇷🇸" }, { name: "Pologne", flag: "🇵🇱" },
  { name: "Ukraine", flag: "🇺🇦" }, { name: "Turquie", flag: "🇹🇷" }, { name: "Écosse", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { name: "Pays de Galles", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" }, { name: "Norvège", flag: "🇳🇴" }, { name: "Indonésie", flag: "🇮🇩" },
  { name: "Nouvelle-Zélande", flag: "🇳🇿" }, { name: "Costa Rica", flag: "🇨🇷" }, { name: "Pérou", flag: "🇵🇪" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function getChoices(correct: Team, all: Team[]): string[] {
  const others = all.filter((t) => t.name !== correct.name);
  const wrong = shuffle(others).slice(0, 3).map((t) => t.name);
  return shuffle([correct.name, ...wrong]);
}

export default function QuizDrapeauxPage() {
  const [shuffled] = useState(() => shuffle(teams));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const choices = useMemo(() => {
    if (current < shuffled.length) {
      return getChoices(shuffled[current]!, shuffled);
    }
    return [];
  }, [current, shuffled]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (selected) return;
      setSelected(answer);
      const correct = answer === shuffled[current]!.name;
      if (correct) setScore((s) => s + 1);
      setTimeout(() => {
        if (current + 1 >= shuffled.length) {
          setFinished(true);
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
        }
      }, 1200);
    },
    [selected, current, shuffled]
  );

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <Trophy className="h-16 w-16 text-secondary mx-auto" />
          <h1 className="text-3xl font-extrabold text-primary">
            Quiz terminé !
          </h1>
          <p className="text-5xl font-black text-accent">
            {score}/{shuffled.length}
          </p>
          <p className="text-gray-600">
            {pct >= 90
              ? "Excellent ! Vous êtes un expert des drapeaux !"
              : pct >= 60
                ? "Bien joué ! Vous connaissez vos drapeaux."
                : "Pas mal, mais il y a de la marge de progression !"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={restart}
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
            >
              <RotateCcw className="h-4 w-4" /> Rejouer
            </button>
            <Link
              href="/quiz/stades"
              className="inline-flex items-center gap-2 border border-gray-300 rounded-xl py-3.5 px-8 font-semibold hover:bg-gray-50 transition-colors"
            >
              Quiz Stades <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const team = shuffled[current]!;

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white py-4 px-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-secondary" />
            <span className="font-bold">Quiz Drapeaux CDM 2026</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span>
              Question {current + 1}/{shuffled.length}
            </span>
            <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
              {score} pts
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 h-1.5">
        <div
          className="bg-accent h-1.5 transition-all duration-300"
          style={{ width: `${((current + 1) / shuffled.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <p className="text-sm text-gray-500 mb-4">Quel pays est représenté par ce drapeau ?</p>
            <div className="text-[8rem] leading-none">{team.flag}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {choices.map((choice) => {
              let cls = "border border-gray-200 hover:border-accent";
              if (selected) {
                if (choice === team.name) {
                  cls = "border-2 border-green-500 bg-green-50green-900/20";
                } else if (choice === selected && choice !== team.name) {
                  cls = "border-2 border-red-500 bg-red-50red-900/20";
                } else {
                  cls = "border border-gray-200 opacity-50";
                }
              }
              return (
                <button
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  disabled={!!selected}
                  className={`rounded-xl py-3 px-4 font-medium text-sm transition-all flex items-center justify-center gap-2 ${cls}`}
                >
                  {selected && choice === team.name && <Check className="h-4 w-4 text-green-600" />}
                  {selected && choice === selected && choice !== team.name && <X className="h-4 w-4 text-red-600" />}
                  {choice}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
