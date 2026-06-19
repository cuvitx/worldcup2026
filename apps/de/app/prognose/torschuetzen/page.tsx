import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Target, TrendingUp, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prognose Bester Torschütze WM 2026 — Top 15 Favoriten & Betano-Quoten",
  description:
    "Wer wird Torschützenkönig der WM 2026? Mbappé, Haaland, Vinicius Jr: Betano-Quoten + Statistiken und Geheimfavoriten.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/torschuetzen" },
  openGraph: {
    title: "Prognose Bester Torschütze WM 2026",
    description: "Top 15 Favoriten, Betano-Quoten und Geheimfavoriten für den Goldenen Schuh 2026.",
    url: "https://www.wm2026guide.de/prognose/torschuetzen",
  },
};

const topScorers = [
  { name: "Kylian Mbappé", team: "🇫🇷 Frankreich", pmusport: 6.5, selGoals: 48, wcGoals: 4 },
  { name: "Erling Haaland", team: "🇳🇴 Norwegen", pmusport: 7.0, selGoals: 35, wcGoals: 0 },
  { name: "Vinicius Jr", team: "🇧🇷 Brasilien", pmusport: 9.0, selGoals: 6, wcGoals: 0 },
  { name: "Harry Kane", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", pmusport: 8.0, selGoals: 68, wcGoals: 6 },
  { name: "Lamine Yamal", team: "🇪🇸 Spanien", pmusport: 12.0, selGoals: 5, wcGoals: 0 },
  { name: "Lionel Messi", team: "🇦🇷 Argentinien", pmusport: 15.0, selGoals: 109, wcGoals: 13 },
  { name: "Robert Lewandowski", team: "🇵🇱 Polen", pmusport: 17.0, selGoals: 84, wcGoals: 2 },
  { name: "Jude Bellingham", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", pmusport: 15.0, selGoals: 6, wcGoals: 0 },
  { name: "Mohamed Salah", team: "🇪🇬 Ägypten", pmusport: 25.0, selGoals: 55, wcGoals: 2 },
  { name: "Victor Osimhen", team: "🇳🇬 Nigeria", pmusport: 20.0, selGoals: 22, wcGoals: 0 },
  { name: "Alexander Isak", team: "🇸🇪 Schweden", pmusport: 22.0, selGoals: 14, wcGoals: 0 },
  { name: "Julián Álvarez", team: "🇦🇷 Argentinien", pmusport: 18.0, selGoals: 9, wcGoals: 1 },
  { name: "Bukayo Saka", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", pmusport: 20.0, selGoals: 12, wcGoals: 0 },
  { name: "Álvaro Morata", team: "🇪🇸 Spanien", pmusport: 25.0, selGoals: 36, wcGoals: 3 },
  { name: "Richarlison", team: "🇧🇷 Brasilien", pmusport: 25.0, selGoals: 20, wcGoals: 3 },
];

const darkHorses = [
  { name: "Dusan Vlahovic", team: "🇷🇸 Serbien", cote: 40.0, reason: "Treffsicherer Torjäger in der Serie A, Serbien ist in einer machbaren Gruppe." },
  { name: "Cody Gakpo", team: "🇳🇱 Niederlande", cote: 30.0, reason: "3 Tore bei der WM 2022, Turnierspieler. Aufsteigende Form bei Liverpool." },
  { name: "Marcus Thuram", team: "🇫🇷 Frankreich", cote: 35.0, reason: "Aussergewöhnliche Saison bei Inter, offensive Option Nr. 2 der Franzosen." },
  { name: "Lautaro Martínez", team: "🇦🇷 Argentinien", cote: 20.0, reason: "Torschützenkönig der Copa América 2024, unterstützt vom argentinischen System." },
];

const youngScorers = [
  { name: "Lamine Yamal", team: "🇪🇸 Spanien", age: 18, cote: 11.0 },
  { name: "Endrick", team: "🇧🇷 Brasilien", age: 19, cote: 30.0 },
  { name: "Mathys Tel", team: "🇫🇷 Frankreich", age: 20, cote: 50.0 },
  { name: "Alejandro Garnacho", team: "🇦🇷 Argentinien", age: 21, cote: 45.0 },
];

const faqItems = [
  { question: "Wer ist der Favorit für den Goldenen Schuh WM 2026?", answer: "Kylian Mbappé und Erling Haaland teilen sich den Favoritenstatus mit Quoten zwischen 6.0 und 7.5 je nach Buchmacher. Mbappé hat den Vorteil der WM-Erfahrung (4 Tore 2022, 1 Tor 2018)." },
  { question: "Wie viele Tore erzielt der Torschützenkönig einer WM im Durchschnitt?", answer: "Seit 1998 erzielt der Torschützenkönig einer WM durchschnittlich 6 Tore. Der Rekord liegt bei 6 Toren, geteilt von mehreren Spielern. Mit dem 48-Mannschaften-Format und mehr Spielen könnte diese Zahl 2026 steigen." },
  { question: "Kommt der Torschützenkönig immer aus einer grossen Nation?", answer: "Nicht unbedingt. James Rodríguez (Kolumbien) gewann den Goldenen Schuh 2014. 2022 wurde Mbappé (Frankreich) Torschützenkönig, obwohl Frankreich das Finale verlor. Die Finalistenmannschaft stellt oft den Torschützenkönig." },
  { question: "Wie kann man auf den Torschützenkönig WM 2026 wetten?", answer: "Wetten auf den Torschützenkönig sind als Langzeitwetten bei Betano verfügbar. Sie können jetzt schon zu vorteilhaften Quoten wetten. Prüfen Sie die Quoten bei Betano, bevor Sie Ihre Wette platzieren." },
];

export default function PrognoseTorschützenPage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">
          Prognose Bester Torschütze WM 2026
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Wer gewinnt den Goldenen Schuh? Vergleichen Sie die Quoten der 15 Favoriten und finden Sie Value Bets für den Torschützenkönig der WM 2026.
        </p>
      </section>

      {/* Introduction */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Der Goldene Schuh steht auf dem Spiel</h2>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          Der Titel des WM-Torschützenkönigs gehört zu den beliebtesten Wetten des Turniers. Mit dem Wechsel zu 48 Mannschaften und mehr Spielen werden die Stürmer mehr Gelegenheiten haben zu glänzen. Das erweiterte Format erhöht die Anzahl der Begegnungen, was die Torschützen der grossen Nationen, die weit in die Finalrunde kommen, begünstigen könnte.
        </p>
        <p className="text-gray-700 leading-relaxed">
          2022 wurde Kylian Mbappé mit 8 Toren Torschützenkönig, darunter ein historischer Hattrick im Finale. Die Geschichte zeigt, dass der Goldene Schuh oft an einen Spieler geht, dessen Mannschaft mindestens das Halbfinale erreicht.
        </p>
      </section>

      {/* Top 15 Table */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top 15 Favoriten — Betano-Quoten</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">#</th>
                <th className="text-left p-3">Spieler</th>
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">Betano</th>
                <th className="text-center p-3">Länderspiel-Tore</th>
                <th className="text-center p-3">WM-Tore</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((p, i) => (
                <tr key={p.name} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-bold text-accent">{i + 1}</td>
                  <td className="p-3 font-semibold">{p.name}</td>
                  <td className="p-3">{p.team}</td>
                  <td className="text-center p-3">{p.pmusport.toFixed(1)}</td>
                  <td className="text-center p-3">{p.selGoals}</td>
                  <td className="text-center p-3">{p.wcGoals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Richtquoten, Änderungen vorbehalten. Prüfen Sie die Quoten auf der Buchmacher-Webseite vor der Wettabgabe. 18+</p>
      </section>

      {/* Dark Horses */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Geheimfavoriten unter den Torschützen</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Diese Spieler sind nicht die Favoriten der Buchmacher, aber ihr Profil und ihre Situation könnten für Überraschungen sorgen. Hohe Quoten für potenziell interessante Value Bets.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {darkHorses.map((p) => (
            <div key={p.name} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-primary">{p.name}</h3>
                  <span className="text-sm text-gray-600">{p.team}</span>
                </div>
                <span className="bg-accent/10 text-accent font-bold px-3 py-1 rounded-lg text-sm">
                  {p.cote.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{p.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Young Scorers */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Bester junger Torschütze — Der Nachwuchs</h2>
        <p className="text-gray-700 mb-6">
          Die WM ist oft die Bühne für das Aufblühen junger Talente. Pelé war 17 Jahre alt bei seiner ersten WM. Wer wird die offensive Entdeckung 2026?
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {youngScorers.map((p) => (
            <div key={p.name} className="bg-primary/5 rounded-xl p-5 text-center">
              <h3 className="font-bold text-primary">{p.name}</h3>
              <p className="text-sm text-gray-600">{p.team}</p>
              <p className="text-xs text-gray-500 mt-1">{p.age} Jahre alt 2026</p>
              <p className="text-accent font-bold mt-2">Quote: {p.cote.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a
          href={pmuTrackingUrl("prono-Torschützen")}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
        >
          Willkommensbonus — Auf den Torschützenkönig WM 2026 wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      {/* FAQ */}
      <FAQSection title="Häufig gestellte Fragen — Torschützenkönig WM 2026" items={faqItems} />

      {/* ANJ */}
    </>
  );
}
