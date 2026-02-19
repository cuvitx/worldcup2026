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
