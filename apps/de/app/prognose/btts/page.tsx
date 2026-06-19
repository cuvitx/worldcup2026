import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Users, BarChart3, Target, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose BTTS WM 2026 — Beide Mannschaften treffen",
  description:
    "BTTS-Guide (Both Teams To Score) für die WM 2026. Statistiken pro Mannschaft, Top-Spiele mit Toren beider Teams, Gruppenanalyse.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/btts" },
  openGraph: {
    title: "BTTS WM 2026 — Beide Mannschaften treffen",
    description: "BTTS-Statistiken pro Mannschaft, Top-Spiele und Gruppenanalyse für Ihre WM-2026-Wetten.",
    url: "https://www.wm2026guide.de/prognose/btts",
  },
};

const bttsTeams = [
  { team: "🇩🇪 Deutschland", bttsYes: "62%", bttsNo: "38%", avgGoals: 2.8 },
  { team: "🇫🇷 Frankreich", bttsYes: "55%", bttsNo: "45%", avgGoals: 2.5 },
  { team: "🇧🇷 Brasilien", bttsYes: "58%", bttsNo: "42%", avgGoals: 2.7 },
  { team: "🇪🇸 Spanien", bttsYes: "60%", bttsNo: "40%", avgGoals: 2.6 },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", bttsYes: "52%", bttsNo: "48%", avgGoals: 2.3 },
  { team: "🇦🇷 Argentinien", bttsYes: "50%", bttsNo: "50%", avgGoals: 2.4 },
  { team: "🇵🇹 Portugal", bttsYes: "54%", bttsNo: "46%", avgGoals: 2.5 },
  { team: "🇳🇱 Niederlande", bttsYes: "57%", bttsNo: "43%", avgGoals: 2.6 },
  { team: "🇮🇹 Italien", bttsYes: "42%", bttsNo: "58%", avgGoals: 1.9 },
  { team: "🇭🇷 Kroatien", bttsYes: "48%", bttsNo: "52%", avgGoals: 2.1 },
];

const topBttsMatches = [
  { match: "🇫🇷 Frankreich vs 🇩🇪 Deutschland", cote: 1.65, reason: "Beide Angriffe sind treffsicher. 5 letzte Begegnungen: BTTS 4 von 5 Mal." },
  { match: "🇧🇷 Brasilien vs 🇪🇸 Spanien", cote: 1.70, reason: "Zwei offensiv ausgerichtete Mannschaften, offensiver Stil garantiert." },
  { match: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England vs 🇳🇱 Niederlande", cote: 1.75, reason: "Historisch offene Spiele mit anfälligen Abwehrreihen." },
  { match: "🇦🇷 Argentinien vs 🇩🇪 Deutschland", cote: 1.70, reason: "Historische Rivalität: Finale 2014 (1:0), aber oft BTTS in der Gruppenphase." },
  { match: "🇵🇹 Portugal vs 🇧🇷 Brasilien", cote: 1.72, reason: "Star-Angriffe auf beiden Seiten, selten dass nicht beide treffen." },
];

const groupBtts = [
  { group: "Gruppe A", bttsRate: "55%", tendency: "BTTS Ja favorisiert", reason: "Unausgeglichene Spiele, aber die kleineren Mannschaften treffen bei ihren Chancen." },
  { group: "Gruppe E", bttsRate: "60%", tendency: "BTTS Ja favorisiert", reason: "Offensive Gruppe, alle Mannschaften können treffen." },
  { group: "Gruppe G", bttsRate: "35%", tendency: "BTTS Nein favorisiert", reason: "Kompakte Abwehrreihen, taktische Spiele erwartet." },
  { group: "Gruppe I", bttsRate: "58%", tendency: "BTTS Ja favorisiert", reason: "Deutschland offensiv, Gegner fähig zu antworten." },
];

const faqItems = [
  { question: "Was bedeutet BTTS bei Sportwetten?", answer: "BTTS bedeutet 'Both Teams To Score' (beide Mannschaften treffen). Sie wetten darauf, dass jede Mannschaft mindestens ein Tor im Spiel erzielt. Egal wie das Endergebnis lautet, solange beide Mannschaften getroffen haben (BTTS Ja) oder mindestens eine Mannschaft nicht getroffen hat (BTTS Nein)." },
  { question: "Wie hoch ist die BTTS-Quote bei Weltmeisterschaften?", answer: "Im Durchschnitt enden etwa 48-52% der WM-Spiele damit, dass beide Mannschaften treffen. Diese Rate ist leicht niedriger als bei nationalen Ligen (55-58%), da internationaler Fussball in der Regel defensiver ist." },
  { question: "Ist BTTS in der Gruppenphase häufiger?", answer: "Ja, Gruppenspiele haben eine höhere BTTS-Rate (etwa 52%) als K.o.-Spiele (etwa 44%). Die Mannschaften gehen in der Finalrunde weniger Risiken ein, was die Torchancen reduziert." },
  { question: "Wie kann man BTTS mit anderen Märkten kombinieren?", answer: "Beliebte Kombinationen sind BTTS + Over 2.5 (Quoten um 2.0-2.5) und BTTS + Ergebnis (höhere Quoten). Diese Kombis bieten ein gutes Risiko-Gewinn-Verhältnis bei Spielen zwischen offensiven Mannschaften." },
];

export default function PrognoseBttsPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Beide Mannschaften treffen — WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Vollständige Analyse des BTTS-Marktes für die WM 2026. Finden Sie die Spiele, in denen beide Mannschaften treffen werden.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">BTTS-Statistiken pro Mannschaft</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Die BTTS-Rate einer Mannschaft spiegelt sowohl ihre Offensivstärke als auch ihre Defensivschwächen wider. Eine Mannschaft mit hoher BTTS-Rate trifft oft, kassiert aber auch Gegentore. Hier die Statistiken der wichtigsten Nationen aus ihren letzten 20 Länderspielen.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">BTTS Ja</th>
                <th className="text-center p-3">BTTS Nein</th>
                <th className="text-center p-3">Tore/Spiel (Durchschn.)</th>
              </tr>
            </thead>
            <tbody>
              {bttsTeams.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3 text-accent font-bold">{t.bttsYes}</td>
                  <td className="text-center p-3">{t.bttsNo}</td>
                  <td className="text-center p-3">{t.avgGoals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top-Spiele BTTS Ja</h2>
        </div>
        <div className="space-y-4">
          {topBttsMatches.map((m) => (
            <div key={m.match} className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-bold text-primary">{m.match}</h3>
                <p className="text-sm text-gray-600">{m.reason}</p>
              </div>
              <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-lg whitespace-nowrap">
                BTTS Ja: {m.cote}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">BTTS-Analyse nach Gruppe</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {groupBtts.map((g) => (
            <div key={g.group} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-primary">{g.group}</h3>
                <span className="text-sm font-semibold text-accent">{g.bttsRate} BTTS</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{g.reason}</p>
              <p className="text-xs font-bold text-accent">{g.tendency}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — BTTS WM 2026 bei Betano wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — BTTS WM 2026" items={faqItems} />

    </>
  );
}
