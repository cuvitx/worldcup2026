import type { City } from "./types";

export const cities: City[] = [
  // ============================================================
  // USA (11 host cities)
  // ============================================================
  {
    id: "new-york-new-jersey",
    name: "New York / New Jersey",
    slug: "new-york-new-jersey",
    country: "USA",
    state: "New Jersey",
    population: 20140470,
    timezone: "America/New_York",
    description:
      "New York, la ville qui ne dort jamais, s'apprête à vivre son plus grand moment footballistique : accueillir la finale de la Coupe du Monde 2026 au MetLife Stadium d'East Rutherford, dans le New Jersey voisin. La mégalopole, déjà habituée aux grands événements sportifs — des marathons légendaires aux finales NBA au Madison Square Garden — vibrera d'une énergie sans pareille. En juin-juillet, attendez-vous à des températures chaudes et humides (25-32°C) typiques de la côte Est. Côté gastronomie, la ville est un melting-pot culinaire : pizza à la new-yorkaise, bagels, food trucks du monde entier et restaurants étoilés. Les fans pourront se déplacer facilement grâce au réseau de métro le plus dense d'Amérique du Nord, complété par les trains NJ Transit vers le stade. Pour se loger, Manhattan reste le choix premium mais coûteux ; Jersey City et Hoboken offrent un excellent rapport qualité-prix avec une vue imprenable sur la skyline. Times Square, Central Park et les rives de l'Hudson se transformeront en fan zones géantes. L'ambiance promet d'être électrique, portée par les communautés latino-américaines, européennes et africaines qui font la richesse de cette métropole cosmopolite.",
    stadiumIds: ["metlife-stadium"],
  },
  {
    id: "dallas-fort-worth",
    name: "Dallas-Fort Worth",
    slug: "dallas-fort-worth",
    country: "USA",
    state: "Texas",
    population: 7637387,
    timezone: "America/Chicago",
    description:
      "Dallas-Fort Worth, le « Metroplex » texan, est une terre de passions sportives où le football américain règne en maître — mais le soccer y gagne du terrain à grande vitesse grâce au FC Dallas, pionnier de la MLS. Quatrième métropole des États-Unis, cette agglomération tentaculaire accueillera les matchs à l'AT&T Stadium d'Arlington, cathédrale du sport américain. En été, le thermomètre grimpe allègrement au-dessus de 35°C : le toit rétractable du stade sera un allié précieux. La gastronomie texane est une religion ici — brisket fumé pendant 12 heures, tacos tex-mex et steakhouses légendaires. Le réseau de transports s'appuie sur le DART (Dallas Area Rapid Transit), mais la voiture reste reine au Texas. Pour se loger, le quartier de Deep Ellum à Dallas offre ambiance et vie nocturne, tandis qu'Arlington place les fans au cœur de l'action sportive entre l'AT&T Stadium et le Globe Life Field des Rangers. Le Stockyards District de Fort Worth plonge les visiteurs dans l'authentique culture cowboy. L'ambiance Coupe du Monde sera amplifiée par l'immense communauté hispanique du Texas, garantissant des tribunes passionnées et colorées.",
    stadiumIds: ["att-stadium"],
  },
  {
    id: "miami",
    name: "Miami",
    slug: "miami",
    country: "USA",
    state: "Florida",
    population: 6138333,
    timezone: "America/New_York",
    description:
      "Miami, capitale non officielle de l'Amérique latine aux États-Unis, est peut-être la ville la plus « football » du pays. Depuis l'arrivée de David Beckham et la création de l'Inter Miami CF — sans oublier le passage de Lionel Messi —, la fièvre du ballon rond n'a cessé de monter. Le Hard Rock Stadium de Miami Gardens, habitué aux Super Bowls et aux grands concerts, accueillera les matchs dans une atmosphère tropicale. Justement, préparez-vous : juin-juillet à Miami signifie chaleur intense (30-35°C), humidité élevée et averses tropicales en fin d'après-midi. La ville compense largement par sa gastronomie caribéenne et latino — ceviche, empanadas, cafecito cubain de Little Havana — et ses plages mythiques de South Beach. Le Metrorail et les bus desservent la métropole, mais un véhicule reste conseillé pour rejoindre Miami Gardens. Côté hébergement, South Beach et Brickell sont les quartiers phares, Wynwood séduit les amateurs d'art urbain, et Coral Gables offre une ambiance plus résidentielle et verdoyante. Miami sera sans conteste l'une des villes les plus festives du tournoi, avec des fan zones en bord de mer et une nightlife légendaire.",
    stadiumIds: ["hard-rock-stadium"],
  },
  {
    id: "atlanta",
    name: "Atlanta",
    slug: "atlanta",
    country: "USA",
    state: "Georgia",
    population: 6144050,
    timezone: "America/New_York",
    description:
      "Atlanta a prouvé au monde entier qu'elle savait organiser de grands événements sportifs, des Jeux Olympiques de 1996 aux records d'affluence d'Atlanta United en MLS. La capitale de la Géorgie est devenue un véritable bastion du soccer américain, avec des supporters parmi les plus fervents du continent au Mercedes-Benz Stadium. En été, Atlanta connaît des chaleurs importantes (28-34°C) avec une humidité marquée, mais le toit rétractable du stade garantit un confort optimal. Berceau du mouvement des droits civiques et patrie de Martin Luther King Jr., la ville offre une richesse culturelle immense : le National Center for Civil and Human Rights, le Georgia Aquarium et une scène musicale hip-hop de renommée mondiale. La gastronomie sudiste est à l'honneur — fried chicken, peach cobbler, grits et une scène culinaire moderne en plein essor dans le quartier de Ponce City Market. Le réseau MARTA (métro et bus) dessert bien le centre-ville et le stade. Pour se loger, Midtown et Buckhead sont des valeurs sûres, tandis que le quartier historique d'Inman Park séduit par son charme. L'ambiance durant la Coupe du Monde sera survoltée, portée par une communauté de supporters déjà rodée aux grandes soirées footballistiques.",
    stadiumIds: ["mercedes-benz-stadium"],
  },
  {
    id: "seattle",
    name: "Seattle",
    slug: "seattle",
    country: "USA",
    state: "Washington",
    population: 3979845,
    timezone: "America/Los_Angeles",
    description:
      "Seattle est tout simplement la ville la plus « soccer » des États-Unis. Les Seattle Sounders attirent régulièrement plus de 40 000 fans au Lumen Field, avec une culture de supporters digne des plus grands clubs européens. La ville du nord-ouest pacifique, encadrée par les montagnes Cascades et le Puget Sound, bénéficie d'un climat étonnamment agréable en été (18-26°C) — loin de sa réputation pluvieuse. C'est la saison idéale pour profiter des terrasses de Capitol Hill avec un café artisanal — Seattle est le berceau de Starbucks et la capitale mondiale du coffee culture. Côté gastronomie, les fruits de mer du Pacifique sont incontournables : saumon fumé, huîtres et le célèbre chowder du Pike Place Market. Le réseau de transport comprend le Link Light Rail, des bus et des ferries pittoresques. Pour se loger, le quartier de Belltown est à deux pas du stade, Pioneer Square offre l'atmosphère historique, et Capitol Hill la vie nocturne. L'ambiance Coupe du Monde au Lumen Field promet d'être parmi les plus intenses du tournoi, les « Emerald City Supporters » étant réputés pour faire trembler les tribunes.",
    stadiumIds: ["lumen-field"],
  },
  {
    id: "houston",
    name: "Houston",
    slug: "houston",
    country: "USA",
    state: "Texas",
    population: 7122240,
    timezone: "America/Chicago",
    description:
      "Houston, quatrième ville des États-Unis et capitale mondiale de l'énergie, est aussi l'une des métropoles les plus diversifiées du pays — plus de 145 langues y sont parlées. Le NRG Stadium, pionnier des toits rétractables en NFL, offrira un refuge bienvenu contre la chaleur texane de l'été (32-38°C avec une humidité redoutable). La ville possède une solide culture foot grâce au Houston Dynamo et a accueilli des matchs du Mondial 1994 dans l'ancien Astrodome voisin. Côté gastronomie, Houston est un paradis sous-estimé : la scène culinaire fusionne influences texanes, mexicaines, vietnamiennes (le quartier de Midtown et Bellaire's Chinatown sont des pépites) et cajun de la Louisiane proche. Le NASA Space Center fascine les visiteurs, tout comme le Museum District avec ses 19 musées. Le réseau METRORail dessert les principaux quartiers, mais Houston reste une ville faite pour la voiture. Pour se loger, le quartier de Montrose offre personnalité et proximité, Downtown est pratique, et The Heights séduit par ses maisons victoriennes et ses brasseries artisanales. L'immense communauté latino de Houston garantira une ambiance de Coupe du Monde authentique et passionnée.",
    stadiumIds: ["nrg-stadium"],
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    slug: "philadelphia",
    country: "USA",
    state: "Pennsylvania",
    population: 6245051,
    timezone: "America/New_York",
    description:
      "Philadelphie, berceau de la démocratie américaine où furent signées la Déclaration d'Indépendance et la Constitution, est une ville qui vit le sport avec une intensité légendaire. Les fans de Philly — qu'ils supportent les Eagles, les Sixers ou l'Union en MLS — sont réputés comme les plus passionnés (et les plus redoutés) d'Amérique. Le Lincoln Financial Field, dans le complexe sportif du sud de la ville, accueillera les matchs dans une atmosphère électrique. En été, Philadelphie est chaude et humide (27-33°C), parfaite pour vibrer en plein air. La gastronomie locale est iconique : le Philly cheesesteak est une institution, mais la ville offre aussi une scène culinaire moderne florissante autour de Reading Terminal Market. Le réseau SEPTA (métro, bus, trains régionaux) est bien développé, avec une ligne directe vers le complexe sportif. Pour se loger, Old City et Center City placent les visiteurs au cœur de l'histoire et de l'action, tandis que Fishtown est le quartier branché du moment. L'ambiance Coupe du Monde à Philly sera brute, authentique et incroyablement bruyante — comme tout ce que fait cette ville.",
    stadiumIds: ["lincoln-financial-field"],
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    slug: "kansas-city",
    country: "USA",
    state: "Missouri",
    population: 2192035,
    timezone: "America/Chicago",
    description:
      "Kansas City est la perle cachée de cette Coupe du Monde. Ville de taille humaine à cheval entre le Missouri et le Kansas, elle est célèbre dans le monde entier pour deux choses : son barbecue légendaire et sa scène jazz historique. Le KC BBQ — brisket, burnt ends, ribs nappés de sauce tomate sucrée — est une expérience culinaire inoubliable, avec des temples comme Joe's KC et Q39. L'Arrowhead Stadium, qui détient le record Guinness du stade le plus bruyant au monde (142,2 dB), promet une ambiance dantesque. En été, Kansas City connaît des chaleurs conséquentes (28-35°C) avec des orages spectaculaires typiques du Midwest. Le Sporting Kansas City, l'un des clubs fondateurs de la MLS, a bâti une solide base de fans. Côté transports, la ville mise sur son nouveau tramway KC Streetcar en expansion, mais la voiture reste pratique. Pour se loger, le Power & Light District downtown est idéal pour la vie nocturne, Westport pour l'ambiance décontractée, et le Country Club Plaza pour son architecture hispanique unique. Kansas City surprendra les visiteurs internationaux par sa chaleur humaine, son authenticité et une passion sportive à couper le souffle.",
    stadiumIds: ["arrowhead-stadium"],
  },
  {
    id: "boston",
    name: "Boston",
    slug: "boston",
    country: "USA",
    state: "Massachusetts",
    population: 4941632,
    timezone: "America/New_York",
    description:
      "Boston, ville universitaire par excellence (Harvard, MIT) et berceau de la révolution américaine, est aussi l'une des capitales sportives les plus titrées du pays — Red Sox, Celtics, Bruins, Patriots, la ville collectionne les trophées. Les matchs se joueront au Gillette Stadium de Foxborough, à environ 35 km au sud-ouest, domicile des Patriots et du Revolution en MLS. L'été bostonien est agréable (22-30°C) avec une brise océanique bienvenue, idéal pour flâner sur le Freedom Trail ou dans les rues pavées de Beacon Hill. La gastronomie de la Nouvelle-Angleterre brille par ses fruits de mer : clam chowder crémeux, lobster roll et huîtres fraîches du Cape Cod. Le réseau de transports « T » (métro de Boston) est le plus ancien des États-Unis, efficace pour se déplacer en ville, mais il faudra un train de banlieue ou une navette pour rejoindre Foxborough les jours de match. Pour se loger, Back Bay et le Seaport District sont des choix premium, Cambridge offre l'ambiance universitaire, et Somerville les bonnes adresses alternatives. La communauté irlandaise et portugaise de Boston apportera une ferveur footballistique européenne à l'atmosphère du tournoi.",
    stadiumIds: ["gillette-stadium"],
  },
  {
    id: "san-francisco-bay-area",
    name: "San Francisco Bay Area",
    slug: "san-francisco-bay-area",
    country: "USA",
    state: "California",
    population: 7750000,
    timezone: "America/Los_Angeles",
    description:
      "La région de la baie de San Francisco — épicentre mondial de l'innovation technologique et patrie de la Silicon Valley — accueillera les matchs au Levi's Stadium de Santa Clara. Cette métropole aux multiples visages fascine : le Golden Gate Bridge, les cable cars, Alcatraz, la contre-culture de Haight-Ashbury et les vignobles de Napa Valley à une heure de route. L'été dans la Bay Area offre un microclimat unique : San Francisco reste fraîche et brumeuse (15-20°C — emportez une veste !), tandis que Santa Clara et San Jose profitent d'un soleil généreux (25-32°C). La gastronomie est exceptionnelle, mêlant influences asiatiques (Chinatown, Japantown), mexicaines (la Mission District), et une scène farm-to-table pionnière. Le réseau de transports est complet : BART, Caltrain, VTA Light Rail et ferries relient les différentes villes de la baie. Pour se loger, San Francisco offre le charme et la vie nocturne, San Jose la proximité avec le stade, et Oakland une alternative plus abordable avec une scène culturelle vibrante. Les San Jose Earthquakes portent la flamme du soccer dans la région depuis les années 1970. L'ambiance sera cosmopolite et tech-friendly, avec des fan zones innovantes à l'image de cette région visionnaire.",
    stadiumIds: ["levis-stadium"],
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    slug: "los-angeles",
    country: "USA",
    state: "California",
    population: 13200998,
    timezone: "America/Los_Angeles",
    description:
      "Los Angeles, capitale mondiale du divertissement et deuxième ville des États-Unis, vit une renaissance footballistique spectaculaire. Le LAFC et le LA Galaxy se disputent la suprématie locale en MLS, et l'arrivée de stars internationales a placé la ville sur la carte du soccer mondial. Le SoFi Stadium d'Inglewood, bijou architectural à 5 milliards de dollars, accueillera les matchs dans un cadre futuriste. L'été angeleno est un rêve : ciel bleu permanent, 25-32°C, quasi aucune pluie. La gastronomie de LA est un tour du monde à elle seule — tacos de rue à East LA, cuisine coréenne à Koreatown, sushi de classe mondiale, et la scène vegan la plus avancée du pays. Le réseau Metro s'améliore rapidement avec de nouvelles lignes, mais la voiture reste le mode de transport dominant dans cette ville étalée. Pour se loger, Santa Monica et Venice offrent la plage, Downtown LA l'effervescence urbaine, Hollywood le glamour, et Koreatown un excellent rapport qualité-prix. La diversité incroyable de Los Angeles — l'une des plus grandes communautés mexicaines, salvadoriennes, coréennes et arméniennes hors de leurs pays — garantira des fan zones parmi les plus colorées et festives de la planète.",
    stadiumIds: ["sofi-stadium"],
  },

  // ============================================================
  // Mexico (3 host cities)
  // ============================================================
  {
    id: "mexico-city",
    name: "Mexico City",
    slug: "mexico-city",
    country: "Mexico",
    state: "Ciudad de Mexico",
    population: 21804515,
    timezone: "America/Mexico_City",
    description:
      "Mexico, mégalopole de plus de 21 millions d'habitants et capitale du Mexique, est tout simplement l'une des villes les plus passionnantes de la planète — et un temple absolu du football. L'Estadio Azteca, qui accueillera le match d'ouverture, a déjà vu deux finales de Coupe du Monde (1970 et 1986), la « Main de Dieu » de Maradona et le « But du Siècle ». La ville vibre pour le Club América, Cruz Azul et Pumas, créant une ferveur footballistique permanente. À 2 240 m d'altitude, l'air raréfié est un facteur sportif non négligeable. En juin-juillet, c'est la saison des pluies : des averses courtes mais intenses en fin d'après-midi rafraîchissent l'atmosphère (15-25°C). La gastronomie mexicaine, classée au patrimoine immatériel de l'UNESCO, atteint ici son apogée : tacos al pastor, mole, tamales, mezcal et une scène culinaire moderne parmi les meilleures au monde. Le métro de Mexico est vaste et économique, complété par le Metrobús. Pour se loger, la Roma et la Condesa sont les quartiers les plus prisés, Coyoacán offre le charme bohème, et Polanco le luxe. L'ambiance sera absolument folle — le Mexique respire le football.",
    stadiumIds: ["estadio-azteca"],
  },
  {
    id: "guadalajara",
    name: "Guadalajara",
    slug: "guadalajara",
    country: "Mexico",
    state: "Jalisco",
    population: 5268642,
    timezone: "America/Mexico_City",
    description:
      "Guadalajara, la « Perla de Occidente », est le cœur culturel du Mexique et le berceau de ses symboles les plus iconiques : le mariachi, la tequila (les agavales de Jalisco sont à une heure de route) et la charrería. Deuxième ville du pays, elle vit une rivalité footballistique incandescente entre les Chivas — le club le plus populaire du Mexique, composé exclusivement de joueurs mexicains — et l'Atlas FC. L'Estadio Akron, domicile des Chivas, accueillera les matchs dans une enceinte spectaculaire en forme de volcan. En juin-juillet, Guadalajara connaît sa saison des pluies avec des températures agréables (18-28°C) et des orages en soirée qui rafraîchissent l'atmosphère. La gastronomie est un festin : birria (ragoût de chèvre), tortas ahogadas (sandwichs noyés dans la sauce), pozole et bien sûr le tequila sous toutes ses formes. Le centre historique avec sa cathédrale, le marché de San Juan de Dios et le quartier de Tlaquepaque ravissent les visiteurs. Le Mi Tren (métro léger) et les bus Macrobús facilitent les déplacements. Pour se loger, le centro historico et la Zona Chapultepec sont les meilleurs choix. Guadalajara offrira une expérience mexicaine authentique, chaleureuse et musicale.",
    stadiumIds: ["estadio-akron"],
  },
  {
    id: "monterrey",
    name: "Monterrey",
    slug: "monterrey",
    country: "Mexico",
    state: "Nuevo Leon",
    population: 5341171,
    timezone: "America/Monterrey",
    description:
      "Monterrey, troisième ville du Mexique et capitale industrielle du pays, est une métropole dynamique nichée dans un décor naturel époustouflant au pied de la Sierra Madre Oriental. Le Cerro de la Silla, montagne emblématique visible depuis toute la ville, sera la toile de fond la plus spectaculaire de cette Coupe du Monde. La ville est un foyer de football passionné : les Rayados de Monterrey et les Tigres de l'UANL entretiennent l'un des derbys les plus chauds d'Amérique latine, le « Clásico Regiomontano ». L'Estadio BBVA, domicile des Rayados, est une merveille architecturale ouverte sur la montagne. En été, Monterrey est très chaude (30-38°C) avec une humidité modérée — restez hydratés ! La gastronomie du nord du Mexique est carnivore et généreuse : cabrito al pastor (chevreau grillé), machaca, carne asada et les meilleures tortillas de farine du pays. Le Metrorrey (métro) et les bus Ecovía desservent la ville. Pour se loger, le quartier de San Pedro Garza García offre modernité et confort, le Barrio Antiguo charme et vie nocturne, et la Macroplaza downtown un accès central. Les « regios » sont réputés pour leur hospitalité légendaire — préparez-vous à être adoptés.",
    stadiumIds: ["estadio-bbva"],
  },

  // ============================================================
  // Canada (2 host cities)
  // ============================================================
  {
    id: "toronto",
    name: "Toronto",
    slug: "toronto",
    country: "Canada",
    state: "Ontario",
    population: 6202225,
    timezone: "America/Toronto",
    description:
      "Toronto, plus grande ville du Canada et l'une des métropoles les plus multiculturelles au monde — plus de 200 ethnies et 140 langues —, est prête à briller sur la scène mondiale du football. Le BMO Field, domicile du Toronto FC, sera agrandi pour l'occasion et promet une atmosphère intime et intense. La ville a connu l'euphorie footballistique en 2017 quand le TFC a remporté le triplé domestique, et l'arrivée de stars comme Lorenzo Insigne a renforcé l'engouement. L'été torontois est splendide (22-30°C) avec de longues journées ensoleillées — loin des clichés sur le froid canadien. La gastronomie reflète la diversité de la ville : dim sum à Chinatown, curry sur Gerard Street (Little India), poutine, peameal bacon sandwich au St. Lawrence Market et une scène culinaire moderne en ébullition. Le TTC (métro, tramways, bus) est efficace, et le stade est accessible via la ligne de tramway le long du lac Ontario. Pour se loger, le quartier de Distillery District offre charme industriel, King West la vie nocturne, et Kensington Market l'ambiance bohème. La CN Tower dominera un horizon de fête, avec des fan zones au Harbourfront et dans les quartiers multiculturels de la ville.",
    stadiumIds: ["bmo-field"],
  },
  {
    id: "vancouver",
    name: "Vancouver",
    slug: "vancouver",
    country: "Canada",
    state: "British Columbia",
    population: 2642825,
    timezone: "America/Vancouver",
    description:
      "Vancouver, régulièrement classée parmi les villes les plus agréables à vivre au monde, offre un cadre naturel à couper le souffle : océan Pacifique d'un côté, montagnes enneigées de l'autre, forêts de cèdres géants en toile de fond. La ville a brillamment accueilli les Jeux Olympiques d'hiver 2010 et le BC Place, avec son toit rétractable, sera le théâtre des matchs de la Coupe du Monde. Les Vancouver Whitecaps FC portent la flamme du soccer dans cette ville passionnée de sport outdoor. L'été vancouvérois est un secret bien gardé : 20-26°C, peu de pluie, des journées interminables jusqu'à 21h30 — les conditions idéales pour profiter du tournoi. La gastronomie est influencée par l'Asie-Pacifique : sushi parmi les meilleurs hors du Japon, dim sum exceptionnel, scène foodie fusion dynamique, et fruits de mer du Pacifique (saumon sauvage de Colombie-Britannique). Le SkyTrain, moderne et efficace, relie l'aéroport au centre-ville et au stade. Pour se loger, Gastown offre le charme historique, Yaletown le design urbain, et Kitsilano l'ambiance plage-et-yoga. Stanley Park, le Seawall et Granville Island seront des lieux de rassemblement magiques pour les fans du monde entier.",
    stadiumIds: ["bc-place"],
  },
];

/** Lookup map: city id -> City */
export const citiesById: Record<string, City> = Object.fromEntries(
  cities.map((c) => [c.id, c]),
);

/** Lookup map: city slug -> City */
export const citiesBySlug: Record<string, City> = Object.fromEntries(
  cities.map((c) => [c.slug, c]),
);
