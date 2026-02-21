import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { Hotel, MapPin, ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Hébergement Coupe du Monde 2026 - Hôtels, Airbnb & Conseils | CDM 2026",
  description:
    "Guide hébergement CDM 2026 : hôtels vs Airbnb par ville hôte, fourchettes de prix, quartiers recommandés et liens de réservation.",
  openGraph: {
    title: "Hébergement CDM 2026 - Guide complet",
    description: "Où dormir pendant la Coupe du Monde 2026 ? Comparatif hôtels vs Airbnb par ville.",
    url: "https://cdm2026.fr/hebergement",
  },
  alternates: { canonical: "https://cdm2026.fr/hebergement" },
};

const villes = [
  {
    ville: "New York",
    drapeau: "🇺🇸",
    hotel: "200 - 500 €/nuit",
    airbnb: "120 - 300 €/nuit",
    quartiers: "Midtown Manhattan, Jersey City, Hoboken (plus proche du MetLife Stadium)",
    conseil: "Jersey City offre un bon compromis prix/proximité avec le stade et Manhattan.",
  },
  {
    ville: "Los Angeles",
    drapeau: "🇺🇸",
    hotel: "180 - 400 €/nuit",
    airbnb: "100 - 250 €/nuit",
    quartiers: "Downtown LA, Santa Monica, Inglewood (près du SoFi Stadium)",
    conseil: "Prévoyez une voiture ou logez près du métro. LA est très étendue.",
  },
  {
    ville: "Miami",
    drapeau: "🇺🇸",
    hotel: "180 - 450 €/nuit",
    airbnb: "110 - 280 €/nuit",
    quartiers: "South Beach, Brickell, Miami Gardens (près du Hard Rock Stadium)",
    conseil: "Miami Gardens est plus abordable et proche du stade. South Beach pour l'ambiance.",
  },
  {
    ville: "Dallas",
    drapeau: "🇺🇸",
    hotel: "120 - 300 €/nuit",
    airbnb: "80 - 200 €/nuit",
    quartiers: "Downtown Dallas, Arlington (ville du stade), Fort Worth",
    conseil: "Arlington a peu de transports en commun. Prévoyez un véhicule ou des Uber.",
  },
  {
    ville: "Mexico",
    drapeau: "🇲🇽",
    hotel: "60 - 200 €/nuit",
    airbnb: "40 - 120 €/nuit",
    quartiers: "Roma, Condesa, Polanco, Coyoacán",
    conseil: "Roma et Condesa offrent le meilleur rapport qualité/prix avec restaurants et vie nocturne.",
  },
  {
    ville: "Toronto",
    drapeau: "🇨🇦",
    hotel: "150 - 350 €/nuit",
    airbnb: "100 - 220 €/nuit",
    quartiers: "Downtown, Liberty Village, Distillery District",
    conseil: "Le réseau de transport (TTC) est efficace. Logez près d'une station de métro.",
  },
];

const faqItems = [
  {
    question: "Faut-il réserver son hébergement longtemps à l'avance ?",
    answer: "Oui, idéalement 6 à 12 mois avant le tournoi. Les hôtels proches des stades seront complets très tôt. Réservez avec annulation gratuite pour garder de la flexibilité.",
  },
  {
    question: "Hôtel ou Airbnb pour la CDM 2026 ?",
    answer: "Les deux ont des avantages. L'hôtel offre la simplicité et souvent un meilleur emplacement. L'Airbnb est moins cher (surtout pour les groupes) et permet de cuisiner. Pour un séjour long (2+ semaines), l'Airbnb est généralement plus économique.",
  },
  {
    question: "Les prix vont-ils augmenter pendant la CDM ?",
    answer: "Oui, attendez-vous à une hausse de 50 à 150% par rapport aux prix normaux, surtout dans les villes accueillant des matchs de phases finales (New York, Dallas). Réserver tôt est la meilleure stratégie.",
  },
];

export default function HebergementPage() {
  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Hébergement CDM 2026" },
        ]}
      />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <Hotel className="h-4 w-4 text-secondary" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-secondary">
              Guide pratique
            </span>
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            <span className="text-secondary">Hébergement</span> CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Hôtels, Airbnb, quartiers recommandés : tout pour trouver le meilleur
            logement pendant la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 space-y-12">
        {/* Par ville */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Guide par ville hôte
          </h2>
          <div className="space-y-4">
            {villes.map((v) => (
              <div
                key={v.ville}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {v.drapeau} {v.ville}
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div className="rounded-lg bg-gray-50-700 p-3">
                    <p className="text-xs text-gray-500 uppercase mb-1">Hôtel</p>
                    <p className="font-bold text-primary">{v.hotel}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50-700 p-3">
                    <p className="text-xs text-gray-500 uppercase mb-1">Airbnb</p>
                    <p className="font-bold text-accent">{v.airbnb}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Quartiers :</strong> {v.quartiers}
                </p>
                <p className="text-sm text-gray-600">{v.conseil}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Liens réservation */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Réserver votre hébergement
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="https://www.booking.com"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow group"
            >
              <div>
                <p className="font-semibold text-gray-900">Booking.com</p>
                <p className="text-sm text-gray-500">Hôtels, appartements, annulation gratuite</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-accent transition-colors" />
            </a>
            <a
              href="https://www.airbnb.fr"
              target="_blank"
              rel="noopener noreferrer sponsored nofollow"
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow group"
            >
              <div>
                <p className="font-semibold text-gray-900">Airbnb</p>
                <p className="text-sm text-gray-500">Logements entiers, expériences locales</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-accent transition-colors" />
            </a>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/budget"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Voir le guide budget complet
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
