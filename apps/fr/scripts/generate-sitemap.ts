/**
 * Pre-build script to generate sitemap.xml as a static file.
 * Run: npx tsx apps/fr/scripts/generate-sitemap.ts
 * Output: apps/fr/public/sitemap.xml
 */
import { writeFileSync } from "fs";
import { join } from "path";

// Direct imports from source
import { teams } from "../../../packages/data/src/teams";
import { groups } from "../../../packages/data/src/groups";
import { stadiums } from "../../../packages/data/src/stadiums";
import { cities } from "../../../packages/data/src/cities";
import { players } from "../../../packages/data/src/players";
import { matches } from "../../../packages/data/src/matches";
import { scorerPlayers } from "../../../packages/data/src/scorers";
import { bookmakerReviews } from "../../../packages/data/src/bookmaker-reviews";
import { guides } from "../../../packages/data/src/guides";
import { newsArticles } from "../../../packages/data/src/news";

const BASE = "https://www.cdm2026.fr";
const TODAY = new Date().toISOString().split("T")[0];
const STATIC = "2026-02-21";

console.log(`[sitemap] teams=${teams.length} matches=${matches.length} players=${players.length} stadiums=${stadiums.length} cities=${cities.length} groups=${groups.length}`);

const CONFRONTATION_SLUGS = [
  "france-vs-bresil","argentine-vs-allemagne","bresil-vs-allemagne","france-vs-allemagne",
  "france-vs-italie","bresil-vs-argentine","angleterre-vs-allemagne","espagne-vs-italie",
  "france-vs-argentine","bresil-vs-france","allemagne-vs-italie","angleterre-vs-france",
  "pays-bas-vs-argentine","bresil-vs-angleterre","espagne-vs-allemagne","portugal-vs-espagne",
  "france-vs-espagne","allemagne-vs-pays-bas","argentine-vs-angleterre","bresil-vs-italie",
  "france-vs-portugal","uruguay-vs-bresil","argentine-vs-bresil","pays-bas-vs-allemagne",
  "angleterre-vs-argentine","france-vs-pays-bas","espagne-vs-angleterre","allemagne-vs-bresil",
  "italie-vs-angleterre","portugal-vs-france",
];
const ECRANS_GEANTS_SLUGS = ["paris","lyon","marseille","toulouse","bordeaux","nice","nantes","strasbourg","montpellier","lille","rennes","saint-etienne","grenoble","dijon","toulon","angers","brest","metz","reims","le-havre"];
const TOP_50 = ["mbappe","haaland","vinicius-jr","bellingham","yamal","messi","ronaldo","kane","salah","de-bruyne","griezmann","neymar","lewandowski","osimhen","saka","pedri","rodri","gavi","foden","rashford","alvarez","martinez-lautaro","isak","vlahovic","morata","richarlison","gakpo","thuram","kim-min-jae","hakimi","valverde","tchouameni","camavinga","wirtz","musiala","szczesny","alisson","courtois","van-dijk","dias","hojlund","palmer","nunez","diaz-luis","dembele","son","kulusevski","raphinha","bruno-fernandes","bernardo-silva"];
const REFEREES = ["facundo-tello","jesus-valenzuela","wilton-sampaio","raphael-claus","cesar-ramos","fernando-rapallini","andres-matonte","piero-maza","mario-escobar","ivan-barton","clement-turpin","francois-letexier","szymon-marciniak","daniele-orsato","antonio-mateu-lahoz","felix-brych","daniel-siebert","michael-oliver","anthony-taylor","slavko-vincic","istvan-kovacs","halil-umut-meler","abdulrahman-al-jassim","mustapha-ghorbal","victor-gomes","bakary-gassama","salima-mukansanga","maguette-ndiaye","ma-ning","yoshimi-yamashita","chris-beath","matthew-conger","ismail-elfath","kralovec-pavel","nicholas-mohammed","said-martinez"];
const BONUS = ["winamax","betclic","unibet","parionssport"];

interface Entry { url: string; lastmod: string; prio: number; freq: string; }
const entries: Entry[] = [];

function add(path: string, prio = 0.7, lastmod = STATIC, freq = "weekly") {
  entries.push({ url: `${BASE}${path}`, lastmod, prio, freq });
}
function addSlugs(prefix: string, slugs: { slug: string }[], prio = 0.7, lastmod = STATIC) {
  slugs.forEach(s => add(`/${prefix}/${s.slug}`, prio, lastmod));
}
function addStatic(prefix: string, slugs: string[], prio = 0.7) {
  slugs.forEach(s => add(`/${prefix}/${s}`, prio));
}

// Static
add("/", 1.0, TODAY, "daily");
["/equipe","/groupes","/joueurs","/stades","/villes"].forEach(p => add(p, 0.9));
["/buteurs","/match/calendrier","/match/aujourdhui","/tableau","/live","/comparateur-cotes","/actualites","/paris-sportifs","/pronostic"].forEach(p => add(p, 0.9, TODAY, "daily"));
["/simulateur","/comparateur-joueurs","/comparateur-equipes","/statistiques","/histoire","/billets","/ou-regarder","/guides","/voyage","/meilleurs-bookmakers","/bonus","/pronostics/grille"].forEach(p => add(p, 0.8));
["/palmares","/faq","/quiz","/guide/glossaire","/carte-stades","/fan-zones","/arbitres","/h2h","/methodes-paiement","/pronostics/leaderboard","/newsletter","/recherche"].forEach(p => add(p, 0.7));
["/plan-du-site","/a-propos","/contact","/jeu-responsable","/equipe-editoriale","/methodologie"].forEach(p => add(p, 0.3, STATIC, "monthly"));
["/mentions-legales","/politique-de-confidentialite"].forEach(p => add(p, 0.2, STATIC, "monthly"));

// Pronostics
["vainqueur","btts","over-under","buteurs","cartons","clean-sheet","scores-exacts","finalistes","tirs-au-but"].forEach(t => add(`/pronostic/${t}`, 0.8, TODAY));
// Paris sportifs
["corners","handicap","live","mi-temps","combines","bankroll","value-bets","lexique","cashout","strategie","guide","dark-horses","ballon-or"].forEach(p => add(`/paris-sportifs/${p}`, 0.7));
// Voyage
["esta-visa-usa","visa-mexique","formalites-canada","vols-budget","assurance","carte-sim","valise","decalage-horaire","pourboires","supporter-francais","wifi-stades","alcool-stades","hebergement","securite"].forEach(v => add(`/voyage/${v}`, 0.7));

// Teams
addSlugs("equipe", teams, 0.9); addSlugs("effectif", teams, 0.8); addSlugs("parier", teams, 0.8);
addSlugs("cote-champion", teams, 0.8); addSlugs("pronostic", teams, 0.9, TODAY);
addSlugs("scenarios-qualification-equipe", teams, 0.7); addSlugs("joueurs/equipe", teams, 0.7);

// Matches
addSlugs("match", matches, 0.8); addSlugs("pronostic-match", matches, 0.9, TODAY);
addSlugs("score-exact", matches, 0.7); addSlugs("compos-officielles", matches, 0.7);
addSlugs("arbitre", matches, 0.7); addSlugs("corners", matches, 0.7);
addSlugs("possession", matches, 0.7); addSlugs("hors-jeu", matches, 0.7);
addSlugs("sur-quelle-chaine", matches, 0.8);
for (let i = 1; i <= 39; i++) add(`/calendrier/jour-${i}`, 0.8, TODAY);

// Groups
addSlugs("groupe", groups, 0.9); addSlugs("pronostic-groupe", groups, 0.8, TODAY);
addSlugs("scenarios-qualification", groups, 0.7); addSlugs("joueurs/groupe", groups, 0.7);

// Stadiums & Cities
addSlugs("stade", stadiums, 0.8); addSlugs("ville", cities, 0.8);
addSlugs("fan-zone", cities, 0.7); addSlugs("hebergement", cities, 0.7);
addSlugs("meteo", cities, 0.7); addSlugs("transport", cities, 0.7);
addSlugs("guide-supporter", cities, 0.7); addSlugs("securite", cities, 0.7);
addStatic("ecrans-geants", ECRANS_GEANTS_SLUGS, 0.7);

// Players
addSlugs("joueur", players, 0.7); addSlugs("buteur", scorerPlayers, 0.8);
["tirs-cadres","passes-decisives","tacles","cote-carton-jaune","cote-buteur"].forEach(p => addStatic(p, TOP_50, 0.7));
addStatic("statistiques-arbitre", REFEREES, 0.7);

// Bookmakers & Bonus
addSlugs("bookmaker", bookmakerReviews, 0.8); addStatic("bonus", BONUS, 0.8);

// Articles & Guides
newsArticles.forEach(a => add(`/actualites/${a.slug}`, 0.7, a.date || STATIC));
addSlugs("guide", guides, 0.8);

// H2H
addStatic("confrontation", CONFRONTATION_SLUGS, 0.7);
for (let i = 0; i < teams.length; i++) {
  for (let j = i + 1; j < teams.length; j++) {
    add(`/h2h/${teams[i]!.slug}-vs-${teams[j]!.slug}`, 0.6, STATIC, "monthly");
  }
}

// Generate XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(e => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.freq}</changefreq>
    <priority>${e.prio}</priority>
  </url>`).join("\n")}
</urlset>`;

import { fileURLToPath } from "url";
const __script_dir = fileURLToPath(new URL(".", import.meta.url));
const outPath = join(__script_dir, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`[sitemap] Written ${entries.length} URLs to ${outPath}`);
