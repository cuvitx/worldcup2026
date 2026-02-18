// ============================================================================
// FAQ Data — World Cup 2026
// Comprehensive FAQ content in FR/EN/ES for SEO pages.
// Organized by category: tournament, betting, predictions, teams.
// ============================================================================

export interface FaqItem {
  id: string;
  question: { fr: string; en: string; es: string };
  answer: { fr: string; en: string; es: string };
  category: "tournament" | "betting" | "predictions" | "teams" | "travel" | "history" | "watching";
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
    es: "Pronósticos",
  },
  teams: {
    fr: "Équipes",
    en: "Teams",
    es: "Equipos",
  },
  travel: {
    fr: "Voyage et billets",
    en: "Travel & Tickets",
    es: "Viaje y entradas",
  },
  history: {
    fr: "Historique",
    en: "History",
    es: "Historia",
  },
  watching: {
    fr: "Regarder les matchs",
    en: "Watching Matches",
    es: "Ver los partidos",
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
      fr: "La Coupe du Monde FIFA 2026 débutera le 11 juin 2026 avec le match d'ouverture au Estadio Azteca de Mexico entre le Mexique et l'Afrique du Sud. Le tournoi se déroulera sur 39 jours, jusqu'a la finale le 19 juillet 2026 au MetLife Stadium de New York/New Jersey. C'est la première Coupe du Monde organisée conjointement par trois pays : les États-Unis, le Mexique et le Canada.",
      en: "The 2026 FIFA World Cup will kick off on June 11, 2026, with the opening match at Estadio Azteca in Mexico City between Mexico and South Africa. The tournament will span 39 days, concluding with the final on July 19, 2026, at MetLife Stadium in New York/New Jersey. This is the first World Cup ever hosted jointly by three countries: the United States, Mexico, and Canada.",
      es: "La Copa Mundial de la FIFA 2026 comenzara el 11 de junio de 2026 con el partido inaugural en el Estadio Azteca de la Ciudad de Mexico entre Mexico y Sudafrica. El torneo se extendera durante 39 dias, hasta la final el 19 de julio de 2026 en el MetLife Stadium de Nueva York/Nueva Jersey. Es la primera Copa del Mundo organizada conjuntamente por tres paises: Estados Unidos, Mexico y Canada.",
    },
    category: "tournament",
  },
  {
    id: "tournament-teams-count",
    question: {
      fr: "Combien d'équipes participent a la Coupe du Monde 2026 ?",
      en: "How many teams participate in the 2026 World Cup?",
      es: "Cuantos equipos participan en el Mundial 2026?",
    },
    answer: {
      fr: "La Coupe du Monde 2026 accueillera 48 équipes, une première dans l'histoire de la competition. Auparavant, le format était limité a 32 équipes depuis 1998. Ce nouvel élargissement permet a davantage de nations, notamment d'Afrique, d'Asie et de la zone CONCACAF, de participer a la plus grande competition de football au monde. Les 48 équipes sont réparties en 12 groupes de 4 équipes.",
      en: "The 2026 World Cup will feature 48 teams, a first in the competition's history. Previously, the format was limited to 32 teams since 1998. This expansion allows more nations, particularly from Africa, Asia, and the CONCACAF region, to participate in the world's biggest football tournament. The 48 teams are divided into 12 groups of 4 teams each.",
      es: "El Mundial 2026 contara con 48 equipos, una novedad historica en la competicion. Anteriormente, el formato se limitaba a 32 equipos desde 1998. Esta ampliacion permite que mas naciones, especialmente de Africa, Asia y la zona CONCACAF, participen en el mayor torneo de futbol del mundo. Los 48 equipos se reparten en 12 grupos de 4 selecciones cada uno.",
    },
    category: "tournament",
  },
  {
    id: "tournament-format",
    question: {
      fr: "Quel est le format de la Coupe du Monde 2026 (48 équipes, 12 groupes) ?",
      en: "What is the format of the 2026 World Cup (48 teams, 12 groups)?",
      es: "Cual es el formato del Mundial 2026 (48 equipos, 12 grupos)?",
    },
    answer: {
      fr: "Le nouveau format comprend une phase de groupes avec 12 groupes de 4 équipes. Les deux premiers de chaque groupe et les 8 meilleurs troisièmes se qualifient pour les 32es de finale, soit 32 équipes en phase a élimination directe. La competition comporte ensuite des 32es de finale, des huitièmes de finale, des quarts de finale, des demi-finales, un match pour la troisième place et la finale. Au total, 104 matchs seront joues contre 64 dans le format précédent.",
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
      fr: "La Coupe du Monde 2026 est co-organisée par les États-Unis, le Canada et le Mexique. La majorité des matchs (60) se joueront aux États-Unis dans 11 villes différentes. Le Canada accueillera des matchs a Toronto et Vancouver, tandis que le Mexique recevra des rencontres a Mexico, Guadalajara et Monterrey. La finale se disputera au MetLife Stadium de New York/New Jersey, qui peut accueillir plus de 82 000 spectateurs.",
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
      fr: "La Coupe du Monde 2026 comportera 104 matchs au total, un record historique. La phase de groupes comprend 72 matchs (12 groupes x 6 matchs), suivie de 16 matchs en 32es de finale, 8 matchs en huitièmes, 4 quarts de finale, 2 demi-finales, le match pour la troisième place et la finale. Le tournoi s'etend du 11 juin au 19 juillet 2026, ce qui represente pres de 6 semaines de competition.",
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
      fr: "La Coupe du Monde 2026 se jouera dans 16 stades répartis dans 16 villes hotes. Aux États-Unis : New York/New Jersey (MetLife Stadium), Los Angeles (SoFi Stadium), Dallas (AT&T Stadium), Houston (NRG Stadium), Atlanta (Mercedes-Benz Stadium), Philadelphia (Lincoln Financial Field), Miami (Hard Rock Stadium), Seattle (Lumen Field), San Francisco (Levi's Stadium), Kansas City (Arrowhead Stadium) et Boston (Gillette Stadium). Au Canada : Toronto (BMO Field) et Vancouver (BC Place). Au Mexique : Mexico (Estadio Azteca), Guadalajara (Estadio Akron) et Monterrey (Estadio BBVA).",
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
      fr: "La legalite des paris sportifs varie selon les pays. En France, les paris en ligne sont reglementes par l'ANJ (Autorite Nationale des Jeux) et plusieurs opérateurs agréés proposent des paris sur la Coupe du Monde. Au Canada et dans de nombreux Etats americains, les paris sportifs sont également autorisés. Verifiez toujours la legislation locale avant de placer un pari. Nous vous encourageons a jouer de manière responsable et a ne parier que les sommes que vous pouvez vous permettre de perdre.",
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
      fr: "Pour parier sur la Coupe du Monde 2026, commencez par choisir un bookmaker agréé et fiable. Creez un compte, verifiez votre identité et effectuez un dépôt. Vous pouvez alors parier sur divers marchés : vainqueur du tournoi, résultats des matchs (1X2), nombre de buts, buteurs, et bien d'autres options. Comparez les cotes entre plusieurs opérateurs pour trouver les meilleures offres. N'oubliez pas de definir un budget et de vous y tenir, et consultez nos guides de pronostics pour affiner vos sélections.",
      en: "To bet on the 2026 World Cup, start by choosing a reputable licensed bookmaker. Create an account, verify your identity, and make a deposit. You can then bet on various markets: tournament winner, match results (1X2), total goals, goalscorers, and many other options. Compare odds across multiple bookmakers to find the best value. Remember to set a budget and stick to it, and check our prediction guides to help refine your sélections.",
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
      fr: "Un value bet (pari de valeur) est un pari ou la probabilité réelle d'un événement est supérieure a ce que les cotes du bookmaker suggèrent. Par exemple, si vous estimez qu'une équipe a 50% de chances de gagner mais que les cotes du bookmaker impliquent seulement 40% de probabilité, c'est un value bet. Identifier les value bets de manière régulière est la cle d'une stratégie de paris rentable a long terme. Nos modeles de predictions basees sur l'ELO vous aident a repérer ces opportunités.",
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
      fr: "Il existe trois formats principaux de cotes dans les paris sportifs. Les cotes decimales (2.50) sont les plus courantes en France et en Europe : votre gain total = mise x cote. Les cotes fractionnelles (3/2) sont populaires au Royaume-Uni : le numérateur indique le profit potentiel par rapport a la mise. Les cotes americaines (+150 ou -200) sont standard aux États-Unis : un signe + indique le profit sur une mise de 100$, un signe - indique la mise nécessaire pour gagner 100$. La plupart des bookmakers permettent de basculer entre ces formats.",
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
      fr: "Un bonus de bienvenue est une offre promotionnelle proposee aux nouveaux inscrits par les bookmakers. Il peut prendre plusieurs formes : paris gratuits (freebet), bonus sur le premier dépôt (par exemple, 100% jusqu'a 100EUR), ou remboursement du premier pari perdant. Ces offres sont soumises a des conditions de mise (rollover) qu'il faut remplir avant de pouvoir retirer les gains. Lisez toujours attentivement les conditions generales et comparez les offres des différents opérateurs avant de vous inscrire.",
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
      fr: "Le 1X2 est le type de pari le plus courant en football. Le '1' represente la victoire de l'équipe a domicile, le 'X' represente le match nul, et le '2' represente la victoire de l'équipe visiteuse. Ce pari se base sur le résultat a l'issue du temps réglementaire (90 minutes + temps additionnel), sans inclure les prolongations ni les tirs au but. C'est un excellent point de depart pour les débutants car il est simple a comprendre et disponible pour chaque match de la Coupe du Monde.",
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
      fr: "Nos pronostics sont bases sur un modele statistique utilisant le classement ELO des équipes nationales. Ce systeme attribue un score a chaque équipe en fonction de ses performances historiques, en accordant plus de poids aux matchs récents et aux competitions officielles. Le modele prend en compte la force relative des équipes, l'avantage du terrain, la forme récente et les résultats historiques des confrontations directes. Les probabilites sont ensuite converties en cotes implicites pour faciliter la comparaison avec les cotes des bookmakers.",
      en: "Our predictions are based on a statistical model using the ELO rating system for national teams. This system assigns a score to each team based on their historical performance, giving more weight to récent matches and official competitions. The model accounts for relative team strength, home advantage, récent form, and historical head-to-head results. The probabilities are then converted into implied odds to make it easy to compare with bookmaker odds and identify value bets.",
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
      fr: "Le classement ELO est un systeme de notation initialement développé pour les échecs par Arpad Elo. Applique au football, il attribue un score numérique a chaque équipe nationale qui évolue apres chaque match en fonction du résultat, de l'importance du match et de la force de l'adversaire. Une victoire contre une équipe mieux classee rapporte plus de points qu'une victoire contre une équipe plus faible. Ce systeme est considéré comme plus fiable que le classement FIFA officiel pour prédire les résultats des matchs, car il prend mieux en compte la marge de victoire et le contexte des rencontres.",
      en: "The ELO rating is a scoring system originally developed for chess by Arpad Elo. Applied to football, it assigns a numerical score to each national team that changes after every match based on the result, match importance, and opponent strength. A win against a higher-rated team earns more points than a win against a weaker team. This system is considered more reliable than the official FIFA ranking for predicting match outcomes because it better accounts for margin of victory and match context.",
      es: "La clasificacion ELO es un sistema de puntuacion desarrollado originalmente para el ajedrez por Arpad Elo. Aplicado al futbol, asigna una puntuacion numerica a cada seleccion nacional que cambia despues de cada partido segun el resultado, la importancia del partido y la fuerza del rival. Una victoria contra un equipo mejor clasificado otorga mas puntos que contra uno mas debil. Este sistema se considera mas fiable que el ranking oficial de la FIFA para predecir resultados de partidos, ya que tiene mejor en cuenta el margen de victoria y el contexto de los encuentros.",
    },
    category: "predictions",
  },
  {
    id: "predictions-favorites",
    question: {
      fr: "Quelles sont les équipes favorites pour la Coupe du Monde 2026 ?",
      en: "Who are the favorites to win the 2026 World Cup?",
      es: "Cuales son los equipos favoritos para ganar el Mundial 2026?",
    },
    answer: {
      fr: "Selon les bookmakers et notre modele ELO, les principaux favoris pour la Coupe du Monde 2026 sont le Bresil, l'Argentine (tenante du titre), la France, l'Angleterre et l'Espagne (championne d'Europe en titre). L'Allemagne, les Pays-Bas et le Portugal sont également considérés comme des pretendants serieux. Les équipes hotes (États-Unis, Mexique, Canada) bénéficient de l'avantage du terrain et pourraient creer la surprise. Consultez nos pages de pronostics pour les cotes actualisees de chaque équipe.",
      en: "According to bookmakers and our ELO model, the main favorites for the 2026 World Cup are Brazil, Argentina (defending champions), France, England, and Spain (reigning European champions). Germany, the Netherlands, and Portugal are also considered serious contenders. The host nations (USA, Mexico, Canada) benefit from home advantage and could spring surprises. Check our prediction pages for updated odds on every team.",
      es: "Segun las casas de apuestas y nuestro modelo ELO, los principales favoritos para el Mundial 2026 son Brasil, Argentina (campeona defensora), Francia, Inglaterra y Espana (campeona de Europa vigente). Alemania, Paises Bajos y Portugal tambien se consideran serios aspirantes. Las selecciones anfitrionas (Estados Unidos, Mexico, Canada) se benefician de la ventaja local y podrian dar sorpresas. Consulta nuestras paginas de pronosticos para ver las cuotas actualizadas de cada equipo.",
    },
    category: "predictions",
  },
  {
    id: "predictions-accuracy",
    question: {
      fr: "Quelle est la fiabilité des pronostics bases sur l'IA ?",
      en: "How accurate are AI-based predictions?",
      es: "Que tan precisos son los pronosticos basados en IA?",
    },
    answer: {
      fr: "Les modeles statistiques et d'IA comme le notre ont demontre une precision supérieure a celle des experts humains sur le long terme. Lors des dernières Coupes du Monde, les modeles ELO ont correctement predit environ 50-55% des résultats de matchs individuels, ce qui est significatif compte tenu de l'imprevisibilite du football. Toutefois, aucun modele n'est infaillible : les surprises font partie du charme de la competition. Nos predictions sont un outil d'aide a la decision, pas une garantie de résultat. Utilisez-les en complement de votre propre analyse.",
      en: "Statistical and AI models like ours have demonstrated greater accuracy than human experts over the long term. In récent World Cups, ELO-based models have correctly predicted approximately 50-55% of individual match results, which is significant given football's inherent unpredictability. However, no model is infallible: upsets are part of the tournament's charm. Our predictions are a decision-support tool, not a guarantee of results. Use them alongside your own analysis and always bet responsibly.",
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
      fr: "Les 48 places sont attribuees aux confederations selon le schema suivant : UEFA (Europe) 16 places, CAF (Afrique) 9.5, CONMEBOL (Amérique du Sud) 6.5, AFC (Asie) 8.5, CONCACAF (Amérique du Nord et Centrale) 6.5, et OFC (Oceanie) 1.5. Les places en .5 sont décidées par des barrages intercontinentaux. Les trois pays hotes (États-Unis, Mexique, Canada) sont automatiquement qualifies. La liste complète des équipes qualifiees peut etre consultee sur notre page équipes, qui est mise a jour au fur et a mesure des qualifications.",
      en: "The 48 spots are allocated across confederations as follows: UEFA (Europe) 16 places, CAF (Africa) 9.5, CONMEBOL (South America) 6.5, AFC (Asia) 8.5, CONCACAF (North and Central America) 6.5, and OFC (Oceania) 1.5. The half-places are decided through intercontinental playoffs. The three host nations (United States, Mexico, Canada) automatically qualify. The complète list of qualified teams can be found on our teams page, which is updated as qualifiers are determined.",
      es: "Las 48 plazas se reparten entre las confederaciones de la siguiente manera: UEFA (Europa) 16 plazas, CAF (Africa) 9.5, CONMEBOL (Sudamerica) 6.5, AFC (Asia) 8.5, CONCACAF (Norte y Centroamerica) 6.5, y OFC (Oceania) 1.5. Las medias plazas se deciden mediante repescas intercontinentales. Los tres paises anfitriones (Estados Unidos, Mexico, Canada) se clasifican automaticamente. La lista completa de equipos clasificados puede consultarse en nuestra pagina de equipos, que se actualiza conforme avanzan las eliminatorias.",
    },
    category: "teams",
  },
  {
    id: "teams-groups-draw",
    question: {
      fr: "Comment les groupes de la Coupe du Monde 2026 ont-ils été tires au sort ?",
      en: "How were the 2026 World Cup groups drawn?",
      es: "Como se sortearon los grupos del Mundial 2026?",
    },
    answer: {
      fr: "Le tirage au sort de la Coupe du Monde 2026 a eu lieu en décembre 2025 et a reparti les 48 équipes en 12 groupes de 4. Les équipes étaient placees dans 4 chapeaux selon le classement FIFA. Le chapeau 1 contenait les trois pays hotes (États-Unis, Mexique, Canada) et les 9 équipes les mieux classées. Des restrictions geographiques empêchaient que deux équipes de la meme confederation (sauf l'UEFA) soient dans le meme groupe, et un maximum de deux équipes europeennes par groupe était autorisé.",
      en: "The 2026 World Cup draw took place in December 2025 and distributed the 48 teams into 12 groups of 4. Teams were placed in 4 pots based on the FIFA rankings. Pot 1 contained the three host nations (USA, Mexico, Canada) and the 9 highest-ranked teams. Geographic restrictions prevented two teams from the same confederation (except UEFA) from being in the same group, and a maximum of two European teams per group was allowed.",
      es: "El sorteo del Mundial 2026 se celebro en diciembre de 2025 y distribuyo a los 48 equipos en 12 grupos de 4. Los equipos se colocaron en 4 bombos segun el ranking FIFA. El bombo 1 contenia a los tres paises anfitriones (EE.UU., Mexico, Canada) y los 9 equipos mejor clasificados. Las restricciones geograficas impedian que dos equipos de la misma confederacion (excepto la UEFA) estuvieran en el mismo grupo, y se permitia un maximo de dos equipos europeos por grupo.",
    },
    category: "teams",
  },
  {
    id: "teams-best-third",
    question: {
      fr: "Comment fonctionne la règle des meilleurs troisièmes ?",
      en: "How does the best third-place rule work?",
      es: "Como funciona la regla de los mejores terceros?",
    },
    answer: {
      fr: "Dans le format a 48 équipes et 12 groupes, les deux premiers de chaque groupe (24 équipes) se qualifient automatiquement pour les 32es de finale. Les 8 meilleures équipes classées troisièmes de leur groupe complètent le tableau. Le classement des troisièmes se fait selon les criteres suivants dans l'ordre : nombre de points, difference de buts, nombre de buts marques, puis fair-play (cartons). Ce systeme, deja utilise dans les Coupes du Monde a 24 équipes (1986-1994) et a l'Euro, assure que les meilleures équipes progressent meme depuis la troisième place.",
      en: "In the 48-team, 12-group format, the top two from each group (24 teams) automatically qualify for the Round of 32. The 8 best third-placed teams across all groups complète the bracket. Third-placed teams are ranked by: total points, goal difference, goals scored, then fair play record (cards). This system, previously used in 24-team World Cups (1986-1994) and at the Euros, ensures that the strongest teams advance even from third place in their group.",
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
      fr: "Les États-Unis, le Mexique et le Canada sont les trois pays co-organisateurs de la Coupe du Monde 2026. En tant que pays hotes, leurs équipes nationales sont automatiquement qualifiees sans passer par les éliminatoires. Historiquement, les pays hotes bénéficient d'un avantage significatif : le soutien du public, l'absence de deplacement et la familiarite avec les conditions locales. Depuis 1930, aucun pays hote n'a été éliminé en phase de groupes, sauf l'Afrique du Sud en 2010. Le Mexique est place dans le groupe A, les États-Unis dans le groupe D et le Canada dans le groupe B.",
      en: "The United States, Mexico, and Canada are the three co-hosts of the 2026 World Cup. As host nations, their national teams automatically qualify without going through the qualifying rounds. Historically, host nations enjoy a significant advantage: crowd support, no travel, and familiarity with local conditions. Since 1930, no host nation has been eliminated in the group stage except South Africa in 2010. Mexico is placed in Group A, the USA in Group D, and Canada in Group B.",
      es: "Estados Unidos, Mexico y Canada son los tres paises coorganizadores del Mundial 2026. Como paises anfitriones, sus selecciones nacionales se clasifican automaticamente sin pasar por las eliminatorias. Historicamente, los paises anfitriones disfrutan de una ventaja significativa: apoyo del publico, ausencia de desplazamientos y familiaridad con las condiciones locales. Desde 1930, ningun pais anfitrion ha sido eliminado en fase de grupos excepto Sudafrica en 2010. Mexico esta en el grupo A, Estados Unidos en el grupo D y Canada en el grupo B.",
    },
    category: "teams",
  },
  {
    id: "teams-france-squad",
    question: {
      fr: "Quelles sont les chances de l'équipe de France à la Coupe du Monde 2026 ?",
      en: "What are France's chances at the 2026 World Cup?",
      es: "Cuales son las posibilidades de Francia en el Mundial 2026?",
    },
    answer: {
      fr: "L'équipe de France fait partie des grands favoris pour la Coupe du Monde 2026. Finaliste en 2022 au Qatar et championne du monde en 2018, les Bleus possèdent un effectif exceptionnel mené par Kylian Mbappé, désormais au Real Madrid. Avec des joueurs comme Aurélien Tchouaméni, Eduardo Camavinga et William Saliba, la France dispose d'un mélange parfait d'expérience et de jeunesse. Le sélectionneur Didier Deschamps, s'il est toujours en poste, aura pour objectif de décrocher une troisième étoile historique. Les bookmakers placent généralement la France dans le top 3 des favoris avec des cotes autour de 6.00 à 8.00.",
      en: "France is among the top favorites for the 2026 World Cup. Finalists in 2022 in Qatar and world champions in 2018, Les Bleus boast an exceptional squad led by Kylian Mbappé, now at Real Madrid. With players like Aurélien Tchouaméni, Eduardo Camavinga, and William Saliba, France has a perfect blend of experience and youth. Coach Didier Deschamps, if still in charge, will aim for a historic third star. Bookmakers generally place France in the top 3 favorites with odds around 6.00 to 8.00.",
      es: "Francia es uno de los grandes favoritos para el Mundial 2026. Finalista en 2022 en Qatar y campeona del mundo en 2018, Les Bleus cuentan con una plantilla excepcional liderada por Kylian Mbappé, ahora en el Real Madrid. Con jugadores como Aurélien Tchouaméni, Eduardo Camavinga y William Saliba, Francia tiene una mezcla perfecta de experiencia y juventud. El seleccionador Didier Deschamps, si sigue al mando, buscará una histórica tercera estrella.",
    },
    category: "teams",
  },
  {
    id: "teams-dark-horses",
    question: {
      fr: "Quelles sont les équipes surprises potentielles (dark horses) du Mondial 2026 ?",
      en: "Who are the potential dark horses at the 2026 World Cup?",
      es: "Cuales son los posibles caballos oscuros del Mundial 2026?",
    },
    answer: {
      fr: "Plusieurs équipes pourraient créer la surprise lors de la Coupe du Monde 2026. Les États-Unis, en tant que pays hôte principal avec une génération dorée (Pulisic, McKennie, Reyna, Musah), sont des candidats sérieux à un parcours historique. Le Japon, impressionnant lors des dernières compétitions, continue de progresser avec des joueurs évoluant dans les meilleurs championnats européens. Le Nigeria et le Maroc, héritiers de l'élan africain initié par le Sénégal et le Maroc au Qatar, pourraient également surprendre. Enfin, la Colombie de Luis Díaz et le Canada à domicile sont à surveiller de près.",
      en: "Several teams could spring surprises at the 2026 World Cup. The United States, as the main host with a golden generation (Pulisic, McKennie, Reyna, Musah), are serious candidates for a historic run. Japan, impressive in recent tournaments, continues to improve with players in top European leagues. Nigeria and Morocco could also surprise. Colombia with Luis Díaz and host nation Canada are worth watching closely.",
      es: "Varios equipos podrían dar la sorpresa en el Mundial 2026. Estados Unidos, como anfitrión principal con una generación dorada, son candidatos serios. Japón sigue mejorando con jugadores en las mejores ligas europeas. Nigeria y Marruecos también podrían sorprender. Colombia con Luis Díaz y Canadá como anfitrión son equipos a seguir de cerca.",
    },
    category: "teams",
  },

  // ============================================================
  // Watching FAQs
  // ============================================================
  {
    id: "watching-france-tv",
    question: {
      fr: "Sur quelle chaîne regarder la Coupe du Monde 2026 en France ?",
      en: "What channel to watch the 2026 World Cup in France?",
      es: "En que canal ver el Mundial 2026 en Francia?",
    },
    answer: {
      fr: "En France, les droits de diffusion de la Coupe du Monde 2026 sont partagés entre TF1 et beIN Sports. TF1 diffusera en clair les matchs de l'équipe de France, le match d'ouverture, les demi-finales et la finale, garantissant un accès gratuit aux moments forts du tournoi. beIN Sports proposera l'intégralité des 104 matchs en direct pour ses abonnés. Il est également possible de suivre les matchs en streaming via les plateformes MyTF1 et beIN Sports Connect. Attention au décalage horaire : les matchs joués aux États-Unis auront lieu en soirée et en début de nuit, heure française.",
      en: "In France, the 2026 World Cup broadcasting rights are shared between TF1 and beIN Sports. TF1 will broadcast France's matches, the opening match, semi-finals and the final on free-to-air TV. beIN Sports will offer all 104 matches live for subscribers. Streaming is available via MyTF1 and beIN Sports Connect.",
      es: "En Francia, los derechos de transmisión del Mundial 2026 se reparten entre TF1 y beIN Sports. TF1 emitirá en abierto los partidos de Francia, el partido inaugural, las semifinales y la final. beIN Sports ofrecerá los 104 partidos en directo para suscriptores.",
    },
    category: "watching",
  },
  {
    id: "watching-streaming",
    question: {
      fr: "Peut-on regarder la Coupe du Monde 2026 en streaming gratuitement ?",
      en: "Can you watch the 2026 World Cup for free via streaming?",
      es: "Se puede ver el Mundial 2026 en streaming gratis?",
    },
    answer: {
      fr: "Oui, il est possible de regarder certains matchs de la Coupe du Monde 2026 gratuitement en streaming depuis la France. TF1 diffuse les matchs majeurs (équipe de France, ouverture, demi-finales, finale) en direct sur sa plateforme MyTF1 accessible gratuitement sur ordinateur, smartphone et tablette. Pour les autres matchs, un abonnement beIN Sports est nécessaire. Méfiez-vous des sites de streaming illégaux qui présentent des risques de sécurité informatique et de qualité médiocre. Certains VPN permettent également d'accéder aux diffuseurs gratuits d'autres pays, mais cette pratique se situe dans une zone grise juridique.",
      en: "Yes, some 2026 World Cup matches can be watched for free via streaming from France. TF1 broadcasts major matches on its free MyTF1 platform. For other matches, a beIN Sports subscription is required. Beware of illegal streaming sites that pose security risks.",
      es: "Sí, algunos partidos del Mundial 2026 se pueden ver gratis en streaming desde Francia. TF1 emite los partidos principales en su plataforma gratuita MyTF1. Para otros partidos se necesita suscripción a beIN Sports.",
    },
    category: "watching",
  },
  {
    id: "watching-timezone",
    question: {
      fr: "Quels sont les horaires des matchs de la Coupe du Monde 2026 pour la France ?",
      en: "What are the 2026 World Cup match times for France?",
      es: "Cuales son los horarios de los partidos del Mundial 2026 para Francia?",
    },
    answer: {
      fr: "Les matchs de la Coupe du Monde 2026 se joueront principalement aux États-Unis, au Canada et au Mexique, avec un décalage horaire de 6 à 9 heures par rapport à la France (heure d'été). Les matchs de phase de groupes débuteront généralement à 18h, 21h et minuit heure française. Les matchs à élimination directe sont programmés en soirée américaine, soit entre 21h et 3h du matin heure de Paris. C'est un créneau plus favorable que la Coupe du Monde 2002 au Japon/Corée du Sud, mais il faudra tout de même veiller tard pour certaines rencontres. Prévoyez vos soirées en conséquence !",
      en: "2026 World Cup matches will mainly be played in the US, Canada and Mexico, with a 6-9 hour time difference from France. Group stage matches will typically start at 6pm, 9pm and midnight French time. Knockout matches are scheduled between 9pm and 3am Paris time.",
      es: "Los partidos del Mundial 2026 se jugarán principalmente en EE.UU., Canadá y México, con 6-9 horas de diferencia con Francia. Los partidos de fase de grupos empezarán generalmente a las 18h, 21h y medianoche hora francesa.",
    },
    category: "watching",
  },
  {
    id: "watching-bars",
    question: {
      fr: "Où regarder les matchs de la Coupe du Monde 2026 dans un bar en France ?",
      en: "Where to watch 2026 World Cup matches in a bar in France?",
      es: "Donde ver los partidos del Mundial 2026 en un bar en Francia?",
    },
    answer: {
      fr: "De nombreux bars et restaurants en France diffuseront les matchs de la Coupe du Monde 2026, surtout ceux de l'équipe de France. Les pubs sportifs et bars à thème football sont les meilleurs endroits pour vivre l'ambiance collective. À Paris, des lieux emblématiques comme le Bombardier, le Corcoran's ou les bars du quartier Bastille sont réputés pour leurs retransmissions. En province, chaque ville a ses bars incontournables. Pensez à réserver votre place à l'avance pour les matchs des Bleus, car les places partent vite ! Des fan zones officielles pourraient également être installées dans les grandes villes françaises comme lors des éditions précédentes.",
      en: "Many bars and restaurants across France will broadcast 2026 World Cup matches, especially France's games. Sports pubs are the best spots for a collective atmosphere. In Paris, iconic venues like Le Bombardier and Corcoran's are well known. Fan zones may also be set up in major French cities.",
      es: "Muchos bares y restaurantes en Francia retransmitirán los partidos del Mundial 2026. Los pubs deportivos son los mejores sitios para vivir el ambiente colectivo. Fan zones oficiales podrían instalarse en las grandes ciudades francesas.",
    },
    category: "watching",
  },

  // ============================================================
  // Travel FAQs
  // ============================================================
  {
    id: "travel-visa-usa",
    question: {
      fr: "Faut-il un visa pour aller voir la Coupe du Monde 2026 aux États-Unis ?",
      en: "Do you need a visa to attend the 2026 World Cup in the USA?",
      es: "Se necesita visa para ir al Mundial 2026 en Estados Unidos?",
    },
    answer: {
      fr: "Pour les citoyens français, un visa n'est généralement pas nécessaire pour un séjour touristique de moins de 90 jours aux États-Unis grâce au programme ESTA (Electronic System for Travel Authorization). L'ESTA coûte 21 dollars et doit être demandé en ligne au moins 72 heures avant le départ. Cependant, la FIFA et le gouvernement américain pourraient mettre en place des dispositions spéciales pour faciliter l'entrée des supporters pendant le tournoi, comme ce fut le cas lors de précédentes Coupes du Monde. Assurez-vous que votre passeport est valide au moins 6 mois après votre date de retour prévue. Pour le Mexique, les Français n'ont pas besoin de visa pour un séjour touristique. Pour le Canada, une AVE (Autorisation de Voyage Électronique) suffit.",
      en: "French citizens generally don't need a visa for tourist stays under 90 days in the USA thanks to the ESTA program ($21). For Mexico, no visa is needed. For Canada, an eTA (Electronic Travel Authorization) is sufficient. Ensure your passport is valid for at least 6 months beyond your return date.",
      es: "Los ciudadanos franceses generalmente no necesitan visa para estancias turísticas de menos de 90 días en EE.UU. gracias al programa ESTA. Para México no se necesita visa. Para Canadá basta una eTA.",
    },
    category: "travel",
  },
  {
    id: "travel-tickets",
    question: {
      fr: "Comment acheter des billets pour la Coupe du Monde 2026 ?",
      en: "How to buy tickets for the 2026 World Cup?",
      es: "Como comprar entradas para el Mundial 2026?",
    },
    answer: {
      fr: "Les billets pour la Coupe du Monde 2026 sont vendus exclusivement via le site officiel de la FIFA (FIFA.com/tickets). Les ventes se déroulent en plusieurs phases : une première phase de tirage au sort, suivie de ventes par ordre d'arrivée. Les prix varient selon la catégorie et le stade du tournoi, allant d'environ 50 dollars pour les matchs de phase de groupes en catégorie 4 à plus de 1 500 dollars pour la finale en catégorie 1. La FIFA propose également des forfaits « Follow My Team » permettant de suivre une équipe tout au long du tournoi. Attention aux revendeurs non autorisés : n'achetez jamais de billets en dehors des canaux officiels pour éviter les arnaques.",
      en: "Tickets are sold exclusively via FIFA.com/tickets in multiple sales phases. Prices range from about $50 for group stage category 4 to over $1,500 for the final in category 1. FIFA also offers 'Follow My Team' packages. Never buy from unauthorized resellers.",
      es: "Las entradas se venden exclusivamente en FIFA.com/tickets en varias fases. Los precios van desde unos 50 dólares para fase de grupos categoría 4 hasta más de 1.500 para la final en categoría 1. Nunca compres a revendedores no autorizados.",
    },
    category: "travel",
  },
  {
    id: "travel-budget",
    question: {
      fr: "Quel budget prévoir pour assister à la Coupe du Monde 2026 depuis la France ?",
      en: "What budget to plan for attending the 2026 World Cup from France?",
      es: "Que presupuesto prever para asistir al Mundial 2026 desde Francia?",
    },
    answer: {
      fr: "Assister à la Coupe du Monde 2026 depuis la France représente un investissement conséquent. Comptez environ 800 à 1 500 euros pour un vol aller-retour vers les États-Unis selon la ville et la période. L'hébergement varie de 100 à 300 euros par nuit en hôtel (les prix augmenteront significativement pendant le tournoi). Les billets de match coûtent entre 50 et 300 euros en moyenne. Ajoutez la nourriture (30-60 euros/jour), les transports locaux et les activités. Un budget réaliste pour une semaine sur place avec 2-3 matchs se situe entre 3 000 et 6 000 euros par personne. Réservez vos vols et hébergements le plus tôt possible pour bénéficier des meilleurs tarifs.",
      en: "Attending the 2026 World Cup from France requires significant investment. Expect €800-1,500 for return flights, €100-300/night for accommodation, €50-300 per match ticket. A realistic budget for one week with 2-3 matches is €3,000-6,000 per person. Book early for the best rates.",
      es: "Asistir al Mundial 2026 desde Francia requiere una inversión considerable. Calcula 800-1.500€ para vuelos, 100-300€/noche en alojamiento, 50-300€ por entrada. Un presupuesto realista para una semana con 2-3 partidos es de 3.000-6.000€ por persona.",
    },
    category: "travel",
  },
  {
    id: "travel-accommodation",
    question: {
      fr: "Où se loger pendant la Coupe du Monde 2026 ?",
      en: "Where to stay during the 2026 World Cup?",
      es: "Donde alojarse durante el Mundial 2026?",
    },
    answer: {
      fr: "Plusieurs options d'hébergement s'offrent aux supporters pour la Coupe du Monde 2026. Les hôtels sont la solution classique mais les prix grimpent fortement pendant l'événement : réservez au moins 6 mois à l'avance. Les locations Airbnb et VRBO offrent souvent un meilleur rapport qualité-prix, surtout pour les groupes. Pour les budgets serrés, les auberges de jeunesse (hostels) sont présentes dans toutes les villes hôtes américaines. Certains supporters optent pour des villes voisines moins chères avec un bon réseau de transport. La FIFA proposera également des packages officiels « hospitality » incluant hébergement et billets. Comparez les quartiers proches des stades et des transports en commun pour optimiser vos déplacements.",
      en: "Several accommodation options are available: hotels (book 6+ months ahead), Airbnb/VRBO rentals (better value for groups), hostels for budget travelers, or nearby cities with good transport links. FIFA will also offer official hospitality packages including accommodation and tickets.",
      es: "Varias opciones de alojamiento están disponibles: hoteles (reservar con 6+ meses de antelación), Airbnb/VRBO, albergues para presupuestos ajustados, o ciudades cercanas con buen transporte. La FIFA ofrecerá paquetes oficiales de hospitalidad.",
    },
    category: "travel",
  },
  {
    id: "travel-transport",
    question: {
      fr: "Comment se déplacer entre les villes hôtes de la Coupe du Monde 2026 ?",
      en: "How to travel between 2026 World Cup host cities?",
      es: "Como desplazarse entre las ciudades sede del Mundial 2026?",
    },
    answer: {
      fr: "Les distances entre les villes hôtes de la Coupe du Monde 2026 sont considérables — les États-Unis sont un pays continent. L'avion sera le moyen de transport principal entre les villes éloignées, avec des compagnies low-cost comme Southwest, Spirit et Frontier proposant des vols intérieurs abordables. Pour les villes proches (par exemple New York-Philadelphie-Boston), le train Amtrak ou la voiture de location sont des alternatives viables. À l'intérieur des villes, le métro, les bus et les services de VTC (Uber, Lyft) seront les options principales. Des navettes spéciales vers les stades seront probablement mises en place par les organisateurs. Prévoyez vos déplacements à l'avance et réservez vos vols intérieurs tôt pour éviter les prix gonflés.",
      en: "Distances between host cities are substantial. Domestic flights are the main option, with budget airlines available. For nearby cities (NYC-Philadelphia-Boston), Amtrak trains or rental cars work well. Uber/Lyft and public transit serve within cities. Special stadium shuttles will likely be organized.",
      es: "Las distancias entre ciudades sede son considerables. Los vuelos domésticos son la opción principal. Para ciudades cercanas, trenes Amtrak o coches de alquiler funcionan bien. Uber/Lyft y transporte público dentro de las ciudades.",
    },
    category: "travel",
  },

  // ============================================================
  // History FAQs
  // ============================================================
  {
    id: "history-winners",
    question: {
      fr: "Quels pays ont remporté la Coupe du Monde de football ?",
      en: "Which countries have won the FIFA World Cup?",
      es: "Que paises han ganado la Copa del Mundo?",
    },
    answer: {
      fr: "Depuis la première édition en 1930, huit nations ont remporté la Coupe du Monde de football. Le Brésil détient le record avec 5 titres (1958, 1962, 1970, 1994, 2002), suivi de l'Allemagne et de l'Italie avec 4 titres chacun. L'Argentine compte 3 victoires (1978, 1986, 2022), la France 2 (1998, 2018), et l'Uruguay 2 (1930, 1950). L'Angleterre (1966) et l'Espagne (2010) complètent le palmarès avec un titre chacun. L'Argentine de Lionel Messi est la tenante du titre après sa victoire épique en finale contre la France au Qatar en 2022, considérée comme l'une des plus belles finales de l'histoire.",
      en: "Eight nations have won the World Cup since 1930. Brazil leads with 5 titles, followed by Germany and Italy with 4 each. Argentina has 3, France and Uruguay 2 each, and England and Spain 1 each. Argentina are the defending champions after the epic 2022 final against France.",
      es: "Ocho naciones han ganado el Mundial desde 1930. Brasil lidera con 5 títulos, seguido de Alemania e Italia con 4. Argentina tiene 3, Francia y Uruguay 2 cada uno, e Inglaterra y España 1 cada uno.",
    },
    category: "history",
  },
  {
    id: "history-france-palmares",
    question: {
      fr: "Quel est le palmarès de la France en Coupe du Monde ?",
      en: "What is France's World Cup record?",
      es: "Cual es el palmarés de Francia en el Mundial?",
    },
    answer: {
      fr: "La France a remporté la Coupe du Monde à deux reprises. La première victoire, en 1998 à domicile, reste gravée dans la mémoire collective avec la finale 3-0 contre le Brésil et le doublé de Zinédine Zidane. Vingt ans plus tard, en 2018 en Russie, les Bleus de Didier Deschamps ont triomphé 4-2 en finale face à la Croatie, avec un Kylian Mbappé de 19 ans devenu le deuxième plus jeune buteur en finale après Pelé. En 2022, la France a disputé une finale mémorable contre l'Argentine (3-3, défaite aux tirs au but) avec un triplé historique de Mbappé. Les Bleus ont également terminé troisièmes en 1958 et 1986, et demi-finalistes en 1982 lors de la mythique nuit de Séville.",
      en: "France has won the World Cup twice: 1998 at home (3-0 vs Brazil, Zidane's brace) and 2018 in Russia (4-2 vs Croatia, with 19-year-old Mbappé). In 2022, France lost the final to Argentina on penalties despite Mbappé's hat-trick. France also finished 3rd in 1958 and 1986.",
      es: "Francia ha ganado el Mundial dos veces: 1998 en casa (3-0 vs Brasil) y 2018 en Rusia (4-2 vs Croacia). En 2022 perdió la final contra Argentina en penaltis pese al triplete de Mbappé. También fue tercera en 1958 y 1986.",
    },
    category: "history",
  },
  {
    id: "history-records",
    question: {
      fr: "Quels sont les records de la Coupe du Monde de football ?",
      en: "What are the FIFA World Cup records?",
      es: "Cuales son los records del Mundial de futbol?",
    },
    answer: {
      fr: "La Coupe du Monde regorge de records fascinants. Miroslav Klose (Allemagne) est le meilleur buteur de l'histoire avec 16 buts en quatre éditions. Pelé est le seul joueur à avoir remporté trois Coupes du Monde (1958, 1962, 1970). Le match le plus prolifique est Autriche-Suisse 7-5 en 2014. L'Allemagne détient la plus large victoire avec un 7-1 infligé au Brésil en demi-finale 2014 à domicile. Le plus jeune buteur en Coupe du Monde est Pelé, qui a marqué à 17 ans et 239 jours. Lionel Messi détient le record de matchs joués avec 26 apparitions. La Coupe du Monde 2026, avec son format élargi à 48 équipes et 104 matchs, battra forcément plusieurs de ces records historiques.",
      en: "Miroslav Klose holds the all-time scoring record with 16 goals. Pelé is the only three-time winner. The highest-scoring match was Austria-Switzerland 7-5 in 2014. Germany's 7-1 over Brazil in 2014 is the biggest semi-final win. Messi holds the record for most appearances (26). The 2026 format will likely see several records broken.",
      es: "Miroslav Klose tiene el récord de goles con 16. Pelé es el único tricampeón. El partido con más goles fue Austria-Suiza 7-5 en 2014. El 7-1 de Alemania a Brasil en 2014 es la mayor goleada en semifinales. Messi tiene el récord de partidos disputados (26).",
    },
    category: "history",
  },
  {
    id: "history-first-world-cup",
    question: {
      fr: "Où et quand a eu lieu la première Coupe du Monde de football ?",
      en: "Where and when was the first FIFA World Cup held?",
      es: "Donde y cuando se celebro el primer Mundial de futbol?",
    },
    answer: {
      fr: "La première Coupe du Monde de football s'est déroulée en Uruguay en 1930, à l'initiative du président de la FIFA Jules Rimet. Seulement 13 équipes y ont participé, dont 7 d'Amérique du Sud, 4 d'Europe et 2 d'Amérique du Nord. Tous les matchs se sont joués à Montevideo, principalement au stade Centenario construit spécialement pour l'occasion. L'Uruguay a remporté le premier titre mondial en battant l'Argentine 4-2 en finale devant près de 93 000 spectateurs. Plusieurs équipes européennes avaient décliné l'invitation en raison du long voyage en bateau nécessaire pour atteindre l'Amérique du Sud. Depuis cette première édition, la Coupe du Monde est devenue l'événement sportif le plus regardé au monde.",
      en: "The first World Cup was held in Uruguay in 1930, organized by FIFA president Jules Rimet. Only 13 teams participated. All matches were played in Montevideo, mainly at the Centenario stadium. Uruguay won the first title, beating Argentina 4-2 in the final before 93,000 spectators.",
      es: "El primer Mundial se celebró en Uruguay en 1930, organizado por el presidente de la FIFA Jules Rimet. Solo participaron 13 equipos. Todos los partidos se jugaron en Montevideo. Uruguay ganó el primer título venciendo a Argentina 4-2 en la final.",
    },
    category: "history",
  },
  {
    id: "history-expansion",
    question: {
      fr: "Comment le format de la Coupe du Monde a-t-il évolué au fil des ans ?",
      en: "How has the World Cup format evolved over the years?",
      es: "Como ha evolucionado el formato del Mundial a lo largo de los anos?",
    },
    answer: {
      fr: "Le format de la Coupe du Monde a considérablement évolué depuis 1930. La première édition comptait 13 équipes sans véritables qualifications. De 1934 à 1978, le tournoi a accueilli 16 équipes. En 1982, le format est passé à 24 équipes avec une deuxième phase de groupes, puis un tableau à élimination directe classique a été adopté en 1986. En 1998, la FIFA a élargi la compétition à 32 équipes réparties en 8 groupes de 4, un format qui a perduré jusqu'en 2022. La Coupe du Monde 2026 marque le plus grand changement de l'histoire avec 48 équipes et 12 groupes, portant le nombre total de matchs à 104. Cette évolution reflète la mondialisation du football et le souhait de la FIFA d'inclure davantage de nations.",
      en: "The World Cup format has evolved significantly: 13 teams in 1930, 16 from 1934-1978, 24 from 1982-1994, 32 from 1998-2022, and now 48 for 2026. The 2026 edition features 12 groups and 104 total matches, the biggest change in World Cup history.",
      es: "El formato del Mundial ha evolucionado: 13 equipos en 1930, 16 de 1934-1978, 24 de 1982-1994, 32 de 1998-2022, y ahora 48 para 2026 con 12 grupos y 104 partidos en total.",
    },
    category: "history",
  },

  // ============================================================
  // Additional Betting FAQs
  // ============================================================
  {
    id: "betting-bookmakers-france",
    question: {
      fr: "Quels sont les meilleurs bookmakers légaux en France pour la Coupe du Monde 2026 ?",
      en: "What are the best legal bookmakers in France for the 2026 World Cup?",
      es: "Cuales son las mejores casas de apuestas legales en Francia para el Mundial 2026?",
    },
    answer: {
      fr: "En France, seuls les opérateurs agréés par l'ANJ (Autorité Nationale des Jeux) sont autorisés à proposer des paris sportifs en ligne. Parmi les principaux bookmakers légaux, on retrouve Betclic, Winamax, Unibet, ParionsSport (FDJ), ZEbet, PMU Sport et Bwin. Chacun propose des offres de bienvenue différentes : freebets, paris remboursés ou bonus sur dépôt. Pour la Coupe du Monde 2026, ces opérateurs multiplieront les promotions spéciales. Comparez les cotes entre plusieurs sites pour maximiser vos gains potentiels, car les écarts peuvent atteindre 5 à 10% sur certains marchés. Vérifiez toujours que le logo ANJ figure sur le site avant de vous inscrire.",
      en: "In France, only ANJ-licensed operators can offer online sports betting. Top legal bookmakers include Betclic, Winamax, Unibet, ParionsSport (FDJ), ZEbet, PMU Sport and Bwin. Compare odds across sites as differences can reach 5-10% on some markets. Always check for the ANJ logo.",
      es: "En Francia, solo los operadores con licencia ANJ pueden ofrecer apuestas deportivas online. Los principales incluyen Betclic, Winamax, Unibet, ParionsSport, ZEbet, PMU Sport y Bwin. Compara cuotas entre sitios.",
    },
    category: "betting",
  },
  {
    id: "betting-responsible",
    question: {
      fr: "Comment parier de manière responsable sur la Coupe du Monde 2026 ?",
      en: "How to bet responsibly on the 2026 World Cup?",
      es: "Como apostar de manera responsable en el Mundial 2026?",
    },
    answer: {
      fr: "Le jeu responsable est essentiel pour profiter de la Coupe du Monde 2026 sans risque financier. Fixez-vous un budget strict avant le tournoi et ne le dépassez jamais, même après une série de victoires. Ne pariez jamais de l'argent dont vous avez besoin pour vos dépenses quotidiennes. Évitez de parier sous l'influence de l'alcool ou des émotions après un match frustrant. Utilisez les outils de limitation proposés par les bookmakers agréés : plafonds de dépôt, d'enjeux et auto-exclusion temporaire. Si vous sentez que le jeu devient un problème, contactez le service d'aide Joueurs Info Service au 09 74 75 13 13 (appel non surtaxé). Rappelez-vous : les paris sportifs sont un divertissement, pas un moyen de gagner sa vie.",
      en: "Set a strict budget before the tournament and never exceed it. Never bet money you need for daily expenses. Avoid betting under the influence of alcohol or emotions. Use bookmaker tools: deposit limits, stake limits, self-exclusion. If gambling becomes a problem, contact help services.",
      es: "Fija un presupuesto estricto y nunca lo superes. No apuestes dinero que necesitas para gastos diarios. Usa las herramientas de los operadores: límites de depósito, autoexclusión. Si el juego se convierte en problema, busca ayuda.",
    },
    category: "betting",
  },
  {
    id: "betting-accumulator",
    question: {
      fr: "Qu'est-ce qu'un pari combiné et comment l'utiliser pour la Coupe du Monde ?",
      en: "What is an accumulator bet and how to use it for the World Cup?",
      es: "Que es una apuesta combinada y como usarla para el Mundial?",
    },
    answer: {
      fr: "Un pari combiné (ou accumulator) consiste à regrouper plusieurs sélections dans un seul pari. Les cotes se multiplient entre elles, offrant des gains potentiels bien plus élevés qu'un pari simple. Par exemple, combiner trois matchs avec des cotes de 1.50, 2.00 et 1.80 donne une cote totale de 5.40. Pendant la Coupe du Monde, les combinés sont très populaires car il y a souvent plusieurs matchs par jour. Attention cependant : il suffit qu'une seule sélection soit perdante pour que tout le pari soit perdu. Pour limiter le risque, certains bookmakers proposent des assurances combiné (remboursement si une seule sélection est fausse). Limitez-vous à 3-4 sélections maximum pour garder des chances raisonnables de gain.",
      en: "An accumulator combines multiple selections into one bet, multiplying odds together for higher potential returns. During the World Cup, accumulators are popular with multiple daily matches. However, one losing selection loses the entire bet. Stick to 3-4 selections maximum for reasonable winning chances.",
      es: "Una apuesta combinada agrupa varias selecciones en una sola apuesta, multiplicando las cuotas. Durante el Mundial son populares con varios partidos diarios. Pero una selección perdedora pierde toda la apuesta. Limítate a 3-4 selecciones.",
    },
    category: "betting",
  },
  {
    id: "betting-live",
    question: {
      fr: "Comment fonctionnent les paris en direct (live betting) pendant un match ?",
      en: "How does live betting work during a match?",
      es: "Como funcionan las apuestas en directo durante un partido?",
    },
    answer: {
      fr: "Les paris en direct permettent de parier pendant qu'un match est en cours, avec des cotes qui évoluent en temps réel selon le déroulement de la rencontre. Pendant la Coupe du Monde 2026, vous pourrez parier sur le prochain buteur, le résultat final, le nombre de corners, les cartons et bien d'autres marchés en temps réel. Les cotes changent à chaque action significative (but, carton rouge, penalty). C'est une forme de pari particulièrement excitante mais qui nécessite une bonne connaissance du football et une capacité à prendre des décisions rapides. Conseil : regardez le match en direct (pas en différé) pour avoir l'information en même temps que le bookmaker. Les paris live représentent une part croissante des mises sportives et tous les opérateurs agréés en France les proposent.",
      en: "Live betting allows wagering during a match with odds that change in real time. During the 2026 World Cup, you can bet on next goalscorer, final result, corners, cards and more. Odds shift with every significant action. Watch live (not delayed) for the best edge.",
      es: "Las apuestas en directo permiten apostar durante un partido con cuotas que cambian en tiempo real. Durante el Mundial 2026 podrás apostar al próximo goleador, resultado final, córners y más. Ve el partido en directo para mejor ventaja.",
    },
    category: "betting",
  },

  // ============================================================
  // Additional Tournament FAQs
  // ============================================================
  {
    id: "tournament-mascot",
    question: {
      fr: "Quelle est la mascotte de la Coupe du Monde 2026 ?",
      en: "What is the 2026 World Cup mascot?",
      es: "Cual es la mascota del Mundial 2026?",
    },
    answer: {
      fr: "La FIFA a dévoilé la mascotte officielle de la Coupe du Monde 2026 qui représente l'esprit multiculturel des trois pays hôtes. Chaque édition de la Coupe du Monde a sa propre mascotte emblématique depuis Willie le lion en 1966 en Angleterre. Les mascottes récentes incluent Zabivaka le loup (Russie 2018) et La'eeb (Qatar 2022). La mascotte 2026 sera omniprésente lors du tournoi : dans les stades, sur les produits dérivés officiels et dans les campagnes de communication de la FIFA. Elle deviendra probablement un objet de collection pour les fans du monde entier. Restez connectés sur FIFA.com pour découvrir tous les produits dérivés associés à cette nouvelle mascotte.",
      en: "FIFA has unveiled the official 2026 World Cup mascot representing the multicultural spirit of the three host nations. Every World Cup has had its own iconic mascot since Willie the lion in 1966. The 2026 mascot will feature prominently in stadiums, merchandise and FIFA campaigns.",
      es: "La FIFA ha presentado la mascota oficial del Mundial 2026 que representa el espíritu multicultural de los tres países anfitriones. Cada Mundial tiene su mascota icónica desde Willie el león en 1966.",
    },
    category: "tournament",
  },
  {
    id: "tournament-var",
    question: {
      fr: "L'assistance vidéo à l'arbitrage (VAR) sera-t-elle utilisée en 2026 ?",
      en: "Will VAR be used at the 2026 World Cup?",
      es: "Se usara el VAR en el Mundial 2026?",
    },
    answer: {
      fr: "Oui, la VAR (Video Assistant Referee) sera utilisée lors de la Coupe du Monde 2026, comme elle l'a été depuis son introduction en 2018 en Russie. La FIFA pourrait même introduire des améliorations technologiques comme le hors-jeu semi-automatique, déjà testé avec succès au Qatar en 2022, qui utilise des caméras de suivi et l'intelligence artificielle pour des décisions plus rapides et plus précises. Le système de ballon connecté, inauguré en 2022, sera également de retour pour détecter les touches de balle avec précision. Ces technologies visent à réduire les erreurs d'arbitrage tout en minimisant les interruptions de jeu. La FIFA investit massivement dans l'innovation technologique pour faire de 2026 l'édition la plus juste de l'histoire.",
      en: "Yes, VAR will be used at the 2026 World Cup, as it has since its introduction in 2018. FIFA may introduce improvements like semi-automated offside technology and the connected ball system, both used successfully in Qatar 2022.",
      es: "Sí, el VAR se usará en el Mundial 2026, como desde su introducción en 2018. La FIFA podría introducir mejoras como el fuera de juego semiautomático y el balón conectado, ambos usados con éxito en Qatar 2022.",
    },
    category: "tournament",
  },
  {
    id: "tournament-prize-money",
    question: {
      fr: "Quels sont les gains financiers pour les équipes à la Coupe du Monde 2026 ?",
      en: "What is the prize money at the 2026 World Cup?",
      es: "Cual es el premio en metálico en el Mundial 2026?",
    },
    answer: {
      fr: "La FIFA a considérablement augmenté l'enveloppe financière pour la Coupe du Monde 2026. Le prize money total devrait dépasser le milliard de dollars, contre 440 millions en 2022. Le vainqueur pourrait recevoir plus de 50 millions de dollars, tandis que chaque équipe éliminée en phase de groupes empochera au minimum 10 à 13 millions de dollars. Ces revenus proviennent principalement des droits TV, du sponsoring et de la billetterie. L'augmentation du nombre de matchs (104 contre 64) et le marché nord-américain, très lucratif, expliquent cette hausse spectaculaire. Les fédérations redistribuent ensuite ces gains aux joueurs, aux clubs formateurs et au développement du football dans leur pays.",
      en: "FIFA has significantly increased the 2026 World Cup prize money. The total pot is expected to exceed $1 billion, up from $440 million in 2022. The winner could receive over $50 million, while teams eliminated in the group stage will earn at least $10-13 million each.",
      es: "La FIFA ha aumentado significativamente los premios del Mundial 2026. El total superaría los mil millones de dólares. El ganador podría recibir más de 50 millones, mientras que los equipos eliminados en fase de grupos ganarán al menos 10-13 millones.",
    },
    category: "tournament",
  },

  // ============================================================
  // Additional Predictions FAQs
  // ============================================================
  {
    id: "predictions-group-stage",
    question: {
      fr: "Comment pronostiquer les matchs de phase de groupes ?",
      en: "How to predict group stage matches?",
      es: "Como pronosticar los partidos de fase de grupos?",
    },
    answer: {
      fr: "Les matchs de phase de groupes sont souvent les plus difficiles à pronostiquer en raison du nombre élevé de rencontres et des équipes méconnues. Voici quelques conseils pour affiner vos pronostics : analysez les classements ELO et FIFA, étudiez les résultats récents des équipes lors des qualifications, tenez compte de l'avantage du terrain pour les pays hôtes, et vérifiez la forme physique des joueurs clés. Les premiers matchs d'un groupe sont particulièrement imprévisibles car les équipes se découvrent. Les dernières journées, en revanche, offrent des situations tactiques plus lisibles (besoin de victoire, match nul suffisant, etc.). Notre modèle ELO prend en compte tous ces paramètres pour vous fournir des probabilités fiables pour chaque rencontre.",
      en: "Group stage matches are often hardest to predict. Tips: analyze ELO and FIFA rankings, study recent qualifying results, consider home advantage for hosts, check key players' fitness. First matchday is most unpredictable; final matchday offers more readable tactical situations. Our ELO model factors all these parameters.",
      es: "Los partidos de fase de grupos son los más difíciles de pronosticar. Consejos: analiza rankings ELO y FIFA, estudia resultados recientes, considera la ventaja local de los anfitriones y la forma física de jugadores clave.",
    },
    category: "predictions",
  },
  {
    id: "predictions-top-scorer",
    question: {
      fr: "Qui sera le meilleur buteur de la Coupe du Monde 2026 ?",
      en: "Who will be the top scorer at the 2026 World Cup?",
      es: "Quien sera el maximo goleador del Mundial 2026?",
    },
    answer: {
      fr: "Le titre de meilleur buteur (Soulier d'or) de la Coupe du Monde 2026 est très disputé selon les bookmakers. Kylian Mbappé fait partie des grands favoris grâce à sa vitesse fulgurante et sa capacité à marquer dans les grands matchs. Harry Kane, Erling Haaland (si la Norvège se qualifie), Vinícius Júnior et Lautaro Martínez sont également très bien placés. Historiquement, les meilleurs buteurs proviennent souvent des équipes qui vont loin dans le tournoi. Avec le format élargi à 48 équipes, les attaquants des grandes nations auront davantage de matchs potentiels pour gonfler leur statistiques. Depuis 2002, aucun meilleur buteur n'a dépassé 6 buts, mais le record de Just Fontaine (13 buts en 1958 avec la France) pourrait être menacé avec le nouveau format.",
      en: "The 2026 Golden Boot race is wide open. Kylian Mbappé, Harry Kane, Vinícius Júnior, and Lautaro Martínez are among the favorites. The expanded format gives top strikers more potential matches. Just Fontaine's record of 13 goals (1958) could be threatened.",
      es: "La Bota de Oro 2026 está muy disputada. Kylian Mbappé, Harry Kane, Vinícius Júnior y Lautaro Martínez están entre los favoritos. El formato ampliado da más partidos potenciales a los delanteros top.",
    },
    category: "predictions",
  },
];
