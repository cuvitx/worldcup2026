import { teams } from "@repo/data/teams";
import { teamPredictions } from "@repo/data/predictions";

export const faqItems = [
  {
    question: "Wer ist Favorit für den Gewinn der WM 2026?",
    answer:
      "Argentinien (Titelverteidiger), Frankreich und Spanien sind die drei großen Favoriten laut unserem ELO-Modell und den Buchmacher-Quoten. Argentinien hat eine Siegwahrscheinlichkeit von 15%, Frankreich 13% und Spanien 12%.",
  },
  {
    question: "Was sind die besten Quoten für den Sieger der WM 2026?",
    answer:
      "Für Argentinien liegen die Quoten bei etwa 6,50, für Frankreich bei etwa 7,50 und für Spanien bei etwa 8,00. Die besten Quoten in Echtzeit finden Sie bei Betano.",
  },
  {
    question: "Kann Deutschland die WM 2026 gewinnen?",
    answer:
      "Ja, Deutschland gehört mit einer Wahrscheinlichkeit von ca. 8% laut unserem Modell zu den Mitfavoriten. Viermaliger Weltmeister (1954, 1974, 1990, 2014) und mit der Erneuerung unter Nagelsmann verfügt die Mannschaft über ein starkes Fundament mit Wirtz, Musiala und einer soliden Defensive.",
  },
  {
    question: "Welches Gastgeberland könnte 2026 für eine Überraschung sorgen?",
    answer:
      "Die USA, Mitorganisatoren zusammen mit Kanada und Mexiko, könnten vom Heimvorteil profitieren und für eine Überraschung sorgen. Mexiko hat mit dem Estadio Azteca ebenfalls Argumente. Kanada ist die größte potenzielle Überraschung mit Alphonso Davies.",
  },
  {
    question: "Welche Außenseiter (Geheimfavoriten) gibt es bei der WM 2026?",
    answer:
      "Marokko (Halbfinalist 2022), Japan (regelmäßig überraschend), Kolumbien (im Aufschwung) und Kroatien (Finalist 2018) sind die interessantesten Außenseiter, die man bei dieser WM im Auge behalten sollte.",
  },
  {
    question: "Wie werden die Siegwahrscheinlichkeiten berechnet?",
    answer:
      "Unsere Wahrscheinlichkeiten werden über ein an den internationalen Fußball angepasstes ELO-Modell berechnet, kombiniert mit Monte-Carlo-Simulationen des gesamten Turniers. Auf unserer Methodik-Seite finden Sie die Details des Modells.",
  },
  {
    question: "Welches Team hat die beste WM-Bilanz?",
    answer:
      "Brasilien dominiert mit 5 Titeln (1958, 1962, 1970, 1994, 2002), gefolgt von Deutschland und Italien (je 4), Argentinien und Frankreich (je 2). 2026 könnte ein Sieg Deutschlands das Land zum alleinigen Rekordweltmeister machen.",
  },
  {
    question: "Spielt der Heimvorteil bei der WM eine Rolle?",
    answer:
      "Historisch ist der Heimvorteil des Gastgeberlandes real, aber nicht entscheidend: Bei 22 Ausgaben haben nur 6 Gastgebernationen den Titel gewonnen (Uruguay 1930, Italien 1934, England 1966, Deutschland 1974, Argentinien 1978, Frankreich 1998), also eine Quote von 27%. 2026 werden die USA, Kanada und Mexiko von diesem Vorteil profitieren, aber die großen Favoriten (Argentinien, Frankreich, Spanien) bleiben trotzdem favorisiert.",
  },
];

export const teamsById = Object.fromEntries(teams.map((t) => [t.id, t]));

export const top10 = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(0, 10)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter(
    (x): x is { pred: typeof x.pred; team: NonNullable<typeof x.team> } =>
      x.team != null
  );

export const darkHorses = [...teamPredictions]
  .sort((a, b) => b.winnerProb - a.winnerProb)
  .slice(10, 16)
  .map((pred) => ({
    pred,
    team: teamsById[pred.teamId],
  }))
  .filter(
    (x): x is { pred: typeof x.pred; team: NonNullable<typeof x.team> } =>
      x.team != null
  );

export const teamArguments: Record<
  string,
  { pros: string[]; cons: string[] }
> = {
  argentine: {
    pros: [
      "Amtierender Weltmeister (Katar 2022)",
      "Messi + Lautaro Martinez = furchteinflößendes Duo",
      "Außergewöhnlicher Mannschaftszusammenhalt",
      "Erfahrung bei großen Turnieren",
    ],
    cons: [
      "Messi mit 38 Jahren — wie lange hält er noch durch?",
      "Potenzielle Defensivschwäche",
      "Druck des Favoritenstatus",
    ],
  },
  france: {
    pros: [
      "Der tiefste Kader der Welt",
      "Mbappé auf dem Höhepunkt seines Könnens (Real Madrid)",
      "Zweifacher Weltmeister (1998, 2018)",
      "Finalist 2022 — Hunger nach Revanche",
    ],
    cons: [
      "Syndrom des 3. Platzes zu vermeiden",
      "Griezmann mit 35 Jahren — körperliche Verfassung",
      "Intensiver Mediendruck in Frankreich",
    ],
  },
  espagne: {
    pros: [
      "Europameister 2024 (EM)",
      "Dominantes Positionsspiel (Pedri, Yamal)",
      "Hervorragende U23-Generation",
      "Lamine Yamal: Phänomen mit 18 Jahren",
    ],
    cons: [
      "Fehlen eines echten Referenz-Mittelstürmers",
      "Erste WM ohne Benzema/Ramos",
      "Druck nach dem EM-Sieg 2024",
    ],
  },
  angleterre: {
    pros: [
      "Goldene Generation mit Bellingham, Saka, Foden",
      "Finalist EM 2021, 2024",
      "Premier League: Weltklasse auf jeder Position",
    ],
    cons: [
      "Der englische Fluch ist immer noch präsent",
      "Letzter Sieg 1966 (zu Hause)",
      "Underperformance bei großen Turnieren",
    ],
  },
  bresil: {
    pros: [
      "5-facher Weltmeister — Sieger-DNA",
      "Vinicius Jr. auf dem Höhepunkt seiner Karriere",
      "Unvergleichliche Offensivstärke",
    ],
    cons: [
      "Ohne den verletzten Neymar — fehlender Anführer",
      "Defensive weniger solide als früher",
      "Enormer Druck der brasilianischen Fans",
    ],
  },
  allemagne: {
    pros: [
      "Legendäre Organisation und taktische Disziplin",
      "4-facher Weltmeister",
      "Gelungener Neustart unter Nagelsmann",
    ],
    cons: [
      "Seit 2018 im Achtelfinale der WM ausgeschieden",
      "Fehlen eines X-Faktor-Spielers",
      "Generationswechsel noch nicht abgeschlossen",
    ],
  },
  portugal: {
    pros: [
      "Ronaldo + Félix + Neto = Feuerangriff",
      "Sehr vielversprechende Generation 2024",
      "3. Platz WM 2022",
    ],
    cons: [
      "Ronaldo mit 41 Jahren — welchen Einfluss hat er wirklich?",
      "Historische Abhängigkeit von CR7",
      "Defensive manchmal fragil",
    ],
  },
  "pays-bas": {
    pros: [
      "Van Dijk als defensiver Weltklasse-Anführer",
      "Klasse im Mittelfeld mit de Jong",
      "Halbfinalist 2022",
    ],
    cons: [
      "Fehlen eines entscheidenden Angriffsspielers",
      "Enttäuschende WM-Ergebnisse seit 2014",
    ],
  },
  belgique: {
    pros: [
      "Neue talentierte Generation (De Ketelaere, Trossard)",
      "Internationale Erfahrung",
    ],
    cons: [
      "Goldene Generation (Hazard/De Bruyne) im Abschwung",
      "Nie ein großes Turnier gewonnen",
      "Mangelnde Konstanz",
    ],
  },
  colombie: {
    pros: [
      "James Rodriguez in Topform",
      "Finalist Copa América 2024",
      "Spektakulärer Spielstil",
    ],
    cons: [
      "Nie über das Viertelfinale der WM hinausgekommen",
      "Defensivschwäche",
      "Druck nach der Copa América",
    ],
  },
};

export const whyTheyCanWin: Record<
  string,
  {
    narrative: string;
    keyPlayer: string;
    keyPlayerDesc: string;
    tacticalEdge: string;
    xFactor: string;
    betOdds: string;
  }
> = {
  argentine: {
    narrative:
      "Argentinien geht diese WM mit der Gelassenheit des amtierenden Weltmeisters an. Trotz des nahenden Karriereendes von Messi (38 Jahre im Jahr 2026) haben die Albicelestes in Katar bewiesen, dass sie als Mannschaft gewinnen können. Lautaro Martinez, Di Maria und die neue Generation tragen dieses Projekt. Das Team von Scaloni hat 3 aufeinanderfolgende Titel gewonnen (Copa América 2021, 2024, WM 2022) — ein einzigartiges Momentum in der Fußballgeschichte.",
    keyPlayer: "Lautaro Martinez",
    keyPlayerDesc:
      "Torjäger von Inter Mailand, eine echte Tormaschine. Mit oder ohne Messi kann er den Unterschied machen.",
    tacticalEdge:
      "Perfekt eingespieltes 4-4-2-Diamant-System. Argentinien ist die erfahrenste Nation in Finalphasen.",
    xFactor:
      "Die Sieger-DNA nach Katar 2022. Dieses Team weiß, wie man einen WM-Pokal hochhält.",
    betOdds: "5.50",
  },
  france: {
    narrative:
      "Frankreich besitzt vermutlich den tiefsten Kader aller 48 Nationen. Weltmeister 1998 und 2018, Finalist 2022 nach einer unglaublichen Aufholjagd im Finale gegen Argentinien — Les Bleus sind hungrig auf Revanche. Mbappé (27 Jahre) ist auf dem absoluten Höhepunkt seiner Karriere bei Real Madrid. Die Maschine ist bereit, das Talent ist da — es fehlt nur noch das Elfmeterglück.",
    keyPlayer: "Kylian Mbappé",
    keyPlayerDesc:
      "Bester Spieler der Welt, Liga-Champion. Mit 27 Jahren im Jahr 2026 wird er im optimalen Fenster sein, um einen WM-Titel zu holen.",
    tacticalEdge:
      "Unvergleichliche Kadertiefe: Selbst der 12. französische Spieler wäre bei den meisten anderen Nationalmannschaften Stammspieler.",
    xFactor:
      "Die Revanche von 2022. Ein Elfmeterschießen im Finale zu verlieren erzeugt eine Motivation, die jahrelang anhält.",
    betOdds: "6.00",
  },
  bresil: {
    narrative:
      "5 Sterne, aber kein Titel seit 2002 — die Seleção leidet seit 24 Jahren. Vinicius Jr. ist einer der besten Spieler der Welt, aber das Fehlen des langzeitverletzten Neymar ist eine offene Wunde. Brasilien hat das offensive Talent zum Gewinnen, aber es fehlt noch die defensive Balance, die große Meistermannschaften auszeichnet. Rodrigo, Endrick, Savinho: Die neue Generation ist vielversprechend und hungrig.",
    keyPlayer: "Vinicius Jr.",
    keyPlayerDesc:
      "Zweifacher Champions-League-Finalist, Klub-WM-Sieger. Der Flügelspieler von Real Madrid kann ein Spiel allein entscheiden.",
    tacticalEdge:
      "Brasilien greift permanent mit 4-5 offensiven Weltklassespielern an. Schwer, gegen diese Dichte zu verteidigen.",
    xFactor:
      "Die Demütigung des 7:1 gegen Deutschland 2014 ist immer noch in allen Köpfen. Der nationale Druck ist der Motor dieses Projekts.",
    betOdds: "6.50",
  },
  angleterre: {
    narrative:
      "It's coming home? Die Generation Bellingham-Saka-Foden ist vielleicht die talentierteste seit 1966. Finalisten der EM 2021 und 2024, die Three Lions haben die Mentalität für große Anlässe, scheinen aber seit Jahren im Halbfinale festzustecken. 2026 könnte die Gruppe von Southgate (oder seinem Nachfolger) mit zusätzlicher Erfahrung den entscheidenden Schritt machen. Die Premier League bietet den englischen Spielern eine Spielintensität, die sie perfekt auf Turniere vorbereitet.",
    keyPlayer: "Jude Bellingham",
    keyPlayerDesc:
      "Offensiver Mittelfeldspieler von Real Madrid, potenzieller Ballon-d'Or-Gewinner. Mit 22 Jahren im Jahr 2026 wird er auf dem absoluten Höhepunkt seiner physischen Stärke sein.",
    tacticalEdge:
      "Solider Defensivblock + schnelle Umschaltmomente mit Flügelspielern mit Tempo. England gibt nichts her.",
    xFactor:
      "60 Jahre Durststrecke zu beenden wäre das Fußballereignis des Jahrhunderts in England. Die Motivation ist absolut.",
    betOdds: "7.00",
  },
  allemagne: {
    narrative:
      "Die Mannschaft befindet sich seit der Demütigung in der Vorrunde 2018 und 2022 im Wiederaufbau. Unter Nagelsmann ist das Neustart-Projekt ermutigend: neuer Spielstil zwischen intensivem Pressing und Ballbesitz. Deutschland hat bei der Heim-EM 2024 wieder Biss gezeigt. Florian Wirtz (Bayer Leverkusen) ist das kreative Element, das diesem Team fehlte. 4 WM-Titel in der Geschichte — Deutschland hat die DNA für einen 5.",
    keyPlayer: "Florian Wirtz",
    keyPlayerDesc:
      "Der beste Zehner seiner Generation in der Bundesliga. Technisch, kreativ, entscheidend. Der Spieler, der Deutschland wieder Magie verleiht.",
    tacticalEdge:
      "Fehlerfreie Mannschaftsorganisation, legendäre taktische Disziplin. Deutschland verliert nie aus Nachlässigkeit.",
    xFactor:
      "Der Rebound-Effekt nach zwei gescheiterten Vorrunden. Die Deutschen haben eine einzigartige Resilienzkultur im Weltfußball.",
    betOdds: "8.00",
  },
};

export const cdmHomeStats = [
  {
    year: 1930,
    host: "Uruguay",
    winner: "Uruguay",
    hostWon: true,
    hostFlag: "🇺🇾",
    note: "Erste WM",
  },
  {
    year: 1934,
    host: "Italien",
    winner: "Italien",
    hostWon: true,
    hostFlag: "🇮🇹",
    note: "Faschistische Organisation",
  },
  {
    year: 1938,
    host: "Frankreich",
    winner: "Italien",
    hostWon: false,
    hostFlag: "🇫🇷",
    note: "Italien erneut",
  },
  {
    year: 1950,
    host: "Brasilien",
    winner: "Uruguay",
    hostWon: false,
    hostFlag: "🇧🇷",
    note: "Das Maracanazo, brasilianisches Drama",
  },
  {
    year: 1954,
    host: "Schweiz",
    winner: "Deutschland",
    hostWon: false,
    hostFlag: "🇨🇭",
    note: "Wunder von Bern",
  },
  {
    year: 1958,
    host: "Schweden",
    winner: "Brasilien",
    hostWon: false,
    hostFlag: "🇸🇪",
    note: "1. Titel Brasilien, 17-jähriger Pelé",
  },
  {
    year: 1962,
    host: "Chile",
    winner: "Brasilien",
    hostWon: false,
    hostFlag: "🇨🇱",
    note: "Brasilien bestätigt",
  },
  {
    year: 1966,
    host: "England",
    winner: "England",
    hostWon: true,
    hostFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    note: "Einziger englischer Titel",
  },
  {
    year: 1970,
    host: "Mexiko",
    winner: "Brasilien",
    hostWon: false,
    hostFlag: "🇲🇽",
    note: "Pelés legendäres Brasilien",
  },
  {
    year: 1974,
    host: "Deutschland",
    winner: "Deutschland",
    hostWon: true,
    hostFlag: "🇩🇪",
    note: "Beckenbauer als Kapitän",
  },
  {
    year: 1978,
    host: "Argentinien",
    winner: "Argentinien",
    hostWon: true,
    hostFlag: "🇦🇷",
    note: "1. argentinischer Titel",
  },
  {
    year: 1982,
    host: "Spanien",
    winner: "Italien",
    hostWon: false,
    hostFlag: "🇪🇸",
    note: "Rossi in Hochform",
  },
  {
    year: 1986,
    host: "Mexiko",
    winner: "Argentinien",
    hostWon: false,
    hostFlag: "🇲🇽",
    note: "Die Hand Gottes",
  },
  {
    year: 1990,
    host: "Italien",
    winner: "Deutschland",
    hostWon: false,
    hostFlag: "🇮🇹",
    note: "Nacht von Rom",
  },
  {
    year: 1994,
    host: "USA",
    winner: "Brasilien",
    hostWon: false,
    hostFlag: "🇺🇸",
    note: "Brasilien im Elfmeterschießen",
  },
  {
    year: 1998,
    host: "Frankreich",
    winner: "Frankreich",
    hostWon: true,
    hostFlag: "🇫🇷",
    note: "Zidane x2, Nationalfeiertag",
  },
  {
    year: 2002,
    host: "Japan/Korea",
    winner: "Brasilien",
    hostWon: false,
    hostFlag: "🇯🇵🇰🇷",
    note: "Ronaldo feiert Comeback",
  },
  {
    year: 2006,
    host: "Deutschland",
    winner: "Italien",
    hostWon: false,
    hostFlag: "🇩🇪",
    note: "Zidanes Kopfstoß",
  },
  {
    year: 2010,
    host: "Südafrika",
    winner: "Spanien",
    hostWon: false,
    hostFlag: "🇿🇦",
    note: "Spanisches Tiki-Taka",
  },
  {
    year: 2014,
    host: "Brasilien",
    winner: "Deutschland",
    hostWon: false,
    hostFlag: "🇧🇷",
    note: "Das 7:1, Mineirazo",
  },
  {
    year: 2018,
    host: "Russland",
    winner: "Frankreich",
    hostWon: false,
    hostFlag: "🇷🇺",
    note: "Mbappé erobert die Welt",
  },
  {
    year: 2022,
    host: "Katar",
    winner: "Argentinien",
    hostWon: false,
    hostFlag: "🇶🇦",
    note: "Messi gekrönt, episches Finale",
  },
];

export const homeWins = cdmHomeStats.filter((s) => s.hostWon).length;
export const totalEditions = cdmHomeStats.length;
export const homeWinPct = Math.round((homeWins / totalEditions) * 100);
