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
  equipes: "Équipes",
  equipe: "Équipes",
  groupes: "Groupes",
  groupe: "Groupes",
  joueurs: "Joueurs",
  joueur: "Joueurs",
  buteurs: "Buteurs",
  buteur: "Buteurs",
  stades: "Stades",
  stade: "Stades",
  villes: "Villes",
  ville: "Villes",
  match: "Matchs",
  guides: "Guides",
  guide: "Guides",
  actualites: "Actualités",
  statistiques: "Statistiques",
  histoire: "Histoire",
  palmares: "Palmarès",
  arbitres: "Arbitres",
  live: "Live",
  faq: "FAQ",
  quiz: "Quiz",
  tableau: "Tableau",
  simulateur: "Simulateur",
  recherche: "Recherche",
  newsletter: "Newsletter",
  contact: "Contact",
  profil: "Profil",
  // Paris sportifs
  "paris-sportifs": "Paris sportifs",
  corners: "Corners",
  handicap: "Handicap",
  combines: "Combinés",
  bankroll: "Bankroll",
  "value-bets": "Value bets",
  lexique: "Lexique",
  cashout: "Cashout",
  strategie: "Stratégie",
  "dark-horses": "Dark horses",
  "ballon-or": "Ballon d'or",
  meteo: "Météo",
  // Pronostics
  pronostic: "Pronostics",
  vainqueur: "Vainqueur",
  btts: "BTTS",
  "over-under": "Over/Under",
  buteurs2: "Buteurs",
  cartons: "Cartons",
  "clean-sheet": "Clean sheet",
  "scores-exacts": "Scores exacts",
  finalistes: "Finalistes",
  "tirs-au-but": "Tirs au but",
  "pronostic-match": "Pronostic match",
  "pronostic-groupe": "Pronostic groupe",
  // Voyage
  voyage: "Voyage",
  "esta-visa-usa": "ESTA / Visa USA",
  "visa-mexique": "Visa Mexique",
  "formalites-canada": "Formalités Canada",
  "vols-budget": "Vols & budget",
  assurance: "Assurance",
  "carte-sim": "Carte SIM",
  valise: "Valise",
  "decalage-horaire": "Décalage horaire",
  pourboires: "Pourboires",
  "supporter-francais": "Supporter français",
  "wifi-stades": "WiFi stades",
  "alcool-stades": "Alcool stades",
  hebergement: "Hébergement",
  securite: "Sécurité",
  // Cotes & bookmakers
  "comparateur-cotes": "Comparateur cotes",
  "comparateur-joueurs": "Comparateur joueurs",
  "comparateur-equipes": "Comparateur équipes",
  bookmaker: "Bookmakers",
  bonus: "Bonus",
  "meilleurs-bookmakers": "Meilleurs bookmakers",
  "methodes-paiement": "Méthodes de paiement",
  // Divers
  billets: "Billets",
  "fan-zones": "Fan zones",
  "fan-zone": "Fan zones",
  "ou-regarder": "Où regarder",
  "carte-stades": "Carte des stades",
  "plan-du-site": "Plan du site",
  "jeu-responsable": "Jeu responsable",
  "mentions-legales": "Mentions légales",
  "politique-de-confidentialite": "Confidentialité",
  "a-propos": "À propos",
  methodologie: "Méthodologie",
  "equipe-editoriale": "Équipe éditoriale",
  effectif: "Effectif",
  parier: "Parier",
  "cote-champion": "Cote champion",
  "cote-buteur": "Cote buteur",
  "cote-carton-jaune": "Cote carton",
  "score-exact": "Score exact",
  "compos-officielles": "Compos officielles",
  "sur-quelle-chaine": "TV / Chaîne",
  possession: "Possession",
  "hors-jeu": "Hors-jeu",
  tacles: "Tacles",
  "tirs-cadres": "Tirs cadrés",
  "passes-decisives": "Passes décisives",
  "guide-supporter": "Guide supporter",
  transport: "Transport",
  confrontation: "Confrontation",
  h2h: "Confrontations H2H",
  "ecrans-geants": "Écrans géants",
  "matchs-au-stade": "Matchs au stade",
  "scenarios-qualification": "Scénarios qualification",
  "scenarios-qualification-equipe": "Scénarios équipe",
  "statistiques-arbitre": "Statistiques arbitre",
  calendrier: "Calendrier",
  pronostics: "Pronostics",
  grille: "Grille",
  leaderboard: "Leaderboard",
  glossaire: "Glossaire",
  format: "Format",
  reglement: "Règlement",
  records: "Records",
  maillots: "Maillots",
  mascotte: "Mascotte",
  "pays-hotes": "Pays hôtes",
  trophee: "Trophée",
  "wall-of-fame": "Wall of Fame",
  "classement-fifa": "Classement FIFA",
  confrontations: "Confrontations",
  "confrontations-historiques": "Confrontations historiques",
  barrages: "Barrages",
  blessures: "Blessures",
  "selections-listes": "Sélections",
  "chants-supporters": "Chants supporters",
  finale: "Finale",
  "demi-finales": "Demi-finales",
  "quarts-de-finale": "Quarts de finale",
  "8emes-de-finale": "8èmes de finale",
  "16emes-de-finale": "16èmes de finale",
  "meilleurs-troisiemes": "Meilleurs 3èmes",
  budget: "Budget",
  vols: "Vols",
  "regarder-cdm-au-travail": "Regarder au travail",
  "simulateur-bracket": "Simulateur bracket",
  "tableau-final-virtuel": "Tableau final",
};

/* ── Parent hub routes for dynamic segments ── */
const PARENT_HUBS: Record<string, { label: string; href: string }> = {
  equipe: { label: "Équipes", href: "/equipe" },
  groupe: { label: "Groupes", href: "/groupes" },
  joueur: { label: "Joueurs", href: "/joueurs" },
  buteur: { label: "Buteurs", href: "/buteurs" },
  stade: { label: "Stades", href: "/stades" },
  ville: { label: "Villes", href: "/villes" },
  match: { label: "Matchs", href: "/match/calendrier" },
  guide: { label: "Guides", href: "/guides" },
  bookmaker: { label: "Bookmakers", href: "/meilleurs-bookmakers" },
  bonus: { label: "Bonus", href: "/bonus" },
  actualites: { label: "Actualités", href: "/actualites" },
  effectif: { label: "Équipes", href: "/equipe" },
  parier: { label: "Paris sportifs", href: "/paris-sportifs" },
  "cote-champion": { label: "Équipes", href: "/equipe" },
  "cote-buteur": { label: "Joueurs", href: "/joueurs" },
  "cote-carton-jaune": { label: "Joueurs", href: "/joueurs" },
  "score-exact": { label: "Matchs", href: "/match/calendrier" },
  "compos-officielles": { label: "Matchs", href: "/match/calendrier" },
  "sur-quelle-chaine": { label: "Matchs", href: "/match/calendrier" },
  corners: { label: "Matchs", href: "/match/calendrier" },
  possession: { label: "Matchs", href: "/match/calendrier" },
  "hors-jeu": { label: "Matchs", href: "/match/calendrier" },
  arbitre: { label: "Arbitres", href: "/arbitres" },
  "tirs-cadres": { label: "Joueurs", href: "/joueurs" },
  "passes-decisives": { label: "Joueurs", href: "/joueurs" },
  tacles: { label: "Joueurs", href: "/joueurs" },
  "fan-zone": { label: "Fan zones", href: "/fan-zones" },
  hebergement: { label: "Hébergement", href: "/voyage/hebergement" },
  meteo: { label: "Villes", href: "/villes" },
  transport: { label: "Villes", href: "/villes" },
  securite: { label: "Villes", href: "/villes" },
  "guide-supporter": { label: "Villes", href: "/villes" },
  confrontation: { label: "H2H", href: "/h2h" },
  "ecrans-geants": { label: "Fan zones", href: "/fan-zones" },
  "matchs-au-stade": { label: "Stades", href: "/stades" },
  "pronostic-match": { label: "Pronostics", href: "/pronostic" },
  "pronostic-groupe": { label: "Pronostics", href: "/pronostic" },
  "scenarios-qualification": { label: "Groupes", href: "/groupes" },
  "scenarios-qualification-equipe": { label: "Équipes", href: "/equipe" },
  "statistiques-arbitre": { label: "Arbitres", href: "/arbitres" },
  "acces-stade": { label: "Stades", href: "/stades" },
  "guide-ville": { label: "Villes", href: "/villes" },
  calendrier: { label: "Matchs", href: "/match/calendrier" },
  pronostic: { label: "Pronostics", href: "/pronostic" },
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
   For /effectif/france → Accueil / France / Effectif (not Accueil / Équipes / Effectif / France)
   The slug links to the entity page (/equipe/slug), the prefix becomes the current label */
const ENTITY_ASPECT_ROUTES: Record<string, { entityPrefix: string; entityHub: string; aspectLabel: string }> = {
  effectif: { entityPrefix: "equipe", entityHub: "/equipe", aspectLabel: "Effectif" },
  parier: { entityPrefix: "equipe", entityHub: "/equipe", aspectLabel: "Parier" },
  "cote-champion": { entityPrefix: "equipe", entityHub: "/equipe", aspectLabel: "Cote champion" },
  "pronostic-match": { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Pronostic" },
  "score-exact": { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Score exact" },
  "compos-officielles": { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Compos officielles" },
  "sur-quelle-chaine": { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "TV / Chaîne" },
  arbitre: { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Arbitre" },
  corners: { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Corners" },
  possession: { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Possession" },
  "hors-jeu": { entityPrefix: "match", entityHub: "/match/calendrier", aspectLabel: "Hors-jeu" },
  "tirs-cadres": { entityPrefix: "joueur", entityHub: "/joueurs", aspectLabel: "Tirs cadrés" },
  "passes-decisives": { entityPrefix: "joueur", entityHub: "/joueurs", aspectLabel: "Passes décisives" },
  tacles: { entityPrefix: "joueur", entityHub: "/joueurs", aspectLabel: "Tacles" },
  "cote-carton-jaune": { entityPrefix: "joueur", entityHub: "/joueurs", aspectLabel: "Cote carton" },
  "cote-buteur": { entityPrefix: "joueur", entityHub: "/joueurs", aspectLabel: "Cote buteur" },
  buteur: { entityPrefix: "joueur", entityHub: "/joueurs", aspectLabel: "Buteur" },
  "pronostic-groupe": { entityPrefix: "groupe", entityHub: "/groupes", aspectLabel: "Pronostic" },
  "scenarios-qualification": { entityPrefix: "groupe", entityHub: "/groupes", aspectLabel: "Scénarios" },
  "fan-zone": { entityPrefix: "ville", entityHub: "/villes", aspectLabel: "Fan zone" },
  "guide-supporter": { entityPrefix: "ville", entityHub: "/villes", aspectLabel: "Guide supporter" },
  transport: { entityPrefix: "ville", entityHub: "/villes", aspectLabel: "Transport" },
  meteo: { entityPrefix: "ville", entityHub: "/villes", aspectLabel: "Météo" },
  "ecrans-geants": { entityPrefix: "ville", entityHub: "/villes", aspectLabel: "Écrans géants" },
  "statistiques-arbitre": { entityPrefix: "arbitre", entityHub: "/arbitres", aspectLabel: "Statistiques" },
  "matchs-au-stade": { entityPrefix: "stade", entityHub: "/stades", aspectLabel: "Matchs" },
};

export function AutoBreadcrumb() {
  const pathname = usePathname();

  if (NO_BREADCRUMB.has(pathname)) return null;

  const segments = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  if (segments.length === 0) return null;

  // Build breadcrumb items
  const items: { label: string; href?: string }[] = [
    { label: "Accueil", href: "/" },
  ];

  const firstSeg = segments[0]!;
  const slug = segments[1];

  // Pattern 1: Entity-aspect routes (/effectif/france → Accueil / France / Effectif)
  if (segments.length === 2 && slug && ENTITY_ASPECT_ROUTES[firstSeg]) {
    const aspect = ENTITY_ASPECT_ROUTES[firstSeg];
    items.push({ label: slugToLabel(slug), href: `/${aspect.entityPrefix}/${slug}` });
    items.push({ label: aspect.aspectLabel });
  }
  // Pattern 2: Nested silo routes (/paris-sportifs/corners → Accueil / Paris sportifs / Corners)
  // Pattern 3: Simple dynamic routes (/equipe/france → Accueil / Équipes / France)
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
      ...(item.href ? { item: `https://www.cdm2026.fr${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="bg-white border-b border-gray-200" aria-label="Fil d'Ariane">
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
