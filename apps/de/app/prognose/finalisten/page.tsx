import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Trophy, Map, TrendingUp, ArrowRight } from "lucide-react";
import { pmuTrackingUrl } from "@repo/data/affiliates";

export const metadata: Metadata = {
  title: "Prognose Finalisten WM 2026 — Wer erreicht das Finale?",
  description:
    "Wer steht im Finale der WM 2026? Finalisten-Quoten, Analyse der möglichen Turnierbäume und Wege der Favoriten.",
  alternates: { canonical: "https://www.wm2026guide.de/prognose/finalisten" },
  openGraph: {
    title: "Prognose Finalisten WM 2026",
    description: "Finalisten-Quoten, mögliche Turnierbäume und Analyse des Wegs zum Finale.",
    url: "https://www.wm2026guide.de/prognose/finalisten",
  },
};

const finalists = [
  { team: "🇦🇷 Argentinien", coteFinale: 2.8, coteTitre: 5.5, chance: "38%", argument: "Titelverteidiger, vollständiger Kader, Messis letzte WM." },
  { team: "🇫🇷 Frankreich", coteFinale: 3.0, coteTitre: 6.0, chance: "35%", argument: "Finalist 2022, goldene Generation mit Mbappé auf dem Höhepunkt." },
  { team: "🇪🇸 Spanien", coteFinale: 3.5, coteTitre: 7.0, chance: "30%", argument: "Europameister 2024, beeindruckendes Kollektivspiel." },
  { team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", coteFinale: 4.0, coteTitre: 8.0, chance: "26%", argument: "EM-Finalist 2020 und 2024, Erfahrung in grossen Endspielen." },
  { team: "🇧🇷 Brasilien", coteFinale: 4.5, coteTitre: 9.0, chance: "24%", argument: "Das Talent ist da (Vinicius, Rodrygo), fehlende Konstanz in letzter Zeit." },
  { team: "🇩🇪 Deutschland", coteFinale: 5.0, coteTitre: 10.0, chance: "22%", argument: "Renaissance unter Nagelsmann, offensives Talent (Wirtz, Musiala)." },
  { team: "🇵🇹 Portugal", coteFinale: 5.5, coteTitre: 12.0, chance: "20%", argument: "Aussergewöhnliche Kadertiefe, solider Torwart." },
  { team: "🇳🇱 Niederlande", coteFinale: 7.0, coteTitre: 15.0, chance: "15%", argument: "Erfahrene Mannschaft, fähig für Überraschungen in der Finalrunde." },
];

const bracketScenarios = [
  { title: "Szenario 1: Frankreich vs Argentinien", prob: "12%", desc: "Neuauflage des Finales 2022. Wenn beide Mannschaften ihre jeweilige Gruppe als Erster abschliessen, trennt sie der Turnierbaum bis zum Finale. Das Traumszenario für die Fans." },
  { title: "Szenario 2: Spanien vs Brasilien", prob: "8%", desc: "Der Showdown des Offensivfussballs. Yamals Spanien gegen Vinicius' Brasilien. Möglich, wenn Spanien seine Seite des Turnierbaums dominiert und Brasilien Argentinien im Halbfinale ausschaltet." },
  { title: "Szenario 3: Frankreich vs England", prob: "7%", desc: "Das Ärmelkanal-Derby im WM-Finale. Möglich, wenn England ein schwieriges Viertelfinale übersteht und Frankreich Spanien im Halbfinale vermeidet." },
  { title: "Szenario 4: Argentinien vs Deutschland", prob: "6%", desc: "Neuauflage von 2014. Deutschland als Aussenseiter, der jeden in einem Spiel schlagen kann. Das 48-Mannschaften-Format könnte sie begünstigen." },
];

const faqItems = [
  { question: "Ab wann kann man auf die Finalisten wetten?", answer: "Wetten auf die Finalisten sind bereits jetzt als Langzeitwetten bei allen grossen Buchmachern verfügbar. Die Quoten werden sich im Laufe des Turniers ändern. Früh zu wetten bietet in der Regel bessere Quoten, bringt aber mehr Unsicherheit mit sich." },
  { question: "Was ist der Unterschied zwischen einer Wette auf den Sieger und auf einen Finalisten?", answer: "Eine Finalistenwette ist eine Wette darauf, das Finale zu erreichen: Ihre Wette gewinnt, wenn die Mannschaft im Finale spielt, egal ob sie gewinnt oder nicht. Die Quoten sind daher niedriger als für den Titel. Es ist eine weniger riskante, aber auch weniger lukrative Wette." },
  { question: "Ändert das 48-Mannschaften-Format die Chancen, das Finale zu erreichen?", answer: "Ja. Mit mehr Spielen und mehr potenziellen Gegnern müssen die Favoriten mehr Begegnungen bestreiten, um das Finale zu erreichen. Das erhöht leicht das Risiko einer frühen Eliminierung, aber die grossen Nationen bleiben deutlich bevorzugt." },
];

export default function PrognoseFinalistesPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Wer steht im Finale? — WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Analysieren Sie die Quoten, die möglichen Turnierbäume und den Weg der Favoriten zum Finale der WM 2026.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Finalisten-Quoten WM 2026</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Das Finale zu erreichen ist an sich schon eine Leistung. Seit 1998 haben nur 10 verschiedene Nationen ein WM-Finale gespielt. Der Kreis ist geschlossen: Frankreich, Brasilien, Deutschland, Italien, Spanien, Argentinien, Niederlande, Kroatien, England. Dieselben kehren immer wieder.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-center p-3">Finale-Quote</th>
                <th className="text-center p-3">Titel-Quote</th>
                <th className="text-center p-3">% Finalchancen</th>
                <th className="text-left p-3">Argument</th>
              </tr>
            </thead>
            <tbody>
              {finalists.map((f, i) => (
                <tr key={f.team} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-semibold">{f.team}</td>
                  <td className="text-center p-3 text-accent font-bold">{f.coteFinale}</td>
                  <td className="text-center p-3 text-accent font-bold">{f.coteTitre}</td>
                  <td className="text-center p-3">{f.chance}</td>
                  <td className="p-3 text-sm text-gray-600">{f.argument}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">Richtquoten. Die Chancen werden über unser Simulationsmodell geschätzt. 18+</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Map className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Mögliche Finalszenarien</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {bracketScenarios.map((s) => (
            <div key={s.title} className="border border-gray-200 rounded-xl p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-primary">{s.title}</h3>
                <span className="bg-accent/10 text-accent font-bold px-2 py-1 rounded text-xs">{s.prob}</span>
              </div>
              <p className="text-sm text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Der typische Weg eines Finalisten</h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6">
          <p className="text-gray-700 leading-relaxed mb-4">
            Um im 48-Mannschaften-Format das Finale zu erreichen, muss eine Nation mindestens 5 K.o.-Spiele gewinnen (Sechzehntelfinale, Achtelfinale, Viertelfinale, Halbfinale, dann das Finale selbst). Das ist ein Marathon von insgesamt 7 Spielen inklusive Gruppenphase.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Die Mannschaften mit der grössten Kadertiefe werden im Vorteil sein. Ermüdungsmanagement, kluge Rotation und mentale Stärke werden den Unterschied ausmachen. Deshalb sind Nationen mit 2-3 Weltklassespielern auf jeder Position (Frankreich, England, Spanien) begünstigt.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("prono-special")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Auf die Finalisten WM 2026 bei Betano wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Finalisten WM 2026" items={faqItems} />

    </>
  );
}
