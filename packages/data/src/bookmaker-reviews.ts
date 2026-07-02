// ============================================================================
// Bookmaker Reviews — Rich structured content for review pages
// ============================================================================

import { affiliateTrackingUrl } from "./affiliates";

export interface BookmakerReview {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  bonus: string;
  bonusDetail: string;
  url: string;
  logo?: string;
  foundedYear: number;
  license: string;
  description: string;
  prosConsIntro: string;
  pros: string[];
  cons: string[];
  ratings: {
    bonus: number;      // 1-5
    odds: number;       // 1-5
    app: number;        // 1-5
    live: number;       // 1-5
    support: number;    // 1-5
    withdrawal: number; // 1-5
  };
  paymentMethods: string[];
  minDeposit: string;
  withdrawalTime: string;
  customerSupport: string[];
  appAvailable: boolean;
  liveStreaming: boolean;
  cashOut: boolean;
  sections: {
    title: string;
    content: string;
  }[];
}

export const bookmakerReviews: BookmakerReview[] = [
  // ── Partenaires (liens affiliés actifs) — toujours avant les non-partenaires ──
  {
    id: "pokerstars-sports",
    name: "PokerStars Sports",
    slug: "pokerstars-sports",
    tagline: "Le géant mondial du jeu en ligne, côté paris sportifs",
    bonus: "Jusqu'à 100€ remboursés",
    bonusDetail: "en freebets si votre 1er pari est perdant",
    url: affiliateTrackingUrl("pokerstars-sports", { pageType: "bookmaker", slug: "pokerstars-sports", placement: "review" })!,
    logo: "/images/logos/pokerstars-sports.png",
    foundedYear: 2001,
    license: "ANJ (France)",
    description: "PokerStars Sports est la branche paris sportifs de PokerStars, référence mondiale du jeu en ligne. La plateforme couvre le football, le tennis et le basketball avec des cotes compétitives, et propose l'ensemble des marchés majeurs sur la Coupe du Monde 2026. L'offre de bienvenue est l'une des plus simples du marché : si votre premier pari sportif est perdant, votre mise est remboursée jusqu'à 100€ en freebets.",
    prosConsIntro: "PokerStars Sports combine la solidité d'une marque mondiale et une offre de bienvenue sans piège. Notre analyse détaillée.",
    pros: [
      "Offre de bienvenue simple : 1er pari remboursé jusqu'à 100€ en freebets",
      "Cotes compétitives sur football, tennis et basketball",
      "Application mobile stable et reconnue",
      "Large choix de marchés sur la CDM 2026",
      "Paris en direct réactifs",
      "Marque internationale solide, agréée ANJ"
    ],
    cons: [
      "Pas d'offre hippique",
      "Moins de promotions récurrentes que certains concurrents français",
      "Le remboursement est en freebets, pas en cash"
    ],
    ratings: { bonus: 5, odds: 5, app: 5, live: 5, support: 4, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire", "Apple Pay"],
    minDeposit: "10€",
    withdrawalTime: "24-72h selon le moyen de paiement",
    customerSupport: ["Chat en direct", "Email", "Centre d'aide"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
    sections: [
      {
        title: "PokerStars Sports pour la Coupe du Monde 2026",
        content: "PokerStars Sports couvre l'intégralité de la CDM 2026 : vainqueur du tournoi, résultat de match (1N2), score exact, buteurs, handicaps et paris en direct pendant les rencontres. Les cotes sont alignées sur les meilleurs standards du marché, en particulier sur les grosses affiches de la phase à élimination directe."
      },
      {
        title: "Comment fonctionne l'offre de bienvenue",
        content: "Inscrivez-vous, effectuez un premier dépôt puis placez votre premier pari sportif. S'il est perdant, PokerStars Sports rembourse votre mise jusqu'à 100€ sous forme de freebets, utilisables sur tous les marchés du site. Pas de condition de cote minimale complexe : c'est l'une des offres les plus lisibles du marché français."
      },
      {
        title: "Inscription et vérification",
        content: "La création de compte prend quelques minutes. Comme sur tous les sites agréés ANJ, une pièce d'identité est requise pour valider définitivement le compte et retirer vos gains. Le dépôt minimum est de 10€."
      }
    ]
  },
  {
    id: "pmu-play",
    name: "PMU Play",
    slug: "pmu-sport",
    tagline: "L'opérateur historique 100% français : sport, hippique et poker",
    bonus: "100€ offerts",
    bonusDetail: "1er pari remboursé en cash, sans condition de remise en jeu",
    url: affiliateTrackingUrl("pmu-play", { pageType: "bookmaker", slug: "pmu-sport", placement: "review" })!,
    logo: "/images/logos/pmu-sport.png",
    foundedYear: 1930,
    license: "ANJ (France)",
    description: "PMU Play réunit désormais le sport, l'hippique et le poker du PMU sur une seule plateforme, avec une navigation repensée et un nouveau partenaire leader sur les cotes. C'est l'opérateur de référence du pari en ligne en France, et son offre de bienvenue sport est unique sur le marché : le premier pari est remboursé en cash jusqu'à 100€ s'il est perdant, sans condition de remise en jeu.",
    prosConsIntro: "PMU Play est le choix de la simplicité et de la confiance pour les parieurs français. Voici notre analyse.",
    pros: [
      "1er pari remboursé en CASH jusqu'à 100€, sans condition — rare sur le marché",
      "Marque française de confiance, agréée ANJ",
      "Sport, hippique et poker sur une seule app",
      "Navigation repensée, parcours de pari simples",
      "Dépôt minimum accessible (10€)",
      "Réseau physique et service client français"
    ],
    cons: [
      "Cotes parfois légèrement en retrait sur certains marchés secondaires",
      "Moins de paris spéciaux que certains concurrents",
      "Interface encore en évolution après la refonte PMU Play"
    ],
    ratings: { bonus: 5, odds: 4, app: 4, live: 4, support: 5, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire"],
    minDeposit: "10€",
    withdrawalTime: "24-72h selon le moyen de paiement",
    customerSupport: ["Téléphone", "Email", "FAQ détaillée"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
    sections: [
      {
        title: "PMU Play pour la Coupe du Monde 2026",
        content: "PMU Play propose tous les marchés majeurs de la CDM 2026 : vainqueur final, résultats de matchs, scores exacts, buteurs et paris en direct. Le bonus de bienvenue remboursé en cash — et non en freebets — en fait la porte d'entrée la plus rassurante pour un premier pari sur le Mondial."
      },
      {
        title: "Pourquoi le remboursement en cash change tout",
        content: "Chez la plupart des bookmakers, le premier pari perdant est remboursé en freebets soumis à conditions. Chez PMU Play, il est remboursé en argent réel jusqu'à 100€, que vous pouvez retirer ou rejouer librement. C'est l'offre la plus simple à comprendre du marché français."
      },
      {
        title: "Inscription et dépôt",
        content: "Créez votre compte en quelques minutes, validez votre identité (obligation ANJ), déposez au minimum 10€ et placez votre premier pari sur la CDM 2026. L'offre de bienvenue s'active selon l'univers choisi à l'inscription : sport, hippique ou poker."
      }
    ]
  },
  {
    id: "betsson",
    name: "Betsson",
    slug: "betsson",
    tagline: "Le nouveau bookmaker suédois agréé en France",
    bonus: "Jusqu'à 100€ + 10€",
    bonusDetail: "sur le 1er dépôt + freebet à la validation du compte",
    url: affiliateTrackingUrl("betsson", { pageType: "bookmaker", slug: "betsson", placement: "review" })!,
    logo: "/images/logos/betsson.png",
    foundedYear: 1963,
    license: "ANJ (France)",
    description: "Betsson.fr est le petit nouveau du marché français, porté par le groupe suédois Betsson AB, acteur historique du pari en ligne en Europe depuis 1963. La plateforme mise sur une expérience utilisateur soignée, des paiements rapides et sécurisés et une application riche en fonctionnalités, disponible sur iOS et Android. Son offre de bienvenue cumule un bonus sur le premier dépôt jusqu'à 100€ et 10€ de freebet à la validation du compte.",
    prosConsIntro: "Betsson arrive en France avec l'expérience d'un groupe européen majeur. Notre analyse détaillée.",
    pros: [
      "Bonus de bienvenue généreux : jusqu'à 100€ + 10€ de freebet offerts",
      "Application mobile moderne avec fonctionnalités exclusives",
      "Paiements rapides et sécurisés",
      "Expérience du groupe Betsson AB (60 ans de paris en Europe)",
      "Paris en direct riches sur la CDM 2026",
      "Approche jeu responsable mise en avant"
    ],
    cons: [
      "Marque encore récente sur le marché français",
      "Premier dépôt minimum de 20€ pour l'offre de bienvenue",
      "Pas d'offre hippique"
    ],
    ratings: { bonus: 5, odds: 4, app: 5, live: 4, support: 4, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire", "Apple Pay"],
    minDeposit: "20€ (pour activer l'offre de bienvenue)",
    withdrawalTime: "24-72h selon le moyen de paiement",
    customerSupport: ["Chat en direct", "Email", "FAQ"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
    sections: [
      {
        title: "Betsson pour la Coupe du Monde 2026",
        content: "Pour son premier Mondial sur le marché français, Betsson propose l'ensemble des marchés attendus : vainqueur, 1N2, scores exacts, buteurs, handicaps et un live betting complet. Les cotes sont compétitives sur les grandes affiches de la phase finale."
      },
      {
        title: "Comment activer l'offre de bienvenue",
        content: "Inscrivez-vous sur Betsson.fr, effectuez un premier dépôt d'au moins 20€ et validez votre compte (pièce d'identité requise par l'ANJ). Le bonus sur premier dépôt monte jusqu'à 100€, et 10€ de freebet supplémentaires sont crédités à la validation définitive du compte."
      },
      {
        title: "Une app pensée mobile d'abord",
        content: "L'application Betsson, disponible sur iOS et Android, est l'une des plus abouties du marché : navigation fluide, cash out, paris en direct et notifications personnalisées pour suivre vos équipes pendant toute la CDM 2026."
      }
    ]
  },
  {
    id: "genybet",
    name: "Genybet",
    slug: "genybet",
    tagline: "Le bookmaker des connaisseurs, par Geny Courses",
    bonus: "Freebets offerts",
    bonusDetail: "paris gratuits pour les nouveaux joueurs",
    url: affiliateTrackingUrl("genybet", { pageType: "bookmaker", slug: "genybet", placement: "review" })!,
    logo: "/images/logos/genybet.png",
    foundedYear: 2010,
    license: "ANJ (France)",
    description: "Genybet est le site de paris de Geny Courses, leader de l'information hippique en ligne en France. Côté sport, la plateforme se distingue par ses multigrilles (5 à 7 matchs) et une offre de paris en direct riche. Les nouveaux joueurs sont accueillis avec des freebets, et le dépôt minimum de 10€ en fait l'un des bookmakers les plus accessibles pour débuter sur la CDM 2026.",
    prosConsIntro: "Genybet joue la carte de l'accessibilité et de l'expertise à la française. Notre analyse.",
    pros: [
      "Freebets offerts aux nouveaux joueurs",
      "Multigrilles exclusives (5 à 7 matchs) pour la CDM 2026",
      "Dépôt minimum bas : 10€",
      "Expertise reconnue du groupe Geny (hippique et sport)",
      "Offre de paris en direct riche",
      "Site français agréé ANJ"
    ],
    cons: [
      "Pas de bonus de bienvenue classique en pourcentage du dépôt",
      "Notoriété moindre que les grands bookmakers nationaux",
      "Application moins riche que les leaders du marché"
    ],
    ratings: { bonus: 3, odds: 4, app: 3, live: 4, support: 4, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire"],
    minDeposit: "10€",
    withdrawalTime: "24-72h selon le moyen de paiement",
    customerSupport: ["Email", "Téléphone", "FAQ"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: false,
    sections: [
      {
        title: "Genybet pour la Coupe du Monde 2026",
        content: "Genybet couvre tous les matchs de la CDM 2026 avec les marchés classiques (1N2, scores, buteurs) et ses multigrilles maison qui permettent de combiner 5 à 7 matchs sur une seule grille — un format original pour les journées à plusieurs affiches de la phase finale."
      },
      {
        title: "Freebets de bienvenue : comment ça marche",
        content: "Après inscription et un premier dépôt de 10€ minimum, Genybet crédite des paris gratuits utilisables sur le sport. La validation définitive du compte (pièce d'identité, obligation ANJ) doit être effectuée dans les 30 jours."
      },
      {
        title: "L'ADN Geny Courses",
        content: "Adossé à Geny Courses, référence de l'information hippique française, Genybet cultive une approche d'expert : statistiques, pronostics maison et une communauté de parieurs réguliers. Un profil qui séduira les parieurs qui aiment analyser avant de miser."
      }
    ]
  },
  {
    id: "betclic",
    name: "Betclic",
    slug: "betclic",
    tagline: "Le leader des paris sportifs en France",
    bonus: "100€ offerts",
    bonusDetail: "en freebets sur votre 1er pari",
    url: "#betclic",
    foundedYear: 2005,
    license: "ANJ (France)",
    description: "Betclic est le leader des paris sportifs en France avec plus de 10 millions de clients europeens. La plateforme se distingue par son interface intuitive, ses cotes compétitives et son application mobile reconnue comme l'une des meilleures du marché. Pour la Coupe du Monde 2026, Betclic proposera une couverture complète avec des marchés spécifiques sur chaque match.",
    prosConsIntro: "Betclic est un choix solide pour les parieurs, que vous soyez débutant ou expert. Voici notre analyse detaillee.",
    pros: [
      "Cotes parmi les plus compétitives du marché francais",
      "Application mobile excellente (iOS et Android)",
      "Interface fluide et navigation intuitive",
      "Large choix de paris : 1N2, buts, buteurs, mi-temps, corners",
      "Bonus de bienvenue généreux avec conditions claires",
      "Cash out disponible sur la plupart des paris",
      "Paris en direct avec streaming sur certains événements",
      "Service client réactif par chat en direct"
    ],
    cons: [
      "Pas de streaming video sur tous les matchs",
      "Promotions regulieres parfois moins fréquentes que la concurrence",
      "Delais de retrait de 24-48h sur certains moyens de paiement"
    ],
    ratings: { bonus: 5, odds: 5, app: 5, live: 4, support: 4, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Skrill", "Neteller", "Virement bancaire", "Apple Pay"],
    minDeposit: "10€",
    withdrawalTime: "24-48h (e-wallets), 2-5 jours (carte/virement)",
    customerSupport: ["Chat en direct", "Email", "FAQ detaillee"],
    appAvailable: true,
    liveStreaming: true,
    cashOut: true,
    sections: [
      {
        title: "Betclic pour la Coupe du Monde 2026",
        content: "Betclic sera l'un des bookmakers les plus actifs pour la CDM 2026. Attendez-vous a des cotes boostees sur les matchs des équipes favorites, des paris speciaux (meilleur buteur, nombre de buts, première équipe a marquer) et des promotions quotidiennes pendant toute la durée du tournoi. L'interface permettra de suivre tous les matchs en temps réel avec des statistiques en direct."
      },
      {
        title: "Comment s'inscrire sur Betclic",
        content: "L'inscription sur Betclic est simple et rapide. Creez votre compte en 2 minutes, verifiez votre identité (piece d'identité requise par la réglementation ANJ), effectuez votre premier dépôt (minimum 10€) et profitez immediatement du bonus de bienvenue. Le bonus est credite sous forme de freebets des que votre premier pari est traite."
      },
      {
        title: "Types de paris disponibles",
        content: "Betclic propose une gamme complète de marchés pour chaque match de la CDM 2026 : résultat final (1N2), double chance, nombre de buts (plus/moins), les deux équipes marquent, score exact, buteur (premier, dernier, a tout moment), mi-temps/fin de match, handicap asiatique, nombre de corners, cartons, et bien plus. Les cotes sont mises a jour en temps réel pendant les matchs."
      },
      {
        title: "Retrait des gains",
        content: "Les retraits sur Betclic sont traites sous 24 a 48 heures pour les e-wallets (PayPal, Skrill) et 2 a 5 jours ouvrables pour les cartes bancaires et virements. Aucun frais n'est applique sur les retraits. Le montant minimum de retrait est de 10€."
      }
    ]
  },
  {
    id: "winamax",
    name: "Winamax",
    slug: "winamax",
    tagline: "Le bookmaker préféré des Francais",
    bonus: "100€ offerts",
    bonusDetail: "sur votre 1er pari",
    url: "#winamax",
    foundedYear: 2010,
    license: "ANJ (France)",
    description: "Winamax est le bookmaker le plus populaire en France, connu pour sa communauté active, ses cotes élevées et sa plateforme de poker intégrée. Winamax se distingue par ses campagnes marketing decalees et son engagement aupres de la communauté sportive francaise. Pour la CDM 2026, Winamax promet des offres exceptionnelles et une couverture en profondeur.",
    prosConsIntro: "Winamax est incontournable sur le marché francais. Voici pourquoi il mérite votre attention pour la CDM 2026.",
    pros: [
      "Cotes tres élevées, souvent les meilleures du marché",
      "Communaute active et fonctionnalites sociales",
      "Application mobile tres bien notée",
      "Poker et paris sportifs sur la meme plateforme",
      "Promotions regulieres et paris boostes quotidiens",
      "Cash out partiel et total disponible",
      "Interface moderne et agréable"
    ],
    cons: [
      "Service client parfois lent aux heures de pointe",
      "Pas de live streaming",
      "Bonus de bienvenue soumis a conditions de mise"
    ],
    ratings: { bonus: 4, odds: 5, app: 5, live: 3, support: 3, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire", "Apple Pay", "Google Pay"],
    minDeposit: "10€",
    withdrawalTime: "24h (PayPal), 2-5 jours (carte/virement)",
    customerSupport: ["Chat en direct", "Email", "Reseaux sociaux"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
    sections: [
      {
        title: "Winamax pour la Coupe du Monde 2026",
        content: "Winamax mise tout sur la CDM 2026 avec des cotes boostees, des paris gratuits et des defis communautaires. La plateforme proposera des MyMatch (paris personnalises combinant plusieurs sélections sur un meme match) et des super cotes quotidiennes. Les parieurs réguliers beneficieront du programme de fidélité avec des freebets supplémentaires."
      },
      {
        title: "Comment s'inscrire sur Winamax",
        content: "Creez votre compte Winamax en quelques minutes. L'inscription necessite une piece d'identité pour la vérification (obligatoire par la loi). Deposez au minimum 10€ et placez votre premier pari pour debloquer le bonus de bienvenue de 100€."
      },
      {
        title: "Les MyMatch Winamax",
        content: "La fonctionnalite phare de Winamax pour la CDM sera les MyMatch : combinez plusieurs sélections sur un meme match (par exemple : victoire France + Mbappe buteur + plus de 2.5 buts) pour obtenir une cote combinee attractive. Ideal pour les parieurs qui aiment construire leurs propres paris."
      },
      {
        title: "Retrait des gains",
        content: "Winamax traite les retraits en 24h pour PayPal et 2-5 jours pour les cartes bancaires. Aucun frais de retrait. Minimum 10€."
      }
    ]
  },
  {
    id: "parionssport",
    name: "Parions Sport",
    slug: "parions-sport",
    tagline: "Le site de paris de la FDJ",
    bonus: "90€ offerts",
    bonusDetail: "en freebets sans condition",
    url: "#parionssport",
    foundedYear: 1985,
    license: "ANJ (France) - Groupe FDJ",
    description: "Parions Sport en Ligne est l'offre de paris sportifs de la Française des Jeux (FDJ), l'opérateur historique des jeux en France. La marque beneficie d'une confiance institutionnelle forte et d'un réseau de points de vente physiques. Pour la CDM 2026, Parions Sport proposera des offres accessibles et adaptees a tous les niveaux de parieurs.",
    prosConsIntro: "Parions Sport est le choix de confiance par excellence. Voici notre avis détaillé.",
    pros: [
      "Marque de confiance (groupe FDJ)",
      "Bonus sans conditions de mise strictes",
      "Points de vente physiques (buralistes)",
      "Offres Point de vente + En ligne combinees",
      "Interface simple et accessible aux débutants",
      "Cotes stables et fiables"
    ],
    cons: [
      "Cotes légèrement inferieures a Betclic/Winamax",
      "Application moins moderne que la concurrence",
      "Moins de marchés de paris disponibles",
      "Pas de cash out sur tous les paris"
    ],
    ratings: { bonus: 4, odds: 3, app: 3, live: 3, support: 4, withdrawal: 5 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire"],
    minDeposit: "5€",
    withdrawalTime: "24-48h",
    customerSupport: ["Telephone", "Email", "Chat en direct", "Points de vente"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
    sections: [
      {
        title: "Parions Sport pour la Coupe du Monde 2026",
        content: "La FDJ mettra le paquet pour la CDM 2026 avec des offres speciales en points de vente et en ligne. Les grilles multi-matchs seront disponibles pour combiner plusieurs pronostics, et des cotes boostees seront proposees sur les matchs de l'équipe de France. L'avantage de Parions Sport est la possibilité de parier en bureau de tabac."
      },
      {
        title: "Comment s'inscrire sur Parions Sport",
        content: "L'inscription en ligne prend quelques minutes. Vous pouvez aussi parier directement dans un bureau de tabac participant. Pour l'offre en ligne, creez votre compte, verifiez votre identité et deposez au minimum 5€ (le dépôt minimum le plus bas du marché)."
      },
      {
        title: "Les grilles multi-matchs",
        content: "Parions Sport est connu pour ses grilles multi-matchs ou vous combinez les pronostics de plusieurs rencontres. Pendant la CDM 2026, des grilles speciales seront proposees chaque journee de match avec des gains potentiels importants."
      },
      {
        title: "Retrait des gains",
        content: "Les retraits sont traites en 24 a 48h. Parions Sport est réputé pour ses délais de traitement rapides, beneficiant de l'infrastructure du groupe FDJ."
      }
    ]
  },
  {
    id: "unibet",
    name: "Unibet",
    slug: "unibet",
    tagline: "L'expertise internationale au service des parieurs",
    bonus: "100€ offerts",
    bonusDetail: "en paris gratuits",
    url: "#unibet",
    foundedYear: 1997,
    license: "ANJ (France) - Groupe Kindred",
    description: "Unibet est un opérateur international present dans plus de 100 pays. En France, il est agréé par l'ANJ et propose une offre de paris sportifs complète avec une expertise reconnue dans le football. Unibet se distingue par la profondeur de ses marchés de paris et ses outils statistiques intégrés.",
    prosConsIntro: "Unibet combine expertise internationale et presence locale. Un excellent choix pour les parieurs avises.",
    pros: [
      "Tres grande profondeur de marchés de paris",
      "Statistiques et analyses intégrées a la plateforme",
      "Live streaming sur de nombreux événements",
      "Experience internationale de plus de 25 ans",
      "Cash out flexible (partiel et total)",
      "Section actualites et pronostics d'experts"
    ],
    cons: [
      "Interface parfois complexe pour les débutants",
      "Cotes légèrement en dessous des leaders",
      "Application mobile a ameliorer",
      "Bonus de bienvenue avec conditions de mise"
    ],
    ratings: { bonus: 4, odds: 4, app: 3, live: 5, support: 4, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Skrill", "Neteller", "Virement bancaire", "Paysafecard"],
    minDeposit: "10€",
    withdrawalTime: "24-72h",
    customerSupport: ["Chat en direct", "Email", "Telephone"],
    appAvailable: true,
    liveStreaming: true,
    cashOut: true,
    sections: [
      {
        title: "Unibet pour la Coupe du Monde 2026",
        content: "Unibet proposera une couverture premium de la CDM 2026 avec live streaming de certains matchs, des marchés de paris parmi les plus profonds du marché (plus de 200 marchés par match) et des statistiques en temps réel. Les parieurs experts apprecieront la granularite des options : handicaps asiatiques, paris joueurs, statistiques détaillées."
      },
      {
        title: "Comment s'inscrire sur Unibet",
        content: "Creez votre compte en ligne en 3 minutes, verifiez votre identité et effectuez un premier dépôt de 10€ minimum. Le bonus de bienvenue de 100€ est credite sous forme de paris gratuits apres la validation de votre premier pari."
      },
      {
        title: "Les statistiques Unibet",
        content: "Le point fort d'Unibet est son outil statistique intégré. Pour chaque match, vous aurez accès aux statistiques détaillées des équipes et des joueurs : possession, tirs, passes, xG, confrontations directes. Un avantage decisif pour faire des paris eclaires pendant la CDM."
      },
      {
        title: "Retrait des gains",
        content: "Retraits traites en 24 a 72h selon le moyen de paiement. E-wallets (PayPal, Skrill) en 24h, carte bancaire en 3-5 jours. Pas de frais de retrait."
      }
    ]
  },
  {
    id: "zebet",
    name: "ZEbet",
    slug: "zebet",
    tagline: "Le challenger généreux",
    bonus: "150€ offerts",
    bonusDetail: "sur votre 1er pari",
    url: "#zebet",
    foundedYear: 2014,
    license: "ANJ (France) - Groupe ZEturf",
    description: "ZEbet est un bookmaker francais du groupe ZEturf qui se démarque par son bonus de bienvenue parmi les plus généreux du marché (150€). La plateforme cible les parieurs a la recherche de valeur avec des cotes compétitives et des promotions regulieres. ZEbet est particulierement actif sur les grands événements sportifs.",
    prosConsIntro: "ZEbet mise sur la generosite pour attirer les parieurs. Un outsider a ne pas negliger.",
    pros: [
      "Bonus de bienvenue le plus élevé du marché (150€)",
      "Cotes compétitives sur les grands événements",
      "Promotions regulieres et challenges",
      "Interface simple et efficace",
      "Bon service client par chat",
      "Pari sans risque pour les nouveaux inscrits"
    ],
    cons: [
      "Moins connu que Betclic/Winamax",
      "Application mobile basique",
      "Moins de marchés de paris que les leaders",
      "Pas de live streaming"
    ],
    ratings: { bonus: 5, odds: 4, app: 3, live: 2, support: 4, withdrawal: 4 },
    paymentMethods: ["Carte bancaire", "PayPal", "Virement bancaire"],
    minDeposit: "10€",
    withdrawalTime: "24-72h",
    customerSupport: ["Chat en direct", "Email"],
    appAvailable: true,
    liveStreaming: false,
    cashOut: true,
    sections: [
      {
        title: "ZEbet pour la Coupe du Monde 2026",
        content: "ZEbet promet des offres agressives pour la CDM 2026 avec le bonus le plus élevé du marché francais. Attendez-vous a des cotes boostees sur les matchs les plus populaires et des challenges communautaires avec des lots supplémentaires. ZEbet est un excellent second bookmaker pour profiter d'un bonus supplémentaire."
      },
      {
        title: "Comment s'inscrire sur ZEbet",
        content: "Inscription rapide en quelques minutes. Deposez au minimum 10€ et placez votre premier pari pour bénéficier du bonus de 150€ en freebets. La vérification d'identité est requise dans les 30 jours suivant l'inscription."
      },
      {
        title: "Challenges et promotions",
        content: "ZEbet organisé régulièrement des challenges ou les parieurs accumulent des points en placant des paris, echangeables contre des freebets. Pendant la CDM 2026, des challenges speciaux seront organises chaque semaine."
      },
      {
        title: "Retrait des gains",
        content: "Retraits traites en 24 a 72h. PayPal en 24h, carte bancaire en 3-5 jours ouvrables. Minimum de retrait : 10€. Pas de frais."
      }
    ]
  },
];

export const bookmakerReviewsById: Record<string, BookmakerReview> = {};
export const bookmakerReviewsBySlug: Record<string, BookmakerReview> = {};
for (const review of bookmakerReviews) {
  bookmakerReviewsById[review.id] = review;
  bookmakerReviewsBySlug[review.slug] = review;
}
