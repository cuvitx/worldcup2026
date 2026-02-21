# @repo/ui

> Collection de composants React réutilisables pour le projet CDM2026

## 📦 Installation

```bash
# Ce package est utilisé en interne via le monorepo Turbo
# Il n'est pas publié sur npm
```

## 📚 Composants Disponibles (40)

### Navigation & Structure

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `Breadcrumb` | Fil d'Ariane avec JSON-LD | `items: BreadcrumbItem[]` |
| `BreadcrumbSchema` | Schema JSON-LD BreadcrumbList | `items, baseUrl` |
| `OrganizationSchema` | Schema JSON-LD Organization | `url, name` |
| `BackToTop` | Bouton "Retour en haut" flottant | — |
| `ThemeToggle` | Toggle dark/light mode | — |
| `Search` | Barre de recherche globale avec fuzzy matching | `lang: "fr" \| "en" \| "es"` |
| `SearchDialog` | Dialogue de recherche (Cmd+K) | `lang, data, onNavigate` |

### Cartes & Listings

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `Card` | Carte générique avec shadow | `padding?: "sm" \| "md" \| "lg"` |
| `MatchCard` | Carte de match avec score/cotes | `slug, homeName, awayName, date, time, odds, status` |
| `TeamCard` | Carte d'équipe (flag, nom, groupe) | `team: Team, compact?: boolean` |
| `GroupCard` | Carte de groupe avec équipes | `group: Group, teams: Team[]` |
| `StatCard` | Carte de statistique (value + label) | `value, label, icon?, color?` |

### Matchs & Pronostics

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `MatchRow` | Ligne de match pour calendrier | `homeFlag, homeName, awayFlag, awayName, time, href` |
| `LiveScoreBar` | Barre de scores en direct (horizontal scroll) | `todaysMatches, matchBasePath, pollInterval?` |
| `LiveMatchWidget` | Widget de match en direct (page match) | `matchDate, matchTime, homeTeam, awayTeam, stadium` |
| `GroupSimulator` | Simulateur de groupe interactif | `teams, matches, locale?` |
| `OddsCompare` | Tableau de comparaison de cotes bookmakers | `odds, homeTeam, awayTeam, locale?` |

### Intelligence Artificielle

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `AiExpertInsight` | Analyse IA avec value bets | `valueBets, matchAnalysis, scorePrediction, keyInsight` |
| `AiMatchPreview` | Preview IA du match | `preview, keyFactors, prediction, bettingAngle, grounded` |

### Statistiques & Visualisations

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `StatBar` | Barre de progression animée | `label, value, maxValue?, color?, size?` |
| `DuelStatBar` | Barre de comparaison gauche/droite | `label, home, away, homeName?, awayName?` |
| `ResponsiveTable` | Tableau adaptatif (table desktop, cards mobile) | `columns, rows` |
| `DataRow` | Ligne clé-valeur pour listes de données | `label, value` |

### Widgets & Infos

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `WeatherWidget` | Widget météo du match | `temperature, condition, humidity, windSpeed` |
| `InjuriesWidget` | Widget des blessures/absences | `homeTeam, awayTeam, homeInjuries, awayInjuries` |
| `Countdown` | Compte à rebours CDM 2026 | — |
| `SocialProof` | Compteurs animés (48 équipes, 104 matchs, etc.) | — |

### Formulaires & Interactions

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `Newsletter` | Formulaire d'inscription newsletter (3 variants) | `variant: "banner" \| "card" \| "footer", locale?, tags?` |
| `NewsletterPopup` | Popup newsletter (trigger scroll/temps) | `delayMs?, scrollPct?` |
| `CookieConsent` | Bandeau RGPD cookies | `lang: "fr" \| "en" \| "es"` |
| `ShareButtons` | Boutons de partage social | `url, text, label?` |

### Sections & Layout

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `HeroSection` | Section hero avec gradient | `title, subtitle?, children?` |
| `SectionHeading` | Titre de section avec lien optionnel | `title, subtitle?, linkHref?, linkLabel?, emoji?` |
| `FAQSection` | Section FAQ avec JSON-LD FAQPage | `title?, items: FAQItem[]` |
| `AuthorBox` | Box auteur/équipe | — |

### Boutons

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `Button` | Bouton HTML `<button>` | `variant?, size?, pill?` |
| `ButtonLink` | Lien `<a>` stylisé en bouton | `href, variant?, size?, pill?` |
| `ButtonAnchor` | Ancre `<a>` générique bouton | `variant?, size?, pill?` |

### Drapeaux

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `Flag` | Emoji de drapeau accessible | `flag, name, className?` |
| `FlagEmoji` | Emoji de drapeau simple | `flag, name, className?` |
| `TeamFlagImage` | Image de drapeau (flagcdn.com) | `countryCode, name, size?` |

### Chargement

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `SkeletonLine` | Ligne skeleton | `className?` |
| `SkeletonCard` | Carte skeleton | `className?` |
| `SkeletonTable` | Tableau skeleton | `rows?, cols?` |
| `SkeletonMatchPreview` | Preview de match skeleton | — |

### Gamification

| Composant | Description | Props principales |
|-----------|-------------|-------------------|
| `BadgeSystem` | Système de badges (Context Provider) | `children` |

---

## 🎨 Utilisation

### Import basique

```tsx
import { MatchCard, TeamCard, Button } from "@repo/ui";

export function MyPage() {
  return (
    <>
      <Button variant="primary" size="lg">
        Voir les matchs
      </Button>
      
      <MatchCard
        slug="france-bresil-2026-06-12"
        homeName="France"
        homeFlag="🇫🇷"
        awayName="Brésil"
        awayFlag="🇧🇷"
        date="2026-06-12"
        time="21:00"
        status="upcoming"
        odds={{ home: "2.10", draw: "3.20", away: "3.50" }}
      />
    </>
  );
}
```

### Composants avec JSON-LD

```tsx
import { BreadcrumbSchema, OrganizationSchema, FAQSection } from "@repo/ui";

export function Page() {
  return (
    <>
      {/* JSON-LD automatique */}
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: "/" },
          { name: "Équipes", url: "/equipes" }
        ]}
        baseUrl="https://www.cdm2026.fr"
      />
      
      <OrganizationSchema
        url="https://www.cdm2026.fr"
        name="CDM2026"
      />
      
      {/* FAQ avec JSON-LD FAQPage intégré */}
      <FAQSection
        items={[
          { question: "Quand ?", answer: "11 juin 2026" },
          { question: "Où ?", answer: "USA, Canada, Mexique" }
        ]}
      />
    </>
  );
}
```

### Newsletter (3 variants)

```tsx
import { Newsletter } from "@repo/ui";

// Variant 1: Banner (full-width hero)
<Newsletter variant="banner" locale="fr" />

// Variant 2: Card (sidebar widget)
<Newsletter variant="card" locale="fr" tags={["alerts-france"]} />

// Variant 3: Footer (minimal inline)
<Newsletter variant="footer" locale="fr" />
```

### Simulateur de Groupe

```tsx
import { GroupSimulator } from "@repo/ui";

<GroupSimulator
  teams={[
    { id: "fra", name: "France", flag: "🇫🇷" },
    { id: "bra", name: "Brésil", flag: "🇧🇷" },
    { id: "ger", name: "Allemagne", flag: "🇩🇪" },
    { id: "arg", name: "Argentine", flag: "🇦🇷" }
  ]}
  matches={[
    { homeId: "fra", awayId: "bra" },
    { homeId: "ger", awayId: "arg" },
    // ... tous les matchs du groupe
  ]}
  locale="fr"
/>
```

---

## 🎨 Design System

### Variants de Boutons

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="cta">CTA</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button pill>Rounded</Button>
```

### Couleurs de StatCard

```tsx
<StatCard value={42} label="Buts" color="primary" />
<StatCard value={65} label="Possession" color="accent" />
<StatCard value="8/10" label="Note" color="secondary" />
```

---

## 🔧 Développement

### Ajouter un nouveau composant

1. Créer `packages/ui/src/my-component.tsx`
2. Ajouter JSDoc avec description, @param, @example
3. Exporter depuis `packages/ui/src/index.ts` (si applicable)
4. Documenter dans ce README

### Règles JSDoc

Tous les composants exportés doivent avoir :
- ✅ JSDoc sur l'interface Props
- ✅ JSDoc sur la fonction/composant exporté
- ✅ Description claire
- ✅ @param pour les props importantes
- ✅ @example avec un snippet JSX

Exemple :

```tsx
/**
 * Props for the MyComponent component.
 * 
 * @param title - Component title
 * @param variant - Visual variant: "primary" | "secondary"
 */
interface MyComponentProps {
  title: string;
  variant?: "primary" | "secondary";
}

/**
 * MyComponent — Short description here.
 * 
 * @example
 * ```tsx
 * <MyComponent title="Hello" variant="primary" />
 * ```
 */
export function MyComponent({ title, variant = "primary" }: MyComponentProps) {
  // ...
}
```

---

## 📄 Licence

Propriétaire — CDM2026 Project
