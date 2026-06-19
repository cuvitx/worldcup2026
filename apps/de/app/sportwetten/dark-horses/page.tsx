import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Flame, TrendingUp, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Dark Horses WM 2026 — Überraschungsmannschaften & Außenseiter",
  description:
    "Welche Mannschaften können bei der WM 2026 für eine Überraschung sorgen? Analyse von Marokko, Japan, USA, Kolumbien, Nigeria und Schweiz. Value-Quoten und Argumente.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/dark-horses" },
  openGraph: {
    title: "Dark Horses WM 2026 — Überraschungsmannschaften",
    description: "Marokko, Japan, USA, Kolumbien, Nigeria, Schweiz: Die Außenseiter der WM 2026.",
    url: "https://www.wm2026guide.de/sportwetten/dark-horses",
  },
};

const outsiders = [
  {
    team: "🇲🇦 Marokko", cote: 30.0, ranking: 14,
    strengths: ["Halbfinalist 2022 — Erfahrung bei großen Spielen", "Außergewöhnliche Defensive (nur 1 Gegentor in 5 Spielen 2022)", "Goldene Generation: Hakimi, Amrabat, En-Nesyri, Ziyech", "Massive Fanunterstützung"],
    weakness: "Begrenzte Kadertiefe, Abhängigkeit von einigen Schlüsselspielern.",
    valueArg: "Quote 30,0 für einen aktuellen Halbfinalisten. Klarer Value bei günstiger Auslosung."
  },
  {
    team: "🇯🇵 Japan", cote: 50.0, ranking: 18,
    strengths: ["Hat 2022 Deutschland und Spanien geschlagen", "Spieler in europäischen Topklubs (Kubo, Mitoma, Kamada)", "Tadellose taktische Disziplin", "Konstante Weiterentwicklung seit 20 Jahren"],
    weakness: "Kein Weltklasse-Torschütze. Schwierigkeiten in der K.-o.-Runde.",
    valueArg: "In der Lage, jeden in einem Einzelspiel zu schlagen. Das Achtelfinale ist erreichbar, das Viertelfinale ein realistisches Ziel."
  },
  {
    team: "🇺🇸 USA", cote: 40.0, ranking: 16,
    strengths: ["Gastgeberland — beträchtlicher Heimvorteil", "Talentierte Generation: Pulisic, McKennie, Reyna, Musah", "Begeistertes Publikum, Stadien mit 80.000+ Plätzen", "Massive Investitionen in den US-Fußball"],
    weakness: "Begrenzte Erfahrung auf höchstem Niveau. Druck des Heimspiels.",
    valueArg: "Der Heimvorteil bei der WM ist historisch stark (3 Siege bei 21 Ausgaben). Die USA streben mindestens das Viertelfinale an."
  },
  {
    team: "🇨🇴 Kolumbien", cote: 45.0, ranking: 15,
    strengths: ["Finalist Copa América 2024", "James Rodríguez immer noch magisch bei Länderspielen", "Luis Díaz in strahlender Form", "Attraktiver und offensiver Spielstil"],
    weakness: "Historische Unbeständigkeit bei der WM. Abhängigkeit von Einzelspielern.",
    valueArg: "Ein selbstbewusstes Kolumbien ist eine der gefährlichsten Mannschaften der Welt. Copa-2024-Finalist, kommt in Topform."
  },
  {
    team: "🇳🇬 Nigeria", cote: 80.0, ranking: 28,
    strengths: ["Unerschöpflicher Talentpool", "Physisch starke und schnelle Spieler", "Osimhen kann den Angriff allein tragen", "WM-Tradition (Achtelfinale 2014)"],
    weakness: "Chaotische Verbandsorganisation. Manchmal unzureichende Vorbereitung.",
    valueArg: "Bei 80,0 bringt jede Überraschung großen Gewinn. Das individuelle Talent ist da, insbesondere mit Osimhen."
  },
  {
    team: "🇨🇭 Schweiz", cote: 60.0, ranking: 19,
    strengths: ["Beeindruckende Konstanz (Achtelfinale oder besser bei den letzten 4 großen Turnieren)", "Hat Frankreich bei der EM 2020 eliminiert", "Gut strukturierte Mannschaft, kein Komplex gegen die Großen", "Xhaka, Akanji, Ndoye: solides Rückgrat"],
    weakness: "Gläserne Decke im Viertelfinale. Generationswechsel im Gange.",
    valueArg: "Die Schweiz ist der Dark Horse par excellence. Immer wettbewerbsfähig, nie Favorit, und fähig für eine Überraschung."
  },
  {
    team: "🇹🇷 Türkei", cote: 80.0, ranking: 26,
    strengths: ["EM-2024-Halbfinalist, türkische Erneuerung", "Arda Güler, Wunderkind von Real Madrid", "Hakan Çalhanoglu als Chef im Mittelfeld", "Kriegermentalität, leidenschaftliches Publikum"],
    weakness: "Mangelnde Konstanz. Kann in einem Turnier sowohl zusammenbrechen als auch glänzen.",
    valueArg: "Die Türkei hat bei der EM 2024 gezeigt, dass sie jeden schlagen kann. Wenn das Momentum stimmt, kann sie weit kommen."
  },
];

const faqItems = [
  { question: "Was ist ein Dark Horse im Fußball?", answer: "Ein Dark Horse (oder Außenseiter) ist eine Mannschaft, die nicht als Favorit gilt, aber das Potenzial hat, für eine Überraschung zu sorgen. Bei der WM ist das typischerweise eine Nation, die zwischen Platz 10 und 30 der Weltrangliste steht, mit talentierten Spielern in europäischen Topklubs." },
  { question: "Können Dark Horses wirklich die WM gewinnen?", answer: "Es ist selten, aber möglich. Kroatien (Finalist 2018), Marokko (Halbfinalist 2022) und die Türkei (3. Platz 2002) haben bewiesen, dass Außenseiter sehr weit kommen können. Den Titel zu gewinnen bleibt extrem schwierig: Nur 8 Länder haben die WM in 92 Jahren gewonnen." },
  { question: "Wie erkennt man einen guten Dark Horse?", answer: "Suchen Sie nach: 1) einer Mannschaft mit jüngster Aufwärtsentwicklung (steigende Ergebnisse), 2) Schlüsselspielern in Form bei großen Klubs, 3) einer machbaren Gruppenauslosung, 4) einem erfahrenen Trainer, 5) einer Quote, die das wahre Niveau der Mannschaft nicht widerspiegelt." },
  { question: "Wer ist der beste Dark Horse der WM 2026?", answer: "Marokko ist der glaubwürdigste Dark Horse: Halbfinalist 2022, Weltklasse-Defensive, Stars in Europa. Die USA profitieren vom Heimvorteil. Kolumbien kommt nach dem Copa-2024-Finale in Form. Jeder hat ein starkes Argument." },
];

export default function DarkHorsesPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Dark Horses -- WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Welche Mannschaften können die Hierarchie durcheinanderbringen? Analyse der 7 gefährlichsten Außenseiter der WM 2026.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Die Außenseiter im Blick</h2>
        </div>
        <p className="text-gray-700 mb-8">
          Die WM ist die Bühne der Überraschungen. 2022 erreichte Marokko das Halbfinale, Saudi-Arabien schlug Argentinien, Japan eliminierte Deutschland und Spanien in der Gruppenphase. 2026, mit 48 Mannschaften, vervielfachen sich die Überraschungsmöglichkeiten.
        </p>

        <div className="space-y-8">
          {outsiders.map((o) => (
            <div key={o.team} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-primary/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-primary">{o.team}</h3>
                  <span className="text-sm text-gray-500">FIFA-Rangliste: Platz {o.ranking}</span>
                </div>
                <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-lg">
                  Titelquote: {o.cote.toFixed(1)}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-accent mb-2">Stärken</h4>
                <ul className="space-y-1 mb-4">
                  {o.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      {s}
                    </li>
                  ))}
                </ul>
                <h4 className="font-semibold text-red-600 mb-1">Schwäche</h4>
                <p className="text-sm text-gray-700 mb-3">{o.weakness}</p>
                <div className="bg-accent/5 rounded-lg p-3">
                  <h4 className="font-semibold text-accent text-sm mb-1">Value-Argument</h4>
                  <p className="text-sm text-gray-700">{o.valueArg}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("paris-sportifs")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Auf einen Dark Horse der WM 2026 bei Betano wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen -- Dark Horses WM 2026" items={faqItems} />

    </>
  );
}
