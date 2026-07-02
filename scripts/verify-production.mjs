#!/usr/bin/env node

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.CDM2026_BASE_URL ?? "https://www.cdm2026.fr";
const outputDir =
  process.env.CDM2026_MONITORING_DIR ?? "/srv/cdm2026/shared/monitoring";
const gaffDir =
  process.env.CDM2026_GAFF_DIR ?? "/srv/cdm2026/shared/gambling-affiliation";
const searchConsoleDir =
  process.env.CDM2026_GSC_DIR ?? "/srv/cdm2026/shared/search-console";
const seoAffiliationDir =
  process.env.CDM2026_SEO_AFFILIATION_DIR ?? "/srv/cdm2026/shared/seo-affiliation";
const ga4Dir = process.env.CDM2026_GA4_DIR ?? "/srv/cdm2026/shared/ga4";
const editorialEngineDir =
  process.env.CDM2026_EDITORIAL_ENGINE_DIR ?? "/srv/cdm2026/shared/editorial-engine";
const editorialPublisherDir =
  process.env.CDM2026_EDITORIAL_PUBLISHER_DIR ?? "/srv/cdm2026/shared/editorial-publisher";
const attributionFunnelDir =
  process.env.CDM2026_ATTRIBUTION_FUNNEL_DIR ?? "/srv/cdm2026/shared/attribution-funnel";
const repoDir = process.env.CDM2026_REPO_DIR ?? process.cwd();
const now = new Date();
const fifaRankingMaxAgeDays = Number(
  process.env.CDM2026_FIFA_RANKING_MAX_AGE_DAYS ?? 90,
);
const fifaRankingWarningAgeDays = Number(
  process.env.CDM2026_FIFA_RANKING_WARNING_AGE_DAYS ?? 80,
);

const args = new Set(process.argv.slice(2));
const skipBrowser = args.has("--no-browser") || process.env.CDM2026_MONITOR_BROWSER === "0";
const requireBrowser = args.has("--require-browser");
const failOnWarnings = args.has("--fail-on-warnings");

const criticalPaths = [
  "/",
  "/live",
  "/match/aujourdhui",
  "/match/calendrier",
  "/phase-finale",
  "/tableau",
  "/simulateur",
  "/groupe/f",
  "/effectif/france",
  "/equipe/canada",
  "/plan-du-site/matchs",
  "/match/canada-vs-qatar",
  "/match/mexique-vs-afrique-du-sud",
  "/match/r32-match-5",
  "/match/r32-match-6",
  "/match/bresil-vs-japon",
  "/cote-champion/portugal",
  "/pronostic/vainqueur",
  "/pronostic-match/mexique-vs-afrique-du-sud",
  "/pronostic-match/r32-match-6",
  "/actualites",
];

const retiredPaths = [
  "/actualites/favoris-coupe-du-monde-2026",
  "/actualites/joueurs-a-suivre-mondial-2026",
  "/actualites/parcours-france-mondial-2026",
  "/actualites/guide-paris-coupe-du-monde-2026",
  "/actualites/guide-stades-mondial-2026",
  "/actualites/bresil-japon-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629-2",
  "/actualites/tchequie-au-mondial-2026-l-analyse-du-signal-du-jour-20260629",
  "/actualites/bresil-allemagne-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
  "/actualites/bresil-japon-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
  "/actualites/pays-bas-bresil-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
  "/actualites/pays-bas-coupe-du-monde-2026-forme-effectif-et-signal-a-surveiller-20260629",
  "/actualites/pays-bas-maroc-ce-que-le-signal-du-jour-change-pour-le-mondial-2026-20260629",
];

const mobilePaths = [
  "/",
  "/live",
  "/match/aujourdhui",
  "/match/calendrier",
  "/phase-finale",
  "/tableau",
  "/simulateur",
  "/groupe/f",
  "/effectif/france",
  "/equipe/canada",
  "/plan-du-site/matchs",
  "/match/canada-vs-qatar",
  "/match/mexique-vs-afrique-du-sud",
  "/match/r32-match-5",
  "/match/r32-match-6",
  "/match/bresil-vs-japon",
  "/cote-champion/portugal",
  "/pronostic/vainqueur",
  "/pronostic-match/r32-match-6",
];

const commentaryLanguagePaths = [
  "/match/r32-match-3",
  "/match/allemagne-vs-paraguay",
];

const visibleResultExpectations = {
  "/match/r32-match-3": [
    "PARAGUAY QUALIFIÉ AUX TIRS AU BUT",
    "Tirs au but : Allemagne 3 - 4 Paraguay",
  ],
  "/match/r32-match-6": [
    "France vainqueur",
    "Score final : 3 - 0",
  ],
};

const englishCommentaryFragments = [
  "Attempt saved",
  "Attempt missed",
  "Attempt blocked",
  "Shot Off Target at",
  "Shot On Target at",
  "Shot Blocked at",
  "Assisted by",
  "The assist was provided by",
  "right footed shot",
  "left footed shot",
  "is saved",
  "is blocked",
  "is high",
  "wide to the",
  "top centre of the goal",
  "top center of the goal",
  "from a difficult angle on the left",
  "from a difficult angle on the right",
  "from outside the box",
  "from the centre of the box",
  "from the left side",
  "from the right side",
  "misses to the",
  "hits the post",
  "hits the bar",
  "with a cross",
  "with a through ball",
  "following a corner",
  "wins a free kick",
  "conceded by",
  "is shown the",
  "because of an injury",
];

const englishTeamNamesInCommentary = [
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Belgium",
  "Bosnia and Herzegovina",
  "Brazil",
  "Cape Verde",
  "Colombia",
  "Congo DR",
  "Croatia",
  "Czechia",
  "Ecuador",
  "Egypt",
  "England",
  "Germany",
  "Ivory Coast",
  "Japan",
  "Jordan",
  "Korea Republic",
  "Mexico",
  "Morocco",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Saudi Arabia",
  "Scotland",
  "Senegal",
  "South Africa",
  "Spain",
  "Sweden",
  "Switzerland",
  "Tunisia",
  "Turkey",
  "United States",
  "Uzbekistan",
].join("|");

const englishCommentaryLeakPatterns = [
  new RegExp(`\\b(?:${englishTeamNamesInCommentary})\\s+\\d\\b`),
  new RegExp(`\\bRemplacement,\\s+(?:${englishTeamNamesInCommentary})\\b`),
];

const staticHtmlExpectations = [
  {
    path: "/",
    includes: ["Nos analyses", "Phase finale", "Afrique du Sud", "Canada"],
    excludes: ["Articles recents", "tbd-r32", "32es de finale"],
  },
  {
    path: "/live",
    includes: ["Prochains matchs", "Afrique du Sud", "Canada"],
    excludes: ["tbd-r32", "32es de finale"],
  },
  {
    path: "/match/aujourdhui",
    includes: ["Matchs du jour", "Afrique du Sud", "Canada"],
    excludes: ["tbd-r32", "32es de finale"],
  },
  {
    path: "/match/calendrier",
    includes: [
      "Arbre de la phase finale",
      "Pronostic du tableau",
      "/tableau",
      "/pronostic/vainqueur",
      "Brésil - Japon",
      "21:00",
      "19:00",
      "France",
      "Suède",
      "Équateur",
      "RD Congo",
    ],
    excludes: ["Tableau complet", "Meilleur 3e"],
  },
  {
    path: "/equipe/canada",
    includes: ["Canada", "Pronostic Canada", "Effectif Canada"],
    excludes: ["tbd-r16", "tbd-r32", "32e de finale", "32es de finale"],
  },
  {
    path: "/plan-du-site/matchs",
    includes: ["16es de finale", "8es de finale", "Afrique du Sud - Canada"],
    excludes: ["tbd-r16", "tbd-r32", "32e de finale", "32es de finale"],
  },
  {
    path: "/match/r32-match-5",
    includes: [
      "Côte d’Ivoire",
      "Norvège",
      "Matchs de la même journée",
      "Pays-Bas",
      "Maroc",
      "France",
      "Suède",
    ],
    excludes: ["TBD", "tbd-r32", "A déterminer", "Meilleur 3e"],
  },
  {
    path: "/match/bresil-vs-japon",
    includes: ["Brésil", "Japon", "16es de finale"],
    excludes: ["Erreur 404", "Page introuvable", "tbd-r32"],
  },
  {
    path: "/phase-finale",
    includes: [
      "Phase finale CDM 2026",
      "Tableau pronostic",
      "/match/r32-match-1",
      "phase-finale--index--banner",
      "Afrique du Sud",
      "Canada",
      "France",
      "Suède",
    ],
    excludes: ["32e de finale", "Meilleur 3e"],
  },
  {
    path: "/tableau",
    includes: [
      "Tableau pronostic CDM 2026",
      "16es de finale",
      "8es de finale",
      "/pronostic/vainqueur",
    ],
    excludes: ["32e de finale", "32e"],
  },
  {
    path: "/simulateur",
    includes: [
      "Construisez votre bracket CDM 2026",
      "16es de finale",
      "8es de finale",
      "Afrique du Sud",
      "Canada",
      "France",
      "Suède",
      "Mexique",
      "Équateur",
    ],
    excludes: [
      "32e de finale",
      "32E DE FINALE",
      "16e de finale",
      "16 matchs à prédire",
      "8 huitièmes",
    ],
  },
  {
    path: "/groupe/f",
    includes: ['data-aff-var="groupe--f--sidebar"', "/scenarios-qualification/f"],
  },
  {
    path: "/cote-champion/portugal",
    includes: ["cote-champion--portugal--hero", "croiser avant de parier"],
  },
  {
    path: "/pronostic/vainqueur",
    includes: [
      "Live forecast",
      "Top 10 live des favoris",
      "Équipes sorties du forecast actif",
      "Méthodologie du live forecast",
    ],
    excludes: [
      "Argentine 15%, France 13%, Espagne 12%",
      "mis à jour en temps réel",
    ],
  },
  {
    path: "/match/canada-vs-qatar",
    includes: ["Prochains pronostics", "Voir le pronostic"],
    excludes: ["TBD vs TBD", "tbd-r32"],
  },
  {
    path: "/pronostic-match/r32-match-6",
    includes: [
      "Pronostic France vs Suède",
      "Pronostic 1-N-2",
      "Victoire France",
      "Match nul",
      "Victoire Suède",
      "/score-exact/r32-match-6",
      "/equipe/france",
      "/equipe/suede",
    ],
    excludes: ["A déterminer", "Meilleur 3e", "TBD - TBD"],
  },
  {
    path: "/actualites",
    includes: ["Actualités Coupe du Monde 2026", "Analyses, guides et articles"],
    excludes: [
      "favoris-coupe-du-monde-2026",
      "en-direct-coupe-du-monde-2026",
      "Source :",
    ],
  },
];

function toUrl(pagePath) {
  return new URL(pagePath, baseUrl).toString();
}

function durationMs(startedAt) {
  return Math.round(performance.now() - startedAt);
}

function classify(checks) {
  if (checks.some((check) => check.status === "failed")) return "failed";
  if (checks.some((check) => check.status === "warning")) return "warning";
  return "ok";
}

function pushCheck(collection, check) {
  collection.push({
    checkedAt: now.toISOString(),
    ...check,
  });
}

function stripVolatileAssetNames(html) {
  return html.replace(/\/_next\/static\/chunks\/[^"'\\\]]+\.js/g, "");
}

function stripNonVisibleHtml(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
}

async function fetchText(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const startedAt = performance.now();

  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "CDM2026ProductionMonitor/1.0",
      },
    });
    const text = await response.text();
    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      durationMs: durationMs(startedAt),
      text,
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkHttpPages() {
  const checks = [];

  for (const pagePath of criticalPaths) {
    try {
      const response = await fetchText(toUrl(pagePath));
      pushCheck(checks, {
        name: "http_page",
        path: pagePath,
        status: response.ok && response.status === 200 ? "ok" : "failed",
        httpStatus: response.status,
        durationMs: response.durationMs,
        finalUrl: response.finalUrl,
      });
    } catch (error) {
      pushCheck(checks, {
        name: "http_page",
        path: pagePath,
        status: "failed",
        message: error.message,
      });
    }
  }

  for (const pagePath of retiredPaths) {
    try {
      const response = await fetchText(toUrl(pagePath));
      pushCheck(checks, {
        name: "retired_page",
        path: pagePath,
        status: response.status === 410 ? "ok" : "failed",
        httpStatus: response.status,
        durationMs: response.durationMs,
        finalUrl: response.finalUrl,
      });
    } catch (error) {
      pushCheck(checks, {
        name: "retired_page",
        path: pagePath,
        status: "failed",
        message: error.message,
      });
    }
  }

  return checks;
}

async function checkStaticHtml() {
  const checks = [];

  for (const expectation of staticHtmlExpectations) {
    try {
      const response = await fetchText(toUrl(expectation.path));
      const expectationText = stripVolatileAssetNames(response.text);
      const visibleExpectationText = stripNonVisibleHtml(expectationText);
      const missing = (expectation.includes ?? []).filter(
        (needle) => !expectationText.includes(needle),
      );
      const unexpected = (expectation.excludes ?? []).filter((needle) =>
        visibleExpectationText.includes(needle),
      );
      const ok = response.ok && missing.length === 0 && unexpected.length === 0;

      pushCheck(checks, {
        name: "static_html",
        path: expectation.path,
        status: ok ? "ok" : "failed",
        missing,
        unexpected,
      });
    } catch (error) {
      pushCheck(checks, {
        name: "static_html",
        path: expectation.path,
        status: "failed",
        message: error.message,
      });
    }
  }

  try {
    const response = await fetchText(toUrl("/"));
    const start = response.text.indexOf("Pari du jour");
    const end = response.text.indexOf("Parier sur PMU", start);
    const block =
      start >= 0 && end > start ? response.text.slice(start, end + 80) : "";
    const text = block
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    const oddsText = text.split("Notre prono")[0] ?? text;
    const odds = [...oddsText.matchAll(/\b\d+\.\d{2}\b/g)].map((match) => match[0]);
    const affVar = response.text.match(/data-aff-var="homepage--[^"]+--bet-of-the-day"/)?.[0] ?? "";
    const hasDashOdds = /(?:^|\s)1\s+—\s+N\s+—\s+2\s+—(?:\s|$)/.test(oddsText);

    pushCheck(checks, {
      name: "homepage_bet_odds",
      path: "/",
      status:
        response.ok &&
        start >= 0 &&
        end > start &&
        odds.length >= 3 &&
        !hasDashOdds &&
        Boolean(affVar)
          ? "ok"
          : "failed",
      odds: odds.slice(0, 3),
      affVar,
      hasDashOdds,
    });
  } catch (error) {
    pushCheck(checks, {
      name: "homepage_bet_odds",
      path: "/",
      status: "failed",
      message: error.message,
    });
  }

  try {
    const sitemap = await fetchText(toUrl("/sitemap.xml"));
    const hasEditorialArticle = /\/actualites\/(?!favoris-coupe-du-monde-2026)[^<\s]+/.test(
      sitemap.text,
    );
    const hasPhaseFinale = sitemap.text.includes("/phase-finale");
    const retiredInSitemap = retiredPaths.filter((retiredPath) =>
      sitemap.text.includes(retiredPath),
    );
    const hasOldRssSlug = sitemap.text.includes("en-direct-coupe-du-monde-2026");
    const hasInternalEditorialScaffold =
      sitemap.text.includes("signal-du-jour") || sitemap.text.includes("signal-rss");
    pushCheck(checks, {
      name: "sitemap_editorial",
      path: "/sitemap.xml",
      status:
        sitemap.ok &&
        hasPhaseFinale &&
        retiredInSitemap.length === 0 &&
        !hasOldRssSlug &&
        !hasInternalEditorialScaffold
          ? "ok"
          : "failed",
      hasEditorialArticle,
      hasPhaseFinale,
      retiredInSitemap,
      hasOldRssSlug,
      hasInternalEditorialScaffold,
    });
  } catch (error) {
    pushCheck(checks, {
      name: "sitemap_editorial",
      path: "/sitemap.xml",
      status: "failed",
      message: error.message,
    });
  }

  return checks;
}

async function loadPlaywright() {
  if (skipBrowser) {
    return { skipped: true, reason: "Browser checks disabled" };
  }

  try {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
    return { browser };
  } catch (error) {
    if (requireBrowser) throw error;
    return {
      skipped: true,
      reason: `Playwright unavailable: ${error.message}`,
    };
  }
}

async function checkMobileOverflow(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "mobile_overflow",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  try {
    for (const pagePath of mobilePaths) {
      const page = await context.newPage();
      try {
        await page.goto(toUrl(pagePath), {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
        await page.waitForTimeout(800);
        const result = await page.evaluate(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const bodyWidth = document.body.scrollWidth;
          const documentWidth = document.documentElement.scrollWidth;
          const pageWidth = Math.max(bodyWidth, documentWidth);
          const offenders = Array.from(document.body.querySelectorAll("*"))
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                id: element.id || "",
                className: String(element.className || "").slice(0, 120),
                text: String(element.textContent || "").trim().slice(0, 80),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
              };
            })
            .filter(
              (item) =>
                item.width > 0 &&
                (item.right > viewportWidth + 2 || item.left < -2),
            )
            .slice(0, 8);

          return {
            viewportWidth,
            bodyWidth,
            documentWidth,
            pageWidth,
            overflowPx: Math.max(0, pageWidth - viewportWidth),
            offenders,
          };
        });

        pushCheck(checks, {
          name: "mobile_overflow",
          path: pagePath,
          status: result.overflowPx <= 2 ? "ok" : "failed",
          ...result,
        });
      } catch (error) {
        pushCheck(checks, {
          name: "mobile_overflow",
          path: pagePath,
          status: "failed",
          message: error.message,
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
  }

  return checks;
}

async function checkAffiliateTracking(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "affiliate_click",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  try {
    await page.goto(toUrl("/cote-champion/portugal"), {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    await page.waitForTimeout(1200);

    const result = await page.evaluate(() => {
      window.__cdm2026GaEvents = [];
      window.gtag = (...args) => window.__cdm2026GaEvents.push(args);

      document.addEventListener(
        "click",
        (event) => {
          const target = event.target;
          if (
            target instanceof Element &&
            target.closest('a[rel*="sponsored"]')
          ) {
            event.preventDefault();
          }
        },
        true,
      );

      const sponsoredLinks = Array.from(
        document.querySelectorAll('a[rel*="sponsored"]'),
      );
      const visibleLink = sponsoredLinks.find((link) => {
        const rect = link.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });

      if (!visibleLink) {
        return {
          ok: false,
          reason: "No visible sponsored link",
          sponsoredCount: sponsoredLinks.length,
          events: [],
        };
      }

      const clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      visibleLink.dispatchEvent(clickEvent);

      return {
        ok: true,
        href: visibleLink.href,
        dataset: { ...visibleLink.dataset },
        rel: visibleLink.getAttribute("rel"),
        sponsoredCount: sponsoredLinks.length,
        events: window.__cdm2026GaEvents,
      };
    });

    const event = (result.events ?? []).find(
      (item) => item[0] === "event" && item[1] === "affiliate_click",
    );
    const params = event?.[2] ?? {};
    const requiredParams = [
      "affiliate_program",
      "aff_var",
      "page_type",
      "page_slug",
      "placement",
      "cta_type",
      "page_path",
      "outbound_domain",
      "outbound_url",
    ];
    const missingParams = requiredParams.filter((key) => !params[key]);
    // Format canonique "pageType--slug--placement" (":" tolere sur HTML cache).
    const hasCanonicalAffVar =
      typeof params.aff_var === "string" &&
      (params.aff_var.split("--").length >= 3 || params.aff_var.split(":").length >= 3);

    pushCheck(checks, {
      name: "affiliate_click",
      path: "/cote-champion/portugal",
      status:
        result.ok &&
        event &&
        missingParams.length === 0 &&
        hasCanonicalAffVar
          ? "ok"
          : "failed",
      sponsoredCount: result.sponsoredCount,
      href: result.href,
      dataset: result.dataset,
      params,
      missingParams,
      hasCanonicalAffVar,
      reason: result.reason,
    });
  } catch (error) {
    pushCheck(checks, {
      name: "affiliate_click",
      path: "/cote-champion/portugal",
      status: "failed",
      message: error.message,
    });
  } finally {
    await page.close();
    await context.close();
  }

  return checks;
}

async function checkKnockoutBracketWinners(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "knockout_bracket_winners",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });
  try {
    for (const item of [
      {
        path: "/match/calendrier",
        requiredPatterns: [
          /Paraguay\s+vainqueur/i,
          /Maroc\s+vainqueur/i,
          /tab\s+\d+\s*-\s*\d+/i,
        ],
        forbiddenPatterns: [],
      },
      {
        path: "/8emes-de-finale",
        requiredPatterns: [
          /Canada[\s\S]{0,260}Maroc/i,
          /Paraguay[\s\S]{0,260}(?:Vainqueur 16e 6|France|Suède)/i,
          /Brésil[\s\S]{0,260}(?:Vainqueur 16e 5|Côte d.Ivoire|Norvège)/i,
        ],
        forbiddenPatterns: [
          /Canada[\s\S]{0,220}Brésil/i,
          /Paraguay[\s\S]{0,220}Maroc/i,
        ],
      },
    ]) {
      const page = await context.newPage();
      try {
        await page.goto(toUrl(item.path), {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
        await page.waitForTimeout(1200);

        const text = await page.locator("body").innerText();
        const missing = item.requiredPatterns
          .filter((pattern) => !pattern.test(text))
          .map((pattern) => String(pattern));
        const forbidden = item.forbiddenPatterns
          .filter((pattern) => pattern.test(text))
          .map((pattern) => String(pattern));
        const structuredFailures = [];

        if (item.path === "/8emes-de-finale") {
          const sectionStart = text.indexOf("SAMEDI");
          const sectionEnd = text.indexOf("DIMANCHE", sectionStart);
          const saturdayText = sectionStart >= 0
            ? text.slice(sectionStart, sectionEnd > sectionStart ? sectionEnd : undefined)
            : "";
          const sundayStart = text.indexOf("DIMANCHE", sectionStart);
          const mondayStart = text.indexOf("LUNDI", sundayStart);
          const sundayText = sundayStart >= 0
            ? text.slice(sundayStart, mondayStart > sundayStart ? mondayStart : undefined)
            : "";
          const canadaIndex = saturdayText.indexOf("Canada");
          const paraguayIndex = saturdayText.indexOf("Paraguay");
          const moroccoIndex = saturdayText.indexOf("Maroc");
          const franceSwedenSlotIndex = [
            saturdayText.indexOf("Vainqueur 16e 6"),
            saturdayText.indexOf("France"),
            saturdayText.indexOf("Suède"),
          ].filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? -1;
          const brazilIndex = sundayText.indexOf("Brésil");
          const coteNorwaySlotIndex = [
            sundayText.indexOf("Vainqueur 16e 5"),
            sundayText.indexOf("Côte d'Ivoire"),
            sundayText.indexOf("Côte d’Ivoire"),
            sundayText.indexOf("Norvège"),
          ].filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? -1;

          if (!(canadaIndex >= 0 && canadaIndex < moroccoIndex && moroccoIndex < paraguayIndex && paraguayIndex < franceSwedenSlotIndex)) {
            structuredFailures.push("Expected 4 July fixtures to be Canada-Maroc then Paraguay-vainqueur France/Suède");
          }
          if (saturdayText.includes("Brésil")) {
            structuredFailures.push("Brésil must not be in the 4 July section");
          }
          if (!(brazilIndex >= 0 && brazilIndex < coteNorwaySlotIndex)) {
            structuredFailures.push("Expected 5 July fixture to be Brésil-vainqueur Côte d'Ivoire/Norvège");
          }
        }

        pushCheck(checks, {
          name: "knockout_bracket_winners",
          path: item.path,
          status:
            missing.length === 0 && forbidden.length === 0 && structuredFailures.length === 0
              ? "ok"
              : "failed",
          missing,
          forbidden,
          structuredFailures,
        });
      } finally {
        await page.close();
      }
    }
  } catch (error) {
    pushCheck(checks, {
      name: "knockout_bracket_winners",
      status: "failed",
      message: error.message,
    });
  } finally {
    await context.close();
  }

  return checks;
}

function sliceAround(text, pattern, before = 180, after = 900) {
  const match = text.match(pattern);
  if (!match || typeof match.index !== "number") return "";
  return text.slice(Math.max(0, match.index - before), match.index + after);
}

async function checkPhaseFinaleMatchSync(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "phase_finale_match_sync",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  try {
    const [matchPage, phasePage, calendarPage] = await Promise.all([
      context.newPage(),
      context.newPage(),
      context.newPage(),
    ]);

    try {
      await Promise.all([
        matchPage.goto(toUrl("/match/r32-match-5"), { waitUntil: "domcontentloaded", timeout: 45000 }),
        phasePage.goto(toUrl("/phase-finale"), {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        }),
        calendarPage.goto(toUrl("/match/calendrier"), { waitUntil: "domcontentloaded", timeout: 45000 }),
      ]);
      await Promise.all([
        matchPage.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {}),
        phasePage.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {}),
        calendarPage.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {}),
      ]);
      await matchPage.waitForTimeout(1200);
      await phasePage.waitForTimeout(1200);
      await calendarPage.waitForTimeout(1200);

      const [phaseText, calendarText] = await Promise.all([
        phasePage.locator("body").innerText(),
        calendarPage.locator("body").innerText(),
      ]);
      const targets = [
        {
          slug: "r32-match-5",
          matchUrl: "/match/r32-match-5",
          matchupPattern: /Côte d[’']Ivoire[\s\S]{0,180}Norvège|Norvège[\s\S]{0,180}Côte d[’']Ivoire/i,
          winnerPattern: /Norvège|NORVÈGE/i,
          nextRoundPattern: /Brésil[\s\S]{0,120}Norvège|Norvège[\s\S]{0,120}Brésil/i,
        },
        {
          slug: "r32-match-6",
          matchUrl: "/match/r32-match-6",
          matchupPattern: /France[\s\S]{0,180}Suède|Suède[\s\S]{0,180}France/i,
          winnerPattern: /France/i,
          nextRoundPattern: /Paraguay[\s\S]{0,140}France|France[\s\S]{0,140}Paraguay/i,
        },
      ];

      for (const target of targets) {
        await matchPage.goto(toUrl(target.matchUrl), {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        await matchPage.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
        await matchPage.waitForTimeout(800);
        const matchText = await matchPage.locator("body").innerText();
        const matchBlock = sliceAround(matchText, target.matchupPattern, 80, 1300);
        const phaseBlock = sliceAround(phaseText, target.matchupPattern, 160, 1300);
        const calendarBlock = sliceAround(calendarText, target.matchupPattern, 160, 1300);
        const matchFinished = /termin[ée]/i.test(matchBlock);
        const failures = [];

        if (!matchBlock) {
          failures.push(`Match page does not expose ${target.slug} block`);
        }
        if (!phaseBlock) {
          failures.push(`/phase-finale does not expose ${target.slug} block`);
        }
        if (!calendarBlock) {
          failures.push(`/match/calendrier does not expose ${target.slug} block`);
        }
        if (matchFinished) {
          for (const [label, block] of [
            ["/phase-finale", phaseBlock],
            ["/match/calendrier", calendarBlock],
          ]) {
            if (!/termin[ée]/i.test(block)) {
              failures.push(`Match page is finished but ${label} is not for ${target.slug}`);
            }
            if (/en direct/i.test(block)) {
              failures.push(`${label} still shows live status for ${target.slug}`);
            }
            if (!target.winnerPattern.test(block) || !/vainqueur|qualifi/i.test(block)) {
              failures.push(`${label} does not make the winner clear for ${target.slug}`);
            }
          }
          if (!target.nextRoundPattern.test(phaseText) || !target.nextRoundPattern.test(calendarText)) {
            failures.push(`Next round does not contain the resolved winner for ${target.slug}`);
          }
        }

        pushCheck(checks, {
          name: "phase_finale_match_sync",
          path: target.matchUrl,
          status: failures.length === 0 ? "ok" : "failed",
          reason: matchFinished
            ? `${target.slug} is finished on match page`
            : `${target.slug} is not finished yet on match page`,
          failures,
        });
      }
    } finally {
      await matchPage.close();
      await phasePage.close();
      await calendarPage.close();
    }
  } catch (error) {
    pushCheck(checks, {
      name: "phase_finale_match_sync",
      path: "/phase-finale",
      status: "failed",
      message: error.message,
    });
  } finally {
    await context.close();
  }

  return checks;
}

async function checkSimulatorBracketPath(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "simulator_bracket_path",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  await context.addInitScript(() => {
    localStorage.removeItem("cdm2026-bracket-v3");
    localStorage.removeItem("cdm2026-bracket-v4");
  });

  try {
    const page = await context.newPage();
    try {
      await page.goto(toUrl("/simulateur"), {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(1200);

      for (const teamName of ["Canada", "Maroc", "Paraguay", "France"]) {
        await page.getByRole("button", { name: new RegExp(teamName, "i") }).first().click();
        await page.waitForTimeout(150);
      }

      const r16Match1 = await page
        .locator('[data-simulator-match-id="R16-0"]:visible')
        .first()
        .innerText();
      const r16Match2 = await page
        .locator('[data-simulator-match-id="R16-1"]:visible')
        .first()
        .innerText();

      const failures = [];
      if (!/Canada/i.test(r16Match1) || !/Maroc/i.test(r16Match1)) {
        failures.push(`R16-0 should be Canada-Maroc, got: ${r16Match1}`);
      }
      if (!/Paraguay/i.test(r16Match2) || !/France/i.test(r16Match2)) {
        failures.push(`R16-1 should be Paraguay-France, got: ${r16Match2}`);
      }
      if (/Paraguay/i.test(r16Match1) || /Maroc/i.test(r16Match2)) {
        failures.push("Simulator still uses sequential R32 pairings for at least one R16 slot");
      }

      pushCheck(checks, {
        name: "simulator_bracket_path",
        path: "/simulateur",
        status: failures.length === 0 ? "ok" : "failed",
        failures,
      });
    } finally {
      await page.close();
    }
  } catch (error) {
    pushCheck(checks, {
      name: "simulator_bracket_path",
      path: "/simulateur",
      status: "failed",
      message: error.message,
    });
  } finally {
    await context.close();
  }

  return checks;
}

async function checkWinnerForecast(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "winner_live_forecast",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  });

  try {
    const page = await context.newPage();
    try {
      await page.goto(toUrl("/pronostic/vainqueur"), {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
      await page.waitForTimeout(1200);

      const bodyText = await page.locator("body").innerText();
      const activeSection = bodyText.split("Équipes sorties du forecast actif")[0] ?? bodyText;
      const eliminatedSection = bodyText.split("Équipes sorties du forecast actif")[1] ?? "";
      const failures = [];

      if (!/Live forecast/i.test(bodyText)) {
        failures.push("Hero does not expose live forecast wording");
      }
      if (!/Top 10 live des favoris/i.test(bodyText)) {
        failures.push("Top list is not labelled as live");
      }
      for (const eliminatedName of ["Allemagne", "Pays-Bas"]) {
        if (activeSection.includes(eliminatedName)) {
          failures.push(`${eliminatedName} still appears in active forecast`);
        }
        if (!eliminatedSection.includes(eliminatedName)) {
          failures.push(`${eliminatedName} is not listed as eliminated`);
        }
      }
      if (!/0%/.test(eliminatedSection)) {
        failures.push("Eliminated section does not show 0% verdict");
      }

      pushCheck(checks, {
        name: "winner_live_forecast",
        path: "/pronostic/vainqueur",
        status: failures.length === 0 ? "ok" : "failed",
        failures,
      });
    } finally {
      await page.close();
    }
  } catch (error) {
    pushCheck(checks, {
      name: "winner_live_forecast",
      path: "/pronostic/vainqueur",
      status: "failed",
      message: error.message,
    });
  } finally {
    await context.close();
  }

  return checks;
}

async function checkCommentaryLanguage(browser) {
  const checks = [];

  if (!browser) {
    pushCheck(checks, {
      name: "commentary_language",
      status: "warning",
      message: "Skipped because browser checks are unavailable",
    });
    return checks;
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  try {
    for (const pagePath of commentaryLanguagePaths) {
      const page = await context.newPage();
      try {
        await page.goto(toUrl(pagePath), {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        await page.waitForLoadState("networkidle", { timeout: 12000 }).catch(() => {});
        await page.waitForTimeout(1200);

        const text = await page.locator("body").innerText();
        const unexpected = englishCommentaryFragments.filter((fragment) =>
          text.includes(fragment),
        );
        const unexpectedPatterns = englishCommentaryLeakPatterns
          .map((pattern) => text.match(pattern)?.[0])
          .filter(Boolean);
        const hasCommentary = text.includes("Fil du match");
        const visibleExpectations = visibleResultExpectations[pagePath] ?? [];
        const normalizedText = text.toLocaleLowerCase("fr-FR");
        const missingVisible = visibleExpectations.filter(
          (fragment) => !normalizedText.includes(fragment.toLocaleLowerCase("fr-FR")),
        );

        pushCheck(checks, {
          name: "commentary_language",
          path: pagePath,
          status:
            hasCommentary &&
            unexpected.length === 0 &&
            unexpectedPatterns.length === 0 &&
            missingVisible.length === 0
              ? "ok"
              : "failed",
          missing: [...(hasCommentary ? [] : ["Fil du match"]), ...missingVisible],
          unexpected: [...unexpected, ...unexpectedPatterns],
        });
      } catch (error) {
        pushCheck(checks, {
          name: "commentary_language",
          path: pagePath,
          status: "failed",
          message: error.message,
        });
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
  }

  return checks;
}

async function checkFileFreshness() {
  const checks = [];

  const files = [
    {
      name: "gambling_affiliation_latest",
      filePath: path.join(gaffDir, "latest.summary.json"),
      maxAgeHours: 36,
      required: true,
    },
    {
      name: "editorial_briefs_latest",
      filePath: path.join(repoDir, "outputs/editorial-briefs/latest.json"),
      maxAgeHours: 36,
      required: false,
    },
    {
      name: "editorial_engine_latest",
      filePath: path.join(editorialEngineDir, "latest.summary.json"),
      maxAgeHours: 36,
      required: true,
    },
    {
      name: "editorial_publisher_latest",
      filePath: path.join(editorialPublisherDir, "latest.json"),
      maxAgeHours: 12,
      required: true,
    },
    {
      name: "ga4_latest",
      filePath: path.join(ga4Dir, "latest.summary.json"),
      maxAgeHours: 36,
      required: true,
    },
    {
      name: "attribution_funnel_latest",
      filePath: path.join(attributionFunnelDir, "latest.summary.json"),
      maxAgeHours: 36,
      required: true,
    },
    {
      name: "search_console_latest",
      filePath: path.join(searchConsoleDir, "latest.summary.json"),
      maxAgeHours: 36,
      required: true,
    },
    {
      name: "seo_affiliation_latest",
      filePath: path.join(seoAffiliationDir, "latest.json"),
      maxAgeHours: 36,
      required: true,
    },
  ];

  for (const file of files) {
    try {
      const fileStat = await stat(file.filePath);
      const ageHours = (now.getTime() - fileStat.mtime.getTime()) / 3600000;
      let parsed = null;
      try {
        parsed = JSON.parse(await readFile(file.filePath, "utf8"));
      } catch {
        parsed = null;
      }

      pushCheck(checks, {
        name: file.name,
        path: file.filePath,
        status:
          ageHours <= file.maxAgeHours
            ? "ok"
            : file.required
              ? "failed"
              : "warning",
        ageHours: Number(ageHours.toFixed(2)),
        maxAgeHours: file.maxAgeHours,
        conversions: parsed?.total_conversions ?? parsed?.conversions?.length,
        suggestions: parsed?.suggestions?.length,
        autoPublishAllowed: parsed?.autoPublishAllowed,
        parsedStatus: parsed?.status,
        clicks: parsed?.total_clicks,
        impressions: parsed?.total_impressions,
        avgPosition: parsed?.avg_position,
        briefCount: parsed?.summary?.brief_count,
        ga4Status: parsed?.status,
        ga4Connected: parsed?.connected,
        trackedClickEvents: parsed?.summary?.tracked_click_events,
        funnelClickSignal: parsed?.kpis?.page_click_signal,
        funnelCustomDimensionsRegistered: parsed?.kpis?.custom_dimensions_registered,
        rowsScored: parsed?.summary?.rows_scored,
        topOpportunities: parsed?.top_opportunities?.length,
        anomalyCount: parsed?.summary?.anomaly_count,
        seoGa4Connected: parsed?.ga4?.connected,
      });
    } catch (error) {
      pushCheck(checks, {
        name: file.name,
        path: file.filePath,
        status: file.required ? "failed" : "warning",
        message: error.message,
      });
    }
  }

  return checks;
}

async function checkGamblingAttribution() {
  // Garde-fou attribution : si les conversions recentes arrivent toutes avec
  // aff_var vide, la transmission aff_var_1 vers Gambling Affiliation est
  // cassee (regression vecue du 26 juin au 2 juillet 2026, separateur ":").
  const checks = [];
  const summaryPath = path.join(gaffDir, "latest.summary.json");

  try {
    const parsed = JSON.parse(await readFile(summaryPath, "utf8"));
    const total = parsed?.total_conversions ?? 0;
    const byAffVar = parsed?.by_aff_var ?? {};
    const keys = Object.keys(byAffVar);
    const emptyCount = byAffVar["(empty)"]?.count ?? 0;
    const allEmpty = total >= 3 && emptyCount === total;

    pushCheck(checks, {
      name: "gambling_attribution_aff_var",
      path: summaryPath,
      status: allEmpty ? "warning" : "ok",
      totalConversions: total,
      emptyAffVarConversions: emptyCount,
      affVarKeys: keys.slice(0, 10),
      message: allEmpty
        ? "Toutes les conversions recentes ont un aff_var vide : verifier la transmission aff_var_1 vers Gambling Affiliation"
        : undefined,
    });
  } catch (error) {
    pushCheck(checks, {
      name: "gambling_attribution_aff_var",
      path: summaryPath,
      status: "warning",
      message: error.message,
    });
  }

  return checks;
}

async function checkFifaRankingFreshness() {
  const checks = [];
  const teamsPath = path.join(repoDir, "packages/data/src/teams.ts");

  try {
    const source = await readFile(teamsPath, "utf8");
    const match = source.match(/FIFA Rankings as of ([A-Za-z]+ \d{1,2}, \d{4})/);

    if (!match) {
      pushCheck(checks, {
        name: "fifa_ranking_freshness",
        path: teamsPath,
        status: "warning",
        message: "Ranking source date not found in teams.ts",
      });
      return checks;
    }

    const sourceDate = new Date(`${match[1]} 00:00:00 UTC`);
    if (Number.isNaN(sourceDate.getTime())) {
      pushCheck(checks, {
        name: "fifa_ranking_freshness",
        path: teamsPath,
        status: "warning",
        sourceDate: match[1],
        message: "Ranking source date could not be parsed",
      });
      return checks;
    }

    const ageDays = (now.getTime() - sourceDate.getTime()) / 86400000;
    const daysUntilMaxAge = fifaRankingMaxAgeDays - ageDays;
    const isFresh = ageDays <= fifaRankingMaxAgeDays;
    const isApproaching = isFresh && ageDays >= fifaRankingWarningAgeDays;
    pushCheck(checks, {
      name: "fifa_ranking_freshness",
      path: teamsPath,
      status: isFresh ? "ok" : "warning",
      sourceDate: sourceDate.toISOString().slice(0, 10),
      ageDays: Number(ageDays.toFixed(1)),
      maxAgeDays: fifaRankingMaxAgeDays,
      warningAgeDays: fifaRankingWarningAgeDays,
      daysUntilMaxAge: Number(daysUntilMaxAge.toFixed(1)),
      message: !isFresh
        ? "Classement FIFA statique a rafraichir ou automatiser"
        : isApproaching
          ? "Classement FIFA proche du seuil de fraicheur ; preparer une mise a jour"
          : undefined,
    });
  } catch (error) {
    pushCheck(checks, {
      name: "fifa_ranking_freshness",
      path: teamsPath,
      status: "warning",
      message: error.message,
    });
  }

  return checks;
}

async function checkSourceGuards() {
  const checks = [];
  const guards = [
    {
      name: "extra_time_bt_api_mapping",
      filePath: path.join(repoDir, "packages/api/src/football/match-results.ts"),
      includes: ['BT: "live"'],
    },
    {
      name: "extra_time_bt_header_ticker",
      filePath: path.join(repoDir, "apps/fr/app/components/ConnectedLiveScoreBar.tsx"),
      includes: ["LIVE_STATUS_ORDER", "BT: 4"],
    },
    {
      name: "extra_time_bt_match_hero",
      filePath: path.join(repoDir, "apps/fr/app/match/[slug]/_components/MatchHeroAdaptive.tsx"),
      includes: ["LIVE_STATUS_ORDER", "BT: 4"],
    },
    {
      name: "extra_time_bt_ui_ticker",
      filePath: path.join(repoDir, "packages/ui/src/live-score-bar.tsx"),
      includes: ['extraBreak: "PAUSE PROL."', '["1H", "2H", "BT", "ET", "P"]'],
    },
    {
      name: "extra_time_bt_live_widget",
      filePath: path.join(repoDir, "packages/ui/src/live-match-widget.tsx"),
      includes: ['extraBreak: "PAUSE AVANT PROLONGATION"', 'BT: "live"'],
    },
  ];

  for (const guard of guards) {
    try {
      const source = await readFile(guard.filePath, "utf8");
      const missing = guard.includes.filter((needle) => !source.includes(needle));
      pushCheck(checks, {
        name: guard.name,
        path: guard.filePath,
        status: missing.length === 0 ? "ok" : "failed",
        missing,
      });
    } catch (error) {
      pushCheck(checks, {
        name: guard.name,
        path: guard.filePath,
        status: "failed",
        message: error.message,
      });
    }
  }

  return checks;
}

function buildMarkdown(report) {
  const lines = [
    "# CDM2026 production monitoring",
    "",
    `Generated at: ${report.generatedAt}`,
    `Base URL: ${report.baseUrl}`,
    `Overall status: ${report.overallStatus}`,
    "",
    "## Summary",
    "",
    `- OK: ${report.summary.ok}`,
    `- Warnings: ${report.summary.warning}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  for (const [sectionName, checks] of Object.entries(report.sections)) {
    lines.push(`## ${sectionName}`, "");
    for (const check of checks) {
      const label = check.path ? `${check.name} ${check.path}` : check.name;
      const details = [];
      if (check.httpStatus) details.push(`HTTP ${check.httpStatus}`);
      if (check.durationMs) details.push(`${check.durationMs} ms`);
      if (typeof check.overflowPx === "number") {
        details.push(`overflow ${check.overflowPx}px`);
      }
      if (typeof check.ageHours === "number") {
        details.push(`age ${check.ageHours}h`);
      }
      if (typeof check.ageDays === "number") {
        details.push(`age ${check.ageDays}d`);
      }
      if (typeof check.maxAgeDays === "number") {
        details.push(`max ${check.maxAgeDays}d`);
      }
      if (typeof check.warningAgeDays === "number") {
        details.push(`warning ${check.warningAgeDays}d`);
      }
      if (typeof check.daysUntilMaxAge === "number") {
        details.push(`${check.daysUntilMaxAge}d before max`);
      }
      if (check.sourceDate) details.push(`source ${check.sourceDate}`);
      if (check.parsedStatus) details.push(`status ${check.parsedStatus}`);
      if (typeof check.briefCount === "number") {
        details.push(`${check.briefCount} briefs`);
      }
      if (typeof check.ga4Connected === "boolean") {
        details.push(`ga4 connected ${check.ga4Connected}`);
      }
      if (typeof check.trackedClickEvents === "number") {
        details.push(`${check.trackedClickEvents} tracked click events`);
      }
      if (check.message) details.push(check.message);
      if (check.reason) details.push(check.reason);
      if (check.missingParams?.length) {
        details.push(`missing params: ${check.missingParams.join(", ")}`);
      }
      if (check.missing?.length) {
        details.push(`missing: ${check.missing.join(", ")}`);
      }
      if (check.unexpected?.length) {
        details.push(`unexpected: ${check.unexpected.join(", ")}`);
      }
      if (check.failures?.length) {
        details.push(`failures: ${check.failures.join(" | ")}`);
      }
      lines.push(`- ${check.status.toUpperCase()} - ${label}`);
      if (details.length) lines.push(`  - ${details.join(" ; ")}`);
    }
    lines.push("");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const sections = {
    http: await checkHttpPages(),
    staticHtml: await checkStaticHtml(),
    freshness: await checkFileFreshness(),
    attribution: await checkGamblingAttribution(),
    rankings: await checkFifaRankingFreshness(),
    sourceGuards: await checkSourceGuards(),
  };

  let browser = null;
  const playwright = await loadPlaywright();
  if (playwright.browser) browser = playwright.browser;
  if (playwright.skipped) {
    sections.browser = [
      {
        checkedAt: now.toISOString(),
        name: "playwright",
        status: requireBrowser ? "failed" : "warning",
        message: playwright.reason,
      },
    ];
  }

  try {
    sections.mobile = await checkMobileOverflow(browser);
    sections.bracket = await checkKnockoutBracketWinners(browser);
    sections.phaseFinaleSync = await checkPhaseFinaleMatchSync(browser);
    sections.simulator = await checkSimulatorBracketPath(browser);
    sections.winnerForecast = await checkWinnerForecast(browser);
    sections.commentary = await checkCommentaryLanguage(browser);
    sections.affiliate = await checkAffiliateTracking(browser);
  } finally {
    if (browser) await browser.close();
  }

  const allChecks = Object.values(sections).flat();
  const summary = allChecks.reduce(
    (acc, check) => {
      acc[check.status] = (acc[check.status] ?? 0) + 1;
      return acc;
    },
    { ok: 0, warning: 0, failed: 0 },
  );
  const overallStatus = classify(allChecks);
  const report = {
    generatedAt: now.toISOString(),
    baseUrl,
    overallStatus,
    summary,
    sections,
  };

  await mkdir(outputDir, { recursive: true });
  const stamp = now.toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(outputDir, `production-monitoring_${stamp}.json`);
  const mdPath = path.join(outputDir, `production-monitoring_${stamp}.md`);
  const latestJsonPath = path.join(outputDir, "latest.json");
  const latestMdPath = path.join(outputDir, "latest.md");
  const markdown = buildMarkdown(report);

  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(mdPath, markdown);
  await writeFile(latestJsonPath, `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(latestMdPath, markdown);

  console.log(markdown);

  if (overallStatus === "failed") process.exitCode = 1;
  if (overallStatus === "warning" && failOnWarnings) process.exitCode = 2;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
