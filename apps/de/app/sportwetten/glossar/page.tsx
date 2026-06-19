import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sportwetten-Glossar — 45+ Begriffe erklärt für die WM 2026",
  description:
    "Komplettes Sportwetten-Glossar: Accumulator, Asian Handicap, Bankroll, BTTS, Cashout, Quote, Value Bet… 45+ Definitionen mit Beispielen zur WM 2026.",
  alternates: { canonical: "https://www.wm2026guide.de/sportwetten/glossar" },
  openGraph: {
    title: "Sportwetten-Glossar — WM 2026",
    description:
      "Komplettes Glossar: 45+ Sportwetten-Begriffe erklärt mit Beispielen zur WM 2026.",
    url: "https://www.wm2026guide.de/sportwetten/glossar",
  },
};

interface Term {
  term: string;
  definition: string;
  example: string;
}

const glossary: Term[] = [
  {
    term: "1X2",
    definition:
      "Die klassischste Wette: Sie setzen auf den Sieg von Mannschaft 1 (1), das Unentschieden (X) oder den Sieg von Mannschaft 2 (2). Das ist die Grundlage jedes Wetters.",
    example:
      "Frankreich – Mexiko: 1 (Sieg Frankreich) mit Quote 1,55, X mit 4,20, 2 mit 6,50.",
  },
  {
    term: "Accumulator (Acca)",
    definition:
      "Eine Kombiwette, die mehrere Auswahlen zusammenfasst. Alle müssen gewinnen, damit die Wette gültig ist. Die Quoten werden multipliziert, was Gewinnpotenzial und Risiko erhöht.",
    example:
      "Kombiwette 4 WM-Gruppenspiele 2026: Frankreich, Brasilien, Deutschland und Argentinien siegreich → Gesamtquote ~5,80.",
  },
  {
    term: "Ante-post",
    definition:
      "Wette, die lange vor Beginn eines Ereignisses platziert wird. Die Quoten sind oft höher, da die Unsicherheit maximal ist.",
    example:
      "Wette auf Brasilien als WM-2026-Sieger ab Januar 2026 mit einer Quote von 5,00.",
  },
  {
    term: "Asian Handicap",
    definition:
      "Handicap, das das Unentschieden eliminiert, indem ein gebrochener Vorteil oder Nachteil vergeben wird (0.5, 1.5…). Bei ganzzahligem Handicap ist ein Push (Erstattung) möglich.",
    example:
      "Japan +1.5 gegen Spanien: Japan kann 0:1 verlieren und Ihre Wette ist trotzdem gewonnen.",
  },
  {
    term: "Bankroll",
    definition:
      "Das Gesamtbudget, das Sie für Sportwetten bereitstellen. Ein gutes Bankroll-Management ist der Schlüssel, um langfristig dabei zu bleiben und unkontrollierte Verluste zu vermeiden.",
    example:
      "Sie legen eine Bankroll von 300 EUR für die gesamte WM 2026 fest und setzen max. 2 % pro Wette (6 EUR).",
  },
  {
    term: "Bookmaker",
    definition:
      "Der Anbieter, der Quoten anbietet und Ihre Wetten annimmt. In Deutschland sind nur von der BZgA anerkannte Wettanbieter zugelassen.",
    example:
      "Die Quoten von Betano für Frankreich – Brasilien im Halbfinale prüfen, bevor Sie Ihren Einsatz platzieren.",
  },
  {
    term: "BTTS (Both Teams To Score)",
    definition:
      "Wette darauf, dass beide Mannschaften mindestens ein Tor erzielen, unabhängig vom Endergebnis.",
    example:
      "England – Niederlande, BTTS Ja mit 1,72: Wette gewonnen bei 2:1, 1:1, 3:2 usw.",
  },
  {
    term: "Cashout",
    definition:
      "Option des Wettanbieters, um Ihre Gewinne einzustreichen (oder Verluste zu begrenzen), bevor das Ereignis beendet ist. Der Betrag ändert sich in Echtzeit.",
    example:
      "Sie haben auf Brasilien als WM-Sieger gewettet. Im Halbfinale bietet Ihnen der Cashout 85 % des potenziellen Gewinns.",
  },
  {
    term: "Kombiwette (Combi)",
    definition:
      "Synonym für Accumulator: mehrere Wetten auf einem einzigen Wettschein zusammengefasst. Die Quoten werden multipliziert, aber das Risiko ebenfalls, denn ein einziges falsches Ergebnis annulliert alles.",
    example:
      "Doppel-Kombi: Sieg Argentinien + BTTS Ja bei Deutschland-Spanien.",
  },
  {
    term: "Quote",
    definition:
      "Der vom Wettanbieter angebotene Multiplikator, der die geschätzte Wahrscheinlichkeit eines Ergebnisses widerspiegelt. Je höher die Quote, desto unwahrscheinlicher das Ereignis laut Wettanbieter.",
    example:
      "Frankreich WM-2026-Sieger mit Quote 4,50 → bei 10 EUR Einsatz gewinnen Sie 45 EUR.",
  },
  {
    term: "Double Chance",
    definition:
      "Wette, die zwei von drei möglichen Ausgängen abdeckt (1X, 12 oder X2). Weniger riskant als eine einfache 1X2-Wette, aber mit niedrigeren Quoten.",
    example:
      "Marokko Doppelte Chance (1X) gegen Portugal: Sie gewinnen, wenn Marokko gewinnt ODER unentschieden spielt.",
  },
  {
    term: "Draw No Bet (DNB)",
    definition:
      "Wette auf den Sieg einer Mannschaft mit Erstattung bei Unentschieden. Ein Sicherheitsnetz, das das Risiko reduziert.",
    example:
      "Senegal DNB gegen Uruguay: Bei Unentschieden wird Ihr Einsatz erstattet.",
  },
  {
    term: "Each Way",
    definition:
      "Wette in zwei Teilen: einer auf den Sieg und einer auf eine Platzierung (Top 2, Top 3…). Vor allem für Langzeitwetten (Turniersieger) verwendet.",
    example:
      "Each Way auf Kolumbien als WM-2026-Sieger: Selbst wenn sie im Finale verliert, zahlt der Platzierungsteil aus.",
  },
  {
    term: "Expected Value (EV)",
    definition:
      "Der erwartete Wert einer Wette. Ein positiver EV bedeutet, dass die Wette langfristig theoretisch profitabel ist. Das ist der heilige Gral des erfahrenen Wetters.",
    example:
      "Wenn Sie Frankreich eine 55%ige Chance geben und die Quote bei 2,00 (50 %) liegt, ist der EV positiv.",
  },
  {
    term: "Flat Betting",
    definition:
      "Strategie, bei der immer derselbe Betrag gesetzt wird, unabhängig vom Spiel oder Ihrem Vertrauensniveau. Einfach und effektiv zum Schutz der Bankroll.",
    example:
      "Fester Einsatz von 5 EUR auf jedes der 104 Spiele der WM 2026.",
  },
  {
    term: "Freebet",
    definition:
      "Gratiswette vom Wettanbieter. Bei Gewinn erhalten Sie den Gewinn, aber nicht den ursprünglichen Einsatz zurück (in den meisten Fällen).",
    example:
      "Freebet von 10 EUR bei Kontoeröffnung, eingesetzt auf Brasilien – Argentinien im Viertelfinale.",
  },
  {
    term: "Europäisches Handicap",
    definition:
      "Handicap, das den Startspielstand einer Mannschaft verändert. Im Gegensatz zum Asian Handicap ist ein Unentschieden mit Handicap möglich.",
    example:
      "Deutschland -1 gegen Costa Rica: Deutschland muss mit mindestens 2 Toren Unterschied gewinnen.",
  },
  {
    term: "Handicap (allgemein)",
    definition:
      "Virtueller Tor-Vorteil oder -Nachteil, der einer Mannschaft zugewiesen wird, um die Chancen auszugleichen. Gibt es in europäischer und asiatischer Version.",
    example:
      "Saudi-Arabien +2 gegen Frankreich: Die Wette ist gewonnen, wenn der Unterschied weniger als 2 Tore beträgt.",
  },
  {
    term: "Lay (Gegenwette)",
    definition:
      "GEGEN ein Ergebnis wetten an einer Wettbörse. Sie übernehmen die Rolle des Wettanbieters und akzeptieren das Risiko, dass ein Ereignis eintritt.",
    example:
      "Lay auf Italien als Gruppensieger: Sie gewinnen, wenn Italien NICHT Erster wird.",
  },
  {
    term: "Live Betting (Live-Wetten)",
    definition:
      "Wetten, die während des laufenden Spiels platziert werden. Die Quoten ändern sich in Echtzeit je nach Spielstand, Ballbesitz und Spielaktionen.",
    example:
      "Frankreich führt 1:0 in der 60. Minute gegen Mexiko: Live-Wette auf Over 2.5 Tore mit Quote 1,90.",
  },
  {
    term: "Marge (des Wettanbieters)",
    definition:
      "Die vom Wettanbieter in die Quoten eingebaute Provision. Je niedriger die Marge, desto günstiger sind die Quoten für den Wetter.",
    example:
      "Bei einem WM-Spiel bietet ein Wettanbieter mit 3 % Marge bessere Quoten als einer mit 7 %.",
  },
  {
    term: "Matched Betting",
    definition:
      "Technik, die Werbeangebote (Freebets) der Wettanbieter nutzt, um einen Gewinn zu garantieren, indem Wette und Lay an einer Wettbörse kombiniert werden.",
    example:
      "Einen Freebet von 20 EUR auf ein WM-Spiel nutzen und das gegenteilige Ergebnis an einer Wettbörse abdecken.",
  },
  {
    term: "Halbzeit / Endstand (HT/FT)",
    definition:
      "Wette auf das Ergebnis zur Halbzeit UND beim Schlusspfiff. Die Quoten sind hoch, da zwei Ergebnisse vorhergesagt werden müssen.",
    example:
      "Brasilien/Brasilien (führt zur Halbzeit und gewinnt) gegen die Schweiz mit Quote 2,10.",
  },
  {
    term: "Odds (Quoten)",
    definition:
      "Englischer Begriff für Quoten. Sie können im Dezimalformat (2,50), als Bruch (3/2) oder im amerikanischen Format (+150) ausgedrückt werden.",
    example:
      "Dezimalquote von 3,00 auf Japan = 33 % implizite Wahrscheinlichkeit = 30 EUR Gewinn bei 10 EUR Einsatz.",
  },
  {
    term: "Over/Under (Über/Unter)",
    definition:
      "Wette auf die Gesamtzahl der Tore in einem Spiel: über (Over) oder unter (Under) einem vom Wettanbieter festgelegten Schwellenwert.",
    example:
      "Over 2.5 Tore bei Spanien – Deutschland: Gewonnen, wenn insgesamt 3 oder mehr Tore fallen.",
  },
  {
    term: "Parlay",
    definition:
      "Amerikanischer Begriff für eine Kombiwette (Accumulator). Sehr beliebt in den USA, Mitgastgeber der WM 2026.",
    example:
      "Parlay mit 3 Auswahlen: USA gewinnt, Over 2.5 und BTTS Ja → Gesamtquote ~7,50.",
  },
  {
    term: "Push",
    definition:
      "Wenn das Ergebnis genau auf der Handicap- oder Totallinie liegt. Der Einsatz wird erstattet, kein Gewinn und kein Verlust.",
    example:
      "Over/Under 2 Tore, Endstand 2:0 (genau 2 Tore): Push, Einsatz wird erstattet.",
  },
  {
    term: "Return on Investment (ROI)",
    definition:
      "Rentabilitätskennzahl: (Nettogewinne / Gesamteinsatz) × 100. Ein positiver ROI bedeutet, dass Sie langfristig profitabel sind.",
    example:
      "300 EUR während der WM gesetzt, 330 EUR zurückbekommen → ROI = +10 %. Hervorragend für ein Turnier.",
  },
  {
    term: "Genaues Ergebnis",
    definition:
      "Wette auf das exakte Endergebnis des Spiels. Sehr schwer vorherzusagen, aber die Quoten sind sehr attraktiv.",
    example:
      "Frankreich 2:1 England im Viertelfinale mit Quote 8,50.",
  },
  {
    term: "Stake (Einsatz)",
    definition:
      "Der Geldbetrag, den Sie auf eine Wette setzen. Das Einsatzmanagement ist grundlegend für den Erhalt Ihrer Bankroll.",
    example:
      "Einsatz von 10 EUR auf den Sieg Brasiliens mit Quote 1,80 → potenzieller Gewinn von 18 EUR.",
  },
  {
    term: "Sure Bet (Sichere Wette)",
    definition:
      "Seltene Situation, in der die Quoten verschiedener Wettanbieter es ermöglichen, alle Ergebnisse abzudecken und einen Gewinn zu garantieren, egal wie das Spiel ausgeht.",
    example:
      "Quote 1X mit 2,10 bei Wettanbieter A und Quote 2 mit 2,15 bei Wettanbieter B auf dasselbe WM-Spiel.",
  },
  {
    term: "System Bet",
    definition:
      "Kombiwette mit Sicherheitsnetz: Sie können eine oder mehrere Auswahlen verlieren und trotzdem gewinnen. Beispiele: Trixie, Yankee, Lucky 15.",
    example:
      "System 2/3 auf drei WM-Spiele: Wenn 2 von 3 Tipps richtig sind, ist die Wette teilweise gewonnen.",
  },
  {
    term: "Tipster",
    definition:
      "Experte, der seine Analysen und Wetten teilt. Manche sind zuverlässig, viele nicht. Überprüfen Sie immer die Bilanz und den ROI.",
    example:
      "Ein Tipster gibt Argentinien – Kroatien: BTTS Ja mit 1,85 an. Überprüfen Sie seinen Track Record, bevor Sie folgen.",
  },
  {
    term: "Treble",
    definition:
      "Kombiwette mit genau drei Auswahlen. Alle drei müssen gewinnen, damit die Wette auszahlt.",
    example:
      "Treble: Frankreich schlägt Belgien + Brasilien schlägt Japan + Spanien schlägt Deutschland → Quote ~4,30.",
  },
  {
    term: "Under",
    definition:
      "Wette auf eine Toranzahl UNTER dem festgelegten Schwellenwert. Gegenteil von Over. Oft bei defensiven Spielen verwendet.",
    example:
      "Under 1.5 Tore bei Uruguay – Schweiz, ein Spiel zwischen zwei sehr defensiven Mannschaften, mit Quote 2,40.",
  },
  {
    term: "Unit (Einheit)",
    definition:
      "Standardisierte Einsatzeinheit zum Vergleich der Leistung zwischen Wettern. 1 Einheit = üblicherweise 1 % der Bankroll.",
    example:
      "Bankroll 500 EUR → 1 Einheit = 5 EUR. \"2 Einheiten auf Frankreich setzen\" = 10 EUR.",
  },
  {
    term: "Value Bet",
    definition:
      "Wette, bei der die angebotene Quote höher ist als die geschätzte tatsächliche Wahrscheinlichkeit. Regelmäßig Value Bets zu finden ist der Schlüssel zur langfristigen Rentabilität.",
    example:
      "Sie schätzen Marokkos Siegchance gegen Spanien auf 35 %. Quote bei 3,40 (29 %) → Value Bet!",
  },
  {
    term: "Void",
    definition:
      "Vom Wettanbieter annullierte Wette. Der Einsatz wird vollständig erstattet. Kann eintreten, wenn ein Spiel verschoben wird oder die Wettbedingungen nicht erfüllt sind.",
    example:
      "Torschütze: Mbappé. Er spielt letztlich nicht → Wette void, Einsatz erstattet.",
  },
  {
    term: "Wager",
    definition:
      "Synonym für Wette oder Einsatz, vor allem im angelsächsischen Sprachgebrauch. Oft mit Rollover-Bedingungen von Boni verbunden.",
    example:
      "Wager-Bedingung ×3: Sie müssen den Bonusbetrag 3-mal umsetzen, bevor Sie auszahlen können.",
  },
  {
    term: "Yield",
    definition:
      "Synonym für ROI in der Wettwelt. Misst den durchschnittlichen Gewinn pro eingesetzter Einheit, ausgedrückt in Prozent.",
    example:
      "Yield von +5 % bei 80 Wetten während der WM 2026 = solide und konstante Leistung.",
  },
];

const faqItems = [
  {
    question: "Welche Begriffe muss man kennen, um auf die WM 2026 zu wetten?",
    answer:
      "Die wichtigsten sind: 1X2, Quote, Bankroll, Over/Under, BTTS, Cashout und Value Bet. Wenn Sie diese 7 Begriffe beherrschen, verstehen Sie 90 % der während der WM angebotenen Wetten.",
  },
  {
    question: "Was ist der Unterschied zwischen Asian Handicap und Europäischem Handicap?",
    answer:
      "Das Asian Handicap eliminiert das Unentschieden durch gebrochene Handicaps (±0.5, ±1.5) oder bietet eine Erstattung (Push) bei ganzzahligen Handicaps. Das Europäische Handicap behält die Möglichkeit eines Unentschiedens mit Handicap bei, was drei mögliche Ausgänge ergibt.",
  },
  {
    question: "Was ist ein Value Bet und wie erkennt man ihn?",
    answer:
      "Ein Value Bet ist eine Wette, deren Quote höher ist als die tatsächliche Wahrscheinlichkeit des Ereignisses. Um ihn zu erkennen, schätzen Sie die Wahrscheinlichkeit eines Ergebnisses und vergleichen Sie sie mit der impliziten Wahrscheinlichkeit der Quote (1/Quote). Wenn Ihre Schätzung höher ist, liegt ein Value Bet vor.",
  },
  {
    question: "Ist der Cashout immer vorteilhaft?",
    answer:
      "Nein. Der Cashout beinhaltet eine zusätzliche Marge des Wettanbieters. Er ist nützlich, um einen Gewinn zu sichern, wenn sich die Situation geändert hat (Verletzung, Rote Karte), aber systematischer Einsatz reduziert Ihre langfristige Rentabilität.",
  },
  {
    question: "Welche Bankroll sollte man für die gesamte WM 2026 einplanen?",
    answer:
      "Ein Budget von 100 bis 500 EUR ist für einen Monat Wettbewerb angemessen. Das Wichtigste ist, diesen Betrag VOR dem Turnier festzulegen, ihn nie zu überschreiten und zwischen 1 % und 3 % pro Wette zu setzen (Flat Betting).",
  },
  {
    question: "Was ist eine Kombiwette (Accumulator) und ist sie profitabel?",
    answer:
      "Eine Kombiwette fasst mehrere Auswahlen zusammen, deren Quoten multipliziert werden. Das ist verlockend, aber statistisch weniger profitabel als Einzelwetten, da die Wahrscheinlichkeit, alles richtig zu haben, drastisch sinkt. Beschränken Sie sich auf maximal 2-3 Auswahlen.",
  },
];

export default function LexiqueParisPage() {
  const alphabet = Array.from(new Set(glossary.map((t) => t.term[0]!.toUpperCase()))).sort();

  return (
    <>

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Sportwetten-Glossar
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Sportwetten-Glossar — WM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            {glossary.length} wichtige Begriffe einfach erklärt mit konkreten Beispielen
            aus der WM 2026. Von A wie Accumulator bis Y wie Yield.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <nav className="mx-auto max-w-5xl px-4 py-6" aria-label="Alphabetische Navigation">
        <div className="flex flex-wrap justify-center gap-2">
          {alphabet.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#022149] text-white text-sm font-bold hover:bg-[#00B865] transition-colors"
            >
              {letter}
            </a>
          ))}
        </div>
      </nav>

      {/* Glossary */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        {alphabet.map((letter) => {
          const terms = glossary.filter((t) => t.term[0]!.toUpperCase() === letter);
          return (
            <div key={letter} id={`letter-${letter}`} className="mb-10 scroll-mt-24">
              <h2 className="text-2xl font-extrabold text-[#022149] border-b-2 border-[#00B865] pb-1 mb-4">
                {letter}
              </h2>
              <div className="space-y-6">
                {terms.map((t) => (
                  <article key={t.term} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <BookOpen className="mt-1 h-5 w-5 shrink-0 text-[#00B865]" />
                      <div>
                        <h3 className="text-lg font-bold text-[#022149]">{t.term}</h3>
                        <p className="mt-1 text-gray-700 leading-relaxed">{t.definition}</p>
                        <p className="mt-2 text-sm text-gray-500 italic">
                          <span className="font-semibold text-[#D4AF37]">Beispiel WM 2026:</span>{" "}
                          {t.example}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <Link
          href="/quotenvergleich"
          className="flex items-center justify-center gap-2 bg-[#00B865] text-white font-bold rounded-xl py-3.5 px-6 text-center hover:brightness-110 transition"
        >
          WM-2026-Quoten vergleichen
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl font-extrabold text-[#022149] mb-6 text-center">
          Häufig gestellte Fragen
        </h2>
        <FAQSection items={faqItems} />
      </section>

      {/* ANJ */}
      <section className="mx-auto max-w-5xl px-4 pb-12 text-center">
        <p className="text-xs text-gray-500">
          🔞 Sportwetten sind für Minderjährige verboten. Spielen Sie verantwortungsvoll.
          <br />
          Bundeszentrale für gesundheitliche Aufklärung (BZgA) —{" "}
          <a
            href="https://www.bzga.de"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#022149]"
          >
            www.bzga.de
          </a>
        </p>
      </section>
    </>
  );
}
