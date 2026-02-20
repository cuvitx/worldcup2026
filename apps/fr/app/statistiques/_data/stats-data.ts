export const topScorers = [
  {
    name: "Miroslav Klose",
    country: "🇩🇪 Allemagne",
    goals: 16,
    editions: "2002–2014",
  },
  { name: "Ronaldo (R9)", country: "🇧🇷 Brésil", goals: 15, editions: "1994–2006" },
  { name: "Gerd Müller", country: "🇩🇪 Allemagne", goals: 14, editions: "1970–1974" },
  { name: "Just Fontaine", country: "🇫🇷 France", goals: 13, editions: "1958" },
  { name: "Pelé", country: "🇧🇷 Brésil", goals: 12, editions: "1958–1970" },
  { name: "Sándor Kocsis", country: "🇭🇺 Hongrie", goals: 11, editions: "1954" },
  {
    name: "Jürgen Klinsmann",
    country: "🇩🇪 Allemagne",
    goals: 11,
    editions: "1990–1998",
  },
  { name: "Helmut Rahn", country: "🇩🇪 Allemagne", goals: 10, editions: "1954–1958" },
  { name: "Teófilo Cubillas", country: "🇵🇪 Pérou", goals: 10, editions: "1970–1978" },
  {
    name: "Grzegorz Lato",
    country: "🇵🇱 Pologne",
    goals: 10,
    editions: "1974–1982",
  },
  {
    name: "Gary Lineker",
    country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre",
    goals: 10,
    editions: "1986–1990",
  },
  {
    name: "Gabriel Batistuta",
    country: "🇦🇷 Argentine",
    goals: 10,
    editions: "1994–2002",
  },
];

export const titledCountries = [
  { country: "🇧🇷 Brésil", titles: 5, color: "green" as const },
  { country: "🇩🇪 Allemagne", titles: 4, color: "accent" as const },
  { country: "🇮🇹 Italie", titles: 4, color: "blue" as const },
  { country: "🇦🇷 Argentine", titles: 3, color: "accent" as const },
  { country: "🇫🇷 France", titles: 2, color: "blue" as const },
  { country: "🇺🇾 Uruguay", titles: 2, color: "teal" as const },
  { country: "🇪🇸 Espagne", titles: 1, color: "orange" as const },
  { country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre", titles: 1, color: "purple" as const },
];

export const goalsByEdition = [
  { year: 1930, goals: 70, teams: 13, matches: 18, avg: 3.89 },
  { year: 1934, goals: 70, teams: 16, matches: 17, avg: 4.12 },
  { year: 1938, goals: 84, teams: 15, matches: 18, avg: 4.67 },
  { year: 1950, goals: 88, teams: 13, matches: 22, avg: 4.0 },
  { year: 1954, goals: 140, teams: 16, matches: 26, avg: 5.38 },
  { year: 1958, goals: 126, teams: 16, matches: 35, avg: 3.6 },
  { year: 1962, goals: 89, teams: 16, matches: 32, avg: 2.78 },
  { year: 1966, goals: 89, teams: 16, matches: 32, avg: 2.78 },
  { year: 1970, goals: 95, teams: 16, matches: 32, avg: 2.97 },
  { year: 1974, goals: 97, teams: 16, matches: 38, avg: 2.55 },
  { year: 1978, goals: 102, teams: 16, matches: 38, avg: 2.68 },
  { year: 1982, goals: 146, teams: 24, matches: 52, avg: 2.81 },
  { year: 1986, goals: 132, teams: 24, matches: 52, avg: 2.54 },
  { year: 1990, goals: 115, teams: 24, matches: 52, avg: 2.21 },
  { year: 1994, goals: 141, teams: 24, matches: 52, avg: 2.71 },
  { year: 1998, goals: 171, teams: 32, matches: 64, avg: 2.67 },
  { year: 2002, goals: 161, teams: 32, matches: 64, avg: 2.52 },
  { year: 2006, goals: 147, teams: 32, matches: 64, avg: 2.3 },
  { year: 2010, goals: 145, teams: 32, matches: 64, avg: 2.27 },
  { year: 2014, goals: 171, teams: 32, matches: 64, avg: 2.67 },
  { year: 2018, goals: 169, teams: 32, matches: 64, avg: 2.64 },
  { year: 2022, goals: 172, teams: 32, matches: 64, avg: 2.69 },
];

export const records = [
  {
    icon: " ",
    category: "Record de victoire",
    title: "Hongrie 10–1 Salvador",
    detail: "Phase de groupes — Coupe du Monde 1982, Elche, Espagne",
    badge: "Record absolu",
    badgeColor: "bg-red-500",
  },
  {
    icon: " ",
    category: "Match le plus prolifique",
    title: "Autriche 7–5 Suisse",
    detail: "Phase de groupes — CDM 1954 (12 buts en un seul match !)",
    badge: "12 buts",
    badgeColor: "bg-accent",
  },
  {
    icon: "👶",
    category: "Plus jeune buteur",
    title: "Pelé — 17 ans, 239 jours",
    detail: "Brésil vs Pays de Galles — CDM 1958, quart de finale",
    badge: "Record de jeunesse",
    badgeColor: "bg-success",
  },
  {
    icon: "👴",
    category: "Plus vieux buteur",
    title: "Roger Milla — 42 ans, 39 jours",
    detail: "Cameroun vs Russie — CDM 1994 (groupe A)",
    badge: "Record de longévité",
    badgeColor: "bg-primary",
  },
  {
    icon: " ",
    category: "Record en 1 tournoi",
    title: "Just Fontaine — 13 buts en 1958",
    detail: "Record imbattu depuis 66 ans ! (France, CDM 1958 Suède)",
    badge: "Imbattable ?",
    badgeColor: "bg-primary/500",
  },
  {
    icon: "🏃",
    category: "Plus de matchs joués",
    title: "Lothar Matthäus — 25 matchs",
    detail: "Allemagne, 5 Coupes du Monde (1982–1998)",
    badge: "25 matchs",
    badgeColor: "bg-accent",
  },
  {
    icon: " ",
    category: "Plus de titres (joueur)",
    title: "Pelé — 3 couronnes mondiales",
    detail:
      "Brésil 1958, 1962, 1970 — le seul joueur à avoir remporté 3 CDM",
    badge: "Légende absolue",
    badgeColor: "bg-accent",
  },
  {
    icon: "🥅",
    category: "Match sans buts",
    title: "CDM 1990 — édition la plus défensive",
    detail: "Moyenne : 2,21 buts/match — la plus basse de l'histoire",
    badge: "Édition plus défensive",
    badgeColor: "bg-gray-500",
  },
];

export const funFacts = [
  {
    emoji: "🇸🇦",
    fact: "L'Arabie Saoudite a battu l'Argentine 2-1 lors du Mondial 2022, l'une des plus grandes surprises de l'histoire.",
  },
  {
    emoji: "🇩🇰",
    fact: "Le Danemark a gagné toutes ses 3 qualifications pour un Mondial et tous ses matchs du premier tour (1986, 1998, 2002).",
  },
  {
    emoji: "",
    fact: "La chanson 'Waka Waka' de Shakira pour le Mondial 2010 est la chanson officielle de CDM la plus écoutée de l'histoire : +3 milliards de vues YouTube.",
  },
  {
    emoji: "",
    fact: "Paul le Poulpe a prédit correctement tous les résultats de l'équipe d'Allemagne (6/6) et la finale du Mondial 2010.",
  },
  {
    emoji: " ",
    fact: "Just Fontaine (France) a inscrit ses 13 buts en 1958 en seulement 6 matchs — soit plus de 2 buts par match en moyenne.",
  },
  {
    emoji: "",
    fact: "Le Brésil est le seul pays à avoir participé à TOUTES les éditions de la Coupe du Monde FIFA (22/22).",
  },
  {
    emoji: "",
    fact: "6 équipes ont remporté la CDM en jouant à domicile (ou quasi-domicile) : Uruguay, Italie, Angleterre, Allemagne, Argentine, France.",
  },
  {
    emoji: "",
    fact: "En 2026, 48 équipes disputeront 104 matchs sur 3 pays. En 1930, seulement 13 équipes et 18 matchs. Une révolution totale !",
  },
];
