import type { Metadata } from "next";
import Link from "next/link";
import { FAQSection } from "@repo/ui/faq-section";
import { Wifi, Signal, Smartphone, ArrowRight, Tv, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "WiFi et connectivité dans les stades CDM 2026 — Guide complet",
  description:
    "WiFi gratuit FIFA, réseau 5G, conseils pour streamer en live depuis les stades de la Coupe du Monde 2026. Apps utiles et couverture par ville.",
  openGraph: {
    title: "Connectivité stades CDM 2026 — WiFi, 5G et apps",
    description: "Restez connecté pendant les matchs : WiFi FIFA, 5G, apps utiles.",
    url: "https://www.cdm2026.fr/voyage/wifi-stades",
  },
  alternates: { canonical: "https://www.cdm2026.fr/voyage/wifi-stades" },
};

const stades5g = [
  { ville: "New York (MetLife)", wifi: " WiFi FIFA", reseau5g: " T-Mobile, Verizon, AT&T", note: "Excellente couverture, zone urbaine dense" },
  { ville: "Los Angeles (SoFi)", wifi: " WiFi FIFA", reseau5g: " 5G natif SoFi (partenariat)", note: "Le stade le plus connecté au monde (inauguré 2020)" },
  { ville: "Miami (Hard Rock)", wifi: " WiFi FIFA", reseau5g: " T-Mobile, AT&T", note: "Rénové récemment, bon réseau" },
  { ville: "Houston (NRG)", wifi: " WiFi FIFA", reseau5g: " Verizon, AT&T", note: "Stade couvert, signal stable" },
  { ville: "Dallas (AT&T)", wifi: " WiFi FIFA", reseau5g: " AT&T (stade propriétaire)", note: "Infrastructure premium, partenaire réseau" },
  { ville: "Mexico (Azteca)", wifi: " WiFi FIFA", reseau5g: " 5G limité (Telcel en déploiement)", note: "Réseau 4G LTE correct, 5G partiel" },
  { ville: "Toronto (BMO)", wifi: " WiFi FIFA", reseau5g: " Rogers, Bell", note: "Bonne couverture canadienne" },
  { ville: "San Francisco (Levi's)", wifi: " WiFi FIFA", reseau5g: " Tous opérateurs", note: "Silicon Valley = excellente infra" },
];

const appsUtiles = [
  { nom: "FIFA+", desc: "App officielle FIFA — stats live, replays, highlights, billets numériques. Indispensable." },
  { nom: "FIFA Tickets", desc: "Gérez vos billets de match, accédez au stade via QR code." },
  { nom: "Winamax", desc: "Paris sportifs en direct depuis le stade. Cotes live et cashout. 🔞 18+" },
  { nom: "Betclic", desc: "Alternative paris sportifs avec bonus CDM. Cotes compétitives. 🔞 18+" },
  { nom: "Google Translate", desc: "Traduction instantanée anglais/espagnol, utile au quotidien." },
  { nom: "Uber / Lyft", desc: "Transport depuis/vers les stades. Indispensable aux USA." },
  { nom: "Google Maps", desc: "Navigation GPS, horaires transports en commun, estimation temps trajet." },
];

const conseilsLive = [
  "Téléchargez vos apps et mises à jour AVANT d'arriver au stade (le WiFi saturera en début de match)",
  "Utilisez le WiFi FIFA pour les messages/réseaux sociaux, la 5G pour le streaming vidéo",
  "Mode avion + WiFi = économise la batterie tout en restant connecté",
  "Évitez les lives vidéo pendant les moments clés (but, penalty) — le réseau sature",
  "Privilégiez les stories courtes plutôt que le live continu",
  "Si le réseau est saturé, envoyez vos messages en mode texte/photo plutôt que vidéo",
  "Une batterie externe de 10 000+ mAh est indispensable (un match + trajet = 40-60% de batterie)",
];

const faqItems = [
  {
    question: "Y aura-t-il du WiFi gratuit dans les stades CDM 2026 ?",
    answer:
      "Oui, la FIFA fournit traditionnellement du WiFi gratuit dans tous les stades lors de ses compétitions majeures. Le réseau sera disponible dans les tribunes, les zones de restauration et les abords du stade. Attendez-vous cependant à des ralentissements lors des moments forts du match.",
  },
  {
    question: "Ma carte SIM française fonctionnera-t-elle dans les stades ?",
    answer:
      "Oui, si votre forfait inclut le roaming USA. Les stades américains disposent d'antennes internes (DAS) pour tous les opérateurs. Une eSIM locale (T-Mobile, AT&T) offre de meilleures performances et des coûts prévisibles.",
  },
  {
    question: "Puis-je streamer un match en direct depuis le stade ?",
    answer:
      "Techniquement oui, mais la qualité sera variable. Les réseaux saturent quand 60 000+ personnes se connectent simultanément. Les stories courtes ou les photos sont plus fiables que le live streaming continu. Attention : filmer et diffuser le match lui-même est interdit par la FIFA.",
  },
  {
    question: "Les stades mexicains auront-ils la même couverture que les américains ?",
    answer:
      "La couverture sera bonne mais légèrement inférieure. Le Mexique est en cours de déploiement 5G (Telcel, AT&T Mexico). L'Estadio Azteca sera équipé en WiFi FIFA comme tous les stades, mais la 5G pourrait être limitée. Prévoyez une carte SIM Telcel locale.",
  },
];

export default function WifiStadesPage() {
return (
    <>

      <section className="hero-animated text-white py-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-2">
            Tech & connectivité
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-6xl mb-4">
            WiFi & 5G dans les stades CDM 2026
          </h1>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto">
            Restez connecté pendant les matchs : WiFi FIFA, couverture 5G par stade, apps utiles
            et conseils pour partager en live.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Couverture par stade */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Signal className="h-7 w-7 text-accent" /> Couverture WiFi & 5G par stade
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 font-semibold text-gray-900">Stade</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">WiFi</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">5G</th>
                  <th className="py-3 px-4 font-semibold text-gray-900">Note</th>
                </tr>
              </thead>
              <tbody>
                {stades5g.map((s) => (
                  <tr key={s.ville} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{s.ville}</td>
                    <td className="py-3 px-4 text-gray-700">{s.wifi}</td>
                    <td className="py-3 px-4 text-gray-700">{s.reseau5g}</td>
                    <td className="py-3 px-4 text-gray-500">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Conseils live */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Tv className="h-7 w-7 text-accent" /> Conseils pour partager en live
          </h2>
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <ul className="space-y-3">
              {conseilsLive.map((c, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700">
                  <span className="text-accent font-bold">{i + 1}.</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Apps utiles */}
        <section>
          <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-3">
            <Smartphone className="h-7 w-7 text-accent" /> Apps utiles à télécharger
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appsUtiles.map((app) => (
              <div
                key={app.nom}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h3 className="font-bold text-gray-900">{app.nom}</h3>
                <p className="text-sm text-gray-600 mt-1">{app.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/voyage/carte-sim"
            className="inline-flex items-center gap-2 bg-accent text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-accent/90 transition-colors"
          >
            Guide carte SIM USA <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/carte-stades"
            className="inline-flex items-center gap-2 bg-primary text-white rounded-xl py-3.5 px-6 font-semibold hover:bg-primary/90 transition-colors"
          >
            Carte des stades
          </Link>
        </div>

        <FAQSection items={faqItems} />
      </div>
    </>
  );
}
