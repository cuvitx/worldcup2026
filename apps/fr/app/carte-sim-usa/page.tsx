import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Smartphone, Wifi, Signal, Globe, CheckCircle, XCircle, ExternalLink, Zap } from "lucide-react";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Quel forfait téléphone pour la CDM 2026 aux USA ? eSIM & carte SIM",
    description:
      "Comparatif eSIM et carte SIM pour la Coupe du Monde 2026 aux USA. Holafly, Airalo, T-Mobile, Free : prix, data, couverture stade.",
    openGraph: {
      title: "Forfait téléphone CDM 2026 aux USA — Comparatif",
      description: "eSIM vs carte SIM : Holafly, Airalo, T-Mobile Tourist Plan, forfait Free inclus.",
      url: `${domains.fr}/carte-sim-usa`,
    },
    alternates: { canonical: "https://www.cdm2026.fr/carte-sim-usa" },
  };
}

const plans = [
  {
    name: "Holafly",
    type: "eSIM",
    data: "Data illimitée",
    duration: "5 à 90 jours",
    price: "19 € (5j) / 47 € (15j)",
    coverage: "USA uniquement (option Mexique/Canada)",
    calls: "Non inclus (VoIP uniquement)",
    pros: ["Data illimitée, idéal streaming", "Installation en 2 min", "Assistance en français 24/7"],
    cons: ["Pas d'appels/SMS locaux", "Pas de numéro US", "Ralentissement possible au-delà de 500 Mo/jour"],
    url: "https://www.holafly.com/fr/",
    recommended: true,
  },
  {
    name: "Airalo",
    type: "eSIM",
    data: "1 à 20 Go",
    duration: "7 à 30 jours",
    price: "5 $ (1 Go) / 26 $ (10 Go)",
    coverage: "USA (plans multi-pays disponibles)",
    calls: "Non inclus",
    pros: ["Très abordable", "Choix flexible de data", "Plans multi-pays (USA+Canada+Mexique)"],
    cons: ["Data limitée", "Pas d'appels locaux", "Interface en anglais"],
    url: "https://www.airalo.com/",
    recommended: false,
  },
  {
    name: "T-Mobile Tourist Plan",
    type: "SIM physique",
    data: "50 Go (haut débit)",
    duration: "3 semaines",
    price: "50 $",
    coverage: "USA + Canada + Mexique inclus",
    calls: "Appels & SMS illimités (USA + internationaux vers 70+ pays)",
    pros: ["Numéro US inclus", "Appels vers la France inclus", "Couverture T-Mobile (excellente en ville)", "Achetable en boutique sur place"],
    cons: ["SIM physique uniquement", "Nécessite un téléphone débloqué", "Disponible uniquement aux USA"],
    url: "https://www.t-mobile.com/",
    recommended: false,
  },
  {
    name: "Free Mobile (forfait à 19,99 €)",
    type: "Roaming inclus",
    data: "35 Go/mois en roaming",
    duration: "Inclus dans le forfait",
    price: "0 € (inclus dans l'abonnement)",
    coverage: "USA + Canada + Mexique",
    calls: "Appels/SMS illimités depuis USA vers France",
    pros: ["Aucun surcoût", "Déjà votre numéro français", "Couverture dans les 3 pays CDM"],
    cons: ["35 Go seulement", "Débit parfois limité en roaming", "Réseau partenaire (pas toujours optimal)"],
    url: "https://www.free.fr/",
    recommended: false,
  },
];

const faqItems = [
  {
    question: "eSIM ou carte SIM physique : que choisir ?",
    answer:
      "L'eSIM est la solution la plus pratique : activation instantanée, pas de manipulation physique, et vous gardez votre SIM française dans le deuxième slot. La carte SIM physique (T-Mobile) est préférable si vous avez besoin d'un numéro américain pour recevoir des appels locaux ou valider des comptes US.",
  },
  {
    question: "Mon téléphone est-il compatible eSIM ?",
    answer:
      "La plupart des smartphones récents sont compatibles : iPhone XS et ultérieurs, Samsung Galaxy S20+, Google Pixel 3+, Xiaomi 13+. Vérifiez dans Réglages > Données cellulaires > Ajouter un forfait eSIM. Si l'option n'apparaît pas, votre téléphone n'est pas compatible.",
  },
  {
    question: "Y aura-t-il du réseau dans les stades ?",
    answer:
      "Tous les stades de la CDM 2026 sont équipés de DAS (Distributed Antenna Systems) pour garantir une couverture cellulaire même avec 60 000+ spectateurs. Cependant, le réseau sera forcément saturé pendant les matchs. Conseil : téléchargez vos billets et plans avant d'entrer et privilégiez le WiFi du stade quand disponible.",
  },
  {
    question: "Puis-je utiliser le WiFi gratuit dans les stades ?",
    answer:
      "Oui, tous les stades de la CDM 2026 proposeront un WiFi gratuit sponsorisé. La qualité et la vitesse varieront selon l'affluence. Pour le streaming ou les appels vidéo, votre forfait data sera plus fiable.",
  },
  {
    question: "Faut-il un VPN aux USA ?",
    answer:
      "Un VPN n'est pas nécessaire pour la sécurité, mais il peut être utile pour accéder à vos services de streaming français (TF1+, M6+) qui sont géo-bloqués aux USA. NordVPN et ExpressVPN fonctionnent bien depuis les USA.",
  },
];

export default function CarteSimUsaPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Forfait téléphone CDM 2026" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Lifestyle Supporter</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Quel forfait téléphone pour la CDM 2026 aux USA ?
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            eSIM, carte SIM locale ou roaming Free ? Comparatif complet pour rester connecté dans les stades et partout aux États-Unis.
          </p>
        </div>
      </section>

      {/* eSIM vs Physical */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Smartphone className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          eSIM vs carte SIM physique
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#00B865] bg-green-50 p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#00B865]" />
              eSIM (recommandé)
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Activation instantanée depuis la France</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Gardez votre SIM française en parallèle</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Pas de déplacement en boutique</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Changement de forfait en quelques clics</li>
              <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />Pas de numéro US pour appels locaux</li>
              <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />Nécessite un téléphone compatible</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Signal className="w-5 h-5 text-[#D4AF37]" />
              Carte SIM physique
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Numéro US pour appels/SMS locaux</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Compatible tous téléphones débloqués</li>
              <li className="flex gap-2"><CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />Souvent plus de data incluse</li>
              <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />Achat en boutique sur place</li>
              <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />Risque de perdre votre SIM française</li>
              <li className="flex gap-2"><XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />Manipulation physique nécessaire</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Comparison cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Globe className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Comparatif des solutions
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border bg-white p-6 ${plan.recommended ? "border-[#00B865] ring-1 ring-[#00B865]" : "border-gray-200"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg">{plan.name}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{plan.type}</span>
                </div>
                {plan.recommended && (
                  <span className="bg-[#00B865] text-white text-xs font-semibold px-2 py-1 rounded-full">Recommandé</span>
                )}
              </div>
              <p className="text-xl font-extrabold text-[#022149] mb-3">{plan.price}</p>
              <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                <div><span className="text-gray-500">Data :</span> <strong>{plan.data}</strong></div>
                <div><span className="text-gray-500">Durée :</span> <strong>{plan.duration}</strong></div>
                <div><span className="text-gray-500">Couverture :</span> <strong>{plan.coverage}</strong></div>
                <div><span className="text-gray-500">Appels :</span> <strong>{plan.calls}</strong></div>
              </div>
              <div className="space-y-1 text-sm mb-4">
                {plan.pros.map((p) => (
                  <div key={p} className="flex gap-1.5 text-gray-600">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />{p}
                  </div>
                ))}
                {plan.cons.map((c) => (
                  <div key={c} className="flex gap-1.5 text-gray-600">
                    <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />{c}
                  </div>
                ))}
              </div>
              <a
                href={plan.url}
                target="_blank"
                rel="noopener noreferrer sponsored nofollow"
                className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:opacity-90 transition-opacity w-full justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                Voir {plan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Stadium coverage */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Wifi className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Couverture dans les stades
        </h2>
        <div className="prose prose-lg max-w-none">
          <p>
            Tous les stades de la Coupe du Monde 2026 sont équipés de systèmes d&apos;antennes distribuées (DAS) conçus
            pour gérer 60 000 à 80 000 connexions simultanées. Cependant, pendant les moments forts des matchs
            (buts, mi-temps), le réseau sera inévitablement saturé.
          </p>
          <p><strong>Nos conseils :</strong></p>
          <ul>
            <li>Téléchargez vos billets (PDF ou wallet) <strong>avant</strong> d&apos;arriver au stade</li>
            <li>Sauvegardez les plans du stade et les infos transport en mode hors ligne</li>
            <li>Utilisez le WiFi officiel du stade pour économiser votre data</li>
            <li>Évitez le streaming vidéo en direct depuis les tribunes — le réseau ne tiendra pas</li>
            <li>Privilégiez les messages texte aux appels vocaux pendant les matchs</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title="Questions fréquentes sur le téléphone aux USA" items={faqItems} />
      </section>
    </>
  );
}
