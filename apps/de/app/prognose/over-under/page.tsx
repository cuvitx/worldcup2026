import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { TrendingUp, BarChart3, Zap, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose Over/Under Tore WM 2026 — Ratgeber +2,5 / -2,5",
  description:
    "Ratgeber Over/Under Tore für die WM 2026. Historische Statistiken nach Ausgabe, Gruppenanalyse, Auswirkungen des 48-Mannschaften-Formats und Top-Spiele +2,5/-2,5.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/over-under" },
  openGraph: {
    title: "Over/Under Tore WM 2026 — Kompletter Ratgeber",
    description: "Durchschnittliche Tore/Spiel pro WM, offensive vs. defensive Gruppen, Top-Spiele +2,5 und -2,5.",
    url: "https://www.wm2026guide.de/prognose/over-under",
  },
};

const historicalAvg = [
  { edition: "Russland 2018", avg: 2.64, over25: "48%" },
  { edition: "Brasilien 2014", avg: 2.67, over25: "51%" },
  { edition: "Südafrika 2010", avg: 2.27, over25: "39%" },
  { edition: "Deutschland 2006", avg: 2.30, over25: "41%" },
  { edition: "Korea/Japan 2002", avg: 2.52, over25: "46%" },
  { edition: "Frankreich 1998", avg: 2.67, over25: "50%" },
  { edition: "Katar 2022", avg: 2.56, over25: "46%" },
];

const groupAnalysis = [
  { group: "Gruppe A", tendency: "Offensiv", avgGoals: 3.0, reason: "🇺🇸 USA (Gastgeber) vom Publikum angetrieben + durchschnittliche Mannschaften", recommendation: "Over 2.5" },
  { group: "Gruppe B", tendency: "Ausgeglichen", avgGoals: 2.4, reason: "Enges Duell zwischen europäischen Mannschaften", recommendation: "Under 2.5" },
  { group: "Gruppe E", tendency: "Offensiv", avgGoals: 2.8, reason: "🇧🇷 Brasilien offensivstark gegen durchlässige Abwehrreihen", recommendation: "Over 2.5" },
  { group: "Gruppe G", tendency: "Defensiv", avgGoals: 1.9, reason: "Tiefes Stehen erwartet, taktische Mannschaften", recommendation: "Under 2.5" },
  { group: "Gruppe I", tendency: "Offensiv", avgGoals: 3.1, reason: "🇩🇪 Deutschland + ungleiche Spiele", recommendation: "Over 2.5" },
  { group: "Gruppe K", tendency: "Defensiv", avgGoals: 2.0, reason: "Afrikanische/asiatische Mannschaften oft kompakt bei der WM", recommendation: "Under 2.5" },
];

const topOver = [
  { match: "🇧🇷 Brasilien vs 🇨🇲 Kamerun", cote: 1.75, reason: "Brasilien erzielt durchschnittlich 2,3 Tore/Spiel bei der WM." },
  { match: "🇩🇪 Deutschland vs 🇯🇵 Japan", cote: 1.80, reason: "5 Tore bei ihrem Aufeinandertreffen 2022 (1:2)." },
  { match: "🇫🇷 Frankreich vs 🇦🇺 Australien", cote: 1.70, reason: "Frankreich gewann 2022 mit 4:1, ungleiches Duell." },
  { match: "🇪🇸 Spanien vs 🇨🇷 Costa Rica", cote: 1.65, reason: "7:0 bei der WM 2022. Spanien dominiert solche Duelle." },
];

const topUnder = [
  { match: "🇫🇷 Frankreich vs 🇦🇷 Argentinien", cote: 1.90, reason: "Taktischer Schlagabtausch, beide neutralisieren sich oft." },
  { match: "🇵🇹 Portugal vs 🇺🇾 Uruguay", cote: 1.85, reason: "Historisch enge Duelle (0:0 und 2:0 in 2022)." },
  { match: "🇮🇹 Italien vs 🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", cote: 1.80, reason: "EM-Finale 2020: 1:1 nach 120 Minuten. Vorsichtiger Stil." },
  { match: "🇲🇦 Marokko vs 🇭🇷 Kroatien", cote: 1.75, reason: "0:0 in der Gruppenphase WM 2022. Zwei kompakte Blöcke." },
];

const faqItems = [
  { question: "Was bedeutet Over 2,5 und Under 2,5?", answer: "Over 2,5 bedeutet, dass Sie auf 3 oder mehr Tore im Spiel wetten. Under 2,5 bedeutet 2 Tore oder weniger. Die ',5' eliminiert die Möglichkeit eines Unentschiedens auf diesem Markt: Ihre Wette ist zwangsläufig gewonnen oder verloren." },
  { question: "Wie hoch ist der Prozentsatz der Over-2,5-Spiele bei der WM?", answer: "Im Durchschnitt enden etwa 46-48% der WM-Spiele mit 3 oder mehr Toren (Over 2,5). Dieser Prozentsatz variiert je nach Ausgabe: 51% im Jahr 2014 (Rekord) gegenüber 39% im Jahr 2010 (defensiver)." },
  { question: "Begünstigt das 48-Mannschaften-Format das Over?", answer: "Ja, das 48-Mannschaften-Format dürfte den Tordurchschnitt erhöhen, insbesondere in der Gruppenphase. Größere Niveauunterschiede zwischen den Mannschaften bedeuten mehr ungleiche Spiele mit hohen Ergebnissen. Der Durchschnitt könnte 2,8 Tore/Spiel überschreiten." },
  { question: "Ist es besser, in der Gruppenphase oder der K.o.-Phase auf Over zu wetten?", answer: "Statistisch bietet die Gruppenphase mehr Tore (2,6 Tore/Spiel im Durchschnitt) als die K.o.-Phase (2,1 Tore/Spiel). Gruppenspiele sind weniger taktisch und die Mannschaften gehen mehr Risiken ein." },
];

export default function PrognoseOverUnderPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Over/Under Tore — WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Wie viele Tore pro Spiel? Analysieren Sie die historischen Trends und identifizieren Sie die Over-2,5- und Under-2,5-Spiele der WM 2026.
        </p>
      </section>

      {/* Historical Stats */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Tordurchschnitt pro WM</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Ausgabe</th>
                <th className="text-center p-3">Tore/Spiel</th>
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
          <h2 className="text-2xl font-bold text-primary">Auswirkungen des 48-Mannschaften-Formats auf die Tore</h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Die Erweiterung von 32 auf 48 Mannschaften ist die große Veränderung dieser Ausgabe. Mehr Mannschaften bedeuten größere Niveauunterschiede, besonders in der Gruppenphase. Kleine Nationen werden Schwierigkeiten haben, die Großen zu stoppen, was zu hohen Ergebnissen führen könnte.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Unsere Schätzung: Der Tordurchschnitt pro Spiel in der Gruppenphase könnte 2,8 bis 3,0 erreichen, gegenüber 2,5 im 32-Mannschaften-Format. Die K.o.-Phase dürfte hingegen bei etwa 2,0-2,2 Toren/Spiel bleiben.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Für Wetter bedeutet das eine klare Gelegenheit: Over 2,5 in der Gruppenphase bei ungleichen Spielen, Under 2,5 ab dem Sechzehntelfinale.
          </p>
        </div>
      </section>

      {/* Group Analysis */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Analyse nach Gruppe — Offensiv vs. Defensiv</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groupAnalysis.map((g) => (
            <div key={g.group} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary">{g.group}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${g.tendency === "Offensiv" ? "bg-accent/10 text-accent" : g.tendency === "Defensiv" ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"}`}>
                  {g.tendency}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{g.reason}</p>
              <div className="flex justify-between text-sm">
                <span>Geschätzter Schnitt: <strong>{g.avgGoals}</strong></span>
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
            <h3 className="text-xl font-bold text-accent mb-4">Top-Spiele Over 2,5</h3>
            {topOver.map((m) => (
              <div key={m.match} className="border-l-4 border-accent pl-4 mb-4">
                <p className="font-semibold">{m.match} <span className="text-accent">({m.cote})</span></p>
                <p className="text-sm text-gray-600">{m.reason}</p>
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold text-red-600 mb-4">Top-Spiele Under 2,5</h3>
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
          Willkommensbonus — Over/Under WM 2026 bei Betano wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Over/Under WM 2026" items={faqItems} />

    </>
  );
}
