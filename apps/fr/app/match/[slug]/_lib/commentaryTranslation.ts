import "server-only";

import crypto from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import type { CommentaryPlay } from "../_components";

const DEFAULT_CACHE_PATH =
  "/srv/cdm2026/shared/commentary-translations/deepl-cache.json";

const TEAM_NAME_TRANSLATIONS: Record<string, string> = {
  Algeria: "Algérie",
  Argentina: "Argentine",
  Australia: "Australie",
  Austria: "Autriche",
  Belgium: "Belgique",
  "Bosnia and Herzegovina": "Bosnie-Herzégovine",
  Brazil: "Brésil",
  Canada: "Canada",
  "Cape Verde": "Cap-Vert",
  Colombia: "Colombie",
  "Congo DR": "RD Congo",
  Croatia: "Croatie",
  Curacao: "Curaçao",
  Czechia: "Tchéquie",
  Ecuador: "Équateur",
  Egypt: "Égypte",
  England: "Angleterre",
  France: "France",
  Germany: "Allemagne",
  Ghana: "Ghana",
  Haiti: "Haïti",
  Iran: "Iran",
  Iraq: "Irak",
  "Ivory Coast": "Côte d’Ivoire",
  Japan: "Japon",
  Jordan: "Jordanie",
  "Korea Republic": "Corée du Sud",
  Mexico: "Mexique",
  Morocco: "Maroc",
  Netherlands: "Pays-Bas",
  "New Zealand": "Nouvelle-Zélande",
  Norway: "Norvège",
  Panama: "Panama",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Qatar",
  "Saudi Arabia": "Arabie saoudite",
  Scotland: "Écosse",
  Senegal: "Sénégal",
  "South Africa": "Afrique du Sud",
  Spain: "Espagne",
  Sweden: "Suède",
  Switzerland: "Suisse",
  Tunisia: "Tunisie",
  Turkey: "Turquie",
  "United States": "États-Unis",
  Uruguay: "Uruguay",
  USA: "États-Unis",
  Uzbekistan: "Ouzbékistan",
};

const ENGLISH_FRAGMENT_PATTERNS = [
  /\bAttempt (?:saved|missed|blocked)\b/i,
  /\bShot (?:Off Target|On Target|Blocked) at\b/i,
  /\bAssisted by\b/i,
  /\bThe assist was provided by\b/i,
  /\bright footed shot\b/i,
  /\bleft footed shot\b/i,
  /\bis saved\b/i,
  /\bis blocked\b/i,
  /\bis high\b/i,
  /\bwide to the\b/i,
  /\btop (?:centre|center) of the goal\b/i,
  /\bfrom a difficult angle on the (?:left|right)\b/i,
  /\bfrom (?:outside|inside|the|very|long|more than)\b/i,
  /\bmisses to the\b/i,
  /\bhits the (?:post|bar)\b/i,
  /\bwith a (?:cross|through ball|headed pass|lobbed pass)\b/i,
  /\bfollowing a\b/i,
  /\bwins a free kick\b/i,
  /\bconceded by\b/i,
  /\bcommits a\b/i,
  /\bis shown the\b/i,
  /\bbecause of an injury\b/i,
];

const PLAIN_TEAM_TRANSLATIONS = Object.entries(TEAM_NAME_TRANSLATIONS)
  .filter(([englishName, frenchName]) => englishName !== frenchName)
  .sort(([a], [b]) => b.length - a.length);

type TranslationCache = Record<string, string>;

type ProtectedText = {
  text: string;
  replacements: Array<[string, string]>;
};

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translatePlainTeamReferences(text: string): string {
  return PLAIN_TEAM_TRANSLATIONS.reduce((translatedText, [englishName, frenchName]) => {
    const teamPattern = new RegExp(
      `\\b${escapeRegExp(englishName)}\\b(?=\\s+\\d|[.,:;!?)]|\\s*$)`,
      "g",
    );
    return translatedText.replace(teamPattern, frenchName);
  }, text);
}

function translateTeamReferences(text: string): string {
  const translatedParentheticalTeams = text.replace(/\(([^)]+)\)/g, (match, teamName: string) => {
    const translatedTeamName = TEAM_NAME_TRANSLATIONS[teamName.trim()];
    return translatedTeamName ? `(${translatedTeamName})` : match;
  });

  return translatePlainTeamReferences(translatedParentheticalTeams);
}

function protectCommentaryEntities(text: string): ProtectedText {
  const replacements: Array<[string, string]> = [];
  const namePart = String.raw`[A-ZÀ-ÖØ-Þ][\p{L}\p{M}'’.-]+`;
  const nameSequence = String.raw`${namePart}(?:\s+${namePart}){0,4}`;
  const nameWithTeamPattern = new RegExp(
    String.raw`\b${nameSequence}\s+\([^)]+\)`,
    "gu",
  );
  const assistedNamePattern = new RegExp(
    String.raw`\b(Assisted by|The assist was provided by|by)\s+(${nameSequence}(?:\s+\([^)]+\))?)`,
    "gu",
  );

  const protect = (value: string) => {
    const token = `__CDM_ENTITY_${replacements.length}__`;
    replacements.push([token, value]);
    return token;
  };

  let protectedText = text.replace(nameWithTeamPattern, (value) => protect(value));
  protectedText = protectedText.replace(
    assistedNamePattern,
    (_match, prefix: string, name: string) => `${prefix} ${protect(name)}`,
  );

  return { text: protectedText, replacements };
}

function restoreCommentaryEntities(text: string, replacements: Array<[string, string]>) {
  return replacements.reduce(
    (restoredText, [token, value]) => restoredText.replaceAll(token, value),
    text,
  );
}

export function translateCommentaryLocally(text: string): string {
  const translated = text
    .replace(/^Goal!/g, "But !")
    .replace(/^Goal -/g, "But -")
    .replace(/^Attempt saved\./g, "Tir arrêté.")
    .replace(/^Attempt missed\./g, "Tir non cadré.")
    .replace(/^Attempt blocked\./g, "Tir bloqué.")
    .replace(/^(.+?) Shot Off Target at ([0-9+']+)$/g, "Tir non cadré de $1 à $2.")
    .replace(/^(.+?) Shot On Target at ([0-9+']+)$/g, "Tir cadré de $1 à $2.")
    .replace(/^(.+?) Shot Blocked at ([0-9+']+)$/g, "Tir bloqué de $1 à $2.")
    .replace(/^Corner,/g, "Corner,")
    .replace(/^Foul by/g, "Faute de")
    .replace(/^Offside,/g, "Hors-jeu,")
    .replace(/^Substitution,/g, "Remplacement,")
    .replace(/^Second Half begins/g, "Début de la seconde période")
    .replace(/^First Half begins/g, "Début de la première période")
    .replace(/^First Half ends/g, "Fin de la première période")
    .replace(/^Second Half ends/g, "Fin de la seconde période")
    .replace(/^Match ends/g, "Fin du match")
    .replace(/^Delay in match/g, "Arrêt de jeu")
    .replace(/^Delay /g, "Arrêt de jeu ")
    .replace(/^VAR Decision:/g, "Décision VAR :")
    .replace(/^Video Review:/g, "Révision vidéo :")
    .replace(/^New attacking attempt/g, "Nouvelle tentative offensive")
    .replace(/is shown the yellow card/g, "reçoit un carton jaune")
    .replace(/is shown the red card/g, "reçoit un carton rouge")
    .replace(/right footed shot/g, "frappe du pied droit")
    .replace(/left footed shot/g, "frappe du pied gauche")
    .replace(/header/g, "tête")
    .replace(/from a free kick/g, "sur coup franc")
    .replace(/from very close range/g, "de très courte distance")
    .replace(/from more than (\d+) yards/g, "de plus de $1 mètres")
    .replace(/from long range on the left/g, "de loin côté gauche")
    .replace(/from long range on the right/g, "de loin côté droit")
    .replace(/from the centre of the box/g, "du centre de la surface")
    .replace(/from outside the box/g, "de l'extérieur de la surface")
    .replace(/from the left side of the box/g, "du côté gauche de la surface")
    .replace(/from the right side of the box/g, "du côté droit de la surface")
    .replace(/from the right side of the six yard box/g, "du côté droit des six mètres")
    .replace(/from the left side of the six yard box/g, "du côté gauche des six mètres")
    .replace(/from the centre of the six yard box/g, "du centre des six mètres")
    .replace(/from a difficult angle on the left/g, "d'un angle fermé côté gauche")
    .replace(/from a difficult angle on the right/g, "d'un angle fermé côté droit")
    .replace(/close range/g, "courte distance")
    .replace(/long range/g, "longue distance")
    .replace(/to the bottom left corner/g, "en bas à gauche")
    .replace(/to the bottom right corner/g, "en bas à droite")
    .replace(/to the top left corner/g, "en haut à gauche")
    .replace(/to the top right corner/g, "en haut à droite")
    .replace(/to the high centre of the goal/g, "en plein centre du but")
    .replace(/to the centre of the goal/g, "au centre du but")
    .replace(/to the bottom of the goal/g, "en bas du but")
    .replace(/to the top of the goal/g, "en haut du but")
    .replace(/to the high left/g, "en haut à gauche")
    .replace(/to the high right/g, "en haut à droite")
    .replace(/is saved in the bottom left corner/g, "est arrêté dans le coin inférieur gauche")
    .replace(/is saved in the bottom right corner/g, "est arrêté dans le coin inférieur droit")
    .replace(/is saved in the top left corner/g, "est arrêté dans le coin supérieur gauche")
    .replace(/is saved in the top right corner/g, "est arrêté dans le coin supérieur droit")
    .replace(/is saved in the top centre of the goal/g, "est arrêté en haut au centre du but")
    .replace(/is saved in the top center of the goal/g, "est arrêté en haut au centre du but")
    .replace(/is saved in the centre of the goal/g, "est arrêté au centre du but")
    .replace(/top centre of the goal/g, "haut du centre du but")
    .replace(/top center of the goal/g, "haut du centre du but")
    .replace(/is saved in the/g, "est arrêté dans le")
    .replace(/is close, but misses to the right/g, "passe proche du but, mais à droite")
    .replace(/is close, but misses to the left/g, "passe proche du but, mais à gauche")
    .replace(/is close, but misses the top right corner/g, "passe proche du but, mais au-dessus à droite")
    .replace(/is close, but misses the top left corner/g, "passe proche du but, mais au-dessus à gauche")
    .replace(/is close, but misses/g, "passe proche, mais manque")
    .replace(/misses to the right/g, "manque à droite")
    .replace(/misses to the left/g, "manque à gauche")
    .replace(/misses to the/g, "manque du côté")
    .replace(/hits the (?:left |right )?post/g, "frappe le poteau")
    .replace(/hits the bar/g, "frappe la barre")
    .replace(/is blocked/g, "est contré")
    .replace(/is high and wide to the right/g, "passe nettement au-dessus à droite")
    .replace(/is high and wide to the left/g, "passe nettement au-dessus à gauche")
    .replace(/is high and wide/g, "passe nettement au-dessus")
    .replace(/is just a bit too high/g, "passe de peu au-dessus")
    .replace(/is too high/g, "passe au-dessus")
    .replace(/Assisted by/g, "Passe décisive de")
    .replace(/The assist was provided by/g, "La passe décisive vient de")
    .replace(/ by ([A-ZÀ-ÖØ-Ý][^.]+)\./g, " par $1.")
    .replace(/with a through ball/g, "avec une passe en profondeur")
    .replace(/with a cross/g, "avec un centre")
    .replace(/with a cross following a corner/g, "avec un centre après un corner")
    .replace(/with a cross after a corner/g, "avec un centre après un corner")
    .replace(/with a headed pass/g, "avec une tête")
    .replace(/with a lobbed pass/g, "avec une passe lobée")
    .replace(/following a corner/g, "après un corner")
    .replace(/following a set piece situation/g, "sur coup de pied arrêté")
    .replace(/following a fast break/g, "sur contre-attaque")
    .replace(/replaces/g, "remplace")
    .replace(/because of an injury/g, "en raison d'une blessure")
    .replace(/for a bad foul/g, "pour une faute grossière")
    .replace(/for dangerous play/g, "pour jeu dangereux")
    .replace(/wins a free kick/g, "obtient un coup franc")
    .replace(/conceded by/g, "commis par")
    .replace(/commits a foul/g, "commet une faute")
    .replace(/commits a hand ball/g, "commet une main")
    .replace(/in the defensive half/g, "dans sa moitié de terrain")
    .replace(/in the attacking half/g, "dans la moitié offensive")
    .replace(/on the left wing/g, "sur l'aile gauche")
    .replace(/on the right wing/g, "sur l'aile droite")
    .replace(/Penalty saved!/g, "Penalty arrêté !")
    .replace(/Penalty conceded/g, "Penalty concédé")
    .replace(/Penalty - Loss/g, "Penalty manqué")
    .replace(/Penalty - Scored/g, "Penalty transformé")
    .replace(/Own Goal/g, "But contre son camp")
    .replace(/Hand ball/g, "Main")
    .replace(/Goal cancelled/g, "But annulé")
    .replace(/No goal/g, "Pas de but")
    .replace(/Goal awarded/g, "But accordé")
    .replace(/Referee Decision/g, "Décision de l'arbitre")
    .replace(/^The game resumes/g, "Le jeu reprend")
    .replace(/^The match has been suspended/g, "Le match est interrompu")
    .replace(/^Play has been resumed/g, "Le jeu a repris")
    .replace(/^The VAR reviews/g, "La VAR vérifie")
    .replace(/a possible goal/g, "un possible but")
    .replace(/a possible penalty/g, "un possible penalty")
    .replace(/the goal scored by/g, "le but marqué par")
    .replace(/the penalty awarded to/g, "le penalty accordé à");

  return translateTeamReferences(translated);
}

export function containsEnglishCommentaryFragments(text: string): boolean {
  return ENGLISH_FRAGMENT_PATTERNS.some((pattern) => pattern.test(text));
}

function getCachePath() {
  return process.env.CDM2026_COMMENTARY_TRANSLATION_CACHE_PATH ?? DEFAULT_CACHE_PATH;
}

function getCacheKey(sourceText: string) {
  return crypto.createHash("sha256").update(`deepl-v1:${sourceText}`).digest("hex");
}

async function readCache(cachePath: string): Promise<TranslationCache> {
  try {
    return JSON.parse(await readFile(cachePath, "utf8")) as TranslationCache;
  } catch {
    return {};
  }
}

async function writeCache(cachePath: string, cache: TranslationCache) {
  await mkdir(path.dirname(cachePath), { recursive: true });
  const tmpPath = `${cachePath}.${process.pid}.tmp`;
  await writeFile(tmpPath, JSON.stringify(cache, null, 2), "utf8");
  await rename(tmpPath, cachePath);
}

async function translateWithDeepL(sourceText: string): Promise<string | null> {
  const authKey = process.env.DEEPL_AUTH_KEY;
  if (!authKey) return null;

  const apiUrl = process.env.DEEPL_API_URL ?? "https://api-free.deepl.com/v2/translate";
  const protectedSource = protectCommentaryEntities(sourceText);
  const body = new URLSearchParams({
    text: protectedSource.text,
    source_lang: "EN",
    target_lang: "FR",
    preserve_formatting: "1",
  });

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `DeepL-Auth-Key ${authKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as {
      translations?: Array<{ text?: string }>;
    };
    const translatedText = payload.translations?.[0]?.text?.trim();
    return translatedText
      ? restoreCommentaryEntities(translatedText, protectedSource.replacements)
      : null;
  } catch {
    return null;
  }
}

async function translateCommentaryText(sourceText: string): Promise<string> {
  const localTranslation = translateCommentaryLocally(sourceText);
  if (!containsEnglishCommentaryFragments(localTranslation)) {
    return localTranslation;
  }

  const cachePath = getCachePath();
  const cacheKey = getCacheKey(sourceText);
  const cache = await readCache(cachePath);
  const cachedTranslation = cache[cacheKey];
  if (cachedTranslation) {
    return translateCommentaryLocally(cachedTranslation);
  }

  const deeplTranslation = await translateWithDeepL(sourceText);
  if (!deeplTranslation) return localTranslation;

  const normalizedTranslation = translateCommentaryLocally(deeplTranslation);
  cache[cacheKey] = normalizedTranslation;
  await writeCache(cachePath, cache);

  return normalizedTranslation;
}

export async function translateCommentaryPlays(
  plays: CommentaryPlay[],
): Promise<CommentaryPlay[]> {
  return Promise.all(
    plays.map(async (play) => ({
      ...play,
      text: await translateCommentaryText(play.text),
    })),
  );
}
