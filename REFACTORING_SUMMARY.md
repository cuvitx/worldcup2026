# ♻️ Refactoring: Composants FAQSection & Breadcrumb

**Date:** 2026-02-20  
**Par:** Lucas ⚛️

## 📊 Résumé quantitatif

- ✅ **23 fichiers modifiés**
- 🔻 **356 lignes supprimées** (duplication éliminée)
- 🔺 **104 lignes ajoutées** (nouveaux composants + imports)
- 🎯 **Net: -252 lignes** de code en moins

## 🆕 Nouveaux composants créés

### 1. `FAQSection` (`packages/ui/src/faq-section.tsx`)
- **Props:** `{ title?: string; items: { question: string; answer: string }[] }`
- **Fonctionnalités:**
  - Accordéon `<details>` avec style unifié
  - JSON-LD Schema.org automatique pour SEO
  - Style cohérent dark mode
- **Exported depuis:** `@repo/ui/faq-section`

### 2. `Breadcrumb` (`packages/ui/src/breadcrumb.tsx`)
- **Props:** `{ items: { label: string; href?: string }[] }`
- **Fonctionnalités:**
  - Fil d'Ariane HTML sémantique
  - JSON-LD BreadcrumbList automatique via `BreadcrumbSchema`
  - Détection automatique du dernier élément (pas de lien)
- **Exported depuis:** `@repo/ui/breadcrumb`

## 📝 Pages migrées

### FAQSection (5 pages)
1. ✅ `apps/fr/app/page.tsx` (Homepage)
2. ✅ `apps/fr/app/pronostic-vainqueur/page.tsx`
3. ✅ `apps/fr/app/ou-regarder/page.tsx`
4. ✅ `apps/fr/app/equipe-de-france/page.tsx`
5. ✅ `apps/fr/app/billets/page.tsx`

### Breadcrumb (9 pages)
1. ✅ `apps/fr/app/palmares/page.tsx`
2. ✅ `apps/fr/app/faq/page.tsx`
3. ✅ `apps/fr/app/pronostic-vainqueur/page.tsx`
4. ✅ `apps/fr/app/ou-regarder/page.tsx`
5. ✅ `apps/fr/app/equipe-de-france/page.tsx`
6. ✅ `apps/fr/app/billets/page.tsx`
7. ✅ `apps/fr/app/methodologie/page.tsx`
8. ✅ `apps/fr/app/contact/page.tsx`
9. ✅ `apps/fr/app/mentions-legales/page.tsx`

## ⚠️ Fichiers non migrés (24)

Les pages dynamiques `[slug]` et certaines pages statiques utilisent encore l'ancien pattern `BreadcrumbSchema`. Migration possible plus tard si nécessaire :

- `apps/fr/app/pronostic-match/[slug]/page.tsx`
- `apps/fr/app/buteur/[slug]/page.tsx`
- `apps/fr/app/stade/[slug]/page.tsx`
- `apps/fr/app/match/[slug]/page.tsx`
- `apps/fr/app/equipe/[slug]/page.tsx`
- `apps/fr/app/joueur/[slug]/page.tsx`
- ... (18 autres)

Ces pages ont des breadcrumbs dynamiques qui nécessitent des données runtime (slug, nom d'équipe, etc.). Le refactoring est possible mais moins urgent.

## ✅ Validation

- [x] TypeScript: `npx tsc --noEmit` ✅ **PASSED**
- [ ] Build production: **NON FAIT** (règle du projet)
- [ ] Visual QA: **NON FAIT** (règle du projet)
- [x] Composants exportés correctement dans `packages/ui/package.json`

## 💡 Bénéfices

1. **Maintenabilité:** Un seul endroit pour modifier le style des FAQ/breadcrumbs
2. **Cohérence:** Style unifié sur toutes les pages
3. **SEO:** JSON-LD automatique, plus de risque d'oubli
4. **DX:** Props typées, autocomplete IDE
5. **Performance:** Aucun impact (SSR Next.js identique)

## 🚀 Prochaines étapes (optionnel)

- Migrer les 24 pages dynamiques restantes si souhaité
- Créer d'autres composants réutilisables si duplication détectée
- Documenter les composants UI dans un Storybook (future)

---

**Note:** Les anciens composants locaux (FaqSection, BilletsFaqSection, etc.) peuvent être supprimés maintenant qu'ils ne sont plus utilisés.
