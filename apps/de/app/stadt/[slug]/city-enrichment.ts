export interface CityEnrichment {
  weather: {
    juinMin: number;
    juinMax: number;
    juilletMin: number;
    juilletMax: number;
    description: string;
  };
  transport: {
    aeroport: string;
    transports: string[];
  };
  budget: {
    hotelMin: number;
    hotelMax: number;
    repas: number;
    biere: number;
    currency: string;
  };
  activities: {
    title: string;
    description: string;
  }[];
}

export const cityEnrichmentData: Record<string, CityEnrichment> = {
  "new-york-new-jersey": {
    weather: {
      juinMin: 19,
      juinMax: 28,
      juilletMin: 22,
      juilletMax: 31,
      description: "Heiß und feucht — leichte Kleidung und einen Regenschirm für sommerliche Gewitter einplanen",
    },
    transport: {
      aeroport: "JFK International Airport (25 Min. mit AirTrain) — Newark Liberty Airport (NJ Transit direkt)",
      transports: ["MTA-U-Bahn (24h/Tag)", "NJ Transit zum MetLife Stadium", "Fanbusse am Spieltag"],
    },
    budget: {
      hotelMin: 180,
      hotelMax: 450,
      repas: 25,
      biere: 9,
      currency: "USD",
    },
    activities: [
      { title: "Freiheitsstatue & Ellis Island", description: "Weltberühmtes Wahrzeichen, Tickets im Voraus buchen — Fähre ab Battery Park" },
      { title: "Central Park", description: "800 Hektar Grün mitten in Manhattan — Radfahren, Joggen oder einfach Flanieren" },
      { title: "Broadway", description: "Live-Unterhaltung auf höchstem Niveau — von Musicals bis zu großen Theaterstücken" },
    ],
  },
  "dallas-fort-worth": {
    weather: {
      juinMin: 24,
      juinMax: 37,
      juilletMin: 26,
      juilletMax: 39,
      description: "Sehr heiß und trocken — das Schiebedach des AT&T Stadiums ist ein Segen! Viel trinken",
    },
    transport: {
      aeroport: "Dallas/Fort Worth International Airport (DFW) — 3. größter Flughafen der Welt",
      transports: ["DART Light Rail (Dallas)", "Uber/Lyft empfohlen", "Shuttle-Busse ab wichtigen Stadtteilen an Spieltagen"],
    },
    budget: {
      hotelMin: 120,
      hotelMax: 300,
      repas: 18,
      biere: 7,
      currency: "USD",
    },
    activities: [
      { title: "Stockyards District (Fort Worth)", description: "Echtes Rodeo, Honky-Tonks und tägliche Longhorn-Parade — das wahre Texas" },
      { title: "Deep Ellum (Dallas)", description: "Underground-Musikviertel — Bars, Live-Musik und Street Art an jeder Ecke" },
      { title: "Perot Museum of Nature and Science", description: "Ultramodernes Wissenschaftsmuseum mit Dutzenden interaktiven Ausstellungen" },
    ],
  },
  "miami": {
    weather: {
      juinMin: 25,
      juinMax: 32,
      juilletMin: 26,
      juilletMax: 33,
      description: "Tropisch — intensive Hitze mit Schauern am späten Nachmittag. Vermeiden Sie Spaziergänge zwischen 12 und 15 Uhr",
    },
    transport: {
      aeroport: "Miami International Airport (MIA) — Metrorail Orange Line direkt in die Innenstadt",
      transports: ["Metrorail & Metromover (kostenlos in der Innenstadt)", "Brightline nach Fort Lauderdale", "SunPass-Bus"],
    },
    budget: {
      hotelMin: 150,
      hotelMax: 500,
      repas: 22,
      biere: 8,
      currency: "USD",
    },
    activities: [
      { title: "South Beach", description: "Legendäre Strände, Art-Deco-Viertel und Ocean Drive — die Quintessenz von Miami" },
      { title: "Wynwood Walls", description: "Freilichtmuseum mit den größten Street-Art-Wandgemälden der Welt" },
      { title: "Little Havana", description: "Kubanischer Kaffee, handgerollte Zigarren und Domino im Freien — eine Reise ohne die USA zu verlassen" },
    ],
  },
  "atlanta": {
    weather: {
      juinMin: 21,
      juinMax: 31,
      juilletMin: 23,
      juilletMax: 33,
      description: "Heiß und feucht — nachmittags Gewitter möglich. Das Schiebedach des Mercedes-Benz Stadiums ist Ihr Freund",
    },
    transport: {
      aeroport: "Hartsfield-Jackson Atlanta International (ATL) — Meistfrequentierter Flughafen der Welt, MARTA Gold/Red Line direkt",
      transports: ["MARTA (U-Bahn & Bus)", "Streetcar Atlanta (Innenstadt)", "Lyft/Uber sehr verbreitet"],
    },
    budget: {
      hotelMin: 130,
      hotelMax: 320,
      repas: 20,
      biere: 7,
      currency: "USD",
    },
    activities: [
      { title: "National Center for Civil and Human Rights", description: "Bewegendes Museum über Bürgerrechte — das Büro von MLK zu besuchen ist ein ergreifendes Erlebnis" },
      { title: "Georgia Aquarium", description: "Größtes Aquarium der westlichen Welt — Walhaie und Delphinshows" },
      { title: "Ponce City Market", description: "Gourmetmarkt und Einkaufszentrum in einer ehemaligen Fabrik — Dachterrasse mit Blick auf Atlanta" },
    ],
  },
  "seattle": {
    weather: {
      juinMin: 12,
      juinMax: 22,
      juilletMin: 14,
      juilletMax: 25,
      description: "Angenehm im Sommer! Milde Temperaturen und wenig Regen — die beste Jahreszeit für einen Besuch in Seattle",
    },
    transport: {
      aeroport: "Seattle-Tacoma International Airport (SEA) — Link Light Rail direkt in die Innenstadt (40 Min.)",
      transports: ["Link Light Rail (zum Lumen Field)", "King County Metro Bus", "Wassertaxis & Fähren Sound Transit"],
    },
    budget: {
      hotelMin: 140,
      hotelMax: 380,
      repas: 22,
      biere: 8,
      currency: "USD",
    },
    activities: [
      { title: "Pike Place Market", description: "Der historische öffentliche Markt von Seattle — die berühmten Fischwerfer, lokale Erzeuger und Blick auf den Puget Sound" },
      { title: " Space Needle", description: "Wahrzeichen von Seattle seit 1962 — 360°-Aussicht auf die Stadt, den Mount Rainier und die Cascades" },
      { title: "Viertel Capitol Hill", description: "Epizentrum der Kaffeekultur in Seattle — Dutzende Mikroröstereien und ein lebhaftes Nachtleben" },
    ],
  },
  "houston": {
    weather: {
      juinMin: 24,
      juinMax: 34,
      juilletMin: 26,
      juilletMax: 36,
      description: "Sehr heiß und sehr feucht — das Schiebedach des NRG Stadiums ist unverzichtbar. Überall Klimaanlage!",
    },
    transport: {
      aeroport: "George Bush Intercontinental Airport (IAH) — 45 Min. mit dem Auto. William P. Hobby Airport (HOU) — näher am Zentrum",
      transports: ["METRORail (3 Linien)", "METRO Bus (ausgedehntes Netz)", "Auto dringend empfohlen"],
    },
    budget: {
      hotelMin: 110,
      hotelMax: 280,
      repas: 18,
      biere: 6,
      currency: "USD",
    },
    activities: [
      { title: " Space Center Houston", description: "Offizielles NASA-Zentrum — echte Raketen sehen und die Geschichte der Raumfahrt erleben" },
      { title: "Museum District", description: "19 kostenlose oder günstige Museen — Fine Arts, Natural Science, Holocaust Museum mitten in der Stadt" },
      { title: "Bellaire Chinatown", description: "Eine der größten und authentischsten asiatischen Gemeinschaften der USA — außergewöhnliche Gastronomie" },
    ],
  },
  "philadelphia": {
    weather: {
      juinMin: 18,
      juinMax: 28,
      juilletMin: 21,
      juilletMax: 31,
      description: "Heiß und feucht — ideales Wetter, um früh morgens durch die historische Altstadt zu bummeln, bevor die Spiele beginnen",
    },
    transport: {
      aeroport: "Philadelphia International Airport (PHL) — SEPTA Airport Line direkt nach Center City (25 Min.)",
      transports: ["SEPTA (U-Bahn, Bus, Straßenbahn)", "SEPTA zum Sportkomplex (Broad Street Line)", "Amtrak ab New York (1 Std. 15 Min.)"],
    },
    budget: {
      hotelMin: 130,
      hotelMax: 350,
      repas: 20,
      biere: 7,
      currency: "USD",
    },
    activities: [
      { title: " Liberty Bell & Independence Hall", description: "Die Wiege der amerikanischen Demokratie — wo 1776 die Unabhängigkeitserklärung unterzeichnet wurde" },
      { title: "Reading Terminal Market", description: "Historische Markthalle — Cheesesteak, Soft Pretzels und Amish-Spezialitäten seit 1893" },
      { title: "Art Museum & Rocky Steps", description: "Laufen Sie die Stufen wie Rocky Balboa hoch und genießen Sie den Blick auf den Benjamin Franklin Parkway" },
    ],
  },
  "kansas-city": {
    weather: {
      juinMin: 20,
      juinMax: 31,
      juilletMin: 23,
      juilletMax: 34,
      description: "Heiß mit spektakulären Gewittern, typisch für den Mittleren Westen — die elektrische Atmosphäre kommt nicht nur aus dem Stadion!",
    },
    transport: {
      aeroport: "Kansas City International Airport (MCI) — 2023 renoviert, 30 Min. mit dem Auto zum Zentrum",
      transports: ["KC Streetcar (Innenstadt, wird erweitert)", "KC Metro Bus", "Auto empfohlen für Randgebiete"],
    },
    budget: {
      hotelMin: 100,
      hotelMax: 250,
      repas: 16,
      biere: 6,
      currency: "USD",
    },
    activities: [
      { title: "Kansas City BBQ", description: "Die ultimative kulinarische Wallfahrt — Joe's KC, Q39 und Arthur Bryant's, Tempel des Brisket und der Burnt Ends" },
      { title: "18th & Vine Jazz District", description: "Wiege des Kansas-City-Jazz — Jazzmuseum und Negro Leagues Baseball Museum im historischen Viertel" },
      { title: "Country Club Plaza", description: "Viertel im hispanischen Stil mit Brunnen und maurischer Architektur — Shopping und hochwertige Gastronomie" },
    ],
  },
  "boston": {
    weather: {
      juinMin: 15,
      juinMax: 24,
      juilletMin: 18,
      juilletMax: 28,
      description: "Angenehm — eine der besten Zeiten für einen Besuch in Boston. Einige Gewittertage möglich",
    },
    transport: {
      aeroport: "Logan International Airport (BOS) — Silver Line T direkt zur South Station (25 Min.)",
      transports: ["MBTA 'The T' (älteste U-Bahn der USA)", "MBTA Bus (ausgedehntes Netz)", "Amtrak Acela nach New York (3 Std. 30 Min.)"],
    },
    budget: {
      hotelMin: 150,
      hotelMax: 420,
      repas: 22,
      biere: 8,
      currency: "USD",
    },
    activities: [
      { title: "Freedom Trail", description: "4 km langer Rundweg, der 16 historische Stätten der Amerikanischen Revolution verbindet — kostenlos und faszinierend" },
      { title: "Fenway Park", description: "Das älteste Baseballstadion der USA (1912) — Führungen auch außerhalb der Spieltage verfügbar" },
      { title: "Harvard & MIT (Cambridge)", description: "Überqueren Sie den Charles River und erkunden Sie die legendären Campusse zweier der größten Universitäten der Welt" },
    ],
  },
  "san-francisco-bay-area": {
    weather: {
      juinMin: 12,
      juinMax: 18,
      juilletMin: 13,
      juilletMax: 20,
      description: " Überraschung! San Francisco ist im Sommer KALT (Karl der Nebel) — Regenjacke und Schichten einplanen",
    },
    transport: {
      aeroport: "San Francisco International Airport (SFO) — BART direkt in die Innenstadt von SF (30 Min.)",
      transports: ["BART (U-Bahn Bay Area)", "Muni SF (Bus, Straßenbahn, Cable Cars)", "Fähre nach Oakland und andere Städte der Bucht"],
    },
    budget: {
      hotelMin: 200,
      hotelMax: 550,
      repas: 28,
      biere: 10,
      currency: "USD",
    },
    activities: [
      { title: "Golden Gate Bridge", description: "Die Brücke zu Fuß oder mit dem Fahrrad überqueren mit Blick auf die Bucht — kostenlos und unvergesslich" },
      { title: "Cable Cars & Fisherman's Wharf", description: "Die historischen Straßenbahnen auf den Hügeln von SF und die lebhafte Uferpromenade mit der Ghirardelli Square" },
      { title: "Napa Valley", description: "1 Stunde von San Francisco — Hunderte Weingüter von Weltklasse in einer herrlichen Landschaft" },
    ],
  },
  "los-angeles": {
    weather: {
      juinMin: 16,
      juinMax: 26,
      juilletMin: 18,
      juilletMax: 28,
      description: "Perfekt! Fast garantiert Sonnenschein, angenehme Temperaturen — der Küstennebel am Morgen löst sich schnell auf",
    },
    transport: {
      aeroport: "Los Angeles International Airport (LAX) — Automated People Mover zur U-Bahn (ab 2024)",
      transports: ["Metro Rail (Linien A, B, C, D, E, K)", "Big Blue Bus", "Auto fast unverzichtbar (legendärer Verkehr)"],
    },
    budget: {
      hotelMin: 160,
      hotelMax: 500,
      repas: 25,
      biere: 9,
      currency: "USD",
    },
    activities: [
      { title: " Hollywood & Universal Studios", description: "Spazieren Sie über den Hollywood Boulevard, fotografieren Sie das HOLLYWOOD-Schild und erkunden Sie die Universal Studios" },
      { title: "Venice Beach & Santa Monica", description: "Der Boardwalk von Venice mit Straßenkünstlern, Skatepark und Bodybuildern am Muscle Beach" },
      { title: "Getty Center", description: "Weltbekanntes Kunstmuseum — impressionistische Sammlung und Panoramablick auf LA — Eintritt frei" },
    ],
  },
  "mexico-city": {
    weather: {
      juinMin: 12,
      juinMax: 22,
      juilletMin: 11,
      juilletMax: 21,
      description: "Kühl und regnerisch (Regenzeit) — aber die Spiele finden geschützt im legendären Estadio Azteca statt!",
    },
    transport: {
      aeroport: "Aeropuerto Internacional Felipe Ángeles (AIFA) — oder Benito Juárez (MEX, alt) für Inlandsflüge",
      transports: ["Metro CDMX (12 Linien, sehr günstig)", "Metrobús BRT (ausgedehntes Netz)", "Ecobici (Leihfahrräder)"],
    },
    budget: {
      hotelMin: 60,
      hotelMax: 200,
      repas: 8,
      biere: 3,
      currency: "USD",
    },
    activities: [
      { title: "Teotihuacán", description: "50 km entfernt — besteigen Sie die Sonnenpyramide für einen atemberaubenden Blick auf die Stadt der Götter" },
      { title: "Frida Kahlo Museum (La Casa Azul)", description: "Eintauchen in die Welt der mexikanischen Künstlerin in ihrem Elternhaus in Coyoacán — lange im Voraus buchen" },
      { title: "Mercado de la Merced & Street Food", description: "Der größte Markt von CDMX — Tacos, Tlayudas, Tamales und eine Explosion authentischer Aromen" },
    ],
  },
  "guadalajara": {
    weather: {
      juinMin: 15,
      juinMax: 27,
      juilletMin: 15,
      juilletMax: 26,
      description: "Regenzeit, aber angenehme Temperaturen — die Perle des Westens ist im Sommer wunderschön",
    },
    transport: {
      aeroport: "Aeropuerto Internacional Miguel Hidalgo y Costilla (GDL) — 20 Min. vom Zentrum mit dem Taxi",
      transports: ["Tren Ligero (Stadtbahn)", "Macrobús (BRT)", "Taxi oder Uber nachts empfohlen"],
    },
    budget: {
      hotelMin: 50,
      hotelMax: 160,
      repas: 7,
      biere: 2.5,
      currency: "USD",
    },
    activities: [
      { title: "Tequila & Mariachi", description: "Entdecken Sie die Heimatstadt von Tequila und Mariachi — Besuch der Tequila-Region, 1 Stunde mit dem Touristenzug" },
      { title: "Centro Histórico", description: "Barockkathedrale, Regierungspalast und Orozco-Fresken — das historische Herz von Guadalajara" },
      { title: "Lago de Chapala", description: "Der größte natürliche See Mexikos, 45 Min. entfernt — bunte Dörfer, traditionelle Fischerei und Sonnenuntergänge" },
    ],
  },
  "monterrey": {
    weather: {
      juinMin: 22,
      juinMax: 36,
      juilletMin: 24,
      juilletMax: 37,
      description: "Sehr heiß! Die zwischen Bergen eingebettete Stadt erzeugt einen Hitzestaueffekt — starten Sie früh morgens mit Besichtigungen",
    },
    transport: {
      aeroport: "Aeropuerto Internacional General Mariano Escobedo (MTY) — 25 Min. vom Zentrum",
      transports: ["Metro de Monterrey (2 Linien)", "Ecovía BRT", "Taxi oder Uber für entferntere Gebiete"],
    },
    budget: {
      hotelMin: 55,
      hotelMax: 180,
      repas: 9,
      biere: 2.5,
      currency: "USD",
    },
    activities: [
      { title: "Parque Nacional Cumbres de Monterrey", description: "Wandern in der Sierra Madre — die Cascada Cola de Caballo und der Cañón de Matacanes sind spektakulär" },
      { title: "Barrio Antiguo", description: "Lebhaftes historisches Viertel — Bars, Kunstgalerien und authentische Regio-Kultur am Freitagabend" },
      { title: "Cabrito und Regio-Küche", description: "Die Küche von Monterrey ist einzigartig in Mexiko — Cabrito (Zickleinbraten), Machacado und Pan de Campo" },
    ],
  },
  "toronto": {
    weather: {
      juinMin: 14,
      juinMax: 24,
      juilletMin: 17,
      juilletMax: 27,
      description: "Angenehm — Toronto ist im Sommer wunderschön. Gelegentlich Regen, aber selten lang anhaltend",
    },
    transport: {
      aeroport: "Toronto Pearson International Airport (YYZ) — Union Pearson Express (25 Min. zur Union Station)",
      transports: ["TTC (U-Bahn, Straßenbahn, Bus)", "GO Transit (Regionalzüge)", "Billy Bishop Airport (YTZ) für Inlandsflüge"],
    },
    budget: {
      hotelMin: 140,
      hotelMax: 380,
      repas: 20,
      biere: 8,
      currency: "CAD",
    },
    activities: [
      { title: "CN Tower", description: "Spaziergang auf dem Glasdach in 356 m Höhe — 360°-Aussicht auf Toronto, den Ontariosee und die USA" },
      { title: "Kensington Market & Chinatown", description: "Zwei der multikulturellsten Viertel der Welt — Street Food, Vintage-Märkte und einzigartige Atmosphäre" },
      { title: "Toronto Islands", description: "15-Min.-Fähre vom Zentrum — Strände, Fahrräder und atemberaubender Blick auf die Skyline von Toronto" },
    ],
  },
  "vancouver": {
    weather: {
      juinMin: 13,
      juinMax: 21,
      juilletMin: 15,
      juilletMax: 24,
      description: "Die beste Zeit für einen Besuch! Endlich trocken und sonnig — die schneebedeckten Berge als Kulisse sind atemberaubend",
    },
    transport: {
      aeroport: "Vancouver International Airport (YVR) — Canada Line (SkyTrain) direkt in die Innenstadt (25 Min.)",
      transports: ["SkyTrain (3 automatische Linien)", "Translink Bus (dichtes Netz)", "SeaBus nach North Vancouver"],
    },
    budget: {
      hotelMin: 160,
      hotelMax: 420,
      repas: 22,
      biere: 8,
      currency: "CAD",
    },
    activities: [
      { title: "Stanley Park", description: "400 Hektar Regenwald mitten in der Stadt — Radtour auf der Seawall mit Blick auf die Berge" },
      { title: "Whistler (Tagesausflug)", description: "2 Stunden von Vancouver — Sommeraktivitäten (Mountainbike, Wandern, Sommerrodeln) im renommiertesten Resort Nordamerikas" },
      { title: "Granville Island & Gastronomie", description: "Handwerklicher Markt, Mikrobrauereien und Fischrestaurants — das gastronomische Herz von Vancouver" },
    ],
  },
};
