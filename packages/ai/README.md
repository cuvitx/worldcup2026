# @repo/ai

> Services d'intelligence artificielle pour la génération de contenu (Claude Sonnet 4)

## 📦 Installation

```bash
# Ce package est utilisé en interne via le monorepo Turbo
# Il n'est pas publié sur npm
```

## 📁 Structure

```
packages/ai/src/
├── index.ts            # Point d'entrée principal
├── orchestrator.ts     # Orchestrateur principal des générations IA
├── cache.ts            # Système de cache pour les réponses IA
├── monitoring.ts       # Monitoring des coûts et performances
├── sanitize.ts         # Nettoyage et validation du contenu généré
├── schemas.ts          # Schémas Zod pour validation des prompts/réponses
├── generators/
│   ├── match-preview.ts     # Génération de previews de match
│   ├── team-analysis.ts     # Analyse complète d'une équipe
│   ├── player-profile.ts    # Génération de profils joueurs
│   ├── value-bets.ts        # Détection de value bets
│   └── content-ideas.ts     # Génération d'idées d'articles
├── prompts/
│   ├── match.ts        # Templates de prompts pour matchs
│   ├── team.ts         # Templates de prompts pour équipes
│   └── betting.ts      # Templates de prompts pour paris sportifs
```

---

## 🤖 Modèle IA Utilisé

**Claude Sonnet 4** (Anthropic)
- Modèle : `claude-sonnet-4-20250514`
- Context window : 200K tokens
- Max output : 8K tokens
- Coût : ~$3/1M input tokens, ~$15/1M output tokens

---

## 📚 Générateurs Disponibles

### 1. Match Preview (`match-preview.ts`)

**Fonction** : `generateFullMatchPreview()`

Génère une preview complète d'un match avec :
- Analyse tactique
- Facteurs clés
- Prédiction de score
- Angle de pari recommandé
- Value bets détectés

```ts
import { generateFullMatchPreview } from "@repo/ai/generators";

const preview = await generateFullMatchPreview(
  "france-bresil-2026-06-12",  // Slug du match
  "fr",                         // Langue
  { includeExpert: true }       // Options
);

// Type de retour : MatchPreviewResult
interface MatchPreviewResult {
  preview: string;              // Texte de preview (2-3 paragraphes)
  keyFactors: string[];         // Facteurs décisifs (max 4)
  prediction: string;           // Prédiction textuelle
  bettingAngle: string;         // Angle de pari recommandé
  grounded: boolean;            // Sources vérifiées ?
  expertInsight?: {
    valueBets: ValueBet[];
    matchAnalysis: string;
    scorePrediction: string;
    keyInsight: string;
  };
  metadata: {
    model: string;
    tokensIn: number;
    tokensOut: number;
    durationMs: number;
    cost: number;
  };
}
```

**Exemple d'usage** :

```tsx
// apps/fr/app/pronostic-match/[slug]/page.tsx
export default async function MatchPage({ params }: PageProps) {
  const { slug } = await params;
  
  let enriched: MatchPreviewResult | null = null;
  try {
    enriched = await generateFullMatchPreview(slug, "fr", { 
      includeExpert: true 
    });
  } catch (error) {
    // Fallback to static data
  }
  
  return (
    <div>
      {enriched && (
        <>
          <AiMatchPreview {...enriched} />
          {enriched.expertInsight && (
            <AiExpertInsight {...enriched.expertInsight} />
          )}
        </>
      )}
    </div>
  );
}
```

---

### 2. Team Analysis (`team-analysis.ts`)

**Fonction** : `generateFullTeamAnalysis()`

Génère une analyse complète d'une équipe :
- Historique
- Forces & faiblesses
- Joueurs clés
- Prédiction de parcours
- Facteurs de réussite/échec

```ts
import { generateFullTeamAnalysis } from "@repo/ai/generators";

const analysis = await generateFullTeamAnalysis(
  "fra",  // Team ID
  "fr"    // Langue
);

// Type de retour : TeamAnalysisResult
interface TeamAnalysisResult {
  analysis: string;             // Analyse complète (3-4 paragraphes)
  strengths: string[];          // Forces (max 3)
  weaknesses: string[];         // Faiblesses (max 3)
  keyPlayers: string[];         // Joueurs clés (max 5)
  tournamentPrediction: string; // Prédiction de parcours
  successFactors: string[];     // Facteurs de réussite
  metadata: { /* ... */ };
}
```

---

### 3. Player Profile (`player-profile.ts`)

**Fonction** : `generatePlayerProfile()`

Génère un profil détaillé d'un joueur :
- Biographie
- Style de jeu
- Stats clés
- Projection CDM 2026

```ts
import { generatePlayerProfile } from "@repo/ai/generators";

const profile = await generatePlayerProfile(
  "kylian-mbappe",  // Player slug
  "fr"              // Langue
);
```

---

### 4. Value Bets Detection (`value-bets.ts`)

**Fonction** : `detectValueBets()`

Analyse les cotes et détecte les value bets :
- Comparaison cotes bookmakers vs modèle ELO
- Calcul de l'edge (%)
- Niveau de confiance (0-5)
- Raisonnement détaillé

```ts
import { detectValueBets } from "@repo/ai/generators";

const valueBets = await detectValueBets(
  matchPrediction,  // Prediction ELO
  bookmakerOdds,    // Cotes bookmakers
  "fra",            // Team 1 ID
  "bra"             // Team 2 ID
);

// Type de retour
interface ValueBet {
  market: string;           // "1X2", "Over/Under 2.5", etc.
  selection: string;        // "France Win", "Over 2.5", etc.
  bookmakerOdds: number;    // Cote bookmaker
  modelProbability: number; // Probabilité modèle (0-1)
  edge: number;             // Edge en % (positif = value)
  confidence: number;       // Confiance 0-5
  reasoning: string;        // Raisonnement détaillé
}
```

---

## 🔧 Orchestrateur (`orchestrator.ts`)

**Classe principale** : `AIOrchestrator`

Gère toutes les interactions avec l'API Claude :
- Rate limiting intelligent
- Cache des réponses
- Monitoring des coûts
- Retry automatique
- Validation des réponses

```ts
import { AIOrchestrator } from "@repo/ai/orchestrator";

const orchestrator = new AIOrchestrator({
  model: "claude-sonnet-4-20250514",
  maxTokens: 4096,
  temperature: 0.3,
  cacheEnabled: true,
  cacheTTL: 3600,  // 1 heure
});

const response = await orchestrator.generate({
  prompt: "Analyze the match France vs Brazil...",
  systemPrompt: "You are a football expert...",
  schema: matchPreviewSchema,  // Validation Zod
  lang: "fr"
});
```

**Méthodes** :
- `generate()` - Génération simple avec prompt
- `generateStructured()` - Génération avec validation Zod
- `batch()` - Génération en batch (plusieurs prompts)
- `getCosts()` - Récupérer les coûts totaux
- `clearCache()` - Vider le cache

---

## 💾 Cache (`cache.ts`)

**Système de cache intelligent** pour réduire les coûts API :
- Cache en mémoire (production: Redis recommandé)
- TTL configurable par type de contenu
- Invalidation automatique

```ts
import { AICache } from "@repo/ai/cache";

const cache = new AICache({
  ttl: 3600,        // 1 heure par défaut
  maxSize: 1000     // Max 1000 entrées
});

// Utiliser le cache
const cached = await cache.get("match:fra-bra");
if (!cached) {
  const fresh = await generateContent();
  await cache.set("match:fra-bra", fresh, { ttl: 7200 });
}
```

**Stratégie de cache recommandée** :
- **Match previews** : 24h (mis à jour quotidiennement)
- **Team analyses** : 7 jours (stable pendant le tournoi)
- **Player profiles** : 14 jours
- **Value bets** : 1h (cotes changent fréquemment)

---

## 📊 Monitoring (`monitoring.ts`)

**Suivi des coûts et performances** :

```ts
import { AIMonitor } from "@repo/ai/monitoring";

const monitor = new AIMonitor();

// Logger une génération
monitor.log({
  type: "match-preview",
  tokensIn: 1234,
  tokensOut: 567,
  durationMs: 2340,
  cost: 0.012,
  cached: false
});

// Récupérer les stats
const stats = monitor.getStats();
// {
//   totalCost: 12.45,
//   totalTokensIn: 123456,
//   totalTokensOut: 67890,
//   avgDurationMs: 2100,
//   cacheHitRate: 0.67
// }

// Exporter en CSV (pour reporting)
monitor.exportCSV("ai-usage-2026-02.csv");
```

---

## 🧹 Sanitization (`sanitize.ts`)

**Nettoyage et validation** du contenu généré :

```ts
import { sanitizeAIContent } from "@repo/ai/sanitize";

const raw = await orchestrator.generate({ /* ... */ });
const clean = sanitizeAIContent(raw, {
  removeMarkdown: false,      // Garder le markdown
  maxLength: 2000,            // Limiter la longueur
  allowedFormats: ["bold"],   // Formats autorisés
  stripLinks: false           // Garder les liens
});
```

**Règles de sanitization** :
- ✅ Suppression des balises HTML dangereuses
- ✅ Validation de la longueur
- ✅ Normalisation des formats markdown
- ✅ Détection de contenu sensible (paris pour mineurs, etc.)
- ✅ Ajout automatique de disclaimers légaux

---

## 🔐 Sécurité & Best Practices

### Variables d'environnement

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-...

# Configuration
AI_CACHE_ENABLED=true
AI_CACHE_TTL=3600
AI_MAX_RETRIES=3
AI_TIMEOUT_MS=30000

# Monitoring
AI_COST_ALERT_THRESHOLD=100  # Alert si coût > $100/jour
```

### Quotas & Rate Limiting

**Limites Claude Sonnet 4** :
- Tier 1 (gratuit) : 50 requêtes/min
- Tier 2 (payant) : 1000 requêtes/min

**Stratégie implémentée** :
- Queue avec retry exponentiel
- Circuit breaker après 5 échecs consécutifs
- Fallback vers contenu statique en cas d'erreur

### Coûts Estimés

**Par génération** :
- Match preview : ~$0.01-0.02
- Team analysis : ~$0.02-0.03
- Value bets : ~$0.005-0.01

**Budget mensuel recommandé** :
- 48 équipes × 1 analyse = $0.96
- 104 matchs × 1 preview = $1.04-2.08
- 500 value bets checks = $2.50-5.00
- **Total : ~$5-10/mois** (avec cache optimal)

---

## 📝 Exemples d'Usage Complets

### Route API : Generate Match Preview

```ts
// apps/fr/app/api/ai/match-preview/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateFullMatchPreview } from "@repo/ai/generators";

export async function POST(request: NextRequest) {
  const { matchSlug, lang } = await request.json();

  try {
    const preview = await generateFullMatchPreview(matchSlug, lang, {
      includeExpert: true
    });
    
    return NextResponse.json(preview);
  } catch (error) {
    console.error("[AI] Match preview error:", error);
    return NextResponse.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}

export const maxDuration = 30; // Vercel function timeout
```

### Server Component : SSR avec AI

```tsx
// apps/fr/app/equipe/[slug]/page.tsx
import { generateFullTeamAnalysis } from "@repo/ai/generators";

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const team = teamsBySlug[slug];
  
  let aiAnalysis = null;
  try {
    aiAnalysis = await generateFullTeamAnalysis(team.id, "fr");
  } catch (error) {
    console.warn("AI analysis failed, using static data");
  }
  
  return (
    <div>
      <h1>{team.name}</h1>
      
      {aiAnalysis ? (
        <div>
          <h2>Analyse IA 🤖</h2>
          <p>{aiAnalysis.analysis}</p>
          <h3>Forces</h3>
          <ul>
            {aiAnalysis.strengths.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
      ) : (
        <p>{team.description}</p>
      )}
    </div>
  );
}
```

---

## 🧪 Tests

```bash
npm run test
```

Tests unitaires avec mocks des réponses Claude.

---

## 📄 Licence

Propriétaire — CDM2026 Project
