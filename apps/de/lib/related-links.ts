import type { RelatedItem } from '../app/components/RelatedContent';

/**
 * Returns up to 6 contextual related links based on current pathname.
 * Pure logic — no API calls, no async, safe for client & server.
 */
export function getRelatedLinks(pathname: string): RelatedItem[] {
  const p = pathname.replace(/\/$/, '') || '/';

  // Static / legal pages — no related content
  const noRelated = ['/faq', '/impressum', '/datenschutz', '/kontakt', '/ueber-uns', '/sitemap', '/redaktion', '/methodik', '/verantwortungsvolles-spiel', '/newsletter', '/profil', '/admin', '/suche'];
  if (noRelated.includes(p) || p.startsWith('/sitemap/')) return [];

  // ── /mannschaft/[slug] ──
  const mannschaftMatch = p.match(/^\/mannschaft\/([^/]+)$/);
  if (mannschaftMatch) {
    const slug = mannschaftMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/prognose/${slug}`, emoji: '🔮', title: `Prognose ${name}`, description: `Unsere Prognose für ${name}` },
      { href: `/kader/${slug}`, emoji: '👥', title: `Kader ${name}`, description: `Die ausgewählten Spieler` },
      { href: `/sportwetten/${slug}`, emoji: '🎰', title: `Wetten auf ${name}`, description: `Beste verfügbare Wetten` },
      { href: `/meister-wetten/${slug}`, emoji: '🏆', title: `Meisterwette ${name}`, description: `Quoten auf den WM-Titel` },
      { href: `/prognose/sieger`, emoji: '🥇', title: `Siegprognose`, description: `Wer gewinnt die WM 2026?` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten der Buchmacher vergleichen` },
    ];
  }

  // ── /spiel/[slug] ──
  const spielMatch = p.match(/^\/spiel\/([^/]+)$/);
  if (spielMatch && spielMatch[1] !== 'heute' && spielMatch[1] !== 'spielplan') {
    const slug = spielMatch[1]!;
    const parts = slug.split('-vs-');
    const team1 = parts[0] || slug;
    const team2 = parts[1] || '';
    return [
      { href: `/prognose-spiel/${slug}`, emoji: '🔮', title: `Spielprognose`, description: `Unsere Analyse und Prognose` },
      { href: `/genaues-ergebnis/${slug}`, emoji: '🎯', title: `Genaues Ergebnis`, description: `Prognose des genauen Ergebnisses` },
      { href: `/aufstellung/${slug}`, emoji: '📋', title: `Voraussichtliche Aufstellung`, description: `Erwartete Aufstellungen` },
      { href: `/uebertragung/${slug}`, emoji: '📺', title: `TV-Sender`, description: `Wo läuft das Spiel` },
      ...(team1 ? [{ href: `/mannschaft/${team1}`, emoji: '🏳️', title: slugToName(team1), description: `Vollständiges Mannschaftsprofil` }] : []),
      ...(team2 ? [{ href: `/mannschaft/${team2}`, emoji: '🏴', title: slugToName(team2), description: `Vollständiges Mannschaftsprofil` }] : []),
    ].slice(0, 6);
  }

  // ── /stadion/[slug] ──
  const stadionMatch = p.match(/^\/stadion\/([^/]+)$/);
  if (stadionMatch) {
    const slug = stadionMatch[1]!;
    return [
      { href: `/spiele-im-stadion/${slug}`, emoji: '⚽', title: `Spiele im Stadion`, description: `Alle hier geplanten Spiele` },
      { href: `/stadion-anfahrt/${slug}`, emoji: '🚗', title: `Anfahrt`, description: `So kommen Sie hin` },
      { href: `/fanzone/${slug}`, emoji: '📺', title: `Fanzonen`, description: `Fanzonen in der Nähe` },
      { href: `/stadien`, emoji: '🏟️', title: `Alle Stadien`, description: `Die 16 WM-Stadien` },
      { href: `/tickets`, emoji: '🎫', title: `Tickets`, description: `Tickets kaufen` },
      { href: `/spiel/spielplan`, emoji: '📅', title: `Spielplan`, description: `Vollständiger Spielplan` },
    ];
  }

  // ── /stadt/[slug] ──
  const stadtMatch = p.match(/^\/stadt\/([^/]+)$/);
  if (stadtMatch) {
    const slug = stadtMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/stadtguide/${slug}`, emoji: '🗺️', title: `Guide ${name}`, description: `Vollständiger Fan-Guide` },
      { href: `/fanzone/${slug}`, emoji: '🎉', title: `Fanzone ${name}`, description: `Gemeinsam mitfiebern` },
      { href: `/unterkunft/${slug}`, emoji: '🏨', title: `Unterkunft`, description: `Wo schlafen in ${name}` },
      { href: `/wetter/${slug}`, emoji: '☀️', title: `Wetter ${name}`, description: `Vorhersagen während der WM` },
      { href: `/transport/${slug}`, emoji: '🚇', title: `Transport`, description: `Sich in ${name} fortbewegen` },
      { href: `/staedte`, emoji: '🌆', title: `Alle Städte`, description: `Die 16 Austragungsorte` },
    ];
  }

  // ── /spieler/[slug] ──
  const spielerMatch = p.match(/^\/spieler\/([^/]+)$/);
  if (spielerMatch) {
    const slug = spielerMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/torschuetzen-wetten/${slug}`, emoji: '⚽', title: `Torschützenwette ${name}`, description: `Quoten auf ein Tor` },
      { href: `/gelbkarten-wette/${slug}`, emoji: '🟨', title: `Kartenwette ${name}`, description: `Quoten gelbe Karte` },
      { href: `/schuesse-aufs-tor/${slug}`, emoji: '🎯', title: `Schüsse aufs Tor`, description: `Statistiken Torschüsse` },
      { href: `/torvorlagen/${slug}`, emoji: '🅰️', title: `Torvorlagen`, description: `Assist-Statistiken` },
      { href: `/torschuetzen`, emoji: '👟', title: `Torschützenliste`, description: `Torjäger-Rangliste` },
      { href: `/spieler`, emoji: '👥', title: `Alle Spieler`, description: `Spielerverzeichnis` },
    ];
  }

  // ── /gruppe/[lettre] ──
  const gruppeMatch = p.match(/^\/gruppe\/([a-lA-L])$/);
  if (gruppeMatch) {
    const lettre = gruppeMatch[1]!.toUpperCase();
    const slug = gruppeMatch[1]!.toLowerCase();
    return [
      { href: `/prognose-gruppe/${slug}`, emoji: '🔮', title: `Prognose Gruppe ${lettre}`, description: `Wer kommt weiter?` },
      { href: `/qualifikationsszenarien/${slug}`, emoji: '🧮', title: `Qualifikationsszenarien`, description: `Alle Möglichkeiten` },
      { href: `/gruppen`, emoji: '📊', title: `Alle Gruppen`, description: `Gesamtübersicht der Gruppen` },
      { href: `/spiel/spielplan`, emoji: '📅', title: `Spielplan`, description: `Vollständiger Spielplan` },
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt die WM?` },
      { href: `/turnierbaum`, emoji: '🎮', title: `Turnierbaum`, description: `Ergebnisse simulieren` },
    ];
  }

  // ── /prognose/sieger ──
  if (p === '/prognose/sieger') {
    return [
      { href: `/prognose/frankreich`, emoji: '🇫🇷', title: `Prognose Frankreich`, description: `Unsere Prognose für Frankreich` },
      { href: `/prognose/brasilien`, emoji: '🇧🇷', title: `Prognose Brasilien`, description: `Unsere Prognose für Brasilien` },
      { href: `/prognose/argentinien`, emoji: '🇦🇷', title: `Prognose Argentinien`, description: `Unsere Prognose für Argentinien` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/turnierbaum`, emoji: '🎮', title: `Turnierbaum`, description: `Turnier simulieren` },
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `WM-Wetten Guide` },
    ];
  }

  // ── /prognose/[slug] ──
  const pronoMatch = p.match(/^\/prognose\/([^/]+)$/);
  if (pronoMatch) {
    const slug = pronoMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/mannschaft/${slug}`, emoji: '🏳️', title: `Mannschaft ${name}`, description: `Vollständiges Profil` },
      { href: `/kader/${slug}`, emoji: '👥', title: `Kader ${name}`, description: `Ausgewählte Spieler` },
      { href: `/sportwetten/${slug}`, emoji: '🎰', title: `Wetten auf ${name}`, description: `Beste Wetten` },
      { href: `/meister-wetten/${slug}`, emoji: '🏆', title: `Meisterwette`, description: `Quoten auf den Titel` },
      { href: `/prognose/sieger`, emoji: '🥇', title: `Siegprognose`, description: `Wer gewinnt?` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
    ];
  }

  // ── /prognose/btts ──
  if (p === '/prognose/btts') {
    return [
      { href: `/prognose/over-under`, emoji: '📈', title: `Over/Under`, description: `Prognosen mehr/weniger Tore` },
      { href: `/prognose/karten`, emoji: '🟨', title: `Kartenprognose`, description: `Gelbe & rote Karten` },
      { href: `/sportwetten/ecken`, emoji: '🚩', title: `Eckball-Wetten`, description: `Eckball-Prognosen` },
      { href: `/prognose/zu-null`, emoji: '🧤', title: `Zu Null`, description: `Zu-Null-Prognosen` },
      { href: `/prognose/genaue-ergebnisse`, emoji: '🎯', title: `Genaue Ergebnisse`, description: `Ergebnisprognosen` },
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `Vollständiger Wetten-Guide` },
    ];
  }

  // ── /prognose/over-under ──
  if (p === '/prognose/over-under') {
    return [
      { href: `/prognose/btts`, emoji: '⚽', title: `BTTS`, description: `Beide Teams treffen` },
      { href: `/prognose/karten`, emoji: '🟨', title: `Kartenprognose`, description: `Gelbe & rote Karten` },
      { href: `/prognose/zu-null`, emoji: '🧤', title: `Zu Null`, description: `Zu-Null-Prognosen` },
      { href: `/sportwetten/kombiwetten`, emoji: '🔗', title: `Kombiwetten`, description: `Prognosen kombinieren` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/sportwetten/guide`, emoji: '📖', title: `Wetten-Guide`, description: `Alles über Sportwetten` },
    ];
  }

  // ── Other /prognose-* pages ──
  if (p.startsWith('/prognose-') || p === '/prognose') {
    const pronoPages = [
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt?` },
      { href: `/prognose/btts`, emoji: '⚽', title: `BTTS`, description: `Beide Teams treffen` },
      { href: `/prognose/over-under`, emoji: '📈', title: `Over/Under`, description: `Mehr/weniger Tore` },
      { href: `/prognose/torschuetzen`, emoji: '👟', title: `Torschützenprognose`, description: `Beste Torschützen` },
      { href: `/prognose/karten`, emoji: '🟨', title: `Kartenprognose`, description: `Gelbe & rote Karten` },
      { href: `/prognose/genaue-ergebnisse`, emoji: '🎯', title: `Genaue Ergebnisse`, description: `Ergebnisprognosen` },
      { href: `/prognose/zu-null`, emoji: '🧤', title: `Zu Null`, description: `Zu-Null-Prognosen` },
      { href: `/prognose/finalisten`, emoji: '🏅', title: `Finalisten-Prognose`, description: `Wer steht im Finale?` },
      { href: `/prognose/elfmeter`, emoji: '🥅', title: `Elfmeter`, description: `Elfmeter-Prognosen` },
    ];
    return pronoPages.filter(l => l.href !== p).slice(0, 6);
  }

  // ── /sportwetten ──
  if (p === '/sportwetten') {
    return [
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/prognose/btts`, emoji: '⚽', title: `BTTS`, description: `Beide treffen` },
      { href: `/prognose/over-under`, emoji: '📈', title: `Over/Under`, description: `Mehr/weniger Tore` },
      { href: `/sportwetten/handicap`, emoji: '⚖️', title: `Handicap-Wetten`, description: `Handicap-Guide` },
      { href: `/sportwetten/kombiwetten`, emoji: '🔗', title: `Kombiwetten`, description: `Wetten kombinieren` },
      { href: `/sportwetten/live`, emoji: '🔴', title: `Live-Wetten`, description: `Live wetten` },
    ];
  }

  // ── Other /sportwetten-* pages ──
  if (p.startsWith('/sportwetten/')) {
    const wettenPages = [
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `Vollständiger Guide` },
      { href: `/sportwetten/kombiwetten`, emoji: '🔗', title: `Kombiwetten`, description: `Wetten kombinieren` },
      { href: `/sportwetten/handicap`, emoji: '⚖️', title: `Handicap-Wetten`, description: `Handicap-Guide` },
      { href: `/sportwetten/live`, emoji: '🔴', title: `Live-Wetten`, description: `Live wetten` },
      { href: `/sportwetten/ecken`, emoji: '🚩', title: `Eckball-Wetten`, description: `Eckball-Prognosen` },
      { href: `/sportwetten/halbzeit`, emoji: '⏱️', title: `Halbzeit-Wetten`, description: `Halbzeit-Wetten` },
    ];
    return wettenPages.filter(l => l.href !== p).slice(0, 6);
  }

  // ── /prognose-spiel/[slug] ──
  const pronoSpielSlug = p.match(/^\/prognose-spiel\/([^/]+)$/);
  if (pronoSpielSlug) {
    const slug = pronoSpielSlug[1]!;
    return [
      { href: `/spiel/${slug}`, emoji: '⚽', title: `Spielprofil`, description: `Vollständige Spielinfos` },
      { href: `/genaues-ergebnis/${slug}`, emoji: '🎯', title: `Genaues Ergebnis`, description: `Ergebnisprognose` },
      { href: `/aufstellung/${slug}`, emoji: '📋', title: `Aufstellung`, description: `Voraussichtliche Aufstellungen` },
      { href: `/uebertragung/${slug}`, emoji: '📺', title: `TV-Sender`, description: `Wo schauen` },
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt die WM?` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
    ];
  }

  // ── /buchmacher/[slug] ──
  const buchMatch = p.match(/^\/buchmacher\/([^/]+)$/);
  if (buchMatch) {
    return [
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/bonus`, emoji: '🎁', title: `Wetten-Boni`, description: `Alle verfügbaren Boni` },
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `Vollständiger Wetten-Guide` },
      { href: `/sportwetten`, emoji: '🏅', title: `Beste Buchmacher`, description: `Unsere Rangliste` },
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt?` },
      { href: `/sportwetten/guide`, emoji: '📖', title: `Wetten-Guide`, description: `Alles über Sportwetten` },
    ];
  }

  // ── /nachrichten/[slug] ──
  const nachrichtenMatch = p.match(/^\/nachrichten\/([^/]+)$/);
  if (nachrichtenMatch) {
    return [
      { href: `/nachrichten`, emoji: '📰', title: `Alle Nachrichten`, description: `Neueste WM 2026 News` },
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt?` },
      { href: `/spiel/spielplan`, emoji: '📅', title: `Spielplan`, description: `Spielplan` },
      { href: `/mannschaften`, emoji: '🏳️', title: `Die Mannschaften`, description: `48 qualifizierte Teams` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/turnierbaum`, emoji: '🎮', title: `Turnierbaum`, description: `Turnier simulieren` },
    ];
  }

  // ── /guide/* and travel pages ──
  if (p.startsWith('/guide') || p.startsWith('/fanzone') || p.startsWith('/unterkunft') || p.startsWith('/transport') || p.startsWith('/wetter') || p.startsWith('/stadtguide') || p.startsWith('/fan-guide') || p.startsWith('/grosse-leinwaende') || p.startsWith('/stadion-anfahrt') || p.startsWith('/sicherheit')) {
    const guidePages = [
      { href: `/tickets`, emoji: '🎫', title: `Tickets`, description: `Tickets kaufen` },
      { href: `/staedte`, emoji: '🌆', title: `Austragungsorte`, description: `Die 16 Städte` },
      { href: `/stadien`, emoji: '🏟️', title: `Stadien`, description: `Die 16 Stadien` },
      { href: `/fanzonen`, emoji: '🎉', title: `Fanzonen`, description: `Gemeinsam anfeuern` },
      { href: `/unterkunft`, emoji: '🏨', title: `Unterkunft`, description: `Wo schlafen` },
      { href: `/fluege`, emoji: '✈️', title: `Flüge`, description: `Flug finden` },
      { href: `/budget`, emoji: '💰', title: `Budget`, description: `Was kostet es?` },
      { href: `/reise/esta-visum-usa`, emoji: '🛂', title: `ESTA USA`, description: `Einreiseformalitäten` },
      { href: `/reise/zeitverschiebung`, emoji: '🕐', title: `Zeitverschiebung`, description: `Spielzeiten` },
      { href: `/guides`, emoji: '📚', title: `Alle Guides`, description: `Praktische Reiseführer` },
    ];
    return guidePages.filter(l => l.href !== p && !p.startsWith(l.href + '/')).slice(0, 6);
  }

  // ── /kader/[slug] ──
  const kaderMatch = p.match(/^\/kader\/([^/]+)$/);
  if (kaderMatch) {
    const slug = kaderMatch[1]!;
    const name = slugToName(slug);
    return [
      { href: `/sportwetten/${slug}`, emoji: '🎰', title: `Wetten auf ${name}`, description: `Beste Wetten` },
      { href: `/meister-wetten/${slug}`, emoji: '🏆', title: `Meisterwette`, description: `Quoten auf den Titel` },
      { href: `/prognose/${slug}`, emoji: '🔮', title: `Prognose ${name}`, description: `Unsere Prognosen` },
      { href: `/mannschaft/${slug}`, emoji: '🏳️', title: `Mannschaft ${name}`, description: `Vollständiges Profil` },
      { href: `/prognose/sieger`, emoji: '🥇', title: `Siegprognose`, description: `Wer gewinnt?` },
      { href: `/spieler`, emoji: '👥', title: `Alle Spieler`, description: `Spielerverzeichnis` },
    ];
  }

  // ── /meister-wetten/[slug], /torschuetzen-wetten/[slug], /sportwetten/[slug] ──
  const wetteMatch = p.match(/^\/(meister-wetten|torschuetzen-wetten|gelbkarten-wette|sportwetten)\/([^/]+)$/);
  if (wetteMatch) {
    const slug = wetteMatch[2]!;
    const name = slugToName(slug);
    return [
      { href: `/mannschaft/${slug}`, emoji: '🏳️', title: `Mannschaft ${name}`, description: `Vollständiges Profil` },
      { href: `/prognose/${slug}`, emoji: '🔮', title: `Prognose ${name}`, description: `Unsere Prognosen` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `Vollständiger Guide` },
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt?` },
      { href: `/bonus`, emoji: '🎁', title: `Wetten-Boni`, description: `Buchmacher-Angebote` },
    ];
  }

  // ── /genaues-ergebnis/[slug], /aufstellung/[slug], /uebertragung/[slug], /ecken/[slug] ──
  const spielDetailMatch = p.match(/^\/(genaues-ergebnis|aufstellung|uebertragung|ecken|direktvergleich|h2h)\/([^/]+)$/);
  if (spielDetailMatch) {
    const slug = spielDetailMatch[2]!;
    return [
      { href: `/spiel/${slug}`, emoji: '⚽', title: `Spielprofil`, description: `Vollständige Infos` },
      { href: `/prognose-spiel/${slug}`, emoji: '🔮', title: `Prognose`, description: `Unsere Analyse` },
      { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt die WM?` },
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `Wetten-Guide` },
      { href: `/spiel/spielplan`, emoji: '📅', title: `Spielplan`, description: `Alle Spiele` },
    ];
  }

  // ── Homepage ──
  if (p === '/' || p === '') {
    return [
      { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt die WM?` },
      { href: `/spiel/spielplan`, emoji: '📅', title: `Spielplan`, description: `Alle Spiele` },
      { href: `/gruppen`, emoji: '📊', title: `Die Gruppen`, description: `Gruppenphase` },
      { href: `/mannschaften`, emoji: '🏳️', title: `Die Mannschaften`, description: `48 qualifizierte Teams` },
      { href: `/turnierbaum`, emoji: '🎮', title: `Turnierbaum`, description: `Turnier simulieren` },
      { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `WM-Wetten Guide` },
    ];
  }

  // ── Default fallback for misc pages ──
  // Listing pages, quiz, stats, etc.
  const defaults: RelatedItem[] = [
    { href: `/prognose/sieger`, emoji: '🏆', title: `Siegprognose`, description: `Wer gewinnt?` },
    { href: `/spiel/spielplan`, emoji: '📅', title: `Spielplan`, description: `Alle Spiele` },
    { href: `/quotenvergleich`, emoji: '📊', title: `Quotenvergleich`, description: `Quoten vergleichen` },
    { href: `/mannschaften`, emoji: '🏳️', title: `Die Mannschaften`, description: `48 qualifizierte Teams` },
    { href: `/turnierbaum`, emoji: '🎮', title: `Turnierbaum`, description: `Turnier simulieren` },
    { href: `/sportwetten`, emoji: '🎰', title: `Sportwetten`, description: `Wetten-Guide` },
  ];
  return defaults.filter(l => l.href !== p).slice(0, 6);
}

/** Convert slug to display name: "vereinigte-staaten" → "Vereinigte Staaten" */
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
