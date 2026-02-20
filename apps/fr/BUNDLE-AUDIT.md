# 📦 Bundle Size Audit - cdm2026.fr

**Date :** 2026-02-20  
**Auditeur :** Hugo 🚀 (QA & Audit)  
**Workspace :** `apps/fr/`

---

## 🎯 Objectif

Identifier les dépendances inutilisées et optimiser le bundle size de l'application Next.js.

---

## ⚙️ Configuration Bundle Analyzer

✅ **Déjà configuré dans `next.config.js`**

```javascript
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});
```

**Utilisation :**
```bash
ANALYZE=true npm run build
```

Cela génèrera un rapport HTML interactif dans `.next/analyze/` avec :
- Taille des bundles client/server
- Tree map des modules
- Distribution des chunks

---

## 🔍 Analyse Depcheck (dépendances inutilisées)

### ❌ Dépendances inutilisées détectées

#### Dependencies
```json
{
  "@tailwindcss/postcss": "^4.1.18",
  "postcss": "^8.4.31",
  "tailwindcss": "^4.1.18"
}
```

**Analyse :** Ces dépendances sont **FAUX POSITIFS**. Elles sont requises par :
- `postcss.config.mjs` (postcss + @tailwindcss/postcss)
- Next.js pour le build CSS (tailwindcss)

**Action :** ✅ GARDER (dépendances de build CSS)

---

#### DevDependencies
```json
{
  "@types/dompurify": "^3.0.5",
  "@types/react-dom": "^19.2.2"
}
```

**Analyse :**
1. **`@types/dompurify`** : Utilisé par `isomorphic-dompurify` (sécurité HTML). Dépendance de type pour TypeScript.
   - **Action :** ✅ GARDER (typage nécessaire)

2. **`@types/react-dom`** : Types React DOM.
   - **Vérification :** Peut être redondante si déjà dans @repo/ui
   - **Action :** ⚠️ VÉRIFIER (possiblement supprimable)

---

### ⚠️ Dépendances manquantes détectées

```
Missing dependencies:
* vitest: ./vitest.config.ts
* @testing-library/jest-dom: ./vitest.setup.ts
```

**Analyse :** Les fichiers de tests utilisent `vitest` et `@testing-library/jest-dom` mais ils ne sont pas dans `package.json` de `apps/fr/`.

**Action :** ✅ AJOUTER ces devDependencies :
```bash
npm install --save-dev vitest @testing-library/jest-dom @testing-library/react @vitejs/plugin-react
```

---

## 📊 Statistiques Bundle (apps/fr/)

| Métrique | Valeur |
|----------|--------|
| **node_modules size** | 52K |
| **Dependencies** | 12 dependencies |
| **DevDependencies** | 7 devDependencies |
| **Workspace packages** | 4 (@repo/ui, @repo/data, @repo/api, @repo/ai) |

---

## 🔧 Recommandations

### 🟢 Priorité Haute

1. **Ajouter les dépendances de test manquantes :**
   ```bash
   cd apps/fr
   npm install --save-dev vitest @testing-library/jest-dom @testing-library/react @vitejs/plugin-react
   ```

2. **Analyser le bundle size avec webpack-bundle-analyzer :**
   ```bash
   ANALYZE=true npm run build
   ```
   Puis ouvrir `.next/analyze/client.html` et `.next/analyze/server.html`

### 🟡 Priorité Moyenne

3. **Vérifier l'utilisation de `@types/react-dom` :**
   - Si déjà dans `@repo/ui`, possiblement supprimable
   - Vérifier les imports TypeScript dans `apps/fr/`

4. **Optimiser les images :**
   - Vérifier que les formats AVIF/WebP sont bien utilisés
   - Audit des images dans `public/`

5. **Tree-shaking :**
   - Vérifier que les imports de `leaflet` et `react-leaflet` sont optimisés
   - Utiliser des imports nommés plutôt que `import *`

### 🔵 Priorité Basse

6. **Audit des workspace packages (@repo/*) :**
   - Vérifier la taille des packages internes
   - Possiblement lazy-load certains modules (AI, quiz, simulateur)

7. **Code splitting :**
   - Lazy load des composants lourds (Map, Quiz, Simulateur)
   - Utiliser `next/dynamic` avec `ssr: false` pour les composants client-only

---

## 📝 Plan d'Action

### Phase 1 : Fixes critiques
- [ ] Ajouter vitest + @testing-library/jest-dom dans devDependencies
- [ ] Lancer ANALYZE=true build pour visualiser le bundle

### Phase 2 : Optimisations
- [ ] Vérifier @types/react-dom (possiblement supprimable)
- [ ] Implémenter lazy loading pour Map/Quiz/Simulateur
- [ ] Optimiser les imports de leaflet

### Phase 3 : Monitoring
- [ ] Configurer bundle size budget dans next.config.js
- [ ] Ajouter bundle size check dans CI/CD
- [ ] Documenter le process d'analyse

---

## 🎯 Métriques de Succès

| Objectif | Valeur Cible | Statut |
|----------|--------------|--------|
| **Bundle JS initial** | < 200KB (gzip) | ⏳ À mesurer |
| **Total JS chargé** | < 500KB (gzip) | ⏳ À mesurer |
| **First Load JS** | < 300KB | ⏳ À mesurer |
| **Dépendances inutilisées** | 0 | ⚠️ 2 à vérifier |

---

## 📚 Ressources

- [Next.js Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
- [Depcheck](https://github.com/depcheck/depcheck)
- [Next.js Tree Shaking](https://nextjs.org/docs/app/building-your-application/optimizing/package-bundling)

---

**Rapport généré par Hugo 🚀**  
*Pour lancer l'analyse : `ANALYZE=true npm run build` dans apps/fr/*
