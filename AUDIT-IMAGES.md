# 🎨 Audit Images — CDM 2026 FR

**Date :** 19 février 2025  
**Auditrice :** Emma 🎨, Designer UX  

---

## 1. Inventaire des images existantes

### `public/images/` — 104 fichiers au total (~13.7 Mo)

| Dossier | Fichiers | Taille | Format |
|---------|----------|--------|--------|
| `flags/` | 42 SVG | 1.1 Mo | SVG ✅ |
| `stadiums/` | 16 JPG | 3.5 Mo | JPG |
| `cities/` | 16 JPG | 2.8 Mo | JPG |
| `players/` | 30 JPG | 6.3 Mo | JPG |
| `og-default.png` | 1 | 67 Ko | PNG |

**Observations taille :**
- Players : 65 Ko → 365 Ko (OK pour next/image qui optimise)
- Stadiums : max 373 Ko (sofi-stadium.jpg) — acceptable
- Pas d'images WebP natives, mais `next/image` convertit à la volée ✅

---

## 2. Pages AVEC images ✅

| Page | Images utilisées | Méthode |
|------|-----------------|---------|
| **Homepage** (`page.tsx`) | Hero background MetLife Stadium | `backgroundImage` CSS ⚠️ (pas next/image) |
| **Équipe** (`equipe/[slug]`) | Drapeau SVG via `next/image` | ✅ `<Image>` correct |
| **Joueur** (`joueur/[slug]`) | Photo joueur via `next/image` (30 joueurs couverts) | ✅ avec fallback emoji |
| **Stade** (`stade/[slug]`) | Hero image stade via `HeroImage` composant | ✅ `next/image` + fallback |
| **Ville** (`ville/[slug]`) | Hero image ville via `HeroImage` composant | ✅ `next/image` + fallback |
| **Stades listing** (`stades/`) | `StadiumImage` composant | ✅ |

---

## 3. Pages SANS images ❌

### 🔴 Critiques (pages à fort trafic)

| Page | Ce qui manque |
|------|--------------|
| **Match** (`match/[slug]`) | ❌ Aucune image ! Drapeaux = emoji Unicode uniquement. Pas de photo stade, pas de bannière |
| **Billets** (`billets/`) | ❌ Aucune image d'ambiance/stade |
| **Paris sportifs** (`paris-sportifs/`) | ❌ Aucune image |
| **Pronostics** (`pronostic/`, `pronostic/[slug]`) | ❌ Aucune image |
| **Buteurs** (`buteurs/`) | ❌ Pas de photos joueurs dans le listing |
| **Buteur** (`buteur/[slug]`) | ❌ Aucune image |
| **Bookmaker** (`bookmaker/[slug]`) | ❌ Pas de logo bookmaker |
| **Actualités** (`actualites/`, `actualites/[slug]`) | ❌ Pas d'images d'illustration |

### 🟡 Secondaires

| Page | Ce qui manque |
|------|--------------|
| **Équipes listing** (`equipes/`) | Pas de drapeaux/écussons dans la liste |
| **Groupes** (`groupes/`, `groupe/[lettre]`) | Drapeaux emoji uniquement |
| **Équipe de France** (`equipe-de-france/`) | Aucune image spécifique |
| **Comparateur joueurs** (`comparateur-joueurs/`) | Pas de photos joueurs |
| **Comparateur cotes** (`comparateur-cotes/`) | Pas de logos bookmakers |
| **H2H** (`h2h/[slug]`) | Pas d'images |
| **Histoire** (`histoire/`) | Aucune image historique |
| **Palmarès** (`palmares/`) | Aucune image |
| **Statistiques** (`statistiques/`) | Aucune image |
| **Quiz** (`quiz/`) | Aucune image |
| **Live** (`live/`) | Aucune image |
| **Guide** (`guide/[slug]`) | Aucune image d'illustration |
| **Guides listing** (`guides/`) | Aucune image |
| **Calendrier** | Aucune image |
| **Newsletter** | Aucune image |
| **Où regarder** | Aucune image (logos chaînes TV manquants) |
| **Villes listing** (`villes/`) | Pas de miniatures villes |

---

## 4. OG Images

| Page | og:image | Status |
|------|----------|--------|
| Layout global | `og-default.png` | ✅ Fallback global |
| Homepage | Configurée | ✅ |
| Équipe/[slug] | Drapeau SVG ou fallback og-default | ✅ |
| Match/[slug] | Configurée | ✅ |
| Stade/[slug] | Photo stade | ✅ |
| Joueur/[slug] | Photo joueur si disponible, sinon fallback | ✅ |
| Ville/[slug] | ❌ **Pas d'openGraph** | ❌ |
| Billets | openGraph présent mais image ? | ⚠️ |
| Guides, actualités, quiz, etc. | openGraph présent (probablement og-default) | ⚠️ |

**Problème majeur :** `ville/[slug]` n'a PAS de metadata openGraph configurée (grep retourne 0).

---

## 5. Problèmes techniques

### ⚠️ Homepage : `backgroundImage` CSS au lieu de `next/image`
```tsx
style={{ backgroundImage: "url('/images/stadiums/metlife-stadium.jpg')" }}
```
→ Pas d'optimisation Next.js, pas de lazy loading, pas de srcset responsive.

### ✅ Pas d'images broken détectées
Les paths (`/images/stadiums/${slug}.jpg`, `/images/cities/${slug}.jpg`, `/images/players/${slug}.jpg`) correspondent aux fichiers existants. Le composant `HeroImage` gère les erreurs avec un fallback emoji.

### ⚠️ Match pages : drapeaux = emoji Unicode
Les pages match utilisent `{home.flag}` (emoji) au lieu des SVG flags disponibles dans `/images/flags/`. C'est incohérent avec les pages équipes qui utilisent les SVG.

---

## 6. Images manquantes critiques — Priorité

### P0 — Impact SEO et UX immédiat

1. **Pages match** : ajouter drapeaux SVG + image stade en header (~100 matchs × 2 drapeaux = 0 fichiers à ajouter, utiliser les existants)
2. **Pages bookmaker** : logos bookmakers (~8-10 logos SVG/PNG à sourcer)
3. **Actualités** : image hero par article (~10-20 images)
4. **Buteurs/buteur** : réutiliser les photos `/images/players/` déjà existantes

### P1 — Amélioration visuelle

5. **Homepage hero** : migrer vers `next/image` pour optimisation
6. **Équipe de France** : image hero spécifique (équipe, Mbappé, etc.)
7. **Groupes/équipes listing** : utiliser les flags SVG existants
8. **Où regarder** : logos chaînes TV (TF1, beIN, etc.)
9. **Pronostics** : images d'ambiance ou icônes

### P2 — Nice to have

10. **Histoire/palmarès** : photos historiques coupes du monde
11. **Quiz** : images illustratives
12. **Guides** : illustrations par guide
13. **Villes listing** : miniatures (réutiliser `/images/cities/`)

---

## 7. Recommandations de sourcing

| Type | Source recommandée | Licence |
|------|-------------------|---------|
| Drapeaux SVG | ✅ Déjà en place (flagcdn style) | Domaine public |
| Photos stades | ✅ Déjà 16/16 couverts | Vérifier attributions |
| Photos villes | ✅ Déjà 16/16 couverts | Voir `attributions.txt` |
| Photos joueurs | Wikimedia Commons (CC-BY-SA) | ✅ 30 déjà là, ~18 manquants pour les 48 équipes |
| Logos bookmakers | Sites officiels (usage éditorial) | Fair use |
| Logos chaînes TV | SVG/PNG officiels | Fair use |
| Écussons fédérations | ⚠️ Droits complexes — utiliser drapeaux SVG à la place | |
| Images historiques | Wikimedia Commons | Domaine public / CC |
| Images ambiance foot | Unsplash / Pexels | Gratuit, libre de droits |
| OG images dynamiques | Next.js `ImageResponse` (og route) | Généré |

---

## 8. Estimation du nombre d'images à ajouter

| Catégorie | Quantité | Effort |
|-----------|----------|--------|
| Logos bookmakers | ~8-10 | Faible — SVG/PNG à télécharger |
| Photos joueurs supplémentaires | ~18 | Moyen — Wikimedia |
| Images articles/actualités | ~10-15 | Moyen — Unsplash/création |
| Logos chaînes TV | ~5-6 | Faible |
| Images ambiance (pronostics, billets, paris) | ~5-8 | Faible — Unsplash |
| Images historiques | ~5-10 | Faible — Wikimedia |
| **TOTAL** | **~50-70 images** | |

### Changements code (0 nouvelles images nécessaires)

- Utiliser les flags SVG existants dans les pages match/groupes/équipes listing
- Réutiliser photos joueurs existantes dans buteurs/comparateur
- Réutiliser photos cities dans villes listing
- Migrer homepage hero vers `next/image`
- Ajouter openGraph à `ville/[slug]`

**→ ~15-20 pages nécessitent des modifications code pour utiliser les assets déjà disponibles.**  
**→ ~50-70 nouvelles images à sourcer/créer pour couvrir tout le site.**

---

*Rapport généré par Emma 🎨 — audit visuel uniquement, aucun code modifié.*
