import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { TrendingUp, BarChart3, Zap, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose Over/Under Buts CDM 2026 — Guide +2.5 / -2.5",
  description:
    "Guide Over/Under buts pour la CDM 2026. Stats historiques par édition, analyse par groupe, impact du format 48 Mannschafts et top matchs +2.5/-2.5.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/over-under" },
  openGraph: {
    title: "Over/Under Buts CDM 2026 — Guide Complet",
    description: "Moyenne buts/match par CDM, Gruppen offensifs vs défensifs, top matchs +2.5 et -2.5.",
    url: "https://www.wm2026guide.de/prognose/over-under",
  },
};

const historicalAvg = [
  { edition: "Russie 2018", avg: 2.64, over25: "48%" },
  { edition: "Brésil 2014", avg: 2.67, over25: "51%" },
  { edition: "Afrique du Sud 2010", avg: 2.27, over25: "39%" },
  { edition: "Allemagne 2006", avg: 2.30, over25: "41%" },
  { edition: "Corée/Japon 2002", avg: 2.52, over25: "46%" },
  { edition: "France 1998", avg: 2.67, over25: "50%" },
  { edition: "Qatar 2022", avg: 2.56, over25: "46%" },
];

const groupAnalysis = [
  { group: "Gruppe A", tendency: "Offensif", avgGoals: 3.0, reason: "🇺🇸 USA (hôte) poussé par le public + Mannschafts moyennes", recommendation: "Over 2.5" },
  { group: "Gruppe B", tendency: "Équilibré", avgGoals: 2.4, reason: "Confrontation serrée entre Mannschafts européennes", recommendation: "Under 2.5" },
  { group: "Gruppe E", tendency: "Offensif", avgGoals: 2.8, reason: "🇧🇷 Brésil offensif contre des défenses perméables", recommendation: "Over 2.5" },
  { group: "Gruppe G", tendency: "Défensif", avgGoals: 1.9, reason: "Blocs bas attendus, Mannschafts tactiques", recommendation: "Under 2.5" },
  { group: "Gruppe I", tendency: "Offensif", avgGoals: 3.1, reason: "🇩🇪 Allemagne + matchs déséquilibrés", recommendation: "Over 2.5" },
  { group: "Gruppe K", tendency: "Défensif", avgGoals: 2.0, reason: "Mannschaften africaines/asiatiques souvent compactes en CDM", recommendation: "Under 2.5" },
];

const topOver = [
  { match: "🇧🇷 Brésil vs 🇨🇲 Cameroun", cote: 1.75, reason: "Le Brésil marque en moyenne 2.3 buts/match en CDM." },
  { match: "🇩🇪 Allemagne vs 🇯🇵 Japon", cote: 1.80, reason: "5 buts lors de leur confrontation en 2022 (1-2)." },
  { match: "🇫🇷 France vs 🇦🇺 Australie", cote: 1.70, reason: "France avait gagné 4-1 en 2022, matchup déséquilibré." },
  { match: "🇪🇸 Espagne vs 🇨🇷 Costa Rica", cote: 1.65, reason: "7-0 en CDM 2022. L'Espagne domine ces oppositions." },
];

const topUnder = [
  { match: "🇫🇷 France vs 🇦🇷 Argentine", cote: 1.90, reason: "Choc tactique, les deux se neutralisent souvent." },
  { match: "🇵🇹 Portugal vs 🇺🇾 Uruguay", cote: 1.85, reason: "Historique de confrontations fermées (0-0 et 2-0 en 2022)." },
  { match: "🇮🇹 Italie vs 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", cote: 1.80, reason: "Finale Euro 2020 : 1-1 après 120 minutes. Style prudent." },
  { match: "🇲🇦 Maroc vs 🇭🇷 Croatie", cote: 1.75, reason: "0-0 en phase de Gruppen CDM 2022. Deux blocs compacts." },
];

const faqItems = [
  { question: "Que signifie Over 2.5 et Under 2.5 ?", answer: "Over 2.5 signifie que vous pariez sur 3 buts ou plus dans le match. Under 2.5 signifie 2 buts ou moins. Le '.5' élimine la possibilité de match nul sur ce marché : votre pari est forcément gagnant ou perdant." },
  { question: "Quel est le pourcentage de matchs Over 2.5 en WM ?", answer: "En moyenne, environ 46-48% des matchs de CDM se terminent avec 3 buts ou plus (Over 2.5). Ce pourcentage varie selon les éditions : 51% en 2014 (record) contre 39% en 2010 (plus défensif)." },
  { question: "Le format 48 Mannschafts favorise-t-il le Over ?", answer: "Oui, le format 48 Mannschafts devrait augmenter la moyenne de buts, surtout en phase de Gruppen. Plus d'écarts de niveau entre les Mannschafts signifie davantage de matchs déséquilibrés avec des scores larges. La moyenne pourrait dépasser 2.8 buts/match." },
  { question: "Vaut-il mieux parier Over en poules ou en élimination ?", answer: "Statistiquement, la phase de Gruppen offre plus de buts (2.6 buts/match en moyenne) que la phase à élimination directe (2.1 buts/match). Les matchs de poules sont moins tactiques et les Mannschafts prennent plus de risques." },
];

export default function PrognoseOverUnderPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Over/Under Buts — CDM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Combien de buts par match ? Analysez les tendances historiques et identifiez les matchs Over 2.5 et Under 2.5 der WM 2026.
        </p>
      </section>

      {/* Historical Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Moyenne de buts par WM</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Édition</th>
                <th className="text-center p-3">Moy. buts/match</th>
                <th className="text-center p-3">% Over 2.5</th>
              </tr>
            </thead>
            <tbody>
              {historicalAvg.map((e, i) => (
                <tr key={e.edition} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{e.edition}</td>
                  <td className="text-center p-3 font-bold text-accent">{e.avg}</td>
                  <td className="text-center p-3">{e.over25}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Impact 48 teams */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Impact du format 48 Mannschafts sur les buts</h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Le passage de 32 à 48 Mannschafts est le changement majeur de cette édition. Plus d&apos;Mannschafts signifie un écart de niveau plus important, surtout en phase de Gruppen. Les petites nations auront du mal à contenir les géants, ce qui pourrait produire des scores fleuve.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Notre estimation : la moyenne de buts par match en phase de Gruppen pourrait atteindre 2.8 à 3.0, contre 2.5 en format 32 Mannschafts. En revanche, la phase à élimination directe devrait rester autour de 2.0-2.2 buts/match.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Pour les parieurs, cela signifie une opportunité claire : Over 2.5 en phase de Gruppen sur les matchs déséquilibrés, Under 2.5 dès les 16èmes de finale.
          </p>
        </div>
      </section>

      {/* Group Analysis */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Analyse par Gruppe — Offensif vs Défensif</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupAnalysis.map((g) => (
            <div key={g.group} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary">{g.group}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${g.tendency === "Offensif" ? "bg-accent/10 text-accent" : g.tendency === "Défensif" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                  {g.tendency}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{g.reason}</p>
              <div className="flex justify-between text-sm">
                <span>Moy. estimée : <strong>{g.avgGoals}</strong></span>
                <span className="text-accent font-semibold">{g.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Over & Under */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-accent mb-4">Top matchs Over 2.5</h3>
            {topOver.map((m) => (
              <div key={m.match} className="border-l-4 border-accent pl-4 mb-4">
                <p className="font-semibold">{m.match} <span className="text-accent">({m.cote})</span></p>
                <p className="text-sm text-gray-600">{m.reason}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Top matchs Under 2.5</h3>
            {topUnder.map((m) => (
              <div key={m.match} className="border-l-4 border-red-400 pl-4 mb-4">
                <p className="font-semibold">{m.match} <span className="text-red-600">({m.cote})</span></p>
                <p className="text-sm text-gray-600">{m.reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Parier Over/Under CDM 2026 sur Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Over/Under CDM 2026" items={faqItems} />

    </>
  );
}
