import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sportwetten-Glossar | Alle Begriffe erklärt",
  description:
    "Sportwetten-Glossar: 80+ Begriffe erklärt mit Beispielen zur WM 2026. Von A bis Z, das gesamte Vokabular des Wetters.",
  alternates: {
    canonical: "https://www.wm2026guide.de/ratgeber/glossar",
  },
  openGraph: {
    title: "Sportwetten-Glossar — WM 2026",
    description: "Über 80 Sportwetten-Begriffe einfach erklärt mit Beispielen zur WM 2026.",
    url: "https://www.wm2026guide.de/ratgeber/glossar",
  },
};

interface Term {
  name: string;
  definition: string;
  example: string;
}

const glossary: Term[] = [
  { name: "1X2", definition: "Die klassischste Wette: 1 = Heimsieg, X = Unentschieden, 2 = Auswärtssieg.", example: "Frankreich vs Kolumbien: 1 = Sieg Frankreich, X = Unentschieden, 2 = Sieg Kolumbien." },
  { name: "Accumulator (Acca)", definition: "Kombiwette, die mehrere Auswahlen zusammenfasst. Alle müssen gewinnen, um die Wette zu gewinnen.", example: "Frankreich gewinnt + Brasilien gewinnt + Argentinien gewinnt in einer einzigen Wette kombinieren." },
  { name: "Ante-post", definition: "Wette, die lange vor einem Ereignis platziert wird, oft vor Turnierbeginn.", example: "Schon jetzt auf den WM-2026-Sieger wetten, vor dem Anpfiff im Juni." },
  { name: "BZgA", definition: "Bundeszentrale für gesundheitliche Aufklärung, deutsche Behörde für Spielerschutz und verantwortungsvolles Spielen.", example: "Lizenzierte Wettanbieter in Deutschland unterliegen den Auflagen der BZgA." },
  { name: "Asian Handicap", definition: "Handicap, das das Unentschieden eliminiert, indem ein Vorteil/Nachteil in Halb- oder Vierteltoren vergeben wird.", example: "Brasilien -1.5 vs Haiti: Brasilien muss mit mindestens 2 Toren Unterschied gewinnen." },
  { name: "Bankroll", definition: "Das Gesamtkapital, das für Sportwetten vorgesehen ist. Mit Disziplin zu verwalten.", example: "Sie widmen 200 € der WM 2026: Das ist Ihre Bankroll. Setzen Sie nie mehr als 5 % pro Wette." },
  { name: "Bet Builder", definition: "Tool zum Erstellen einer personalisierten Wette durch Kombination mehrerer Märkte auf ein Spiel.", example: "Frankreich gewinnt + Mbappé Torschütze + über 2.5 Tore bei Frankreich-Kolumbien." },
  { name: "Bookmaker", definition: "Sportwettenanbieter, der Quoten anbietet und Einsätze der Wetter annimmt.", example: "PokerStars Sports, Betsson, Betano sind die wichtigsten Wettanbieter für die WM 2026." },
  { name: "Both Teams to Score (BTTS)", definition: "Wette darauf, dass beide Mannschaften mindestens ein Tor erzielen.", example: "Italien vs Kroatien: Wetten, dass beide Mannschaften treffen (ja/nein)." },
  { name: "Cash Out", definition: "Option, eine Wette vor Ende des Ereignisses zu schließen, um einen Gewinn zu sichern oder einen Verlust zu begrenzen.", example: "Sie haben auf Argentinien als Sieger gewettet, sie führen 2:0 zur Halbzeit: Sie können auscashen, um einen Gewinn zu sichern." },
  { name: "Combo", definition: "Synonym für Kombiwette. Mehrere Tipps auf einem einzigen Wettschein.", example: "Combo: Deutschland gewinnt + Spanien gewinnt + England gewinnt." },
  { name: "Correct Score", definition: "Wette auf das exakte Endergebnis des Spiels.", example: "Auf Frankreich 2:1 Kolumbien als genaues Ergebnis wetten." },
  { name: "Quote", definition: "Multiplikator auf Ihren Einsatz bei gewonnener Wette. Je höher die Quote, desto unwahrscheinlicher das Ereignis.", example: "Quote 1,55 für Frankreich gegen Saudi-Arabien: Ein Einsatz von 10 € bringt 15,50 €." },
  { name: "Quotenboost", definition: "Aktion eines Wettanbieters, der die Quote eines Ereignisses vorübergehend erhöht.", example: "PokerStars Sports boostet die Quote für Frankreich als WM-Sieger von 5,50 auf 7,00." },
  { name: "Doppelte Chance", definition: "Wette, die zwei von drei möglichen Ausgängen abdeckt (1X, X2 oder 12).", example: "1X auf Mexiko vs Südkorea: Sie gewinnen, wenn Mexiko gewinnt oder unentschieden spielt." },
  { name: "Draw No Bet (DNB)", definition: "Wette, bei der der Einsatz bei Unentschieden erstattet wird. Sie wetten nur auf einen Sieg.", example: "DNB Schweiz gegen Kanada: Erstattet bei Unentschieden, sonst gewinnen oder verlieren Sie." },
  { name: "Each Way", definition: "Doppelwette: Ein Teil auf den Sieg, ein Teil auf eine Platzierung (Top 2, Top 4...).", example: "Each Way auf Deutschland als WM-Sieger: Sie gewinnen auch, wenn Deutschland das Finale erreicht." },
  { name: "European Handicap", definition: "Klassisches Handicap mit drei möglichen Ausgängen (1, X, 2) nach Anwendung des Handicaps.", example: "Spanien (-1) vs Neuseeland: Spanien startet mit einem virtuellen Tor Rückstand." },
  { name: "First Goalscorer", definition: "Wette auf den Spieler, der das erste Tor des Spiels erzielt.", example: "Wetten, dass Mbappé das erste Tor bei Frankreich vs Kolumbien erzielt." },
  { name: "Flat Betting", definition: "Strategie, bei der immer derselbe Betrag gesetzt wird, unabhängig von der Wette.", example: "Systematisch 10 € auf jedes Spiel der WM 2026 setzen." },
  { name: "Freebet", definition: "Gratiswette eines Wettanbieters. Nur der Nettogewinn wird gutgeschrieben.", example: "PokerStars Sports bietet 100 € in Freebets bei der Registrierung: Sie wetten ohne Ihr Geld zu riskieren." },
  { name: "Futures", definition: "Langzeitwette auf ein zukünftiges Ergebnis (Turniersieger, Torschützenkönig...).", example: "Schon jetzt wetten, dass Brasilien die WM 2026 gewinnt." },
  { name: "Goal Line", definition: "Markt ähnlich dem Over/Under, aber mit Tor-Handicaps, einschließlich Vierteltoren.", example: "Goal Line 2.25 bei Frankreich-Kolumbien: Halbe Erstattung bei 2 Toren, gewonnen bei 3+." },
  { name: "Handicap", definition: "Virtueller Vorteil oder Nachteil für eine Mannschaft, um die Chancen auszugleichen.", example: "Argentinien -2 vs Kamerun: Argentinien muss mit 3 Toren Unterschied gewinnen." },
  { name: "Halbzeit / Endstand (HT/FT)", definition: "Wette auf das Ergebnis zur Halbzeit UND am Spielende.", example: "Brasilien/Brasilien: Brasilien führt zur Halbzeit und gewinnt das Spiel." },
  { name: "In-Play (Live Betting)", definition: "Wetten während des laufenden Spiels, mit Quoten, die sich in Echtzeit ändern.", example: "Wette auf den nächsten Torschützen in der 60. Minute von Spanien vs Türkei." },
  { name: "Lay Bet", definition: "Wette gegen ein Ergebnis: Sie übernehmen die Rolle des Wettanbieters.", example: "Frankreich layen bedeutet wetten, dass Frankreich NICHT gewinnt." },
  { name: "Live Betting", definition: "Siehe In-Play. Wetten in Echtzeit während des Spiels.", example: "Live auf die verbleibende Anzahl Ecken in einem Gruppenspiel wetten." },
  { name: "Longshot", definition: "Wette mit sehr hoher Quote auf ein unwahrscheinliches Ereignis.", example: "Wette auf Haiti als WM-2026-Sieger mit einer Quote von 1000." },
  { name: "Marge", definition: "Vom Wettanbieter in die Quoten eingerechnete Provision. Je niedriger die Marge, desto besser die Quoten.", example: "5 % Marge auf ein Spiel: Die Quoten liegen leicht unter der realen Wahrscheinlichkeit." },
  { name: "Einsatz (Mise)", definition: "Der Geldbetrag, den Sie auf ein Ereignis setzen.", example: "Einsatz von 20 € auf den Sieg Argentiniens zu 1,25 = potenzieller Gewinn von 25 €." },
  { name: "Moneyline", definition: "Angelsächsischer Begriff für eine einfache Siegwette (ohne Handicap).", example: "Moneyline Argentinien gegen Kamerun: Wetten Sie einfach auf den Sieger." },
  { name: "Multibet", definition: "Wette, die mehrere Auswahlen kombiniert (Synonym für Kombiwette/Accumulator).", example: "Multibet auf 5 Spiele des 1. Spieltags der Gruppenphase." },
  { name: "No Bet", definition: "Wette, die annulliert und erstattet wird, wenn eine bestimmte Bedingung eintritt.", example: "Siehe Draw No Bet: Erstattung bei Unentschieden." },
  { name: "Odds", definition: "Englischer Begriff für Quoten. Stellen die Wahrscheinlichkeit laut Wettanbieter dar.", example: "Odds von 3,40 für das Unentschieden Niederlande vs Belgien." },
  { name: "Over/Under (Mehr/Weniger)", definition: "Wette auf die Gesamtanzahl der Tore in einem Spiel, über oder unter einem Schwellenwert.", example: "Over 2.5 bei Frankreich vs Kolumbien: Es müssen mindestens 3 Tore im Spiel fallen." },
  { name: "Parlay", definition: "Amerikanischer Begriff für eine Kombiwette/Accumulator.", example: "Parlay: Frankreich gewinnt + Brasilien gewinnt + über 2.5 Tore bei Spanien-Türkei." },
  { name: "Live-Wette", definition: "Wette in Echtzeit während eines laufenden Spiels.", example: "Live auf den Endstand während England vs Dänemark wetten." },
  { name: "Gratiswette", definition: "Siehe Freebet. Vom Wettanbieter geschenkter Einsatz.", example: "Betano bietet Gratiswetten für die WM 2026 an." },
  { name: "Einzelwette", definition: "Wette auf ein einzelnes Ereignis, im Gegensatz zur Kombiwette.", example: "Einzelwette: Sieg Deutschlands gegen Ecuador." },
  { name: "Systemwette", definition: "Kombination von Kombiwetten, bei der man auch gewinnt, wenn nicht alle Auswahlen richtig sind.", example: "System 2/3: Drei Zweier-Kombis. Es reicht, wenn 2 von 3 richtig sind." },
  { name: "Pick'em", definition: "Spiel, bei dem beide Mannschaften nahezu gleiche Chancen haben.", example: "Niederlande vs Belgien, fast identische Quoten: ein echtes Pick'em." },
  { name: "Profit Boost", definition: "Bonus, der Ihre potenziellen Gewinne bei einer bestimmten Wette erhöht.", example: "Betano bietet einen Profit Boost von 50 % auf das erste Spiel Deutschlands." },
  { name: "Prop Bet (Proposition)", definition: "Wette auf ein bestimmtes Ereignis innerhalb eines Spiels, nicht auf das Endergebnis.", example: "Anzahl der Gelben Karten bei Portugal vs Serbien oder Anzahl der Ecken." },
  { name: "Push", definition: "Ergebnis, bei dem Ihre Wette erstattet wird, weil das Ergebnis genau auf der Linie liegt.", example: "Over/Under 2.0 und es fallen genau 2 Tore: Push, Einsatz erstattet." },
  { name: "Return on Investment (ROI)", definition: "Gewinnprozentsatz im Verhältnis zum Gesamteinsatz. Misst die Rentabilität.", example: "100 € gesetzt, 110 € zurückerhalten = ROI von +10 %." },
  { name: "Scorecast", definition: "Wette, die den Torschützen und das exakte Ergebnis des Spiels kombiniert.", example: "Mbappé erster Torschütze + Frankreich gewinnt 2:0 vs Saudi-Arabien." },
  { name: "Spread", definition: "Amerikanischer Begriff für Handicap. Punkt-/Tordifferenz zwischen den Mannschaften.", example: "USA -1.5 vs Paraguay: Die USA müssen mit mindestens 2 Toren Unterschied gewinnen." },
  { name: "Stake", definition: "Englischer Begriff für den Einsatz. Der auf eine Wette gesetzte Betrag.", example: "Stake von 50 € auf den Sieger der WM 2026." },
  { name: "Sure Bet (Surebet)", definition: "Wette, die alle Ausgänge bei verschiedenen Wettanbietern abdeckt, für einen garantierten Gewinn.", example: "Quotenunterschiede zwischen PokerStars Sports und Betsson auf dasselbe Spiel finden, um einen Gewinn zu garantieren." },
  { name: "System", definition: "Siehe Systemwette. Art der Kombiwette mit Sicherheitsnetz.", example: "System 3/4 auf 4 Spiele der Gruppe F." },
  { name: "Tenner", definition: "Slang für einen Einsatz von 10 Einheiten.", example: "Einen Tenner auf Argentinien als Sieger setzen." },
  { name: "Tipster", definition: "Wettexperte, der seine Analysen und Prognosen teilt, manchmal gegen Bezahlung.", example: "Einem auf die WM 2026 spezialisierten Tipster für Spielanalysen folgen." },
  { name: "Total", definition: "Synonym für Over/Under. Die Gesamtanzahl der Tore, auf die Sie wetten.", example: "Total 2.5 Tore bei Deutschland vs Elfenbeinküste." },
  { name: "Treble", definition: "Kombiwette mit genau drei Auswahlen.", example: "Treble: Frankreich, Brasilien und Argentinien gewinnen ihre Spiele am 1. Spieltag." },
  { name: "Turnover", definition: "Die Anzahl der Male, die ein Bonus umgesetzt werden muss, bevor er ausgezahlt werden kann.", example: "Bonus von 100 € mit Turnover x5: Sie müssen 500 € wetten, bevor Sie auszahlen können." },
  { name: "Under", definition: "Wette auf weniger als X Tore in einem Spiel.", example: "Under 1.5 bei Mexiko vs Südafrika: maximal 0 oder 1 Tor." },
  { name: "Unit", definition: "Standardisierte Einsatzeinheit, oft 1 % der Bankroll.", example: "Bankroll von 500 € --> 1 Unit = 5 €." },
  { name: "Value Bet", definition: "Wette, bei der die angebotene Quote höher ist als die geschätzte reale Wahrscheinlichkeit des Ereignisses.", example: "Wenn Sie Frankreichs Chancen auf 60 % schätzen und die Quote bei 2,00 liegt (50 %), ist es eine Value Bet." },
  { name: "Void", definition: "Annullierte und vollständig erstattete Wette.", example: "Wenn ein Spiel wegen schlechten Wetters verschoben wird, wird die Wette als void erklärt." },
  { name: "Wager", definition: "Allgemeiner englischer Begriff für eine Wette oder einen Einsatz.", example: "Einen Wager von 25 € auf das Eröffnungsspiel der WM 2026 platzieren." },
  { name: "Win/Draw/Win", definition: "Andere Bezeichnung für die klassische 1X2-Wette.", example: "Der Win/Draw/Win-Markt ist der beliebteste bei jedem Gruppenspiel." },
  { name: "Wincast", definition: "Wette, die einen Torschützen und den Sieg seiner Mannschaft kombiniert.", example: "Mbappé Torschütze + Sieg Frankreichs gegen Kolumbien." },
  { name: "X2", definition: "Doppelte-Chance-Wette: Unentschieden oder Auswärtssieg.", example: "X2 bei Kolumbien vs Frankreich: Sie gewinnen bei Unentschieden oder Sieg Frankreichs." },
  { name: "Yield", definition: "Durchschnittliche Rendite pro Wette, Leistungsindikator.", example: "Ein Yield von 8 % bedeutet, dass Sie durchschnittlich 8 % pro Wette bei der WM 2026 gewinnen." },
  { name: "Null-Marge", definition: "Quote ohne Marge des Wettanbieters, die die exakte Wahrscheinlichkeit widerspiegelt.", example: "Einige Wettanbieter bieten Null-Marge-Quoten bei grossen Spielen wie den Halbfinals an." },
  // Additional terms to reach 80+
  { name: "Acca Insurance", definition: "Aktion, bei der eine Kombiwette erstattet wird, wenn nur eine Auswahl falsch ist.", example: "5 Gruppenspiele kombinieren: Wenn 4 von 5 richtig sind, erstattet PokerStars Sports den Einsatz." },
  { name: "Arbitrage", definition: "Strategie, die Quotenunterschiede zwischen Wettanbietern für einen risikofreien Gewinn ausnutzt.", example: "Den Sieg Frankreichs bei PokerStars Sports und Unentschieden + Sieg Kolumbiens bei Betsson nehmen." },
  { name: "Backing", definition: "Für ein Ergebnis wetten (im Gegensatz zum Lay).", example: "Brasilien bei 1,75 backen, um Marokko zu schlagen." },
  { name: "Banke", definition: "Auswahl, die in einer Kombiwette als sehr sicher gilt.", example: "Frankreich als Sieger gegen Saudi-Arabien ist die Banke Ihrer Kombiwette." },
  { name: "Willkommensbonus", definition: "Werbeangebot für Neukunden bei einem Wettanbieter.", example: "PokerStars Sports bietet 100 € in Freebets bei der Registrierung für Wetten auf die WM 2026." },
  { name: "Dezimalquote", definition: "Das in Deutschland und Europa am häufigsten verwendete Quotenformat (z. B. 2,50).", example: "Quote 2,50 = Einsatz von 10 € bringt 25 € (Nettogewinn 15 €)." },
  { name: "Bruchquote", definition: "Britisches Quotenformat, ausgedrückt als Bruch (z. B. 5/2).", example: "5/2 = entspricht 3,50 als Dezimalquote." },
  { name: "Dead Heat", definition: "Regel, die angewandt wird, wenn zwei oder mehr Spieler auf einem Markt gleichauf liegen.", example: "Zwei Spieler werden gemeinsam Torschützenkönig der WM 2026: Der Einsatz wird geteilt." },
  { name: "Dutching", definition: "Strategie, bei der der Einsatz auf mehrere Ergebnisse verteilt wird, um einen festen Gewinn zu garantieren.", example: "Ihren Einsatz zwischen Sieg Frankreichs und Unentschieden bei Frankreich-Kolumbien aufteilen für einen gesicherten Gewinn." },
  { name: "Enhanced Odds", definition: "Vom Wettanbieter vorübergehend verbesserte Quoten als Werbeaktion.", example: "Betano boostet die Quote für Argentinien als WM-Sieger von 4,50 auf 6,00." },
  { name: "Tor-Handicap", definition: "Handicap, das in ganzen Toren angewandt wird.", example: "Deutschland (-2) vs Curaçao: Deutschland muss mit 3+ Toren Unterschied gewinnen." },
  { name: "Verantwortungsvolles Spielen", definition: "Grundprinzip: Setzen Sie nur, was Sie sich leisten können zu verlieren.", example: "Legen Sie ein WM-2026-Budget fest und überschreiten Sie es nie. Rufen Sie bei Bedarf die BZgA an: 0800 1 37 27 00." },
  { name: "Kelly Criterion", definition: "Mathematische Formel zur Bestimmung der optimalen Einsatzhöhe basierend auf dem Vorteil (Edge).", example: "Wenn Ihr Edge 10 % beträgt und die Quote 3,00 ist, empfiehlt Kelly, etwa 5 % Ihrer Bankroll zu setzen." },
  { name: "Late Goal", definition: "Wette auf ein Tor in den letzten Minuten des Spiels.", example: "Wette auf ein Tor nach der 80. Minute im Spiel Italien vs Kroatien." },
  { name: "Linie", definition: "Der vom Wettanbieter festgelegte Schwellenwert für einen Over/Under- oder Handicap-Markt.", example: "Die Linie liegt bei 2,5 Toren für Frankreich-Kolumbien." },
  { name: "Lock", definition: "Wette, die von einem Wettexperten als nahezu sicher angesehen wird.", example: "Der Sieg Frankreichs gegen Saudi-Arabien gilt als Lock." },
  { name: "Halbzeit/Endstand", definition: "Siehe Half-Time/Full-Time.", example: "Wetten, dass Frankreich zur Halbzeit führt / Frankreich das Spiel gewinnt." },
  { name: "Anzahl der Tore", definition: "Markt, der sich auf die genaue Anzahl der Tore in einem Spiel bezieht.", example: "Wette auf genau 3 Tore im Spiel Spanien vs Türkei." },
  { name: "Aussenseiter", definition: "Mannschaft oder Spieler mit geringen Gewinnchancen.", example: "Haiti ist der ultimative Aussenseiter der Gruppe C mit Brasilien und Marokko." },
  { name: "Wetter", definition: "Person, die Sportwetten platziert.", example: "Als Wetter sollten Sie Ihre Strategie für die 72 Spiele der Gruppenphase vorbereiten." },
  { name: "Qualifying Bet", definition: "Wette, die erforderlich ist, um ein Werbeangebot freizuschalten.", example: "Setzen Sie 10 € auf ein beliebiges WM-Spiel, um Ihren Willkommensbonus freizuschalten." },
  { name: "Rollover", definition: "Siehe Turnover. Umsatzbedingungen, die vor der Auszahlung eines Bonus erfüllt werden müssen.", example: "Rollover x3 auf einen 50-€-Bonus = 150 € an Wetten erforderlich." },
];

// Group terms by first letter
function groupByLetter(terms: Term[]): Record<string, Term[]> {
  const grouped: Record<string, Term[]> = {};
  for (const t of terms) {
    const letter = t.name.charAt(0).toUpperCase().replace(/[0-9]/, "#");
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(t);
  }
  return grouped;
}

export default function GlossairePage() {
  const grouped = groupByLetter(glossary);
  const letters = Object.keys(grouped).sort();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: "https://www.wm2026guide.de/" },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: "https://www.wm2026guide.de/ratgeber" },
      { "@type": "ListItem", position: 3, name: "Glossar", item: "https://www.wm2026guide.de/ratgeber/glossar" },
    ],
  };

  return (
    <>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl mb-2">
          Sportwetten-Glossar
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Über {glossary.length} Sportwetten-Begriffe einfach erklärt, mit konkreten Beispielen
          zur WM 2026. Von A bis Z, das gesamte Vokabular des Wetters.
        </p>

        {/* Alphabetical navigation */}
        <nav className="flex flex-wrap gap-1.5 mb-8 sticky top-0 bg-white py-3 z-10 border-b border-gray-100">
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-primary hover:text-white text-sm font-bold text-gray-700 transition"
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* Terms */}
        <div className="space-y-10">
          {letters.map((letter, li) => {
            const borderColors = [
              "border-l-blue-500", "border-l-accent", "border-l-purple-500",
              "border-l-amber-500", "border-l-red-500", "border-l-accent",
              "border-l-pink-500", "border-l-indigo-500", "border-l-orange-500",
              "border-l-cyan-500",
            ];
            const color = borderColors[li % borderColors.length];
            return (
              <section key={letter} id={letter}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-primary/20 pb-2 flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-extrabold">
                    {letter}
                  </span>
                </h2>
                <div className="space-y-3">
                  {grouped[letter]!.map((term) => (
                    <div
                      key={term.name}
                      className={`bg-white rounded-xl border border-gray-200 border-l-4 ${color} p-4 hover:shadow-md transition-shadow`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">{term.name}</h3>
                      <p className="text-gray-700 mt-1">{term.definition}</p>
                      <p className="text-sm text-gray-500 mt-2 italic bg-gray-50 rounded-lg px-3 py-2">
                         {term.example}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-primary/5 rounded-xl text-center">
          <p className="text-lg font-semibold text-gray-900 mb-2">Bereit auf die WM 2026 zu wetten?</p>
          <p className="text-gray-600 mb-4">Vergleichen Sie die Quoten der besten Wettanbieter.</p>
          <Link
            href="/quotenvergleich"
            className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Quotenvergleich anzeigen →
          </Link>
        </div>
      </main>
    </>
  );
}
