import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { TrendingUp, Calculator, Target, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Value Bets CDM 2026 — Cotes Sous-Estimées & Paris à Valeur",
  description:
    "Guide complet des value bets pour la Coupe du Monde 2026. Méthodologie, calcul, et 10 exemples concrets de paris à valeur sur la CDM 2026.",
  alternates: { canonical: "https://www.cdm2026.fr/value-bets" },
  openGraph: {
    title: "Value Bets CDM 2026 — Guide & Exemples",
    description:
      "Identifiez les cotes sous-estimées de la CDM 2026. Formule de calcul, méthodologie et 10 value bets concrets.",
    url: "https://www.cdm2026.fr/value-bets",
  },
};

const valueBets = [
  {
    label: "Maroc — Vainqueur CDM",
    cote: 30.0,
    probaImplicite: 3.3,
    probaEstimee: 5,
    reasoning:
      "Demi-finaliste 2022, le Maroc dispose d'une génération dorée (Hakimi, Amrabat, En-Nesyri) et d'une défense parmi les meilleures au monde. La cote ne reflète pas leur progression constante.",
  },
  {
    label: "USA — Atteindre les demi-finales",
    cote: 6.0,
    probaImplicite: 16.7,
    probaEstimee: 22,
    reasoning:
      "L'avantage du pays hôte en Coupe du Monde est historiquement considérable. Pulisic, McKennie et Reyna forment un noyau compétitif. Les stades seront acquis à leur cause.",
  },
  {
    label: "Colombie — Vainqueur CDM",
    cote: 45.0,
    probaImplicite: 2.2,
    probaEstimee: 4,
    reasoning:
      "Finaliste de la Copa América 2024, la Colombie arrive en pleine confiance. Luis Díaz est en forme étincelante et James Rodríguez reste magique en sélection.",
  },
  {
    label: "Japon — Sortir des poules (1er)",
    cote: 3.5,
    probaImplicite: 28.6,
    probaEstimee: 38,
    reasoning:
      "Le Japon a battu l'Allemagne et l'Espagne en 2022. Avec Kubo et Mitoma en pleine maturité, terminer premier de leur groupe est un scénario très crédible.",
  },
  {
    label: "Portugal — Vainqueur CDM",
    cote: 14.0,
    probaImplicite: 7.1,
    probaEstimee: 10,
    reasoning:
      "La relève est assurée avec Bernardo Silva, Rafael Leão et Vitinha. Le Portugal combine expérience et jeunesse, et la cote semble sous-évaluer leur profondeur de banc.",
  },
  {
    label: "Nigeria — Atteindre les quarts",
    cote: 8.0,
    probaImplicite: 12.5,
    probaEstimee: 17,
    reasoning:
      "Osimhen peut porter une équipe seul. Le vivier de talents nigérian est immense, et le format à 48 équipes ouvre des opportunités en phase à élimination directe.",
  },
  {
    label: "Moins de 2.5 buts en finale",
    cote: 1.85,
    probaImplicite: 54.1,
    probaEstimee: 65,
    reasoning:
      "Les finales de CDM sont historiquement fermées. Sur les 10 dernières, 7 ont affiché moins de 3 buts. La tension du match pousse les équipes à la prudence.",
  },
  {
    label: "Turquie — Sortir des poules",
    cote: 2.2,
    probaImplicite: 45.5,
    probaEstimee: 55,
    reasoning:
      "Demi-finaliste de l'Euro 2024, la Turquie possède Arda Güler et Çalhanoglu. Le format élargi à 48 équipes facilite la qualification en huitièmes.",
  },
  {
    label: "Pays-Bas — Meilleur buteur néerlandais 3+ buts",
    cote: 2.5,
    probaImplicite: 40,
    probaEstimee: 52,
    reasoning:
      "Les Pays-Bas jouent un football offensif. Avec le format allongé (7 matchs possibles), un attaquant néerlandais en forme a largement le temps d'inscrire 3 buts ou plus.",
  },
  {
    label: "Match nul au 1er tour — USA vs adversaire du Pot 3",
    cote: 3.4,
    probaImplicite: 29.4,
    probaEstimee: 38,
    reasoning:
      "Les matchs d'ouverture des pays hôtes sont souvent tendus. La pression peut paralyser les USA en début de tournoi, rendant le match nul plus probable que la cote ne le suggère.",
  },
];

const faqItems = [
  {
    question: "Qu'est-ce qu'un value bet exactement ?",
    answer:
      "Un value bet est un pari dont la cote proposée par le bookmaker est supérieure à ce qu'elle devrait être selon la probabilité réelle de l'événement. Si vous estimez qu'une équipe a 10 % de chances de gagner (cote juste = 10.0) mais que le bookmaker propose 15.0, c'est un value bet.",
  },
  {
    question: "Comment savoir si un pari est un value bet ?",
    answer:
      "Calculez la probabilité implicite de la cote (1 / cote x 100), puis comparez-la à votre estimation de la probabilité réelle. Si votre estimation est supérieure à la probabilité implicite, vous avez identifié un value bet. La clé est d'avoir une estimation fiable, basée sur des données et pas seulement l'intuition.",
  },
  {
    question: "Les value bets garantissent-ils un profit ?",
    answer:
      "Non. Un value bet est rentable sur le long terme, pas sur un pari isolé. C'est un concept statistique : en pariant systématiquement sur des value bets, vous devriez être en profit après un grand nombre de paris. Un seul value bet peut tout à fait perdre.",
  },
  {
    question: "Pourquoi les bookmakers proposent-ils des value bets ?",
    answer:
      "Les bookmakers équilibrent leurs cotes en fonction des mises du public, pas uniquement des probabilités réelles. Quand le public surestime un favori, sa cote baisse et celle de l'adversaire monte, créant potentiellement un value bet sur l'outsider.",
  },
  {
    question: "Combien de value bets faut-il jouer pour être rentable ?",
    answer:
      "Il faut un échantillon significatif : au moins 50 à 100 paris pour que l'avantage statistique se manifeste. La discipline et la gestion de bankroll sont essentielles. Ne misez jamais plus de 1 à 3 % de votre capital sur un seul pari.",
  },
];

export default function ValueBetsPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Paris sportifs", href: "/paris-sportifs" },
          { label: "Value bets" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-center py-16 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
          Value Bets — CDM 2026
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Identifiez les cotes sous-estimées par les bookmakers et maximisez votre
          rentabilité sur la Coupe du Monde 2026.
        </p>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Qu&apos;est-ce qu&apos;un value bet ?
          </h2>
        </div>
        <p className="text-gray-700 mb-4">
          Un value bet se produit lorsque la cote proposée par un bookmaker est
          supérieure à la cote juste calculée à partir de la probabilité réelle
          d&apos;un événement. En d&apos;autres termes, le bookmaker sous-estime les
          chances d&apos;un résultat et vous offre un pari mathématiquement
          avantageux.
        </p>
        <p className="text-gray-700 mb-4">
          Les paris sportifs classiques consistent à deviner le bon résultat. Le
          value betting, lui, repose sur un principe différent : trouver des paris
          dont l&apos;espérance de gain est positive sur le long terme, quel que soit le
          résultat individuel. C&apos;est l&apos;approche utilisée par les parieurs
          professionnels.
        </p>
        <p className="text-gray-700">
          La Coupe du Monde 2026, avec son format élargi à 48 équipes et ses
          nombreuses incertitudes, offre un terrain particulièrement fertile pour
          dénicher des value bets. Les bookmakers doivent coter des centaines de
          marchés, et les erreurs d&apos;appréciation sont inévitables.
        </p>
      </section>

      {/* Calcul */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Comment calculer un value bet
          </h2>
        </div>
        <div className="bg-primary/5 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-primary mb-3">La formule</h3>
          <p className="text-gray-700 mb-3">
            <strong>Value = (Cote x Probabilité estimée) - 1</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
              Si le résultat est <strong>positif</strong>, vous avez un value bet.
            </li>
            <li className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              Si le résultat est <strong>négatif ou nul</strong>, le pari n&apos;a pas de valeur.
            </li>
          </ul>
        </div>
        <div className="bg-secondary/5 rounded-xl p-6">
          <h3 className="font-bold text-secondary mb-3">Exemple concret</h3>
          <p className="text-gray-700 mb-2">
            Le Maroc est coté à <strong>30.0</strong> pour remporter la CDM 2026. La
            probabilité implicite de cette cote est 1/30 = 3,3 %.
          </p>
          <p className="text-gray-700 mb-2">
            Vous estimez que le Maroc a en réalité <strong>5 %</strong> de chances
            (demi-finaliste 2022, génération dorée, progression constante).
          </p>
          <p className="text-gray-700 font-semibold">
            Value = (30.0 x 0.05) - 1 = 1.50 - 1 = <span className="text-green-700">+0.50</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Value de 50 % : c&apos;est un excellent value bet. Sur le long terme, ce type
            de pari est très rentable.
          </p>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-7 h-7 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Méthodologie pour identifier les value bets
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Analysez les données, pas les émotions",
              desc: "Utilisez les classements FIFA, les résultats récents, les statistiques de performance (xG, possession) plutôt que votre ressenti ou la popularité d'une équipe.",
            },
            {
              title: "Comparez les cotes de plusieurs bookmakers",
              desc: "Un écart significatif entre bookmakers révèle souvent une surcote. Si un bookmaker propose 3.5 et un autre 2.8 pour le même marché, approfondissez.",
            },
            {
              title: "Cherchez les biais du public",
              desc: "Le grand public surestime les grandes nations et sous-estime les outsiders. Les cotes des favoris sont souvent trop basses, celles des outsiders trop hautes.",
            },
            {
              title: "Exploitez le format 48 équipes",
              desc: "Le nouveau format multiplie les matchs et les incertitudes. Les bookmakers ont moins de données historiques pour coter les confrontations inédites.",
            },
            {
              title: "Surveillez la forme récente",
              desc: "Les cotes ante-post sont fixées des mois à l'avance. Une équipe en pleine progression peut offrir de la valeur si sa cote n'a pas encore bougé.",
            },
            {
              title: "Tenez compte du contexte",
              desc: "Pays hôte, conditions climatiques, décalage horaire, stade : ces facteurs sont souvent sous-pondérés par les modèles des bookmakers.",
            },
          ].map((tip) => (
            <div key={tip.title} className="border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-primary mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-700">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Bets CDM 2026 */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-2">
          10 value bets CDM 2026
        </h2>
        <p className="text-gray-500 mb-8 text-sm">
          Cotes indicatives au 20/02/2026. Vérifiez les cotes actuelles avant de parier.
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
                    <span className="bg-secondary/10 text-secondary font-bold px-3 py-1.5 rounded-lg text-sm">
                      Cote : {vb.cote.toFixed(2)}
                    </span>
                    <span className="bg-green-100 text-green-800 font-bold px-3 py-1.5 rounded-lg text-sm">
                      Value : +{value.toFixed(0)} %
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span>
                      Proba implicite : <strong>{vb.probaImplicite} %</strong>
                    </span>
                    <span>
                      Proba estimée : <strong>{vb.probaEstimee} %</strong>
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
        <Link
          href="https://www.winamax.fr/paris-sportifs"
          target="_blank"
          rel="noopener noreferrer sponsored nofollow"
          className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
        >
          Comparer les cotes CDM 2026{" "}
          <ArrowRight className="inline w-4 h-4 ml-1" />
        </Link>
      </section>

      {/* FAQ */}
      <FAQSection
        title="Questions fréquentes — Value bets CDM 2026"
        items={faqItems}
      />

      {/* ANJ */}
      <section className="max-w-3xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-gray-400">
          Les paris sportifs sont réservés aux personnes majeures (18+). Jouer
          comporte des risques : endettement, dépendance, isolement. Appelez le 09
          74 75 13 13 (appel non surtaxé).{" "}
          <a
            href="https://www.anj.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            anj.fr
          </a>
        </p>
      </section>
    </>
  );
}
