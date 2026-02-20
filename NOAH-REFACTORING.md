# 🔧 Noah - Refactoring Backend (20 fév 2026)

## ✅ Mission accomplie

### 1️⃣ Rate limiting API newsletter
**Fichier :** `apps/fr/app/api/newsletter/route.ts`
- ✅ Limite réduite de **5 → 3 requêtes/minute** par IP
- Utilise le rate-limiter existant en mémoire (Map)
- Retourne 429 Too Many Requests si dépassé

### 2️⃣ Package @repo/utils créé
**Structure :**
```
packages/utils/
├── package.json          (name: "@repo/utils", exports configurés)
├── tsconfig.json         (extends base, NodeNext moduleResolution)
└── src/
    ├── index.ts          (exports centralisés)
    ├── match-helpers.ts  (getUpcomingMatches, getPastMatches, isMatchLive, formatMatchDate)
    └── team-helpers.ts   (getTeamsByGroup, getTeamBySlug, sortTeamsByRanking, getTopTeams)
```

**Helpers match :**
- `getUpcomingMatches(matches)` — remplace `.filter(m => new Date(...) >= now)`
- `getPastMatches(matches)` — matchs déjà joués
- `isMatchLive(match)` — détection live (±2h autour du kickoff)
- `formatMatchDate(match, locale?)` — formattage i18n

**Helpers team :**
- `getTeamsByGroup(teams, letter)` — filtre par groupe
- `getTeamBySlug(teams, slug)` — recherche par slug
- `sortTeamsByRanking(teams)` — tri par ranking FIFA
- `getTopTeams(teams, limit)` — top N équipes

### 3️⃣ Constantes DISPLAY_LIMITS
**Fichier :** `packages/data/src/constants.ts`
```ts
export const DISPLAY_LIMITS = {
  UPCOMING_MATCHES_HOME: 3,
  TOP_TEAMS: 10,
  RECENT_ARTICLES: 3,
  TOP_SCORERS: 20,
  BOOKMAKERS_PREVIEW: 3,
  TEAM_SCORERS_PREVIEW: 3,
} as const;
```

### 4️⃣ Magic numbers remplacés
**Fichiers modifiés :**
- ✅ `apps/fr/app/page.tsx` — utilise `getUpcomingMatches()` + `DISPLAY_LIMITS`
- ✅ `apps/fr/app/components/UpcomingMatches.tsx` — utilise `getUpcomingMatches()`
- ✅ `apps/fr/app/buteurs/page.tsx` — utilise `DISPLAY_LIMITS.TEAM_SCORERS_PREVIEW`, `BOOKMAKERS_PREVIEW`
- ✅ `apps/fr/app/actualites/[slug]/page.tsx` — utilise `DISPLAY_LIMITS.RECENT_ARTICLES`

**Reste à refactoriser (optionnel) :**
- `apps/fr/app/pronostic-vainqueur/TopFavorites.tsx` (2× `.slice(0, 3)`)
- `apps/fr/app/pronostic-vainqueur/OddsTable.tsx` (`.slice(0, 3)`)
- `apps/fr/app/equipe/[slug]/page.tsx` (`.slice(0, 3)`)
- `apps/fr/app/quiz/supporter/page.tsx` (`.slice(0, 3)`)

## 🧪 Tests
```bash
cd apps/fr && npx tsc --noEmit
# ✅ OK (erreur pré-existante dans __tests__/sitemap.test.ts uniquement)
```

## 📦 Dépendances
- ✅ `@repo/utils` ajouté dans `apps/fr/package.json`
- ✅ `npm install` effectué

## ⚠️ Notes importantes
- ❌ **Pas de commit/push** (comme demandé)
- ❌ **Pas de build** (comme demandé)
- Les patterns dupliqués ont été identifiés avec `grep -rn "\.filter.*new Date"`
- Type-check passe (hors test pré-existant)

## 🎯 Impact
- **Maintenabilité ↑** — code dédupliqué dans helpers réutilisables
- **Lisibilité ↑** — constantes nommées vs magic numbers
- **Sécurité ↑** — rate limiting plus strict (3 req/min)
- **DRY ✓** — pattern `.filter(new Date...)` centralisé

---
**Noah 🔧** — Refactoring backend terminé
