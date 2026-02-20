# 🎭 Tests E2E Playwright - cdm2026.fr

Tests end-to-end pour l'application Coupe du Monde 2026.

## 📋 Suites de Tests

### 1. `homepage.spec.ts` (7 tests)
- ✅ Chargement de la page
- ✅ Affichage du H1 principal
- ✅ Présence des liens de navigation
- ✅ Cliquabilité des liens
- ✅ Affichage du hero
- ✅ Responsive mobile
- ✅ Meta tags SEO

### 2. `navigation.spec.ts` (8 tests)
- ✅ Navigation homepage → équipes
- ✅ Navigation équipes → page équipe spécifique
- ✅ Navigation équipe → match
- ✅ Breadcrumb navigation
- ✅ Navigation à travers toutes les sections principales
- ✅ Maintien de l'état après reload
- ✅ Page 404

### 3. `search.spec.ts` (10 tests)
- ✅ Ouverture du dialog de recherche
- ✅ Présence de l'input de recherche
- ✅ Saisie dans l'input
- ✅ Affichage des résultats
- ✅ Clic sur un résultat
- ✅ Fermeture avec Escape
- ✅ Fermeture avec bouton close
- ✅ Gestion recherche vide
- ✅ Gestion aucun résultat

### 4. `quiz.spec.ts` (10 tests)
- ✅ Chargement de la page quiz
- ✅ Affichage du bouton start
- ✅ Démarrage du quiz
- ✅ Affichage des options de réponse
- ✅ Sélection d'une réponse
- ✅ Réponse et passage à la question suivante
- ✅ Affichage du feedback
- ✅ Complétion du quiz
- ✅ Redémarrage du quiz
- ✅ Suivi de la progression

### 5. `simulateur.spec.ts` (12 tests)
- ✅ Chargement de la page
- ✅ Affichage des phases de groupes
- ✅ Affichage des équipes dans les groupes
- ✅ Prédictions interactives des matchs
- ✅ Simulation des résultats
- ✅ Bouton phases finales
- ✅ Navigation vers knockout stage
- ✅ Sauvegarde de l'état
- ✅ Réinitialisation
- ✅ Affichage des classements
- ✅ Responsive mobile
- ✅ Gestion scores invalides

## 🚀 Utilisation

### Installation (déjà fait ✅)
```bash
npm install --save-dev @playwright/test
```

### Installer les navigateurs Playwright
```bash
npx playwright install
```

### Lancer les tests
```bash
# Tous les tests
npm run test:e2e

# Tests spécifiques
npx playwright test homepage
npx playwright test navigation
npx playwright test search
npx playwright test quiz
npx playwright test simulateur

# Mode UI (interactif)
npx playwright test --ui

# Mode debug
npx playwright test --debug

# Headed mode (voir le navigateur)
npx playwright test --headed
```

### Lancer sur un navigateur spécifique
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
```

## ⚙️ Configuration

La configuration se trouve dans `playwright.config.ts` :

- **Base URL :** `http://localhost:3099` (configurable via `BASE_URL` env var)
- **Navigateurs :** Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Parallélisation :** Activée
- **Screenshots :** Seulement en cas d'échec
- **Traces :** Seulement au premier retry
- **Reporter :** HTML

## 📊 Rapports

Après l'exécution, un rapport HTML est généré :

```bash
npx playwright show-report
```

## 🔧 Prérequis

**IMPORTANT :** Les tests nécessitent que le serveur Next.js soit lancé sur le port 3099.

```bash
# Lancer le serveur de production
npm run build
npm run start -- -p 3099

# OU lancer le serveur de dev
npm run dev -- -p 3099
```

Le `webServer` dans `playwright.config.ts` est configuré pour démarrer automatiquement le serveur avec `npm run start`, mais vous devez avoir buildé l'application au préalable.

## 🎯 Bonnes Pratiques

1. **Sélecteurs robustes :** Utiliser `data-testid` plutôt que des classes CSS
2. **Attentes explicites :** Utiliser `await expect().toBeVisible()` plutôt que `waitForTimeout`
3. **Isolation :** Chaque test doit être indépendant
4. **Nettoyage :** Réinitialiser l'état entre les tests si nécessaire

## 🐛 Debugging

```bash
# Mode debug avec pause
npx playwright test --debug

# Trace viewer (après un test avec trace)
npx playwright show-trace trace.zip

# Codegen (enregistrer des actions)
npx playwright codegen http://localhost:3099
```

## 📝 Ajouter de Nouveaux Tests

1. Créer un nouveau fichier `*.spec.ts` dans `__tests__/e2e/`
2. Importer `test` et `expect` depuis `@playwright/test`
3. Utiliser `test.describe()` pour grouper les tests
4. Écrire les tests avec `test()`

Exemple :
```typescript
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page');
    await expect(page.locator('h1')).toHaveText('My Title');
  });
});
```

## 🚨 Limites Actuelles

- Les tests ne sont **PAS** exécutés automatiquement (pas de serveur lancé lors de la création)
- Certains sélecteurs peuvent nécessiter des ajustements selon l'implémentation réelle
- Les tests utilisent des sélecteurs génériques qui peuvent être fragiles

## 🔄 CI/CD

Pour intégrer dans GitHub Actions :

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Build Next.js
  run: npm run build

- name: Run E2E Tests
  run: npm run test:e2e
```

---

**Total : 47 tests E2E**  
**Créé par Hugo 🚀 le 2026-02-20**
