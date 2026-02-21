import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAQSection } from "@repo/ui/faq-section";
import { ArrowRight, CalendarDays, Check, Clock, Lightbulb, MapPin, Music, PartyPopper, Tv, Users, UtensilsCrossed } from "lucide-react";
import { cities, citiesBySlug } from "@repo/data/cities";
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
    title: `Fan Zone à ${city.name} — CDM 2026 : Localisation, Horaires, Programme`,
    description: `Découvrez la fan zone officielle de ${city.name} pour la Coupe du Monde 2026 : emplacement, horaires, écrans géants, activités et conseils pratiques.`,
    alternates: { canonical: `https://www.cdm2026.fr/fan-zone/${slug}` },
  };
}
interface FanZoneData {
  location: string;
  address: string;
  capacity: string;
  openingHours: string;
  screens: string;
  activities: string[];
  food: string;
  access: string;
  tips: string[];
}
function getFanZoneData(slug: string): FanZoneData {
  const data: Record<string, FanZoneData> = {
    "new-york-new-jersey": {
      location: "Times Square FIFA Fan Fest",
      address: "Times Square, Broadway & 7th Ave, Manhattan, NY",
      capacity: "30 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 22h00 (hors match)",
      screens: "Écran géant LED 4K de 200m² + 6 écrans secondaires",
      activities: ["Concerts live et DJ sets", "Terrain de foot 5v5", "Zone gaming FIFA", "Espace VR immersif", "Stand de maquillage aux couleurs des équipes", "Photo booth avec trophée réplique"],
      food: "Food trucks internationaux, brasseries locales, stands de hot-dogs et pizza new-yorkaise",
      access: "Métro Times Square – 42nd St (lignes 1, 2, 3, 7, N, Q, R, W, S). Accès gratuit.",
      tips: ["Arrivez 2h avant le coup d'envoi pour les gros matchs", "Pas de sacs à dos volumineux", "Points d'eau gratuits sur place", "Attention aux pickpockets dans la foule"],
    },
    "los-angeles": {
      location: "LA Live FIFA Fan Fest",
      address: "L.A. LIVE, 800 W Olympic Blvd, Los Angeles, CA",
      capacity: "25 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant 180m² + écrans répartis dans toute la zone",
      activities: ["Concerts et spectacles", "Terrain de foot freestyle", "Zone e-sports", "Stand de customisation de maillots", "Espace photo Hollywood-style"],
      food: "Tacos, BBQ, cuisine asiatique, smoothies et açaí bowls, bières artisanales",
      access: "Metro Ligne A/E station Pico. Parking payant ($20-40). Uber recommandé.",
      tips: ["Crème solaire indispensable", "Hydratez-vous régulièrement", "Fan zone en plein air — chapeau recommandé"],
    },
    "miami": {
      location: "Bayfront Park FIFA Fan Fest",
      address: "Bayfront Park, 301 Biscayne Blvd, Miami, FL",
      capacity: "20 000 spectateurs",
      openingHours: "11h00 – 00h00 (jours de match) • 12h00 – 22h00 (hors match)",
      screens: "Écran géant LED face à la baie + 4 écrans secondaires",
      activities: ["Concerts de reggaeton et musique latine", "Tournois de beach soccer", "Zone danse et DJ", "Stand de peinture faciale", "Initiation à la salsa"],
      food: "Cuisine cubaine, ceviche, empanadas, cocktails tropicaux et bières locales",
      access: "Metromover Bayfront Park (gratuit). Bus et Metrorail à proximité. Parking limité.",
      tips: ["Averses tropicales possibles en fin de journée — imperméable utile", "Anti-moustiques recommandé le soir", "Bouteille d'eau obligatoire (chaleur intense)"],
    },
    "houston": {
      location: "Discovery Green FIFA Fan Fest",
      address: "Discovery Green, 1500 McKinney St, Houston, TX",
      capacity: "15 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant 150m² + écrans dans les zones ombragées",
      activities: ["Concerts live", "Espace gaming", "Initiation au football", "Stand de maquillage", "Activités enfants"],
      food: "BBQ texan, tacos, cuisine du Golfe, bières texanes artisanales",
      access: "METRORail station Convention District. Parking payant à proximité.",
      tips: ["Chaleur extrême — restez hydratés", "Zones ombragées et brumisateurs disponibles", "Arrivez tôt pour les meilleures places"],
    },
    "dallas-fort-worth": {
      location: "AT&T Discovery District FIFA Fan Fest",
      address: "AT&T Discovery District, 308 S Akard St, Dallas, TX",
      capacity: "15 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Mur vidéo géant 100m² intégré + écrans répartis",
      activities: ["Spectacles et musique live", "Tournois FIFA gaming", "Zone de jonglage freestyle", "Stands de marques partenaires"],
      food: "BBQ texan, tex-mex, food trucks variés, bières artisanales",
      access: "DART Light Rail station Akard. Parkings downtown ($15-30).",
      tips: ["Chaleur intense — casquette et crème solaire", "Navettes gratuites vers AT&T Stadium les jours de match", "Zones climatisées accessibles"],
    },
    "atlanta": {
      location: "Centennial Olympic Park FIFA Fan Fest",
      address: "Centennial Olympic Park, 265 Park Ave W NW, Atlanta, GA",
      capacity: "20 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant LED 200m² + écrans dans les zones annexes",
      activities: ["Concerts et DJ", "Zone de jeux interactifs", "Terrain de foot", "Espace famille et enfants", "Expositions sur l'histoire de la Coupe du Monde"],
      food: "Southern food, fried chicken, peach cobbler, BBQ, craft beers",
      access: "MARTA station GWCC/CNN Center ou Peachtree Center. Accès gratuit.",
      tips: ["À 5 min à pied du Mercedes-Benz Stadium", "Fontaines interactives pour se rafraîchir", "Ambiance exceptionnelle garantie (héritage olympique 1996)"],
    },
    "seattle": {
      location: "Seattle Center FIFA Fan Fest",
      address: "Seattle Center, 305 Harrison St, Seattle, WA",
      capacity: "18 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant avec Space Needle en toile de fond",
      activities: ["Concerts et performances", "Zone de jeux", "Terrain de foot 3v3", "Stands culturels", "Expositions au MoPOP"],
      food: "Fruits de mer du Pacifique, coffee culture, cuisine asiatique fusion",
      access: "Monorail depuis Westlake Center. Bus et Link Light Rail à proximité.",
      tips: ["Climat tempéré — veste légère pour le soir", "L'une des plus belles fan zones du tournoi (cadre Space Needle)"],
    },
    "san-francisco-bay-area": {
      location: "Embarcadero Plaza FIFA Fan Fest",
      address: "The Embarcadero, Justin Herman Plaza, San Francisco, CA",
      capacity: "15 000 spectateurs",
      openingHours: "10h00 – 22h00 (jours de match) • 12h00 – 20h00 (hors match)",
      screens: "Écran géant LED avec vue sur la baie",
      activities: ["Musique live", "Zone tech interactive (partenaires Silicon Valley)", "Terrain de foot", "Stand de maquillage"],
      food: "Cuisine californienne, burritos, fruits de mer, cafés artisanaux",
      access: "BART station Embarcadero. Muni et ferry à proximité.",
      tips: ["Brouillard matinal fréquent — couches superposables", "Températures fraîches même en été (15-22°C)", "Coupe-vent recommandé"],
    },
    "philadelphia": {
      location: "Benjamin Franklin Parkway FIFA Fan Fest",
      address: "Benjamin Franklin Parkway, Philadelphia, PA",
      capacity: "20 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant devant le Philadelphia Museum of Art",
      activities: ["Concerts", "Zone gaming", "Terrain de foot", "Stands culturels", "Course sur les marches de Rocky"],
      food: "Philly cheesesteaks, soft pretzels, craft beers, food trucks",
      access: "SEPTA stations City Hall ou Spring Garden. Bus nombreux.",
      tips: ["Cadre exceptionnel (marches de Rocky !)", "Chaleur possible — crème solaire et eau"],
    },
    "kansas-city": {
      location: "Power & Light District FIFA Fan Fest",
      address: "Power & Light District, 50 E 13th St, Kansas City, MO",
      capacity: "12 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant LED 120m²",
      activities: ["Concerts et musique live", "Zone BBQ et tailgate", "Tournois de foot", "Espace gaming"],
      food: "BBQ de Kansas City (le meilleur du monde !), craft beers, food trucks",
      access: "KC Streetcar (gratuit) arrêt Power & Light. Parkings downtown ($10-20).",
      tips: ["Ambiance tailgate unique", "BBQ à ne pas manquer", "Orages possibles — fan zone partiellement couverte"],
    },
    "boston": {
      location: "Boston Common FIFA Fan Fest",
      address: "Boston Common, 139 Tremont St, Boston, MA",
      capacity: "15 000 spectateurs",
      openingHours: "10h00 – 22h00 (jours de match) • 12h00 – 20h00 (hors match)",
      screens: "Écran géant dans le plus vieux parc public des États-Unis",
      activities: ["Concerts", "Zone de jeux", "Terrain de foot", "Expositions historiques", "Stand de lobster rolls"],
      food: "Lobster rolls, clam chowder, bières artisanales de Nouvelle-Angleterre",
      access: "MBTA stations Park Street ou Boylston (lignes verte/rouge). Accès gratuit.",
      tips: ["Ambiance chaleureuse et familiale", "Climat agréable en été", "Stade (Gillette) à 55km — navettes spéciales"],
    },
    "guadalajara": {
      location: "Plaza Liberación FIFA Fan Fest",
      address: "Plaza de la Liberación, Centro Histórico, Guadalajara, Jalisco",
      capacity: "15 000 spectateurs",
      openingHours: "11h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant avec la cathédrale de Guadalajara en toile de fond",
      activities: ["Mariachi live", "Spectacles de folklore", "Dégustation de tequila", "Zone de jeux", "Terrain de foot"],
      food: "Birria, tortas ahogadas, tequila de Jalisco, street food mexicaine",
      access: "Mi Tren et Macrobús arrêt Centro. Taxis et Uber abordables.",
      tips: ["Averses possibles en fin d'après-midi", "Ambiance mexicaine authentique garantie", "Tequila avec modération !"],
    },
    "monterrey": {
      location: "Macroplaza FIFA Fan Fest",
      address: "Macroplaza, Centro, Monterrey, Nuevo León",
      capacity: "12 000 spectateurs",
      openingHours: "11h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant avec vue sur le Cerro de la Silla",
      activities: ["Concerts norteños", "Zone de jeux", "Terrain de foot", "Stands de marques", "Espace VR"],
      food: "Cabrito, carne asada, machaca, bières locales (Carta Blanca, Bohemia)",
      access: "Metrorrey station Zaragoza. Uber abordable.",
      tips: ["Chaleur intense — hydratation essentielle", "Fan zone partiellement ombragée", "Arrivez tôt pour les meilleures places"],
    },
    "mexico": {
      location: "Zócalo FIFA Fan Fest",
      address: "Plaza de la Constitución (Zócalo), Centro Histórico, CDMX",
      capacity: "40 000 spectateurs",
      openingHours: "10h00 – 00h00 (jours de match) • 12h00 – 22h00 (hors match)",
      screens: "Écran géant LED 250m² — la plus grande fan zone du tournoi",
      activities: ["Concerts de artistes mexicains et internationaux", "Lucha libre", "Zone de street food", "Terrain de foot", "Spectacles culturels aztèques", "DJ sets"],
      food: "Tacos al pastor, elotes, tlayudas, mezcal, aguas frescas — la meilleure street food du monde",
      access: "Metro station Zócalo (ligne 2). Metrobús Eje Central. Uber peu cher.",
      tips: ["La plus grande et la plus animée des fan zones", "Altitude 2240m — hydratez-vous et adaptez-vous", "Averses en fin d'après-midi — imperméable utile", "Ambiance incomparable les soirs de match du Mexique"],
    },
    "toronto": {
      location: "Nathan Phillips Square FIFA Fan Fest",
      address: "Nathan Phillips Square, 100 Queen St W, Toronto, ON",
      capacity: "18 000 spectateurs",
      openingHours: "10h00 – 23h00 (jours de match) • 12h00 – 21h00 (hors match)",
      screens: "Écran géant devant le Toronto Sign iconique",
      activities: ["Concerts multiculturels", "Zone de jeux", "Terrain de foot", "Stands gastronomiques du monde", "Espace famille"],
      food: "Cuisine mondiale — poutine, dim sum, shawarma, jerk chicken, craft beers",
      access: "TTC stations Queen ou Osgoode. Tramway Queen St. Accès gratuit.",
      tips: ["Ville très multiculturelle — ambiance mondiale garantie", "Climat doux et agréable en été", "Photo avec le Toronto Sign !"],
    },
    "vancouver": {
      location: "Jack Poole Plaza FIFA Fan Fest",
      address: "Jack Poole Plaza, 1055 Canada Pl, Vancouver, BC",
      capacity: "15 000 spectateurs",
      openingHours: "10h00 – 22h00 (jours de match) • 12h00 – 20h00 (hors match)",
      screens: "Écran géant avec vue sur les montagnes et le port",
      activities: ["Concerts", "Zone de jeux", "Terrain de foot", "Stands des Premières Nations", "Kayak d'initiation dans le port"],
      food: "Sushi, fruits de mer du Pacifique, cuisine des Premières Nations, craft beers",
      access: "SkyTrain station Waterfront. SeaBus et bus à proximité.",
      tips: ["La plus belle fan zone du tournoi (montagnes + océan)", "Températures fraîches — veste coupe-vent", "Héritage des JO 2010 (flamme olympique sur place)"],
    },
  };
  return data[slug] ?? {
    location: `FIFA Fan Fest ${citiesBySlug[slug]?.name ?? ""}`,
    address: "Emplacement à confirmer",
    capacity: "10 000 – 20 000 spectateurs",
    openingHours: "10h00 – 23h00 (jours de match)",
    screens: "Écran géant LED + écrans secondaires",
    activities: ["Concerts et DJ", "Terrain de foot", "Zone gaming", "Stands partenaires", "Espace famille"],
    food: "Food trucks, brasseries locales et spécialités régionales",
    access: "Transports en commun et navettes spéciales disponibles",
    tips: ["Arrivez tôt les jours de gros matchs", "Vérifiez la météo avant de partir", "Accès gratuit"],
  };
}
export default async function FanZonePage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();
  const fanZone = getFanZoneData(slug);
const faqItems = [
    { question: `Où se trouve la fan zone de ${city.name} ?`, answer: `La fan zone officielle se situe à ${fanZone.location}, ${fanZone.address}. Capacité : ${fanZone.capacity}.` },
    { question: `La fan zone de ${city.name} est-elle gratuite ?`, answer: "Oui, l'accès aux FIFA Fan Fests est gratuit. Certaines activités premium peuvent être payantes." },
    { question: "Quels sont les horaires de la fan zone ?", answer: fanZone.openingHours },
    { question: "Peut-on manger et boire sur place ?", answer: `Oui ! ${fanZone.food}` },
    { question: "Comment se rendre à la fan zone ?", answer: fanZone.access },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `FIFA Fan Fest ${city.name} — Coupe du Monde 2026`,
    description: `Fan zone officielle de la Coupe du Monde 2026 à ${city.name}`,
    location: {
      "@type": "Place",
      name: fanZone.location,
      address: fanZone.address,
    },
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    organizer: { "@type": "Organization", name: "FIFA" },
  };
  return (
    <>
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            <PartyPopper className="inline w-8 h-8 mr-2" />
            Fan Zone à {city.name} — Coupe du Monde 2026
          </h1>
          <p className="text-accent mt-3 text-lg">{city.country} • {fanZone.location}</p>
        </div>
      </section>
      {/* Infos clés */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Informations essentielles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-sm font-semibold text-primary">Lieu</div>
            <div className="text-xs text-accent mt-1">{fanZone.location}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Users className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-sm font-semibold text-primary">Capacité</div>
            <div className="text-xs text-accent mt-1">{fanZone.capacity}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Clock className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-sm font-semibold text-primary">Horaires</div>
            <div className="text-xs text-accent mt-1">{fanZone.openingHours}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
            <Tv className="w-6 h-6 text-accent mx-auto mb-2" />
            <div className="text-sm font-semibold text-primary">Écrans</div>
            <div className="text-xs text-accent mt-1">{fanZone.screens}</div>
          </div>
        </div>
      </section>
      {/* Adresse et accès */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-accent" /> Adresse et accès
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <p className="text-accent"><strong className="text-primary">Adresse :</strong> {fanZone.address}</p>
          <p className="text-accent"><strong className="text-primary">Accès :</strong> {fanZone.access}</p>
          <p className="text-accent font-semibold text-sm"><Check className="h-5 w-5 inline-block" /> Entrée gratuite</p>
        </div>
      </section>
      {/* Activités */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Music className="w-6 h-6 text-accent" /> Activités et animations
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {fanZone.activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4">
              <span className="text-accent text-lg"><PartyPopper className="h-5 w-5 inline-block" /></span>
              <span className="text-accent">{activity}</span>
            </div>
          ))}
        </div>
      </section>
      {/* Restauration */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4"><UtensilsCrossed className="h-5 w-5 inline-block" /> Restauration</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-accent">
          <p>{fanZone.food}</p>
        </div>
      </section>
      {/* Conseils */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-primary mb-4"><Lightbulb className="h-5 w-5 inline-block" /> Conseils pratiques</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ul className="space-y-2">
            {fanZone.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-accent">
                <span className="text-accent mt-0.5">•</span> {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-accent/10 rounded-2xl p-8 text-center">
          <CalendarDays className="w-10 h-10 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-3">Préparez votre visite !</h2>
          <p className="text-accent max-w-xl mx-auto mb-6">
            La fan zone de {city.name} sera l&apos;un des lieux incontournables de la CDM 2026. Consultez nos autres guides pour organiser votre séjour complet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/hebergement/${slug}`} className="bg-accent text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Hébergement {city.name} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={`/guide-supporter/${slug}`} className="bg-primary text-white rounded-xl py-3.5 px-6 font-semibold inline-flex items-center justify-center gap-2">
              Guide supporter <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
          <Link href={`/meteo/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Météo {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
          <Link href={`/transport/${slug}`} className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-5 hover:border-accent transition-colors">
            <span className="font-semibold text-primary">Transports {city.name}</span>
            <ArrowRight className="w-5 h-5 text-accent" />
          </Link>
        </div>
      </section>
      <FAQSection title={`Questions fréquentes — Fan Zone ${city.name}`} items={faqItems} />
    </>
  );
}