import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { BookOpen, Target, AlertCircle, Wallet, Brain, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Sportwetten-Ratgeber WM 2026 | So wetten Sie als Einsteiger",
  description:
    "Kompletter Ratgeber für Wetten auf die WM 2026. Wettarten (1X2, Over/Under, BTTS, Handicap), Glossar, Bankroll-Management und Gewinnstrategien.",
  openGraph: {
    title: "Sportwetten-Ratgeber WM 2026 | So wetten Sie richtig",
    description: "Lernen Sie, auf die WM 2026 zu wetten: Wettarten, Strategien, Glossar und Tipps für Einsteiger.",
    url: "https://www.wm2026guide.de/sportwetten/guide",
  },
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/guide" },
};

const typesDeParis = [
  {
    nom: "1X2 (Spielergebnis)",
    desc: "Die einfachste Wette: Tippen Sie auf den Sieg von Team 1, das Unentschieden (X) oder den Sieg von Team 2. Dies ist der beliebteste und zugänglichste Markt für Einsteiger.",
    exemple: "Frankreich vs Brasilien: Quote 1 (Frankreich) = 2.40, Quote X (Unentschieden) = 3.20, Quote 2 (Brasilien) = 2.90",
  },
  {
    nom: "Over/Under (Über/Unter Tore)",
    desc: "Wetten Sie auf die Gesamtanzahl der Tore in einem Spiel. Der häufigste Schwellenwert ist 2.5: Over 2.5 = 3 Tore oder mehr, Under 2.5 = 2 Tore oder weniger. Es gibt auch Schwellenwerte bei 0.5, 1.5, 3.5 usw.",
    exemple: "Over 2.5 Tore zu 1.85: Sie gewinnen bei einem Ergebnis von 2-1, 3-0, 2-2 usw.",
  },
  {
    nom: "BTTS (Beide Teams treffen)",
    desc: "Both Teams To Score: Wetten Sie darauf, ob beide Mannschaften während des Spiels mindestens ein Tor erzielen (oder nicht). Ein sehr beliebter Markt bei Gruppenspielen.",
    exemple: "BTTS Ja zu 1.70: Sie gewinnen bei einem Ergebnis von 1-1, 2-1, 1-2, 2-3 usw.",
  },
  {
    nom: "Handicap",
    desc: "Das Handicap gibt einer Mannschaft einen virtuellen Vor- oder Nachteil. Das Asiatische Handicap eliminiert das Unentschieden. Ideal, wenn ein Favorit gegen einen Außenseiter mit zu niedriger 1X2-Quote spielt.",
    exemple: "Frankreich -1.5 zu 2.10: Sie gewinnen, wenn Frankreich mit 2 oder mehr Toren Vorsprung gewinnt (2-0, 3-1...)",
  },
  {
    nom: "Genaues Ergebnis",
    desc: "Tippen Sie das exakte Endergebnis des Spiels. Die Quoten sind hoch (oft 6.00 bis 15.00), da es eine schwierige Wette ist. Für Wetter, die hohe potenzielle Gewinne mögen.",
    exemple: "Genaues Ergebnis 2-1 zu 8.00: Einsatz von 10 EUR = 80 EUR potentieller Gewinn",
  },
  {
    nom: "Torschütze (erster, letzter, jederzeit)",
    desc: "Wetten Sie auf den Spieler, der trifft: erster Torschütze (hohe Quoten), letzter Torschütze oder Torschütze jederzeit (erzielt mindestens ein Tor, niedrigere Quoten).",
    exemple: "Mbappé Torschütze jederzeit zu 2.20: Sie gewinnen, wenn er mindestens ein Tor erzielt",
  },
];

const lexique = [
  { terme: "Quote", def: "Multiplikator, der Ihren Gewinn bestimmt. Einsatz × Quote = Gesamtgewinn." },
  { terme: "Freebet", def: "Gratiswette vom Wettanbieter. Sie riskieren nicht Ihr eigenes Geld." },
  { terme: "Cashout", def: "Möglichkeit, eine Wette vor Spielende zu schließen, um einen Gewinn zu sichern oder einen Verlust zu begrenzen." },
  { terme: "Kombiwette", def: "Wette, die mehrere Auswahlen zusammenfasst. Die Quoten multiplizieren sich, aber alle Auswahlen müssen gewinnen." },
  { terme: "Bankroll", def: "Gesamtbudget, das Sie für Sportwetten verwenden. Darf niemals überschritten werden." },
  { terme: "Value Bet", def: "Wette, deren Quote höher ist als die tatsächliche Wahrscheinlichkeit des Ereignisses. Der Schlüssel zu profitablen Wetten." },
  { terme: "Asiatisches Handicap", def: "Handicap ohne Unentschieden-Möglichkeit. Ihr Einsatz wird erstattet, wenn das Handicap genau auf das Ergebnis fällt." },
  { terme: "Live-Wetten", def: "Wetten in Echtzeit während eines Spiels. Die Quoten entwickeln sich je nach Spielereignissen." },
];

const erreurs = [
  "Mit Emotionen statt mit dem Kopf wetten (wetten Sie nicht aus Liebe auf Ihre Lieblingsmannschaft)",
  "Mehr setzen, um Verluste auszugleichen (jagen Sie niemals Ihren Verlusten hinterher)",
  "Bankroll-Management vernachlässigen (setzen Sie ein Budget fest und halten Sie sich daran)",
  "Nur Kombiwetten mit hohen Quoten spielen (das Risiko steigt exponentiell)",
  "Statistiken ignorieren und sich nur auf das Bauchgefühl verlassen",
  "Quoten nicht zwischen Wettanbietern vergleichen (die Unterschiede können erheblich sein)",
  "Auf zu viele Spiele gleichzeitig wetten, ohne vorherige Analyse",
];

export default function GuideParisPage() {
  return (
    <>

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent">
            So wetten Sie auf die WM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Kompletter Ratgeber für Einsteiger: Wettarten, Glossar, Strategien und Tipps für intelligentes Wetten auf die WM 2026.
          </p>
        </div>
      </section>


      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Einleitung */}
        <section className="prose  max-w-none mb-12">
          <p className="text-lg text-gray-700  leading-relaxed">
            Die WM 2026 wird das größte Sportwetten-Ereignis der Geschichte mit 104 Spielen in 39 Tagen. Ob Sie Anfänger oder Gelegenheitswetter sind, dieser Ratgeber gibt Ihnen alle Schlüssel, um die verschiedenen Wettarten zu verstehen, Ihr Budget zu verwalten und eine intelligente Strategie zu verfolgen. Vergessen Sie nicht: Sportwetten sollten ein Vergnügen bleiben, niemals eine Einnahmequelle.
          </p>
        </section>

        {/* Wettarten */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-accent" />
            Die Wettarten
          </h2>
          <div className="space-y-4">
            {typesDeParis.map((pari) => (
              <div key={pari.nom} className="rounded-xl border border-gray-200  bg-white  p-5 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900  mb-2">{pari.nom}</h3>
                <p className="text-sm text-gray-600  mb-3">{pari.desc}</p>
                <div className="rounded-lg bg-primary/5  px-4 py-2.5 text-xs text-gray-700 ">
                  <strong>Beispiel:</strong> {pari.exemple}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Glossar */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent" />
            Wett-Glossar
          </h2>
          <div className="rounded-2xl border border-gray-200  overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Begriff</th>
                  <th className="px-4 py-3 text-left font-semibold">Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  bg-white ">
                {lexique.map((item) => (
                  <tr key={item.terme}>
                    <td className="px-4 py-3 font-bold text-gray-900  whitespace-nowrap">{item.terme}</td>
                    <td className="px-4 py-3 text-gray-600 ">{item.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fehler vermeiden */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            Fehler, die Sie vermeiden sollten
          </h2>
          <div className="rounded-2xl border border-red-200  bg-red-50/50  p-6">
            <ul className="space-y-3">
              {erreurs.map((err, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 ">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100  text-red-600  flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {err}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bankroll-Management */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-accent" />
            Bankroll-Management
          </h2>
          <div className="rounded-2xl bg-white  border border-gray-200  p-6 sm:p-8">
            <p className="text-gray-700  mb-4">
              Bankroll-Management ist die <strong>Regel Nr. 1</strong> bei Sportwetten. Ihre Bankroll ist das Gesamtbudget für Ihre Wetten. Hier sind die grundlegenden Prinzipien:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Legen Sie Ihr Budget fest</h3>
                <p className="text-gray-600 ">Setzen Sie einen Betrag fest, den Sie sich leisten können, vollständig zu verlieren (z.B. 100 EUR für die gesamte WM). Überschreiten Sie diesen Betrag niemals.</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Die 1-5%-Regel</h3>
                <p className="text-gray-600 ">Setzen Sie nie mehr als 1 bis 5% Ihrer Bankroll auf eine einzelne Wette. Bei 100 EUR bedeutet das Einsätze von 1 bis 5 EUR pro Wette.</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Dokumentieren Sie Ihre Wetten</h3>
                <p className="text-gray-600 ">Notieren Sie jede Wette (Einsatz, Quote, Ergebnis, Gewinn/Verlust). So können Sie Ihre Leistung analysieren und Ihre Stärken erkennen.</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Jagen Sie nie Ihren Verlusten hinterher</h3>
                <p className="text-gray-600 ">Verdoppeln Sie nach einer Verlustserie nicht Ihre Einsätze. Bleiben Sie diszipliniert und halten Sie sich an Ihren Plan. Verluste gehören zum Spiel.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategie */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-accent" />
            Strategietipps WM 2026
          </h2>
          <div className="space-y-4">
            {[
              { title: "Nutzen Sie die Gruppenspiele", desc: "Die ersten WM-Spiele sind oft am vorhersehbarsten. Favoriten gehen selten Risiken ein und setzen sich in der Regel durch. Die 1X2-Quoten sind dort zuverlässiger." },
              { title: "Bevorzugen Sie Value Bets", desc: "Suchen Sie nach Quoten, die von den Wettanbietern unterschätzt werden. Vergleichen Sie die Quoten zwischen Anbietern und setzen Sie, wenn Sie glauben, dass die tatsächliche Wahrscheinlichkeit höher ist als die von der Quote implizierte." },
              { title: "Achtung bei Nachtspielen (Zeitverschiebung)", desc: "Die WM 2026 findet in Nordamerika statt. Einige Spiele werden spät abends europäischer Zeit stattfinden. Müdigkeit kann Ihr Urteilsvermögen beeinträchtigen: Vermeiden Sie Live-Wetten um 2 Uhr nachts." },
              { title: "Diversifizieren Sie Ihre Märkte", desc: "Setzen Sie nicht nur auf 1X2. Over/Under- und BTTS-Märkte bieten oft bessere Möglichkeiten. Torschützen-Wetten sind mit hohen Quoten ebenfalls sehr interessant." },
              { title: "Vergleichen Sie immer die Quoten", desc: "Ein Quotenunterschied von 0.10 mag gering erscheinen, aber bei 50 Wetten ist es ein erheblicher Unterschied. Registrieren Sie sich bei mehreren Wettanbietern und wetten Sie immer auf die beste Quote." },
            ].map((conseil) => (
              <div key={conseil.title} className="flex gap-4 rounded-xl border border-gray-200  bg-white  p-5">
                <TrendingUp className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-gray-900  mb-1">{conseil.title}</h3>
                  <p className="text-sm text-gray-600 ">{conseil.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-accent/10 border border-accent/20 p-6 sm:p-8 text-center mb-10">
          <h2 className="text-xl font-bold text-gray-900  mb-3">Bereit, auf die WM 2026 zu wetten?</h2>
          <p className="text-sm text-gray-600  mb-4">Vergleichen Sie die Wettanbieter und nutzen Sie die Willkommensboni zum Starten.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/meilleurs-bookmakers"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-accent/90 transition-colors"
            >
              Wettanbieter ansehen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/bonus"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-primary/20 transition-colors"
            >
              Alle Boni
            </Link>
          </div>
        </section>
      </div>

      <FAQSection
        title="Fragen zu WM 2026 Wetten"
        items={[
          { question: "Welche Wettart ist für Einsteiger am besten?", answer: "Die 1X2-Wette (Spielergebnis) ist die einfachste für den Einstieg. Beginnen Sie mit Wetten auf Favoriten in Gruppenspielen und erkunden Sie dann nach und nach Over/Under- und BTTS-Märkte." },
          { question: "Wie viel sollte ich pro Wette setzen?", answer: "Setzen Sie nie mehr als 1 bis 5% Ihrer gesamten Bankroll auf eine einzelne Wette. Wenn Ihr WM-Budget 100 EUR beträgt, setzen Sie zwischen 1 und 5 EUR pro Wette. Diese Disziplin ist entscheidend, um langfristig durchzuhalten." },
          { question: "Sind Kombiwetten eine gute Strategie?", answer: "Kombiwetten bieten attraktive Quoten, sind aber riskanter, da alle Auswahlen gewinnen müssen. Beschränken Sie sich auf maximal 2-3 Auswahlen und setzen Sie nicht Ihr gesamtes Budget auf Kombiwetten." },
          { question: "Wie erkennt man einen Value Bet?", answer: "Ein Value Bet ist eine Wette, deren Quote über der tatsächlichen Wahrscheinlichkeit liegt. Analysieren Sie die Statistiken, vergleichen Sie Quoten zwischen Wettanbietern und verlassen Sie sich auf Ihre Analyse statt auf die allgemeine Stimmung." },
          { question: "Sind Live-Wetten für Einsteiger empfehlenswert?", answer: "Live-Wetten erfordern schnelle Reaktionen und Erfahrung. Für den Einstieg bevorzugen Sie Vorspiel-Wetten, die Ihnen Zeit zur Analyse geben. Sie können zum Live-Wetten übergehen, sobald Sie mit den Grundmechanismen vertraut sind." },
        ]}
      />
    </>
  );
}
