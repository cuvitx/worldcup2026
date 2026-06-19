import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { pmuTrackingUrl } from "@repo/data/affiliates";
import { TrendingUp, Calculator, Target, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Value Bets WM 2026 — Unterschätzte Quoten & Wertwetten",
  description:
    "Kompletter Ratgeber zu Value Bets für die WM 2026. Methodik, Berechnung und 10 konkrete Beispiele für Wertwetten zur WM 2026.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/value-bets" },
  openGraph: {
    title: "Value Bets WM 2026 — Ratgeber & Beispiele",
    description:
      "Erkennen Sie unterschätzte Quoten der WM 2026. Berechnungsformel, Methodik und 10 konkrete Value Bets.",
    url: "https://www.wm2026guide.de/sportwetten/value-bets",
  },
};

const valueBets = [
  {
    label: "Marokko — WM-Sieger",
    cote: 30.0,
    probaImplicite: 3.3,
    probaEstimee: 5,
    reasoning:
      "Halbfinalist 2022, Marokko verfügt über eine goldene Generation (Hakimi, Amrabat, En-Nesyri) und eine der besten Defensiven der Welt. Die Quote spiegelt ihre stetige Weiterentwicklung nicht wider.",
  },
  {
    label: "USA — Halbfinale erreichen",
    cote: 6.0,
    probaImplicite: 16.7,
    probaEstimee: 22,
    reasoning:
      "Der Heimvorteil bei einer WM ist historisch beträchtlich. Pulisic, McKennie und Reyna bilden einen wettbewerbsfähigen Kern. Die Stadien werden auf ihrer Seite sein.",
  },
  {
    label: "Kolumbien — WM-Sieger",
    cote: 45.0,
    probaImplicite: 2.2,
    probaEstimee: 4,
    reasoning:
      "Finalist der Copa América 2024, Kolumbien kommt voller Selbstvertrauen. Luis Díaz ist in Topform und James Rodríguez bleibt bei Länderspielen magisch.",
  },
  {
    label: "Japan — Gruppenphase überstehen (als Erster)",
    cote: 3.5,
    probaImplicite: 28.6,
    probaEstimee: 38,
    reasoning:
      "Japan hat 2022 Deutschland und Spanien geschlagen. Mit Kubo und Mitoma in voller Reife ist ein Gruppensieg ein sehr glaubwürdiges Szenario.",
  },
  {
    label: "Portugal — WM-Sieger",
    cote: 14.0,
    probaImplicite: 7.1,
    probaEstimee: 10,
    reasoning:
      "Die Nachfolge ist mit Bernardo Silva, Rafael Leão und Vitinha gesichert. Portugal kombiniert Erfahrung und Jugend, und die Quote scheint ihre Kadertiefe zu unterschätzen.",
  },
  {
    label: "Nigeria — Viertelfinale erreichen",
    cote: 8.0,
    probaImplicite: 12.5,
    probaEstimee: 17,
    reasoning:
      "Osimhen kann eine Mannschaft allein tragen. Der nigerianische Talentpool ist riesig, und das 48-Mannschaften-Format eröffnet Chancen in der K.-o.-Runde.",
  },
  {
    label: "Under 2.5 Tore im Finale",
    cote: 1.85,
    probaImplicite: 54.1,
    probaEstimee: 65,
    reasoning:
      "WM-Finales sind historisch torarm. Bei den letzten 10 hatten 7 weniger als 3 Tore. Die Anspannung des Spiels drängt die Mannschaften zur Vorsicht.",
  },
  {
    label: "Türkei — Gruppenphase überstehen",
    cote: 2.2,
    probaImplicite: 45.5,
    probaEstimee: 55,
    reasoning:
      "Halbfinalist der EM 2024, die Türkei hat Arda Güler und Çalhanoglu. Das erweiterte 48-Mannschaften-Format erleichtert die Qualifikation fürs Achtelfinale.",
  },
  {
    label: "Niederlande — Niederländischer Torschützenkönig 3+ Tore",
    cote: 2.5,
    probaImplicite: 40,
    probaEstimee: 52,
    reasoning:
      "Die Niederlande spielen offensiven Fußball. Mit dem erweiterten Format (7 mögliche Spiele) hat ein niederländischer Stürmer in Form reichlich Zeit, 3 oder mehr Tore zu erzielen.",
  },
  {
    label: "Unentschieden am 1. Spieltag — USA vs. Gegner aus Topf 3",
    cote: 3.4,
    probaImplicite: 29.4,
    probaEstimee: 38,
    reasoning:
      "Eröffnungsspiele der Gastgeberländer sind oft angespannt. Der Druck kann die USA zu Turnierbeginn lähmen, was ein Unentschieden wahrscheinlicher macht, als die Quote vermuten lässt.",
  },
];

const faqItems = [
  {
    question: "Was ist ein Value Bet genau?",
    answer:
      "Ein Value Bet ist eine Wette, bei der die vom Wettanbieter angebotene Quote höher ist, als sie laut der tatsächlichen Wahrscheinlichkeit des Ereignisses sein sollte. Wenn Sie schätzen, dass eine Mannschaft 10 % Siegchance hat (faire Quote = 10,0), aber der Wettanbieter 15,0 anbietet, ist das ein Value Bet.",
  },
  {
    question: "Wie erkennt man, ob eine Wette ein Value Bet ist?",
    answer:
      "Berechnen Sie die implizite Wahrscheinlichkeit der Quote (1 / Quote x 100), und vergleichen Sie sie mit Ihrer Schätzung der tatsächlichen Wahrscheinlichkeit. Wenn Ihre Schätzung höher ist als die implizite Wahrscheinlichkeit, haben Sie einen Value Bet identifiziert. Der Schlüssel ist eine zuverlässige Schätzung, basierend auf Daten und nicht nur Intuition.",
  },
  {
    question: "Garantieren Value Bets einen Gewinn?",
    answer:
      "Nein. Ein Value Bet ist langfristig profitabel, nicht bei einer einzelnen Wette. Es ist ein statistisches Konzept: Wenn Sie systematisch auf Value Bets setzen, sollten Sie nach einer großen Anzahl von Wetten im Plus sein. Ein einzelner Value Bet kann durchaus verlieren.",
  },
  {
    question: "Warum bieten Wettanbieter Value Bets an?",
    answer:
      "Wettanbieter gleichen ihre Quoten basierend auf den Einsätzen der Öffentlichkeit aus, nicht nur auf den tatsächlichen Wahrscheinlichkeiten. Wenn die Öffentlichkeit einen Favoriten überschätzt, sinkt dessen Quote und die des Gegners steigt, was potenziell einen Value Bet auf den Außenseiter erzeugt.",
  },
  {
    question: "Wie viele Value Bets muss man spielen, um profitabel zu sein?",
    answer:
      "Es braucht eine signifikante Stichprobe: mindestens 50 bis 100 Wetten, damit sich der statistische Vorteil zeigt. Disziplin und Bankroll-Management sind entscheidend. Setzen Sie niemals mehr als 1 bis 3 % Ihres Kapitals auf eine einzelne Wette.",
  },
];

export default function ValueBetsPage() {
  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-accent mb-4">
          Value Bets — WM 2026
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Erkennen Sie die von Wettanbietern unterschätzten Quoten und maximieren Sie Ihre
          Rentabilität bei der WM 2026.
        </p>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Was ist ein Value Bet?
          </h2>
        </div>
        <p className="text-gray-700 mb-4">
          Ein Value Bet entsteht, wenn die von einem Wettanbieter angebotene Quote
          höher ist als die faire Quote, die aus der tatsächlichen Wahrscheinlichkeit
          eines Ereignisses berechnet wird. Anders gesagt: Der Wettanbieter unterschätzt die
          Chancen eines Ergebnisses und bietet Ihnen eine mathematisch
          vorteilhafte Wette an.
        </p>
        <p className="text-gray-700 mb-4">
          Klassische Sportwetten bestehen darin, das richtige Ergebnis zu erraten. Value
          Betting hingegen basiert auf einem anderen Prinzip: Wetten zu finden,
          deren Gewinnerwartung langfristig positiv ist, unabhängig vom
          einzelnen Ergebnis. Das ist der Ansatz, den professionelle Wetter
          verwenden.
        </p>
        <p className="text-gray-700">
          Die WM 2026 mit ihrem erweiterten Format von 48 Mannschaften und
          zahlreichen Unsicherheiten bietet ein besonders fruchtbares Terrain,
          um Value Bets aufzuspüren. Die Wettanbieter müssen Hunderte von
          Märkten quotieren, und Fehleinschätzungen sind unvermeidlich.
        </p>
      </section>

      {/* Berechnung */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Wie berechnet man einen Value Bet
          </h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-primary mb-3">Die Formel</h3>
          <p className="text-gray-700 mb-3">
            <strong>Value = (Quote x Geschätzte Wahrscheinlichkeit) - 1</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              Wenn das Ergebnis <strong>positiv</strong> ist, haben Sie einen Value Bet.
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              Wenn das Ergebnis <strong>negativ oder null</strong> ist, hat die Wette keinen Wert.
            </li>
          </ul>
        </div>
        <div className="bg-accent/5 rounded-xl p-6">
          <h3 className="font-bold text-accent mb-3">Konkretes Beispiel</h3>
          <p className="text-gray-700 mb-2">
            Marokko hat eine Quote von <strong>30.0</strong>, die WM 2026 zu gewinnen. Die
            implizite Wahrscheinlichkeit dieser Quote ist 1/30 = 3,3 %.
          </p>
          <p className="text-gray-700 mb-2">
            Sie schätzen, dass Marokko tatsächlich <strong>5 %</strong> Chance hat
            (Halbfinalist 2022, goldene Generation, konstante Weiterentwicklung).
          </p>
          <p className="text-gray-700 font-semibold">
            Value = (30.0 x 0.05) - 1 = 1.50 - 1 = <span className="text-green-700">+0.50</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Value von 50 %: Das ist ein hervorragender Value Bet. Langfristig ist diese Art
            von Wette sehr profitabel.
          </p>
        </div>
      </section>

      {/* Methodik */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Methodik zur Identifizierung von Value Bets
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Analysieren Sie Daten, nicht Emotionen",
              desc: "Nutzen Sie FIFA-Ranglisten, aktuelle Ergebnisse, Leistungsstatistiken (xG, Ballbesitz) statt Ihrem Bauchgefühl oder der Beliebtheit einer Mannschaft.",
            },
            {
              title: "Vergleichen Sie Quoten mehrerer Wettanbieter",
              desc: "Ein signifikanter Unterschied zwischen Wettanbietern offenbart oft eine Überquotierung. Wenn ein Anbieter 3,5 und ein anderer 2,8 für denselben Markt bietet, gehen Sie der Sache nach.",
            },
            {
              title: "Suchen Sie nach Verzerrungen der Öffentlichkeit",
              desc: "Die breite Öffentlichkeit überschätzt die großen Nationen und unterschätzt die Außenseiter. Die Quoten der Favoriten sind oft zu niedrig, die der Außenseiter zu hoch.",
            },
            {
              title: "Nutzen Sie das 48-Mannschaften-Format",
              desc: "Das neue Format vervielfacht Spiele und Unsicherheiten. Die Wettanbieter haben weniger historische Daten, um noch nie dagewesene Begegnungen zu quotieren.",
            },
            {
              title: "Beobachten Sie die aktuelle Form",
              desc: "Ante-Post-Quoten werden Monate im Voraus festgelegt. Eine Mannschaft in vollem Aufwärtstrend kann Wert bieten, wenn sich ihre Quote noch nicht verändert hat.",
            },
            {
              title: "Berücksichtigen Sie den Kontext",
              desc: "Gastgeberland, Wetterbedingungen, Zeitverschiebung, Stadion: Diese Faktoren werden von den Modellen der Wettanbieter oft untergewichtet.",
            },
          ].map((tip) => (
            <div key={tip.title} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-primary mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-700">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Bets WM 2026 */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-2">
          10 Value Bets WM 2026
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Richtquoten vom 20.02.2026. Überprüfen Sie die aktuellen Quoten vor dem Wetten.
        </p>
        <div className="space-y-6">
          {valueBets.map((vb) => {
            const value = (vb.cote * (vb.probaEstimee / 100) - 1) * 100;
            return (
              <div
                key={vb.label}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="bg-primary/5 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <h3 className="text-lg font-bold text-primary">{vb.label}</h3>
                  <div className="flex items-center gap-4">
                    <span className="bg-accent/10 text-accent font-bold px-3 py-1.5 rounded-lg text-sm">
                      Quote: {vb.cote.toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-800 font-bold px-3 py-1.5 rounded-lg text-sm">
                      Value: +{value.toFixed(0)} %
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>
                      Implizite Wahrsch.: <strong>{vb.probaImplicite} %</strong>
                    </span>
                    <span>
                      Geschätzte Wahrsch.: <strong>{vb.probaEstimee} %</strong>
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{vb.reasoning}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <a
          href={pmuTrackingUrl("paris-sportifs")}
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
        >
          Willkommensbonus — WM-2026-Quoten bei Betano ansehen{" "}
          <ArrowRight className="inline w-4 h-4 ml-1" />
        </a>
        <p className="text-xs text-gray-400 mt-3">18+ | Es gelten die AGB</p>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Häufig gestellte Fragen — Value Bets WM 2026"
        items={faqItems}
      />

      {/* BZgA */}
      <section className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-400">
          Sportwetten sind Personen ab 18 Jahren vorbehalten. Spielen
          birgt Risiken: Verschuldung, Abhängigkeit, Isolation. Rufen Sie die
          0800 1 37 27 00 an (kostenlos).{" "}
          <a
            href="https://www.bzga.de"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            bzga.de
          </a>
        </p>
      </section>
    </>
  );
}
