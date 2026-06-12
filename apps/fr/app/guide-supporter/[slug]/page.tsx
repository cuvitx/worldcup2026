import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Bed, Bus, CalendarDays, CircleDot, ClipboardList, Clock, Compass, DollarSign, ExternalLink, Landmark, Link2, MapPin, ParkingCircle, Phone, ShieldCheck, Thermometer, UtensilsCrossed } from "lucide-react";
import { FAQSection } from "@repo/ui/faq-section";
import { domains } from "@repo/data/route-mapping";
import { cities, citiesBySlug } from "@repo/data/cities";
import { stadiumsById } from "@repo/data/stadiums";
import { matchesByStadium } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";
import { stageLabels } from "@repo/data/constants";
export const revalidate = 86400;
export const dynamicParams = false;
// ─── Types ────────────────────────────────────────────────────────────────────
interface GuideData {
  transport: { metro: string; parking: string; temps: string };
  dormir: { quartiers: string[]; prixMin: number; prixMax: number; devise: string };
  manger: { cuisine: string; budgetRepas: string };
  activites: { nom: string; desc: string }[];
  infos: { meteo: string; pourboires: string; securite: string; urgences: string };
}
// ─── Enrichment data per city ─────────────────────────────────────────────────
const guidesData: Record<string, GuideData> = {
  "new-york-new-jersey": {
    transport: { metro: "NJ Transit depuis Penn Station (30 min) — ligne directe matchday. Métro MTA 24h/24 dans NYC.", parking: "Parkings officiels MetLife ($50-80). Navettes gratuites depuis Secaucus Junction.", temps: "12 km du centre de Manhattan, ~45 min en transports" },
    dormir: { quartiers: ["Midtown Manhattan", "Jersey City", "Hoboken", "Times Square"], prixMin: 180, prixMax: 500, devise: "USD" },
    manger: { cuisine: "Pizza new-yorkaise, bagels, food trucks internationaux, restaurants étoilés dans chaque quartier", budgetRepas: "15-40 $ par repas" },
    activites: [
      { nom: "Central Park", desc: "800 hectares de verdure — vélo, pique-nique, concerts gratuits" },
      { nom: "Times Square & Broadway", desc: "L'énergie de New York à l'état pur — comédies musicales incontournables" },
      { nom: "Statue de la Liberté", desc: "Ferry depuis Battery Park — réservez à l'avance" },
      { nom: "Brooklyn & Williamsburg", desc: "Street art, marchés et rooftop bars avec vue sur Manhattan" },
    ],
    infos: { meteo: "25-32°C, humide avec orages possibles. Prévoir crème solaire et imperméable léger.", pourboires: "15-20% obligatoires au restaurant, $1-2 par boisson au bar", securite: "Ville sûre dans les zones touristiques. Éviter les parcs la nuit. Métro sûr mais vigilance tardive.", urgences: "911 (police, pompiers, ambulance)" },
  },
  "dallas-fort-worth": {
    transport: { metro: "DART Light Rail depuis downtown Dallas. Navettes spéciales depuis Fort Worth le jour du match.", parking: "Parkings géants autour de l'AT&T Stadium ($40-60). Réserver en avance via ParkWhiz.", temps: "25 km de Dallas downtown, ~30 min en voiture" },
    dormir: { quartiers: ["Deep Ellum", "Downtown Dallas", "Arlington", "Sundance Square (Fort Worth)"], prixMin: 120, prixMax: 350, devise: "USD" },
    manger: { cuisine: "BBQ texan (brisket fumé 12h), tacos tex-mex, steakhouses légendaires, chicken fried steak", budgetRepas: "12-30 $ par repas" },
    activites: [
      { nom: "Stockyards District (Fort Worth)", desc: "Rodéo, honky-tonks et défilé quotidien de longhorns" },
      { nom: "Deep Ellum", desc: "Quartier musical — live music, bars et street art" },
      { nom: "Sixth Floor Museum", desc: "Musée historique consacré à l'assassinat de JFK" },
      { nom: "Globe Life Field", desc: "Match de baseball des Texas Rangers entre deux matchs de foot" },
    ],
    infos: { meteo: "30-39°C, sec et très chaud. Hydratation essentielle. Toit rétractable du stade = climatisation.", pourboires: "15-20% restaurant, $1-2 par boisson", securite: "Ville sûre. Voiture quasi indispensable. Attention à la chaleur extrême.", urgences: "911" },
  },
  "miami": {
    transport: { metro: "Metrorail + bus Metrobus. Navettes spéciales depuis Brickell et South Beach vers Miami Gardens.", parking: "Parkings Hard Rock Stadium ($40-60). Covoiturage encouragé.", temps: "25 km de South Beach, ~35 min" },
    dormir: { quartiers: ["South Beach", "Brickell", "Wynwood", "Coral Gables"], prixMin: 150, prixMax: 450, devise: "USD" },
    manger: { cuisine: "Cuisine caribéenne et latino — ceviche, empanadas, cafecito cubain (Little Havana), fruits de mer", budgetRepas: "15-35 $ par repas" },
    activites: [
      { nom: "South Beach", desc: "Plages mythiques, Art Deco District et nightlife légendaire" },
      { nom: "Little Havana", desc: "Calle Ocho — dominos, cigares et cuisine cubaine authentique" },
      { nom: "Wynwood Walls", desc: "Le plus grand musée de street art à ciel ouvert" },
      { nom: "Everglades", desc: "Excursion en airboat à 45 min — alligators et nature sauvage" },
    ],
    infos: { meteo: "28-33°C, très humide. Averses tropicales en fin d'après-midi (courtes mais intenses).", pourboires: "18-20% restaurant (parfois inclus pour groupes), $2 par boisson", securite: "Zones touristiques sûres. Vigilance dans certains quartiers le soir. Soleil intense.", urgences: "911" },
  },
  "atlanta": {
    transport: { metro: "MARTA (métro + bus) — station Vine City ou GWCC/CNN Center à 10 min du stade.", parking: "Parkings officiels Mercedes-Benz Stadium ($40-60). MARTA fortement recommandé.", temps: "Au cœur de downtown, 2 km du centre" },
    dormir: { quartiers: ["Midtown", "Buckhead", "Downtown", "Inman Park"], prixMin: 100, prixMax: 300, devise: "USD" },
    manger: { cuisine: "Southern food — fried chicken, peach cobbler, grits, BBQ. Scène culinaire moderne à Ponce City Market.", budgetRepas: "12-28 $ par repas" },
    activites: [
      { nom: "Georgia Aquarium", desc: "Plus grand aquarium du monde — requins-baleines et belugas" },
      { nom: "Martin Luther King Jr. Historic Site", desc: "Berceau du mouvement des droits civiques" },
      { nom: "BeltLine & Ponce City Market", desc: "Promenade urbaine avec food halls, boutiques et art public" },
      { nom: "World of Coca-Cola", desc: "Musée interactif dédié à la marque iconique née à Atlanta" },
    ],
    infos: { meteo: "25-34°C, humide. Toit rétractable du stade = confort garanti.", pourboires: "15-20% restaurant, $1-2 par boisson", securite: "Downtown et Midtown sûrs. Stade ultra-moderne avec sécurité renforcée.", urgences: "911" },
  },
  "seattle": {
    transport: { metro: "Link Light Rail depuis l'aéroport et downtown. Stade accessible à pied depuis Pioneer Square.", parking: "Parkings limités autour du Lumen Field ($30-50). Transports en commun recommandés.", temps: "En plein centre-ville, à pied depuis downtown" },
    dormir: { quartiers: ["Downtown", "Capitol Hill", "Pike Place", "Belltown"], prixMin: 130, prixMax: 350, devise: "USD" },
    manger: { cuisine: "Fruits de mer du Pacifique, coffee culture (Starbucks original !), cuisine asiatique fusion", budgetRepas: "15-35 $ par repas" },
    activites: [
      { nom: "Pike Place Market", desc: "Marché historique — poissons volants, fleurs et premier Starbucks" },
      { nom: "Space Needle", desc: "Vue panoramique à 360° sur la ville, le Puget Sound et le Mont Rainier" },
      { nom: "Museum of Pop Culture (MoPOP)", desc: "Musée dédié à la musique, la SF et la culture pop" },
      { nom: "Ferry vers Bainbridge Island", desc: "35 min de ferry pour une escapade nature avec vue sur la skyline" },
    ],
    infos: { meteo: "15-25°C, le plus tempéré des sites. Pluie rare en été. Veste légère le soir.", pourboires: "15-20% restaurant", securite: "Ville très sûre. Pioneer Square plus animé le soir.", urgences: "911" },
  },
  "san-francisco": {
    transport: { metro: "BART + Caltrain depuis SF. VTA Light Rail vers Levi's Stadium à Santa Clara.", parking: "Parkings Levi's Stadium ($40-60). BART depuis SF fortement conseillé.", temps: "60 km de San Francisco, ~1h en transports" },
    dormir: { quartiers: ["Union Square (SF)", "SoMa", "San José downtown", "Santa Clara"], prixMin: 150, prixMax: 400, devise: "USD" },
    manger: { cuisine: "Cuisine californienne, fruits de mer de Fisherman's Wharf, Mission District (burritos), gastronomie asiatique", budgetRepas: "15-40 $ par repas" },
    activites: [
      { nom: "Golden Gate Bridge", desc: "Traversée à pied ou à vélo — vue spectaculaire sur la baie" },
      { nom: "Alcatraz Island", desc: "Visite de la prison mythique — réserver 2-3 semaines à l'avance" },
      { nom: "Fisherman's Wharf", desc: "Clam chowder, otaries et ambiance portuaire" },
      { nom: "Silicon Valley Tech Tour", desc: "Campus Apple, Google et musée de l'informatique" },
    ],
    infos: { meteo: "15-22°C, brouillard matinal fréquent. « L'été le plus froid que j'ai connu était à SF » — Mark Twain.", pourboires: "18-20% restaurant (SF a les pourboires les plus élevés des USA)", securite: "Tenderloin et certaines rues de SoMa à éviter le soir. Reste très sûr.", urgences: "911" },
  },
  "los-angeles": {
    transport: { metro: "LA Metro Ligne C + navettes matchday. Uber/Lyft populaires.", parking: "Parkings SoFi Stadium ($60-100). Réservation obligatoire en avance.", temps: "20 km de Downtown LA, ~40 min (trafic !)" },
    dormir: { quartiers: ["Santa Monica", "Hollywood", "Downtown LA", "Inglewood (près du stade)"], prixMin: 140, prixMax: 400, devise: "USD" },
    manger: { cuisine: "Tacos (les meilleurs hors Mexique !), In-N-Out Burger, Korean BBQ (Koreatown), cuisine fusion", budgetRepas: "12-35 $ par repas" },
    activites: [
      { nom: "Hollywood & Walk of Fame", desc: "L'industrie du cinéma à vos pieds — studios et étoiles" },
      { nom: "Santa Monica Pier & Venice Beach", desc: "Plage, muscle beach, skatepark et coucher de soleil mythique" },
      { nom: "Griffith Observatory", desc: "Vue panoramique gratuite sur LA et le signe Hollywood" },
      { nom: "Universal Studios", desc: "Parc à thème cinématographique — journée complète garantie" },
    ],
    infos: { meteo: "20-30°C, sec et ensoleillé. Peu de pluie. Crème solaire indispensable.", pourboires: "15-20% restaurant", securite: "Zones touristiques sûres. Skid Row (Downtown) à éviter. Voiture quasi obligatoire.", urgences: "911" },
  },
  "philadelphia": {
    transport: { metro: "SEPTA (métro, bus, trolley). Ligne directe vers le stade (Broad Street Line → NRG Station).", parking: "Parkings Sports Complex ($30-50). SEPTA plus rapide les jours de match.", temps: "8 km de downtown, 20 min en métro" },
    dormir: { quartiers: ["Center City", "Old City", "Rittenhouse Square", "Fishtown"], prixMin: 110, prixMax: 300, devise: "USD" },
    manger: { cuisine: "Philly cheesesteak (Pat's vs Geno's !), soft pretzels, cuisine italienne (Italian Market)", budgetRepas: "10-28 $ par repas" },
    activites: [
      { nom: "Liberty Bell & Independence Hall", desc: "Berceau de la démocratie américaine — entrée gratuite" },
      { nom: "Philadelphia Museum of Art", desc: "Courez les marches de Rocky ! Collections impressionnantes." },
      { nom: "Reading Terminal Market", desc: "Marché couvert historique — Pennsylvania Dutch, soul food et plus" },
      { nom: "Fishtown & Northern Liberties", desc: "Quartiers branchés — brasseries artisanales et restaurants" },
    ],
    infos: { meteo: "22-32°C, humide. Orages possibles.", pourboires: "15-20% restaurant", securite: "Center City et zones touristiques sûres. Éviter certains quartiers nord/ouest le soir.", urgences: "911" },
  },
  "houston": {
    transport: { metro: "METRORail (ligne rouge). Navettes spéciales depuis downtown.", parking: "Parkings NRG Stadium ($40-60). Abondants mais arrivez tôt.", temps: "10 km de downtown, ~20 min" },
    dormir: { quartiers: ["Downtown", "Montrose", "The Heights", "Museum District"], prixMin: 100, prixMax: 280, devise: "USD" },
    manger: { cuisine: "BBQ texan, Viet-Cajun crawfish, tacos, cuisine du Golfe. Houston = capitale culinaire secrète des USA.", budgetRepas: "10-25 $ par repas" },
    activites: [
      { nom: "Space Center Houston (NASA)", desc: "Centre spatial légendaire — touchez un vrai morceau de Lune" },
      { nom: "Museum District", desc: "19 musées dont beaucoup gratuits — art, sciences, histoire" },
      { nom: "Buffalo Bayou Park", desc: "Promenade verdoyante le long du bayou — kayak et vélo" },
      { nom: "Chinatown & Little Saigon", desc: "La meilleure cuisine asiatique du continent — pho, dim sum, BBQ coréen" },
    ],
    infos: { meteo: "27-36°C, très humide. Toit fermé du NRG Stadium = climatisation.", pourboires: "15-20%", securite: "Ville étendue — voiture recommandée. Quartiers touristiques sûrs.", urgences: "911" },
  },
  "kansas-city": {
    transport: { metro: "KC Streetcar (gratuit, centre-ville). Navettes matchday. Uber/Lyft populaires.", parking: "Parkings Arrowhead Stadium ($35-50). Ambiance tailgate pré-match légendaire.", temps: "15 km de downtown, ~20 min" },
    dormir: { quartiers: ["Power & Light District", "Country Club Plaza", "Crossroads Arts District", "Westport"], prixMin: 90, prixMax: 250, devise: "USD" },
    manger: { cuisine: "BBQ world-class (Joe's KC, Q39, Gates), Kansas City strip steak, craft beer scene", budgetRepas: "10-25 $ par repas" },
    activites: [
      { nom: "National WWI Museum", desc: "Musée le plus complet au monde sur la Première Guerre mondiale" },
      { nom: "Nelson-Atkins Museum of Art", desc: "Collection encyclopédique — entrée gratuite" },
      { nom: "Power & Light District", desc: "Quartier de divertissement — bars, restaurants et spectacles" },
      { nom: "Tailgate au Arrowhead", desc: "Tradition pré-match — BBQ, bière et chants avec les locaux" },
    ],
    infos: { meteo: "22-34°C, humide avec orages possibles.", pourboires: "15-20%", securite: "Ville accueillante et sûre dans les zones touristiques.", urgences: "911" },
  },
  "boston": {
    transport: { metro: "MBTA (le « T ») — Ligne verte/rouge. Gillette Stadium à Foxborough nécessite navettes/voiture.", parking: "Parkings Gillette Stadium ($40-60). Navettes depuis Boston (Patriot Place).", temps: "55 km de Boston downtown, ~50 min" },
    dormir: { quartiers: ["Back Bay", "Beacon Hill", "Seaport", "Cambridge"], prixMin: 150, prixMax: 400, devise: "USD" },
    manger: { cuisine: "Lobster roll, clam chowder, huîtres, cuisine italienne du North End, brasseries craft", budgetRepas: "15-35 $ par repas" },
    activites: [
      { nom: "Freedom Trail", desc: "Parcours historique de 4 km — 16 sites de la Révolution américaine" },
      { nom: "Harvard & MIT (Cambridge)", desc: "Campus mythiques à traverser — librairies et cafés" },
      { nom: "Fenway Park", desc: "Le plus vieux stade de baseball — ambiance unique même hors match" },
      { nom: "Whale Watching", desc: "Excursion baleines depuis le port — 3h, spectaculaire en été" },
    ],
    infos: { meteo: "18-28°C, agréable mais variable. Veste légère le soir.", pourboires: "18-20%", securite: "Ville très sûre, excellents transports.", urgences: "911" },
  },
  "toronto": {
    transport: { metro: "TTC (métro + tramway). BMO Field accessible à pied depuis Exhibition Place ou Liberty Village.", parking: "Parkings limités à Exhibition Place ($30-40 CAD). TTC + marche recommandé.", temps: "En bord de lac, 3 km de downtown" },
    dormir: { quartiers: ["Downtown / Entertainment District", "Kensington Market", "Queen West", "Distillery District"], prixMin: 130, prixMax: 350, devise: "CAD" },
    manger: { cuisine: "Cuisine multiculturelle incroyable — Chinatown, Little Italy, Kensington Market, poutine !", budgetRepas: "15-35 $ CAD par repas" },
    activites: [
      { nom: "CN Tower", desc: "Vue vertigineuse à 553 m — EdgeWalk pour les téméraires" },
      { nom: "Distillery District", desc: "Architecture victorienne, galeries d'art, cafés et restaurants" },
      { nom: "Kensington Market", desc: "Quartier bohème et multiculturel — vintage, épices et street food" },
      { nom: "Toronto Islands", desc: "Ferry de 15 min pour plages et vélo avec skyline en toile de fond" },
    ],
    infos: { meteo: "18-28°C, agréable. Pas besoin de visa pour les Français (eTA en ligne ~7$ CAD).", pourboires: "15-20% restaurant", securite: "Ville extrêmement sûre et accueillante.", urgences: "911" },
  },
  "vancouver": {
    transport: { metro: "SkyTrain + bus TransLink. BC Place à 5 min à pied de la station Stadium-Chinatown.", parking: "Parkings downtown ($20-35 CAD). SkyTrain fortement recommandé.", temps: "Au cœur de downtown, à pied" },
    dormir: { quartiers: ["Downtown / Gastown", "Yaletown", "Kitsilano", "West End"], prixMin: 140, prixMax: 380, devise: "CAD" },
    manger: { cuisine: "Sushi de classe mondiale, cuisine asiatique fusion, fruits de mer du Pacifique, scène vegan avancée", budgetRepas: "15-35 $ CAD par repas" },
    activites: [
      { nom: "Stanley Park", desc: "Parc urbain de 400 hectares — seawall, totems et aquarium" },
      { nom: "Granville Island", desc: "Marché public, galeries d'art et brasseries artisanales" },
      { nom: "Grouse Mountain", desc: "Randonnée Grouse Grind (« escalier de la nature ») — vue incroyable" },
      { nom: "Gastown", desc: "Quartier historique — horloge à vapeur, cafés et boutiques" },
    ],
    infos: { meteo: "16-24°C, doux et ensoleillé en été. Nuits fraîches — prévoir un pull.", pourboires: "15-20%", securite: "Ville très sûre. East Hastings à éviter la nuit.", urgences: "911" },
  },
  "mexico": {
    transport: { metro: "Metro CDMX (ligne 2 → Estadio Azteca ou Metrobús). Très abordable (~0.30€).", parking: "Parkings autour de l'Azteca (50-100 MXN). Uber populaire et peu cher.", temps: "15 km du Zócalo, ~45 min (trafic dense)" },
    dormir: { quartiers: ["Condesa / Roma", "Polanco", "Coyoacán", "Centro Histórico"], prixMin: 50, prixMax: 200, devise: "USD" },
    manger: { cuisine: "Tacos al pastor, mole, tlacoyos, mezcal. La meilleure street food du monde — safe et délicieuse.", budgetRepas: "5-20 $ par repas" },
    activites: [
      { nom: "Teotihuacán", desc: "Pyramides du Soleil et de la Lune — excursion d'une demi-journée" },
      { nom: "Museo Nacional de Antropología", desc: "Le plus grand musée d'Amérique latine — civilisations précolombiennes" },
      { nom: "Coyoacán & Casa de Frida Kahlo", desc: "Quartier bohème — musée Frida Kahlo, marchés et cafés" },
      { nom: "Lucha Libre à l'Arena México", desc: "Catch mexicain en ambiance survoltée — bière et masques colorés" },
    ],
    infos: { meteo: "13-26°C, altitude 2240m. Saison des pluies (averses l'après-midi, sèche le matin). Acclimatation à l'altitude.", pourboires: "10-15% restaurant", securite: "Quartiers touristiques sûrs (Condesa, Roma, Polanco). Uber recommandé le soir. Éviter de boire l'eau du robinet.", urgences: "911" },
  },
  "guadalajara": {
    transport: { metro: "Macrobús + Mi Tren. Navettes depuis Centro Histórico vers l'Estadio Akron.", parking: "Parkings Estadio Akron (abordables ~50-80 MXN).", temps: "15 km du centre, ~30 min" },
    dormir: { quartiers: ["Centro Histórico", "Chapultepec", "Americana", "Tlaquepaque"], prixMin: 40, prixMax: 150, devise: "USD" },
    manger: { cuisine: "Birria, tortas ahogadas, tequila de Jalisco — berceau du mariachi et de la tequila !", budgetRepas: "4-15 $ par repas" },
    activites: [
      { nom: "Tequila (ville)", desc: "Excursion d'une journée — distilleries, champs d'agave bleu, Tequila Express" },
      { nom: "Tlaquepaque", desc: "Village artisanal — céramiques, verrerie soufflée et galerías" },
      { nom: "Centro Histórico", desc: "Cathédrale, Hospicio Cabañas (UNESCO) et place de la Libération" },
      { nom: "Lac de Chapala", desc: "Plus grand lac du Mexique — villages pittoresques à 45 min" },
    ],
    infos: { meteo: "16-30°C, climat agréable. Averses en fin d'après-midi en saison des pluies.", pourboires: "10-15%", securite: "Centre-ville et quartiers touristiques sûrs. Uber recommandé.", urgences: "911" },
  },
  "monterrey": {
    transport: { metro: "Metrorrey (2 lignes). Uber populaire et abordable.", parking: "Parkings stade BBVA (50-100 MXN).", temps: "10 km du centre, ~20 min" },
    dormir: { quartiers: ["Centro", "San Pedro Garza García", "Barrio Antiguo", "Valle Oriente"], prixMin: 50, prixMax: 180, devise: "USD" },
    manger: { cuisine: "Cabrito al pastor (chevreau rôti), carne asada, machaca — cuisine norteña authentique", budgetRepas: "5-18 $ par repas" },
    activites: [
      { nom: "Cerro de la Silla", desc: "Montagne iconique — randonnée avec vue panoramique sur la ville" },
      { nom: "Fundidora Park", desc: "Parc urbain dans une ancienne fonderie — musées, canaux et espaces verts" },
      { nom: "Barrio Antiguo", desc: "Quartier historique — bars, galeries et vie nocturne" },
      { nom: "Grutas de García", desc: "Grottes spectaculaires à 45 min — téléphérique et stalactites" },
    ],
    infos: { meteo: "24-36°C, chaud et sec. Bien s'hydrater.", pourboires: "10-15%", securite: "San Pedro et zones touristiques très sûres. Monterrey est la ville la plus riche du Mexique.", urgences: "911" },
  },
};
// ─── Static params ────────────────────────────────────────────────────────────
interface PageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};
  const title = `Guide du supporter à ${city.name} — CDM 2026`;
  const description = `Tout ce qu'il faut savoir pour vivre la Coupe du Monde 2026 à ${city.name} : transports, hébergement, restaurants, activités, sécurité et matchs au programme.`;
  return {
    title,
    description,
    openGraph: { title, description, url: `${domains.fr}/guide-supporter/${slug}` },
    alternates: { canonical: `https://www.cdm2026.fr/guide-supporter/${slug}` },
  };
}
// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function GuideSupporterPage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();
  const guide = guidesData[slug];
  const cityStadiums = city.stadiumIds.map((id) => stadiumsById[id]).filter((s): s is NonNullable<typeof s> => s != null);
  const cityMatches = cityStadiums.flatMap((s) => matchesByStadium[s.id] ?? []).sort((a, b) => a.date.localeCompare(b.date));
const faqItems = [
    { question: `Comment se rendre au stade à ${city.name} ?`, answer: guide ? guide.transport.metro : `Consultez les transports en commun locaux et les navettes spéciales mises en place pour la Coupe du Monde.` },
    { question: `Combien coûte un hôtel à ${city.name} pendant la CDM 2026 ?`, answer: guide ? `Comptez entre ${guide.dormir.prixMin} et ${guide.dormir.prixMax} ${guide.dormir.devise} par nuit selon le quartier et le standing. Réservez le plus tôt possible !` : "Les prix varient selon le quartier. Réservez très tôt pour les meilleures offres." },
    { question: `${city.name} est-elle sûre pour les supporters ?`, answer: guide?.infos.securite ?? "Les villes hôtes bénéficient d'un dispositif de sécurité renforcé pour la Coupe du Monde." },
    { question: `Combien de matchs se jouent à ${city.name} ?`, answer: `${cityMatches.length} matchs de la Coupe du Monde 2026 se joueront à ${city.name}.` },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: `Guide supporter ${city.name} — CDM 2026`,
    description: `Guide complet pour les supporters à ${city.name} pendant la Coupe du Monde 2026.`,
    url: `https://www.cdm2026.fr/guide-supporter/${slug}`,
    location: { "@type": "Place", name: city.name, address: { "@type": "PostalAddress", addressCountry: city.country } },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
{/* Hero */}
      <section className="hero-animated text-white py-12 sm:py-16">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mt-4 text-2xl font-extrabold sm:text-4xl lg:text-5xl">
            Guide du supporter à <span className="text-accent">{city.name}</span>
          </h1>
          <p className="mt-3 text-accent text-lg">
            Tout pour vivre la CDM 2026 — {city.state}, {city.country}
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-300">
            {cityStadiums.map((s) => (
              <span key={s.id}><Landmark className="h-5 w-5 inline-block" /> {s.name} ({s.capacity.toLocaleString("fr-FR")} places)</span>
            ))}
            <span><CircleDot className="h-5 w-5 inline-block" /> {cityMatches.length} matchs</span>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {/* Se rendre au stade */}
            {guide && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                  <Bus className="h-6 w-6 text-primary" /> Se rendre au stade
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Transports en commun</p>
                      <p>{guide.transport.metro}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ParkingCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Parking</p>
                      <p>{guide.transport.parking}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Temps de trajet</p>
                      <p>{guide.transport.temps}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* Où dormir */}
            {guide && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                  <Bed className="h-6 w-6 text-primary" /> Où dormir à {city.name}
                </h2>
                <p className="text-gray-700 mb-4">
                  Budget : <strong>{guide.dormir.prixMin}–{guide.dormir.prixMax} {guide.dormir.devise}</strong> par nuit selon le quartier.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {guide.dormir.quartiers.map((q) => (
                    <div key={q} className="rounded-lg bg-gray-50 p-3 text-center">
                      <p className="font-semibold text-gray-900 text-sm">{q}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <a
                    href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city.name)}&checkin=2026-06-10&checkout=2026-07-20`}
                    target="_blank"
                    rel="nofollow noopener sponsored"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
                  >
                    <Bed className="h-4 w-4" /> Voir les hôtels sur Booking.com
                  </a>
                </div>
              </section>
            )}
            {/* Où manger */}
            {guide && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                  <UtensilsCrossed className="h-6 w-6 text-primary" /> Où manger
                </h2>
                <p className="text-gray-700">{guide.manger.cuisine}</p>
                <p className="mt-2 text-sm text-accent">
                  <DollarSign className="inline h-4 w-4" /> Budget moyen : <strong>{guide.manger.budgetRepas}</strong>
                </p>
              </section>
            )}
            {/* Que faire entre les matchs */}
            {guide && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                  <Compass className="h-6 w-6 text-primary" /> Que faire entre les matchs
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {guide.activites.map((a) => (
                    <div key={a.nom} className="rounded-lg border border-gray-200 p-4">
                      <h3 className="font-bold text-gray-900">{a.nom}</h3>
                      <p className="mt-1 text-sm text-accent">{a.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {/* Infos pratiques */}
            {guide && (
              <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" /> Infos pratiques
                </h2>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <Thermometer className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Météo (juin-juillet)</p>
                      <p>{guide.infos.meteo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Pourboires</p>
                      <p>{guide.infos.pourboires}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Sécurité</p>
                      <p>{guide.infos.securite}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">Numéros d'urgence</p>
                      <p>{guide.infos.urgences}</p>
                    </div>
                  </div>
                </div>
              </section>
            )}
            {/* Matchs dans cette ville */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 mb-4">
                <CalendarDays className="h-6 w-6 text-primary" /> Matchs à {city.name}
              </h2>
              {cityMatches.length === 0 ? (
                <p className="text-accent">Programme des matchs à confirmer.</p>
              ) : (
                <div className="space-y-3">
                  {cityMatches.map((m) => {
                    const home = teamsById[m.homeTeamId];
                    const away = teamsById[m.awayTeamId];
                    const stadium = stadiumsById[m.stadiumId];
                    const dateStr = new Date(`${m.date}T${m.time}:00+02:00`).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                      timeZone: "Europe/Paris",
                    });
                    const timeStr = new Date(`${m.date}T${m.time}:00+02:00`).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Europe/Paris",
                    });
                    const stage = stageLabels[m.stage] ?? m.stage;
                    return (
                      <Link
                        key={m.id}
                        href={`/match/${m.slug}`}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xs text-accent whitespace-nowrap">{dateStr}</span>
                          <span className="font-semibold text-gray-900 text-sm truncate">
                            {home?.flag ?? "🏳️"} {home?.name ?? "TBD"} vs {away?.name ?? "TBD"} {away?.flag ?? "🏳️"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-accent">{timeStr}</span>
                          <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">{stage}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
            {/* FAQ */}
            <FAQSection title={`FAQ — Supporter à ${city.name}`} items={faqItems} />
          </div>
          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA Booking */}
            <div className="rounded-xl bg-accent p-6 text-center text-white shadow-lg">
              <Bed className="mx-auto h-10 w-10 mb-3" />
              <h3 className="text-lg font-bold">Réservez votre hôtel</h3>
              <p className="text-sm mt-2 text-white/80">Les meilleurs tarifs à {city.name} pour la CDM 2026</p>
              <a
                href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city.name)}&checkin=2026-06-10&checkout=2026-07-20`}
                target="_blank"
                rel="nofollow noopener sponsored"
                className="mt-4 inline-block rounded-lg bg-white text-accent font-bold px-6 py-3 text-sm hover:bg-gray-100 transition-colors"
              >
                Voir sur Booking.com →
              </a>
            </div>
            {/* Quick links */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3"><Link2 className="h-5 w-5 inline-block" /> Pages liées</h3>
              <ul className="space-y-2 text-sm">
                {cityStadiums.map((s) => (
                  <li key={s.id}>
                    <Link href={`/stade/${s.slug}`} className="text-primary hover:underline flex items-center gap-1">
                      <ExternalLink className="h-3.5 w-3.5" /> {s.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={`/ville/${slug}`} className="text-primary hover:underline flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" /> Fiche ville {city.name}
                  </Link>
                </li>
                <li>
                  <Link href={`/securite/${slug}`} className="text-primary hover:underline flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" /> Sécurité à {city.name}
                  </Link>
                </li>
                <li>
                  <Link href="/fan-zones" className="text-primary hover:underline flex items-center gap-1">
                    <ExternalLink className="h-3.5 w-3.5" /> Fan zones CDM 2026
                  </Link>
                </li>
              </ul>
            </div>
            {/* City info */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3"><ClipboardList className="h-5 w-5 inline-block" /> En bref</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-accent">Population</dt>
                  <dd className="font-medium text-gray-900">{city.population.toLocaleString("fr-FR")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-accent">Pays</dt>
                  <dd className="font-medium text-gray-900">{city.country}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-accent">Fuseau</dt>
                  <dd className="font-medium text-gray-900">{city.timezone.replace("America/", "")}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-accent">Stade(s)</dt>
                  <dd className="font-medium text-gray-900">{cityStadiums.length}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-accent">Matchs</dt>
                  <dd className="font-medium text-gray-900">{cityMatches.length}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}