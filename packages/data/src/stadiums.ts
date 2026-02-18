import type { Stadium } from "./types";

export const stadiums: Stadium[] = [
  // ============================================================
  // USA (11 stadiums)
  // ============================================================
  {
    id: "metlife-stadium",
    name: "MetLife Stadium",
    slug: "metlife-stadium",
    city: "East Rutherford",
    cityId: "new-york-new-jersey",
    country: "USA",
    capacity: 82500,
    roofType: "open",
    latitude: 40.8128,
    longitude: -74.0742,
    description:
      "Le MetLife Stadium d'East Rutherford accueillera le match le plus attendu de la planète : la finale de la Coupe du Monde 2026. Inauguré en 2010 pour un coût de 1,6 milliard de dollars, c'est le stade le plus cher jamais construit à l'époque et le plus grand des États-Unis en configuration football avec ses 82 500 places. Domicile partagé des New York Giants et des New York Jets en NFL — une cohabitation unique —, il trône dans le Meadowlands Sports Complex du New Jersey, à seulement 12 km de Manhattan. Son architecture ouverte offre des vues sur la skyline de New York par temps clair, créant un décor cinématographique pour les soirées de match. L'accès est facilité par le NJ Transit et une ligne de train dédiée les jours d'événements depuis Penn Station. Le stade a déjà accueilli un Super Bowl (2014, le premier en plein air dans un climat froid), des concerts géants de U2, Beyoncé et Taylor Swift, ainsi que des matchs internationaux de football. L'expérience spectateur est rodée : restauration variée, Wi-Fi haut débit et une logistique éprouvée pour gérer les flux massifs. Être présent dans ce stade pour la finale sera un moment d'histoire pure du football mondial.",
  },
  {
    id: "att-stadium",
    name: "AT&T Stadium",
    slug: "att-stadium",
    city: "Arlington",
    cityId: "dallas-fort-worth",
    country: "USA",
    capacity: 80000,
    roofType: "retractable",
    latitude: 32.7473,
    longitude: -97.0945,
    description:
      "Surnommé « Jerry World » en hommage à Jerry Jones, propriétaire des Dallas Cowboys, l'AT&T Stadium d'Arlington est une cathédrale du sport américain qui repousse les limites du spectaculaire. Inauguré en 2009 pour 1,3 milliard de dollars, il est immédiatement reconnaissable à son immense écran vidéo central de 49 mètres de long — le plus grand en intérieur lors de son installation —, suspendu au-dessus du terrain comme un vaisseau spatial. Son toit rétractable en acier et verre, avec des portes latérales géantes, permet de jouer à ciel ouvert ou en configuration climatisée — un atout considérable face à la chaleur texane estivale. Le stade peut accueillir jusqu'à 105 000 spectateurs en configuration étendue. Il a accueilli le Super Bowl XLV (2011), la finale du championnat NCAA de basketball, des combats de boxe historiques et des concerts de légende. Pour la Coupe du Monde, sa capacité standard de 80 000 places et son système de climatisation garantiront une expérience de premier plan. L'accès se fait principalement en voiture via les autoroutes texanes, avec des parkings massifs, mais des navettes spéciales seront mises en place depuis Dallas et Fort Worth. L'acoustique du stade amplifie le bruit de la foule, promettant des ambiances mémorables.",
  },
  {
    id: "hard-rock-stadium",
    name: "Hard Rock Stadium",
    slug: "hard-rock-stadium",
    city: "Miami Gardens",
    cityId: "miami",
    country: "USA",
    capacity: 65326,
    roofType: "open",
    latitude: 25.958,
    longitude: -80.2389,
    description:
      "Le Hard Rock Stadium de Miami Gardens est l'un des stades les plus polyvalents et les plus rénovés des États-Unis. Domicile des Miami Dolphins depuis 1987, il a subi une transformation spectaculaire à 550 millions de dollars en 2016 avec l'ajout d'une canopée architecturale qui protège les spectateurs du soleil brûlant de Floride tout en laissant le terrain à ciel ouvert. Cette prouesse d'ingénierie en fait un stade parfaitement adapté au climat tropical de Miami. Le palmarès du lieu est impressionnant : six Super Bowls, des finales de la BCS/College Football Playoff, l'Open de tennis de Miami (un court temporaire est installé chaque année sur le parking !) et la première édition du Grand Prix de Formule 1 de Miami en 2022. Pour le football, le stade a accueilli des matchs de Copa América et des rencontres internationales de prestige. Les 65 326 places offrent une excellente visibilité grâce à des tribunes relativement proches du terrain. L'accès se fait principalement par la route (I-95 et Florida Turnpike) avec des services de navettes depuis le centre de Miami. L'ambiance latino de Miami Gardens — quartier à dominante afro-américaine et caribéenne — ajoutera une saveur unique aux soirées de Coupe du Monde.",
  },
  {
    id: "mercedes-benz-stadium",
    name: "Mercedes-Benz Stadium",
    slug: "mercedes-benz-stadium",
    city: "Atlanta",
    cityId: "atlanta",
    country: "USA",
    capacity: 71000,
    roofType: "retractable",
    latitude: 33.7553,
    longitude: -84.401,
    description:
      "Le Mercedes-Benz Stadium d'Atlanta est sans doute le stade le plus innovant des États-Unis. Inauguré en 2017 pour 1,5 milliard de dollars, il se distingue par son toit rétractable révolutionnaire en forme de pétales — huit panneaux triangulaires qui s'ouvrent comme un objectif d'appareil photo, un spectacle architectural à lui seul. Son anneau vidéo à 360 degrés, le « Halo Board », est le plus grand écran vidéo du monde (5 600 m²) et crée une immersion visuelle époustouflante. Le stade est le domicile d'Atlanta United FC (MLS) et des Atlanta Falcons (NFL), et a fait sensation dès son ouverture avec sa politique de prix « fan-first » : hot-dogs à 2$, bières à 5$ — une révolution dans le sport américain. Il a accueilli le Super Bowl LIII (2019), la finale de la MLS Cup et la finale du College Football Playoff. Atlanta United y a battu des records d'affluence en MLS avec plus de 70 000 spectateurs. Desservi par la station MARTA « Vine City/GWCC » à quelques minutes à pied, l'accès est parmi les plus pratiques du tournoi. L'atmosphère créée par les « Five Stripes » supporters et le design du stade — qui concentre le son — sera l'une des plus électrisantes de la Coupe du Monde 2026.",
  },
  {
    id: "lumen-field",
    name: "Lumen Field",
    slug: "lumen-field",
    city: "Seattle",
    cityId: "seattle",
    country: "USA",
    capacity: 69000,
    roofType: "open",
    latitude: 47.5952,
    longitude: -122.3316,
    description:
      "Le Lumen Field de Seattle est légendaire pour une raison : le bruit. Ses tribunes, conçues avec des auvents en porte-à-faux qui renvoient le son vers le terrain, créent un « mur sonore » qui a valu au stade le surnom de « The Clink » et a même provoqué des secousses sismiques détectées par l'université de Washington lors de touchdowns des Seahawks. Inauguré en 2002, le stade est niché dans le quartier de SoDo, avec une vue spectaculaire sur le centre-ville de Seattle et le Mont Rainier par temps clair. Il est le domicile des Seattle Sounders FC — champions de la MLS (2016, 2019) et de la Ligue des champions de la CONCACAF (2022) — et des Seahawks (NFL). Les « Emerald City Supporters », installés dans la tribune sud, orchestrent des tifos et des chants dignes des ultras européens, faisant du Lumen Field l'enceinte la plus « football » des États-Unis. La capacité de 69 000 places, les tribunes abruptes qui surplombent le terrain et la proximité des sièges créent une intimité rare pour un stade de cette taille. L'accès est excellent : stations de Link Light Rail et de bus à quelques pas, gare King Street Station adjacente. C'est l'un des stades où l'expérience spectateur sera la plus mémorable du tournoi.",
  },
  {
    id: "nrg-stadium",
    name: "NRG Stadium",
    slug: "nrg-stadium",
    city: "Houston",
    cityId: "houston",
    country: "USA",
    capacity: 72220,
    roofType: "retractable",
    latitude: 29.6847,
    longitude: -95.4107,
    description:
      "Le NRG Stadium de Houston a marqué l'histoire de l'architecture sportive en devenant, en 2002, le premier stade de la NFL équipé d'un toit rétractable — un héritage direct de l'Astrodome voisin, pionnier des stades couverts dans les années 1960. Avec ses 72 220 places et son système de climatisation puissant, il offre un refuge salvateur contre la chaleur et l'humidité étouffantes de l'été texan, garantissant des conditions de jeu optimales. Le stade est le domicile des Houston Texans (NFL) et accueille chaque année le Houston Livestock Show and Rodeo, le plus grand rodéo du monde — un événement qui attire plus de 2 millions de visiteurs. Il a accueilli deux Super Bowls (2004 et 2017), des matchs de football de la Gold Cup et des rencontres de l'équipe nationale américaine. Le NRG Park, complexe dans lequel il s'inscrit, comprend également l'Astrodome historique et un centre de conventions. L'accès se fait via le METRORail (ligne rouge) depuis le centre-ville de Houston, avec un arrêt dédié « NRG Park », ou par les autoroutes texanes avec un vaste réseau de parkings. L'expérience inclut une offre culinaire texane généreuse dans les coursives. Le NRG Stadium sera un choix idéal pour les matchs de poule disputés sous la chaleur de juin.",
  },
  {
    id: "lincoln-financial-field",
    name: "Lincoln Financial Field",
    slug: "lincoln-financial-field",
    city: "Philadelphia",
    cityId: "philadelphia",
    country: "USA",
    capacity: 69176,
    roofType: "open",
    latitude: 39.9008,
    longitude: -75.1675,
    description:
      "Le Lincoln Financial Field — « The Linc » pour les initiés — est le chaudron des Philadelphia Eagles et l'un des stades les plus redoutés par les équipes visiteuses aux États-Unis. Inauguré en 2003 dans le South Philadelphia Sports Complex, aux côtés du Wells Fargo Center (basket/hockey) et du Citizens Bank Park (baseball), il forme un pôle sportif unique. Ses 69 176 places sont garnies par des fans de Philly réputés pour leur intensité et leur franc-parler — une réputation qui transcende les sports. Le stade est un modèle de durabilité : ses 11 000 panneaux solaires et 14 éoliennes en font le premier stade professionnel américain à atteindre l'autosuffisance énergétique. Pour le football, le Linc a accueilli la Gold Cup, des matchs de la sélection américaine et le MLS All-Star Game. L'architecture en gradins ouverts offre une excellente acoustique naturelle qui amplifie les encouragements de la foule. L'accès est remarquablement simple grâce à la ligne de métro Broad Street Line (station NRG/AT&T, arrêt « NRG Station ») — en réalité la station « Sports Complex » sur la Broad Street Line — qui relie directement le centre-ville au stade en 15 minutes. Le parking est abondant pour ceux qui préfèrent la voiture. L'atmosphère les soirs de match au Linc est brute, authentique et incroyablement vocale — exactement ce que la Coupe du Monde mérite.",
  },
  {
    id: "arrowhead-stadium",
    name: "Arrowhead Stadium",
    slug: "arrowhead-stadium",
    city: "Kansas City",
    cityId: "kansas-city",
    country: "USA",
    capacity: 76416,
    roofType: "open",
    latitude: 39.0489,
    longitude: -94.484,
    description:
      "L'Arrowhead Stadium de Kansas City est une légende vivante du sport américain. Inauguré en 1972, il détient le record Guinness du stade le plus bruyant du monde : 142,2 décibels, atteints en 2014 lors d'un match des Kansas City Chiefs — l'équivalent d'un avion au décollage. Sa conception en « bol » avec trois niveaux de tribunes abruptes crée un amphithéâtre naturel qui piège et amplifie le son de manière terrifiante pour les adversaires. Avec 76 416 places, c'est l'un des plus grands stades du tournoi. Le stade fait partie du Truman Sports Complex, aux côtés du Kauffman Stadium des Royals de baseball. Les Chiefs de Patrick Mahomes, doubles champions du Super Bowl (2020, 2023, 2024), ont fait de l'Arrowhead un lieu de pèlerinage sportif. Le Sporting Kansas City, basé au Children's Mercy Park voisin, a bâti l'une des communautés de supporters les plus solides de la MLS. Bien que principalement accessible en voiture — le tailgating (barbecue sur le parking avant le match) est une tradition sacrée —, des navettes spéciales seront organisées depuis le centre-ville. Le stade est en cours de rénovation pour la Coupe du Monde avec des améliorations ciblées. L'expérience Arrowhead sera un choc sonore inoubliable pour les fans du monde entier.",
  },
  {
    id: "gillette-stadium",
    name: "Gillette Stadium",
    slug: "gillette-stadium",
    city: "Foxborough",
    cityId: "boston",
    country: "USA",
    capacity: 65878,
    roofType: "open",
    latitude: 42.0909,
    longitude: -71.2643,
    description:
      "Le Gillette Stadium de Foxborough, à environ 35 km au sud-ouest de Boston, est indissociable de la dynastie des New England Patriots de Tom Brady — six titres de Super Bowl y ont été célébrés. Inauguré en 2002, il est aussi le domicile du New England Revolution en MLS et fait partie du complexe Patriot Place, un village commercial et de divertissement intégré au stade. Ses 65 878 places offrent une atmosphère compacte et bruyante, avec des tribunes qui enveloppent le terrain. Le stade a accueilli des matchs internationaux de football, notamment lors de la Copa América Centenario 2016, prouvant son adaptabilité au soccer. Son architecture distinctive inclut un phare lumineux à l'entrée — clin d'œil à l'héritage maritime de la Nouvelle-Angleterre — et un pont qui enjambe l'accès principal. Le principal défi logistique est la distance depuis Boston : des trains de banlieue MBTA spéciaux et des navettes seront mis en place les jours de match depuis South Station. Le vaste parking permet un tailgating convivial à l'américaine. En été, le climat est agréable (22-28°C) avec de longues soirées lumineuses. La communauté portugaise et brésilienne de la Nouvelle-Angleterre — très présente dans les villes voisines de Fall River et New Bedford — apportera une ferveur footballistique sud-américaine et européenne authentique.",
  },
  {
    id: "levis-stadium",
    name: "Levi's Stadium",
    slug: "levis-stadium",
    city: "Santa Clara",
    cityId: "san-francisco-bay-area",
    country: "USA",
    capacity: 68500,
    roofType: "open",
    latitude: 37.4033,
    longitude: -121.9694,
    description:
      "Le Levi's Stadium de Santa Clara, inauguré en 2014 au cœur de la Silicon Valley, est l'un des stades les plus technologiquement avancés au monde — à l'image de la région qui l'abrite. Domicile des San Francisco 49ers, il a accueilli le Super Bowl 50 (2016) et la finale de la Copa América Centenario 2016, où le Chili a triomphé. Son design asymétrique est pensé pour le climat californien : la tribune ouest, plus haute, projette de l'ombre sur les spectateurs côté est en fin d'après-midi, tandis que le toit vert (avec panneaux solaires et système de récupération d'eau) en fait l'un des stades les plus durables du pays, certifié LEED Gold. Les 68 500 spectateurs bénéficient d'une application mobile dédiée pour commander nourriture et boissons depuis leur siège — du pur Silicon Valley. L'accès est facilité par le VTA Light Rail (arrêt « Great America ») et le Caltrain depuis San Francisco et San Jose, ainsi que par les autoroutes de la vallée. Le climat estival de Santa Clara est idéal : 25-32°C, ciel bleu quasi permanent, mais les soirées peuvent fraîchir. Le stade a accueilli de nombreux matchs de football international (Gold Cup, matchs amicaux de haut niveau), prouvant sa polyvalence. L'expérience spectateur mêle confort premium et innovation technologique.",
  },
  {
    id: "sofi-stadium",
    name: "SoFi Stadium",
    slug: "sofi-stadium",
    city: "Inglewood",
    cityId: "los-angeles",
    country: "USA",
    capacity: 70240,
    roofType: "fixed",
    latitude: 33.9534,
    longitude: -118.3392,
    description:
      "Le SoFi Stadium d'Inglewood est tout simplement le stade le plus cher jamais construit : plus de 5 milliards de dollars pour cette merveille architecturale inaugurée en 2020. Conçu par HKS Architects, il se distingue par son toit fixe en ETFE translucide — un matériau utilisé à l'Allianz Arena de Munich — qui laisse passer la lumière naturelle californienne tout en protégeant des intempéries, créant une atmosphère unique, ni vraiment intérieure ni extérieure. Domicile partagé des Los Angeles Rams et des Los Angeles Chargers (NFL), il fait partie du complexe Hollywood Park qui inclut un lac artificiel, des espaces commerciaux et une future salle de concert. Le stade a accueilli le Super Bowl LVI (2022), marqué par le show de la mi-temps avec Dr. Dre, Snoop Dogg, Eminem et Rihanna. L'« Infinity Screen » — un écran vidéo ovale double-face suspendu au centre — est le plus grand de tout stade au monde (6 500 m²). Pour la Coupe du Monde, les 70 240 places offriront un cadre futuriste aux matchs. La nouvelle ligne K du Metro reliera directement le centre de LA au stade. L'expérience spectateur est premium : sièges larges, acoustique optimisée, restauration haut de gamme. Le SoFi Stadium sera la vitrine technologique et esthétique de la Coupe du Monde 2026.",
  },

  // ============================================================
  // Mexico (3 stadiums)
  // ============================================================
  {
    id: "estadio-azteca",
    name: "Estadio Azteca",
    slug: "estadio-azteca",
    city: "Mexico City",
    cityId: "mexico-city",
    country: "Mexico",
    capacity: 87523,
    roofType: "open",
    latitude: 19.3029,
    longitude: -99.1505,
    description:
      "L'Estadio Azteca est le stade le plus mythique de l'histoire du football. Premier et seul stade à accueillir trois Coupes du Monde (1970, 1986, 2026), il est le théâtre des moments les plus iconiques du sport : la « Main de Dieu » et le « But du Siècle » de Diego Maradona contre l'Angleterre en 1986, le triomphe de Pelé avec le Brésil en 1970, la finale Italie-Allemagne 4-3 considérée comme le « Match du Siècle ». Inauguré en 1966 et conçu par l'architecte Pedro Ramírez Vázquez, ses 87 523 places en font le plus grand stade du tournoi 2026. Situé à 2 240 mètres d'altitude dans le sud de Mexico, l'air raréfié est un facteur de jeu redouté par les équipes visiteuses. Domicile historique du Club América (le club le plus titré du Mexique) et de l'équipe nationale, le stade a été rénové plusieurs fois — la dernière en vue de 2026 avec modernisation des sièges, des accès et des installations médiatiques. L'accès se fait via le métro (ligne 2, station « Estadio Azteca ») et le Tren Ligero. L'atmosphère de l'Azteca est légendaire : « la ola » (la vague) y a été popularisée mondialement en 1986, et les « ¡Putos! » rugis par 87 000 gorges font trembler la terre. Fouler les gradins de l'Azteca, c'est marcher dans l'histoire même du football.",
  },
  {
    id: "estadio-akron",
    name: "Estadio Akron",
    slug: "estadio-akron",
    city: "Guadalajara",
    cityId: "guadalajara",
    country: "Mexico",
    capacity: 49850,
    roofType: "open",
    latitude: 20.6821,
    longitude: -103.4625,
    description:
      "L'Estadio Akron de Guadalajara, aussi connu sous le nom d'Estadio Chivas ou « Volcán de Zapopan », est l'une des enceintes les plus spectaculaires du Mexique. Inauguré en 2010, son design signé par l'architecte Jean-Marie Massaud s'inspire d'un volcan — un clin d'œil au paysage volcanique de Jalisco — avec une structure extérieure en forme de cratère recouvert de végétation qui lui donne un aspect organique unique au monde. Domicile du CD Guadalajara (« Chivas »), le club le plus populaire du Mexique et le seul à aligner exclusivement des joueurs mexicains, le stade vibre d'une passion nationaliste particulière. Ses 49 850 places, bien que formant la plus petite capacité du tournoi, garantissent une intimité et une intensité sonore remarquables. Le stade est situé dans la municipalité de Zapopan, au nord-ouest de l'agglomération de Guadalajara. L'accès se fait via la ligne 3 du Mi Tren (métro léger) et des lignes de bus dédiées. L'enceinte a accueilli des matchs de la sélection mexicaine, des finales de Liga MX et des événements de la CONCACAF. L'expérience spectateur est moderne avec de bonnes installations, une restauration aux saveurs locales (tacos, tortas) et une vue dégagée depuis toutes les tribunes. L'atmosphère des Chivas, portée par la « Barra Irreversible », sera un des temps forts émotionnels du Mondial.",
  },
  {
    id: "estadio-bbva",
    name: "Estadio BBVA",
    slug: "estadio-bbva",
    city: "Monterrey",
    cityId: "monterrey",
    country: "Mexico",
    capacity: 53500,
    roofType: "open",
    latitude: 25.6699,
    longitude: -100.2436,
    description:
      "L'Estadio BBVA de Monterrey est unanimement considéré comme l'un des plus beaux stades d'Amérique latine, et pour cause : son architecture signée Populous (les créateurs de Wembley et du Tottenham Hotspur Stadium) exploite de manière magistrale le paysage naturel environnant. La tribune principale, volontairement abaissée, offre une vue panoramique époustouflante sur la Sierra Madre Oriental et le Cerro de la Silla, créant un décor unique dans le football mondial. Inauguré en 2015 pour environ 200 millions de dollars, le stade est le domicile des C.F. Monterrey (« Rayados »), l'un des clubs les plus titrés du Mexique et de la CONCACAF. Ses 53 500 places sont réparties dans un design en fer à cheval qui maximise la proximité avec le terrain. Le stade a accueilli la finale de la Ligue des champions de la CONCACAF, des matchs de la sélection mexicaine et le All-Star Game de la Liga MX. Sa toiture partielle, en porte-à-faux spectaculaire, protège une grande partie des spectateurs du soleil intense de Monterrey tout en maintenant le terrain à ciel ouvert. L'accès se fait via le Metrorrey (ligne 1) et des lignes de bus. L'ambiance des Rayados, portée par « La Adicción » (le groupe de supporters), est électrique et le « Clásico Regiomontano » contre les Tigres est l'un des derbys les plus chauds du continent. Un stade à ne manquer sous aucun prétexte.",
  },

  // ============================================================
  // Canada (2 stadiums)
  // ============================================================
  {
    id: "bmo-field",
    name: "BMO Field",
    slug: "bmo-field",
    city: "Toronto",
    cityId: "toronto",
    country: "Canada",
    capacity: 45000,
    roofType: "open",
    latitude: 43.6332,
    longitude: -79.4186,
    description:
      "Le BMO Field de Toronto est en pleine transformation pour devenir un stade de Coupe du Monde. Inauguré en 2007 comme premier stade spécifiquement dédié au football en MLS au Canada, il sera agrandi de ses 30 000 places habituelles à 45 000 pour accueillir le tournoi — un investissement majeur qui témoigne de l'ambition du Canada sur la scène footballistique mondiale. Domicile du Toronto FC — qui a connu son heure de gloire avec le triplé historique de 2017 (MLS Cup, Supporters' Shield, Championnat canadien) sous l'impulsion de Sebastian Giovinco et Michael Bradley —, le stade est aussi utilisé par les Argonauts de Toronto (football canadien). Sa localisation est exceptionnelle : au bord du lac Ontario, dans le parc des expositions (Exhibition Place), avec la CN Tower en toile de fond et le centre-ville à quelques minutes en tramway. L'atmosphère y est intime et intense, les tribunes proches du terrain créant une connexion unique entre joueurs et spectateurs. Les supporters du TFC, menés par les « South End Supporters » et les « Red Patch Boys », apportent drapeaux, fumigènes et chants sans relâche. L'accès est facilité par le tramway (lignes 509 et 511) depuis Union Station et la ligne de GO Transit. C'est le plus petit stade du tournoi, mais son ambiance compensera largement.",
  },
  {
    id: "bc-place",
    name: "BC Place",
    slug: "bc-place",
    city: "Vancouver",
    cityId: "vancouver",
    country: "Canada",
    capacity: 54500,
    roofType: "retractable",
    latitude: 49.2768,
    longitude: -123.112,
    description:
      "Le BC Place de Vancouver est le plus grand stade du Canada et un lieu chargé d'histoire sportive. Inauguré en 1983 avec un toit gonflable — une prouesse technique de l'époque —, il a été entièrement rénové entre 2010 et 2011 avec un nouveau toit rétractable ultramoderne qui lui donne sa silhouette actuelle, illuminée la nuit par un système LED spectaculaire visible depuis toute la ville. C'est ici que s'est tenue la cérémonie d'ouverture des Jeux Olympiques d'hiver de 2010, l'un des moments les plus regardés de l'histoire de la télévision canadienne. Le stade est le domicile des Vancouver Whitecaps FC (MLS) et des BC Lions (football canadien). Ses 54 500 places et son toit rétractable garantissent des conditions de jeu optimales quel que soit le temps — bien que l'été vancouvérois soit généralement sec et ensoleillé. Situé dans le quartier de False Creek, en plein centre-ville, l'accès est remarquable : la station SkyTrain « Stadium-Chinatown » est littéralement à la porte du stade, et le réseau de bus et de ferries aquatiques complète l'offre. Le quartier environnant regorge de restaurants et de bars pour l'avant et l'après-match. L'enceinte a accueilli la finale de la Coupe du Monde féminine 2015, des matchs de la Gold Cup et de la Ligue des champions de la CONCACAF. Les « Southsiders », supporters des Whitecaps, créent une ambiance passionnée dans la tribune sud. Le BC Place sera un écrin idéal pour le football mondial.",
  },
];

/** Lookup map: stadium id -> Stadium */
export const stadiumsById: Record<string, Stadium> = Object.fromEntries(
  stadiums.map((s) => [s.id, s]),
);

/** Lookup map: stadium slug -> Stadium */
export const stadiumsBySlug: Record<string, Stadium> = Object.fromEntries(
  stadiums.map((s) => [s.slug, s]),
);
