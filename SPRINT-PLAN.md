# 🏃 SPRINT PLAN — mondial2026.fr

**Date** : 19 février 2026  
**Pilote** : Max (IA)  
**Contraintes** : ZERO API payante, données mockées/statiques, version FR uniquement (`apps/fr/`)  
**Objectif** : Implémenter en quelques heures/jours, pas en semaines. Sub-agents parallélisés.

---

## BATCH 1 — Bugs critiques + fixes rapides (1-2h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B1-01 | Fix bug odds `\|\|` → `&&` | Corriger la condition de matching des cotes : `\|\|` → `&&` pour éviter d'afficher les cotes du mauvais match. Ligne 79-83. | `packages/api/src/odds/client.ts` | 5min | oui | oui |
| B1-02 | Fix accents manquants code | Rechercher/remplacer les accents manquants dans les fichiers source FR : "equipe"→"équipe", "premiere"→"première", "decouvrez"→"découvrez", "etats"→"états", etc. | `apps/fr/app/**/*.tsx`, `apps/fr/app/**/*.ts` | 20min | oui | oui |
| B1-03 | Validation Zod outputs IA | Intégrer les schemas Zod existants (`packages/ai/src/schemas.ts`) dans l'orchestrateur IA. Wrapper chaque output avec `schema.safeParse()`, fallback sur données statiques si validation échoue. | `packages/ai/src/orchestrator.ts`, `packages/ai/src/schemas.ts` | 30min | oui | oui |
| B1-04 | Supprimer dead code / dédup | Identifier les composants dupliqués entre `apps/fr/app/components/prediction/` et `apps/fr/app/pronostic-match/[slug]/components/`. Créer un composant partagé dans `packages/ui/` ou supprimer les copies. | `apps/fr/app/components/prediction/`, `apps/fr/app/pronostic-match/[slug]/components/`, `packages/ui/src/` | 30min | oui | oui |
| B1-05 | TypeScript strict mode | Activer `"strict": true` dans tsconfig et fixer les erreurs de type résultantes. | `packages/typescript-config/`, tous les `tsconfig.json` | 30min | oui | oui |
| B1-06 | JSON parse try-catch | Wrapper tous les `JSON.parse()` dans les clients API avec try-catch + fallback. | `packages/api/src/football/client.ts`, `packages/api/src/odds/client.ts` | 15min | oui | oui |
| B1-07 | Fix rate limiting | Enforcer le rate limiting qui est documenté mais pas implémenté dans la config. Ajouter le middleware de rate limiting actif. | `packages/api/src/config.ts`, `packages/api/src/rate-limiter.ts` | 20min | oui | oui |
| B1-08 | Cache mémoire avec limite | Ajouter LRU eviction (max 100 entrées) + TTL au cache mémoire pour éviter OOM sur Vercel. | `packages/ai/src/cache.ts` | 15min | oui | oui |

**Toutes les tâches B1 sont parallélisables** → 8 sub-agents simultanés.  
**Temps réel** : ~30min (parallélisé) au lieu de ~2h45 séquentiel.

---

## BATCH 2 — Homepage redesign + UX quick wins (2-3h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B2-01 | Countdown CDM | Créer un composant client `Countdown.tsx` avec J-XX, H-XX, M-XX jusqu'au match d'ouverture (11 juin 2026). Ajouter sur la homepage sous le hero. | `apps/fr/app/components/Countdown.tsx`, `apps/fr/app/page.tsx` | 30min | oui | oui |
| B2-02 | Section "matchs à venir" | Ajouter une section avec les 3-4 prochains matchs (données statiques du calendrier). Card avec équipes, date, stade, mini-cotes. Lien vers pronostic-match. | `apps/fr/app/page.tsx`, `apps/fr/app/components/UpcomingMatches.tsx` | 40min | oui | oui |
| B2-03 | Pronostic vedette homepage | Section "Pronostic du jour" avec un match featured (le plus intéressant du jour ou le prochain gros match). Résumé pronostic + CTA. Données statiques. | `apps/fr/app/page.tsx`, `apps/fr/app/components/FeaturedPrediction.tsx` | 30min | oui | oui |
| B2-04 | CTA bookmaker homepage | Section "Meilleur bonus du moment" avec 1 bookmaker featured (logo, bonus, CTA). Données depuis `packages/data/src/affiliates`. | `apps/fr/app/page.tsx`, `apps/fr/app/components/FeaturedBookmaker.tsx` | 25min | oui | oui |
| B2-05 | Trier équipes favorites | Modifier l'ordre d'affichage des équipes sur la homepage : France, Argentine, Brésil, Espagne, Angleterre en premier. Pas les barrages/playoffs en tête. | `apps/fr/app/page.tsx`, `packages/data/src/teams.ts` | 15min | oui | oui |
| B2-06 | Sticky CTA mobile | Ajouter un CTA bookmaker sticky en bas de l'écran sur mobile (fixed bottom, z-50). Visible sur toutes les pages sauf légales. Component client avec dismiss. | `apps/fr/app/components/StickyCTA.tsx`, `apps/fr/app/layout.tsx` | 25min | oui | oui |

**Toutes parallélisables** → 6 sub-agents.  
**Temps réel** : ~40min (parallélisé) au lieu de ~2h45 séquentiel.

---

## BATCH 3 — Nouvelles pages (3-4h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B3-01 | Simulateur bracket interactif | Page `/simulateur/` avec composant React client. L'utilisateur clique le vainqueur de chaque match, cascade R32→R16→QF→SF→Finale. Sauvegarde localStorage. Données matchs statiques. | `apps/fr/app/simulateur/page.tsx`, `apps/fr/app/simulateur/components/BracketSimulator.tsx` | 90min | oui | oui |
| B3-02 | Quiz CDM | Page `/quiz/` avec 50+ questions mockées en JSON (5 catégories : Histoire, Règles, Joueurs, Stades, Stats). 20 questions aléatoires par session. Score final partageable. Composant client. | `apps/fr/app/quiz/page.tsx`, `apps/fr/app/quiz/components/Quiz.tsx`, `apps/fr/app/quiz/data/questions.json` | 60min | oui | oui |
| B3-03 | Comparateur de cotes | Page `/comparateur-cotes/` avec tableau mock des cotes de 5 bookmakers pour chaque match de groupe. Filtre par groupe/équipe. CTA par bookmaker. Données statiques. | `apps/fr/app/comparateur-cotes/page.tsx`, `apps/fr/app/comparateur-cotes/components/OddsComparator.tsx`, `apps/fr/app/comparateur-cotes/data/mock-odds.ts` | 50min | oui | oui |
| B3-04 | Glossaire paris sportifs | Page `/guide/glossaire/` avec 100+ termes A-Z. Navigation par lettre (ancres). Chaque terme : définition + exemple concret CDM. Données statiques JSON. | `apps/fr/app/guide/glossaire/page.tsx`, `apps/fr/app/guide/glossaire/data/terms.json` | 40min | oui | oui |
| B3-05 | Page "Où regarder les matchs" | Page `/ou-regarder/` : chaînes TV françaises (TF1, beIN, etc.), streaming légal, bars/fan zones. Données statiques. SEO "coupe du monde 2026 TV streaming". | `apps/fr/app/ou-regarder/page.tsx` | 30min | oui | oui |
| B3-06 | Page résultats live (structure) | Page `/live/` : structure pour le hub résultats pendant le tournoi. Pour l'instant : état "pré-tournoi" avec countdown + prochains matchs + message "Les résultats live seront disponibles dès le 11 juin". Mock d'un match en cours pour le design. | `apps/fr/app/live/page.tsx`, `apps/fr/app/live/components/LiveHub.tsx` | 40min | oui | oui |

**Toutes parallélisables** → 6 sub-agents.  
**Temps réel** : ~90min (parallélisé, le bracket est le plus long) au lieu de ~5h10 séquentiel.

---

## BATCH 4 — Contenu & SEO (2-3h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B4-01 | Corriger accents données | Fix tous les accents manquants dans les fichiers data : noms d'équipes, descriptions, slugs. "equipe"→"équipe", etc. Audit complet des 18 fichiers data. | `packages/data/src/*.ts` (18 fichiers) | 40min | oui | oui |
| B4-02 | Enrichir descriptions équipes | Allonger `team.description` de ~50 mots à ~200 mots pour les 48 équipes. Contenu statique rédigé (pas d'API IA). Historique CDM, style de jeu, joueur vedette. | `packages/data/src/teams.ts` | 60min | oui | oui |
| B4-03 | Schemas JSON-LD manquants | Ajouter StadiumOrArena sur les 16 pages stade et Place sur les 12 pages ville. Utiliser les données existantes (capacité, coordonnées, adresse). | `apps/fr/app/stade/[slug]/page.tsx`, `apps/fr/app/ville/[slug]/page.tsx` | 30min | oui | oui |
| B4-04 | Profils auteur + méthodologie | Créer page `/methodologie/` expliquant le modèle ELO et le pipeline IA. Créer un composant `AuthorBox` avec photo placeholder, nom, bio, expertise. Ajouter sur les guides et articles. | `apps/fr/app/methodologie/page.tsx`, `apps/fr/app/components/AuthorBox.tsx`, `apps/fr/app/guide/[slug]/page.tsx` | 40min | oui | oui |
| B4-05 | Améliorer maillage interne | Ajouter des liens contextuels : "matchs de la même journée" sur pages match, "H2H liés" sur pages équipe, liens pronostics populaires sur homepage, "guides liés" en bas des guides. | `apps/fr/app/match/[slug]/page.tsx`, `apps/fr/app/equipe/[slug]/page.tsx`, `apps/fr/app/guide/[slug]/page.tsx` | 40min | oui | oui |

**Toutes parallélisables** → 5 sub-agents.  
**Temps réel** : ~60min (parallélisé) au lieu de ~3h30 séquentiel.

---

## BATCH 5 — UX improvements par template (2-3h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B5-01 | Joueurs clés expandable | Limiter l'affichage initial à 5-8 joueurs clés sur les pages équipe. Bouton "Voir tout l'effectif" qui expand la liste complète. | `apps/fr/app/equipe/[slug]/page.tsx` | 20min | oui | oui |
| B5-02 | Filtres calendrier | Ajouter filtres client-side sur la page calendrier : par équipe, par groupe, par stade, par phase. Composant client avec state. | `apps/fr/app/match/calendrier/page.tsx`, `apps/fr/app/match/calendrier/components/CalendarFilters.tsx` | 40min | oui | oui |
| B5-03 | CTA contextualisés | Remplacer les CTA génériques "Parier" par des CTA contextuels : "Parier sur France vs Sénégal" sur les pages match, "Parier sur la France championne" sur pages équipe. | `apps/fr/app/pronostic-match/[slug]/page.tsx`, `apps/fr/app/pronostic/[slug]/page.tsx`, `apps/fr/app/equipe/[slug]/page.tsx` | 30min | oui | oui |
| B5-04 | Améliorer sidebar | Sidebar enrichie : ajouter "matchs liés", forme récente visuelle (V/D/N en pastilles colorées), mini-classement groupe. Uniformiser sur toutes les pages de détail. | `apps/fr/app/components/Sidebar.tsx` ou composants sidebar existants | 35min | oui | oui |
| B5-05 | Mobile optimizations | Tables responsives (cards sur mobile au lieu de tableaux), groupes en accordéon sur homepage mobile, images lazy-loaded, touch targets ≥ 44px vérifiés. | `apps/fr/app/page.tsx`, `apps/fr/app/components/*.tsx`, `globals.css` | 40min | oui | oui |

**Toutes parallélisables** → 5 sub-agents.  
**Temps réel** : ~40min (parallélisé) au lieu de ~2h45 séquentiel.

---

## BATCH 6 — Images & design polish (1-2h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B6-01 | Drapeaux SVG | Remplacer les emojis drapeaux par des SVG propres (package `flag-icons` ou SVGs custom). Ajouter `aria-label` pour l'accessibilité. Composant `<Flag country="fr" />`. | `apps/fr/app/components/Flag.tsx`, `public/flags/`, pages équipe/match/groupe | 40min | oui | oui |
| B6-02 | Images stades | Sourcer 16 images libres de droits des stades CDM (Wikimedia Commons, Unsplash). Optimiser avec `next/image`. Ajouter alt text descriptif. | `public/images/stades/`, `apps/fr/app/stade/[slug]/page.tsx` | 30min | oui | oui |
| B6-03 | next/image optimization | Auditer et remplacer les `<img>` par `<Image>` de Next.js partout. Ajouter `width`, `height`, `priority` pour les images above the fold. Config `images.remotePatterns` si nécessaire. | `next.config.js`, composants avec images | 20min | oui | oui |
| B6-04 | Fix color contrast | Fixer `text-gray-300` sur fond blanc (3.8:1 < 4.5:1 WCAG AA). Passer à `text-gray-600` minimum. Vérifier tous les textes secondaires en light mode. | `apps/fr/app/globals.css`, composants avec `text-gray-300/400` | 15min | oui | oui |
| B6-05 | Dark mode refinements | Vérifier que toutes les nouvelles pages/composants (B2, B3) supportent correctement le dark mode. Fixer les cas où le fond/texte est illisible en dark. | `apps/fr/app/globals.css`, tous les nouveaux composants | 20min | non (après B2-B3) | oui |

**B6-01 à B6-04 parallélisables. B6-05 après B2+B3.**  
**Temps réel** : ~40min (parallélisé) + 20min B6-05 = ~60min.

---

## BATCH 7 — Déploiement (1h)

| ID | Titre | Quoi faire | Fichiers | Temps | ‖ | Sub-agent |
|----|-------|-----------|----------|-------|---|-----------|
| B7-01 | Config Vercel | Vérifier/créer `vercel.json` avec les bons settings : framework Next.js, build command, output directory, env variables, ISR config, redirects. | `vercel.json`, `.env.production` | 15min | oui | oui |
| B7-02 | Vérification build | Lancer `pnpm build` (ou `npm run build`), fixer TOUTES les erreurs TypeScript et warnings. Vérifier que les ~1900 pages sont générées statiquement. Check bundle size. | Tous les fichiers | 30min | non (séquentiel) | non |
| B7-03 | Deploy | Deploy sur Vercel. Vérifier : toutes les pages chargent, hreflang OK, schemas JSON-LD valides, ISR fonctionne, images optimisées, dark mode OK, mobile OK. | - | 15min | non (après B7-02) | non |

**B7-01 parallélisable. B7-02 et B7-03 séquentiels.**  
**Temps réel** : ~45min.

---

## 📊 Estimation totale

| Batch | Séquentiel | Parallélisé | Sub-agents |
|-------|-----------|-------------|------------|
| B1 — Bugs critiques | 2h45 | **30min** | 8 |
| B2 — Homepage redesign | 2h45 | **40min** | 6 |
| B3 — Nouvelles pages | 5h10 | **1h30** | 6 |
| B4 — Contenu & SEO | 3h30 | **1h00** | 5 |
| B5 — UX improvements | 2h45 | **40min** | 5 |
| B6 — Images & design | 2h05 | **1h00** | 5 |
| B7 — Déploiement | 1h00 | **45min** | 1 |
| **TOTAL** | **~20h** | **~6h05** | max 8 simultanés |

---

## 🚀 Ordre d'exécution optimal

```
T+0h00  ─── BATCH 1 (8 sub-agents) ───────────────── T+0h30
              │
T+0h30  ─── BATCH 2 (6 sub-agents) ──┐
              │                       │
T+0h30  ─── BATCH 4 (5 sub-agents) ──┤─────────────── T+1h30
              │                       │
T+0h30  ─── BATCH 3 (6 sub-agents) ──┘─────────────── T+2h00
              │
T+2h00  ─── BATCH 5 (5 sub-agents) ──┐
              │                       │
T+2h00  ─── BATCH 6-01→04 (4 sub)  ──┘─────────────── T+2h40
              │
T+2h40  ─── BATCH 6-05 (dark mode) ────────────────── T+3h00
              │
T+3h00  ─── BATCH 7 (build + deploy) ──────────────── T+3h45
```

**Résultat : site complet en ~4h avec parallélisation maximale.**

Les Batches 2, 3, 4 peuvent tourner en parallèle après B1.  
B5 et B6 attendent B2+B3 (pour appliquer le polish sur les nouveaux composants).  
B7 est toujours dernier.

---

*Sprint plan créé le 19/02/2026 par Max. Prêt à lancer.*
