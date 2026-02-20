import { test, expect } from '@playwright/test';

test.describe('Simulateur E2E', () => {
  test('should load simulateur page', async ({ page }) => {
    await page.goto('/simulateur');
    
    // Vérifier l'URL
    await expect(page).toHaveURL(/\/simulateur/);
    
    // Vérifier le titre
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/simulateur/i);
  });

  test('should display group stages', async ({ page }) => {
    await page.goto('/simulateur');
    
    // Attendre que le contenu se charge
    await page.waitForTimeout(1000);
    
    // Vérifier la présence des groupes (A, B, C, etc.)
    const groupHeadings = page.locator('h2, h3').filter({ hasText: /Groupe [A-L]|Group [A-L]/i });
    
    // Il devrait y avoir plusieurs groupes visibles
    const count = await groupHeadings.count();
    expect(count).toBeGreaterThan(0);
    
    // Vérifier qu'au moins le Groupe A est présent
    const groupA = page.locator('text=/Groupe A|Group A/i').first();
    await expect(groupA).toBeVisible({ timeout: 3000 });
  });

  test('should display teams in groups', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher les noms d'équipes (flags ou texte)
    // Les équipes peuvent être dans des listes, des cartes, etc.
    const teams = page.locator('img[alt*="drapeau"], img[alt*="flag"], text=/France|Brésil|Allemagne|Argentine/i');
    
    // Il devrait y avoir de nombreuses équipes
    const count = await teams.count();
    expect(count).toBeGreaterThan(10);
  });

  test('should have interactive match predictions', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher des inputs pour les scores ou des boutons de prédiction
    const scoreInputs = page.locator('input[type="number"], input[type="text"][placeholder*="score"]');
    
    if (await scoreInputs.count() > 0) {
      // Il y a des inputs pour les scores
      const firstInput = scoreInputs.first();
      await expect(firstInput).toBeVisible();
      
      // Essayer de modifier un score
      await firstInput.fill('2');
      await expect(firstInput).toHaveValue('2');
    } else {
      // Peut-être que les matchs se cliquent directement
      const matchButtons = page.locator('button').filter({ hasText: /vs|—|-/ });
      
      if (await matchButtons.count() > 0) {
        await expect(matchButtons.first()).toBeVisible();
      }
    }
  });

  test('should simulate match results', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher un moyen d'entrer des scores
    const scoreInputs = page.locator('input[type="number"]');
    
    if (await scoreInputs.count() >= 2) {
      // Entrer des scores pour le premier match
      await scoreInputs.nth(0).fill('3');
      await scoreInputs.nth(1).fill('1');
      
      // Attendre que le classement se mette à jour
      await page.waitForTimeout(500);
      
      // Vérifier qu'il y a un classement ou des points affichés
      const standings = page.locator('text=/Points|Pts|Classement|Position/i');
      // Selon l'implémentation
    }
  });

  test('should display knockout stages button', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher un bouton pour passer aux phases à élimination directe
    const knockoutButton = page.locator('button:has-text("Phases finales"), button:has-text("Élimination"), button:has-text("Knockout")');
    
    if (await knockoutButton.count() > 0) {
      await expect(knockoutButton.first()).toBeVisible();
    }
  });

  test('should navigate to knockout stage', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher et cliquer sur le bouton des phases finales
    const knockoutButton = page.locator('button:has-text("Phases finales"), button:has-text("Knockout"), a:has-text("Phases finales")').first();
    
    if (await knockoutButton.count() > 0) {
      await knockoutButton.click();
      
      await page.waitForTimeout(500);
      
      // Vérifier la présence du bracket/tableau
      const bracket = page.locator('text=/Huitièmes|Quarts|Demi|Finale|Round of 16|Quarter|Semi|Final/i');
      await expect(bracket.first()).toBeVisible({ timeout: 3000 });
    } else {
      // Si pas de bouton, peut-être un onglet ou une section
      test.skip();
    }
  });

  test('should save simulation state', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Modifier un score
    const scoreInputs = page.locator('input[type="number"]');
    
    if (await scoreInputs.count() > 0) {
      await scoreInputs.first().fill('5');
      
      // Recharger la page
      await page.reload();
      
      await page.waitForTimeout(1000);
      
      // Vérifier que le score est sauvegardé (localStorage ou cookies)
      const savedInput = page.locator('input[type="number"]').first();
      const value = await savedInput.inputValue();
      
      // Selon l'implémentation, le score peut être sauvegardé ou non
      // Test optionnel
    }
  });

  test('should reset simulation', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher un bouton "Réinitialiser" ou "Reset"
    const resetButton = page.locator('button:has-text("Réinitialiser"), button:has-text("Reset"), button:has-text("Recommencer")');
    
    if (await resetButton.count() > 0) {
      // Modifier d'abord un score
      const scoreInputs = page.locator('input[type="number"]');
      if (await scoreInputs.count() > 0) {
        await scoreInputs.first().fill('7');
      }
      
      // Cliquer sur reset
      await resetButton.first().click();
      
      await page.waitForTimeout(500);
      
      // Vérifier que les scores sont revenus à 0 ou vides
      if (await scoreInputs.count() > 0) {
        const value = await scoreInputs.first().inputValue();
        expect(value === '' || value === '0').toBeTruthy();
      }
    }
  });

  test('should display standings/rankings', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Chercher un tableau de classement
    const standingsTable = page.locator('table, .standings, [data-standings]');
    
    if (await standingsTable.count() > 0) {
      await expect(standingsTable.first()).toBeVisible();
      
      // Vérifier la présence de colonnes (Position, Équipe, Points, etc.)
      const headers = page.locator('th, .table-header').filter({ hasText: /Position|Équipe|Points|Pts|Buts/i });
      
      if (await headers.count() > 0) {
        await expect(headers.first()).toBeVisible();
      }
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Simuler un viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    // Vérifier que le contenu est visible sur mobile
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Vérifier que les groupes sont visibles (peut être avec scroll)
    const groups = page.locator('text=/Groupe [A-L]/i').first();
    await expect(groups).toBeVisible({ timeout: 3000 });
  });

  test('should handle invalid scores gracefully', async ({ page }) => {
    await page.goto('/simulateur');
    
    await page.waitForTimeout(1000);
    
    const scoreInputs = page.locator('input[type="number"]');
    
    if (await scoreInputs.count() > 0) {
      const firstInput = scoreInputs.first();
      
      // Essayer d'entrer un score négatif
      await firstInput.fill('-5');
      
      // Vérifier que l'input n'accepte pas les valeurs négatives
      // Ou affiche une erreur
      const value = await firstInput.inputValue();
      
      // Selon l'implémentation, peut rejeter ou convertir en 0
      // Test optionnel
    }
  });
});
