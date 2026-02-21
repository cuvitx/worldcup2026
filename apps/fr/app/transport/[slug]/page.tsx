import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { ArrowRight, Bus, Car, DollarSign, Plane, Train } from "lucide-react";
import { cities, citiesBySlug } from "@repo/data/cities";
import { stadiumsById } from "@repo/data/stadiums";
export const dynamicParams = false;
export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}
interface PageProps { params: Promise<{ slug: string }>; }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};
  return {
    title: `Se déplacer à ${city.name} — Transports CDM 2026`,
    description: `Guide transports à ${city.name} pour la Coupe du Monde 2026 : métro, bus, taxi, Uber, navettes, aéroport. Tarifs et conseils.`,
    alternates: { canonical: `https://www.cdm2026.fr/transport/${slug}` },
  };
}
interface TransportData {
  metro: string; bus: string; taxi: string; rideshare: string;
  airportName: string; airportTransfer: string; airportCost: string;
  carRental: string; shuttleInfo: string;
  dailyPassCost: string; taxiAvgCost: string;
}
function getTransportData(slug: string, country: string): TransportData {
  const isMexico = country === "Mexico";
  const isCanada = country === "Canada";
  const currency = isMexico ? "MXN" : isCanada ? "CAD" : "$";
  const transports: Record<string, TransportData> = {
    "new-york-new-jersey": { metro: "Le métro de New York (MTA) fonctionne 24h/24 avec 472 stations. Tarif unique : 2,90$. MetroCard ou OMNY (paiement sans contact) acceptés.", bus: "Réseau de bus MTA extensif. NJ Transit relie Manhattan au MetLife Stadium (train + bus).", taxi: "Yellow cabs omniprésents à Manhattan. Compteur + pourboire 15-20%. Course moyenne : 15-25$.", rideshare: "Uber et Lyft très répandus. Surge pricing les jours de match. Prévoir 20-40$ vers le stade.", airportName: "JFK / Newark (EWR) / LaGuardia (LGA)", airportTransfer: "AirTrain + métro depuis JFK (8,25$ + 2,90$). NJ Transit depuis Newark (15,25$). Bus depuis LGA.", airportCost: "15-25$ en transport • 60-100$ en taxi", carRental: "Déconseillé à Manhattan (stationnement très cher). Utile pour aller au stade en NJ.", shuttleInfo: "Navettes FIFA spéciales depuis Penn Station et Port Authority les jours de match.", dailyPassCost: "2,90$ / trajet", taxiAvgCost: "15-25$" },
    "mexico-city": { metro: "Le Metro de Mexico City est l'un des moins chers au monde : 5 MXN (~0,25€) par trajet. 12 lignes, 195 stations.", bus: "Metrobús (BRT) : 6 MXN. Réseau étendu de bus urbains et minibus (peseros).", taxi: "Taxis roses réglementés. Utilisez les applications (Uber, DiDi, Beat) pour plus de sécurité. Course moyenne : 80-150 MXN.", rideshare: "Uber, DiDi et Beat très populaires. Tarifs très abordables : 50-200 MXN selon la distance.", airportName: "Aéroport International Benito Juárez (MEX)", airportTransfer: "Metrobús ligne 4 (6 MXN), taxis autorisés à l'aéroport (250-400 MXN), Uber (150-300 MXN).", airportCost: "6-400 MXN selon le mode", carRental: "Possible mais déconseillé : circulation dense, stationnement compliqué. Les transports en commun sont très efficaces.", shuttleInfo: "Navettes officielles FIFA depuis le Zócalo et Reforma vers l'Estadio Azteca.", dailyPassCost: "5 MXN / trajet", taxiAvgCost: "80-150 MXN" },
    "toronto": { metro: "TTC (Toronto Transit Commission) : métro, tramway et bus. Tarif unique : 3,35 CAD avec carte PRESTO.", bus: "Réseau de bus et streetcars (tramways historiques) très dense en centre-ville.", taxi: "Taxis réglementés. Course moyenne : 15-25 CAD. Pourboire 15%.", rideshare: "Uber et Lyft bien implantés. 15-30 CAD en moyenne.", airportName: "Toronto Pearson (YYZ)", airportTransfer: "UP Express (train, 25 min, 12,35 CAD), bus TTC 192 (3,35 CAD), taxi (55-65 CAD).", airportCost: "3,35-65 CAD selon le mode", carRental: "Pratique pour explorer l'Ontario. Parking en centre-ville : 20-40 CAD/jour.", shuttleInfo: "Navettes CDM 2026 prévues depuis Union Station vers le BMO Field.", dailyPassCost: "3,35 CAD / trajet", taxiAvgCost: "15-25 CAD" },
    "vancouver": { metro: "SkyTrain (3 lignes automatisées) + SeaBus. Tarif zone : 3,15-4,70 CAD avec carte Compass.", bus: "TransLink opère bus et SkyTrain. Bonne couverture de la métropole.", taxi: "Taxis disponibles mais moins nombreux qu'à Toronto. Course : 12-25 CAD.", rideshare: "Uber et Lyft disponibles depuis 2020. 12-25 CAD en moyenne.", airportName: "Vancouver International (YVR)", airportTransfer: "Canada Line (SkyTrain, 25 min, 4,70 CAD + 5$ supplément aéroport).", airportCost: "10-40 CAD selon le mode", carRental: "Utile pour explorer la Colombie-Britannique. Parking centre-ville : 15-30 CAD/jour.", shuttleInfo: "Navettes CDM depuis Waterfront Station vers BC Place les jours de match.", dailyPassCost: "3,15-4,70 CAD", taxiAvgCost: "12-25 CAD" },
  };
  return transports[slug] ?? {
    metro: `Réseau de transport en commun local (métro/tram/light rail). Tarif moyen : ${isMexico ? "5-10 MXN" : isCanada ? "3-4 CAD" : "2-3$"}.`,
    bus: "Réseau de bus urbains couvrant les principaux axes. Fréquence renforcée les jours de match.",
    taxi: `Taxis disponibles en ville. Course moyenne : ${isMexico ? "80-200 MXN" : isCanada ? "15-30 CAD" : "15-30$"}.`,
    rideshare: `Uber et Lyft disponibles. Tarif moyen : ${isMexico ? "50-150 MXN" : isCanada ? "12-25 CAD" : "12-25$"}.`,
    airportName: `Aéroport international de ${citiesBySlug[slug]?.name ?? "la ville"}`,
    airportTransfer: "Transport en commun, taxi ou navette disponibles depuis l'aéroport.",
    airportCost: `${isMexico ? "50-500 MXN" : isCanada ? "5-60 CAD" : "5-80$"} selon le mode`,
    carRental: "Location de voiture possible à l'aéroport et en ville. Stationnement variable.",
    shuttleInfo: "Des navettes spéciales CDM 2026 seront mises en place les jours de match.",
    dailyPassCost: `${isMexico ? "5-10 MXN" : isCanada ? "3-5 CAD" : "2-3$"}`,
    taxiAvgCost: `${isMexico ? "80-200 MXN" : isCanada ? "15-30 CAD" : "15-30$"}`,
  };
}
export default async function TransportPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();
  const transport = getTransportData(slug, city.country);
  const cityStadiums = (city.stadiumIds ?? []).map((id) => stadiumsById[id]).filter((s): s is NonNullable<typeof s> => !!s);
const faqItems = [
    { question: `Quel est le meilleur moyen de se déplacer à ${city.name} ?`, answer: `Les transports en commun sont généralement le meilleur choix (${transport.dailyPassCost} par trajet). Complétez avec Uber/Lyft pour les trajets hors réseau.` },
    { question: `Comment aller de l'aéroport au centre de ${city.name} ?`, answer: `Depuis ${transport.airportName} : ${transport.airportTransfer} Budget : ${transport.airportCost}.` },
    { question: "Y a-t-il des navettes spéciales CDM 2026 ?", answer: transport.shuttleInfo },
    { question: `Faut-il louer une voiture à ${city.name} ?`, answer: transport.carRental },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: `Transports à ${city.name} — CDM 2026`,
    description: `Guide transports à ${city.name} pour la Coupe du Monde 2026.`,
    url: `https://www.cdm2026.fr/transport/${slug}`,
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <Bus className="inline w-8 h-8 mr-2" />
            Se déplacer à {city.name} — Transports CDM 2026
          </h1>
          <p className="text-accent mt-3 text-lg">{city.country} • Guide complet des transports</p>
        </div>
      </section>
      {/* Modes de transport */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Modes de transport</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Train className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-primary text-lg">Métro / Train</h3>
            </div>
            <p className="text-accent text-sm">{transport.metro}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Bus className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-primary text-lg">Bus</h3>
            </div>
            <p className="text-accent text-sm">{transport.bus}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-primary text-lg">Taxi</h3>
            </div>
            <p className="text-accent text-sm">{transport.taxi}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Car className="w-6 h-6 text-accent" />
              <h3 className="font-bold text-primary text-lg">Uber / Lyft</h3>
            </div>
            <p className="text-accent text-sm">{transport.rideshare}</p>
          </div>
        </div>
      </section>
      {/* Coûts moyens */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-accent" /> Coûts moyens
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Train className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-extrabold text-primary">{transport.dailyPassCost}</div>
            <div className="text-sm text-accent">Transport en commun</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Car className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-extrabold text-primary">{transport.taxiAvgCost}</div>
            <div className="text-sm text-accent">Taxi (course moyenne)</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Plane className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-xl font-extrabold text-primary">{transport.airportCost}</div>
            <div className="text-sm text-accent">Transfert aéroport</div>
          </div>
        </div>
      </section>
      {/* Depuis l'aéroport */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <Plane className="w-6 h-6 text-accent" /> Depuis l&apos;aéroport
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 text-accent">
          <p><strong className="text-primary">Aéroport :</strong> {transport.airportName}</p>
          <p><strong className="text-primary">Options :</strong> {transport.airportTransfer}</p>
          <p><strong className="text-primary">Budget :</strong> {transport.airportCost}</p>
        </div>
      </section>
      {/* Navettes CDM */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4"><Bus className="h-5 w-5 inline-block" /> Navettes spéciales CDM 2026</h2>
        <div className="bg-accent/10 rounded-xl p-6 text-accent">
          <p>{transport.shuttleInfo}</p>
          <p className="mt-2 text-sm">Les horaires et itinéraires détaillés seront annoncés par la FIFA et les autorités locales avant le tournoi.</p>
        </div>
      </section>
      {/* Location de voiture */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4"><Car className="h-5 w-5 inline-block" /> Location de voiture</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-accent">
          <p>{transport.carRental}</p>
        </div>
      </section>
      {/* Maillage */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">À découvrir aussi</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href={`/ville/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Guide {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          {cityStadiums.map((stadium) => (
            <Link key={stadium.slug} href={`/acces-stade/${stadium.slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
              <span className="font-semibold text-primary">Accès {stadium.name}</span>
              <ArrowRight className="w-5 h-5 text-accent" />
            </Link>
          ))}
          <Link href="/budget" className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Budget CDM 2026</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>
      <FAQSection title={`Questions fréquentes — Transports ${city.name}`} items={faqItems} />
    </>
  );
}