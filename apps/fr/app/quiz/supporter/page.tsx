"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

/* ─── Types ────────────────────────────────────────────────── */

interface QuizOption {
  label: string;
  points: Record<string, number>; // teamSlug → points
}

interface QuizQuestion {
  question: string;
  emoji: string;
  options: QuizOption[];
}

/* ─── Team result data ─────────────────────────────────────── */

const TEAM_INFO: Record<string, { flag: string; name: string; desc: string }> = {
  france: { flag: "🇫🇷", name: "France", desc: "Les Bleus, double champions du monde ! Style flamboyant, talents de classe mondiale et un collectif redoutable. Tu aimes le prestige et le beau jeu." },
  bresil: { flag: "🇧🇷", name: "Brésil", desc: "La Seleção, 5 étoiles ! Le football-art, la samba, Neymar... Tu es un romantique du ballon rond qui rêve de ginga." },
  argentine: { flag: "🇦🇷", name: "Argentine", desc: "L'Albiceleste, champions en titre ! Messi, la garra, la passion. Tu vibres pour l'émotion pure du football sud-américain." },
  allemagne: { flag: "🇩🇪", name: "Allemagne", desc: "La Mannschaft, l'efficacité incarnée. 4 étoiles, un jeu collectif millimétré. Tu es un stratège qui respecte la rigueur." },
  espagne: { flag: "🇪🇸", name: "Espagne", desc: "La Roja, le tiki-taka ! Possession, technique, élégance. Tu apprécies le football comme un art collectif." },
  angleterre: { flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", name: "Angleterre", desc: "Les Three Lions, la patrie du football ! Intensité, passion et Premier League DNA. Tu aimes le football à 100 à l'heure." },
  portugal: { flag: "🇵🇹", name: "Portugal", desc: "A Seleção, le talent pur ! Ronaldo, flair et technique individuelle. Tu crois aux exploits personnels qui changent un match." },
  japon: { flag: "🇯🇵", name: "Japon", desc: "Les Samouras Bleus, la surprise asiatique ! Discipline, vitesse et esprit collectif. Tu supportes l'outsider qui fait tomber les géants." },
  maroc: { flag: "🇲🇦", name: "Maroc", desc: "Les Lions de l'Atlas, héros de 2022 ! Défense de fer, fierté et histoire en marche. Tu aimes les épopées et les destins de conte de fées." },
  "etats-unis": { flag: "🇺🇸", name: "États-Unis", desc: "Team USA, co-hôte de 2026 ! Énergie, athlétisme et une nouvelle génération dorée. Tu crois au rêve américain version football." },
  mexique: { flag: "🇲🇽", name: "Mexique", desc: "El Tri, co-hôte passionné ! Ambiance de folie, technique et fierté latino. Tu veux vivre la CDM depuis les tribunes du stade Azteca." },
  senegal: { flag: "🇸🇳", name: "Sénégal", desc: "Les Lions de la Téranga, la force africaine ! Puissance, talent et fierté. Tu supportes l'Afrique et ses champions." },
};

/* ─── Questions ─────────────────────────────────────────────── */

const questions: QuizQuestion[] = [
  {
    question: "Tu préfères le jeu offensif ou défensif ?",
    emoji: "",
    options: [
      { label: "Offensif à fond !", points: { bresil: 3, france: 2, espagne: 2, angleterre: 1 } },
      { label: "Défense solide d'abord", points: { maroc: 3, allemagne: 2, portugal: 1 } },
      { label: "L'équilibre parfait", points: { france: 2, argentine: 2, japon: 2 } },
      { label: "La possession, c'est la clé", points: { espagne: 3, allemagne: 2, japon: 1 } },
    ],
  },
  {
    question: "Ton joueur préféré parmi ces 4 ?",
    emoji: "",
    options: [
      { label: "Mbappé", points: { france: 4, espagne: 1 } },
      { label: "Messi", points: { argentine: 4, bresil: 1 } },
      { label: "Vinicius Jr", points: { bresil: 4, espagne: 1 } },
      { label: "Bellingham", points: { angleterre: 4, espagne: 1 } },
    ],
  },
  {
    question: "Quel continent t'attire le plus ?",
    emoji: "",
    options: [
      { label: "Europe", points: { france: 2, espagne: 2, allemagne: 2, angleterre: 2, portugal: 2 } },
      { label: "Amérique du Sud", points: { bresil: 3, argentine: 3 } },
      { label: "Afrique", points: { maroc: 3, senegal: 3 } },
      { label: "Asie / Amérique du Nord", points: { japon: 3, "etats-unis": 2, mexique: 2 } },
    ],
  },
  {
    question: "Tu supportes plutôt le favori ou l'outsider ?",
    emoji: "",
    options: [
      { label: "Le favori, je veux gagner !", points: { france: 2, bresil: 2, argentine: 2, angleterre: 1 } },
      { label: "L'outsider, j'aime les surprises", points: { japon: 3, maroc: 3, senegal: 2, mexique: 2 } },
      { label: "Un outsider crédible", points: { portugal: 2, "etats-unis": 2, allemagne: 1 } },
    ],
  },
  {
    question: "Quel style de supporterisme te correspond ?",
    emoji: "",
    options: [
      { label: "Chants à l'unisson, ambiance de dingue", points: { angleterre: 3, argentine: 3, mexique: 2 } },
      { label: "Fierté nationale et émotion", points: { maroc: 3, senegal: 2, france: 2 } },
      { label: "Analyse tactique et débat", points: { espagne: 3, allemagne: 2, japon: 1 } },
      { label: "La fête avant tout !", points: { bresil: 3, mexique: 2, "etats-unis": 1 } },
    ],
  },
  {
    question: "Un match parfait pour toi, c'est...",
    emoji: "",
    options: [
      { label: "Un 4-3 de folie", points: { bresil: 3, angleterre: 2, france: 2 } },
      { label: "Un 1-0 de guerrier", points: { maroc: 3, portugal: 2, allemagne: 1 } },
      { label: "Un 3-0 maîtrisé", points: { espagne: 3, france: 2, allemagne: 2 } },
      { label: "Une remontada incroyable", points: { argentine: 3, japon: 3, senegal: 1 } },
    ],
  },
  {
    question: "La CDM 2026 se joue aux USA/Canada/Mexique. Ça te donne envie de...",
    emoji: "",
    options: [
      { label: "Voir les matchs à New York !", points: { "etats-unis": 3, angleterre: 1 } },
      { label: "Vivre l'ambiance à Mexico", points: { mexique: 3, argentine: 1 } },
      { label: "Supporter depuis mon canapé", points: { france: 2, espagne: 1, allemagne: 1 } },
      { label: "Rejoindre les fans en voyage", points: { bresil: 2, japon: 2, maroc: 2 } },
    ],
  },
  {
    question: "Ce qui compte le plus dans une équipe...",
    emoji: "",
    options: [
      { label: "Les stars individuelles", points: { portugal: 3, bresil: 2, france: 2 } },
      { label: "L'esprit collectif", points: { japon: 3, maroc: 2, allemagne: 2 } },
      { label: "L'histoire et le palmarès", points: { bresil: 2, argentine: 2, france: 2, allemagne: 2 } },
      { label: "La passion des supporters", points: { argentine: 3, mexique: 2, senegal: 2, angleterre: 1 } },
    ],
  },
  {
    question: "Si tu pouvais revivre un moment de CDM, ce serait...",
    emoji: "⏪",
    options: [
      { label: "France 2018, la deuxième étoile ", points: { france: 4 } },
      { label: "Maroc 2022, le rêve africain", points: { maroc: 4, senegal: 1 } },
      { label: "Argentine 2022, la finale du siècle", points: { argentine: 4 } },
      { label: "Japon 2022, battre l'Allemagne et l'Espagne", points: { japon: 4, "etats-unis": 1 } },
    ],
  },
  {
    question: "Dernière question : choisis un emoji !",
    emoji: "",
    options: [
      { label: "Le coq", points: { france: 3 } },
      { label: "Le lion", points: { maroc: 2, senegal: 2, angleterre: 2 } },
      { label: "L'étoile", points: { bresil: 2, argentine: 2, allemagne: 1 } },
      { label: "La fleur de cerisier", points: { japon: 3, portugal: 1 } },
    ],
  },
];

/* ─── Component ────────────────────────────────────────────── */

export default function QuizSupporterPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const option = questions[currentQ]!.options[optionIndex]!;
    const newScores = { ...scores };
    for (const [team, pts] of Object.entries(option.points)) {
      newScores[team] = (newScores[team] ?? 0) + pts;
    }
    setScores(newScores);
    setAnswers([...answers, optionIndex]);

    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  };

  const resultTeam = useMemo(() => {
    if (!showResult) return null;
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const slug = sorted[0]?.[0] ?? "france";
    return { slug, ...TEAM_INFO[slug]! };
  }, [showResult, scores]);

  const shareText = resultTeam
    ? `Mon équipe CDM 2026 : ${resultTeam.flag} ${resultTeam.name} ! Et toi ?  cdm2026.fr/quiz/supporter`
    : "";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ text: shareText }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText).then(() => alert("Copié !")).catch(() => {});
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setScores({});
    setAnswers([]);
    setShowResult(false);
  };

  const progress = ((showResult ? questions.length : currentQ) / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-12">
      <BreadcrumbSchema items={[{"name":"Accueil","url":"/"},{"name":"Quiz","url":"/quiz"},{"name":"Quiz Supporter","url":"/quiz/supporter"}]} baseUrl={domains.fr} />
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-300" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 flex-wrap min-w-0">
          <li><Link href="/" className="text-primary dark:text-secondary hover:underline">Accueil</Link></li>
          <li>/</li>
          <li><Link href="/quiz" className="text-primary dark:text-secondary hover:underline">Quiz</Link></li>
          <li>/</li>
          <li className="text-gray-800 dark:text-gray-200 font-medium">Quel pays supporter ?</li>
        </ol>
      </nav>

      <h1 className="mb-2 text-3xl font-extrabold dark:text-white">
        Quel pays vas-tu supporter ?
      </h1>
      <p className="mb-8 text-gray-500 dark:text-gray-300">
        Réponds à {questions.length} questions et découvre ton équipe idéale pour la CDM 2026 !
      </p>

      {/* Progress bar */}
      <div className="mb-8 h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!showResult ? (
        /* ─── Question ─── */
        <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-5 hover:shadow-md transition-shadow sm:p-8">
          <div className="mb-1 text-sm font-medium text-gray-400 dark:text-gray-400">
            Question {currentQ + 1}/{questions.length}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {questions[currentQ]!.emoji} {questions[currentQ]!.question}
          </h2>
          <div className="grid gap-3">
            {questions[currentQ]!.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 text-left font-medium text-gray-800 transition-all hover:border-primary/40 hover:bg-primary/5 hover:shadow-md active:scale-[0.98] dark:border-slate-600 dark:bg-slate-700 dark:text-gray-200 dark:hover:border-secondary/50 dark:hover:bg-slate-600"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : resultTeam ? (
        /* ─── Result ─── */
        <div className="rounded-2xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-xl dark:border-yellow-800/50 dark:from-slate-800 dark:to-slate-800 sm:p-8">
          <div className="mb-4 text-center">
            <span className="text-7xl block mb-4">{resultTeam.flag}</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white ">
              Tu devrais supporter {resultTeam.flag} {resultTeam.name} !
            </h2>
          </div>
          <p className="mb-6 text-center text-gray-600 dark:text-gray-300 leading-relaxed">
            {resultTeam.desc}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={`/equipe/${resultTeam.slug}`}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary/80 px-6 py-3 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
            >
              Voir la fiche {resultTeam.flag} {resultTeam.name}
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center rounded-xl border-2 border-primary px-6 py-3 font-bold text-primary transition-all hover:bg-primary/5 active:scale-95 dark:border-secondary dark:text-secondary dark:hover:bg-slate-700"
            >
              Partager </button>
          </div>

          <button
            onClick={handleRestart}
            className="mt-6 block mx-auto text-sm text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 underline"
          >
            Recommencer le quiz
          </button>

          {/* Top 3 */}
          <div className="mt-8 border-t border-gray-200 pt-6 dark:border-slate-600">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 text-center uppercase tracking-wider text-gray-500">
              Ton top 3
            </h3>
            <div className="flex justify-center gap-4">
              {Object.entries(scores)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([slug, pts], i) => {
                  const t = TEAM_INFO[slug];
                  if (!t) return null;
                  return (
                    <div key={slug} className="text-center">
                      <div className={`text-3xl ${i === 0 ? "text-4xl" : ""}`}>
                        {i === 0 ? "" : i === 1 ? "" : ""}
                      </div>
                      <div className="text-2xl">{t.flag}</div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-300">{t.name}</div>
                      <div className="text-xs text-gray-500">{pts} pts</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
