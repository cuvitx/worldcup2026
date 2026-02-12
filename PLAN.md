# Plan : Worldcup2026 — De site statique à plateforme IA temps réel

## Contexte

Le projet Worldcup2026 est un monorepo Turborepo avec 3 sites Next.js (FR/EN/ES) générant ~1840 pages SSG chacun pour le SEO programmatique sur la niche paris sportifs / Coupe du Monde 2026. **Aujourd'hui tout est 100% statique** (données hardcodées en TypeScript, zéro API, zéro IA). L'objectif est de transformer ce site en **plateforme temps réel alimentée par des APIs et enrichie par l'IA**, avec un lancement ASAP pour commencer à indexer et construire l'autorité de domaine avant le tournoi (juin 2026).

---

## Phase 1 : SEO Critical + Déploiement immédiat (priorité #1)

**Objectif** : Corriger les gaps SEO bloquants et déployer pour que Google commence à indexer les 5500+ pages.

### 1.1 Système de mapping cross-langue
**Créer** `/packages/data/src/route-mapping.ts`
- Mapping des préfixes de routes par langue (equipe/team/equipo, etc.)
- Mapping des domaines (mondial2026.fr, worldcup2026guide.com, mundial2026.es)
- Fonction utilitaire `getAlternates(type, slug)` retournant canonical + hreflang

### 1.2 Canonical URLs + Hreflang
**Modifier** les `layout.tsx` des 3 apps :
- Ajouter `metadataBase: new URL("https://mondial2026.fr")`
- Ajouter `alternates.languages` pour les 3 versions

**Modifier** chaque `generateMetadata` (~18 pages dynamiques × 3 apps = ~54 fichiers) :
- Importer `getAlternates` depuis `@repo/data/route-mapping`
- Ajouter `alternates: getAlternates("team", slug)` dans le return

**Fichiers clés** :
- `apps/fr/app/layout.tsx`
- `apps/fr/app/equipe/[slug]/page.tsx` — et tous les équivalents

### 1.3 BreadcrumbList Schema (JSON-LD)
**Créer** `/packages/ui/src/breadcrumb-schema.tsx`
- Composant React générant le JSON-LD BreadcrumbList
- Accepte un tableau `{name, url}[]` + `baseUrl`

**Modifier** chaque page ayant des breadcrumbs visuels (~18 pages × 3 apps) :
- Ajouter `<BreadcrumbSchema items={[...]} baseUrl={BASE_URL} />`

### 1.4 Organization Schema
**Créer** `/packages/ui/src/organization-schema.tsx`

**Modifier** `apps/*/app/layout.tsx` (3 fichiers) :
- Ajouter le composant dans le body

### 1.5 Robots.txt
**Modifier** `apps/*/app/robots.ts` (3 fichiers) :
- Ajouter `disallow: ["/api/", "/_next/"]`

### 1.6 Liens affiliés
**Modifier** `/packages/data/src/affiliates.ts` :
- Remplacer `#betclic`, `#winamax`, etc. par les vraies URLs d'affiliation (ou à minima les URLs des bookmakers avec UTM)
- Vérifier que tous les liens ont `rel="noopener noreferrer sponsored nofollow"`

### 1.7 Enrichir les schemas JSON-LD existants
**Modifier** les pages équipe, match, H2H :
- SportsTeam : ajouter `url`, `alternateName` (code FIFA)
- SportsEvent : ajouter `eventStatus: "EventScheduled"`, `description`
- Bookmaker : ajouter schema `Review` avec `reviewRating`
- Guides : ajouter schema `Article`

### Vérification Phase 1
- `npm run build` sans erreurs sur les 3 apps
- Vérifier `<link rel="canonical">` dans le HTML généré
- Vérifier `<link rel="alternate" hreflang="...">` sur chaque page
- Valider JSON-LD avec Google Rich Results Test
- Score Lighthouse SEO = 100

---

## Phase 2 : Couche API (Football, Météo, Cotes) — en parallèle de Phase 1

**Objectif** : Créer un package `@repo/api` qui récupère les données temps réel et les fusionne avec les données statiques.

### 2.1 Nouveau package `@repo/api`
**Créer** `/packages/api/` avec cette structure :
```
packages/api/src/
  index.ts
  config.ts          — endpoints, clés API, rate limits
  cache.ts           — cache in-memory + Vercel KV (TTL par type de donnée)
  football/
    client.ts        — API-Football (RapidAPI) : stats équipes, blessures, compos, scores live
    mappers.ts       — conversion API response → types @repo/data
    types.ts         — types réponses API
  weather/
    client.ts        — OpenWeatherMap : prévisions par coordonnées du stade
    match-weather.ts — forecast jour de match + calcul d'impact (chaleur, altitude, pluie)
  odds/
    client.ts        — The Odds API : cotes réelles de multiples bookmakers
    mappers.ts       — conversion vers le type Odds interne
  factors/
    altitude.ts      — impact altitude (Estadio Azteca = 2240m)
    travel.ts        — fatigue voyage / décalage horaire
    venue-history.ts — performance historique par stade
```

### 2.2 Mapping IDs API-Football
**Créer** `/packages/data/src/api-football-ids.ts`
- Mapping des 48 équipes et 210+ joueurs vers les IDs API-Football

### 2.3 API Routes dans chaque app
**Créer** dans `apps/*/app/api/` :
- `odds/[matchSlug]/route.ts` — cotes live d'un match
- `weather/[matchSlug]/route.ts` — météo jour de match
- `live/route.ts` — scores en direct
- `team/[slug]/stats/route.ts` — stats enrichies d'une équipe

### 2.4 Variables d'environnement
```
API_FOOTBALL_KEY=xxx
OPENWEATHERMAP_KEY=xxx
THE_ODDS_API_KEY=xxx
KV_REST_API_URL=xxx        # Vercel KV pour le cache
KV_REST_API_TOKEN=xxx
```

### 2.5 Stratégie de cache
| Type de donnée | TTL |
|---|---|
| Scores live | 30s |
| Cotes | 5 min |
| Météo | 1h |
| Stats équipe | 24h |
| Blessures | 1h |

**Fallback** : si l'API est indisponible → retour aux données statiques `@repo/data`.

### Vérification Phase 2
- Tests d'intégration avec réponses mockées
- Vérifier le fallback vers données statiques
- Vérifier les cache headers sur les API routes
- `npm run build` OK

---

## Phase 3 : Moteur IA (Analyses, Prédictions, Contenu) — après Phase 2

**Objectif** : Intégrer Claude API pour générer du contenu unique que personne d'autre ne fournit.

### 3.1 Nouveau package `@repo/ai`
**Créer** `/packages/ai/` :
```
packages/ai/src/
  client.ts              — client Anthropic (claude-sonnet-4-5-20250929)
  prompts/
    match-preview.ts     — analyse pré-match (tactique, forme, blessures, météo, altitude)
    betting-advice.ts    — value bets, combinés optimaux, analyse cotes vs modèle
    team-analysis.ts     — analyse de forme et tactique
    player-profile.ts    — profil joueur enrichi
    match-summary.ts     — résumé post-match
  generators/
    match-preview.ts     — orchestrateur : récupère données API + génère avec Claude
    team-analysis.ts     — idem pour analyse équipe
    daily-picks.ts       — sélections quotidiennes de paris
  cache.ts               — cache des générations IA (coûteuses)
```

**Dépendance** : `@anthropic-ai/sdk`

### 3.2 Prompts multi-facteurs
Chaque prompt reçoit un contexte riche incluant :
- Données ELO + FIFA ranking
- H2H historique
- Composition probable + blessures (API-Football)
- Météo jour de match (OpenWeatherMap)
- Altitude du stade
- Fatigue voyage / décalage horaire
- Cotes réelles des bookmakers (The Odds API)
- Forme récente des équipes

L'IA analyse **tous ces facteurs combinés** pour produire des insights qu'aucun site statique ne peut fournir.

### 3.3 Composants d'affichage IA
**Créer** dans chaque app `apps/*/app/components/` :
- `AiMatchPreview.tsx` — analyse pré-match générée par IA
- `AiBettingAdvice.tsx` — conseils paris avec value bets identifiés
- `AiPredictionCard.tsx` — prédiction multi-facteurs avec visualisation
- `WeatherWidget.tsx` — widget météo du match
- `LiveOddsWidget.tsx` — comparaison cotes en temps réel

### 3.4 Intégration dans les pages existantes
**Modifier** les pages match, pronostic, pronostic-match dans les 3 apps :
- Ajouter les composants IA aux templates existants
- Server Components pour le contenu pré-généré
- Client Components pour les données live

### 3.5 Variable d'environnement
```
ANTHROPIC_API_KEY=xxx
```

### Vérification Phase 3
- Tester la qualité des prompts sur des matchs exemples (France vs Brésil, etc.)
- Vérifier le rendu en 3 langues
- Mesurer le coût par génération (cible < $0.01 par preview)
- Vérifier que les disclaimers jeu responsable sont toujours présents

---

## Phase 4 : Temps réel (ISR, Live, Updates dynamiques) — après Phase 2+3

**Objectif** : Transformer les pages statiques en pages qui se mettent à jour automatiquement.

### 4.1 ISR (Incremental Static Regeneration)
**Modifier** toutes les pages dynamiques des 3 apps :
- Pages match : `export const revalidate = 300` (5 min pendant le tournoi)
- Pages équipe : `export const revalidate = 3600` (1h)
- Pages stade/ville : `export const revalidate = 86400` (24h)

### 4.2 Composants Live (client-side)
**Créer** par app :
- `LiveScoreBar.tsx` — barre de scores en direct en haut du site (polling /api/live toutes les 30s)
- `LiveMatchWidget.tsx` — widget score live sur la page match

### 4.3 État du tournoi
**Créer** `/packages/data/src/tournament-state.ts` :
- `getTournamentPhase()` → "pre-tournament" | "group-stage" | "knockout" | "completed"
- `getDaysUntilKickoff()`, `getNextMatch()`, `getTodaysMatches()`

### 4.4 Pages adaptatives
**Modifier** les pages match des 3 apps :
- Avant match → preview IA + météo + cotes + compo probable
- Pendant match → score live + événements + stats live
- Après match → résumé IA + stats finales + buts + cartons

### Vérification Phase 4
- Tester ISR sur Vercel preview
- Simuler le flux de données live bout en bout
- Vérifier la dégradation gracieuse (API down → données statiques)
- Vérifier performance client (pas de memory leaks sur le polling)

---

## Ordre d'exécution

```
Phase 1 (SEO)  ──────────────► Déploiement v1 (indexation)
Phase 2 (APIs) ──────────────►
       ↓
Phase 3 (IA)   ──────────────► Déploiement v2 (enrichi)
       ↓
Phase 4 (Live) ──────────────► Déploiement v3 (temps réel)
```

Phase 1 et Phase 2 en parallèle. Phase 3 dépend de Phase 2 (besoin des données API pour les prompts). Phase 4 dépend de Phase 2 + 3.

## Fichiers critiques à modifier en premier
- `/packages/data/src/route-mapping.ts` (à créer)
- `/apps/fr/app/layout.tsx` (canonical, hreflang, Organization schema)
- `/apps/en/app/layout.tsx` (idem)
- `/apps/es/app/layout.tsx` (idem)
- `/packages/data/src/affiliates.ts` (remplacer URLs placeholder)
- `/packages/ui/src/breadcrumb-schema.tsx` (à créer)
- `/apps/fr/app/equipe/[slug]/page.tsx` (template de référence)
