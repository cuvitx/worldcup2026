/**
 * Mapping from team slug → ISO 3166-1 alpha-2 (or alpha-2 variant) country code
 * Used to reference flag images in /images/flags/{code}.svg
 * Source: flagcdn.com
 */
export const teamSlugToISO: Record<string, string> = {
  // Group A
  "mexique": "mx",
  "afrique-du-sud": "za",
  "coree-du-sud": "kr",
  // Group B
  "canada": "ca",
  "suisse": "ch",
  "qatar": "qa",
  // Group C
  "bresil": "br",
  "maroc": "ma",
  "ecosse": "gb-sct",
  "haiti": "ht",
  // Group D
  "etats-unis": "us",
  "paraguay": "py",
  "australie": "au",
  // Group E
  "allemagne": "de",
  "equateur": "ec",
  "cote-divoire": "ci",
  "curacao": "cw",
  // Group F
  "pays-bas": "nl",
  "japon": "jp",
  "tunisie": "tn",
  // Group G
  "belgique": "be",
  "iran": "ir",
  "egypte": "eg",
  "nouvelle-zelande": "nz",
  // Group H
  "espagne": "es",
  "uruguay": "uy",
  "arabie-saoudite": "sa",
  "cap-vert": "cv",
  // Group I
  "france": "fr",
  "senegal": "sn",
  "norvege": "no",
  // Group J
  "argentine": "ar",
  "autriche": "at",
  "algerie": "dz",
  "jordanie": "jo",
  // Group K
  "portugal": "pt",
  "colombie": "co",
  "ouzbekistan": "uz",
  // Group L
  "angleterre": "gb-eng",
  "croatie": "hr",
  "ghana": "gh",
  "panama": "pa",
};

/**
 * Get the flag image path for a team slug.
 * Returns the path to the SVG in /images/flags/ or undefined if not mapped.
 */
export function getFlagPath(slug: string): string | undefined {
  const iso = teamSlugToISO[slug];
  return iso ? `/images/flags/${iso}.svg` : undefined;
}

/**
 * Get the ISO code for a team slug.
 */
export function getISOCode(slug: string): string | undefined {
  return teamSlugToISO[slug];
}
