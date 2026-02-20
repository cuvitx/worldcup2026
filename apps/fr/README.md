# 🌍 CDM2026.fr — Coupe du Monde 2026

Application web Next.js dédiée à la Coupe du Monde 2026 (USA/Canada/Mexique). Statistiques, pronostics, calendrier interactif, quiz et plus encore.

## 📋 Description

**CDM2026.fr** est l'application officielle francophone pour suivre la Coupe du Monde 2026. Elle propose :

- **104 matchs** avec calendrier complet et export iCal
- **48 équipes** qualifiées avec statistiques détaillées
- **Pronostics interactifs** : grille, simulateur de tableau final
- **Quiz CDM 2026** : testez vos connaissances
- **16 stades** avec cartes Leaflet, météo et altitude
- **Système de badges** : débloquez des récompenses
- **Newsletter Brevo** : notifications avant chaque match
- **PWA compatible** : installation mobile/desktop

## 🚀 Commandes de développement

```bash
# Installation des dépendances
pnpm install

# Lancer le serveur de dev (port 3000)
pnpm dev

# Build de production
pnpm build

# Lancer le serveur de prod après build
pnpm start

# Linter (max 0 warnings)
pnpm lint

# Type-check TypeScript
pnpm check-types

# Tests E2E avec Playwright
pnpm test:e2e
```

## 🔧 Variables d'environnement

Créez un fichier `.env.local` à la racine de `apps/fr/` :

```env
# ── Brevo (ex-Sendinblue) ────────────────────────────────────
# Récupérez votre clé API sur : https://app.brevo.com/settings/keys/api
BREVO_API_KEY=your-brevo-api-key

# ID de la liste Brevo dans laquelle ajouter les inscrits (défaut : 2)
BREVO_LIST_ID=2
```

> 📝 **Note :** Le fichier `.env.example` contient un template complet.

## 📁 Architecture des dossiers

```
apps/fr/
├── app/                    # Routes Next.js App Router
│   ├── api/                # API Routes
│   │   ├── _lib/           # Utilitaires partagés (rate-limit)
│   │   ├── calendar/       # Export iCalendar (.ics)
│   │   ├── live/           # Scores en direct
│   │   ├── newsletter/     # Inscription Brevo
│   │   ├── odds/           # Cotes des bookmakers
│   │   ├── pwa-icon-*/     # Icônes PWA dynamiques
│   │   ├── team/           # Stats d'équipe
│   │   └── weather/        # Météo + impact altitude
│   ├── components/         # Composants globaux (header, footer)
│   ├── actualites/         # Page articles CDM 2026
│   ├── calendrier/         # Calendrier des matchs
│   ├── comparateur-cotes/  # Comparateur de bookmakers
│   ├── comparateur-joueurs/ # Comparateur de joueurs
│   ├── equipe/[slug]/      # Fiche détaillée d'une équipe
│   ├── groupes/            # Phase de groupes (A-L)
│   ├── match/[slug]/       # Fiche détaillée d'un match
│   ├── pronostics/         # Grille de pronostics
│   ├── quiz/               # Quiz CDM 2026
│   ├── simulateur/         # Simulateur de tableau final
│   ├── stade/[slug]/       # Fiche d'un stade (carte + météo)
│   ├── layout.tsx          # Layout racine (metadata, fonts)
│   └── page.tsx            # Page d'accueil
├── lib/                    # Fonctions utilitaires
│   ├── badges.ts           # Système de badges utilisateur
│   └── player-images.ts    # Mapping photos joueurs
├── public/                 # Assets statiques
│   ├── images/             # Images (joueurs, équipes, stades)
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO
├── middleware.ts           # Middleware Next.js (redirections, headers)
├── next.config.js          # Configuration Next.js
└── package.json            # Dépendances et scripts
```

## 🛣️ Routes principales

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/calendrier` | Calendrier complet des 104 matchs |
| `/groupes` | Phase de groupes (A-L) |
| `/equipes` | Liste des 48 équipes qualifiées |
| `/equipe/[slug]` | Fiche détaillée d'une équipe |
| `/match/[slug]` | Fiche détaillée d'un match (pronostics, météo, cotes) |
| `/stade/[slug]` | Fiche d'un stade (carte, météo, altitude) |
| `/simulateur` | Simulateur de tableau final |
| `/pronostics` | Grille de pronostics utilisateur |
| `/quiz` | Quiz de culture CDM 2026 |
| `/comparateur-joueurs` | Comparer stats de 2 joueurs |
| `/comparateur-cotes` | Comparer cotes de plusieurs bookmakers |
| `/newsletter` | Inscription à la newsletter |
| `/api/calendar` | Export iCalendar (.ics) |

## 🎨 Stack technique

- **Framework** : [Next.js 16.1](https://nextjs.org/) (App Router, React Server Components)
- **Styling** : [Tailwind CSS 4.1](https://tailwindcss.com/)
- **Cartes** : [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/)
- **Monorepo** : Turbo + pnpm workspaces
- **Tests** : Playwright (E2E)
- **Type-safety** : TypeScript 5.9
- **Linter** : ESLint 9
- **Newsletter** : [Brevo API](https://www.brevo.com/)

### Packages internes (`@repo/*`)

- `@repo/data` : Données statiques (matchs, équipes, stades, joueurs)
- `@repo/api` : Fonctions API (météo, cotes, scores live)
- `@repo/ui` : Composants UI partagés (Button, Card, Badge, etc.)
- `@repo/utils` : Utilitaires (slugify, date formatting, etc.)
- `@repo/ai` : Fonctions IA (générateur de contenu, descriptions)

## 🌐 Déploiement

L'application est déployée sur **Vercel** avec CD automatique :

- **Production** : [cdm2026.fr](https://www.cdm2026.fr)
- **Preview** : Chaque PR génère une URL preview
- **Deploy Hook** : Trigger manuel via webhook Vercel (voir `TOOLS.md`)

### Trigger deploy manuel

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_WD6DntyHssipXDI4pD8ibdvuKm4f/J27MMsR3hg
```

## 🧪 QA Process

**RÈGLE CRITIQUE : Ne JAMAIS push sans QA visuelle.**

1. Build local : `pnpm build`
2. Serveur de prod : `cd apps/fr && pnpm start -p 3099 &`
3. Screenshots multi-viewport : `bash scripts/visual-qa.sh`
4. Analyse visuelle avec `image` tool (overflow, texte coupé, etc.)
5. Fix éventuels → retour à l'étape 1
6. Commit + push uniquement si tout est clean

## 📚 Documentation

- **JSDoc** : Toutes les fonctions exportées dans `lib/` et `app/api/` sont documentées avec `@param`, `@returns`, `@example`
- **BUNDLE-AUDIT.md** : Analyse de la taille du bundle (généré avec `@next/bundle-analyzer`)
- **Playwright tests** : `/apps/fr/__tests__/`

## 🤝 Contribution

1. Créer une branche feature : `git checkout -b feat/nouvelle-fonctionnalite`
2. Développer + tester localement
3. QA visuelle obligatoire (voir ci-dessus)
4. Commit avec message conventionnel : `feat:`, `fix:`, `docs:`, etc.
5. Ouvrir une PR vers `main`

## 📄 Licence

Propriétaire — © 2026 CDM2026.fr

---

**🎯 Objectif** : Offrir la meilleure expérience possible aux fans de football pour suivre la Coupe du Monde 2026.
