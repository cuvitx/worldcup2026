# Audit complet — Worldcup2026

**Date** : 2026-02-13
**Scope** : Monorepo Turborepo (3 apps Next.js 16 FR/EN/ES + 6 packages)
**Pages auditées** : ~5700 (1900 × 3 langues)
**Fichiers analysés** : 150+

---

## Score global par axe

| Axe | Score | Verdict |
|-----|-------|---------|
| **Typologies de pages** | 7/10 | Bonne couverture de base, mais gaps critiques (bracket, FAQ, news, today) |
| **SEO technique** | 8.2/10 | Excellente i18n/hreflang. Schemas incomplets, pas d'images |
| **UX/UI & Accessibilité** | 7.5/10 | Design propre, mais pas de search, language switcher, focus states |
| **Backend / APIs** | 6.5/10 | Architecture saine, mais bug critique odds, pas de rate limiting |
| **Frontend / Performance** | 7/10 | Bonne archi composants. 20k LOC dupliqués FR/EN/ES |
| **Contenu IA & Data** | 6/10 | Pipeline IA solide. Odds estimées affichées comme réelles |

---

## Table des matières

1. [CRITIQUE — Bugs bloquants](#1-critique--bugs-bloquants-à-corriger-immédiatement)
2. [HAUTE PRIORITÉ — Code & Backend](#2-haute-priorité--code--backend)
3. [Pages manquantes](#3-pages-manquantes--gaps-de-typologies)
4. [SEO](#4-seo--issues-identifiées)
5. [UX/UI](#5-uxui--issues-identifiées)
6. [Frontend](#6-frontend--problèmes-structurels)
7. [Contenu & Données](#7-contenu--données--risques-de-qualité)
8. [Inventaire complet des pages existantes](#8-inventaire-complet-des-pages-existantes)
9. [Audit SEO détaillé](#9-audit-seo-détaillé)
10. [Audit UX/UI détaillé](#10-audit-uxui-détaillé)
11. [Audit Backend détaillé](#11-audit-backend-détaillé)
12. [Audit Frontend détaillé](#12-audit-frontend-détaillé)
13. [Audit Contenu IA détaillé](#13-audit-contenu-ia-détaillé)
14. [Plan d'action recommandé](#14-plan-daction-recommandé)

---

## 1. CRITIQUE — Bugs bloquants à corriger immédiatement

### 1.1 Bug logique odds matching (`||` au lieu de `&&`)

**Fichier** : `packages/api/src/odds/client.ts:79-83`

```typescript
// ACTUEL (BUG) — retourne le premier match où UN des deux teams match
allOdds.find(o =>
  normalize(o.homeTeam) === normalize(homeTeam) ||   // ❌ OR
  normalize(o.awayTeam) === normalize(awayTeam)
)

// CORRECT — doit matcher LES DEUX équipes
allOdds.find(o =>
  normalize(o.homeTeam) === normalize(homeTeam) &&   // ✅ AND
  normalize(o.awayTeam) === normalize(awayTeam)
)
```

**Impact** : Affiche les cotes du mauvais match aux utilisateurs. Si appelé avec ("France", "Germany"), peut retourner les cotes de "France vs Portugal".

### 1.2 Odds estimées présentées comme cotes réelles

Les pages affichent des cotes **calculées depuis l'ELO** (`estimatedMatchOdds()` avec `probToOdds()`) mais le disclaimer dit "Cotes en temps réel". Aucune API d'odds live n'est connectée.

- **Écart estimé** : 10-30% avec les vraies cotes bookmakers
- **Impact** : Tromperie potentielle des parieurs
- **Fix** : Soit connecter The Odds API, soit indiquer clairement "Cotes estimées (modèle ELO)"

### 1.3 Pas de validation des outputs IA

Les réponses JSON de Claude/Gemini sont parsées sans validation de structure (pas de Zod, pas de type guard). Une hallucination est cachée 24h et diffusée sur les 3 sites.

```typescript
// orchestrator.ts — aucune validation de structure
const parsed = JSON.parse(extractJson(result.content));
output = {
  preview: parsed.preview ?? "",        // ← Si preview est un array, silently fails
  keyFactors: Array.isArray(parsed.keyFactors) ? parsed.keyFactors : [],
  prediction: parsed.prediction ?? "",
  bettingAngle: parsed.bettingAngle ?? "",
};
```

**Impact** : Contenu factuellement faux sur 5500+ pages.

### 1.4 Liens affiliés sans `rel="sponsored nofollow"`

Les URLs bookmakers dans `affiliates.ts` n'ont pas les attributs SEO/légaux requis. Les liens sont rendus sans `rel="noopener noreferrer sponsored nofollow"`.

**Impact** : Risque de pénalité Google (manual action) + non-conformité FTC (US) / CNIL (France).

---

## 2. HAUTE PRIORITÉ — Code & Backend

| # | Issue | Fichier | Impact |
|---|-------|---------|--------|
| 5 | **Rate limiting non implémenté** — Config documente les limites (100/jour API-Football, 500/mois Odds API) mais ne les enforce pas | `packages/api/src/config.ts` | Dépassement quotas API |
| 6 | **JSON parse sans try-catch** dans les clients API — `res.json()` et `JSON.parse()` non protégés | `football/client.ts:39`, `odds/client.ts:29` | Crash silencieux, 500 errors |
| 7 | **Pas de fallback provider IA** — Si Claude API tombe, expert analysis = null sans fallback vers Gemini | `orchestrator.ts:185` | Dégradation totale des analyses expert |
| 8 | **Cache mémoire sans limite** — `Map()` grandit sans bound, pas d'éviction | `packages/ai/src/cache.ts:24` | OOM sur serverless (Vercel) |
| 9 | **Pas de validation d'input** dans les API routes — slug non validé (longueur, format) | `apps/*/app/api/*/route.ts` | Sécurité |
| 10 | **TypeScript strict mode désactivé** — Pas de `"strict": true` dans tsconfig | `packages/typescript-config/nextjs.json` | Bugs type-safety non détectés |
| 11 | **Cache in-memory backfill incohérent** — 60s en mémoire vs heures en Redis | `packages/api/src/cache.ts:52-54` | Requêtes Redis inutiles |
| 12 | **Weather API forecast limité** — Si match > 5 jours, seul le weather actuel est retourné | `packages/api/src/weather/client.ts:56-88` | Prévisions inexactes |

---

## 3. PAGES MANQUANTES — Gaps de typologies

### Tier 1 — Critique (fort impact SEO + UX)

| Page manquante | Pages | Impact estimé | Effort | Description |
|----------------|-------|---------------|--------|-------------|
| **Arbre à élimination / Bracket Simulator** | 1 interactive | +300k impressions | Moyen | Visualisation du tableau éliminatoire + simulateur prédictif interactif |
| **"Matchs du jour"** (`/match/today`) | 1 dynamique | +100k pendant tournoi | Faible | Page filtrée par date courante avec cotes, stade, pronostics. Recherché chaque jour pendant 39 jours |
| **Section FAQ avec FAQPage schema** | 5-10 pages | +50k impressions | Moyen | Q&A sur paris, tournoi, équipes, prédictions. Cible "People Also Ask" de Google |
| **Section News / Actualités** (IA-generated) | 10-50 pages | +500k impressions | Élevé | Blessures, changements d'effectif, analyse post-match. Driver #1 de trafic organique |
| **Page Contact** | 1 | Signal confiance | Très faible | Formulaire contact, email. Requis RGPD |
| **Simulation qualification groupes** | 12 (enhance existing) | +50% trafic groupes | Faible-Moyen | "Qui se qualifie ?" probabilités, scénarios what-if |

### Tier 2 — Important

| Page manquante | Pages | Impact | Effort |
|----------------|-------|--------|--------|
| **Hub comparaison de cotes** (live, cross-bookmaker) | 1-5 | +100k | Moyen |
| **Hub prédictions IA** (agrégation quotidienne) | 1 | +100k | Faible |
| **Profils entraîneurs** (48 sélections) | 48 | +30k | Faible |
| **Stats joueurs enrichies** (dashboard comparatif) | 10-20 hubs | +100k | Moyen |
| **Glossaire des paris** (100+ termes) | 1 | +20k | Faible |
| **Archive historique Coupes du Monde** (1930-2022) | 100-200 | +100k | Moyen |
| **Guides stades enrichis** (transport, hôtels, accessibilité) | 16 | +50k | Moyen |

### Tier 3 — Nice-to-have

| Page manquante | Pages | Impact | Effort |
|----------------|-------|--------|--------|
| Profils arbitres | 60-100 | +15k | Moyen |
| Guides stratégie avancés | 5-10 | +30k | Moyen |
| Analyse par confédération | 5-6 | +10k | Faible |
| Téléchargement calendrier ICS/PDF | 1 | Engagement | Faible |
| Prédictions communautaires (UGC) | 1 | +5k | Moyen |

**Total pages additionnelles potentielles** : ~300-400 pages
**Impact organique estimé** : +1.4M impressions

---

## 4. SEO — Issues identifiées

| Issue | Sévérité | Détail |
|-------|----------|--------|
| **Schemas JSON-LD incomplets** | Haute | Manque : FAQPage (guides), Review/AggregateRating (bookmakers), Article (guides), StadiumOrArena (stades) |
| **Aucune image réelle** | Haute | Tout en emojis (🇫🇷). Pas de `next/image`, pas d'alt text. Pas de photos stades/joueurs |
| **Guides trop minces** | Haute | 301 LOC pour 9 guides = ~30 lignes/guide. Besoin de 5000-10000 mots/guide pour ranker sur "comment parier" |
| **Bookmaker pages sans Review schema** | Haute | Les ratings HTML existent mais pas de AggregateRating JSON-LD = pas de rich snippets |
| **SportsTeam schema hardcodé** | Moyenne | URL `https://mondial2026.fr` en dur (`equipe/[slug]/page.tsx:432`) au lieu du domaine dynamique |
| **Homepage sans metadata explicite** | Moyenne | Repose sur les défauts du layout.tsx. Devrait exporter son propre metadata |
| **Pas de viewport meta tag** | Moyenne | Manque dans les layouts (impact mobile-first indexing) |
| **Pas de manifest.json** | Basse | Pas de support PWA |
| **Pas d'apple-touch-icon** | Basse | Pas d'icône iOS |

### Points forts SEO (déjà en place)

- ✅ Hreflang parfait via `route-mapping.ts` centralisé (FR/EN/ES + x-default)
- ✅ Canonicals corrects sur toutes les pages dynamiques
- ✅ BreadcrumbList JSON-LD sur toutes les pages de détail
- ✅ Organization schema dans les layouts
- ✅ SportsTeam schema sur les pages équipe
- ✅ Sitemaps complets (~1900 URLs/app)
- ✅ robots.txt correctement configurés
- ✅ ISR bien calibré (300s matchs, 3600s équipes, 86400s stades)
- ✅ Titles et descriptions uniques par page
- ✅ URLs propres et keyword-rich
- ✅ OG images dynamiques pour matchs et équipes

---

## 5. UX/UI — Issues identifiées

### Critique

| Issue | Détail |
|-------|--------|
| **Pas de language switcher** | L'utilisateur ne peut pas passer FR↔EN↔ES depuis l'UI. Le route-mapping.ts existe mais aucun composant ne l'utilise |
| **Pas de recherche** | Aucune search box pour trouver équipes/matchs/joueurs |
| **Pas de focus indicators** | Navigation clavier invisible. Aucun `focus:ring-*` ou `focus-visible:` dans les composants |
| **Pas de skip-to-content** | Keyboard users doivent tab à travers tout le header (8 liens) |

### Haute

| Issue | Détail |
|-------|--------|
| **Pas de cookie consent** | Potentielle violation RGPD en EU |
| **Pas d'error.tsx** | Erreurs 500 sans fallback UI (seul not-found.tsx existe) |
| **Pas d'active link indicator** | Aucun `aria-current="page"` sur le lien nav actif |
| **Color contrast gray-300** | `text-gray-300` sur fond blanc = ratio 3.8:1, FAIL WCAG AA (besoin 4.5:1) |

### Moyenne

| Issue | Détail |
|-------|--------|
| **Pas de loading states** | Pas de skeleton screens, pas de suspense boundaries |
| **Tables non responsives** | Scroll horizontal seulement sur mobile, pas de vue "cards" |
| **Pas de "back to top"** | Pages longues (équipes, pronostics) sans bouton retour haut |
| **Pas de newsletter** | Aucun mécanisme de rétention/engagement |
| **Emojis flags sans aria-label** | Screen readers lisent "Regional Indicator Symbol F, R" au lieu de "Drapeau France" |

### Basse

| Issue | Détail |
|-------|--------|
| **Pas de dark mode** | Pas de support `prefers-color-scheme` |
| **Pas de liens sociaux** | Aucun Twitter/Facebook/Instagram dans le footer |
| **Widget odds limité** | Affiche seulement top 5 bookmakers, pas de "voir tous" |

### Points forts UX (déjà en place)

- ✅ Mobile hamburger menu avec aria-label/aria-expanded
- ✅ Breadcrumbs visuels + schema sur toutes les pages détail
- ✅ Footer complet (48 liens organisés, jeu responsable, numéros d'aide)
- ✅ Page 404 professionnelle avec CTAs
- ✅ Page jeu responsable complète (ANJ, NCPG, DGOJ selon la langue)
- ✅ Design responsive mobile-first (grid-cols-2 → md:grid-cols-4)
- ✅ Composants i18n (locale prop sur les 7 widgets partagés)

---

## 6. FRONTEND — Problèmes structurels

### 6.1 Duplication massive : ~20 000 LOC

Les 24 types de pages × 3 langues = **72 fichiers page.tsx** avec **95% de code identique**. Seuls les labels (`stageLabels`, `dateFormatted`) changent.

| Fichier | FR | EN | ES | Duplication |
|---------|----|----|-----|-------------|
| `match/[slug]/page.tsx` | 485 LOC | 483 LOC | 531 LOC | 95% |
| `equipe/[slug]/page.tsx` | 443 LOC | 438 LOC | 440 LOC | 95% |
| `pronostic-match/[slug]/page.tsx` | 963 LOC | 959 LOC | 962 LOC | 99% |
| `h2h/[slug]/page.tsx` | 295 LOC | ~295 LOC | ~295 LOC | 99% |

**Solution recommandée** : Créer `/packages/pages/` avec pattern `createMatchPage("fr")`.

```typescript
// packages/pages/match-page.tsx (450 LOC, logique partagée)
export function createMatchPage(locale: "fr" | "en" | "es") { ... }

// apps/fr/app/match/[slug]/page.tsx (20 LOC)
export { createMatchPage("fr") as default };
```

**Impact** : Réduire 3 × 485 LOC → 450 + 3 × 50 = ~600 LOC.

### 6.2 Pages trop volumineuses

| Page | LOC | Recommandation |
|------|-----|----------------|
| `pronostic-match/[slug]/page.tsx` | **963** | Découper en 6-8 sous-composants (<150 LOC chacun) |
| `pronostic/[slug]/page.tsx` | **726** | Découper en 4-5 sous-composants |
| `match/[slug]/page.tsx` | **485** | Acceptable mais pourrait être splitté |
| `equipe/[slug]/page.tsx` | **443** | Acceptable |

### 6.3 Code mort

| Fichier | Raison |
|---------|--------|
| `packages/ui/src/button.tsx` | Composant démo avec `alert()`, jamais importé |
| `packages/ui/src/card.tsx` | Template legacy Turbo, jamais importé |
| `packages/ui/src/code.tsx` | Template legacy, 12 LOC, jamais utilisé |

### 6.4 Autres issues frontend

| Issue | Sévérité | Détail |
|-------|----------|--------|
| **39 uses dangerouslySetInnerHTML** | Basse | JSON-LD uniquement (pas de risque XSS car données contrôlées) |
| **Pas de memoization** | Moyenne | 0 uses de React.memo, useMemo (hors polling). Header et TeamCard pourraient bénéficier |
| **20 inline styles** | Basse | `style={{ minWidth: "140px" }}` → devrait être `className="min-w-[140px]"` |
| **Pas de bundle analyzer** | Basse | Chunk de 219 KB non investigué |
| **Pas de dynamic imports** | Basse | Composants IA lourds chargés statiquement |

### Points forts frontend

- ✅ Boundaries "use client" correctes (4 composants seulement)
- ✅ 12 composants UI partagés avec i18n
- ✅ Polling optimisé (fenêtre tournoi, 30s, cleanup useEffect)
- ✅ Pas de `any` types dans le code source
- ✅ Pas de console.log en production
- ✅ Pas de TODO/FIXME
- ✅ Naming conventions cohérentes

---

## 7. CONTENU & DONNÉES — Risques de qualité

### Critique

| Issue | Détail |
|-------|--------|
| **Odds disclaimer mensonger** | "Cotes en temps réel" alors que c'est calculé depuis l'ELO via `estimatedMatchOdds()`. Écart 10-30% avec les vraies cotes |
| **Pas de pipeline de validation IA** | Les outputs Claude/Gemini ne sont pas validés (structure, bornes, factualité) avant mise en cache 24h |

### Haute

| Issue | Détail |
|-------|--------|
| **Stats joueurs hardcodées** | Buts/sélections figés dans `players.ts`. Mbappé à 55 buts pourrait être à 65 en juin 2026 |
| **Player transfers non trackés** | Si Mbappé change de club avant juin 2026, les pages affichent l'ancien club |
| **Affiliate URLs sont des placeholders** | `url: "https://www.betclic.fr/?utm...#betclic"` — le `#betclic` n'est pas un vrai lien affilié |

### Moyenne

| Issue | Détail |
|-------|--------|
| **H2H data obsolète** | Certaines confrontations datent de 2010 (16 ans). Ex: Afrique du Sud vs Corée du Sud = dernier match 17/06/2010 |
| **Brésil potentiellement surévalué** | ELO 2030 (5ème) malgré 24 ans sans titre de CDM. Recommandé : 1950-1980 |
| **Pas de monitoring erreurs IA** | Si Claude fail 3 jours consécutifs, personne ne le sait. Pas de Sentry/alerting |
| **Budget tokens élevé** | Extended thinking: 4000 tokens par défaut pour Claude. ~$0.10/match × 10 analyses/jour = $30/mois (25% du budget) |
| **Grounding metadata non vérifiée** | Gemini flag "grounded" mais l'orchestrateur ne vérifie pas la qualité des sources citées |
| **Prompt injection via données API** | Les noms de joueurs/blessures de l'API sont interpolés dans les prompts sans sanitization |

### Points forts contenu

- ✅ Pipeline IA 3 tiers bien architecturé (Claude Opus expert, Gemini Flash SEO, GPT-5-mini infra)
- ✅ Cache par langue (clés séparées FR/EN/ES)
- ✅ Fallback gracieux si IA fail (page render avec données statiques)
- ✅ Pages jeu responsable complètes avec numéros d'aide par juridiction
- ✅ Disclaimers "18+. Jouez responsablement" sur les composants AI
- ✅ Données fondamentales correctes (48 équipes, 104 matchs, 12 groupes, dates vérifiées)
- ✅ Modèle ELO raisonnable pour le top 10 (Argentine 2080, France 2065, Espagne 2050)

---

## 8. Inventaire complet des pages existantes

### Pages statiques (hubs) — par app

| Route FR | Route EN | Route ES | Description |
|----------|----------|----------|-------------|
| `/` | `/` | `/` | Homepage |
| `/match/calendrier` | `/match/schedule` | `/match/calendario` | Calendrier 104 matchs |
| `/equipes` | `/teams` | `/equipos` | Liste 48 équipes |
| `/joueurs` | `/players` | `/jugadores` | Liste 210+ joueurs |
| `/stades` | `/stadiums` | `/estadios` | Liste 16 stades |
| `/villes` | `/cities` | `/ciudades` | Liste 12 villes |
| `/buteurs` | `/scorers` | `/goleadores` | Top buteurs potentiels |
| `/guides` | `/guides` | `/guias` | Hub guides paris |
| `/paris-sportifs` | `/betting` | `/apuestas` | Hub bookmakers |
| `/a-propos` | `/about` | `/acerca-de` | À propos |
| `/mentions-legales` | `/legal` | `/aviso-legal` | Mentions légales |
| `/jeu-responsable` | `/responsible-gambling` | `/juego-responsable` | Jeu responsable |
| `/404` | `/404` | `/404` | Page 404 |

### Pages dynamiques — par app

| Type | Route FR | Count | Revalidate | Schema JSON-LD |
|------|----------|-------|------------|----------------|
| **Équipes** | `/equipe/[slug]` | 48 | 3600s | SportsTeam ✅ |
| **Pronostics équipe** | `/pronostic/[slug]` | 48 | 300s | ❌ Manque Review |
| **Groupes** | `/groupe/[lettre]` | 12 | 3600s | SportsEvent ✅ |
| **Matchs** | `/match/[slug]` | 104 | 300s | SportsEvent ✅ |
| **Pronostics match** | `/pronostic-match/[slug]` | 104 | 300s | ❌ Manque BettingOffer |
| **H2H** | `/h2h/[slug]` | 1128 | 300s | ❌ Aucun |
| **Joueurs** | `/joueur/[slug]` | 210+ | 3600s | Person ✅ |
| **Buteurs** | `/buteur/[slug]` | ~100-120 | 3600s | ❌ Manque BettingOffer |
| **Stades** | `/stade/[slug]` | 16 | 86400s | ❌ Manque StadiumOrArena |
| **Villes** | `/ville/[slug]` | 12 | 86400s | ❌ Manque Place |
| **Bookmakers** | `/bookmaker/[slug]` | 5-7 | 86400s | ❌ Manque Review/AggregateRating |
| **Guides** | `/guide/[slug]` | 9 | 86400s | ❌ Manque Article/FAQPage |

**Total par app** : ~1850-1900 pages
**Total 3 apps** : ~5700 pages

---

## 9. Audit SEO détaillé

### 9.1 Sitemap

**Score : 9/10**

- ✅ 3 sitemaps (FR, EN, ES) avec 213-218 URLs chacun
- ✅ `lastModified: new Date("2026-02-12")` réaliste
- ✅ Priorités bien calibrées (1.0 homepage, 0.9 collections, 0.7 H2H)
- ✅ Référencés dans robots.txt
- ⚠️ H2H pages marquées "monthly" mais ne changent quasiment jamais

### 9.2 Robots.txt

**Score : 9.5/10**

```
Allow: /
Disallow: [/api/, /_next/]
Sitemap: {BASE_URL}/sitemap.xml
```

- ✅ API et _next bloqués
- ✅ Sitemap dynamique par domaine

### 9.3 Metadata

**Score : 9/10**

- ✅ `metadataBase` correctement configuré (mondial2026.fr, worldcup2026guide.com, mundial2026.es)
- ✅ Title templates avec séparateur pipe (`%s | CDM 2026`)
- ✅ OpenGraph complet (locale fr_FR/en_US/es_ES, site name)
- ✅ Twitter Cards configurés (@mondial2026, @worldcup2026guide, @mundial2026es)
- ✅ `index: true, follow: true` sur toutes les pages
- ❌ Pas de viewport meta explicit
- ❌ Pas d'apple-touch-icon
- ❌ Pas de theme-color

### 9.4 Titles & Descriptions

**Score : 8.5/10**

**Exemples de titles** :
- Équipe : `${team.name} - Coupe du Monde 2026 | Effectif, Stats & Pronostics` (~75 chars)
- Pronostic : `Pronostic ${team.name} CDM 2026 | Cotes, Prediction & Analyse` (~70 chars)
- Guide : `Comment parier sur la CDM 2026 | Guide complet du parieur` (~60 chars)
- Match : `${home} vs ${away} - ${stage} | CDM 2026`

- ✅ Tous uniques par slug
- ✅ Keyword-rich, commercial intent
- ⚠️ Certains matchs peuvent dépasser 70 chars
- ⚠️ Homepage utilise le title template par défaut

**Descriptions** : 140-170 chars, incluent keywords et CTAs. Quelques-unes concatenent `team.description` (qualité variable).

### 9.5 Hreflang

**Score : 9.5/10**

Implémentation centralisée via `packages/data/src/route-mapping.ts` (142 LOC) :

- ✅ 23 types de routes mappés (equipe/team/equipo, etc.)
- ✅ `getAlternates(type, slug, currentLang)` utilisé dans tous les `generateMetadata`
- ✅ `x-default` pointe vers EN
- ✅ Slugs neutres (team.slug identique dans les 3 langues)

### 9.6 Structured Data

**Score : 7.5/10**

**Implémenté** :
- ✅ BreadcrumbList (toutes les pages détail)
- ✅ Organization (layouts)
- ✅ SportsTeam (pages équipe)
- ✅ SportsEvent (matchs)
- ✅ Person (joueurs)

**Manquant** :
- ❌ FAQPage (guides → featured snippets)
- ❌ Review/AggregateRating (bookmakers → rich snippets étoiles)
- ❌ Article (guides → rich results)
- ❌ StadiumOrArena (stades)
- ❌ Place (villes)
- ❌ BettingOffer (pronostics)

### 9.7 Linking interne

**Score : 8/10**

- ✅ Pages équipe → matchs, joueurs, groupe, pronostics
- ✅ Pages match → équipes, stade, ville, pronostics
- ✅ Pages guide → guides liés, bookmakers
- ✅ Ancres descriptives ("Voir le pronostic →", "Fiche complète →")
- ⚠️ Pas de linking contextuel dans le contenu (seulement sidebar/sections)

---

## 10. Audit UX/UI détaillé

### 10.1 Navigation

**Header** (3 fichiers, FR/EN/ES) :
- ✅ 8 liens de navigation localisés
- ✅ Menu hamburger mobile avec `aria-label` et `aria-expanded`
- ✅ Fermeture au clic sur lien
- ❌ Pas de language switcher
- ❌ Pas de search box
- ❌ Pas de skip-to-content
- ❌ Pas d'indicateur page active

**Footer** (3 fichiers) :
- ✅ 48 liens organisés (6 colonnes)
- ✅ Avertissement jeu responsable avec numéro d'aide
- ✅ Copyright + mentions légales
- ❌ Pas de liens sociaux
- ❌ Pas de newsletter

### 10.2 Design System

**Palette** (globals.css) :
```
primary:     #1a1a2e (bleu foncé)
secondary:   #16213e (bleu plus foncé)
accent:      #e94560 (rouge/rose)
gold:        #f5a623 (or)
field:       #2d6a4f (vert terrain)
field-light: #40916c (vert clair)
Font:        Inter, sans-serif
```

- ✅ Palette professionnelle et cohérente
- ✅ Design identique sur les 3 apps
- ❌ Seulement 6 couleurs custom (pas de neutres explicites)
- ❌ Pas de dark mode
- ❌ Pas de scale typographique documentée

### 10.3 Responsive

- ✅ Approche mobile-first avec breakpoints Tailwind
- ✅ Grids adaptatifs (2-col mobile → 4-col desktop)
- ✅ Hero text scale (text-4xl → md:text-6xl)
- ⚠️ Tables en scroll horizontal uniquement (pas de vue cards mobile)
- ⚠️ Pas de breakpoint `sm:` utilisé extensivement

### 10.4 Accessibilité WCAG

| Critère | Status | Détail |
|---------|--------|--------|
| Color contrast | ⚠️ FAIL | `text-gray-300` sur blanc = 3.8:1 (besoin 4.5:1) |
| Focus indicators | ❌ FAIL | Aucun focus:ring-* sur les composants |
| Skip navigation | ❌ FAIL | Pas de skip link |
| Aria labels | ⚠️ Partiel | Hamburger OK, mais flags emojis sans label |
| Semantic HTML | ✅ PASS | nav, header, main, footer, section, h1-h3 |
| Keyboard nav | ⚠️ FAIL | Focus invisible |
| Touch targets | ✅ PASS | Boutons ≥ 44px, liens adéquats |

### 10.5 Conversion & Affiliation

- ✅ Composant OddsCompare avec disclaimers
- ✅ Pages bookmaker avec ratings
- ❌ Pas de CTA affilié prominent sur homepage
- ❌ Pas de "Get Bonus" / "Parier maintenant" button à côté des bookmakers
- ❌ Parcours homepage → bookmaker pas direct

---

## 11. Audit Backend détaillé

### 11.1 Architecture des packages

```
@repo/data (données statiques)
  ↓
@repo/api (clients API + facteurs)
  ├── Football API (stats équipes, blessures)
  ├── Weather API (météo match day)
  ├── Odds API (cotes bookmakers)
  └── Factors (altitude, travel, venue history)
  ↓
@repo/ai (orchestrateur IA)
  ├── Claude Opus 4.6 (expert: value bets, tactique)
  ├── Gemini Flash (SEO: previews, analyses)
  └── GPT-5-mini (infra: meta, traductions)
  ↓
Apps FR/EN/ES
  ├── API Routes (fetch temps réel)
  └── Pages (render avec données)
```

**Status** : ✅ Architecture saine, pas de dépendances circulaires.

### 11.2 Bugs identifiés

| Bug | Fichier | Sévérité | Fix |
|-----|---------|----------|-----|
| Odds matching `\|\|` au lieu de `&&` | `odds/client.ts:79-83` | CRITIQUE | Changer `\|\|` en `&&` |
| JSON parse non protégé | `football/client.ts:39` | HAUTE | Ajouter try-catch |
| JSON parse non protégé | `odds/client.ts:29` | HAUTE | Ajouter try-catch |
| `data.list` non vérifié avant `.reduce()` | `weather/client.ts:70` | MOYENNE | Ajouter `?.` |
| `uvIndex` toujours 0 | `weather/client.ts:80` | BASSE | Parser UV depuis API |

### 11.3 API Routes

3 apps × 4 routes = 12 fichiers route.ts :
- `api/odds/[matchSlug]/route.ts` — Cache 300s
- `api/weather/[matchSlug]/route.ts` — Cache 3600s
- `api/live/route.ts` — Cache 30s
- `api/team/[slug]/stats/route.ts` — Cache 86400s

**Issues** :
- ❌ Pas de validation d'input (slug non vérifié)
- ❌ Réponses d'erreur inconsistantes (parfois 404, parfois 200 avec message)
- ❌ Pas de CORS explicite
- ✅ Cache headers bien configurés
- ✅ Fallback vers données statiques

### 11.4 Sécurité

| Concern | Sévérité | Status |
|---------|----------|--------|
| Rate limiting | HAUTE | ❌ Non implémenté |
| Input validation | HAUTE | ❌ Non implémenté |
| API keys dans env vars | OK | ✅ .env.local (gitignored) |
| CORS | MOYENNE | ❌ Défaut Next.js |
| Prompt injection | MOYENNE | ⚠️ Données API non sanitisées avant injection dans prompts |

### 11.5 Data Integrity

- ✅ 48 équipes présentes avec groupes corrects
- ✅ 104 matchs avec dates/stades vérifiés
- ✅ API-Football IDs corrigés (session précédente)
- ✅ Pas de slugs dupliqués
- ⚠️ 6 équipes playoff (barrage) avec ID=0 (normal, à mettre à jour mars 2026)
- ⚠️ Pas de validation croisée team↔match↔stadium au démarrage

---

## 12. Audit Frontend détaillé

### 12.1 Composants partagés (`packages/ui/src/`)

| Composant | LOC | Type | i18n | Status |
|-----------|-----|------|------|--------|
| `live-score-bar.tsx` | 196 | Client | ✅ | Polling 30s, fenêtre tournoi |
| `live-match-widget.tsx` | 230 | Client | ✅ | Polling 30s, fenêtre match |
| `ai-expert-insight.tsx` | 267 | Client | ✅ | useState expand/collapse |
| `ai-match-preview.tsx` | 134 | Server | ✅ | Présentationnel pur |
| `weather-widget.tsx` | 56 | Server | ✅ | Léger, emojis météo |
| `odds-compare.tsx` | 68 | Server | ✅ | Table comparaison |
| `injuries-widget.tsx` | 72 | Server | ✅ | Liste blessures |
| `breadcrumb-schema.tsx` | 30 | Server | — | JSON-LD seulement |
| `organization-schema.tsx` | 27 | Server | — | JSON-LD seulement |
| `button.tsx` | 21 | Client | ❌ | **DEAD CODE** (démo alert) |
| `card.tsx` | 28 | Server | ❌ | **DEAD CODE** (template) |
| `code.tsx` | 12 | Server | ❌ | **DEAD CODE** (template) |

### 12.2 Performance

| Métrique | Valeur | Cible |
|----------|--------|-------|
| Bundle JS total | ~490 KB | < 150 KB (gzip) |
| Plus gros chunk | 219 KB | Investigation needed |
| CSS | 31 KB | ✅ OK |
| Client components | 4 | ✅ OK |
| Polling intervals | 2 × 30s | ✅ Optimisé (fenêtre tournoi) |
| Memory leaks | 0 | ✅ Cleanup useEffect corrects |
| Dynamic imports | 0 | ⚠️ À ajouter pour composants IA |

### 12.3 TypeScript

- ❌ Strict mode désactivé
- ✅ Pas de `any` dans le code source
- ✅ Pas de `@ts-ignore`
- ✅ Pas de `console.log` en production
- ✅ Pas de TODO/FIXME

### 12.4 Styling

- ✅ Tailwind 4.1.18 uniquement (pas de CSS-in-JS)
- ✅ Custom theme via `@theme` dans globals.css
- ⚠️ 20 inline styles (`style={{}}`) à convertir en Tailwind
- ❌ Pas de dark mode support

---

## 13. Audit Contenu IA détaillé

### 13.1 Qualité des prompts par tier

**Expert (Claude Opus 4.6)** — Score : 8/10
- ✅ Analyse multi-variables (ELO, H2H, altitude, travel, météo, blessures, cotes, forme)
- ✅ Format JSON structuré obligatoire
- ✅ Extended thinking (budget 4000 tokens)
- ✅ Exige des justifications numériques
- ❌ Pas de guardrails anti-hallucination
- ❌ Pas de disclaimer "prédiction ≠ certitude" dans le prompt

**Factuel (Gemini Flash)** — Score : 7.5/10
- ✅ Google Search grounding activé
- ✅ Instructions par langue (ton journalistique)
- ✅ Vérifie blessures via recherche
- ❌ Grounding metadata non validée après réception
- ❌ Temperature 0.7 (permet créativité/hallucinations)
- ❌ Ne ground pas les stats historiques (seulement blessures)

**Infra (GPT-5-mini)** — Score : 8.5/10
- ✅ Prompts minimaux et précis
- ✅ Limites de caractères (155 chars meta, 125 chars alt)
- ✅ Temperature 0.3 (déterministe)
- ❌ Pas de validation JSON-LD contre schema.org

### 13.2 Vérification données

**ELO Model** (top 5) :
| Équipe | ELO | Jugement |
|--------|-----|----------|
| Argentine | 2080 | ✅ Raisonnable (champion CDM 2022, 3x Copa) |
| France | 2065 | ✅ Raisonnable (finaliste 2022) |
| Espagne | 2050 | ✅ Raisonnable (Euro 2024) |
| Angleterre | 2040 | ✅ Raisonnable |
| Brésil | 2030 | ⚠️ Potentiellement surévalué (24 ans sans CDM) |

**Match spot-check** (Mexico vs Afrique du Sud, 11/06/2026) :
- ✅ Équipes correctes (tirage FIFA déc. 2025)
- ✅ Date correcte (match d'ouverture)
- ✅ Stade correct (Estadio Azteca)
- ✅ Heure correcte (19:00 UTC)

**Player spot-check** (Kylian Mbappé) :
- ✅ Club correct (Real Madrid, jan 2026)
- ✅ Position correcte (FW)
- ⚠️ Buts (55) et sélections (94) possiblement obsolètes pour juin 2026

### 13.3 Jeu responsable

| Élément | FR | EN | ES |
|---------|----|----|-----|
| Page dédiée | ✅ `/jeu-responsable` | ✅ `/responsible-gambling` | ✅ `/juego-responsable` |
| Hotline | ✅ 09 74 75 13 13 | ✅ 1-800-522-4700 | ✅ 900 200 225 |
| Régulateur | ✅ ANJ | ✅ NCPG/BeGambleAware | ✅ DGOJ |
| 18+ dans disclaimers | ✅ | ✅ | ✅ |
| Auto-exclusion | ✅ | ✅ | ✅ |
| ❌ Lien cliquable "aide" dans widgets | Non | Non | Non |
| ❌ Gate d'âge avant contenu paris | Non | Non | Non |

---

## 14. PLAN D'ACTION RECOMMANDÉ

### Semaine 1 — Bugs critiques

| # | Action | Effort |
|---|--------|--------|
| 1 | Fix `\|\|` → `&&` dans odds matching | 5 min |
| 2 | Ajouter `rel="sponsored nofollow"` sur liens affiliés | 30 min |
| 3 | Changer disclaimer odds : "Cotes estimées" | 15 min |
| 4 | Ajouter try-catch JSON parse dans clients API (football, odds, weather) | 1h |
| 5 | Ajouter validation Zod sur outputs IA (orchestrator.ts) | 2h |
| 6 | Supprimer dead code (button.tsx, card.tsx, code.tsx) | 5 min |
| 7 | Activer TypeScript strict mode | 2h (fix errors) |

### Semaine 2 — SEO & Accessibilité

| # | Action | Effort |
|---|--------|--------|
| 8 | Créer language switcher (header, 3 apps) | 2h |
| 9 | Ajouter skip-to-content + focus indicators | 1h |
| 10 | Ajouter schemas manquants (FAQPage guides, Review bookmakers, Article guides) | 3h |
| 11 | Créer page Contact (3 apps) | 1h |
| 12 | Ajouter viewport meta + manifest.json + apple-touch-icon | 1h |
| 13 | Créer error.tsx (3 apps) | 30 min |
| 14 | Fix color contrast (gray-300 → gray-600) | 30 min |
| 15 | Fix SportsTeam schema hardcodé | 15 min |
| 16 | Homepage : exporter metadata explicite | 30 min |

### Semaine 3-4 — Pages manquantes

| # | Action | Effort |
|---|--------|--------|
| 17 | Créer "Matchs du jour" (`/match/today`, 3 apps) | 4h |
| 18 | Créer section FAQ (5-10 pages, 3 apps) | 8h |
| 19 | Créer bracket/arbre à élimination | 8h |
| 20 | Étoffer les guides (5000+ mots chacun) | 16h |
| 21 | Ajouter cookie consent | 2h |
| 22 | Ajouter rate limiting API clients | 3h |
| 23 | Ajouter cache mémoire avec limit + éviction | 2h |

### Mois 2 — Refactoring & Scale

| # | Action | Effort |
|---|--------|--------|
| 24 | Extraire pages partagées dans `/packages/pages/` (réduire 20k LOC) | 20h |
| 25 | Découper pronostic-match (963 LOC → sous-composants) | 4h |
| 26 | Connecter The Odds API pour vraies cotes | 8h |
| 27 | Implémenter search (teams, matchs, joueurs) | 8h |
| 28 | Ajouter monitoring IA (Sentry) | 3h |
| 29 | Section News IA-generated | 16h |
| 30 | Hub comparaison cotes live | 8h |

---

*Fin de l'audit. Document généré le 2026-02-13.*
