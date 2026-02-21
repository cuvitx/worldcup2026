import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { Plane, Clock, MapPin, ArrowRight, Calendar, DollarSign, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Vols pour la Coupe du Monde 2026 — Compagnies, prix, aéroports | CDM 2026",
  description:
    "Guide des vols pour la Coupe du Monde 2026 : compagnies depuis Paris, prix par destination, aéroports et astuces pour voyager malin.",
  openGraph: {
    title: "Guide des vols CDM 2026 — Prix, compagnies, aéroports",
    description: "Trouvez les meilleurs vols pour la Coupe du Monde 2026 aux USA, Canada et Mexique.",
    url: "https://cdm2026.fr/vols",
  },
  alternates: { canonical: "https://cdm2026.fr/vols" },
};

const destinations = [
  {
    ville: "New York",
    aeroports: "JFK (principal), Newark (EWR)",
    compagnies: "Air France, Delta, United, Norse Atlantic",
    prixRange: "600 – 1 200 €",
    duree: "8h – 8h30 direct",
    stadeProche: "MetLife Stadium (East Rutherford, NJ)",
  },
  {
    ville: "Miami",
    aeroports: "MIA (Miami International)",
    compagnies: "Air France, American Airlines",
    prixRange: "650 – 1 300 €",
    duree: "10h – 10h30 direct",
    stadeProche: "Hard Rock Stadium",
  },
  {
    ville: "Los Angeles",
    aeroports: "LAX (Los Angeles International)",
    compagnies: "Air France, Delta, United, French Bee",
    prixRange: "700 – 1 400 €",
    duree: "11h – 11h30 direct",
    stadeProche: "SoFi Stadium (Inglewood)",
  },
  {
    ville: "Houston",
    aeroports: "IAH (George Bush Intercontinental)",
    compagnies: "United (direct), Air France via connexion",
    prixRange: "700 – 1 300 €",
    duree: "10h30 direct / 13h+ avec escale",
    stadeProche: "NRG Stadium",
  },
  {
    ville: "Mexico",
    aeroports: "MEX (Benito Juárez International)",
    compagnies: "Air France, Aeroméxico",
    prixRange: "500 – 900 €",
    duree: "12h – 12h30 direct",
    stadeProche: "Estadio Azteca",
  },
  {
    ville: "Dallas",
    aeroports: "DFW (Dallas/Fort Worth)",
    compagnies: "American Airlines (direct), Air France via CDG→DFW",
    prixRange: "650 – 1 200 €",
    duree: "10h30 direct",
    stadeProche: "AT&T Stadium (Arlington)",
  },
  {
    ville: "San Francisco",
    aeroports: "SFO (San Francisco International)",
    compagnies: "Air France, United (direct)",
    prixRange: "700 – 1 400 €",
    duree: "11h30 direct",
    stadeProche: "Levi's Stadium (Santa Clara)",
  },
  {
    ville: "Toronto / Vancouver",
    aeroports: "YYZ (Toronto Pearson), YVR (Vancouver)",
    compagnies: "Air France, Air Canada, Air Transat",
    prixRange: "500 – 1 000 €",
    duree: "7h30 (Toronto) / 10h (Vancouver)",
    stadeProche: "BMO Field (Toronto)",
  },
];

const conseilsReservation = [
  { timing: "9-12 mois avant", conseil: "Meilleur moment pour réserver. Les vols sont en vente et les prix au plus bas." },
  { timing: "6-9 mois avant", conseil: "Bon timing encore. Comparez Air France direct vs low-cost avec escale." },
  { timing: "3-6 mois avant", conseil: "Prix en hausse. Activez les alertes Google Flights et Skyscanner." },
  { timing: "< 3 mois avant", conseil: "Tarifs élevés (+50-100%). Cherchez des vols avec escale ou des dates flexibles." },
];

const faqItems = [
  {
    question: "Quelle est la meilleure période pour réserver ses vols CDM 2026 ?",
    answer:
      "Idéalement 9 à 12 mois avant le tournoi, soit dès septembre-octobre 2025. Les prix augmentent significativement à mesure que la compétition approche. Utilisez les alertes Google Flights pour être notifié des baisses de prix.",
  },
  {
    question: "Vaut-il mieux un vol direct ou avec escale ?",
    answer:
      "Un vol direct est plus confortable mais 30-50% plus cher. Si votre budget est serré, une escale à Dublin, Reykjavik ou Londres peut faire économiser 200-400 €. Privilégiez les escales courtes (< 3h) pour éviter la fatigue.",
  },
  {
    question: "French Bee est-elle fiable pour les vols vers les USA ?",
    answer:
      "Oui, French Bee (filiale du groupe Dubreuil) propose des vols low-cost Paris-Orly → Los Angeles, Miami et San Francisco à des prix compétitifs (à partir de 300 € l'aller). Le confort est correct pour du long-courrier économique.",
  },
  {
    question: "Puis-je prendre un vol intérieur aux USA entre deux matchs ?",
    answer:
      "Oui, les vols intérieurs américains sont fréquents et abordables (60-200 $ avec Southwest, Spirit, JetBlue). Réservez 2-4 semaines à l'avance. Attention : chaque vol intérieur passe par la sécurité TSA (arrivez 2h avant).",
  },
];

export default function VolsPage() {
  const breadcrumbItems = [{ label: "Accueil", href: "/" }, { label: "Vols CDM 2026" }];
  const schemaItems = [
    { name: "Accueil", url: "/" },
    { name: "Vols CDM 2026", url: "/vols" },
  ];


  return (
    <>
      <BreadcrumbSchema items={schemaItems} baseUrl={domains.fr} />
      <Breadcrumb items={breadcrumbItems} />

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-secondary uppercase tracking-widest mb-2">
            Transport
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            Guide des vols CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Compagnies directes depuis Paris, prix moyens, aéroports par ville : trouvez le meilleur vol
            pour la Coupe du Monde 2026.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Destinations */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-6 flex items-center gap-3">
            <Plane className="h-7 w-7 text-accent" /> Vols depuis Paris par destination
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <div
                key={d.ville}
                className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-accent" /> {d.ville}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{d.aeroports}</p>
                <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <p><strong>Compagnies :</strong> {d.compagnies}</p>
                  <p><strong>Prix A/R :</strong> <span className="text-accent font-semibold">{d.prixRange}</span></p>
                  <p><strong>Durée :</strong> {d.duree}</p>
                  <p><strong>Stade :</strong> {d.stadeProche}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quand réserver */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <Calendar className="h-7 w-7 text-accent" /> Quand réserver ses vols ?
          </h2>
          <div className="space-y-3">
            {conseilsReservation.map((c) => (
              <div
                key={c.timing}
                className="flex gap-4 items-start rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4"
              >
                <span className="inline-flex items-center justify-center rounded-lg bg-accent/10 text-accent font-bold px-3 py-1 text-sm whitespace-nowrap">
                  {c.timing}
                </span>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{c.conseil}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Astuces */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <DollarSign className="h-7 w-7 text-accent" /> Astuces pour payer moins cher
          </h2>
          <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
              <li className="flex gap-2"><span className="text-accent font-bold">1.</span><span>Utilisez la navigation privée pour éviter les cookies qui font monter les prix.</span></li>
              <li className="flex gap-2"><span className="text-accent font-bold">2.</span><span>Comparez sur Google Flights, Skyscanner ET directement sur le site de la compagnie.</span></li>
              <li className="flex gap-2"><span className="text-accent font-bold">3.</span><span>Réservez un mardi ou mercredi — les prix sont statistiquement plus bas.</span></li>
              <li className="flex gap-2"><span className="text-accent font-bold">4.</span><span>Envisagez un vol open-jaw (arriver à NYC, repartir de LA) pour économiser un vol interne.</span></li>
              <li className="flex gap-2"><span className="text-accent font-bold">5.</span><span>Les vols French Bee ou PLAY (via Reykjavik) offrent des tarifs 30-40% inférieurs.</span></li>
            </ul>
          </div>
        </section>

        {/* Comparateurs sponsorisés */}
        <section>
          <h2 className="text-2xl font-bold text-primary dark:text-white mb-4 flex items-center gap-3">
            <ExternalLink className="h-7 w-7 text-accent" /> Comparer les vols
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.skyscanner.fr/"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
            >
              Skyscanner <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://www.google.com/travel/flights"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
            >
              Google Flights <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://www.kayak.fr/"
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center gap-2 border border-gray-300 dark:border-slate-600 rounded-xl py-3.5 px-6 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              Kayak <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/budget"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Budget CDM 2026 <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/supporter-francais-usa"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Guide supporter français
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
