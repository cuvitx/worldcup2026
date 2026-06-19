import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Clock, Target, TrendingUp, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose Elfmeterschießen WM 2026 — Verlängerung & Elfmeter",
  description:
    "Wettratgeber für Verlängerung und Elfmeterschießen WM 2026. Historische Statistiken, Bilanzen nach Mannschaft und Strategien für Elfmeterwetten.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/elfmeterschiessen" },
  openGraph: {
    title: "Elfmeterschießen WM 2026 — Statistiken & Wetten",
    description: "Historische Bilanzen, Elfmeter-Spezialisten und Strategien für Elfmeterwetten bei der WM 2026.",
    url: "https://www.wm2026guide.de/prognose/elfmeterschiessen",
  },
};

const historicalStats = [
  { edition: "Katar 2022", shootouts: 4, pctKO: "25%", notable: "Argentinien besiegt Frankreich im Finale (4:2 n.E.)" },
  { edition: "Russland 2018", shootouts: 4, pctKO: "25%", notable: "Kroatien 2x im Elfmeterschießen weiter" },
  { edition: "Brasilien 2014", shootouts: 4, pctKO: "25%", notable: "Argentinien 2x im Elfmeterschießen weiter" },
  { edition: "Südafrika 2010", shootouts: 2, pctKO: "12.5%", notable: "Uruguay besiegt Ghana im Elfmeterschießen (Viertelfinale)" },
  { edition: "Deutschland 2006", shootouts: 4, pctKO: "25%", notable: "Italien besiegt Frankreich im Finale (5:3 n.E.)" },
];

const teamRecords = [
  { team: "🇩🇪 Deutschland", played: 4, won: 4, lost: 0, pct: "100%", level: "Ausgezeichnet" },
  { team: "🇦🇷 Argentinien", played: 6, won: 4, lost: 2, pct: "67%", level: "Gut" },
  { team: "🇧🇷 Brasilien", played: 4, won: 2, lost: 2, pct: "50%", level: "Mittel" },
  { team: "🇫🇷 Frankreich", played: 4, won: 2, lost: 2, pct: "50%", level: "Mittel" },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", played: 7, won: 2, lost: 5, pct: "29%", level: "Schwach" },
  { team: "🇪🇸 Spanien", played: 4, won: 1, lost: 3, pct: "25%", level: "Schwach" },
  { team: "🇮🇹 Italien", played: 5, won: 3, lost: 2, pct: "60%", level: "Gut" },
  { team: "🇭🇷 Kroatien", played: 4, won: 3, lost: 1, pct: "75%", level: "Sehr gut" },
];

const faqItems = [
  { question: "Ab welcher Runde kann es bei der WM 2026 ein Elfmeterschießen geben?", answer: "Ein Elfmeterschießen ist erst ab dem Sechzehntelfinale (K.o.-Phase) möglich. In der Gruppenphase können Spiele unentschieden enden. Ab dem Sechzehntelfinale gibt es bei Gleichstand nach 90 Minuten 30 Minuten Verlängerung und dann bei Bedarf ein Elfmeterschießen." },
  { question: "Wie wettet man auf ein Elfmeterschießen?", answer: "Die Buchmacher bieten mehrere Märkte an: 'Geht das Spiel ins Elfmeterschießen?' (Ja/Nein, Quoten 5,0-8,0), 'Sieger im Elfmeterschießen' (Mannschaft A oder B) und 'Genaues Ergebnis im Elfmeterschießen'. Diese Märkte sind nur für K.o.-Spiele verfügbar." },
  { question: "Ist England wirklich schlecht im Elfmeterschießen?", answer: "Historisch ja, mit nur 29% Siegen im WM-Elfmeterschießen. Aber der Trend verbessert sich: Sieg im Elfmeterschießen gegen Kolumbien 2018. Die psychologische Arbeit der modernen englischen Trainer könnte den Fluch 2026 brechen." },
  { question: "Ist der Torwart beim Elfmeterschießen entscheidend?", answer: "Absolut. Ein auf Elfmeter spezialisierter Torwart wie Emiliano Martínez (Argentinien) oder Diogo Costa (Portugal) kann ein Spiel entscheiden. Martínez war im Finale 2022 und bei der Copa América 2024 entscheidend. Der Torwart-Faktor ist das Kriterium Nr. 1 für Elfmeterwetten." },
];

export default function PrognoseTirsAuButPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Verlängerung & Elfmeterschießen — WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Das Elfmeterschießen, der Moment der ultimativen Spannung. Analysieren Sie die historischen Bilanzen und identifizieren Sie die am besten (und am schlechtesten) vorbereiteten Mannschaften.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Geschichte des Elfmeterschießens bei der WM</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Im Durchschnitt enden 25% der K.o.-Spiele im Elfmeterschießen. Es ist ein Nischenmarkt, aber sehr profitabel, wenn man die richtigen Spiele identifiziert. Begegnungen zwischen Mannschaften auf ähnlichem Niveau mit soliden Abwehrreihen sind die idealen Kandidaten.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Ausgabe</th>
                <th className="text-center p-3">Elfmeterschießen</th>
                <th className="text-center p-3">% K.o.-Spiele</th>
                <th className="text-left p-3">Bemerkenswertes</th>
              </tr>
            </thead>
            <tbody>
              {historicalStats.map((s, i) => (
                <tr key={s.edition} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{s.edition}</td>
                  <td className="text-center p-3 font-bold text-accent">{s.shootouts}</td>
                  <td className="text-center p-3">{s.pctKO}</td>
                  <td className="p-3 text-sm">{s.notable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Elfmeterbilanz nach Mannschaft</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">Elfm.</th>
                <th className="text-center p-3">Siege</th>
                <th className="text-center p-3">Niederlagen</th>
                <th className="text-center p-3">% Siege</th>
                <th className="text-left p-3">Niveau</th>
              </tr>
            </thead>
            <tbody>
              {teamRecords.map((t, i) => (
                <tr key={t.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{t.team}</td>
                  <td className="text-center p-3">{t.played}</td>
                  <td className="text-center p-3 text-accent font-bold">{t.won}</td>
                  <td className="text-center p-3 text-red-500">{t.lost}</td>
                  <td className="text-center p-3 font-bold">{t.pct}</td>
                  <td className="p-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${t.level === "Ausgezeichnet" || t.level === "Sehr gut" ? "bg-accent/10 text-accent" : t.level === "Gut" ? "bg-blue-100 text-blue-600" : t.level === "Mittel" ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-600"}`}>
                      {t.level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Spiele mit Elfmeterpotenzial</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Mögliche Viertelfinalspiele</h3>
            <p className="text-sm text-gray-700">Das Viertelfinale ist historisch die Runde mit den meisten Elfmeterschießen. Spiele wie Frankreich vs. England, Argentinien vs. Brasilien oder Spanien vs. Deutschland könnten im Elfmeterschießen entschieden werden.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Der Faktor Emiliano Martínez</h3>
            <p className="text-sm text-gray-700">Der argentinische Torwart ist der beste Elfmeter-Spezialist der Welt. Seine Bilanz: 3 von 3 Elfmeterschießen gewonnen (WM 2022, Copa 2021 und 2024). Ein entscheidender Vorteil für Argentinien.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Elfmeterwetten WM 2026 bei Betano <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Elfmeterschießen WM 2026" items={faqItems} />

    </>
  );
}
