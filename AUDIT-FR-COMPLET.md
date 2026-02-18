# AUDIT COMPLET — mondial2026.fr (Version Française)

**Date** : 18 février 2026  
**Auditeur** : Max (IA)  
**Scope** : App FR uniquement (`apps/fr/`) + packages partagés  
**Pages auditées** : ~1900 pages  
**Fichiers analysés** : 80+ fichiers source

---

## TABLE DES MATIÈRES

- [A. AUDIT TECHNIQUE](#a-audit-technique)
- [B. AUDIT SEO & CONTENU](#b-audit-seo--contenu)
- [C. AUDIT UX/UI](#c-audit-uxui)
- [D. CE QUE LES VISITEURS ATTENDENT](#d-ce-que-les-visiteurs-attendent)
- [E. BRAINSTORMING — RENDRE LE SITE ADDICTIF](#e-brainstorming--rendre-le-site-addictif)
- [F. PLAN D'ACTION PRIORISÉ](#f-plan-daction-priorisé)

---

## A. AUDIT TECHNIQUE

### A.1 Architecture du code FR

```
apps/fr/
├── app/
│   ├── layout.tsx              — Root layout (html lang="fr", Header, Footer, CookieConsent, BackToTop)
│   ├── page.tsx                — Homepage (groupes, équipes top 10, stades)
│   ├── globals.css             — Tailwind 4 + custom theme (6 couleurs)
│   ├── components/
│   │   ├── Header.tsx          — "use client", nav 8 liens, search, lang switcher, dark mode
│   │   ├── Footer.tsx          — 6 colonnes, 48+ liens, newsletter, social, disclaimer
│   │   ├── GroupCard.tsx       — Card groupe
│   │   ├── TeamCard.tsx        — Card équipe
│   │   ├── LiveScoreBarWrapper.tsx
│   │   └── prediction/        — 8 sous-composants pronostic (MatchHero, OddsTable, etc.)
│   ├── equipe/[slug]/          — 48 pages équipe (SSG, revalidate 3600s)
│   ├── match/[slug]/           — 104 pages match (ISR 300s, AI enriched)
│   ├── match/aujourdhui/       — Matchs du jour (ISR 300s)
│   ├── match/calendrier/       — Calendrier complet
│   ├── pronostic/[slug]/       — 48 pages pronostic équipe (ISR 300s)
│   ├── pronostic-match/[slug]/ — 104 pages pronostic match (ISR 300s, 9 sous-composants)
│   ├── tableau/                — Bracket éliminatoire (SSG)
│   ├── groupe/[lettre]/        — 12 pages groupe
│   ├── joueur/[slug]/          — 210+ pages joueur
│   ├── buteur/[slug]/          — ~100 pages buteur (FW + MF)
│   ├── stade/[slug]/           — 16 pages stade
│   ├── ville/[slug]/           — 12 pages ville
│   ├── h2h/[slug]/             — ~1128 pages H2H
│   ├── guide/[slug]/           — 9 pages guide
│   ├── bookmaker/[slug]/       — 5-7 pages bookmaker
│   ├── faq/                    — FAQ avec FAQPage schema
│   ├── contact/                — Page contact
│   ├── a-propos/               — À propos
│   ├── mentions-legales/       — Mentions légales
│   └── jeu-responsable/        — Jeu responsable (ANJ)

packages/
├── data/src/     — 18 fichiers data (teams, matches, predictions, affiliates, etc.)
├── ui/src/       — 20 composants UI partagés (live-score-bar, search-dialog, etc.)
├── ai/src/       — Orchestrateur IA multi-providers (Claude/Gemini/GPT)
└── api/src/      — Clients API (football, odds, weather) + rate limiter + cache
```

**Verdict** : Architecture solide, bien structurée en monorepo. Le découpage packages/apps est propre. Les données statiques sont dans `@repo/data`, l'enrichissement temps réel dans `@repo/api` + `@repo/ai`.

### A.2 Qualité du code, patterns, problèmes

**Points forts** :
- ✅ Pas de `any` TypeScript dans le code source
- ✅ Pas de `console.log` en production
- ✅ Boundaries "use client" correctes (Header, LiveScoreBar, SearchDialog, ThemeToggle = 4 composants client seulement)
- ✅ ISR bien calibré par type de page (300s matchs, 3600s équipes, 86400s guides)
- ✅ Fallback gracieux si IA/APIs fail (pages render avec données statiques)
- ✅ `generateStaticParams()` sur toutes les pages dynamiques = SSG complet au build
- ✅ Header bien fait : search dialog, lang switcher, dark mode toggle, skip-to-content, focus-visible

**Problèmes identifiés** :

| Sévérité | Problème | Localisation |
|----------|----------|-------------|
| 🔴 CRITIQUE | Bug `\|\|` au lieu de `&&` dans odds matching — affiche les cotes du mauvais match | `packages/api/src/odds/client.ts:79-83` |
| 🔴 CRITIQUE | Pas de validation Zod/schema sur les outputs IA — hallucinations cachées 24h | `packages/ai/src/orchestrator.ts` |
| 🟡 HAUTE | Cache mémoire sans limite ni éviction → OOM potentiel sur Vercel | `packages/ai/src/cache.ts` |
| 🟡 HAUTE | JSON parse non protégé dans clients API | `football/client.ts`, `odds/client.ts` |
| 🟡 HAUTE | TypeScript strict mode désactivé | `packages/typescript-config/` |
| 🟡 HAUTE | Rate limiting documenté mais pas enforcé | `packages/api/src/config.ts` |
| 🟠 MOYENNE | Duplication composants prediction/ vs pronostic-match/components/ — 8 fichiers quasi identiques | `apps/fr/app/` |
| 🟠 MOYENNE | 20 inline styles au lieu de classes Tailwind | Divers fichiers |
| 🟠 MOYENNE | Prompt injection possible via données API (noms joueurs interpolés dans prompts) | `packages/ai/src/prompts/` |

**Pattern de duplication** : Les composants dans `apps/fr/app/components/prediction/` et `apps/fr/app/pronostic-match/[slug]/components/` sont des copies quasi identiques (MatchHero, OddsTable, H2HSection, etc.). Ça devrait être dans `packages/ui/`.

### A.3 Performance

| Métrique | Valeur | Cible | Status |
|----------|--------|-------|--------|
| Bundle JS total | ~490 KB | < 300 KB | 🟡 À optimiser |
| Plus gros chunk | 219 KB | < 100 KB | 🟡 Investigation needed |
| CSS (Tailwind) | 31 KB | < 50 KB | ✅ OK |
| Client components | 4 | < 10 | ✅ Excellent |
| Polling live | 2 × 30s | - | ✅ Fenêtre tournoi uniquement |
| ISR matchs | 300s | 60-300s | ✅ OK |
| Dynamic imports | 0 | - | 🟡 Composants IA à lazy-loader |
| Images | 0 (que des emojis) | - | 🔴 Aucune image = aucun next/image optimization |

**Recommandations perf** :
1. `next/dynamic` pour `AiExpertInsight` et `AiMatchPreview` (lourds, pas toujours présents)
2. Analyser le chunk de 219 KB avec `@next/bundle-analyzer`
3. Ajouter de vraies images (drapeaux SVG, photos stades) avec `next/image`

### A.4 SEO technique

**✅ Points forts** (déjà excellents) :
- Hreflang parfait via `route-mapping.ts` centralisé (FR/EN/ES + x-default)
- Canonicals corrects sur toutes les pages dynamiques via `getAlternates()`
- BreadcrumbList JSON-LD sur toutes les pages de détail
- Organization schema dans le layout
- SportsTeam schema sur pages équipe
- SportsEvent schema sur pages match
- FAQPage schema sur la page FAQ
- Person schema sur pages joueur
- Review schema sur pages bookmaker
- Article schema sur pages guide
- Sitemaps complets (~1900 URLs)
- robots.txt correct (block /api/, /_next/)
- Titles et descriptions uniques, keyword-rich, < 70 chars
- OG images + Twitter cards configurés
- `metadataBase` correctement configuré sur `mondial2026.fr`
- Viewport meta avec theme-color

**❌ Manques** :
- Pas d'images réelles (drapeaux emoji seulement) → pas d'image SEO, pas d'alt text
- Schemas StadiumOrArena manquants sur pages stade
- Schema Place manquant sur pages ville
- Pas de manifest.json / PWA
- Homepage metadata repose partiellement sur les defaults du layout
- Accents manquants dans les textes ("equipe" au lieu de "équipe", "premiere" au lieu de "première") — impact SEO et crédibilité

### A.5 Bugs et erreurs

1. **Bug critique odds** : `||` au lieu de `&&` dans `odds/client.ts:79-83` → cotes du mauvais match
2. **Accents manquants** : "equipe", "premiere", "etats-Unis", "decouvrez" partout dans les pages → le contenu semble non-professionnel
3. **`dangerouslySetInnerHTML`** pour l'analyse IA : `<div dangerouslySetInnerHTML={{ __html: enriched?.analysis.content }} />` dans equipe/page.tsx — si l'IA génère du HTML malformé, ça casse le rendu
4. **Bracket page desktop** : Les `pt-[36px]`, `mb-[52px]`, `pt-[108px]` etc. sont des magic numbers fragiles — un ajout de match card casse tout l'alignement

---

## B. AUDIT SEO & CONTENU

### B.1 Stratégie de mots-clés

**Mots-clés primaires à cibler** (estimation volumes FR mensuels) :

| Mot-clé | Volume estimé | Difficulté | Status actuel |
|---------|--------------|------------|---------------|
| coupe du monde 2026 | 200K+ | Haute | ✅ Homepage cible |
| cdm 2026 | 50K+ | Moyenne | ✅ Dans le title template |
| pronostic coupe du monde 2026 | 30K+ | Haute | ✅ Pages pronostic |
| france coupe du monde 2026 | 20K+ | Moyenne | ✅ Page équipe France |
| calendrier coupe du monde 2026 | 40K+ | Moyenne | ✅ Page calendrier |
| groupe coupe du monde 2026 | 30K+ | Moyenne | ✅ Pages groupe |
| paris sportifs cdm 2026 | 15K+ | Haute | ✅ Hub paris sportifs |
| cote buteur cdm 2026 | 10K+ | Moyenne | ✅ Pages buteur |
| tableau coupe du monde 2026 | 20K+ | Moyenne | ✅ Page bracket |
| stade coupe du monde 2026 | 15K+ | Faible | ✅ Pages stade |
| **match aujourd'hui coupe du monde** | 50K+ (pendant tournoi) | Faible | ✅ Page matchs du jour |
| **simulateur coupe du monde 2026** | 10K+ | Faible | ❌ MANQUANT |
| **quiz coupe du monde** | 8K+ | Faible | ❌ MANQUANT |
| **comparateur cotes cdm 2026** | 5K+ | Moyenne | ❌ MANQUANT |
| **résultat coupe du monde 2026** | 100K+ (pendant tournoi) | Haute | 🟡 Partiel (live widget) |
| **meilleur buteur cdm 2026** | 15K+ | Moyenne | ✅ Hub buteurs |
| **effectif france cdm 2026** | 10K+ | Faible | ✅ Page équipe |

**Long tail à fort potentiel** :
- "france vs [équipe] pronostic cdm 2026" × 3 matchs de groupe = pages H2H ✅
- "quel bookmaker pour la cdm 2026" → guide existant ✅
- "comment parier sur la coupe du monde" → guide existant ✅
- "meilleur site paris coupe du monde 2026" → page paris-sportifs ✅
- "liste des stades coupe du monde 2026" → page stades ✅

### B.2 Qualité et profondeur du contenu actuel

**Homepage** : Bien structurée. Hero + stats + groupes + équipes favorites + stades + CTA. Manque : un "countdown" jusqu'au match d'ouverture, une section "dernières actualités".

**Pages équipe** (~443 LOC) : Très complètes. Fiche technique, historique, pronostics ELO, joueurs clés, matchs de groupe, analyse IA, forme actuelle, blessures. **Problème** : `team.description` est la seule partie textuelle "naturelle" — tout le reste est structuré/data. Pour le SEO, il faudrait 500-1000 mots de contenu rédactionnel par équipe.

**Pages match** (~485 LOC) : Excellentes. Comparaison face-à-face, preview IA, expert insight, pronostics, cotes estimées, météo, blessures, stade. Adaptation live/upcoming/completed. **La page la plus riche du site.**

**Pages pronostic-match** (~963 LOC, composantisée) : Très riche. 1N2, score exact, tableau de cotes, CTA affiliés, H2H, analyse match, expert IA. C'est la page de monétisation principale. **Point fort : la plus value-dense du marché FR.**

**Pages pronostic équipe** (~726 LOC) : ELO rating avec jauge visuelle, probabilités par tour avec barres de progression, cotes estimées, pronostics des matchs de groupe, joueurs clés, CTA bookmakers. **Très bien fait.**

**Page bracket** (~400+ LOC) : Bracket complet avec champion prédit, desktop horizontal + mobile vertical, tableau de probabilités. **Impressionnant visuellement.**

**Pages buteur** : Stats complètes, cotes buteur estimées (anytime, 2+, 3+, top scorer), analyse textuelle, teammates. **Bonne niche SEO.**

**Pages guide** : **INSUFFISANTES**. Chaque guide fait ~30 lignes de contenu via `section.content`. Pour ranker sur "comment parier CDM 2026", il faut 5000-10000 mots. Les guides sont des squelettes.

**Pages bookmaker** : Bonnes. Rating détaillé (6 critères avec barres), pros/cons, sections de contenu, infos pratiques, moyens de paiement. **Manque** : des screenshots, des exemples concrets de paris.

**FAQ** : Bien implémentée avec FAQPage schema. Catégorisée (tournoi, paris, pronostics, équipes). Contenu suffisant.

**Contact** : Basique mais fonctionnel. Email + à propos + liens utiles.

### B.3 Pages manquantes à fort potentiel

| Page | Impact estimé | Effort | Priorité |
|------|--------------|--------|----------|
| **Section Actualités/News** (IA-generated) | +500K impressions/mois pendant tournoi | Élevé (16h) | 🔴 CRITIQUE |
| **Simulateur de bracket interactif** | +100K impressions | Moyen (12h) | 🔴 HAUTE |
| **Page résultats en direct** (hub live) | +200K pendant tournoi | Moyen (8h) | 🔴 HAUTE |
| **Comparateur de cotes live** (cross-bookmaker) | +50K | Moyen (8h) | 🟡 HAUTE |
| **Quiz Coupe du Monde** | +30K + engagement | Faible (6h) | 🟡 MOYENNE |
| **Glossaire des paris sportifs** (100+ termes) | +20K (long tail SEO) | Faible (4h) | 🟡 MOYENNE |
| **Archive historique CDM** (1930-2022) | +100K (evergreen) | Moyen (12h) | 🟡 MOYENNE |
| **Profils entraîneurs** (48 pages) | +30K | Faible (4h data + template) | 🟠 BASSE |
| **Analyse par confédération** (6 pages) | +10K | Faible (3h) | 🟠 BASSE |
| **Calendrier ICS / PDF téléchargeable** | Engagement + partage | Très faible (2h) | 🟠 BASSE |
| **Page "Où regarder les matchs"** | +20K | Faible (2h) | 🟡 MOYENNE |

### B.4 Stratégie de contenu recommandée

**Avant le tournoi (maintenant → juin 2026)** :
1. **Étoffer les 9 guides** à 5000+ mots chacun avec exemples concrets de paris, screenshots, tableaux comparatifs
2. **Créer 10-15 articles SEO** : "Favorites CDM 2026", "Dark horses CDM 2026", "France peut-elle gagner la CDM 2026", "Quel bookmaker choisir CDM 2026"
3. **Créer le simulateur de bracket** (feature interactive = liens retour, partage social, temps passé sur site)
4. **Ajouter une section news/blog** alimentée par IA (blessures, compositions, analyses pré-tournoi)

**Pendant le tournoi (juin-juillet 2026)** :
1. **Articles post-match automatiques** (résumé IA de chaque match dans les 2h)
2. **"Matchs du jour" enrichi** avec preview, cotes, pronostics, météo
3. **Stats du jour** (meilleur buteur mis à jour, classements groupes live)
4. **Hub résultats live** comme point d'entrée principal

### B.5 Maillage interne

**Points forts** :
- ✅ Équipe → matchs de groupe, joueurs, pronostic, groupe
- ✅ Match → équipes, stade, ville, pronostic-match, H2H
- ✅ Pronostic → équipe, matchs, H2H, bookmakers
- ✅ Guide → guides liés, bookmakers cités
- ✅ Footer massif avec 48+ liens (6 colonnes)
- ✅ Breadcrumbs sur toutes les pages de détail

**Manques** :
- ❌ Pas de linking contextuel DANS le contenu textuel (seulement sidebar/sections)
- ❌ Homepage ne linke pas vers les pages pronostic les plus recherchées (pronostic France, pronostic vainqueur)
- ❌ Pas de "articles liés" en bas des pages guide
- ❌ Pas de "matchs de la même journée" sur les pages match
- ❌ Pages H2H (1128 pages) sont orphelines — peu de liens entrants

### B.6 E-E-A-T (Experience, Expertise, Authority, Trust)

| Critère | Score | Détail |
|---------|-------|--------|
| **Experience** | 4/10 | Pas de contenu de première main, pas d'avis personnels, pas de "vécu". Tout est data/IA. |
| **Expertise** | 7/10 | Modèle ELO bien expliqué, méthodologie transparente, pipeline IA 3 tiers |
| **Authority** | 3/10 | Domaine neuf (mondial2026.fr), pas de backlinks, pas de mentions presse |
| **Trust** | 6/10 | HTTPS, mentions légales, jeu responsable, disclaimer 18+. Mais : pas d'auteur identifié, pas de "qui sommes-nous" avec vrais noms/photos |

**Actions pour améliorer E-E-A-T** :
1. Créer des profils auteur avec photo, bio, expertise ("Expert football & data science")
2. Ajouter une page "Notre méthodologie" expliquant le modèle ELO et le pipeline IA
3. Citer des sources (Transfermarkt, FIFA, etc.) dans le contenu
4. Ajouter des dates de mise à jour sur chaque page ("Dernière mise à jour : 18 février 2026")
5. Obtenir des backlinks (guest posts, mentions presse sportive)

---

## C. AUDIT UX/UI

### C.1 Parcours utilisateur principal

**Parcours idéal** : Homepage → Équipe favorite → Pronostic équipe → Match spécifique → Pronostic match → CTA bookmaker

**Parcours actuel** : ✅ Ce parcours fonctionne bien. Chaque page a des CTA vers l'étape suivante. Le lien "Voir le pronostic →" est présent sur chaque page équipe. Le CTA bookmaker est dans la sidebar et en bas de page.

**Problèmes** :
- La homepage privilégie les groupes (12 cards) plutôt que l'action immédiate (pronostic, matchs du jour)
- Pas de "Quick Start" pour le parieur : "Envie de parier ? → 1. Choisis un match → 2. Lis notre pronostic → 3. Inscris-toi chez [bookmaker]"
- Le parcours "fan curieux" (pas parieur) manque de contenu éditorial/storytelling

### C.2 Hiérarchie de l'information par type de page

**Homepage** :
1. Hero (titre + CTA) ✅
2. Stats clés (48 équipes, 104 matchs...) ✅
3. 12 groupes ✅
4. Top 10 équipes ✅
5. 8 stades ✅
6. CTA final ✅

**Manque** : Countdown, matchs à venir, pronostic vedette du jour, actualités

**Page équipe** :
1. Breadcrumb ✅
2. Hero (drapeau, nom, stats, CTA pronostic) ✅
3. Contenu principal (2 col + sidebar) ✅ — bien organisé
4. Sidebar (fiche technique, forme, blessures, CTA) ✅

**Excellent** : Tout est visible sans trop scroller. Les infos prioritaires (nom, rang FIFA, groupe) sont dans le hero.

**Page match** :
1. Hero adaptatif (live/upcoming/completed) ✅ — très bien pensé
2. Comparaison face-à-face ✅
3. Preview IA ✅
4. Expert insight ✅
5. Pronostic + cotes ✅
6. Sidebar (stade, infos, météo, blessures, cotes) ✅

**La meilleure page du site.** Dense en information mais bien organisée.

### C.3 Design et lisibilité

**Palette** : Professionnelle. `#1a1a2e` (bleu foncé) + `#e94560` (accent rouge) + `#f5a623` (or) + `#2d6a4f` (vert terrain). Cohérent avec le thème football/sport.

**Typographie** : Inter, bien hiérarchisée (text-4xl/extrabold pour H1, text-xl/bold pour H2). Bonne lisibilité.

**Spacing** : Consistent (py-12 sections, gap-8 grid, p-6 cards). Aéré sans être trop spacé.

**Dark mode** : ✅ Supporté via ThemeToggle avec `localStorage` + `prefers-color-scheme` detection inline. Variables CSS définies dans globals.css.

**Problème** : Les accents manquants ("equipe" au lieu de "équipe") dans tout le contenu dégradent la qualité perçue.

### C.4 Mobile experience

**Points forts** :
- ✅ Mobile-first Tailwind (grid-cols-2 → sm:grid-cols-2 → lg:grid-cols-4)
- ✅ Hamburger menu avec animation
- ✅ Bracket page : version mobile verticale vs desktop horizontale
- ✅ Touch targets ≥ 44px

**Points faibles** :
- Tables en scroll horizontal seulement (pas de vue cards responsive)
- Le bracket desktop (horizontal scroll) est illisible même sur tablette
- Footer 6 colonnes → 2 colonnes sur mobile = beaucoup de scroll

### C.5 Navigation et découvrabilité

**Header** : 8 liens (Equipes, Groupes, Calendrier, Pronostics, Stades, Joueurs, Buteurs, Paris sportifs). Bon équilibre.

**Search** : ✅ Présent via `SearchDialog` (Cmd+K). Utilise `buildSearchIndex("fr")` qui indexe équipes, matchs, joueurs, stades, villes.

**Lang switcher** : ✅ Présent, dropdown avec drapeaux. Convertit les paths intelligemment entre langues.

**Breadcrumbs** : ✅ Visuels + JSON-LD sur toutes les pages de détail.

**Manque** :
- Pas d'indicateur de page active dans la navigation
- Pas de "fil d'Ariane" sur la homepage
- Pas de "mega menu" pour accéder rapidement aux groupes/équipes populaires

### C.6 Conversion (CTA affiliés)

**Points forts** :
- ✅ CTA bookmaker en sidebar ET en bas de page sur les pages pronostic
- ✅ Badge "Recommandé" sur le bookmaker featured
- ✅ Bonus affiché en gras (ex: "150€" en text-lg font-extrabold text-field)
- ✅ Liens avec `rel="noopener noreferrer sponsored nofollow"`
- ✅ Disclaimer jeu responsable systématique ("18+. Appelez le 09 74 75 13 13")
- ✅ Section dédiée dans le footer

**Points faibles** :
- ❌ Homepage : AUCUN CTA bookmaker — c'est la page la plus visitée !
- ❌ Pas de comparaison visuelle des bonus (tableau côte à côte)
- ❌ Pas de "meilleur bonus du moment" dynamique
- ❌ CTAs identiques sur toutes les pages (pas contextualisé : "Parier sur France vs Brésil" vs "Parier")
- ❌ Pas de "sticky" CTA sur mobile pendant le scroll

### C.7 Accessibilité

| Critère WCAG | Status | Détail |
|-------------|--------|--------|
| Skip-to-content | ✅ | Présent : `<a href="#main-content" className="sr-only focus:not-sr-only...">` |
| Focus indicators | ✅ | `focus-visible:ring-2 focus-visible:ring-accent` sur Header links et buttons |
| Aria labels | ✅ | Hamburger menu, lang switcher, search, social links |
| Semantic HTML | ✅ | nav, header, main, footer, section, h1-h3, ol/li pour breadcrumbs |
| Color contrast | 🟡 | `text-gray-300` sur fond blanc dans certains paragraphes = 3.8:1 (< 4.5:1 WCAG AA) |
| Emojis drapeaux | 🟡 | Pas d'aria-label (screen readers lisent "Regional Indicator Symbol") |
| Keyboard nav | ✅ | focus-visible implémenté sur tous les éléments interactifs du Header |
| Alt text images | ❌ | Pas d'images = pas d'alt text nécessaire, mais devrait en avoir |

---

## D. CE QUE LES VISITEURS ATTENDENT

### D.1 Profils de visiteurs types

**Profil 1 : Le parieur régulier (40% du trafic attendu)**
- Homme, 25-45 ans
- Parie régulièrement sur le foot (Ligue 1, Ligue des Champions)
- Cherche : cotes, pronostics fiables, bonus bookmakers, value bets
- KPI : temps sur page pronostic, clics CTA bookmaker
- Attente : "Dites-moi sur qui parier et combien ça rapporte"

**Profil 2 : Le fan de foot curieux (30%)**
- Homme/femme, 18-55 ans
- Suit le foot mais ne parie pas (ou rarement)
- Cherche : calendrier, compositions, résultats, infos sur les équipes exotiques
- KPI : pages vues, temps de session, récurrence
- Attente : "Je veux tout savoir sur la CDM sans me perdre"

**Profil 3 : Le touriste/voyageur (15%)**
- Projette de se rendre aux USA/Canada/Mexique pour la CDM
- Cherche : guides stades, villes hôtes, billets, conseils pratiques
- KPI : temps sur pages ville/stade, clics guides
- Attente : "Comment organiser mon voyage CDM"

**Profil 4 : Le joueur fantasy / pronostiqueur social (15%)**
- Participe à des jeux de pronostics entre amis
- Cherche : prédictions, stats comparatives, outils de simulation
- KPI : utilisation simulateur, partage social
- Attente : "Je veux prouver que j'ai raison avant mes potes"

### D.2 Contenus les plus recherchés (par phase)

**Pré-tournoi (maintenant → 11 juin)** :
1. Groupes et tirages
2. Pronostics vainqueur
3. Calendrier et horaires (en heure française)
4. Favoris et outsiders
5. Guides de voyage
6. Bonus bookmakers

**Pendant le tournoi (11 juin → 19 juillet)** :
1. Résultats en direct ← **le plus demandé**
2. Matchs du jour + cotes
3. Classements groupes mis à jour
4. Compositions d'équipe
5. Résumés post-match
6. Pronostics des matchs à venir
7. Stats buteurs mises à jour

**Post-tournoi** :
1. Bilan, stats finales
2. Rétrospective

### D.3 Parcours idéal par profil

**Parieur** : Homepage → "Matchs du jour" → Pronostic match → Cotes comparées → CTA bookmaker → CONVERSION
**Fan** : Homepage → Équipe favorite → Joueurs clés → Calendrier → Tableau éliminatoire → Revient demain
**Touriste** : Homepage → Stades → Ville hôte → Guide voyage → Revient pour calendrier
**Fantasy** : Homepage → Simulateur bracket → Compare avec amis → Quiz → Revient pour mettre à jour

### D.4 Qu'est-ce qui les ferait revenir ?

1. **Contenu mis à jour quotidiennement** (news, compositions, blessures)
2. **Pronostics qui changent** (cotes actualisées, analyses pré-match)
3. **Simulateur de bracket** qu'on veut modifier après chaque résultat
4. **Classements live** pendant le tournoi
5. **Newsletter** avec les pronostics du jour
6. **Notifications** quand un match favori commence
7. **Historique de pronostics** ("mes prédictions vs la réalité")

---

## E. BRAINSTORMING — RENDRE LE SITE ADDICTIF

### E.1 Features interactives

**🏆 Simulateur de bracket (PRIORITÉ #1)**
- L'utilisateur clique sur le vainqueur de chaque match
- Le tableau se met à jour en cascade (32e → 16e → quarts → demis → finale)
- "Qui sera votre champion ?" → résultat partageable
- Pendant le tournoi : les vrais résultats se superposent
- Compare ton bracket avec le bracket IA du site
- **Engagement estimé** : 5-10 min par session, 3-5 retours
- **Effort** : 12-16h de dev

**🎯 Pronostics communautaires**
- Avant chaque match : vote 1/N/2 en un clic
- Affichage en temps réel : "73% des visiteurs pensent que la France gagne"
- Classement des meilleurs pronostiqueurs
- Intégration avec le bracket simulateur
- **Effort** : 16-20h (besoin d'un backend léger — Vercel KV ou Supabase)

**🧠 Quiz Coupe du Monde**
- "Testez vos connaissances CDM" (20 questions aléatoires)
- Catégories : Histoire, Règles, Joueurs, Stades, Stats
- Score partageable ("J'ai eu 17/20 au Quiz CDM 2026 !")
- Nouveau quiz chaque semaine
- **Effort** : 8-10h

**📊 Comparateur de stats joueurs**
- "Comparez Mbappé vs Vinicius Jr vs Haaland"
- Radar chart avec buts, passes, dribbles, sélections
- Partage réseaux sociaux du résultat
- **Effort** : 8h

**⚽ Fantasy mini-jeu**
- "Compose ton XI de la CDM 2026" (avec budget)
- Points par buts/passes/clean sheets
- Classement entre joueurs
- **Effort** : 40h+ (ambitieux mais engagement maximal)

### E.2 Gamification

**🏅 Système de badges**
- "Explorateur" : a visité 10+ pages équipe
- "Pronostiqueur" : a voté sur 10+ matchs
- "Expert" : score quiz > 15/20
- "Complet" : a rempli le bracket complet
- "Early bird" : inscrit avant le tournoi
- Stockage : localStorage (pas besoin de compte)

**📈 Classement pronostiqueurs**
- Points par pronostic correct (1N2 = 3 pts, score exact = 10 pts)
- Classement hebdomadaire + global
- Badge "Top 10%" partageable

**🔥 Streak du jour**
- "Ça fait 5 jours de suite que tu visites !"
- Barre de progression quotidienne
- Récompense : accès à un pronostic "premium" IA

### E.3 Social features

**📤 Partage de pronostics**
- Bouton "Partager mon pronostic" → image générée automatiquement
- Format : Carte avec drapeau1 vs drapeau2, score prédit, logo du site
- Compatible Twitter/Facebook/WhatsApp/Instagram Stories

**👥 Comparaison avec amis**
- "Invite un ami à remplir le bracket"
- Page de comparaison côte à côte
- Score en temps réel pendant le tournoi

**💬 Commentaires/réactions**
- Réaction emoji rapide sur chaque pronostic (👍 ❌ 🔥 🤔)
- Pas besoin de compte (cookie-based)
- Compteur visible ("423 personnes pensent comme vous")

### E.4 Push notifications / newsletter

**📧 Newsletter**
- Déjà un composant `Newsletter` dans le footer ✅
- Contenu : "3 pronostics du jour + stats fun + cotes du moment"
- Fréquence : quotidienne pendant le tournoi, hebdomadaire avant
- **Manque** : landing page newsletter dédiée, popup d'inscription

**🔔 Push notifications (Web Push)**
- "Votre équipe joue dans 1h !"
- "Résultat : France 2-1 Brésil — Lire le résumé"
- "Nouveau pronostic IA disponible pour demain"
- Opt-in au premier visit ou après 2ème page vue
- **Effort** : 8h (service worker + Vercel Edge)

### E.5 Contenu "snackable"

**📱 Format "stories" / cards**
- "Le saviez-vous ?" quotidien
- "Stat du jour" : "Mbappé a marqué dans ses 4 derniers matchs de CDM"
- "Record à battre" : "Le record de buts en CDM (13, Just Fontaine 1958)"
- "Ce jour-là" : "Le 19 juin 1998, la France battait l'Arabie Saoudite 4-0"

**📊 Infographies partageables**
- "Les 10 favoris en un coup d'oeil" (classement + cotes)
- "Le chemin de la France vers la finale"
- "Comparaison des 3 groupes de la mort"
- Générées automatiquement avec les données du site

**🎙️ Audio/Vidéo**
- Mini-podcast IA quotidien "Le Pronostic du Jour" (2 min, TTS)
- Preview vidéo courte avant chaque match

### E.6 Live experience pendant le tournoi

**🟢 Barre de scores live** (déjà implémentée ✅)
- Polling 30s, affiche scores en cours
- Fenêtre active uniquement pendant le tournoi

**📺 Page "Centre de matchs live"**
- Tous les matchs du jour avec scores temps réel
- Timeline d'événements (buts, cartons, remplacements)
- Stats live (possession, tirs, corners)
- Chat communautaire ou réactions live
- **C'est LA page à avoir pendant le tournoi** — c'est ce que Flashscore fait de mieux

**🏟️ Page match adaptative**
- Avant : Preview IA + cotes + météo + compo probable (✅ déjà fait)
- Pendant : Score live + événements + stats + réactions communautaires
- Après : Résumé IA + stats finales + notes joueurs + impact bracket
- **La transition avant/pendant/après est déjà codée** ✅ (via `getMatchPhase()`)

**📊 Dashboard tournoi**
- Classements de tous les groupes sur une seule page
- Tableau des buteurs mis à jour en temps réel
- Bracket mis à jour avec les vrais résultats
- "Race to the Golden Boot" (course au Soulier d'Or)

### E.7 Ce que les concurrents NE font PAS

**Analyse des concurrents** :

| Concurrent | Forces | Faiblesses |
|-----------|--------|-----------|
| **L'Équipe** | Brand authority, contenu éditorial riche, vidéos | Paywall, pas de pronostics data-driven, UX lourde, pubs invasives |
| **Flashscore** | Live scores ultra-rapides, couverture mondiale | 0 contenu éditorial, 0 pronostics, 0 paris, design utilitaire froid |
| **SofaScore** | Stats avancées, ratings joueurs, heatmaps | Pas focalisé CDM, pas de contenu FR natif, pas de paris |
| **Sport.fr** | - | Page CDM en 404 ! Pas de concurrent sérieux ici |
| **Pronostics.fr** | Niche pronostics | Site en erreur au moment du test |

**Ce que PERSONNE ne fait (et que mondial2026.fr pourrait faire)** :

1. **Pronostics IA transparents avec méthodologie expliquée** — L'Équipe a des "experts", Flashscore n'a rien. Vous avez un modèle ELO + Claude = unique
2. **Simulateur de bracket interactif en français** — Ça n'existe pas en FR. ESPN le fait en anglais, pas de version FR
3. **Analyse météo + altitude sur les pronostics** — Personne ne prend en compte l'Estadio Azteca à 2240m ou la chaleur de Miami en juillet
4. **Pronostics communautaires** — Pas de site FR qui combine pronostics data + vote communautaire
5. **Contenu bilingue natif** (FR/EN/ES) — Les concurrents FR sont FR uniquement. Vous touchez 3 marchés
6. **Dashboard CDM tout-en-un** — L'Équipe fait des articles, Flashscore fait des scores. Personne ne fait les deux avec des pronostics + paris intégrés
7. **Quiz et gamification** — Aucun concurrent ne gamifie l'expérience CDM
8. **Audio/podcast IA** — "Le Pronostic du Jour" en 2 min audio = unique

---

## F. PLAN D'ACTION PRIORISÉ

### Top 20 actions, ordonnées par impact/effort

| # | Action | Impact | Effort | Délai | Détail |
|---|--------|--------|--------|-------|--------|
| **1** | 🔴 Fixer le bug odds `\|\|` → `&&` | Critique | 5 min | Immédiat | `packages/api/src/odds/client.ts:79-83` |
| **2** | 🔴 Corriger les accents manquants dans tout le contenu | SEO + crédibilité | 2h | Semaine 1 | "equipe" → "équipe", "premiere" → "première" partout |
| **3** | 🔴 Ajouter validation Zod sur outputs IA | Data quality | 3h | Semaine 1 | `packages/ai/src/schemas.ts` existe déjà, l'intégrer dans l'orchestrateur |
| **4** | 🟡 Étoffer les 9 guides à 5000+ mots | SEO long tail | 16h | Semaine 1-2 | Contenu rédactionnel + exemples + tableaux + FAQ inline |
| **5** | 🟡 Créer le simulateur de bracket interactif | Engagement + viral | 16h | Semaine 2-3 | Composant React client, sauvegarde localStorage, partage image |
| **6** | 🟡 Créer la section News/Actualités | Trafic organique | 16h | Semaine 2-3 | Pages IA-generated, feed RSS, sitemap news |
| **7** | 🟡 Ajouter un countdown + "matchs à venir" sur la homepage | Engagement homepage | 3h | Semaine 1 | Countdown dynamique + 3 prochains matchs avec cotes |
| **8** | 🟡 Ajouter CTA bookmaker sur la homepage | Monétisation | 2h | Semaine 1 | Section "Meilleur bonus du moment" avec featured bookmaker |
| **9** | 🟡 Créer le comparateur de cotes live | Monétisation + SEO | 12h | Semaine 3-4 | Hub avec cotes de tous les bookmakers pour chaque match |
| **10** | 🟡 Ajouter pronostics communautaires (vote 1N2) | Engagement + social | 16h | Semaine 3-4 | Vote sans compte (cookie), affichage temps réel via Vercel KV |
| **11** | 🟠 Quiz Coupe du Monde | Engagement + SEO | 8h | Semaine 4 | 100+ questions, 5 catégories, score partageable |
| **12** | 🟠 Créer le "Centre live" pour le tournoi | Trafic pendant CDM | 12h | Mois 2 | Timeline événements, stats live, dashboard groupes |
| **13** | 🟠 Ajouter partage social des pronostics | Viralité | 6h | Mois 2 | Génération d'image OG avec score prédit + drapeaux |
| **14** | 🟠 Newsletter quotidienne automatisée | Rétention | 8h | Mois 2 | "3 pronostics du jour" via Resend ou Mailchimp |
| **15** | 🟠 Profils auteur + page "Notre méthodologie" | E-E-A-T | 4h | Semaine 2 | Crédibilité SEO, photo + bio + expertise |
| **16** | 🟠 Ajouter de vraies images (drapeaux SVG, photos stades) | SEO images + UX | 8h | Mois 2 | `next/image`, alt text, schema ImageObject |
| **17** | 🟠 Déduplication composants prediction/ | Code quality | 4h | Mois 2 | Déplacer dans packages/ui, supprimer les copies |
| **18** | 🟠 Activer TypeScript strict + fixer les erreurs | Code quality | 3h | Semaine 2 | `"strict": true` dans tsconfig |
| **19** | 🟠 Push notifications (Web Push) | Rétention pendant CDM | 8h | Mois 3 | Service worker, opt-in intelligent |
| **20** | 🟠 Glossaire des paris sportifs (100+ termes) | SEO long tail | 4h | Mois 2 | Page unique avec ancres alphabétiques |

### Timeline résumée

```
FÉVRIER 2026 (maintenant)
├── Semaine 1 : Bugs critiques (#1, #2, #3) + Quick wins (#7, #8)
├── Semaine 2 : Guides enrichis (#4) + E-E-A-T (#15, #18)
├── Semaine 3 : Simulateur bracket (#5) + News (#6)
└── Semaine 4 : Quiz (#11) + Cotes live (#9) + Pronostics communautaires (#10)

MARS 2026
├── Centre live (#12)
├── Newsletter (#14)
├── Images (#16)
└── Partage social (#13)

AVRIL-MAI 2026
├── Refactoring code (#17)
├── Glossaire (#20)
├── Push notifications (#19)
└── Polish final + tests performance

JUIN 2026 → TOURNOI
├── Mode live activé
├── News quotidienne IA
├── Pronostics mis à jour chaque jour
└── Dashboard CDM en temps réel
```

### Budget estimé (temps dev)

| Phase | Heures | Semaines (1 dev) |
|-------|--------|-----------------|
| Bugs + quick wins | 10h | 0.5 |
| Contenu (guides, news) | 32h | 2 |
| Features interactives (bracket, quiz, vote) | 40h | 2.5 |
| Live experience (centre, dashboard) | 20h | 1.5 |
| Infrastructure (newsletter, push, images) | 24h | 1.5 |
| Refactoring + polish | 14h | 1 |
| **TOTAL** | **~140h** | **~9 semaines** |

Faisable d'ici juin 2026 avec 1 développeur à temps plein, ou 2 développeurs part-time.

---

## CONCLUSION

mondial2026.fr est un **très bon site technique** avec une architecture solide, un SEO bien pensé, et des pages riches en données. Les fondations sont excellentes : ISR, hreflang, schemas JSON-LD, pipeline IA multi-providers, dark mode, search.

**Les 3 axes de progression prioritaires** :

1. **Contenu** : Les guides sont trop minces, il n'y a pas de section actualités, et les textes manquent d'accents français. C'est le gap le plus impactant pour le SEO.

2. **Engagement** : Le site est informatif mais pas addictif. Le simulateur de bracket, les pronostics communautaires et le quiz transformeraient les visiteurs uniques en visiteurs récurrents.

3. **Monétisation** : Le parcours homepage → bookmaker est trop long. Un CTA prominent sur la homepage et des pronostics contextualisés ("France gagne à 1.85 → Parier sur Betclic") augmenteraient les conversions.

Le site a le potentiel de devenir **LA référence francophone pour la CDM 2026** s'il comble ces gaps avant juin 2026. La niche est encore peu occupée (Sport.fr en 404, Pronostics.fr en erreur), L'Équipe est derrière un paywall, et Flashscore ne fait que des scores. Il y a une place énorme à prendre.

---

*Audit réalisé le 18 février 2026 par Max (IA assistant de Xavier).*
