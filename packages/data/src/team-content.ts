/**
 * Team editorial content — strengths, weaknesses, and anecdotes for each team.
 * Used by /equipe/[slug] template.
 */

export interface TeamAnecdote {
  year: string;
  icon: string;
  title: string;
  desc: string;
}

export interface TeamEditorialContent {
  strengths: string[];
  weaknesses: string[];
  anecdotes: TeamAnecdote[];
}

export const teamContent: Record<string, TeamEditorialContent> = {
  france: {
    strengths: [
      "Effectif le plus profond du monde — qualité à chaque poste",
      "Mbappé (27 ans) au sommet de son art au Real Madrid",
      "Doublé 1998-2018 + finale 2022 — ADN du gagnant",
      "Tchouaméni / Camavinga : milieu de classe mondiale",
      "Saliba / Upamecano : défense jeune et solide",
      "Faim de revanche après la défaite 2022 face à l'Argentine",
    ],
    weaknesses: [
      "Griezmann à 35 ans — forme physique sur toute la durée",
      "Pression médiatique écrasante sur Mbappé",
      "Syndrome de la 3e CDM consécutive à haut niveau",
      "Gestion de l'équilibre offensif/défensif selon Deschamps",
      "Risque de blessures clés en toute fin de saison (juin)",
    ],
    anecdotes: [
      { year: "1958", icon: "⚽", title: "Just Fontaine — Record éternel", desc: "Just Fontaine inscrit 13 buts en une seule édition de la Coupe du Monde, un record absolu qui tient depuis 66 ans et ne sera probablement jamais battu. La France finit 3e." },
      { year: "1982", icon: "💔", title: "La tragédie de Séville", desc: "En demi-finale contre l'Allemagne, le gardien Schumacher assomme Battiston sans être sanctionné. La France, menée 3-1, remonte à 3-3 avant de perdre aux tirs au but." },
      { year: "1998", icon: "", title: "1998 : L'été de tous les rêves", desc: "À domicile, les Bleus de Aimé Jacquet écrasent le Brésil 3-0 en finale. Zidane inscrit deux buts de la tête. Un pays tout entier sur les Champs-Élysées. La 1ère étoile." },
      { year: "2006", icon: "🤯", title: "Zidane : Adieu en coup de tête", desc: "À 34 ans, Zizou sort de sa retraite internationale et mène la France jusqu'en finale. Un coup de tête sur Materazzi le fait expulser. La France perd aux tirs au but." },
      { year: "2018", icon: "⭐", title: "2018 : La génération Mbappé", desc: "En Russie, les Bleus de Deschamps battent la Croatie 4-2. Mbappé (19 ans) marque et devient le 2e joueur après Pelé à inscrire un but en finale à son âge. La 2e étoile." },
      { year: "2022", icon: "🎭", title: "La finale épique de tous les temps", desc: "Menée 2-0 à la 80e, la France remonte grâce à Mbappé (triplé). Score final 3-3, l'Argentine gagne aux tirs au but. La plus grande finale de l'histoire." },
    ],
  },
  "equateur": {
    strengths: [
      "Moisés Caicedo (Chelsea) — milieu box-to-box de classe mondiale, leader technique",
      "Altitude de Quito (2 850 m) comme arme décisive en qualifications",
      "Génération dorée confirmée : Páez, Sarmiento, Hincapié forment un noyau jeune et ambitieux",
      "Solidité défensive avec Piero Hincapié (Bayer Leverkusen), l'un des meilleurs latéraux gauches au monde",
      "Enner Valencia, capitaine expérimenté, buteur clutch en Coupe du Monde",
      "Qualification régulière depuis 2002 — le programme est mature",
    ],
    weaknesses: [
      "Manque de profondeur au poste d'avant-centre derrière Valencia vieillissant (36 ans)",
      "Performances en déplacement nettement inférieures à celles à domicile en altitude",
      "Jamais dépassé les phases de groupes sauf en 2006",
      "Dépendance excessive à Caicedo pour la création au milieu",
      "Gestion émotionnelle lors des matchs à élimination directe",
    ],
    anecdotes: [
      { year: "2002", icon: "🎉", title: "Première historique au Japon", desc: "L'Équateur se qualifie pour sa première Coupe du Monde. Agustín Delgado marque le but de la victoire face à la Croatie (1-0), premier succès du pays dans la compétition." },
      { year: "2006", icon: "🚀", title: "Huitièmes en Allemagne", desc: "L'Équateur bat la Pologne et le Costa Rica en phase de groupes et atteint les huitièmes de finale pour la première et seule fois de son histoire. Éliminé par l'Angleterre (1-0)." },
      { year: "2014", icon: "🫡", title: "Valencia, héros maudit", desc: "Enner Valencia inscrit les 3 buts de l'Équateur au Brésil (contre Honduras et France). Malgré ses exploits, la Tri est éliminée dès les groupes pour un but de différence." },
      { year: "2022", icon: "⚡", title: "Valencia ouvre le bal du Mondial", desc: "Enner Valencia inscrit un doublé lors du match d'ouverture Qatar-Équateur (0-2), devenant le premier joueur à marquer lors du match inaugural deux fois dans sa carrière." },
    ],
  },
  "paraguay": {
    strengths: [
      "Tradition de combativité et de solidarité — la Garra Guaraní",
      "Miguel Almirón (expérimenté) et Julio Enciso (Brighton, 21 ans) offrent un duo créatif",
      "Alfaro comme sélectionneur apporte rigueur tactique et discipline défensive",
      "Qualifications CONMEBOL 2026 solides après des années de disette",
      "Gardiens de qualité — tradition paraguayenne au poste (Gatito Fernández, Silva)",
    ],
    weaknesses: [
      "Manque de buteur prolifique — pas de vrai numéro 9 de classe internationale",
      "Effectif moins profond que les grandes nations sud-américaines",
      "Absences prolongées en Coupe du Monde (dernière participation : 2010)",
      "Dépendance au bloc bas et aux contres — vulnérable face aux équipes patientes",
      "Peu de joueurs évoluant dans les tout meilleurs clubs européens",
    ],
    anecdotes: [
      { year: "1998", icon: "🇵🇾", title: "Chilavert, gardien-buteur star", desc: "José Luis Chilavert, gardien-tireur de coups francs, devient une icône mondiale lors du Mondial français. Le Paraguay atteint les huitièmes avant de tomber face à la France, pays hôte." },
      { year: "2002", icon: "😱", title: "Élimination cruelle au Japon", desc: "Un but en or de l'Allemand Oliver Neuville à la 88e élimine le Paraguay en huitièmes (1-0). Les Guaranís quittent le tournoi la tête haute mais le cœur brisé." },
      { year: "2010", icon: "🌟", title: "Quart de finale historique en Afrique du Sud", desc: "Le Paraguay atteint les quarts de finale pour la première fois, éliminant le Japon aux tirs au but. Oscar Cardozo et ses coéquipiers seront stoppés par l'Espagne (0-1), futur champion." },
    ],
  },
  "panama": {
    strengths: [
      "Expérience acquise lors de la CDM 2018 — le programme a franchi un cap",
      "Intensité physique et pressing agressif — équipe difficile à manœuvrer",
      "Supporters passionnés capables de créer une ambiance hostile à domicile",
      "Joueurs expérimentés en MLS et Liga MX, habitués au haut niveau régional",
      "Cohésion d'équipe et esprit collectif très forts",
    ],
    weaknesses: [
      "Manque de talent individuel au plus haut niveau européen",
      "Transition générationnelle en cours — les héros de 2018 vieillissent",
      "Faiblesse technique face aux équipes qui contrôlent la possession",
      "Profondeur de banc limitée — les blessures coûtent très cher",
      "Peu d'expérience en matchs à élimination directe",
    ],
    anecdotes: [
      { year: "2018", icon: "😭", title: "Première historique — un pays en larmes", desc: "Le Panama se qualifie pour sa première Coupe du Monde grâce à un but de Román Torres contre le Costa Rica. Le président décrète un jour férié national. Tout un pays pleure de joie." },
      { year: "2018", icon: "⚽", title: "Premier but en CDM", desc: "Felipe Baloy inscrit le premier but de l'histoire du Panama en Coupe du Monde face à l'Angleterre (1-6). Malgré la défaite, le but est célébré comme une victoire." },
      { year: "2018", icon: "🎓", title: "L'école russe", desc: "Trois défaites en trois matchs (0-3 Belgique, 1-6 Angleterre, 1-2 Tunisie), mais le Panama gagne le respect et l'expérience. Le sélectionneur Hernán Darío Gómez parle d'une « graduation »." },
    ],
  },
  "haiti": {
    strengths: [
      "Fierté nationale immense — le football est une passion viscérale",
      "Diaspora fournissant des joueurs formés en France, USA et Canada",
      "Capacité à créer la surprise grâce à un jeu athlétique et rapide",
      "Expérience en Gold Cup avec des performances notables",
      "Première qualification CDM depuis 1974 — motivation exceptionnelle",
    ],
    weaknesses: [
      "Infrastructure de développement quasi inexistante sur l'île",
      "Aucune expérience récente au plus haut niveau mondial",
      "Profondeur d'effectif très limitée",
      "Instabilité fédérale et politique impactant la préparation",
      "Écart technique significatif avec les nations majeures",
    ],
    anecdotes: [
      { year: "1974", icon: "🏴", title: "Haïti au Mondial — une première caribéenne", desc: "Haïti devient la première nation des Caraïbes anglophones/francophones à se qualifier pour une Coupe du Monde (Allemagne 1974). Emmanuel Sanon inscrit un but mythique contre l'Italie, mettant fin à l'invincibilité de Dino Zoff (1 142 minutes)." },
      { year: "1974", icon: "💊", title: "Le scandale du dopage", desc: "Ernst Jean-Joseph est contrôlé positif, premier cas de dopage de l'histoire de la Coupe du Monde. Un épisode sombre qui ternit la belle aventure haïtienne en Allemagne." },
      { year: "2026", icon: "🔥", title: "Le retour après 52 ans", desc: "Haïti se qualifie pour la Coupe du Monde 2026, mettant fin à 52 ans d'absence. Un exploit retentissant pour une nation frappée par des crises à répétition." },
    ],
  },
  "cap-vert": {
    strengths: [
      "Diaspora européenne (Portugal, France) fournissant des joueurs de bon niveau",
      "Esprit collectif et solidarité — petit pays, grand cœur",
      "Progression constante dans le classement FIFA depuis 15 ans",
      "Première qualification CDM historique — motivation décuplée",
      "Joueurs habitués aux championnats portugais et français",
    ],
    weaknesses: [
      "Population de 600 000 habitants — vivier de joueurs extrêmement réduit",
      "Aucune expérience en phase finale de Coupe du Monde",
      "Infrastructure et moyens financiers très limités",
      "Dépendance aux joueurs de la diaspora — cohésion parfois fragile",
    ],
    anecdotes: [
      { year: "2014", icon: "💔", title: "Si près du Brésil", desc: "Le Cap-Vert atteint le dernier tour des qualifications africaines pour le Mondial 2014 avant d'être éliminé. Un parcours remarquable pour un archipel de 600 000 habitants." },
      { year: "2026", icon: "🎉", title: "Première qualification historique", desc: "Le Cap-Vert se qualifie pour sa toute première Coupe du Monde, devenant l'une des plus petites nations à atteindre la phase finale. Un moment fondateur pour le football cap-verdien." },
    ],
  },
  "curacao": {
    strengths: [
      "Joueurs binationaux (Pays-Bas) de haut niveau — héritage footballistique néerlandais",
      "Jeu technique et offensif hérité de la philosophie hollandaise",
      "Expérience en Gold Cup — quart de finaliste en 2019",
      "Première qualification CDM — élan historique",
      "Cohésion dans un petit groupe très soudé",
    ],
    weaknesses: [
      "Île de 150 000 habitants — le plus petit pays du tournoi",
      "Aucune expérience en Coupe du Monde",
      "Profondeur de banc quasi inexistante",
      "Dépendance aux joueurs nés et formés aux Pays-Bas",
    ],
    anecdotes: [
      { year: "2019", icon: "", title: "Quart de finale en Gold Cup", desc: "Curaçao atteint les quarts de finale de la Gold Cup 2019, battant le Salvador et l'Inde. Une performance qui met l'île sur la carte du football international." },
      { year: "2026", icon: "🌴", title: "L'île au Mondial", desc: "Curaçao se qualifie pour sa première Coupe du Monde, exploit phénoménal pour une île néerlandaise des Caraïbes. Tout l'archipel célèbre ce moment historique." },
    ],
  },
  "jordanie": {
    strengths: [
      "Finaliste de la Coupe d'Asie 2024 — progression fulgurante",
      "Organisation tactique solide et discipline défensive",
      "Supporters passionnés — l'Amman International Stadium est une forteresse",
      "Joueurs expérimentés dans les championnats du Golfe",
      "Confiance en hausse après le parcours asiatique historique",
    ],
    weaknesses: [
      "Première participation en Coupe du Monde — manque d'expérience à ce niveau",
      "Peu de joueurs évoluant dans les grands championnats européens",
      "Capacité offensive limitée face aux défenses organisées",
      "Profondeur d'effectif réduite — peu d'alternatives",
    ],
    anecdotes: [
      { year: "2014", icon: "😤", title: "Barrage cruel contre l'Uruguay", desc: "La Jordanie affronte l'Uruguay en barrage intercontinental pour le Mondial 2014. Après un 0-5 à l'aller, les Jordaniens gagnent le retour 0-0 à domicile. Si près et si loin." },
      { year: "2024", icon: "🥈", title: "Finale de la Coupe d'Asie", desc: "La Jordanie atteint la finale de la Coupe d'Asie 2024, battant la Corée du Sud en demi-finale (2-0). Défaite en finale contre le Qatar, mais le pays entre dans une nouvelle dimension." },
      { year: "2026", icon: "🎊", title: "Première qualification historique", desc: "La Jordanie se qualifie pour sa première Coupe du Monde, couronnant des années de développement. Un tournant pour le football jordanien." },
    ],
  },
  "ouzbekistan": {
    strengths: [
      "Vivier de talents en Asie centrale — championnat national en progression",
      "Joueurs physiques et endurants, habitués aux conditions difficiles",
      "Tradition de bons résultats en compétitions de jeunes (U20, U23)",
      "Qualification historique pour 2026 — élan et confiance",
      "Jeu direct et transitions rapides — dangereux en contre-attaque",
    ],
    weaknesses: [
      "Aucune expérience en phase finale de Coupe du Monde",
      "Peu de joueurs dans les grands championnats européens",
      "Régularité au plus haut niveau encore à prouver",
      "Pression de la première participation — gestion émotionnelle",
    ],
    anecdotes: [
      { year: "2006", icon: "😩", title: "L'agonie des barrages", desc: "L'Ouzbékistan atteint les barrages pour la Coupe du Monde 2006 mais échoue face au Bahreïn puis à Trinité-et-Tobago. Le rêve du Mondial s'envole à deux reprises." },
      { year: "2018", icon: "💔", title: "Éliminé au dernier moment", desc: "En qualifications pour 2018, l'Ouzbékistan est en tête de son groupe à deux journées de la fin avant de s'effondrer. La malédiction continue." },
      { year: "2026", icon: "🎉", title: "Enfin le Mondial !", desc: "L'Ouzbékistan se qualifie pour sa première Coupe du Monde, brisant des décennies de frustration. Le pays entier célèbre cet accomplissement historique." },
    ],
  },
  "nouvelle-zelande": {
    strengths: [
      "Chris Wood (Nottingham Forest) — buteur prolifique en Premier League, leader d'attaque",
      "Expérience de trois participations en Coupe du Monde (1982, 2010, 2026)",
      "Domination en Océanie — qualifications maîtrisées",
      "Joueurs évoluant en A-League et championnats européens secondaires",
      "Solidarité d'un groupe uni et combatif",
    ],
    weaknesses: [
      "Isolement géographique — manque de compétition de haut niveau au quotidien",
      "Profondeur d'effectif très limitée derrière les titulaires",
      "Écart de niveau avec les nations des confédérations majeures",
      "Peu de joueurs dans les grands championnats européens en dehors de Wood",
      "Rugby et cricket dominent le paysage sportif — football en retrait",
    ],
    anecdotes: [
      { year: "1982", icon: "🥇", title: "Première en Espagne", desc: "Les All Whites se qualifient pour leur première Coupe du Monde en battant la Chine en barrage. Trois défaites en phase de groupes, mais l'histoire est écrite." },
      { year: "2010", icon: "🤝", title: "Le nul héroïque contre l'Italie", desc: "La Nouvelle-Zélande arrache un 1-1 face à l'Italie, tenante du titre. Les All Whites terminent le tournoi invaincus (3 nuls) — fait unique pour une équipe éliminée en groupes." },
      { year: "2010", icon: "📊", title: "Invaincus mais éliminés", desc: "Avec 3 matchs nuls contre la Slovaquie (1-1), l'Italie (1-1) et le Paraguay (0-0), la Nouvelle-Zélande est la seule équipe invaincue du Mondial 2010, mais ne passe pas les groupes." },
      { year: "2022", icon: "😔", title: "Barrage perdu face au Costa Rica", desc: "En barrage intercontinental pour le Mondial 2022, la Nouvelle-Zélande s'incline 1-0 face au Costa Rica. Un nouveau rendez-vous manqué de peu." },
    ],
  },
  "bresil": {
    strengths: [
      "Vinícius Jr (25 ans), Ballon d'Or et leader offensif au Real Madrid",
      "Rodrygo et Raphinha : ailiers de classe mondiale en pleine maturité",
      "Militão et Gabriel Magalhães : charnière centrale solide et expérimentée",
      "Endrick (19 ans) : nouveau prodige offensif avec un potentiel explosif",
      "Bruno Guimarães : milieu complet et patron à Newcastle",
      "5 titres de champions du monde — pression positive d'un pays entier",
    ],
    weaknesses: [
      "Neymar souvent blessé et en fin de carrière — leadership incertain",
      "Manque d'un vrai 9 de référence depuis des années",
      "Qualifications sud-américaines laborieuses, résultats en dents de scie",
      "Renouvellement générationnel encore en cours au milieu de terrain",
      "Dernière Coupe du Monde gagnée en 2002 — 24 ans de disette",
    ],
    anecdotes: [
      { year: "1958", icon: "👑", title: "Pelé, 17 ans, roi du monde", desc: "Un gamin de 17 ans nommé Pelé inscrit 6 buts dont un doublé en finale (5-2 vs Suède). Le Brésil remporte sa 1re Coupe du Monde et une légende est née." },
      { year: "1970", icon: "", title: "Le plus beau football jamais joué", desc: "Au Mexique, le Brésil de Pelé, Jairzinho, Tostão et Rivelino écrase l'Italie 4-1 en finale. Considérée comme la plus belle équipe de l'histoire du football." },
      { year: "1994", icon: "", title: "La Romário-dépendance payante", desc: "Aux États-Unis, portés par un Romário impérial (5 buts), les Brésiliens battent l'Italie aux tirs au but en finale. Baggio rate le dernier penalty." },
      { year: "2002", icon: "⭐", title: "Ronaldo, la rédemption", desc: "Au Japon, Ronaldo — après sa mystérieuse crise de 1998 — inscrit 8 buts dont un doublé en finale contre l'Allemagne (2-0). Le Brésil décroche sa 5e étoile." },
      { year: "2014", icon: "💀", title: "Le 7-1 : cauchemar national", desc: "À domicile, le Brésil s'effondre 7-1 contre l'Allemagne en demi-finale. Le Mineirão de Belo Horizonte est en larmes. Le pire traumatisme du football brésilien." },
    ],
  },
  "argentine": {
    strengths: [
      "Champions du monde 2022 et Copa América 2024 — confiance maximale",
      "Messi (38 ans) potentiellement pour un dernier tour d'honneur légendaire",
      "Julián Álvarez (25 ans) : attaquant complet et décisif à l'Atlético Madrid",
      "Enzo Fernández et Mac Allister : milieu jeune et technique au top européen",
      "Scaloni : sélectionneur qui a su bâtir un groupe soudé et équilibré",
      "Profondeur de banc impressionnante (Garnacho, Mastantuono, Nico González)",
    ],
    weaknesses: [
      "Dépendance émotionnelle à Messi — transition à gérer si absent",
      "Vieillissement de certains cadres (Di María retraité, Otamendi 37 ans)",
      "Pression de défendre le titre — syndrome du champion sortant",
      "Dibu Martínez parfois imprévisible et sujet aux provocations",
    ],
    anecdotes: [
      { year: "1978", icon: "🏟️", title: "Victoire à domicile controversée", desc: "L'Argentine remporte son 1er titre mondial en battant les Pays-Bas 3-1 en finale (après prolongation). Un triomphe entaché par le contexte politique de la dictature militaire." },
      { year: "1986", icon: "🖐️", title: "La Main de Dieu et le But du Siècle", desc: "Au Mexique, Maradona inscrit deux buts légendaires contre l'Angleterre en quart : la Main de Dieu puis le plus beau but de l'histoire en dribblant 6 joueurs. L'Argentine est championne." },
      { year: "2014", icon: "😢", title: "Si près au Maracanã", desc: "Messi mène l'Argentine en finale face à l'Allemagne. Higuaín et Palacio ratent des occasions énormes. Götze marque en prolongation (1-0). Le Ballon d'Or de Messi est amer." },
      { year: "2022", icon: "🐐", title: "Messi touche enfin les étoiles", desc: "Après une défaite choc contre l'Arabie Saoudite, Messi et l'Argentine remportent la finale la plus épique de l'histoire face à la France (3-3, tirs au but). La 3e étoile, la consécration du GOAT." },
    ],
  },
  "allemagne": {
    strengths: [
      "Musiala (23 ans) : créateur de génie, l'un des meilleurs joueurs du monde",
      "Wirtz (22 ans) : talent générationnel au Bayer Leverkusen",
      "Sané et Havertz : attaquants expérimentés en pleine maturité",
      "Rüdiger au Real Madrid : défenseur central de classe mondiale",
      "Tradition de compétiteur en phases finales — 4 titres mondiaux",
    ],
    weaknesses: [
      "Élimination en phase de groupes en 2018 et 2022 — confiance ébranlée",
      "Manque d'un vrai 9 prolifique de référence",
      "Neuer retraité, successeur pas encore totalement confirmé au plus haut niveau",
      "Nagelsmann doit trouver l'équilibre entre jeunesse et expérience",
      "Défense parfois fragile face aux grandes équipes",
    ],
    anecdotes: [
      { year: "1954", icon: "✨", title: "Le Miracle de Berne", desc: "Menée 2-0 par la Hongrie de Puskás en finale, l'Allemagne de Fritz Walter renverse le match et gagne 3-2. Le 'Miracle de Berne' marque la renaissance de l'Allemagne d'après-guerre." },
      { year: "1974", icon: "", title: "Beckenbauer, le Kaiser champion", desc: "À domicile, l'Allemagne de Beckenbauer, Gerd Müller et Breitner bat les Pays-Bas de Cruyff 2-1 en finale. Müller inscrit le but décisif." },
      { year: "1990", icon: "⚡", title: "Revanche sur Maradona", desc: "À Rome, l'Allemagne prend sa revanche sur l'Argentine de Maradona. Un penalty de Brehme à la 85e offre un 3e titre (1-0). Maradona termine en larmes." },
      { year: "2014", icon: "⭐", title: "Götze et le Maracanazo", desc: "Après le 7-1 contre le Brésil, Götze inscrit un but de génie en finale contre l'Argentine à la 113e minute (1-0). La 4e étoile, la consécration d'une génération." },
      { year: "2018", icon: "💥", title: "La chute du champion", desc: "L'Allemagne tenante du titre est éliminée dès les poules après une défaite contre la Corée du Sud (2-0). La fin humiliante d'un cycle doré." },
    ],
  },
  "espagne": {
    strengths: [
      "Lamine Yamal (18 ans) : prodige du Barça, déjà MVP de l'Euro 2024",
      "Pedri et Gavi : milieu de terrain d'une technique exceptionnelle",
      "Champions d'Europe 2024 — équipe en pleine ascension",
      "Rodri (Ballon d'Or 2024) : le métronome du milieu de terrain",
      "De la Fuente : sélectionneur tactiquement brillant et audacieux",
      "Morata et Oyarzabal : attaquants décisifs dans les grands rendez-vous",
    ],
    weaknesses: [
      "Blessure grave de Rodri (ligaments croisés) — retour incertain à 100%",
      "Manque d'un buteur prolifique de référence",
      "Blessures récurrentes de Gavi et Pedri — fragilité physique du milieu",
      "Pression d'enchaîner après l'Euro — gestion du calendrier chargé",
    ],
    anecdotes: [
      { year: "1950", icon: "😤", title: "L'affront du Maracanã", desc: "L'Espagne atteint la phase finale à 4 équipes mais s'incline face à l'Uruguay (2-3) et au Brésil (1-6). Un début de longue frustration en Coupe du Monde." },
      { year: "2010", icon: "", title: "La Roja conquiert le monde", desc: "En Afrique du Sud, l'Espagne de Xavi, Iniesta et Casillas domine la compétition. Iniesta inscrit le seul but de la finale contre les Pays-Bas à la 116e minute. Le tiki-taka est roi." },
      { year: "2018", icon: "🎭", title: "Le chaos Lopetegui", desc: "Lopetegui est viré la veille du Mondial pour avoir signé au Real Madrid. L'Espagne, déboussolée, est éliminée en 8es par la Russie aux tirs au but." },
      { year: "2022", icon: "🇯🇵", title: "Le cauchemar japonais", desc: "L'Espagne est éliminée en 8es par le Maroc aux tirs au but, après une phase de groupes où le Japon lui avait infligé une défaite surprise." },
    ],
  },
  "angleterre": {
    strengths: [
      "Bellingham (22 ans) : milieu offensif de classe mondiale au Real Madrid",
      "Saka, Foden, Palmer : trio offensif explosif et polyvalent",
      "Rice : milieu défensif dominant à Arsenal",
      "Tuchel comme sélectionneur — tacticien reconnu au plus haut niveau",
      "Deux finales d'Euro consécutives (2021, 2024) — expérience des grands matchs",
    ],
    weaknesses: [
      "Zéro titre depuis 1966 — pression historique et blocage mental récurrent",
      "Tuchel doit encore imposer sa patte et connaître les joueurs anglais",
      "Défense vieillissante (Walker, Stones) — renouvellement pas achevé",
      "Kane (32 ans) : efficacité intacte mais mobilité en baisse",
      "Tendance à sous-performer dans les matchs décisifs",
    ],
    anecdotes: [
      { year: "1966", icon: "", title: "Le but fantôme de Wembley", desc: "À domicile, l'Angleterre bat l'Allemagne 4-2 en finale (après prolongation). Le 3e but de Hurst, qui rebondit sur la barre, est toujours débattu. Le seul titre anglais." },
      { year: "1986", icon: "🖐️", title: "Main de Dieu, cœur brisé", desc: "En quart de finale, Maradona élimine l'Angleterre avec la Main de Dieu puis le But du Siècle. Le début d'une rivalité légendaire avec l'Argentine." },
      { year: "1990", icon: "😭", title: "Gazza's Tears", desc: "L'Angleterre de Lineker et Gascoigne atteint les demi-finales. Gazza reçoit un carton jaune qui le priverait de la finale et fond en larmes. Défaite aux tirs au but face à l'Allemagne." },
      { year: "2018", icon: "🦁", title: "It's Coming Home... presque", desc: "L'Angleterre de Southgate atteint les demi-finales pour la 1re fois depuis 1990. Battue par la Croatie en prolongation (1-2), mais un pays retrouve l'espoir." },
      { year: "2022", icon: "🇫🇷", title: "Kane, le penalty de trop", desc: "L'Angleterre domine la France en quart mais Kane rate un 2e penalty crucial. Défaite 2-1. Le syndrome anglais des moments décisifs frappe encore." },
    ],
  },
  "portugal": {
    strengths: [
      "Ronaldo (41 ans) potentiellement pour un dernier Mondial record",
      "Bruno Fernandes : leader technique et passeur décisif",
      "Rafael Leão : ailier dévastateur et imprévisible à l'AC Milan",
      "Bernardo Silva : intelligence tactique et régularité au Man City",
      "Génération dorée encore jeune (Vitinha, Gonçalo Ramos, João Neves)",
      "Dias et Nuno Mendes : défense solide et moderne",
    ],
    weaknesses: [
      "Question Ronaldo : le garder ou l'écarter ? Dilemme politique et sportif",
      "Manque d'un sélectionneur de tout premier plan",
      "Tendance à surjouer individuellement dans les moments clés",
      "Résultats décevants en Coupe du Monde (jamais au-delà des demi-finales)",
    ],
    anecdotes: [
      { year: "1966", icon: "🐆", title: "Eusébio, la Panthère Noire", desc: "Eusébio inscrit 9 buts et mène le Portugal à une historique 3e place. Contre la Corée du Nord en quart, remontée de 0-3 à 5-3 dont 4 buts d'Eusébio." },
      { year: "2006", icon: "🥉", title: "Génération dorée, si près du but", desc: "Le Portugal de Figo, Deco et CR7 (21 ans) atteint les demi-finales. Défaite 1-0 contre la France de Zidane. La meilleure performance portugaise moderne." },
      { year: "2018", icon: "🎩", title: "Le triplé de CR7 contre l'Espagne", desc: "Ronaldo inscrit un triplé magistral contre l'Espagne (3-3) en match d'ouverture, dont un coup franc dans les dernières minutes. Un des plus grands matchs individuels en CDM." },
      { year: "2022", icon: "😤", title: "La fin amère de Ronaldo au Qatar", desc: "Remplaçant face au Maroc en quart, Ronaldo assiste impuissant à l'élimination (1-0). Il quitte le terrain en larmes. La probable fin d'une ère." },
    ],
  },
  "pays-bas": {
    strengths: [
      "Gakpo : ailier prolifique et décisif en grand tournoi (Liverpool)",
      "De Jong (si fit) et Gravenberch : milieu technique et athlétique",
      "Van Dijk : leader défensif de classe mondiale à Liverpool",
      "Dumfries et Aké : joueurs d'expérience dans les grands clubs",
      "Tradition tactique néerlandaise — toujours des idées de jeu claires",
    ],
    weaknesses: [
      "Pas de vrai buteur de classe mondiale depuis van Persie et Robben",
      "Profondeur de banc limitée comparée aux favoris",
      "Van Dijk à 34 ans — question de longévité physique",
      "3 finales perdues, 0 titre — le complexe de la dernière marche",
      "Résultats récents en baisse (éliminés en demi à l'Euro 2024 par l'Angleterre)",
    ],
    anecdotes: [
      { year: "1974", icon: "", title: "Le Football Total de Cruyff", desc: "Les Pays-Bas de Cruyff révolutionnent le football avec le 'Totaalvoetbal'. Ils mènent 1-0 après 80 secondes en finale sans que l'Allemagne touche le ballon, mais perdent 2-1." },
      { year: "1978", icon: "💔", title: "Encore finaliste, encore battu", desc: "Les Oranje atteignent à nouveau la finale mais s'inclinent 3-1 face à l'Argentine (après prolongation). Sans Cruyff, qui a refusé de participer." },
      { year: "1998", icon: "🧊", title: "Bergkamp, le but venu d'ailleurs", desc: "Dennis Bergkamp inscrit contre l'Argentine en quart un but légendaire : contrôle du dos, crochet et frappe. Éliminés en demi par le Brésil aux tirs au but." },
      { year: "2010", icon: "🥊", title: "La finale de la honte", desc: "Les Pays-Bas atteignent leur 3e finale. Un match brutal (14 cartons jaunes, 1 rouge) contre l'Espagne. Robben rate un face-à-face. Défaite 0-1 à la 116e." },
      { year: "2014", icon: "🧤", title: "Van Gaal et le coup du gardien", desc: "Van Gaal remplace Cillessen par Tim Krul juste avant les tirs au but en quart contre le Costa Rica. Krul arrête 2 penalties. Génie tactique pur." },
    ],
  },
  "belgique": {
    strengths: [
      "De Bruyne (34 ans) : toujours l'un des meilleurs passeurs au monde",
      "Doku : ailier explosif et dribbleur redoutable à Man City",
      "Trossard et Openda : profils offensifs variés et en forme",
      "Casteels : gardien fiable et expérimenté",
      "Tedesco a amorcé un rajeunissement nécessaire de l'effectif",
    ],
    weaknesses: [
      "Génération dorée en fin de cycle (De Bruyne, Lukaku, Vertonghen retraité)",
      "Lukaku en déclin et souvent critiqué en grand tournoi",
      "Résultats décevants malgré le talent (Euro 2024 : éliminés en 8es)",
      "Manque de leaders pour la nouvelle génération",
      "Aucun titre majeur malgré 10 ans dans le top 5 mondial",
    ],
    anecdotes: [
      { year: "1986", icon: "🔥", title: "Demi-finale surprise au Mexique", desc: "La Belgique de Ceulemans et Scifo atteint les demi-finales. Éliminée 2-0 par Maradona et l'Argentine, mais la meilleure performance belge de l'histoire." },
      { year: "2014", icon: "🇧🇪", title: "Le réveil des Diables", desc: "La nouvelle génération dorée (Hazard, De Bruyne, Courtois, Lukaku) atteint les quarts. Battus 1-0 par l'Argentine. Le début d'une décennie d'espoirs." },
      { year: "2018", icon: "🥉", title: "3es et magnifiques en Russie", desc: "La Belgique bat le Brésil 2-1 en quart (De Bruyne, but somptueux) mais s'incline 1-0 en demi face à la France. 3e place et le sentiment d'une occasion manquée." },
      { year: "2022", icon: "💀", title: "Implosion au Qatar", desc: "Éliminés dès les poules après un nul 0-0 face à la Croatie. Tensions internes entre joueurs. La fin brutale de la génération dorée." },
    ],
  },
  "croatie": {
    strengths: [
      "Modrić (40 ans) : légende vivante, potentiel dernier Mondial émouvant",
      "Gvardiol : l'un des meilleurs défenseurs centraux du monde (Man City)",
      "Kovačić et Brozović : milieu expérimenté et technique",
      "ADN compétiteur exceptionnel pour un pays de 4 millions d'habitants",
      "Deux finales consécutives (finale 2018, 3e en 2022) — habituée des derniers carrés",
    ],
    weaknesses: [
      "Modrić à 40 ans — le jour où il s'arrêtera, c'est un pan entier qui tombe",
      "Attaque peu prolifique, manque d'un buteur de classe mondiale",
      "Renouvellement générationnel critique — peu de jeunes au top européen",
      "Petite nation : profondeur de banc très limitée en cas de blessures",
    ],
    anecdotes: [
      { year: "1998", icon: "🌟", title: "Šuker et la 3e place surprise", desc: "Pour leur 1re vraie participation, les Croates de Šuker (Soulier d'Or, 6 buts) éliminent l'Allemagne 3-0 en quart et finissent 3es. Un pays de 4 millions sidère le monde." },
      { year: "2018", icon: "🔥", title: "Le miracle croate en Russie", desc: "La Croatie de Modrić élimine le Danemark, la Russie et l'Angleterre (toutes en prolongation ou tirs au but) pour atteindre sa 1re finale. Défaite 4-2 face à la France, mais Modrić remporte le Ballon d'Or." },
      { year: "2022", icon: "🥉", title: "Encore dans le dernier carré", desc: "Modrić (37 ans) mène encore la Croatie en demi-finale. Battue par l'Argentine (3-0), elle décroche la 3e place face au Maroc. Remarquable constance au plus haut niveau." },
    ],
  },
  "uruguay": {
    strengths: [
      "Núñez (26 ans) : attaquant explosif et buteur prolifique à Liverpool",
      "Valverde : milieu box-to-box d'exception au Real Madrid",
      "Araújo : défenseur central ultra-physique au FC Barcelone",
      "Bielsa comme sélectionneur — intensité tactique et pressing haut",
      "Mentalité garra charrúa : combativité légendaire du football uruguayen",
    ],
    weaknesses: [
      "Effectif global moins profond que les grands favoris",
      "Suárez et Cavani retraités — fin d'une ère offensive historique",
      "Bielsa parfois imprévisible dans ses choix tactiques",
      "Qualifications sud-américaines souvent compliquées malgré le talent",
    ],
    anecdotes: [
      { year: "1930", icon: "", title: "Les tout premiers champions du monde", desc: "À Montevideo, l'Uruguay organise et remporte la toute première Coupe du Monde. Victoire 4-2 en finale contre l'Argentine devant 93 000 spectateurs au Centenario." },
      { year: "1950", icon: "😱", title: "Le Maracanazo — le plus grand exploit", desc: "L'Uruguay bat le Brésil 2-1 en match décisif devant 200 000 spectateurs au Maracanã. Le 'Maracanazo' reste le plus grand choc de l'histoire du football." },
      { year: "2010", icon: "🖐️", title: "La main de Suárez contre le Ghana", desc: "En quart, Suárez arrête un but certain du Ghana de la main sur la ligne à la dernière minute. Expulsé, mais Gyan rate le penalty. L'Uruguay gagne aux tirs au but." },
      { year: "2010", icon: "🎉", title: "Forlán et le retour au premier plan", desc: "Portés par Forlán (Ballon d'Or du tournoi), les Uruguayens atteignent les demi-finales pour la 1re fois depuis 1970. 4e place finale." },
    ],
  },
  "arabie-saoudite": {
    strengths: [
      "Investissements massifs dans le football — Saudi Pro League attirant des stars mondiales",
      "Salem Al-Dawsari, héros national, toujours décisif et expérimenté",
      "Victoire historique contre l'Argentine en 2022 — confiance et référence mentale",
      "Public passionné et stades ultramodernes",
      "Qualification régulière en Coupe du Monde — 7e participation",
      "Programme Vision 2030 boostant toutes les infrastructures sportives",
    ],
    weaknesses: [
      "Joueurs évoluant quasi exclusivement en championnat national — manque d'exposition européenne",
      "Régularité sur un tournoi entier jamais démontrée (souvent décevants après des débuts prometteurs)",
      "Chaleur extrême du pays inadaptée à la préparation pour un Mondial estival en Amérique du Nord",
      "Dépendance aux joueurs locaux malgré l'afflux de stars étrangères en SPL",
      "Pression liée à la candidature pour le Mondial 2034",
    ],
    anecdotes: [
      { year: "1994", icon: "🎩", title: "Owairan et le but du siècle", desc: "Saeed Al-Owairan dribble toute la défense belge sur 70 mètres et marque un but légendaire. L'Arabie saoudite atteint les huitièmes dès sa première participation." },
      { year: "2002", icon: "😵", title: "La déroute face à l'Allemagne", desc: "L'Arabie saoudite subit une humiliation 0-8 face à l'Allemagne lors du match d'ouverture du Mondial 2002 au Japon. La pire défaite de l'histoire de la compétition pour les Saoudiens." },
      { year: "2018", icon: "✈️", title: "Frayeur aérienne en Russie", desc: "L'avion transportant l'équipe saoudienne prend feu en vol lors du Mondial 2018. Tous les passagers sont sains et saufs, mais l'incident fait le tour du monde." },
      { year: "2022", icon: "🤯", title: "Le miracle de Lusail", desc: "L'Arabie saoudite bat l'Argentine de Messi 2-1 lors du match d'ouverture du groupe C. Salem Al-Dawsari inscrit un but somptueux. Le roi décrète un jour férié national. L'un des plus grands upsets de l'histoire du Mondial." },
    ],
  },
  "suisse": {
    strengths: [
      "Granit Xhaka au sommet de son art après ses saisons à Leverkusen, leader incontesté",
      "Solidité défensive remarquable — l'une des meilleures défenses d'Europe en qualifications",
      "Collectif rodé sous Murat Yakin, capable de battre n'importe qui sur un match",
      "Profondeur de banc avec des joueurs dans les top championnats (Akanji, Ndoye, Rieder)",
      "Expérience accumulée : 5e Coupe du Monde consécutive",
      "Mentalité de compétiteur — quarts de finaliste à l'Euro 2020, huitièmes en 2022",
    ],
    weaknesses: [
      "Manque d'un buteur prolifique de classe mondiale",
      "Vieillissement de certains cadres (Xhaka 33 ans, Shaqiri retraité)",
      "Difficulté historique à franchir le cap des quarts de finale",
      "Dépendance excessive au milieu de terrain — vulnérable si Xhaka est neutralisé",
    ],
    anecdotes: [
      { year: "1954", icon: "🏔️", title: "Hôtes et quart-finalistes", desc: "La Suisse organise la Coupe du Monde 1954 et atteint les quarts de finale. Elle est éliminée 7-5 par l'Autriche dans le match le plus prolifique de l'histoire du tournoi (12 buts)." },
      { year: "2006", icon: "🧤", title: "Éliminée sans encaisser un seul but", desc: "En 2006, la Suisse est la seule équipe de l'histoire à être éliminée d'une Coupe du Monde sans avoir encaissé le moindre but. Battue aux tirs au but par l'Ukraine en huitièmes." },
      { year: "2018", icon: "🦅", title: "Le geste de l'aigle qui enflamme", desc: "Xhaka et Shaqiri célèbrent leurs buts contre la Serbie (2-1) avec le geste de l'aigle albanais, déclenchant une immense polémique politique et des amendes FIFA." },
      { year: "2022", icon: "😱", title: "La gifle portugaise", desc: "Après avoir battu le Cameroun et fait match nul avec le Brésil en poules, les Suisses sont éliminés en huitièmes par le Portugal 6-1, une gifle inattendue." },
    ],
  },
  "autriche": {
    strengths: [
      "Ralf Rangnick a transformé l'équipe avec un pressing intense et un jeu offensif spectaculaire",
      "David Alaba, s'il est remis, apporte une expérience unique de vainqueur de Ligue des Champions",
      "Génération dorée : Sabitzer, Laimer, Arnautović, Seiwald dans les meilleurs clubs européens",
      "Esprit collectif exceptionnel — victoire historique contre la France à l'Euro 2024",
      "Capacité à créer des surprises contre les grandes nations",
    ],
    weaknesses: [
      "Manque d'expérience en Coupe du Monde — première participation depuis 1998",
      "Incertitude autour de la forme physique d'Alaba après sa grave blessure au genou",
      "Arnautović vieillissant (37 ans) — qui pour prendre le relais en pointe ?",
      "Profondeur de banc limitée comparée aux grandes nations",
      "Pression d'un premier grand tournoi mondial pour beaucoup de joueurs",
    ],
    anecdotes: [
      { year: "1954", icon: "⚽", title: "12 buts en un match", desc: "En quarts de finale 1954, l'Autriche bat la Suisse 7-5 dans le match le plus prolifique de l'histoire de la Coupe du Monde. Elle terminera 3e du tournoi." },
      { year: "1978", icon: "🇦🇷", title: "Exploit à Córdoba", desc: "L'Autriche bat l'Allemagne de l'Ouest 3-2 à Córdoba en 1978. Hans Krankl inscrit un doublé dont un but de légende. Le commentateur autrichien en perd la voix." },
      { year: "1982", icon: "🤝", title: "Le scandale de Gijón", desc: "L'Autriche est victime du tristement célèbre 'match de la honte' : l'Allemagne et l'Algérie s'arrangent sur un 1-0 qui élimine les Autrichiens. La FIFA imposera ensuite les matchs simultanés." },
      { year: "1998", icon: "🔙", title: "Dernier tour de piste", desc: "L'Autriche participe à la Coupe du Monde 1998 en France, sa dernière avant 2026. Éliminée au premier tour sans victoire, avec une défaite 2-1 contre le Cameroun." },
    ],
  },
  "ecosse": {
    strengths: [
      "Génération talentueuse avec Robertson (Liverpool), McTominay (Napoli), McGinn (Aston Villa)",
      "Ferveur incroyable des supporters — la Tartan Army est l'un des meilleurs publics du monde",
      "Steve Clarke a stabilisé l'équipe et obtenu des qualifications régulières",
      "Solidité tactique et capacité à défendre en bloc organisé",
      "Motivation immense pour briser la malédiction et enfin passer un premier tour",
    ],
    weaknesses: [
      "N'a JAMAIS dépassé la phase de groupes en Coupe du Monde (8 participations)",
      "Manque de profondeur offensive — pas de buteur de premier plan",
      "Traumatisme de l'Euro 2024 (derniers du groupe avec 1 point)",
      "Vulnérabilité sur les transitions rapides face aux grandes équipes",
      "Tendance à craquer dans les moments décisifs en tournoi",
    ],
    anecdotes: [
      { year: "1974", icon: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", title: "Invaincue mais éliminée", desc: "En 1974, l'Écosse est éliminée au premier tour sans perdre un seul match (1 victoire, 2 nuls). Seule la différence de buts la prive du second tour. La malédiction commence." },
      { year: "1978", icon: "🌟", title: "Le chef-d'œuvre d'Archie Gemmill", desc: "Contre les Pays-Bas, Archie Gemmill inscrit un but d'anthologie (slalom fabuleux). L'Écosse gagne 3-2 mais est quand même éliminée à la différence de buts." },
      { year: "1982", icon: "💔", title: "Encore la différence de buts", desc: "En 1982, l'Écosse bat la Nouvelle-Zélande 5-2 et fait match nul avec l'URSS 2-2, mais une défaite 4-1 contre le Brésil la condamne. Troisième élimination cruelle au goal-average." },
      { year: "1998", icon: "🎬", title: "Ouverture du Mondial 98", desc: "L'Écosse a l'honneur d'ouvrir la Coupe du Monde 1998 face au Brésil au Stade de France. Malgré un but de Collins, elle s'incline 2-1 sur un CSC de Boyd." },
    ],
  },
  "norvege": {
    strengths: [
      "Erling Haaland — l'un des meilleurs buteurs de la planète, machine à buts à Manchester City",
      "Martin Ødegaard, capitaine d'Arsenal, créateur d'élite au milieu de terrain",
      "Duo Haaland-Ødegaard potentiellement le plus dangereux du tournoi",
      "Joueurs dans les plus grands clubs européens (Norgaard, Berge, Ajer)",
      "Ståle Solbakken a construit un groupe cohérent et ambitieux",
    ],
    weaknesses: [
      "Défense fragile — talon d'Achille récurrent de cette génération",
      "Manque d'expérience en phase finale (absente depuis 1998)",
      "Dépendance quasi-totale à Haaland et Ødegaard",
      "Profondeur de banc insuffisante au-delà des 13-14 titulaires",
      "Historique d'échecs en qualifications malgré le talent individuel",
    ],
    anecdotes: [
      { year: "1938", icon: "🕰️", title: "Première et cruelle", desc: "Pour sa première Coupe du Monde en 1938, la Norvège est éliminée dès le premier tour par l'Italie tenante du titre (2-1 après prolongation)." },
      { year: "1998", icon: "🇧🇷", title: "Le jour où la Norvège a battu le Brésil", desc: "En phase de groupes 1998, la Norvège bat le Brésil 2-1 grâce à un penalty de Rekdal à la 89e. L'un des plus grands exploits de l'histoire du tournoi pour les Scandinaves." },
      { year: "1998", icon: "⚽", title: "Huitièmes et fin de parcours", desc: "En 1998, la Norvège atteint les huitièmes de finale, son meilleur résultat. Elle est éliminée par l'Italie 1-0 sur un but de Vieri. La dernière apparition en Coupe du Monde avant 2026." },
    ],
  },
  "tunisie": {
    strengths: [
      "Équipe la plus régulière d'Afrique en Coupe du Monde — 6e participation",
      "Solidité défensive et organisation tactique héritées de l'école française",
      "Supporters passionnés qui créent une ambiance de feu, même en déplacement",
      "Joueurs expérimentés dans les championnats européens (Laidouni, Skhiri, Mejbri)",
      "Mémoire de l'exploit contre la France en 2022 — confiance en hausse",
    ],
    weaknesses: [
      "N'a jamais dépassé la phase de groupes en Coupe du Monde",
      "Manque cruel d'efficacité offensive — souvent éliminée faute de buts",
      "Renouvellement générationnel en cours, manque de leaders confirmés",
      "Instabilité au poste de sélectionneur ces dernières années",
    ],
    anecdotes: [
      { year: "1978", icon: "", title: "Pionniers africains", desc: "La Tunisie devient le premier pays africain à remporter un match en Coupe du Monde en battant le Mexique 3-1 en 1978. Un moment historique pour tout le continent." },
      { year: "1998", icon: "🦅", title: "Retour après 20 ans", desc: "La Tunisie revient en Coupe du Monde en 1998 après 20 ans d'absence. Malgré des performances honorables, elle est éliminée au premier tour avec un seul point." },
      { year: "2018", icon: "🎯", title: "Victoire au bout du suspense", desc: "En 2018, la Tunisie bat le Panama 2-1 grâce à un but de Khazri dans les arrêts de jeu. Une victoire du cœur mais insuffisante pour se qualifier au second tour." },
      { year: "2022", icon: "🇫🇷", title: "La France à genoux", desc: "Au Qatar, la Tunisie bat la France 1-0 grâce à Khazri. Une victoire historique mais cruelle : l'Australie l'élimine au même moment dans l'autre match du groupe." },
    ],
  },
  "ghana": {
    strengths: [
      "Tradition footballistique forte — les Black Stars sont toujours compétitifs en Coupe du Monde",
      "Vivier de talents issus de la diaspora européenne (joueurs binationaux)",
      "Expérience de plusieurs phases finales récentes (2006, 2010, 2014, 2022)",
      "Puissance physique et vitesse dans les transitions offensives",
      "Capacité à créer l'exploit face aux grandes nations",
    ],
    weaknesses: [
      "Résultats décevants lors de la Coupe du Monde 2022 (dernier du groupe)",
      "Renouvellement générationnel difficile après les Ayew, Partey",
      "Instabilité institutionnelle à la fédération ghanéenne",
      "Manque de régularité et de constance d'un match à l'autre",
      "Pression énorme sur une nouvelle génération encore inexpérimentée",
    ],
    anecdotes: [
      { year: "2006", icon: "🌟", title: "Première et spectaculaire", desc: "Pour sa première Coupe du Monde en 2006, le Ghana atteint les huitièmes de finale. Les Black Stars battent la République tchèque 2-0 et les États-Unis 2-1, avant de tomber face au Brésil (3-0)." },
      { year: "2010", icon: "✋", title: "La main de Suárez", desc: "En quarts de finale 2010, Suárez arrête un but certain de la main sur la ligne. Gyan manque le penalty. Le Ghana perd aux tirs au but. Toute l'Afrique pleure. Le moment le plus cruel de l'histoire du tournoi." },
      { year: "2014", icon: "💰", title: "L'avion de billets", desc: "En 2014 au Brésil, le gouvernement ghanéen doit envoyer un avion chargé de 3 millions de dollars en cash pour payer les primes des joueurs qui menaçaient de boycotter le dernier match." },
      { year: "2022", icon: "🔥", title: "La revanche manquée contre l'Uruguay", desc: "En 2022, le Ghana retrouve l'Uruguay. André Ayew obtient un penalty pour venger 2010... et le manque. Le Ghana termine dernier du groupe. La malédiction Suárez perdure." },
    ],
  },
  "afrique-du-sud": {
    strengths: [
      "Bafana Bafana en plein renouveau après la qualification à la CAN 2023 (3e place)",
      "Hugo Broos a instauré une nouvelle culture de la gagne et de la discipline",
      "Jeune génération talentueuse et décomplexée (Mokoena, Appollis, Zwane)",
      "Vitesse et puissance athlétique dans toutes les lignes",
      "Motivation de retrouver la Coupe du Monde après une longue absence",
    ],
    weaknesses: [
      "Absence de la Coupe du Monde depuis 2010 — manque d'expérience au plus haut niveau",
      "Championnat local (PSL) de niveau inférieur aux ligues européennes",
      "Peu de joueurs évoluant dans les grands championnats européens",
      "Historique défavorable : jamais dépassé la phase de groupes",
      "Gestion de la pression d'un retour sur la scène mondiale",
    ],
    anecdotes: [
      { year: "1998", icon: "🌈", title: "Les débuts de la nation arc-en-ciel", desc: "L'Afrique du Sud participe à sa première Coupe du Monde en 1998, symbole de la réconciliation post-apartheid. Éliminée au premier tour malgré un but mémorable de McCarthy contre le Danemark." },
      { year: "2002", icon: "😢", title: "Éliminée par un point", desc: "En 2002, malgré une victoire contre la Slovénie, Bafana Bafana est éliminée au premier tour pour un petit point. Une occasion manquée avec une génération dorée (McCarthy, Fortune, Radebe)." },
      { year: "2010", icon: "📯", title: "Le pays hôte et les vuvuzelas", desc: "L'Afrique du Sud organise la première Coupe du Monde en Afrique. Tshabalala ouvre le score du premier match du tournoi face au Mexique. Mais les Bafana Bafana deviennent le premier pays hôte éliminé au premier tour." },
    ],
  },
  "qatar": {
    strengths: [
      "Expérience unique d'avoir organisé et disputé la Coupe du Monde 2022",
      "Infrastructures et centre de formation de haut niveau (Aspire Academy)",
      "Équipe habituée aux compétitions internationales (Coupe d'Asie)",
      "Almoez Ali, buteur prolifique et référence offensive",
      "Groupe soudé avec des joueurs qui se connaissent depuis l'académie",
    ],
    weaknesses: [
      "Niveau global insuffisant — pire équipe hôte de l'histoire en 2022 (3 défaites, 0 but marqué en poules ouvertes)",
      "Championnat local faible malgré les investissements",
      "Écart de niveau flagrant avec les nations européennes et sud-américaines",
      "Aucun joueur évoluant dans un grand championnat européen",
      "Difficulté à performer loin de la maison, sans l'avantage du terrain",
    ],
    anecdotes: [
      { year: "2022", icon: "🏟️", title: "Hôte malheureux", desc: "Le Qatar devient le premier pays hôte à perdre le match d'ouverture de la Coupe du Monde (0-2 contre l'Équateur). Il sera aussi le premier hôte éliminé après deux matchs seulement." },
      { year: "2022", icon: "📊", title: "Zéro pointé historique", desc: "3 matchs, 3 défaites, 1 seul but marqué (contre le Sénégal), 7 encaissés. Le Qatar signe la pire performance d'un pays organisateur dans l'histoire de la Coupe du Monde." },
      { year: "2019", icon: "", title: "Champions d'Asie surprise", desc: "Avant le Mondial 2022, le Qatar crée la sensation en remportant la Coupe d'Asie 2019 aux Émirats, battant le Japon 3-1 en finale. Almoez Ali inscrit 9 buts dans le tournoi." },
    ],
  },
  "iran": {
    strengths: [
      "Première puissance du football asiatique, qualifié pour 3 des 4 dernières Coupes du Monde",
      "Mehdi Taremi, buteur d'élite passé par Porto et l'Inter Milan",
      "Solidité défensive et discipline tactique — équipe difficile à manœuvrer",
      "Ferveur populaire immense, l'un des publics les plus passionnés d'Asie",
      "Azmoun et Jahanbakhsh apportent expérience et qualité technique",
    ],
    weaknesses: [
      "Contexte politique instable pouvant perturber la préparation",
      "Manque de profondeur au-delà des 14-15 joueurs cadres",
      "Difficulté historique à passer le premier tour (jamais qualifié en huitièmes)",
      "Vieillissement de la génération dorée (Taremi 33 ans, Azmoun 31 ans)",
    ],
    anecdotes: [
      { year: "1998", icon: "🇺🇸", title: "Iran-USA : le match géopolitique", desc: "En 1998, l'Iran bat les États-Unis 2-1 dans un contexte géopolitique explosif. Les joueurs échangent fleurs et photos d'équipe avant le coup d'envoi. Victoire historique de Daei et ses coéquipiers." },
      { year: "2014", icon: "🇦🇷", title: "À un souffle de l'exploit contre Messi", desc: "En 2014, l'Iran tient l'Argentine en échec jusqu'à la 91e minute, quand Messi délivre un coup franc magistral. L'Iran passe à un cheveu de l'exploit face au futur finaliste." },
      { year: "2018", icon: "🎯", title: "Le Portugal arraché in extremis", desc: "En 2018, l'Iran pousse le Portugal dans ses retranchements. Un but de Quaresma et un penalty de Ronaldo (accordé par la VAR) privent l'Iran d'une qualification historique en huitièmes (1-1)." },
      { year: "2022", icon: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", title: "Victoire émotionnelle contre le Pays de Galles", desc: "En 2022, dans un contexte de protestations en Iran, l'équipe bat le Pays de Galles 2-0 dans le temps additionnel grâce à Cheshmi et Rezaeian. Un match chargé d'émotion." },
    ],
  },
  "colombie": {
    strengths: [
      "Luis Díaz (Liverpool), l'un des ailiers les plus explosifs du monde",
      "Néstor Lorenzo a construit un collectif solide — 28 matchs sans défaite en 2023-2024",
      "Milieu de terrain créatif et technique (James Rodríguez toujours influent, Ríos, Arias)",
      "Finaliste de la Copa América 2024 — preuve du niveau actuel",
      "Tradition de jeu offensif et spectaculaire, public passionné",
      "Profondeur d'effectif avec des joueurs dans les meilleurs championnats européens",
    ],
    weaknesses: [
      "James Rodríguez a 34 ans — peut-il encore tenir physiquement un Mondial ?",
      "Manque d'un buteur de référence depuis Falcao",
      "Tendance à sous-performer en Coupe du Monde par rapport aux attentes",
      "Défense parfois exposée face aux attaques rapides de haut niveau",
    ],
    anecdotes: [
      { year: "1990", icon: "🦊", title: "Higuita et le dribble fatal", desc: "En 1990, le gardien fou René Higuita tente de dribbler Roger Milla à 30 mètres de ses buts. Le Camerounais lui prend le ballon et marque. La Colombie est éliminée en huitièmes." },
      { year: "1994", icon: "😔", title: "Le drame d'Escobar", desc: "Après un CSC d'Andrés Escobar contre les USA (1-2), la Colombie est éliminée au premier tour. De retour en Colombie, Escobar est assassiné. Le moment le plus sombre de l'histoire du football." },
      { year: "2014", icon: "💃", title: "James Rodríguez, roi du Mondial", desc: "En 2014, James Rodríguez éblouit le monde avec 6 buts dont un retourné magistral contre l'Uruguay, élu plus beau but du tournoi. La Colombie atteint les quarts pour la première fois." },
      { year: "2018", icon: "🟥", title: "Sánchez et le carton rouge le plus rapide", desc: "En 2018, Carlos Sánchez reçoit un carton rouge après 3 minutes contre le Japon pour une main dans la surface. La Colombie perd 2-1 mais se qualifie quand même en huitièmes avant de tomber aux penalties contre l'Angleterre." },
    ],
  },
  mexique: {
    strengths: [
      "Pays co-organisateur — soutien massif du public et connaissance parfaite des stades",
      "Santiago Giménez (Feyenoord) — buteur prolifique et leader d'attaque en pleine ascension",
      "Hirving Lozano et Alexis Vega — ailiers rapides et expérimentés",
      "Edson Álvarez (West Ham) — milieu combatif et leader naturel du groupe",
      "17 participations consécutives en Coupe du Monde — expérience inégalée en CONCACAF",
      "Liga MX compétitive assurant un socle solide de joueurs aguerris",
    ],
    weaknesses: [
      "La maldición del quinto partido : jamais passé les huitièmes depuis 1986",
      "Défense centrale manquant de profondeur au plus haut niveau européen",
      "Pression énorme en tant que pays hôte — risque de crispation collective",
      "Renouvellement générationnel incomplet sur certains postes clés",
      "Gardien titulaire pas encore clairement identifié pour 2026",
    ],
    anecdotes: [
      { year: "1970", icon: "🇲🇽", title: "1970 : La fête à domicile", desc: "Le Mexique organise sa première Coupe du Monde et atteint les quarts de finale. Éliminé 4-1 par l'Italie, mais le tournoi reste légendaire grâce au Brésil de Pelé." },
      { year: "1986", icon: "🏟️", title: "1986 : Encore à la maison", desc: "Le Mexique accueille à nouveau le Mondial (initialement prévu en Colombie). Hugo Sánchez et ses coéquipiers atteignent les quarts, éliminés aux tirs au but par l'Allemagne." },
      { year: "1994", icon: "💔", title: "Début de la malédiction des huitièmes", desc: "La Bulgarie élimine le Mexique aux tirs au but en huitièmes. C'est le début d'une série incroyable de 8 éliminations consécutives au même stade de la compétition." },
      { year: "2010", icon: "⚡", title: "Le hors-jeu fantôme de Tevez", desc: "En huitièmes face à l'Argentine, Carlos Tevez marque un but clairement hors-jeu. Le Mexique s'incline 3-1, relançant le débat sur l'assistance vidéo à l'arbitrage." },
      { year: "2018", icon: "🔥", title: "Le séisme Lozano", desc: "Hirving Lozano marque le but de la victoire 1-0 contre l'Allemagne championne en titre. Les célébrations à Mexico sont si intenses qu'elles déclenchent un micro-séisme détecté par les capteurs sismiques de la ville." },
    ],
  },
  "etats-unis": {
    strengths: [
      "Pays co-organisateur — avantage du public dans la majorité des stades américains",
      "Génération dorée : Pulisic (AC Milan), McKennie (Juventus), Reyna (Dortmund), Musah (AC Milan)",
      "Profondeur d'effectif impressionnante avec des joueurs dans les top championnats européens",
      "Condition physique et intensité de jeu exceptionnelles — style athlétique redoutable",
      "Première Coupe du Monde à domicile depuis 1994 — motivation historique",
      "MLS en pleine croissance renforçant la culture football du pays",
    ],
    weaknesses: [
      "Manque d'un vrai buteur de classe mondiale au poste d'avant-centre",
      "Expérience limitée au plus haut niveau malgré le talent individuel",
      "Pression inédite en tant que pays hôte — attentes jamais vues pour le soccer américain",
      "Défense centrale parfois fébrile face aux grandes équipes",
      "Cohésion tactique encore en construction sous Pochettino",
    ],
    anecdotes: [
      { year: "1930", icon: "🥉", title: "Demi-finalistes du tout premier Mondial", desc: "Les États-Unis atteignent les demi-finales de la première Coupe du Monde en Uruguay. Battus 6-1 par l'Argentine, ils terminent 3es d'un tournoi à 13 équipes." },
      { year: "1950", icon: "🤯", title: "L'exploit légendaire contre l'Angleterre", desc: "À Belo Horizonte, les Américains battent l'Angleterre 1-0. L'un des plus grands upsets de l'histoire du football. Certains journaux anglais pensent à une erreur typographique." },
      { year: "1994", icon: "", title: "1994 : Le Mondial qui a tout changé", desc: "À domicile, les USA sortent des poules et atteignent les huitièmes (défaite 1-0 contre le Brésil). Record d'affluence absolue avec 3,59 millions de spectateurs sur le tournoi." },
      { year: "2002", icon: "🇺🇸", title: "Quarts de finale historiques au Japon", desc: "Victoire 2-0 contre le Mexique en huitièmes, puis défaite 1-0 contre l'Allemagne en quarts. Le meilleur parcours américain en Coupe du Monde moderne." },
      { year: "2022", icon: "🔄", title: "Le retour après l'absence de 2018", desc: "Après avoir raté le Mondial 2018, les USA reviennent au Qatar avec la plus jeune équipe du tournoi. Éliminés en huitièmes par les Pays-Bas (3-1)." },
    ],
  },
  canada: {
    strengths: [
      "Alphonso Davies (Bayern Munich) — l'un des latéraux les plus rapides du monde",
      "Jonathan David (Lille puis top club européen) — buteur prolifique et régulier",
      "Pays co-organisateur avec avantage logistique et soutien du public",
      "Équipe jeune et décomplexée, en pleine montée en puissance depuis 2022",
      "Demi-finale de Copa América 2024 — progression confirmée au plus haut niveau continental",
    ],
    weaknesses: [
      "Profondeur d'effectif limitée au-delà des 14-15 meilleurs joueurs",
      "Expérience quasi inexistante en Coupe du Monde (2 participations seulement)",
      "Défense centrale fragile face aux attaques de haut niveau",
      "Pas de culture Coupe du Monde ancrée — gestion de la pression incertaine",
      "Gardien de but pas au niveau des meilleures nations",
    ],
    anecdotes: [
      { year: "1986", icon: "🍁", title: "La première (et longtemps unique) qualification", desc: "Le Canada se qualifie pour la première fois au Mexique en 1986. Trois matchs, trois défaites, zéro but marqué. Il faudra attendre 36 ans pour revoir les Canucks en Coupe du Monde." },
      { year: "2022", icon: "⚡", title: "Le retour après 36 ans d'absence", desc: "Après 36 ans, le Canada revient en Coupe du Monde au Qatar. Éliminé en poules mais avec les honneurs face à la Belgique et la Croatie." },
      { year: "2022", icon: "🔥", title: "Davies : premier but canadien en CDM", desc: "À la 2e minute contre la Croatie, Alphonso Davies inscrit de la tête le tout premier but du Canada en Coupe du Monde. Un moment historique malgré la défaite 4-1." },
      { year: "2024", icon: "", title: "Demi-finale surprise en Copa América", desc: "Invité à la Copa América 2024, le Canada atteint les demi-finales en battant le Venezuela aux tirs au but. Une performance inattendue qui confirme l'essor du football canadien." },
    ],
  },
  japon: {
    strengths: [
      "Effectif massivement expatrié en Europe : Mitoma (Brighton), Kubo (Real Sociedad), Kamada, Doan",
      "Discipline tactique exemplaire et pressing intense — style de jeu résolument moderne",
      "Progression constante : huitièmes en 2018 et 2022, après avoir battu l'Allemagne et l'Espagne",
      "Profondeur remarquable au milieu de terrain et sur les ailes",
      "Excellent état d'esprit collectif et préparation physique méticuleuse",
    ],
    weaknesses: [
      "Difficulté chronique à passer les huitièmes (0 quart de finale en 7 participations)",
      "Défense exposée face aux transitions rapides des grandes nations",
      "Poste d'avant-centre : pas de buteur prolifique de classe mondiale",
      "Gestion émotionnelle défaillante dans les moments décisifs (3 éliminations aux tirs au but)",
      "Joueurs en fin de saison européenne intense — forme physique en question",
    ],
    anecdotes: [
      { year: "2002", icon: "", title: "2002 : Le Japon enflamme ses stades", desc: "Co-organisateur avec la Corée du Sud, le Japon passe les poules pour la première fois et atteint les huitièmes. Défaite 1-0 contre la Turquie devant un public en larmes." },
      { year: "2010", icon: "🎯", title: "Le penalty de la douleur", desc: "En huitièmes face au Paraguay, après un 0-0 accroché, le Japon est éliminé aux tirs au but. Komano rate le penalty décisif. La malédiction des 8es se poursuit." },
      { year: "2018", icon: "💔", title: "La remontada belge en 14 minutes", desc: "Menant 2-0 face à la Belgique en huitièmes, le Japon encaisse 3 buts en 14 minutes dont le dernier à la toute dernière seconde sur contre-attaque. La plus cruelle des éliminations." },
      { year: "2022", icon: "🔥", title: "L'Allemagne et l'Espagne à genoux", desc: "Le Japon bat l'Allemagne (2-1) puis l'Espagne (2-1) en poules au Qatar. Deux remontadas spectaculaires qui stupéfient la planète. Éliminé aux tirs au but par la Croatie en huitièmes." },
      { year: "2022", icon: "🧹", title: "Les vestiaires impeccables", desc: "Après chaque match au Qatar, les joueurs japonais nettoient leur vestiaire et les supporters ramassent les déchets en tribunes. Un exemple de fair-play salué dans le monde entier." },
    ],
  },
  "coree-du-sud": {
    strengths: [
      "Son Heung-min (Tottenham) — superstar mondiale capable de porter l'équipe seul",
      "Kim Min-jae (Bayern Munich) — défenseur central de classe mondiale",
      "Endurance physique exceptionnelle et pressing agressif sur 90 minutes",
      "Tradition de dépassement en Coupe du Monde — demi-finale 2002 comme référence mentale",
      "K-League et expatriés européens offrant un effectif bien équilibré",
    ],
    weaknesses: [
      "Son Heung-min aura 33 ans — dépendance excessive à un joueur vieillissant",
      "Milieu de terrain créatif en manque de relève au plus haut niveau",
      "Résultats irréguliers : brillants un jour, méconnaissables le lendemain",
      "Gardien de but pas encore au niveau des meilleures sélections",
      "Profondeur offensive très insuffisante derrière Son",
    ],
    anecdotes: [
      { year: "2002", icon: "🔴", title: "La folie de 2002 : demi-finale à domicile", desc: "Co-organisateur, la Corée du Sud élimine l'Espagne et l'Italie pour atteindre les demi-finales. Arbitrages très controversés et un pays en fusion totale. 4e place historique." },
      { year: "2010", icon: "⚔️", title: "Premier huitième hors de chez soi", desc: "En Afrique du Sud, la Corée passe les poules et affronte l'Uruguay en huitièmes. Défaite 2-1 malgré un beau parcours. Première qualification hors 2002 pour le 2e tour." },
      { year: "2018", icon: "🤯", title: "L'Allemagne championne mise à terre", desc: "Déjà éliminée, la Corée du Sud bat l'Allemagne tenante du titre 2-0 grâce à deux buts dans le temps additionnel. Kim Young-gwon et Son scellent l'élimination allemande au 1er tour." },
      { year: "2022", icon: "⏱️", title: "Hwang Hee-chan à la 91e minute", desc: "Face au Portugal, la Corée doit absolument gagner. Hwang Hee-chan marque à la 91e minute (2-1). Qualification in extremis pour les huitièmes dans une joie indescriptible." },
    ],
  },
  australie: {
    strengths: [
      "Expérience récente : huitièmes de finale au Qatar en 2022",
      "Solidité physique, combativité et mental d'acier — ne lâche jamais rien",
      "Culture du sport de haut niveau et préparation athlétique excellente",
      "A-League en croissance et joueurs expatriés en Europe pour l'ossature",
      "Capacité prouvée à créer la surprise dans les grands tournois",
    ],
    weaknesses: [
      "Manque criant de stars individuelles au plus haut niveau européen",
      "Effectif vieillissant avec un renouvellement générationnel incertain",
      "Jeu offensif limité — dépendance aux coups de pied arrêtés et transitions",
      "Décalage de niveau entre la confédération AFC et les groupes de Coupe du Monde",
      "Pas de buteur fiable et régulier au niveau international",
    ],
    anecdotes: [
      { year: "2006", icon: "🎉", title: "3 buts en 8 minutes contre le Japon", desc: "Pour leur retour après 32 ans d'absence, les Socceroos battent le Japon 3-1 avec 3 buts dans les 8 dernières minutes. Éliminés en huitièmes par l'Italie sur un penalty controversé à la 93e." },
      { year: "2014", icon: "⚡", title: "La volée du siècle de Tim Cahill", desc: "Face aux Pays-Bas, Tim Cahill inscrit une volée spectaculaire du gauche considérée comme l'un des plus beaux buts de l'histoire de la Coupe du Monde. L'Australie perd 3-2." },
      { year: "2022", icon: "🦘", title: "Retour en huitièmes après 16 ans", desc: "L'Australie se qualifie pour les huitièmes au Qatar avec une victoire 1-0 contre le Danemark. Éliminée 2-1 par l'Argentine de Messi, mais parcours salué." },
      { year: "2022", icon: "🧤", title: "Mat Ryan, le mur australien", desc: "Le gardien Mathew Ryan réalise des arrêts décisifs tout au long du tournoi, permettant à l'Australie de sortir d'un groupe avec la France et le Danemark." },
    ],
  },
  maroc: {
    strengths: [
      "Élan extraordinaire de 2022 — première équipe africaine en demi-finale de Coupe du Monde",
      "Défense de fer : Hakimi (PSG), Mazraoui (Man United), Aguerd — couloirs de classe mondiale",
      "Milieu technique et travailleur : Amrabat, Ounahi, El Khannouss (nouveau joyau)",
      "Walid Regragui — tacticien moderne ayant créé un bloc uni et solidaire",
      "Diaspora européenne offrant profondeur et qualité à chaque poste",
      "Soutien massif du monde arabe et africain — 12e homme garanti partout dans le monde",
    ],
    weaknesses: [
      "Peut-on reproduire l'exploit de 2022 ou était-ce un alignement unique des planètes ?",
      "Avant-centre : toujours pas de buteur régulier de classe mondiale",
      "Passer du statut de surprise à celui de favori change radicalement la donne",
      "Hakimi et les cadres auront un an de plus — fraîcheur physique en question",
      "Le Maroc n'est plus un outsider discret — les adversaires seront préparés",
    ],
    anecdotes: [
      { year: "1986", icon: "🦁", title: "Premier africain en tête de groupe", desc: "Le Maroc termine premier de son groupe devant l'Angleterre, le Portugal et la Pologne. Première équipe africaine à atteindre le 2e tour. Éliminée 1-0 par l'Allemagne sur un coup franc de Matthäus." },
      { year: "1998", icon: "🇲🇦", title: "L'injustice contre la Norvège", desc: "Un but marocain est refusé à tort en fin de match contre la Norvège. Défaite 2-1, le Maroc est éliminé en poules dans la controverse et l'amertume." },
      { year: "2022", icon: "🔥", title: "La Belgique et l'Espagne tombent", desc: "Le Maroc bat la Belgique 2-0 en poules puis élimine l'Espagne aux tirs au but en huitièmes. Bounou arrête tout. Le monde arabe et africain explose de joie." },
      { year: "2022", icon: "", title: "Le Portugal éliminé — l'Afrique en demi-finale", desc: "Youssef En-Nesyri s'envole pour marquer de la tête. Le Maroc bat le Portugal 1-0 et devient la première équipe africaine et arabe en demi-finale de l'histoire." },
      { year: "2022", icon: "❤️", title: "Les joueurs et leurs mères sur la pelouse", desc: "Après chaque victoire au Qatar, les joueurs marocains célèbrent avec leurs mères sur la pelouse. Des images devenues virales et symboles universels de ce parcours unique." },
    ],
  },
  senegal: {
    strengths: [
      "Vainqueur de la CAN 2022 — génération habituée à gagner des matchs décisifs",
      "Vivier de talents en Europe : Gueye, Diallo, Dia, Diedhiou, Jakobs",
      "Aliou Cissé connaît l'équipe par cœur — stabilité exceptionnelle du projet",
      "Physique imposant et intensité — capable de bousculer n'importe qui",
      "Tradition positive en Coupe du Monde : quarts 2002, huitièmes 2022",
    ],
    weaknesses: [
      "Post-Mané : qui sera le leader offensif capable de faire la différence seul ?",
      "Défense centrale en reconstruction après le déclin de Koulibaly",
      "Irrégularité : capable du meilleur comme du pire d'un match à l'autre",
      "Manque de profondeur sur le banc par rapport aux grands favoris",
      "Qualifications africaines toujours périlleuses — rien n'est jamais acquis",
    ],
    anecdotes: [
      { year: "2002", icon: "🦁", title: "Le coup de tonnerre du match d'ouverture", desc: "Pour sa première Coupe du Monde, le Sénégal bat la France championne en titre 1-0. But de Papa Bouba Diop qui célèbre en dansant autour du corner flag. Le monde du foot est sous le choc." },
      { year: "2002", icon: "🌟", title: "Quarts de finale dès la première participation", desc: "Le Sénégal atteint les quarts dès sa première participation, éliminant la Suède en prolongation (2-1, but en or d'Henri Camara). Battu par la Turquie en quarts." },
      { year: "2018", icon: "📊", title: "Éliminé au fair-play — une première mondiale", desc: "Le Sénégal est éliminé en poules au départage du fair-play (cartons jaunes) face au Japon. Première équipe de l'histoire éliminée par ce critère. Injustice ressentie par tout un continent." },
      { year: "2022", icon: "🏅", title: "Victoire et huitièmes — le retour au premier plan", desc: "Vingt ans après 2002, le Sénégal gagne enfin un match de Coupe du Monde en battant le Qatar 3-1. Qualifié pour les huitièmes, éliminé 3-0 par l'Angleterre." },
    ],
  },
  egypte: {
    strengths: [
      "Mohamed Salah (Liverpool) — l'un des meilleurs joueurs du monde, capable de tout changer",
      "Record de titres en Coupe d'Afrique (7 CAN) — ADN de vainqueur ancré dans la culture",
      "Supporters parmi les plus passionnés au monde — ambiance de chaudron garantie",
      "Expatriés européens en hausse : Trezeguet, Marmoush (Eintracht Francfort)",
      "Solidité défensive et organisation tactique sous des sélectionneurs pragmatiques",
    ],
    weaknesses: [
      "Salah aura 34 ans en juin 2026 — dépendance extrême à un seul homme",
      "Parcours en Coupe du Monde famélique : 3 participations, 0 victoire avant 2026",
      "Profondeur d'effectif insuffisante au-delà des 11 titulaires",
      "Championnat égyptien d'un niveau moyen — peu de joueurs au top européen",
      "Qualifications africaines ultra-compétitives — qualification jamais garantie",
    ],
    anecdotes: [
      { year: "1934", icon: "🏛️", title: "Pionniers du continent africain", desc: "L'Égypte participe à la Coupe du Monde 1934 en Italie, devenant la première équipe africaine à jouer un Mondial. Éliminée au 1er tour par la Hongrie (4-2)." },
      { year: "1990", icon: "🇪🇬", title: "Le retour après 56 ans d'absence", desc: "L'Égypte revient en Coupe du Monde en 1990 en Italie. Trois nuls en poules (dont 1-1 face aux Pays-Bas de Gullit) mais éliminée sans victoire. Honorable mais frustrant." },
      { year: "2018", icon: "👑", title: "Salah au Mondial, blessé mais présent", desc: "L'Égypte se qualifie pour la première fois depuis 28 ans. Salah, blessé en finale de C1 par Ramos, joue diminué. Trois défaites en poules, un seul but — celui de Salah contre l'Arabie Saoudite." },
      { year: "2018", icon: "💔", title: "Le rêve brisé en Russie", desc: "Malgré l'euphorie de la qualification, l'Égypte quitte la Russie avec 3 défaites et le sentiment amer que Salah à 100% aurait tout changé." },
    ],
  },
  algerie: {
    strengths: [
      "Champions d'Afrique 2019 — génération victorieuse dont l'esprit persiste dans le groupe",
      "Diaspora française offrant des joueurs formés dans les meilleurs centres européens",
      "Pressing haut et jeu offensif assumé — style attractif et spectaculaire",
      "Public ultra-passionné — 12e homme redoutable en toutes circonstances",
      "Joueurs clés dans de grands championnats européens (Ligue 1, Serie A, Bundesliga)",
    ],
    weaknesses: [
      "Renouvellement post-CAN 2019 difficile — résultats en dents de scie depuis 2021",
      "Mahrez retiré de la sélection — leadership offensif à redéfinir",
      "Manque de régularité au plus haut niveau depuis plusieurs années",
      "Qualifications africaines extrêmement relevées — rien n'est acquis",
      "Défense parfois friable dans les grands rendez-vous internationaux",
    ],
    anecdotes: [
      { year: "1982", icon: "", title: "Victoire historique contre l'Allemagne de l'Ouest", desc: "Pour sa 1ère Coupe du Monde, l'Algérie bat l'Allemagne de l'Ouest 2-1 à Gijón. Rabah Madjer et Lakhdar Belloumi inscrivent les buts. L'un des plus grands exploits de l'histoire du Mondial." },
      { year: "1982", icon: "😤", title: "La disgrâce de Gijón", desc: "L'Allemagne et l'Autriche s'entendent tacitement sur un 1-0 qui élimine l'Algérie. Le scandale mène à l'instauration des derniers matchs de poule joués simultanément." },
      { year: "2010", icon: "🇩🇿", title: "Retour au Mondial après 24 ans", desc: "Après un barrage dramatique contre l'Égypte à Khartoum (1-0), l'Algérie revient en Coupe du Monde. Tout un pays en transe pour cet exploit de la qualification." },
      { year: "2014", icon: "🔥", title: "120 minutes face au futur champion du monde", desc: "En huitièmes au Brésil, l'Algérie pousse l'Allemagne (futur championne) en prolongation. Défaite 2-1 ap, mais Slimani et les Fennecs impressionnent le monde par leur courage." },
      { year: "2014", icon: "🦊", title: "4-2 spectaculaire contre la Corée du Sud", desc: "L'Algérie sort des poules pour la première fois grâce à une victoire 4-2 contre la Corée du Sud. Brahimi, Slimani et Feghouli brillent. Tout le pays s'enflamme." },
    ],
  },
  "cote-divoire": {
    strengths: [
      "Champions d'Afrique 2024 à domicile — confiance et cohésion d'équipe au sommet",
      "Génération talentueuse : Sébastien Haller, Franck Kessié, Simon Adingra",
      "Sélection rodée par le succès récent en CAN — mental de vainqueur",
      "Vivier de joueurs en championnats européens majeurs (Ligue 1, Serie A, Premier League)",
      "Solidité mentale prouvée : parcours chaotique en poules puis triomphe final à la CAN 2024",
    ],
    weaknesses: [
      "Parcours historiquement décevant en CDM — jamais passé les poules en 3 participations",
      "Défense parfois vulnérable face aux attaques rapides et techniques",
      "Manque d'un meneur de jeu créatif au niveau d'un Yaya Touré",
      "Profondeur d'effectif limitée sur certains postes clés",
      "Qualification pour 2026 pas encore assurée — zone Afrique impitoyable",
    ],
    anecdotes: [
      { year: "2006", icon: "🐘", title: "Première qualification avec Drogba", desc: "Portée par Didier Drogba, la Côte d'Ivoire se qualifie pour sa 1ère Coupe du Monde. Dans un groupe avec l'Argentine et les Pays-Bas, les Éléphants sont éliminés en poules malgré une victoire 3-2 contre la Serbie-et-Monténégro." },
      { year: "2006", icon: "🕊️", title: "Drogba et la paix civile", desc: "Après la qualification pour 2006, Drogba appelle à un cessez-le-feu dans la guerre civile ivoirienne. Les armes se taisent temporairement. Le football transcende le sport." },
      { year: "2010", icon: "💔", title: "Le groupe de la mort en Afrique du Sud", desc: "Avec le Brésil, le Portugal et la Corée du Nord, la Côte d'Ivoire ne passe toujours pas les poules. Match nul 0-0 contre le Portugal. Le manque d'efficacité coûte cher." },
      { year: "2014", icon: "⚡", title: "Le penalty grec de la dernière seconde", desc: "Menant 1-0 contre la Grèce à la 74e, la Côte d'Ivoire encaisse un penalty à la 90e+3. Score final 2-1 pour la Grèce. Drogba en larmes pour sa dernière Coupe du Monde." },
      { year: "2014", icon: "🇨🇮", title: "La remontada contre le Japon", desc: "Menée 1-0, la Côte d'Ivoire renverse le Japon 2-1. Drogba entre en jeu et change la dynamique. Wilfried Bony inscrit le doublé. Les Éléphants montrent leur caractère." },
    ],
  },
};
