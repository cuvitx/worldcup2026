/**
 * Maps player slugs / player-stats IDs → image filename (without .jpg)
 * Images are stored in public/images/players/
 * @example
 * playerImageMap["mbappe"] // "kylian-mbappe"
 */
export const playerImageMap: Record<string, string> = {
  // France
  mbappe: "kylian-mbappe",
  griezmann: "antoine-griezmann",
  maignan: "mike-maignan",
  tchouameni: "aurelien-tchouameni",
  saliba: "william-saliba",
  kounde: "jules-kounde",
  upamecano: "dayot-upamecano",
  camavinga: "eduardo-camavinga",
  rabiot: "adrien-rabiot",
  kante: "ngolo-kante",
  dembele: "ousmane-dembele",
  "thuram-marcus": "marcus-thuram",
  olise: "michael-olise",
  barcola: "bradley-barcola",
  "zaire-emery": "warren-zaire-emery",
  pavard: "benjamin-pavard",

  // Argentina
  messi: "lionel-messi",
  "martinez-lautaro": "lautaro-martinez",
  "de-paul": "rodrigo-de-paul",
  "dibu-martinez": "emiliano-martinez",
  "mac-allister": "alexis-mac-allister",
  "enzo-fernandez": "enzo-fernandez",
  "di-maria": "angel-di-maria",
  otamendi: "nicolas-otamendi",
  "romero-cristian": "cristian-romero",
  garnacho: "alejandro-garnacho",
  molina: "nahuel-molina",

  // England
  bellingham: "jude-bellingham",
  saka: "bukayo-saka",
  foden: "phil-foden",
  "trent-alexander-arnold": "trent-alexander-arnold",
  kane: "harry-kane",
  rice: "declan-rice",
  pickford: "jordan-pickford",
  walker: "kyle-walker",
  stones: "john-stones",
  shaw: "luke-shaw",
  guehi: "marc-guehi",
  gordon: "anthony-gordon",
  watkins: "ollie-watkins",
  "cole-palmer": "cole-palmer",

  // Spain
  yamal: "lamine-yamal",
  pedri: "pedri",
  rodri: "rodri",
  gavi: "gavi",
  morata: "alvaro-morata",
  simon: "unai-simon",
  carvajal: "dani-carvajal",
  "nico-williams": "nico-williams",
  olmo: "dani-olmo",
  laporte: "aymeric-laporte",
  cucurella: "marc-cucurella",
  "le-normand": "robin-le-normand",
  "fabian-ruiz": "fabian-ruiz",

  // Brazil
  vinicius: "vinicius-jr",
  alisson: "alisson-becker",
  rodrygo: "rodrygo",
  casemiro: "casemiro",
  raphinha: "raphinha",
  militao: "eder-militao",
  paqueta: "lucas-paqueta",

  // Germany
  musiala: "jamal-musiala",
  wirtz: "florian-wirtz",
  neuer: "manuel-neuer",
  havertz: "kai-havertz",
  rudiger: "antonio-rudiger",
  gundogan: "ilkay-gundogan",
  sane: "leroy-sane",
  fullkrug: "niclas-fullkrug",
  kimmich: "joshua-kimmich",
  "ter-stegen": "marc-andre-ter-stegen",
  schlotterbeck: "nico-schlotterbeck",

  // Portugal
  ronaldo: "cristiano-ronaldo",
  "bernardo-silva": "bernardo-silva",
  "bruno-fernandes": "bruno-fernandes",
  dias: "ruben-dias",
  "rafael-leao": "rafael-leao",
  "joao-felix": "joao-felix",
  cancelo: "joao-cancelo",

  // Belgium
  "de-bruyne": "kevin-de-bruyne",
  courtois: "thibaut-courtois",

  // Morocco
  hakimi: "achraf-hakimi",

  // Egypt
  salah: "mohamed-salah",

  // Poland
  lewandowski: "robert-lewandowski",

  // Norway
  haaland: "erling-haaland",

  // Croatia
  modric: "luka-modric",

  // Nigeria
  osimhen: "victor-osimhen",

  // Korea Republic
  son: "son-heung-min",

  // Uruguay
  valverde: "federico-valverde",

  // Auto-downloaded 2026-05-13
  "samba": "brice-samba",
  "lucas-chevalier": "lucas-chevalier",
  "konaté": "ibrahima-konate",
  "lucas-digne": "lucas-digne",
  "lucas-hernandez": "lucas-hernandez",
  "malo-gusto": "malo-gusto",
  "maxence-lacroix": "maxence-lacroix",
  "pierre-kalulu": "pierre-kalulu",
  "theo-hernandez": "theo-hernandez",
  "maghnes-akliouche": "maghnes-akliouche",
  "manu-kone": "manu-kone",
  "kante": "n-golo-kante",
  "rayan-cherki": "rayan-cherki",
  "desire-doue": "desire-doue",
  "hugo-ekitike": "hugo-ekitike",
  "randal-muani": "randal-kolo-muani",

  // Auto-downloaded 2026-05-13
  "jarrod-bowen": "jarrod-bowen",
  "openda": "lois-openda",
  "lukaku": "romelu-lukaku",
  "stanisic": "josip-stanisic",
  "sutalo": "josip-sutalo",
  "erlic": "martin-erlic",
  "majer": "lovro-majer",
  "pasalic": "mario-pasalic",
  "petar-sucic": "petar-sucic",
  "budimir": "ante-budimir",
  "perisic": "ivan-perisic",
  "mendy-edouard": "edouard-mendy",
  "gueye": "idrissa-gueye",
  "lamine-camara": "lamine-camara",
  "mouhamadou-diarra": "mouhamadou-diarra",
  "pape-gueye": "pape-gueye",
  "sarr-pape": "pape-matar-sarr",
  "bamba-dieng": "bamba-dieng",
  "ibrahim-mbaye": "ibrahim-mbaye",
  "ndiaye-iliman": "iliman-ndiaye",
  "jackson-nicolas": "nicolas-jackson",
  "lucumi": "jhon-lucumi",
  "james-rodriguez": "james-rodriguez",
  "jhon-cordoba": "jhon-cordoba",
  "luis-suarez": "luis-suarez",
  "el-shenawy": "mohamed-el-shenawy",
  "marmoush": "omar-marmoush",
  "beiranvand": "alireza-beiranvand",
  "payam-niazmand": "payam-niazmand",
  "kanaani": "abolfazl-jalali",
  "ehsan-hajsafi": "ehsan-hajsafi",
  "mohammadi-milad": "milad-mohammadi",
  "jahanbakhsh": "alireza-jahanbakhsh",
  "taremi": "mehdi-taremi",
  "ghoddos": "saman-ghoddos",
  "paulsen": "alex-paulsen",
  "fernando-muslera": "fernando-muslera",
  "gimenez": "jose-maria-gimenez",
  "olivera": "mathias-olivera",
  "bueno": "santiago-bueno",
  "pellistri": "facundo-pellistri",
  "nicolas-fonseca": "nicolas-fonseca",
  "abdulelah-al-amri": "abdulelah-al-amri",
  "ali-lajami": "ali-lajami",
  "nawaf-boushal": "nawaf-boushal",
  "saud-abdulhamid": "saud-abdulhamid",
  "aiman-yahya": "aiman-yahya",
  "kanno": "mohamed-kanno",
  "al-malki-salman": "salman-al-faraj",
  "lopes-garry": "garry-rodrigues",
  "danso": "kevin-danso",
  "grillitsch": "florian-grillitsch",
  "luca-zidane": "luca-zidane",
  "adil-boulbina": "adil-boulbina",
  "boudaoui": "hicham-boudaoui",
  "aouar": "houssem-aouar",
  "anis-moussa": "anis-hadj-moussa",
  "mohamed-amoura": "mohamed-amoura",
  "al-taamari-abdallah": "abdallah-nasib",
  "mohammad-hasheesh": "mohammad-abu-hasheesh",
  "yazan-al-arab": "yazan-al-arab",
  "nizar-al-rashdan": "nizar-al-rashdan",
  "noor-al-rawabdeh": "noor-al-rawabdeh",
  "haddad": "mahmoud-al-mardi",
  "kholmatov": "abdukodir-khusanov",
  "igor-sergeev": "igor-sergeev",
  "sherzod-temirov": "sherzod-temirov",
  "francis-amuzu": "francis-amuzu",
  "dylan-batubinsika": "dylan-batubinsika",
  "yoane-wissa": "yoane-wissa",
  "merchas-doski": "merchas-doski",
  "aimar-sher": "aimar-sher",
  "ali-al-hamadi": "ali-ibrahim-al-hamadi",
  "aymen-hussein": "aymen-hussein",
  "mohannad-kadhim": "mohannad-ali-kadhim",
  "ochoa": "guillermo-ochoa",
  "montes": "cesar-montes",
  "edson-alvarez": "edson-alvarez",
  "julian-quinones": "julian-quinones",
  "gimenez-santiago": "santiago-gimenez",
  "modiba": "aubrey-modiba",
  "bongokuhle-hlongwane": "bongokuhle-hlongwane",
  "foster-lyle": "lyle-foster",
  "thapelo-maseko": "thapelo-maseko",
  "kim-seung-gyu": "kim-seung-gyu",
  "kim-ju-sung": "kim-ju-sung",
  "hong-hyun-seok": "hong-hyun-seok",
  "lee-jae-sung": "lee-jae-sung",
  "lee-kang-in": "lee-kang-in",
  "park-jin-seop": "park-jin-seop",
  "hwang-hee-chan": "hwang-hee-chan",
  "matej-kovar": "matej-kovar",
  "david-zima": "david-zima",
  "vladimir-coufal": "vladimir-coufal",
  "adam-karabec": "adam-karabec",
  "michal-sadilek": "michal-sadilek",
  "laryea": "richie-laryea",
  "koone": "ismael-kone",
  "david": "jonathan-david",
  "buchanan": "tajon-buchanan",
  "bair": "tani-oluwaseyi",
  "edin-dzeko": "edin-dzeko",
  "khoukhi": "boualem-khoukhi",
  "homam-ahmed": "homam-ahmed",
  "ro-ro": "ro-ro",
  "boudiaf": "abdulaziz-hatem",
  "ahmed-suhail": "ahmed-fathi",
  "mohammed-waad": "mohammed-waad",
  "afif": "akram-afif",
  "al-haydos": "hassan-al-haydos",
  "mohammed-muntari": "mohammed-muntari",
  "yusuf-abdurisag": "yusuf-abdurisag",
  "kobel": "gregor-kobel",
  "mvogo": "yvon-mvogo",
  "elvedi": "nico-elvedi",
  "zakaria": "denis-zakaria",
  "freuler": "remo-freuler",
  "vincent-sierro": "vincent-sierro",
  "embolo": "breel-embolo",
  "ndoye": "dan-ndoye",
  "okafor": "noah-okafor",
  "bento": "bento",
  "hugo-souza": "hugo-souza",
  "danilo": "danilo",
  "marquinhos": "marquinhos",
  "vitor-reis": "vitor-reis",
  "andrey-santos": "andrey-santos",
  "danilo-mf-bre": "danilo",
  "gabriel-sara": "gabriel-sara",
  "gabriel-martinelli": "gabriel-martinelli",
  "igor-thiago": "igor-thiago",
  "matheus-cunha": "matheus-cunha",
  "vinicius": "vinicius-junior",
  "el-mehdi-benabid": "el-mehdi-benabid",
  "abdelhamid-ait-boudlal": "abdelhamid-ait-boudlal",
  "chadi-riad": "chadi-riad",
  "diaz-brahim": "brahim-diaz",
  "robertson": "andrew-robertson",
  "matthew-freese": "matthew-freese",
  "patrick-schulte": "patrick-schulte",
  "alex-freeman": "alex-freeman",
  "alderete": "omar-alderete",
  "sanabria": "antonio-sanabria",
  "almiron": "miguel-almiron",
  "pitta": "ramon-sosa",
  "ryan": "mathew-ryan",
  "awer-mabil": "awer-mabil",
  "nestory-irankunda": "nestory-irankunda",
  "altay-bayindir": "altay-bayindir",
  "ahmetcan-kaplan": "ahmetcan-kaplan",
  "kaan-ayhan": "kaan-ayhan",
  "mert-muldur": "mert-muldur",
  "ozan-kabak": "ozan-kabak",
  "arda-guler": "arda-guler",
  "hakan-calhanoglu": "hakan-calhanoglu",
  "orkun-kokcu": "orkun-kokcu",
  "semih-kilicsoy": "semih-kilicsoy",
  "alexander-nubel": "alexander-nubel",
  "baumann": "oliver-baumann",
  "malick-thiaw": "malick-thiaw",
  "chris-fuhrich": "chris-fuhrich",
  "undav": "deniz-undav",
  "jackson-porozo": "jackson-porozo",
  "pacho": "willian-pacho",
  "preciado-angelo": "angelo-preciado",
  "pedro-vite": "pedro-vite",
  "john-yeboah": "john-yeboah",
  "doue-guela": "guela-doue",
  "singo": "wilfried-singo",
  "benie-traore": "benie-traore",
  "evann-guessand": "evann-guessand",
  "riechedly-bazoer": "riechedly-bazoer",
  "flores": "juninho-bacuna",
  "felida": "kevin-felida",
  "verbruggen": "bart-verbruggen",
  "dumfries": "denzel-dumfries",
  "van-de-ven": "micky-van-de-ven",
  "ake": "nathan-ake",
  "van-dijk": "virgil-van-dijk",
  "gravenberch": "ryan-gravenberch",
  "malen": "donyell-malen",
  "noa-lang": "noa-lang",
  "weghorst": "wout-weghorst",
  "suzuki-zion": "zion-suzuki",
  "daiki-hashioka": "daiki-hashioka",
  "taniguchi": "shogo-taniguchi",
  "yukinari-sugawara": "yukinari-sugawara",
  "tanaka-ao": "ao-tanaka",
  "kamada": "daichi-kamada",
  "kaishu-sano": "kaishu-sano",
  "mitoma": "kaoru-mitoma",
  "ito-junya": "junya-ito",
  "kristoffer-nordfeldt": "kristoffer-nordfeldt",
  "ken-sema": "ken-sema",
  "mattias-svanberg": "mattias-svanberg",
  "viktor-gyokeres": "viktor-gyokeres",
  "anis-ben-slimane": "anis-ben-slimane",
  "skhiri": "ellyes-skhiri",
  "ben-ouanes": "mortadha-ben-ouanes",
  "rani-khedira": "rani-khedira",
  "saad-elias": "elias-saad",
  "hazem-mastouri": "hazem-mastouri",
  "ismael-gharbi": "ismael-gharbi",
};

/**
 * Returns the /images/players/<filename>.jpg path if an image exists,
 * or null if there is no photo for this player slug / stat ID
 * @param {string} slugOrId - Player slug or stats ID (e.g., "mbappe", "vinicius")
 * @returns {string | null} Image path or null if no photo available
 * @example
 * getPlayerImagePath("mbappe") // "/images/players/kylian-mbappe.jpg"
 * getPlayerImagePath("unknown") // null
 */
export function getPlayerImagePath(slugOrId: string): string | null {
  const filename = playerImageMap[slugOrId];
  return filename ? `/images/players/${filename}.jpg` : null;
}

/**
 * Generates initials (1-2 chars) from a player name
 * @param {string} name - Full player name (e.g., "Kylian Mbappé")
 * @returns {string} Uppercase initials (e.g., "KM")
 * @example
 * getPlayerInitials("Kylian Mbappé") // "KM"
 * getPlayerInitials("Ronaldo") // "R"
 */
export function getPlayerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

/**
 * Returns a deterministic Tailwind background color class for an avatar fallback,
 * based on the player's name (consistent hash-based color)
 * @param {string} name - Player name to hash
 * @returns {string} Tailwind CSS class (e.g., "bg-blue-600")
 * @example
 * getAvatarColor("Lionel Messi") // "bg-violet-600" (deterministic)
 */
export function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-600",
    "bg-accent",
    "bg-violet-600",
    "bg-rose-600",
    "bg-purple-600",
    "bg-fuchsia-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-accent",
    "bg-slate-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % colors.length;
  return colors[hash]!;
}
