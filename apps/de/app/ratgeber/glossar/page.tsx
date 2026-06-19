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
  { name: "Marge", definition: "Commission intégrée par le bookmaker dans les cotes. Plus la marge est basse, meilleures sont les cotes.", example: "Marge de 5% sur un match : les cotes sont légèrement inférieures à la probabilité réelle." },
  { name: "Mise", definition: "Le montant d'argent que vous pariez sur un événement.", example: "Mise de 20€ sur la victoire de l'Argentine à 1.25 = gain potentiel de 25€." },
  { name: "Moneyline", definition: "Terme anglo-saxon pour un pari simple sur le vainqueur (sans handicap).", example: "Moneyline Argentine contre Cameroun : pariez simplement sur le vainqueur." },
  { name: "Multibet", definition: "Pari combinant plusieurs Aufgebots (synonyme de combiné/accumulator).", example: "Multibet de 5 matchs de la J1 de la phase de Gruppen." },
  { name: "No Bet", definition: "Pari annulé et remboursé si une condition spécifique se réalise.", example: "Voir Draw No Bet : remboursé en cas de nul." },
  { name: "Odds", definition: "Terme anglais pour les cotes. Représentent la probabilité selon le bookmaker.", example: "Odds de 3.40 pour le match nul Pays-Bas vs Belgique." },
  { name: "Over/Under (Plus/Moins)", definition: "Pari sur le nombre total de buts dans un match, au-dessus ou en-dessous d'un seuil.", example: "Over 2.5 sur France vs Colombie : il faut au moins 3 buts dans le match." },
  { name: "Parlay", definition: "Terme américain pour un pari combiné/accumulator.", example: "Parlay : France gagne + Brésil gagne + plus de 2.5 buts dans Espagne-Turquie." },
  { name: "Pari en direct", definition: "Version française du live betting / in-play.", example: "Parier en direct sur le score final pendant Angleterre vs Danemark." },
  { name: "Pari gratuit", definition: "Voir Freebet. Mise offerte par le bookmaker.", example: "Genybet offre 90€ en paris gratuits pour la CDM 2026." },
  { name: "Pari simple", definition: "Pari portant sur un seul événement, par opposition au combiné.", example: "Pari simple : victoire de l'Allemagne contre l'Équateur." },
  { name: "Pari système", definition: "Combinaison de paris combinés permettant de gagner même si toutes les Aufgebots ne sont pas justes.", example: "Système 2/3 : trois combinés de 2 matchs. Il suffit que 2 sur 3 soient bons." },
  { name: "Pick'em", definition: "Match où les deux Mannschafts sont données à chances quasiment égales.", example: "Pays-Bas vs Belgique, cotes quasi identiques : un vrai pick'em." },
  { name: "Profit Boost", definition: "Bonus augmentant vos gains potentiels sur un pari spécifique.", example: "Genybet offre un profit boost de 50% sur le premier match de la France." },
  { name: "Prop Bet (Proposition)", definition: "Pari sur un événement spécifique dans un match, non lié au Ergebnis final.", example: "Nombre de cartons jaunes dans Portugal vs Serbie, ou nombre de corners." },
  { name: "Push", definition: "Ergebnis où votre pari est remboursé car le Ergebnis tombe exactement sur la ligne.", example: "Over/Under 2.0 et il y a exactement 2 buts : push, mise remboursée." },
  { name: "Return on Investment (ROI)", definition: "Pourcentage de profit par rapport au total des mises. Mesure la rentabilité.", example: "100€ misés, 110€ récupérés = ROI de +10%." },
  { name: "Scorecast", definition: "Pari combinant le Torschütze et le score exact du match.", example: "Mbappé premier Torschütze + France gagne 2-0 vs Arabie Saoudite." },
  { name: "Spread", definition: "Terme américain pour le handicap. Écart de points/buts entre les Mannschafts.", example: "États-Unis -1.5 vs Paraguay : les USA doivent gagner par 2 buts minimum." },
  { name: "Stake", definition: "Terme anglais pour la mise. Le montant engagé sur un pari.", example: "Stake de 50€ sur le vainqueur der WM 2026." },
  { name: "Sure Bet (Surebet)", definition: "Pari couvrant toutes les issues sur différents bookmakers pour un profit garanti.", example: "Trouver des écarts de cotes entre PokerStars Sports et Betsson sur un même match pour garantir un gain." },
  { name: "Système", definition: "Voir Pari système. Type de combiné avec filet de sécurité.", example: "Système 3/4 sur 4 matchs du Gruppe F." },
  { name: "Tenner", definition: "Argot pour une mise de 10 unités.", example: "Mettre un tenner sur l'Argentine vainqueur." },
  { name: "Tipster", definition: "Pronostiqueur qui partage ses analyses et Prognoses, parfois contre rémunération.", example: "Suivre un tipster spécialisé dans la CDM 2026 pour ses analyses des matchs." },
  { name: "Total", definition: "Synonyme d'over/under. Le nombre total de buts sur lequel vous pariez.", example: "Total 2.5 buts sur Allemagne vs Côte d'Ivoire." },
  { name: "Treble", definition: "Pari combiné de trois Aufgebots exactement.", example: "Treble : France, Brésil et Argentine gagnent leurs matchs de la J1." },
  { name: "Turnover", definition: "Le nombre de fois où un bonus doit être remis en jeu avant de pouvoir être retiré.", example: "Bonus de 100€ avec turnover x5 : il faut parier 500€ avant de retirer." },
  { name: "Under", definition: "Wetten auf moins de X buts dans un match.", example: "Under 1.5 sur Mexique vs Afrique du Sud : 0 ou 1 but maximum." },
  { name: "Unit", definition: "Unité de mise standardisée, souvent 1% de la bankroll.", example: "Bankroll de 500€ → 1 unit = 5€." },
  { name: "Value Bet", definition: "Pari dont la cote proposée est supérieure à la probabilité réelle estimée de l'événement.", example: "Si vous estimez la France à 60% de chances et la cote est à 2.00 (50%), c'est un value bet." },
  { name: "Void", definition: "Pari annulé et intégralement remboursé.", example: "Si un match est reporté pour cause de météo, le pari est déclaré void." },
  { name: "Wager", definition: "Terme anglais générique pour un pari ou une mise.", example: "Placer un wager de 25€ sur le match d'ouverture de la CDM 2026." },
  { name: "Win/Draw/Win", definition: "Autre nom pour le pari 1X2 classique.", example: "Le marché Win/Draw/Win est le plus populaire sur chaque match de groupe." },
  { name: "Wincast", definition: "Pari combinant un Torschütze et la victoire de son Mannschaft.", example: "Mbappé Torschütze + victoire de la France contre la Colombie." },
  { name: "X2", definition: "Pari double chance : nul ou victoire de l'extérieur.", example: "X2 sur Colombie vs France : vous gagnez si nul ou victoire de la France." },
  { name: "Yield", definition: "Taux de rendement moyen par pari, indicateur de performance.", example: "Un yield de 8% signifie que vous gagnez 8% en moyenne par pari sur la CDM 2026." },
  { name: "Zéro marge", definition: "Cote sans marge du bookmaker, reflétant la probabilité exacte.", example: "Certains bookmakers proposent des cotes zéro marge sur les gros matchs comme les demi-finales." },
  // Additional terms to reach 80+
  { name: "Acca Insurance", definition: "Promotion remboursant un combiné si une seule Aufgebot est perdante.", example: "Combiner 5 matchs de Gruppe : si 4 sur 5 sont bons, PokerStars Sports rembourse la mise." },
  { name: "Arbitrage", definition: "Stratégie exploitant les différences de cotes entre bookmakers pour un gain sans risque.", example: "Prendre la victoire de la France chez PokerStars Sports et le nul + victoire Colombie chez Betsson." },
  { name: "Backing", definition: "Parier en faveur d'un Ergebnis (par opposition au lay).", example: "Backer le Brésil à 1.75 pour battre le Maroc." },
  { name: "Banque", definition: "Aufgebot considérée comme très sûre dans un combiné.", example: "La France vainqueur de l'Arabie Saoudite est la banque de votre combi." },
  { name: "Willkommensbonus", definition: "Offre promotionnelle pour les nouveaux inscrits chez un bookmaker.", example: "PokerStars Sports offre 100€ de freebets à l'inscription pour parier sur la CDM 2026." },
  { name: "Cote décimale", definition: "Format de cote le plus utilisé en France et en Europe (ex: 2.50).", example: "Cote 2.50 = mise de 10€ rapporte 25€ (gain net 15€)." },
  { name: "Cote fractionnelle", definition: "Format de cote britannique exprimé en fraction (ex: 5/2).", example: "5/2 = équivalent de 3.50 en cote décimale." },
  { name: "Dead Heat", definition: "Règle appliquée quand deux Spielers ou plus finissent ex-aequo sur un marché.", example: "Deux Spielers finissent co-meilleurs Torschützen de la CDM 2026 : la mise est divisée." },
  { name: "Dutching", definition: "Stratégie consistant à répartir la mise sur plusieurs Ergebnisse pour garantir un profit fixe.", example: "Répartir votre mise entre victoire France et nul sur France-Colombie pour un gain assuré." },
  { name: "Enhanced Odds", definition: "Cotes améliorées temporairement par un bookmaker comme promotion.", example: "Betano booste la cote de l'Argentine vainqueur de la CDM de 4.50 à 6.00." },
  { name: "Handicap buts", definition: "Handicap appliqué en nombre de buts entiers.", example: "Allemagne (-2) vs Curaçao : l'Allemagne doit gagner par 3+ buts." },
  { name: "Jouer responsable", definition: "Principe fondamental : ne pariez que ce que vous pouvez vous permettre de perdre.", example: "Fixez-vous un budget CDM 2026 et ne le dépassez jamais. Appelez le 0800 1 37 27 00 en cas de besoin." },
  { name: "Kelly Criterion", definition: "Formule mathématique pour déterminer la taille optimale d'une mise en fonction de l'edge.", example: "Si votre edge est de 10% et la cote de 3.00, Kelly recommande de miser environ 5% de votre bankroll." },
  { name: "Late Goal", definition: "Pari sur un but marqué dans les dernières minutes du match.", example: "Wetten auf un but après la 80e minute dans le match Italie vs Croatie." },
  { name: "Ligne", definition: "Le seuil fixé par le bookmaker pour un marché over/under ou handicap.", example: "La ligne est fixée à 2.5 buts pour France-Colombie." },
  { name: "Lock", definition: "Pari considéré comme quasiment certain par un pronostiqueur.", example: "La victoire de la France contre l'Arabie Saoudite est considérée comme un lock." },
  { name: "Mi-temps/Fin de match", definition: "Voir Half-Time/Full-Time.", example: "Parier France mène à la mi-temps / France gagne le match." },
  { name: "Nombre de buts", definition: "Marché portant sur le nombre exact de buts dans un match.", example: "Wetten auf exactement 3 buts dans le match Espagne vs Turquie." },
  { name: "Outsider", definition: "Mannschaft ou Spieler donné avec peu de chances de gagner.", example: "Haïti est l'outsider ultime du Gruppe C avec le Brésil et le Maroc." },
  { name: "Parieur", definition: "Personne qui place des paris sportifs.", example: "En tant que parieur, préparez votre stratégie pour les 72 matchs de la phase de Gruppen." },
  { name: "Qualifying Bet", definition: "Pari nécessaire pour débloquer une offre promotionnelle.", example: "Misez 10€ sur n'importe quel match de la CDM pour débloquer votre bonus de bienvenue." },
  { name: "Rollover", definition: "Voir Turnover. Conditions de mise à remplir avant retrait d'un bonus.", example: "Rollover x3 sur un bonus de 50€ = 150€ de paris nécessaires." },
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
      { "@type": "ListItem", position: 2, name: "Guide", item: "https://www.wm2026guide.de/guide" },
      { "@type": "ListItem", position: 3, name: "Glossaire", item: "https://www.wm2026guide.de/guide/glossaire" },
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
            href="/comparateur-cotes"
            className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Quotenvergleich anzeigen →
          </Link>
        </div>
      </main>
    </>
  );
}
