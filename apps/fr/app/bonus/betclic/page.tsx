import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { ANJBanner } from "@repo/ui/anj-banner";
import { Gift, CheckCircle, ArrowRight, Star, Tv, Trophy, Layers, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Bonus Betclic CDM 2026 | Jusqu'à 100€ en Freebets + Code Promo",
  description:
    "Bonus Betclic Coupe du Monde 2026 : jusqu'à 100€ en freebets sans conditions. Code promo, avantages, inscription étape par étape et streaming gratuit.",
  openGraph: {
    title: "Bonus Betclic CDM 2026 | Jusqu'à 100€ en Freebets",
    description: "Profitez de l'offre Betclic : 100€ en freebets sans conditions pour la CDM 2026.",
    url: "https://cdm2026.fr/bonus/betclic",
  },
  alternates: { canonical: "https://cdm2026.fr/bonus/betclic" },
};

function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "Betclic", url: "https://www.betclic.fr" },
    reviewRating: { "@type": "Rating", ratingValue: 9.0, bestRating: 10, worstRating: 0 },
    author: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://cdm2026.fr" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const avantages = [
  { icon: Gift, title: "Freebets sans conditions", desc: "Contrairement à d'autres bookmakers, les freebets Betclic sont sans conditions de mise. Vos gains sont directement retirables." },
  { icon: Tv, title: "Streaming live gratuit", desc: "Regardez les matchs de la CDM 2026 en direct et gratuitement sur l'app Betclic. Il suffit d'avoir un compte crédité." },
  { icon: Layers, title: "Large choix de marchés", desc: "Plus de 200 marchés par match : 1X2, buteur, corners, cartons, mi-temps, handicap, score exact et bien plus." },
  { icon: Trophy, title: "Programme fidélité", desc: "Gagnez des points à chaque pari et échangez-les contre des freebets, des cotes boostées ou des cadeaux exclusifs." },
];

const etapesInscription = [
  { step: 1, title: "Créez votre compte Betclic", desc: "Rendez-vous sur Betclic.fr et cliquez sur \"S'inscrire\". Remplissez le formulaire avec vos informations personnelles." },
  { step: 2, title: "Validez votre identité", desc: "Téléchargez votre pièce d'identité et justificatif de domicile. Validation sous 24-48h en général." },
  { step: 3, title: "Effectuez votre premier dépôt", desc: "Déposez entre 10€ et 100€ par carte bancaire, Apple Pay ou autre moyen de paiement." },
  { step: 4, title: "Placez votre premier pari", desc: "Pariez sur un match de votre choix. Si votre pari est perdant, recevez jusqu'à 100€ en freebets." },
  { step: 5, title: "Utilisez vos freebets", desc: "Vos freebets sont crédités immédiatement et valables 7 jours. Utilisez-les sur les matchs CDM 2026." },
];

export default function BonusBetclicPage() {
  return (
    <>
      <ReviewSchema />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Bonus", href: "/bonus" },
          { label: "Betclic" },
        ]}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary">
            Bonus Betclic CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Jusqu&apos;à 100€ en freebets sans conditions de mise. Streaming live gratuit de tous les matchs de la Coupe du Monde 2026.
          </p>
          <a
            href="https://www.betclic.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="mt-6 inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Obtenir 100€ en freebets
          </a>
        </div>
      </section>

      <ANJBanner />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Résumé */}
        <section className="rounded-2xl border-2 border-accent bg-accent/5 p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900  mb-2">Betclic</h2>
              <p className="text-4xl font-extrabold text-accent mb-2">Jusqu&apos;à 100€</p>
              <p className="text-gray-600 ">en freebets sans conditions de mise</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary text-secondary" /> 9.0/10</span>
                <span>Code promo : <strong>Aucun nécessaire</strong></span>
              </div>
            </div>
            <a
              href="https://www.betclic.fr"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold hover:bg-accent/90 transition-colors self-start"
            >
              S&apos;inscrire <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Présentation */}
        <section className="prose  max-w-none mb-12">
          <h2>Pourquoi choisir Betclic pour la CDM 2026 ?</h2>
          <p>
            Betclic est l&apos;un des bookmakers les plus populaires en France, reconnu pour ses freebets généreux et son streaming live gratuit. Fondé en 2005, le bookmaker bordelais propose une expérience de paris complète avec plus de 200 marchés par match de football.
          </p>
          <p>
            Pour la Coupe du Monde 2026, Betclic sera un choix privilégié grâce à son streaming gratuit des matchs en direct. Suivez chaque rencontre sur votre smartphone tout en pariant en live. Les freebets sans conditions de mise vous permettent de tester vos stratégies sans risque.
          </p>
        </section>

        {/* Avantages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-6">Les avantages Betclic</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {avantages.map((av) => (
              <div key={av.title} className="rounded-xl border border-gray-200  bg-white  p-5">
                <div className="flex items-center gap-3 mb-2">
                  <av.icon className="w-5 h-5 text-accent" />
                  <h3 className="font-bold text-gray-900 ">{av.title}</h3>
                </div>
                <p className="text-sm text-gray-600 ">{av.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Étapes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-secondary" />
            Comment s&apos;inscrire sur Betclic
          </h2>
          <div className="space-y-4">
            {etapesInscription.map((etape) => (
              <div key={etape.step} className="flex gap-4 rounded-xl border border-gray-200  bg-white  p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                  {etape.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900  mb-1">{etape.title}</h3>
                  <p className="text-sm text-gray-600 ">{etape.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Streaming CDM */}
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Streaming gratuit CDM 2026</h2>
          <p className="text-gray-700  mb-4">
            Betclic propose le <strong>streaming live gratuit</strong> de nombreux matchs de football. Pour la CDM 2026, suivez chaque rencontre en direct depuis l&apos;application mobile ou le site web. Conditions : avoir un compte Betclic avec un solde positif ou avoir placé un pari sur le match.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 ">
            {[
              "Streaming HD sur mobile et desktop",
              "Pariez en direct tout en regardant le match",
              "Statistiques en temps réel intégrées",
              "Alertes buts et événements clés",
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
            href="https://www.betclic.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-10 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Ouvrir un compte Betclic
          </a>
          <p className="mt-3 text-sm text-gray-500">
            <Link href="/bonus" className="text-primary hover:underline">Voir tous les bonus</Link>
            {" | "}
            <Link href="/meilleurs-bookmakers" className="text-primary hover:underline">Comparatif bookmakers</Link>
          </p>
        </div>
        <ANJBanner />
      </div>

      <FAQSection
        title="Questions sur le bonus Betclic"
        items={[
          { question: "Le bonus Betclic est-il sans conditions ?", answer: "Oui, les freebets Betclic sont sans conditions de mise. Vos gains issus des freebets sont directement retirables, ce qui est un avantage majeur par rapport à d'autres bookmakers." },
          { question: "Faut-il un code promo Betclic ?", answer: "Non, aucun code promo n'est nécessaire. L'offre de bienvenue est automatiquement activée lors de votre inscription sur Betclic.fr." },
          { question: "Combien de temps sont valables les freebets ?", answer: "Les freebets Betclic sont valables 7 jours après leur crédit sur votre compte. Utilisez-les sur les matchs de la CDM 2026 avant expiration." },
          { question: "Le streaming est-il vraiment gratuit ?", answer: "Oui, le streaming live est gratuit sur Betclic pour les clients ayant un solde positif ou ayant placé un pari sur le match en question." },
          { question: "Betclic est-il agréé ANJ ?", answer: "Oui, Betclic est agréé par l'ANJ (Autorité Nationale des Jeux) depuis 2010. C'est un opérateur français basé à Bordeaux, fiable et reconnu." },
        ]}
      />
    </>
  );
}
