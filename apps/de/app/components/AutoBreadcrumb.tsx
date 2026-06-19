"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * AutoBreadcrumb — Generates breadcrumbs automatically from the URL pathname.
 * Placed once in layout.tsx, never imported in individual pages.
 */

/* ── Route labels: maps URL segments to human-readable names ── */
const SEGMENT_LABELS: Record<string, string> = {
  // Hubs
  equipes: "Mannschaften",
  equipe: "Mannschaften",
  Gruppen: "Gruppen",
  gruppe: "Gruppen",
  Spielers: "Spieler",
  Spieler: "Spieler",
  Torschützen: "Torschützen",
  Torschütze: "Torschützen",
  Stadien: "Stadien",
  stade: "Stadien",
  Städte: "Städte",
  ville: "Städte",
  match: "Spiele",
  guides: "Ratgeber",
  guide: "Ratgeber",
  actualites: "Nachrichten",
  statistiques: "Statistiken",
  histoire: "Geschichte",
  palmares: "Rekorde",
  arbitres: "Schiedsrichter",
  live: "Live",
  faq: "FAQ",
  quiz: "Quiz",
  tableau: "Turnierbaum",
  simulateur: "Simulator",
  recherche: "Suche",
  newsletter: "Newsletter",
  contact: "Kontakt",
  profil: "Profil",
  // Sportwetten
  "paris-sportifs": "Sportwetten",
  corners: "Ecken",
  handicap: "Handicap",
  combines: "Kombiwetten",
  bankroll: "Bankroll",
  "value-bets": "Value bets",
  lexique: "Glossar",
  cashout: "Cashout",
  strategie: "Strategie",
  "dark-horses": "Geheimfavoriten",
  "ballon-or": "Ballon d'Or",
  meteo: "Wetter",
  // Prognoses
  Prognose: "Prognoses",
  vainqueur: "Sieger",
  btts: "BTTS",
  "over-under": "Over/Under",
  Torschützen2: "Torschützen",
  cartons: "Karten",
  "clean-sheet": "Zu-Null-Spiele",
  "scores-exacts": "Genaue Ergebnisse",
  finalistes: "Finalisten",
  "tirs-au-but": "Elfmeterschießen",
  "Prognose-match": "Spielprognose",
  "Prognose-groupe": "Gruppenprognose",
  // Voyage
  voyage: "Reise",
  "esta-visa-usa": "ESTA / Visum USA",
  "visa-mexique": "Visum Mexiko",
  "formalites-canada": "Einreise Kanada",
  "vols-budget": "Flüge & Budget",
  assurance: "Versicherung",
  "carte-sim": "SIM-Karte",
  valise: "Packliste",
  "decalage-horaire": "Zeitverschiebung",
  pourboires: "Trinkgeld",
  "supporter-francais": "Fan-Ratgeber",
  "wifi-Stadien": "WLAN Stadien",
  "alcool-Stadien": "Alkohol Stadien",
  hebergement: "Unterkunft",
  securite: "Sicherheit",
  // Cotes & bookmakers
  "comparateur-cotes": "Quotenvergleich",
  "comparateur-Spielers": "Spielervergleich",
  "comparateur-equipes": "Mannschaftsvergleich",
  bookmaker: "Wettanbieter",
  bonus: "Bonus",
  "meilleurs-bookmakers": "Beste Wettanbieter",
  "methodes-paiement": "Zahlungsmethoden",
  // Divers
  Tickets: "Tickets",
  "fan-zones": "Fanzonen",
  "fan-zone": "Fanzonen",
  "ou-regarder": "Wo schauen",
  "carte-Stadien": "Stadionkarte",
  "plan-du-site": "Sitemap",
  "jeu-responsable": "Verantwortungsvolles Spielen",
  "mentions-legales": "Impressum",
  "politique-de-confidentialite": "Datenschutz",
  "a-propos": "Über uns",
  methodologie: "Methodik",
  "equipe-editoriale": "Redaktion",
  Kader: "Kader",
  parier: "Wetten",
  "cote-champion": "Meisterquote",
  "cote-Torschütze": "Torschützenquote",
  "cote-carton-jaune": "Kartenquote",
  "score-exact": "Genaues Ergebnis",
  "compos-officielles": "Aufstellungen",
  "sur-quelle-chaine": "TV-Übertragung",
  possession: "Ballbesitz",
  "hors-jeu": "Abseits",
  tacles: "Zweikämpfe",
  "tirs-cadres": "Torschüsse",
  "passes-decisives": "Vorlagen",
  "guide-supporter": "Fan-Guide",
  transport: "Transport",
  confrontation: "Direktvergleich",
  h2h: "Direktvergleich H2H",
  "ecrans-geants": "Großbildschirme",
  "matchs-au-stade": "Spiele im Stadion",
  "scenarios-qualification": "Qualifikationsszenarien",
  "scenarios-qualification-equipe": "Mannschaftsszenarien",
  "statistiques-arbitre": "Schiedsrichter-Statistiken",
  spielplan: "Spielplan",
  Prognoses: "Prognoses",
  grille: "Tippspiel",
  leaderboard: "Leaderboard",
  glossaire: "Glossar",
  format: "Format",
  reglement: "Reglement",
  records: "Rekorde",
  maillots: "Trikots",
  mascotte: "Maskottchen",
  "pays-hotes": "Gastgeberländer",
  trophee: "Trophäe",
  "wall-of-fame": "Wall of Fame",
  "Rangliste-fifa": "Rangliste FIFA",
  confrontations: "Direktvergleiche",
  "confrontations-historiques": "Historische Direktvergleiche",
  barrages: "Playoffs",
  blessures: "Verletzungen",
  "selections-listes": "Kaderauswahl",
  "chants-supporters": "Fangesänge",
  finale: "Finale",
  "demi-finales": "Halbfinale",
  "quarts-de-finale": "Viertelfinale",
  "8emes-de-finale": "Achtelfinale",
  "16emes-de-finale": "Sechzehntelfinale",
  "meilleurs-troisiemes": "Beste Gruppendritte",
  budget: "Budget",
  vols: "Flüge",
  "regarder-cdm-au-travail": "WM auf der Arbeit",
  "simulateur-bracket": "Turnierbaum-Simulator",
  "tableau-final-virtuel": "Virtueller Turnierbaum",
  horaires: "Spielzeiten",
  resultats: "Ergebnisse",
};

/* ── Parent hub routes for dynamic segments ── */
const PARENT_HUBS: Record<string, { label: string; href: string }> = {
  equipe: { label: "Mannschaften", href: "/mannschaft" },
  gruppe: { label: "Gruppen", href: "/gruppen" },
  Spieler: { label: "Spieler", href: "/spieler-liste" },
  Torschütze: { label: "Torschützen", href: "/torschuetzen" },
  stade: { label: "Stadien", href: "/stadien" },
  ville: { label: "Städte", href: "/staedte" },
  match: { label: "Spiele", href: "/spiel/spielplan" },
  guide: { label: "Ratgeber", href: "/guides" },
  bookmaker: { label: "Wettanbieter", href: "/meilleurs-bookmakers" },
  bonus: { label: "Bonus", href: "/bonus" },
  actualites: { label: "Nachrichten", href: "/actualites" },
  Kader: { label: "Mannschaften", href: "/mannschaft" },
  parier: { label: "Sportwetten", href: "/sportwetten" },
  "cote-champion": { label: "Mannschaften", href: "/mannschaft" },
  "cote-Torschütze": { label: "Spielers", href: "/spieler-liste" },
  "cote-carton-jaune": { label: "Spielers", href: "/spieler-liste" },
  "score-exact": { label: "Spiele", href: "/spiel/spielplan" },
  "compos-officielles": { label: "Spiele", href: "/spiel/spielplan" },
  "sur-quelle-chaine": { label: "Spiele", href: "/spiel/spielplan" },
  corners: { label: "Spiele", href: "/spiel/spielplan" },
  possession: { label: "Spiele", href: "/spiel/spielplan" },
  "hors-jeu": { label: "Spiele", href: "/spiel/spielplan" },
  arbitre: { label: "Schiedsrichter", href: "/arbitres" },
  "tirs-cadres": { label: "Spieler", href: "/spieler-liste" },
  "passes-decisives": { label: "Spieler", href: "/spieler-liste" },
  tacles: { label: "Spieler", href: "/spieler-liste" },
  "fan-zone": { label: "Fanzonen", href: "/fan-zones" },
  hebergement: { label: "Unterkunft", href: "/voyage/hebergement" },
  meteo: { label: "Städte", href: "/staedte" },
  transport: { label: "Städte", href: "/staedte" },
  securite: { label: "Städte", href: "/staedte" },
  "guide-supporter": { label: "Städte", href: "/staedte" },
  confrontation: { label: "H2H", href: "/h2h" },
  "ecrans-geants": { label: "Fanzonen", href: "/fan-zones" },
  "matchs-au-stade": { label: "Stadien", href: "/stadien" },
  "Prognose-match": { label: "Prognoses", href: "/Prognose" },
  "Prognose-groupe": { label: "Prognoses", href: "/Prognose" },
  "scenarios-qualification": { label: "Gruppen", href: "/gruppen" },
  "scenarios-qualification-equipe": { label: "Mannschaften", href: "/mannschaft" },
  "statistiques-arbitre": { label: "Schiedsrichter", href: "/arbitres" },
  "acces-stade": { label: "Stadien", href: "/stadien" },
  "guide-ville": { label: "Städte", href: "/staedte" },
  spielplan: { label: "Spiele", href: "/spiel/spielplan" },
  Prognose: { label: "Prognoses", href: "/Prognose" },
  h2h: { label: "H2H", href: "/h2h" },
};

/* ── Pages that should NOT show breadcrumb ── */
const NO_BREADCRUMB = new Set(["/", "/admin"]);

function slugToLabel(slug: string): string {
  // Try known labels
  if (SEGMENT_LABELS[slug]) return SEGMENT_LABELS[slug];
  // Format slug: replace dashes, capitalize
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── Routes where the slug IS the entity and the prefix is an "aspect" ──
   For /Kader/france → Startseite / France / Kader (not Startseite / Mannschaften / Kader / France)
   The slug links to the entity page (/mannschaft/slug), the prefix becomes the current label */
const ENTITY_ASPECT_ROUTES: Record<string, { entityPrefix: string; entityHub: string; aspectLabel: string }> = {
  Kader: { entityPrefix: "equipe", entityHub: "/mannschaft", aspectLabel: "Kader" },
  parier: { entityPrefix: "equipe", entityHub: "/mannschaft", aspectLabel: "Wetten" },
  "cote-champion": { entityPrefix: "equipe", entityHub: "/mannschaft", aspectLabel: "Meisterquote" },
  "Prognose-match": { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Prognose" },
  "score-exact": { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Genaues Ergebnis" },
  "compos-officielles": { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Aufstellungen" },
  "sur-quelle-chaine": { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "TV-Übertragung" },
  arbitre: { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Schiedsrichter" },
  corners: { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Ecken" },
  possession: { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Ballbesitz" },
  "hors-jeu": { entityPrefix: "match", entityHub: "/spiel/spielplan", aspectLabel: "Abseits" },
  "tirs-cadres": { entityPrefix: "Spieler", entityHub: "/spieler-liste", aspectLabel: "Torschüsse" },
  "passes-decisives": { entityPrefix: "Spieler", entityHub: "/spieler-liste", aspectLabel: "Vorlagen" },
  tacles: { entityPrefix: "Spieler", entityHub: "/spieler-liste", aspectLabel: "Zweikämpfe" },
  "cote-carton-jaune": { entityPrefix: "Spieler", entityHub: "/spieler-liste", aspectLabel: "Kartenquote" },
  "cote-Torschütze": { entityPrefix: "Spieler", entityHub: "/spieler-liste", aspectLabel: "Torschützenquote" },
  Torschütze: { entityPrefix: "Spieler", entityHub: "/spieler-liste", aspectLabel: "Torschütze" },
  "Prognose-groupe": { entityPrefix: "groupe", entityHub: "/gruppen", aspectLabel: "Prognose" },
  "scenarios-qualification": { entityPrefix: "groupe", entityHub: "/gruppen", aspectLabel: "Szenarien" },
  "fan-zone": { entityPrefix: "ville", entityHub: "/staedte", aspectLabel: "Fanzone" },
  "guide-supporter": { entityPrefix: "ville", entityHub: "/staedte", aspectLabel: "Fan-Guide" },
  transport: { entityPrefix: "ville", entityHub: "/staedte", aspectLabel: "Transport" },
  meteo: { entityPrefix: "ville", entityHub: "/staedte", aspectLabel: "Wetter" },
  "ecrans-geants": { entityPrefix: "ville", entityHub: "/staedte", aspectLabel: "Großbildschirme" },
  "statistiques-arbitre": { entityPrefix: "arbitre", entityHub: "/arbitres", aspectLabel: "Statistiken" },
  "matchs-au-stade": { entityPrefix: "stade", entityHub: "/stadien", aspectLabel: "Spiele" },
};

export function AutoBreadcrumb() {
  const pathname = usePathname();

  if (NO_BREADCRUMB.has(pathname)) return null;

  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  // Build breadcrumb items
  const items: { label: string; href?: string }[] = [
    { label: "Startseite", href: "/" },
  ];

  const firstSeg = segments[0]!;
  const slug = segments[1];

  // Pattern 1: Entity-aspect routes (/Kader/france → Startseite / France / Kader)
  if (segments.length === 2 && slug && ENTITY_ASPECT_ROUTES[firstSeg]) {
    const aspect = ENTITY_ASPECT_ROUTES[firstSeg];
    items.push({ label: slugToLabel(slug), href: `/${aspect.entityPrefix}/${slug}` });
    items.push({ label: aspect.aspectLabel });
  }
  // Pattern 2: Nested silo routes (/sportwetten/corners → Startseite / Sportwetten / Ecken)
  // Pattern 3: Simple dynamic routes (/mannschaft/france → Startseite / Mannschaften / France)
  else if (segments.length >= 2 && PARENT_HUBS[firstSeg]) {
    const hub = PARENT_HUBS[firstSeg];
    items.push({ label: hub.label, href: hub.href });
    for (let i = 1; i < segments.length; i++) {
      const seg = segments[i]!;
      const isLast = i === segments.length - 1;
      if (isLast) {
        items.push({ label: slugToLabel(seg) });
      } else {
        items.push({ label: slugToLabel(seg), href: "/" + segments.slice(0, i + 1).join("/") });
      }
    }
  }
  // Pattern 4: Everything else — simple path segments
  else {
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i]!;
      const isLast = i === segments.length - 1;
      if (isLast) {
        items.push({ label: slugToLabel(seg) });
      } else {
        items.push({ label: slugToLabel(seg), href: "/" + segments.slice(0, i + 1).join("/") });
      }
    }
  }

  /* ── BreadcrumbList JSON-LD (Schema.org) ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `https://www.wm2026guide.de${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="bg-white border-b border-gray-200" aria-label="Brotkrümelnavigation">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap min-w-0">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={index} className="flex items-center gap-2">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-gray-900 font-medium" : ""}>{item.label}</span>
                  )}
                  {!isLast && <span>/</span>}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
