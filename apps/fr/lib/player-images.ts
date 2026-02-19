/**
 * Maps player slugs / player-stats IDs → image filename (without .jpg).
 * Images are stored in public/images/players/.
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
};

/**
 * Returns the /images/players/<filename>.jpg path if an image exists,
 * or null if there is no photo for this player slug / stat ID.
 */
export function getPlayerImagePath(slugOrId: string): string | null {
  const filename = playerImageMap[slugOrId];
  return filename ? `/images/players/${filename}.jpg` : null;
}

/**
 * Generates initials (1-2 chars) from a player name.
 */
export function getPlayerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

/**
 * Returns a deterministic Tailwind background color class for an avatar fallback,
 * based on the player's name.
 */
export function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-violet-600",
    "bg-rose-600",
    "bg-amber-600",
    "bg-cyan-600",
    "bg-pink-600",
    "bg-indigo-600",
    "bg-teal-600",
    "bg-orange-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % colors.length;
  return colors[hash]!;
}
