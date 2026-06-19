import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Shield, BarChart3, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prognose Clean Sheet CDM 2026 — Meilleures Défenses & Cotes",
  description:
    "Quelles Mannschafts garderont leur cage inviolée ? Top défenses, stats d'encaissement et cotes clean sheet pour la WM 2026.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/clean-sheet" },
  openGraph: {
    title: "Clean Sheet CDM 2026 — Meilleures Défenses",
    description: "Top défenses, cotes clean sheet et stats encaissement pour la CDM 2026.",
    url: "https://www.wm2026guide.de/prognose/clean-sheet",
  },
};

const topDefenses = [
  { team: "🇫🇷 France", csRate: "52%", goalsAgainst: 0.7, keeper: "Mike Maignan", coteCs: 2.0, rank: 1 },
  { team: "🇮🇹 Italie", csRate: "55%", goalsAgainst: 0.6, keeper: "Gianluigi Donnarumma", coteCs: 1.90, rank: 2 },
  { team: "🇵🇹 Portugal", csRate: "48%", goalsAgainst: 0.8, keeper: "Diogo Costa", coteCs: 2.10, rank: 3 },
  { team: "🇦🇷 Argentine", csRate: "50%", goalsAgainst: 0.7, keeper: "Emiliano Martínez", coteCs: 2.05, rank: 4 },
  { team: "🇪🇸 Espagne", csRate: "45%", goalsAgainst: 0.9, keeper: "Unai Simón", coteCs: 2.20, rank: 5 },
  { team: "🇲🇦 Maroc", csRate: "50%", goalsAgainst: 0.7, keeper: "Yassine Bounou", coteCs: 2.30, rank: 6 },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", csRate: "42%", goalsAgainst: 1.0, keeper: "Jordan Pickford", coteCs: 2.40, rank: 7 },
  { team: "🇳🇱 Pays-Bas", csRate: "40%", goalsAgainst: 1.0, keeper: "Bart Verbruggen", coteCs: 2.50, rank: 8 },
];

const csStats = [
  { edition: "Qatar 2022", totalCs: 28, pctMatches: "44%", bestTeam: "🇲🇦 Maroc (4 CS)" },
  { edition: "Russie 2018", totalCs: 25, pctMatches: "39%", bestTeam: "🇧🇪 Belgique (3 CS)" },
  { edition: "Brésil 2014", totalCs: 22, pctMatches: "34%", bestTeam: "🇩🇪 Allemagne (4 CS)" },
  { edition: "Afrique du Sud 2010", totalCs: 30, pctMatches: "47%", bestTeam: "🇪🇸 Espagne (5 CS)" },
];

const faqItems = [
  { question: "Qu'est-ce qu'un pari clean sheet ?", answer: "Un pari clean sheet consiste à parier qu'une Mannschaft ne concédera aucun but pendant les 90 minutes réglementaires (hors prolongations). Si le score est 0-0 ou si votre Mannschaft gagne sans encaisser, le pari est gagnant." },
  { question: "Quelle Mannschaft a le meilleur bilan clean sheet en CDM ?", answer: "Historiquement, les grandes nations européennes dominent : l'Italie, l'Allemagne et la France ont les meilleurs bilans. En 2022, le Maroc a impressionné avec 4 clean sheets, ne concédant qu'un seul but (contre-son-camp) en 5 matchs avant la demi-finale." },
  { question: "Les clean sheets sont-elles plus fréquentes en phase de groupes ?", answer: "Non, c'est l'inverse. Les matchs à élimination directe produisent plus de clean sheets car les Mannschafts jouent de manière plus prudente. En moyenne, 50% des matchs de phase finale comportent au moins un clean sheet, contre 42% en phase de groupes." },
  { question: "Le Torwart a-t-il une importance dans le pari clean sheet ?", answer: "Absolument. Un Torwart de classe mondiale comme Donnarumma, Maignan ou Martínez peut faire la différence. Analysez les stats du Torwart titulaire, son nombre d'arrêts par match et sa fiabilité sur penalty." },
];

export default function PrognoseCleanSheetPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Clean Sheet — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Quelles défenses seront les plus imperméables ? Analysez les meilleures défenses et pariez sur les clean sheets de la WM 2026.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top défenses — Cotes clean sheet</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Le clean sheet est un marché souvent sous-estimé par les parieurs. Les grandes défenses gardent leur cage inviolée dans 40 à 55% de leurs matchs internationaux. Avec le format 48 Mannschafts, les favoris affronteront des Mannschafts plus faibles en poules, augmentant les opportunités de clean sheet.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">Taux CS</th>
                <th className="text-center p-3">Buts enc./match</th>
                <th className="text-left p-3">Torwart</th>
                <th className="text-center p-3">Cote CS 1er match</th>
              </tr>
            </thead>
            <tbody>
              {topDefenses.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-bold text-accent">{t.rank}</td>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3 font-bold">{t.csRate}</td>
                  <td className="text-center p-3">{t.goalsAgainst}</td>
                  <td className="p-3">{t.keeper}</td>
                  <td className="text-center p-3 text-accent font-bold">{t.coteCs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Stats basées sur les 20 derniers matchs internationaux. Cotes indicatives. 18+</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Historique clean sheet en WM</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Édition</th>
                <th className="text-center p-3">Total CS</th>
                <th className="text-center p-3">% matchs avec CS</th>
                <th className="text-left p-3">Meilleure Mannschaft</th>
              </tr>
            </thead>
            <tbody>
              {csStats.map((s, i) => (
                <tr key={s.edition} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{s.edition}</td>
                  <td className="text-center p-3 font-bold text-accent">{s.totalCs}</td>
                  <td className="text-center p-3">{s.pctMatches}</td>
                  <td className="p-3">{s.bestTeam}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Stratégie clean sheet CDM 2026</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">En phase de groupes</h3>
            <p className="text-sm text-gray-700">Ciblez les favoris contre les petites nations. France, Italie et Argentine face à des adversaires modestes offrent les meilleures opportunités de clean sheet à des cotes intéressantes (1.8-2.2).</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">En phase finale</h3>
            <p className="text-sm text-gray-700">Les matchs à élimination directe sont souvent plus fermés. Wetten auf le clean sheet d&apos;une Mannschaft avec un Torwart solide lors des 8èmes de finale, où les écarts de niveau restent importants.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <Link href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Parier Clean Sheet CDM 2026 sur Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </Link>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Clean Sheet CDM 2026" items={faqItems} />

    </>
  );
}
