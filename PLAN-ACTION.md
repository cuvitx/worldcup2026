# 🏆 PLAN D'ACTION MAÎTRE — mondial2026.fr

**Version** : 1.0  
**Date** : 18 février 2026  
**Auteur** : Max (IA) pour Xavier  
**Statut** : Document de référence — DÉFINITIF  
**Total tâches** : 112 tâches | ~380h estimées | Février → Juillet 2026

---

## TABLE DES MATIÈRES

1. [Vision & Positionnement](#1-vision--positionnement)
2. [Phase 0 — Bugs critiques & Quick Wins](#2-phase-0--bugs-critiques--quick-wins-semaine-1)
3. [Phase 1 — Fondations](#3-phase-1--fondations-semaines-2-3)
4. [Phase 2 — Contenu](#4-phase-2--contenu-semaines-3-6)
5. [Phase 3 — Features Engagement](#5-phase-3--features-engagement-semaines-4-8)
6. [Phase 4 — Homepage & UX Redesign](#6-phase-4--homepage--ux-redesign-semaines-5-8)
7. [Phase 5 — Monétisation](#7-phase-5--monétisation-semaines-6-10)
8. [Phase 6 — Live & Tournoi](#8-phase-6--live--tournoi-semaines-10-16)
9. [Phase 7 — Growth & Backlinks](#9-phase-7--growth--backlinks-continu)
10. [Planning Gantt](#10-planning-gantt)
11. [Métriques de Succès](#11-métriques-de-succès)
12. [Budget & Ressources](#12-budget--ressources)

---

# 1. VISION & POSITIONNEMENT

## Résumé

mondial2026.fr se positionne comme **le FiveThirtyEight de la Coupe du Monde 2026, en français, avec l'âme éditoriale de So Foot et l'UX de Sofascore**. C'est le seul site francophone 100% dédié à la CDM 2026 combinant prédictions IA data-driven (modèle ELO + Claude/Gemini/GPT), contenu éditorial de qualité, et engagement gamifié (simulateur bracket, pronostics communautaires, quiz). Le marché est grand ouvert : FiveThirtyEight est mort, L'Équipe est derrière un paywall, Flashscore ne fait que des scores, Pronostics.fr est en erreur, Sport.fr est en 404.

## Proposition de valeur unique

> **Le seul site en français qui combine prédictions IA transparentes + contenu éditorial riche + outils interactifs (simulateur, quiz, pronostics communautaires) + paris sportifs contextualisés — le tout dédié à 100% à la Coupe du Monde 2026.**

## Cibles utilisateurs

| Profil | Part estimée | Besoin principal | Pages clés |
|--------|-------------|-----------------|------------|
| 🎰 Parieur régulier | 40% | Cotes, pronostics fiables, bonus | Pronostic-match, guides, bookmakers |
| ⚽ Fan de foot curieux | 30% | Calendrier, équipes, résultats | Équipes, matchs, bracket, joueurs |
| ✈️ Touriste/voyageur | 15% | Infos stades, villes, billets | Stades, villes, guides voyage |
| 🎮 Pronostiqueur social | 15% | Simulation, compétition amis | Simulateur, quiz, classements |

---

# 2. PHASE 0 — BUGS CRITIQUES & QUICK WINS (Semaine 1)

> **Objectif** : Corriger les bugs critiques et récolter les quick wins à fort impact/faible effort.  
> **Temps estimé** : 14h | **Responsable** : Max (IA) pour 90%

### P0-001 — Fix bug critique odds matching (`||` → `&&`)
- **Priorité** : P0 (critique)
- **Description** : Le filtre de matching des cotes utilise `||` au lieu de `&&` aux lignes 79-83, ce qui affiche les cotes du mauvais match. Remplacer `||` par `&&` dans la condition de filtrage.
- **Fichiers** : `packages/api/src/odds/client.ts` (lignes 79-83)
- **Estimation** : 5 min
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-002 — Ajouter validation Zod sur outputs IA
- **Priorité** : P0 (critique)
- **Description** : Les outputs IA ne sont pas validés — hallucinations cachées pendant 24h (durée du cache). Intégrer les schemas Zod existants (`packages/ai/src/schemas.ts`) dans l'orchestrateur. En cas d'échec de validation, fallback sur données statiques.
- **Fichiers** : `packages/ai/src/orchestrator.ts`, `packages/ai/src/schemas.ts`
- **Estimation** : 3h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-003 — Corriger les accents manquants dans tout le contenu
- **Priorité** : P0 (critique) — impact SEO + crédibilité
- **Description** : Remplacer systématiquement "equipe"→"équipe", "premiere"→"première", "etats-Unis"→"États-Unis", "decouvrez"→"découvrez" etc. dans les fichiers data et templates. Faire un grep global et corriger chaque occurrence.
- **Fichiers** : `packages/data/src/*.ts` (tous les fichiers data), `apps/fr/app/**/*.tsx` (templates)
- **Estimation** : 2h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-004 — Protéger JSON parse dans clients API
- **Priorité** : P1 (haute)
- **Description** : Les `JSON.parse()` dans les clients API ne sont pas dans des try/catch. Ajouter un wrapper safe avec fallback null et logging d'erreur.
- **Fichiers** : `packages/api/src/football/client.ts`, `packages/api/src/odds/client.ts`
- **Estimation** : 30 min
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-005 — Fixer le cache mémoire sans limite (risque OOM)
- **Priorité** : P1 (haute)
- **Description** : Le cache IA en mémoire n'a ni limite de taille ni éviction → crash Vercel. Implémenter un LRU cache avec max 100 entrées et TTL de 1h.
- **Fichiers** : `packages/ai/src/cache.ts`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-006 — Enforcer le rate limiting API
- **Priorité** : P1 (haute)
- **Description** : Le rate limiting est documenté dans `config.ts` mais pas appliqué dans les clients. Intégrer le middleware rate limiter dans chaque client API.
- **Fichiers** : `packages/api/src/config.ts`, `packages/api/src/football/client.ts`, `packages/api/src/odds/client.ts`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-007 — Fixer prompt injection dans les prompts IA
- **Priorité** : P1 (haute)
- **Description** : Les noms de joueurs sont interpolés directement dans les prompts IA. Sanitiser les inputs (échapper les caractères spéciaux, limiter la longueur) avant interpolation.
- **Fichiers** : `packages/ai/src/prompts/*.ts`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-008 — Remplacer `dangerouslySetInnerHTML` pour l'analyse IA
- **Priorité** : P1 (haute)
- **Description** : L'analyse IA est rendue via `dangerouslySetInnerHTML` sur la page équipe. Utiliser un parser markdown sécurisé (remark/rehype) ou sanitiser avec DOMPurify.
- **Fichiers** : `apps/fr/app/equipe/[slug]/page.tsx`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-009 — Ajouter CTA bookmaker sur la homepage
- **Priorité** : P1 (haute) — quick win monétisation
- **Description** : Ajouter une section "Meilleur bonus du moment" après la section Hero avec le bookmaker featured, montant du bonus, et CTA. Reprendre le style des CTA existants dans les pages pronostic.
- **Fichiers** : `apps/fr/app/page.tsx`, `packages/data/src/affiliates.ts`
- **Estimation** : 1.5h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-010 — Ajouter countdown sur la homepage
- **Priorité** : P1 (haute) — quick win engagement
- **Description** : Composant client "Countdown" affichant J-XX H-XX M-XX avant le match d'ouverture (11 juin 2026). Placement entre le Hero et les Stats clés.
- **Fichiers** : `apps/fr/app/page.tsx`, `apps/fr/app/components/Countdown.tsx` (nouveau)
- **Estimation** : 1.5h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-011 — Ajouter indicateur de page active dans la navigation
- **Priorité** : P2 (moyenne)
- **Description** : Le Header ne montre pas quelle section est active. Ajouter un style `aria-current="page"` + underline/couleur sur le lien actif via `usePathname()`.
- **Fichiers** : `apps/fr/app/components/Header.tsx`
- **Estimation** : 30 min
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-012 — Fixer le contraste couleur text-gray-300
- **Priorité** : P2 (moyenne) — accessibilité WCAG AA
- **Description** : `text-gray-300` sur fond blanc = 3.8:1 (< 4.5:1 WCAG AA). Remplacer par `text-gray-500` (6:1) dans les paragraphes concernés.
- **Fichiers** : Grep global `text-gray-300` dans `apps/fr/`
- **Estimation** : 30 min
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P0-013 — Ajouter aria-labels sur les emojis drapeaux
- **Priorité** : P2 (moyenne) — accessibilité
- **Description** : Les emojis drapeaux ne sont pas accessibles (screen reader lit "Regional Indicator Symbol"). Ajouter `<span role="img" aria-label="Drapeau France">🇫🇷</span>` partout.
- **Fichiers** : `apps/fr/app/equipe/`, `apps/fr/app/groupe/`, composants team cards
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

---

# 3. PHASE 1 — FONDATIONS (Semaines 2-3)

> **Objectif** : Base technique solide pour tout le développement futur.  
> **Temps estimé** : 24h | **Responsable** : Mix Max/Xavier

### P1-001 — Déploiement Vercel + domaine mondial2026.fr
- **Priorité** : P0 (critique)
- **Description** : Configurer le projet sur Vercel, connecter le domaine mondial2026.fr, configurer les variables d'environnement (clés API IA, football, odds), activer les preview deployments. Vérifier que ISR fonctionne correctement.
- **Fichiers** : `vercel.json` (nouveau), `.env.production` (nouveau), `apps/fr/next.config.ts`
- **Estimation** : 3h
- **Dépendances** : Aucune
- **Exécutant** : 👤 Xavier (compte Vercel) + 🤖 Max (config)

### P1-002 — Activer TypeScript strict mode
- **Priorité** : P1 (haute)
- **Description** : Activer `"strict": true` dans la config TypeScript partagée. Corriger les erreurs résultantes (estimé ~30-50 erreurs principalement de types optionnels).
- **Fichiers** : `packages/typescript-config/base.json`, puis fix dans les fichiers signalés
- **Estimation** : 3h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P1-003 — Déduplication composants prediction/pronostic-match
- **Priorité** : P1 (haute)
- **Description** : Les 8 composants dans `apps/fr/app/components/prediction/` et `apps/fr/app/pronostic-match/[slug]/components/` sont quasi identiques. Unifier dans `packages/ui/src/prediction/` et supprimer les copies.
- **Fichiers** : `apps/fr/app/components/prediction/*.tsx`, `apps/fr/app/pronostic-match/[slug]/components/*.tsx`, `packages/ui/src/prediction/` (nouveau)
- **Estimation** : 4h
- **Dépendances** : P1-002
- **Exécutant** : 🤖 Max

### P1-004 — Remplacer les 20 inline styles par classes Tailwind
- **Priorité** : P2 (moyenne)
- **Description** : Grep `style=` dans tous les fichiers FR et remplacer par des classes Tailwind équivalentes. Inclut les magic numbers du bracket page.
- **Fichiers** : Divers fichiers dans `apps/fr/app/`
- **Estimation** : 2h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P1-005 — Lazy loading composants IA avec next/dynamic
- **Priorité** : P1 (haute)
- **Description** : Les composants `AiExpertInsight` et `AiMatchPreview` sont lourds et pas toujours présents. Les charger en `next/dynamic({ ssr: false })` pour réduire le bundle JS initial (~490KB → ~350KB cible).
- **Fichiers** : `apps/fr/app/match/[slug]/page.tsx`, `apps/fr/app/equipe/[slug]/page.tsx`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P1-006 — Analyser et réduire le chunk de 219KB
- **Priorité** : P1 (haute)
- **Description** : Installer `@next/bundle-analyzer`, identifier le chunk de 219KB, split ou tree-shake les modules responsables.
- **Fichiers** : `apps/fr/next.config.ts`, `package.json`
- **Estimation** : 2h
- **Dépendances** : P1-005
- **Exécutant** : 🤖 Max

### P1-007 — Ajouter schemas JSON-LD manquants
- **Priorité** : P1 (haute)
- **Description** : Ajouter `StadiumOrArena` sur les 16 pages stade et `Place` sur les 12 pages ville. Ajouter `manifest.json` pour PWA de base.
- **Fichiers** : `apps/fr/app/stade/[slug]/page.tsx`, `apps/fr/app/ville/[slug]/page.tsx`, `apps/fr/public/manifest.json` (nouveau)
- **Estimation** : 2h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P1-008 — Améliorer les metadata homepage
- **Priorité** : P1 (haute)
- **Description** : La homepage repose partiellement sur les defaults du layout. Définir des metadata explicites et optimisées : title, description, openGraph, twitter card spécifiques à la homepage.
- **Fichiers** : `apps/fr/app/page.tsx`
- **Estimation** : 30 min
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P1-009 — Créer page "Notre méthodologie"
- **Priorité** : P1 (haute) — E-E-A-T
- **Description** : Page dédiée expliquant le modèle ELO, le pipeline IA 3 tiers (Claude/Gemini/GPT), les sources de données (Transfermarkt, FIFA, APIs). Renforce l'expertise perçue.
- **Fichiers** : `apps/fr/app/methodologie/page.tsx` (nouveau)
- **Estimation** : 2h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max (rédaction) + 👤 Xavier (relecture)

### P1-010 — Créer profils auteur avec photo/bio
- **Priorité** : P1 (haute) — E-E-A-T
- **Description** : Créer un composant `AuthorCard` avec photo, nom, titre ("Expert football & data science"), bio courte. L'afficher sur les guides et articles. Au minimum 1 profil (Xavier) + 1 profil IA (Max).
- **Fichiers** : `packages/ui/src/AuthorCard.tsx` (nouveau), `packages/data/src/authors.ts` (nouveau)
- **Estimation** : 2h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max (composant) + 👤 Xavier (photo, bio personnelle)

### P1-011 — Ajouter dates de mise à jour sur chaque page
- **Priorité** : P2 (moyenne) — E-E-A-T
- **Description** : Ajouter "Dernière mise à jour : [date]" en haut des pages guide, pronostic, et équipe. Utiliser `lastModified` dans les metadata Next.js.
- **Fichiers** : `apps/fr/app/guide/[slug]/page.tsx`, `apps/fr/app/equipe/[slug]/page.tsx`, `apps/fr/app/pronostic/[slug]/page.tsx`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P1-012 — Setup monitoring et error tracking
- **Priorité** : P1 (haute)
- **Description** : Installer Sentry ou equivalent pour tracker les erreurs en production. Configurer les alertes pour les erreurs critiques (API fails, IA timeouts, cache overflow).
- **Fichiers** : `apps/fr/next.config.ts`, `apps/fr/app/layout.tsx`, `sentry.client.config.ts` (nouveau)
- **Estimation** : 2h
- **Dépendances** : P1-001
- **Exécutant** : 🤖 Max + 👤 Xavier (compte Sentry)

---

# 4. PHASE 2 — CONTENU (Semaines 3-6)

> **Objectif** : Créer le contenu qui va driver le trafic SEO.  
> **Temps estimé** : 100h | **Responsable** : Max (IA) 80%, Xavier 20% (relecture)

## 4.1 Guides à étoffer (×9)

| ID | Guide | Mots cible | Volume SEO | Priorité | Estimation | Dépendances |
|----|-------|-----------|------------|----------|------------|-------------|
| P2-001 | Comment parier sur la CDM 2026 | 7000-8000 | 15K/mois | 🔴 P0 | 4h | Aucune |
| P2-002 | Meilleurs sites de paris sportifs 2026 | 8000-10000 | 40K/mois | 🔴 P0 | 5h | Aucune |
| P2-003 | Guide du parieur débutant | 6000-7000 | 20K/mois | P1 | 3h | Aucune |
| P2-004 | Stratégie de paris en direct | 5000-6000 | 10K/mois | P1 | 3h | Aucune |
| P2-005 | Parier sur les buteurs CDM 2026 | 5000-6000 | 8K/mois | P1 | 3h | Aucune |
| P2-006 | Comment retirer ses gains | 4000-5000 | 12K/mois | P2 | 2h | Aucune |
| P2-007 | Paris combinés et Bet Builder | 5000 | 6K/mois | P2 | 2h | Aucune |
| P2-008 | Cotes et value bets CDM 2026 | 5000 | 5K/mois | P2 | 2h | Aucune |
| P2-009 | Bonus et promotions CDM 2026 | 5000-6000 | 10K/mois | P1 | 3h | Aucune |

**Fichiers concernés** : `packages/data/src/guides.ts`, `apps/fr/app/guide/[slug]/page.tsx`

**Format pour chaque guide** : Sommaire cliquable, encarts "Conseil de Max", tableaux comparatifs, exemples concrets avec montants, FAQ inline 5-10 questions, AuthorCard, date de mise à jour, temps de lecture.

**Exécutant** : 🤖 Max (rédaction IA complète) + 👤 Xavier (relecture, ajout screenshots)

## 4.2 Articles SEO à créer (×25)

| ID | Titre | Volume | Difficulté | Priorité | Estimation |
|----|-------|--------|-----------|----------|------------|
| P2-010 | Tout savoir sur la CDM 2026 (article pilier) | 200K+ | Haute | 🔴 P0 | 5h |
| P2-011 | Favoris CDM 2026 : analyse et classement | 50K | Moyenne | 🔴 P0 | 3h |
| P2-012 | Pronostic vainqueur CDM 2026 | 20K+ | Haute | 🔴 P0 | 3h |
| P2-013 | France CDM 2026 : effectif, pronostic, chances | 30K | Moyenne | P1 | 3h |
| P2-014 | Calendrier CDM 2026 heure française | 40K+ | Moyenne | P1 | 2h |
| P2-015 | Meilleur buteur CDM 2026 : Soulier d'Or | 15K+ | Moyenne | P1 | 3h |
| P2-016 | Où regarder la CDM 2026 TV/streaming | 20K+ | Moyenne | P1 | 2h |
| P2-017 | Dark horses CDM 2026 | 10K | Faible | P1 | 2h |
| P2-018 | Groupe de la mort CDM 2026 | 10K | Faible | P1 | 2h |
| P2-019 | Format 48 équipes expliqué | 8K | Faible | P2 | 2h |
| P2-020 | Stades CDM 2026 guide complet | 15K | Faible | P2 | 3h |
| P2-021 | Simulateur bracket CDM 2026 | 10K+ | Faible | P2 | 1h (page d'accueil du simulateur) |
| P2-022 | Historique CDM 1930-2022 | 15K | Moyenne | P2 | 4h |
| P2-023 | Mbappé CDM 2026 | 15K | Moyenne | P2 | 2h |
| P2-024 | Ronaldo dernière CDM ? | 15K | Moyenne | P2 | 2h |
| P2-025 | Haaland et la Norvège | 10K | Faible | P2 | 2h |
| P2-026 | Yamal : le prodige de 18 ans | 8K | Faible | P2 | 2h |
| P2-027 | Argentine : Messi 2e Mondial ? | 20K | Moyenne | P2 | 2h |
| P2-028 | Glossaire paris sportifs (100+ termes) | 5K | Faible | P2 | 4h |
| P2-029 | Guide voyage CDM 2026 USA | 5K | Faible | P3 | 3h |
| P2-030 | Altitude et chaleur : impact conditions | 2K | Faible | P3 | 2h |
| P2-031 | Premières participations CDM 2026 | 3K | Faible | P3 | 2h |
| P2-032 | Paris sportifs CDM : combien les Français vont parier | 3K | Faible | P3 | 2h |
| P2-033 | Top 10 surprises historiques CDM | 5K | Faible | P3 | 2h |
| P2-034 | Records CDM qui pourraient tomber | 3K | Faible | P3 | 2h |

**Fichiers** : `apps/fr/app/article/[slug]/page.tsx` (nouveau template), `packages/data/src/articles.ts` (nouveau)

**Exécutant** : 🤖 Max (90% — rédaction IA) + 👤 Xavier (10% — relecture)

## 4.3 Enrichissement pages existantes

| ID | Tâche | Pages | Estimation | Priorité |
|----|-------|-------|-----------|----------|
| P2-035 | Enrichir 48 pages équipe (+500 mots rédactionnels chacune) | `apps/fr/app/equipe/[slug]/` | 8h (batch IA) | P1 |
| P2-036 | Enrichir 12 pages groupe (analyse, pronostic qualification, cotes) | `apps/fr/app/groupe/[lettre]/` | 3h | P1 |
| P2-037 | Enrichir 16 pages stade (infos pratiques, conditions jeu) | `apps/fr/app/stade/[slug]/` | 3h | P2 |
| P2-038 | Enrichir 12 pages ville (guide touristique) | `apps/fr/app/ville/[slug]/` | 3h | P2 |
| P2-039 | Enrichir 210+ pages joueur (+biographie, stats saison, parcours CDM) | `apps/fr/app/joueur/[slug]/` | 8h (batch IA) | P2 |
| P2-040 | Enrichir pages H2H (contenu rédactionnel, désorpheliniser) | `apps/fr/app/h2h/[slug]/` | 4h | P2 |
| P2-041 | Enrichir FAQ (de 16 à 50+ questions) | `apps/fr/app/faq/page.tsx` | 2h | P2 |
| P2-042 | Ajouter FAQ inline sur pages équipe, match, pronostic | Divers | 3h | P2 |

**Exécutant** : 🤖 Max (100% — batch IA pour le contenu)

## 4.4 Pages transactionnelles

| ID | Page | Estimation | Priorité |
|----|------|-----------|----------|
| P2-043 | Hub "Paris sportifs CDM 2026" enrichi (3000+ mots pilier) | 3h | P1 |
| P2-044 | Pages "Pronostic par journée" (journée 1, 2, 3 + éliminatoires) | 4h | P2 |
| P2-045 | Landing page "Bonus et promotions CDM 2026" (/bonus/) | 2h | P2 |

---

# 5. PHASE 3 — FEATURES ENGAGEMENT (Semaines 4-8)

> **Objectif** : Transformer les visiteurs uniques en visiteurs récurrents.  
> **Temps estimé** : 72h | **Responsable** : Max 60%, Xavier 40% (tests, polish)

### P3-001 — Simulateur de bracket interactif ⭐ KILLER FEATURE
- **Priorité** : 🔴 P0 — impact maximal (10K+ recherches/mois, viral, engagement 5-10 min)
- **Description** : Page `/simulateur/` — L'utilisateur clique sur le vainqueur de chaque match. Cascade automatique 32e→16e→QF→SF→Finale. Résultat "Qui sera ton champion ?" partageable en image (OG dynamique). Sauvegarde localStorage. Compare avec le bracket IA. Pendant le tournoi : vrais résultats superposés.
- **Fichiers** : `apps/fr/app/simulateur/page.tsx` (nouveau), `apps/fr/app/simulateur/components/` (nouveau dossier), `packages/data/src/bracket.ts`
- **Estimation** : 16h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max (80%) + 👤 Xavier (20% — tests, UX polish)

### P3-002 — Pronostics communautaires (vote 1/N/2)
- **Priorité** : P1 (haute)
- **Description** : Sur chaque page match et pronostic-match, un vote 1/N/2 en un clic sans compte (cookie-based). Affichage temps réel "73% pensent que la France gagne". Backend : Vercel KV ou Supabase pour stocker les votes.
- **Fichiers** : `apps/fr/app/components/CommunityVote.tsx` (nouveau), `apps/fr/app/api/vote/route.ts` (nouveau)
- **Estimation** : 16h
- **Dépendances** : P1-001 (Vercel déployé pour KV)
- **Exécutant** : 🤖 Max (70%) + 👤 Xavier (30% — setup Vercel KV)

### P3-003 — Quiz Coupe du Monde
- **Priorité** : P1 (haute)
- **Description** : Page `/quiz/` — 100+ questions en 5 catégories (Histoire, Règles, Joueurs, Stades, Stats). 20 questions aléatoires par session. Score partageable "J'ai eu 17/20 au Quiz CDM 2026 !" avec image OG dynamique. Nouveau quiz hebdo.
- **Fichiers** : `apps/fr/app/quiz/page.tsx` (nouveau), `packages/data/src/quiz.ts` (nouveau)
- **Estimation** : 10h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max (90% — composant + 100 questions)

### P3-004 — Comparateur de stats joueurs
- **Priorité** : P2 (moyenne)
- **Description** : Page `/comparer-joueurs/` — Sélectionner 2-3 joueurs, radar chart comparatif (buts, passes, dribbles, sélections, rating). Partage social. Inspiration Sofascore.
- **Fichiers** : `apps/fr/app/comparer-joueurs/page.tsx` (nouveau), `packages/ui/src/RadarChart.tsx` (nouveau)
- **Estimation** : 8h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P3-005 — Partage social des pronostics (image OG dynamique)
- **Priorité** : P1 (haute)
- **Description** : Bouton "Partager mon pronostic" → génère une image OG avec drapeau1 vs drapeau2, score prédit, logo mondial2026.fr. Compatible Twitter/Facebook/WhatsApp. Utiliser Vercel OG (`@vercel/og`) pour la génération d'images.
- **Fichiers** : `apps/fr/app/api/og/route.tsx` (nouveau), composants partage sur pages pronostic
- **Estimation** : 6h
- **Dépendances** : P1-001
- **Exécutant** : 🤖 Max

### P3-006 — Système de badges (gamification localStorage)
- **Priorité** : P3 (basse)
- **Description** : Badges "Explorateur" (10+ pages équipe), "Pronostiqueur" (10+ votes), "Expert" (quiz >15/20), "Complet" (bracket rempli). Stockage localStorage. Popup de récompense et profil badges consultable.
- **Fichiers** : `apps/fr/app/components/BadgeSystem.tsx` (nouveau), `packages/ui/src/BadgePopup.tsx` (nouveau)
- **Estimation** : 6h
- **Dépendances** : P3-001, P3-002, P3-003
- **Exécutant** : 🤖 Max

### P3-007 — Classement des pronostiqueurs
- **Priorité** : P2 (moyenne)
- **Description** : Page `/classement-pronostiqueurs/` — Points par pronostic correct (1N2=3pts, score exact=10pts). Classement hebdo + global. Badge "Top 10%" partageable.
- **Fichiers** : `apps/fr/app/classement-pronostiqueurs/page.tsx` (nouveau)
- **Estimation** : 6h
- **Dépendances** : P3-002
- **Exécutant** : 🤖 Max

### P3-008 — Widget "Compose ton XI de la CDM 2026"
- **Priorité** : P3 (basse)
- **Description** : Page `/xi-ideal/` — Sélection de joueurs avec budget fictif, formation visuelle, image partageable. Feature "fun" à fort potentiel viral.
- **Fichiers** : `apps/fr/app/xi-ideal/page.tsx` (nouveau)
- **Estimation** : 8h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

---

# 6. PHASE 4 — HOMEPAGE & UX REDESIGN (Semaines 5-8)

> **Objectif** : Homepage engageante + UX optimisée sur chaque template.  
> **Temps estimé** : 48h | **Responsable** : Max 70%, Xavier 30%

### P4-001 — Redesign complet homepage
- **Priorité** : 🔴 P0
- **Description** : Nouvelle structure homepage (de haut en bas) :
  1. Hero + 2 CTAs ("Voir les pronostics" | "Meilleur bonus CDM")
  2. Countdown (composant P0-010)
  3. Prochains matchs (3-4 matchs avec cotes mini + lien pronostic)
  4. Pronostic vedette du jour (analyse IA rapide)
  5. CTA Bookmaker featured (composant P0-009)
  6. Top 5 favoris (probabilité victoire + cotes)
  7. Groupes (cards collapsibles, moins d'espace)
  8. Équipes populaires (France, Argentine, Brésil, Angleterre, Espagne)
  9. Stades (carousel horizontal au lieu de grid)
  10. Derniers articles (3-4 cards)
  11. Newsletter CTA
- **Fichiers** : `apps/fr/app/page.tsx` (refonte complète)
- **Estimation** : 8h
- **Dépendances** : P0-009, P0-010, P2-010 (articles existants)
- **Exécutant** : 🤖 Max

### P4-002 — UX pages pronostic-match : exemples de mises + paris recommandés
- **Priorité** : P1 (haute)
- **Description** : Ajouter section "Exemple de mise" ("10€ sur France gagne → 14.50€ chez Betclic") + section "3 paris recommandés" contextualisés avec justification et CTA par bookmaker. Ajouter FAQ inline.
- **Fichiers** : `apps/fr/app/pronostic-match/[slug]/page.tsx`, `apps/fr/app/pronostic-match/[slug]/components/`
- **Estimation** : 4h
- **Dépendances** : P1-003
- **Exécutant** : 🤖 Max

### P4-003 — UX pages équipe : effectif complet + historique CDM
- **Priorité** : P1 (haute)
- **Description** : Ajouter section "Effectif complet" (tableau filtrable par position), section "Historique en CDM" (palmarès, participations), section H2H liés, FAQ inline. Remplacer le CTA bookmaker générique par un CTA contextualisé ("Parier sur [Équipe] dès [cote]").
- **Fichiers** : `apps/fr/app/equipe/[slug]/page.tsx`
- **Estimation** : 4h
- **Dépendances** : P2-035
- **Exécutant** : 🤖 Max

### P4-004 — UX pages match : "Où regarder" + matchs même journée
- **Priorité** : P1 (haute)
- **Description** : Ajouter section "Où regarder ce match" (chaîne TV + heure française). Ajouter section "Matchs de la même journée" (3-4 cards). Ajouter lien proéminent vers pronostic-match dans le hero.
- **Fichiers** : `apps/fr/app/match/[slug]/page.tsx`, `packages/data/src/tv-schedule.ts` (nouveau)
- **Estimation** : 3h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P4-005 — UX page bracket : contenu SEO + lien simulateur
- **Priorité** : P2 (moyenne)
- **Description** : Ajouter 200 mots d'intro explicative, section "Chemins des favoris", FAQ inline, CTA vers le simulateur interactif, tabs "Bracket IA | Mon bracket".
- **Fichiers** : `apps/fr/app/tableau/page.tsx`
- **Estimation** : 2h
- **Dépendances** : P3-001
- **Exécutant** : 🤖 Max

### P4-006 — UX pages guide : sommaire cliquable + template enrichi
- **Priorité** : P1 (haute)
- **Description** : Template guide avec : sommaire cliquable (ancres), AuthorCard (P1-010), date mise à jour, temps de lecture estimé, encarts "Conseil de Max", FAQ inline, guides liés en fin de page.
- **Fichiers** : `apps/fr/app/guide/[slug]/page.tsx`
- **Estimation** : 3h
- **Dépendances** : P1-010, P1-011
- **Exécutant** : 🤖 Max

### P4-007 — UX page calendrier : filtres + ICS + cotes
- **Priorité** : P2 (moyenne)
- **Description** : Filtres (par groupe/équipe/stade/date), toggle heure FR/locale/UTC, mini cotes 1N2 par match, bouton "Ajouter à mon calendrier" (export ICS), tabs par phase.
- **Fichiers** : `apps/fr/app/match/calendrier/page.tsx`
- **Estimation** : 4h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P4-008 — UX page matchs du jour enrichie
- **Priorité** : P1 (haute)
- **Description** : Pour chaque match : cotes, mini-pronostic ("Victoire France probable 72%"), météo, CTA bookmaker. État vide si pas de matchs ("Prochain match dans X jours"). Section "Matchs de demain" en preview.
- **Fichiers** : `apps/fr/app/match/aujourdhui/page.tsx`
- **Estimation** : 3h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

### P4-009 — UX pages bookmaker : screenshots + tutoriel inscription
- **Priorité** : P2 (moyenne) — impact monétisation
- **Description** : Ajouter 3-4 screenshots (app, interface paris, live), tutoriel inscription en 5 étapes illustrées, exemple de pari CDM concret, FAQ inline.
- **Fichiers** : `apps/fr/app/bookmaker/[slug]/page.tsx`
- **Estimation** : 3h (par bookmaker × 5-7)
- **Dépendances** : Aucune
- **Exécutant** : 👤 Xavier (screenshots manuels) + 🤖 Max (composants)

### P4-010 — Ajouter de vraies images (drapeaux SVG, photos stades)
- **Priorité** : P1 (haute)
- **Description** : Remplacer les emojis drapeaux par des SVG (flag-icons ou flagpack). Ajouter des photos de stades (libres de droits). Utiliser `next/image` pour toutes les images avec alt text. Ajouter schema `ImageObject`.
- **Fichiers** : `apps/fr/public/images/` (nouveau dossier), composants team cards, pages stade
- **Estimation** : 6h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max (SVG drapeaux, next/image) + 👤 Xavier (sourcing photos stades)

### P4-011 — Optimisations mobile spécifiques
- **Priorité** : P1 (haute)
- **Description** : 
  - CTA bookmaker sticky en bas d'écran sur mobile (pages pronostic + matchs)
  - Groupes homepage en accordéon (1 ouvert à la fois)
  - Stades homepage en carousel horizontal swipeable
  - Tables en scroll horizontal + indicateur visuel "swipe"
  - Effectif équipe en accordéon par position
- **Fichiers** : `apps/fr/app/page.tsx`, `apps/fr/app/pronostic-match/`, `apps/fr/app/equipe/`
- **Estimation** : 4h
- **Dépendances** : P4-001
- **Exécutant** : 🤖 Max

### P4-012 — UX pages pronostic équipe : analyse rédactionnelle + value bet
- **Priorité** : P2 (moyenne)
- **Description** : Ajouter paragraphe "Notre avis" (300 mots), section comparaison cotes modèle vs bookmakers ("Value bet si cote > X"), section historique CDM.
- **Fichiers** : `apps/fr/app/pronostic/[slug]/page.tsx`
- **Estimation** : 2h
- **Dépendances** : P2-035
- **Exécutant** : 🤖 Max

### P4-013 — Formulaire de contact
- **Priorité** : P3 (basse)
- **Description** : Ajouter formulaire via Formspree ou API Route. FAQ rapide avant le formulaire.
- **Fichiers** : `apps/fr/app/contact/page.tsx`
- **Estimation** : 1h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max

---

# 7. PHASE 5 — MONÉTISATION (Semaines 6-10)

> **Objectif** : Maximiser les revenus d'affiliation.  
> **Temps estimé** : 32h | **Responsable** : Mix

### P5-001 — Inscription vrais programmes d'affiliation
- **Priorité** : 🔴 P0
- **Description** : S'inscrire aux programmes d'affiliation de Betclic, Winamax, Unibet, Parions Sport, ZEbet. Obtenir les vrais liens trackés, codes promo exclusifs si possible.
- **Fichiers** : `packages/data/src/affiliates.ts` (mettre à jour avec vrais liens)
- **Estimation** : 4h (processus multi-jours)
- **Dépendances** : P1-001 (site live pour l'inscription)
- **Exécutant** : 👤 Xavier (100% — inscriptions manuelles)

### P5-002 — CTAs contextualisés par match
- **Priorité** : P1 (haute)
- **Description** : Remplacer "Parier" générique par "Parier sur France vs Brésil à 1.85 chez Betclic" sur chaque page pronostic-match. Le composant CTA prend en paramètre le match, l'équipe favorite, et la meilleure cote.
- **Fichiers** : `apps/fr/app/pronostic-match/[slug]/components/BookmakerCTA.tsx`, `packages/ui/src/ContextualCTA.tsx` (nouveau)
- **Estimation** : 3h
- **Dépendances** : P5-001
- **Exécutant** : 🤖 Max

### P5-003 — Comparateur de cotes CDM 2026
- **Priorité** : P1 (haute)
- **Description** : Page `/comparateur-cotes/` — Tableau de tous les bookmakers avec cotes de chaque match. Meilleure cote en vert (style Oddschecker). Filtres par match/groupe/type de pari. CTA direct par bookmaker. Mise à jour via API odds.
- **Fichiers** : `apps/fr/app/comparateur-cotes/page.tsx` (nouveau), `apps/fr/app/comparateur-cotes/components/` (nouveau)
- **Estimation** : 12h
- **Dépendances** : P5-001
- **Exécutant** : 🤖 Max

### P5-004 — Landing pages bonus par bookmaker
- **Priorité** : P2 (moyenne)
- **Description** : Pages `/bookmaker/[slug]/inscription/` — Tutoriel pas à pas avec screenshots, code promo, CTA "S'inscrire maintenant" proéminent. Optimisé pour "inscription [bookmaker]".
- **Fichiers** : `apps/fr/app/bookmaker/[slug]/inscription/page.tsx` (nouveau)
- **Estimation** : 4h (×5 bookmakers)
- **Dépendances** : P5-001, P4-009
- **Exécutant** : 🤖 Max + 👤 Xavier (screenshots)

### P5-005 — Section "Meilleur bonus du moment" dynamique
- **Priorité** : P2 (moyenne)
- **Description** : Composant réutilisable qui affiche le meilleur bonus actuel avec mise à jour hebdomadaire. Utilisé sur homepage, pages pronostic, page bonus.
- **Fichiers** : `packages/ui/src/BestBonus.tsx` (nouveau), `packages/data/src/affiliates.ts`
- **Estimation** : 2h
- **Dépendances** : P5-001
- **Exécutant** : 🤖 Max

### P5-006 — CTA sticky mobile sur pages monétisation
- **Priorité** : P1 (haute)
- **Description** : Barre sticky en bas d'écran mobile avec le meilleur bookmaker + cote du match en cours. Apparaît après 30% de scroll, se masque en scroll rapide.
- **Fichiers** : `packages/ui/src/StickyCTA.tsx` (nouveau)
- **Estimation** : 2h
- **Dépendances** : P5-001
- **Exécutant** : 🤖 Max

### P5-007 — Tracking conversions et analytics
- **Priorité** : P1 (haute)
- **Description** : Intégrer Google Analytics 4 + events personnalisés : clic CTA bookmaker, page pronostic vue, vote communautaire, quiz completé, bracket partagé. UTM tracking sur les liens affiliés.
- **Fichiers** : `apps/fr/app/layout.tsx`, `packages/ui/src/analytics.ts` (nouveau)
- **Estimation** : 3h
- **Dépendances** : P1-001
- **Exécutant** : 🤖 Max + 👤 Xavier (compte GA4)

---

# 8. PHASE 6 — LIVE & TOURNOI (Semaines 10-16, avant juin)

> **Objectif** : Préparer le mode live pour le tournoi (11 juin — 19 juillet).  
> **Temps estimé** : 56h | **Responsable** : Max 70%, Xavier 30%

### P6-001 — Centre de matchs live (/live/)
- **Priorité** : 🔴 P0
- **Description** : Hub live avec tous les matchs du jour, scores temps réel (polling 30s déjà existant), timeline événements (buts, cartons, remplacements), stats live (possession, tirs). Classements groupes mis à jour. C'est LA page pendant le tournoi.
- **Fichiers** : `apps/fr/app/live/page.tsx` (nouveau), `apps/fr/app/live/components/` (nouveau)
- **Estimation** : 12h
- **Dépendances** : P1-001, APIs football configurées
- **Exécutant** : 🤖 Max

### P6-002 — Articles post-match automatiques (IA)
- **Priorité** : 🔴 P0
- **Description** : Pipeline automatisé : API résultat → prompt IA → article résumé (500-800 mots) → publication dans les 2h. Contenu : score, buteurs, homme du match, stats clés, impact classement/bracket. Template article avec schema NewsArticle.
- **Fichiers** : `apps/fr/app/article/[slug]/page.tsx`, `packages/ai/src/prompts/post-match.ts` (nouveau), `apps/fr/app/api/generate-recap/route.ts` (nouveau)
- **Estimation** : 12h
- **Dépendances** : P2-010 (template article existant)
- **Exécutant** : 🤖 Max

### P6-003 — Newsletter automatisée
- **Priorité** : P1 (haute)
- **Description** : Newsletter quotidienne pendant le tournoi : "3 pronostics du jour + stats fun + cotes du moment". Service : Resend ou Mailchimp. Landing page newsletter dédiée. Popup d'inscription après 2ème page vue.
- **Fichiers** : `apps/fr/app/newsletter/page.tsx` (nouveau), `apps/fr/app/api/newsletter/route.ts` (nouveau)
- **Estimation** : 8h
- **Dépendances** : P1-001
- **Exécutant** : 🤖 Max + 👤 Xavier (compte Resend/Mailchimp)

### P6-004 — Push notifications (Web Push)
- **Priorité** : P2 (moyenne)
- **Description** : Service worker + Web Push API. Notifications : "Votre équipe joue dans 1h", "Résultat : France 2-1 Brésil", "Nouveau pronostic IA disponible". Opt-in après 2ème visite.
- **Fichiers** : `apps/fr/public/sw.js` (nouveau), `apps/fr/app/api/push/route.ts` (nouveau)
- **Estimation** : 8h
- **Dépendances** : P1-001
- **Exécutant** : 🤖 Max

### P6-005 — Dashboard tournoi temps réel
- **Priorité** : P1 (haute)
- **Description** : Page `/dashboard/` — Classements des 12 groupes sur une page, course au Soulier d'Or en temps réel, bracket mis à jour avec vrais résultats, stats globales (buts totaux, cartons, buts/match moyen).
- **Fichiers** : `apps/fr/app/dashboard/page.tsx` (nouveau)
- **Estimation** : 8h
- **Dépendances** : P6-001
- **Exécutant** : 🤖 Max

### P6-006 — Page Soulier d'Or live
- **Priorité** : P2 (moyenne)
- **Description** : Page `/soulier-dor/` — Classement live des buteurs, cotes actualisées, prochains matchs des candidats, graphique d'évolution.
- **Fichiers** : `apps/fr/app/soulier-dor/page.tsx` (nouveau)
- **Estimation** : 4h
- **Dépendances** : P6-001
- **Exécutant** : 🤖 Max

### P6-007 — Contenu snackable pré-produit (40 jours)
- **Priorité** : P2 (moyenne)
- **Description** : Pré-produire 40 "Le saviez-vous ?", 40 "Stat du jour", 40 "Ce jour-là en CDM". Widgets sur homepage et pages match.
- **Fichiers** : `packages/data/src/snackable.ts` (nouveau), `packages/ui/src/SnackableWidget.tsx` (nouveau)
- **Estimation** : 4h
- **Dépendances** : Aucune
- **Exécutant** : 🤖 Max (100%)

### P6-008 — Section News/Actualités
- **Priorité** : P1 (haute)
- **Description** : Hub `/actualites/` avec feed d'articles triés par date. Sitemap News séparé. RSS feed. Articles manuels pré-tournoi, automatiques pendant le tournoi. Template article avec AuthorCard, date, temps de lecture, articles liés.
- **Fichiers** : `apps/fr/app/actualites/page.tsx` (nouveau), `apps/fr/app/actualites/[slug]/page.tsx` (nouveau)
- **Estimation** : 6h
- **Dépendances** : P1-010
- **Exécutant** : 🤖 Max

---

# 9. PHASE 7 — GROWTH & BACKLINKS (Continu)

> **Objectif** : Construire l'autorité du domaine.  
> **Temps estimé** : 30h (ongoing) | **Responsable** : Xavier 70%, Max 30%

### P7-001 — Stratégie de link building
- **Priorité** : P1 (haute)
- **Description** : 
  - Guest posts sur blogs football FR (10 articles)
  - Proposer le simulateur de bracket comme outil gratuit (linkable asset)
  - Contacter les forums football (reddit r/ligue1, r/worldcup)
  - Soumettre le site dans les annuaires sport français
  - Créer des infographies partageables (linkable assets)
- **Estimation** : 10h (ongoing)
- **Exécutant** : 👤 Xavier (outreach) + 🤖 Max (rédaction guest posts)

### P7-002 — Relations presse
- **Priorité** : P2 (moyenne)
- **Description** : 
  - Communiqué de presse au lancement du simulateur
  - Contacter les journalistes sport/tech FR (L'Équipe, So Foot, Eurosport)
  - Proposer des données exclusives ("Selon notre modèle IA, la France a 15% de chances de titre")
- **Estimation** : 5h
- **Exécutant** : 👤 Xavier (100%)

### P7-003 — Réseaux sociaux
- **Priorité** : P1 (haute)
- **Description** : 
  - Créer comptes Twitter, Instagram, TikTok @mondial2026fr
  - Publier 3-5× par semaine : pronostics, stats fun, quiz, infographies
  - Pendant le tournoi : 10-15 posts/jour (résultats, réactions, pronostics en direct)
  - Ton éditorial décalé (inspiration So Foot / Winamax)
- **Estimation** : 5h setup + 2h/semaine ongoing
- **Exécutant** : 👤 Xavier (création comptes) + 🤖 Max (contenu auto)

### P7-004 — Partenariats
- **Priorité** : P3 (basse)
- **Description** : 
  - Partenariat avec des podcasts football FR
  - Échange de liens avec sites voyage (pour le guide CDM USA)
  - Contacter les influenceurs foot FR pour tester le simulateur
- **Estimation** : 5h (ongoing)
- **Exécutant** : 👤 Xavier (100%)

### P7-005 — Hub H2H et désorphelinisation
- **Priorité** : P2 (moyenne)
- **Description** : Créer un hub `/h2h/` listant les confrontations les plus recherchées. Ajouter des liens H2H sur chaque page match (adversaires) et page équipe (adversaires de groupe). Maillage dans les articles.
- **Fichiers** : `apps/fr/app/h2h/page.tsx` (nouveau), `apps/fr/app/match/[slug]/page.tsx`, `apps/fr/app/equipe/[slug]/page.tsx`
- **Estimation** : 3h
- **Dépendances** : P2-040
- **Exécutant** : 🤖 Max

### P7-006 — Maillage interne contextuel
- **Priorité** : P1 (haute)
- **Description** : Ajouter des liens contextuels DANS le contenu textuel (pas seulement sidebar). Homepage → pronostics populaires. Guides → guides liés. Articles → articles liés en bas. Pages match → "matchs de la même journée".
- **Fichiers** : Tous les templates de pages
- **Estimation** : 3h
- **Dépendances** : Phase 2 (contenu créé)
- **Exécutant** : 🤖 Max

---

# 10. PLANNING GANTT

```
2026           FÉV           MARS          AVRIL         MAI           JUIN         JUIL
Semaine    S8  S9  S10 S11 S12 S13 S14 S15 S16 S17 S18 S19 S20 S21 S22 S23 S24→S29

PHASE 0     ████
 Bugs        ██
 Quick wins  ████

PHASE 1         ████████
 Vercel          ██
 TS strict       ██
 Dedupe          ████
 SEO tech         ████
 E-E-A-T          ████

PHASE 2             ████████████████████████
 Guides 1-2      ████
 Guides 3-9          ████████
 Articles P0         ████
 Articles P1             ████████
 Articles P2-3              ████████████
 Enrichissement                  ████████████

PHASE 3                     ████████████████████
 Simulateur              ████████
 Vote communauté             ████████
 Quiz                            ████████
 Comparateur joueurs                 ████
 Partage social                      ████
 Badges                                  ████

PHASE 4                         ████████████████
 Homepage redesign               ████████
 UX pages                            ████████
 Mobile optim                             ████
 Images réelles                       ████████

PHASE 5                             ████████████████
 Affiliations                        ████
 CTAs contextuels                        ████
 Comparateur cotes                       ████████
 Landing pages                               ████

PHASE 6                                     ████████████████
 Centre live                                 ████████
 Post-match IA                               ████████
 Newsletter                                      ████████
 Push notifs                                         ████
 Dashboard                                       ████████
 Snackable                                   ████
 News section                                ████████

PHASE 7     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 Link building  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 Réseaux sociaux    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 PR                         ░░░░    ░░░░        ░░░░

TOURNOI                                                  ██████████████
                                                   11 juin ───── 19 juil
```

**Légende** : `██` = travail actif | `░░` = effort continu/récurrent

---

# 11. MÉTRIQUES DE SUCCÈS

## KPIs par phase

| Phase | KPI | Objectif | Outil de mesure |
|-------|-----|----------|----------------|
| **Phase 0** | Bugs critiques corrigés | 0 bugs P0 restants | Tests manuels |
| **Phase 1** | Lighthouse performance score | > 90 | Lighthouse CI |
| **Phase 1** | Pages indexées Google | 1900+ | Google Search Console |
| **Phase 2** | Mots de contenu total | +200 000 mots | Comptage |
| **Phase 2** | Positions top 10 (mots-clés cibles) | 15+ mots-clés en top 10 | GSC / Ahrefs |
| **Phase 3** | Brackets simulés | 10 000+ | Analytics événement |
| **Phase 3** | Votes pronostics | 50 000+ | Vercel KV compteur |
| **Phase 3** | Quiz complétés | 5 000+ | Analytics |
| **Phase 4** | Taux de rebond homepage | < 50% | GA4 |
| **Phase 4** | Temps moyen sur site | > 3 min | GA4 |
| **Phase 5** | Clics CTA bookmaker | 5 000+/mois pré-tournoi | GA4 événements |
| **Phase 5** | Inscriptions trackées | 200+ | Dashboards affiliés |
| **Phase 6** | Visiteurs uniques/jour (tournoi) | 50 000+ | GA4 |
| **Phase 6** | Inscrits newsletter | 5 000+ | Resend/Mailchimp |
| **Phase 7** | Domaines référents | 50+ | Ahrefs/GSC |
| **Phase 7** | Domain Authority | > 30 | Ahrefs |

## Objectifs de trafic

| Période | Visiteurs uniques/mois | Pages vues/mois |
|---------|----------------------|-----------------|
| Mars 2026 | 5 000 | 20 000 |
| Avril 2026 | 15 000 | 60 000 |
| Mai 2026 | 50 000 | 200 000 |
| Juin 2026 (tournoi) | 500 000 | 3 000 000 |
| Juillet 2026 (pic) | 1 000 000 | 8 000 000 |

## Objectifs de revenus (affiliation)

| Période | Clics CTA | Inscriptions estimées | Revenus estimés |
|---------|----------|----------------------|----------------|
| Pré-tournoi (mars-mai) | 15 000 | 300 | 6 000-15 000€ |
| Pendant tournoi (juin-juil) | 200 000 | 5 000 | 50 000-150 000€ |

---

# 12. BUDGET & RESSOURCES

## Temps total estimé

| Phase | Heures | % du total |
|-------|--------|-----------|
| Phase 0 — Bugs & Quick Wins | 14h | 4% |
| Phase 1 — Fondations | 24h | 6% |
| Phase 2 — Contenu | 100h | 26% |
| Phase 3 — Features Engagement | 72h | 19% |
| Phase 4 — Homepage & UX | 48h | 13% |
| Phase 5 — Monétisation | 32h | 8% |
| Phase 6 — Live & Tournoi | 56h | 15% |
| Phase 7 — Growth | 30h | 8% |
| **TOTAL** | **~376h** | **100%** |

## Répartition Max (IA) vs Xavier

| Rôle | Heures | % |
|------|--------|---|
| 🤖 Max (IA) — Code, contenu, automatisation | ~280h | 75% |
| 👤 Xavier — Comptes, screenshots, relecture, outreach, décisions | ~96h | 25% |

## Ce que Max peut automatiser

- ✅ Correction de bugs et refactoring code
- ✅ Rédaction de contenu (guides, articles, enrichissement pages)
- ✅ Création de composants React
- ✅ Configuration SEO (schemas, metadata, sitemaps)
- ✅ Génération de données (quiz, snackable, FAQ)
- ✅ Articles post-match automatiques pendant le tournoi
- ✅ Newsletter contenu
- ✅ Guest posts pour link building

## Ce que Xavier doit faire manuellement

- 👤 Créer les comptes (Vercel, Sentry, GA4, Resend, programmes d'affiliation)
- 👤 Fournir sa photo et bio pour le profil auteur
- 👤 Prendre des screenshots des apps bookmakers
- 👤 Valider/relire les contenus critiques
- 👤 Outreach relations presse et partenariats
- 👤 Gérer les réseaux sociaux (stratégie et publication)
- 👤 Sourcing photos stades libres de droits
- 👤 Décisions business (pricing, partenariats, positionnement)

## Coûts estimés

| Poste | Coût mensuel | Coût total (fév-juil) |
|-------|-------------|----------------------|
| Domaine mondial2026.fr | ~1€/mois | ~6€ |
| Vercel Pro | 20$/mois | ~120$ |
| APIs football (football-data.org ou similaire) | 0-50$/mois | ~250$ |
| APIs odds | 0-30$/mois | ~150$ |
| APIs IA (Claude/Gemini/GPT) | 50-200$/mois | ~800$ |
| Vercel KV (votes communautaires) | 0-10$/mois | ~50$ |
| Sentry (error tracking) | 0$ (free tier) | 0$ |
| Resend (newsletter) | 0-20$/mois | ~80$ |
| GA4 | 0$ | 0$ |
| Images/Photos (libres de droits) | 0-50$ one-time | ~50$ |
| **TOTAL** | | **~1 500$** (~1 400€) |

---

## 🔥 TOP 10 TÂCHES À PLUS FORT IMPACT (ratio impact/effort)

| Rang | ID | Tâche | Impact | Effort | Ratio |
|------|-----|-------|--------|--------|-------|
| 1 | P0-001 | Fix bug odds `||`→`&&` | Critique | 5 min | ⭐⭐⭐⭐⭐ |
| 2 | P0-003 | Corriger accents | Critique (SEO+crédibilité) | 2h | ⭐⭐⭐⭐⭐ |
| 3 | P0-009 | CTA bookmaker homepage | Monétisation directe | 1.5h | ⭐⭐⭐⭐⭐ |
| 4 | P0-010 | Countdown homepage | Engagement | 1.5h | ⭐⭐⭐⭐⭐ |
| 5 | P2-002 | Guide "Meilleurs sites paris" | 40K recherches/mois | 5h | ⭐⭐⭐⭐ |
| 6 | P3-001 | Simulateur bracket | Viral + engagement | 16h | ⭐⭐⭐⭐ |
| 7 | P2-010 | Article pilier "Tout savoir CDM" | 200K+ recherches | 5h | ⭐⭐⭐⭐ |
| 8 | P5-002 | CTAs contextualisés | +conversions | 3h | ⭐⭐⭐⭐ |
| 9 | P4-001 | Redesign homepage | UX + monétisation | 8h | ⭐⭐⭐ |
| 10 | P6-001 | Centre live | Trafic tournoi | 12h | ⭐⭐⭐ |

---

*Plan d'action créé le 18 février 2026 par Max (IA) pour Xavier.*  
*Ce document est le référentiel unique du projet mondial2026.fr.*  
*Prochaine révision : 1er mars 2026.*
