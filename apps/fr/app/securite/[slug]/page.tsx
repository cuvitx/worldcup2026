import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@repo/ui/breadcrumb";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { cities } from "@repo/data/cities";
import { Shield, AlertTriangle, Phone, Moon, HeartPulse, MapPin } from "lucide-react";
import Link from "next/link";

export const revalidate = 86400;
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface CitySecurityData {
  slug: string;
  name: string;
  country: string;
  score: number;
  safeAreas: string[];
  avoidAreas: string[];
  emergencyNumber: string;
  emergencyLabel: string;
  nightTransport: string[];
  tips: string[];
}

const securityData: Record<string, CitySecurityData> = {
  "new-york-new-jersey": {
    slug: "new-york-new-jersey",
    name: "New York / New Jersey",
    country: "USA",
    score: 7,
    safeAreas: ["Midtown Manhattan", "Upper West Side", "Williamsburg", "Hoboken (NJ)", "Times Square (très surveillé)"],
    avoidAreas: ["East New York (Brooklyn)", "Brownsville", "South Bronx la nuit", "Certaines zones de Newark (NJ)"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["Métro 24h/24 (éviter les wagons vides après minuit)", "Uber/Lyft disponibles partout", "NJ Transit vers le MetLife Stadium"],
    tips: ["Le métro est globalement sûr mais restez vigilant la nuit", "Pickpockets actifs dans le métro aux heures de pointe", "Times Square : arnaqueurs déguisés en personnages"],
  },
  "dallas-fort-worth": {
    slug: "dallas-fort-worth",
    name: "Dallas-Fort Worth",
    country: "USA",
    score: 7,
    safeAreas: ["Uptown Dallas", "Highland Park", "Southlake", "Downtown Fort Worth"],
    avoidAreas: ["South Dallas la nuit", "Certains quartiers de Fair Park", "Pleasant Grove"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["DART (ferme vers minuit)", "Uber/Lyft", "La voiture reste le moyen principal"],
    tips: ["Ville très étendue — un véhicule est quasi indispensable", "Chaleur extrême en été : risque de déshydratation", "Quartier Deep Ellum animé mais rester vigilant tard le soir"],
  },
  miami: {
    slug: "miami",
    name: "Miami",
    country: "USA",
    score: 6,
    safeAreas: ["South Beach", "Brickell", "Coral Gables", "Coconut Grove", "Wynwood (en journée)"],
    avoidAreas: ["Overtown la nuit", "Liberty City", "Little Haiti (certaines zones)", "Opa-locka"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["Metrorail (ferme à minuit)", "Uber/Lyft très répandus", "Miami Beach Trolley (gratuit)"],
    tips: ["Pickpockets actifs à South Beach", "Ne laissez rien de visible dans votre voiture", "Orages tropicaux fréquents en soirée en été"],
  },
  atlanta: {
    slug: "atlanta",
    name: "Atlanta",
    country: "USA",
    score: 6,
    safeAreas: ["Midtown", "Buckhead", "Virginia-Highland", "Decatur", "Inman Park"],
    avoidAreas: ["Bankhead la nuit", "Vine City (en dehors des matchs)", "English Avenue", "Certains secteurs de College Park"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["MARTA (métro, ferme vers 1h)", "Uber/Lyft", "Bus MARTA sur certaines lignes de nuit"],
    tips: ["Le stade Mercedes-Benz est en centre-ville, zone bien surveillée les soirs de match", "Atlanta s'étend beaucoup — évitez de marcher seul dans des quartiers peu éclairés"],
  },
  seattle: {
    slug: "seattle",
    name: "Seattle",
    country: "USA",
    score: 8,
    safeAreas: ["Capitol Hill", "Queen Anne", "Ballard", "Fremont", "Pioneer Square (en journée)"],
    avoidAreas: ["3rd Avenue downtown (drogue/sans-abris)", "Certaines zones de Rainier Valley la nuit"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["Link Light Rail", "Uber/Lyft", "Bus King County Metro (réseau étendu)"],
    tips: ["Ville globalement très sûre", "Pluie fréquente même en été — prévoir un imperméable", "Le quartier de Pioneer Square peut être inconfortable la nuit"],
  },
  houston: {
    slug: "houston",
    name: "Houston",
    country: "USA",
    score: 6,
    safeAreas: ["The Heights", "Montrose", "Rice Village", "Museum District", "Midtown"],
    avoidAreas: ["Third Ward (certains secteurs)", "Sunnyside", "Greenspoint (surnommé 'Gunspoint')"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["METRORail (limité)", "Uber/Lyft indispensables", "La voiture est reine à Houston"],
    tips: ["Chaleur et humidité extrêmes en été", "Ville gigantesque — ne sous-estimez pas les distances", "Les quartiers changent vite d'un block à l'autre"],
  },
  philadelphia: {
    slug: "philadelphia",
    name: "Philadelphie",
    country: "USA",
    score: 6,
    safeAreas: ["Center City", "Old City", "Rittenhouse Square", "University City", "Fishtown"],
    avoidAreas: ["North Philadelphia (Kensington)", "Certaines parties de West Philadelphia la nuit"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["SEPTA (métro + bus)", "Uber/Lyft", "NJ Transit et PATCO vers le NJ"],
    tips: ["Centre-ville très walkable et agréable", "Kensington Avenue : à éviter absolument", "Les fans de Philly sont passionnés — ambiance garantie mais intense"],
  },
  "kansas-city": {
    slug: "kansas-city",
    name: "Kansas City",
    country: "USA",
    score: 7,
    safeAreas: ["Country Club Plaza", "Westport", "River Market", "Brookside", "Crossroads Arts District"],
    avoidAreas: ["East Kansas City (au-delà de Prospect Ave)", "Certaines zones du Northeast la nuit"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["KC Streetcar (gratuit, limité)", "Uber/Lyft", "Bus RideKC"],
    tips: ["Ville accueillante et abordable", "Le BBQ est une religion ici — profitez-en", "Le stade Arrowhead est excentré, prévoyez le transport"],
  },
  boston: {
    slug: "boston",
    name: "Boston",
    country: "USA",
    score: 8,
    safeAreas: ["Back Bay", "Beacon Hill", "Cambridge", "North End", "Seaport District"],
    avoidAreas: ["Roxbury (certains secteurs la nuit)", "Mattapan", "Dorchester (prudence le soir)"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["MBTA (le T) — ferme vers 0h30", "Uber/Lyft", "Ville compacte et walkable"],
    tips: ["Ville universitaire très sûre globalement", "Le T ferme tôt — prévoyez un VTC pour les retours tardifs", "Excellente ambiance soccer grâce aux New England Revolution"],
  },
  "san-francisco-bay-area": {
    slug: "san-francisco-bay-area",
    name: "San Francisco / Bay Area",
    country: "USA",
    score: 7,
    safeAreas: ["Marina", "Pacific Heights", "Nob Hill", "Castro", "Hayes Valley"],
    avoidAreas: ["Tenderloin", "Certaines parties de Mission la nuit", "Civic Center (campements)"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["BART (ferme vers minuit)", "Muni (bus de nuit limités)", "Uber/Lyft"],
    tips: ["Le Tenderloin en centre-ville peut choquer — sans-abris et drogue ouverte", "San Francisco est frais même en été (15-20°C) — prenez une veste", "Le stade Levi's est à Santa Clara, 1h au sud — prévoir le transport"],
  },
  "los-angeles": {
    slug: "los-angeles",
    name: "Los Angeles",
    country: "USA",
    score: 6,
    safeAreas: ["Santa Monica", "West Hollywood", "Beverly Hills", "Pasadena", "Silver Lake"],
    avoidAreas: ["Skid Row (downtown)", "Compton", "South LA (certaines zones)", "Hollywood Blvd la nuit (arnaqueurs)"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (USA)",
    nightTransport: ["Metro Rail (limité)", "Uber/Lyft quasi indispensables", "Pas de transport fiable de nuit"],
    tips: ["LA est immense — les distances sont trompeuses", "La voiture/VTC est quasi obligatoire", "Le SoFi Stadium est à Inglewood, bien desservi les soirs de match"],
  },
  "mexico-city": {
    slug: "mexico-city",
    name: "Mexico",
    country: "Mexique",
    score: 6,
    safeAreas: ["Polanco", "Roma", "Condesa", "Coyoacán", "Santa Fe"],
    avoidAreas: ["Tepito", "Doctores la nuit", "Iztapalapa", "Certaines parties de Naucalpan"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (Mexique)",
    nightTransport: ["Metro CDMX (éviter aux heures de pointe)", "Uber très répandu", "Taxi Sitio (officiels, plus sûrs)"],
    tips: ["Altitude 2 240 m : essoufflement et alcool qui monte vite les premiers jours", "Utilisez uniquement des taxis officiels ou Uber", "Eau : ne buvez que de l'eau en bouteille"],
  },
  guadalajara: {
    slug: "guadalajara",
    name: "Guadalajara",
    country: "Mexique",
    score: 7,
    safeAreas: ["Zona Centro", "Zapopan Centro", "Chapultepec", "Providencia", "Tlaquepaque"],
    avoidAreas: ["Oblatos la nuit", "Certaines zones périphériques de Tonalá"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (Mexique)",
    nightTransport: ["Macrobús et Mi Tren", "Uber très utilisé", "Taxis de sitio"],
    tips: ["Ville agréable et touristique", "Berceau du mariachi et de la tequila — ambiance garantie", "Attention aux pickpockets dans les transports bondés"],
  },
  monterrey: {
    slug: "monterrey",
    name: "Monterrey",
    country: "Mexique",
    score: 6,
    safeAreas: ["San Pedro Garza García", "Valle Oriente", "Barrio Antiguo", "Cumbres"],
    avoidAreas: ["Zones périphériques éloignées la nuit", "Certains secteurs de Guadalupe"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (Mexique)",
    nightTransport: ["Metrorrey", "Uber", "Taxis de sitio"],
    tips: ["Ville industrielle prospère, globalement sûre au centre", "Chaleur intense en été (40°C+)", "San Pedro Garza García est l'un des quartiers les plus sûrs du Mexique"],
  },
  toronto: {
    slug: "toronto",
    name: "Toronto",
    country: "Canada",
    score: 8,
    safeAreas: ["Downtown Core", "Yorkville", "Distillery District", "The Annex", "Queen West"],
    avoidAreas: ["Jane and Finch (la nuit)", "Regent Park (en amélioration)", "Certaines parties de Scarborough"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (Canada)",
    nightTransport: ["TTC (métro ferme vers 1h30, bus de nuit Blue Night)", "UP Express vers l'aéroport", "Uber/Lyft"],
    tips: ["Ville très multiculturelle et accueillante", "L'une des villes les plus sûres d'Amérique du Nord", "Les supporters de Toronto FC créent une ambiance incroyable au BMO Field"],
  },
  vancouver: {
    slug: "vancouver",
    name: "Vancouver",
    country: "Canada",
    score: 8,
    safeAreas: ["West End", "Kitsilano", "Gastown", "Yaletown", "North Vancouver"],
    avoidAreas: ["Downtown Eastside (Hastings St) — drogue et sans-abris", "Quartier Strathcona la nuit"],
    emergencyNumber: "911",
    emergencyLabel: "Appeler le 911 (Canada)",
    nightTransport: ["SkyTrain (ferme vers 1h15)", "Bus TransLink de nuit", "Uber/Lyft"],
    tips: ["Ville magnifique et très sûre globalement", "Downtown Eastside peut choquer — situation sociale difficile mais pas dangereuse pour les passants", "Climat doux en été (20-25°C)"],
  },
};

export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = securityData[slug];
  if (!data) return {};

  return {
    title: `Sécurité à ${data.name} — CDM 2026 : est-ce dangereux ?`,
    description: `Guide sécurité pour les supporters français à ${data.name} pendant la Coupe du Monde 2026. Score ${data.score}/10, quartiers sûrs et à éviter, numéros d'urgence.`,
    openGraph: {
      title: `Est-ce dangereux à ${data.name} ? — CDM 2026`,
      description: `Score sécurité ${data.score}/10 · Quartiers sûrs et à éviter · Numéros d'urgence · Transport de nuit`,
      url: `${domains.fr}/securite/${slug}`,
      },
    alternates: { canonical: `https://www.cdm2026.fr/securite/${slug}` },
  };
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-green-500" : score >= 6 ? "bg-yellow-500" : "bg-red-500";
  const label = score >= 8 ? "Très sûr" : score >= 6 ? "Correct" : "Vigilance requise";
  return (
    <div className="flex items-center gap-3">
      <div className={`${color} text-white font-extrabold text-2xl w-14 h-14 rounded-xl flex items-center justify-center`}>
        {score}
      </div>
      <div>
        <p className="font-bold text-lg">{label}</p>
        <p className="text-sm text-gray-500">Score sécurité / 10</p>
      </div>
    </div>
  );
}

export default async function SecuriteCityPage({ params }: PageProps) {
  const { slug } = await params;
  const data = securityData[slug];
  if (!data) notFound();

  const faqItems = [
    {
      question: `${data.name} est-elle dangereuse pour les touristes ?`,
      answer: `Avec un score de ${data.score}/10, ${data.name} est ${data.score >= 8 ? "une destination très sûre" : data.score >= 6 ? "une destination correcte en termes de sécurité" : "une ville qui nécessite une vigilance particulière"}. Comme dans toute grande ville, il suffit d'éviter certains quartiers la nuit et de rester vigilant dans les transports et les lieux touristiques.`,
    },
    {
      question: `Quel numéro appeler en cas d'urgence à ${data.name} ?`,
      answer: `Le numéro d'urgence est le ${data.emergencyNumber}. Ce numéro fonctionne pour la police, les pompiers et les urgences médicales. Depuis un téléphone français, vous pouvez aussi contacter le consulat de France.`,
    },
    {
      question: "Faut-il une assurance voyage ?",
      answer: `Oui, c'est fortement recommandé, surtout pour ${data.country === "USA" ? "les États-Unis où les frais médicaux sont extrêmement élevés (une simple consultation aux urgences peut coûter 3 000 à 5 000 $)" : data.country === "Mexique" ? "le Mexique où la qualité des soins varie selon les établissements" : "le Canada où les soins ne sont pas gratuits pour les non-résidents"}. Une assurance voyage couvrant les frais médicaux, le rapatriement et l'annulation est indispensable.`,
    },
  ];

  return (
    <>
<Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Sécurité", href: "/securite" },
          { label: data.name },
        ]}
      />

      {/* Hero */}
      <section className="hero-animated text-white py-14 sm:py-20">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2">Sécurité Supporter</p>
          <h1 className="text-2xl font-extrabold sm:text-4xl">
            Est-ce dangereux de supporter à {data.name} ?
          </h1>
          <p className="mt-3 max-w-2xl text-gray-300">
            Guide sécurité complet pour les supporters français : quartiers, transports, urgences et conseils pratiques.
          </p>
        </div>
      </section>

      {/* Score */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        <ScoreBadge score={data.score} />
      </section>

      {/* Safe & Avoid areas */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Quartiers sûrs
            </h2>
            <ul className="space-y-2">
              {data.safeAreas.map((a) => (
                <li key={a} className="flex gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Quartiers à éviter
            </h2>
            <ul className="space-y-2">
              {data.avoidAreas.map((a) => (
                <li key={a} className="flex gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Emergency */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-[#022149] text-white p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#D4AF37]" />
            Numéros d&apos;urgence
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#00B865]">911</p>
              <p className="text-sm text-gray-300 mt-1">USA (police, pompiers, SAMU)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#00B865]">911</p>
              <p className="text-sm text-gray-300 mt-1">Canada (police, pompiers, SAMU)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-extrabold text-[#00B865]">911</p>
              <p className="text-sm text-gray-300 mt-1">Mexique (police, pompiers, SAMU)</p>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Consulat de France aux USA : +1 202-944-6000 | Canada : +1 613-789-1795 | Mexique : +52 55 9171 9700
          </p>
        </div>
      </section>

      {/* Night transport */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Moon className="inline-block w-6 h-6 mr-2 text-[#D4AF37]" />
          Transport de nuit
        </h2>
        <ul className="space-y-3">
          {data.nightTransport.map((t) => (
            <li key={t} className="flex gap-3 text-gray-700">
              <Moon className="w-5 h-5 text-[#00B865] shrink-0 mt-0.5" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-xl font-bold sm:text-2xl text-[#022149] mb-6">
          <Shield className="inline-block w-6 h-6 mr-2 text-[#00B865]" />
          Conseils pratiques
        </h2>
        <div className="space-y-3">
          {data.tips.map((tip) => (
            <div key={tip} className="flex gap-3 text-gray-700">
              <Shield className="w-5 h-5 text-[#00B865] shrink-0 mt-0.5" />
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <HeartPulse className="w-10 h-10 text-[#00B865] mx-auto mb-3" />
          <h3 className="font-bold text-lg mb-2">Assurance voyage recommandée</h3>
          <p className="text-sm text-gray-600 mb-4">
            {data.country === "USA"
              ? "Aux États-Unis, une simple visite aux urgences peut coûter 3 000 à 10 000 $. Ne partez pas sans assurance."
              : data.country === "Mexique"
                ? "Au Mexique, les soins de qualité sont accessibles mais coûteux pour les étrangers. Une assurance est vivement recommandée."
                : "Au Canada, les soins ne sont pas gratuits pour les non-résidents. Prévoyez une couverture adaptée."}
          </p>
          <Link
            href="/voyage/assurance"
            className="inline-block bg-accent text-white rounded-xl py-3.5 px-8 font-semibold hover:opacity-90 transition-opacity"
          >
            Comparer les assurances voyage
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-16">
        <FAQSection title={`Sécurité à ${data.name} — FAQ`} items={faqItems} />
      </section>
    </>
  );
}
