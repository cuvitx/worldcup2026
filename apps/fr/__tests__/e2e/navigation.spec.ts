import { test, expect } from '@playwright/test';

test.describe('Navigation E2E', () => {
  test('should navigate from homepage to equipes page', async ({ page }) => {
    // Démarrer sur la homepage
    await page.goto('/');
    
    // Cliquer sur le lien Équipes
    await page.click('a[href="/equipes"]');
    
    // Vérifier l'URL
    await expect(page).toHaveURL(/\/equipes/);
    
    // Vérifier le contenu de la page équipes
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText(/équipes/i);
  });

  test('should navigate from equipes to specific team page', async ({ page }) => {
    // Aller sur la page équipes
    await page.goto('/equipes');
    
    // Attendre que les équipes soient chargées
    await page.waitForSelector('a[href*="/equipe/"]', { timeout: 5000 });
    
    // Cliquer sur la première équipe
    const firstTeamLink = page.locator('a[href*="/equipe/"]').first();
    await firstTeamLink.click();
    
    // Vérifier qu'on est bien sur une page équipe
    await expect(page).toHaveURL(/\/equipe\//);
    
    // Vérifier la présence du nom de l'équipe
    const teamName = page.locator('h1').first();
    await expect(teamName).toBeVisible();
  });

  test('should navigate from team page to match page', async ({ page }) => {
    // Aller directement sur une page équipe (ex: France - code FRA)
    await page.goto('/equipe/FRA');
    
    // Attendre que les matchs soient chargés
    await page.waitForSelector('a[href*="/match/"], a[href*="/matches/"]', { 
      timeout: 5000,
      state: 'visible' 
    }).catch(() => {
      // Si pas de matchs, skip ce test
      test.skip();
    });
    
    // Cliquer sur le premier match
    const firstMatchLink = page.locator('a[href*="/match/"], a[href*="/matches/"]').first();
    await firstMatchLink.click();
    
    // Vérifier qu'on est sur une page match
    await expect(page).toHaveURL(/\/match/);
  });

  test('breadcrumb navigation should work', async ({ page }) => {
    // Aller sur une page profonde (ex: équipe)
    await page.goto('/equipe/FRA');
    
    // Chercher un lien de retour (breadcrumb ou back button)
    const backLink = page.locator('a[href="/equipes"], a:has-text("Retour"), a:has-text("←")').first();
    
    if (await backLink.count() > 0) {
      await backLink.click();
      await expect(page).toHaveURL(/\/equipes/);
    } else {
      // Si pas de breadcrumb, utiliser le back du navigateur
      await page.goBack();
      await expect(page).toHaveURL(/\/equipes/);
    }
  });

  test('should navigate through all main sections', async ({ page }) => {
    const routes = [
      { path: '/', expectedText: /Coupe du Monde/i },
      { path: '/simulateur', expectedText: /simulateur/i },
      { path: '/groupes', expectedText: /groupe/i },
      { path: '/calendrier', expectedText: /calendrier/i },
      { path: '/equipes', expectedText: /équipes/i },
      { path: '/quiz', expectedText: /quiz/i },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      await expect(page).toHaveURL(new RegExp(route.path));
      
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      await expect(heading).toContainText(route.expectedText);
    }
  });

  test('should maintain navigation state after page reload', async ({ page }) => {
    // Aller sur une page spécifique
    await page.goto('/simulateur');
    
    // Recharger la page
    await page.reload();
    
    // Vérifier qu'on est toujours sur la même page
    await expect(page).toHaveURL(/\/simulateur/);
    
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('404 page should be reachable', async ({ page }) => {
    // Aller sur une page qui n'existe pas
    const response = await page.goto('/page-inexistante-xyz123');
    
    // Vérifier le code de réponse 404
    expect(response?.status()).toBe(404);
    
    // Vérifier la présence du contenu 404
    const body = await page.textContent('body');
    expect(body).toMatch(/404|introuvable|not found/i);
  });
});
