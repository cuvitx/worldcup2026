import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Glossaire Paris Sportifs | Tous les termes expliqués",
  description:
    "Glossaire des paris sportifs : 80+ termes expliqués avec exemples Coupe du Monde 2026. De A à Z, tout le vocabulaire du parieur.",
  alternates: {
    canonical: "https://cdm2026.fr/guide/glossaire",
  },
  openGraph: {
    title: "Glossaire des Paris Sportifs – CDM 2026",
    description: "Plus de 80 termes de paris sportifs expliqués simplement avec des exemples Coupe du Monde 2026.",
    url: "https://cdm2026.fr/guide/glossaire",
  },
};

interface Term {
  name: string;
  definition: string;
  example: string;
}

const glossary: Term[] = [
  { name: "1X2", definition: "Le pari le plus classique : 1 = victoire domicile, X = match nul, 2 = victoire extérieur.", example: "France vs Colombie : 1 = victoire France, X = nul, 2 = victoire Colombie." },
  { name: "Accumulator (Acca)", definition: "Pari combiné regroupant plusieurs sélections. Toutes doivent être gagnantes pour remporter le pari.", example: "Combiner France gagne + Brésil gagne + Argentine gagne en un seul pari." },
  { name: "Ante-post", definition: "Pari placé bien avant un événement, souvent avant le début du tournoi.", example: "Parier sur le vainqueur de la CDM 2026 dès aujourd'hui, avant le coup d'envoi en juin." },
  { name: "Arjel / ANJ", definition: "Autorité Nationale des Jeux, régulateur français des paris en ligne. Garantit la légalité et la protection des joueurs.", example: "Betclic, Winamax et Parions Sport sont agréés par l'ANJ pour opérer en France." },
  { name: "Asian Handicap", definition: "Handicap qui élimine le match nul en attribuant un avantage/désavantage en demi-buts ou quarts de buts.", example: "Brésil -1.5 vs Haïti : le Brésil doit gagner par 2 buts d'écart minimum." },
  { name: "Bankroll", definition: "Le capital total dédié aux paris sportifs. À gérer avec discipline.", example: "Vous dédiez 200€ à la CDM 2026 : c'est votre bankroll. Ne pariez jamais plus de 5% par mise." },
  { name: "Bet Builder", definition: "Outil permettant de créer un pari personnalisé en combinant plusieurs marchés sur un même match.", example: "France gagne + Mbappé buteur + plus de 2.5 buts sur France-Colombie." },
  { name: "Bookmaker", definition: "Opérateur de paris sportifs qui propose des cotes et accepte les mises des parieurs.", example: "Betclic, Winamax, Unibet sont les principaux bookmakers français pour la CDM 2026." },
  { name: "Both Teams to Score (BTTS)", definition: "Pari sur le fait que les deux équipes marquent au moins un but chacune.", example: "Italie vs Croatie : parier que les deux équipes marquent (oui/non)." },
  { name: "Cash Out", definition: "Option permettant de clôturer un pari avant la fin de l'événement pour sécuriser un gain ou limiter une perte.", example: "Vous avez parié sur l'Argentine vainqueur, elle mène 2-0 à la mi-temps : vous pouvez cash out pour sécuriser un profit." },
  { name: "Combo", definition: "Synonyme de pari combiné. Plusieurs pronostics associés dans un seul ticket.", example: "Combo : Allemagne gagne + Espagne gagne + Angleterre gagne." },
  { name: "Correct Score", definition: "Pari sur le score exact à la fin du match.", example: "Parier France 2-1 Colombie au score exact." },
  { name: "Cote", definition: "Multiplicateur appliqué à votre mise en cas de pari gagnant. Plus la cote est élevée, plus l'événement est improbable.", example: "Cote 1.55 pour la France contre l'Arabie Saoudite : une mise de 10€ rapporte 15,50€." },
  { name: "Cote boost", definition: "Promotion d'un bookmaker qui augmente temporairement la cote d'un événement.", example: "Winamax booste la cote de la France vainqueur de la CDM de 5.50 à 7.00." },
  { name: "Double chance", definition: "Pari couvrant deux des trois issues possibles (1X, X2, ou 12).", example: "Parier 1X sur le Mexique vs Corée du Sud : vous gagnez si le Mexique gagne ou fait nul." },
  { name: "Draw No Bet (DNB)", definition: "Pari où la mise est remboursée en cas de match nul. Vous ne pariez que sur une victoire.", example: "DNB Suisse contre Canada : remboursé si nul, sinon vous gagnez ou perdez." },
  { name: "Each Way", definition: "Pari double : une partie sur la victoire, une partie sur un classement (top 2, top 4...).", example: "Parier each way sur l'Allemagne vainqueur de la CDM : vous gagnez aussi si elle finit en finale." },
  { name: "European Handicap", definition: "Handicap classique avec trois issues possibles (1, N, 2) après application du handicap.", example: "Espagne (-1) vs Nouvelle-Zélande : l'Espagne part avec un but de retard virtuel." },
  { name: "First Goalscorer", definition: "Pari sur le joueur qui marquera le premier but du match.", example: "Parier que Mbappé marque le premier but de France vs Colombie." },
  { name: "Flat betting", definition: "Stratégie consistant à toujours miser le même montant, quel que soit le pari.", example: "Miser systématiquement 10€ sur chaque match de la CDM 2026." },
  { name: "Freebet", definition: "Pari gratuit offert par un bookmaker. Seul le gain net est crédité.", example: "Betclic offre 100€ en freebets à l'inscription : vous pariez sans risquer votre argent." },
  { name: "Futures", definition: "Pari à long terme sur un résultat futur (vainqueur du tournoi, meilleur buteur...).", example: "Parier dès maintenant que le Brésil remportera la Coupe du Monde 2026." },
  { name: "Goal Line", definition: "Marché similaire à l'over/under mais avec des handicaps de buts, incluant des quarts de buts.", example: "Goal line 2.25 sur France-Colombie : mi-remboursé si 2 buts, gagné si 3+." },
  { name: "Handicap", definition: "Avantage ou désavantage virtuel donné à une équipe pour équilibrer les chances.", example: "Argentine -2 vs Cameroun : l'Argentine doit gagner par 3 buts d'écart." },
  { name: "Half-Time / Full-Time (MT/FT)", definition: "Pari sur le résultat à la mi-temps ET à la fin du match.", example: "Parier Brésil/Brésil : le Brésil mène à la mi-temps et gagne le match." },
  { name: "In-Play (Live Betting)", definition: "Paris placés pendant le déroulement du match, avec des cotes qui évoluent en temps réel.", example: "Parier sur le prochain buteur à la 60e minute de Espagne vs Turquie." },
  { name: "Lay Bet", definition: "Pari contre un résultat : vous jouez le rôle du bookmaker.", example: "Layer la France, c'est parier que la France NE gagnera PAS." },
  { name: "Live Betting", definition: "Voir In-Play. Paris en direct pendant le match.", example: "Parier en live sur le nombre de corners restants dans un match de phase de groupes." },
  { name: "Longshot", definition: "Pari à cote très élevée sur un événement peu probable.", example: "Parier sur Haïti vainqueur de la CDM 2026 à une cote de 1000." },
  { name: "Marge", definition: "Commission intégrée par le bookmaker dans les cotes. Plus la marge est basse, meilleures sont les cotes.", example: "Marge de 5% sur un match : les cotes sont légèrement inférieures à la probabilité réelle." },
  { name: "Mise", definition: "Le montant d'argent que vous pariez sur un événement.", example: "Mise de 20€ sur la victoire de l'Argentine à 1.25 = gain potentiel de 25€." },
  { name: "Moneyline", definition: "Terme anglo-saxon pour un pari simple sur le vainqueur (sans handicap).", example: "Moneyline Argentine contre Cameroun : pariez simplement sur le vainqueur." },
  { name: "Multibet", definition: "Pari combinant plusieurs sélections (synonyme de combiné/accumulator).", example: "Multibet de 5 matchs de la J1 de la phase de groupes." },
  { name: "No Bet", definition: "Pari annulé et remboursé si une condition spécifique se réalise.", example: "Voir Draw No Bet : remboursé en cas de nul." },
  { name: "Odds", definition: "Terme anglais pour les cotes. Représentent la probabilité selon le bookmaker.", example: "Odds de 3.40 pour le match nul Pays-Bas vs Belgique." },
  { name: "Over/Under (Plus/Moins)", definition: "Pari sur le nombre total de buts dans un match, au-dessus ou en-dessous d'un seuil.", example: "Over 2.5 sur France vs Colombie : il faut au moins 3 buts dans le match." },
  { name: "Parlay", definition: "Terme américain pour un pari combiné/accumulator.", example: "Parlay : France gagne + Brésil gagne + plus de 2.5 buts dans Espagne-Turquie." },
  { name: "Pari en direct", definition: "Version française du live betting / in-play.", example: "Parier en direct sur le score final pendant Angleterre vs Danemark." },
  { name: "Pari gratuit", definition: "Voir Freebet. Mise offerte par le bookmaker.", example: "Parions Sport offre 90€ en paris gratuits pour la CDM 2026." },
  { name: "Pari simple", definition: "Pari portant sur un seul événement, par opposition au combiné.", example: "Pari simple : victoire de l'Allemagne contre l'Équateur." },
  { name: "Pari système", definition: "Combinaison de paris combinés permettant de gagner même si toutes les sélections ne sont pas justes.", example: "Système 2/3 : trois combinés de 2 matchs. Il suffit que 2 sur 3 soient bons." },
  { name: "Pick'em", definition: "Match où les deux équipes sont données à chances quasiment égales.", example: "Pays-Bas vs Belgique, cotes quasi identiques : un vrai pick'em." },
  { name: "Profit Boost", definition: "Bonus augmentant vos gains potentiels sur un pari spécifique.", example: "ZEbet offre un profit boost de 50% sur le premier match de la France." },
  { name: "Prop Bet (Proposition)", definition: "Pari sur un événement spécifique dans un match, non lié au résultat final.", example: "Nombre de cartons jaunes dans Portugal vs Serbie, ou nombre de corners." },
  { name: "Push", definition: "Résultat où votre pari est remboursé car le résultat tombe exactement sur la ligne.", example: "Over/Under 2.0 et il y a exactement 2 buts : push, mise remboursée." },
  { name: "Return on Investment (ROI)", definition: "Pourcentage de profit par rapport au total des mises. Mesure la rentabilité.", example: "100€ misés, 110€ récupérés = ROI de +10%." },
  { name: "Scorecast", definition: "Pari combinant le buteur et le score exact du match.", example: "Mbappé premier buteur + France gagne 2-0 vs Arabie Saoudite." },
  { name: "Spread", definition: "Terme américain pour le handicap. Écart de points/buts entre les équipes.", example: "États-Unis -1.5 vs Paraguay : les USA doivent gagner par 2 buts minimum." },
  { name: "Stake", definition: "Terme anglais pour la mise. Le montant engagé sur un pari.", example: "Stake de 50€ sur le vainqueur de la Coupe du Monde 2026." },
  { name: "Sure Bet (Surebet)", definition: "Pari couvrant toutes les issues sur différents bookmakers pour un profit garanti.", example: "Trouver des écarts de cotes entre Betclic et Winamax sur un même match pour garantir un gain." },
  { name: "Système", definition: "Voir Pari système. Type de combiné avec filet de sécurité.", example: "Système 3/4 sur 4 matchs du Groupe F." },
  { name: "Tenner", definition: "Argot pour une mise de 10 unités.", example: "Mettre un tenner sur l'Argentine vainqueur." },
  { name: "Tipster", definition: "Pronostiqueur qui partage ses analyses et pronostics, parfois contre rémunération.", example: "Suivre un tipster spécialisé dans la CDM 2026 pour ses analyses des matchs." },
  { name: "Total", definition: "Synonyme d'over/under. Le nombre total de buts sur lequel vous pariez.", example: "Total 2.5 buts sur Allemagne vs Côte d'Ivoire." },
  { name: "Treble", definition: "Pari combiné de trois sélections exactement.", example: "Treble : France, Brésil et Argentine gagnent leurs matchs de la J1." },
  { name: "Turnover", definition: "Le nombre de fois où un bonus doit être remis en jeu avant de pouvoir être retiré.", example: "Bonus de 100€ avec turnover x5 : il faut parier 500€ avant de retirer." },
  { name: "Under", definition: "Parier sur moins de X buts dans un match.", example: "Under 1.5 sur Mexique vs Afrique du Sud : 0 ou 1 but maximum." },
  { name: "Unit", definition: "Unité de mise standardisée, souvent 1% de la bankroll.", example: "Bankroll de 500€ → 1 unit = 5€." },
  { name: "Value Bet", definition: "Pari dont la cote proposée est supérieure à la probabilité réelle estimée de l'événement.", example: "Si vous estimez la France à 60% de chances et la cote est à 2.00 (50%), c'est un value bet." },
  { name: "Void", definition: "Pari annulé et intégralement remboursé.", example: "Si un match est reporté pour cause de météo, le pari est déclaré void." },
  { name: "Wager", definition: "Terme anglais générique pour un pari ou une mise.", example: "Placer un wager de 25€ sur le match d'ouverture de la CDM 2026." },
  { name: "Win/Draw/Win", definition: "Autre nom pour le pari 1X2 classique.", example: "Le marché Win/Draw/Win est le plus populaire sur chaque match de groupe." },
  { name: "Wincast", definition: "Pari combinant un buteur et la victoire de son équipe.", example: "Mbappé buteur + victoire de la France contre la Colombie." },
  { name: "X2", definition: "Pari double chance : nul ou victoire de l'extérieur.", example: "X2 sur Colombie vs France : vous gagnez si nul ou victoire de la France." },
  { name: "Yield", definition: "Taux de rendement moyen par pari, indicateur de performance.", example: "Un yield de 8% signifie que vous gagnez 8% en moyenne par pari sur la CDM 2026." },
  { name: "Zéro marge", definition: "Cote sans marge du bookmaker, reflétant la probabilité exacte.", example: "Certains bookmakers proposent des cotes zéro marge sur les gros matchs comme les demi-finales." },
  // Additional terms to reach 80+
  { name: "Acca Insurance", definition: "Promotion remboursant un combiné si une seule sélection est perdante.", example: "Combiner 5 matchs de groupe : si 4 sur 5 sont bons, Betclic rembourse la mise." },
  { name: "Arbitrage", definition: "Stratégie exploitant les différences de cotes entre bookmakers pour un gain sans risque.", example: "Prendre la victoire de la France chez Winamax et le nul + victoire Colombie chez Betclic." },
  { name: "Backing", definition: "Parier en faveur d'un résultat (par opposition au lay).", example: "Backer le Brésil à 1.75 pour battre le Maroc." },
  { name: "Banque", definition: "Sélection considérée comme très sûre dans un combiné.", example: "La France vainqueur de l'Arabie Saoudite est la banque de votre combi." },
  { name: "Bonus de bienvenue", definition: "Offre promotionnelle pour les nouveaux inscrits chez un bookmaker.", example: "Betclic offre 100€ de freebets à l'inscription pour parier sur la CDM 2026." },
  { name: "Cote décimale", definition: "Format de cote le plus utilisé en France et en Europe (ex: 2.50).", example: "Cote 2.50 = mise de 10€ rapporte 25€ (gain net 15€)." },
  { name: "Cote fractionnelle", definition: "Format de cote britannique exprimé en fraction (ex: 5/2).", example: "5/2 = équivalent de 3.50 en cote décimale." },
  { name: "Dead Heat", definition: "Règle appliquée quand deux joueurs ou plus finissent ex-aequo sur un marché.", example: "Deux joueurs finissent co-meilleurs buteurs de la CDM 2026 : la mise est divisée." },
  { name: "Dutching", definition: "Stratégie consistant à répartir la mise sur plusieurs résultats pour garantir un profit fixe.", example: "Répartir votre mise entre victoire France et nul sur France-Colombie pour un gain assuré." },
  { name: "Enhanced Odds", definition: "Cotes améliorées temporairement par un bookmaker comme promotion.", example: "Unibet booste la cote de l'Argentine vainqueur de la CDM de 4.50 à 6.00." },
  { name: "Handicap buts", definition: "Handicap appliqué en nombre de buts entiers.", example: "Allemagne (-2) vs Curaçao : l'Allemagne doit gagner par 3+ buts." },
  { name: "Jouer responsable", definition: "Principe fondamental : ne pariez que ce que vous pouvez vous permettre de perdre.", example: "Fixez-vous un budget CDM 2026 et ne le dépassez jamais. Appelez le 09 74 75 13 13 en cas de besoin." },
  { name: "Kelly Criterion", definition: "Formule mathématique pour déterminer la taille optimale d'une mise en fonction de l'edge.", example: "Si votre edge est de 10% et la cote de 3.00, Kelly recommande de miser environ 5% de votre bankroll." },
  { name: "Late Goal", definition: "Pari sur un but marqué dans les dernières minutes du match.", example: "Parier sur un but après la 80e minute dans le match Italie vs Croatie." },
  { name: "Ligne", definition: "Le seuil fixé par le bookmaker pour un marché over/under ou handicap.", example: "La ligne est fixée à 2.5 buts pour France-Colombie." },
  { name: "Lock", definition: "Pari considéré comme quasiment certain par un pronostiqueur.", example: "La victoire de la France contre l'Arabie Saoudite est considérée comme un lock." },
  { name: "Mi-temps/Fin de match", definition: "Voir Half-Time/Full-Time.", example: "Parier France mène à la mi-temps / France gagne le match." },
  { name: "Nombre de buts", definition: "Marché portant sur le nombre exact de buts dans un match.", example: "Parier sur exactement 3 buts dans le match Espagne vs Turquie." },
  { name: "Outsider", definition: "Équipe ou joueur donné avec peu de chances de gagner.", example: "Haïti est l'outsider ultime du Groupe C avec le Brésil et le Maroc." },
  { name: "Parieur", definition: "Personne qui place des paris sportifs.", example: "En tant que parieur, préparez votre stratégie pour les 72 matchs de la phase de groupes." },
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
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.cdm2026.fr/" },
      { "@type": "ListItem", position: 2, name: "Guide", item: "https://www.cdm2026.fr/guide" },
      { "@type": "ListItem", position: 3, name: "Glossaire", item: "https://www.cdm2026.fr/guide/glossaire" },
    ],
  };

  return (
    <>
<Breadcrumb items={[
          {
                    "label": "Accueil",
                    "href": "/"
          },
          {
                    "label": "Guide",
                    "href": "/guides"
          },
          {
                    "label": "Glossaire"
          }
]} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            <li><Link href="/" className="text-primary hover:underline">Accueil</Link></li>
            <li>/</li>
            <li><Link href="/paris-sportifs" className="text-primary hover:underline">Paris sportifs</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Glossaire</li>
          </ol>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 md:text-4xl mb-2">
          Glossaire des Paris Sportifs
        </h1>
        <p className="text-gray-600 mb-6 max-w-3xl">
          Plus de {glossary.length} termes de paris sportifs expliqués simplement, avec des exemples concrets
          liés à la Coupe du Monde 2026. De A à Z, tout le vocabulaire du parieur.
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
                  <span className="w-10 h-10 rounded-xl bg-primary/10primary/20 flex items-center justify-center text-primary font-extrabold">
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
                      <p className="text-sm text-gray-500 mt-2 italic bg-gray-50gray-700/50 rounded-lg px-3 py-2">
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
          <p className="text-lg font-semibold text-gray-900 mb-2">Prêt à parier sur la CDM 2026 ?</p>
          <p className="text-gray-600 mb-4">Comparez les cotes des meilleurs bookmakers français.</p>
          <Link
            href="/comparateur-cotes"
            className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Voir le comparateur de cotes →
          </Link>
        </div>
      </main>
    </>
  );
}
