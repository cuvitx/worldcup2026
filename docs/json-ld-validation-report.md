# Rapport de Validation JSON-LD — CDM2026.fr

**Date** : 2026-02-20  
**Auteur** : Léa 🔍 (SEO Technique)  
**Recommandation Hugo** : #14 (Valider les schemas JSON-LD)

---

## 📋 Résumé Exécutif

**Statut global** : ✅ **CONFORME** avec améliorations mineures recommandées

**Pages analysées** :
- ✅ Homepage (`apps/fr/app/page.tsx`)
- ✅ Page Match (`apps/fr/app/pronostic-match/[slug]/page.tsx`)
- ⚠️ Page Équipe (`apps/fr/app/equipe/[slug]/page.tsx`)
- ⚠️ Page Stade (`apps/fr/app/stade/[slug]/page.tsx`)

**Schemas utilisés** :
- WebSite
- SportsEvent
- BreadcrumbList
- StadiumOrArena (nested dans SportsEvent)
- SportsTeam (nested dans SportsEvent)

---

## 1️⃣ Homepage (`/`)

### Schemas Présents

#### 1.1 WebSite
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CDM 2026 - Coupe du Monde",
  "url": "https://cdm2026.fr",
  "description": "Guide complet de la Coupe du Monde 2026 : pronostics, cotes, analyses des 48 équipes.",
  "inLanguage": "fr",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://cdm2026.fr/recherche?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Statut** : ✅ CONFORME

**Champs requis schema.org** :
- ✅ `@context`
- ✅ `@type`
- ✅ `name`
- ✅ `url`

**Champs recommandés** :
- ✅ `description`
- ✅ `inLanguage`
- ✅ `potentialAction` (SearchAction)

**Améliorations possibles** :
- 🔧 Ajouter `publisher` (Organization) pour renforcer l'entité éditeur
- 🔧 Ajouter `author` ou `creator` (si applicable)

#### 1.2 SportsEvent (Coupe du Monde 2026)
```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "Coupe du Monde FIFA 2026",
  "startDate": "2026-06-11",
  "endDate": "2026-07-19",
  "location": { "@type": "Place", "name": "États-Unis, Canada, Mexique" },
  "sport": "Football",
  "description": "Première Coupe du Monde FIFA à 48 équipes. 104 matchs dans 16 stades."
}
```

**Statut** : ✅ CONFORME

**Champs requis** :
- ✅ `@type`
- ✅ `name`
- ✅ `startDate`

**Champs recommandés** :
- ✅ `endDate`
- ✅ `location`
- ✅ `description`
- ✅ `sport`

**Améliorations possibles** :
- 🔧 Ajouter `organizer` (Organization - FIFA)
- 🔧 Enrichir `location` avec des détails d'adresse

---

## 2️⃣ Page Match (`/pronostic-match/[slug]`)

### Schema Présent : MatchStructuredData

**Fichier** : `apps/fr/app/pronostic-match/[slug]/_components/MatchStructuredData.tsx`

```json
{
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "name": "France vs Brésil - Coupe du Monde 2026",
  "eventStatus": "https://schema.org/EventScheduled",
  "startDate": "2026-06-12T21:00:00Z",
  "location": {
    "@type": "StadiumOrArena",
    "name": "MetLife Stadium",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressCountry": "États-Unis"
    }
  },
  "homeTeam": { "@type": "SportsTeam", "name": "France" },
  "awayTeam": { "@type": "SportsTeam", "name": "Brésil" },
  "sport": "Football",
  "description": "Pronostic et cotes pour France vs Brésil, Quarts de finale de la Coupe du Monde 2026."
}
```

**Statut** : ✅ CONFORME

**Champs requis** :
- ✅ `@type`
- ✅ `name`
- ✅ `startDate`

**Champs recommandés** :
- ✅ `eventStatus` (EventScheduled)
- ✅ `location` (StadiumOrArena)
- ✅ `homeTeam` / `awayTeam` (SportsTeam)
- ✅ `sport`
- ✅ `description`

**Améliorations possibles** :
- 🔧 Ajouter `competitor` (array) pour inclure les deux équipes (spec schema.org 2023+)
- 🔧 Ajouter `superEvent` (référence à la Coupe du Monde 2026)
- 🔧 Ajouter `offers` (si cotes/paris sont considérées comme des offres commerciales)

---

## 3️⃣ Page Équipe (`/equipe/[slug]`)

### Schemas Présents

**Utilisé** : `BreadcrumbSchema` seulement (via `@repo/ui/breadcrumb-schema`)

**Statut** : ⚠️ **MANQUE** un schema dédié `SportsTeam`

### Recommandation : Ajouter SportsTeam Schema

```json
{
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  "name": "France",
  "sport": "Football",
  "memberOf": {
    "@type": "SportsOrganization",
    "name": "FIFA"
  },
  "athlete": [
    { "@type": "Person", "name": "Kylian Mbappé" },
    { "@type": "Person", "name": "Antoine Griezmann" }
  ],
  "description": "Équipe de France de football pour la Coupe du Monde 2026."
}
```

**Impact SEO** : Moyen — améliorerait la compréhension de Google des entités équipes.

---

## 4️⃣ Page Stade (`/stade/[slug]`)

### Schemas Présents

**Utilisé** : `BreadcrumbSchema` seulement

**Statut** : ⚠️ **MANQUE** un schema dédié `StadiumOrArena`

### Recommandation : Ajouter StadiumOrArena Schema

```json
{
  "@context": "https://schema.org",
  "@type": "StadiumOrArena",
  "name": "MetLife Stadium",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "East Rutherford",
    "addressRegion": "NJ",
    "addressCountry": "États-Unis"
  },
  "maximumAttendeeCapacity": 82500,
  "description": "Stade emblématique de New York pour la Coupe du Monde 2026.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.8135,
    "longitude": -74.0745
  }
}
```

**Impact SEO** : Moyen — améliorerait la compréhension locale et géographique.

---

## 📊 Synthèse des Conformités

| Page | Schema Présent | Conforme schema.org | Champs requis | Champs recommandés | Recommandation |
|------|----------------|---------------------|---------------|---------------------|----------------|
| Homepage (WebSite) | ✅ | ✅ CONFORME | ✅ 4/4 | ✅ 5/5 | 🔧 Ajouter `publisher` |
| Homepage (SportsEvent) | ✅ | ✅ CONFORME | ✅ 3/3 | ✅ 5/5 | 🔧 Ajouter `organizer` |
| Match | ✅ | ✅ CONFORME | ✅ 3/3 | ✅ 6/6 | 🔧 Ajouter `competitor`, `superEvent` |
| Équipe | ⚠️ BreadcrumbList seulement | ⚠️ PARTIEL | N/A | N/A | ❗ Ajouter schema `SportsTeam` |
| Stade | ⚠️ BreadcrumbList seulement | ⚠️ PARTIEL | N/A | N/A | ❗ Ajouter schema `StadiumOrArena` |

---

## 🛠️ Recommandations d'Amélioration

### Priorité HAUTE

1. **Ajouter schema SportsTeam pour les pages équipes**
   - Fichier : `apps/fr/app/equipe/[slug]/page.tsx`
   - Ajouter un composant `<TeamStructuredData>` similaire à `MatchStructuredData`
   - Inclure : `name`, `sport`, `athlete` (joueurs clés), `memberOf` (FIFA)

2. **Ajouter schema StadiumOrArena pour les pages stades**
   - Fichier : `apps/fr/app/stade/[slug]/page.tsx`
   - Ajouter un composant `<StadiumStructuredData>`
   - Inclure : `name`, `address`, `maximumAttendeeCapacity`, `geo` (coordonnées GPS)

### Priorité MOYENNE

3. **Enrichir MatchStructuredData**
   - Ajouter `competitor` (array de SportsTeam)
   - Ajouter `superEvent` (référence à la CDM 2026)
   - Optionnel : `offers` pour les cotes/paris (si pertinent juridiquement)

4. **Enrichir Homepage WebSite**
   - Ajouter `publisher` : Organization (CDM2026)
   - Optionnel : `sameAs` (profils sociaux)

### Priorité BASSE

5. **Enrichir Homepage SportsEvent**
   - Ajouter `organizer` : Organization (FIFA)
   - Enrichir `location` avec détails d'adresse complets

---

## ✅ Validation Google Rich Results Test

**Méthode de validation recommandée** :
1. Tester chaque URL avec [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Vérifier que les schemas sont détectés sans erreurs
3. Vérifier l'aperçu des rich snippets potentiels

**Exemple de test** :
```bash
# Test homepage
https://search.google.com/test/rich-results?url=https://cdm2026.fr

# Test page match
https://search.google.com/test/rich-results?url=https://cdm2026.fr/pronostic-match/france-bresil-2026-06-12
```

---

## 📝 Conclusion

**Conformité globale** : ✅ **BONNE**

Les schemas existants (WebSite, SportsEvent pour les matchs) sont **conformes à schema.org** et incluent tous les champs requis + la plupart des champs recommandés.

**Points forts** :
- ✅ Schemas bien structurés et valides
- ✅ Champs requis tous présents
- ✅ Utilisation correcte de BreadcrumbList (composant `BreadcrumbSchema`)
- ✅ Nested schemas corrects (StadiumOrArena, SportsTeam dans SportsEvent)

**Points d'amélioration** :
- ⚠️ Manque de schemas dédiés pour les pages Équipe et Stade
- 🔧 Enrichissements possibles (publisher, organizer, competitor)

**Impact SEO estimé des améliorations** : Moyen à élevé pour les pages Équipe/Stade (meilleure indexation sémantique).

---

**Prochaines étapes** :
1. Créer `TeamStructuredData.tsx` component
2. Créer `StadiumStructuredData.tsx` component
3. Intégrer ces composants dans les pages correspondantes
4. Tester avec Google Rich Results Test
5. Monitorer Search Console pour les rich snippets

---

**Léa 🔍** — SEO Technique  
*Recommandation Hugo #14 validée ✅*
