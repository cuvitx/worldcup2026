import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Hash, BarChart3, Lightbulb, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose Genaues Ergebnis WM 2026 — Leitfaden & Wahrscheinliche Ergebnisse",
  description:
    "Vollständiger Leitfaden für Ergebniswetten bei der WM 2026. Häufigste Ergebnisse bei Weltmeisterschaften, wahrscheinliche Ergebnisse der Topspiele, Strategien und Tipps.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/genaue-ergebnisse" },
  openGraph: {
    title: "Prognose Genaues Ergebnis WM 2026",
    description: "Historische Ergebnisse, wahrscheinliche Ergebnisse und Tipps für Ergebniswetten bei der WM 2026.",
    url: "https://www.wm2026guide.de/prognose/genaue-ergebnisse",
  },
};

const historicalScores = [
  { score: "1-0", pct: 19.2, freq: "Am häufigsten" },
  { score: "2-1", pct: 13.8, freq: "Sehr häufig" },
  { score: "1-1", pct: 11.5, freq: "Häufig" },
  { score: "0-0", pct: 7.8, freq: "Gruppenphase" },
  { score: "2-0", pct: 10.2, freq: "Häufig" },
  { score: "3-1", pct: 5.4, freq: "Mittelmässig" },
  { score: "2-2", pct: 4.1, freq: "Selten" },
  { score: "3-0", pct: 4.8, freq: "Mittelmässig" },
  { score: "0-1", pct: 8.5, freq: "Häufig (Auswärts)" },
  { score: "3-2", pct: 2.9, freq: "Selten aber lukrativ" },
];

const bigMatchScores = [
  { match: "🇫🇷 France vs 🇧🇷 Brésil", score1: "1-0", cote1: 7.5, score2: "2-1", cote2: 8.0, score3: "1-1", cote3: 6.5 },
  { match: "🇦🇷 Argentine vs 🇩🇪 Allemagne", score1: "2-1", cote1: 8.5, score2: "1-1", cote2: 6.0, score3: "1-0", cote3: 7.0 },
  { match: "🇪🇸 Espagne vs 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", score1: "2-1", cote1: 9.0, score2: "1-0", cote2: 7.5, score3: "1-1", cote3: 6.0 },
  { match: "🇵🇹 Portugal vs 🇫🇷 France", score1: "1-2", cote1: 9.5, score2: "0-1", cote2: 8.0, score3: "1-1", cote3: 6.5 },
  { match: "🇧🇷 Brésil vs 🇦🇷 Argentine", score1: "1-2", cote1: 9.0, score2: "2-2", cote2: 14.0, score3: "1-1", cote3: 6.5 },
];

const tips = [
  { title: "Setzen Sie auf niedrige Ergebnisse", desc: "Über 60% der WM-Spiele enden mit 2 Toren oder weniger. Die Ergebnisse 1:0, 0:1, 1:1 und 2:1 machen über 50% aller Ergebnisse aus." },
  { title: "Gruppenphase vs. K.o.-Phase", desc: "Gruppenspiele sind oft offener (durchschnittlich 2,5 Tore/Spiel). Die K.o.-Phase bringt engere Ergebnisse (1,8 Tore/Spiel)." },
  { title: "Kombinieren Sie genaues Ergebnis + Resultat", desc: "Einige Buchmacher bieten Kombis aus genauem Ergebnis + Halbzeit/Endstand für höhere Quoten an. Beispiel: 0:0 zur Halbzeit, dann 1:0 Endstand." },
  { title: "Das 0:0 wird unterschätzt", desc: "In der Gruppenphase, zwischen zwei defensiven Mannschaften, bietet das 0:0 oft interessante Value mit Quoten um 8-10." },
];

const faqItems = [
  { question: "Welches ist das häufigste Ergebnis bei einer WM?", answer: "Das 1:0 ist historisch das häufigste Ergebnis mit etwa 19% der Spiele. Gefolgt vom 2:1 (14%) und dem 1:1 (11,5%). Diese drei Ergebnisse machen fast 45% aller WM-Ergebnisse aus." },
  { question: "Sind Ergebniswetten rentabel?", answer: "Ergebniswetten bieten hohe Quoten (in der Regel zwischen 6.0 und 15.0), sind aber schwer vorherzusagen. Die optimale Strategie besteht darin, kleine Beträge auf die wahrscheinlichsten Ergebnisse zu setzen. Langfristig kann eine rigorose Auswahl rentabel sein." },
  { question: "Kann man auf das genaue Ergebnis in der Verlängerung wetten?", answer: "Die meisten Buchmacher bieten das genaue Ergebnis nur für die regulären 90 Minuten an. Einige bieten auch einen Markt für das genaue Ergebnis inklusive Verlängerung bei K.o.-Spielen an, zu höheren Quoten." },
  { question: "Wie wird das 48-Mannschaften-Format die Ergebnisse beeinflussen?", answer: "Das 48-Mannschaften-Format bringt mehr Spiele zwischen Mannschaften unterschiedlicher Spielstärke in der Gruppenphase. Man erwartet mehr hohe Ergebnisse (3:0, 4:0) bei diesen unausgeglichenen Begegnungen, während die Spiele zwischen grossen Nationen weiterhin eng bleiben dürften." },
];

export default function PrognoseScoresExactsPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">
          Ergebniswetten — WM 2026
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Vollständiger Leitfaden für Ergebniswetten bei WM-2026-Spielen. Historische Daten, wahrscheinliche Ergebnisse und Gewinnstrategien.
        </p>
      </section>

      {/* Historical Scores */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Hash className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Häufigste Ergebnisse bei Weltmeisterschaften</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Die Analyse von über 900 WM-Spielen seit 1930 zeigt klare Trends. Internationaler Fussball bleibt ein defensiver Sport, mit einer Mehrheit torarmerer Spiele.
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
          <h2 className="text-2xl font-bold text-primary">Wahrscheinliche Ergebnisse der Topspiele</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Match</th>
                <th className="text-center p-3">Score 1</th>
                <th className="text-center p-3">Quote</th>
                <th className="text-center p-3">Score 2</th>
                <th className="text-center p-3">Quote</th>
                <th className="text-center p-3">Score 3</th>
                <th className="text-center p-3">Quote</th>
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
        <p className="text-xs text-gray-500 mt-3">Richtquoten basierend auf historischen Begegnungen. 18+</p>
      </section>

      {/* Tips */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Tipps für Ergebniswetten</h2>
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
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Ergebniswetten WM 2026 bei Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Genaue Ergebnisse WM 2026" items={faqItems} />

    </>
  );
}
