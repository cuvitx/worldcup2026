import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { ANJBanner } from "@repo/ui/anj-banner";
import { Gift, CheckCircle, ArrowRight, Star, Shield, Zap, TrendingUp, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Bonus Winamax CDM 2026 | Jusqu'à 100€ Offerts + Code Promo",
  description:
    "Bonus Winamax Coupe du Monde 2026 : jusqu'à 100€ remboursés en freebets. Code promo, avantages, inscription étape par étape et cotes boostées CDM.",
  openGraph: {
    title: "Bonus Winamax CDM 2026 | Jusqu'à 100€ Offerts",
    description: "Profitez de l'offre Winamax : 100€ remboursés en freebets pour la CDM 2026.",
    url: "https://www.cdm2026.fr/bonus/winamax",
  },
  alternates: { canonical: "https://www.cdm2026.fr/bonus/winamax" },
};

function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "Winamax", url: "https://www.winamax.fr" },
    reviewRating: { "@type": "Rating", ratingValue: 9.2, bestRating: 10, worstRating: 0 },
    author: { "@type": "Organization", name: "CDM 2026", url: "https://www.cdm2026.fr" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://www.cdm2026.fr" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const avantages = [
  { icon: TrendingUp, title: "Meilleures cotes du marché", desc: "Winamax offre régulièrement les cotes les plus élevées sur le football, avec une marge opérateur parmi les plus faibles (3-5%)." },
  { icon: Zap, title: "Cotes boostées CDM 2026", desc: "Des cotes spécialement boostées sur les matchs de la Coupe du Monde 2026, avec des offres flash quotidiennes pendant le tournoi." },
  { icon: Shield, title: "Interface intuitive", desc: "Application mobile iOS et Android reconnue comme la plus fluide du marché français. Navigation rapide, paris en un clic." },
  { icon: Star, title: "Communauté active", desc: "Grilles de pronostics entre amis, classements, défis : Winamax est aussi une plateforme sociale pour les parieurs." },
];

const etapesInscription = [
  { step: 1, title: "Créez votre compte", desc: "Rendez-vous sur Winamax.fr et cliquez sur \"Inscription\". Renseignez vos informations personnelles (nom, prénom, date de naissance, adresse email)." },
  { step: 2, title: "Vérifiez votre identité", desc: "Envoyez une copie de votre pièce d'identité et un justificatif de domicile. La vérification est généralement effectuée sous 24 à 48h." },
  { step: 3, title: "Effectuez votre premier dépôt", desc: "Déposez entre 10€ et 100€ par carte bancaire, virement ou autre moyen de paiement accepté." },
  { step: 4, title: "Placez votre premier pari", desc: "Pariez sur un match de la CDM 2026 (pari simple ou combiné, cote minimum 1.05). Si votre pari est perdant, il est remboursé en freebets." },
  { step: 5, title: "Recevez vos freebets", desc: "En cas de pari perdant, recevez jusqu'à 100€ en freebets directement sur votre compte. Utilisables pendant 14 jours sur tous les sports." },
];

export default function BonusWinamaxPage() {
  return (
    <>
      <ReviewSchema />
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Bonus", href: "/bonus" },
          { label: "Winamax" },
        ]}
      />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary">
            Bonus Winamax CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Jusqu&apos;à 100€ remboursés en freebets sur votre premier pari. L&apos;offre idéale pour parier sur la Coupe du Monde 2026.
          </p>
          <a
            href="https://www.winamax.fr"
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
        {/* Résumé offre */}
        <section className="rounded-2xl border-2 border-accent bg-accent/5 p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-gray-900 ">Winamax</h2>
                <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-semibold">N°1 France</span>
              </div>
              <p className="text-4xl font-extrabold text-accent mb-2">Jusqu&apos;à 100€</p>
              <p className="text-gray-600 ">1er pari remboursé en freebets si perdu</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary text-secondary" /> 9.2/10</span>
                <span>Code promo : <strong>Aucun nécessaire</strong></span>
              </div>
            </div>
            <a
              href="https://www.winamax.fr"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold hover:bg-accent/90 transition-colors self-start"
            >
              S&apos;inscrire <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Présentation détaillée */}
        <section className="prose  max-w-none mb-12">
          <h2>Pourquoi choisir Winamax pour la CDM 2026 ?</h2>
          <p>
            Winamax est le leader des paris sportifs en France avec plus de 5 millions d&apos;utilisateurs. Fondé en 2010, le bookmaker français s&apos;est imposé grâce à ses cotes parmi les plus compétitives du marché, une interface utilisateur reconnue comme la meilleure du secteur et une communauté de parieurs unique en son genre.
          </p>
          <p>
            Pour la Coupe du Monde 2026, Winamax prépare des offres exceptionnelles : cotes boostées quotidiennes sur les matchs phares, paris spéciaux (meilleur buteur, équipe surprise, parcours des Bleus) et des challenges communautaires. Avec 104 matchs au programme, c&apos;est le bookmaker idéal pour vivre pleinement le tournoi.
          </p>
        </section>

        {/* Avantages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-6">Les avantages Winamax</h2>
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

        {/* Étapes inscription */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-secondary" />
            Comment s&apos;inscrire étape par étape
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

        {/* Cotes boostées CDM */}
        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Cotes boostées CDM 2026 sur Winamax</h2>
          <p className="text-gray-700  mb-4">
            Pendant toute la durée de la Coupe du Monde 2026, Winamax proposera des <strong>cotes boostées quotidiennes</strong> sur les matchs du jour. Ces offres flash permettent d&apos;obtenir des cotes majorées de 20 à 50% sur des sélections ciblées : vainqueur du match, buteur, score exact...
          </p>
          <ul className="space-y-2 text-sm text-gray-700 ">
            {[
              "Cotes boostées sur chaque match des Bleus",
              "Offres spéciales phases à élimination directe",
              "Paris gratuits lors des demi-finales et finale",
              "Challenges communautaires avec cagnotte",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA final */}
        <div className="text-center mb-10">
          <a
            href="https://www.winamax.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-10 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Ouvrir un compte Winamax
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
        title="Questions sur le bonus Winamax"
        items={[
          { question: "Le bonus Winamax est-il vraiment de 100€ ?", answer: "Oui, Winamax rembourse votre premier pari jusqu'à 100€ en freebets s'il est perdant. Si votre pari est gagnant, vous conservez vos gains normalement." },
          { question: "Faut-il un code promo Winamax ?", answer: "Non, aucun code promo n'est nécessaire. L'offre de bienvenue est automatiquement activée lors de votre inscription sur Winamax.fr." },
          { question: "Combien de temps sont valables les freebets Winamax ?", answer: "Les freebets Winamax sont utilisables pendant 14 jours après leur crédit sur votre compte. Pensez à les utiliser avant leur expiration." },
          { question: "Peut-on utiliser le bonus sur les matchs CDM 2026 ?", answer: "Oui, le bonus de bienvenue et les freebets sont utilisables sur tous les événements sportifs, y compris tous les matchs de la Coupe du Monde 2026." },
          { question: "Winamax est-il fiable et légal ?", answer: "Oui, Winamax est agréé par l'ANJ (Autorité Nationale des Jeux) depuis 2010. C'est le premier opérateur de paris sportifs en France avec plus de 5 millions d'utilisateurs." },
        ]}
      />
    </>
  );
}
