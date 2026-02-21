import type { Metadata } from "next";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Beer, ShieldCheck, Clock, MapPin, AlertTriangle } from "lucide-react";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return {
    title: "Alcool dans les stades CDM 2026 : règles et politique FIFA",
    description:
      "Peut-on boire de l'alcool dans les stades pendant la Coupe du Monde 2026 ? Politique FIFA, règles par pays, horaires de vente et types de boissons autorisés.",
    openGraph: {
      title: "Alcool dans les stades — Coupe du Monde 2026",
      description: "Politique FIFA, règles USA/Canada/Mexique, horaires et types de boissons autorisés dans les stades.",
      url: `${domains.fr}/voyage/alcool-stades`,
    },
    alternates: { canonical: "https://www.cdm2026.fr/voyage/alcool-stades" },
  };
}

const countryRules = [
  {
    country: "États-Unis (11 villes)",
    rules: [
      "Vente d'alcool autorisée dans la plupart des stades",
      "Bière, vin et cocktails prémixés disponibles aux concessions",
      "Vente stoppée à la 75e minute de jeu (règle standard NFL/MLS adaptée)",
      "Zones familiales sans alcool dans chaque stade",
      "Âge légal : 21 ans — contrôle d'identité systématique (passeport accepté)",
      "Limite habituelle : 2 boissons par achat",
    ],
  },
  {
    country: "Canada (Toronto, Vancouver)",
    rules: [
      "Vente d'alcool autorisée avec réglementation provinciale",
      "Ontario (Toronto) : arrêt de la vente après la 75e minute",
      "Colombie-Britannique (Vancouver) : règles similaires",
      "Âge légal : 19 ans (Ontario et C.-B.)",
      "Bières locales souvent mises en avant (craft beer culture)",
    ],
  },
  {
    country: "Mexique (Mexico, Guadalajara, Monterrey)",
    rules: [
      "Vente d'alcool autorisée dans les stades",
      "Bière largement dominante (Corona, Modelo, Dos Equis)",
      "Âge légal : 18 ans",
      "Ambiance festive, alcool fait partie de la culture du stade",
      "Attention aux altitudes (Mexico à 2 240 m) : l'alcool frappe plus fort",
    ],
  },
];

const faqItems = [
  {
    question: "Peut-on apporter son propre alcool dans les stades ?",
    answer:
      "Non. Tous les stades de la Coupe du Monde 2026 interdisent l'introduction de boissons alcoolisées extérieures. Seules les boissons achetées aux points de vente officiels à l'intérieur du stade sont autorisées.",
  },
  {
    question: "Combien coûte une bière dans un stade américain ?",
    answer:
      "Comptez entre 12 et 18 $ pour une bière standard (50 cl) dans les stades américains. Les bières artisanales (craft) peuvent atteindre 20 $. Au Canada et au Mexique, les prix sont généralement un peu plus bas.",
  },
  {
    question: "Que s'est-il passé au Qatar en 2022 ?",
    answer:
      "Deux jours avant le début de la Coupe du Monde 2022, le Qatar a interdit la vente d'alcool dans et autour des stades, malgré le contrat de sponsoring avec Budweiser. Seule la bière sans alcool Bud Zero était disponible. Les fans ne pouvaient consommer de l'alcool que dans les fan zones officielles et les hôtels.",
  },
  {
    question: "Faut-il une pièce d'identité pour acheter de l'alcool aux USA ?",
    answer:
      "Oui. Le contrôle d'identité est systématique, quel que soit votre âge apparent. Votre passeport est la pièce d'identité la plus fiable. La carte d'identité française n'est pas toujours reconnue. L'âge légal est de 21 ans.",
  },
  {
    question: "Y aura-t-il des zones sans alcool dans les stades ?",
    answer:
      "Oui. La FIFA prévoit des zones familiales (family-friendly zones) dans chaque stade où l'alcool n'est pas vendu ni consommé. Ces zones sont généralement signalées et surveillées.",
  },
];

export default function AlcoolStadesPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Alcool dans les stades" },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Lifestyle Supporter</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Règles sur l&apos;alcool dans les stades CDM 2026
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Après l&apos;interdiction surprise au Qatar en 2022, qu&apos;en sera-t-il en 2026 ? Bonne nouvelle : la bière fait son grand retour dans les stades.
          </p>
        </div>
      </section>

      {/* Intro + FIFA policy */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="prose prose-lg max-w-none">
          <h2 className="flex items-center gap-2">
            <Beer className="w-6 h-6 text-[#D4AF37]" />
            Politique FIFA 2026 : Budweiser de retour
          </h2>
          <p>
            La Coupe du Monde 2022 au Qatar restera dans les mémoires comme celle où la bière a été bannie des stades à
            la dernière minute. Un coup dur pour Budweiser, sponsor officiel depuis 1986, qui avait déboursé plus de
            75 millions de dollars pour ce partenariat.
          </p>
          <p>
            En 2026, la donne change radicalement. Les trois pays hôtes — États-Unis, Canada et Mexique — ont une
            culture bien ancrée de consommation d&apos;alcool lors des événements sportifs. Les stades de la NFL, de la
            MLS et de la Liga MX vendent déjà de l&apos;alcool lors de chaque match. Budweiser retrouvera sa place
            centrale avec des points de vente dédiés dans chaque enceinte.
          </p>
          <p>
            La FIFA a confirmé que la vente d&apos;alcool sera autorisée dans les 16 stades du tournoi, avec des
            réglementations adaptées aux lois locales de chaque ville hôte. Des zones sans alcool seront néanmoins
            aménagées pour les familles et les supporters qui préfèrent une ambiance sobre.
          </p>
        </div>
      </section>

      {/* Rules by country */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-8">
          <MapPin className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Règles par pays
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {countryRules.map((c) => (
            <div
              key={c.country}
              className="rounded-2xl border border-gray-200 bg-white p-6"
            >
              <h3 className="font-bold text-lg mb-4">{c.country}</h3>
              <ul className="space-y-2">
                {c.rules.map((rule) => (
                  <li key={rule} className="flex gap-2 text-sm text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-[#00B865] shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Horaires & types */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Clock className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Horaires de vente et types de boissons
        </h2>
        <div className="prose prose-lg max-w-none">
          <p>
            Dans la plupart des stades américains, la vente d&apos;alcool débute à l&apos;ouverture des portes (environ
            2 heures avant le coup d&apos;envoi) et s&apos;arrête généralement à la <strong>75e minute</strong> de jeu.
            Cette règle, héritée des ligues sportives nord-américaines, vise à limiter les comportements excessifs en
            fin de match.
          </p>
          <p>Les boissons disponibles incluent :</p>
          <ul>
            <li>
              <strong>Bières :</strong> Budweiser et Bud Light (sponsors officiels), bières locales et craft beers
            </li>
            <li>
              <strong>Vin :</strong> disponible dans certains points de vente premium
            </li>
            <li>
              <strong>Cocktails prémixés :</strong> margaritas, hard seltzers (type White Claw)
            </li>
            <li>
              <strong>Spiritueux :</strong> généralement réservés aux loges VIP et suites privées
            </li>
            <li>
              <strong>Sans alcool :</strong> Bud Zero, sodas, eau — toujours disponibles
            </li>
          </ul>
        </div>
      </section>

      {/* Warning */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800 mb-2">Rappel important</h3>
              <p className="text-sm text-amber-700">
                L&apos;ébriété manifeste peut entraîner l&apos;expulsion du stade et l&apos;annulation de votre billet
                sans remboursement. Les stades américains appliquent une politique de tolérance zéro envers les
                comportements perturbateurs liés à l&apos;alcool. Consommez de manière responsable et hydratez-vous —
                les matchs en été sous 35 °C ne pardonnent pas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title="Questions fréquentes sur l'alcool en stade" items={faqItems} />
      </section>
    </>
  );
}
