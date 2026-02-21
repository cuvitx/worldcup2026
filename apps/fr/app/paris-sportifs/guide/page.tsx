import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { BookOpen, Target, AlertCircle, Wallet, Brain, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide Paris Sportifs CDM 2026 | Comment Parier pour Débutants",
  description:
    "Guide complet pour parier sur la Coupe du Monde 2026. Types de paris (1X2, Over/Under, BTTS, handicap), lexique, bankroll management et stratégies gagnantes.",
  openGraph: {
    title: "Guide Paris Sportifs CDM 2026 | Comment Parier",
    description: "Apprenez à parier sur la CDM 2026 : types de paris, stratégies, lexique et conseils pour débutants.",
    url: "https://www.cdm2026.fr/paris-sportifs/guide",
  },
  alternates: { canonical: "https://www.cdm2026.fr/paris-sportifs/guide" },
};

const typesDeParis = [
  {
    nom: "1X2 (Résultat du match)",
    desc: "Le pari le plus simple : pronostiquez la victoire de l'équipe 1, le match nul (X), ou la victoire de l'équipe 2. C'est le marché le plus populaire et le plus accessible pour les débutants.",
    exemple: "France vs Brésil : cote 1 (France) = 2.40, cote X (nul) = 3.20, cote 2 (Brésil) = 2.90",
  },
  {
    nom: "Over/Under (Plus/Moins de buts)",
    desc: "Pariez sur le nombre total de buts dans un match. Le seuil le plus courant est 2.5 : Over 2.5 = 3 buts ou plus, Under 2.5 = 2 buts ou moins. Il existe aussi des seuils à 0.5, 1.5, 3.5, etc.",
    exemple: "Over 2.5 buts à 1.85 : vous gagnez si le score est 2-1, 3-0, 2-2, etc.",
  },
  {
    nom: "BTTS (Les deux équipes marquent)",
    desc: "Both Teams To Score : pariez sur le fait que les deux équipes marqueront au moins un but chacune pendant le match (ou non). Un marché très populaire sur les matchs de poules.",
    exemple: "BTTS Oui à 1.70 : vous gagnez si le score est 1-1, 2-1, 1-2, 2-3, etc.",
  },
  {
    nom: "Handicap",
    desc: "Le handicap ajoute un avantage ou désavantage virtuel à une équipe. Le handicap asiatique élimine le nul. Idéal quand un favori joue contre un outsider avec une cote trop basse en 1X2.",
    exemple: "France -1.5 à 2.10 : vous gagnez si la France gagne avec 2 buts d'écart ou plus (2-0, 3-1...)",
  },
  {
    nom: "Score exact",
    desc: "Pronostiquez le score final exact du match. Les cotes sont élevées (souvent 6.00 à 15.00) car c'est un pari difficile. Réservé aux parieurs qui aiment les gros gains potentiels.",
    exemple: "Score exact 2-1 à 8.00 : mise de 10€ = 80€ de gains potentiels",
  },
  {
    nom: "Buteur (premier, dernier, anytime)",
    desc: "Pariez sur le joueur qui marquera : premier buteur (cotes élevées), dernier buteur, ou buteur anytime (marque au moins un but pendant le match, cotes plus basses).",
    exemple: "Mbappé buteur anytime à 2.20 : vous gagnez s'il marque au moins un but",
  },
];

const lexique = [
  { terme: "Cote", def: "Multiplicateur qui détermine vos gains. Mise × cote = gains totaux." },
  { terme: "Freebet", def: "Pari gratuit offert par le bookmaker. Vous ne risquez pas votre argent." },
  { terme: "Cash-out", def: "Possibilité de clôturer un pari avant la fin du match pour sécuriser un gain ou limiter une perte." },
  { terme: "Combiné", def: "Pari regroupant plusieurs sélections. Les cotes se multiplient, mais toutes les sélections doivent être gagnantes." },
  { terme: "Bankroll", def: "Budget total que vous consacrez aux paris sportifs. À ne jamais dépasser." },
  { terme: "Value bet", def: "Pari dont la cote est supérieure à la probabilité réelle de l'événement. C'est la clé des paris rentables." },
  { terme: "Handicap asiatique", def: "Handicap sans possibilité de nul. Votre mise est remboursée si le handicap tombe pile sur le résultat." },
  { terme: "Live betting", def: "Paris en direct pendant un match. Les cotes évoluent en temps réel selon les événements du jeu." },
];

const erreurs = [
  "Parier avec ses émotions plutôt qu'avec sa tête (ne pariez pas sur votre équipe favorite par coeur)",
  "Miser plus pour se refaire après une perte (ne jamais courir après ses pertes)",
  "Négliger la gestion de bankroll (fixez un budget et respectez-le)",
  "Jouer uniquement des combinés à forte cote (le risque est exponentiel)",
  "Ignorer les statistiques et se fier uniquement à son instinct",
  "Ne pas comparer les cotes entre bookmakers (les écarts peuvent être significatifs)",
  "Parier sur trop de matchs en même temps sans analyse préalable",
];

export default function GuideParisPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Paris sportifs", href: "/paris-sportifs" },
          { label: "Guide des paris" },
        ]}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary">
            Comment Parier sur la CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Guide complet pour débutants : types de paris, lexique, stratégies et conseils pour parier intelligemment sur la Coupe du Monde 2026.
          </p>
        </div>
      </section>


      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Intro */}
        <section className="prose  max-w-none mb-12">
          <p className="text-lg text-gray-700  leading-relaxed">
            La Coupe du Monde 2026 sera le plus grand événement de paris sportifs de l&apos;histoire avec 104 matchs sur 39 jours. Que vous soyez novice ou parieur occasionnel, ce guide vous donnera toutes les clés pour comprendre les différents types de paris, gérer votre budget et adopter une stratégie intelligente. N&apos;oubliez pas : les paris sportifs doivent rester un loisir, jamais une source de revenus.
          </p>
        </section>

        {/* Types de paris */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-secondary" />
            Les types de paris
          </h2>
          <div className="space-y-4">
            {typesDeParis.map((pari) => (
              <div key={pari.nom} className="rounded-xl border border-gray-200  bg-white  p-5 sm:p-6">
                <h3 className="text-lg font-bold text-gray-900  mb-2">{pari.nom}</h3>
                <p className="text-sm text-gray-600  mb-3">{pari.desc}</p>
                <div className="rounded-lg bg-primary/5  px-4 py-2.5 text-xs text-gray-700 ">
                  <strong>Exemple :</strong> {pari.exemple}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lexique */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-secondary" />
            Lexique du parieur
          </h2>
          <div className="rounded-2xl border border-gray-200  overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Terme</th>
                  <th className="px-4 py-3 text-left font-semibold">Définition</th>
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

        {/* Erreurs à éviter */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
            Erreurs à éviter
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

        {/* Bankroll management */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-secondary" />
            Gestion de bankroll
          </h2>
          <div className="rounded-2xl bg-white  border border-gray-200  p-6 sm:p-8">
            <p className="text-gray-700  mb-4">
              La gestion de bankroll est la <strong>règle n°1</strong> des paris sportifs. Votre bankroll est le budget total que vous consacrez aux paris. Voici les principes fondamentaux :
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Définissez votre budget</h3>
                <p className="text-gray-600 ">Fixez un montant que vous pouvez vous permettre de perdre intégralement (ex : 100€ pour toute la CDM). Ne dépassez jamais cette somme.</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">La règle des 1-5%</h3>
                <p className="text-gray-600 ">Ne misez jamais plus de 1 à 5% de votre bankroll sur un seul pari. Avec 100€, cela signifie des mises de 1€ à 5€ maximum par pari.</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Tracez vos paris</h3>
                <p className="text-gray-600 ">Notez chaque pari (mise, cote, résultat, gain/perte). Cela vous permet d&apos;analyser vos performances et d&apos;identifier vos points forts.</p>
              </div>
              <div className="rounded-xl bg-accent/5 p-4">
                <h3 className="font-bold text-gray-900  mb-2">Ne courez jamais après vos pertes</h3>
                <p className="text-gray-600 ">Après une série de pertes, ne doublez pas vos mises. Restez discipliné et respectez votre plan. Les pertes font partie du jeu.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stratégie */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-secondary" />
            Conseils stratégie CDM 2026
          </h2>
          <div className="space-y-4">
            {[
              { title: "Exploitez les matchs de poules", desc: "Les premiers matchs de la CDM sont souvent les plus prévisibles. Les favoris prennent rarement des risques et s'imposent généralement. Les cotes 1X2 y sont plus fiables." },
              { title: "Privilégiez les value bets", desc: "Cherchez les cotes sous-évaluées par les bookmakers. Comparez les cotes entre sites et misez quand vous estimez que la probabilité réelle est supérieure à celle impliquée par la cote." },
              { title: "Attention aux matchs de nuit (décalage horaire)", desc: "La CDM 2026 se joue en Amérique du Nord. Certains matchs auront lieu tard en soirée heure française. La fatigue peut altérer votre jugement : évitez de parier en live à 2h du matin." },
              { title: "Diversifiez vos marchés", desc: "Ne misez pas uniquement en 1X2. Les marchés Over/Under et BTTS offrent souvent de meilleures opportunités. Le pari buteur est aussi très intéressant avec des cotes élevées." },
              { title: "Comparez toujours les cotes", desc: "Un écart de cote de 0.10 peut paraître faible, mais sur 50 paris, c'est une différence significative. Inscrivez-vous sur plusieurs bookmakers et pariez toujours sur la meilleure cote." },
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
          <h2 className="text-xl font-bold text-gray-900  mb-3">Prêt à parier sur la CDM 2026 ?</h2>
          <p className="text-sm text-gray-600  mb-4">Comparez les bookmakers et profitez des bonus de bienvenue pour commencer.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/meilleurs-bookmakers"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-accent/90 transition-colors"
            >
              Voir les bookmakers <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/bonus"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-xl py-3.5 px-6 font-bold text-sm hover:bg-primary/20 transition-colors"
            >
              Tous les bonus
            </Link>
          </div>
        </section>
      </div>

      <FAQSection
        title="Questions sur les paris CDM 2026"
        items={[
          { question: "Quel est le meilleur type de pari pour un débutant ?", answer: "Le pari 1X2 (résultat du match) est le plus simple pour débuter. Commencez par parier sur les favoris en matchs de poules, puis explorez progressivement les marchés Over/Under et BTTS." },
          { question: "Combien dois-je miser par pari ?", answer: "Ne misez jamais plus de 1 à 5% de votre bankroll totale sur un seul pari. Si votre budget CDM est de 100€, misez entre 1€ et 5€ par pari. Cette discipline est essentielle pour durer sur le long terme." },
          { question: "Les combinés sont-ils une bonne stratégie ?", answer: "Les combinés offrent des cotes attractives mais sont plus risqués car toutes les sélections doivent être gagnantes. Limitez-vous à 2-3 sélections maximum et ne mettez pas tout votre budget en combinés." },
          { question: "Comment repérer un value bet ?", answer: "Un value bet est un pari dont la cote est supérieure à la probabilité réelle. Analysez les statistiques, comparez les cotes entre bookmakers et fiez-vous à votre analyse plutôt qu'au sentiment général." },
          { question: "Les paris en direct sont-ils recommandés pour les débutants ?", answer: "Les paris en direct demandent de la réactivité et de l'expérience. Pour débuter, privilégiez les paris avant-match qui vous laissent le temps d'analyser. Vous pourrez passer au live betting une fois à l'aise avec les mécaniques de base." },
        ]}
      />
    </>
  );
}
