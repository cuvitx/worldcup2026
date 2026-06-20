export const topScorers = [
  {
    name: "Miroslav Klose",
    country: "🇩🇪 Deutschland",
    goals: 16,
    editions: "2002–2014",
  },
  { name: "Ronaldo (R9)", country: "🇧🇷 Brasilien", goals: 15, editions: "1994–2006" },
  { name: "Gerd Müller", country: "🇩🇪 Deutschland", goals: 14, editions: "1970–1974" },
  { name: "Just Fontaine", country: "🇫🇷 Frankreich", goals: 13, editions: "1958" },
  { name: "Pelé", country: "🇧🇷 Brasilien", goals: 12, editions: "1958–1970" },
  { name: "Sándor Kocsis", country: "🇭🇺 Ungarn", goals: 11, editions: "1954" },
  {
    name: "Jürgen Klinsmann",
    country: "🇩🇪 Deutschland",
    goals: 11,
    editions: "1990–1998",
  },
  { name: "Helmut Rahn", country: "🇩🇪 Deutschland", goals: 10, editions: "1954–1958" },
  { name: "Teófilo Cubillas", country: "🇵🇪 Peru", goals: 10, editions: "1970–1978" },
  {
    name: "Grzegorz Lato",
    country: "🇵🇱 Polen",
    goals: 10,
    editions: "1974–1982",
  },
  {
    name: "Gary Lineker",
    country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England",
    goals: 10,
    editions: "1986–1990",
  },
  {
    name: "Gabriel Batistuta",
    country: "🇦🇷 Argentinien",
    goals: 10,
    editions: "1994–2002",
  },
];

export const titledCountries = [
  { country: "🇧🇷 Brasilien", titles: 5, color: "green" as const },
  { country: "🇩🇪 Deutschland", titles: 4, color: "accent" as const },
  { country: "🇮🇹 Italien", titles: 4, color: "blue" as const },
  { country: "🇦🇷 Argentinien", titles: 3, color: "accent" as const },
  { country: "🇫🇷 Frankreich", titles: 2, color: "blue" as const },
  { country: "🇺🇾 Uruguay", titles: 2, color: "teal" as const },
  { country: "🇪🇸 Spanien", titles: 1, color: "orange" as const },
  { country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿 England", titles: 1, color: "purple" as const },
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
    category: "Rekordsieg",
    title: "Ungarn 10–1 El Salvador",
    detail: "Gruppenphase — WM 1982, Elche, Spanien",
    badge: "Absoluter Rekord",
    badgeColor: "bg-red-500",
  },
  {
    icon: " ",
    category: "Torreichstes Spiel",
    title: "Österreich 7–5 Schweiz",
    detail: "Gruppenphase — WM 1954 (12 Tore in einem einzigen Spiel!)",
    badge: "12 Tore",
    badgeColor: "bg-accent",
  },
  {
    icon: "👶",
    category: "Jüngster Torschütze",
    title: "Pelé — 17 Jahre, 239 Tage",
    detail: "Brasilien vs Wales — WM 1958, Viertelfinale",
    badge: "Jugendrekord",
    badgeColor: "bg-success",
  },
  {
    icon: "👴",
    category: "Ältester Torschütze",
    title: "Roger Milla — 42 Jahre, 39 Tage",
    detail: "Kamerun vs Russland — WM 1994 (Gruppe A)",
    badge: "Langlebigkeitsrekord",
    badgeColor: "bg-primary",
  },
  {
    icon: " ",
    category: "Rekord in einem Turnier",
    title: "Just Fontaine — 13 Tore 1958",
    detail: "Seit 66 Jahren ungeschlagen! (Frankreich, WM 1958 Schweden)",
    badge: "Unschlagbar?",
    badgeColor: "bg-primary/500",
  },
  {
    icon: "🏃",
    category: "Meiste Spiele",
    title: "Lothar Matthäus — 25 Spiele",
    detail: "Deutschland, 5 Weltmeisterschaften (1982–1998)",
    badge: "25 Spiele",
    badgeColor: "bg-accent",
  },
  {
    icon: " ",
    category: "Meiste Titel (Spieler)",
    title: "Pelé — 3 WM-Titel",
    detail:
      "Brasilien 1958, 1962, 1970 — der einzige Spieler mit 3 WM-Titeln",
    badge: "Absolute Legende",
    badgeColor: "bg-accent",
  },
  {
    icon: "🥅",
    category: "Torlos-Spiel",
    title: "WM 1990 — defensivste Ausgabe",
    detail: "Durchschnitt: 2,21 Tore/Spiel — der niedrigste der Geschichte",
    badge: "Defensivste Ausgabe",
    badgeColor: "bg-gray-500",
  },
];

export const funFacts = [
  {
    emoji: "🇸🇦",
    fact: "Saudi-Arabien besiegte Argentinien bei der WM 2022 mit 2:1 — eine der grössten Überraschungen der Geschichte.",
  },
  {
    emoji: "🇩🇰",
    fact: "Dänemark hat alle seine 3 WM-Qualifikationen und alle Erstrundenspiele gewonnen (1986, 1998, 2002).",
  },
  {
    emoji: "",
    fact: "Shakiras 'Waka Waka' für die WM 2010 ist der meistgehörte offizielle WM-Song aller Zeiten: über 3 Milliarden YouTube-Aufrufe.",
  },
  {
    emoji: "",
    fact: "Krake Paul sagte alle Ergebnisse der deutschen Mannschaft (6/6) und das Finale der WM 2010 korrekt voraus.",
  },
  {
    emoji: " ",
    fact: "Just Fontaine (Frankreich) erzielte seine 13 Tore 1958 in nur 6 Spielen — also über 2 Tore pro Spiel im Durchschnitt.",
  },
  {
    emoji: "",
    fact: "Brasilien ist das einzige Land, das an ALLEN Ausgaben der FIFA-WM teilgenommen hat (22/22).",
  },
  {
    emoji: "",
    fact: "6 Mannschaften gewannen die WM als Gastgeber (oder Quasi-Gastgeber): Uruguay, Italien, England, Deutschland, Argentinien, Frankreich.",
  },
  {
    emoji: "",
    fact: "2026 werden 48 Mannschaften 104 Spiele in 3 Ländern bestreiten. 1930 waren es nur 13 Mannschaften und 18 Spiele. Eine totale Revolution!",
  },
];
