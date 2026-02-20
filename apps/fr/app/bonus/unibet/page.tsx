import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { ANJBanner } from "@repo/ui/anj-banner";
import { Gift, CheckCircle, ArrowRight, Star, Globe, BarChart3, Settings, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Bonus Unibet CDM 2026 | Jusqu'à 100€ Remboursés + Code Promo",
  description:
    "Bonus Unibet Coupe du Monde 2026 : jusqu'à 100€ remboursés en freebets. Code promo, avantages, inscription étape par étape et paris builder.",
  openGraph: {
    title: "Bonus Unibet CDM 2026 | Jusqu'à 100€ Remboursés",
    description: "Profitez de l'offre Unibet : 100€ remboursés en freebets pour la CDM 2026.",
    url: "https://cdm2026.fr/bonus/unibet",
  },
};

function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "Unibet", url: "https://www.unibet.fr" },
    reviewRating: { "@type": "Rating", ratingValue: 8.7, bestRating: 10, worstRating: 0 },
    author: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const avantages = [
  { icon: Globe, title: "Opérateur international", desc: "Unibet appartient au groupe Kindred, coté en bourse. Présent dans plus de 20 pays, c'est un gage de fiabilité et de solidité financière." },
  { icon: Settings, title: "Cash-out partiel", desc: "Sécurisez une partie de vos gains avant la fin du match avec le cash-out partiel, une fonctionnalité exclusive très appréciée des parieurs expérimentés." },
  { icon: BarChart3, title: "Statistiques intégrées", desc: "Accédez à des statistiques détaillées directement sur chaque match : forme, confrontations directes, buteurs, possession, xG..." },
  { icon: Star, title: "Paris builder", desc: "Créez vos propres paris combinés au sein d'un même match : buteur + résultat + corners. Des cotes personnalisées selon vos prédictions." },
];

const etapesInscription = [
  { step: 1, title: "Créez votre compte Unibet", desc: "Rendez-vous sur Unibet.fr et cliquez sur \"S'inscrire\". Renseignez vos coordonnées et choisissez vos identifiants." },
  { step: 2, title: "Vérifiez votre identité", desc: "Envoyez votre pièce d'identité et justificatif de domicile pour valider votre compte. Délai habituel : 24 à 48h." },
  { step: 3, title: "Déposez de l'argent", desc: "Effectuez votre premier dépôt (min. 10€) par carte bancaire, PayPal, Skrill ou virement bancaire." },
  { step: 4, title: "Placez votre premier pari", desc: "Pariez sur un match CDM 2026 (mise min. 1€). Si votre pari est perdant, recevez jusqu'à 100€ en freebets." },
  { step: 5, title: "Profitez de vos freebets", desc: "Freebets crédités sous 24h. Valables 14 jours sur tous les sports et marchés disponibles." },
];

export default function BonusUnibetPage() {
  return (
    <>
      <ReviewSchema />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Bonus", href: "/bonus" },
          { label: "Unibet" },
        ]}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary">
            Bonus Unibet CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Jusqu&apos;à 100€ remboursés en freebets sur votre premier pari perdant. Cash-out partiel et statistiques avancées pour la CDM 2026.
          </p>
          <a
            href="https://www.unibet.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="mt-6 inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Profiter de l&apos;offre 100€
          </a>
        </div>
      </section>

      <ANJBanner />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <section className="rounded-2xl border-2 border-accent bg-accent/5 p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unibet</h2>
              <p className="text-4xl font-extrabold text-accent mb-2">Jusqu&apos;à 100€</p>
              <p className="text-gray-600 dark:text-gray-300">remboursés en freebets si 1er pari perdu</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary text-secondary" /> 8.7/10</span>
                <span>Code promo : <strong>Aucun nécessaire</strong></span>
              </div>
            </div>
            <a
              href="https://www.unibet.fr"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold hover:bg-accent/90 transition-colors self-start"
            >
              S&apos;inscrire <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="prose dark:prose-invert max-w-none mb-12">
          <h2>Pourquoi choisir Unibet pour la CDM 2026 ?</h2>
          <p>
            Unibet est un opérateur international de référence, présent en France depuis 2010 via une licence ANJ. Filiale du groupe Kindred (coté en bourse à Stockholm), Unibet offre une sécurité financière maximale et une expérience de paris complète.
          </p>
          <p>
            Pour la Coupe du Monde 2026, Unibet se démarque grâce à ses outils avancés : le <strong>Paris Builder</strong> vous permet de créer des combinés personnalisés au sein d&apos;un même match, tandis que le <strong>cash-out partiel</strong> vous offre une flexibilité inégalée pour sécuriser vos gains en cours de match. Les statistiques détaillées intégrées directement dans l&apos;interface vous aident à prendre des décisions éclairées.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Les avantages Unibet</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {avantages.map((av) => (
              <div key={av.title} className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <av.icon className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-gray-900 dark:text-white">{av.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{av.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-secondary" />
            Comment s&apos;inscrire sur Unibet
          </h2>
          <div className="space-y-4">
            {etapesInscription.map((etape) => (
              <div key={etape.step} className="flex gap-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                  {etape.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{etape.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{etape.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Paris Builder : créez vos propres paris</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Le Paris Builder d&apos;Unibet est un outil unique pour la CDM 2026. Combinez plusieurs sélections au sein d&apos;un même match pour créer un pari sur mesure avec une cote personnalisée.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {[
              "Combinez résultat + buteur + nombre de buts",
              "Cotes calculées automatiquement en temps réel",
              "Disponible sur tous les matchs CDM 2026",
              "Compatible avec les freebets de bienvenue",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className="text-center mb-10">
          <a
            href="https://www.unibet.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-10 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Ouvrir un compte Unibet
          </a>
          <p className="mt-3 text-sm text-gray-500">
            <Link href="/bonus" className="text-primary hover:underline">Voir tous les bonus</Link>
            {" | "}
            <Link href="/meilleurs-bookmakers" className="text-primary hover:underline">Comparatif bookmakers</Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mb-6">
          18+ | Jouer comporte des risques : endettement, isolement, dépendance. Appelez le 09 74 75 13 13 (appel non surtaxé).
        </p>
      </div>

      <FAQSection
        title="Questions sur le bonus Unibet"
        items={[
          { question: "Comment fonctionne le bonus Unibet 100€ ?", answer: "Votre premier pari (de 1€ à 100€) est remboursé en freebets s'il est perdant. Le remboursement est crédité sous 24h après le résultat du pari." },
          { question: "Faut-il un code promo Unibet ?", answer: "Non, l'offre de bienvenue Unibet est automatique. Aucun code promo n'est nécessaire à l'inscription." },
          { question: "Qu'est-ce que le cash-out partiel ?", answer: "Le cash-out partiel permet de retirer une partie de vos gains potentiels avant la fin du match, tout en laissant le reste du pari actif. Idéal pour sécuriser des gains tout en gardant une chance de gagner plus." },
          { question: "Les freebets Unibet ont-ils une durée de validité ?", answer: "Oui, les freebets Unibet sont valables 14 jours après leur crédit sur votre compte. Pensez à les utiliser sur les matchs CDM 2026." },
          { question: "Unibet est-il fiable ?", answer: "Oui, Unibet est agréé ANJ et appartient au groupe Kindred, coté en bourse à Stockholm. C'est un opérateur de référence présent dans plus de 20 pays." },
        ]}
      />
    </>
  );
}
