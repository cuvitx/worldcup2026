import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbSchema } from "@repo/ui/breadcrumb-schema";
import { domains } from "@repo/data/route-mapping";

/* ─── Player Data ─── */
interface PlayerData {
  slug: string;
  name: string;
  fullName: string;
  position: string;
  nationality: string;
  flag: string;
  birthDate: string;
  birthPlace: string;
  club: string;
  clubCountry: string;
  height: string;
  foot: string;
  fifaDebut: string;
  intCaps: string;
  intGoals: string;
  career: { club: string; period: string; note: string }[];
  worldCupHistory: { year: string; team: string; result: string; note: string }[];
  whyDecisive2026: string[];
  playStyle: string[];
  faq: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

const players: PlayerData[] = [
  {
    slug: "kylian-mbappe",
    name: "Kylian Mbappé",
    fullName: "Kylian Mbappé Lottin",
    position: "Attaquant",
    nationality: "France",
    flag: "🇫🇷",
    birthDate: "20 décembre 1998",
    birthPlace: "Paris, France",
    club: "Real Madrid",
    clubCountry: "Espagne",
    height: "1,78 m",
    foot: "Droit",
    fifaDebut: "2017",
    intCaps: "80+",
    intGoals: "45+",
    career: [
      { club: "AS Monaco", period: "2015–2017", note: "Champion de France 2017, demi-finale de Ligue des Champions" },
      { club: "Paris Saint-Germain", period: "2017–2024", note: "7 titres de Ligue 1, meilleur buteur historique du club" },
      { club: "Real Madrid", period: "2024–", note: "Transfert libre, projet galactique" },
    ],
    worldCupHistory: [
      { year: "2018", team: "France", result: "🏆 Champion du monde", note: "4 buts dont un en finale, élu meilleur jeune joueur" },
      { year: "2022", team: "France", result: "Finaliste", note: "Triplé historique en finale, 8 buts dans le tournoi, Soulier d'or" },
    ],
    whyDecisive2026: [
      "À 27 ans, il sera dans la plénitude de sa carrière, alliant vitesse explosive et expérience des grands tournois.",
      "Deux Coupes du monde consécutives avec des performances de très haut niveau (12 buts en 2 éditions).",
      "Son transfert au Real Madrid lui apporte une nouvelle dimension dans le jeu collectif au plus haut niveau européen.",
      "Capitaine des Bleus, il porte l'équipe de France comme leader technique et mental.",
    ],
    playStyle: [
      "Vitesse fulgurante : l'un des joueurs les plus rapides du monde, capable de prendre n'importe quel défenseur de vitesse.",
      "Finisseur clinique : frappe puissante des deux pieds, très adroit face au gardien en un-contre-un.",
      "Polyvalence offensive : à l'aise en pointe, sur l'aile gauche ou en soutien d'un avant-centre.",
      "Dribbleur d'élite : ses changements de direction à haute vitesse déstabilisent les défenses les mieux organisées.",
      "Intelligence tactique : ses appels de balle en profondeur et ses décrochages créent des décalages constants.",
    ],
    faq: [
      {
        question: "Mbappé sera-t-il au Mondial 2026 ?",
        answer: "Sauf blessure majeure, Kylian Mbappé sera le capitaine et la star de l'équipe de France pour la Coupe du Monde 2026. Il aura 27 ans, l'âge idéal pour un attaquant de classe mondiale.",
      },
      {
        question: "Combien de buts Mbappé a-t-il marqué en Coupe du monde ?",
        answer: "Kylian Mbappé a inscrit 12 buts en Coupe du monde : 4 en 2018 (dont 1 en finale) et 8 en 2022 (dont un triplé historique en finale). Il est le 4e meilleur buteur de l'histoire du Mondial.",
      },
      {
        question: "Dans quel club joue Mbappé en 2025 ?",
        answer: "Depuis l'été 2024, Kylian Mbappé évolue au Real Madrid en Liga espagnole, après 7 saisons au Paris Saint-Germain.",
      },
    ],
    metaTitle: "Kylian Mbappé — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Découvrez le portrait complet de Kylian Mbappé pour la Coupe du Monde 2026 : parcours, stats en sélection, style de jeu et pourquoi il sera décisif.",
  },
  {
    slug: "lionel-messi",
    name: "Lionel Messi",
    fullName: "Lionel Andrés Messi Cuccittini",
    position: "Attaquant / Meneur de jeu",
    nationality: "Argentine",
    flag: "🇦🇷",
    birthDate: "24 juin 1987",
    birthPlace: "Rosario, Argentine",
    club: "Inter Miami",
    clubCountry: "États-Unis",
    height: "1,70 m",
    foot: "Gauche",
    fifaDebut: "2005",
    intCaps: "180+",
    intGoals: "100+",
    career: [
      { club: "FC Barcelone", period: "2004–2021", note: "10 titres de Liga, 4 Ligues des Champions, 8 Ballons d'Or" },
      { club: "Paris Saint-Germain", period: "2021–2023", note: "1 titre de Ligue 1" },
      { club: "Inter Miami", period: "2023–", note: "Leagues Cup 2023" },
    ],
    worldCupHistory: [
      { year: "2006", team: "Argentine", result: "Quarts de finale", note: "Plus jeune buteur argentin en CDM" },
      { year: "2010", team: "Argentine", result: "Quarts de finale", note: "Capitaine, éliminé par l'Allemagne" },
      { year: "2014", team: "Argentine", result: "Finaliste", note: "Ballon d'Or du tournoi" },
      { year: "2022", team: "Argentine", result: "🏆 Champion du monde", note: "7 buts, 3 passes décisives, meilleur joueur" },
    ],
    whyDecisive2026: [
      "S'il participe (38 ans), ce serait sa 6e Coupe du monde, un record pour l'un des plus grands joueurs de l'histoire.",
      "Champion du monde en titre, sa seule présence galvanise l'équipe d'Argentine.",
      "Sa vision du jeu et sa capacité à délivrer des passes décisives restent intactes malgré l'âge.",
      "Le tournoi se joue en partie aux États-Unis, où il évolue avec l'Inter Miami — il connaît le contexte.",
    ],
    playStyle: [
      "Vision de jeu exceptionnelle : capacité à lire le jeu plusieurs temps à l'avance, passes millimétrées.",
      "Dribble dévastateur : centre de gravité bas, conduite de balle naturelle, quasi impossible à déposséder.",
      "Coups francs : spécialiste des frappes enroulées du pied gauche, dangereux sur chaque coup de pied arrêté.",
      "Faux 9 ou meneur de jeu : évolue désormais en retrait, orchestrant le jeu plutôt qu'en pointe pure.",
    ],
    faq: [
      {
        question: "Messi participera-t-il à la Coupe du Monde 2026 ?",
        answer: "La participation de Lionel Messi à la CDM 2026 n'est pas confirmée. Il aura 38 ans pendant le tournoi. Lui-même a laissé la porte ouverte mais cela dépendra de sa forme physique. Sa présence serait historique : une 6e Coupe du monde.",
      },
      {
        question: "Combien de Coupes du monde Messi a-t-il jouées ?",
        answer: "Lionel Messi a participé à 5 Coupes du monde (2006, 2010, 2014, 2018, 2022), remportant le titre en 2022 au Qatar. Il détient le record de matchs joués en CDM pour un joueur argentin.",
      },
      {
        question: "Messi joue-t-il encore en sélection argentine ?",
        answer: "Messi n'a pas pris sa retraite internationale après la CDM 2022. Il continue d'être sélectionné avec l'Albiceleste quand sa forme le permet. Le sélectionneur Scaloni a indiqué que la porte restait ouverte.",
      },
    ],
    metaTitle: "Lionel Messi — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait complet de Lionel Messi pour la CDM 2026 : 5 Coupes du monde, champion 2022, parcours légendaire au Barça et en sélection argentine.",
  },
  {
    slug: "cristiano-ronaldo",
    name: "Cristiano Ronaldo",
    fullName: "Cristiano Ronaldo dos Santos Aveiro",
    position: "Attaquant",
    nationality: "Portugal",
    flag: "🇵🇹",
    birthDate: "5 février 1985",
    birthPlace: "Funchal, Madère, Portugal",
    club: "Al-Nassr",
    clubCountry: "Arabie saoudite",
    height: "1,87 m",
    foot: "Droit",
    fifaDebut: "2003",
    intCaps: "200+",
    intGoals: "130+",
    career: [
      { club: "Sporting CP", period: "2002–2003", note: "Débuts professionnels" },
      { club: "Manchester United", period: "2003–2009", note: "3 Premier League, 1 Ligue des Champions, 1er Ballon d'Or" },
      { club: "Real Madrid", period: "2009–2018", note: "4 Ligues des Champions, 2 Ligas, meilleur buteur historique du club" },
      { club: "Juventus", period: "2018–2021", note: "2 titres de Serie A" },
      { club: "Manchester United", period: "2021–2022", note: "Retour, 27 buts en 54 matchs" },
      { club: "Al-Nassr", period: "2023–", note: "Saudi Pro League" },
    ],
    worldCupHistory: [
      { year: "2006", team: "Portugal", result: "Demi-finale", note: "1 but, éliminé par la France" },
      { year: "2010", team: "Portugal", result: "Huitièmes de finale", note: "1 but" },
      { year: "2014", team: "Portugal", result: "Phase de groupes", note: "1 but, élimination précoce" },
      { year: "2018", team: "Portugal", result: "Huitièmes de finale", note: "4 buts dont un triplé contre l'Espagne" },
      { year: "2022", team: "Portugal", result: "Quarts de finale", note: "1 but, a commencé les quarts sur le banc" },
    ],
    whyDecisive2026: [
      "S'il est sélectionné (41 ans), ce serait sa 6e Coupe du monde — un record partagé potentiellement avec Messi.",
      "Meilleur buteur de l'histoire en sélection nationale (130+ buts), sa mentalité de compétiteur est unique.",
      "Sa présence physique dans la surface et son jeu de tête restent des atouts majeurs.",
      "Le Portugal dispose d'une génération talentueuse autour de lui (Bernardo Silva, Bruno Fernandes, Rafael Leão).",
    ],
    playStyle: [
      "Jeu aérien dominant : l'un des meilleurs headers de l'histoire du football grâce à sa détente et son timing.",
      "Finisseur dans la surface : repositionnement constant, instinct de buteur pur.",
      "Frappe de loin puissante : capable de marquer de 25-30 mètres avec une frappe sèche et précise.",
      "Physique exceptionnel : même à 40 ans, une condition physique et une discipline athlétique hors normes.",
    ],
    faq: [
      {
        question: "Cristiano Ronaldo sera-t-il au Mondial 2026 ?",
        answer: "La participation de Cristiano Ronaldo à la CDM 2026 reste incertaine. Il aura 41 ans pendant le tournoi. Il a exprimé le souhait de jouer mais la décision dépendra de sa forme et du sélectionneur portugais.",
      },
      {
        question: "Combien de buts Ronaldo a-t-il marqué en Coupe du monde ?",
        answer: "Cristiano Ronaldo a inscrit 8 buts en 5 Coupes du monde (2006, 2010, 2014, 2018, 2022). Son moment le plus mémorable reste son triplé contre l'Espagne en 2018.",
      },
      {
        question: "Ronaldo est-il le meilleur buteur international de l'histoire ?",
        answer: "Oui, Cristiano Ronaldo est le meilleur buteur de l'histoire en sélection nationale avec plus de 130 buts pour le Portugal, un record absolu dans le football masculin.",
      },
    ],
    metaTitle: "Cristiano Ronaldo — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Cristiano Ronaldo pour la CDM 2026 : 5 Coupes du monde, 130+ buts internationaux, parcours au Real Madrid et en sélection du Portugal.",
  },
  {
    slug: "erling-haaland",
    name: "Erling Haaland",
    fullName: "Erling Braut Haaland",
    position: "Avant-centre",
    nationality: "Norvège",
    flag: "🇳🇴",
    birthDate: "21 juillet 2000",
    birthPlace: "Leeds, Angleterre",
    club: "Manchester City",
    clubCountry: "Angleterre",
    height: "1,94 m",
    foot: "Gauche",
    fifaDebut: "2019",
    intCaps: "35+",
    intGoals: "30+",
    career: [
      { club: "Molde FK", period: "2017–2019", note: "Débuts professionnels en Norvège" },
      { club: "RB Salzbourg", period: "2019–2020", note: "Révélation en Ligue des Champions" },
      { club: "Borussia Dortmund", period: "2020–2022", note: "86 buts en 89 matchs" },
      { club: "Manchester City", period: "2022–", note: "Triplé historique 2022-23, 52 buts en une saison" },
    ],
    worldCupHistory: [
      { year: "2022", team: "Norvège", result: "Non qualifié", note: "La Norvège n'a pas réussi à se qualifier pour le Mondial au Qatar" },
    ],
    whyDecisive2026: [
      "À 25 ans, il sera dans la forme de sa vie — c'est potentiellement sa première Coupe du monde si la Norvège se qualifie.",
      "Son ratio buts/matchs est l'un des meilleurs de l'histoire du football moderne.",
      "Sa puissance physique (1,94 m) combinée à sa vitesse en fait un attaquant quasi injouable dans les grands espaces.",
      "L'expérience accumulée à Manchester City sous Guardiola lui donne une maturité tactique unique pour un joueur de son âge.",
    ],
    playStyle: [
      "Prédateur dans la surface : positionnement instinctif, première touche orientée vers le but.",
      "Puissance physique hors norme : courses en profondeur dévastatrices, difficile à contenir pour les défenseurs.",
      "Vitesse surprenante pour sa taille : capable de sprints à plus de 36 km/h.",
      "Ambidextre efficace : frappe des deux pieds avec puissance et précision.",
      "Jeu de tête dominant : sa taille et sa détente lui permettent de scorer sur centres et corners.",
    ],
    faq: [
      {
        question: "La Norvège sera-t-elle qualifiée pour la CDM 2026 ?",
        answer: "Les qualifications européennes pour la CDM 2026 sont en cours. La Norvège fait partie des équipes en lice. Avec Haaland et Ødegaard, elle a des chances sérieuses mais la qualification n'est pas encore assurée.",
      },
      {
        question: "Haaland a-t-il déjà joué une Coupe du monde ?",
        answer: "Non, Erling Haaland n'a jamais participé à une Coupe du monde senior. La Norvège ne s'est pas qualifiée en 2022. La CDM 2026 pourrait être sa première — il avait remporté la Coupe du Monde U-20 avec la Norvège en marquant 9 buts en un match contre le Honduras.",
      },
      {
        question: "Combien de buts Haaland a-t-il marqué avec Manchester City ?",
        answer: "Erling Haaland a battu le record de buts en une saison de Premier League dès sa première année (36 buts en 2022-23). Il continue d'empiler les buts à un rythme exceptionnel avec les Citizens.",
      },
    ],
    metaTitle: "Erling Haaland — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait d'Erling Haaland pour la CDM 2026 : machine à buts de Manchester City, stats record et première Coupe du monde potentielle avec la Norvège.",
  },
  {
    slug: "jude-bellingham",
    name: "Jude Bellingham",
    fullName: "Jude Victor William Bellingham",
    position: "Milieu offensif",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    birthDate: "29 juin 2003",
    birthPlace: "Stourbridge, Angleterre",
    club: "Real Madrid",
    clubCountry: "Espagne",
    height: "1,86 m",
    foot: "Droit",
    fifaDebut: "2020",
    intCaps: "40+",
    intGoals: "5+",
    career: [
      { club: "Birmingham City", period: "2019–2020", note: "Plus jeune joueur de l'histoire du club à 16 ans" },
      { club: "Borussia Dortmund", period: "2020–2023", note: "Plus jeune capitaine de BVB en Bundesliga, titulaire indiscutable" },
      { club: "Real Madrid", period: "2023–", note: "23 buts en Liga dès sa première saison, Ligue des Champions 2024" },
    ],
    worldCupHistory: [
      { year: "2022", team: "Angleterre", result: "Quarts de finale", note: "Titulaire à 19 ans, éliminé par la France" },
    ],
    whyDecisive2026: [
      "À 22 ans seulement, il sera l'un des meilleurs milieux de terrain du monde avec déjà une expérience en CDM.",
      "Sa capacité à marquer et à créer depuis le milieu de terrain en fait un joueur unique dans le football moderne.",
      "L'expérience au Real Madrid, club habitué aux plus grandes échéances, le prépare parfaitement.",
      "L'Angleterre dispose autour de lui d'un effectif extrêmement talentueux (Saka, Foden, Rice, Palmer).",
    ],
    playStyle: [
      "Box-to-box moderne : courses puissantes de la récupération jusqu'à la surface adverse.",
      "Technique et puissance combinées : capable de dribbler, de frapper de loin et de marquer de la tête.",
      "Intelligence de positionnement : se place dans les espaces entre les lignes pour recevoir et créer.",
      "Leadership naturel : présence imposante sur le terrain, pas intimidé par les grands rendez-vous.",
      "Polyvalent au milieu : aussi efficace comme 8, 10 ou même faux 9 selon les besoins de l'équipe.",
    ],
    faq: [
      {
        question: "Quel âge aura Bellingham à la CDM 2026 ?",
        answer: "Jude Bellingham aura 22 ans lors de la Coupe du Monde 2026 (né le 29 juin 2003). Il sera dans une phase ascendante de sa carrière et déjà fort d'une première expérience mondiale en 2022.",
      },
      {
        question: "Bellingham peut-il mener l'Angleterre au titre en 2026 ?",
        answer: "Jude Bellingham est considéré comme le leader technique de la nouvelle génération anglaise. Avec des joueurs comme Saka, Foden et Rice, l'Angleterre fait partie des grands favoris de la CDM 2026.",
      },
      {
        question: "Bellingham joue-t-il au Real Madrid ?",
        answer: "Oui, depuis l'été 2023. Sa première saison a été exceptionnelle avec 23 buts en Liga et la victoire en Ligue des Champions 2024.",
      },
    ],
    metaTitle: "Jude Bellingham — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Jude Bellingham pour la CDM 2026 : prodige du Real Madrid, parcours fulgurant, stats et pourquoi il peut mener l'Angleterre au titre.",
  },
  {
    slug: "vinicius-jr",
    name: "Vinícius Jr",
    fullName: "Vinícius José Paixão de Oliveira Júnior",
    position: "Ailier gauche",
    nationality: "Brésil",
    flag: "🇧🇷",
    birthDate: "12 juillet 2000",
    birthPlace: "São Gonçalo, Brésil",
    club: "Real Madrid",
    clubCountry: "Espagne",
    height: "1,76 m",
    foot: "Droit",
    fifaDebut: "2019",
    intCaps: "35+",
    intGoals: "5+",
    career: [
      { club: "Flamengo", period: "2017–2018", note: "Débuts à 16 ans, transfert record vers l'Europe" },
      { club: "Real Madrid", period: "2018–", note: "2 Ligues des Champions, buteur en finale 2022, candidat Ballon d'Or" },
    ],
    worldCupHistory: [
      { year: "2022", team: "Brésil", result: "Quarts de finale", note: "Titulaire, éliminé par la Croatie aux tirs au but" },
    ],
    whyDecisive2026: [
      "À 25 ans, il sera au sommet de sa carrière, reconnu comme l'un des meilleurs joueurs du monde.",
      "Sa vitesse et ses dribbles sont parmi les plus dévastateurs du football actuel.",
      "Le Brésil, quintuple champion du monde, cherche un 6e titre avec Vinícius comme fer de lance.",
      "Son expérience des grandes finales au Real Madrid (buteur en finale de C1) est un atout majeur.",
    ],
    playStyle: [
      "Dribbleur électrique : changements de rythme et crochets imprévisibles, cauchemar des latéraux droits.",
      "Vitesse pure : l'un des joueurs les plus rapides du monde en conduite de balle.",
      "Finition en progression : de plus en plus décisif devant le but, moins dépendant du dribble pur.",
      "Jeu en un-contre-un : sa capacité à éliminer son vis-à-vis crée des surnombres constants.",
      "Mentalité de grands matchs : décisif dans les moments clés (finales, derbys, matchs couperets).",
    ],
    faq: [
      {
        question: "Vinícius Jr sera-t-il la star du Brésil en 2026 ?",
        answer: "Vinícius Jr est le joueur brésilien le plus en vue depuis plusieurs saisons. À 25 ans lors de la CDM 2026, il devrait être le leader offensif de la Seleção et l'un des favoris pour le Ballon d'Or du tournoi.",
      },
      {
        question: "Vinícius Jr a-t-il remporté le Ballon d'Or ?",
        answer: "Vinícius Jr a été parmi les principaux candidats au Ballon d'Or ces dernières années. Sa progression constante au Real Madrid en fait l'un des favoris récurrents pour cette récompense.",
      },
      {
        question: "Combien de Ligues des Champions Vinícius Jr a-t-il gagnées ?",
        answer: "Vinícius Jr a remporté 2 Ligues des Champions avec le Real Madrid (2022, 2024), inscrivant le but de la victoire en finale en 2022 contre Liverpool.",
      },
    ],
    metaTitle: "Vinícius Jr — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Vinícius Jr pour la CDM 2026 : star du Real Madrid et du Brésil, dribbleur d'exception, stats et ambitions de la Seleção.",
  },
  {
    slug: "bukayo-saka",
    name: "Bukayo Saka",
    fullName: "Bukayo Ayoyinka Saka",
    position: "Ailier droit",
    nationality: "Angleterre",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    birthDate: "5 septembre 2001",
    birthPlace: "Londres, Angleterre",
    club: "Arsenal",
    clubCountry: "Angleterre",
    height: "1,78 m",
    foot: "Gauche",
    fifaDebut: "2020",
    intCaps: "40+",
    intGoals: "10+",
    career: [
      { club: "Arsenal", period: "2019–", note: "Formé au club, titulaire indiscutable, candidat au titre de Premier League" },
    ],
    worldCupHistory: [
      { year: "2022", team: "Angleterre", result: "Quarts de finale", note: "3 buts dans le tournoi, titulaire sur le flanc droit" },
    ],
    whyDecisive2026: [
      "À 24 ans, il sera dans sa pleine maturité — ailier complet, capable de marquer et de créer.",
      "Son association avec Bellingham et Foden forme un trio offensif redoutable pour l'Angleterre.",
      "Sa régularité à Arsenal (performances de haut niveau chaque saison) montre sa fiabilité.",
      "Très à l'aise dans les grands matchs, il a prouvé en CDM 2022 qu'il pouvait briller sur la scène mondiale.",
    ],
    playStyle: [
      "Ailier gaucher sur le côté droit : ses rentrées intérieures créent des occasions de frappe et de passe.",
      "Polyvalence : capable de jouer à droite, à gauche, voire en tant que latéral en cas de besoin.",
      "Créateur prolifique : parmi les meilleurs passeurs décisifs de Premier League.",
      "Dribble précis : pas le plus spectaculaire mais extrêmement efficace dans les un-contre-un.",
      "Maturité précoce : gère la pression avec calme, rarement en difficulté sur les grands rendez-vous.",
    ],
    faq: [
      {
        question: "Bukayo Saka sera-t-il titulaire avec l'Angleterre en 2026 ?",
        answer: "Bukayo Saka est un titulaire indiscutable de l'équipe d'Angleterre depuis la CDM 2022. À 24 ans en 2026, il sera l'un des piliers offensifs des Three Lions.",
      },
      {
        question: "Saka joue-t-il pour Arsenal ?",
        answer: "Oui, Bukayo Saka est formé à Arsenal et y joue depuis ses débuts professionnels en 2019. Il est le joueur emblématique du projet d'Arteta et porte le numéro 7.",
      },
      {
        question: "Combien de buts Saka a-t-il marqué en CDM 2022 ?",
        answer: "Bukayo Saka a inscrit 3 buts lors de la Coupe du Monde 2022 au Qatar, dont un doublé contre l'Iran en phase de groupes. Il a été l'un des meilleurs joueurs anglais du tournoi.",
      },
    ],
    metaTitle: "Bukayo Saka — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Bukayo Saka pour la CDM 2026 : ailier star d'Arsenal et de l'Angleterre, stats, parcours et ambitions mondiales à 24 ans.",
  },
  {
    slug: "pedri",
    name: "Pedri",
    fullName: "Pedro González López",
    position: "Milieu de terrain",
    nationality: "Espagne",
    flag: "🇪🇸",
    birthDate: "25 novembre 2002",
    birthPlace: "Tegueste, Tenerife, Espagne",
    club: "FC Barcelone",
    clubCountry: "Espagne",
    height: "1,74 m",
    foot: "Droit",
    fifaDebut: "2021",
    intCaps: "30+",
    intGoals: "5+",
    career: [
      { club: "UD Las Palmas", period: "2019–2020", note: "Débuts en Segunda División à 16 ans" },
      { club: "FC Barcelone", period: "2020–", note: "Titulaire immédiat, comparé à Iniesta, Golden Boy 2021, Trophée Kopa 2021 & 2022" },
    ],
    worldCupHistory: [
      { year: "2022", team: "Espagne", result: "Huitièmes de finale", note: "Titulaire, éliminé par le Maroc aux tirs au but" },
    ],
    whyDecisive2026: [
      "À 23 ans, il sera le métronome du milieu de terrain espagnol — héritier de Xavi et Iniesta.",
      "Sa capacité à conserver le ballon et à dicter le tempo est essentielle au jeu de possession espagnol.",
      "L'Espagne, championne d'Europe 2024, arrive comme l'un des grands favoris de la CDM 2026.",
      "Sa complémentarité avec Gavi et les jeunes talents espagnols forme le meilleur milieu du tournoi.",
    ],
    playStyle: [
      "Maître du tempo : contrôle le rythme du match, accélère ou ralentit selon les besoins.",
      "Technique balle au pied exceptionnelle : toucher de balle soyeux, quasi impossible à déposséder.",
      "Passes entre les lignes : trouve les attaquants dans les espaces avec une précision chirurgicale.",
      "Intelligence positionnelle : se déplace constamment pour offrir des solutions de passe.",
      "Pressing intelligent : participe activement au jeu sans ballon malgré son profil technique.",
    ],
    faq: [
      {
        question: "Pedri est-il le nouveau Iniesta ?",
        answer: "Pedri est souvent comparé à Andrés Iniesta pour son style de jeu similaire : technique, vision, calme sous pression. Iniesta lui-même a salué les qualités du jeune Espagnol. Pedri a son propre style mais l'héritage est clair.",
      },
      {
        question: "L'Espagne est-elle favorite pour la CDM 2026 ?",
        answer: "L'Espagne fait partie des grands favoris de la CDM 2026, forte de son titre de championne d'Europe 2024 et d'une génération dorée (Pedri, Yamal, Gavi, Rodri). Elle est régulièrement dans le top 3-5 des pronostics.",
      },
      {
        question: "Pedri a-t-il remporté l'Euro 2024 ?",
        answer: "Oui, Pedri a fait partie de l'équipe d'Espagne qui a remporté le Championnat d'Europe 2024 en Allemagne, confirmant le statut de cette génération espagnole.",
      },
    ],
    metaTitle: "Pedri — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Pedri pour la CDM 2026 : milieu de terrain du Barça et de l'Espagne championne d'Europe, héritier d'Iniesta, stats et analyse.",
  },
  {
    slug: "florian-wirtz",
    name: "Florian Wirtz",
    fullName: "Florian Richard Wirtz",
    position: "Milieu offensif / Meneur de jeu",
    nationality: "Allemagne",
    flag: "🇩🇪",
    birthDate: "3 mai 2003",
    birthPlace: "Pulheim, Allemagne",
    club: "Bayer Leverkusen",
    clubCountry: "Allemagne",
    height: "1,76 m",
    foot: "Droit",
    fifaDebut: "2021",
    intCaps: "25+",
    intGoals: "5+",
    career: [
      { club: "1. FC Köln (jeunes)", period: "–2020", note: "Formation" },
      { club: "Bayer Leverkusen", period: "2020–", note: "Plus jeune buteur de Bundesliga (17 ans), saison invincible 2023-24 (Bundesliga + Coupe)" },
    ],
    worldCupHistory: [
      { year: "2022", team: "Allemagne", result: "Non convoqué", note: "Blessé (ligaments croisés), absent du Mondial au Qatar" },
    ],
    whyDecisive2026: [
      "À 23 ans, il sera le joyau du football allemand — la CDM 2026 sera sa première et il arrive affamé.",
      "Sa saison invincible avec Leverkusen (2023-24) a montré qu'il peut porter une équipe entière.",
      "Sa complémentarité avec Musiala offre à l'Allemagne un duo créatif exceptionnel.",
      "L'Allemagne, pays hôte de l'Euro 2024, aura gagné en expérience pour 2026.",
    ],
    playStyle: [
      "Créativité débordante : passes décisives, dribbles courts, frappes lointaines — il peut tout faire offensivement.",
      "Vision de jeu : lit le jeu à une vitesse remarquable, trouve les espaces avant les autres.",
      "Frappe de loin : tir puissant et précis des 20-25 mètres, menace constante.",
      "Agilité et technique : centre de gravité bas, très difficile à déséquilibrer dans les petits espaces.",
      "Maturité impressionnante : gère les grands matchs avec un calme déconcertant pour son âge.",
    ],
    faq: [
      {
        question: "Florian Wirtz sera-t-il au Mondial 2026 ?",
        answer: "Florian Wirtz est l'un des joueurs les plus importants de la nouvelle génération allemande. Sauf blessure, il sera titulaire avec la Mannschaft pour la CDM 2026 — ce sera probablement sa première Coupe du monde.",
      },
      {
        question: "Wirtz va-t-il quitter Leverkusen ?",
        answer: "Florian Wirtz est très courtisé par les plus grands clubs européens (Bayern Munich, Real Madrid, FC Barcelone). Un transfert est probable mais pas encore confirmé. Sa saison invincible avec Leverkusen a fait exploser sa valeur.",
      },
      {
        question: "Wirtz et Musiala, le duo de la CDM 2026 ?",
        answer: "Florian Wirtz et Jamal Musiala forment un duo créatif redoutable pour l'Allemagne. Leur complémentarité (Wirtz en meneur, Musiala en dribbleur) fait de la Mannschaft une équipe offensive très dangereuse.",
      },
    ],
    metaTitle: "Florian Wirtz — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Florian Wirtz pour la CDM 2026 : prodige allemand du Bayer Leverkusen, saison invincible, stats et première Coupe du monde en vue.",
  },
  {
    slug: "lamine-yamal",
    name: "Lamine Yamal",
    fullName: "Lamine Yamal Nasraoui Ebana",
    position: "Ailier droit",
    nationality: "Espagne",
    flag: "🇪🇸",
    birthDate: "13 juillet 2007",
    birthPlace: "Esplugues de Llobregat, Espagne",
    club: "FC Barcelone",
    clubCountry: "Espagne",
    height: "1,80 m",
    foot: "Gauche",
    fifaDebut: "2023",
    intCaps: "20+",
    intGoals: "5+",
    career: [
      { club: "FC Barcelone (La Masia)", period: "–2023", note: "Formation au centre mythique du Barça" },
      { club: "FC Barcelone", period: "2023–", note: "Plus jeune joueur et buteur de l'histoire de la Liga, champion d'Europe 2024 à 17 ans" },
    ],
    worldCupHistory: [
      { year: "2026", team: "Espagne", result: "À venir", note: "Ce sera sa première Coupe du monde — il aura 18 ans" },
    ],
    whyDecisive2026: [
      "À seulement 18 ans, il est déjà l'un des meilleurs ailiers du monde — un talent générationnel.",
      "Champion d'Europe 2024 à 16 ans avec un but en demi-finale, il a déjà prouvé sur la plus grande scène.",
      "Sa combinaison de vitesse, dribble et vision de jeu est exceptionnelle pour son âge.",
      "Le duo Yamal-Pedri avec l'Espagne championne d'Europe peut dominer le tournoi.",
    ],
    playStyle: [
      "Ailier gaucher inversé : rentre sur son pied gauche pour frapper ou servir, très difficile à défendre.",
      "Maturité tactique surréaliste : joue comme un vétéran malgré son très jeune âge.",
      "Vitesse et dribble : élimine ses adversaires avec une facilité déconcertante.",
      "Passe décisive : vision au-delà de son âge, capable de trouver des passes que peu de joueurs voient.",
      "Sang-froid : ne tremble pas dans les grands moments, comme prouvé en demi-finale de l'Euro 2024.",
    ],
    faq: [
      {
        question: "Quel âge aura Lamine Yamal à la CDM 2026 ?",
        answer: "Lamine Yamal aura 18 ans lors de la Coupe du Monde 2026 (né le 13 juillet 2007). Il sera l'un des plus jeunes joueurs du tournoi mais déjà champion d'Europe avec l'Espagne.",
      },
      {
        question: "Yamal est-il le plus jeune champion d'Europe de l'histoire ?",
        answer: "Oui, Lamine Yamal est devenu le plus jeune joueur à participer et à marquer dans un Championnat d'Europe lors de l'Euro 2024, remporté par l'Espagne. Il avait 16 ans.",
      },
      {
        question: "Yamal joue-t-il au FC Barcelone ?",
        answer: "Oui, Lamine Yamal est un pur produit de La Masia, le centre de formation du FC Barcelone. Il est devenu le plus jeune joueur et buteur de l'histoire de la Liga avec le Barça.",
      },
    ],
    metaTitle: "Lamine Yamal — Portrait CDM 2026 | Stats, Parcours & Pronostic",
    metaDescription: "Portrait de Lamine Yamal pour la CDM 2026 : prodige du Barça et de l'Espagne, champion d'Europe à 16 ans, le plus jeune talent du Mondial.",
  },
];

const playersBySlug: Record<string, PlayerData> = {};
for (const p of players) {
  playersBySlug[p.slug] = p;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return players.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) return {};
  return {
    title: player.metaTitle,
    description: player.metaDescription,
    openGraph: {
      title: player.metaTitle,
      description: player.metaDescription,
    },
  };
}

export default async function PortraitPage({ params }: PageProps) {
  const { slug } = await params;
  const player = playersBySlug[slug];
  if (!player) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: player.faq.map((f) => ({
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
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Joueurs", url: "/portrait" },
          { name: player.name, url: `/portrait/${player.slug}` },
        ]}
        baseUrl={domains.fr}
      />

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-white dark:bg-[#0F1923]">
        {/* ─── Hero ─── */}
        <section className="relative bg-gradient-to-br from-[#0A1628] via-[#0F1923] to-[#162A3E] text-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Player Info */}
              <div className="flex-1">
                <p className="text-secondary font-semibold text-sm uppercase tracking-widest mb-2">
                  {player.flag} {player.nationality}
                </p>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
                  {player.name}
                </h1>
                <p className="text-lg text-white/70 mb-6">{player.fullName}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Poste</p>
                    <p className="text-lg font-bold mt-1">{player.position}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Club</p>
                    <p className="text-lg font-bold mt-1">{player.club}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Naissance</p>
                    <p className="text-lg font-bold mt-1">{player.birthDate}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Taille</p>
                    <p className="text-lg font-bold mt-1">{player.height}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                    {player.intCaps} sélections
                  </span>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                    {player.intGoals} buts internationaux
                  </span>
                  <span className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm">
                    Pied {player.foot.toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Parcours ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              ⚽ Parcours en club
            </h2>
            <div className="space-y-4">
              {player.career.map((c, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center gap-3 p-5 rounded-xl bg-gray-50 dark:bg-[#162A3E] border border-gray-100 dark:border-white/5"
                >
                  <div className="md:w-48 shrink-0">
                    <p className="font-bold text-gray-900 dark:text-white">{c.club}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{c.period}</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Stats Coupe du Monde ─── */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🏆 Historique en Coupe du Monde
            </h2>
            {player.worldCupHistory.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {player.worldCupHistory.map((wc, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-extrabold text-accent">{wc.year}</span>
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">
                        {wc.result}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{wc.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                Ce joueur n&apos;a pas encore participé à une Coupe du Monde senior.
              </p>
            )}
          </div>
        </section>

        {/* ─── Pourquoi décisif en 2026 ─── */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🔥 Pourquoi il sera décisif en 2026
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {player.whyDecisive2026.map((reason, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-accent/5 to-transparent border border-accent/10"
                >
                  <span className="text-2xl font-extrabold text-accent shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Style de jeu ─── */}
        <section className="py-12 md:py-16 bg-gray-50 dark:bg-[#0A1628]">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              🎯 Style de jeu
            </h2>
            <div className="space-y-4">
              {player.playStyle.map((style, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start p-4 rounded-xl bg-white dark:bg-[#162A3E] border border-gray-100 dark:border-white/5"
                >
                  <span className="mt-1 w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">{style}</p>
                </div>
              ))}
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
              {player.faq.map((f, i) => (
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
              href="/joueurs"
              className="text-sm text-accent hover:underline"
            >
              ← Tous les joueurs
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
