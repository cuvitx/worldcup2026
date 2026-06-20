import type { TeamHistoryEntry } from "../team-history";

export const teamHistoryDE: Record<string, Partial<TeamHistoryEntry>> = {
  // ============================================================
  //  FRANKREICH
  // ============================================================
  france: {
    bestResult: "Weltmeister (1998, 2018)",
    notableResults: [
      { year: 1930, stage: "Gruppenphase", detail: "Erste Teilnahme" },
      { year: 1958, stage: "Dritter Platz", detail: "Just Fontaine erzielt 13 Tore, absoluter Rekord" },
      { year: 1982, stage: "Vierter Platz", detail: "Episches Halbfinale gegen Deutschland (3:3 n.V.)" },
      { year: 1986, stage: "Dritter Platz", detail: "Platini und die Zidane-Generation im Halbfinale" },
      { year: 1998, stage: "Weltmeister", detail: "Zidane mit Doppelpack, 3:0-Sieg gegen Brasilien im Finale" },
      { year: 2006, stage: "Finalist", detail: "Zidane im Finale vom Platz gestellt, Niederlage im Elfmeterschießen" },
      { year: 2018, stage: "Weltmeister", detail: "4:2-Sieg im Finale gegen Kroatien in Russland" },
      { year: 2022, stage: "Finalist", detail: "Niederlage im Elfmeterschießen gegen Argentinien, Mbappé mit Hattrick" },
    ],
    strengths: [
      "Außergewöhnliche Kadertiefe",
      "Schnelligkeit und Wucht im Konter",
      "Defensive Stabilität (beste Abwehr 2018)",
      "Weltstars im Kader (Mbappé, Griezmann)",
      "Erfahrung in großen Endspielen",
    ],
    weaknesses: [
      "Schwankende Leistungen je nach Turnier",
      "Mögliche interne Spannungen in der Kabine",
      "Übermäßige Abhängigkeit von Mbappé",
      "Teilweise nervöse Gruppenphase",
    ],
    playingStyle:
      "Frankreich wechselt zwischen einem soliden Mittelfeldblock und blitzschnellen Umschaltmomenten, die Mbappés Tempo ausnutzen. Didier Deschamps setzt auf defensive Stabilität und Effizienz statt Spektakel, mit einem 4-3-3 oder 4-2-3-1 je nach Gegner. Les Bleus können leiden und dann den kleinsten gegnerischen Fehler eiskalt bestrafen.",
    anecdotes: [
      "Just Fontaine erzielte bei der WM 1958 in nur 6 Spielen 13 Tore — ein Rekord, der seit 68 Jahren Bestand hat und wohl nie gebrochen wird.",
      "Die Nacht von Sevilla (1982): Frankreich führt in der Verlängerung 3:1 gegen Deutschland, doch die Deutschen gleichen aus und gewinnen im Elfmeterschießen. Es gilt als eines der größten Spiele der Fußballgeschichte.",
      "Zinédine Zidane wird im Finale 2006 gegen Italien nach einem Kopfstoß gegen Marco Materazzi vom Platz gestellt — das denkwürdigste und umstrittenste Bild der WM-Geschichte.",
    ],
  },

  // ============================================================
  //  BRASILIEN
  // ============================================================
  bresil: {
    bestResult: "Weltmeister (1958, 1962, 1970, 1994, 2002)",
    notableResults: [
      { year: 1950, stage: "Finalist", detail: "Das Maracanaço: 1:2-Niederlage gegen Uruguay im Finale" },
      { year: 1958, stage: "Weltmeister", detail: "Pelé mit 17 Jahren, erster WM-Titel" },
      { year: 1962, stage: "Weltmeister", detail: "Zweiter Titel in Folge" },
      { year: 1970, stage: "Weltmeister", detail: "Gilt als beste Mannschaft aller Zeiten" },
      { year: 1982, stage: "Gruppenphase (2. Runde)", detail: "Brasiliens Zauberelf um Zico scheitert an Italien" },
      { year: 1994, stage: "Weltmeister", detail: "Romário und Bebeto, Titel im Elfmeterschießen gegen Italien" },
      { year: 2002, stage: "Weltmeister", detail: "Ronaldo und Rivaldo, fünfter Titel, 2:0 im Finale gegen Deutschland" },
      { year: 2014, stage: "Vierter Platz", detail: "1:7 gegen Deutschland im Halbfinale, nationales Trauma" },
    ],
    strengths: [
      "Einer der größten Talentpools der Welt",
      "Technisch brillantes und kreatives Spiel (Ginga)",
      "Kombination aus Körperlichkeit und Technik",
      "Erfahrung bei Weltmeisterschaften",
      "Unvergleichliche Unterstützung der Fans",
    ],
    weaknesses: [
      "Enormer psychologischer Druck als Gastgeber oder Favorit",
      "Teilweise überraschende Defensivschwächen",
      "Fehlende taktische Konstanz in jüngerer Zeit",
      "Schwäche im Elfmeterschießen (Ausscheiden 2006, 2010, 2022)",
    ],
    playingStyle:
      "Die Seleção spielt traditionell offensiven Fußball, der auf individueller Kreativität und kurzen Kombinationen basiert. Das 4-2-3-1 oder 4-3-3 lässt Raum für Dribblings und Tempodurchbrüche. Die brasilianische Ginga — dieser fließende, spielfreudige Stil — steckt in der DNA jedes im Land ausgebildeten Spielers.",
    anecdotes: [
      "Das Maracanaço (1950): Brasilien verliert das Finale gegen Uruguay vor 200.000 Zuschauern im Maracanã. Dieses nationale Trauma hat ganze Generationen von Brasilianern geprägt und den brasilianischen Fußball jahrzehntelang verfolgt.",
      "1970 gelingt Brasilien eine Passstafette von 25 aufeinanderfolgenden Ballberührungen vor dem Tor von Carlos Alberto im Finale — es gilt als das schönste Mannschaftstor der WM-Geschichte.",
      "Das 1:7 gegen Deutschland im WM-Halbfinale 2014 im eigenen Land. Das Stadion von Belo Horizonte weinte live vor den Augen der ganzen Welt. Die Brasilianer tauften diesen Abend 'O Mineiraço'.",
    ],
  },

  // ============================================================
  //  ARGENTINIEN
  // ============================================================
  argentine: {
    bestResult: "Weltmeister (1978, 1986, 2022)",
    notableResults: [
      { year: 1930, stage: "Finalist", detail: "Erstes WM-Finale, Niederlage gegen Uruguay" },
      { year: 1978, stage: "Weltmeister", detail: "Erster Titel, Mario Kempes als Held" },
      { year: 1986, stage: "Weltmeister", detail: "Der göttliche Maradona, 5:3 gegen Deutschland im Finale" },
      { year: 1990, stage: "Finalist", detail: "0:1-Niederlage gegen Deutschland" },
      { year: 2014, stage: "Finalist", detail: "0:1-Niederlage im Finale gegen Deutschland (Götze)" },
      { year: 2022, stage: "Weltmeister", detail: "Messi wird nach einem epischen Finale gegen Frankreich gekrönt" },
    ],
    strengths: [
      "Lionel Messi, bester Spieler aller Zeiten und amtierender Weltmeister",
      "Herausragender Mannschaftszusammenhalt seit 2021",
      "Defensive Stabilität und taktische Organisation",
      "Erfahrung in großen Druckmomenten",
      "Siegermentalität und Gewinnercharakter",
    ],
    weaknesses: [
      "Der Umbruch nach Messi steht bevor",
      "Historische Abhängigkeit von einzelnen Stars",
      "Anfälligkeit gegen extrem athletische Mannschaften",
      "Umgang mit medialer Kritik nach Rückschlägen",
    ],
    playingStyle:
      "Die Albiceleste unter Scaloni spielt ein kompaktes und organisiertes 4-4-2 bzw. 4-3-3, aufgebaut um Messis Kreativität. Der Block steht defensiv stabil, die Umschaltmomente sind schnell. Das moderne Argentinien hängt nicht mehr von einem einzelnen Spieler ab, sondern von einem eingeschworenen Kollektiv, in dem jeder seine Rolle genau kennt.",
    anecdotes: [
      "Die Hand Gottes (1986): Diego Maradona erzielt im Viertelfinale gegen England ein Tor mit der Hand, bevor er im selben Spiel das 'Tor des Jahrhunderts' nach einem Dribbling an fünf Gegenspielern vorbei schießt. Zwei Tore, zwei Welten.",
      "Das Finale 2022 gilt als das beste aller Zeiten: Messi gegen Mbappé, 3:3 nach Verlängerung, Argentinien gewinnt im Elfmeterschießen — nach einem Mbappé-Hattrick binnen acht Minuten. Die ganze Welt hielt den Atem an.",
      "Mario Kempes, der nie für einen argentinischen Verein gespielt hatte (er stand beim FC Valencia unter Vertrag), wurde von Trainer Menotti für 1978 nachnominiert und avancierte mit sechs Toren zum Helden des ersten argentinischen WM-Titels, darunter zwei Treffer im Finale.",
    ],
  },

  // ============================================================
  //  DEUTSCHLAND
  // ============================================================
  allemagne: {
    bestResult: "Weltmeister (1954, 1974, 1990, 2014)",
    notableResults: [
      { year: 1954, stage: "Weltmeister", detail: "Das Wunder von Bern, 3:2-Sieg gegen Ungarn" },
      { year: 1966, stage: "Finalist", detail: "2:4-Niederlage gegen England im Finale" },
      { year: 1974, stage: "Weltmeister", detail: "2:1-Sieg gegen die Niederlande um Cruyff" },
      { year: 1982, stage: "Finalist", detail: "1:3-Niederlage im Finale gegen Italien nach Verlängerung" },
      { year: 1990, stage: "Weltmeister", detail: "Symbolische Wiedervereinigung, Sieg gegen Argentinien" },
      { year: 2002, stage: "Finalist", detail: "0:2-Niederlage gegen Brasilien und Ronaldo" },
      { year: 2014, stage: "Weltmeister", detail: "7:1 gegen Brasilien, Götze schießt das Tor im Finale" },
      { year: 2018, stage: "Gruppenphase", detail: "Schock-Aus bereits in der Vorrunde" },
    ],
    strengths: [
      "Tadellose taktische Organisation",
      "Legendäre Siegermentalität ('German Efficiency')",
      "Ausbildung von Weltklassespielern",
      "Fähigkeit, in den großen Spielen zu liefern",
      "Kadertiefe dank der Bundesliga",
    ],
    weaknesses: [
      "Umbruchphase seit 2018",
      "Mangel an aktuellen Weltklassespielern",
      "Anfälligkeit gegen sehr schnelle Mannschaften",
      "Erwartungsdruck durch die historische Erfolgsbilanz",
    ],
    playingStyle:
      "Die Mannschaft spielt ein intensives Pressing kombiniert mit strukturiertem Ballbesitzspiel. Das 4-2-3-1 oder 3-4-3 ermöglicht saubere Spieleröffnungen und Dreieckskombinationen auf den Flügeln. Nagelsmann hat den Ansatz modernisiert, indem er mehr Positionsflexibilität und höhere Pressingintensität eingebaut hat.",
    anecdotes: [
      "Das Wunder von Bern (1954): Die Bundesrepublik besiegt Ungarn im Finale mit 3:2, obwohl dasselbe ungarische Team sie in der Gruppenphase mit 8:3 geschlagen hatte. Rahn schießt in der 84. Minute das Siegtor. Dieser Titel symbolisiert das Wirtschaftswunder der Nachkriegszeit.",
      "Die Nacht von Sevilla (1982): Deutsche und Franzosen bestreiten das erste Elfmeterschießen in einem WM-Halbfinale überhaupt. Torwart Schumacher rammt Battiston (ohne Platzverweis), und Deutschland qualifiziert sich trotz allem.",
      "1990: Das Finale gegen Argentinien ist fußballerisch wertlos (1:0 durch Elfmeter, eine Rote Karte für Argentinien, Gelbe Karten im Überfluss), markiert aber die symbolische Wiedervereinigung der beiden Deutschlands, die im selben Herbst auch politisch zusammenfanden.",
    ],
  },

  // ============================================================
  //  SPANIEN
  // ============================================================
  espagne: {
    bestResult: "Weltmeister (2010)",
    notableResults: [
      { year: 1950, stage: "Vierter Platz" },
      { year: 1994, stage: "Viertelfinale" },
      { year: 2002, stage: "Viertelfinale", detail: "Umstrittenes Ausscheiden gegen Südkorea" },
      { year: 2010, stage: "Weltmeister", detail: "1:0-Sieg nach Verlängerung gegen die Niederlande im Finale (Iniesta)" },
      { year: 2014, stage: "Gruppenphase", detail: "Schock-Aus bereits in der Vorrunde" },
      { year: 2022, stage: "Viertelfinale", detail: "Ausscheiden gegen Marokko im Elfmeterschießen" },
    ],
    strengths: [
      "Meisterliches Tiki-Taka und Ballbesitzspiel",
      "Herausragende junge Talente (Yamal, Pedri)",
      "Bestens organisiertes Kollektivpressing",
      "Defensive Stabilität und sauberes Aufbauspiel",
      "Überzeugender EM-Titel 2024",
    ],
    weaknesses: [
      "Manchmal zu berechenbar im Ballbesitz",
      "Anfälligkeit bei schnellen Kontern",
      "Fehlen eines zuverlässigen Weltklasse-Stürmers",
      "Historisch enttäuschende Leistungen nach Titelgewinnen",
    ],
    playingStyle:
      "La Roja spielt ein 4-3-3 oder 4-2-3-1, das auf Ballbesitz und kollektivem Pressing basiert. Lamine Yamal bringt auf der rechten Seite eine Dribbelstärke und Durchschlagskraft mit, wie Spanien sie seit Jahren nicht mehr hatte. Pedri und Gavi dirigieren im Mittelfeld und schaffen Räume für die Angreifer.",
    anecdotes: [
      "Carles Puyols Kopfballtor im WM-Halbfinale 2010 gegen Deutschland: Der Verteidiger steigt bei einer Ecke hoch und köpft Spanien ins Finale. Ein Sinnbild für den Mannschaftsgeist dieser legendären Elf.",
      "2010, nach 44 Jahren ohne WM-Titel, schlägt Spanien die Niederlande 1:0 nach Verlängerung dank eines Treffers von Iniesta in der 116. Minute. Madrid feiert in dieser Nacht mit Millionen Menschen auf den Straßen.",
      "2014 wird Spanien als amtierender Welt- und Doppel-Europameister bereits in der Vorrunde in Brasilien eliminiert — mit einem 1:5 gegen die Niederlande und einem 0:2 gegen Chile. Einer der größten Abstürze eines Titelverteidigers in der Geschichte.",
    ],
  },

  // ============================================================
  //  ENGLAND
  // ============================================================
  angleterre: {
    bestResult: "Weltmeister (1966)",
    notableResults: [
      { year: 1966, stage: "Weltmeister", detail: "4:2-Sieg gegen Deutschland, Geoff Hurst mit Hattrick" },
      { year: 1970, stage: "Viertelfinale", detail: "2:3-Niederlage gegen Deutschland nach 2:0-Führung" },
      { year: 1986, stage: "Viertelfinale", detail: "Ausgeschieden durch Maradona (Hand Gottes)" },
      { year: 1990, stage: "Vierter Platz", detail: "Niederlage im Elfmeterschießen gegen Deutschland" },
      { year: 2018, stage: "Vierter Platz", detail: "Bestes Ergebnis seit 1990 unter Southgate" },
      { year: 2022, stage: "Viertelfinale", detail: "1:2-Niederlage gegen Frankreich" },
    ],
    strengths: [
      "Premier League, die wettbewerbsstärkste Liga der Welt",
      "Intensives körperbetontes Pressing",
      "Harry Kane, einer der besten Stürmer der Welt",
      "Kadertiefe auf allen Positionen",
      "In der Premier League geschärfte Wettkampfmentalität",
    ],
    weaknesses: [
      "58 Jahre ohne WM-Titel (nationaler Fluch)",
      "Enttäuschende Ergebnisse trotz hochkarätiger Kader",
      "Psychologische Anfälligkeit in den großen Momenten (Elfmeterschießen)",
      "Zeitweise fehlende Kreativität in der Offensive",
    ],
    playingStyle:
      "England spielt ein direktes und körperbetontes 4-3-3 oder 4-2-3-1, das die Tiefe mit schnellen Flügelspielern und Harry Kanes Wucht im Strafraum ausnutzt. Unter Southgate und seinem Nachfolger bleibt das Spiel strukturiert und schwer zu knacken, kann aber gegen die besten Mannschaften an Esprit vermissen lassen.",
    anecdotes: [
      "Das Wembley-Tor von 1966: Im Finale gegen Deutschland prallt Geoff Hursts Schuss von der Unterkante der Latte ab. Der sowjetische Linienrichter gibt das Tor (das die Linie vielleicht gar nicht überschritten hatte). England führt 3:2 und gewinnt letztlich 4:2. Die Kontroverse dauert bis heute an.",
      "The Three Lions und das Elfmeterschießen: England schied bei den WM-Turnieren 1990, 1998, 2006 und bei der EM 1996 im Elfmeterschießen aus. Dieser 'Fluch' wurde zum nationalen Running Gag — bis zum Sieg im Elfmeterschießen bei der EM 2020.",
      "Bobby Moore, Kapitän der Weltmeistermannschaft von 1966, starb 1993 an Darmkrebs. Seine Statue steht vor dem Wembley-Stadion, und er bleibt eine der beliebtesten Ikonen des englischen Fußballs.",
    ],
  },

  // ============================================================
  //  ITALIEN
  // ============================================================
  italie: {
    bestResult: "Weltmeister (1934, 1938, 1982, 2006)",
    notableResults: [
      { year: 1934, stage: "Weltmeister", detail: "Titelgewinn im eigenen Land unter Mussolini" },
      { year: 1938, stage: "Weltmeister", detail: "Titelverteidigung" },
      { year: 1970, stage: "Finalist", detail: "1:4-Niederlage gegen Brasiliens Pelé" },
      { year: 1982, stage: "Weltmeister", detail: "Rossis Hattrick gegen Brasilien, Titelgewinn in Spanien" },
      { year: 1990, stage: "Dritter Platz", detail: "Im Elfmeterschießen gegen Argentinien ausgeschieden" },
      { year: 1994, stage: "Finalist", detail: "Roberto Baggio verschießt den entscheidenden Elfmeter" },
      { year: 2006, stage: "Weltmeister", detail: "Sieg im Elfmeterschießen gegen Frankreich nach Zidanes Kopfstoß" },
    ],
    strengths: [
      "Legendäre Abwehrtradition (Catenaccio)",
      "Hervorragend ausgebildete Taktiker aus der Serie A",
      "Erfahrung auf der großen WM-Bühne",
      "Fähigkeit, sich taktisch neu zu erfinden",
    ],
    weaknesses: [
      "Verpasste WM 2018 (historisches Qualifikationsversagen)",
      "Aktuelle Generation weniger dominant als frühere",
      "Elfmeterschwäche trotz großer Tradition (Baggio 1994)",
      "Serie A weniger konkurrenzfähig als in den 2000ern",
    ],
    playingStyle:
      "Die Squadra Azzurra bewahrt ihre defensive Tradition und modernisiert zugleich ihr Spiel unter Spalletti. Das 4-3-3 ermöglicht kurze Kombinationen und hohes Anlaufen. Die italienische Mannschaft ist bekannt für ihre taktische Disziplin und die Fähigkeit, als Kollektiv zu leiden.",
    anecdotes: [
      "Roberto Baggio und der verschossene Elfmeter von 1994: Im Finale gegen Brasilien schießt Baggio — bester Spieler des Turniers — seinen Elfmeter über das Tor und schenkt den Brasilianern den Titel. Das Bild seiner Hände auf dem Kopf zählt zu den ikonischsten Momenten der Sportgeschichte.",
      "Paolo Rossi erzielt bei der WM 1982 in drei Spielen sechs Tore, nachdem er von einer zweijährigen Sperre wegen Korruptionsverdachts zurückgekehrt war. Sein Hattrick gegen Brasilien im Viertelfinale gilt als eine der größten Einzelleistungen der WM-Geschichte.",
      "Italien ist das einzige Land, das sich als vierfacher Weltmeister für zwei aufeinanderfolgende Weltmeisterschaften (2018 und 2022) nicht qualifizieren konnte. Ein struktureller Zusammenbruch des italienischen Fußballs, der das Land zutiefst erschüttert hat.",
    ],
  },

  // ============================================================
  //  NIEDERLANDE
  // ============================================================
  "pays-bas": {
    bestResult: "Finalist (1974, 1978, 2010)",
    notableResults: [
      { year: 1974, stage: "Finalist", detail: "Cruyffs Totaler Fußball, 1:2-Niederlage gegen Deutschland" },
      { year: 1978, stage: "Finalist", detail: "Ohne Cruyff, 1:3-Niederlage gegen Argentinien nach Verlängerung" },
      { year: 1998, stage: "Vierter Platz", detail: "Spektakuläres Halbfinale gegen Brasilien (1:1, Elfmeterschießen)" },
      { year: 2010, stage: "Finalist", detail: "0:1-Niederlage gegen Spanien im Finale" },
      { year: 2014, stage: "Dritter Platz", detail: "Van Persies legendärer Flugkopfball gegen Spanien" },
      { year: 2022, stage: "Viertelfinale", detail: "Im Elfmeterschießen gegen Argentinien ausgeschieden" },
    ],
    strengths: [
      "Eine der besten Fußball-Ausbildungen der Welt",
      "Starke Spielidentität (Totaler Fußball als Erbe Cruyffs)",
      "Talentschmiede Ajax und weitere große Akademien",
      "Weltklassespieler in der Premier League und La Liga",
    ],
    weaknesses: [
      "Trotz immensem Talent nie Weltmeister geworden",
      "Mentale Schwäche in Endspielen",
      "Neigung zu internen Spannungen (1990, 2006)",
      "Abhängigkeit von einzelnen Schlüsselspielern",
    ],
    playingStyle:
      "Oranje spielt ein intensives Kollektivpressing als Erbe des Totalen Fußballs von Cruyff. Das 4-3-3 bleibt die Grundformation mit stark offensiven Außenverteidigern und einem dynamischen Mittelfeld. Schnelle Ballzirkulation und Positionswechsel sind die Markenzeichen des niederländischen Fußballs.",
    anecdotes: [
      "Johan Cruyff weigert sich, an der WM 1978 in Argentinien teilzunehmen — offiziell aus politischen Gründen (die Militärjunta). Die Niederlande erreichen ohne ihn das Finale. Den wahren Grund — einen Entführungsversuch gegen seine Familie 1977 — enthüllt er erst 30 Jahre später.",
      "Van Persies Flugkopfball gegen Spanien 2014 (5:1): Auf einen langen Ball von Robben aus dem Mittelfeld stürzt sich Van Persie aus sechs Metern Entfernung und köpft den Ball im Flug in die gleiche Ecke. Zum schönsten Tor des Turniers gewählt.",
      "1974 eröffnen die Niederlande das Finale mit einem Treffer, bevor Deutschland den Ball überhaupt berührt hat: 13 aufeinanderfolgende Pässe und ein Elfmeter für Breitner. Doch Deutschland dreht das Spiel noch (2:1).",
    ],
  },

  // ============================================================
  //  PORTUGAL
  // ============================================================
  portugal: {
    bestResult: "Dritter Platz (1966)",
    notableResults: [
      { year: 1966, stage: "Dritter Platz", detail: "Eusébio mit 9 Toren, Torschützenkönig des Turniers" },
      { year: 2006, stage: "Vierter Platz", detail: "Starkes Turnier mit Ronaldo und Figo" },
      { year: 2010, stage: "Viertelfinale" },
      { year: 2022, stage: "Viertelfinale", detail: "0:1-Ausscheiden gegen Marokko" },
    ],
    strengths: [
      "Cristiano Ronaldo, einer der größten Spieler aller Zeiten",
      "Weltklasse-Mittelfeldspieler (B. Silva, R. Neves)",
      "Intensives Pressing und defensive Organisation",
      "Stetig wachsende Kadertiefe",
    ],
    weaknesses: [
      "Der Umbruch nach Ronaldo muss vorbereitet werden",
      "Historische Abhängigkeit von Ronaldo (nicht immer leistungsfördernd)",
      "Kein WM- oder EM-Titel in jüngerer Zeit",
      "Balance zwischen Ego und Kollektivgeist",
    ],
    playingStyle:
      "Portugal spielt ein 4-3-3 oder 4-2-3-1, aufgebaut um die Kreativität von Bernardo Silva und Ronaldos bzw. Félix' Ausweichbewegungen. Das Pressing ist organisiert, die defensive Umschaltbewegung schnell. Roberto Martínez hat den Ansatz modernisiert und mehr taktische Tiefe eingebracht.",
    anecdotes: [
      "Eusébio weint nach Portugals Halbfinal-Aus 1966 gegen England (1:2). Er hatte bei dieser WM neun Tore erzielt — darunter vier im Viertelfinale gegen Nordkorea, als Portugal einen 0:3-Rückstand aufholte.",
      "1966 besiegt Portugal Nordkorea mit 5:3, nachdem man zur Halbzeit 0:3 zurücklag. Eusébio schießt in der zweiten Halbzeit vier Tore. Es gilt als eine der spektakulärsten Aufholjagden der WM-Geschichte.",
      "Ronaldo weinte nach Portugals Ausscheiden gegen Marokko bei der WM 2022. Er hatte nach einer umstrittenen Entscheidung von Trainer Santos nur ein einziges Spiel von Beginn an bestritten.",
    ],
  },

  // ============================================================
  //  URUGUAY
  // ============================================================
  uruguay: {
    bestResult: "Weltmeister (1930, 1950)",
    notableResults: [
      { year: 1930, stage: "Weltmeister", detail: "Erste WM überhaupt, 4:2-Sieg im Finale gegen Argentinien" },
      { year: 1950, stage: "Weltmeister", detail: "Das Maracanaço: 2:1-Sieg gegen Brasilien" },
      { year: 1954, stage: "Vierter Platz", detail: "Episches Halbfinale, 2:4 gegen Ungarn" },
      { year: 1970, stage: "Vierter Platz", detail: "Halbfinale gegen Brasilien (1:3)" },
      { year: 2010, stage: "Vierter Platz", detail: "Suárez, Forlán (bester Spieler), Handspiel auf der Linie" },
    ],
    strengths: [
      "Legendäre Kämpfermentalität und defensive Solidarität",
      "Weltklasse-Stürmer (Suárez, Cavani)",
      "Erfahrung und Charakter in entscheidenden Momenten",
      "Tradition des körperbetonten und effizienten Fußballs",
    ],
    weaknesses: [
      "Generationenwechsel im Gange",
      "Kader weniger tief besetzt als bei anderen großen Nationen",
      "Image belastet durch Disziplinarvorfälle",
      "Unbeständige Ergebnisse in jüngerer Zeit",
    ],
    playingStyle:
      "Uruguay spielt einen sehr körperbetonten Fußball, der auf defensiver Stabilität und offensiver Effizienz basiert. Das kompakte 4-4-2 oder 4-3-3 verteidigt tief, bevor schnell auf die Stürmer umgeschaltet wird. Die Garra Charrúa — diese legendäre uruguayische Kampfkraft — bleibt das Herzstück dieser Mannschaft.",
    anecdotes: [
      "Das Maracanaço (1950): Uruguay besiegt Brasilien vor 200.000 Zuschauern im Maracanã mit 2:1 und holt den zweiten WM-Titel. Alcides Ghiggia, Torschütze des entscheidenden Treffers, sagte später: 'Nur drei Menschen haben das Maracanã zum Schweigen gebracht: Sinatra, der Papst und ich.'",
      "Suárez' Handspiel (2010): Im Viertelfinale gegen Ghana hält Suárez in den letzten Sekunden beim Stand von 1:1 einen Ball mit der Hand auf der Linie auf und verhindert so ein sicheres Tor. Er wird vom Platz gestellt, doch Ghana verschießt den Elfmeter. Uruguay qualifiziert sich im Elfmeterschießen. Heldentat oder Betrug? Die Debatte hält an.",
      "Diego Forlán wird zum besten Spieler der WM 2010 gewählt — mit fünf Toren. Seine Weitschüsse, insbesondere gegen Deutschland, sind unvergessen. Er war zu diesem Zeitpunkt 31 Jahre alt.",
    ],
  },

  // ============================================================
  //  BELGIEN
  // ============================================================
  belgique: {
    bestResult: "Dritter Platz (2018)",
    notableResults: [
      { year: 1986, stage: "Vierter Platz", detail: "Bestes Ergebnis vor 2018" },
      { year: 2014, stage: "Viertelfinale", detail: "Beginn der goldenen Generation" },
      { year: 2018, stage: "Dritter Platz", detail: "Goldene Generation auf dem Höhepunkt: De Bruyne, Hazard, Lukaku" },
      { year: 2022, stage: "Gruppenphase", detail: "Enttäuschendes Aus, interne Spannungen" },
    ],
    strengths: [
      "Kevin De Bruyne, einer der besten Mittelfeldspieler der Welt",
      "Taktische Tiefe und Vielseitigkeit",
      "Erfahrung auf der internationalen Bühne",
      "Romelu Lukaku als Zielspieler in der Spitze",
    ],
    weaknesses: [
      "Goldene Generation am Ende ihres Zyklus",
      "Wiederkehrende interne Spannungen in der Kabine",
      "Fehlende gleichwertige Nachfolger",
      "Abwehr teilweise anfällig bei Umschaltmomenten",
    ],
    playingStyle:
      "Belgien spielt ein 4-3-3 oder 3-4-3, das Lukakus Wucht und De Bruynes Spielübersicht zur Geltung bringt. Der Spielaufbau ist geduldig, die Umschaltmomente aber entscheidend. Die Mannschaft kann auch diszipliniert und effektiv verteidigen.",
    anecdotes: [
      "Kevin De Bruyne bestreitet die gesamte WM 2022 trotz einer schweren Muskelverletzung, die er sich vor dem Turnier zugezogen hat. Er spielt unter Spritzen und erklärt nach dem Ausscheiden, dass er seit dem ersten Spiel nicht mehr richtig gehen konnte.",
      "2018 besiegt Belgien Brasilien im Viertelfinale mit 2:1 — durch ein Eigentor und einen Schuss von De Bruyne. Es ist der Höhepunkt der goldenen belgischen Generation, die Hoffnungen auf den nie erreichten WM-Titel weckt.",
      "Belgien war drei Jahre in Folge (2018–2021) die Nummer 1 der FIFA-Weltrangliste, ohne jemals einen großen Titel gewonnen zu haben — eine Anomalie in der Fußballgeschichte.",
    ],
  },

  // ============================================================
  //  KROATIEN
  // ============================================================
  croatie: {
    bestResult: "Finalist (2018), Dritter Platz (2022 und 1998)",
    notableResults: [
      { year: 1998, stage: "Dritter Platz", detail: "Erste Teilnahme, Šuker gewinnt den Goldenen Schuh" },
      { year: 2018, stage: "Finalist", detail: "Epische Siege gegen Dänemark, Russland und England" },
      { year: 2022, stage: "Dritter Platz", detail: "Modrić und Gvardiol brillant, Sieg gegen Brasilien im Elfmeterschießen" },
    ],
    strengths: [
      "Luka Modrić, Maestro des Weltfußballs im Mittelfeld",
      "Außergewöhnliche Mentalität und Widerstandsfähigkeit",
      "Hervorragende Zweikämpfer und Eins-gegen-eins-Spieler",
      "Mannschaftszusammenhalt, geschmiedet durch historische Widrigkeiten",
    ],
    weaknesses: [
      "Modrić wird älter (40 Jahre 2026), der Übergang muss gelingen",
      "Kleines Land mit geringer Kadertiefe auf manchen Positionen",
      "Abhängigkeit von wenigen Schlüsselspielern",
      "Abwehr bei schnellen Umschaltangriffen teilweise anfällig",
    ],
    playingStyle:
      "Kroatien spielt ein 4-3-3 oder 4-2-3-1 mit Modrić als Schaltzentrale im Mittelfeld. Das Pressing ist organisiert und das Umschaltspiel schnell. Die Mannschaft brilliert in K.-o.-Spielen und zeigt eine phänomenale Widerstandskraft in kritischen Momenten — Verlängerungen und Elfmeterschießen eingeschlossen.",
    anecdotes: [
      "Bei der WM 2018 ging Kroatien in drei von fünf K.-o.-Spielen in die Verlängerung (gegen Dänemark, Russland und England) und absolvierte insgesamt über 600 Spielminuten. Eine physische und mentale Ausdauer ohnegleichen.",
      "Luka Modrić gewinnt 2018 den Ballon d'Or, nachdem er Kroatien ins WM-Finale geführt hat, und beendet damit zehn Jahre Ronaldo-Messi-Dominanz. Mit 33 Jahren war er der älteste Preisträger seit Ronaldo (dem Brasilianer) 1997.",
      "Davor Šuker gewinnt den Goldenen Schuh der WM 1998 mit sechs Toren. Sein legendärer Lupfer gegen Deutschland im Viertelfinale bleibt unvergessen.",
    ],
  },

  // ============================================================
  //  MEXIKO
  // ============================================================
  mexique: {
    bestResult: "Viertelfinalist (1970, 1986)",
    notableResults: [
      { year: 1970, stage: "Viertelfinale", detail: "Erstmals als Gastgeber, Niederlage gegen Italien" },
      { year: 1986, stage: "Viertelfinale", detail: "Zum zweiten Mal Gastgeber, Niederlage gegen Deutschland im Elfmeterschießen" },
      { year: 2002, stage: "Achtelfinale", detail: "Niederlage gegen die USA" },
      { year: 2010, stage: "Achtelfinale", detail: "1:3-Niederlage gegen Argentinien" },
      { year: 2018, stage: "Achtelfinale", detail: "1:0-Sieg gegen Deutschland in der Vorrunde, dann Niederlage gegen Brasilien" },
      { year: 2022, stage: "Gruppenphase", detail: "Erstmals seit 1978 in der Vorrunde ausgeschieden" },
    ],
    strengths: [
      "Riesige Fanunterstützung (Heimvorteil 2026)",
      "Estadio Azteca und seine 2.240 Meter Höhe",
      "Tradition schöner Tore und offensiven Spiels",
      "Die Liga MX wird zunehmend wettbewerbsfähiger",
    ],
    weaknesses: [
      "Gläserne Decke des Viertelfinales seit 40 Jahren",
      "Relativer Rückgang seit 2019 in der CONCACAF",
      "Fehlen von Stars auf absolutem Weltklasseniveau",
      "Nationaler Druck als Mitgastgeber",
    ],
    playingStyle:
      "El Tri spielt einen technischen und offensiven Fußball mit kreativen Mittelfeldspielern und schnellen Flügelspielern. Das 4-3-3 ermöglicht kurze Kombinationen und ein sauberes Aufbauspiel. Im Estadio Azteca setzt die Höhenlage (2.240 m) den Gegnern zu, und die Atmosphäre ist weltweit einzigartig.",
    anecdotes: [
      "Hugo Sánchez war der erste große mexikanische Weltstar und erzielte in zehn Jahren in der spanischen Liga 234 Tore für Atlético und Real Madrid. Doch bei einer WM konnte er nie glänzen — seine besten Leistungen blieben der Vereinsebene vorbehalten.",
      "Der 'Fluch des fünften Spiels': Mexiko hat noch nie das Achtelfinale überstanden, wenn es dort angekommen ist. Das wurde zur nationalen Obsession und zum Gegenstand zahlreicher psychologischer Analysen.",
      "2018 registrierten Seismographen in Mexiko-Stadt nach dem mexikanischen Tor gegen Deutschland Erschütterungen, die als leichte Beben gedeutet wurden — ausgelöst durch die kollektiven Jubelsprünge der Fans.",
    ],
  },

  // ============================================================
  //  JAPAN
  // ============================================================
  japon: {
    bestResult: "Achtelfinale (2002, 2010, 2022)",
    notableResults: [
      { year: 1998, stage: "Gruppenphase", detail: "Erste Teilnahme" },
      { year: 2002, stage: "Achtelfinale", detail: "Mitgastgeber, Siege gegen Russland und Tunesien" },
      { year: 2010, stage: "Achtelfinale", detail: "Im Elfmeterschießen gegen Paraguay ausgeschieden" },
      { year: 2022, stage: "Achtelfinale", detail: "Siege gegen Deutschland und Spanien, Niederlage gegen Kroatien" },
    ],
    strengths: [
      "Kollektive Organisation und tadellose taktische Disziplin",
      "Extrem intensives Pressing (asiatisches Gegenpressing)",
      "Historische Siege gegen Deutschland und Spanien (2022)",
      "Spieler in den besten europäischen Ligen",
    ],
    weaknesses: [
      "Fehlen eines Weltklasse-Stürmers",
      "Physische Nachteile gegen besonders athletische Mannschaften",
      "Mangelnde Erfahrung in den ganz großen Spielen",
      "Im Ballbesitz manchmal zu berechenbar",
    ],
    playingStyle:
      "Japan spielt ein intensives Kollektivpressing im 4-3-3 oder 4-2-3-1. Die kollektive Disziplin ist die größte Stärke dieser gut trainierten Mannschaft, die europäische Methoden übernommen hat. Schnelle Einwürfe und überraschende Umschaltmomente in der Offensive setzen die Gegner unter Druck.",
    anecdotes: [
      "Bei der WM 2022 in Katar wurde Japan das erste asiatische Team, das bei einer einzigen Weltmeisterschaft zwei ehemalige Weltmeister besiegte (Deutschland 2:1 und Spanien 2:1). Beide Siege gelangen durch Aufholjagden in der zweiten Halbzeit.",
      "Nach jedem Spiel reinigen die japanischen Fans die Tribünen — eine Tradition, die im Internet viral wurde. Auch die Spieler hinterlassen die Kabine tadellos sauber, mit einem Dankesschreiben in der jeweiligen Landessprache.",
      "2022 nahm Stürmer Tanaka einen Ball per Direktabnahme an, der laut TV-Bildern die Torauslinie bereits überquert zu haben schien. Die Torlinientechnik bestätigte jedoch, dass der Ball noch im Spiel war. Dieses umstrittene Tor brachte Japan ins Achtelfinale.",
    ],
  },

  // ============================================================
  //  SÜDKOREA
  // ============================================================
  "coree-du-sud": {
    bestResult: "Halbfinalist (2002)",
    notableResults: [
      { year: 2002, stage: "Halbfinale", detail: "Eliminiert Italien und Spanien, Niederlage gegen Deutschland" },
      { year: 2010, stage: "Achtelfinale", detail: "1:2-Niederlage gegen Uruguay" },
      { year: 2018, stage: "Gruppenphase", detail: "2:0-Sieg gegen den amtierenden Weltmeister Deutschland" },
      { year: 2022, stage: "Achtelfinale", detail: "Last-Minute-Sieg gegen Portugal, Niederlage gegen Brasilien" },
    ],
    strengths: [
      "Son Heung-min, Weltstar aus der Premier League",
      "Körperliche Intensität und bemerkenswert hohes Pressing",
      "Kollektive Disziplin und defensive Solidarität",
      "Erfahrung aus elf Teilnahmen in Folge",
    ],
    weaknesses: [
      "Fehlende offensive Kreativität ohne Son",
      "Unzureichende Kadertiefe auf manchen Positionen",
      "Anfälligkeit bei Spielen mit extremem psychologischem Druck",
      "Abhängigkeit von Son Heung-min",
    ],
    playingStyle:
      "Südkorea spielt ein 4-2-3-1 oder 4-3-3, das auf kollektive Intensität und schnelle Umschaltmomente setzt. Son Heung-min ist der offensive Katalysator, um den sich die Mannschaft organisiert. Hohes Anlaufen ermöglicht schnelle Balleroberungen und die Schaffung günstiger Situationen.",
    anecdotes: [
      "2002 werden Spanien und Italien unter höchst umstrittenen Umständen von Südkorea eliminiert: aberkannte Tore, schiedsrichterliche Fehlentscheidungen zugunsten der Koreaner. Italien (Tottis Platzverweis) und Spanien (zwei reguläre Tore aberkannt) haben diese Niederlagen nie verwunden.",
      "Bei der WM 2018 besiegt Südkorea den amtierenden Weltmeister Deutschland im letzten Gruppenspiel mit 2:0 und eliminiert die Deutschen — eine der größten Überraschungen der WM-Geschichte.",
      "Son Heung-min bestreitet die WM 2022 trotz eines dreifachen Bruchs um die linke Augenhöhle, den er sich drei Wochen zuvor zugezogen hatte. Er spielt das gesamte Turnier mit einer Schutzmaske.",
    ],
  },

  // ============================================================
  //  USA
  // ============================================================
  "etats-unis": {
    bestResult: "Dritter Platz (1930)",
    notableResults: [
      { year: 1930, stage: "Dritter Platz", detail: "Halbfinale gegen Argentinien (1:6)" },
      { year: 1950, stage: "Gruppenphase", detail: "Sensationeller 1:0-Sieg gegen England" },
      { year: 1994, stage: "Achtelfinale", detail: "WM-Gastgeber, Brasilien-Italien ausverkauft" },
      { year: 2002, stage: "Viertelfinale", detail: "0:1-Niederlage gegen Deutschland" },
      { year: 2022, stage: "Achtelfinale", detail: "1:3-Niederlage gegen die Niederlande" },
    ],
    strengths: [
      "Heimvorteil 2026 (Mitgastgeber)",
      "Herausragende Athletik",
      "Aufstrebende Generation aus MLS und Europa (Pulisic, Weah)",
      "Stetig wachsende Fanunterstützung",
    ],
    weaknesses: [
      "Mangelnde Erfahrung auf der ganz großen Bühne",
      "Fußball ist noch keine vorherrschende Sportkultur in den USA",
      "Fehlen von Weltklassespielern auf allen Positionen",
      "Ungewohnt hoher Druck als Gastgeber 2026",
    ],
    playingStyle:
      "Die USA spielen ein sehr physisches und athletisches 4-3-3 mit intensivem Hochpressing. Christian Pulisic ist der technisch versierteste Spieler und offensive Anführer. Unter Gregg Berhalter und seinem Nachfolger hat die Mannschaft einen soliden Kern von Spielern in Europa aufgebaut.",
    anecdotes: [
      "1950 schlägt die US-Mannschaft England mit 1:0 durch ein Kopfballtor von Gaetjens. Die englische Presse hält das Ergebnis zunächst für einen Druckfehler und korrigiert den Spielstand auf 10:1, bevor sie das tatsächliche Ergebnis bestätigt. Es gilt als die größte Sensation der WM-Geschichte.",
      "Claudio Reyna, Kapitän der USA bei den WM-Turnieren 2002 und 2006, ist der Vater von Gio Reyna, der seit 2020 für die USA aufläuft. Eine einzigartige Fußball-Dynastie in der Geschichte des amerikanischen Fußballs.",
      "Die MLS hat sich in 20 Jahren von einer zweitklassigen Liga zu einem Magneten für Weltstars entwickelt (Messi, Beckham, Zlatan) und damit die massive Popularisierung des Fußballs in den Vereinigten Staaten vorangetrieben.",
    ],
  },

  // ============================================================
  //  SENEGAL
  // ============================================================
  senegal: {
    bestResult: "Viertelfinalist (2002)",
    notableResults: [
      { year: 2002, stage: "Viertelfinale", detail: "Sensationssieg gegen den amtierenden Weltmeister Frankreich (1:0)" },
      { year: 2018, stage: "Gruppenphase", detail: "Durch die Fairplay-Regel ausgeschieden (gleiche Punkte wie Japan)" },
      { year: 2022, stage: "Achtelfinale", detail: "0:3-Niederlage gegen England" },
    ],
    strengths: [
      "Sadio Mané, afrikanischer Weltklassespieler",
      "Körperliche Stärke und Schnelligkeit der Angreifer",
      "Bemerkenswerte kollektive Solidarität",
      "Stetige Weiterentwicklung in den letzten 20 Jahren",
    ],
    weaknesses: [
      "Geringere taktische Tiefe im Vergleich zu den großen Nationen",
      "Abhängigkeit von Mané",
      "Anfälligkeit bei fragwürdigen Schiedsrichterentscheidungen oder externem Druck",
    ],
    playingStyle:
      "Senegal spielt ein physisches und direktes 4-3-3 oder 4-4-2, das die Schnelligkeit und Wucht seiner Angreifer ausnutzt. Sadio Mané ist der Dreh- und Angelpunkt des gesamten Offensivspiels. Die defensive Umschaltbewegung ist schnell, und der Block ist schwer aus dem Gleichgewicht zu bringen.",
    anecdotes: [
      "2002 besiegt Senegal bei seiner ersten WM den amtierenden Weltmeister Frankreich mit 1:0 durch ein Tor von Papa Bouba Diop. Ganz Afrika jubelt. Die Mannschaft erreicht anschließend das Viertelfinale mit einem Sieg gegen Schweden.",
      "2018 sind Senegal und Japan nach Punkten, Tordifferenz und erzielten Toren exakt gleichauf — doch Japan qualifiziert sich dank weniger Gelber Karten im Turnier. Senegal scheidet durch ein Kriterium aus, das zuvor nie angewandt worden war.",
      "Sadio Mané tritt bei der WM 2022 mit einer Knieverletzung an, die er sich vor dem Turnier zugezogen hat. Er verletzt sich im ersten Spiel erneut und verpasst die weiteren Partien. Senegal verliert im Achtelfinale gegen England.",
    ],
  },

  // ============================================================
  //  MAROKKO
  // ============================================================
  maroc: {
    bestResult: "Halbfinalist (2022)",
    notableResults: [
      { year: 1986, stage: "Achtelfinale", detail: "Erste afrikanische Mannschaft, die die Vorrunde übersteht" },
      { year: 2022, stage: "Halbfinale", detail: "Erste afrikanische und arabische Mannschaft im Halbfinale" },
    ],
    strengths: [
      "Herausragende Defensivstärke (kein Gegentor bis zum Halbfinale 2022)",
      "Eingeschworenes Kollektiv und perfekte taktische Organisation",
      "Tempo und Intensität auf allen Linien",
      "Enorme nationale und kontinentale Motivation",
    ],
    weaknesses: [
      "Mangelnde Konstanz in der Offensive",
      "Historisch wenige Spiele auf höchstem Niveau",
      "Defensive Ausrichtung geht manchmal auf Kosten des Offensivspiels",
    ],
    playingStyle:
      "Marokko spielt ein kompaktes, schwer zu durchdringendes 4-3-3. Walid Regragui hat eine nahezu perfekte Defensivordnung installiert, in der jeder Spieler diszipliniert agiert. Die Umschaltmomente sind schnell und nutzen das Tempo der Flügelspieler wie Ziyech oder Hakimi. Der psychologische Druck, als erste afrikanische Mannschaft im Halbfinale zu stehen, hat das Team paradoxerweise befreit.",
    anecdotes: [
      "Bei der WM 2022 in Katar schaltet Marokko nacheinander Belgien, Spanien (im Elfmeterschießen) und Portugal aus und wird zur ersten afrikanischen und arabischen Mannschaft im WM-Halbfinale. Eine historische Leistung, die weltweit Anerkennung findet.",
      "Torwart Yassine Bounou (Bono) kassiert in der Gruppenphase und bis zum Halbfinale kein einziges Gegentor — erst Frankreich überwindet ihn (2:0). Seine Paraden gegen Spanien im Elfmeterschießen zählen zu den eindrucksvollsten Torwartleistungen des Turniers.",
      "Trainer Walid Regragui wird erst im September 2022 zum Nationaltrainer ernannt — nur drei Monate vor WM-Beginn. In weniger als 90 Tagen formt er die Mannschaft komplett um und führt sie bis ins Halbfinale.",
    ],
  },

  // ============================================================
  //  AUSTRALIEN
  // ============================================================
  australie: {
    bestResult: "Achtelfinale (2006, 2022, 2023)",
    notableResults: [
      { year: 1974, stage: "Gruppenphase", detail: "Erste Teilnahme" },
      { year: 2006, stage: "Achtelfinale", detail: "3:1-Sieg gegen Japan, Niederlage gegen Italien" },
      { year: 2022, stage: "Achtelfinale", detail: "Sieg gegen Dänemark, 1:2-Niederlage gegen Argentinien" },
    ],
    strengths: [
      "Körperliche Intensität und Kampfgeist",
      "Taktisch gut organisiert unter Graham Arnold",
      "Fähigkeit, für Überraschungen zu sorgen",
      "Gute Kadertiefe im Angriff (Leckie, Goodwin)",
    ],
    weaknesses: [
      "Generelles Niveau unterhalb der großen Nationen",
      "Schwieriger Qualifikationsweg in Asien (lange Spielserien)",
      "Wenige Spieler in den großen europäischen Ligen",
    ],
    playingStyle:
      "Die Socceroos spielen ein organisiertes und körperbetontes 4-2-3-1. Das Pressing ist intensiv und die defensive Umschaltbewegung schnell. Die Mannschaft ist defensiv schwer zu bezwingen und sucht über Standardsituationen nach gegnerischen Schwächen.",
    anecdotes: [
      "Harry Kewell, einer der besten australischen Fußballer aller Zeiten, erzielt 2006 im Achtelfinale gegen Kroatien den Ausgleichstreffer (2:2 n.V., Qualifikation im Elfmeterschießen). Er spielt trotz eines Muskelfaserrisses und muss wenige Minuten nach seinem Tor verletzt ausgewechselt werden.",
      "Tim Cahill köpft 2006 innerhalb von fünf Minuten zwei Tore gegen Japan und dreht das Spiel von 0:1 auf 3:1. Er wird zum besten Torschützen der Socceroos-Geschichte.",
      "Australien wechselte 2006 vom ozeanischen Verband (OFC) zum asiatischen Verband (AFC), um seine Qualifikationschancen zu verbessern. Diese strategische Entscheidung hat den Zugang zu den WM-Endrunden deutlich erleichtert.",
    ],
  },

  // ============================================================
  //  KANADA
  // ============================================================
  canada: {
    bestResult: "Gruppenphase (1986, 2022)",
    notableResults: [
      { year: 1986, stage: "Gruppenphase", detail: "Erste Teilnahme, drei Niederlagen, kein Tor" },
      { year: 2022, stage: "Gruppenphase", detail: "Alphonso Davies als Superstar, null Punkte (drei Spiele)" },
    ],
    strengths: [
      "Alphonso Davies (Bayern München), einer der besten Außenverteidiger der Welt",
      "Jonathan David, treffsicherer Stürmer in der Ligue 1",
      "Aufstrebende Generation mit mehreren Spielern in Europa",
      "Mitgastgeber 2026, maximale Motivation",
    ],
    weaknesses: [
      "Wenig Erfahrung auf dem internationalen Parkett",
      "Kader noch in der Entwicklung",
      "Fußball ist in Kanada keine dominante Sportkultur",
      "Druck als Mitgastgeber 2026",
    ],
    playingStyle:
      "Kanada spielt ein dynamisches 4-2-3-1, das Davies' Tempo auf der linken Seite und Jonathan Davids Torinstinkt ausnutzt. Die Mannschaft hat sich unter John Herdman und seinem Nachfolger rasant weiterentwickelt, mit einem stetig wachsenden offensiven Spielstil.",
    anecdotes: [
      "Alphonso Davies wurde in einem Flüchtlingslager in Ghana geboren, nachdem seine Eltern vor dem liberianischen Bürgerkrieg geflohen waren. Mit 23 Jahren ist er einer der Weltstars des Fußballs beim FC Bayern München und eine Stütze der Nationalmannschaft.",
      "Bei der WM 2022 verliert Kanada trotz klarer Überlegenheit 0:1 gegen Belgien. Alphonso Davies verschießt einen Elfmeter, und die Mannschaft beendet das Turnier punktlos, zeigt aber starke Leistungen.",
      "Kanada hatte seit 1986 auf eine WM-Teilnahme gewartet. Die Qualifikation für 2022 wurde wie ein Nationalfeiertag gefeiert. 2026 als Mitgastgeber bietet sich eine historische Chance für den kanadischen Fußball.",
    ],
  },
};
