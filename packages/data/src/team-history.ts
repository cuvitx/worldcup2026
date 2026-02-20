// ============================================================================
// FIFA World Cup Team History Data
// Historical statistics, strengths/weaknesses, playing style & anecdotes
// ============================================================================

export interface TeamHistoryEntry {
  teamId: string;
  participations: number;
  bestResult: string;
  yearsParticipated: number[];
  notableResults: { year: number; stage: string; detail?: string }[];
  strengths: string[];
  weaknesses: string[];
  playingStyle: string;
  anecdotes: string[];
}

export const teamWorldCupHistory: Record<string, TeamHistoryEntry> = {
  // ============================================================
  //  FRANCE
  // ============================================================
  france: {
    teamId: "france",
    participations: 16,
    bestResult: "Champion (1998, 2018)",
    yearsParticipated: [1930, 1934, 1938, 1954, 1958, 1966, 1978, 1982, 1986, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1930, stage: "Phase de groupes", detail: "Première participation" },
      { year: 1958, stage: "3e place", detail: "Just Fontaine inscrit 13 buts, record absolu" },
      { year: 1982, stage: "4e place", detail: "Demi-finale épique contre l'Allemagne (3-3 ap)" },
      { year: 1986, stage: "3e place", detail: "Platini & Zidane-génération semi-finale" },
      { year: 1998, stage: "Champion", detail: "Zidane x2, victoire 3-0 face au Brésil en finale" },
      { year: 2006, stage: "Finaliste", detail: "Zidane expulsé en finale, défaite aux tirs au but" },
      { year: 2018, stage: "Champion", detail: "Victoire 4-2 en finale contre la Croatie en Russie" },
      { year: 2022, stage: "Finaliste", detail: "Défaite aux TAB contre l'Argentine, Mbappé hat-trick" },
    ],
    strengths: [
      "Profondeur exceptionnelle de l'effectif",
      "Rapidité et puissance en contre-attaque",
      "Solidité défensive (meilleure défense 2018)",
      "Présence de stars mondiales (Mbappé, Griezmann)",
      "Expérience des grandes finales",
    ],
    weaknesses: [
      "Irrégularité selon les compétitions",
      "Tensions internes possibles dans le vestiaire",
      "Dépendance excessive à Mbappé",
      "Gestion des phases de groupes parfois fébrile",
    ],
    playingStyle:
      "La France alterne entre un bloc médian solide et des transitions ultra-rapides exploitant la vitesse de Mbappé. Didier Deschamps privilégie la solidité défensive et l'efficacité plutôt que le jeu spectaculaire, avec un 4-3-3 ou 4-2-3-1 selon les adversaires. Les Bleus savent souffrir avant de punir sur la moindre erreur adverse.",
    anecdotes: [
      "Just Fontaine inscrit 13 buts lors du Mondial 1958 en seulement 6 matchs — un record qui tient depuis 68 ans et qui ne sera probablement jamais battu.",
      "La nuit de Séville (1982) : la France mène 3-1 contre l'Allemagne en prolongation avant de voir les Allemands revenir pour l'égaliser et gagner aux tirs au but. Considéré comme l'un des plus grands matchs de l'histoire.",
      "Zinédine Zidane est expulsé lors de la finale 2006 contre l'Italie après un coup de tête sur Marco Materazzi, devenant l'image la plus mémorable et controversée de l'histoire des Coupes du Monde.",
    ],
  },

  // ============================================================
  //  BRÉSIL
  // ============================================================
  bresil: {
    teamId: "bresil",
    participations: 22,
    bestResult: "Champion (1958, 1962, 1970, 1994, 2002)",
    yearsParticipated: [1930, 1934, 1938, 1950, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1950, stage: "Finaliste", detail: "Le Maracanazo : défaite 2-1 face à l'Uruguay en finale" },
      { year: 1958, stage: "Champion", detail: "Pelé à 17 ans, premier titre mondial" },
      { year: 1962, stage: "Champion", detail: "Deuxième titre consécutif" },
      { year: 1970, stage: "Champion", detail: "Equipe considérée la meilleure de l'histoire" },
      { year: 1982, stage: "Phase de groupes (2e)", detail: "Brésil magique de Zico éliminé par l'Italie" },
      { year: 1994, stage: "Champion", detail: "Romário & Bebeto, titre aux penalties contre l'Italie" },
      { year: 2002, stage: "Champion", detail: "Ronaldo & Rivaldo, 5e titre, finale 2-0 face à l'Allemagne" },
      { year: 2014, stage: "4e place", detail: "7-1 contre l'Allemagne en demi-finale, trauma national" },
    ],
    strengths: [
      "Vivier de talents parmi les plus riches du monde",
      "Jeu technique et créatif (ginga)",
      "Puissance physique et technique combinées",
      "Expérience des compétitions mondiales",
      "Soutien populaire incomparable",
    ],
    weaknesses: [
      "Pression psychologique immense à domicile ou en favori",
      "Fragilité défensive parfois surprenante",
      "Manque de cohérence tactique récente",
      "Gestion des penalties (élimination 2006, 2010, 2022)",
    ],
    playingStyle:
      "La Seleção joue traditionnellement un football offensif basé sur la créativité individuelle et les combinaisons courtes. Le 4-2-3-1 ou 4-3-3 laisse libre cours aux dribbles et aux accélérations. La ginga brésilienne — ce style fluide et enjoué — est inscrit dans l'ADN de chaque joueur formé au pays.",
    anecdotes: [
      "Le Maracanazo (1950) : le Brésil perd la finale face à l'Uruguay devant 200 000 spectateurs au Maracanã. Ce traumatisme national a marqué des générations entières de Brésiliens et hanté le football brésilien pendant des décennies.",
      "En 1970, le Brésil réussit une passe de 25 touches consécutives avant le but de Carlos Alberto en finale — considéré comme le plus beau but collectif de l'histoire de la compétition.",
      "Le 7-1 contre l'Allemagne en demi-finale du Mondial 2014 chez eux. Le stade de Belo Horizonte a pleuré en direct devant le monde entier. Les Brésiliens ont rebaptisé ce soir 'Le Mineirazo'.",
    ],
  },

  // ============================================================
  //  ARGENTINE
  // ============================================================
  argentine: {
    teamId: "argentine",
    participations: 18,
    bestResult: "Champion (1978, 1986, 2022)",
    yearsParticipated: [1930, 1934, 1958, 1962, 1966, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1930, stage: "Finaliste", detail: "Première finale mondiale perdue face à l'Uruguay" },
      { year: 1978, stage: "Champion", detail: "Premier titre, Mario Kempes héros" },
      { year: 1986, stage: "Champion", detail: "Maradona divin, 5-3 face à l'Allemagne en finale" },
      { year: 1990, stage: "Finaliste", detail: "Défaite 1-0 face à l'Allemagne" },
      { year: 2014, stage: "Finaliste", detail: "Défaite 1-0 en finale face à l'Allemagne (Götze)" },
      { year: 2022, stage: "Champion", detail: "Messi sacré après une finale dantesque contre la France" },
    ],
    strengths: [
      "Lionel Messi, meilleur joueur de l'histoire, champion en titre",
      "Cohésion d'équipe exceptionnelle depuis 2021",
      "Solidité défensive et organisation tactique",
      "Expérience des grands moments de pression",
      "Caractère et mentalité de champions",
    ],
    weaknesses: [
      "Transition post-Messi à anticiper",
      "Dépendance historique aux stars individuelles",
      "Vulnérabilité aux équipes très athlétiques",
      "Gestion des contre-performances médiatiques",
    ],
    playingStyle:
      "L'Albiceleste de Scaloni joue un 4-4-2 / 4-3-3 compact et organisé, bâti autour de la créativité de Messi. Le bloc est défensivement solide et les transitions sont rapides. L'Argentine moderne ne dépend plus d'un seul homme mais d'un collectif uni où chaque joueur sait exactement son rôle.",
    anecdotes: [
      "La Main de Dieu (1986) : Diego Maradona marque de la main face à l'Angleterre en quart de finale, puis inscrit dans la même rencontre le 'But du Siècle' après avoir dribblé 5 adversaires. Deux buts, deux mondes.",
      "La finale 2022 est considérée comme la meilleure de l'histoire : Messi vs Mbappé, 3-3 ap, victoire de l'Argentine aux penalties après un hat-trick de Mbappé en 8 minutes. Le monde entier a retenu son souffle.",
      "Mario Kempes, jamais sélectionné en club argentin (il jouait à Valence), est rappelé par Menotti pour 1978 et devient le héros du premier titre argentin avec 6 buts, dont deux en finale.",
    ],
  },

  // ============================================================
  //  ALLEMAGNE
  // ============================================================
  allemagne: {
    teamId: "allemagne",
    participations: 20,
    bestResult: "Champion (1954, 1974, 1990, 2014)",
    yearsParticipated: [1934, 1938, 1954, 1958, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1954, stage: "Champion", detail: "Miracle de Berne, victoire 3-2 face à la Hongrie" },
      { year: 1966, stage: "Finaliste", detail: "Défaite 4-2 contre l'Angleterre en finale" },
      { year: 1974, stage: "Champion", detail: "Victoire 2-1 contre les Pays-Bas de Cruyff" },
      { year: 1982, stage: "Finaliste", detail: "Victoire pénible en finale contre l'Italie (3-1 ap)" },
      { year: 1990, stage: "Champion", detail: "Réunification symbolique, victoire face à l'Argentine" },
      { year: 2002, stage: "Finaliste", detail: "Défaite 2-0 face au Brésil et Ronaldo" },
      { year: 2014, stage: "Champion", detail: "7-1 contre le Brésil, finale gagnée par Götze" },
      { year: 2018, stage: "Phase de groupes", detail: "Élimination choc dès le premier tour" },
    ],
    strengths: [
      "Organisation tactique irréprochable",
      "Mentalité de gagneur légendaire ('German efficiency')",
      "Formation de joueurs de classe mondiale",
      "Capacité à performer dans les grands matchs",
      "Profondeur de l'effectif en Bundesliga",
    ],
    weaknesses: [
      "Période de reconstruction depuis 2018",
      "Manque de joueurs de classe mondiale actuels",
      "Vulnérabilité aux équipes très rapides",
      "Pression liée au prestige historique",
    ],
    playingStyle:
      "La Mannschaft joue un pressing intense combiné à un jeu de possession structuré. Le 4-2-3-1 ou 3-4-3 permet des sorties de balle propres et des combinaisons à trois dans les couloirs. Nagelsmann a modernisé l'approche en intégrant plus de flexibilité positionnelle et d'intensité dans le pressing.",
    anecdotes: [
      "Le Miracle de Berne (1954) : l'Allemagne de l'Ouest bat la Hongrie 3-2 en finale, alors que cette même équipe hongroise les avait battus 8-3 en phase de groupes. Rahn inscrit le but de la victoire à la 84e. Ce titre symbolise le 'Wirtschaftswunder', le miracle économique allemand d'après-guerre.",
      "La nuit de Séville (1982) : les Allemands et les Français jouent la première séance de tirs au but de l'histoire d'une demi-finale de Coupe du Monde. Le gardien Schumacher percute Battiston (pas de carton) et l'Allemagne se qualifie malgré tout.",
      "En 1990, lors de la finale contre l'Argentine, la rencontre ne vaut rien footballistiquement (1-0 sur penalty, 1 expulsion argentin, carton jaune généralisé) mais marque la réunification symbolique des deux Allemagnes, réunifiées politiquement le même automne.",
    ],
  },

  // ============================================================
  //  ESPAGNE
  // ============================================================
  espagne: {
    teamId: "espagne",
    participations: 16,
    bestResult: "Champion (2010)",
    yearsParticipated: [1934, 1950, 1962, 1966, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1950, stage: "4e place" },
      { year: 1994, stage: "Quart de finale" },
      { year: 2002, stage: "Quart de finale", detail: "Éliminée par la Corée du Sud dans la polémique" },
      { year: 2010, stage: "Champion", detail: "Victoire en finale face aux Pays-Bas (1-0 ap, Iniesta)" },
      { year: 2014, stage: "Phase de groupes", detail: "Elimination choc dès le 1er tour" },
      { year: 2022, stage: "Quart de finale", detail: "Éliminée par le Maroc aux TAB" },
    ],
    strengths: [
      "Tiki-taka et possession de balle magistrale",
      "Génération de jeunes talents exceptionnelle (Yamal, Pedri)",
      "Pressing collectif très bien organisé",
      "Solidité défensive et jeu de sortie de balle",
      "Vainqueur de l'Euro 2024 avec brio",
    ],
    weaknesses: [
      "Parfois trop prévisible dans sa possession",
      "Vulnérabilité aux contre-attaques rapides",
      "Manque d'un buteur de classe mondiale régulier",
      "Historique de performances décevantes après les titres",
    ],
    playingStyle:
      "La Roja joue un 4-3-3 ou 4-2-3-1 basé sur la possession et le pressing collectif. Lamine Yamal sur le côté droit apporte une dimension de dribble et de percussion que l'Espagne n'avait plus connue depuis des années. Pedri et Gavi orchestrent au milieu pour libérer les espaces aux attaquants.",
    anecdotes: [
      "Le but de Carles Puyol en demi-finale du Mondial 2010 contre l'Allemagne : le défenseur monte sur un corner et inscrit un but de la tête pour qualifier l'Espagne. Un symbole de l'esprit collectif de cette équipe légendaire.",
      "En 2010, après 44 années sans titre mondial, l'Espagne bat les Pays-Bas 1-0 après prolongation grâce à un but d'Iniesta à la 116e minute. Madrid célèbre cette nuit-là avec des millions de personnes dans les rues.",
      "En 2014, l'Espagne championne du monde et double championne d'Europe se fait éliminer dès le premier tour au Brésil, battue 5-1 par les Pays-Bas et 2-0 par le Chili. L'une des plus grandes chutes de l'histoire d'une équipe championne en titre.",
    ],
  },

  // ============================================================
  //  ANGLETERRE
  // ============================================================
  angleterre: {
    teamId: "angleterre",
    participations: 16,
    bestResult: "Champion (1966)",
    yearsParticipated: [1950, 1954, 1958, 1962, 1966, 1970, 1982, 1986, 1990, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1966, stage: "Champion", detail: "Victoire 4-2 contre l'Allemagne, Geoff Hurst hat-trick" },
      { year: 1970, stage: "Quart de finale", detail: "Défaite face à l'Allemagne 3-2 après avoir mené 2-0" },
      { year: 1986, stage: "Quart de finale", detail: "Éliminée par Maradona (Main de Dieu)" },
      { year: 1990, stage: "4e place", detail: "Défaite aux penalties face à l'Allemagne" },
      { year: 2018, stage: "4e place", detail: "Meilleur résultat depuis 1990 sous Southgate" },
      { year: 2022, stage: "Quart de finale", detail: "Éliminée par la France 2-1" },
    ],
    strengths: [
      "Premier League, championnat le plus compétitif du monde",
      "Pressing physique intense et agressivité",
      "Harry Kane, l'un des meilleurs attaquants du monde",
      "Profondeur dans tous les postes",
      "Mentalité de compétition forgée en Premier League",
    ],
    weaknesses: [
      "58 ans sans titre mondial (malédiction nationale)",
      "Résultats décevants malgré les effectifs de qualité",
      "Fragilité psychologique dans les grands moments (penalties)",
      "Manque de créativité offensive parfois",
    ],
    playingStyle:
      "L'Angleterre joue un 4-3-3 ou 4-2-3-1 direct et physique, exploitant la profondeur avec des ailiers rapides et la puissance de Harry Kane dans la surface. Sous Southgate puis son successeur, le jeu reste structuré et difficile à déséquilibrer, mais peut manquer de flamboyance contre les meilleures équipes.",
    anecdotes: [
      "Le but fantôme de 1966 : lors de la finale contre l'Allemagne, le tir de Geoff Hurst rebondit sur la barre transversale. L'arbitre de touche soviétique accorde le but (qui n'avait peut-être pas franchi la ligne). L'Angleterre mène 3-2 et finit par gagner 4-2. La controverse dure encore.",
      "The Three Lions et les penalties : l'Angleterre a été éliminée aux tirs au but lors des Mondiaux 1990, 1998, 2006 et à l'Euro 1996. Cette 'malédiction' est devenue un sujet national de plaisanterie, jusqu'à la victoire aux penalties à l'Euro 2020.",
      "Bobby Moore, capitaine de l'équipe championne du monde en 1966, mourra en 1993 d'un cancer colorectal. Sa statue trône devant le stade de Wembley et il reste l'une des icônes les plus aimées du football anglais.",
    ],
  },

  // ============================================================
  //  ITALIE
  // ============================================================
  italie: {
    teamId: "italie",
    participations: 18,
    bestResult: "Champion (1934, 1938, 1982, 2006)",
    yearsParticipated: [1930, 1934, 1938, 1950, 1954, 1962, 1966, 1970, 1974, 1978, 1982, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2022],
    notableResults: [
      { year: 1934, stage: "Champion", detail: "Victoire à domicile sous Mussolini" },
      { year: 1938, stage: "Champion", detail: "Double consécutif" },
      { year: 1970, stage: "Finaliste", detail: "Défaite 4-1 face au Brésil de Pelé" },
      { year: 1982, stage: "Champion", detail: "Rossi hat-trick contre le Brésil, titre en Espagne" },
      { year: 1990, stage: "3e place", detail: "Éliminée aux penalties par l'Argentine" },
      { year: 1994, stage: "Finaliste", detail: "Roberto Baggio rate le penalty décisif" },
      { year: 2006, stage: "Champion", detail: "Victoire aux penalties face à la France après le coup de tête de Zidane" },
    ],
    strengths: [
      "Tradition défensive légendaire (Catenaccio)",
      "Techniciens de grande qualité formés en Serie A",
      "Expérience des grands rendez-vous mondiaux",
      "Capacité à se réinventer tactiquement",
    ],
    weaknesses: [
      "Absence du Mondial 2018 (échec de qualification historique)",
      "Génération actuelle moins dominante que les précédentes",
      "Fragilité aux penalties malgré l'histoire (Baggio 1994)",
      "Serie A moins compétitive que dans les années 2000",
    ],
    playingStyle:
      "La Squadra Azzurra maintient sa tradition défensive tout en modernisant son jeu sous l'impulsion de Spalletti. Le 4-3-3 permet des combinaisons courtes et une récupération haute du ballon. L'équipe italienne est reconnue pour sa discipline tactique et sa capacité à souffrir collectivement.",
    anecdotes: [
      "Roberto Baggio et le penalty manqué de 1994 : lors de la finale contre le Brésil, Baggio — meilleur joueur du tournoi — tire son penalty au-dessus et offre le titre aux Brésiliens. L'image de ses mains sur la tête est l'une des plus emblématiques de l'histoire du sport mondial.",
      "Paolo Rossi marque 6 buts en 3 matchs lors du Mondial 1982, après être revenu d'une suspension de deux ans pour des soupçons de corruption. Son hat-trick contre le Brésil en quarts est considéré comme l'une des plus grandes performances de l'histoire.",
      "L'Italie est le seul pays à avoir manqué la qualification pour deux Coupes du Monde consécutives (2018 et 2022) tout en étant quadruple champion du monde. Un effondrement structurel du football italien qui a profondément choqué le pays.",
    ],
  },

  // ============================================================
  //  PAYS-BAS
  // ============================================================
  "pays-bas": {
    teamId: "pays-bas",
    participations: 11,
    bestResult: "Finaliste (1974, 1978, 2010)",
    yearsParticipated: [1934, 1938, 1974, 1978, 1990, 1994, 1998, 2006, 2010, 2014, 2022],
    notableResults: [
      { year: 1974, stage: "Finaliste", detail: "Football total de Cruyff battu par l'Allemagne 2-1" },
      { year: 1978, stage: "Finaliste", detail: "Sans Cruyff, perdu face à l'Argentine 3-1 ap" },
      { year: 1998, stage: "4e place", detail: "Demi-finale spectaculaire contre le Brésil (1-1, TAB)" },
      { year: 2010, stage: "Finaliste", detail: "Défaite 1-0 contre l'Espagne en finale" },
      { year: 2014, stage: "3e place", detail: "Van Persie volée légendaire contre l'Espagne" },
      { year: 2022, stage: "Quart de finale", detail: "Éliminée par l'Argentine aux penalties" },
    ],
    strengths: [
      "Formation de joueurs technique parmi les meilleures au monde",
      "Identité de jeu forte (football total hérité de Cruyff)",
      "Viviers Ajax et grandes académies",
      "Joueurs de classe mondiale en Premier League et Liga",
    ],
    weaknesses: [
      "Jamais champions du monde malgré l'immense talent",
      "Fragilité mentale dans les finales",
      "Tendance aux tensions internes (1990, 2006)",
      "Dépendance à certains joueurs clés",
    ],
    playingStyle:
      "L'Oranje joue un pressing collectif intense hérité du football total de Cruyff. Le 4-3-3 reste la référence avec des latéraux très offensifs et un milieu dynamique. La circulation rapide du ballon et les permutations de postes sont les marques de fabrique du football néerlandais.",
    anecdotes: [
      "Johan Cruyff refuse de participer au Mondial 1978 en Argentine pour des raisons politiques (la junte militaire au pouvoir). Les Pays-Bas atteignent la finale sans lui. Il ne révèle la vraie raison — une tentative d'enlèvement de sa famille en 1977 — que 30 ans plus tard.",
      "Le but de Van Persie en plongeon contre l'Espagne en 2014 (5-1) : sur un long ballon de Robben depuis le milieu de terrain, Van Persie plonge à 6 mètres de distance et inscrit un but de la tête qui va dans le même coin que la balle à toute vitesse. Voté plus beau but de la compétition.",
      "En 1974, les Pays-Bas ouvrent le score en finale avant même que l'Allemagne ait touché le ballon : 13 passes consécutives et un penalty pour Breitner. Mais l'Allemagne finira par renverser la situation (2-1).",
    ],
  },

  // ============================================================
  //  PORTUGAL
  // ============================================================
  portugal: {
    teamId: "portugal",
    participations: 9,
    bestResult: "3e place (1966)",
    yearsParticipated: [1966, 1986, 2002, 2006, 2010, 2014, 2018, 2022, 2026],
    notableResults: [
      { year: 1966, stage: "3e place", detail: "Eusébio 9 buts, meilleur buteur du tournoi" },
      { year: 2006, stage: "4e place", detail: "Ronaldo et Figo, belle campagne" },
      { year: 2010, stage: "Quart de finale" },
      { year: 2022, stage: "Quart de finale", detail: "Éliminé par le Maroc 1-0" },
    ],
    strengths: [
      "Cristiano Ronaldo, l'un des plus grands joueurs de l'histoire",
      "Génération de milieux de terrain de classe mondiale (B.Silva, R.Neves)",
      "Pressing intense et organisation défensive",
      "Profondeur de l'effectif en progression constante",
    ],
    weaknesses: [
      "Transition post-Ronaldo à préparer",
      "Dépendance historique à Ronaldo (performance parfois)",
      "Manque de titre mondial ou européen récent",
      "Gestion de l'équilibre ego/collectif",
    ],
    playingStyle:
      "Le Portugal joue un 4-3-3 ou 4-2-3-1 structuré autour de la créativité de Bernardo Silva et des décrochages de Ronaldo ou Félix. Le pressing est organisé et la transition défensive rapide. Roberto Martinez a modernisé l'approche en intégrant plus de profondeur tactique.",
    anecdotes: [
      "Eusébio pleure après l'élimination du Portugal en demi-finale 1966 face à l'Angleterre (2-1). Il avait marqué 9 buts lors de ce Mondial — record pendant longtemps — dont 4 en quart de finale contre la Corée du Nord pour remonter un déficit de 0-3.",
      "En 1966, le Portugal bat la Corée du Nord 5-3 après avoir été mené 3-0 à la mi-temps. Eusébio inscrit 4 buts dans la 2e mi-temps. Considéré comme l'un des retournements de situation les plus spectaculaires de l'histoire.",
      "Ronaldo a pleuré publiquement après l'élimination du Portugal face au Maroc en 2022, après n'avoir commencé qu'une seule rencontre dans la compétition suite à une décision controversée de l'entraîneur Santos.",
    ],
  },

  // ============================================================
  //  URUGUAY
  // ============================================================
  uruguay: {
    teamId: "uruguay",
    participations: 14,
    bestResult: "Champion (1930, 1950)",
    yearsParticipated: [1930, 1950, 1954, 1962, 1966, 1970, 1974, 1986, 1990, 2002, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1930, stage: "Champion", detail: "Premier Mondial, victoire en finale 4-2 contre l'Argentine" },
      { year: 1950, stage: "Champion", detail: "Le Maracanazo : victoire 2-1 contre le Brésil" },
      { year: 1954, stage: "4e place", detail: "Demi-finale épique perdue contre la Hongrie 4-2" },
      { year: 1970, stage: "4e place", detail: "Demi-finale contre le Brésil (3-1)" },
      { year: 2010, stage: "4e place", detail: "Suarez, Forlán (meilleur joueur), main sur la ligne" },
    ],
    strengths: [
      "Mentalité guerrière et solidarité défensive légendaire",
      "Avant-centres de classe mondiale (Suárez, Cavani)",
      "Expérience et caractère dans les moments décisifs",
      "Tradition de football physique et efficace",
    ],
    weaknesses: [
      "Transition générationnelle en cours",
      "Effectif moins profond que d'autres grandes nations",
      "Image entachée par des incidents disciplinaires",
      "Résultats irréguliers ces dernières années",
    ],
    playingStyle:
      "L'Uruguayan joue un football très physique basé sur la solidité défensive et l'efficacité offensive. Le 4-4-2 ou 4-3-3 compact défend très bas avant de sortir rapidement sur les attaquants. La garra charrúa — cette combativité uruguayenne légendaire — reste l'essence même de cette équipe.",
    anecdotes: [
      "Le Maracanazo (1950) : l'Uruguay bat le Brésil 2-1 devant 200 000 spectateurs au Maracanã pour décrocher son deuxième titre mondial. Alcides Ghiggia, auteur du but décisif, dira plus tard : 'Seulement trois personnes ont réduit le Maracanã au silence : Sinatra, le Pape et moi.'",
      "La main de Suárez (2010) : en quart de finale contre le Ghana, avec le score à 1-1 dans les dernières secondes, Suárez arrête un ballon de la main sur la ligne pour empêcher un but certain. Il est expulsé mais le Ghana rate le penalty. L'Uruguay se qualifie aux tirs au but. Acte héroïque ou tricherie ? Le débat continue.",
      "Diego Forlán est élu meilleur joueur du Mondial 2010 avec 5 buts. Ses frappes de loin, notamment contre l'Allemagne, sont restées dans les mémoires. Il avait 31 ans à ce moment-là.",
    ],
  },

  // ============================================================
  //  BELGIQUE
  // ============================================================
  belgique: {
    teamId: "belgique",
    participations: 14,
    bestResult: "3e place (2018)",
    yearsParticipated: [1930, 1934, 1938, 1954, 1970, 1982, 1986, 1990, 1994, 1998, 2002, 2014, 2018, 2022],
    notableResults: [
      { year: 1986, stage: "4e place", detail: "Meilleur résultat avant 2018" },
      { year: 2014, stage: "Quart de finale", detail: "Début de la génération dorée" },
      { year: 2018, stage: "3e place", detail: "Génération dorée au sommet : De Bruyne, Hazard, Lukaku" },
      { year: 2022, stage: "Phase de groupes", detail: "Élimination décevante, tensions internes" },
    ],
    strengths: [
      "Kevin De Bruyne, l'un des meilleurs milieux du monde",
      "Profondeur tactique et polyvalence",
      "Expérience de la pression internationale",
      "Romelu Lukaku en pointe de pivot",
    ],
    weaknesses: [
      "Génération dorée en fin de cycle",
      "Tensions internes récurrentes dans le vestiaire",
      "Manque de successeurs de la même génération",
      "Défense parfois fragile sur les transitions",
    ],
    playingStyle:
      "La Belgique joue un 4-3-3 ou 3-4-3 permettant d'exploiter la puissance de Lukaku et la vision de De Bruyne. Les phases offensives sont construites patiemment mais les transitions sont décisives. L'équipe sait aussi défendre avec organisation et efficacité.",
    anecdotes: [
      "Kevin De Bruyne joue l'intégralité du Mondial 2022 malgré une blessure musculaire sévère contractée avant le tournoi. Il joue sous infiltrations et déclare après l'élimination qu'il ne pouvait plus marcher correctement depuis le premier match.",
      "En 2018, la Belgique bat le Brésil 2-1 en quart de finale grâce à un but contre son camp et une frappe de De Bruyne. C'est l'un des sommets de la génération dorée belge qui suscite les espoirs d'un titre mondial jamais atteint.",
      "La Belgique est restée numéro 1 du classement FIFA pendant 3 ans consécutifs (2018-2021) sans jamais remporter le moindre titre majeur — une anomalie dans l'histoire du football mondial.",
    ],
  },

  // ============================================================
  //  CROATIE
  // ============================================================
  croatie: {
    teamId: "croatie",
    participations: 7,
    bestResult: "Finaliste (2018), 3e place (2022 & 1998)",
    yearsParticipated: [1998, 2002, 2006, 2014, 2018, 2022, 2026],
    notableResults: [
      { year: 1998, stage: "3e place", detail: "Première participation, Šuker Soulier d'Or" },
      { year: 2018, stage: "Finaliste", detail: "Victoires épiques contre Danemark, Russie, Angleterre" },
      { year: 2022, stage: "3e place", detail: "Modric et Gvardiol brillants, battent le Brésil aux TAB" },
    ],
    strengths: [
      "Luka Modric, maestro du milieu de terrain mondial",
      "Mental et résilience extraordinaires",
      "Excellents duellistes et joueurs d'un contre un",
      "Cohésion d'équipe soudée par l'adversité historique",
    ],
    weaknesses: [
      "Modric vieillit (40 ans en 2026), transition à gérer",
      "Petit pays avec peu de profondeur dans certains postes",
      "Dépendance à quelques individualités clés",
      "Défense parfois exposée sur les phases rapides",
    ],
    playingStyle:
      "La Croatie joue un 4-3-3 ou 4-2-3-1 centré sur Modric au milieu. Le pressing est organisé et le jeu de transition est rapide. L'équipe excelle dans les matchs à élimination directe et démontre une résilience phénoménale dans les moments critiques — prolongations et penalties inclus.",
    anecdotes: [
      "Lors du Mondial 2018, la Croatie a joué 3 matches en prolongation (Danemark, Russie, Angleterre) sur 5 matchs à élimination directe, totalisant plus de 600 minutes de jeu. Une endurance physique et mentale hors du commun.",
      "Luka Modric remporte le Ballon d'Or 2018 après avoir mené la Croatie en finale du Mondial, mettant fin à 10 ans de règne Ronaldo-Messi. À 33 ans, il est le joueur le plus âgé à recevoir la récompense depuis Ronaldo (le Brésilien) en 1997.",
      "Davor Šuker remporte le Soulier d'Or du Mondial 1998 avec 6 buts. Il marque notamment un lob de légende contre Mary Jordan contre l'Allemagne en quart de finale.",
    ],
  },

  // ============================================================
  //  MEXIQUE
  // ============================================================
  mexique: {
    teamId: "mexique",
    participations: 17,
    bestResult: "Quart de finaliste (1970, 1986)",
    yearsParticipated: [1930, 1950, 1954, 1958, 1962, 1966, 1970, 1978, 1986, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1970, stage: "Quart de finale", detail: "À domicile pour la 1re fois, battu par l'Italie" },
      { year: 1986, stage: "Quart de finale", detail: "À domicile (2e fois), battu par l'Allemagne aux penalties" },
      { year: 2002, stage: "8e de finale", detail: "Battu par les USA" },
      { year: 2010, stage: "8e de finale", detail: "Battu par l'Argentine 3-1" },
      { year: 2018, stage: "8e de finale", detail: "Victoire contre l'Allemagne au 1er tour (1-0), battu par le Brésil" },
      { year: 2022, stage: "Phase de groupes", detail: "Éliminé au premier tour pour la 1re fois depuis 1978" },
    ],
    strengths: [
      "Soutien populaire immense (avantage du terrain en 2026)",
      "Estadio Azteca et son altitude à 2 240m",
      "Tradition de buts splendides et de jeu offensif",
      "Liga MX de plus en plus compétitive",
    ],
    weaknesses: [
      "Plafond de verre des quarts de finale depuis 40 ans",
      "Déclin relatif depuis 2019 en CONCACAF",
      "Manque de stars mondiales de classe A",
      "Pression nationale en tant que co-organisateur",
    ],
    playingStyle:
      "La Tri joue un football technique et offensif, s'appuyant sur des milieux créatifs et des ailiers rapides. Le 4-3-3 permet des combinaisons courtes et des sorties de balle propres. À l'Estadio Azteca, l'altitude (2 240m) épuise les adversaires et l'atmosphère est incomparable au monde.",
    anecdotes: [
      "Hugo Sánchez est le premier grand star mexicaine sur la scène mondiale, auteur de 234 buts en Liga pendant 10 ans avec l'Atletico et le Real. Mais il n'a jamais brillé lors d'un Mondial, ses meilleures performances restant au niveau des clubs.",
      "La 'malédiction du quinto partido' : le Mexique n'a jamais passé les huitièmes de finale (le 5e match), quand il les atteint. C'est devenu une obsession nationale et le sujet de nombreuses analyses psychologiques.",
      "En 2018, après le but mexicain contre l'Allemagne, des sismographes à Mexico City ont capté des mouvements qui ont été interprétés comme de légères secousses provoquées par les célébrations collectives des supporters.",
    ],
  },

  // ============================================================
  //  JAPON
  // ============================================================
  japon: {
    teamId: "japon",
    participations: 8,
    bestResult: "8e de finale (2002, 2010, 2022)",
    yearsParticipated: [1998, 2002, 2006, 2010, 2014, 2018, 2022, 2026],
    notableResults: [
      { year: 1998, stage: "Phase de groupes", detail: "Première participation" },
      { year: 2002, stage: "8e de finale", detail: "Co-organisation, victoire sur la Russie et la Tunisie" },
      { year: 2010, stage: "8e de finale", detail: "Battu par le Paraguay aux penalties" },
      { year: 2022, stage: "8e de finale", detail: "Victoire sur l'Allemagne et l'Espagne, battu par la Croatie" },
    ],
    strengths: [
      "Organisation collective et discipline tactique irréprochable",
      "Pressing ultra-intense (gegenpressing asiatique)",
      "Victoire historique sur l'Allemagne et l'Espagne (2022)",
      "Joueurs évoluant dans les meilleures ligues européennes",
    ],
    weaknesses: [
      "Manque d'un avant-centre de classe mondiale",
      "Fragilité physique contre les équipes athlétiques",
      "Déficit d'expérience dans les grands matchs",
      "Jeu trop prévisible parfois en possession",
    ],
    playingStyle:
      "Le Japon joue un pressing collectif intense dans un 4-3-3 ou 4-2-3-1. La discipline collective est le point fort de cette équipe bien entraînée qui a adopté les méthodes européennes. Les remises en jeu rapides et les transitions offensives surprennent les adversaires.",
    anecdotes: [
      "Au Qatar 2022, le Japon devient la première équipe asiatique à battre deux anciennes champions du monde lors d'un même Mondial (Allemagne 2-1 et Espagne 2-1). Les deux victoires ont été obtenues par des retournements de situation en 2e mi-temps.",
      "Après chaque match, les supporters japonais nettoient les tribunes du stade — une tradition devenue virale sur internet. Les joueurs laissent également le vestiaire impeccable avec un mot de remerciement en langue locale.",
      "En 2022, le centre-avant Tanaka reprend de volée un centre qui avait apparemment traversé la ligne de sortie selon la diffusion TV, mais les caméras Goal-Line confirment que la balle est restée in. Ce but polémique qualifie le Japon en 8es.",
    ],
  },

  // ============================================================
  //  CORÉE DU SUD
  // ============================================================
  "coree-du-sud": {
    teamId: "coree-du-sud",
    participations: 11,
    bestResult: "Demi-finaliste (2002)",
    yearsParticipated: [1954, 1986, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 2002, stage: "Demi-finale", detail: "Élimine l'Italie et l'Espagne, perd contre l'Allemagne" },
      { year: 2010, stage: "8e de finale", detail: "Battu par l'Uruguay 2-1" },
      { year: 2018, stage: "Phase de groupes", detail: "Victoire 2-0 contre l'Allemagne championne du monde" },
      { year: 2022, stage: "8e de finale", detail: "Victoire in extremis contre le Portugal, battu par le Brésil" },
    ],
    strengths: [
      "Son Heung-min, star mondiale de Premier League",
      "Intensité physique et pressing remarquable",
      "Discipline collective et solidarité défensive",
      "Expérience de 11 participations consécutives",
    ],
    weaknesses: [
      "Manque de créativité offensive sans Son",
      "Profondeur insuffisante dans certains postes",
      "Faiblesse aux matchs à enjeux psychologiques extrêmes",
      "Dépendance à Son Heung-min",
    ],
    playingStyle:
      "La Corée du Sud joue un 4-2-3-1 ou 4-3-3 axé sur l'intensité collective et la rapidité des transitions. Son Heung-min est le catalyseur offensif autour duquel l'équipe s'organise. Le pressing défensif haut permet de récupérer rapidement et de créer des situations favorables.",
    anecdotes: [
      "En 2002, l'Espagne et l'Italie sont éliminées par la Corée du Sud dans des conditions très controversées : buts annulés, arbitrages favorables aux Coréens. L'Italie (Totti expulsé) et l'Espagne (deux buts valables annulés) n'ont jamais digéré ces éliminations.",
      "Lors du Mondial 2018, la Corée du Sud bat l'Allemagne championne du monde 2-0 au dernier match du groupe, éliminant les Allemands — une des plus grandes surprises de l'histoire.",
      "Son Heung-min dispute le Mondial 2022 malgré une triple fracture autour de l'orbite oculaire gauche contractée 3 semaines avant. Il joue l'intégralité du tournoi avec un masque protecteur sur le visage.",
    ],
  },

  // ============================================================
  //  ÉTATS-UNIS
  // ============================================================
  "etats-unis": {
    teamId: "etats-unis",
    participations: 11,
    bestResult: "3e place (1930)",
    yearsParticipated: [1930, 1934, 1950, 1990, 1994, 1998, 2002, 2006, 2010, 2014, 2022],
    notableResults: [
      { year: 1930, stage: "3e place", detail: "Demi-finale contre l'Argentine (6-1)" },
      { year: 1950, stage: "Phase de groupes", detail: "Victoire choc 1-0 contre l'Angleterre" },
      { year: 1994, stage: "8e de finale", detail: "Organisation du Mondial, Brazil-Italy sold out" },
      { year: 2002, stage: "Quart de finale", detail: "Élimination contre l'Allemagne 1-0" },
      { year: 2022, stage: "8e de finale", detail: "Battu par les Pays-Bas 3-1" },
    ],
    strengths: [
      "Avantage du terrain en 2026 (co-organisateur)",
      "Athlétisme exceptionnel",
      "Génération MLS/Europe montante (Pulisic, Weah)",
      "Soutien populaire en progression constante",
    ],
    weaknesses: [
      "Manque d'expérience dans les grands rendez-vous",
      "Football pas encore culture dominante aux USA",
      "Manque de joueurs d'élite mondiale dans tous les secteurs",
      "Pression inhabituellement forte en 2026",
    ],
    playingStyle:
      "Les USA jouent un 4-3-3 très physique et athlétique, avec un pressing haut intense. Christian Pulisic est le joueur le plus technique et le leader offensif. L'équipe a progressé sous Gregg Berhalter puis son successeur et dispose maintenant d'un noyau solide de joueurs en Europe.",
    anecdotes: [
      "En 1950, l'équipe des États-Unis bat l'Angleterre 1-0 grâce à un but de tête de Gaetjens. La presse anglaise croit d'abord à une faute d'impression et modifie le score en 10-1 avant de confirmer le résultat. Considéré comme le plus grand choc de l'histoire du Mondial.",
      "Claudio Reyna, capitaine des USA lors du Mondial 2002 et 2006, est le père de Gio Reyna qui représente les USA depuis 2020. Une dynastrée footballistique unique dans l'histoire du football américain.",
      "La MLS est passée en 20 ans de ligue de second rang à championnat d'attraction pour les stars mondiales (Messi, Beckham, Zlatan), ce qui a contribué à populariser massivement le football aux États-Unis.",
    ],
  },

  // ============================================================
  //  SÉNÉGAL
  // ============================================================
  senegal: {
    teamId: "senegal",
    participations: 4,
    bestResult: "Quart de finaliste (2002)",
    yearsParticipated: [2002, 2018, 2022, 2026],
    notableResults: [
      { year: 2002, stage: "Quart de finale", detail: "Victoire choc contre la France championne du monde 1-0" },
      { year: 2018, stage: "Phase de groupes", detail: "Éliminé par la règle du fair-play (même points que Japon)" },
      { year: 2022, stage: "8e de finale", detail: "Battu par l'Angleterre 3-0" },
    ],
    strengths: [
      "Sadio Mané, joueur africain au sommet mondial",
      "Puissance physique et vitesse des attaquants",
      "Solidarité collective remarquable",
      "Progression constante ces 20 dernières années",
    ],
    weaknesses: [
      "Manque de profondeur tactique par rapport aux grandes nations",
      "Dépendance à Mané",
      "Fragilité aux déficiences d'arbitrage ou pression externe",
    ],
    playingStyle:
      "Le Sénégal joue un 4-3-3 ou 4-4-2 physique et direct, exploitant la vitesse et la puissance de ses attaquants. Sadio Mané est le catalyseur de tout le jeu offensif. La transition défensive est rapide et le bloc est difficile à déséquilibrer.",
    anecdotes: [
      "En 2002, lors de leur première Coupe du Monde, le Sénégal bat la France championne du monde 1-0 grâce à un but de Papa Bouba Diop. Toute l'Afrique exulte. L'équipe atteinra ensuite les quarts de finale en battant la Suède.",
      "En 2018, le Sénégal et le Japon sont à égalité parfaite (points, différence de buts, buts marqués) mais le Japon se qualifie grâce à... moins de cartons jaunes dans le tournoi. Le Sénégal est éliminé par un critère jamais utilisé auparavant.",
      "Sadio Mané dispute le Mondial 2022 avec une blessure au genou contractée avant le tournoi. Il se blesse au 1er match et rate les suivants. Le Sénégal perd en 8es contre l'Angleterre.",
    ],
  },

  // ============================================================
  //  MAROC
  // ============================================================
  maroc: {
    teamId: "maroc",
    participations: 6,
    bestResult: "Demi-finaliste (2022)",
    yearsParticipated: [1970, 1986, 1994, 1998, 2018, 2022],
    notableResults: [
      { year: 1986, stage: "8e de finale", detail: "Première équipe africaine à sortir du 1er tour" },
      { year: 2022, stage: "Demi-finale", detail: "Première équipe africaine et arabe en demi-finale" },
    ],
    strengths: [
      "Solidité défensive exceptionnelle (0 but encaissé jusqu'aux demies 2022)",
      "Collectif soudé et organisation tactique parfaite",
      "Vitesse et intensité sur toutes les lignes",
      "Motivation nationale et continentale immense",
    ],
    weaknesses: [
      "Manque de régularité offensive",
      "Peu de matchs au niveau le plus élevé historiquement",
      "Dépendance à l'organisation défensive parfois au détriment du jeu",
    ],
    playingStyle:
      "Le Maroc joue un 4-3-3 compact et difficile à pénétrer. Walid Regragui a instauré une organisation défensive presque parfaite où chaque joueur est discipliné. Les transitions sont rapides et exploitent la vitesse des ailiers comme Ziyech ou Hakimi. La pression psychologique d'être la première équipe africaine en demi-finale a paradoxalement libéré l'équipe.",
    anecdotes: [
      "Au Qatar 2022, le Maroc élimine successivement la Belgique, l'Espagne (aux penalties) et le Portugal, devenant la première équipe africaine et arabe à atteindre les demi-finales d'une Coupe du Monde. Une performance historique saluée dans le monde entier.",
      "Le gardien Yassine Bounou (Bono) n'a encaissé aucun but en phase de groupes et jusqu'aux demi-finales, où la France passe finalement (2-0). Son arrêt contre l'Espagne aux penalties est l'une des performances de gardien les plus mémorables du tournoi.",
      "L'entraîneur Walid Regragui est nommé sélectionneur en septembre 2022, soit seulement 3 mois avant le début de la Coupe du Monde. En moins de 90 jours, il transforme complètement l'équipe et l'amène jusqu'aux demi-finales.",
    ],
  },

  // ============================================================
  //  AUSTRALIE
  // ============================================================
  australie: {
    teamId: "australie",
    participations: 6,
    bestResult: "8e de finale (2006, 2022, 2023)",
    yearsParticipated: [1974, 2006, 2010, 2014, 2018, 2022],
    notableResults: [
      { year: 1974, stage: "Phase de groupes", detail: "Première participation" },
      { year: 2006, stage: "8e de finale", detail: "Victoire sur le Japon 3-1, battu par l'Italie" },
      { year: 2022, stage: "8e de finale", detail: "Victoire contre le Danemark, battu par l'Argentine 2-1" },
    ],
    strengths: [
      "Intensité physique et mentalité combative",
      "Organisés tactiquement sous Graham Arnold",
      "Capacité à créer des surprises",
      "Bonne profondeur en attaque (Leckie, Goodwin)",
    ],
    weaknesses: [
      "Niveau général inférieur aux grandes nations",
      "Qualifications difficiles en Asie (longues séries de matchs)",
      "Peu de joueurs dans les grands championnats européens",
    ],
    playingStyle:
      "Les Socceroos jouent un 4-2-3-1 organisé et physique. Le pressing est intense et la transition défensive rapide. L'équipe est difficile à battre défensivement et cherche à exploiter les failles adverses sur les phases arrêtées.",
    anecdotes: [
      "Harry Kewell, l'un des meilleurs joueurs australiens de l'histoire, inscrit le but égalisateur en 8es de finale 2006 contre la Croatie (2-2 ap, qualif aux TAB). Il joue malgré une déchirure musculaire et sort sur blessure quelques minutes après.",
      "Tim Cahill inscrit en 2006 deux buts de la tête en 5 minutes contre le Japon pour passer de 0-1 à 3-1. Il deviendra le meilleur buteur de l'histoire des Socceroos.",
      "L'Australie a rejoint la confédération asiatique (AFC) en 2006, quittant l'OFC, pour améliorer ses chances de qualification. Cette décision stratégique a facilité leur accès aux phases finales mondiales.",
    ],
  },

  // ============================================================
  //  CANADA
  // ============================================================
  canada: {
    teamId: "canada",
    participations: 2,
    bestResult: "Phase de groupes (1986, 2022)",
    yearsParticipated: [1986, 2022],
    notableResults: [
      { year: 1986, stage: "Phase de groupes", detail: "Première participation, 3 défaites, 0 but" },
      { year: 2022, stage: "Phase de groupes", detail: "Alphonso Davies superstar, 0 point (3 matchs)" },
    ],
    strengths: [
      "Alphonso Davies (Bayern Munich), l'un des meilleurs latéraux du monde",
      "Jonathan David, attaquant prolifique en Ligue 1",
      "Génération montante avec plusieurs joueurs en Europe",
      "Co-organisateur 2026, motivation maximale",
    ],
    weaknesses: [
      "Peu d'expérience au niveau mondial",
      "Effectif encore en développement",
      "Football pas culture dominante au Canada",
      "Pression en tant que co-hôte 2026",
    ],
    playingStyle:
      "Le Canada joue un 4-2-3-1 dynamique exploitant la vitesse de Davies sur le côté gauche et le sens du but de Jonathan David. L'équipe progresse rapidement sous John Herdman puis son successeur, avec un jeu offensif en développement constant.",
    anecdotes: [
      "Alphonso Davies est né dans un camp de réfugiés au Ghana après que ses parents ont fui la guerre civile libérienne. À 23 ans, il est devenu l'une des stars mondiales du football avec le Bayern Munich et un pilier de l'équipe nationale.",
      "Lors du Mondial 2022, le Canada perd 1-0 contre la Belgique malgré une domination nette. Alphonso Davies rate un penalty et l'équipe termine sans point mais avec de belles performances.",
      "Le Canada attendait depuis 1986 pour participer à un Mondial. Cette qualification pour 2022 a été célébrée comme une fête nationale. En 2026, ils seront co-hôtes, ce qui représente une opportunité historique pour le football canadien.",
    ],
  },
};
