import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Hash, BarChart3, Lightbulb, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pronostic Score Exact CDM 2026 — Guide & Scores Probables",
  description:
    "Guide complet des paris score exact pour la Coupe du Monde 2026. Scores les plus fréquents en CDM, scores probables des gros matchs, stratégies et tips.",
  alternates: { canonical: "https://www.cdm2026.fr/pronostic/scores-exacts" },
  openGraph: {
    title: "Pronostic Score Exact CDM 2026",
    description: "Scores historiques, scores probables et tips pour parier score exact à la CDM 2026.",
    url: "https://www.cdm2026.fr/pronostic/scores-exacts",
  },
};

const historicalScores = [
  { score: "1-0", pct: 19.2, freq: "Le plus fréquent" },
  { score: "2-1", pct: 13.8, freq: "Très courant" },
  { score: "1-1", pct: 11.5, freq: "Courant" },
  { score: "0-0", pct: 7.8, freq: "Phase de groupes" },
  { score: "2-0", pct: 10.2, freq: "Courant" },
  { score: "3-1", pct: 5.4, freq: "Modéré" },
  { score: "2-2", pct: 4.1, freq: "Peu fréquent" },
  { score: "3-0", pct: 4.8, freq: "Modéré" },
  { score: "0-1", pct: 8.5, freq: "Courant (visiteur)" },
  { score: "3-2", pct: 2.9, freq: "Rare mais lucratif" },
];

const bigMatchScores = [
  { match: "🇫🇷 France vs 🇧🇷 Brésil", score1: "1-0", cote1: 7.5, score2: "2-1", cote2: 8.0, score3: "1-1", cote3: 6.5 },
  { match: "🇦🇷 Argentine vs 🇩🇪 Allemagne", score1: "2-1", cote1: 8.5, score2: "1-1", cote2: 6.0, score3: "1-0", cote3: 7.0 },
  { match: "🇪🇸 Espagne vs 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", score1: "2-1", cote1: 9.0, score2: "1-0", cote2: 7.5, score3: "1-1", cote3: 6.0 },
  { match: "🇵🇹 Portugal vs 🇫🇷 France", score1: "1-2", cote1: 9.5, score2: "0-1", cote2: 8.0, score3: "1-1", cote3: 6.5 },
  { match: "🇧🇷 Brésil vs 🇦🇷 Argentine", score1: "1-2", cote1: 9.0, score2: "2-2", cote2: 14.0, score3: "1-1", cote3: 6.5 },
];

const tips = [
  { title: "Privilégiez les petits scores", desc: "Plus de 60% des matchs de CDM se terminent avec 2 buts ou moins. Les scores 1-0, 0-1, 1-1 et 2-1 représentent plus de 50% des résultats." },
  { title: "Phase de groupes vs élimination directe", desc: "Les matchs de poules sont souvent plus ouverts (2.5 buts/match en moyenne). Les phases à élimination directe produisent des scores plus serrés (1.8 buts/match)." },
  { title: "Combinez score exact + résultat", desc: "Certains bookmakers proposent des combos score exact + mi-temps/fin de match pour des cotes plus élevées. Exemple : 0-0 à la mi-temps puis 1-0 final." },
  { title: "Le 0-0 est sous-estimé", desc: "En phase de groupes, entre deux équipes défensives, le 0-0 offre souvent une value intéressante avec des cotes autour de 8-10." },
];

const faqItems = [
  { question: "Quel est le score le plus fréquent en Coupe du Monde ?", answer: "Le 1-0 est historiquement le score le plus fréquent avec environ 19% des matchs. Suivi du 2-1 (14%) et du 1-1 (11.5%). Ces trois scores représentent près de 45% de tous les résultats en CDM." },
  { question: "Les paris score exact sont-ils rentables ?", answer: "Les paris score exact offrent des cotes élevées (généralement entre 6.0 et 15.0) mais sont difficiles à prédire. La stratégie optimale consiste à miser de petites sommes sur les scores les plus probables. Sur le long terme, une sélection rigoureuse peut être rentable." },
  { question: "Peut-on parier sur le score exact en prolongation ?", answer: "La plupart des bookmakers proposent le score exact uniquement sur les 90 minutes réglementaires. Certains offrent également un marché 'score exact avec prolongation' pour les matchs à élimination directe, à des cotes plus élevées." },
  { question: "Comment le format 48 équipes va-t-il impacter les scores ?", answer: "Le format 48 équipes introduit davantage de matchs entre équipes de niveaux différents en phase de groupes. On s'attend à plus de scores larges (3-0, 4-0) lors de ces confrontations déséquilibrées, tout en gardant des scores serrés pour les chocs entre grandes nations." },
];

export default function PronosticScoresExactsPage() {
  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Pronostics", href: "/pronostic" }, { label: "Scores exacts" }]} />

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
          Paris Score Exact — CDM 2026
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Guide complet pour parier sur le score exact des matchs de la Coupe du Monde 2026. Historique, scores probables et stratégies gagnantes.
        </p>
      </section>

      {/* Historical Scores */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Hash className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Scores les plus fréquents en Coupe du Monde</h2>
        </div>
        <p className="text-gray-700 mb-6">
          L&apos;analyse de plus de 900 matchs de Coupe du Monde depuis 1930 révèle des tendances claires. Le football international reste un sport défensif, avec une majorité de matchs à faible nombre de buts.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {historicalScores.map((s) => (
            <div key={s.score} className="bg-primary/5 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-primary">{s.score}</p>
              <p className="text-accent font-semibold">{s.pct}%</p>
              <p className="text-xs text-gray-500 mt-1">{s.freq}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Big Matches */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Scores probables des gros matchs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Match</th>
                <th className="text-center p-3">Score 1</th>
                <th className="text-center p-3">Cote</th>
                <th className="text-center p-3">Score 2</th>
                <th className="text-center p-3">Cote</th>
                <th className="text-center p-3">Score 3</th>
                <th className="text-center p-3">Cote</th>
              </tr>
            </thead>
            <tbody>
              {bigMatchScores.map((m, i) => (
                <tr key={m.match} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{m.match}</td>
                  <td className="text-center p-3 font-bold">{m.score1}</td>
                  <td className="text-center p-3 text-accent">{m.cote1}</td>
                  <td className="text-center p-3 font-bold">{m.score2}</td>
                  <td className="text-center p-3 text-accent">{m.cote2}</td>
                  <td className="text-center p-3 font-bold">{m.score3}</td>
                  <td className="text-center p-3 text-accent">{m.cote3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Cotes indicatives basées sur les confrontations historiques. 18+</p>
      </section>

      {/* Tips */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-7 h-7 text-secondary" />
          <h2 className="text-2xl font-bold text-primary">Tips pour parier score exact</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {tips.map((t) => (
            <div key={t.title} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-primary mb-2">{t.title}</h3>
              <p className="text-sm text-gray-700">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <Link href="https://www.betclic.fr/paris-sportifs" target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Parier score exact CDM 2026 <ArrowRight className="inline w-4 h-4 ml-1" />
        </Link>
      </section>

      <FAQSection title="Questions fréquentes — Score exact CDM 2026" items={faqItems} />

    </>
  );
}
