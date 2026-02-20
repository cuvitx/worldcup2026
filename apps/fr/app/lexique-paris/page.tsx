import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";
import { FAQSection } from "@repo/ui/faq-section";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Lexique Paris Sportifs — 45+ termes expliqués pour la CDM 2026",
  description:
    "Glossaire complet des paris sportifs : Accumulator, Asian Handicap, Bankroll, BTTS, Cashout, Cote, Value bet… 45+ définitions avec exemples Coupe du Monde 2026.",
  alternates: { canonical: "https://cdm2026.fr/lexique-paris" },
  openGraph: {
    title: "Lexique Paris Sportifs — CDM 2026",
    description:
      "Glossaire complet : 45+ termes de paris sportifs expliqués avec exemples CDM 2026.",
    url: "https://cdm2026.fr/lexique-paris",
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
      "Le pari le plus classique : vous misez sur la victoire de l'équipe 1 (1), le match nul (X) ou la victoire de l'équipe 2 (2). C'est la base de tout parieur.",
    example:
      "France – Mexique : 1 (victoire France) coté à 1.55, X à 4.20, 2 à 6.50.",
  },
  {
    term: "Accumulator (Acca)",
    definition:
      "Un pari combiné regroupant plusieurs sélections. Toutes doivent être gagnantes pour que le pari soit validé. Les cotes se multiplient, augmentant gains potentiels et risque.",
    example:
      "Combiné 4 matchs de poules CDM 2026 : France, Brésil, Allemagne et Argentine victorieux → cote totale ~5.80.",
  },
  {
    term: "Ante-post",
    definition:
      "Pari placé bien avant le début d'un événement. Les cotes sont souvent plus élevées car l'incertitude est maximale.",
    example:
      "Parier sur le Brésil vainqueur de la CDM 2026 dès janvier 2026 à une cote de 5.00.",
  },
  {
    term: "Asian Handicap",
    definition:
      "Handicap qui élimine le match nul en attribuant un avantage ou un désavantage fractionnaire (0.5, 1.5…). En cas de handicap entier, le push (remboursement) est possible.",
    example:
      "Japon +1.5 contre l'Espagne : le Japon peut perdre 1-0 et votre pari est gagnant.",
  },
  {
    term: "Bankroll",
    definition:
      "Le budget total que vous consacrez aux paris sportifs. Une bonne gestion de bankroll est la clé pour durer dans le temps et éviter les pertes incontrôlées.",
    example:
      "Vous fixez 300 EUR de bankroll pour toute la CDM 2026 et misez 2% max par pari (6 EUR).",
  },
  {
    term: "Bookmaker",
    definition:
      "L'opérateur qui propose des cotes et accepte vos paris. En France, seuls les bookmakers agréés ANJ sont autorisés.",
    example:
      "Comparer les cotes de Betclic, Unibet et Winamax pour France – Brésil en demi-finale.",
  },
  {
    term: "BTTS (Both Teams To Score)",
    definition:
      "Pari sur le fait que les deux équipes marquent au moins un but chacune pendant le match, quel que soit le résultat final.",
    example:
      "Angleterre – Pays-Bas, BTTS Oui à 1.72 : pari gagné si le score est 2-1, 1-1, 3-2, etc.",
  },
  {
    term: "Cashout",
    definition:
      "Option proposée par le bookmaker pour encaisser vos gains (ou limiter vos pertes) avant la fin de l'événement. Le montant varie en temps réel.",
    example:
      "Vous avez misé sur le Brésil vainqueur CDM. En demi-finale, le cashout vous propose 85% du gain potentiel.",
  },
  {
    term: "Combiné (Combi)",
    definition:
      "Synonyme d'accumulator : plusieurs paris regroupés en un seul ticket. Les cotes se multiplient mais le risque aussi, car un seul résultat faux annule tout.",
    example:
      "Combiné double : Victoire Argentine + BTTS Oui dans Allemagne-Espagne.",
  },
  {
    term: "Cote",
    definition:
      "Le multiplicateur proposé par le bookmaker qui reflète la probabilité estimée d'un résultat. Plus la cote est élevée, moins l'événement est probable selon le bookmaker.",
    example:
      "France vainqueur CDM 2026 cotée à 4.50 → pour 10 EUR misés, vous gagnez 45 EUR.",
  },
  {
    term: "Double Chance",
    definition:
      "Pari couvrant deux des trois issues possibles (1X, 12 ou X2). Moins risqué qu'un 1X2 simple mais cotes plus basses.",
    example:
      "Maroc Double Chance (1X) contre le Portugal : vous gagnez si le Maroc gagne OU fait match nul.",
  },
  {
    term: "Draw No Bet (DNB)",
    definition:
      "Pari sur la victoire d'une équipe avec remboursement en cas de match nul. C'est un filet de sécurité qui réduit le risque.",
    example:
      "Sénégal DNB contre l'Uruguay : si match nul, votre mise est remboursée.",
  },
  {
    term: "Each Way",
    definition:
      "Pari en deux parties : une sur la victoire et une sur une place (top 2, top 3…). Surtout utilisé pour les paris à long terme (vainqueur de compétition).",
    example:
      "Each Way sur la Colombie vainqueur CDM 2026 : même si elle perd en finale, la partie « place » paie.",
  },
  {
    term: "Expected Value (EV)",
    definition:
      "La valeur espérée d'un pari. Un EV positif signifie que le pari est théoriquement rentable à long terme. C'est le Graal du parieur averti.",
    example:
      "Si vous estimez la France à 55% de chances et la cote est à 2.00 (50%), l'EV est positif.",
  },
  {
    term: "Flat Betting",
    definition:
      "Stratégie consistant à miser toujours le même montant, quel que soit le match ou votre niveau de confiance. Simple et efficace pour protéger la bankroll.",
    example:
      "Mise fixe de 5 EUR sur chacun des 104 matchs de la CDM 2026.",
  },
  {
    term: "Freebet",
    definition:
      "Paris gratuit offert par le bookmaker. Si le pari est gagnant, vous récupérez les gains mais pas la mise initiale (dans la plupart des cas).",
    example:
      "Freebet de 10 EUR offert à l'ouverture de compte, utilisé sur Brésil – Argentine en quart de finale.",
  },
  {
    term: "Handicap européen",
    definition:
      "Handicap qui modifie le score de départ d'une équipe. Contrairement à l'Asian Handicap, le match nul avec handicap est possible.",
    example:
      "Allemagne -1 contre le Costa Rica : l'Allemagne doit gagner par 2 buts d'écart minimum.",
  },
  {
    term: "Handicap (général)",
    definition:
      "Avantage ou désavantage virtuel de buts attribué à une équipe pour équilibrer les chances. Existe en version européenne et asiatique.",
    example:
      "Arabie Saoudite +2 contre la France : le pari est gagnant si l'écart est inférieur à 2 buts.",
  },
  {
    term: "Lay (Pari à la)",
    definition:
      "Parier CONTRE un résultat sur un betting exchange. Vous jouez le rôle du bookmaker en acceptant le risque qu'un événement se produise.",
    example:
      "Lay sur l'Italie vainqueur du groupe : vous gagnez si l'Italie ne finit PAS première.",
  },
  {
    term: "Live Betting (Paris en direct)",
    definition:
      "Paris placés pendant le match en cours. Les cotes évoluent en temps réel selon le score, la possession et les actions de jeu.",
    example:
      "France mène 1-0 à la 60e contre le Mexique : parier sur Over 2.5 buts à 1.90 en live.",
  },
  {
    term: "Marge (du bookmaker)",
    definition:
      "La commission intégrée dans les cotes par le bookmaker. Plus la marge est faible, plus les cotes sont favorables au parieur.",
    example:
      "Sur un match CDM, un bookmaker à 3% de marge offre de meilleures cotes qu'un site à 7%.",
  },
  {
    term: "Matched Betting",
    definition:
      "Technique exploitant les offres promotionnelles (freebets) des bookmakers pour garantir un profit, en combinant pari et lay sur un exchange.",
    example:
      "Utiliser un freebet de 20 EUR sur un match CDM et couvrir le résultat opposé sur un exchange.",
  },
  {
    term: "Mi-temps / Fin de match (HT/FT)",
    definition:
      "Pari sur le résultat à la mi-temps ET au coup de sifflet final. Les cotes sont élevées car il faut prédire deux résultats.",
    example:
      "Brésil/Brésil (mène à la mi-temps et gagne) contre la Suisse à une cote de 2.10.",
  },
  {
    term: "Odds (Cotes)",
    definition:
      "Terme anglais pour « cotes ». Elles peuvent être exprimées en format décimal (2.50), fractionnaire (3/2) ou américain (+150).",
    example:
      "Odds décimales de 3.00 sur le Japon = 33% de probabilité implicite = gain de 30 EUR pour 10 EUR misés.",
  },
  {
    term: "Over/Under (Plus/Moins)",
    definition:
      "Pari sur le nombre total de buts dans un match : au-dessus (Over) ou en dessous (Under) d'un seuil fixé par le bookmaker.",
    example:
      "Over 2.5 buts dans Espagne – Allemagne : gagné si 3 buts ou plus sont marqués au total.",
  },
  {
    term: "Parlay",
    definition:
      "Terme américain pour un pari combiné (accumulator). Très populaire aux États-Unis, pays co-organisateur de la CDM 2026.",
    example:
      "Parlay de 3 legs : USA gagne, Over 2.5 et BTTS Oui → cote combinée ~7.50.",
  },
  {
    term: "Push",
    definition:
      "Quand le résultat tombe exactement sur la ligne du handicap ou du total. La mise est remboursée, ni gain ni perte.",
    example:
      "Over/Under 2 buts, score final 2-0 (2 buts exactement) : push, mise remboursée.",
  },
  {
    term: "Return on Investment (ROI)",
    definition:
      "Indicateur de rentabilité : (gains nets / total misé) × 100. Un ROI positif signifie que vous êtes bénéficiaire sur la durée.",
    example:
      "300 EUR misés pendant la CDM, 330 EUR récupérés → ROI = +10%. Excellent sur un tournoi.",
  },
  {
    term: "Score exact",
    definition:
      "Pari sur le résultat précis du match. Très difficile à prédire, mais les cotes sont très attractives.",
    example:
      "France 2-1 Angleterre en quart de finale coté à 8.50.",
  },
  {
    term: "Stake (Mise)",
    definition:
      "Le montant d'argent que vous engagez sur un pari. La gestion du stake est fondamentale pour préserver votre bankroll.",
    example:
      "Stake de 10 EUR sur la victoire du Brésil à 1.80 → gain potentiel de 18 EUR.",
  },
  {
    term: "Sure Bet (Pari sûr)",
    definition:
      "Situation rare où les cotes de différents bookmakers permettent de couvrir tous les résultats et garantir un profit, quelle que soit l'issue.",
    example:
      "Cote 1X à 2.10 chez le bookmaker A et cote 2 à 2.15 chez le bookmaker B sur un même match CDM.",
  },
  {
    term: "System Bet",
    definition:
      "Pari combiné avec filet de sécurité : vous pouvez perdre une ou plusieurs sélections et quand même gagner. Exemples : Trixie, Yankee, Lucky 15.",
    example:
      "System 2/3 sur trois matchs CDM : si 2 pronostics sur 3 sont bons, le pari est partiellement gagnant.",
  },
  {
    term: "Tipster",
    definition:
      "Pronostiqueur qui partage ses analyses et ses paris. Certains sont fiables, beaucoup ne le sont pas. Vérifiez toujours l'historique et le ROI.",
    example:
      "Un tipster annonce Argentine – Croatie : BTTS Oui à 1.85. Vérifiez son track record avant de suivre.",
  },
  {
    term: "Treble",
    definition:
      "Pari combiné de trois sélections exactement. Les trois doivent être gagnantes pour que le pari paie.",
    example:
      "Treble : France bat la Belgique + Brésil bat le Japon + Espagne bat l'Allemagne → cote ~4.30.",
  },
  {
    term: "Under",
    definition:
      "Parier sur un nombre de buts INFÉRIEUR au seuil fixé. Opposé de l'Over. Souvent utilisé sur des matchs défensifs.",
    example:
      "Under 1.5 buts dans Uruguay – Suisse, un match entre deux équipes très défensives, coté à 2.40.",
  },
  {
    term: "Unit (Unité)",
    definition:
      "Mesure standard de mise utilisée pour comparer les performances entre parieurs. 1 unité = généralement 1% de la bankroll.",
    example:
      "Bankroll 500 EUR → 1 unité = 5 EUR. « Mise 2 unités sur France » = 10 EUR.",
  },
  {
    term: "Value Bet",
    definition:
      "Pari où la cote proposée est supérieure à la probabilité réelle estimée. Trouver des value bets régulièrement est la clé de la rentabilité à long terme.",
    example:
      "Vous estimez le Maroc à 35% de chances de battre l'Espagne. Cote à 3.40 (29%) → value bet !",
  },
  {
    term: "Void",
    definition:
      "Pari annulé par le bookmaker. La mise est intégralement remboursée. Peut survenir si un match est reporté ou si les conditions du pari ne sont pas remplies.",
    example:
      "Buteur : Mbappé. Il ne joue finalement pas → pari void, mise remboursée.",
  },
  {
    term: "Wager",
    definition:
      "Synonyme de pari ou mise, surtout utilisé dans le vocabulaire anglo-saxon. Souvent associé aux conditions de rollover des bonus.",
    example:
      "Condition de wager ×3 : vous devez miser 3 fois le montant du bonus avant de pouvoir retirer.",
  },
  {
    term: "Yield",
    definition:
      "Synonyme de ROI dans le monde des paris. Mesure le bénéfice moyen par unité misée, exprimé en pourcentage.",
    example:
      "Yield de +5% sur 80 paris pendant la CDM 2026 = performance solide et régulière.",
  },
];

const faqItems = [
  {
    question: "Quels sont les termes essentiels à connaître pour parier sur la CDM 2026 ?",
    answer:
      "Les incontournables sont : 1X2, cote, bankroll, Over/Under, BTTS, cashout et value bet. Maîtriser ces 7 termes vous permet de comprendre 90% des paris proposés pendant la Coupe du Monde.",
  },
  {
    question: "Quelle est la différence entre Asian Handicap et Handicap européen ?",
    answer:
      "L'Asian Handicap élimine le match nul grâce à des handicaps fractionnaires (±0.5, ±1.5) ou propose un remboursement (push) sur les handicaps entiers. Le Handicap européen conserve la possibilité du nul avec handicap, ce qui donne trois issues possibles.",
  },
  {
    question: "C'est quoi un value bet et comment le repérer ?",
    answer:
      "Un value bet est un pari dont la cote est supérieure à la probabilité réelle de l'événement. Pour le repérer, estimez la probabilité d'un résultat et comparez-la à la probabilité implicite de la cote (1/cote). Si votre estimation est plus haute, c'est un value bet.",
  },
  {
    question: "Le cashout est-il toujours avantageux ?",
    answer:
      "Non. Le cashout inclut une marge supplémentaire du bookmaker. Il est utile pour sécuriser un gain quand la situation a changé (blessure, carton rouge), mais l'utiliser systématiquement réduit votre rentabilité à long terme.",
  },
  {
    question: "Quelle bankroll prévoir pour parier sur toute la CDM 2026 ?",
    answer:
      "Un budget de 100 à 500 EUR est raisonnable pour un mois de compétition. L'essentiel est de fixer ce montant AVANT le tournoi, de ne jamais le dépasser, et de miser entre 1% et 3% par pari (flat betting).",
  },
  {
    question: "C'est quoi un pari combiné (accumulator) et est-ce rentable ?",
    answer:
      "Un combiné regroupe plusieurs sélections dont les cotes se multiplient. C'est séduisant mais statistiquement moins rentable que les paris simples, car la probabilité de tout réussir baisse drastiquement. Limitez-vous à 2-3 sélections maximum.",
  },
];

export default function LexiqueParisPage() {
  const alphabet = Array.from(new Set(glossary.map((t) => t.term[0]!.toUpperCase()))).sort();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Lexique Paris Sportifs", url: "/lexique-paris" },
        ]}
        baseUrl={domains.fr}
      />
      <Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Lexique Paris Sportifs" }]} />

      {/* Hero */}
      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Glossaire paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Lexique des Paris Sportifs — CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            {glossary.length} termes essentiels expliqués simplement avec des exemples concrets
            tirés de la Coupe du Monde 2026. De A comme Accumulator à Y comme Yield.
          </p>
        </div>
      </section>

      {/* Quick nav */}
      <nav className="mx-auto max-w-5xl px-4 py-6" aria-label="Navigation alphabétique">
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
                          <span className="font-semibold text-[#D4AF37]">Exemple CDM 2026 :</span>{" "}
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
          href="/comparateur-cotes"
          className="flex items-center justify-center gap-2 bg-[#00B865] text-white font-bold rounded-xl py-3.5 px-6 text-center hover:brightness-110 transition"
        >
          Comparer les cotes CDM 2026
          <ArrowRight className="h-5 w-5" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl font-extrabold text-[#022149] mb-6 text-center">
          Questions fréquentes
        </h2>
        <FAQSection items={faqItems} />
      </section>

      {/* ANJ */}
      <section className="mx-auto max-w-5xl px-4 pb-12 text-center">
        <p className="text-xs text-gray-500">
          🔞 Les paris sportifs sont interdits aux mineurs. Jouez de manière responsable.
          <br />
          Autorité Nationale des Jeux (ANJ) —{" "}
          <a
            href="https://www.anj.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#022149]"
          >
            www.anj.fr
          </a>
        </p>
      </section>
    </>
  );
}
