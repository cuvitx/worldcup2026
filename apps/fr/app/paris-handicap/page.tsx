import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Scale, ArrowRight, Info, CheckCircle, XCircle, MinusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Handicap asiatique CDM 2026 — Guide complet avec exemples",
  description:
    "Guide complet du handicap asiatique pour la Coupe du Monde 2026. Explication +0.5, -1.5, quand l'utiliser, exemples concrets avec calculs.",
  alternates: { canonical: "https://cdm2026.fr/paris-handicap" },
  openGraph: {
    title: "Handicap asiatique CDM 2026 — Guide complet",
    description: "Maîtrisez le handicap asiatique pour vos paris CDM 2026. Exemples concrets.",
    url: "https://cdm2026.fr/paris-handicap",
  },
};

interface Example {
  match: string;
  handicap: string;
  bet: string;
  result: string;
  outcome: "won" | "lost" | "push";
  explanation: string;
}

const examples: Example[] = [
  {
    match: "France vs Australie",
    handicap: "France -1.5",
    bet: "Cote 2.10",
    result: "France 3-1",
    outcome: "won",
    explanation: "France gagne de 2 buts. Avec le handicap -1.5, le score ajusté est 1.5-1. Pari gagné car 1.5 > 1.",
  },
  {
    match: "Argentine vs Arabie Saoudite",
    handicap: "Argentine -1.5",
    bet: "Cote 1.85",
    result: "Argentine 1-2",
    outcome: "lost",
    explanation: "Argentine perd ! Score ajusté : -0.5-2. Pari perdu largement. Le handicap amplifie la perte.",
  },
  {
    match: "Brésil vs Suisse",
    handicap: "Brésil -0.5",
    bet: "Cote 1.70",
    result: "Brésil 1-0",
    outcome: "won",
    explanation: "Brésil gagne de 1. Score ajusté : 0.5-0. Le handicap -0.5 élimine le nul — victoire = pari gagné.",
  },
  {
    match: "Espagne vs Japon",
    handicap: "Japon +1.5",
    bet: "Cote 1.55",
    result: "Espagne 1-0",
    outcome: "won",
    explanation: "Japon perd de 1. Avec +1.5, le score ajusté est 0+1.5=1.5 vs 1. Le Japon 'gagne' avec le handicap.",
  },
  {
    match: "Allemagne vs Mexique",
    handicap: "Allemagne -1.0",
    bet: "Cote 2.00",
    result: "Allemagne 1-0",
    outcome: "push",
    explanation: "Allemagne gagne de 1 exactement. Avec -1.0, le score ajusté est 0-0. Remboursement (push).",
  },
];

const handicapTypes = [
  { value: "0", desc: "Élimine le nul. Si nul → remboursé (push)." },
  { value: "-0.5", desc: "Élimine le nul. L'équipe doit gagner pour que le pari passe." },
  { value: "-1.0", desc: "L'équipe doit gagner de 2+. Si victoire de 1 → push." },
  { value: "-1.5", desc: "L'équipe doit gagner de 2+. Pas de push possible." },
  { value: "-2.0", desc: "L'équipe doit gagner de 3+. Si victoire de 2 → push." },
  { value: "+0.5", desc: "L'équipe peut perdre de 0. Match nul ou victoire = pari gagné." },
  { value: "+1.0", desc: "L'équipe peut perdre de 1 (push) ou moins." },
  { value: "+1.5", desc: "L'équipe peut perdre de 1 but et le pari est gagné." },
];

export default function ParisHandicapPage() {
  const faqItems = [
    {
      question: "Quelle est la différence entre handicap asiatique et handicap européen ?",
      answer: "Le handicap asiatique utilise des demi-buts (0.5, 1.5) et offre des remboursements (push) sur les handicaps entiers. Le handicap européen inclut le nul comme résultat possible, ce qui donne 3 issues au lieu de 2. L'asiatique est plus adapté aux paris à 2 issues.",
    },
    {
      question: "Quand utiliser le handicap -0.5 ?",
      answer: "Le handicap -0.5 est idéal quand vous pensez qu'une équipe va gagner mais que la cote 1X2 est trop basse. Il élimine le nul : victoire = gagné, nul ou défaite = perdu. C'est l'équivalent d'un pari 'victoire' classique mais souvent avec de meilleures cotes.",
    },
    {
      question: "Le handicap asiatique est-il rentable sur la CDM 2026 ?",
      answer: "Le handicap asiatique est particulièrement intéressant en CDM car les écarts de niveau entre les 48 équipes sont importants. Un favori à -1.5 à 2.10 offre souvent plus de value qu'une victoire simple à 1.25.",
    },
  ];

  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Handicap asiatique" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Guide paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Handicap asiatique CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Le guide complet pour maîtriser le handicap asiatique : +0.5, -1.5, push, exemples concrets
            et quand l&apos;utiliser pendant la CDM 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Tableau des handicaps */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">Les différents handicaps</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Handicap</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Signification</th>
                </tr>
              </thead>
              <tbody>
                {handicapTypes.map((h, i) => (
                  <tr key={h.value} className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}>
                    <td className="py-3 px-4 font-mono font-bold text-accent">{h.value}</td>
                    <td className="py-3 px-4">{h.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Exemples concrets */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Info className="h-7 w-7 text-accent" />
            <h2 className="text-2xl font-bold text-primary dark:text-white">Exemples concrets</h2>
          </div>
          <div className="space-y-4">
            {examples.map((ex) => {
              const Icon = ex.outcome === "won" ? CheckCircle : ex.outcome === "lost" ? XCircle : MinusCircle;
              const color = ex.outcome === "won" ? "text-green-600" : ex.outcome === "lost" ? "text-red-600" : "text-yellow-600";
              const bg = ex.outcome === "won" ? "border-green-200 dark:border-green-800" : ex.outcome === "lost" ? "border-red-200 dark:border-red-800" : "border-yellow-200 dark:border-yellow-800";
              return (
                <div key={ex.match} className={`rounded-xl border ${bg} p-5`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-primary dark:text-white">{ex.match}</span>
                    <Icon className={`h-5 w-5 ${color}`} />
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs mb-2">
                    <span className="bg-primary/10 dark:bg-white/10 px-2 py-1 rounded font-mono">{ex.handicap}</span>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded">{ex.bet}</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Résultat : {ex.result}</span>
                    <span className={`font-bold ${color} uppercase`}>
                      {ex.outcome === "won" ? "Gagné" : ex.outcome === "lost" ? "Perdu" : "Remboursé"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{ex.explanation}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="text-center">
          <Link href="/cashout-guide" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Guide du cashout <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsablement. 18+ | Informations et aide sur joueurs-info-service.fr (ANJ).
        </p>
      </div>
    </>
  );
}
