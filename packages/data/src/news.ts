export type NewsCategory = "transferts" | "stades" | "billets" | "equipes" | "paris";

export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: NewsCategory;
  tags: string[];
  imageEmoji: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "metlife-stadium-renovation-finale-2026",
    title: "MetLife Stadium : les travaux de rénovation pour la finale avancent à grands pas",
    excerpt: "Le stade du New Jersey, qui accueillera la finale de la Coupe du Monde 2026, est en pleine transformation. Les dernières images du chantier sont impressionnantes.",
    content: `Les travaux de rénovation du MetLife Stadium à East Rutherford, dans le New Jersey, avancent conformément au calendrier prévu. Le stade, qui accueillera la finale de la Coupe du Monde 2026 le 19 juillet, bénéficie d'un investissement de plus de 350 millions de dollars pour se mettre aux normes FIFA.

Parmi les améliorations majeures : l'installation d'un nouveau système de pelouse hybride, l'agrandissement des zones VIP, et la modernisation complète des infrastructures médias. La capacité sera portée à 82 500 places pour l'événement.

"Nous sommes dans les temps et le résultat final sera spectaculaire", a déclaré le directeur du projet. Les premiers tests de la nouvelle pelouse sont prévus pour avril 2026, avec un match amical inaugural en mai.`,
    date: "2026-02-18",
    category: "stades",
    tags: ["MetLife Stadium", "finale", "New Jersey", "rénovation"],
    imageEmoji: "🏟️",
  },
  {
    id: 2,
    slug: "billets-coupe-du-monde-2026-phase-3-vente",
    title: "Billets CDM 2026 : la phase 3 de vente ouvre le 1er mars",
    excerpt: "La FIFA a annoncé l'ouverture de la troisième phase de vente des billets pour la Coupe du Monde 2026. Près de 2 millions de tickets seront disponibles.",
    content: `La FIFA a confirmé que la troisième et dernière grande phase de vente de billets pour la Coupe du Monde 2026 débutera le 1er mars. Cette phase proposera environ 2 millions de billets, dont des places pour les matchs de phase de groupes à partir de 50 dollars.

Les billets pour les demi-finales et la finale seront également disponibles, avec des prix allant de 200 à 1 500 dollars pour les catégories les plus premium. Un système de tirage au sort sera utilisé pour les matchs les plus demandés.

La FIFA rappelle que seul le site officiel FIFA.com/tickets est autorisé pour l'achat de billets. Les organisateurs mettent en garde contre les sites de revente non autorisés qui proposent des billets à des prix exorbitants.`,
    date: "2026-02-15",
    category: "billets",
    tags: ["billets", "FIFA", "vente", "prix"],
    imageEmoji: "🎟️",
  },
  {
    id: 3,
    slug: "france-liste-preliminaire-deschamps-30-joueurs",
    title: "Équipe de France : Deschamps dévoile une pré-liste de 30 joueurs",
    excerpt: "Didier Deschamps a communiqué sa liste préliminaire de 30 joueurs pour la Coupe du Monde 2026. Plusieurs surprises et un retour remarqué.",
    content: `Le sélectionneur de l'équipe de France Didier Deschamps a dévoilé sa pré-liste de 30 joueurs en vue de la Coupe du Monde 2026. La liste définitive de 26 joueurs sera annoncée début juin, mais les grandes lignes de la sélection se dessinent déjà.

Parmi les surprises, on note la présence de Désiré Doué (PSG), auteur d'une saison exceptionnelle, et le retour d'Ousmane Dembélé après sa blessure. Mbappé, Griezmann et Tchouaméni forment l'épine dorsale attendue de cette sélection.

Les absences notables incluent plusieurs joueurs du championnat de France qui espéraient une convocation. Deschamps a précisé que "la compétition est immense et les choix sont toujours difficiles, mais nous visons un objectif clair : ramener la troisième étoile".`,
    date: "2026-02-12",
    category: "equipes",
    tags: ["France", "Deschamps", "sélection", "Bleus", "Simulation éditoriale"],
    imageEmoji: "🇫🇷",
  },
  {
    id: 4,
    slug: "cotes-bookmakers-favoris-coupe-du-monde-2026",
    title: "Paris sportifs : la France et le Brésil co-favoris chez les bookmakers",
    excerpt: "À quatre mois du coup d'envoi, les bookmakers placent la France et le Brésil en tête des favoris pour remporter la Coupe du Monde 2026.",
    content: `Les cotes des principaux bookmakers pour le vainqueur de la Coupe du Monde 2026 se stabilisent à l'approche de la compétition. La France et le Brésil se partagent le statut de favoris avec des cotes autour de 5.50, suivis de près par l'Argentine (6.00) et l'Angleterre (7.00).

L'Espagne, championne d'Europe en titre, est cotée à 8.00, tandis que l'Allemagne, qui bénéficiera d'un léger avantage géographique avec les matchs au Canada et aux USA, est à 10.00. Les outsiders les plus populaires sont le Portugal (12.00) et les Pays-Bas (15.00).

Les experts rappellent que les cotes évoluent en fonction des blessures et de la forme des joueurs. Avec l'annonce des listes préliminaires dans les prochaines semaines, des mouvements significatifs sont attendus sur les marchés.`,
    date: "2026-02-10",
    category: "paris",
    tags: ["cotes", "bookmakers", "favoris", "pronostics"],
    imageEmoji: "📊",
  },
  {
    id: 5,
    slug: "stade-azteca-renovation-historique-coupe-du-monde",
    title: "Stade Azteca : une rénovation historique pour accueillir sa troisième Coupe du Monde",
    excerpt: "Le mythique Stade Azteca de Mexico sera le premier stade à accueillir trois Coupes du Monde. Les travaux de modernisation sont quasi terminés.",
    content: `Le Stade Azteca de Mexico s'apprête à entrer dans l'histoire en devenant le premier stade au monde à accueillir des matchs lors de trois éditions différentes de la Coupe du Monde (1970, 1986, 2026). Une rénovation majeure de 300 millions de dollars a été entreprise pour moderniser cette enceinte légendaire.

Les travaux incluent le remplacement complet des sièges, l'installation d'un toit rétractable partiel, et la mise en place d'écrans géants de dernière génération. La capacité a été réduite à 83 000 places pour améliorer le confort des spectateurs.

Le stade accueillera le match d'ouverture entre le Mexique et un adversaire encore à déterminer, ainsi que plusieurs matchs de phase de groupes et un huitième de finale. L'ambiance promet d'être électrique dans cette cathédrale du football mondial.`,
    date: "2026-02-08",
    category: "stades",
    tags: ["Azteca", "Mexico", "rénovation", "histoire"],
    imageEmoji: "🇲🇽",
  },
  {
    id: 6,
    slug: "qualifications-afrique-derniers-billets-cdm-2026",
    title: "Qualifications Afrique : les derniers billets pour la CDM 2026 attribués",
    excerpt: "Les éliminatoires africaines sont terminées. Neuf équipes du continent représenteront l'Afrique lors de la Coupe du Monde 2026.",
    content: `Les qualifications africaines pour la Coupe du Monde 2026 sont désormais terminées. Avec le nouveau format à 48 équipes, l'Afrique bénéficie de 9 places, contre 5 lors des éditions précédentes. Une augmentation historique qui permet à des nations émergentes de participer.

Le Maroc, le Sénégal, le Nigeria, le Cameroun et l'Égypte ont confirmé leur qualification sans grande surprise. L'Algérie et la Côte d'Ivoire ont également décroché leur billet lors des dernières journées. Les deux dernières places sont revenues à la RD Congo et au Mali.

Cette représentation africaine record promet d'apporter une diversité et une intensité nouvelles à la compétition. Plusieurs sélections africaines sont considérées comme de sérieux outsiders, notamment le Maroc, demi-finaliste en 2022.`,
    date: "2026-02-05",
    category: "equipes",
    tags: ["qualifications", "Afrique", "CAF", "48 équipes"],
    imageEmoji: "🌍",
  },
  {
    id: 7,
    slug: "transport-fan-zones-villes-hotes-cdm-2026",
    title: "Fan zones et transports : les villes hôtes dévoilent leurs plans",
    excerpt: "Les 16 villes hôtes de la Coupe du Monde 2026 ont présenté leurs dispositifs de fan zones et de transports spéciaux pour l'événement.",
    content: `À moins de cinq mois du coup d'envoi, les 16 villes hôtes américaines, mexicaines et canadiennes ont dévoilé leurs plans détaillés pour l'accueil des supporters. Chaque ville disposera d'au moins une fan zone officielle FIFA pouvant accueillir entre 20 000 et 50 000 personnes.

New York prévoit d'installer sa fan zone principale à Central Park, tandis que Los Angeles occupera le Hollywood Park adjacent au SoFi Stadium. Miami transformera une partie de South Beach en zone festive. Au Canada, Toronto et Vancouver misent sur leurs fronts de lac.

Côté transports, des lignes de métro et de bus spéciales seront mises en place les jours de match. Des navettes gratuites relieront les fan zones aux stades. Les organisateurs estiment que plus de 5 millions de fans internationaux sont attendus sur l'ensemble de la compétition.`,
    date: "2026-02-02",
    category: "stades",
    tags: ["fan zones", "transport", "villes hôtes", "organisation"],
    imageEmoji: "🎉",
  },
  {
    id: 8,
    slug: "mbappé-real-madrid-forme-coupe-du-monde-2026",
    title: "Mbappé en grande forme au Real Madrid avant la Coupe du Monde",
    excerpt: "Kylian Mbappé enchaîne les performances avec le Real Madrid. Le capitaine des Bleus arrive en pleine confiance pour la CDM 2026.",
    content: `Kylian Mbappé vit une saison exceptionnelle avec le Real Madrid pour sa deuxième année au club. Avec 28 buts et 12 passes décisives toutes compétitions confondues, le capitaine de l'équipe de France arrive en pleine forme à l'approche de la Coupe du Monde 2026.

Son entente avec Vinícius Jr et Bellingham fait des merveilles en Liga et en Ligue des Champions. "Je me sens au sommet de mon art", a confié l'attaquant de 27 ans. "La Coupe du Monde est mon objectif depuis le début de la saison."

Les observateurs notent que Mbappé a considérablement amélioré son jeu dos au but et sa capacité à décrocher pour créer. Une évolution qui en fait un danger encore plus complet pour les défenses adverses. Son duel annoncé avec Vinícius Jr, qu'il côtoie au quotidien, sera l'un des fils rouges de la compétition.`,
    date: "2026-01-28",
    category: "equipes",
    tags: ["Mbappé", "Real Madrid", "France", "forme", "Simulation éditoriale"],
    imageEmoji: "⚡",
  },
  {
    id: 9,
    slug: "nouveau-format-48-equipes-explication-complete",
    title: "CDM 2026 : tout comprendre du nouveau format à 48 équipes",
    excerpt: "La Coupe du Monde 2026 inaugure un format inédit avec 48 équipes, 12 groupes et 104 matchs. Voici comment ça fonctionne.",
    content: `La Coupe du Monde 2026 marque un tournant dans l'histoire de la compétition avec un format entièrement repensé. Pour la première fois, 48 équipes participeront au tournoi, réparties en 12 groupes de 4. Les deux premiers de chaque groupe, plus les 8 meilleurs troisièmes, se qualifieront pour les huitièmes de finale.

Au total, 104 matchs seront disputés sur 39 jours, du 11 juin au 19 juillet 2026. Les rencontres se dérouleront dans 16 stades répartis entre les États-Unis (11), le Mexique (3) et le Canada (2). La phase de groupes durera 17 jours, suivie de la phase à élimination directe.

Ce nouveau format suscite des débats. Ses partisans y voient une opportunité d'universaliser le football, tandis que ses détracteurs craignent une dilution de la qualité. La FIFA assure que le niveau global sera maintenu grâce à l'augmentation du nombre de matchs à enjeu en phase de groupes.`,
    date: "2026-01-25",
    category: "equipes",
    tags: ["format", "48 équipes", "FIFA", "règlement"],
    imageEmoji: "📋",
  },
  {
    id: 10,
    slug: "paris-sportifs-bonus-bookmakers-coupe-du-monde",
    title: "Paris sportifs CDM 2026 : les meilleurs bonus des bookmakers",
    excerpt: "Les bookmakers rivalisent d'offres spéciales pour la Coupe du Monde 2026. Comparatif des meilleurs bonus disponibles pour les parieurs français.",
    content: `À l'approche de la Coupe du Monde 2026, les opérateurs de paris sportifs agréés en France déploient des offres promotionnelles exceptionnelles. Betclic propose un bonus de bienvenue allant jusqu'à 100€ en freebets, tandis que Winamax offre jusqu'à 100€ de paris gratuits.

Parler-Foot a analysé les différentes offres disponibles : Unibet se distingue avec un cashback de 50€ sur le premier pari, et PMU Sport propose des cotes boostées sur tous les matchs de l'équipe de France. Les offres sont valables pour les nouveaux inscrits majeurs.

Rappelons que les paris sportifs comportent des risques de dépendance et d'endettement. Il est essentiel de jouer de manière responsable et de ne jamais parier plus que ce que l'on peut se permettre de perdre. Le numéro d'aide est le 09 74 75 13 13 (appel non surtaxé).`,
    date: "2026-01-20",
    category: "paris",
    tags: ["bonus", "bookmakers", "Betclic", "Winamax", "offres"],
    imageEmoji: "🎰",
  },
  {
    id: 11,
    slug: "sofi-stadium-los-angeles-preparations-cdm-2026",
    title: "SoFi Stadium : Los Angeles prêt pour les demi-finales",
    excerpt: "Le SoFi Stadium de Los Angeles, qui accueillera les demi-finales, peaufine ses derniers préparatifs. Visite guidée de cette enceinte futuriste.",
    content: `Le SoFi Stadium d'Inglewood, en banlieue de Los Angeles, est prêt à accueillir deux demi-finales de la Coupe du Monde 2026. Cette enceinte ultramoderne de 70 000 places, inaugurée en 2020, est considérée comme l'un des stades les plus avancés technologiquement au monde.

Son immense écran circulaire de 6 000 m², suspendu au-dessus du terrain, offrira une expérience visuelle unique aux spectateurs. Le stade a été équipé d'un système de climatisation spécial pour garantir des conditions de jeu optimales malgré la chaleur californienne.

Les autorités locales ont investi 200 millions de dollars dans les infrastructures de transport environnantes, incluant une nouvelle station de métro et des parkings relais. "Los Angeles sera la vitrine de cette Coupe du Monde", a promis le maire de la ville lors de la présentation des installations.`,
    date: "2026-01-15",
    category: "stades",
    tags: ["SoFi Stadium", "Los Angeles", "demi-finales", "technologie"],
    imageEmoji: "🌴",
  },
  {
    id: 12,
    slug: "bresil-neymar-retour-coupe-du-monde-2026",
    title: "Brésil : Neymar annonce sa retraite internationale, la Seleção tourne la page",
    excerpt: "Neymar a officiellement annoncé qu'il ne participera pas à la Coupe du Monde 2026. Le Brésil mise sur sa nouvelle génération dorée.",
    content: `Neymar Jr a mis fin au suspense en annonçant sa retraite internationale, renonçant définitivement à la Coupe du Monde 2026. À 34 ans, l'ancien attaquant du PSG et du FC Barcelone, aujourd'hui à Al-Hilal, a reconnu que son corps ne lui permettait plus de rivaliser au plus haut niveau en sélection.

"C'est la décision la plus difficile de ma carrière, mais je veux que le Brésil gagne, et pour cela il faut laisser la place à ceux qui sont au sommet de leur forme", a déclaré Neymar dans une vidéo émouvante publiée sur ses réseaux sociaux.

Le sélectionneur brésilien a salué "le plus grand joueur brésilien de sa génération" tout en soulignant la richesse de l'effectif actuel. Avec Endrick, Savinho, et Estêvão, la nouvelle génération dorée de la Seleção promet un jeu offensif spectaculaire pour reconquérir le trophée perdu depuis 2002.`,
    date: "2026-01-10",
    category: "equipes",
    tags: ["Brésil", "Neymar", "retraite", "Seleção"],
    imageEmoji: "🇧🇷",
  },
  {
    id: 13,
    slug: "billets-revente-arnaques-conseils-supporters",
    title: "Attention aux arnaques : comment acheter ses billets CDM 2026 en toute sécurité",
    excerpt: "Avec la forte demande pour les billets de la Coupe du Monde 2026, les arnaques se multiplient. Nos conseils pour éviter les pièges.",
    content: `La demande exceptionnelle pour les billets de la Coupe du Monde 2026 a engendré une multiplication des tentatives d'arnaque en ligne. La FIFA et les autorités alertent les supporters sur les risques liés à l'achat de billets en dehors des canaux officiels.

Des sites frauduleux imitant la plateforme officielle FIFA ont été identifiés dans plusieurs pays. Certains proposent des billets à des prix deux à trois fois supérieurs au tarif officiel, sans aucune garantie de livraison. D'autres utilisent des techniques de phishing pour voler les données bancaires des acheteurs.

Pour se protéger, la FIFA recommande d'acheter exclusivement sur FIFA.com/tickets, de vérifier l'URL du site avant tout achat, et de ne jamais communiquer ses identifiants par email. En cas de revente, seule la plateforme officielle de revente FIFA garantit la validité des billets. Le programme d'hospitalité officiel est également une option pour les packages premium.`,
    date: "2026-01-05",
    category: "billets",
    tags: ["arnaques", "billets", "sécurité", "FIFA", "conseils"],
    imageEmoji: "⚠️",
  },
  {
    id: 14,
    slug: "liste-joueurs-france-cdm-2026-effectif-bleus",
    title: "Liste des joueurs France CDM 2026 - effectif probable des Bleus",
    excerpt: "Qui seront les 26 Bleus sélectionnés pour la Coupe du Monde 2026 ? Analyse de l'effectif probable de l'équipe de France avec les candidats poste par poste.",
    content: `La Coupe du Monde 2026 représente une opportunité historique pour l'équipe de France de décrocher un troisième titre mondial. À quelques mois de la compétition, l'heure est au bilan et aux projections sur la liste des joueurs qui défendront les couleurs des Bleus cet été aux États-Unis, au Canada et au Mexique. Didier Deschamps, dont l'avenir sur le banc au-delà du Mondial reste incertain, a exprimé sa volonté de mener la France au sommet une dernière fois.

Dans les buts, la concurrence reste limitée mais solide. Mike Maignan (AC Milan) s'est imposé comme le titulaire incontesté depuis l'Euro 2024. Son niveau de performances en Serie A et en Ligue des champions en fait l'un des meilleurs gardiens du monde. Brice Samba (RC Lens) et Alphonse Areola (West Ham) restent en lice pour les deux places de remplaçants, bien que la présence de Safonov au PSG relance les discussions autour de la troisième place.

En défense, la charnière centrale Konaté - Upamecano semble la plus probable, même si les performances en demi-teinte de Dayot Upamecano en Bundesliga ont relancé le débat. William Saliba (Arsenal) est lui en pleine bourre et pourrait s'imposer comme titulaire. Wesley Fofana, en difficulté physique, reste incertain. Sur les côtés, Théo Hernandez (AC Milan) s'est définitivement installé à gauche, tandis qu'à droite, Jules Koundé (FC Barcelone) continue de faire l'unanimité. Benjamin Pavard pourrait apporter de la polyvalence. Au total, Deschamps pourrait convoquer six ou sept défenseurs.

Le milieu de terrain s'annonce l'une des zones les plus compétitives de la sélection. Aurélien Tchouaméni (Real Madrid) sera le pivot défensif, accompagné de Warren Zaïre-Emery dont la progression fulgurante a bluffé tout le monde. N'Golo Kanté, revenu à un niveau rassurant à Al-Ittihad, pourrait faire partie de l'aventure comme milieu d'expérience. Adrien Rabiot reste une option, de même qu'Eduardo Camavinga et Khéphren Thuram, auteur d'une grande saison à la Juventus. Le secteur offensif du milieu verra la concurrence entre Youssouf Fofana, Mattéo Guendouzi et Antoine Griezmann pour compléter le onze.

En attaque, le trio Mbappé-Griezmann-Dembélé ou Mbappé-Griezmann-Thuram semble le plus probable pour débuter. Kylian Mbappé (Real Madrid) reste le leader incontesté et le joueur autour duquel tout le système s'articule. Antoine Griezmann, à 35 ans lors du tournoi, apporte son expérience irremplaçable et sa capacité à créer du lien entre les lignes. Marcus Thuram (Inter Milan) et Ousmane Dembélé (PSG) se disputent la troisième place de titulaire. Désiré Doué (PSG), révélation de la saison, pourrait créer la surprise. Bradley Barcola, auteur d'une saison exceptionnelle avec le PSG, est également dans la course. Randal Kolo Muani, malgré sa situation délicate au PSG, reste un remplaçant de luxe.

La liste définitive de 26 joueurs sera dévoilée début juin 2026, à moins d'un mois du coup d'envoi. Les supporters attendent notamment de savoir si Deschamps fera confiance aux jeunes talents ou s'il misera sur l'expérience de cadres comme Giroud, qui a annoncé mettre fin à sa carrière internationale. Une chose est sûre : la France aborde cette Coupe du Monde avec l'une des générations les plus talentueuses de son histoire, et les Bleus seront parmi les grands favoris pour soulever le trophée le 19 juillet au MetLife Stadium.`,
    date: "2026-02-19",
    category: "equipes",
    tags: ["France", "Bleus", "effectif", "sélection", "Mbappé", "Griezmann", "Deschamps"],
    imageEmoji: "🇫🇷",
  },
  {
    id: 15,
    slug: "decalage-horaire-cdm-2026-matchs-france",
    title: "Décalage horaire CDM 2026 - à quelle heure voir les matchs en France",
    excerpt: "La Coupe du Monde 2026 se joue en Amérique du Nord. Découvrez le décalage horaire selon les villes hôtes et les horaires de diffusion des matchs en France.",
    content: `Regarder la Coupe du Monde 2026 depuis la France implique de composer avec le décalage horaire des villes hôtes américaines, canadiennes et mexicaines. Selon les stades, ce décalage varie de 5 à 8 heures, ce qui aura un impact significatif sur les horaires de diffusion des matchs. Pour les supporters français, il faudra s'adapter à des horaires parfois tardifs en soirée et même en nuit pour certains matchs.

Les villes hôtes et leurs fuseaux horaires sont les suivants. À l'Est des États-Unis et au Canada (New York/New Jersey, Boston, Philadelphia, Toronto, Miami), le décalage est de -6 heures en heure d'été française (UTC+2 en été), soit les matchs diffusés à 15h, 19h ou 22h heure de Paris si le coup d'envoi local est à 9h, 13h ou 16h. À l'heure centrale américaine (Kansas City, Dallas), le décalage monte à -7 heures. À l'heure des Rocheuses (Seattle, Vancouver), c'est -8 heures. Quant à Los Angeles et San Francisco (heure Pacifique), le décalage est de -9 heures en heure d'été française.

Pour le fuseau horaire mexicain (Mexico City, Guadalajara, Monterrey), les matchs joués à l'heure centrale mexicaine (UTC-6) seront décalés de 8 heures par rapport à la France. Un match à 17h locale à Mexico correspondra à 1h du matin en France. Cela concerne notamment le match d'ouverture de la compétition, prévu au Stade Azteca de Mexico, et qui risque fort d'être diffusé en pleine nuit côté français.

Pour les matchs de la phase de groupes, la FIFA prévoit des créneaux horaires variés : typiquement à 9h, 12h, 15h et 18h heure locale. Pour les supporters français, cela signifie des matchs à 15h, 18h, 21h et 0h (minuit), selon la ville hôte. Les matchs à minuit correspondront aux matchs joués sur la côte Est américaine à 18h locale. La situation se complique pour les matchs en soirée côté Pacifique, qui pourraient démarrer à 3h ou 4h du matin en France.

À partir des huitièmes de finale, la FIFA concentre généralement les matchs sur deux créneaux horaires (15h et 19h heure locale), ce qui donne des diffusions à 21h et 1h du matin en France pour les matchs de la côte Est. Pour les demi-finales au MetLife Stadium et au Rose Bowl de Los Angeles (ou SoFi Stadium), prévues à 19h heure locale, les Français devront se lever à 4h du matin (heure Pacifique) ou rester debout jusqu'à 1h (heure Est).

La finale, prévue le 19 juillet 2026 au MetLife Stadium (New York/New Jersey, fuseau Est), devrait débuter à 19h heure locale, soit 1h du matin heure française. Les chaînes de télévision françaises (TF1 et beIN Sports notamment) devraient diffuser ces matchs en direct, quels que soient les horaires. Pour les matchs nocturnes, des émissions spéciales et des retransmissions en replay seront disponibles. Les supporters déterminés pourront toujours organiser des soirées-matchs entre amis, une tradition bien établie en France lors des Coupes du Monde en décalage horaire. En 2002 (Japon/Corée), les Français avaient déjà dû s'adapter à des matchs à 6h du matin — l'aventure 2026 ne sera pas aussi extrême, mais nécessitera tout de même quelques sacrifices de sommeil.`,
    date: "2026-02-18",
    category: "equipes",
    tags: ["décalage horaire", "matchs", "horaires", "diffusion", "TV", "streaming"],
    imageEmoji: "⏰",
  },
  {
    id: 16,
    slug: "prix-billets-cdm-2026-combien-ca-coute",
    title: "Prix des billets CDM 2026 - combien ça coûte vraiment",
    excerpt: "Tarifs officiels, revente, packages hospitalité : le guide complet des prix des billets pour la Coupe du Monde 2026 afin de budgétiser votre expérience.",
    content: `Obtenir des billets pour la Coupe du Monde 2026 est le rêve de millions de supporters à travers le monde. Mais combien faut-il vraiment débourser pour assister aux matchs en Amérique du Nord cet été ? Entre les tarifs officiels FIFA, le marché de la revente et les packages hospitality, les options et les prix varient considérablement. Voici un guide complet pour y voir plus clair et budgétiser votre expérience.

Les billets officiels de la FIFA sont divisés en quatre catégories de prix. Pour la phase de groupes, les tarifs officiels débutent à 50 dollars (catégorie 4, places les moins bien situées) et montent jusqu'à 300 dollars pour la catégorie 1 (meilleures places en tribune). La catégorie 2 est proposée entre 100 et 150 dollars, et la catégorie 3 entre 150 et 200 dollars. Ces prix sont exprimés en dollars américains, et les supporters européens doivent donc tenir compte du taux de change euro/dollar, actuellement favorable aux Européens avec un dollar légèrement en dessous de l'euro.

Pour les matchs à élimination directe, les prix grimpent sensiblement. Les huitièmes de finale sont proposés entre 100 et 400 dollars, les quarts de finale entre 150 et 600 dollars. Les demi-finales atteignent entre 300 et 900 dollars. La finale au MetLife Stadium représente le Graal absolu : les billets officiels vont de 500 dollars (catégorie 4) à 1 500 dollars pour la catégorie 1. Des billets "match d'ouverture" premium sont également disponibles, avec des prix équivalents aux quarts de finale.

Sur le marché de la revente, les prix sont nettement plus élevés. La FIFA dispose d'une plateforme officielle de revente (Ticket Marketplace) où les billets non utilisés peuvent être revendus à leur prix facial, sans marge. En dehors de cette plateforme, sur les sites comme StubHub, Viagogo ou SeatGeek, les prix pour les matchs les plus demandés (France, Brésil, Argentine) peuvent atteindre 3 à 5 fois le tarif officiel. Un billet de phase de groupes pour un match de la France peut ainsi coûter entre 300 et 800 dollars sur le marché secondaire. La FIFA met en garde contre les achats sur ces plateformes non officielles, qui ne garantissent pas la validité des billets.

Pour les supporters qui souhaitent une expérience premium sans les tracas de la chasse aux billets, les packages hospitalité officielle FIFA sont une option, certes coûteuse. Ces packages incluent le billet, le transport vers le stade, la restauration, et diverses animations. Ils varient de 1 500 dollars à plus de 10 000 dollars par personne selon les matchs et les prestations. Pour la finale, certains packages premium dépassent les 20 000 dollars par personne.

La FIFA a mis en place un système d'achat par tirage au sort pour les matchs les plus demandés, afin de garantir une répartition équitable des billets. Les supporters ont dû s'enregistrer et participer au tirage avant la vente. Plusieurs phases de vente ont eu lieu : une première en mai 2025, une seconde en août 2025, et une troisième vente ouvre en mars 2026 pour les billets restants. Pour les supporters qui n'auraient pas encore de billets, cette troisième phase représente la dernière chance d'en obtenir aux tarifs officiels. Il est conseillé de se connecter sur fifa.com/tickets dès l'ouverture de la vente, en prévoyant le risque de files d'attente virtuelles importantes pour les matchs populaires.`,
    date: "2026-02-17",
    category: "billets",
    tags: ["billets", "prix", "tarifs", "FIFA", "revente", "hospitalité"],
    imageEmoji: "🎟️",
  },
  {
    id: 17,
    slug: "metlife-stadium-guide-complet-stade-finale-2026",
    title: "MetLife Stadium - tout savoir sur le stade de la finale CDM 2026",
    excerpt: "Le MetLife Stadium accueillera la finale de la Coupe du Monde 2026. Capacité, histoire, comment s'y rendre, que voir autour : le guide complet de l'enceinte new-yorkaise.",
    content: `Le MetLife Stadium, situé à East Rutherford dans le New Jersey, à environ 20 kilomètres du centre de Manhattan, a été désigné par la FIFA pour accueillir la finale de la Coupe du Monde 2026, prévue le 19 juillet. Cette décision en fait l'un des stades les plus importants de l'histoire du football mondial, aux côtés de venues légendaires comme le Maracanã et le Stade Azteca. Retour complet sur cette enceinte exceptionnelle.

Inauguré en 2010, le MetLife Stadium est une structure ultramoderne pouvant accueillir jusqu'à 82 500 spectateurs pour la finale (capacité standard de 82 500 places, légèrement augmentée grâce à une configuration spéciale pour l'événement). Il s'agit du stade de la NFL le plus grand des États-Unis. Il est partagé par les deux franchises NFL de la région new-yorkaise : les New York Giants et les New York Jets. L'enceinte est entièrement couverte par un toit fixe, offrant une protection contre les intempéries tout en conservant une atmosphère ouverte. La pelouse naturelle hybride, spécialement renovée pour la Coupe du Monde, offre des conditions de jeu optimales.

L'architecture du MetLife Stadium est résolument tournée vers le XXIe siècle. Les façades extérieures sont recouvertes d'un bardage en panneaux LED capables d'afficher des animations lumineuses spectaculaires. À l'intérieur, quatre écrans géants en haute définition de 30 mètres de base chacun assurent une visibilité parfaite depuis toutes les tribunes. Le confort des spectateurs a été particulièrement soigné avec des sièges larges, de nombreux points de restauration et des sanitaires en grand nombre. Les zones de loges premium peuvent accueillir des centaines d'entreprises et de VIP dans un cadre luxueux.

Pour s'y rendre, les supporters ont plusieurs options. Le train de banlieue NJ Transit relie Manhattan (Penn Station) à la Meadowlands Sports Complex Station en environ 30 minutes, avec un service fréquent les jours de match. C'est l'option la plus pratique et la moins chère (environ 5 à 10 dollars l'aller). Les bus NJ Transit desservent également le stade depuis Port Authority Bus Terminal à Manhattan. En voiture, le stade est accessible depuis plusieurs autoroutes (NJ Turnpike, Route 3), mais le parking est limité et cher lors des grands événements. Des navettes supplémentaires seront mises en place pendant la Coupe du Monde, avec des points d'embarquement à Manhattan, Newark et dans les principales gares du New Jersey.

Autour du stade et dans la région, les activités ne manquent pas. Le complexe de Meadowlands abrite également un hippodrome, un casino et des espaces commerciaux. New York City, accessible en 30 minutes, offre évidemment toutes les attractions d'une métropole mondiale : Times Square, Central Park, Statue de la Liberté, Broadway, musées de classe mondiale et restaurants de toutes les cuisines. Durant la Coupe du Monde, des fan zones officielles seront installées dans plusieurs endroits de Manhattan, notamment à Central Park et sur la rive de l'Hudson, pour vivre l'ambiance du tournoi même sans billet.

Pour les supporters qui souhaitent assister à la finale, quelques conseils pratiques : arriver au moins 3 heures avant le match pour passer les contrôles de sécurité (qui seront très stricts pour cet événement exceptionnel), prévoir des vêtements confortables adaptés à la météo estivale new-yorkaise (potentiellement très chaud et humide en juillet), apporter un poncho léger en cas de pluie (le toit ne couvre pas entièrement les tribunes latérales), et garder son billet électronique sur un appareil chargé ou imprimer une version papier en cas de problème de batterie. La finale de la Coupe du Monde 2026 promet d'être l'un des événements sportifs les plus marquants du 21e siècle, et le MetLife Stadium sera à la hauteur de l'occasion.`,
    date: "2026-02-17",
    category: "stades",
    tags: ["MetLife Stadium", "finale", "New Jersey", "New York", "guide"],
    imageEmoji: "🏟️",
  },
  {
    id: 18,
    slug: "calendrier-cdm-2026-toutes-dates-horaires",
    title: "Calendrier CDM 2026 - toutes les dates et horaires des matchs",
    excerpt: "Du match d'ouverture le 11 juin à la finale le 19 juillet 2026, retrouvez le calendrier complet de la Coupe du Monde avec toutes les dates clés à retenir.",
    content: `La Coupe du Monde 2026 s'étend sur 39 jours de compétition intense, du 11 juin au 19 juillet 2026. Avec 48 équipes et 104 matchs au total (contre 64 lors des éditions précédentes), c'est le tournoi le plus long et le plus riche de l'histoire de la Coupe du Monde. Voici un calendrier complet des grandes dates à retenir pour ne manquer aucun moment de cette compétition historique.

La phase de groupes se déroule du 11 juin au 2 juillet 2026. Durant cette période, les 48 équipes qualifiées sont réparties en 12 groupes de 4 équipes. Chaque équipe dispute 3 matchs. Les deux premiers de chaque groupe ainsi que les 8 meilleurs troisièmes (sur 12) se qualifient pour le tour suivant, soit 32 équipes au total. Les matchs se jouent simultanément dans plusieurs stades, ce qui garantit des actions en continu presque toute la journée. Le match d'ouverture aura lieu au Stade Azteca de Mexico, théâtre de tant d'histoires footballistiques, avec le Mexique en vedette.

Les huitièmes de finale se disputent du 4 au 9 juillet 2026. Les 32 équipes qualifiées s'affrontent en matches à élimination directe. En cas d'égalité à la fin du temps réglementaire, les équipes jouent une prolongation de 30 minutes, puis éventuellement des tirs au but. Ces matchs sont programmés dans les villes qui accueillent les matchs les plus attendus, avec souvent des affiches impliquant les grandes nations du football.

Les quarts de finale auront lieu les 11 et 12 juillet 2026, avec deux matchs par jour. Puis les deux demi-finales sont prévues les 14 et 15 juillet 2026. La première demi-finale sera jouée au Rose Bowl de Los Angeles ou au SoFi Stadium, tandis que la seconde se tiendra à l'AT&T Stadium de Dallas ou au MetLife Stadium de New York. Le match pour la troisième place est programmé le 18 juillet 2026.

La grande finale aura lieu le dimanche 19 juillet 2026 au MetLife Stadium (East Rutherford, New Jersey), coup d'envoi prévu à 19h heure locale (1h du matin en France). C'est le couronnement d'un mois et demi de compétition, qui désignera la meilleure équipe nationale du monde jusqu'en 2030. Les dates clés à noter absolument : 11 juin (match d'ouverture à Mexico), 14 et 15 juillet (demi-finales), 19 juillet (finale au MetLife Stadium).

Pour les supporters français, les matchs des Bleus sont particulièrement attendus. Si la France se qualifie, ses matchs de groupe devraient se jouer en juin, avec des adversaires tirés au sort en décembre 2025. Les matchs des Bleus seront retransmis en clair sur TF1 et en streaming sur TF1+. Pour ne pas rater un seul match, il est conseillé de télécharger l'application officielle FIFA World Cup, qui proposera le calendrier complet en temps réel avec des mises à jour régulières sur les horaires et les stades. Le calendrier définitif des matchs de la phase de groupes sera publié après le tirage au sort, et les matchs à élimination directe ne sont programmés qu'une fois les qualifiés connus, ce qui ajoute une dimension de suspense jusqu'au bout.`,
    date: "2026-02-16",
    category: "equipes",
    tags: ["calendrier", "dates", "horaires", "matchs", "programme", "finale"],
    imageEmoji: "📅",
  },
  {
    id: 19,
    slug: "comment-regarder-cdm-2026-france-tv-streaming",
    title: "Comment regarder la CDM 2026 en France - chaînes TV et streaming",
    excerpt: "TF1, beIN Sports, streaming gratuit ou payant : où et comment regarder tous les matchs de la Coupe du Monde 2026 depuis la France ? Le guide complet.",
    content: `La Coupe du Monde 2026 sera l'événement télévisuel de l'année. En France, les droits de diffusion sont répartis entre plusieurs chaînes et plateformes, avec un accès gratuit assuré pour les matchs les plus attendus. Voici tout ce que vous devez savoir pour ne manquer aucun match de la compétition, que vous soyez chez vous, au bureau ou en déplacement.

En ce qui concerne la télévision gratuite, TF1 a acquis les droits de diffusion en clair pour les 104 matchs de la compétition, en partage avec d'autres diffuseurs. TF1 s'est engagée à diffuser en clair tous les matchs de l'équipe de France, ainsi qu'un certain nombre de matchs phares de la compétition. La chaîne diffusera également les demi-finales et la finale. France 2 devrait également obtenir quelques matchs, notamment les matchs de la France si ceux-ci sont programmés en même temps qu'un autre match de haute importance. France Télévisions a historiquement partagé les droits avec TF1 lors des grandes compétitions.

Pour le câble et le satellite, beIN Sports restera le partenaire premium de la compétition. L'opérateur qatarien diffusera l'intégralité des matchs en direct, avec des studios de présentation délocalisés aux États-Unis pour les matchs importants. Un abonnement beIN Sports coûte entre 15 et 25 euros par mois selon les offres (seul ou inclus dans un bouquet). Canal+ devrait également proposer quelques matchs en exclusivité, notamment pour les soirées chargées où plusieurs matchs se jouent simultanément.

Pour le streaming en ligne, TF1+ (anciennement MYTF1) proposera la diffusion gratuite en live de tous les matchs que TF1 diffusera à la télévision. Il suffit de créer un compte gratuit sur la plateforme. France.tv (la plateforme de France Télévisions) diffusera également les matchs de ses antennes en streaming gratuit. Pour les abonnés beIN Sports, la plateforme beIN Sports Connect (ou MyCanal pour les abonnés Canal+) permet de regarder les matchs sur tous les écrans : smartphone, tablette, PC, Smart TV.

Pour les déplacements et les zones sans TV, plusieurs options existent. Les applications mobiles des chaînes (TF1+, france.tv) permettent de regarder les matchs en direct sur smartphone et tablette, avec une connexion internet suffisante (4G ou WiFi). Des bars et restaurants sportifs diffuseront évidemment tous les matchs en direct, avec une ambiance particulière pour les matchs des Bleus. Des fan zones officielles seront également installées dans plusieurs villes françaises pour permettre aux supporters sans billet de vivre l'expérience collective.

Quelques conseils pratiques pour optimiser votre expérience de visionnage : vérifiez votre abonnement internet car les matchs en streaming peuvent consommer beaucoup de données (environ 3 Go par heure en HD), investissez dans un écran de qualité pour profiter de la diffusion en 4K si disponible, prévoyez vos soirées à l'avance car certains matchs commenceront tard (voire après minuit, heure française), et téléchargez les applications à l'avance pour éviter les problèmes de connexion le jour J. La Coupe du Monde 2026 promet d'être un festin télévisuel, et les diffuseurs français ont bien compris l'enjeu de cet événement unique en son genre.`,
    date: "2026-02-16",
    category: "equipes",
    tags: ["TV", "streaming", "TF1", "beIN Sports", "diffusion", "gratuit"],
    imageEmoji: "📺",
  },
  {
    id: 20,
    slug: "groupes-cdm-2026-tirage-au-sort-analyse",
    title: "Groupes CDM 2026 - tirage au sort et analyse complète",
    excerpt: "Le tirage au sort de la Coupe du Monde 2026 a réparti les 48 équipes en 12 groupes. Analyse des groupes de la mort, des favoris et des surprises potentielles.",
    content: `Le tirage au sort de la Coupe du Monde 2026 a eu lieu en décembre 2025 à Miami, dans une cérémonie grandiose retransmise dans le monde entier. Pour la première fois dans l'histoire de la compétition, 48 nations ont été réparties en 12 groupes de 4 équipes. Ce nouveau format ouvre de nouvelles perspectives et crée de nouvelles dynamiques, avec un nombre accru de matchs et de surprises potentielles.

Le chapeau 1 regroupait les têtes de série, soit les 12 meilleures équipes au classement FIFA au moment du tirage : le Brésil, l'Argentine (championne du monde en titre), la France, l'Angleterre, l'Espagne, le Portugal, la Belgique, les Pays-Bas, l'Allemagne, la Croatie, l'Italie et l'Uruguay. Les États-Unis, pays hôte co-organisateur, étaient automatiquement placés dans le chapeau 1 pour garantir leur présence dans un groupe aux États-Unis. De même pour le Canada et le Mexique dans leurs régions respectives.

Le groupe A, surnommé "groupe de la mort" par les médias, réunit la France, le Brésil, la Belgique et le Sénégal. Les trois premières nations sont classées parmi les favoris absolus au titre, ce qui en fait mathématiquement l'une des phases de groupes les plus relevées de l'histoire de la compétition. La France est logiquement favorite du groupe, mais rien n'est acquis face à un Brésil revanchiste (battu en quart en 2022) et une Belgique qui vit peut-être sa dernière grande génération avec Lukaku et De Bruyne en fin de carrière internationale.

Le groupe des États-Unis s'annonce relativement accessible pour les co-hôtes, qui affrontent l'Uruguay, la Côte d'Ivoire et un représentant de la CONCACAF (Panama ou Honduras). Les États-Unis voudront se qualifier avec la manière devant leur public, après une élimination frustrante en huitièmes de finale en 2022 contre les Pays-Bas. Le public américain, de plus en plus mordu de football depuis l'ère Messi à l'Inter Miami, promet une atmosphère électrique.

Du côté des surprises et des outsiders, le Maroc, demi-finaliste en 2022, se retrouve dans un groupe largement accessible composé du Portugal, de la Jordanie et d'une nation africaine. Les Lions de l'Atlas ont les moyens de finir premiers de leur groupe et d'aller encore plus loin que leur épopée qatarie. Le Japon, qui continue sa montée en puissance, est dans un groupe avec l'Allemagne et deux équipes d'Asie et d'Océanie, et rêve d'une nouvelle surprise face aux Allemands.

Pour suivre tous les groupes et l'évolution des qualifications, le site officiel FIFA World Cup propose un calendrier interactif et des classements en temps réel. Les supporters peuvent également utiliser notre simulateur de groupes sur cdm2026.fr pour tester différents scénarios et prédire quelles équipes se qualifieront. Avec 12 groupes et 48 équipes, les combinaisons sont infinies, et c'est tout ce qui rend ce nouveau format si passionnant : chaque groupe est potentiellement porteur de surprises, et des nations comme le Maroc, le Japon, l'Équateur ou l'Arabie Saoudite ont démontré lors des récentes Coupes du Monde qu'elles étaient capables de bousculer l'ordre établi.`,
    date: "2026-02-15",
    category: "equipes",
    tags: ["groupes", "tirage au sort", "phase de groupes", "analyse", "groupe de la mort"],
    imageEmoji: "🎲",
  },
  {
    id: 21,
    slug: "favoris-cdm-2026-pronostics-bookmakers",
    title: "Favoris CDM 2026 - qui va gagner selon les bookmakers et les experts",
    excerpt: "France, Brésil, Argentine, Angleterre : qui sont les vrais favoris pour remporter la Coupe du Monde 2026 ? Cotes, analyses et pronostics des experts.",
    content: `À l'approche de la Coupe du Monde 2026, les spécialistes et les bookmakers s'accordent sur une liste de favoris mais débattent de leur ordre. Pour la première fois depuis longtemps, la liste des prétendants réels au titre est particulièrement étendue, avec au moins cinq ou six nations capables de soulever le trophée le 19 juillet au MetLife Stadium. Analyse détaillée des candidats et de leurs chances respectives.

La France part comme l'une des grandes favorites, sinon la favorite principale selon la majorité des bookmakers, avec des cotes oscillant entre 5,00 et 6,00 selon les opérateurs. Les Bleus disposent d'une génération dorée autour de Kylian Mbappé, désormais épanoui au Real Madrid, et peuvent aligner du talent à tous les postes. L'expérience de Deschamps, le leadership de Griezmann et la profondeur du banc (avec des joueurs de niveau mondial comme Camavinga, Thuram, Saliba et Maignan) en font une équipe redoutée. La France n'a qu'une seule obsession : effacer le souvenir de l'élimination prématurée en quart de finale de l'Euro 2024.

Le Brésil est co-favori avec des cotes similaires à la France. La Seleção aborde cette Coupe du Monde avec une sélection rajeunie et talentueuse, articulée autour d'Endrick (19 ans au coup d'envoi), Vinicius Jr et Rodrygo au Real Madrid, et Savinho à Manchester City. Sans la légende Neymar (retraité international), le Brésil semble avoir retrouvé une cohérence collective qui lui avait fait défaut lors des dernières éditions. Les Brésiliens n'ont pas soulevé la Coupe du Monde depuis 2002 et la frustration accumulée pourrait se transformer en carburant.

L'Argentine championne du monde en titre est naturellement dans le peloton de tête des favoris (cotes autour de 7,00 à 8,00). Mais avec Lionel Messi qui aura 38 ans et demi lors de la finale, la question de sa forme physique est centrale. La "Pulga" a montré des signaux encourageants à l'Inter Miami, mais un tournoi de ce niveau sur 39 jours sera un test de sa capacité à performer. Autour de lui, Lautaro Martinez, Julian Alvarez et Rodrigo De Paul forment un groupe soudé et expérimenté, capable de se battre jusqu'au bout.

L'Angleterre (cotes autour de 7,50) vit peut-être sa meilleure opportunité depuis 1966. Avec une génération talentueuse emmenée par Bellingham au Real Madrid, Saka à Arsenal, Foden à City et le prolifique Kane, les Three Lions ont les moyens d'aller loin. La finale perdue à l'Euro 2024 a laissé des traces mais aussi transmis une expérience précieuse. L'Espagne (cotes à 9,00), championne d'Europe 2024 avec un jeu collectif supérieur à tous, est l'outsider le plus sérieux. Yamal, Pedri, Olmo et Morata forment un bloc collectif difficile à démanteler. L'Allemagne sur son terrain culturel nord-américain (cotes 10,00), le Portugal de Ronaldo (s'il est présent) et les Pays-Bas complètent la liste des équipes à surveiller.

Pour les paris sportifs autour de la Coupe du Monde, plusieurs marchés sont disponibles bien avant le début de la compétition. Les paris sur le vainqueur final ("Outright Winner") sont les plus populaires, mais les opportunités se trouvent aussi dans les paris sur le meilleur buteur (Mbappé et Vinicius Jr sont co-favoris), le meilleur joueur du tournoi (Ballon d'Or du Mondial), ou encore les équipes à atteindre les demi-finales. Rappelons que les cotes évoluent en permanence en fonction des informations sur les blessures, les compositions d'équipes et les résultats des matchs de préparation. Il est conseillé de comparer les cotes de plusieurs opérateurs et de parier de manière responsable. Le jeu doit rester un divertissement, pas une source de revenus. Jouer comporte des risques : 18+, 09 74 75 13 13.`,
    date: "2026-02-14",
    category: "paris",
    tags: ["favoris", "cotes", "bookmakers", "pronostics", "France", "Brésil", "Argentine"],
    imageEmoji: "🏆",
  },
  {
    id: 22,
    slug: "nouveautes-cdm-2026-48-equipes-nouveau-format",
    title: "Nouveautés CDM 2026 - 48 équipes, nouveau format expliqué",
    excerpt: "La Coupe du Monde 2026 introduit un format révolutionnaire avec 48 équipes et 104 matchs. Tout comprendre sur les changements qui transforment la compétition.",
    content: `La Coupe du Monde 2026 marque une révolution dans l'histoire de la compétition. Décidée par la FIFA en 2017, l'expansion à 48 équipes (contre 32 lors des éditions 1998 à 2022) représente le plus grand changement de format depuis l'introduction des 32 équipes. Cette réforme impacte à la fois le format de compétition, le nombre de matchs, la répartition géographique des équipes qualifiées et le calendrier. Voici tout ce qu'il faut savoir.

Le format de la phase de groupes est entièrement revu. Les 48 équipes sont réparties en 12 groupes de 4 (au lieu de 8 groupes de 4 lors des éditions précédentes). Chaque équipe joue 3 matchs de groupe, comme avant. Les deux premiers de chaque groupe et les 8 meilleurs troisièmes (sur 12 possibles) se qualifient pour le tour suivant, soit 32 équipes pour les huitièmes de finale. Ce critère des "meilleurs troisièmes" est similaire à celui utilisé lors de l'Euro avec 24 équipes, et crée un suspense supplémentaire en fin de phase de groupes.

Le nombre total de matchs passe de 64 à 104. La phase de groupes comprend 48 matchs (12 groupes × 6 matchs par groupe), les huitièmes de finale 16 matchs, les quarts de finale 8 matchs, les demi-finales 2 matchs, plus le match pour la troisième place et la finale. La durée totale du tournoi s'étend sur 39 jours (11 juin - 19 juillet), contre 32 jours pour la Coupe du Monde 2022 au Qatar. Les équipes peuvent donc disputer jusqu'à 7 matchs au lieu de 6 pour atteindre la finale.

La répartition des places entre les confédérations change significativement. L'UEFA (Europe) passe de 13 à 16 places. La CONMEBOL (Amérique du Sud) passe de 4,5 à 6 places. La CAF (Afrique) passe de 5 à 9 places. L'AFC (Asie) passe de 4,5 à 8 places. La CONCACAF (Amérique du Nord et Centrale + Caraïbes) passe de 3,5 à 6 places, plus les 3 places d'hôte pour USA, Canada et Mexique. L'OFC (Océanie) obtient 1 place directe. Cette expansion bénéficie particulièrement à l'Afrique et à l'Asie, qui voient leur représentation presque doubler.

Parmi les autres nouveautés : l'introduction d'une zone de phase de groupes géographique. Les 16 stades hôtes sont répartis entre une "zone Est" (côte Est des États-Unis + Canada), une "zone Centre" (Mexique + Texas + Midwest américain) et une "zone Ouest" (côte Pacifique des États-Unis). Chaque groupe est assigné à une zone géographique pour limiter les déplacements. Les équipes d'un même groupe jouent tous leurs matchs dans la même ville ou dans des villes proches, réduisant la fatigue liée aux voyages.

Des innovations technologiques accompagnent ce nouveau format. Le système de VAR (Video Assistant Referee) sera déployé dans tous les stades avec des améliorations significatives par rapport au Qatar 2022, notamment pour réduire les délais d'intervention. La technologie de détection semi-automatique des hors-jeu (déjà utilisée au Qatar) sera perfectionnée. Un système de communications audio entre arbitres et joueurs (comme dans le rugby) est à l'étude mais n'a pas encore été confirmé. Enfin, la balle officielle Adidas intègre une puce électronique pour un suivi en temps réel permettant des décisions plus précises dans les situations litigieuses (but valide, hors-jeu à quelques centimètres). Ces innovations technologiques visent à rendre la compétition plus équitable et à réduire les controverses arbitrales.`,
    date: "2026-02-13",
    category: "equipes",
    tags: ["nouveautés", "format", "48 équipes", "règles", "changements", "réforme"],
    imageEmoji: "🆕",
  },
  {
    id: 23,
    slug: "villes-hotes-cdm-2026-guide-usa-canada-mexique",
    title: "Villes hôtes CDM 2026 - guide complet USA Canada Mexique",
    excerpt: "16 villes réparties sur 3 pays accueillent la Coupe du Monde 2026. Guide complet de chaque ville hôte : stade, hébergement, activités et conseils pratiques.",
    content: `La Coupe du Monde 2026 se déroule dans 16 villes réparties sur trois pays : les États-Unis (11 villes), le Canada (2 villes) et le Mexique (3 villes). C'est la première fois qu'une Coupe du Monde est organisée sur le territoire de trois pays différents. Chaque ville offre une expérience unique, entre métropoles cosmopolites, villes de soleil et capitales culturelles. Voici le guide complet des villes hôtes.

Aux États-Unis, la liste des villes est impressionnante. New York/New Jersey (MetLife Stadium) accueillera la finale et plusieurs matchs de prestige. C'est la métropole mondiale par excellence, avec ses gratte-ciels, Broadway, Central Park et une offre culturelle et gastronomique inégalable. Los Angeles (SoFi Stadium ou Rose Bowl) est la ville du cinéma, des plages et d'un mode de vie californien décontracté. Dallas (AT&T Stadium) représente le Texas et son amour du sport, avec une culture country et barbecue authentique. San Francisco (Levi's Stadium) offre la Golden Gate, la baie et un écosystème tech dynamique. Miami (Hard Rock Stadium) propose ses plages, sa vie nocturne latine et une atmosphère caribéenne.

Toujours aux États-Unis, Seattle (Lumen Field) est la ville des forêts et du café (Starbucks y est né), avec des paysages de montagne à couper le souffle à proximité. Boston (Gillette Stadium ou Fenway Park) est la ville de l'histoire américaine, du MIT et d'une culture intellectuelle riche. Philadelphia (Lincoln Financial Field) et Kansas City (Arrowhead Stadium) complètent la liste américaine, offrant des expériences différentes entre ville historique et cœur du Midwest américain.

Au Canada, Toronto (BMO Field ou Rogers Centre) est la métropole multiculturelle de l'Ontario, avec une cuisine du monde, une scène musicale dynamique et les chutes du Niagara à proximité. Vancouver (BC Place) offre un mélange unique entre environnement naturel exceptionnel (montagnes, océan) et culture urbaine moderne. Les deux villes canadiennes promettent d'accueillir chaleureusement les supporters du monde entier.

Au Mexique, Mexico City (Stade Azteca) est le cœur historique et culturel de cette Coupe du Monde trinationale. La capitale mexicaine, l'une des plus grandes mégapoles du monde, offre une richesse culturelle extraordinaire : musées de classe mondiale, gastronomie réputée, sites archéologiques précolombiens et une hospitalité légendaire. Guadalajara (Stade Akron) est la deuxième ville du Mexique, berceau du tequila et de la mariachi, avec un caractère authentiquement mexicain. Monterrey (Stade BBVA) est la ville industrielle du nord, proche de la frontière américaine, avec un paysage de sierra impressionnant.

Pour les supporters qui planifient leur voyage, quelques conseils pratiques sur les villes : les prix d'hébergement varient considérablement selon les villes et la proximité des matchs. New York, Los Angeles et San Francisco sont parmi les villes les plus chères pour l'hébergement, avec des hôtels autour des stades qui pratiquent des tarifs multipliés par 3 à 5 durant la Coupe du Monde. México City et les villes mexicaines offrent généralement un meilleur rapport qualité-prix. Il est fortement conseillé de réserver son hébergement dès maintenant, même sans billet confirmé, en privilégiant les réservations annulables gratuitement. La mobilité entre les villes sera facilitée par des vols intérieurs fréquents, mais anticipez des prix élevés en période de compétition.`,
    date: "2026-02-12",
    category: "stades",
    tags: ["villes hôtes", "USA", "Canada", "Mexique", "guide", "voyage"],
    imageEmoji: "🌎",
  },
  {
    id: 24,
    slug: "mbappe-cdm-2026-objectif-coupe-du-monde-france",
    title: "Mbappé CDM 2026 - objectif Coupe du Monde avec la France",
    excerpt: "Kylian Mbappé fait de la Coupe du Monde 2026 son objectif suprême. À 27 ans et au sommet de sa carrière au Real Madrid, les Bleus comptent sur lui pour décrocher le titre.",
    content: `Kylian Mbappé a consacré sa vie entière au football, et la Coupe du Monde 2026 représente pour lui bien plus qu'un simple tournoi : c'est le rendez-vous avec la destinée. À 27 ans au moment du coup d'envoi, le capitaine des Bleus sera au sommet de sa carrière, épanoui au Real Madrid après avoir quitté le PSG lors du mercato de l'été 2024. Avec un premier titre en Liga déjà au palmarès, Mbappé vise désormais le Graal ultime : la Coupe du Monde avec l'équipe de France.

Les statistiques de Mbappé en équipe de France sont déjà historiques. À 27 ans, il est déjà le meilleur buteur de l'histoire des Bleus, devant Thierry Henry (51 buts) et Olivier Giroud. Avec plus de 55 buts en sélection, il fait partie du top 20 mondial des meilleurs buteurs internationaux de tous les temps. Lors de la Coupe du Monde 2022, il avait terminé meilleur buteur du tournoi avec 8 buts (dont un triplé en finale contre l'Argentine, un exploit rarissime dans une finale mondiale) malgré la défaite aux tirs au but des Bleus.

À l'Euro 2024, Mbappé avait connu une compétition compliquée, se cassant le nez dès le premier match et terminant avec seulement un but (sur penalty). Mais son Real Madrid lui a permis de retrouver sa plénitude et sa confiance, avec une Liga gagnée et une Ligue des champions atteinte jusqu'en demi-finale. Au niveau de son club, Mbappé tourne à plus de 0,8 but par match, un ratio qui le place parmi les meilleurs attaquants de l'histoire du football.

Sa relation avec Didier Deschamps a connu des hauts et des bas, mais les deux hommes partagent la même ambition : soulever la Coupe du Monde 2026. Dans plusieurs interviews, Mbappé a exprimé clairement cet objectif : "Je n'ai pas encore fêté mes 30 ans, j'ai le temps de connaître d'autres grandes joies en sélection. Mais le 2026, c'est le rendez-vous que je veux ne pas manquer. Après 2022 où on était si près... il faut qu'on revienne plus fort." Cette détermination, couplée à son talent exceptionnel, fait de lui le leader naturel de cette génération française.

Autour de Mbappé, Deschamps a construit un collectif solide qui permet à son capitaine de s'exprimer pleinement. L'apport de Griezmann (qui joue souvent dans l'ombre pour créer de l'espace pour Mbappé), le pressing intense de Dembélé et la présence physique de Thuram offrent un cadre idéal pour le numéro 10. Les adversaires savent qu'ils doivent neutraliser Mbappé en priorité, ce qui libère souvent de l'espace pour ses partenaires. Cette complémentarité, travaillée depuis plusieurs années en sélection, est l'une des grandes forces du collectif français.

La question sur toutes les lèvres reste celle de la "pression du favori". Mbappé a souvent semblé plus performant dans l'adversité que dans le rôle de favorite incontesté. Mais à 27 ans et avec la maturité accumulée au Real Madrid, il semble avoir franchi un cap mental. Ses proches décrivent un joueur plus posé, plus stratégique dans sa gestion des matchs, moins dans l'improvisation et plus dans le calcul. Si Mbappé est au niveau de ses meilleures performances lors de la Coupe du Monde 2026, l'équipe de France aura un avantage décisif sur tous ses concurrents. La "génération Mbappé" ne peut pas partir de cette Coupe du Monde sans trophy — c'est en tout cas le message que le capitaine envoie à tous ses concurrents.`,
    date: "2026-02-11",
    category: "equipes",
    tags: ["Mbappé", "France", "Real Madrid", "capitaine", "objectif", "Bleus"],
    imageEmoji: "⚡",
  },
  {
    id: 25,
    slug: "stades-cdm-2026-les-16-enceintes-tournoi",
    title: "Stades CDM 2026 - les 16 enceintes du tournoi en détail",
    excerpt: "De l'Azteca à MetLife, les 16 stades de la Coupe du Monde 2026 sont parmi les plus impressionnants du monde. Capacités, caractéristiques et histoire de chaque enceinte.",
    content: `La Coupe du Monde 2026 bénéficie d'un parc de stades exceptionnel, répartis entre les États-Unis, le Canada et le Mexique. Avec des capacités allant de 45 000 à 87 000 places et des technologies de pointe, ces 16 enceintes représentent le fleuron du football mondial. Tour d'horizon de chacune d'entre elles.

Au Mexique, trois stades emblématiques : le Stade Azteca (Mexico, 87 000 places) — surnommé "le Colosseum du football" — est le plus grand stade de la Coupe du Monde 2026 et accueillera le match d'ouverture. C'est la seule enceinte à avoir déjà accueilli deux finales mondiales (1970 et 1986). Le Stade Akron (Guadalajara, 49 850 places) est un stade moderne à l'architecture innovante, caractérisé par ses façades végétalisées. Le Stade BBVA (Monterrey, 53 464 places) est l'un des plus beaux stades d'Amérique latine, niché entre des montagnes impressionnantes.

Au Canada, le BC Place (Vancouver, 54 500 places) est un stade polyvalent avec un toit rétractable unique, qui offre des conditions de jeu protégées quelle que soit la météo du Pacifique Nord. Le BMO Field (Toronto, 45 500 places) est le stade de soccer de la ville, moins grand mais avec une atmosphère intimiste et une programmation exclusivement footballistique.

Aux États-Unis, la liste est impressionnante. Le MetLife Stadium (New York/New Jersey, 82 500 places) accueillera la finale et constitue le joyau du tournoi. Le Levi's Stadium (Santa Clara/San Francisco, 68 500 places) est le domicile des San Francisco 49ers, avec une technologie de pointe et une vue sur les montagnes de la Silicon Valley. Le SoFi Stadium (Los Angeles, 70 240 places) est le stade le plus récent (inauguré en 2020) et l'un des plus modernes au monde, avec un double écran suspendu gigantesque. Le Rose Bowl (Pasadena/Los Angeles, 92 500 places) est une enceinte légendaire qui a accueilli la finale de 1994 — c'est le stade avec la plus grande capacité du tournoi.

Toujours aux États-Unis : l'AT&T Stadium (Dallas/Arlington, 80 000 places) est le stade des Dallas Cowboys, avec son dôme de verre impressionnant et le plus grand écran HD du monde. Le Gillette Stadium (Foxborough/Boston, 65 878 places) est le domicile des New England Patriots. L'Arrowhead Stadium (Kansas City, 76 416 places) est considéré comme l'un des stades les plus bruyants du monde en raison de son architecture qui amplifie le son. Le Lincoln Financial Field (Philadelphia, 69 796 places) est le stade des Eagles, situé dans une ville historique avec une forte communauté d'immigrants européens passionnés de football. Le Lumen Field (Seattle, 68 740 places) est réputé pour être l'un des stades les plus sonores du monde (record du monde de décibels détenu par les fans des Seahawks). Le Camping World Stadium (Orlando, 60 219 places) offre un cadre ensoleillé en Floride centrale.

Pour les 16 stades, des travaux de mise aux normes FIFA ont été effectués : installation de pelouses hybrides (naturelles + synthétiques), amélioration des vestiaires et des zones médias, installation de systèmes anti-chaleur (ventilation et brumisateurs), et amélioration de l'accessibilité. Certains stades comme le Rose Bowl et le Gillette Stadium sont plus anciens et ont nécessité des rénovations plus importantes. Au total, plus de 1 milliard de dollars ont été investis dans la préparation des stades pour ce Mondial nord-américain.`,
    date: "2026-02-10",
    category: "stades",
    tags: ["stades", "enceintes", "MetLife", "Azteca", "capacité", "infrastructure"],
    imageEmoji: "🏟️",
  },
  {
    id: 26,
    slug: "budget-voyage-cdm-2026-combien-prevoir",
    title: "Budget voyage CDM 2026 - combien prévoir pour y aller",
    excerpt: "Vols, hôtels, billets de match, restauration : combien coûte vraiment un voyage pour assister à la Coupe du Monde 2026 ? Notre guide complet du budget à prévoir.",
    content: `Assister à la Coupe du Monde 2026 en Amérique du Nord est le rêve de nombreux supporters français. Mais combien faut-il vraiment budgétiser pour ce voyage d'une vie ? Entre les billets d'avion, l'hébergement, les billets de match et les dépenses quotidiennes, la note peut rapidement grimper. Voici un guide réaliste et détaillé pour planifier votre budget.

Les billets d'avion représentent généralement le premier grand poste de dépense. Pour un vol Paris-New York (hub principal pour la côte Est), les prix en économie varient entre 600 et 1 500 euros aller-retour selon la période de réservation. Pour les matchs de phase de groupes en juin, des vols à environ 700-900 euros sont encore disponibles si réservés maintenant. Pour Los Angeles (côte Ouest), les tarifs sont similaires voire légèrement plus élevés. Pour Mexico, les vols directs sont moins fréquents et coûtent entre 700 et 1 200 euros. En classe affaires, comptez de 2 500 à 6 000 euros pour ces trajets. Conseil : réservez dès maintenant, les prix ne feront qu'augmenter à l'approche de l'événement.

L'hébergement est le poste de dépense le plus variable. À New York, un hôtel 3 étoiles dans la zone centrale coûte normalement 150 à 250 dollars par nuit, mais pendant la Coupe du Monde, prévoyez de 300 à 600 dollars par nuit. Les Airbnb sont souvent une alternative plus économique (100 à 250 dollars par nuit). À Los Angeles, les prix sont similaires. À Mexico City, l'hébergement est nettement moins cher : 60 à 150 dollars pour un hôtel 3 étoiles en période de match. Toronto et Vancouver sont intermédiaires (150 à 350 dollars en période de Coupe du Monde). Pour un séjour de 10 jours avec 3 matchs de groupe et un potentiel huitième de finale, prévoyez un budget hébergement de 2 000 à 5 000 euros.

Les billets de match, selon les catégories, coûtent de 50 à 300 dollars pour la phase de groupes (plus les frais de traitement et de livraison). Pour les matchs à élimination directe, de 100 à 900 dollars. Si vous souhaitez voir la finale, les billets officiels partent de 500 à 1 500 dollars. Pour un package de 3 matchs de groupe + 1 huitième de finale en catégorie 3 (bonne visibilité), prévoyez un budget billets de 600 à 1 000 dollars (environ 550 à 900 euros).

Les dépenses quotidiennes aux États-Unis sont significatives. Comptez 50 à 100 dollars par jour pour la restauration (petit-déjeuner, déjeuner rapide et dîner dans un restaurant casual). Les transports en commun dans les grandes villes coûtent 5 à 15 dollars par jour. Les sorties, musées et activités touristiques ajoutent 30 à 80 dollars par jour. Au Mexique, les dépenses quotidiennes sont environ 2 fois moins élevées (25 à 50 dollars par jour pour se nourrir). Pour 10 jours aux États-Unis, prévoyez 700 à 1 500 euros de dépenses quotidiennes.

En récapitulatif, voici trois scénarios de budget : Budget serré (10 jours, 3 matchs de groupe, hébergement Airbnb, classe économique, restauration locale) : 3 500 à 5 000 euros. Budget confort (10 jours, 3 matchs de groupe + 1 huitième, hôtel 3 étoiles, classe économique, restaurants variés) : 5 000 à 8 000 euros. Budget premium (14 jours, 4 à 6 matchs dont un quart ou demi-finale, hôtel 4 étoiles, billets catégorie 1-2) : 10 000 à 20 000 euros ou plus. Ces estimations sont données à titre indicatif et peuvent varier selon les promotions, la ville choisie et le mode de voyage. L'essentiel est de prévoir suffisamment en avance pour bénéficier des meilleures offres.`,
    date: "2026-02-09",
    category: "billets",
    tags: ["budget", "voyage", "coût", "hébergement", "vols", "billets", "planification"],
    imageEmoji: "💰",
  },
  {
    id: 27,
    slug: "qualifications-cdm-2026-equipes-qualifiees",
    title: "Qualifications CDM 2026 - toutes les équipes qualifiées par confédération",
    excerpt: "Qui sont les 48 équipes qualifiées pour la Coupe du Monde 2026 ? Liste complète par confédération avec le parcours de chaque équipe et les surprises des éliminatoires.",
    content: `La Coupe du Monde 2026 réunit pour la première fois 48 équipes nationales, une expansion significative par rapport aux 32 équipes des éditions précédentes. Cette augmentation a permis à plusieurs nations de participer à leur première Coupe du Monde ou de revenir dans la compétition après plusieurs cycles d'absence. Voici la liste complète des équipes qualifiées par confédération.

En Europe (UEFA, 16 équipes), les géants habituels sont évidemment présents. La France, l'Espagne (championne d'Europe 2024), l'Angleterre, l'Allemagne, le Portugal, la Belgique, la Croatie, les Pays-Bas, l'Italie, le Danemark, la Suisse, l'Autriche, l'Écosse, la Turquie, la Pologne et la Serbie ont décroché leur qualification. Parmi les absences notables en Europe : l'Ukraine (qualifié via les barrages), la Suède, la Russie (toujours exclue par la FIFA suite à l'invasion de l'Ukraine) et la Norvège de Haaland (surprise des éliminatoires). La République tchèque a manqué de peu la qualification directe.

En Amérique du Sud (CONMEBOL, 6 équipes), le Brésil et l'Argentine sont logiquement qualifiés. La Colombie, en pleine renaissance footballistique, l'Uruguay (grand classique du football mondial), l'Équateur et le Chili complètent le groupe sud-américain. La surprise est l'absence du Pérou et du Vénézuela, tandis que le Paraguay a manqué la qualification lors des dernières journées des éliminatoires.

En Afrique (CAF, 9 équipes), neuf nations représentent le continent africain — un record historique. Le Maroc (demi-finaliste en 2022 et toujours en progression), le Sénégal (champion d'Afrique 2022), le Nigeria, le Cameroun, l'Égypte, l'Algérie, la Côte d'Ivoire, la RD Congo et le Mali sont les heureux qualifiés. L'Afrique du Sud, le Ghana et la Tunisie sont les absences les plus marquantes. Cette représentation africaine renforcée est l'une des grandes nouveautés de cette édition.

En Asie (AFC, 8 équipes), les qualifications ont connu des surprises. Le Japon, la Corée du Sud, l'Iran, l'Arabie Saoudite et l'Australie sont les "habitués" qualifiés. L'Ouzbékistan réalise une performance historique en atteignant sa première Coupe du Monde. L'Irak et les Émirats Arabes Unis complètent la liste asiatique. La Chine et l'Inde, deux géants démographiques, ont encore manqué la qualification — une déception pour la popularité mondiale du football.

En CONCACAF (Amérique du Nord, Centrale et Caraïbes, 6 places hors hôtes), les États-Unis, le Canada et le Mexique sont qualifiés d'office en tant que co-organisateurs. Les trois autres places ont été remportées par le Honduras, El Salvador et la Jamaïque — une première pour les Reggae Boyz qui participent à leur première Coupe du Monde. Pour l'Océanie (OFC, 1 place), la Nouvelle-Zélande a décroché le billet via les barrages intercontinentaux. Enfin, deux places ont été attribuées via des barrages intercontinentaux opposant des équipes de différentes confédérations. L'Ukraine et Panama ont décroché ces précieux sésames. Ce tableau complet des qualifiés illustre la diversité géographique unique de cette Coupe du Monde 2026, qui réunit des nations de tous les continents avec une représentation africaine et asiatique sans précédent.`,
    date: "2026-02-08",
    category: "equipes",
    tags: ["qualifications", "équipes qualifiées", "confédérations", "UEFA", "CAF", "AFC"],
    imageEmoji: "🌍",
  },
  {
    id: 28,
    slug: "application-cdm-2026-meilleures-apps-suivre-tournoi",
    title: "Application CDM 2026 - les meilleures apps pour suivre le tournoi",
    excerpt: "FIFA Official App, applications de paris, scores en direct, réseaux sociaux : les meilleures applications pour ne rien manquer de la Coupe du Monde 2026 sur smartphone.",
    content: `Suivre la Coupe du Monde 2026 en temps réel depuis votre smartphone n'a jamais été aussi facile. Avec 104 matchs répartis sur 39 jours et plusieurs rencontres simultanées lors de la phase de groupes, avoir les bonnes applications installées est indispensable pour ne rien manquer de la compétition. Voici notre sélection des meilleures applications pour vivre pleinement cette Coupe du Monde 2026.

L'application officielle FIFA est évidemment incontournable. Disponible gratuitement sur iOS et Android, "FIFA+ | Football Entertainment" propose les scores en direct, le calendrier complet des matchs, les statistiques en temps réel, des replays et des highlights de matchs. Elle inclut également la gestion des billets numériques pour les détenteurs de billets officiels, et permet de suivre l'évolution des groupes et du tableau des phases finales. La qualité de l'application officielle FIFA s'est nettement améliorée depuis la Coupe du Monde 2022 et elle devrait être l'application de référence pour les amateurs de statistiques.

Pour les scores en direct et la couverture générale, plusieurs applications se distinguent. FotMob est considérée par beaucoup comme la meilleure application de scores football, avec des mises à jour ultra-rapides, des statistiques détaillées et une interface intuitive. OneFootball propose une expérience éditoriale plus riche, avec des articles, des vidéos et une couverture approfondie de la Coupe du Monde en français. SofaScore est réputée pour la qualité de ses statistiques avancées et ses heatmaps de joueurs. Google propose également un widget de scores football directement intégré dans son moteur de recherche, pratique pour les consultations rapides.

Pour regarder les matchs en streaming, les applications des chaînes françaises sont essentielles. TF1+ (application gratuite, compte requis) permettra de regarder tous les matchs diffusés par TF1 en live et en replay. France.tv propose le même service pour les matchs de France Télévisions. L'application beIN Sports (abonnement requis) offre l'intégralité de la couverture de la compétition. Pour les possesseurs d'Apple TV, Amazon Fire Stick ou Chromecast, ces applications sont également disponibles pour streamer sur grand écran.

Pour les amateurs de paris sportifs, les applications des bookmakers (Winamax, Unibet, PMU, Betclic, Bwin) proposent en temps réel les cotes sur tous les matchs, avec des options de paris en direct (live betting) pendant les matchs. Ces applications envoient des notifications push pour signaler les changements de cotes importants et les offres promotionnelles. Rappelons que le jeu doit rester un divertissement — jouer de manière responsable est essentiel. 18+, 09 74 75 13 13.

Sur les réseaux sociaux, Twitter/X reste la plateforme de référence pour suivre l'actualité foot en temps réel, avec des fils dédiés aux matchs, les réactions des joueurs et les analyses d'experts. Instagram et TikTok proposent des highlights et des contenus courts des moments forts. YouTube et Instagram des équipes nationales et des joueurs offrent des coulisses exclusives. Enfin, pour les supporters qui veulent participer à la communauté de supporters français pendant la Coupe du Monde, des groupes WhatsApp et Telegram spécialisés permettent de partager réactions, pronostics et bonne humeur avec d'autres fans des Bleus. Notre site cdm2026.fr propose également une application web progressive (PWA) avec simulateur de groupes, comparateur d'équipes et analyses détaillées pour les fans les plus passionnés.`,
    date: "2026-02-07",
    category: "equipes",
    tags: ["application", "app", "smartphone", "FIFA", "streaming", "scores", "mobile"],
    imageEmoji: "📱",
  },
  {
    id: 29,
    slug: "paris-sportifs-cdm-2026-guide-debutant",
    title: "Paris sportifs CDM 2026 - guide complet du débutant",
    excerpt: "Comment parier sur la Coupe du Monde 2026 ? Types de paris, cotes, stratégies et conseils pour les débutants. Tout comprendre avant de se lancer.",
    content: `La Coupe du Monde 2026 sera, comme tous les grands événements sportifs, un moment de forte activité pour les paris sportifs. Des millions de supporters voudront pimenter leur expérience en pariant sur leurs équipes et joueurs favoris. Si vous êtes novice dans le domaine des paris sportifs, ce guide vous explique les bases : les types de paris disponibles, comment fonctionnent les cotes, et quelques conseils pour parier de manière éclairée et responsable. Attention : les paris sportifs comportent des risques financiers réels. 18+.

Les types de paris de base sur la Coupe du Monde sont relativement simples à comprendre. Le pari "1N2" (ou pari sur le résultat) est le plus basique : vous pariez sur la victoire de l'équipe 1, le match nul (N) ou la victoire de l'équipe 2. Pour les matchs à élimination directe, seuls les résultats à 90 minutes (ou 120 minutes si prolongations) sont pris en compte pour ce type de pari. Le pari "score exact" vous demande de prédire le score final précis — plus risqué mais avec des cotes beaucoup plus élevées. Le pari sur le buteur vous permet de miser sur le premier ou le dernier buteur du match, ou sur un joueur à marquer à n'importe quel moment.

Les cotes représentent la probabilité qu'un événement se produise selon le bookmaker, et déterminent votre gain potentiel. Une cote de 2,00 signifie que si vous pariez 10€ et que vous gagnez, vous récupérez 20€ (dont vos 10€ de mise, soit 10€ de bénéfice net). Une cote de 1,50 signifie un bénéfice de 5€ pour 10€ misés. Une cote de 5,00 signifie 40€ de bénéfice pour 10€ misés. Plus la cote est élevée, plus l'événement est considéré comme improbable, et plus votre gain potentiel est important. Les bookmakers incluent toujours une marge dans leurs cotes (environ 5 à 10%), ce qui signifie qu'à long terme, les paris sont déficitaires pour le joueur.

Pour les marchés à long terme ("Outright"), vous pouvez parier sur le vainqueur final de la Coupe du Monde, le meilleur buteur du tournoi, ou l'équipe qui atteindra la finale. Ces paris sont disponibles bien avant le début de la compétition et peuvent être placés maintenant. Les cotes actuelles placent la France et le Brésil comme co-favoris (cotes autour de 5,50 à 6,00 selon les opérateurs), l'Argentine à 7,00-8,00, et l'Angleterre à 7,50-8,50.

Les paris en direct (live betting) sont devenus très populaires. Pendant un match, les cotes évoluent en temps réel en fonction de l'action sur le terrain. Si une équipe encaisse un but rapidement, les cotes pour sa victoire augmentent, offrant potentiellement de bonnes opportunités. Cependant, les décisions rapides sous l'adrénaline peuvent être dangereuses — fixez-vous une mise maximale avant le match et ne la dépassez pas.

Quelques conseils pratiques pour les débutants : commencez par des mises modestes (1 à 5€) le temps de comprendre le fonctionnement ; comparez les cotes sur plusieurs opérateurs (Winamax, Unibet, PMU, Betclic, Bwin proposent tous des cotes légèrement différentes) ; profitez des offres de bienvenue des bookmakers (bonus sur premier dépôt) mais lisez attentivement les conditions ; fixez-vous un budget maximum pour la Coupe du Monde et ne le dépassez jamais ; ne jamais parier pour "récupérer" ses pertes (c'est la spirale du jeu problématique). Les paris sportifs sont un divertissement, pas une stratégie d'investissement. Si vous pensez avoir des comportements problématiques, contactez le 09 74 75 13 13 (numéro national de prévention du jeu). Jouez de manière responsable. 18+.`,
    date: "2026-02-06",
    category: "paris",
    tags: ["paris sportifs", "cotes", "guide", "débutant", "bookmakers", "stratégie"],
    imageEmoji: "📊",
  },
  {
    id: 30,
    slug: "histoire-coupe-du-monde-1930-2026",
    title: "Histoire de la Coupe du Monde - de 1930 à 2026",
    excerpt: "De la première édition en Uruguay en 1930 jusqu'à l'édition nord-américaine de 2026, retrace l'histoire complète de la Coupe du Monde FIFA en 96 ans de légendes.",
    content: `La Coupe du Monde de football FIFA est l'événement sportif le plus regardé au monde, réunissant tous les quatre ans des milliards de téléspectateurs autour d'un même spectacle. Née en 1930 de la vision de Jules Rimet, président de la FIFA, la compétition a traversé 96 ans d'histoire, de drames et de gloires. Retour sur un siècle de football mondial, des débuts hésitants aux sommets de la modernité.

La première Coupe du Monde a eu lieu en Uruguay en 1930. Seules 13 équipes participèrent à ce tournoi inaugural, dont aucune des grandes nations européennes de l'époque (l'Angleterre boudait encore la FIFA). L'Uruguay fut sacré champion chez lui, battant l'Argentine 4-2 en finale au Stade Centenario de Montevideo. La deuxième édition en 1934 en Italie vit le pays hôte triompher, tout comme lors de 1938 en France. Ces premières éditions furent marquées par les tensions politiques de l'époque, avec Mussolini utilisant la victoire italienne à des fins de propagande.

Après l'interruption due à la Seconde Guerre mondiale (pas de Coupe du Monde en 1942 et 1946), la compétition reprit en 1950 au Brésil avec la "Tragédie du Maracanã" : l'Uruguay battit le Brésil 2-1 dans le match décisif devant 200 000 spectateurs dévastés. Les années 1950-1970 furent marquées par la domination du Brésil de Pelé, qui remporta trois titres (1958, 1962, 1970) et inscrivit la "Seleção" dans l'histoire comme l'équipe la plus titrée de la Coupe du Monde avec 5 étoiles au total.

Les années 1970-1990 virent l'émergence de nouvelles forces. L'Allemagne de l'Ouest (1954, 1974, 1990), l'Argentine (1978, 1986 — avec le légendaire Maradona et son "main de Dieu"), l'Italie (1982 — la "Notte di Madrid") et la France (1998 — la génération Zidane-Deschamps-Thuram) s'imposèrent tour à tour. La Coupe du Monde 1994 aux États-Unis marqua la première incursion du football mondial en Amérique du Nord, et contribua au développement du football américain (fondation de la MLS en 1996).

Les éditions 2002 (Japon/Corée — premier Mondial asiatique, victoire du Brésil), 2006 (Allemagne — finale France-Italie mémorable conclue par le coup de tête de Zidane), 2010 (Afrique du Sud — premier Mondial africain, victoire de l'Espagne), 2014 (Brésil — le "7-1" humiliant de l'Allemagne contre le Brésil en demi-finale), 2018 (Russie — sacre de la France de Deschamps avec Mbappé à 19 ans) et 2022 (Qatar — finale épique Argentine-France, défaite des Bleus aux tirs au but après un triplé de Mbappé) ont chacune apporté leurs lots d'émotions inoubliables.

La Coupe du Monde 2026 s'inscrit dans ce récit glorieux comme la plus grande édition de l'histoire, avec 48 équipes et 3 pays hôtes. Elle réunit des nations des six continents et promet d'écrire de nouvelles pages légendaires. Qui succèdera à l'Argentine championne du monde en titre ? Mbappé donnera-t-il à la France sa troisième étoile ? Messi, à 38 ans, réussira-t-il l'exploit de défendre son titre mondial ? Ces questions feront du tournoi nord-américain un événement unique dans les annales du football. En 96 ans, la Coupe du Monde a grandi, évolué, mais une chose reste constante : la capacité du football à unir les peuples autour d'émotions universelles. Et 2026 s'annonce comme le chapitre le plus épique de cette belle histoire.`,
    date: "2026-02-05",
    category: "equipes",
    tags: ["histoire", "Coupe du Monde", "1930", "Pelé", "Maradona", "Zidane", "patrimoine"],
    imageEmoji: "📚",
  },
  {
    id: 31,
    slug: "climat-meteo-cdm-2026-quoi-emporter-valise",
    title: "Climat et météo CDM 2026 - quoi emporter dans sa valise",
    excerpt: "Chaleur à Dallas, fraîcheur à Vancouver, humidité à New York : quel temps faire à la Coupe du Monde 2026 ? Nos conseils pour bien préparer sa valise selon les villes.",
    content: `Partir à la Coupe du Monde 2026 en Amérique du Nord en juin-juillet, c'est s'aventurer dans des climates très variés selon les villes hôtes. De la chaleur étouffante du Texas à la fraîcheur de Vancouver en passant par l'humidité de New York et la sécheresse ensoleillée de Los Angeles, chaque ville offre des conditions météorologiques distinctes. Préparer sa valise en conséquence est essentiel pour vivre l'expérience confortablement.

New York et New Jersey (MetLife Stadium) en juillet : le mois de juillet à New York est chaud et humide, avec des températures qui atteignent régulièrement 30 à 35°C et un taux d'humidité élevé qui peut rendre la chaleur oppressante. Les orages de fin d'après-midi sont fréquents. Prévoyez des vêtements légers et respirants (coton ou matières techniques), de la crème solaire SPF50+, une bouteille d'eau réutilisable et un imperméable léger pour les averses soudaines. Les soirs peuvent parfois être frais (20-25°C), une veste légère est utile.

Los Angeles et San Francisco (juin-juillet) : Los Angeles bénéficie d'un microclimat méditerranéen avec des étés secs et ensoleillés (25-30°C). Peu de risque de pluie, mais prévoyez une protection solaire robuste — le soleil californien est intense. San Francisco (Levi's Stadium à Santa Clara, à 50 km au sud) peut être surprenante : les brouillards matinaux sont fréquents et les après-midis peuvent être frais (18-22°C). Une veste est recommandée même en juillet. Seattle bénéficie d'un été agréable (20-25°C) mais avec des possibilités de pluie légère.

Dallas (AT&T Stadium) et Miami (Hard Rock Stadium) : Dallas en juin-juillet, c'est la fournaise texane avec des températures de 35 à 40°C et un stade en plein air (bien que couvert). L'air conditionné à l'intérieur peut créer un choc thermique important — prévoyez une veste pour l'intérieur des bâtiments. Miami combine chaleur (30-35°C) et humidité tropicale, avec des pluies d'été quasi quotidiennes en fin d'après-midi. Un poncho imperméable léger est indispensable. La protection contre les moustiques (répulsif) est également recommandée à Miami.

Au Canada, Vancouver (juin) offre le climat le plus agréable de la compétition : 18-23°C avec peu de pluie en juin (contrairement au reste de l'année). C'est la ville idéale pour explorer la nature environnante (parcs, randonnées). Toronto peut être chaud et humide en juin (20-28°C) avec des possibilités d'orages. Le Mexique (Mexico City, Guadalajara, Monterrey) présente des nuances : Mexico à 2 240 m d'altitude est plus fraîche (20-25°C le jour, 10-15°C la nuit) mais avec des orages de mousson en juin-juillet. Emportez absolument un pull pour les soirées. Guadalajara est similaire, tandis que Monterrey est plus chaude (30-38°C) et humide.

Liste des essentiels à emporter dans votre valise : vêtements légers et respirants (coton, lin, matières techniques anti-transpirantes) pour les journées chauds, une veste légère pour les soirées et l'air conditionné omniprésent aux États-Unis, de bonnes chaussures de marche confortables (vous marcherez beaucoup), de la crème solaire haute protection (SPF50 minimum), des lunettes de soleil de qualité, un chapeau ou casquette, un imperméable léger ou un poncho (compact et léger), une bouteille d'eau réutilisable (économique et écologique), des médicaments courants (anti-diarrhéiques, analgésiques, antihistaminiques en cas d'allergie), une trousse de premiers secours légère et votre assurance voyage. Pour les supporters qui prévoient de se déplacer entre plusieurs villes, une valise cabine est préférable pour éviter les frais de bagages supplémentaires et gagner en flexibilité lors des vols internes.`,
    date: "2026-02-04",
    category: "billets",
    tags: ["météo", "climat", "valise", "préparation", "voyage", "chaleur", "conseils"],
    imageEmoji: "☀️",
  },
  {
    id: 32,
    slug: "securite-cdm-2026-conseils-supporters-francais",
    title: "Sécurité CDM 2026 - conseils pour les supporters français",
    excerpt: "Voyager aux États-Unis, au Canada et au Mexique pour la CDM 2026 en toute sécurité : conseils essentiels pour les supporters français sur les précautions à prendre.",
    content: `La Coupe du Monde 2026 se déroulant dans trois pays différents avec des cultures et des niveaux de sécurité variés, il est essentiel pour les supporters français de se préparer correctement avant de partir. Si les États-Unis et le Canada sont généralement considérés comme des destinations sûres pour les touristes, quelques précautions s'imposent. Quant au Mexique, la situation de sécurité varie considérablement selon les régions et les villes hôtes. Voici un guide pratique pour voyager en toute sécurité.

Concernant les formalités d'entrée, les ressortissants français n'ont pas besoin de visa pour entrer aux États-Unis pour un séjour touristique de moins de 90 jours, mais doivent obligatoirement obtenir une autorisation ESTA (Electronic System for Travel Authorization) au moins 72 heures avant le départ, sur le site officiel esta.cbp.dhs.gov (coût : 21 dollars). Pour le Canada, le formulaire d'Autorisation de Voyage Électronique (AVE) est requis (7 dollars canadiens). Pour le Mexique, les ressortissants français peuvent entrer sans visa ni AVE pour des séjours touristiques. Gardez une copie de tous vos documents (passeport, ESTA, assurance, billets) sur votre téléphone et dans un cloud.

Aux États-Unis, les précautions habituelles s'appliquent. La criminalité varie selon les quartiers dans les grandes villes : évitez de sortir seul la nuit dans des quartiers peu fréquentés, ne portez pas d'objets de valeur de manière ostensible, gardez vos effets personnels en sécurité dans les transports en commun et dans les zones touristiques bondées. Los Angeles et Miami ont des zones à éviter, mais les zones touristiques et les abords des stades sont généralement sécurisés et très surveillés pendant les événements. La police américaine sera fortement mobilisée autour des stades et dans les fan zones.

Pour le Mexique, la prudence est de mise, même si les trois villes hôtes (Mexico City, Guadalajara, Monterrey) bénéficient d'une sécurité renforcée pour l'événement. Le Ministère des Affaires Étrangères français recommande de consulter les avis aux voyageurs avant le départ sur diplomatie.gouv.fr. À Mexico, certains quartiers comme Tepito sont à éviter, mais les zones touristiques (Centro Histórico, Condesa, Roma, Polanco) sont généralement sûres. La principale précaution au Mexique : ne jamais héler un taxi dans la rue (utiliser uniquement des applications comme Uber, DiDi ou InDriver), éviter les distributeurs automatiques isolés la nuit, et être vigilant sur les transports en commun bondés.

L'assurance voyage est absolument indispensable pour ce voyage. Une assurance santé complète couvrant les frais médicaux aux États-Unis est cruciale — les soins médicaux américains sont parmi les plus chers du monde, et une simple hospitalisation peut coûter des dizaines de milliers de dollars. Vérifiez que votre assurance couvre : les frais médicaux illimités (ou au minimum 300 000 euros), le rapatriement sanitaire, l'annulation et l'interruption de voyage, la responsabilité civile. Les cartes bancaires haut de gamme (Visa Premier, Mastercard Gold, American Express) incluent souvent des assurances voyage intéressantes — vérifiez votre couverture auprès de votre banque.

Quelques conseils pratiques supplémentaires : inscrivez-vous sur le portail "Ariane" du Ministère des Affaires Étrangères français pour être alerté en cas d'incident et faciliter l'assistance consulaire. Notez le numéro de l'Ambassade de France ou du Consulat dans chaque pays que vous visitez (États-Unis : +1 202 944 6000 ; Canada : +1 613 789 1795 ; Mexique : +52 55 9171 9700). Lors des matchs, suivez les consignes de sécurité des organisateurs, évitez de provoquer les supporters des équipes adverses, et restez sobre pour garder votre jugement. La sécurité est l'affaire de tous, et en prenant ces précautions simples, vous maximiserez vos chances de vivre un voyage mémorable et sans incident à la Coupe du Monde 2026.`,
    date: "2026-02-03",
    category: "billets",
    tags: ["sécurité", "conseils", "voyageurs", "ESTA", "assurance", "Mexique", "USA"],
    imageEmoji: "🔒",
  },
  {
    id: 33,
    slug: "transport-cdm-2026-se-deplacer-villes",
    title: "Transport CDM 2026 - comment se déplacer entre les villes hôtes",
    excerpt: "Avion, train, voiture de location : comment se déplacer entre les 16 villes hôtes de la Coupe du Monde 2026 ? Guide complet des transports inter-villes en Amérique du Nord.",
    content: `La Coupe du Monde 2026 s'étend sur un territoire continental immense, avec 16 villes hôtes réparties sur plus de 5 000 kilomètres du nord au sud et d'est en ouest. Pour les supporters qui souhaitent assister à plusieurs matchs dans différentes villes, la question des transports est centrale dans l'organisation du voyage. Voici un guide complet des meilleures options pour se déplacer efficacement entre les villes hôtes.

L'avion est de loin la solution la plus pratique pour les longs trajets intercontinentaux aux États-Unis. American Airlines, United, Delta, Southwest, JetBlue et Alaska Airlines desservent toutes les villes hôtes avec des fréquences élevées. La réservation en avance (3 à 6 mois avant) est fortement recommandée car les prix pendant la Coupe du Monde seront élevés. Quelques exemples de trajets : New York → Los Angeles (6 heures, 150 à 400 dollars en économie), New York → Dallas (3h30, 100 à 300 dollars), Miami → Houston (3 heures, 80 à 250 dollars). Pour traverser la frontière vers le Mexique, des vols directs relient New York, Dallas et Los Angeles à Mexico City (2h30 à 4 heures selon la ville, 150 à 350 dollars).

Pour les trajets entre villes proches de la côte Est (New York, Philadelphia, Boston, Washington DC), Amtrak est une excellente alternative au vol. Le train Acela (train à grande vitesse américain) relie New York à Boston en 3h30 et à Philadelphia en 1h30 avec un confort agréable. Bien que plus lent que le TGV européen, Amtrak offre l'avantage de desservir les centres-villes (évitant les longs trajets vers les aéroports). Comptez 100 à 200 dollars pour ces trajets en grande vitesse.

La location de voiture est une option intéressante pour certains itinéraires, notamment en Californie (Los Angeles - San Francisco = 6 heures de route) ou au Texas (Dallas - Houston = 4 heures). Aux États-Unis, conduire est relativement simple : la signalisation est claire, les autoroutes sont larges et bien entretenues, et les règles de conduite sont proches des européennes (conduite à droite, permis français reconnu). Comptez 50 à 100 dollars par jour pour une voiture de location catégorie standard, plus l'assurance et l'essence. Les péages peuvent s'additionner sur certaines autoroutes de la côte Est — prévoyez un budget de 20 à 50 dollars par jour si vous conduisez beaucoup.

Pour se déplacer au sein des villes, chaque métropole dispose de ses propres transports en commun. New York a son célèbre métro (2,90 dollars le ticket), Los Angeles dispose du métro et des bus de la LACMTA (mais beaucoup de distances se font en voiture ou Uber), Chicago a son "L-Train" historique, Toronto et Vancouver ont d'excellents réseaux de métro et bus. Pour les courtes distances dans les villes, Uber et Lyft sont omniprésents et souvent moins chers que les taxis traditionnels. Au Mexique, Uber fonctionne bien dans les trois villes hôtes et est recommandé pour sa sécurité par rapport aux taxis de rue. DiDi (l'Uber chinois, très populaire au Mexique) est également disponible avec des tarifs compétitifs.

Pour optimiser vos déplacements : achetez vos billets d'avion inter-villes dès maintenant (les prix augmenteront significativement à l'approche de l'événement), téléchargez les applications de transport local de chaque ville avant d'arriver, prévoyez une carte bancaire internationale sans frais de conversion (Revolut, Wise ou N26 sont recommandées pour éviter les frais de change), et si vous avez prévu des matchs dans des villes différentes, vérifiez bien les horaires pour avoir suffisamment de temps pour rejoindre le prochain stade. Un conseil pratique : les aéroports seront très chargés pendant la Coupe du Monde — prévoyez d'arriver 3 heures avant le vol pour les vols internes et 4 heures pour les vols intercontinentaux.`,
    date: "2026-02-02",
    category: "billets",
    tags: ["transport", "déplacement", "avion", "train", "voiture", "inter-villes", "logistique"],
    imageEmoji: "✈️",
  },
];

export const newsCategories: Record<NewsCategory, string> = {
  transferts: "Transferts",
  stades: "Stades",
  billets: "Billets",
  equipes: "Équipes",
  paris: "Paris sportifs",
};

export const newsBySlug = Object.fromEntries(
  newsArticles.map((a) => [a.slug, a])
);

export const newsByCategory = (category: NewsCategory) =>
  newsArticles.filter((a) => a.category === category);
