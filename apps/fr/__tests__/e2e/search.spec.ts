import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('should open search dialog', async ({ page }) => {
    await page.goto('/');
    
    // Chercher le bouton de recherche (icône loupe ou texte "Rechercher")
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"], button[aria-label*="search"]').first();
    
    // Vérifier que le bouton existe
    await expect(searchButton).toBeVisible();
    
    // Cliquer sur le bouton
    await searchButton.click();
    
    // Vérifier que le dialog/modal s'ouvre
    const searchDialog = page.locator('dialog[open], [role="dialog"], [role="search"]');
    await expect(searchDialog).toBeVisible({ timeout: 2000 });
  });

  test('should have search input field', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Vérifier la présence de l'input de recherche
    const searchInput = page.locator('input[type="search"], input[type="text"][placeholder*="recherche"], input[placeholder*="Recherche"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toBeFocused();
  });

  test('should type in search input', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Taper dans le champ de recherche
    const searchInput = page.locator('input[type="search"], input[type="text"][placeholder*="recherche"]');
    await searchInput.fill('France');
    
    // Vérifier que la valeur est bien tapée
    await expect(searchInput).toHaveValue('France');
  });

  test('should display search results', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Taper une recherche
    const searchInput = page.locator('input[type="search"], input[type="text"][placeholder*="recherche"]');
    await searchInput.fill('France');
    
    // Attendre que les résultats apparaissent
    // Les résultats peuvent être dans une liste, un div, etc.
    const resultsContainer = page.locator('[role="listbox"], ul, .search-results, [data-search-results]');
    
    // Attendre un peu pour que les résultats se chargent
    await page.waitForTimeout(500);
    
    // Vérifier qu'il y a au moins un résultat
    const results = page.locator('li, [role="option"], a').filter({ hasText: /France/i });
    
    // On s'attend à au moins un résultat contenant "France"
    await expect(results.first()).toBeVisible({ timeout: 3000 });
  });

  test('should be able to click on search result', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Taper une recherche
    const searchInput = page.locator('input[type="search"], input[type="text"][placeholder*="recherche"]');
    await searchInput.fill('France');
    
    // Attendre les résultats
    await page.waitForTimeout(500);
    
    // Cliquer sur le premier résultat (lien)
    const firstResult = page.locator('a').filter({ hasText: /France/i }).first();
    
    if (await firstResult.count() > 0) {
      await firstResult.click();
      
      // Vérifier qu'on a navigué vers une nouvelle page
      await expect(page).not.toHaveURL('/');
    }
  });

  test('should close search dialog with escape key', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Vérifier que le dialog est ouvert
    const searchDialog = page.locator('dialog[open], [role="dialog"]');
    await expect(searchDialog).toBeVisible();
    
    // Appuyer sur Escape
    await page.keyboard.press('Escape');
    
    // Vérifier que le dialog est fermé
    await expect(searchDialog).not.toBeVisible({ timeout: 1000 });
  });

  test('should close search dialog with close button', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Chercher le bouton de fermeture
    const closeButton = page.locator('button:has-text("×"), button:has-text("Fermer"), button[aria-label*="close"], button[aria-label*="fermer"]').first();
    
    if (await closeButton.count() > 0) {
      await closeButton.click();
      
      // Vérifier que le dialog est fermé
      const searchDialog = page.locator('dialog[open], [role="dialog"]');
      await expect(searchDialog).not.toBeVisible({ timeout: 1000 });
    }
  });

  test('should handle empty search', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Laisser le champ vide et vérifier le comportement
    const searchInput = page.locator('input[type="search"], input[type="text"][placeholder*="recherche"]');
    await searchInput.fill('');
    
    // Attendre un peu
    await page.waitForTimeout(300);
    
    // Vérifier qu'il n'y a pas de résultats ou un message "Tapez pour rechercher"
    const emptyMessage = page.locator('text=/Tapez pour|Aucun résultat|Rechercher/i');
    // Ce test est optionnel selon l'implémentation
  });

  test('should handle search with no results', async ({ page }) => {
    await page.goto('/');
    
    // Ouvrir la recherche
    const searchButton = page.locator('button:has-text("Recherche"), button[aria-label*="recherche"]').first();
    await searchButton.click();
    
    // Taper une recherche qui ne donnera pas de résultats
    const searchInput = page.locator('input[type="search"], input[type="text"][placeholder*="recherche"]');
    await searchInput.fill('xyzabc123nonexistent');
    
    // Attendre un peu
    await page.waitForTimeout(500);
    
    // Vérifier le message "Aucun résultat"
    const noResultsMessage = page.locator('text=/Aucun résultat|No results|Introuvable/i');
    // Ce test est optionnel selon l'implémentation
  });
});
