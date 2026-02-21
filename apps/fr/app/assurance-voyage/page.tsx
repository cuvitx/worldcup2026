import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { HeartPulse, Shield, DollarSign, Plane, AlertTriangle, Star, ExternalLink } from "lucide-react";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Assurance voyage CDM 2026 : Comparatif pour supporters français",
    description:
      "Comparatif des meilleures assurances voyage pour la Coupe du Monde 2026 aux USA. Chapka, ACS, Allianz, Mondial Assistance : prix, couverture et avis.",
    openGraph: {
      title: "Assurance voyage CDM 2026 — Comparatif",
      description: "Chapka, ACS, Allianz, Mondial Assistance : quelle assurance choisir pour la CDM 2026 ?",
      url: `${domains.fr}/assurance-voyage`,
    },
  };
}

const insurers = [
  {
    name: "Chapka Assurances",
    plan: "Cap Assistance 24h/24",
    priceFrom: "36 €",
    pricePer: "/ semaine",
    medicalCover: "1 000 000 €",
    repatriation: "Inclus",
    luggage: "2 500 €",
    cancellation: "5 000 € (option)",
    deductible: "0 €",
    rating: 4.5,
    pros: ["Zéro franchise", "Assistance 24h/24 en français", "Couverture sports et activités incluse", "Appli mobile pratique"],
    cons: ["Annulation en option (supplément)", "Pas de couverture Covid spécifique"],
    url: "https://www.chapkadirect.fr/",
    recommended: true,
  },
  {
    name: "ACS",
    plan: "Globe Partner",
    priceFrom: "30 €",
    pricePer: "/ semaine",
    medicalCover: "500 000 €",
    repatriation: "Inclus",
    luggage: "2 000 €",
    cancellation: "8 000 € (inclus)",
    deductible: "50 €",
    rating: 4.2,
    pros: ["Annulation incluse", "Prix compétitif", "Bon rapport qualité-prix", "Souscription en ligne rapide"],
    cons: ["Franchise de 50 €", "Couverture médicale inférieure (500k€)"],
    url: "https://www.acs-ami.com/",
    recommended: false,
  },
  {
    name: "Allianz Travel",
    plan: "Multirisque Premium",
    priceFrom: "55 €",
    pricePer: "/ semaine",
    medicalCover: "1 500 000 €",
    repatriation: "Inclus",
    luggage: "3 000 €",
    cancellation: "10 000 € (inclus)",
    deductible: "0 €",
    rating: 4.3,
    pros: ["Couverture médicale très élevée", "Annulation incluse sans surprise", "Marque de confiance internationale", "Réseau médical étendu aux USA"],
    cons: ["Plus cher que la concurrence", "Service client parfois long"],
    url: "https://www.allianz-voyage.fr/",
    recommended: false,
  },
  {
    name: "Mondial Assistance (Allianz Partners)",
    plan: "Voyageo Monde",
    priceFrom: "45 €",
    pricePer: "/ semaine",
    medicalCover: "1 000 000 €",
    repatriation: "Inclus",
    luggage: "2 500 €",
    cancellation: "7 000 € (inclus)",
    deductible: "30 €",
    rating: 4.1,
    pros: ["Leader mondial de l'assistance", "Réseau de cliniques partenaires aux USA", "Avance de frais possible"],
    cons: ["Franchise de 30 €", "Interface en ligne datée", "Options premium chères"],
    url: "https://www.mondial-assistance.fr/",
    recommended: false,
  },
];

const faqItems = [
  {
    question: "Pourquoi l'assurance voyage est-elle indispensable pour les USA ?",
    answer:
      "Les frais médicaux aux États-Unis sont parmi les plus élevés au monde. Une simple consultation aux urgences coûte 3 000 à 5 000 $. Une fracture peut atteindre 20 000 $. Une hospitalisation de quelques jours dépasse facilement 50 000 $. Sans assurance, ces frais sont entièrement à votre charge. La carte européenne d'assurance maladie (CEAM) ne fonctionne pas aux USA.",
  },
  {
    question: "Ma carte bancaire ne me couvre-t-elle pas déjà ?",
    answer:
      "Les cartes Visa Premier et Mastercard Gold offrent une couverture basique (environ 150 000 €) si vous avez payé votre billet d'avion avec la carte. Mais les plafonds sont souvent insuffisants pour les USA, la franchise est élevée (75-150 €) et la durée est limitée à 90 jours. Pour un séjour CDM 2026, une assurance complémentaire est vivement recommandée.",
  },
  {
    question: "Quand souscrire l'assurance voyage ?",
    answer:
      "Idéalement dès l'achat de vos billets d'avion ou de vos billets de match. La plupart des assurances exigent une souscription avant le départ. Pour la garantie annulation, certaines imposent une souscription dans les 48h suivant l'achat du voyage. Ne tardez pas.",
  },
  {
    question: "L'assurance couvre-t-elle le vol de billets de match ?",
    answer:
      "La plupart des assurances couvrent le vol de bagages et d'effets personnels, ce qui inclut les billets de match imprimés. Pour les billets électroniques, c'est plus nuancé. Vérifiez les conditions générales de votre contrat. En cas de vol, déposez une plainte (police report) immédiatement.",
  },
  {
    question: "Et si je visite aussi le Canada ou le Mexique ?",
    answer:
      "Les assurances « monde entier » couvrent les trois pays hôtes sans surcoût. Vérifiez que votre contrat mentionne bien une couverture mondiale et non limitée aux USA. Les quatre assureurs présentés ici couvrent les trois pays de la CDM 2026.",
  },
];

export default function AssuranceVoyagePage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Assurance voyage CDM 2026" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Lifestyle Supporter</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Assurance voyage CDM 2026 : Comparatif
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Aux USA, une visite aux urgences peut coûter 5 000 $. Ne partez pas sans assurance. Voici notre comparatif des meilleures options pour les supporters français.
          </p>
        </div>
      </section>

      {/* Why it's essential */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <AlertTriangle className="inline-block w-6 h-6 mr-2 text-red-500" />
          Pourquoi c&apos;est indispensable
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-red-200 bg-red-50red-900/20 p-5 text-center">
            <DollarSign className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-red-600">3 000 - 5 000 $</p>
            <p className="text-sm text-gray-600 mt-1">Consultation urgences USA</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50red-900/20 p-5 text-center">
            <HeartPulse className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-red-600">20 000 - 50 000 $</p>
            <p className="text-sm text-gray-600 mt-1">Fracture + hospitalisation</p>
          </div>
          <div className="rounded-xl border border-red-200 bg-red-50red-900/20 p-5 text-center">
            <Plane className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-extrabold text-red-600">15 000 - 30 000 $</p>
            <p className="text-sm text-gray-600 mt-1">Rapatriement sanitaire</p>
          </div>
        </div>
        <p className="text-gray-600 mt-6 text-sm">
          La carte européenne d&apos;assurance maladie (CEAM) ne fonctionne <strong>pas</strong> aux États-Unis, au Canada ni au Mexique. Votre mutuelle française ne couvre généralement pas ou très peu les frais à l&apos;étranger hors UE. Une assurance voyage dédiée est le seul moyen de partir l&apos;esprit tranquille.
        </p>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Shield className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Comparatif des 4 meilleurs assureurs
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#022149] text-white">
                <th className="px-4 py-3 text-left rounded-tl-xl">Assureur</th>
                <th className="px-4 py-3 text-left">Prix</th>
                <th className="px-4 py-3 text-left">Frais médicaux</th>
                <th className="px-4 py-3 text-left">Rapatriement</th>
                <th className="px-4 py-3 text-left">Bagages</th>
                <th className="px-4 py-3 text-left">Annulation</th>
                <th className="px-4 py-3 text-left rounded-tr-xl">Franchise</th>
              </tr>
            </thead>
            <tbody>
              {insurers.map((ins, i) => (
                <tr
                  key={ins.name}
                  className={`${i % 2 === 0 ? "bg-gray-50slate-800" : "bg-whiteslate-900"} ${ins.recommended ? "ring-2 ring-[#00B865]" : ""}`}
                >
                  <td className="px-4 py-3 font-semibold">
                    {ins.name}
                    {ins.recommended && (
                      <span className="block text-xs text-[#00B865] font-normal mt-0.5">Recommandé</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold">{ins.priceFrom}</span>
                    <span className="text-gray-500 text-xs">{ins.pricePer}</span>
                  </td>
                  <td className="px-4 py-3">{ins.medicalCover}</td>
                  <td className="px-4 py-3">{ins.repatriation}</td>
                  <td className="px-4 py-3">{ins.luggage}</td>
                  <td className="px-4 py-3">{ins.cancellation}</td>
                  <td className="px-4 py-3">{ins.deductible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {insurers.map((ins) => (
            <div
              key={ins.name}
              className={`rounded-2xl border bg-whiteslate-800 p-6 ${ins.recommended ? "border-[#00B865] ring-1 ring-[#00B865]" : "border-gray-200"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{ins.name}</h3>
                  <p className="text-sm text-gray-500">{ins.plan}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  <span className="font-bold text-sm">{ins.rating}</span>
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[#022149] mb-4">
                {ins.priceFrom} <span className="text-sm font-normal text-gray-500">{ins.pricePer}</span>
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                <div><span className="text-gray-500">Frais médicaux :</span> <strong>{ins.medicalCover}</strong></div>
                <div><span className="text-gray-500">Rapatriement :</span> <strong>{ins.repatriation}</strong></div>
                <div><span className="text-gray-500">Bagages :</span> <strong>{ins.luggage}</strong></div>
                <div><span className="text-gray-500">Franchise :</span> <strong>{ins.deductible}</strong></div>
              </div>
              <div className="flex gap-4 text-sm mb-4">
                <div>
                  <p className="font-semibold text-green-600 mb-1">Avantages</p>
                  <ul className="space-y-1">
                    {ins.pros.map((p) => (
                      <li key={p} className="flex gap-1.5 text-gray-600">
                        <Shield className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-red-600 mb-1">Limites</p>
                  <ul className="space-y-1">
                    {ins.cons.map((c) => (
                      <li key={c} className="flex gap-1.5 text-gray-600">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a
                href={ins.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:opacity-90 transition-opacity w-full justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                Voir l&apos;offre {ins.name.split(" ")[0]}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title="Questions fréquentes sur l'assurance voyage" items={faqItems} />
      </section>
    </>
  );
}
