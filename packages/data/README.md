# @repo/data

> Sources de données statiques et types TypeScript pour la Coupe du Monde 2026

## 📦 Installation

```bash
# Ce package est utilisé en interne via le monorepo Turbo
# Il n'est pas publié sur npm
```

## 📁 Structure

```
packages/data/src/
├── teams.ts              # 48 équipes qualifiées
├── groups.ts             # 12 groupes (A-L)
├── matches.ts            # 104 matchs du tournoi
├── stadiums.ts           # 16 stades (USA, Canada, Mexique)
├── cities.ts             # 16 villes hôtes
├── players.ts            # ~1000+ joueurs
├── predictions.ts        # Prédictions ELO par match
├── predictions-2026.ts   # Prédictions spécifiques 2026
├── h2h.ts                # Historiques head-to-head
├── team-history.ts       # Historiques des équipes
├── team-ratings.ts       # Évaluations des équipes
├── scorers.ts            # Meilleurs buteurs historiques
├── news.ts               # Articles de blog/actualités
├── guides.ts             # Guides/tutoriels
├── affiliates.ts         # Bookmakers & liens affiliés
├── country-codes.ts      # Codes pays ISO + drapeaux
├── route-mapping.ts      # Routing i18n (FR/EN/ES)
├── constants.ts          # Constantes globales
├── utils.ts              # Utilitaires
└── types.ts              # Types TypeScript partagés
```

---

## 📚 Exports Principaux

### Équipes (`teams.ts`)

```ts
import { teams, teamsById, teamsBySlug } from "@repo/data/teams";

// Array de toutes les équipes
teams: Team[]

// Lookup par ID
teamsById: Record<string, Team>

// Lookup par slug
teamsBySlug: Record<string, Team>

// Type Team
interface Team {
  id: string;
  slug: string;
  name: string;
  flag: string;
  code: string;
  group: string;
  fifaRanking: number;
  confederation: string;
  description: string;
  isHost: boolean;
  previousTitles?: number;
  bestFinish?: string;
}
```

### Groupes (`groups.ts`)

```ts
import { groups, groupsByLetter } from "@repo/data/groups";

groups: Group[]
groupsByLetter: Record<string, Group>

interface Group {
  letter: string;
  slug: string;
  teams: string[]; // IDs des équipes
}
```

### Matchs (`matches.ts`)

```ts
import { matches, matchesByGroup, matchesByStadium } from "@repo/data/matches";

matches: Match[]
matchesByGroup: Record<string, Match[]>
matchesByStadium: Record<string, Match[]>

interface Match {
  id: string;
  slug: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  homeTeamId: string;
  awayTeamId: string;
  stadiumId: string;
  group?: string;
  matchday?: number;
  stage: "group" | "round-of-32" | "round-of-16" | "quarter" | "semi" | "third-place" | "final";
}
```

### Stades (`stadiums.ts`)

```ts
import { stadiums, stadiumsById, stadiumsBySlug } from "@repo/data/stadiums";

stadiums: Stadium[]
stadiumsById: Record<string, Stadium>
stadiumsBySlug: Record<string, Stadium>

interface Stadium {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  cityId: string;
  capacity: number;
  description: string;
  roofType: "open" | "retractable" | "fixed";
  surface: string;
  opened: number;
}
```

### Villes (`cities.ts`)

```ts
import { cities, citiesById } from "@repo/data/cities";

cities: City[]
citiesById: Record<string, City>

interface City {
  id: string;
  slug: string;
  name: string;
  country: string;
  description: string;
  timezone: string;
}
```

### Joueurs (`players.ts`)

```ts
import { players, playersByTeamId } from "@repo/data/players";

players: Player[]
playersByTeamId: Record<string, Player[]>

interface Player {
  id: string;
  slug: string;
  name: string;
  teamId: string;
  position: "GK" | "DF" | "MF" | "FW";
  number?: number;
  age?: number;
  club?: string;
  caps?: number;
  goals?: number;
}
```

### Prédictions (`predictions.ts`)

```ts
import { matchPredictionByPair, predictionsByTeamId } from "@repo/data/predictions";

// Prédictions par paire d'équipes (e.g., "fra:bra")
matchPredictionByPair: Record<string, MatchPrediction>

// Prédictions globales par équipe
predictionsByTeamId: Record<string, TeamPrediction>

interface MatchPrediction {
  team1Id: string;
  team2Id: string;
  team1WinProb: number;   // 0-100
  drawProb: number;
  team2WinProb: number;
  expectedScore: string;  // e.g., "2-1"
  confidence: number;     // 0-10
}

interface TeamPrediction {
  teamId: string;
  groupWinProb: number;
  qualifyProb: number;
  winTournamentProb: number;
  expectedGroupPosition: number;
  strength: number;       // 0-100
}
```

### Head-to-Head (`h2h.ts`)

```ts
import { h2hByPair } from "@repo/data/h2h";

h2hByPair: Record<string, H2H>

interface H2H {
  team1Id: string;
  team2Id: string;
  totalMatches: number;
  team1Wins: number;
  draws: number;
  team2Wins: number;
  lastMeeting?: {
    date: string;
    score: string;
    competition: string;
  };
}
```

### Affiliés / Bookmakers (`affiliates.ts`)

```ts
import { bookmakers, featuredBookmaker, estimatedMatchOdds } from "@repo/data/affiliates";

bookmakers: Bookmaker[]
featuredBookmaker: Bookmaker

interface Bookmaker {
  id: string;
  name: string;
  logo?: string;
  affiliateLink: string;
  rating: number;
  bonusText?: string;
}

// Fonction utilitaire : calculer cotes estimées à partir de probas
function estimatedMatchOdds(
  team1WinProb: number,
  drawProb: number,
  team2WinProb: number
): { home: number; draw: number; away: number } | null
```

### Routing i18n (`route-mapping.ts`)

```ts
import { domains, routePrefixes, getAlternates } from "@repo/data/route-mapping";

domains: { fr: string; en: string; es: string }
routePrefixes: {
  fr: { team: string; match: string; stadium: string; ... }
  en: { ... }
  es: { ... }
}

// Génère les balises <link rel="alternate"> pour SEO multilingue
function getAlternates(
  type: "team" | "match" | "stadium" | ...,
  slug: string,
  lang: Lang
): Record<string, string>
```

### Constantes (`constants.ts`)

```ts
import {
  DISPLAY_LIMITS,
  stageLabels,
  positionLabels,
  groupPhaseRules
} from "@repo/data/constants";

DISPLAY_LIMITS: {
  UPCOMING_MATCHES_HOME: 6;
  RECENT_ARTICLES: 3;
  RELATED_MATCHES: 6;
  // ...
}

stageLabels: Record<string, string>
positionLabels: Record<string, string>
groupPhaseRules: { topTeamsPerGroup: number; bestThirdPlaces: number }
```

### Types (`types.ts`)

```ts
import type {
  Team,
  Match,
  Stadium,
  City,
  Player,
  Group,
  MatchPrediction,
  TeamPrediction,
  H2H,
  // ...
} from "@repo/data/types";
```

---

## 🎯 Utilisation

### Exemple : Afficher une équipe

```tsx
import { teams, teamsBySlug } from "@repo/data/teams";

export function TeamPage({ slug }: { slug: string }) {
  const team = teamsBySlug[slug];
  
  if (!team) return <div>Équipe non trouvée</div>;
  
  return (
    <div>
      <h1>{team.flag} {team.name}</h1>
      <p>Groupe {team.group} • #{team.fifaRanking} FIFA</p>
      <p>{team.description}</p>
    </div>
  );
}
```

### Exemple : Afficher les matchs d'un groupe

```tsx
import { matchesByGroup } from "@repo/data/matches";
import { teamsById } from "@repo/data/teams";

export function GroupMatches({ groupLetter }: { groupLetter: string }) {
  const matches = matchesByGroup[groupLetter] ?? [];
  
  return (
    <ul>
      {matches.map(match => (
        <li key={match.id}>
          {teamsById[match.homeTeamId]?.name} vs {teamsById[match.awayTeamId]?.name}
          <br />
          {match.date} {match.time}
        </li>
      ))}
    </ul>
  );
}
```

### Exemple : Prédiction d'un match

```tsx
import { matchPredictionByPair } from "@repo/data/predictions";

export function MatchPrediction({ homeId, awayId }: { homeId: string; awayId: string }) {
  const prediction = matchPredictionByPair[`${homeId}:${awayId}`];
  
  if (!prediction) return <div>Pas de prédiction</div>;
  
  return (
    <div>
      <p>Victoire domicile : {prediction.team1WinProb}%</p>
      <p>Match nul : {prediction.drawProb}%</p>
      <p>Victoire extérieur : {prediction.team2WinProb}%</p>
      <p>Score attendu : {prediction.expectedScore}</p>
    </div>
  );
}
```

### Exemple : Historique H2H

```tsx
import { h2hByPair } from "@repo/data/h2h";

export function HeadToHead({ team1Id, team2Id }: { team1Id: string; team2Id: string }) {
  const h2h = h2hByPair[`${team1Id}:${team2Id}`];
  
  if (!h2h) return <div>Pas d'historique</div>;
  
  return (
    <div>
      <p>Total matchs : {h2h.totalMatches}</p>
      <p>Victoires {team1Id} : {h2h.team1Wins}</p>
      <p>Nuls : {h2h.draws}</p>
      <p>Victoires {team2Id} : {h2h.team2Wins}</p>
      
      {h2h.lastMeeting && (
        <p>
          Dernière rencontre : {h2h.lastMeeting.date} ({h2h.lastMeeting.score})
        </p>
      )}
    </div>
  );
}
```

---

## 🔧 Développement

### Ajouter de nouvelles données

1. Créer ou modifier un fichier dans `src/`
2. Exporter les données ET les types
3. Documenter dans ce README
4. Ajouter des tests si applicable (`__tests__/`)

### Conventions de nommage

- **Arrays** : pluriel (e.g., `teams`, `matches`)
- **Lookups** : `{nom}ById`, `{nom}BySlug`, `{nom}By{Champ}`
- **Types** : PascalCase (e.g., `Team`, `Match`)
- **Constantes** : UPPER_SNAKE_CASE

### Tests

```bash
npm run test
```

Les tests se trouvent dans `__tests__/` et utilisent Vitest.

---

## 📊 Statistiques

- **48 équipes** (12 groupes de 4)
- **104 matchs** au total
- **16 stades** (11 USA, 3 Mexique, 2 Canada)
- **~1000+ joueurs**
- **Prédictions ELO** pour tous les matchs
- **Données H2H** historiques

---

## 📄 Licence

Propriétaire — CDM2026 Project
