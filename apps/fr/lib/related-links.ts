import type { RelatedItem } from '../app/components/RelatedContent';
import { matches, matchesBySlug } from "@repo/data/matches";
import {
  needsKnockoutTeamResolution,
  resolveMatchTeams,
} from "./knockout-match-teams";

/**
 * Returns up to 6 contextual related links based on current pathname.
 * Pure logic — no API calls, no async, safe for client & server.
 */
export function getRelatedLinks(pathname: string): RelatedItem[] {
  const p = pathname.replace(/\/$/, '') || '/';

  // Static / legal pages — no related content
  const noRelated = ['/faq', '/mentions-legales', '/politique-de-confidentialite', '/contact', '/a-propos', '/plan-du-site', '/equipe-editoriale', '/methodologie', '/jeu-responsable', '/newsletter', '/profil', '/admin', '/recherche'];
  if (noRelated.includes(p) || p.startsWith('/plan-du-site/')) return [];

  // ── /equipe/[slug] ──
  const equipeMatch = p.match(/^\/equipe\/([^/]+)$/);
  if (equipeMatch) {
    const slug = equipeMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/pronostic/${slug}`, emoji: '🔮', title: `Pronostic ${name}`, description: `Nos pronostics pour ${name}` },
      { href: `/effectif/${slug}`, emoji: '👥', title: `Effectif ${name}`, description: `Les joueurs sélectionnés` },
      { href: `/parier/${slug}`, emoji: '🎰', title: `Parier sur ${name}`, description: `Meilleurs paris disponibles` },
      { href: `/cote-champion/${slug}`, emoji: '🏆', title: `Cote champion ${name}`, description: `Cotes pour remporter la CDM` },
      { href: `/pronostic/vainqueur`, emoji: '🥇', title: `Pronostic vainqueur`, description: `Qui va gagner la CDM 2026 ?` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur de cotes`, description: `Comparez les cotes des bookmakers` },
    ];
  }

  // ── /match/[slug] ──
  const matchMatch = p.match(/^\/match\/([^/]+)$/);
  if (matchMatch && matchMatch[1] !== 'aujourdhui' && matchMatch[1] !== 'calendrier') {
    const slug = matchMatch[1]!;
    const match = matchesBySlug[slug];
    const hasRuntimeKnockoutTeams = match
      ? needsKnockoutTeamResolution(match)
      : false;
    const resolvedTeams = match && !hasRuntimeKnockoutTeams
      ? resolveMatchTeams(match, matches)
      : null;
    const teamLinks = hasRuntimeKnockoutTeams
      ? []
      : resolvedTeams
      ? [
          ...(resolvedTeams.home
            ? [{ href: `/equipe/${resolvedTeams.home.slug}`, emoji: '🏳️', title: resolvedTeams.home.name, description: `Fiche équipe complète` }]
            : []),
          ...(resolvedTeams.away
            ? [{ href: `/equipe/${resolvedTeams.away.slug}`, emoji: '🏴', title: resolvedTeams.away.name, description: `Fiche équipe complète` }]
            : []),
        ]
      : (() => {
          const parts = slug.split('-vs-');
          const team1 = parts[0] || slug;
          const team2 = parts[1] || '';
          return [
            ...(team1 ? [{ href: `/equipe/${team1}`, emoji: '🏳️', title: slugToName(team1), description: `Fiche équipe complète` }] : []),
            ...(team2 ? [{ href: `/equipe/${team2}`, emoji: '🏴', title: slugToName(team2), description: `Fiche équipe complète` }] : []),
          ];
        })();
    return [
      { href: `/pronostic-match/${slug}`, emoji: '🔮', title: `Pronostic du match`, description: `Notre analyse et pronostic` },
      { href: `/score-exact/${slug}`, emoji: '🎯', title: `Score exact`, description: `Pronostic de score exact` },
      { href: `/compos-officielles/${slug}`, emoji: '📋', title: `Compos probables`, description: `Les compositions attendues` },
      { href: `/sur-quelle-chaine/${slug}`, emoji: '📺', title: `Chaîne TV`, description: `Où regarder le match` },
      ...teamLinks,
    ].slice(0, 6);
  }

  // ── /stade/[slug] ──
  const stadeMatch = p.match(/^\/stade\/([^/]+)$/);
  if (stadeMatch) {
    const slug = stadeMatch[1]!;
    return [
      { href: `/matchs-au-stade/${slug}`, emoji: '⚽', title: `Matchs au stade`, description: `Tous les matchs prévus ici` },
      { href: `/acces-stade/${slug}`, emoji: '🚗', title: `Accès au stade`, description: `Comment s'y rendre` },
      { href: `/ecrans-geants/${slug}`, emoji: '📺', title: `Écrans géants`, description: `Fan zones à proximité` },
      { href: `/stades`, emoji: '🏟️', title: `Tous les stades`, description: `Les 16 stades de la CDM` },
      { href: `/billets`, emoji: '🎫', title: `Billets`, description: `Acheter des billets` },
      { href: `/match/calendrier`, emoji: '📅', title: `Calendrier`, description: `Calendrier complet des matchs` },
    ];
  }

  // ── /ville/[slug] ──
  const villeMatch = p.match(/^\/ville\/([^/]+)$/);
  if (villeMatch) {
    const slug = villeMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/guide-ville/${slug}`, emoji: '🗺️', title: `Guide ${name}`, description: `Guide complet du supporter` },
      { href: `/fan-zone/${slug}`, emoji: '🎉', title: `Fan zone ${name}`, description: `Où vibrer ensemble` },
      { href: `/hebergement/${slug}`, emoji: '🏨', title: `Hébergement`, description: `Où dormir à ${name}` },
      { href: `/meteo/${slug}`, emoji: '☀️', title: `Météo ${name}`, description: `Prévisions pendant la CDM` },
      { href: `/transport/${slug}`, emoji: '🚇', title: `Transport`, description: `Se déplacer à ${name}` },
      { href: `/villes`, emoji: '🌆', title: `Toutes les villes`, description: `Les 16 villes hôtes` },
    ];
  }

  // ── /joueur/[slug] ──
  const joueurMatch = p.match(/^\/joueur\/([^/]+)$/);
  if (joueurMatch) {
    const slug = joueurMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/cote-buteur/${slug}`, emoji: '⚽', title: `Cote buteur ${name}`, description: `Cotes pour marquer` },
      { href: `/cote-carton-jaune/${slug}`, emoji: '🟨', title: `Cote carton ${name}`, description: `Cotes carton jaune` },
      { href: `/tirs-cadres/${slug}`, emoji: '🎯', title: `Tirs cadrés`, description: `Stats de tirs cadrés` },
      { href: `/passes-decisives/${slug}`, emoji: '🅰️', title: `Passes décisives`, description: `Stats de passes` },
      { href: `/buteurs`, emoji: '👟', title: `Meilleurs buteurs`, description: `Classement des buteurs` },
      { href: `/joueurs`, emoji: '👥', title: `Tous les joueurs`, description: `Annuaire des joueurs` },
    ];
  }

  // ── /groupe/[lettre] ──
  const groupeMatch = p.match(/^\/groupe\/([a-lA-L])$/);
  if (groupeMatch) {
    const lettre = groupeMatch[1]!.toUpperCase();
    const slug = groupeMatch[1]!.toLowerCase();
    return [
      { href: `/pronostic-groupe/${slug}`, emoji: '🔮', title: `Pronostic Groupe ${lettre}`, description: `Qui se qualifie ?` },
      { href: `/scenarios-qualification/${slug}`, emoji: '🧮', title: `Scénarios qualification`, description: `Toutes les possibilités` },
      { href: `/groupes`, emoji: '📊', title: `Tous les groupes`, description: `Vue d'ensemble des poules` },
      { href: `/match/calendrier`, emoji: '📅', title: `Calendrier`, description: `Calendrier complet` },
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner la CDM ?` },
      { href: `/simulateur`, emoji: '🎮', title: `Simulateur`, description: `Simulez les résultats` },
    ];
  }

  // ── /pronostic/vainqueur ──
  if (p === '/pronostic/vainqueur') {
    return [
      { href: `/pronostic/france`, emoji: '🇫🇷', title: `Pronostic France`, description: `Nos pronostics pour la France` },
      { href: `/pronostic/bresil`, emoji: '🇧🇷', title: `Pronostic Brésil`, description: `Nos pronostics pour le Brésil` },
      { href: `/pronostic/argentine`, emoji: '🇦🇷', title: `Pronostic Argentine`, description: `Nos pronostics pour l'Argentine` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/simulateur`, emoji: '🎮', title: `Simulateur`, description: `Simulez le tournoi` },
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide des paris CDM` },
    ];
  }

  // ── /pronostic/[slug] ──
  const pronoMatch = p.match(/^\/pronostic\/([^/]+)$/);
  if (pronoMatch) {
    const slug = pronoMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/equipe/${slug}`, emoji: '🏳️', title: `Équipe ${name}`, description: `Fiche complète` },
      { href: `/effectif/${slug}`, emoji: '👥', title: `Effectif ${name}`, description: `Joueurs sélectionnés` },
      { href: `/parier/${slug}`, emoji: '🎰', title: `Parier sur ${name}`, description: `Meilleurs paris` },
      { href: `/cote-champion/${slug}`, emoji: '🏆', title: `Cote champion`, description: `Cotes pour le titre` },
      { href: `/pronostic/vainqueur`, emoji: '🥇', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
    ];
  }

  // ── /pronostic/btts ──
  if (p === '/pronostic/btts') {
    return [
      { href: `/pronostic/over-under`, emoji: '📈', title: `Over/Under`, description: `Pronostics plus/moins de buts` },
      { href: `/pronostic/cartons`, emoji: '🟨', title: `Pronostic cartons`, description: `Cartons jaunes & rouges` },
      { href: `/paris-sportifs/corners`, emoji: '🚩', title: `Paris corners`, description: `Pronostics corners` },
      { href: `/pronostic/clean-sheet`, emoji: '🧤', title: `Clean sheet`, description: `Pronostics clean sheet` },
      { href: `/pronostic/scores-exacts`, emoji: '🎯', title: `Scores exacts`, description: `Pronostics de scores` },
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide complet des paris` },
    ];
  }

  // ── /pronostic/over-under ──
  if (p === '/pronostic/over-under') {
    return [
      { href: `/pronostic/btts`, emoji: '⚽', title: `BTTS`, description: `Les deux équipes marquent` },
      { href: `/pronostic/cartons`, emoji: '🟨', title: `Pronostic cartons`, description: `Cartons jaunes & rouges` },
      { href: `/pronostic/clean-sheet`, emoji: '🧤', title: `Clean sheet`, description: `Pronostics clean sheet` },
      { href: `/paris-sportifs/combines`, emoji: '🔗', title: `Paris combinés`, description: `Combinez vos pronostics` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/paris-sportifs/guide`, emoji: '📖', title: `Guide paris`, description: `Tout savoir sur les paris` },
    ];
  }

  // ── Other /pronostic-* pages ──
  if (p.startsWith('/pronostic-') || p === '/pronostic') {
    const pronoPages = [
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
      { href: `/pronostic/btts`, emoji: '⚽', title: `BTTS`, description: `Les deux équipes marquent` },
      { href: `/pronostic/over-under`, emoji: '📈', title: `Over/Under`, description: `Plus/moins de buts` },
      { href: `/pronostic/buteurs`, emoji: '👟', title: `Pronostic buteurs`, description: `Meilleurs buteurs` },
      { href: `/pronostic/cartons`, emoji: '🟨', title: `Pronostic cartons`, description: `Cartons jaunes & rouges` },
      { href: `/pronostic/scores-exacts`, emoji: '🎯', title: `Scores exacts`, description: `Pronostics de scores` },
      { href: `/pronostic/clean-sheet`, emoji: '🧤', title: `Clean sheet`, description: `Pronostics clean sheet` },
      { href: `/pronostic/finalistes`, emoji: '🏅', title: `Pronostic finalistes`, description: `Qui sera en finale ?` },
      { href: `/pronostic/tirs-au-but`, emoji: '🥅', title: `Tirs au but`, description: `Pronostics penalties` },
    ];
    return pronoPages.filter(l => l.href !== p).slice(0, 6);
  }

  // ── /paris-sportifs ──
  if (p === '/paris-sportifs') {
    return [
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/pronostic/btts`, emoji: '⚽', title: `BTTS`, description: `Les deux marquent` },
      { href: `/pronostic/over-under`, emoji: '📈', title: `Over/Under`, description: `Plus/moins de buts` },
      { href: `/paris-sportifs/handicap`, emoji: '⚖️', title: `Paris handicap`, description: `Guide du handicap` },
      { href: `/paris-sportifs/combines`, emoji: '🔗', title: `Paris combinés`, description: `Combinez vos paris` },
      { href: `/paris-sportifs/live`, emoji: '🔴', title: `Paris live`, description: `Parier en direct` },
    ];
  }

  // ── Other /paris-* pages ──
  if (p.startsWith('/paris-')) {
    const parisPages = [
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide complet` },
      { href: `/paris-sportifs/combines`, emoji: '🔗', title: `Paris combinés`, description: `Combinez vos paris` },
      { href: `/paris-sportifs/handicap`, emoji: '⚖️', title: `Paris handicap`, description: `Guide du handicap` },
      { href: `/paris-sportifs/live`, emoji: '🔴', title: `Paris live`, description: `Parier en direct` },
      { href: `/paris-sportifs/corners`, emoji: '🚩', title: `Paris corners`, description: `Pronostics corners` },
      { href: `/paris-sportifs/mi-temps`, emoji: '⏱️', title: `Paris mi-temps`, description: `Paris à la mi-temps` },
    ];
    return parisPages.filter(l => l.href !== p).slice(0, 6);
  }

  // ── /pronostic-match/[slug] ──
  const pronoMatchSlug = p.match(/^\/pronostic-match\/([^/]+)$/);
  if (pronoMatchSlug) {
    const slug = pronoMatchSlug[1]!;
    return [
      { href: `/match/${slug}`, emoji: '⚽', title: `Fiche match`, description: `Infos complètes du match` },
      { href: `/score-exact/${slug}`, emoji: '🎯', title: `Score exact`, description: `Pronostic de score` },
      { href: `/compos-officielles/${slug}`, emoji: '📋', title: `Compos`, description: `Compositions probables` },
      { href: `/sur-quelle-chaine/${slug}`, emoji: '📺', title: `Chaîne TV`, description: `Où regarder` },
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui gagne la CDM ?` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
    ];
  }

  // ── /bookmaker/[slug] ──
  const bookMatch = p.match(/^\/bookmaker\/([^/]+)$/);
  if (bookMatch) {
    return [
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/bonus`, emoji: '🎁', title: `Bonus paris`, description: `Tous les bonus disponibles` },
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide complet des paris` },
      { href: `/meilleurs-bookmakers`, emoji: '🏅', title: `Meilleurs bookmakers`, description: `Notre classement` },
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
      { href: `/paris-sportifs/guide`, emoji: '📖', title: `Guide paris`, description: `Tout savoir sur les paris` },
    ];
  }

  // ── /actualites/[slug] ──
  const actuMatch = p.match(/^\/actualites\/([^/]+)$/);
  if (actuMatch) {
    return [
      { href: `/actualites`, emoji: '📰', title: `Toutes les actualités`, description: `Dernières news CDM 2026` },
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
      { href: `/match/calendrier`, emoji: '📅', title: `Calendrier`, description: `Calendrier des matchs` },
      { href: `/equipes`, emoji: '🏳️', title: `Les équipes`, description: `Les 48 équipes qualifiées` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/simulateur`, emoji: '🎮', title: `Simulateur`, description: `Simulez le tournoi` },
    ];
  }

  // ── /guide/* and travel pages ──
  if (p.startsWith('/guide') || p.startsWith('/fan-zone') || p.startsWith('/hebergement') || p.startsWith('/transport') || p.startsWith('/meteo') || p.startsWith('/guide-ville') || p.startsWith('/guide-supporter') || p.startsWith('/ecrans-geants') || p.startsWith('/acces-stade') || p.startsWith('/securite')) {
    const guidePages = [
      { href: `/billets`, emoji: '🎫', title: `Billets`, description: `Acheter des billets` },
      { href: `/villes`, emoji: '🌆', title: `Villes hôtes`, description: `Les 16 villes` },
      { href: `/stades`, emoji: '🏟️', title: `Stades`, description: `Les 16 stades` },
      { href: `/fan-zones`, emoji: '🎉', title: `Fan zones`, description: `Où supporter ensemble` },
      { href: `/hebergement`, emoji: '🏨', title: `Hébergement`, description: `Où dormir` },
      { href: `/vols`, emoji: '✈️', title: `Vols`, description: `Trouver un vol` },
      { href: `/budget`, emoji: '💰', title: `Budget`, description: `Combien ça coûte ?` },
      { href: `/voyage/esta-visa-usa`, emoji: '🛂', title: `ESTA USA`, description: `Formalités d'entrée` },
      { href: `/voyage/decalage-horaire`, emoji: '🕐', title: `Décalage horaire`, description: `Horaires des matchs` },
      { href: `/guides`, emoji: '📚', title: `Tous les guides`, description: `Guides pratiques` },
    ];
    return guidePages.filter(l => l.href !== p && !p.startsWith(l.href + '/')).slice(0, 6);
  }

  // ── /effectif/[slug] ──
  const effectifMatch = p.match(/^\/effectif\/([^/]+)$/);
  if (effectifMatch) {
    const slug = effectifMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/parier/${slug}`, emoji: '🎰', title: `Parier sur ${name}`, description: `Meilleurs paris` },
      { href: `/cote-champion/${slug}`, emoji: '🏆', title: `Cote champion`, description: `Cotes pour le titre` },
      { href: `/pronostic/${slug}`, emoji: '🔮', title: `Pronostic ${name}`, description: `Nos pronostics` },
      { href: `/equipe/${slug}`, emoji: '🏳️', title: `Équipe ${name}`, description: `Fiche complète` },
      { href: `/pronostic/vainqueur`, emoji: '🥇', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
      { href: `/joueurs`, emoji: '👥', title: `Tous les joueurs`, description: `Annuaire des joueurs` },
    ];
  }

  // ── /cote-champion/[slug], /cote-buteur/[slug], /parier/[slug] ──
  const coteMatch = p.match(/^\/(cote-champion|cote-buteur|cote-carton-jaune|parier)\/([^/]+)$/);
  if (coteMatch) {
    const slug = coteMatch[2]!;
    const name = slugToName(slug);
    return [
      { href: `/equipe/${slug}`, emoji: '🏳️', title: `Équipe ${name}`, description: `Fiche complète` },
      { href: `/pronostic/${slug}`, emoji: '🔮', title: `Pronostic ${name}`, description: `Nos pronostics` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide complet` },
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
      { href: `/bonus`, emoji: '🎁', title: `Bonus paris`, description: `Offres des bookmakers` },
    ];
  }

  // ── /score-exact/[slug], /compos-officielles/[slug], /sur-quelle-chaine/[slug], /corners/[slug] ──
  const matchDetailMatch = p.match(/^\/(score-exact|compos-officielles|sur-quelle-chaine|corners|confrontation|h2h)\/([^/]+)$/);
  if (matchDetailMatch) {
    const slug = matchDetailMatch[2]!;
    return [
      { href: `/match/${slug}`, emoji: '⚽', title: `Fiche match`, description: `Infos complètes` },
      { href: `/pronostic-match/${slug}`, emoji: '🔮', title: `Pronostic`, description: `Notre analyse` },
      { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui gagne la CDM ?` },
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide des paris` },
      { href: `/match/calendrier`, emoji: '📅', title: `Calendrier`, description: `Tous les matchs` },
    ];
  }

  // ── Homepage ──
  if (p === '/' || p === '') {
    return [
      { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner la CDM ?` },
      { href: `/match/calendrier`, emoji: '📅', title: `Calendrier`, description: `Tous les matchs` },
      { href: `/groupes`, emoji: '📊', title: `Les groupes`, description: `Phase de poules` },
      { href: `/equipes`, emoji: '🏳️', title: `Les équipes`, description: `48 équipes qualifiées` },
      { href: `/simulateur`, emoji: '🎮', title: `Simulateur`, description: `Simulez le tournoi` },
      { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide des paris CDM` },
    ];
  }

  // ── Default fallback for misc pages ──
  // Listing pages, quiz, stats, etc.
  const defaults: RelatedItem[] = [
    { href: `/pronostic/vainqueur`, emoji: '🏆', title: `Pronostic vainqueur`, description: `Qui va gagner ?` },
    { href: `/match/calendrier`, emoji: '📅', title: `Calendrier`, description: `Tous les matchs` },
    { href: `/comparateur-cotes`, emoji: '📊', title: `Comparateur cotes`, description: `Comparez les cotes` },
    { href: `/equipes`, emoji: '🏳️', title: `Les équipes`, description: `48 équipes qualifiées` },
    { href: `/simulateur`, emoji: '🎮', title: `Simulateur`, description: `Simulez le tournoi` },
    { href: `/paris-sportifs`, emoji: '🎰', title: `Paris sportifs`, description: `Guide des paris` },
  ];
  return defaults.filter(l => l.href !== p).slice(0, 6);
}

/** Convert slug to display name: "etats-unis" → "États-Unis" */
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
