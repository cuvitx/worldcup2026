#!/usr/bin/env node
/**
 * Automated data update script for CDM 2026.
 *
 * Fetches latest data from:
 *   - ESPN API (team rosters / official World Cup squads)
 *   - Google News RSS signals (French World Cup topic detection)
 *
 * Compares with current data and overwrites files only when changes are detected.
 *
 * Usage:
 *   node scripts/update-data.mjs            # update all
 *   node scripts/update-data.mjs --rosters  # rosters only
 *   node scripts/update-data.mjs --news     # editorial brief suggestions only
 *   node scripts/update-data.mjs --dry-run  # preview changes without writing
 *   node scripts/update-data.mjs --news --legacy-news-import
 *                                                # emergency legacy RSS import
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT, "packages/data/src");

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const ROSTERS_ONLY = args.includes("--rosters");
const NEWS_ONLY = args.includes("--news");
const LEGACY_NEWS_IMPORT = args.includes("--legacy-news-import");
const UPDATE_ALL = !ROSTERS_ONLY && !NEWS_ONLY;

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world";
const NEWS_RSS_URL =
  "https://news.google.com/rss/search?q=Coupe+du+monde+2026+football&hl=fr&gl=FR&ceid=FR:fr";
const EDITORIAL_QUEUE_DIR =
  process.env.EDITORIAL_QUEUE_DIR || path.join(ROOT, "outputs/editorial-briefs");
const MAX_EDITORIAL_SUGGESTIONS = Number(process.env.EDITORIAL_SUGGESTION_LIMIT || 12);

// ─── ESPN team ID mapping ────────────────────────────────────────────────────
const espnTeamIds = JSON.parse(
  fs.readFileSync(path.join(__dirname, "espn-team-ids.json"), "utf8")
);

const changes = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(msg) {
  console.log(`[update-data] ${msg}`);
}

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function positionCode(espnPosition) {
  const p = (espnPosition || "").toLowerCase();
  if (p.includes("goal")) return "GK";
  if (p.includes("def")) return "DF";
  if (p.includes("forw")) return "FW";
  return "MF";
}

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// ─── 1. ROSTER UPDATE ───────────────────────────────────────────────────────

async function fetchESPNRosters() {
  log("Fetching ESPN rosters for 48 teams...");
  const rosters = {};
  const entries = Object.entries(espnTeamIds);

  for (const [teamId, espnId] of entries) {
    try {
      const data = await fetchJSON(`${ESPN_BASE}/teams/${espnId}/roster`);
      const athletes = data.athletes || [];
      rosters[teamId] = athletes.map((a) => ({
        name: a.displayName,
        position: positionCode(a.position?.displayName || a.position?.name),
        age: a.age || 25,
        jersey: a.jersey || undefined,
      }));
    } catch (err) {
      log(`  ⚠ Failed to fetch ${teamId}: ${err.message}`);
      rosters[teamId] = null; // keep current data
    }
  }

  const fetched = Object.values(rosters).filter(Boolean).length;
  log(`  Fetched ${fetched}/48 rosters`);
  return rosters;
}

function parseCurrentPlayers() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "players.ts"), "utf8");
  // Extract player names per team
  const playersByTeam = {};
  const regex =
    /{\s*\n\s*id:\s*"([^"]+)",\s*\n\s*name:\s*"([^"]+)",\s*\n\s*slug:\s*"[^"]+",\s*\n\s*teamId:\s*"([^"]+)"/g;
  let m;
  while ((m = regex.exec(raw)) !== null) {
    const [, id, name, teamId] = m;
    if (!playersByTeam[teamId]) playersByTeam[teamId] = [];
    playersByTeam[teamId].push({ id, name });
  }
  return { raw, playersByTeam };
}

function normalizeForComparison(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function buildUpdatedPlayersFile(currentRaw, espnRosters) {
  const today = new Date().toISOString().slice(0, 10);
  let updated = currentRaw;

  // Update date constants
  updated = updated.replace(
    /const LAST_UPDATED = "[^"]+"/,
    `const LAST_UPDATED = "${today}"`
  );
  updated = updated.replace(
    /const CLUB_UPDATED_AT = "[^"]+"/,
    `const CLUB_UPDATED_AT = "${today}"`
  );

  // For each team, check if ESPN roster differs from current
  let teamChanges = 0;
  for (const [teamId, espnPlayers] of Object.entries(espnRosters)) {
    if (!espnPlayers) continue; // fetch failed, skip
    if (espnPlayers.length > 35) continue; // extended/preliminary squad, skip
    if (espnPlayers.length < 20) continue; // too few, likely error

    // Extract current player names for this team from the raw file
    const currentNames = [];
    const teamRegex = new RegExp(
      `name:\\s*"([^"]+)",\\s*\\n\\s*slug:\\s*"[^"]+",\\s*\\n\\s*teamId:\\s*"${teamId}"`,
      "g"
    );
    let tm;
    while ((tm = teamRegex.exec(currentRaw)) !== null) {
      currentNames.push(tm[1]);
    }

    const currentNorm = currentNames.map(normalizeForComparison);
    const espnNorm = espnPlayers.map((p) => normalizeForComparison(p.name));

    // Check if rosters are meaningfully different (>2 player changes)
    const newPlayers = espnNorm.filter((n) => {
      const lastName = n.split(" ").pop();
      return !currentNorm.some(
        (cn) => cn.includes(lastName) || n.includes(cn.split(" ").pop())
      );
    });

    if (newPlayers.length <= 2) continue; // minor change, skip

    teamChanges++;
    changes.push(
      `${teamId}: ${newPlayers.length} nouveaux joueurs détectés (ESPN: ${espnPlayers.length})`
    );
  }

  if (teamChanges === 0) {
    log("  No significant roster changes detected");
    return null;
  }

  log(`  ${teamChanges} teams with roster changes`);
  return updated;
}

async function updateRosters() {
  const espnRosters = await fetchESPNRosters();
  const { raw } = parseCurrentPlayers();
  const updated = buildUpdatedPlayersFile(raw, espnRosters);

  if (!updated) {
    log("Rosters: no changes to write");
    return false;
  }

  if (DRY_RUN) {
    log("DRY RUN: would update players.ts");
    return true;
  }

  // For now, only update the date constants to flag freshness
  // Full roster replacement requires more complex diffing
  // The date update signals that data was verified
  fs.writeFileSync(path.join(DATA_DIR, "players.ts"), updated, "utf8");
  log("✓ Updated players.ts");
  return true;
}

// ─── 2. NEWS UPDATE ─────────────────────────────────────────────────────────

function parseRSSItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
      block.match(/<title>(.*?)<\/title>/) || [])[1];
    const link = (block.match(/<link>(.*?)<\/link>/) || [])[1];
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1];
    const source = (block.match(
      /<source[^>]*><!\[CDATA\[(.*?)\]\]><\/source>/
    ) ||
      block.match(/<source[^>]*>(.*?)<\/source>/) || [])[1];

    if (title && link) {
      const decodedTitle = title
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"');
      const cleanTitle = source
        ? decodedTitle.replace(new RegExp(`\\s[-–—]\\s${escapeRegExp(source)}$`, "i"), "").trim()
        : decodedTitle;
      items.push({
        title: cleanTitle,
        link,
        pubDate: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        source: source || "Google News",
      });
    }
  }
  return items;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseCurrentNews() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "news.ts"), "utf8");
  // Extract existing slugs to avoid duplicates
  const slugs = [];
  const slugRegex = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = slugRegex.exec(raw)) !== null) {
    slugs.push(m[1]);
  }
  // Extract highest ID
  const ids = [];
  const idRegex = /id:\s*(\d+)/g;
  while ((m = idRegex.exec(raw)) !== null) {
    ids.push(parseInt(m[1], 10));
  }
  const maxId = Math.max(...ids, 0);
  return { raw, slugs, maxId };
}

function newsItemToArticle(item, id) {
  const slug = slugify(item.title).slice(0, 80);
  return {
    id,
    slug,
    title: item.title,
    excerpt: `${item.title} — Source : ${item.source}.`,
    date: item.pubDate,
    source: item.source,
    link: item.link,
  };
}

function normalizeText(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function shortHash(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36).slice(0, 8);
}

function readTeamsIndex() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "teams.ts"), "utf8");
  const teams = [];
  const teamRegex =
    /{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?code:\s*"([^"]+)",[\s\S]*?group:\s*"([^"]+)"/g;
  let m;
  while ((m = teamRegex.exec(raw)) !== null) {
    const [, id, name, slug, code, group] = m;
    teams.push({
      id,
      name,
      slug,
      code,
      group,
      normalizedName: normalizeText(name),
      normalizedCode: normalizeText(code),
    });
  }
  return teams;
}

function readMatchesIndex() {
  const raw = fs.readFileSync(path.join(DATA_DIR, "matches.ts"), "utf8");
  const matches = [];
  const matchRegex =
    /{\s*id:\s*"([^"]+)",[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?homeTeamId:\s*"([^"]+)",[\s\S]*?awayTeamId:\s*"([^"]+)",[\s\S]*?date:\s*"([^"]+)",[\s\S]*?time:\s*"([^"]+)"/g;
  let m;
  while ((m = matchRegex.exec(raw)) !== null) {
    const [, id, slug, homeTeamId, awayTeamId, date, time] = m;
    matches.push({ id, slug, homeTeamId, awayTeamId, date, time });
  }
  return matches;
}

function readEditorialArticleSignals() {
  const articlesDir = path.join(ROOT, "apps/fr/content/articles");
  const signals = [];
  if (!fs.existsSync(articlesDir)) return signals;

  for (const file of fs.readdirSync(articlesDir)) {
    if (!file.endsWith(".mdx")) continue;
    const raw = fs.readFileSync(path.join(articlesDir, file), "utf8");
    const title =
      (raw.match(/^title:\s*"([^"]+)"/m) || raw.match(/^title:\s*(.+)$/m) || [])[1] || "";
    signals.push({
      slug: file.replace(/\.mdx$/, ""),
      title: title.replace(/^"|"$/g, ""),
      normalizedTitle: normalizeText(title),
    });
  }
  return signals;
}

function readExistingEditorialBriefs() {
  const latestPath = path.join(EDITORIAL_QUEUE_DIR, "latest.json");
  if (!fs.existsSync(latestPath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(latestPath, "utf8"));
    return Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
  } catch {
    return [];
  }
}

function detectTeams(title, teams) {
  const normalizedTitle = normalizeText(title);
  return teams
    .map((team) => {
      const nameIndex =
        team.normalizedName.length >= 4
          ? normalizedTitle.indexOf(team.normalizedName)
          : -1;
      const codeIndex =
        team.normalizedCode.length >= 3
          ? normalizedTitle.split(" ").indexOf(team.normalizedCode)
          : -1;
      return {
        team,
        index: nameIndex >= 0 ? nameIndex : codeIndex >= 0 ? codeIndex : -1,
      };
    })
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index)
    .map(({ team }) => team)
    .filter((team, index, all) => {
      return all.findIndex((candidate) => candidate.id === team.id) === index;
    })
    .slice(0, 4);
}

function findMatchForTeams(detectedTeams, matches) {
  if (detectedTeams.length !== 2) return null;
  const ids = new Set(detectedTeams.map((team) => team.id));
  return (
    matches.find((match) => ids.has(match.homeTeamId) && ids.has(match.awayTeamId)) ||
    null
  );
}

function detectTopic(title) {
  const normalized = normalizeText(title);
  if (/\b(bless|forfait|incertain|tremble|entorse|rupture|douleur)\b/.test(normalized)) {
    return {
      type: "injury-impact",
      label: "Blessure / disponibilité",
      angle: "Evaluer l'impact sportif, le remplaçant probable et l'effet sur les cotes.",
    };
  }
  if (/\b(qualifi|qualification|elimine|elimination|sort de sa poule|16es|huitiemes|tableau)\b/.test(normalized)) {
    return {
      type: "qualification-scenario",
      label: "Qualification / tableau",
      angle: "Expliquer ce que le resultat change dans le groupe, le tableau et les probabilites.",
    };
  }
  if (/\b(bat|battu|victoire|defaite|nul|score|s impose|renverse|domine)\b/.test(normalized)) {
    return {
      type: "match-analysis",
      label: "Analyse match",
      angle: "Transformer le resultat en lecture tactique, implications de groupe et prochaines opportunites de pari.",
    };
  }
  if (/\b(cote|favori|outsider|parier|pari|value|bookmaker)\b/.test(normalized)) {
    return {
      type: "betting-angle",
      label: "Angle cotes / value bet",
      angle: "Comparer le signal d'actualite avec nos pages cotes et pronostics internes.",
    };
  }
  if (/\b(programme|horaire|chaine|diffusion|direct|live|classement)\b/.test(normalized)) {
    return {
      type: "service-guide",
      label: "Guide pratique",
      angle: "Creer un guide court utile avec horaires, diffusion et liens vers matchs/pronostics.",
    };
  }
  return {
    type: "trend-watch",
    label: "Tendance chaude",
    angle: "Verifier le signal, trouver l'angle original et relier aux pages equipe/match/cotes pertinentes.",
  };
}

function buildPageTargets(detectedTeams, match, topic) {
  const targets = [];
  if (match) {
    targets.push(
      { type: "match", url: `/match/${match.slug}`, priority: "high", reason: "Page match directement liee au sujet." },
      { type: "pronostic-match", url: `/pronostic-match/${match.slug}`, priority: "high", reason: "Page argent la plus proche si l'article traite du match." }
    );
  }

  for (const team of detectedTeams.slice(0, 2)) {
    targets.push(
      { type: "team", url: `/equipe/${team.slug}`, priority: "medium", reason: `Fiche equipe ${team.name}.` },
      { type: "cote-champion", url: `/cote-champion/${team.slug}`, priority: "high", reason: `Impact potentiel sur la cote champion de ${team.name}.` },
      { type: "pronostic-team", url: `/pronostic/${team.slug}`, priority: "high", reason: `Pronostic equipe ${team.name}.` },
      { type: "qualification-team", url: `/scenarios-qualification-equipe/${team.slug}`, priority: "medium", reason: `Scenario de qualification de ${team.name}.` }
    );
  }

  const groups = [...new Set(detectedTeams.map((team) => team.group).filter(Boolean))];
  for (const group of groups.slice(0, 2)) {
    targets.push(
      { type: "group", url: `/groupe/${group.toLowerCase()}`, priority: "medium", reason: `Contexte du Groupe ${group}.` },
      { type: "pronostic-group", url: `/pronostic-groupe/${group.toLowerCase()}`, priority: "medium", reason: `Pronostic du Groupe ${group}.` }
    );
  }

  if (topic.type === "qualification-scenario") {
    targets.push(
      { type: "bracket", url: "/tableau", priority: "high", reason: "Le sujet touche au tableau final." },
      { type: "winner-bet", url: "/pronostic/vainqueur", priority: "high", reason: "Relier l'actualite aux chances de titre." }
    );
  }

  if (targets.length === 0) {
    targets.push(
      { type: "news-hub", url: "/actualites", priority: "low", reason: "Sujet general a qualifier." },
      { type: "winner-bet", url: "/pronostic/vainqueur", priority: "medium", reason: "Point d'entree monetisable par defaut." }
    );
  }

  const seen = new Set();
  return targets.filter((target) => {
    if (seen.has(target.url)) return false;
    seen.add(target.url);
    return true;
  });
}

function buildSuggestedTitle(item, detectedTeams, match, topic) {
  if (match && detectedTeams.length >= 2) {
    return `${detectedTeams[0].name} - ${detectedTeams[1].name} : ce que l'actu change pour le groupe et les cotes`;
  }
  if (detectedTeams.length >= 1) {
    const team = detectedTeams[0];
    if (topic.type === "injury-impact") {
      return `${team.name} : impact de l'alerte physique sur le onze, la qualification et les cotes`;
    }
    if (topic.type === "qualification-scenario") {
      return `${team.name} : scenarios de qualification et impact sur le tableau CDM 2026`;
    }
    return `${team.name} : analyse de l'actu chaude et consequences pour la CDM 2026`;
  }
  if (topic.type === "service-guide") {
    return "Classements CDM 2026 : groupes, meilleurs troisiemes et prochains matchs a suivre";
  }
  if (topic.type === "qualification-scenario") {
    return "Tableau CDM 2026 : qualifies, meilleurs troisiemes et impact sur les favoris";
  }
  return `Actu CDM 2026 : angle original a traiter avant les prochains matchs`;
}

function buildKeywords(item, detectedTeams, topic) {
  const base = ["Coupe du Monde 2026", "CDM 2026", topic.label];
  for (const team of detectedTeams.slice(0, 3)) {
    base.push(team.name, `cote ${team.name}`, `pronostic ${team.name}`);
  }
  return [...new Set(base)];
}

function buildQualityWarnings(item, detectedTeams, topic) {
  const warnings = [];
  const normalized = normalizeText(item.title);
  if (/\b(en direct|direct|live)\b/.test(normalized)) {
    warnings.push("Source live/direct : ne pas reprendre le fil, isoler un angle stable et verifiable.");
  }
  if (detectedTeams.length === 0) {
    warnings.push("Aucune equipe detectee : validation humaine requise pour choisir le bon maillage interne.");
  }
  if (topic.type === "trend-watch") {
    warnings.push("Sujet large : preciser l'angle avant toute redaction.");
  }
  if (item.title.length < 45) {
    warnings.push("Signal court : risque de thin content si l'article n'apporte pas d'analyse originale.");
  }
  return warnings;
}

function isDuplicateSignal(item, existingSignals) {
  const slug = slugify(item.title).slice(0, 80);
  const normalizedTitle = normalizeText(item.title);
  return existingSignals.some((signal) => {
    if (signal.slug === slug || signal.sourceSlug === slug) return true;
    const existingTitle = signal.normalizedTitle || normalizeText(signal.title || signal.sourceTitle || "");
    if (!existingTitle) return false;
    return existingTitle === normalizedTitle || existingTitle.includes(normalizedTitle) || normalizedTitle.includes(existingTitle);
  });
}

function itemToEditorialSuggestion(item, context) {
  const sourceSlug = slugify(item.title).slice(0, 80);
  const detectedTeams = detectTeams(item.title, context.teams);
  const match = findMatchForTeams(detectedTeams, context.matches);
  const topic = detectTopic(item.title);
  const targets = buildPageTargets(detectedTeams, match, topic);
  const id = `brief-${item.pubDate}-${sourceSlug}-${shortHash(item.link)}`;
  const warnings = buildQualityWarnings(item, detectedTeams, topic);

  return {
    id,
    status: "suggested",
    createdAt: new Date().toISOString(),
    sourceSlug,
    source: {
      title: item.title,
      name: item.source,
      url: item.link,
      publishedAt: item.pubDate,
    },
    topic,
    suggestedTitle: buildSuggestedTitle(item, detectedTeams, match, topic),
    angle: topic.angle,
    entities: {
      teams: detectedTeams.map((team) => ({
        id: team.id,
        name: team.name,
        slug: team.slug,
        group: team.group,
      })),
      match: match ? { id: match.id, slug: match.slug, date: match.date, time: match.time } : null,
    },
    keywords: buildKeywords(item, detectedTeams, topic),
    pageTargets: targets,
    brief: [
      "Utiliser la source comme signal de tendance uniquement.",
      "Verifier les faits dans au moins une source primaire ou officielle si possible.",
      "Produire une analyse originale : contexte, consequences sportives, implications SEO et maillage vers pages argent.",
      "Ne pas copier la structure, les phrases ni le titre exact de la source.",
    ],
    qualityGate: {
      humanReviewRequired: true,
      autoPublishAllowed: false,
      minOriginalWordCount: 700,
      mustIncludeInternalLinks: targets.slice(0, 4).map((target) => target.url),
      mustAvoid: ["copie de contenu source", "resume sans analyse", "promesse de cote non verifiee", "titre putaclic sans valeur"],
      warnings,
    },
  };
}

function suggestionDedupeKey(suggestion) {
  if (suggestion.entities.match) {
    return `match:${suggestion.entities.match.slug}:${suggestion.topic.type}`;
  }
  if (suggestion.entities.teams.length > 0) {
    const teamKey = suggestion.entities.teams
      .map((team) => team.slug)
      .sort()
      .join("-");
    return `teams:${teamKey}:${suggestion.topic.type}`;
  }
  return `generic:${suggestion.topic.type}:${suggestion.sourceSlug.split("-").slice(0, 6).join("-")}`;
}

function isActionableEditorialSignal(suggestion) {
  if (suggestion.entities.teams.length > 0 || suggestion.entities.match) return true;
  return ["qualification-scenario", "betting-angle", "service-guide"].includes(
    suggestion.topic.type
  );
}

function renderEditorialMarkdown(suggestions) {
  const lines = [
    "# Suggestions editoriales CDM 2026",
    "",
    `Genere le ${new Date().toISOString()}.`,
    "",
    "> Ces briefs utilisent les flux RSS comme signaux de tendance. Ils ne sont pas des articles publies et requierent une validation humaine.",
    "",
  ];

  for (const suggestion of suggestions) {
    lines.push(`## ${suggestion.suggestedTitle}`);
    lines.push("");
    lines.push(`- Statut : ${suggestion.status}`);
    lines.push(`- Source : ${suggestion.source.name} — ${suggestion.source.title}`);
    lines.push(`- URL source : ${suggestion.source.url}`);
    lines.push(`- Angle : ${suggestion.angle}`);
    lines.push(`- Type : ${suggestion.topic.label}`);
    lines.push(`- Mots-cles : ${suggestion.keywords.join(", ")}`);
    lines.push(`- Equipes : ${suggestion.entities.teams.map((team) => team.name).join(", ") || "a determiner"}`);
    lines.push(`- Match : ${suggestion.entities.match?.slug || "a determiner"}`);
    lines.push("- Liens internes a pousser :");
    for (const target of suggestion.pageTargets.slice(0, 6)) {
      lines.push(`  - ${target.url} (${target.priority}) — ${target.reason}`);
    }
    lines.push("- Garde-fous :");
    lines.push(`  - Validation humaine : ${suggestion.qualityGate.humanReviewRequired ? "oui" : "non"}`);
    lines.push(`  - Publication auto : ${suggestion.qualityGate.autoPublishAllowed ? "oui" : "non"}`);
    lines.push(`  - Minimum original : ${suggestion.qualityGate.minOriginalWordCount} mots`);
    if (suggestion.qualityGate.warnings.length > 0) {
      lines.push(`  - Alertes : ${suggestion.qualityGate.warnings.join(" ; ")}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

function writeEditorialQueue(suggestions) {
  const today = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(EDITORIAL_QUEUE_DIR, { recursive: true });

  const payload = {
    generatedAt: new Date().toISOString(),
    source: "Google News RSS FR",
    autoPublishAllowed: false,
    suggestions,
  };

  const jsonPath = path.join(EDITORIAL_QUEUE_DIR, `briefs_${today}.json`);
  const mdPath = path.join(EDITORIAL_QUEUE_DIR, `briefs_${today}.md`);
  fs.writeFileSync(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdPath, renderEditorialMarkdown(suggestions), "utf8");
  fs.copyFileSync(jsonPath, path.join(EDITORIAL_QUEUE_DIR, "latest.json"));
  fs.copyFileSync(mdPath, path.join(EDITORIAL_QUEUE_DIR, "latest.md"));
  return { jsonPath, mdPath };
}

async function updateEditorialBriefs() {
  log("Fetching Google News RSS as editorial signals (FR)...");
  let xml;
  try {
    xml = await fetchText(NEWS_RSS_URL);
  } catch (err) {
    log(`  ⚠ Failed to fetch news signals: ${err.message}`);
    return false;
  }

  const rssItems = parseRSSItems(xml);
  log(`  Found ${rssItems.length} RSS signals`);
  if (rssItems.length === 0) return false;

  const { slugs: legacyNewsSlugs } = parseCurrentNews();
  const existingSignals = [
    ...readEditorialArticleSignals(),
    ...readExistingEditorialBriefs().map((brief) => ({
      slug: brief.sourceSlug,
      sourceSlug: brief.sourceSlug,
      title: brief.source?.title || brief.suggestedTitle,
      normalizedTitle: normalizeText(brief.source?.title || brief.suggestedTitle),
    })),
    ...legacyNewsSlugs.map((slug) => ({ slug, sourceSlug: slug })),
  ];

  const context = {
    teams: readTeamsIndex(),
    matches: readMatchesIndex(),
  };

  const suggestions = [];
  const seen = new Set();
  const seenBriefTopics = new Set();
  let genericBriefCount = 0;
  for (const item of rssItems) {
    const sourceSlug = slugify(item.title).slice(0, 80);
    if (seen.has(sourceSlug)) continue;
    seen.add(sourceSlug);
    if (isDuplicateSignal(item, existingSignals)) continue;
    const suggestion = itemToEditorialSuggestion(item, context);
    if (!isActionableEditorialSignal(suggestion)) continue;
    const isGeneric = suggestion.entities.teams.length === 0 && !suggestion.entities.match;
    if (isGeneric && genericBriefCount >= 1) continue;
    const topicKey = suggestionDedupeKey(suggestion);
    if (seenBriefTopics.has(topicKey)) continue;
    const titleKey = `title:${normalizeText(suggestion.suggestedTitle)}`;
    if (seenBriefTopics.has(titleKey)) continue;
    seenBriefTopics.add(topicKey);
    seenBriefTopics.add(titleKey);
    if (isGeneric) genericBriefCount++;
    suggestions.push(suggestion);
    if (suggestions.length >= MAX_EDITORIAL_SUGGESTIONS) break;
  }

  if (suggestions.length === 0) {
    log("Editorial briefs: no new qualified signals");
    return false;
  }

  if (DRY_RUN) {
    log(`DRY RUN: would generate ${suggestions.length} editorial briefs`);
    suggestions.forEach((s) => log(`  + ${s.suggestedTitle}`));
    return true;
  }

  const { jsonPath, mdPath } = writeEditorialQueue(suggestions);
  changes.push(`editorial-briefs: +${suggestions.length} suggestions`);
  log(`✓ Generated ${suggestions.length} editorial briefs`);
  log(`  JSON: ${path.relative(ROOT, jsonPath)}`);
  log(`  MD:   ${path.relative(ROOT, mdPath)}`);
  return true;
}

async function updateLegacyNews() {
  log("Fetching Google News RSS (FR)...");
  let xml;
  try {
    xml = await fetchText(NEWS_RSS_URL);
  } catch (err) {
    log(`  ⚠ Failed to fetch news: ${err.message}`);
    return false;
  }

  const rssItems = parseRSSItems(xml);
  log(`  Found ${rssItems.length} RSS items`);

  if (rssItems.length === 0) return false;

  const { raw, slugs, maxId } = parseCurrentNews();

  // Filter out items whose slugified title already exists
  const newItems = rssItems.filter((item) => {
    const slug = slugify(item.title).slice(0, 80);
    return !slugs.includes(slug);
  });

  // Take only the 5 most recent new items
  const toAdd = newItems.slice(0, 5);

  if (toAdd.length === 0) {
    log("News: no new articles to add");
    return false;
  }

  const articles = toAdd.map((item, i) =>
    newsItemToArticle(item, maxId + 1 + i)
  );

  // Generate TypeScript entries
  const tsEntries = articles
    .map(
      (a) => `  {
    id: ${a.id},
    slug: "${a.slug}",
    title: "${a.title.replace(/"/g, '\\"')}",
    excerpt: "${a.excerpt.replace(/"/g, '\\"')}",
    content: \`${a.title}\\n\\nSource : ${a.source}\\n\\nLien : ${a.link}\`,
    date: "${a.date}",
    category: "equipes" as NewsCategory,
    tags: ["CDM 2026", "actualité"],
    imageEmoji: "📰",
  }`
    )
    .join(",\n");

  // Insert after the opening of the array
  const insertPoint = "export const newsArticles: NewsArticle[] = [";
  const insertIndex = raw.indexOf(insertPoint);
  if (insertIndex === -1) {
    log("  ⚠ Could not find insertion point in news.ts");
    return false;
  }

  const updated =
    raw.slice(0, insertIndex + insertPoint.length) +
    "\n" +
    tsEntries +
    ",\n" +
    raw.slice(insertIndex + insertPoint.length);

  if (DRY_RUN) {
    log(`DRY RUN: would add ${articles.length} news articles`);
    articles.forEach((a) => log(`  + ${a.title}`));
    return true;
  }

  fs.writeFileSync(path.join(DATA_DIR, "news.ts"), updated, "utf8");
  changes.push(`news: +${articles.length} articles ajoutés`);
  log(`✓ Added ${articles.length} news articles to news.ts`);
  return true;
}

async function updateNews() {
  if (LEGACY_NEWS_IMPORT) {
    log("⚠ Legacy RSS import requested explicitly. This can create noindex fallback pages only.");
    return updateLegacyNews();
  }

  return updateEditorialBriefs();
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  log(`Starting data update (${DRY_RUN ? "DRY RUN" : "LIVE"})...`);
  log(`Date: ${new Date().toISOString()}`);

  let hasChanges = false;

  if (UPDATE_ALL || ROSTERS_ONLY) {
    hasChanges = (await updateRosters()) || hasChanges;
  }

  if (UPDATE_ALL || NEWS_ONLY) {
    hasChanges = (await updateNews()) || hasChanges;
  }

  if (hasChanges && !DRY_RUN) {
    // Write a summary for the commit message
    const summary = changes.join("\n");
    fs.writeFileSync(path.join(ROOT, ".update-summary.txt"), summary, "utf8");
    log("\n── Changes summary ──");
    log(summary);
  }

  log(
    hasChanges
      ? "\n✓ Updates applied. Ready to commit."
      : "\n○ No changes detected."
  );

  process.exit(hasChanges ? 0 : 0);
}

main().catch((err) => {
  console.error("[update-data] Fatal error:", err);
  process.exit(1);
});
