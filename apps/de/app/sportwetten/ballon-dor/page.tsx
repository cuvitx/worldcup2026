import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { Award, Trophy, Star, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Prognose Ballon d'Or WM 2026 — Bester Spieler des Turniers",
  description:
    "Wer wird bester Spieler der WM 2026? Top 10 Favoriten mit Quoten, Historie der Gewinner des FIFA Ballon d'Or.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/ballon-or" },
  openGraph: {
    title: "Ballon d'Or WM 2026 — Bester Spieler",
    description: "Top 10 Favoriten für den Ballon d'Or des Turniers, Quoten und komplette Historie.",
    url: "https://www.wm2026guide.de/sportwetten/ballon-or",
  },
};

const favorites = [
  { name: "Kylian Mbappé", team: "🇫🇷 Frankreich", cote: 5.5, reason: "Torschützenkönig 2022, kann Frankreich allein tragen. Geschwindigkeit und Entscheidungsstärke außerhalb der Norm." },
  { name: "Lionel Messi", team: "🇦🇷 Argentinien", cote: 7.0, reason: "Gewinner 2022, könnte sein letztes Kapitel als Legende schreiben. Der emotionale Faktor spricht für ihn." },
  { name: "Vinicius Jr", team: "🇧🇷 Brasilien", cote: 8.0, reason: "Zum besten Spieler der Welt gewählt, Brasilien ruht auf seinen Schultern. Profil eines entscheidenden Turnierspielers." },
  { name: "Jude Bellingham", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", cote: 9.0, reason: "Kompletter Mittelfeldspieler, torgefährlich und kreativ. Seine EM 2024 hat sein Potenzial bei Wettbewerben gezeigt." },
  { name: "Lamine Yamal", team: "🇪🇸 Spanien", cote: 10.0, reason: "18-jähriges Wunderkind, bester junger Spieler der EM 2024. Wenn Spanien weit kommt, wird er entscheidend sein." },
  { name: "Rodri", team: "🇪🇸 Spanien", cote: 12.0, reason: "Ballon d'Or 2024, das spanische Metronom. Sein Einfluss wird von den Jurys oft belohnt." },
  { name: "Erling Haaland", team: "🇳🇴 Norwegen", cote: 15.0, reason: "Tormaschine, aber Norwegen muss weit kommen, damit er im Rennen ist." },
  { name: "Harry Kane", team: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", cote: 14.0, reason: "Produktiver Torschütze, bester englischer Kapitän. Ihm fehlt ein internationaler Titel, um seine Legende zu vollenden." },
  { name: "Federico Valverde", team: "🇺🇾 Uruguay", cote: 20.0, reason: "Außergewöhnlicher Box-to-Box-Mittelfeldspieler. Wenn Uruguay für eine Überraschung sorgt, steht er im Mittelpunkt." },
  { name: "Florian Wirtz", team: "🇩🇪 Deutschland", cote: 18.0, reason: "Generationstalent des deutschen Fußballs. Deutschland spielt in unmittelbarer Nähe quasi zu Hause." },
];

const pastWinners = [
  { year: "2022", player: "Lionel Messi", team: "🇦🇷 Argentinien", note: "7 Tore, unbestrittener MVP. Gekrönt mit 35 Jahren." },
  { year: "2018", player: "Luka Modric", team: "🇭🇷 Kroatien", note: "Spielmacher der kroatischen Überraschung, Finalist." },
  { year: "2014", player: "Lionel Messi", team: "🇦🇷 Argentinien", note: "4 Tore, unglücklicher Finalist. Umstrittene Auszeichnung." },
  { year: "2010", player: "Diego Forlán", team: "🇺🇾 Uruguay", note: "5 Tore, 4. Platz. Überraschungswahl der Jury." },
  { year: "2006", player: "Zinédine Zidane", team: "🇫🇷 Frankreich", note: "3 Tore, Finalist. Trotz der Roten Karte im Finale." },
  { year: "2002", player: "Oliver Kahn", team: "🇩🇪 Deutschland", note: "Torwart-Finalist, einziger Torhüter, der den Preis gewann." },
  { year: "1998", player: "Ronaldo", team: "🇧🇷 Brasilien", note: "4 Tore trotz des verlorenen Finales. Reines Talent." },
];

const faqItems = [
  { question: "Was ist der Ballon d'Or der WM?", answer: "Der Ballon d'Or der WM (früher 'Ballon d'Or adidas') zeichnet den besten Spieler des Turniers aus. Er wird von einer Jury aus Journalisten und Experten am Ende des Wettbewerbs verliehen. Der Gewinner ist nicht zwingend der Torschützenkönig: Die Jury bewertet die Gesamtleistung, den Einfluss auf den Turnierverlauf der Mannschaft und die entscheidenden Momente." },
  { question: "Geht der WM-Ballon d'Or immer an den Sieger?", answer: "Nicht unbedingt. 2014 gewann ihn Messi, obwohl Argentinien das Finale verlor. 2006 erhielt ihn Zidane trotz der Roten Karte im Finale. Allerdings ist es quasi unerlässlich, mindestens das Halbfinale zu erreichen, um im Rennen zu sein." },
  { question: "Wie wettet man auf den WM-Ballon d'Or?", answer: "Wettanbieter bieten einen Markt 'Bester Spieler des Turniers' als Ante-Post-Wette an. Die Quoten sind bereits jetzt verfügbar und entwickeln sich während des gesamten Wettbewerbs weiter. Es ist eine Langzeitwette, die erfordert, sowohl die individuelle Leistung als auch den Mannschaftsverlauf vorherzusagen." },
];

export default function BallonOrCdmPage() {
  return (
    <>

      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">Ballon d&apos;Or WM 2026</h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Wer wird zum besten Spieler der WM 2026 gekrönt? Entdecken Sie die 10 Favoriten, ihre Quoten und die komplette Historie des FIFA Ballon d&apos;Or.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Award className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Top 10 Favoriten — Ballon-d&apos;Or-Quoten</h2>
        </div>
        <p className="text-gray-700 mb-6">
          Der Ballon d&apos;Or der WM krönt den herausragendsten Spieler des Turniers. Seit 1998 geht der Preis überwiegend an einen Stürmer oder Spielmacher, dessen Mannschaft mindestens das Halbfinale erreicht. Favoriten sind logischerweise die Stars der wettbewerbsfähigsten Nationen.
        </p>
        <div className="space-y-4">
          {favorites.map((f, i) => (
            <div key={f.name} className="border border-gray-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 md:w-16">
                <span className="text-2xl font-bold text-accent">{i + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary">{f.name} <span className="text-sm font-normal text-gray-500">{f.team}</span></h3>
                <p className="text-sm text-gray-700 mt-1">{f.reason}</p>
              </div>
              <span className="bg-accent/10 text-accent font-bold px-4 py-2 rounded-lg whitespace-nowrap">
                {f.cote.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Richtquoten, können sich ändern. 18+</p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Historie der Gewinner</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="text-left p-3">Jahr</th>
                <th className="text-left p-3">Spieler</th>
                <th className="text-left p-3">Mannschaft</th>
                <th className="text-left p-3">Note</th>
              </tr>
            </thead>
            <tbody>
              {pastWinners.map((w, i) => (
                <tr key={w.year} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-bold text-accent">{w.year}</td>
                  <td className="p-3 font-semibold">{w.player}</td>
                  <td className="p-3">{w.team}</td>
                  <td className="p-3 text-sm text-gray-600">{w.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">Analyse — Wer kann überraschen?</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Der Faktor &quot;Letzter Tanz&quot;</h3>
            <p className="text-sm text-gray-700">Messi, Ronaldo und Modric spielen wahrscheinlich ihre letzte WM. Die Jury ist oft empfänglich für solche Erzählungen. Wenn einer von ihnen seine Mannschaft ins Finale führt, wird es schwer sein, ihm den Preis zu verweigern.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-5">
            <h3 className="font-bold text-primary mb-2">Das Auftauchen eines Unbekannten</h3>
            <p className="text-sm text-gray-700">2010 war Forlán kein Favorit. Die WM ist ein Talentbeschleuniger. Ein Spieler aus Kolumbien, Marokko oder Japan könnte auftauchen, wenn seine Mannschaft einen historischen Lauf hinlegt.</p>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a href={pmuTrackingUrl("paris-sportifs")} target="_blank" rel="noopener noreferrer sponsored nofollow" className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
          Willkommensbonus — Auf den Ballon d&apos;Or der WM 2026 bei Betano wetten <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      <FAQSection title="Häufig gestellte Fragen — Ballon d'Or WM 2026" items={faqItems} />

    </>
  );
}
