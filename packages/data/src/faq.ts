// ============================================================================
// FAQ Data — World Cup 2026
// Comprehensive FAQ content in FR/EN/ES for SEO pages.
// Organized by category: tournament, betting, predictions, teams.
// ============================================================================

export interface FaqItem {
  id: string;
  question: { fr: string; en: string; es: string };
  answer: { fr: string; en: string; es: string };
  category: "tournament" | "betting" | "predictions" | "teams";
}

export const faqCategories = {
  tournament: {
    fr: "Le tournoi",
    en: "The Tournament",
    es: "El torneo",
  },
  betting: {
    fr: "Paris sportifs",
    en: "Sports Betting",
    es: "Apuestas deportivas",
  },
  predictions: {
    fr: "Pronostics",
    en: "Predictions",
    es: "Pronosticos",
  },
  teams: {
    fr: "Equipes",
    en: "Teams",
    es: "Equipos",
  },
} as const;

export const faqItems: FaqItem[] = [
  // ============================================================
  // Tournament FAQs
  // ============================================================
  {
    id: "tournament-start",
    question: {
      fr: "Quand commence la Coupe du Monde 2026 ?",
      en: "When does the 2026 World Cup start?",
      es: "Cuando empieza el Mundial 2026?",
    },
    answer: {
      fr: "La Coupe du Monde FIFA 2026 debutera le 11 juin 2026 avec le match d'ouverture au Estadio Azteca de Mexico entre le Mexique et l'Afrique du Sud. Le tournoi se deroulera sur 39 jours, jusqu'a la finale le 19 juillet 2026 au MetLife Stadium de New York/New Jersey. C'est la premiere Coupe du Monde organisee conjointement par trois pays : les Etats-Unis, le Mexique et le Canada.",
      en: "The 2026 FIFA World Cup will kick off on June 11, 2026, with the opening match at Estadio Azteca in Mexico City between Mexico and South Africa. The tournament will span 39 days, concluding with the final on July 19, 2026, at MetLife Stadium in New York/New Jersey. This is the first World Cup ever hosted jointly by three countries: the United States, Mexico, and Canada.",
      es: "La Copa Mundial de la FIFA 2026 comenzara el 11 de junio de 2026 con el partido inaugural en el Estadio Azteca de la Ciudad de Mexico entre Mexico y Sudafrica. El torneo se extendera durante 39 dias, hasta la final el 19 de julio de 2026 en el MetLife Stadium de Nueva York/Nueva Jersey. Es la primera Copa del Mundo organizada conjuntamente por tres paises: Estados Unidos, Mexico y Canada.",
    },
    category: "tournament",
  },
  {
    id: "tournament-teams-count",
    question: {
      fr: "Combien d'equipes participent a la Coupe du Monde 2026 ?",
      en: "How many teams participate in the 2026 World Cup?",
      es: "Cuantos equipos participan en el Mundial 2026?",
    },
    answer: {
      fr: "La Coupe du Monde 2026 accueillera 48 equipes, une premiere dans l'histoire de la competition. Auparavant, le format etait limite a 32 equipes depuis 1998. Ce nouvel elargissement permet a davantage de nations, notamment d'Afrique, d'Asie et de la zone CONCACAF, de participer a la plus grande competition de football au monde. Les 48 equipes sont reparties en 12 groupes de 4 equipes.",
      en: "The 2026 World Cup will feature 48 teams, a first in the competition's history. Previously, the format was limited to 32 teams since 1998. This expansion allows more nations, particularly from Africa, Asia, and the CONCACAF region, to participate in the world's biggest football tournament. The 48 teams are divided into 12 groups of 4 teams each.",
      es: "El Mundial 2026 contara con 48 equipos, una novedad historica en la competicion. Anteriormente, el formato se limitaba a 32 equipos desde 1998. Esta ampliacion permite que mas naciones, especialmente de Africa, Asia y la zona CONCACAF, participen en el mayor torneo de futbol del mundo. Los 48 equipos se reparten en 12 grupos de 4 selecciones cada uno.",
    },
    category: "tournament",
  },
  {
    id: "tournament-format",
    question: {
      fr: "Quel est le format de la Coupe du Monde 2026 (48 equipes, 12 groupes) ?",
      en: "What is the format of the 2026 World Cup (48 teams, 12 groups)?",
      es: "Cual es el formato del Mundial 2026 (48 equipos, 12 grupos)?",
    },
    answer: {
      fr: "Le nouveau format comprend une phase de groupes avec 12 groupes de 4 equipes. Les deux premiers de chaque groupe et les 8 meilleurs troisiemes se qualifient pour les 32es de finale, soit 32 equipes en phase a elimination directe. La competition comporte ensuite des 32es de finale, des huitiemes de finale, des quarts de finale, des demi-finales, un match pour la troisieme place et la finale. Au total, 104 matchs seront joues contre 64 dans le format precedent.",
      en: "The new format features a group stage with 12 groups of 4 teams. The top two from each group plus the 8 best third-placed teams advance to the Round of 32, making 32 teams in the knockout phase. The competition then proceeds through the Round of 32, Round of 16, quarter-finals, semi-finals, a third-place match, and the final. A total of 104 matches will be played, compared to 64 in the previous format.",
      es: "El nuevo formato incluye una fase de grupos con 12 grupos de 4 equipos. Los dos primeros de cada grupo y los 8 mejores terceros clasifican a los dieciseisavos de final, lo que supone 32 equipos en fase eliminatoria. Luego se juegan dieciseisavos, octavos de final, cuartos de final, semifinales, partido por el tercer puesto y la final. En total se disputaran 104 partidos, frente a los 64 del formato anterior.",
    },
    category: "tournament",
  },
  {
    id: "tournament-host",
    question: {
      fr: "Ou se deroule la Coupe du Monde 2026 ?",
      en: "Where is the 2026 World Cup held?",
      es: "Donde se celebra el Mundial 2026?",
    },
    answer: {
      fr: "La Coupe du Monde 2026 est co-organisee par les Etats-Unis, le Canada et le Mexique. La majorite des matchs (60) se joueront aux Etats-Unis dans 11 villes differentes. Le Canada accueillera des matchs a Toronto et Vancouver, tandis que le Mexique recevra des rencontres a Mexico, Guadalajara et Monterrey. La finale se disputera au MetLife Stadium de New York/New Jersey, qui peut accueillir plus de 82 000 spectateurs.",
      en: "The 2026 World Cup is co-hosted by the United States, Canada, and Mexico. The majority of matches (60) will be played in the United States across 11 different cities. Canada will host matches in Toronto and Vancouver, while Mexico will host games in Mexico City, Guadalajara, and Monterrey. The final will be held at MetLife Stadium in New York/New Jersey, which can seat over 82,000 spectators.",
      es: "El Mundial 2026 esta coorganizado por Estados Unidos, Canada y Mexico. La mayoria de los partidos (60) se jugaran en Estados Unidos en 11 ciudades diferentes. Canada acogera partidos en Toronto y Vancouver, mientras que Mexico sera sede en Ciudad de Mexico, Guadalajara y Monterrey. La final se disputara en el MetLife Stadium de Nueva York/Nueva Jersey, con capacidad para mas de 82.000 espectadores.",
    },
    category: "tournament",
  },
  {
    id: "tournament-total-matches",
    question: {
      fr: "Combien de matchs au total seront joues lors de la Coupe du Monde 2026 ?",
      en: "How many total matches will be played at the 2026 World Cup?",
      es: "Cuantos partidos en total se jugaran en el Mundial 2026?",
    },
    answer: {
      fr: "La Coupe du Monde 2026 comportera 104 matchs au total, un record historique. La phase de groupes comprend 72 matchs (12 groupes x 6 matchs), suivie de 16 matchs en 32es de finale, 8 matchs en huitiemes, 4 quarts de finale, 2 demi-finales, le match pour la troisieme place et la finale. Le tournoi s'etend du 11 juin au 19 juillet 2026, ce qui represente pres de 6 semaines de competition.",
      en: "The 2026 World Cup will feature a record 104 matches in total. The group stage includes 72 matches (12 groups x 6 matches), followed by 16 Round-of-32 matches, 8 Round-of-16 matches, 4 quarter-finals, 2 semi-finals, the third-place match, and the final. The tournament runs from June 11 to July 19, 2026, spanning nearly 6 weeks of competition.",
      es: "El Mundial 2026 contara con un total record de 104 partidos. La fase de grupos incluye 72 partidos (12 grupos x 6 partidos), seguidos de 16 partidos de dieciseisavos, 8 de octavos, 4 cuartos de final, 2 semifinales, el partido por el tercer puesto y la final. El torneo se extiende del 11 de junio al 19 de julio de 2026, abarcando casi 6 semanas de competicion.",
    },
    category: "tournament",
  },
  {
    id: "tournament-host-cities",
    question: {
      fr: "Quelles sont les villes hotes de la Coupe du Monde 2026 ?",
      en: "What are the host cities of the 2026 World Cup?",
      es: "Cuales son las ciudades sede del Mundial 2026?",
    },
    answer: {
      fr: "La Coupe du Monde 2026 se jouera dans 16 stades repartis dans 16 villes hotes. Aux Etats-Unis : New York/New Jersey (MetLife Stadium), Los Angeles (SoFi Stadium), Dallas (AT&T Stadium), Houston (NRG Stadium), Atlanta (Mercedes-Benz Stadium), Philadelphia (Lincoln Financial Field), Miami (Hard Rock Stadium), Seattle (Lumen Field), San Francisco (Levi's Stadium), Kansas City (Arrowhead Stadium) et Boston (Gillette Stadium). Au Canada : Toronto (BMO Field) et Vancouver (BC Place). Au Mexique : Mexico (Estadio Azteca), Guadalajara (Estadio Akron) et Monterrey (Estadio BBVA).",
      en: "The 2026 World Cup will be played across 16 stadiums in 16 host cities. In the United States: New York/New Jersey (MetLife Stadium), Los Angeles (SoFi Stadium), Dallas (AT&T Stadium), Houston (NRG Stadium), Atlanta (Mercedes-Benz Stadium), Philadelphia (Lincoln Financial Field), Miami (Hard Rock Stadium), Seattle (Lumen Field), San Francisco Bay Area (Levi's Stadium), Kansas City (Arrowhead Stadium), and Boston (Gillette Stadium). In Canada: Toronto (BMO Field) and Vancouver (BC Place). In Mexico: Mexico City (Estadio Azteca), Guadalajara (Estadio Akron), and Monterrey (Estadio BBVA).",
      es: "El Mundial 2026 se jugara en 16 estadios repartidos en 16 ciudades sede. En Estados Unidos: Nueva York/Nueva Jersey (MetLife Stadium), Los Angeles (SoFi Stadium), Dallas (AT&T Stadium), Houston (NRG Stadium), Atlanta (Mercedes-Benz Stadium), Filadelfia (Lincoln Financial Field), Miami (Hard Rock Stadium), Seattle (Lumen Field), San Francisco (Levi's Stadium), Kansas City (Arrowhead Stadium) y Boston (Gillette Stadium). En Canada: Toronto (BMO Field) y Vancouver (BC Place). En Mexico: Ciudad de Mexico (Estadio Azteca), Guadalajara (Estadio Akron) y Monterrey (Estadio BBVA).",
    },
    category: "tournament",
  },

  // ============================================================
  // Betting FAQs
  // ============================================================
  {
    id: "betting-legal",
    question: {
      fr: "Les paris sportifs sur la Coupe du Monde sont-ils legaux ?",
      en: "Is sports betting on the World Cup legal?",
      es: "Son legales las apuestas deportivas en el Mundial?",
    },
    answer: {
      fr: "La legalite des paris sportifs varie selon les pays. En France, les paris en ligne sont reglementes par l'ANJ (Autorite Nationale des Jeux) et plusieurs operateurs agrees proposent des paris sur la Coupe du Monde. Au Canada et dans de nombreux Etats americains, les paris sportifs sont egalement autorises. Verifiez toujours la legislation locale avant de placer un pari. Nous vous encourageons a jouer de maniere responsable et a ne parier que les sommes que vous pouvez vous permettre de perdre.",
      en: "The legality of sports betting varies by country. In the United States, sports betting is legal in most states following the 2018 Supreme Court ruling, though regulations differ by state. In Canada, single-event sports betting has been legal since 2021. In the UK and most of Europe, licensed bookmakers legally offer World Cup betting. Always check your local laws before placing a bet. We encourage responsible gambling and only wagering amounts you can afford to lose.",
      es: "La legalidad de las apuestas deportivas varia segun el pais. En Espana, las apuestas en linea estan reguladas por la DGOJ (Direccion General de Ordenacion del Juego) y varios operadores con licencia ofrecen apuestas sobre el Mundial. En Latinoamerica, la situacion varia por pais: en Mexico, Colombia y otros, existen regulaciones que permiten las apuestas en linea. Siempre consulta la legislacion local antes de apostar. Te animamos a jugar de forma responsable y a apostar solo lo que puedas permitirte perder.",
    },
    category: "betting",
  },
  {
    id: "betting-how-to",
    question: {
      fr: "Comment parier sur la Coupe du Monde 2026 ?",
      en: "How to bet on the 2026 World Cup?",
      es: "Como apostar en el Mundial 2026?",
    },
    answer: {
      fr: "Pour parier sur la Coupe du Monde 2026, commencez par choisir un bookmaker agree et fiable. Creez un compte, verifiez votre identite et effectuez un depot. Vous pouvez alors parier sur divers marches : vainqueur du tournoi, resultats des matchs (1X2), nombre de buts, buteurs, et bien d'autres options. Comparez les cotes entre plusieurs operateurs pour trouver les meilleures offres. N'oubliez pas de definir un budget et de vous y tenir, et consultez nos guides de pronostics pour affiner vos selections.",
      en: "To bet on the 2026 World Cup, start by choosing a reputable licensed bookmaker. Create an account, verify your identity, and make a deposit. You can then bet on various markets: tournament winner, match results (1X2), total goals, goalscorers, and many other options. Compare odds across multiple bookmakers to find the best value. Remember to set a budget and stick to it, and check our prediction guides to help refine your selections.",
      es: "Para apostar en el Mundial 2026, empieza por elegir una casa de apuestas con licencia y buena reputacion. Crea una cuenta, verifica tu identidad y realiza un deposito. Luego podras apostar en diversos mercados: ganador del torneo, resultados de partidos (1X2), total de goles, goleadores y muchas otras opciones. Compara las cuotas entre varias casas de apuestas para encontrar el mejor valor. Recuerda establecer un presupuesto y cumplirlo, y consulta nuestras guias de pronosticos para mejorar tus selecciones.",
    },
    category: "betting",
  },
  {
    id: "betting-value-bet",
    question: {
      fr: "Qu'est-ce qu'un value bet (pari de valeur) ?",
      en: "What is a value bet?",
      es: "Que es una apuesta de valor (value bet)?",
    },
    answer: {
      fr: "Un value bet (pari de valeur) est un pari ou la probabilite reelle d'un evenement est superieure a ce que les cotes du bookmaker suggerent. Par exemple, si vous estimez qu'une equipe a 50% de chances de gagner mais que les cotes du bookmaker impliquent seulement 40% de probabilite, c'est un value bet. Identifier les value bets de maniere reguliere est la cle d'une strategie de paris rentable a long terme. Nos modeles de predictions basees sur l'ELO vous aident a reperer ces opportunites.",
      en: "A value bet is a wager where the actual probability of an outcome occurring is higher than what the bookmaker's odds suggest. For example, if you believe a team has a 50% chance of winning but the bookmaker's odds imply only a 40% probability, that is a value bet. Consistently identifying value bets is the key to a profitable long-term betting strategy. Our ELO-based prediction models help you spot these opportunities by comparing our probability estimates against bookmaker odds.",
      es: "Una apuesta de valor (value bet) es una apuesta donde la probabilidad real de que ocurra un resultado es mayor de lo que sugieren las cuotas del corredor de apuestas. Por ejemplo, si estimas que un equipo tiene un 50% de probabilidades de ganar pero las cuotas implican solo un 40%, eso es una apuesta de valor. Identificar apuestas de valor de forma consistente es la clave para una estrategia de apuestas rentable a largo plazo. Nuestros modelos de prediccion basados en ELO te ayudan a detectar estas oportunidades.",
    },
    category: "betting",
  },
  {
    id: "betting-odds-format",
    question: {
      fr: "Quels formats de cotes sont utilises pour les paris ?",
      en: "What odds formats are used for betting?",
      es: "Que formatos de cuotas se usan en las apuestas?",
    },
    answer: {
      fr: "Il existe trois formats principaux de cotes dans les paris sportifs. Les cotes decimales (2.50) sont les plus courantes en France et en Europe : votre gain total = mise x cote. Les cotes fractionnelles (3/2) sont populaires au Royaume-Uni : le numerateur indique le profit potentiel par rapport a la mise. Les cotes americaines (+150 ou -200) sont standard aux Etats-Unis : un signe + indique le profit sur une mise de 100$, un signe - indique la mise necessaire pour gagner 100$. La plupart des bookmakers permettent de basculer entre ces formats.",
      en: "There are three main odds formats in sports betting. Decimal odds (2.50) are most common in Europe: your total return = stake x odds. Fractional odds (3/2) are popular in the UK: the numerator shows the potential profit relative to the stake. American odds (+150 or -200) are standard in the US: a + sign indicates the profit on a $100 bet, while a - sign indicates the stake needed to win $100. Most bookmakers allow you to switch between these formats in your account settings.",
      es: "Existen tres formatos principales de cuotas en las apuestas deportivas. Las cuotas decimales (2.50) son las mas comunes en Europa y Latinoamerica: tu ganancia total = apuesta x cuota. Las cuotas fraccionarias (3/2) son populares en el Reino Unido: el numerador indica el beneficio potencial respecto a la apuesta. Las cuotas americanas (+150 o -200) son estandar en EE.UU.: un signo + indica el beneficio con una apuesta de $100, un signo - indica la apuesta necesaria para ganar $100. La mayoria de las casas de apuestas permiten cambiar entre estos formatos.",
    },
    category: "betting",
  },
  {
    id: "betting-welcome-bonus",
    question: {
      fr: "Qu'est-ce qu'un bonus de bienvenue chez un bookmaker ?",
      en: "What is a welcome bonus at a bookmaker?",
      es: "Que es un bono de bienvenida en una casa de apuestas?",
    },
    answer: {
      fr: "Un bonus de bienvenue est une offre promotionnelle proposee aux nouveaux inscrits par les bookmakers. Il peut prendre plusieurs formes : paris gratuits (freebet), bonus sur le premier depot (par exemple, 100% jusqu'a 100EUR), ou remboursement du premier pari perdant. Ces offres sont soumises a des conditions de mise (rollover) qu'il faut remplir avant de pouvoir retirer les gains. Lisez toujours attentivement les conditions generales et comparez les offres des differents operateurs avant de vous inscrire.",
      en: "A welcome bonus is a promotional offer provided by bookmakers to new sign-ups. It can take several forms: free bets, deposit match bonuses (e.g., 100% up to $100), or first-bet insurance where your initial losing bet is refunded. These offers come with wagering requirements (rollover conditions) that must be met before you can withdraw winnings. Always read the terms and conditions carefully and compare offers from different operators before signing up.",
      es: "Un bono de bienvenida es una oferta promocional que las casas de apuestas ofrecen a los nuevos registrados. Puede adoptar varias formas: apuestas gratuitas, bonos sobre el primer deposito (por ejemplo, 100% hasta 100EUR), o reembolso de la primera apuesta perdida. Estas ofertas estan sujetas a requisitos de apuesta (rollover) que deben cumplirse antes de poder retirar las ganancias. Lee siempre los terminos y condiciones con atencion y compara las ofertas de los diferentes operadores antes de registrarte.",
    },
    category: "betting",
  },
  {
    id: "betting-1x2",
    question: {
      fr: "Que signifie 1X2 dans les paris sportifs ?",
      en: "What does 1X2 mean in sports betting?",
      es: "Que significa 1X2 en las apuestas deportivas?",
    },
    answer: {
      fr: "Le 1X2 est le type de pari le plus courant en football. Le '1' represente la victoire de l'equipe a domicile, le 'X' represente le match nul, et le '2' represente la victoire de l'equipe visiteuse. Ce pari se base sur le resultat a l'issue du temps reglementaire (90 minutes + temps additionnel), sans inclure les prolongations ni les tirs au but. C'est un excellent point de depart pour les debutants car il est simple a comprendre et disponible pour chaque match de la Coupe du Monde.",
      en: "1X2 is the most common type of bet in football. The '1' represents a home team win, the 'X' represents a draw, and the '2' represents an away team win. This bet is based on the result at the end of regular time (90 minutes plus stoppage time), excluding extra time and penalty shootouts. It is an excellent starting point for beginners because it is straightforward and available for every World Cup match.",
      es: "El 1X2 es el tipo de apuesta mas comun en el futbol. El '1' representa la victoria del equipo local, la 'X' el empate, y el '2' la victoria del equipo visitante. Esta apuesta se basa en el resultado al final del tiempo reglamentario (90 minutos mas tiempo anadido), sin incluir prorroga ni penaltis. Es un excelente punto de partida para principiantes porque es sencillo de entender y esta disponible para cada partido del Mundial.",
    },
    category: "betting",
  },

  // ============================================================
  // Predictions FAQs
  // ============================================================
  {
    id: "predictions-calculation",
    question: {
      fr: "Comment sont calcules les pronostics sur ce site ?",
      en: "How are predictions calculated on this site?",
      es: "Como se calculan los pronosticos en este sitio?",
    },
    answer: {
      fr: "Nos pronostics sont bases sur un modele statistique utilisant le classement ELO des equipes nationales. Ce systeme attribue un score a chaque equipe en fonction de ses performances historiques, en accordant plus de poids aux matchs recents et aux competitions officielles. Le modele prend en compte la force relative des equipes, l'avantage du terrain, la forme recente et les resultats historiques des confrontations directes. Les probabilites sont ensuite converties en cotes implicites pour faciliter la comparaison avec les cotes des bookmakers.",
      en: "Our predictions are based on a statistical model using the ELO rating system for national teams. This system assigns a score to each team based on their historical performance, giving more weight to recent matches and official competitions. The model accounts for relative team strength, home advantage, recent form, and historical head-to-head results. The probabilities are then converted into implied odds to make it easy to compare with bookmaker odds and identify value bets.",
      es: "Nuestros pronosticos se basan en un modelo estadistico que utiliza el sistema de clasificacion ELO para selecciones nacionales. Este sistema asigna una puntuacion a cada equipo segun su rendimiento historico, otorgando mas peso a los partidos recientes y las competiciones oficiales. El modelo tiene en cuenta la fuerza relativa de los equipos, la ventaja de jugar en casa, la forma reciente y los resultados historicos de enfrentamientos directos. Las probabilidades se convierten en cuotas implicitas para facilitar la comparacion con las cuotas de las casas de apuestas.",
    },
    category: "predictions",
  },
  {
    id: "predictions-elo",
    question: {
      fr: "Qu'est-ce que le classement ELO en football ?",
      en: "What is the ELO rating in football?",
      es: "Que es la clasificacion ELO en el futbol?",
    },
    answer: {
      fr: "Le classement ELO est un systeme de notation initialement developpe pour les echecs par Arpad Elo. Applique au football, il attribue un score numerique a chaque equipe nationale qui evolue apres chaque match en fonction du resultat, de l'importance du match et de la force de l'adversaire. Une victoire contre une equipe mieux classee rapporte plus de points qu'une victoire contre une equipe plus faible. Ce systeme est considere comme plus fiable que le classement FIFA officiel pour predire les resultats des matchs, car il prend mieux en compte la marge de victoire et le contexte des rencontres.",
      en: "The ELO rating is a scoring system originally developed for chess by Arpad Elo. Applied to football, it assigns a numerical score to each national team that changes after every match based on the result, match importance, and opponent strength. A win against a higher-rated team earns more points than a win against a weaker team. This system is considered more reliable than the official FIFA ranking for predicting match outcomes because it better accounts for margin of victory and match context.",
      es: "La clasificacion ELO es un sistema de puntuacion desarrollado originalmente para el ajedrez por Arpad Elo. Aplicado al futbol, asigna una puntuacion numerica a cada seleccion nacional que cambia despues de cada partido segun el resultado, la importancia del partido y la fuerza del rival. Una victoria contra un equipo mejor clasificado otorga mas puntos que contra uno mas debil. Este sistema se considera mas fiable que el ranking oficial de la FIFA para predecir resultados de partidos, ya que tiene mejor en cuenta el margen de victoria y el contexto de los encuentros.",
    },
    category: "predictions",
  },
  {
    id: "predictions-favorites",
    question: {
      fr: "Quelles sont les equipes favorites pour la Coupe du Monde 2026 ?",
      en: "Who are the favorites to win the 2026 World Cup?",
      es: "Cuales son los equipos favoritos para ganar el Mundial 2026?",
    },
    answer: {
      fr: "Selon les bookmakers et notre modele ELO, les principaux favoris pour la Coupe du Monde 2026 sont le Bresil, l'Argentine (tenante du titre), la France, l'Angleterre et l'Espagne (championne d'Europe en titre). L'Allemagne, les Pays-Bas et le Portugal sont egalement consideres comme des pretendants serieux. Les equipes hotes (Etats-Unis, Mexique, Canada) beneficient de l'avantage du terrain et pourraient creer la surprise. Consultez nos pages de pronostics pour les cotes actualisees de chaque equipe.",
      en: "According to bookmakers and our ELO model, the main favorites for the 2026 World Cup are Brazil, Argentina (defending champions), France, England, and Spain (reigning European champions). Germany, the Netherlands, and Portugal are also considered serious contenders. The host nations (USA, Mexico, Canada) benefit from home advantage and could spring surprises. Check our prediction pages for updated odds on every team.",
      es: "Segun las casas de apuestas y nuestro modelo ELO, los principales favoritos para el Mundial 2026 son Brasil, Argentina (campeona defensora), Francia, Inglaterra y Espana (campeona de Europa vigente). Alemania, Paises Bajos y Portugal tambien se consideran serios aspirantes. Las selecciones anfitrionas (Estados Unidos, Mexico, Canada) se benefician de la ventaja local y podrian dar sorpresas. Consulta nuestras paginas de pronosticos para ver las cuotas actualizadas de cada equipo.",
    },
    category: "predictions",
  },
  {
    id: "predictions-accuracy",
    question: {
      fr: "Quelle est la fiabilite des pronostics bases sur l'IA ?",
      en: "How accurate are AI-based predictions?",
      es: "Que tan precisos son los pronosticos basados en IA?",
    },
    answer: {
      fr: "Les modeles statistiques et d'IA comme le notre ont demontre une precision superieure a celle des experts humains sur le long terme. Lors des dernieres Coupes du Monde, les modeles ELO ont correctement predit environ 50-55% des resultats de matchs individuels, ce qui est significatif compte tenu de l'imprevisibilite du football. Toutefois, aucun modele n'est infaillible : les surprises font partie du charme de la competition. Nos predictions sont un outil d'aide a la decision, pas une garantie de resultat. Utilisez-les en complement de votre propre analyse.",
      en: "Statistical and AI models like ours have demonstrated greater accuracy than human experts over the long term. In recent World Cups, ELO-based models have correctly predicted approximately 50-55% of individual match results, which is significant given football's inherent unpredictability. However, no model is infallible: upsets are part of the tournament's charm. Our predictions are a decision-support tool, not a guarantee of results. Use them alongside your own analysis and always bet responsibly.",
      es: "Los modelos estadisticos e IA como el nuestro han demostrado una precision superior a la de los expertos humanos a largo plazo. En los ultimos Mundiales, los modelos basados en ELO han predicho correctamente aproximadamente el 50-55% de los resultados individuales, lo cual es significativo dada la imprevisibilidad inherente al futbol. Sin embargo, ningun modelo es infalible: las sorpresas forman parte del encanto de la competicion. Nuestros pronosticos son una herramienta de apoyo a la decision, no una garantia de resultados. Usalos junto con tu propio analisis y apuesta siempre de forma responsable.",
    },
    category: "predictions",
  },

  // ============================================================
  // Teams FAQs
  // ============================================================
  {
    id: "teams-qualified",
    question: {
      fr: "Quels pays sont qualifies pour la Coupe du Monde 2026 ?",
      en: "Which countries have qualified for the 2026 World Cup?",
      es: "Que paises se han clasificado para el Mundial 2026?",
    },
    answer: {
      fr: "Les 48 places sont attribuees aux confederations selon le schema suivant : UEFA (Europe) 16 places, CAF (Afrique) 9.5, CONMEBOL (Amerique du Sud) 6.5, AFC (Asie) 8.5, CONCACAF (Amerique du Nord et Centrale) 6.5, et OFC (Oceanie) 1.5. Les places en .5 sont decidees par des barrages intercontinentaux. Les trois pays hotes (Etats-Unis, Mexique, Canada) sont automatiquement qualifies. La liste complete des equipes qualifiees peut etre consultee sur notre page equipes, qui est mise a jour au fur et a mesure des qualifications.",
      en: "The 48 spots are allocated across confederations as follows: UEFA (Europe) 16 places, CAF (Africa) 9.5, CONMEBOL (South America) 6.5, AFC (Asia) 8.5, CONCACAF (North and Central America) 6.5, and OFC (Oceania) 1.5. The half-places are decided through intercontinental playoffs. The three host nations (United States, Mexico, Canada) automatically qualify. The complete list of qualified teams can be found on our teams page, which is updated as qualifiers are determined.",
      es: "Las 48 plazas se reparten entre las confederaciones de la siguiente manera: UEFA (Europa) 16 plazas, CAF (Africa) 9.5, CONMEBOL (Sudamerica) 6.5, AFC (Asia) 8.5, CONCACAF (Norte y Centroamerica) 6.5, y OFC (Oceania) 1.5. Las medias plazas se deciden mediante repescas intercontinentales. Los tres paises anfitriones (Estados Unidos, Mexico, Canada) se clasifican automaticamente. La lista completa de equipos clasificados puede consultarse en nuestra pagina de equipos, que se actualiza conforme avanzan las eliminatorias.",
    },
    category: "teams",
  },
  {
    id: "teams-groups-draw",
    question: {
      fr: "Comment les groupes de la Coupe du Monde 2026 ont-ils ete tires au sort ?",
      en: "How were the 2026 World Cup groups drawn?",
      es: "Como se sortearon los grupos del Mundial 2026?",
    },
    answer: {
      fr: "Le tirage au sort de la Coupe du Monde 2026 a eu lieu en decembre 2025 et a reparti les 48 equipes en 12 groupes de 4. Les equipes etaient placees dans 4 chapeaux selon le classement FIFA. Le chapeau 1 contenait les trois pays hotes (Etats-Unis, Mexique, Canada) et les 9 equipes les mieux classees. Des restrictions geographiques empechaient que deux equipes de la meme confederation (sauf l'UEFA) soient dans le meme groupe, et un maximum de deux equipes europeennes par groupe etait autorise.",
      en: "The 2026 World Cup draw took place in December 2025 and distributed the 48 teams into 12 groups of 4. Teams were placed in 4 pots based on the FIFA rankings. Pot 1 contained the three host nations (USA, Mexico, Canada) and the 9 highest-ranked teams. Geographic restrictions prevented two teams from the same confederation (except UEFA) from being in the same group, and a maximum of two European teams per group was allowed.",
      es: "El sorteo del Mundial 2026 se celebro en diciembre de 2025 y distribuyo a los 48 equipos en 12 grupos de 4. Los equipos se colocaron en 4 bombos segun el ranking FIFA. El bombo 1 contenia a los tres paises anfitriones (EE.UU., Mexico, Canada) y los 9 equipos mejor clasificados. Las restricciones geograficas impedian que dos equipos de la misma confederacion (excepto la UEFA) estuvieran en el mismo grupo, y se permitia un maximo de dos equipos europeos por grupo.",
    },
    category: "teams",
  },
  {
    id: "teams-best-third",
    question: {
      fr: "Comment fonctionne la regle des meilleurs troisiemes ?",
      en: "How does the best third-place rule work?",
      es: "Como funciona la regla de los mejores terceros?",
    },
    answer: {
      fr: "Dans le format a 48 equipes et 12 groupes, les deux premiers de chaque groupe (24 equipes) se qualifient automatiquement pour les 32es de finale. Les 8 meilleures equipes classees troisiemes de leur groupe completent le tableau. Le classement des troisiemes se fait selon les criteres suivants dans l'ordre : nombre de points, difference de buts, nombre de buts marques, puis fair-play (cartons). Ce systeme, deja utilise dans les Coupes du Monde a 24 equipes (1986-1994) et a l'Euro, assure que les meilleures equipes progressent meme depuis la troisieme place.",
      en: "In the 48-team, 12-group format, the top two from each group (24 teams) automatically qualify for the Round of 32. The 8 best third-placed teams across all groups complete the bracket. Third-placed teams are ranked by: total points, goal difference, goals scored, then fair play record (cards). This system, previously used in 24-team World Cups (1986-1994) and at the Euros, ensures that the strongest teams advance even from third place in their group.",
      es: "En el formato de 48 equipos y 12 grupos, los dos primeros de cada grupo (24 equipos) clasifican automaticamente a los dieciseisavos de final. Los 8 mejores terceros de todos los grupos completan el cuadro. Los terceros se clasifican segun: puntos totales, diferencia de goles, goles marcados y luego registro de fair play (tarjetas). Este sistema, ya utilizado en los Mundiales de 24 equipos (1986-1994) y en la Eurocopa, asegura que los equipos mas fuertes avancen incluso desde el tercer puesto de su grupo.",
    },
    category: "teams",
  },
  {
    id: "teams-host-nations",
    question: {
      fr: "Quels sont les pays hotes et quel est leur avantage ?",
      en: "What are the host nations and what is their advantage?",
      es: "Cuales son los paises anfitriones y cual es su ventaja?",
    },
    answer: {
      fr: "Les Etats-Unis, le Mexique et le Canada sont les trois pays co-organisateurs de la Coupe du Monde 2026. En tant que pays hotes, leurs equipes nationales sont automatiquement qualifiees sans passer par les eliminatoires. Historiquement, les pays hotes beneficient d'un avantage significatif : le soutien du public, l'absence de deplacement et la familiarite avec les conditions locales. Depuis 1930, aucun pays hote n'a ete elimine en phase de groupes, sauf l'Afrique du Sud en 2010. Le Mexique est place dans le groupe A, les Etats-Unis dans le groupe D et le Canada dans le groupe B.",
      en: "The United States, Mexico, and Canada are the three co-hosts of the 2026 World Cup. As host nations, their national teams automatically qualify without going through the qualifying rounds. Historically, host nations enjoy a significant advantage: crowd support, no travel, and familiarity with local conditions. Since 1930, no host nation has been eliminated in the group stage except South Africa in 2010. Mexico is placed in Group A, the USA in Group D, and Canada in Group B.",
      es: "Estados Unidos, Mexico y Canada son los tres paises coorganizadores del Mundial 2026. Como paises anfitriones, sus selecciones nacionales se clasifican automaticamente sin pasar por las eliminatorias. Historicamente, los paises anfitriones disfrutan de una ventaja significativa: apoyo del publico, ausencia de desplazamientos y familiaridad con las condiciones locales. Desde 1930, ningun pais anfitrion ha sido eliminado en fase de grupos excepto Sudafrica en 2010. Mexico esta en el grupo A, Estados Unidos en el grupo D y Canada en el grupo B.",
    },
    category: "teams",
  },
];
