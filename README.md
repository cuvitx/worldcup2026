# ⚽ CDM2026.fr — Coupe du Monde 2026

**Plateforme multilingue complète pour la Coupe du Monde de football 2026** (USA / Mexique / Canada).

Pronostics, statistiques détaillées, comparaison de cotes, simulateur de tournoi, quiz interactifs, guides des villes et stades, et bien plus encore.

## 🚀 Stack Technique

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React Server Components)
- **React**: 19.2.0 (dernière stable)
- **TypeScript**: 5.9.2 (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (nouvelle architecture CSS-first)
- **Fonts**: Inter (UI) + Space Grotesk (titres, identité Continental 2026)
- **Monorepo**: [Turborepo](https://turbo.build/repo) (build orchestration, cache distribué)
- **AI**: Orchestrateur multi-providers (OpenAI, Anthropic Claude, Google Gemini)
- **APIs externes**: 
  - API-Football (données live & historiques)
  - Weather APIs (conditions météo par stade)
  - Odds APIs (cotes bookmakers en temps réel)
- **Cache**: Upstash Redis (rate limiting & mise en cache API)
- **Déploiement**: [Vercel](https://vercel.com) (edge functions, ISR, analytics)

## 📂 Structure du Monorepo

```
worldcup2026/
├── apps/
│   ├── fr/          # App française (cdm2026.fr) — principale
│   ├── en/          # App anglaise (worldcup2026.com)
│   └── es/          # App espagnole (coppamundial2026.com)
├── packages/
│   ├── ui/          # Composants React partagés (badge system, cards, tables, etc.)
│   ├── data/        # Données statiques (équipes, stades, groupes, historiques, h2h)
│   ├── api/         # Clients API externes (football, weather, odds, cache)
│   ├── ai/          # Orchestrateur IA (prompts, providers, générateurs de contenu)
│   ├── eslint-config/     # Configuration ESLint partagée
│   └── typescript-config/ # tsconfig.json de base
└── scripts/         # Outils dev (QA visuel, data import, etc.)
```

### Applications (`apps/`)

Chaque application Next.js gère une langue et un domaine :

- **`fr/`** (port 3000) : Version française complète avec toutes les features
- **`en/`** (port 3001) : Version anglaise
- **`es/`** (port 3002) : Version espagnole

**Fonctionnalités principales** :
- 📅 Calendrier des 104 matchs (phase de groupes + phases finales)
- 🎯 Simulateur de tournoi interactif
- 📊 Comparateur de joueurs & statistiques détaillées
- 🏆 Pronostics IA pour chaque match (proba + analyse)
- 💰 Comparateur de cotes multi-bookmakers
- 🗺️ Guide des 16 villes & stades hôtes (avec cartes interactives)
- 🧠 Quiz interactifs avec système de badges
- 📰 Actualités & fil live (lors du tournoi)
- 🔍 Recherche globale (équipes, joueurs, stades, guides)

### Packages Partagés

#### `@repo/ui`
Bibliothèque de composants React réutilisables :
- Cards (match, équipe, groupe, stat)
- Tables responsives
- Système de badges gamifiés
- Cookie consent (RGPD)
- Newsletter popup & inline
- Share buttons (social media)
- Flag component (drapeaux SVG optimisés)
- Search dialog (⌘K)
- Back to top, breadcrumb, etc.

#### `@repo/data`
Données statiques TypeScript typées :
- **Équipes** : 48 nations (infos, historique, ratings Elo)
- **Joueurs** : Stats détaillées (buts, passes, trophées)
- **Stades** : 16 stades (capacité, coordonnées GPS, infos pratiques)
- **Villes** : Guides de voyage, météo, attractions
- **Matchs** : Planning complet (dates, horaires, phases)
- **Groupes** : Composition des 12 groupes de 4
- **H2H** : Historique des confrontations entre équipes
- **Pronostics** : Modèles de prédiction (2026 + historiques)
- **FAQ, Guides, Reviews bookmakers**

#### `@repo/api`
Clients API externes avec gestion du cache et rate limiting :
- **Football API** : Données live, classements, compositions
- **Weather API** : Prévisions météo par stade
- **Odds API** : Cotes bookmakers en temps réel
- **Cache Redis** : Stratégies TTL par endpoint

#### `@repo/ai`
Orchestrateur IA multi-providers :
- **Providers** : OpenAI GPT-4, Claude Sonnet, Gemini Pro
- **Générateurs** :
  - Pronostics de matchs (analyse probabiliste)
  - Résumés d'équipes
  - Portraits de joueurs
  - Guides de ville
  - Articles de blog
- **Prompts optimisés** : Contexte spécifique foot, ton éditorial
- **Fallback intelligent** : Rotation en cas de rate limit

## 🛠️ Commandes de Développement

### Installation

```bash
npm install
```

### Développement Local

```bash
# Lancer toutes les apps en parallèle
npm run dev

# Lancer une seule app (ex: française)
npx turbo dev --filter=fr

# Avec cache Turborepo désactivé (debug)
npx turbo dev --filter=fr --force
```

Les apps tournent sur :
- 🇫🇷 **FR** : http://localhost:3000
- 🇬🇧 **EN** : http://localhost:3001
- 🇪🇸 **ES** : http://localhost:3002

### Build Production

```bash
# Build toutes les apps
npm run build

# Build une seule app
npx turbo build --filter=fr

# Analyser le bundle
npm run analyze
```

### Tests & Qualité

```bash
# Linting (ESLint)
npm run lint

# Type-checking (TypeScript)
npm run check-types

# Type-check une seule app
cd apps/fr && npx tsc --noEmit

# Formatting (Prettier)
npm run format
```

### QA Visuel (Avant Push)

**⚠️ Règle stricte : Ne JAMAIS push sans QA visuelle !**

```bash
# 1. Build l'app
npx turbo build --filter=fr

# 2. Lancer en mode production local
cd apps/fr && npx next start -p 3099 &

# 3. Générer les screenshots (4 viewports × 10 pages critiques)
bash scripts/visual-qa.sh

# 4. Analyser les screenshots (outils visuels ou OpenClaw image tool)
# Vérifier : overflow, texte coupé, layout cassé, responsive

# 5. Si OK → commit + push
```

Viewports testés :
- 📱 **Mobile** : 375px (iPhone SE)
- 📱 **Tablet** : 768px (iPad)
- 💻 **Laptop** : 1280px (MacBook)
- 🖥️ **Desktop** : 1920px (Full HD)

Pages critiques :
- Home, Simulateur, Groupes, Match, Équipe, Quiz, Calendrier, Comparateur, Stade, Classement

## 📦 Sources de Données

### Données Statiques (Packages)
- **Équipes & Joueurs** : Compilées manuellement depuis FIFA, Transfermarkt, Wikipédia
- **Stades & Villes** : Informations officielles FIFA + recherches locales
- **Historique h2h** : Archives FIFA World Cup 1930–2022

### APIs Externes
- **API-Football** : Données live, compos, classements (tier gratuit limité)
- **Open-Meteo** : Prévisions météo (gratuit, pas de clé nécessaire)
- **The Odds API** : Cotes bookmakers (freemium, 500 req/mois)

### IA & Contenu Généré
- **Pronostics** : Modèles Elo + IA (Claude Sonnet 4.5)
- **Guides & Portraits** : Génération semi-automatique (review humaine)

## 🚀 Déploiement

### Vercel (Production)

Chaque app est déployée sur un domaine dédié :
- 🇫🇷 **cdm2026.fr** → `apps/fr`
- 🇬🇧 **worldcup2026.com** → `apps/en` (prévu)
- 🇪🇸 **coppamundial2026.com** → `apps/es` (prévu)

**Déploiement automatique** :
- Push sur `main` → Deploy auto via webhook Vercel
- Preview deployments sur chaque PR

**Configuration Vercel** :
- Framework Preset: **Next.js**
- Root Directory: `apps/fr` (ou `apps/en`, `apps/es`)
- Build Command: `npx turbo build --filter=fr`
- Output Directory: `.next`
- Node.js Version: **22.x**

### Variables d'Environnement

Définir dans Vercel (Settings → Environment Variables) :

```bash
# APIs externes
NEXT_PUBLIC_API_FOOTBALL_KEY=xxx
NEXT_PUBLIC_ODDS_API_KEY=xxx

# IA
OPENAI_API_KEY=xxx
ANTHROPIC_API_KEY=xxx
GOOGLE_GENAI_API_KEY=xxx

# Cache Redis (Upstash)
UPSTASH_REDIS_REST_URL=xxx
UPSTASH_REDIS_REST_TOKEN=xxx

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Deploy Manuel (Hook)

Si le webhook GitHub → Vercel est cassé :

```bash
# Trigger deploy via hook URL (voir TOOLS.md pour l'URL)
curl -X POST https://api.vercel.com/v1/integrations/deploy/...
```

## 🔒 Sécurité & Performance

### XSS & Injection
- ❌ **Pas de `dangerouslySetInnerHTML`** (sauf HTML sanitizé via DOMPurify)
- ✅ Client components pour les interactions JS (useEffect, onClick)
- ✅ Validation Zod sur tous les inputs API

### Performance
- **ISR (Incremental Static Regeneration)** : Revalidate toutes les 3600s (données match)
- **Static Generation** : Pages équipes, stades, guides (build time)
- **Image Optimization** : Next.js Image (WebP, lazy loading, responsive)
- **Bundle Splitting** : Route-based code splitting automatique
- **Tailwind v4** : CSS minifié, purge des classes inutilisées

### SEO
- **Metadata dynamique** : OpenGraph, Twitter Cards, JSON-LD
- **Sitemap XML** : Généré automatiquement (`/sitemap.xml`)
- **RSS Feed** : Actualités (`/feed.xml`)
- **Robots.txt** : Indexation contrôlée
- **Alternates hreflang** : FR ↔ EN ↔ ES

## 🧪 Tests

```bash
# Tests unitaires (Vitest)
npx vitest run

# Tests avec coverage
npx vitest run --coverage

# Watch mode (dev)
npx vitest
```

Structure tests :
```
apps/fr/__tests__/
├── components/    # Tests composants
├── lib/          # Tests utilitaires
└── api/          # Tests routes API
```

## 📝 Conventions & Style Guide

### TypeScript
- **Strict mode** activé
- Pas de `any` (utiliser `unknown` si besoin)
- Interfaces pour les props React
- Types pour les retours de fonction

### Composants React
- **Server Components par défaut** (sauf interaction)
- `"use client"` seulement si nécessaire (hooks, event handlers)
- Props typées avec interfaces
- Nommage PascalCase (fichiers .tsx)

### CSS / Tailwind
- Classes utilitaires uniquement (pas de CSS custom sauf globals.css)
- Mobile-first responsive (`sm:`, `md:`, `lg:`)
- Dark mode via `dark:` prefix
- Variables CSS pour couleurs brand (`--color-primary`, etc.)

### Git Workflow
- **Branches** : `feature/nom-feature`, `fix/bug-description`
- **Commits** : Conventional Commits (`feat:`, `fix:`, `docs:`, `style:`, `refactor:`)
- **PR** : Obligatoire avant merge sur `main` (review + CI pass)

## 🤝 Contribution

1. **Fork** le repo
2. Créer une branche : `git checkout -b feature/ma-fonctionnalite`
3. Coder + tester (QA visuel obligatoire)
4. Commit : `git commit -m "feat: ajout du comparateur d'équipes"`
5. Push : `git push origin feature/ma-fonctionnalite`
6. Créer une **Pull Request**

## 📄 Licence

Propriétaire. Usage commercial interdit sans autorisation.

## 👤 Auteur

**Xavier** — [WooDash](https://woodash-production.up.railway.app/)

---

**🏆 Coupe du Monde 2026 — Du 11 juin au 19 juillet 2026**  
*104 matchs · 48 équipes · 16 villes · 3 pays hôtes*
