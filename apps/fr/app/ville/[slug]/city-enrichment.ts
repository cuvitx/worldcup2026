export interface CityEnrichment {
  weather: {
    juinMin: number;
    juinMax: number;
    juilletMin: number;
    juilletMax: number;
    description: string;
  };
  transport: {
    aeroport: string;
    transports: string[];
  };
  budget: {
    hotelMin: number;
    hotelMax: number;
    repas: number;
    biere: number;
    currency: string;
  };
  activities: {
    title: string;
    description: string;
  }[];
}

export const cityEnrichmentData: Record<string, CityEnrichment> = {
  "new-york-new-jersey": {
    weather: {
      juinMin: 19,
      juinMax: 28,
      juilletMin: 22,
      juilletMax: 31,
      description: "Chaud et humide — prévoir des vêtements légers et un imperméable pour les orages estivaux",
    },
    transport: {
      aeroport: "JFK International Airport (25 min en AirTrain) — Newark Liberty Airport (NJ Transit direct)",
      transports: ["Métro MTA (24h/24)", "NJ Transit vers MetLife Stadium", "Bus express fans day-of-match"],
    },
    budget: {
      hotelMin: 180,
      hotelMax: 450,
      repas: 25,
      biere: 9,
      currency: "USD",
    },
    activities: [
      { title: "Statue de la Liberté & Ellis Island", description: "Icône mondiale, réservez vos billets à l'avance — ferry depuis Battery Park" },
      { title: "Central Park", description: "800 hectares de verdure en plein cœur de Manhattan — vélo, jogging ou simple flânerie" },
      { title: "Broadway", description: "Le spectacle vivant à son apogée — des comédies musicales aux grandes pièces de théâtre" },
    ],
  },
  "dallas-fort-worth": {
    weather: {
      juinMin: 24,
      juinMax: 37,
      juilletMin: 26,
      juilletMax: 39,
      description: "Très chaud et sec — toit rétractable de l'AT&T Stadium : une bénédiction ! Hydratez-vous",
    },
    transport: {
      aeroport: "Dallas/Fort Worth International Airport (DFW) — 3e aéroport mondial",
      transports: ["DART Light Rail (Dallas)", "Uber/Lyft recommandé", "Navettes matchs depuis quartiers clés"],
    },
    budget: {
      hotelMin: 120,
      hotelMax: 300,
      repas: 18,
      biere: 7,
      currency: "USD",
    },
    activities: [
      { title: "Stockyards District (Fort Worth)", description: "Rodéo authentique, honky-tonks et défilé de longhorns quotidien — le vrai Texas" },
      { title: "Deep Ellum (Dallas)", description: "Quartier musical underground — bars, live music et street art à chaque coin de rue" },
      { title: "Perot Museum of Nature and Science", description: "Musée de sciences ultra-moderne avec des dizaines d'expositions interactives" },
    ],
  },
  "miami": {
    weather: {
      juinMin: 25,
      juinMax: 32,
      juilletMin: 26,
      juilletMax: 33,
      description: "Tropical — chaleur intense avec averses en fin d'après-midi. Evitez de marcher entre 12h et 15h",
    },
    transport: {
      aeroport: "Miami International Airport (MIA) — Metrorail Orange Line directe vers downtown",
      transports: ["Metrorail & Metromover (gratuit en centre-ville)", "Brightline vers Fort Lauderdale", "Bus SunPass"],
    },
    budget: {
      hotelMin: 150,
      hotelMax: 500,
      repas: 22,
      biere: 8,
      currency: "USD",
    },
    activities: [
      { title: "South Beach", description: "Plages mythiques, Art Deco District et Ocean Drive — la quintessence de Miami" },
      { title: "Wynwood Walls", description: "Musée à ciel ouvert avec les plus grandes fresques de street art au monde" },
      { title: "Little Havana", description: "Café cubain, cigares roulés à la main et dominos en plein air — un voyage sans quitter les États-Unis" },
    ],
  },
  "atlanta": {
    weather: {
      juinMin: 21,
      juinMax: 31,
      juilletMin: 23,
      juilletMax: 33,
      description: "Chaud et humide — orages possibles en après-midi. Le toit rétractable du Mercedes-Benz Stadium est votre ami",
    },
    transport: {
      aeroport: "Hartsfield-Jackson Atlanta International (ATL) — 1er aéroport mondial en trafic, MARTA Gold/Red Line directe",
      transports: ["MARTA (métro & bus)", "Streetcar Atlanta (centre-ville)", "Lyft/Uber très développé"],
    },
    budget: {
      hotelMin: 130,
      hotelMax: 320,
      repas: 20,
      biere: 7,
      currency: "USD",
    },
    activities: [
      { title: "National Center for Civil and Human Rights", description: "Musée émouvant sur les droits civiques — visiter le bureau de MLK est une expérience bouleversante" },
      { title: "Georgia Aquarium", description: "Plus grand aquarium du monde occidental — requins baleines et spectacles de dauphins" },
      { title: "Ponce City Market", description: "Marché gourmet et centre commercial dans une ancienne usine — roof deck avec vue sur Atlanta" },
    ],
  },
  "seattle": {
    weather: {
      juinMin: 12,
      juinMax: 22,
      juilletMin: 14,
      juilletMax: 25,
      description: "Agréable en été ! Températures douces et peu de pluie — la meilleure saison pour visiter Seattle",
    },
    transport: {
      aeroport: "Seattle-Tacoma International Airport (SEA) — Link Light Rail directe vers centre-ville (40 min)",
      transports: ["Link Light Rail (vers Lumen Field)", "King County Metro Bus", "Water Taxis & ferries Sound Transit"],
    },
    budget: {
      hotelMin: 140,
      hotelMax: 380,
      repas: 22,
      biere: 8,
      currency: "USD",
    },
    activities: [
      { title: "Pike Place Market", description: "Le marché public historique de Seattle — les fameux lanceurs de poissons, producteurs locaux et vue sur le Puget Sound" },
      { title: " Space Needle", description: "Symbole de Seattle depuis 1962 — vue à 360° sur la ville, le Mont Rainier et les Cascades" },
      { title: "Quartier Capitol Hill", description: "Épicentre de la culture coffee à Seattle — des dizaines de micro-torréfacteurs et une nightlife animée" },
    ],
  },
  "houston": {
    weather: {
      juinMin: 24,
      juinMax: 34,
      juilletMin: 26,
      juilletMax: 36,
      description: "Très chaud et très humide — le toit rétractable du NRG Stadium est indispensable. Climatisation partout !",
    },
    transport: {
      aeroport: "George Bush Intercontinental Airport (IAH) — 45 min en voiture. William P. Hobby Airport (HOU) — plus proche du centre",
      transports: ["METRORail (3 lignes)", "METRO Bus (réseau étendu)", "Voiture fortement recommandée"],
    },
    budget: {
      hotelMin: 110,
      hotelMax: 280,
      repas: 18,
      biere: 6,
      currency: "USD",
    },
    activities: [
      { title: " Space Center Houston", description: "Centre officiel de la NASA — voir de vraies fusées et vivre l'histoire de la conquête spatiale" },
      { title: "Museum District", description: "19 musées gratuits ou accessibles — Fine Arts, Natural Science, Holocaust Museum en plein cœur de la ville" },
      { title: "Bellaire Chinatown", description: "L'une des plus grandes et authentiques communautés asiatiques des États-Unis — gastronomie exceptionnelle" },
    ],
  },
  "philadelphia": {
    weather: {
      juinMin: 18,
      juinMax: 28,
      juilletMin: 21,
      juilletMax: 31,
      description: "Chaud et humide — temps idéal pour flâner dans le centre historique tôt le matin avant les matchs",
    },
    transport: {
      aeroport: "Philadelphia International Airport (PHL) — SEPTA Airport Line directe vers Center City (25 min)",
      transports: ["SEPTA (métro, bus, tramways)", "SEPTA vers le complexe sportif (Broad Street Line)", "Amtrak depuis New York (1h15)"],
    },
    budget: {
      hotelMin: 130,
      hotelMax: 350,
      repas: 20,
      biere: 7,
      currency: "USD",
    },
    activities: [
      { title: " Liberty Bell & Independence Hall", description: "Le berceau de la démocratie américaine — où fut signée la Déclaration d'Indépendance en 1776" },
      { title: "Reading Terminal Market", description: "Marché couvert historique — cheesesteak, soft pretzels et spécialités amish depuis 1893" },
      { title: "Art Museum & Rocky Steps", description: "Courez les marches comme Rocky Balboa et profitez d'une vue imprenable sur le Benjamin Franklin Parkway" },
    ],
  },
  "kansas-city": {
    weather: {
      juinMin: 20,
      juinMax: 31,
      juilletMin: 23,
      juilletMax: 34,
      description: "Chaud avec orages spectaculaires typiques du Midwest — l'ambiance électrique ne vient pas que du stade !",
    },
    transport: {
      aeroport: "Kansas City International Airport (MCI) — rénové en 2023, 30 min en voiture du centre",
      transports: ["KC Streetcar (downtown, en expansion)", "KC Metro Bus", "Voiture recommandée pour zones périphériques"],
    },
    budget: {
      hotelMin: 100,
      hotelMax: 250,
      repas: 16,
      biere: 6,
      currency: "USD",
    },
    activities: [
      { title: "Kansas City BBQ", description: "Le pèlerinage gastronomique ultime — Joe's KC, Q39 et Arthur Bryant's, temples du brisket et des burnt ends" },
      { title: "18th & Vine Jazz District", description: "Berceau du jazz Kansas City style — musée du jazz et de la Negro Leagues Baseball au cœur du quartier historique" },
      { title: "Country Club Plaza", description: "Quartier d'inspiration hispanique avec fontaines et architecture mauresque — shopping et gastronomie de qualité" },
    ],
  },
  "boston": {
    weather: {
      juinMin: 15,
      juinMax: 24,
      juilletMin: 18,
      juilletMax: 28,
      description: "Agréable — une des meilleures périodes pour visiter Boston. Quelques journées orageuses possible",
    },
    transport: {
      aeroport: "Logan International Airport (BOS) — Silver Line T directe vers South Station (25 min)",
      transports: ["MBTA « The T » (métro le plus ancien des USA)", "Bus MBTA (réseau étendu)", "Amtrak Acela vers New York (3h30)"],
    },
    budget: {
      hotelMin: 150,
      hotelMax: 420,
      repas: 22,
      biere: 8,
      currency: "USD",
    },
    activities: [
      { title: "Freedom Trail", description: "Circuit pédestre de 4 km reliant 16 sites historiques de la Révolution américaine — gratuit et fascinant" },
      { title: "Fenway Park", description: "Le plus vieux stade de baseball des États-Unis (1912) — visites guidées disponibles même hors matchs" },
      { title: "Harvard & MIT (Cambridge)", description: "Traversez la Charles River pour explorer les campus légendaires de deux des plus grandes universités mondiales" },
    ],
  },
  "san-francisco-bay-area": {
    weather: {
      juinMin: 12,
      juinMax: 18,
      juilletMin: 13,
      juilletMax: 20,
      description: " Surprise ! San Francisco est FROIDE en été (brouillard de Karl) — prévoyez imperméable et couches",
    },
    transport: {
      aeroport: "San Francisco International Airport (SFO) — BART directe vers downtown SF (30 min)",
      transports: ["BART (métro Bay Area)", "Muni SF (bus, tramways, câble-cars)", "Ferry vers Oakland et autres villes de la baie"],
    },
    budget: {
      hotelMin: 200,
      hotelMax: 550,
      repas: 28,
      biere: 10,
      currency: "USD",
    },
    activities: [
      { title: "Golden Gate Bridge", description: "Traverser le pont à pied ou en vélo avec vue sur la baie — gratuit et inoubliable" },
      { title: "Cable Cars & Fisherman's Wharf", description: "Les tramways historiques sur les collines de SF et le front de mer animé avec la Ghirardelli Square" },
      { title: "Napa Valley", description: "À 1h de San Francisco — des centaines de domaines viticoles de classe mondiale dans un cadre magnifique" },
    ],
  },
  "los-angeles": {
    weather: {
      juinMin: 16,
      juinMax: 26,
      juilletMin: 18,
      juilletMax: 28,
      description: "Parfait ! Soleil quasi-garanti, températures agréables — le brouillard matinal côtier se dissipe rapidement",
    },
    transport: {
      aeroport: "Los Angeles International Airport (LAX) — futur Automated People Mover vers le métro (2024)",
      transports: ["Metro Rail (lignes A, B, C, D, E, K)", "Big Blue Bus", "Voiture presque incontournable (trafic légendaire)"],
    },
    budget: {
      hotelMin: 160,
      hotelMax: 500,
      repas: 25,
      biere: 9,
      currency: "USD",
    },
    activities: [
      { title: " Hollywood & Universal Studios", description: "Marchez sur Hollywood Boulevard, photographiez le panneau HOLLYWOOD et explorez les studios Universal" },
      { title: "Venice Beach & Santa Monica", description: "Le boardwalk de Venice avec ses artistes de rue, son skatepark et ses body-builders à Muscle Beach" },
      { title: "Getty Center", description: "Musée d'art de renommée mondiale — collection impressionniste et vue panoramique sur LA — entrée gratuite" },
    ],
  },
  "mexico-city": {
    weather: {
      juinMin: 12,
      juinMax: 22,
      juilletMin: 11,
      juilletMax: 21,
      description: "Frais et pluvieux (saison des pluies) — mais les matchs sont à l'abri dans le légendaire Estadio Azteca !",
    },
    transport: {
      aeroport: "Aeropuerto Internacional Felipe Ángeles (AIFA) — ou Benito Juárez (MEX, ancien) pour les vols intérieurs",
      transports: ["Metro CDMX (12 lignes, très économique)", "Metrobús BRT (réseau étendu)", "Ecobici (vélos en libre-service)"],
    },
    budget: {
      hotelMin: 60,
      hotelMax: 200,
      repas: 8,
      biere: 3,
      currency: "USD",
    },
    activities: [
      { title: "Teotihuacán", description: "À 50 km — montez sur la Pyramide du Soleil pour une vue à couper le souffle sur la Cité des Dieux" },
      { title: "Frida Kahlo Museum (La Casa Azul)", description: "Plongée dans l'univers de l'artiste mexicaine dans sa maison d'enfance à Coyoacán — réservez longtemps à l'avance" },
      { title: "Mercado de la Merced & street food", description: "Le plus grand marché de CDMX — tacos, tlayudas, tamales et une explosion de saveurs authentiques" },
    ],
  },
  "guadalajara": {
    weather: {
      juinMin: 15,
      juinMax: 27,
      juilletMin: 15,
      juilletMax: 26,
      description: "Saison des pluies mais températures agréables — la Perle de l'Occident est magnifique en été",
    },
    transport: {
      aeroport: "Aeropuerto Internacional Miguel Hidalgo y Costilla (GDL) — 20 min du centre en taxi",
      transports: ["Tren Ligero (tramway urbain)", "Bus Macrobús (BRT)", "Taxi ou Uber recommandé la nuit"],
    },
    budget: {
      hotelMin: 50,
      hotelMax: 160,
      repas: 7,
      biere: 2.5,
      currency: "USD",
    },
    activities: [
      { title: "Tequila & Mariachi", description: "Découvrez la ville natale du tequila et du mariachi — visite de la région de Tequila à 1h en train touristique" },
      { title: "Centro Histórico", description: "Cathédrale baroque, Palais du Gouvernement et ses fresques d'Orozco — le cœur historique de Guadalajara" },
      { title: "Lago de Chapala", description: "Le plus grand lac naturel du Mexique à 45 min — villages colorés, pêche traditionnelle et couchers de soleil" },
    ],
  },
  "monterrey": {
    weather: {
      juinMin: 22,
      juinMax: 36,
      juilletMin: 24,
      juilletMax: 37,
      description: "Très chaud ! La ville encaissée entre les montagnes crée un effet thermique — partez tôt le matin pour les visites",
    },
    transport: {
      aeroport: "Aeropuerto Internacional General Mariano Escobedo (MTY) — 25 min du centre",
      transports: ["Metro de Monterrey (2 lignes)", "Ecovía BRT", "Taxi ou Uber pour les zones éloignées"],
    },
    budget: {
      hotelMin: 55,
      hotelMax: 180,
      repas: 9,
      biere: 2.5,
      currency: "USD",
    },
    activities: [
      { title: "Parque Nacional Cumbres de Monterrey", description: "Randonnée dans la Sierra Madre — la Cascada Cola de Caballo et le Cañón de Matacanes sont spectaculaires" },
      { title: "Barrio Antiguo", description: "Quartier historique plein de vie — bars, galeries d'art et culture regio authentique le vendredi soir" },
      { title: "Cabrito et gastronomie regio", description: "La cuisine de Monterrey est unique au Mexique — cabrito (chevreau rôti), machacado et pan de campo" },
    ],
  },
  "toronto": {
    weather: {
      juinMin: 14,
      juinMax: 24,
      juilletMin: 17,
      juilletMax: 27,
      description: "Agréable — Toronto est magnifique en été. Quelques pluies possibles mais rarement longues",
    },
    transport: {
      aeroport: "Toronto Pearson International Airport (YYZ) — Union Pearson Express (25 min vers Union Station)",
      transports: ["TTC (métro, tramways, bus)", "GO Transit (trains régionaux)", "Billy Bishop Airport (YTZ) pour vols domestiques"],
    },
    budget: {
      hotelMin: 140,
      hotelMax: 380,
      repas: 20,
      biere: 8,
      currency: "CAD",
    },
    activities: [
      { title: "CN Tower", description: "Promenade sur le toit vitré à 356m d'altitude — vue à 360° sur Toronto, le lac Ontario et les États-Unis" },
      { title: "Kensington Market & Chinatown", description: "Deux des quartiers les plus multiculturels au monde — street food, marchés vintage et ambiance unique" },
      { title: "Toronto Islands", description: "Ferry de 15 min depuis le centre — plages, vélos et vue imprenable sur la skyline de Toronto" },
    ],
  },
  "vancouver": {
    weather: {
      juinMin: 13,
      juinMax: 21,
      juilletMin: 15,
      juilletMax: 24,
      description: "Le meilleur moment pour visiter ! Enfin sec et ensoleillé — les montagnes enneigées en toile de fond sont sublimes",
    },
    transport: {
      aeroport: "Vancouver International Airport (YVR) — Canada Line (SkyTrain) directe vers downtown (25 min)",
      transports: ["SkyTrain (3 lignes automatiques)", "Translink Bus (réseau dense)", "SeaBus vers North Vancouver"],
    },
    budget: {
      hotelMin: 160,
      hotelMax: 420,
      repas: 22,
      biere: 8,
      currency: "CAD",
    },
    activities: [
      { title: "Stanley Park", description: "400 hectares de forêt tempérée en plein cœur de la ville — promenade en vélo sur le Seawall avec vue sur les montagnes" },
      { title: "Whistler (option day trip)", description: "À 2h de Vancouver — activités estivales (VTT, randonnée, luge d'été) dans la station la plus réputée d'Amérique du Nord" },
      { title: "Granville Island & gastronomie", description: "Marché public artisanal, microbrasseries et restaurants de fruits de mer — le cœur gastronomique de Vancouver" },
    ],
  },
};
