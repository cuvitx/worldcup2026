# @repo/api

> Services API et clients HTTP pour les données en temps réel (scores live, météo, etc.)

## 📦 Installation

```bash
# Ce package est utilisé en interne via le monorepo Turbo
# Il n'est pas publié sur npm
```

## 📁 Structure

```
packages/api/src/
├── index.ts           # Point d'entrée principal
├── config.ts          # Configuration centralisée (clés API, endpoints)
├── cache.ts           # Système de cache en mémoire
├── rate-limiter.ts    # Limiteur de débit pour APIs externes
├── validation.ts      # Schémas de validation Zod
├── services/
│   ├── api-football.ts  # Client API-Football (scores live)
│   ├── weather.ts       # Client OpenWeatherMap (météo)
│   └── newsletter.ts    # Client Brevo (ex-Sendinblue)
```

---

## 📚 Services Disponibles

### 1. API-Football (Scores Live)

**Client** : `ApiFootballService`

```ts
import { ApiFootballService } from "@repo/api";

const apiFootball = new ApiFootballService({
  apiKey: process.env.API_FOOTBALL_KEY,
  baseURL: "https://v3.football.api-sports.io"
});

// Récupérer les matchs en direct du jour
const liveMatches = await apiFootball.getLiveMatches();

// Récupérer un match spécifique
const match = await apiFootball.getMatchDetails(fixtureId);

// Récupérer les blessures d'une équipe
const injuries = await apiFootball.getTeamInjuries(teamId);
```

**Types de retour** :

```ts
interface LiveMatch {
  fixture: {
    id: number;
    date: string;
    status: {
      short: string; // "1H", "2H", "HT", "FT", etc.
      elapsed: number | null;
    };
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  events?: MatchEvent[];
}

interface MatchEvent {
  time: { elapsed: number; extra: number | null };
  team: { name: string };
  player: { name: string };
  type: "Goal" | "Card" | "subst";
  detail: string;
}
```

**Configuration** :

```ts
// .env
API_FOOTBALL_KEY=your_api_key_here
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io
```

**Rate Limiting** :
- Free tier : 100 requêtes/jour
- Le rate limiter intégré gère automatiquement les quotas

---

### 2. OpenWeatherMap (Météo)

**Client** : `WeatherService`

```ts
import { WeatherService } from "@repo/api";

const weather = new WeatherService({
  apiKey: process.env.OPENWEATHER_API_KEY
});

// Récupérer la météo par coordonnées GPS
const forecast = await weather.getWeatherByCoords(40.8135, -74.0745);

// Récupérer la météo par nom de ville
const cityWeather = await weather.getWeatherByCity("New York");
```

**Type de retour** :

```ts
interface WeatherData {
  temp: number;          // Température en Celsius
  condition: string;     // "Clear", "Clouds", "Rain", etc.
  humidity: number;      // Humidité en %
  windSpeed: number;     // Vitesse du vent en km/h
  pressure: number;      // Pression en hPa
  icon: string;          // Code icône OpenWeather
}
```

**Configuration** :

```ts
// .env
OPENWEATHER_API_KEY=your_api_key_here
```

---

### 3. Brevo (Newsletter)

**Client** : `BrevoService`

```ts
import { BrevoService } from "@repo/api";

const brevo = new Brevo Service({
  apiKey: process.env.BREVO_API_KEY,
  listId: parseInt(process.env.BREVO_LIST_ID ?? "0")
});

// Ajouter un contact à la newsletter
await brevo.addContact({
  email: "user@example.com",
  attributes: { FIRSTNAME: "John" },
  listIds: [2]
});

// Supprimer un contact
await brevo.deleteContact("user@example.com");

// Vérifier si un email existe
const exists = await brevo.emailExists("user@example.com");
```

**Configuration** :

```ts
// .env
BREVO_API_KEY=your_api_key_here
BREVO_LIST_ID=2  # ID de la liste "CDM2026 Newsletter"
```

---

## 🛠️ Utilitaires

### Cache

**Système de cache en mémoire** pour éviter les appels API répétés.

```ts
import { cache } from "@repo/api/cache";

// Utiliser le cache
const cachedData = await cache.wrap(
  "weather:new-york",      // Clé de cache
  async () => {            // Fonction à cache
    return await fetch("...");
  },
  { ttl: 60 * 60 * 1000 }  // TTL 1 heure
);

// Invalider le cache
cache.del("weather:new-york");

// Vider tout le cache
cache.flushAll();
```

### Rate Limiter

**Limiteur de débit** pour respecter les quotas des APIs externes.

```ts
import { RateLimiter } from "@repo/api/rate-limiter";

const limiter = new RateLimiter({
  maxRequests: 100,        // 100 requêtes max
  windowMs: 24 * 60 * 60 * 1000  // Par 24h
});

// Vérifier avant d'appeler l'API
if (limiter.tryAcquire()) {
  await apiCall();
} else {
  throw new Error("Rate limit exceeded");
}
```

### Validation

**Schémas Zod** pour valider les données entrantes/sortantes.

```ts
import { liveMatchSchema, weatherSchema } from "@repo/api/validation";

// Valider une réponse API-Football
const validatedMatch = liveMatchSchema.parse(rawApiResponse);

// Valider une réponse météo
const validatedWeather = weatherSchema.parse(rawWeatherData);
```

---

## 🔧 Configuration

### Variables d'environnement requises

```bash
# API-Football (scores live)
API_FOOTBALL_KEY=your_key_here
API_FOOTBALL_BASE_URL=https://v3.football.api-sports.io

# OpenWeatherMap (météo)
OPENWEATHER_API_KEY=your_key_here

# Brevo (newsletter)
BREVO_API_KEY=your_key_here
BREVO_LIST_ID=2

# Optionnel : Rate limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=86400000
```

---

## 📊 Exemple d'Usage Complet

### Route API Next.js : `/api/live`

```ts
// apps/fr/app/api/live/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ApiFootballService } from "@repo/api";

export async function GET(request: NextRequest) {
  const apiFootball = new ApiFootballService({
    apiKey: process.env.API_FOOTBALL_KEY!
  });

  try {
    const liveMatches = await apiFootball.getLiveMatches();
    return NextResponse.json(liveMatches);
  } catch (error) {
    console.error("[API] Live matches error:", error);
    return NextResponse.json({ error: "Failed to fetch live matches" }, { status: 500 });
  }
}

export const revalidate = 30; // Cache 30s
```

### Route API Next.js : `/api/weather`

```ts
// apps/fr/app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";
import { WeatherService } from "@repo/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json({ error: "City required" }, { status: 400 });
  }

  const weather = new WeatherService({
    apiKey: process.env.OPENWEATHER_API_KEY!
  });

  try {
    const data = await weather.getWeatherByCity(city);
    return NextResponse.json(data);
  } catch (error) {
    console.error("[API] Weather error:", error);
    return NextResponse.json({ error: "Failed to fetch weather" }, { status: 500 });
  }
}

export const revalidate = 3600; // Cache 1h
```

### Route API Next.js : `/api/newsletter`

```ts
// apps/fr/app/api/newsletter/route.ts
import { NextRequest, NextResponse } from "next/server";
import { BrevoService } from "@repo/api";

export async function POST(request: NextRequest) {
  const { email, tags } = await request.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const brevo = new BrevoService({
    apiKey: process.env.BREVO_API_KEY!,
    listId: parseInt(process.env.BREVO_LIST_ID ?? "0")
  });

  try {
    // Vérifier doublon
    const exists = await brevo.emailExists(email);
    if (exists) {
      return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
    }

    await brevo.addContact({ email, listIds: [2], tags });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] Newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
```

---

## 🔐 Sécurité

- ✅ **Clés API** stockées dans `.env` (jamais commit)
- ✅ **Rate limiting** activé par défaut
- ✅ **Validation Zod** sur toutes les entrées/sorties
- ✅ **Cache** pour réduire les appels externes
- ✅ **Error handling** avec logs structurés

---

## 🧪 Tests

```bash
npm run test
```

Tests unitaires des services API avec mocks.

---

## 📄 Licence

Propriétaire — CDM2026 Project
