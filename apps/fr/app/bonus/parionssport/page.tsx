import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Gift, CheckCircle, ArrowRight, Star, MapPin, ShieldCheck, Ticket, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Bonus ParionsSport CDM 2026 | Jusqu'à 90€ Offerts + Code Promo",
  description:
    "Bonus ParionsSport Coupe du Monde 2026 : jusqu'à 90€ offerts en freebets. Code promo, avantages, inscription étape par étape. Opérateur FDJ de confiance.",
  openGraph: {
    title: "Bonus ParionsSport CDM 2026 | Jusqu'à 90€ Offerts",
    description: "Profitez de l'offre ParionsSport : 90€ en freebets pour la CDM 2026.",
    url: "https://www.cdm2026.fr/bonus/parionssport",
  },
  alternates: { canonical: "https://www.cdm2026.fr/bonus/parionssport" },
};

function ReviewSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Organization", name: "ParionsSport", url: "https://www.enligne.parionssport.fdj.fr" },
    reviewRating: { "@type": "Rating", ratingValue: 8.5, bestRating: 10, worstRating: 0 },
    author: { "@type": "Organization", name: "CDM 2026", url: "https://www.cdm2026.fr" },
    publisher: { "@type": "Organization", name: "CDM 2026", url: "https://www.cdm2026.fr" },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const avantages = [
  { icon: ShieldCheck, title: "Marque FDJ de confiance", desc: "ParionsSport est l'opérateur de paris sportifs de la Française des Jeux. Une marque connue de tous les Français, synonyme de sécurité et de confiance." },
  { icon: MapPin, title: "Points de vente physiques", desc: "Pariez en ligne ou dans les 30 000 points de vente FDJ partout en France. Un réseau unique qui permet de parier même sans smartphone." },
  { icon: Ticket, title: "Grilles Loto Foot", desc: "Accédez aux grilles Loto Foot exclusives pour la CDM 2026. Pronostiquez les résultats de plusieurs matchs pour tenter de remporter le jackpot." },
  { icon: Star, title: "Cotes boostées événements", desc: "Des cotes spécialement boostées sur les grands événements sportifs comme la Coupe du Monde. Offres flash régulières sur les matchs phares." },
];

const etapesInscription = [
  { step: 1, title: "Créez votre compte ParionsSport", desc: "Rendez-vous sur enligne.parionssport.fdj.fr et cliquez sur \"Inscription\". Remplissez vos informations personnelles." },
  { step: 2, title: "Vérifiez votre identité", desc: "Envoyez votre pièce d'identité et justificatif de domicile. La FDJ vérifie votre dossier sous 24 à 72h." },
  { step: 3, title: "Effectuez votre premier dépôt", desc: "Déposez entre 10€ et 90€ par carte bancaire ou virement. Le dépôt est instantané par CB." },
  { step: 4, title: "Placez votre premier pari", desc: "Pariez sur un match CDM 2026 (pari simple ou combiné). Si votre pari est perdant, recevez jusqu'à 90€ en freebets." },
  { step: 5, title: "Recevez vos freebets", desc: "En cas de pari perdant, vos freebets sont crédités automatiquement. Valables 7 jours sur tous les sports." },
];

export default function BonusParionsSportPage() {
  return (
    <>
      <ReviewSchema />

      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent">
            Bonus ParionsSport CDM 2026
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Jusqu&apos;à 90€ offerts en freebets par la FDJ. L&apos;opérateur de confiance des Français pour parier sur la Coupe du Monde 2026.
          </p>
          <a
            href="https://www.enligne.parionssport.fdj.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="mt-6 inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Profiter de l&apos;offre 90€
          </a>
        </div>
      </section>


      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <section className="rounded-2xl border-2 border-accent bg-accent/5 p-6 sm:p-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900  mb-2">ParionsSport</h2>
              <p className="text-4xl font-extrabold text-accent mb-2">Jusqu&apos;à 90€</p>
              <p className="text-gray-600 ">offerts en freebets par la FDJ</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-secondary text-accent" /> 8.5/10</span>
                <span>Code promo : <strong>Aucun nécessaire</strong></span>
              </div>
            </div>
            <a
              href="https://www.enligne.parionssport.fdj.fr"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-8 font-bold hover:bg-accent/90 transition-colors self-start"
            >
              S&apos;inscrire <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        <section className="prose  max-w-none mb-12">
          <h2>Pourquoi choisir ParionsSport pour la CDM 2026 ?</h2>
          <p>
            ParionsSport est l&apos;opérateur de paris sportifs de la Française des Jeux (FDJ), une marque emblématique connue de tous les Français. Agréé ANJ depuis 2010, ParionsSport offre la sécurité d&apos;une entreprise publique cotée en bourse et un réseau de 30 000 points de vente physiques.
          </p>
          <p>
            Pour la Coupe du Monde 2026, ParionsSport sera incontournable grâce à ses <strong>grilles Loto Foot</strong> spéciales CDM et ses cotes boostées sur les matchs événements. L&apos;opérateur propose également des paris en point de vente, idéal pour ceux qui préfèrent une approche plus traditionnelle. Avec un bonus de bienvenue de 90€, c&apos;est une option solide pour les nouveaux parieurs.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-6">Les avantages ParionsSport</h2>
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

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-6 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-accent" />
            Comment s&apos;inscrire sur ParionsSport
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

        <section className="rounded-2xl bg-primary/5 border border-primary/10 p-6 sm:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900  mb-4">Grilles Loto Foot CDM 2026</h2>
          <p className="text-gray-700  mb-4">
            ParionsSport propose des <strong>grilles Loto Foot exclusives</strong> pendant la Coupe du Monde 2026. Pronostiquez les résultats de 8 à 15 matchs pour tenter de remporter un jackpot pouvant atteindre plusieurs millions d&apos;euros.
          </p>
          <ul className="space-y-2 text-sm text-gray-700 ">
            {[
              "Grilles spéciales CDM 2026 avec jackpots majorés",
              "Disponibles en ligne et en point de vente",
              "Mise minimum de 1€ par grille",
              "Gains potentiels de plusieurs millions d'euros",
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
            href="https://www.enligne.parionssport.fdj.fr"
            target="_blank"
            rel="noopener noreferrer sponsored nofollow"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-10 font-bold text-lg hover:bg-accent/90 transition-colors"
          >
            <Gift className="w-5 h-5" />
            Ouvrir un compte ParionsSport
          </a>
          <p className="mt-3 text-sm text-gray-500">
            <Link href="/bonus" className="text-primary hover:underline">Voir tous les bonus</Link>
            {" | "}
            <Link href="/meilleurs-bookmakers" className="text-primary hover:underline">Comparatif bookmakers</Link>
          </p>
        </div>
      </div>

      <FAQSection
        title="Questions sur le bonus ParionsSport"
        items={[
          { question: "Le bonus ParionsSport est-il de 90€ ?", answer: "Oui, ParionsSport offre jusqu'à 90€ en freebets. Votre premier pari (jusqu'à 90€) est remboursé en freebets s'il est perdant." },
          { question: "Faut-il un code promo ParionsSport ?", answer: "Non, l'offre de bienvenue est automatique. Aucun code promo n'est nécessaire lors de votre inscription sur ParionsSport en ligne." },
          { question: "Peut-on parier en point de vente avec le bonus ?", answer: "Non, le bonus de bienvenue en ligne est réservé aux paris effectués sur le site ou l'application ParionsSport. Les points de vente FDJ proposent des offres distinctes." },
          { question: "ParionsSport appartient-il à la FDJ ?", answer: "Oui, ParionsSport est l'opérateur de paris sportifs de la Française des Jeux (FDJ), entreprise publique cotée en bourse. C'est l'un des opérateurs les plus fiables du marché français." },
          { question: "Qu'est-ce que le Loto Foot ?", answer: "Le Loto Foot est un jeu de pronostics sportifs proposé par la FDJ. Vous devez pronostiquer les résultats de 8 à 15 matchs pour tenter de remporter un jackpot. Des grilles spéciales seront proposées pendant la CDM 2026." },
        ]}
      />
    </>
  );
}
