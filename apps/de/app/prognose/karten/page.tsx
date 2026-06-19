import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { AlertTriangle, BarChart3, User, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Karten-Prognose WM 2026 — Gelbe, Rote Karten & Wetten",
  description:
    "Wettratgeber für Karten bei der WM 2026. Statistiken nach Mannschaft, FIFA-Schiedsrichter, am häufigsten verwarnte Spieler und beste Quoten.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/karten" },
  openGraph: {
    title: "Karten-Prognose WM 2026",
    description: "Kartenstatistiken nach Mannschaft, FIFA-Schiedsrichter und am häufigsten verwarnte Spieler bei der WM 2026.",
    url: "https://www.wm2026guide.de/prognose/karten",
  },
};

const teamCards = [
  { team: "🇦🇷 Argentinien", yellowAvg: 2.3, redRate: "12%", total2022: 16, style: "Aggressiv" },
  { team: "🇳🇱 Niederlande", yellowAvg: 2.1, redRate: "8%", total2022: 18, style: "Körperbetont" },
  { team: "🇲🇦 Marokko", yellowAvg: 2.0, redRate: "6%", total2022: 11, style: "Kampfstark" },
  { team: "🇨🇲 Kamerun", yellowAvg: 2.4, redRate: "14%", total2022: 9, style: "Sehr körperbetont" },
  { team: "🇺🇾 Uruguay", yellowAvg: 2.5, redRate: "10%", total2022: 10, style: "Hart" },
  { team: "🇨🇴 Kolumbien", yellowAvg: 2.2, redRate: "9%", total2022: 0, style: "Körperbetont" },
  { team: "🇪🇨 Ecuador", yellowAvg: 2.1, redRate: "8%", total2022: 8, style: "Engagiert" },
  { team: "🇰🇷 Südkorea", yellowAvg: 1.8, redRate: "5%", total2022: 9, style: "Intensiv" },
];

const referees = [
  { name: "Facundo Tello", country: "🇦🇷 Argentinien", yellowAvg: 4.8, style: "Streng, zögert nicht, Karten zu zeigen." },
  { name: "Ismail Elfath", country: "🇺🇸 USA", yellowAvg: 3.5, style: "Gemäßigt, bevorzugt den Dialog." },
  { name: "Jesús Valenzuela", country: "🇻🇪 Venezuela", yellowAvg: 4.2, style: "Strikt, wendet die Regeln buchstabengetreu an." },
  { name: "Clément Turpin", country: "🇫🇷 Frankreich", yellowAvg: 4.0, style: "Erfahren, europäische Referenz." },
  { name: "Slavko Vincic", country: "🇸🇮 Slowenien", yellowAvg: 3.8, style: "Konstant, gute Spielkontrolle." },
];

const warningPlayers = [
  { name: "Sergio Ramos (zurückgetreten)", team: "🇪🇸", totalCards: 27, note: "WM-Rekord. Historische Referenz." },
  { name: "Nicolás Otamendi", team: "🇦🇷", totalCards: 8, note: "Engagierter Verteidiger, oft verwarnt." },
  { name: "Casemiro", team: "🇧🇷", totalCards: 6, note: "Defensiver Mittelfeldspieler, Spezialist für taktische Fouls." },
  { name: "Bruno Fernandes", team: "🇵🇹", totalCards: 5, note: "Häufiges Reklamieren, lebhaftes Temperament." },
  { name: "Rodri", team: "🇪🇸", totalCards: 4, note: "Clevere Fouls, aber kostspielig an Karten." },
];

const faqItems = [
  { question: "Welche Arten von Kartenwetten gibt es?", answer: "Die Buchmacher bieten mehrere Märkte an: Gesamtanzahl Gelber Karten (Over/Under), erste Mannschaft mit einer Karte, Spieler mit einer Karte, Rote Karte im Spiel (Ja/Nein). Die Quoten variieren von 1,5 bis 15,0 je nach Markt." },
  { question: "Welche Mannschaften erhalten die meisten Karten bei der WM?", answer: "Südamerikanische und afrikanische Mannschaften haben historisch die höchsten Kartenquoten. Argentinien, Uruguay und Kamerun gehören regelmäßig zu den am häufigsten bestraften Mannschaften mit durchschnittlich mehr als 2 Gelben Karten pro Spiel." },
  { question: "Beeinflusst der Schiedsrichter die Anzahl der Karten?", answer: "Ja, erheblich. Einige Schiedsrichter verteilen durchschnittlich 3 Karten pro Spiel, andere mehr als 5. Prüfen Sie die Identität des eingesetzten Schiedsrichters, bevor Sie auf Karten wetten. Südamerikanische Schiedsrichter sind in der Regel strenger." },
  { question: "Gibt es in der K.o.-Phase mehr Karten?", answer: "Ja, K.o.-Spiele bringen im Durchschnitt 15-20% mehr Karten hervor als Gruppenspiele. Der höhere Einsatz treibt die Spieler zu härteren Fouls und die Spannungen sind intensiver." },
];

export default function PrognoseCartonsPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Kartenwetten — WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Gelbe Karten, Rote Karten: alles Wissenswerte zum Wetten auf Karten bei der WM 2026. Statistiken, Schiedsrichter und Spieler im Fokus.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Kartenstatistiken nach Mannschaft</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Der Spielstil und die Fußballkultur beeinflussen die Kartenanzahl stark. Körperbetonte Mannschaften und südamerikanische Duelle bringen systematisch mehr Karten hervor. Hier die Statistiken der am häufigsten bestraften Mannschaften der letzten 10 Pflichtspiele.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">Gelbe/Spiel</th>
                <th className="text-center p-3">% Spiele mit Rot</th>
                <th className="text-center p-3">Gesamt WM 2022</th>
                <th className="text-left p-3">Stil</th>
              </tr>
            </thead>
            <tbody>
              {teamCards.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3 font-bold text-accent">{t.yellowAvg}</td>
                  <td className="text-center p-3">{t.redRate}</td>
                  <td className="text-center p-3">{t.total2022}</td>
                  <td className="p-3 text-sm">{t.style}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Nominierte FIFA-Schiedsrichter</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Der Schiedsrichter ist ein entscheidender Faktor bei Kartenwetten. Jeder Offizielle hat seine Tendenzen. Hier die voraussichtlichen Schiedsrichter der WM 2026.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {referees.map((r) => (
            <div key={r.name} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-primary">{r.name}</h3>
              <p className="text-sm text-gray-500">{r.country}</p>
              <p className="text-accent font-bold mt-2">{r.yellowAvg} Gelbe/Spiel</p>
              <p className="text-xs text-gray-600 mt-1">{r.style}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Am häufigsten verwarnte Spieler</h2>
        </div>
        <div className="space-y-3">
          {warningPlayers.map((p) => (
            <div key={p.name} className="flex items-center justify-between border border-gray-200 rounded-xl p-4">
              <div>
                <span className="font-semibold">{p.name}</span>
                <span className="text-sm text-gray-500 ml-2">{p.team}</span>
                <p className="text-xs text-gray-600">{p.note}</p>
              </div>
              <span className="bg-yellow-100 text-yellow-700 font-bold px-3 py-1 rounded-lg text-sm">
                {p.totalCards} Karten WM
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Kartenwetten WM 2026 bei Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Karten WM 2026" items={faqItems} />

    </>
  );
}
