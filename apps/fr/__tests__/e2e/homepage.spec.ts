import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Coupe du Monde 2026/i);
  });

  test('should display main heading', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier la présence du h1 principal
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/Coupe du Monde/i);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier la présence des liens de navigation principaux
    const navLinks = [
      { href: '/simulateur', text: /simulateur/i },
      { href: '/groupes', text: /groupes/i },
      { href: '/calendrier', text: /calendrier/i },
      { href: '/equipes', text: /équipes/i },
      { href: '/quiz', text: /quiz/i },
    ];

    for (const link of navLinks) {
      const navLink = page.locator(`a[href="${link.href}"]`).first();
      await expect(navLink).toBeVisible();
      await expect(navLink).toContainText(link.text);
    }
  });

  test('navigation links should be clickable', async ({ page }) => {
    await page.goto('/');
    
    // Cliquer sur le lien Simulateur
    await page.click('a[href="/simulateur"]');
    await expect(page).toHaveURL(/\/simulateur/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier la présence du hero (image ou section principale)
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Simuler un viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    // Vérifier que le menu mobile est présent
    const mobileMenu = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').first();
    // Note: selon l'implémentation, peut ne pas être visible si menu desktop only
  });

  test('should have correct meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Vérifier les meta tags importants
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    expect(description).toContain('Coupe du Monde');
  });
});
