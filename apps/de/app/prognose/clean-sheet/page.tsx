import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Shield, BarChart3, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prognose Clean Sheet WM 2026 — Beste Abwehrreihen & Quoten",
  description:
    "Welche Mannschaften bleiben ohne Gegentor? Top-Abwehrreihen, Gegentorstatistiken und Clean-Sheet-Quoten für die WM 2026.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/clean-sheet" },
  openGraph: {
    title: "Clean Sheet WM 2026 — Beste Abwehrreihen",
    description: "Top-Abwehrreihen, Clean-Sheet-Quoten und Gegentorstatistiken für die WM 2026.",
    url: "https://www.wm2026guide.de/prognose/clean-sheet",
  },
};

const topDefenses = [
  { team: "🇫🇷 Frankreich", csRate: "52%", goalsAgainst: 0.7, keeper: "Mike Maignan", coteCs: 2.0, rank: 1 },
  { team: "🇮🇹 Italien", csRate: "55%", goalsAgainst: 0.6, keeper: "Gianluigi Donnarumma", coteCs: 1.90, rank: 2 },
  { team: "🇵🇹 Portugal", csRate: "48%", goalsAgainst: 0.8, keeper: "Diogo Costa", coteCs: 2.10, rank: 3 },
  { team: "🇦🇷 Argentinien", csRate: "50%", goalsAgainst: 0.7, keeper: "Emiliano Martínez", coteCs: 2.05, rank: 4 },
  { team: "🇪🇸 Spanien", csRate: "45%", goalsAgainst: 0.9, keeper: "Unai Simón", coteCs: 2.20, rank: 5 },
  { team: "🇲🇦 Marokko", csRate: "50%", goalsAgainst: 0.7, keeper: "Yassine Bounou", coteCs: 2.30, rank: 6 },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", csRate: "42%", goalsAgainst: 1.0, keeper: "Jordan Pickford", coteCs: 2.40, rank: 7 },
  { team: "🇳🇱 Niederlande", csRate: "40%", goalsAgainst: 1.0, keeper: "Bart Verbruggen", coteCs: 2.50, rank: 8 },
];

const csStats = [
  { edition: "Katar 2022", totalCs: 28, pctMatches: "44%", bestTeam: "🇲🇦 Marokko (4 CS)" },
  { edition: "Russland 2018", totalCs: 25, pctMatches: "39%", bestTeam: "🇧🇪 Belgien (3 CS)" },
  { edition: "Brasilien 2014", totalCs: 22, pctMatches: "34%", bestTeam: "🇩🇪 Deutschland (4 CS)" },
  { edition: "Südafrika 2010", totalCs: 30, pctMatches: "47%", bestTeam: "🇪🇸 Spanien (5 CS)" },
];

const faqItems = [
  { question: "Was ist eine Clean-Sheet-Wette?", answer: "Bei einer Clean-Sheet-Wette setzen Sie darauf, dass eine Mannschaft in den regulären 90 Minuten (ohne Verlängerung) kein Gegentor kassiert. Wenn das Ergebnis 0:0 ist oder Ihre Mannschaft ohne Gegentor gewinnt, ist die Wette gewonnen." },
  { question: "Welche Mannschaft hat die beste Clean-Sheet-Bilanz bei der WM?", answer: "Historisch dominieren die großen europäischen Nationen: Italien, Deutschland und Frankreich haben die besten Bilanzen. 2022 beeindruckte Marokko mit 4 Clean Sheets und kassierte vor dem Halbfinale in 5 Spielen nur ein einziges Tor (Eigentor)." },
  { question: "Sind Clean Sheets in der Gruppenphase häufiger?", answer: "Nein, es ist umgekehrt. K.o.-Spiele bringen mehr Clean Sheets hervor, da die Mannschaften vorsichtiger spielen. Im Durchschnitt gibt es in 50% der Finalrundenspiele mindestens ein Clean Sheet, gegenüber 42% in der Gruppenphase." },
  { question: "Ist der Torwart bei der Clean-Sheet-Wette wichtig?", answer: "Absolut. Ein Weltklasse-Torwart wie Donnarumma, Maignan oder Martínez kann den Unterschied machen. Analysieren Sie die Statistiken des Stammtorwarts, seine Paraden pro Spiel und seine Zuverlässigkeit beim Elfmeter." },
];

export default function PrognoseCleanSheetPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Clean Sheet — WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Welche Abwehrreihen bleiben unüberwindbar? Analysieren Sie die besten Defensiven und wetten Sie auf Clean Sheets bei der WM 2026.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top-Abwehrreihen — Clean-Sheet-Quoten</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Das Clean Sheet ist ein von Wettern oft unterschätzter Markt. Die besten Abwehrreihen halten in 40 bis 55% ihrer Länderspiele ihren Kasten sauber. Mit dem 48-Mannschaften-Format treffen die Favoriten in der Gruppenphase auf schwächere Teams, was die Chancen auf ein Clean Sheet erhöht.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">CS-Rate</th>
                <th className="text-center p-3">Gegentore/Spiel</th>
                <th className="text-left p-3">Torwart</th>
                <th className="text-center p-3">CS-Quote 1. Spiel</th>
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
        <p className="text-xs text-gray-500 mt-3">Statistiken basierend auf den letzten 20 Länderspielen. Quoten sind Richtwerte. 18+</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Clean-Sheet-Geschichte bei der WM</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Ausgabe</th>
                <th className="text-center p-3">CS gesamt</th>
                <th className="text-center p-3">% Spiele mit CS</th>
                <th className="text-left p-3">Beste Mannschaft</th>
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
          <h2 className="text-2xl font-bold text-primary">Clean-Sheet-Strategie WM 2026</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">In der Gruppenphase</h3>
            <p className="text-sm text-gray-700">Setzen Sie auf die Favoriten gegen kleine Nationen. Frankreich, Italien und Argentinien gegen bescheidene Gegner bieten die besten Clean-Sheet-Chancen zu attraktiven Quoten (1,8-2,2).</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">In der K.o.-Phase</h3>
            <p className="text-sm text-gray-700">K.o.-Spiele sind oft defensiver. Wetten Sie auf das Clean Sheet einer Mannschaft mit einem starken Torwart im Achtelfinale, wo die Niveauunterschiede noch deutlich sind.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <Link href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Clean Sheet WM 2026 bei Betano wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </Link>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Clean Sheet WM 2026" items={faqItems} />

    </>
  );
}
