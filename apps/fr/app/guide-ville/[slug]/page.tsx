import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

/* ─── City Data ─── */
interface CityGuide {
  slug: string;
  name: string;
  country: string;
  flag: string;
  stadium: string;
  stadiumCapacity: string;
  climate: string;
  airport: string;
  metro: string;
  transport: string;
  lodging: { quartier: string; budget: string; description: string }[];
  food: { name: string; description: string }[];
  attractions: { name: string; description: string }[];
  matchInfo: string;
  security: string;
  visa: string;
  faq: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

const cities: CityGuide[] = [
  {
    slug: "new-york",
    name: "New York / New Jersey",
    country: "États-Unis",
    flag: "🇺🇸",
    stadium: "MetLife Stadium",
    stadiumCapacity: "82 500 places",
    climate: "Chaud et humide en juin-juillet (25-32°C). Prévoir crème solaire et hydratation. Possibilité d'orages en fin de journée.",
    airport: "Trois aéroports majeurs : JFK (international principal), Newark Liberty (le plus proche du MetLife Stadium, ~15 min), LaGuardia (vols domestiques).",
    metro: "Le métro de New York (MTA) est l'un des plus étendus au monde, ouvert 24h/24. Pour le MetLife Stadium à East Rutherford (New Jersey), prendre le NJ Transit depuis Penn Station.",
    transport: "Le NJ Transit Bus et le train sont les meilleures options pour rejoindre le MetLife Stadium. En taxi/VTC, prévoir 30-60 min depuis Manhattan selon le trafic. Un service de navettes spéciales sera probablement mis en place les jours de match.",
    lodging: [
      { quartier: "Manhattan — Midtown", budget: "150-400 $/nuit", description: "Central, proche de Times Square et Penn Station (accès NJ Transit). Large choix d'hôtels toutes gammes." },
      { quartier: "Manhattan — Lower Manhattan", budget: "120-350 $/nuit", description: "Quartier financier, plus calme le soir. Proche du métro, vue sur la Statue de la Liberté." },
      { quartier: "Jersey City / Hoboken", budget: "100-250 $/nuit", description: "Juste en face de Manhattan, plus abordable. Accès facile au MetLife Stadium via NJ Transit." },
      { quartier: "East Rutherford / Secaucus", budget: "80-180 $/nuit", description: "Le plus proche du stade. Moins de vie nocturne mais pratique les jours de match." },
    ],
    food: [
      { name: "Pizza new-yorkaise", description: "La pizza à la part est une institution. Essayez Joe's Pizza, Di Fara Pizza ou Prince Street Pizza." },
      { name: "Bagels", description: "Un incontournable du petit-déjeuner new-yorkais. Russ & Daughters, Ess-a-Bagel ou Absolute Bagels." },
      { name: "Cuisine du monde", description: "New York est un melting-pot gastronomique : Chinatown, Little Italy, Koreatown, quartier indien de Jackson Heights." },
      { name: "Steakhouses", description: "Peter Luger, Keens, Wolfgang's — les steakhouses new-yorkais sont légendaires." },
    ],
    attractions: [
      { name: "Statue de la Liberté & Ellis Island", description: "Symbole de New York, accessible en ferry depuis Battery Park. Réserver à l'avance." },
      { name: "Central Park", description: "Immense parc au cœur de Manhattan. Idéal pour se détendre entre deux matchs." },
      { name: "Times Square & Broadway", description: "L'effervescence de New York à son maximum. Assistez à un spectacle de Broadway." },
      { name: "Empire State Building / Top of the Rock", description: "Vues panoramiques sur la skyline. Privilégiez le coucher de soleil." },
      { name: "Brooklyn Bridge", description: "Traversez le pont à pied pour une vue iconique sur Manhattan." },
    ],
    matchInfo: "Le MetLife Stadium accueillera plusieurs matchs de phase de groupes, des huitièmes de finale et la grande finale de la CDM 2026 le 19 juillet. C'est le stade le plus important du tournoi.",
    security: "New York est globalement sûre pour les touristes. Restez vigilants dans le métro tard le soir et dans les zones très touristiques (pickpockets). Le NYPD assure une forte présence. Le 911 est le numéro d'urgence.",
    visa: "Les ressortissants français bénéficient du programme ESTA (Electronic System for Travel Authorization) pour entrer aux États-Unis sans visa pour un séjour de 90 jours max. Faire la demande en ligne au moins 72h avant le départ (14 $ de frais).",
    faq: [
      {
        question: "Comment aller au MetLife Stadium depuis Manhattan ?",
        answer: "Le plus simple est de prendre le NJ Transit depuis Penn Station (Manhattan) jusqu'à la gare de Meadowlands. Le trajet dure environ 30 minutes. Des navettes bus seront aussi mises en place les jours de match.",
      },
      {
        question: "La finale de la CDM 2026 se joue-t-elle à New York ?",
        answer: "Oui, la finale de la Coupe du Monde 2026 se jouera au MetLife Stadium d'East Rutherford, New Jersey (région métropolitaine de New York), le 19 juillet 2026.",
      },
      {
        question: "Quel budget prévoir pour un séjour à New York pendant la CDM ?",
        answer: "New York est une ville chère. Prévoyez 150-300 $/nuit pour l'hôtel, 40-80 $/jour pour les repas, et 50-150 $ pour le transport. Les billets de match s'ajoutent. Budget total estimé : 300-600 $/jour hors billets de match.",
      },
    ],
    metaTitle: "Guide New York — CDM 2026 | MetLife Stadium, Transport & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à New York : MetLife Stadium, transports, hébergement, restaurants, attractions et conseils pratiques.",
  },
  {
    slug: "los-angeles",
    name: "Los Angeles",
    country: "États-Unis",
    flag: "🇺🇸",
    stadium: "SoFi Stadium",
    stadiumCapacity: "70 240 places",
    climate: "Climat méditerranéen : chaud et sec en juin-juillet (25-35°C), très peu de pluie. Soleil quasi garanti.",
    airport: "LAX (Los Angeles International Airport) est l'aéroport principal, à ~15 km du SoFi Stadium. Hollywood Burbank et Long Beach sont des alternatives.",
    metro: "Le Metro de LA se développe mais reste limité. La ligne C (verte) dessert Inglewood/LAX. Un prolongement vers le SoFi Stadium est en cours. En 2026, l'accès devrait être facilité.",
    transport: "LA est une ville de voiture. Uber/Lyft sont très utilisés. Les jours de match, des navettes et parkings relais seront organisés. Prévoir des embouteillages importants.",
    lodging: [
      { quartier: "Inglewood", budget: "100-200 $/nuit", description: "Le quartier du SoFi Stadium. Pratique les jours de match, en plein renouveau urbain." },
      { quartier: "Santa Monica / Venice Beach", budget: "150-350 $/nuit", description: "Ambiance balnéaire, plage, restaurants. À 20-30 min du stade." },
      { quartier: "Downtown LA", budget: "120-300 $/nuit", description: "Centre-ville, vie nocturne, musées. Accès métro." },
      { quartier: "Hollywood / West Hollywood", budget: "130-350 $/nuit", description: "Quartier emblématique, animé, bonne connexion aux transports." },
    ],
    food: [
      { name: "Tacos & cuisine mexicaine", description: "LA a la meilleure cuisine mexicaine des États-Unis. Tacos de rue, burritos, mole — Olvera Street, Grand Central Market." },
      { name: "In-N-Out Burger", description: "Institution californienne du fast-food de qualité. Commandez « Animal Style »." },
      { name: "Cuisine fusion", description: "Korean BBQ à Koreatown, sushi de qualité à Little Tokyo, cuisine vietnamienne." },
      { name: "Brunchs californiens", description: "Avocado toast, açaí bowls, jus pressés — la culture brunch de LA est incontournable." },
    ],
    attractions: [
      { name: "Hollywood Sign & Walk of Fame", description: "Les symboles de LA. Randonnée jusqu'au panneau Hollywood pour une vue panoramique." },
      { name: "Santa Monica Pier & Venice Beach", description: "Plage, skatepark, artistes de rue. Ambiance californienne par excellence." },
      { name: "Getty Center", description: "Musée d'art gratuit avec une vue spectaculaire sur LA. Architecture remarquable." },
      { name: "Universal Studios Hollywood", description: "Parc d'attractions et studios de cinéma. Réserver à l'avance en période de CDM." },
      { name: "Griffith Observatory", description: "Vue panoramique gratuite sur LA et le Hollywood Sign. Idéal au coucher du soleil." },
    ],
    matchInfo: "Le SoFi Stadium d'Inglewood accueillera des matchs de phase de groupes et de phases à élimination directe. Ce stade ultramoderne (inauguré en 2020) est l'un des plus technologiques au monde.",
    security: "Los Angeles est globalement sûre dans les zones touristiques. Évitez certains quartiers la nuit (Skid Row). Attention aux vols dans les voitures garées. Le 911 est le numéro d'urgence.",
    visa: "Programme ESTA pour les ressortissants français (même conditions que pour New York). Demande en ligne, 14 $, valable 2 ans.",
    faq: [
      {
        question: "Comment aller au SoFi Stadium ?",
        answer: "Le SoFi Stadium est situé à Inglewood. En transport en commun, la ligne C du Metro (arrêt Downtown Inglewood) est la plus proche. En voiture, des parkings sont disponibles mais les embouteillages sont fréquents. Des navettes seront probablement organisées.",
      },
      {
        question: "Fait-il chaud à Los Angeles en juin-juillet ?",
        answer: "Oui, les températures oscillent entre 25 et 35°C avec très peu d'humidité. Le soleil est quasi permanent. Prévoir protection solaire, chapeau et hydratation. Le SoFi Stadium est partiellement couvert.",
      },
      {
        question: "Peut-on se déplacer sans voiture à LA ?",
        answer: "C'est difficile mais faisable. Le réseau Metro s'améliore, Uber/Lyft sont omniprésents, et des navettes seront mises en place pour la CDM. Mais pour explorer LA confortablement, une voiture de location est recommandée.",
      },
    ],
    metaTitle: "Guide Los Angeles — CDM 2026 | SoFi Stadium, Transport & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Los Angeles : SoFi Stadium, transports, hébergement, plages, restaurants et conseils pratiques.",
  },
  {
    slug: "miami",
    name: "Miami",
    country: "États-Unis",
    flag: "🇺🇸",
    stadium: "Hard Rock Stadium",
    stadiumCapacity: "65 326 places",
    climate: "Tropical : chaud et humide en juin-juillet (28-35°C), orages fréquents l'après-midi. Prévoir parapluie et crème solaire.",
    airport: "Miami International Airport (MIA) est le hub principal, à ~25 km du Hard Rock Stadium. Fort Lauderdale-Hollywood (FLL) est une alternative plus au nord.",
    metro: "Metrorail et Metromover desservent Miami. Le Hard Rock Stadium à Miami Gardens n'est pas directement accessible en métro — navettes bus et VTC recommandés.",
    transport: "VTC (Uber/Lyft) très disponibles. Le jour des matchs, des navettes gratuites seront probablement organisées depuis des parkings relais. Le Tri-Rail connecte les villes de la côte.",
    lodging: [
      { quartier: "Miami Beach — South Beach", budget: "150-400 $/nuit", description: "La plage, l'Art Deco, la vie nocturne. Iconique mais éloigné du stade (~40 min)." },
      { quartier: "Downtown Miami / Brickell", budget: "120-300 $/nuit", description: "Quartier d'affaires, moderne, bien connecté. Restaurants et bars branchés." },
      { quartier: "Wynwood / Design District", budget: "100-250 $/nuit", description: "Quartier artistique, street art, galeries, ambiance créative." },
      { quartier: "Miami Gardens / Aventura", budget: "80-180 $/nuit", description: "Plus proche du Hard Rock Stadium. Plus calme, centres commerciaux." },
    ],
    food: [
      { name: "Cuisine cubaine", description: "Calle Ocho à Little Havana : café cubano, sandwich cubain, ropa vieja. Versailles est l'adresse mythique." },
      { name: "Fruits de mer", description: "Stone crabs, ceviche, fish tacos — Joe's Stone Crab est une institution." },
      { name: "Cuisine latino-américaine", description: "Colombienne, péruvienne, vénézuélienne, haïtienne — Miami est un carrefour des Amériques." },
      { name: "Brunch & açaí bowls", description: "La culture healthy de Miami : jus frais, bowls, brunch en terrasse face à l'océan." },
    ],
    attractions: [
      { name: "South Beach & Ocean Drive", description: "Plage mythique, architecture Art Deco, bars et restaurants en bord de mer." },
      { name: "Little Havana", description: "Le cœur cubain de Miami. Cigares, dominos, musique live et café cubano sur Calle Ocho." },
      { name: "Wynwood Walls", description: "Galerie d'art urbain à ciel ouvert. Fresques murales d'artistes internationaux." },
      { name: "Everglades National Park", description: "Parc national unique au monde. Airboat tours pour voir des alligators (à ~1h de Miami)." },
      { name: "Key Biscayne & Crandon Park", description: "Plage plus calme, nature préservée, vue sur la skyline de Miami." },
    ],
    matchInfo: "Le Hard Rock Stadium de Miami Gardens accueillera des matchs de phase de groupes et de phases à élimination directe. Le stade a été rénové avec un toit rétractable partiel pour protéger du soleil.",
    security: "Miami est sûre dans les zones touristiques. Attention aux effets personnels sur la plage. Évitez certains quartiers la nuit. Le 911 est le numéro d'urgence. Forte présence policière pendant la CDM.",
    visa: "Programme ESTA pour les Français (14 $, demande en ligne). Passeport biométrique obligatoire.",
    faq: [
      {
        question: "Comment aller au Hard Rock Stadium ?",
        answer: "Le Hard Rock Stadium est à Miami Gardens, au nord de Miami. Les options : VTC (Uber/Lyft, ~30-45 min depuis South Beach), navettes spéciales CDM, ou voiture (parking disponible mais cher les jours de match).",
      },
      {
        question: "Pleut-il beaucoup à Miami en été ?",
        answer: "Miami connaît des orages tropicaux fréquents en juin-juillet, généralement en fin d'après-midi. Ils sont courts mais intenses. Le reste de la journée est souvent ensoleillé. Le stade offre une protection partielle.",
      },
      {
        question: "Miami Beach ou Downtown pour la CDM ?",
        answer: "Miami Beach offre la plage et l'ambiance festive, idéal pour le séjour. Downtown/Brickell est plus pratique pour les déplacements vers le stade. Le meilleur compromis : Wynwood/Midtown, entre les deux.",
      },
    ],
    metaTitle: "Guide Miami — CDM 2026 | Hard Rock Stadium, Plages & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Miami : Hard Rock Stadium, plages, Little Havana, hébergement et conseils pratiques pour votre séjour.",
  },
  {
    slug: "mexico",
    name: "Mexico",
    country: "Mexique",
    flag: "🇲🇽",
    stadium: "Estadio Azteca",
    stadiumCapacity: "87 523 places",
    climate: "Tempéré grâce à l'altitude (2 240 m). Juin-juillet : 15-25°C, saison des pluies (averses en fin de journée). Plus frais qu'on ne le pense.",
    airport: "Aéroport International Benito Juárez (MEX), en plein centre-ville. Le nouvel aéroport Felipe Ángeles (NLU) est plus éloigné.",
    metro: "Le métro de Mexico est très étendu et peu cher (~0,30 €). La station Coyoacán (ligne 3) est proche de l'Estadio Azteca. Le Metrobús est aussi très pratique.",
    transport: "Métro, Metrobús, taxis Uber/Didi. Le trafic est très dense — privilégiez les transports en commun. Les jours de match, des accès spéciaux seront aménagés autour de l'Azteca.",
    lodging: [
      { quartier: "Roma / Condesa", budget: "50-150 $/nuit", description: "Quartiers branchés, restaurants, cafés, arbres. Le cœur bohème de Mexico. Très recommandé." },
      { quartier: "Polanco", budget: "80-250 $/nuit", description: "Quartier chic, musées (dont le Museo Nacional de Antropología), restaurants haut de gamme." },
      { quartier: "Centro Histórico", budget: "40-120 $/nuit", description: "Le cœur historique, Zócalo, cathédrale, Palais des Beaux-Arts. Animé et authentique." },
      { quartier: "Coyoacán", budget: "40-100 $/nuit", description: "Quartier bohème, maison de Frida Kahlo. Le plus proche de l'Estadio Azteca." },
    ],
    food: [
      { name: "Tacos al pastor", description: "Le plat emblématique de Mexico. Viande marinée, ananas, coriandre, sur tortilla de maïs. Essayez El Huequito ou El Vilsito." },
      { name: "Mole", description: "Sauce complexe à base de piment et chocolat. Le mole poblano et le mole negro sont des classiques." },
      { name: "Tamales & quesadillas", description: "Street food omniprésente. Les marchés (Coyoacán, Medellín) sont les meilleurs spots." },
      { name: "Mezcal & tequila", description: "La culture des spiritueux mexicains est riche. Bars à mezcal dans Roma/Condesa." },
    ],
    attractions: [
      { name: "Musée National d'Anthropologie", description: "L'un des plus grands musées du monde. Collections aztèque, maya, olmèque. Incontournable." },
      { name: "Teotihuacán", description: "Pyramides du Soleil et de la Lune, à 1h de Mexico. Site archéologique majeur. Arriver tôt." },
      { name: "Palais des Beaux-Arts", description: "Chef-d'œuvre architectural Art nouveau/Art déco. Murales de Diego Rivera à l'intérieur." },
      { name: "Xochimilco", description: "Promenade en trajinera (barque colorée) sur les canaux aztèques. Ambiance festive." },
      { name: "Maison de Frida Kahlo (Casa Azul)", description: "Musée dédié à l'artiste dans le quartier de Coyoacán. Réservation obligatoire." },
    ],
    matchInfo: "L'Estadio Azteca accueillera le match d'ouverture de la CDM 2026 le 11 juin, ainsi que des matchs de phase de groupes. C'est le seul stade à avoir accueilli deux finales de Coupe du Monde (1970 et 1986).",
    security: "Mexico est une grande métropole : restez dans les quartiers touristiques (Roma, Condesa, Polanco, Centro). Utilisez Uber/Didi plutôt que les taxis de rue. Évitez de montrer des objets de valeur. Le 911 est le numéro d'urgence.",
    visa: "Les ressortissants français n'ont pas besoin de visa pour le Mexique pour un séjour touristique de moins de 180 jours. Un passeport valide suffit.",
    faq: [
      {
        question: "L'Estadio Azteca accueille-t-il le match d'ouverture ?",
        answer: "Oui, le match d'ouverture de la Coupe du Monde 2026 se jouera à l'Estadio Azteca de Mexico le 11 juin 2026. C'est le stade le plus mythique du tournoi.",
      },
      {
        question: "Faut-il un visa pour le Mexique ?",
        answer: "Non, les ressortissants français, belges, suisses et canadiens n'ont pas besoin de visa pour un séjour touristique au Mexique (jusqu'à 180 jours). Un passeport valide suffit.",
      },
      {
        question: "L'altitude de Mexico pose-t-elle problème ?",
        answer: "Mexico est à 2 240 m d'altitude. Certains visiteurs peuvent ressentir un léger mal d'altitude les premiers jours (essoufflement, maux de tête). Hydratez-vous bien, évitez l'alcool le premier jour et montez les escaliers doucement.",
      },
    ],
    metaTitle: "Guide Mexico — CDM 2026 | Estadio Azteca, Culture & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Mexico : Estadio Azteca (match d'ouverture), gastronomie, culture, hébergement et conseils pratiques.",
  },
  {
    slug: "dallas",
    name: "Dallas",
    country: "États-Unis",
    flag: "🇺🇸",
    stadium: "AT&T Stadium",
    stadiumCapacity: "80 000 places (extensible à 100 000)",
    climate: "Très chaud en juin-juillet (32-40°C). Chaleur sèche à humide selon les jours. Le stade est climatisé avec un toit rétractable.",
    airport: "DFW (Dallas/Fort Worth International) est l'un des plus grands aéroports du monde. Dallas Love Field (DAL) dessert les vols domestiques Southwest.",
    metro: "DART (Dallas Area Rapid Transit) dessert Dallas mais pas directement Arlington (ville du AT&T Stadium). Un TRE Trinity Railway Express relie Dallas à Fort Worth via CentrePort.",
    transport: "Dallas est une ville très étalée, la voiture est quasi indispensable. VTC omniprésents. Des navettes CDM seront mises en place depuis Dallas et Fort Worth vers le AT&T Stadium à Arlington.",
    lodging: [
      { quartier: "Arlington", budget: "80-180 $/nuit", description: "Ville du AT&T Stadium. Pratique les jours de match, nombreux hôtels de chaîne." },
      { quartier: "Downtown Dallas", budget: "100-250 $/nuit", description: "Centre-ville, vie nocturne, restaurants. À ~30 min du stade." },
      { quartier: "Fort Worth — Stockyards", budget: "80-200 $/nuit", description: "Ambiance western authentique, rodéos, BBQ. À ~20 min du stade." },
      { quartier: "Uptown Dallas", budget: "120-280 $/nuit", description: "Quartier branché, bars, restaurants, trolley gratuit." },
    ],
    food: [
      { name: "Texas BBQ", description: "Le barbecue texan est un art. Brisket fumé pendant 12h, ribs, saucisses. Pecan Lodge, Cattleack BBQ, Terry Black's." },
      { name: "Tex-Mex", description: "Fusion texane-mexicaine : enchiladas, fajitas, queso, margaritas. Mi Cocina, El Fenix." },
      { name: "Chicken Fried Steak", description: "Spécialité texane : steak pané et frit, servi avec de la sauce blanche. AllGood Café." },
      { name: "Steakhouses", description: "Le Texas est le pays du bœuf. Bob's Steak & Chop House, Pappas Bros." },
    ],
    attractions: [
      { name: "Sixth Floor Museum (Dealey Plaza)", description: "Musée consacré à l'assassinat de JFK. Lieu historique majeur au centre de Dallas." },
      { name: "Fort Worth Stockyards", description: "Quartier historique western. Défilé quotidien de longhorns, rodéos, saloons." },
      { name: "Dallas Arts District", description: "Le plus grand quartier artistique urbain des États-Unis. Nasher, DMA, Perot Museum." },
      { name: "AT&T Stadium Tour", description: "Visite guidée du stade les jours sans match. Architecture impressionnante, écran géant iconique." },
    ],
    matchInfo: "Le AT&T Stadium d'Arlington accueillera des matchs de phase de groupes et des matchs à élimination directe. Son écran vidéo géant et sa climatisation en font un stade de premier plan.",
    security: "Dallas et Arlington sont sûres pour les touristes. Précautions habituelles dans les grandes villes américaines. Fort présence policière autour du stade les jours de match.",
    visa: "Programme ESTA pour les Français. Mêmes conditions que pour les autres villes américaines.",
    faq: [
      {
        question: "Le AT&T Stadium est-il climatisé ?",
        answer: "Oui, le AT&T Stadium dispose d'un toit rétractable et d'une climatisation puissante. Même par 40°C à l'extérieur, l'intérieur est confortable. C'est un avantage majeur pour les matchs d'été.",
      },
      {
        question: "Comment aller au AT&T Stadium sans voiture ?",
        answer: "Le AT&T Stadium est à Arlington, entre Dallas et Fort Worth. Il n'est pas directement desservi par le DART. Des navettes CDM seront organisées. Sinon, Uber/Lyft sont l'option la plus pratique.",
      },
      {
        question: "Vaut-il mieux loger à Dallas ou Fort Worth ?",
        answer: "Les deux sont à distance similaire du stade (~30 min). Dallas offre plus de vie nocturne et de restaurants. Fort Worth a une ambiance western unique et authentique. Arlington est le plus pratique mais moins animé.",
      },
    ],
    metaTitle: "Guide Dallas — CDM 2026 | AT&T Stadium, BBQ & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Dallas : AT&T Stadium, BBQ texan, hébergement, transport et conseils pratiques pour votre séjour.",
  },
  {
    slug: "houston",
    name: "Houston",
    country: "États-Unis",
    flag: "🇺🇸",
    stadium: "NRG Stadium",
    stadiumCapacity: "72 220 places",
    climate: "Très chaud et humide en juin-juillet (30-38°C avec forte humidité). Le stade est climatisé avec un toit rétractable. Prévoir hydratation.",
    airport: "George Bush Intercontinental (IAH) pour les vols internationaux. William P. Hobby (HOU) pour les vols domestiques, plus proche du centre.",
    metro: "METRORail (tramway) avec 3 lignes. La ligne rouge dessert le centre-ville. Le NRG Stadium est accessible en bus METRO et navettes les jours d'événements.",
    transport: "Houston est très étalée. Voiture ou VTC recommandés. Le NRG Stadium dispose de vastes parkings. Des navettes CDM seront probablement mises en place.",
    lodging: [
      { quartier: "Medical Center / NRG Park", budget: "80-180 $/nuit", description: "Le plus proche du stade. Nombreux hôtels, accès METRORail." },
      { quartier: "Downtown Houston", budget: "100-250 $/nuit", description: "Gratte-ciels, restaurants, vie nocturne. À ~15 min du stade." },
      { quartier: "Montrose / Museum District", budget: "90-200 $/nuit", description: "Quartier culturel et bohème. Musées gratuits, galeries, cafés." },
      { quartier: "The Heights", budget: "80-180 $/nuit", description: "Quartier résidentiel branché, brunch culture, boutiques vintage." },
    ],
    food: [
      { name: "Texas BBQ", description: "Houston rivalise avec Austin pour le meilleur BBQ du Texas. Truth BBQ, Killen's BBQ, Pinkerton's." },
      { name: "Cuisine vietnamienne", description: "Houston a la 3e plus grande communauté vietnamienne des USA. Pho Binh, Crawfish & Noodles." },
      { name: "Tex-Mex & cuisine mexicaine", description: "Authentique et délicieuse. El Tiempo Cantina, Hugo's, Original Ninfa's on Navigation." },
      { name: "Cuisine cajun/créole", description: "Influence de la Louisiane voisine. Écrevisses, gumbo, jambalaya." },
    ],
    attractions: [
      { name: "Space Center Houston (NASA)", description: "Centre spatial de la NASA. Simulateurs, fusées, histoire de la conquête spatiale. Incontournable." },
      { name: "Museum District", description: "19 musées dont plusieurs gratuits. Museum of Fine Arts, Houston Museum of Natural Science." },
      { name: "Buffalo Bayou Park", description: "Parc urbain le long du bayou. Pistes cyclables, kayak, vues sur la skyline." },
      { name: "San Jacinto Monument", description: "Monument commémorant l'indépendance du Texas. Vue panoramique depuis le sommet." },
    ],
    matchInfo: "Le NRG Stadium accueillera des matchs de phase de groupes de la CDM 2026. Son toit rétractable et sa climatisation sont essentiels vu la chaleur de Houston en été.",
    security: "Houston est sûre dans les zones touristiques et les quartiers recommandés. Précautions habituelles pour une grande ville américaine. Le 911 est le numéro d'urgence.",
    visa: "Programme ESTA pour les Français (14 $, passeport biométrique).",
    faq: [
      {
        question: "Le NRG Stadium est-il climatisé ?",
        answer: "Oui, le NRG Stadium dispose d'un toit rétractable et d'une climatisation complète. C'est essentiel à Houston où les températures dépassent régulièrement 35°C en été avec une forte humidité.",
      },
      {
        question: "Houston vaut-elle le détour en dehors des matchs ?",
        answer: "Absolument. Le Space Center Houston (NASA), le Museum District (19 musées, plusieurs gratuits), et la scène gastronomique diversifiée font de Houston une destination intéressante au-delà du football.",
      },
      {
        question: "Comment se déplacer à Houston ?",
        answer: "Houston est très étalée. La voiture ou les VTC (Uber/Lyft) sont les options les plus pratiques. Le METRORail dessert le centre-ville et le quartier du stade. Des navettes CDM seront mises en place.",
      },
    ],
    metaTitle: "Guide Houston — CDM 2026 | NRG Stadium, NASA & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Houston : NRG Stadium, Space Center NASA, BBQ texan, hébergement et conseils pratiques.",
  },
  {
    slug: "toronto",
    name: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    stadium: "BMO Field",
    stadiumCapacity: "30 000 places (extensible pour la CDM)",
    climate: "Été agréable : 20-30°C en juin-juillet, avec quelques journées chaudes et humides. Soirées fraîches. Orages occasionnels.",
    airport: "Toronto Pearson (YYZ), principal aéroport du Canada, à ~25 km du centre. Le UP Express relie l'aéroport à Union Station en 25 min.",
    metro: "TTC (Toronto Transit Commission) : métro, tramways et bus. BMO Field est accessible en tramway (ligne 509/510 vers Exhibition Place) ou à pied depuis la station Exhibition du GO Transit.",
    transport: "Toronto est bien desservie en transport en commun. Le tramway est pratique pour le centre-ville. Uber disponible. Le vélo est populaire en été (Bike Share Toronto).",
    lodging: [
      { quartier: "Downtown — Entertainment District", budget: "120-300 CAD/nuit", description: "Le plus proche de BMO Field. CN Tower, Rogers Centre, vie nocturne." },
      { quartier: "Queen West / King West", budget: "100-250 CAD/nuit", description: "Quartiers branchés, galeries, restaurants, bars. Tramway direct vers le stade." },
      { quartier: "Distillery District", budget: "130-280 CAD/nuit", description: "Architecture victorienne, boutiques artisanales, restaurants. Ambiance unique." },
      { quartier: "Kensington Market / Chinatown", budget: "80-180 CAD/nuit", description: "Quartier multiculturel, marché, cuisine du monde. Budget-friendly." },
    ],
    food: [
      { name: "Poutine", description: "Le plat national canadien : frites, fromage en grains, sauce brune. Smoke's Poutinerie ou Poutini's." },
      { name: "Peameal bacon sandwich", description: "Spécialité torontoise. Le meilleur au St. Lawrence Market (Carousel Bakery)." },
      { name: "Cuisine multiculturelle", description: "Toronto est l'une des villes les plus diversifiées au monde. Little India, Greektown, Koreatown, Little Italy." },
      { name: "Brasseries craft", description: "Scène brassicole dynamique. Bellwoods Brewery, Left Field, Blood Brothers." },
    ],
    attractions: [
      { name: "CN Tower", description: "Tour emblématique de Toronto (553 m). Vue panoramique, plancher de verre, restaurant tournant." },
      { name: "Îles de Toronto", description: "Ferry gratuit vers les îles. Plages, vélo, vue sur la skyline. Parfait pour une journée de repos." },
      { name: "Royal Ontario Museum (ROM)", description: "Plus grand musée du Canada. Collections d'histoire naturelle et de cultures du monde." },
      { name: "St. Lawrence Market", description: "Marché couvert historique. Produits frais, fromages, viandes, le meilleur peameal bacon sandwich." },
      { name: "Distillery District", description: "Ancien quartier industriel transformé en village piéton. Art, boutiques, restaurants." },
    ],
    matchInfo: "BMO Field accueillera des matchs de phase de groupes. Le stade, habituellement domicile du Toronto FC (MLS), sera agrandi temporairement pour la CDM 2026.",
    security: "Toronto est l'une des grandes villes les plus sûres d'Amérique du Nord. Précautions habituelles (pickpockets dans les zones touristiques). Le 911 est le numéro d'urgence.",
    visa: "Les ressortissants français ont besoin d'une AVE (Autorisation de Voyage Électronique) pour entrer au Canada par avion (7 CAD, demande en ligne). Pas de visa requis pour un séjour de moins de 6 mois.",
    faq: [
      {
        question: "Comment aller à BMO Field ?",
        answer: "BMO Field est situé à Exhibition Place, au bord du lac Ontario. Accessible en tramway (lignes 509/510 depuis Union Station), en GO Transit (station Exhibition), ou à pied depuis le centre-ville (~20-30 min).",
      },
      {
        question: "Faut-il un visa pour le Canada ?",
        answer: "Les Français n'ont pas besoin de visa mais doivent obtenir une AVE (Autorisation de Voyage Électronique) pour entrer au Canada par avion. La demande se fait en ligne (7 CAD) et est généralement approuvée en quelques minutes.",
      },
      {
        question: "Toronto est-elle chère ?",
        answer: "Toronto est comparable à une grande ville européenne. Les hébergements sont un peu moins chers qu'à New York. Comptez 100-250 CAD/nuit pour l'hôtel, 30-60 CAD/jour pour les repas. Le transport en commun est abordable (3,35 CAD le trajet).",
      },
    ],
    metaTitle: "Guide Toronto — CDM 2026 | BMO Field, Culture & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Toronto : BMO Field, CN Tower, poutine, hébergement multiculturel et conseils pratiques pour le Canada.",
  },
  {
    slug: "monterrey",
    name: "Monterrey",
    country: "Mexique",
    flag: "🇲🇽",
    stadium: "Estadio BBVA",
    stadiumCapacity: "53 500 places",
    climate: "Très chaud et sec en juin-juillet (30-40°C). Chaleur intense en journée, nuits plus fraîches. Hydratation essentielle.",
    airport: "Aéroport International de Monterrey (MTY), à ~25 km du centre-ville. Vols depuis Mexico, Dallas, Houston et autres villes.",
    metro: "Metrorrey : 2 lignes de métro couvrant le centre-ville. Le stade BBVA à Guadalupe est accessible en bus et VTC.",
    transport: "Uber et taxis très disponibles. Le métro couvre le centre mais le stade nécessite un trajet en VTC ou navette. La ville est assez étalée.",
    lodging: [
      { quartier: "Centro / Barrio Antiguo", budget: "40-120 $/nuit", description: "Centre historique, vie nocturne, Macroplaza. Le cœur de Monterrey." },
      { quartier: "San Pedro Garza García", budget: "60-200 $/nuit", description: "Quartier chic, centres commerciaux, restaurants haut de gamme." },
      { quartier: "Valle Oriente", budget: "50-150 $/nuit", description: "Zone moderne, hôtels de chaîne, proche des montagnes." },
      { quartier: "Guadalupe (près du stade)", budget: "30-80 $/nuit", description: "Le plus proche de l'Estadio BBVA. Options budget." },
    ],
    food: [
      { name: "Cabrito (chevreau rôti)", description: "Le plat emblématique de Monterrey. Rôti lentement au charbon. El Rey del Cabrito est l'adresse mythique." },
      { name: "Carne asada", description: "Monterrey est la capitale de la viande grillée au Mexique. Arrachera, carne asada, chorizo — accompagnés de tortillas de farine." },
      { name: "Machacado con huevo", description: "Petit-déjeuner typique du nord du Mexique : viande séchée brouillée avec des œufs." },
      { name: "Bière artisanale", description: "Monterrey est le berceau de la bière mexicaine (Cuauhtémoc Moctezuma). Scène craft en plein essor." },
    ],
    attractions: [
      { name: "Cerro de la Silla", description: "Montagne emblématique de Monterrey, symbole de la ville. Randonnées et points de vue." },
      { name: "Paseo Santa Lucía", description: "Canal artificiel avec promenade de 2,5 km reliant le centre aux musées. Balade en barque." },
      { name: "Museo de Arte Contemporáneo (MARCO)", description: "Musée d'art contemporain réputé. Architecture remarquable, expositions internationales." },
      { name: "Parque Fundidora", description: "Ancien complexe sidérurgique transformé en parc. Musées, lac, patinoire, pistes cyclables." },
      { name: "Grutas de García", description: "Grottes spectaculaires à ~45 min de Monterrey. Formations calcaires millénaires." },
    ],
    matchInfo: "L'Estadio BBVA, stade moderne inauguré en 2015 (domicile des Rayados de Monterrey), accueillera des matchs de phase de groupes de la CDM 2026.",
    security: "Monterrey est une grande ville industrielle. Les zones touristiques et les quartiers recommandés sont sûrs. Évitez les sorties isolées la nuit. Utilisez Uber plutôt que les taxis de rue. Le 911 est le numéro d'urgence.",
    visa: "Pas de visa nécessaire pour les Français au Mexique (séjour touristique < 180 jours). Passeport valide suffisant.",
    faq: [
      {
        question: "Comment aller à l'Estadio BBVA ?",
        answer: "L'Estadio BBVA est situé à Guadalupe, dans la banlieue est de Monterrey. Uber est l'option la plus pratique (~20-30 min depuis le centre). Des navettes seront mises en place les jours de match.",
      },
      {
        question: "Monterrey est-elle sûre pour les touristes ?",
        answer: "Monterrey est la capitale économique du nord du Mexique. Les quartiers touristiques (Centro, San Pedro, Valle) sont sûrs. Restez dans les zones recommandées, utilisez Uber, et prenez les précautions habituelles d'une grande ville.",
      },
      {
        question: "Fait-il très chaud à Monterrey en été ?",
        answer: "Oui, les températures atteignent 35-40°C en juin-juillet. La chaleur est sèche, contrairement à Houston ou Miami. Hydratez-vous abondamment, portez un chapeau et évitez l'exposition prolongée au soleil. Le stade est ouvert.",
      },
    ],
    metaTitle: "Guide Monterrey — CDM 2026 | Estadio BBVA, Gastronomie & Conseils",
    metaDescription: "Guide complet pour la CDM 2026 à Monterrey : Estadio BBVA, cabrito, carne asada, hébergement et conseils pratiques pour le nord du Mexique.",
  },
];

const citiesBySlug: Record<string, CityGuide> = {};
for (const c of cities) {
  citiesBySlug[c.slug] = c;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function GuideVillePage({ params }: PageProps) {
  const { slug } = await params;
  const city = citiesBySlug[slug];
  if (!city) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Guides", url: "/guides" },
          { name: `Guide ${city.name}`, url: `/guide-ville/${city.slug}` },
        ]}
        baseUrl={domains.fr}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white dark:bg-[#0F1923]">
        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-br from-[#0A1628] via-[#0F1923] to-[#162A3E] text-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
              {city.flag} {city.country} — Guide CDM 2026
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
              {city.name}
            </h1>
            <p className="text-xl text-white/70 mb-6">
              🏟️ {city.stadium} — {city.stadiumCapacity}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-white/50 uppercase tracking-wide mb-1">☀️ Climat</p>
                <p className="text-sm text-white/80">{city.climate}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-white/50 uppercase tracking-wide mb-1">✈️ Aéroport</p>
                <p className="text-sm text-white/80">{city.airport}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-xs text-white/50 uppercase tracking-wide mb-1">🚇 Transport</p>
                <p className="text-sm text-white/80">{city.metro}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Transport détaillé ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              🚌 Se déplacer à {city.name}
            </h2>
            <div className="p-5 rounded-xl bg-gray-50 dark:bg-[#162A3E] border border-gray-100 dark:border-white/5">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{city.transport}</p>
            </div>
          </div>
        </section>

        {/* ─── Où loger ─── */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🏨 Où loger
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {city.lodging.map((l, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{l.quartier}</h3>
                    <span className="text-sm font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {l.budget}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{l.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Où manger ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🍽️ Où manger
            </h2>
            <div className="space-y-4">
              {city.food.map((f, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-5 rounded-xl bg-gray-50 dark:bg-[#162A3E] border border-gray-100 dark:border-white/5"
                >
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{f.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Que voir ─── */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🗺️ Que voir & que faire
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {city.attractions.map((a, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{a.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{a.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Matchs prévus ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              ⚽ Matchs prévus au {city.stadium}
            </h2>
            <div className="p-5 rounded-xl bg-gradient-to-r from-accent/5 to-transparent border border-accent/10">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{city.matchInfo}</p>
            </div>
          </div>
        </section>

        {/* ─── Sécurité & Visa ─── */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🛡️ Sécurité & Visa
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">🔒 Sécurité</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{city.security}</p>
              </div>
              <div className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">🛂 Visa</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{city.visa}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              ❓ Questions fréquentes
            </h2>
            <div className="space-y-4">
              {city.faq.map((f, i) => (
                <details
                  key={i}
                  className="group p-5 rounded-xl bg-gray-50 dark:bg-[#162A3E] border border-gray-100 dark:border-white/5"
                >
                  <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white flex items-center justify-between">
                    <span>{f.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
                    {f.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Back navigation ─── */}
        <section className="py-8 border-t border-gray-100 dark:border-white/5">
          <div className="mx-auto max-w-5xl px-4 flex flex-wrap gap-4">
            <Link
              href="/"
              className="text-sm text-accent hover:underline"
            >
              ← Accueil
            </Link>
            <Link
              href="/guides"
              className="text-sm text-accent hover:underline"
            >
              ← Tous les guides
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
