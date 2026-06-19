import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Banknote, ArrowRight, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Cash-out-Ratgeber Sportwetten WM 2026 — Wann und wie nutzen",
  description:
    "Kompletter Cash-out-Ratgeber für Sportwetten zur WM 2026. Funktionsweise, wann nutzen, Fallen vermeiden, Vergleich nach Wettanbieter.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/cashout" },
  openGraph: {
    title: "Cash-out-Ratgeber — Sportwetten WM 2026",
    description: "Meistern Sie den Cash-out, um Ihre Gewinne während der WM 2026 abzusichern.",
    url: "https://www.wm2026guide.de/sportwetten/cashout",
  },
};

const avantages = [
  "Teilgewinn vor Spielende absichern",
  "Verluste begrenzen, wenn das Spiel sich wendet",
  "Risiko bei langen Kombiwetten steuern",
  "In Echtzeit auf Spielereignisse reagieren (Rote Karte, Verletzung)",
];

const pieges = [
  "Der Cash-out wird immer zugunsten des Wettanbieters berechnet (eingebaute Marge)",
  "Langfristig reduziert die Nutzung des Cash-outs Ihre Rentabilität",
  "Ein Teil-Cash-out ist oft interessanter als ein vollständiger",
  "Einige Wettanbieter deaktivieren den Cash-out in kritischen Momenten",
  "Nicht aus Angst cashouten — analysieren Sie jede Situation rational",
];

const comparatif = [
  { bookmaker: "Betano", cashout: "Voll + Teil", live: true, auto: false, note: "Cash-out live verfügbar, übersichtliche Oberfläche, lizenzierter Wettanbieter" },
];

export default function CashoutGuidePage() {
  const faqItems = [
    {
      question: "Was ist der Cash-out bei Sportwetten?",
      answer: "Der Cash-out ermöglicht es, eine Wette vor dem Ende des Ereignisses zu schließen. Wenn Ihre Wette auf gutem Weg ist, bietet Ihnen der Wettanbieter einen Betrag an, der unter dem potenziellen Gewinn, aber garantiert ist. Wenn Ihre Wette schlecht läuft, erhalten Sie einen Teil Ihres Einsatzes zurück.",
    },
    {
      question: "Ist der Cash-out langfristig rentabel?",
      answer: "Statistisch gesehen nein. Der Cash-out enthält eine Marge zugunsten des Wettanbieters (durchschnittlich 5-10 %). Langfristig gewinnen Sie mehr, wenn Sie Ihre Wetten laufen lassen. Nutzen Sie ihn selektiv für bestimmte Situationen.",
    },
    {
      question: "Wann ist es sinnvoll zu cashouten?",
      answer: "Cashouten Sie, wenn: (1) ein Schlüsselspieler verletzt ist und Ihre Wette in Gefahr ist, (2) Sie eine 5er-Kombiwette haben und die ersten 4 gewonnen sind, (3) sich die Spielsituation drastisch ändert (Rote Karte, Elfmeter). Vermeiden Sie es, aus Angst zu cashouten.",
    },
  ];

  return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten-Ratgeber
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Cash-out-Ratgeber WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Sichern Sie Ihre Gewinne oder begrenzen Sie Ihre Verluste: Meistern Sie den Cash-out während der WM 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Funktionsweise */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Banknote className="h-7 w-7 text-accent" /> So funktioniert der Cash-out
          </h2>
          <div className="prose max-w-none">
            <p>
              Der Cash-out ist eine Funktion, die von den meisten Wettanbietern angeboten wird und es Ihnen ermöglicht,
              eine <strong>laufende Wette zu schließen</strong>, bevor das Ereignis beendet ist.
              Der angebotene Betrag variiert in Echtzeit je nach Spielverlauf.
            </p>
            <p>
              <strong>Beispiel:</strong> Sie wetten 10 EUR auf Sieg Frankreich zu einer Quote von 2.00 (potenzieller Gewinn: 20 EUR).
              In der 70. Minute führt Frankreich 1:0. Der Wettanbieter bietet Ihnen einen Cash-out von 16 EUR an.
              Sie können 16 EUR garantiert annehmen oder die verbleibenden 20 Minuten abwarten, um potenziell
              20 EUR zu gewinnen — oder alles zu verlieren, falls der Gegner ausgleicht.
            </p>
          </div>
        </section>

        {/* Vorteile */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <CheckCircle className="h-7 w-7 text-green-500" /> Vorteile
          </h2>
          <ul className="space-y-2">
            {avantages.map((a) => (
              <li key={a} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Fallen */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-yellow-500" /> Fallen, die Sie vermeiden sollten
          </h2>
          <ul className="space-y-2">
            {pieges.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Wettanbieter-Vergleich */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Clock className="h-7 w-7 text-accent" /> Cash-out-Vergleich nach Wettanbieter
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Wettanbieter</th>
                  <th className="py-3 px-4 text-left">Art</th>
                  <th className="py-3 px-4 text-center">Live</th>
                  <th className="py-3 px-4 text-center">Auto</th>
                  <th className="py-3 px-4 text-left rounded-tr-lg">Hinweis</th>
                </tr>
              </thead>
              <tbody>
                {comparatif.map((b, i) => (
                  <tr key={b.bookmaker} className={i % 2 === 0 ? "bg-gray-50" : "bg-whitegray-900"}>
                    <td className="py-3 px-4 font-medium">{b.bookmaker}</td>
                    <td className="py-3 px-4">{b.cashout}</td>
                    <td className="py-3 px-4 text-center">{b.live ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-400 mx-auto" />}</td>
                    <td className="py-3 px-4 text-center">{b.auto ? <CheckCircle className="h-4 w-4 text-green-500 mx-auto" /> : <XCircle className="h-4 w-4 text-red-400 mx-auto" />}</td>
                    <td className="py-3 px-4 text-gray-500 text-xs">{b.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="text-center">
          <Link href="/sportwetten/bankroll" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Bankroll-Management WM <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Sportwetten sind mit Risiken verbunden. Spielen Sie verantwortungsvoll. 18+ | Informationen und Hilfe auf bzga.de (BZgA).
        </p>
      </div>
    </>
  );
}
