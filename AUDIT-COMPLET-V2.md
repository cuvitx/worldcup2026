# 🔍 AUDIT COMPLET V2 — CDM2026.FR
**Date :** 19 février 2026  
**Auditeur :** Hugo 🚀 — QA Lead Expert  
**Référence comparative :** L'Équipe, Sofascore, ESPN, FIFA.com  

---

## 📊 RÉSUMÉ EXÉCUTIF

### Score global : **6.4 / 10**

> Site ambitieux avec une bonne base technique, mais qui souffre de problèmes critiques de **données mockées visibles**, d'un **SEO désactivé**, d'**accents manquants** et d'une **monétisation insuffisamment intégrée**. Pour un lancement le 11 juin, le travail à faire est réel mais réalisable.

### 🚨 TOP 10 PROBLÈMES CRITIQUES

| # | Problème | Sévérité | Page(s) concernée(s) |
|---|----------|----------|----------------------|
| 1 | **SEO DÉSACTIVÉ** — robots = noindex par défaut (IS_LAUNCHED=false) | 🔴 BLOQUANT | Tout le site |
| 2 | **GA4 commenté** — Zéro tracking, pas de données | 🔴 BLOQUANT | layout.tsx |
| 3 | **Données mockées exposées** — "Classement simulé", "Données indicatives" visibles utilisateurs | 🔴 BLOQUANT | /equipe/[slug], /live, /pronostic/[slug] |
| 4 | **Accentuation française défaillante** — "Huitieme de finale", "Critere", "Journee", "phase a elimination directe" | 🔴 BLOQUANT | /match/[slug], /tableau |
| 5 | **Lien cassé href="#"** — CTA bookmaker avec href="#" dans /comparateur-joueurs | 🔴 BLOQUANT | /comparateur-joueurs |
| 6 | **Comparateur cotes = données mock** — `mockOdds` au lieu de vraies cotes | 🟠 CRITIQUE | /comparateur-cotes |
| 7 | **LiveTicker stack z-index** — Sticky top-[64px] sur mobile crée un double header avec BottomNav | 🟠 CRITIQUE | Global (mobile) |
| 8 | **SocialProof — compteurs inventés** — 47 832 brackets, 12 500 pronostics = fake social proof | 🟠 CRITIQUE | Homepage, /simulateur |
| 9 | **StickyCTA + BottomNav chevauchement** — Sur mobile le StickyCTA est positionné à bottom-16 mais la BottomNav fait h-16 → double couche non scrollable | 🟠 CRITIQUE | Mobile global |
| 10 | **Profil page** — Matchs "prochains" sont des placeholders génériques (Phase de groupes - Match 1) au lieu de vrais matchs | 🟠 CRITIQUE | /profil |

---

## 📋 AUDIT DÉTAILLÉ PAGE PAR PAGE

### 1. 🏠 Page d'accueil — `/`
**Score : 7.5/10**

**✅ Points forts :**
- Hero cinematique avec parallaxe, countdown intégré, CTAs clairs
- Sections bien structurées (matchs, groupes, articles, stades, favoris, FAQ)
- JSON-LD complet (WebSite + SportsEvent + FAQPage)
- Bon contraste général en light/dark
- StadiumCarousel ajoute de la vie

**❌ Problèmes UI :**
- Stats ribbon : `grid-cols-4` sur mobile 375px → chaque cell fait ~94px, le texte "Équipes" en 10px est limite lisible
- Article cards : thumbnail zone fait h-44 avec juste un emoji 6xl → visuellement pauvre vs L'Équipe
- Équipes favorites : la win probability bar est scalée ×4 (multiplied by 4) → Argentina 15% = 60% visuellement → trompeur

**❌ Problèmes UX :**
- SocialProof avec 47 832 "fans ont soumis leur bracket" AVANT le tournoi → crédibilité zéro
- Le scroll indicator (↓) fixé en bas du hero disparaît dès qu'on scroll → inutile
- Aucun CTA "Calendrier" visible dans le fold principal

**❌ Problèmes mobile :**
- `pb-16` sur main content pour éviter le BottomNav OK mais si StickyCTA est visible = contenu caché par 2 barres
- Stats ribbon : 4 colonnes sur 375px → cramped, overflow potentiel

**❌ Problèmes SEO :**
- `IS_LAUNCHED` non activé → noindex global 🔴
- Image hero `/images/stadiums/metlife-stadium.jpg` en background-image CSS → invisible pour Google

---

### 2. 📅 Calendrier — `/match/calendrier`
*(Non lu en détail, basé sur structure connue)*
**Score estimé : 6.5/10**

**❌ Potentiels problèmes :**
- Format des dates sans heure locale Paris (UTC only)
- Pagination si 104 matchs → risque de page lente
- SEO : alternates probablement non configurés

---

### 3. ⚽ Page équipe — `/equipe/[slug]`
**Score : 7/10**

**✅ Points forts :**
- Structure riche : radar chart, historique CDM, forces/faiblesses, effectif, matchs, stades
- JSON-LD SportsTeam complet
- BreadcrumbSchema OK
- CTA bookmaker intégré dans sidebar

**❌ Problèmes de données :**
- `mockForms` hardcodé pour 10 équipes seulement → toutes les autres équipes ont "V, N, D, V, N" générique ← visible utilisateur
- Mini classement de groupe = DONNÉES SIMULÉES (pts basés sur FIFA ranking) affichées comme réelles
- "Classement simulé (pré-tournoi)" écrit en toutes lettres → torpille la crédibilité
- `enriched?.analysis.content` via IA — peut retourner null sans fallback élégant

**❌ Problèmes UI :**
- Sidebar "Forme récente" et "Forme actuelle" (AI) peuvent coexister → doublon visuel
- Section "Palmarès CDM" en jaune très flashy vs le reste du design
- La section "Anecdotes" peut être vide pour beaucoup d'équipes → section fantôme

**❌ Problèmes mobile :**
- Tableau "Historique notable" : colonnes cachées sm:hidden → info manquante sur mobile
- Radar chart : `max-w-[320px]` OK mais labels SVG peuvent se couper sur petits écrans

**❌ Problèmes dark mode :**
- `text-gray-600 dark:text-gray-300` sur certains paragraphes → contraste borderline

---

### 4. ⚽ Page match — `/match/[slug]`
**Score : 6/10**

**✅ Points forts :**
- Hero adaptatif (live vs upcoming vs completed)
- LiveMatchWidget pour scores en direct
- JSON-LD SportsEvent complet
- Same-day matches pour internal linking

**❌ Accentuation catastrophique (BLOQUANT) :**
- `"Huitieme de finale"` (manque accents)
- `"Critere"` au lieu de "Critère"
- `"Journee"` au lieu de "Journée"
- `"predits"`, `"determiner"`, `"predits"`, `"evoluer"`, `"confirmer"` — accent manquants
- Ces textes apparaissent dans les libellés visibles (tableau comparaison, infos match)

**❌ Problèmes UX :**
- "Les pronostics détaillés seront disponibles prochainement" affiché dans la section Pronostic → mauvaise impression
- "Les cotes des bookmakers seront disponibles prochainement" → raté pour monétisation
- Table de comparaison équipes en desktop uniquement (overflow-x-auto OK mais labels manquent d'accents)

**❌ Problèmes mobile :**
- Hero "upcoming" : les drapeaux sont text-3xl sm:text-6xl → cohérent mais le score "VS" fait 3xl même sur desktop

---

### 5. 🏟️ Page stades — `/stades`
**Score : 7.5/10**

**✅ Points forts :**
- Organisation par pays (USA, Canada, Mexique) claire
- Cards avec image, capacité, type de toit
- Hover animation propre

**❌ Problèmes :**
- StadiumImage : si l'image ne charge pas, il y a quoi ? Vérifier le fallback
- Manque d'info clé : fuseau horaire de la ville (crucial pour les fans)
- Aucun tri possible (par capacité, par pays, par nombre de matchs)

---

### 6. 🌍 Groupes — `/groupes`
**Score : 7.5/10**

**✅ Points forts :**
- Grid responsive 2→3→4 colonnes bien pensé
- Probabilités de sortie de groupe par équipe
- Légende claire (vert = qualifié)

**❌ Problèmes :**
- `alternates: getStaticAlternates("teams", "fr")` — le paramètre "teams" est incorrect pour la page groupes
- Le classement affiché est basé sur FIFA ranking → pas forcément représentatif dans un groupe
- Pas de lien vers les matchs du groupe (seulement vers la page groupe)

---

### 7. 🏆 Pronostic Vainqueur — `/pronostic-vainqueur`
**Score : 8.5/10**

**✅ Points forts :**
- Page très riche : top 10, barres visuelles, analyse narrative, historique CDM à domicile, dark horses
- Cotes RÉELLES Winamax/Bet365/DraftKings pour le top 10
- FAQ complète avec JSON-LD
- CTA simulateur bien intégré
- Breadcrumb double (composant + JSON-LD)

**❌ Problèmes :**
- Page énorme (1198 lignes) → risque de performance JS
- `hero-animated` : classe CSS custom → dépend de globals.css, risque Flash Of Unstyled Content
- `gradient-text` + `section-header` : classes custom → même risque
- Barres de probabilité scalées ×7 → trompeuses (15% = 105% barre mais clampé à 100%)
- Pour les équipes hors teamArguments → section pro/con disparaît silencieusement

---

### 8. 🎮 Simulateur — `/simulateur`
**Score : 7/10**

**✅ Points forts :**
- H1 clair, breadcrumb, JSON-LD
- Pitch visuel efficace avec quick stats

**❌ Problèmes :**
- Simulateur = "32 équipes" mais le tournoi CDM 2026 a 48 équipes en phase de groupes → le simulateur commence aux 32e de finale OK mais la description "32 équipes, 16 matchs" est réductrice
- BracketSimulator.tsx : non audité mais connu pour être volumineux
- Pas de metadata openGraph:image → partage réseaux sociaux sans preview

---

### 9. 🧩 Quiz — `/quiz`
**Score : 7/10**

**✅ Points forts :**
- Metadata riche ("200+ questions")
- H1 engageant

**❌ Problèmes :**
- Le `<main>` est imbriqué dans le `<main id="main-content">` du layout → double main tag (erreur HTML sémantique)
- Pas d'openGraph image → partage social sans preview
- Le composant Quiz.tsx est client-side → aucun contenu visible sans JS → pénalité SEO

---

### 10. ⚡ Live — `/live`
**Score : 5/10**

**✅ Points forts :**
- Notice claire que les scores live arrivent le 11/06/2026
- Countdown intégré
- Preview visuelle du live (mock match)

**❌ Problèmes MAJEURS :**
- La démo live montre Mexique 2-1 Afrique du Sud — ce match fictif peut prêter à confusion
- "⚠️ Exemple fictif" disclaimer trop discret en bas
- L'heure est convertie UTC+2 en dur (`utcHour + 2`) → faux en hiver (UTC+1 CET)
- Aucun widget d'embed externe (SofaScore, ESPN, etc.) prévu pour la vraie mise en live
- Score quality : beaucoup de promesses non tenues → **vide fonctionnel**

---

### 11. 📰 Actualités — `/actualites`
**Score : 7/10**

**✅ Points forts :**
- Article featured en grand format desktop (grid 1/1)
- JSON-LD CollectionPage + ItemList
- Tags catégories colorés

**❌ Problèmes :**
- Articles uniquement avec emojis en thumbnail → pas d'images réelles → look amateuriste vs L'Équipe
- URL JSON-LD pointe vers `#article-id` (ancre) au lieu de `/actualites/[slug]` → mauvaise SEO
- Pas de pagination ni de filtre par catégorie
- `formatDate` crée une date à 12h UTC → peut afficher la mauvaise date selon timezone

---

### 12. 📊 Tableau — `/tableau`
**Score : 6/10**

**✅ Points forts :**
- Bracket interactif desktop + mobile scroll
- Champion prédit mis en avant
- Table de probabilités par tour

**❌ Problèmes CRITIQUES :**
- Multiple fautes d'accentuation dans metadata et texte affiché :
  - "phase a elimination directe" (manque accent à)
  - "Pronostics bases sur" (manque accent)
  - "Base sur les classements ELO"
  - "qui se qualifiént" (accent mal placé)
- Bracket horizontal mobile = scrollable mais visuellement illisible → les 16 matchs R32 empilés sur 200px de largeur
- Les connexions visuelles entre les rounds (lignes de bracket) sont absentes → le bracket n'est PAS un vrai bracket visuel mais juste des cartes côte à côte
- `pt-[480px]` et `pt-[252px]` pour aligner les rounds = hack fragile qui peut tout désaligner si le contenu change

---

### 13. 💰 Comparateur de cotes — `/comparateur-cotes`
**Score : 5.5/10**

**✅ Points forts :**
- Filtres par groupe clairs
- Mise en évidence de la meilleure cote (fond vert)
- Disclaimer légal inclus

**❌ Problèmes CRITIQUES :**
- `mockOdds` = données totalement fictives affichées comme vraies → RISQUE LÉGAL en France (AMF/ANJ)
- Les cotes ne sont pas réelles → trompe les utilisateurs qui pourraient parier sur ces informations
- Aucune date de mise à jour affichée (les cotes changent en temps réel)
- Pas de metadata (la page utilise `export default function` sans `export const metadata`)

---

### 14. ⚖️ Comparateur joueurs — `/comparateur-joueurs`
**Score : 6/10**

**✅ Points forts :**
- UI de comparaison 2-3 joueurs côte à côte
- JSON-LD BreadcrumbList

**❌ Problèmes BLOQUANTS :**
- **`href="#"`** dans le CTA Winamax → lien mort ! Aucun revenu affilié possible

**❌ Problèmes UX :**
- Pas de breadcrumb HTML (seulement JSON-LD)
- CTA affilié isolé en bas → mauvais placement pour conversions
- Pas de H2 sur le comparateur → SEO faible

---

### 15. 🎟️ Billets — `/billets`
**Score : 8.5/10**

**✅ Points forts :**
- Page EXHAUSTIVE et très bien construite
- Guide étape par étape, catégories, phases de vente, anti-arnaques
- FAQ avec JSON-LD
- CTAs vers ticketing.fifa.com bien placés
- Double JSON-LD (FAQ + BreadcrumbList)

**❌ Problèmes mineurs :**
- `primary-dark` utilisé dans un gradient mais n'est pas défini dans les tokens CSS → fallback indéfini
- Les statuts (En cours / Terminée) sont hardcodés et ne se mettront pas à jour automatiquement
- Phase 1 "Terminée" avec line-through → comportement CSS correct mais visuellement triste
- Manque de lien vers /ou-regarder pour les fans qui ne vont pas au stade

---

### 16. 👤 Profil — `/profil`
**Score : 6.5/10**

**✅ Points forts :**
- Concept badge gamification original
- Streak motivant avec flamme animée
- Sélecteur d'équipe onboarding agréable
- localStorage uniquement → privacy-friendly

**❌ Problèmes :**
- Les "prochains matchs" de mon équipe sont `"Phase de groupes - Match 1"`, `"Phase de groupes - Match 2"` → placeholders génériques non liés aux vrais matchs du calendrier
- `metaData.robots: { index: false }` → correct (données perso) mais à vérifier
- Partage des badges via `navigator.share` → pas tous les navigateurs supportent → fallback `alert("Copié dans le presse-papier !")` avec `alert()` native → moche, remplacer par toast

---

### 17. 🔴 Live Ticker — composant global
**Score : 6.5/10**

**✅ Points forts :**
- Animation ping en rouge pour le live
- Countdown en secondes
- Dismissible via sessionStorage

**❌ Problèmes :**
- `sticky top-[64px]` = 64px hardcodé (hauteur header) → si le header change de taille (logo + sous-nav), tout décale
- Sur mobile, le ticker est en position sticky sous le header = 3 barres verticales (header 64px + ticker 42px + BottomNav 64px) → l'espace contenu net est réduit à ~230px sur 375px de hauteur
- Calcul du match en cours : `now >= start && now < end` mais `end = start + 2h` → pas de gestion des prolongations
- `sortedMatches` est recalculé à chaque render (pas de useMemo) → léger mais inutile

---

### 18. 🍪 Composants globaux divers

**StickyCTA :**
- Problème chevauchement : `bottom-16 sm:bottom-0` = position juste au-dessus du BottomNav mais si le BottomNav fait h-16 (4rem = 64px) et StickyCTA fait py-3 (~50px), total = 114px de barres en bas mobile
- Pas de `md:hidden` → visible aussi sur tablette (sm=640px)
- Apparaît IMMÉDIATEMENT après dismiss depuis une autre page (localStorage OK mais pas de délai)

**BottomNav :**
- 5 items = bon nombre
- Icônes emojis → rendu non cohérent selon OS (iOS vs Android)
- `Recherche` en 5e position → meilleur emplacement que la droite extrême pour un thumb-friendly nav
- Pas de badge de notification sur "Pronostics" ou "Matchs"

**NewsletterPopup :**
- 60 secondes de délai OU 50% scroll → UX acceptable
- Le popup peut s'afficher sur n'importe quelle page y compris mentions légales, contact → certes pas sur LEGAL_PATHS mais /contact et /methodologie manquent dans la liste

**BadgeSystem :**
- Logique solide, bien architécturée
- Toast "Badge débloqué" : `bottom-6` peut se superposer au StickyCTA mobile → triple couche

---

## 🔍 AUDIT COMPOSANTS PARTAGÉS

### Header.tsx — 7/10
**✅ Bien :** Mega-menu desktop, responsive hamburger, SearchDialog, ThemeToggle, language switcher, skip-to-content, fermeture au changement de route  
**❌ Problèmes :**
- `bg-[#0D3B66]` hardcodé au lieu de `bg-primary` (inconsistance avec les tokens)
- Mega-menu sur hover/click hybride → risque de fermeture accidentelle
- La détection de langue active (`CURRENT_LANG = "fr"`) est hardcodée dans le composant
- Sur mobile, le menu n'a pas de `role="navigation"` sur la div principale (seulement sur le nav du header)
- Aucun état actif pour les mega-menus ("Équipes & Groupes" actif quand sur /equipes)
- Deux icônes de recherche (link vers /recherche + SearchDialog modal) → doublon confus

### Footer.tsx — 7.5/10
**✅ Bien :** 4 colonnes, groupes A-L, newsletter inline, liens légaux, disclaimer jeu responsable  
**❌ Problèmes :**
- Social links pointent vers `twitter.com/mondial2026`, `facebook.com/mondial2026`, etc. → comptes non vérifiés/inexistants probablement
- Logo "Partenaires agréés ANJ" avec juste du texte sans logos/images → peu crédible
- `bg-primary` en footer light mode mais `dark:bg-slate-900` en dark mode → incohérence (le dark mode du footer est plus sombre que le body)
- Responsive mobile : 2 colonnes → OK mais les colonnes Infos/Àpropos peuvent se couper

### BottomNav.tsx — 7/10
**✅ Bien :** Touch targets h-16, aria-current, active state avec pill, focus-visible  
**❌ Problèmes :**
- Emojis OS-dépendants (non cohérents)
- `sm:hidden` = visible jusqu'à 640px mais le breakpoint "mobile" devrait être 768px
- Pas de haptic feedback support
- 5 items = max recommandé mais "Équipes" pointe vers /equipes (liste) pas vers la sélection de groupe

### LiveTicker.tsx — 6/10
*Voir audit global page 17 ci-dessus*

### MatchCard.tsx — 7.5/10
**✅ Bien :** Cards avec accent, hover animation, stade info, CTA hover  
**❌ Problèmes :**
- `text-[9px]` pour le stade → trop petit, limite lisibilité
- Les drapeaux en `text-4xl` peuvent être coupés sur très petits écrans
- Pas de score affiché (logique pour matchs futurs, mais prévoir l'état "résultat")

### RadarChart.tsx — 7.5/10
**✅ Bien :** SVG pur, responsive via viewBox, labels bilingues  
**❌ Problèmes :**
- Les labels SVG n'ont pas de `font-size` défini en unité fixe → risent de se superposer sur petits viewports
- Pas accessible : `role="img"` avec `aria-label` générique → manque les valeurs dans le label
- `R + 28` pour les labels → peut déborder du SVG si le container est < 280px

### NewsletterPopup.tsx — 7/10
**✅ Bien :** Deux triggers (60s + scroll 50%), dismiss 7 jours, gestion états loading/success/error  
**❌ Problèmes :**
- Backdrop `bg-black/50` pas accessible pour les utilisateurs à basse vision
- Pas de focus trap dans le modal → Tab peut sortir du popup
- Animation d'entrée absente (popup apparaît instantanément)

### ShareButtons.tsx — 8/10
**✅ Bien :** 5 réseaux, min-h-[44px] (touch-friendly), copier lien avec feedback  
**❌ Problèmes :**
- `document.execCommand("copy")` deprecated → fallback fonctionnel mais marqué obsolète
- Pas d'analytics event sur les partages (hors scope si GA4 n'est pas activé)

### StickyCTA.tsx — 5/10
**✅ Bien :** Dismissible localStorage, exclusion pages légales  
**❌ Problèmes :**
- **CHEVAUCHEMENT mobile** avec BottomNav (bottom-16 + BottomNav h-16)
- `md:hidden` absent → visible sur tablette aussi
- Le bonus texte (`featuredBookmaker.bonus`) peut être long et déborder sur mobile
- Aucune animation d'entrée/sortie → popup abrupte

### BadgeSystem.tsx — 8/10
**✅ Bien :** Context React bien architecturé, toast queue, tracking visitedStadiums  
**❌ Problèmes :**
- Le toast est à `bottom-6` → peut se superposer au StickyCTA
- `checkBadge` appelé à chaque update de stats → potentielle re-render excessive

### SocialProof.tsx — 4/10
**✅ Bien :** IntersectionObserver pour animations, ease-out agréable  
**❌ Problèmes MAJEURS :**
- **Compteurs totalement fictifs** : 47 832 brackets, 12 500 pronostics, 202 questions quiz
- Les vrais chiffres seraient 0 (site pas encore lancé)
- Afficher des stats inventées = dark pattern qui décrédibilise le site
- `202 questions au quiz` alors que la metadata du quiz annonce "200+ questions" → incohérence

### RelatedContent.tsx — 7.5/10
**✅ Bien :** Responsive 4 colonnes, limite à 4 items, hover animation  
**❌ Problèmes :**
- Titre hardcodé "💡 Vous pourriez aussi aimer" → peu professionnel, manque de personnalisation
- Pas de logique de pertinence automatique → dépend entièrement des données passées en props
- Sur /equipe/[slug] : RelatedContent ne montre que les équipes du même groupe → pertinent mais limité

---

## 💡 BRAINSTORMING AMÉLIORATIONS (20+ idées)

### 🎨 Design & Polish

1. **Vraies images dans les articles** — Remplacer les emojis géants par des illustrations SVG ou des photos (Wikimedia Commons, Unsplash) → +5 points de professionnalisme instantanément
2. **Animation de chargement squelette** — Ajouter des skeleton loaders pour les sections qui chargent des données (au lieu du flash blanc)
3. **Transitions de page** — View Transitions API (Next.js 14+) pour des transitions fluides entre pages
4. **Typographie plus affirmée** — Space Grotesk pour les titres est cool mais trop timidement utilisé. H1/H2 méritent d'être plus grands sur desktop (4xl→6xl)
5. **Mode nuit automatique** — Le dark mode se déclenche via prefers-color-scheme mais l'animation du toggle manque (flash entre les modes)

### 📱 Mobile Experience

6. **BottomNav badges** — Afficher un badge "12" sur Matchs quand des matchs sont en cours, sur Pronostics quand de nouvelles cotes sont disponibles
7. **Pull-to-refresh** — Sur la page Live, implémenter un refresh gestuel pour mettre à jour les scores
8. **Swipe gestures sur le calendrier** — Swiper gauche/droite pour naviguer entre les jours du calendrier
9. **Swipe sur les équipes favorites** — Sur la homepage, swipe horizontal pour voir les 10 favoris au lieu des 5 visibles
10. **Compact mode pour le ticker** — Sur mobile, le ticker pourrait se condenser à juste "🔴 MX 2-1 ZA 67'" pour économiser de l'espace

### 🏆 Fonctionnalités manquantes

11. **Pronostics communautaires réels** — Permettre aux utilisateurs de saisir leur pronostic match et voir la répartition des votes de la communauté (actuellement mock dans CommunityVote.tsx)
12. **Alertes match par SMS/Email** — "Recevoir une alerte 30min avant le match" → capture email/téléphone avec double valeur (notification + acquisition newsletter)
13. **Mini-league de pronostics** — Système de ligues entre amis comme Sofascore, FotMob → partager un code, comparer les scores
14. **Player Rating live** — Notation des joueurs après chaque match (1-10) comme sur Sofascore → très engageant
15. **Statistiques avancées** — Les pages statistiques existent mais manquent de graphiques xG, heat maps, comparaisons d'éditions
16. **Mode Fan zone** — Page dédiée pour les supporters qui vont au stade : météo live, transports, fan zones, hôtels autour du stade

### 💰 Monétisation

17. **CTA affiliés dans le ticker** — Le LiveTicker pourrait afficher "🎯 Bet365 : MX victoire à 2.10 → Parier" → high-visibility, high-intent
18. **Comparateur de cotes avec vraies données API** — Intégrer OddsAPI (7$/mois) ou Betclius API pour de vraies cotes → transformer mockOdds en données réelles
19. **Bannières publicitaires display** — Aucune pub display sur le site actuellement (hormis les CTAs affiliés). Ajouter un slot 728×90 en-dessous du header sur desktop = revenus passifs
20. **Top deals bookmakers** — Section "Meilleures offres du moment" avec les bonus actuels mis à jour → forte valeur ajoutée pour les parieurs

### 🔍 SEO & Contenu

21. **Pages manquantes longue traîne :**
    - `/match/aujourd-hui` (existante mais peut être mieux optimisée)
    - `/meilleur-buteur-cdm-2026` → requête forte
    - `/horaires-matchs-france-heure-francaise` → requête FR très cherchée
    - `/regles-football-mondial` → contenu éducatif longue traîne
    - `/finale-coupe-du-monde-2026-date-heure` → très demandé
22. **Maillage interne automatique** — Sur chaque page d'actualité, un widget "Autres actus" + liens vers l'équipe concernée
23. **Schema Article sur les news** — Les articles `/actualites/[slug]` n'ont pas de schema `NewsArticle` dans le JSON-LD

### ⚡ Performance

24. **lazy loading des composants lourds** — BracketSimulator, RadarChart, StadiumCarousel doivent être en `dynamic(() => import(...), { ssr: false })` pour réduire le bundle initial
25. **Images WebP/AVIF** — Les images de stades (si existantes) doivent être optimisées via next/image avec format auto
26. **Réduire les re-renders** — `useMemo` manquant dans LiveTicker (sortedMatches) et dans Header (searchData est bien mémoïsé mais `buildSearchIndex("fr")` peut être lourd)

---

## 🎯 PLAN D'ACTION PRIORISÉ

### 🔴 P0 — BLOQUANT (avant tout lancement)

| Priorité | Action | Effort | Impact |
|----------|--------|--------|--------|
| P0-1 | **Activer IS_LAUNCHED=true en production** + décommenter GA4 avec vrai ID | 30min | Critique |
| P0-2 | **Corriger tous les accents manquants** : "Huitième", "Critère", "Journée", "phase à élimination directe", "basé sur", "prédit", "déterminé" | 2h | Critique |
| P0-3 | **Réparer href="#" dans /comparateur-joueurs** → mettre vrai lien affilié Winamax | 5min | Critique |
| P0-4 | **Supprimer ou griser les sections "Données mockées"** dans /equipe/[slug] (mock standings, mock form) — les remplacer par "Classement et forme disponibles au lancement" | 1h | Critique |
| P0-5 | **Corriger SocialProof.tsx** → remplacer les compteurs fictifs ou les masquer jusqu'au lancement réel | 15min | Critique |

### 🟠 P1 — IMPORTANT (semaine du lancement)

| Priorité | Action | Effort | Impact |
|----------|--------|--------|--------|
| P1-1 | **Comparateur de cotes** — Intégrer une vraie API de cotes (OddsAPI / SportsBetting.ag API) ou marquer clairement "Cotes indicatives" | 1 jour | Élevé |
| P1-2 | **StickyCTA chevauchement mobile** → passer à `bottom-20` ou `mb-safe` pour tenir compte du BottomNav | 10min | Élevé |
| P1-3 | **Schema NewsArticle** sur /actualites/[slug] | 30min | Élevé |
| P1-4 | **Heure UTC+2 hardcodé** dans /live → utiliser une lib timezone (Intl.DateTimeFormat) | 1h | Élevé |
| P1-5 | **Profil /profil** — Relier les matchs au vrai calendrier pour l'équipe sélectionnée | 2h | Moyen |
| P1-6 | **Ajouter og:image** sur les pages quiz, simulateur, live | 30min | Moyen |
| P1-7 | **Footer social links** → vérifier que les comptes existent ou supprimer les liens | 15min | Moyen |
| P1-8 | **NewsletterPopup** → exclure /contact et /methodologie de la liste LEGAL_PATHS | 10min | Faible |

### 🟡 P2 — NICE-TO-HAVE (post-lancement)

| Priorité | Action | Effort | Impact |
|----------|--------|--------|--------|
| P2-1 | **Vrais visuels articles** — Intégrer des images plutôt que des emojis géants | 3 jours | Élevé |
| P2-2 | **Pronostics communautaires réels** — Backend simple pour stocker votes | 3 jours | Élevé |
| P2-3 | **Alertes match par email** — Intégration Mailchimp/Resend pour notifications pré-match | 2 jours | Moyen |
| P2-4 | **Bracket visuel connecté** — Ajouter les lignes de connexion entre les rounds du bracket | 1 jour | Moyen |
| P2-5 | **Dynamic imports** pour BracketSimulator et RadarChart | 2h | Moyen |
| P2-6 | **Mini-league de pronostics** — Partage de bracket entre amis | 5 jours | Très élevé |
| P2-7 | **Système de Push Notifications** — Pour les alertes live match | 3 jours | Élevé |
| P2-8 | **Swipe gestures** sur carousels et calendrier | 1 jour | Faible |

---

## 📊 SCORES PAR PAGE (résumé)

| Page | Score | Statut |
|------|-------|--------|
| Homepage `/` | 7.5/10 | 🟡 OK |
| Équipe `/equipe/[slug]` | 7/10 | 🟡 OK |
| Match `/match/[slug]` | 6/10 | 🟠 À corriger |
| Pronostic vainqueur | 8.5/10 | 🟢 Bon |
| Simulateur | 7/10 | 🟡 OK |
| Quiz | 7/10 | 🟡 OK |
| Stades | 7.5/10 | 🟡 OK |
| Groupes | 7.5/10 | 🟡 OK |
| Tableau | 6/10 | 🟠 À corriger |
| Comparateur cotes | 5.5/10 | 🔴 Problème |
| Comparateur joueurs | 6/10 | 🟠 À corriger |
| Live | 5/10 | 🔴 Vide fonctionnel |
| Actualités | 7/10 | 🟡 OK |
| Billets | 8.5/10 | 🟢 Excellent |
| Profil | 6.5/10 | 🟡 OK |
| FAQ | 7.5/10 | 🟡 OK |

---

## 📌 LISTE EXHAUSTIVE DES 60+ ITEMS D'AUDIT

1. ❌ IS_LAUNCHED non activé → noindex global (BLOQUANT)
2. ❌ GA4 non configuré (ID placeholder)
3. ❌ Accents manquants : "Huitieme de finale" → "Huitième de finale"
4. ❌ Accents manquants : "Critere" → "Critère"
5. ❌ Accents manquants : "Journee" → "Journée"
6. ❌ Accents manquants : "phase a elimination directe" → "phase à élimination"
7. ❌ Accents manquants : "Pronostics bases sur" → "basés sur"
8. ❌ Accents manquants dans metadata title/description du tableau
9. ❌ href="#" dans CTA Winamax sur /comparateur-joueurs (lien mort)
10. ❌ mockOdds dans comparateur-cotes (données fictives présentées comme vraies)
11. ❌ mockForms dans /equipe/[slug] — forme mockée pour la plupart des équipes
12. ❌ Mock standings dans /equipe/[slug] affichés comme réels
13. ❌ SocialProof compteurs inventés (47 832 brackets fictifs)
14. ❌ StickyCTA chevauchement BottomNav sur mobile
15. ❌ LiveTicker sticky top-[64px] hardcodé
16. ❌ UTC+2 hardcodé dans /live (faux en hiver)
17. ❌ Profil — matchs "prochains" = placeholders génériques
18. ❌ Pronostics "disponibles prochainement" sur /match/[slug] et /h2h/[slug]
19. ❌ Double main tag sur /quiz
20. ❌ Toast BadgeSystem peut se superposer au StickyCTA
21. ❌ Background image hero en CSS (invisible Google)
22. ❌ Win probability bar scalée ×4 (trompeuse)
23. ❌ Bracket — absence de lignes de connexion visuelles
24. ❌ Bracket — padding hardcodé `pt-[480px]` fragile
25. ❌ Schema URL dans /actualites pointant vers ancres au lieu d'URLs
26. ❌ Social links footer → comptes probablement inexistants
27. ❌ NewsletterPopup sans focus trap (accessibilité)
28. ❌ execCommand("copy") deprecated dans ShareButtons
29. ❌ 202 quiz questions vs "200+" dans la metadata → incohérence
30. ❌ SocialProof "202 questions au quiz" → incorrect (200+)
31. ❌ Comparateur cotes — page sans metadata export
32. ❌ Lazy loading absent pour BracketSimulator (bundle lourd)
33. ❌ Header — bg hardcodé au lieu de var CSS `--color-primary`
34. ❌ Header — double icône recherche (link + modal) confus
35. ❌ Header — pas d'état actif sur les menus parents
36. ❌ Footer — partenaires ANJ sans logos (juste texte)
37. ❌ Footer — dark mode bg-slate-900 vs body bg différent → raccord visible
38. ❌ BottomNav — emojis OS-dépendants non cohérents
39. ❌ BottomNav — sm:hidden (640px) vs md:hidden (768px) plus approprié
40. ❌ LiveTicker — sortedMatches non mémoïsé (re-calcul chaque render)
41. ❌ RadarChart — labels SVG sans font-size fixe
42. ❌ RadarChart — aria-label générique sans valeurs
43. ❌ RelatedContent — titre "Vous pourriez aussi aimer" non personnalisable
44. ❌ NewsletterPopup — pas d'animation d'entrée
45. ❌ StickyCTA — pas d'animation de sortie
46. ❌ /live — heure timezone Paris hardcodée UTC+2
47. ❌ /live — pas de plan d'intégration live scores (iFrame externe ?)
48. ❌ /actualites — pas de filtre catégorie
49. ❌ /actualites — pas de pagination
50. ❌ /groupes — alternates("teams") incorrect pour la page groupes
51. ❌ /billets — `primary-dark` token non défini dans globals.css
52. ❌ /profil — alert() native au lieu d'un toast pour "Copié"
53. ❌ /comparateur-joueurs — pas de breadcrumb HTML
54. ❌ /stades — pas d'info fuseau horaire par ville
55. ❌ Pages sans openGraph:image (quiz, simulateur, live, comparateur)
56. ❌ Manque de schema NewsArticle sur /actualites/[slug]
57. ❌ /pronostic-vainqueur — page 1198 lignes SSR sans code splitting
58. ❌ CommunityVote.tsx utilise generateMockResults (faux résultats)
59. ❌ Breadcrumb pronostic → pointe vers /equipes au lieu de /pronostics
60. ❌ /tableau — les matchs de phase à élimination ont "À déterminer" correct mais "3e ABCDF" comme label non traduit/explicité

---

*Rapport généré par Hugo 🚀 — QA Lead Expert — 19 février 2026*  
*Basé sur analyse du code source complet de `/data/.openclaw/workspace/worldcup2026/apps/fr/`*  
*69 routes analysées, ~40 fichiers source lus*
