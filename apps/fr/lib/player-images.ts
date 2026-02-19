/**
 * Maps player slugs / player-stats IDs → image filename (without .jpg).
 * Images are stored in public/images/players/.
 */
export const playerImageMap: Record<string, string> = {
  // France
  mbappe: "kylian-mbappe",
  tchouameni: "aurelien-tchouameni",
  camavinga: "eduardo-camavinga",

  // England
  bellingham: "jude-bellingham",
  saka: "bukayo-saka",
  foden: "phil-foden",
  "trent-alexander-arnold": "trent-alexander-arnold",
  kane: "harry-kane",

  // Spain
  yamal: "lamine-yamal",
  pedri: "pedri",
  rodri: "rodri",
  gavi: "gavi",

  // Brazil
  vinicius: "vinicius-jr",
  alisson: "alisson-becker",

  // Argentina
  messi: "lionel-messi",

  // Germany
  musiala: "jamal-musiala",
  wirtz: "florian-wirtz",
  neuer: "manuel-neuer",

  // Portugal
  ronaldo: "cristiano-ronaldo",

  // Belgium
  "de-bruyne": "kevin-de-bruyne",
  courtois: "thibaut-courtois",

  // Morocco
  hakimi: "achraf-hakimi",

  // Egypt (via players.ts slug)
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

  // England extra
  "cole-palmer": "cole-palmer",
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
