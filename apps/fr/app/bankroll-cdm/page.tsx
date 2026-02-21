import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Wallet, ArrowRight, Calculator, Shield, TrendingUp, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Gestion de bankroll CDM 2026 — Budget, staking plan et Kelly criterion",
  description:
    "Comment gérer votre bankroll pendant la Coupe du Monde 2026 : budget recommandé, staking plan, Kelly criterion simplifié, erreurs à éviter.",
  alternates: { canonical: "https://www.cdm2026.fr/bankroll-cdm" },
  openGraph: {
    title: "Gestion de bankroll — CDM 2026",
    description: "Budget, staking plan et Kelly criterion pour vos paris CDM 2026.",
    url: "https://www.cdm2026.fr/bankroll-cdm",
  },
};

const stakingPlans = [
  {
    name: "Flat staking (recommandé)",
    desc: "Misez toujours le même montant : 1 à 3% de votre bankroll par pari.",
    example: "Bankroll 200 EUR → mise fixe de 2 à 6 EUR par pari.",
    risk: "Faible",
    riskColor: "text-green-600",
  },
  {
    name: "Staking proportionnel",
    desc: "Ajustez votre mise selon votre confiance : 1% (faible), 2% (moyen), 3% (fort).",
    example: "France -1.5 (forte conviction) → 3% = 6 EUR. Outsider J1 (spéculatif) → 1% = 2 EUR.",
    risk: "Moyen",
    riskColor: "text-yellow-600",
  },
  {
    name: "Kelly criterion simplifié",
    desc: "Formule : mise = (cote × probabilité estimée - 1) / (cote - 1) × bankroll. Divisez par 4 (quart-Kelly) pour limiter la variance.",
    example: "Cote 2.50, probabilité estimée 45%. Kelly = (2.5×0.45 - 1)/(2.5-1) = 0.083 → Quart-Kelly : 2.1% de la bankroll.",
    risk: "Variable",
    riskColor: "text-orange-600",
  },
];

const budgetTiers = [
  { level: "Débutant", budget: "50 – 100 EUR", mise: "1 – 2 EUR", paris: "~30 paris", desc: "Pour découvrir les paris pendant la CDM sans risque." },
  { level: "Intermédiaire", budget: "200 – 500 EUR", mise: "4 – 10 EUR", paris: "~50 paris", desc: "Pour parier régulièrement sur la phase de groupes et les KO." },
  { level: "Avancé", budget: "500 – 1000 EUR", mise: "10 – 20 EUR", paris: "~60 paris", desc: "Pour une couverture complète du tournoi avec des combinés." },
];

const erreurs = [
  "Augmenter les mises après une série de pertes (chasing losses)",
  "Parier plus de 5% de la bankroll sur un seul pari",
  "Miser tout le budget en première semaine de phase de groupes",
  "Ignorer les phases finales (souvent les plus rentables)",
  "Parier sous l'influence de l'alcool ou de l'émotion",
  "Ne pas tracker ses paris (aucun suivi = aucun apprentissage)",
];

export default function BankrollCdmPage() {
  const faqItems = [
    {
      question: "Quel budget prévoir pour parier sur la CDM 2026 ?",
      answer: "Un budget raisonnable se situe entre 100 et 500 EUR pour l'ensemble du tournoi (1 mois). Fixez ce montant AVANT le début de la compétition et ne le dépassez jamais. C'est un budget loisir, pas un investissement.",
    },
    {
      question: "Le Kelly criterion est-il adapté aux paris CDM ?",
      answer: "Le Kelly est puissant mais difficile à appliquer car il nécessite d'estimer précisément les probabilités. Utilisez le quart-Kelly (divisez par 4) pour limiter la variance. Le flat staking à 2% reste la méthode la plus simple et fiable.",
    },
    {
      question: "Faut-il tout miser sur la phase de groupes ?",
      answer: "Non ! Gardez au moins 40% de votre bankroll pour les phases éliminatoires. Les groupes offrent plus de matchs mais les KO offrent souvent plus de value car les cotes reflètent davantage la pression et les émotions que la réalité.",
    },
  ];

  return (
    <>
<Breadcrumb items={[{ label: "Accueil", href: "/" }, { label: "Bankroll CDM" }]} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Guide paris sportifs
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Gestion de bankroll CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Budget, staking plan et discipline : les fondamentaux pour survivre au marathon
            d&apos;un mois de Coupe du Monde sans exploser votre bankroll.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Budget recommandé */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Wallet className="h-7 w-7 text-accent" /> Budget recommandé
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {budgetTiers.map((t) => (
              <div key={t.level} className="rounded-xl border border-gray-200 p-5 space-y-3">
                <h3 className="font-bold text-primary">{t.level}</h3>
                <p className="text-2xl font-black text-accent">{t.budget}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Mise/pari : {t.mise}</p>
                  <p>Volume : {t.paris}</p>
                </div>
                <p className="text-xs text-gray-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Staking plans */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Calculator className="h-7 w-7 text-accent" /> Staking plans
          </h2>
          <div className="space-y-4">
            {stakingPlans.map((sp) => (
              <div key={sp.name} className="rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-primary">{sp.name}</h3>
                  <span className={`text-xs font-semibold ${sp.riskColor}`}>Risque : {sp.risk}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{sp.desc}</p>
                <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-500">
                  <strong>Exemple :</strong> {sp.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Erreurs */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 text-red-500" /> Erreurs à éviter
          </h2>
          <ul className="space-y-2">
            {erreurs.map((e) => (
              <li key={e} className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                <span className="text-gray-700">{e}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center">
          <Link href="/lexique-paris" className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity">
            Lexique paris sportifs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />

        <p className="text-xs text-gray-400 text-center">
          Les paris sportifs comportent des risques. Jouez responsablement. 18+ | Informations et aide sur joueurs-info-service.fr (ANJ).
        </p>
      </div>
    </>
  );
}
