import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility E2E tests — WCAG contrast ratio checks on all major pages.
 * Uses axe-core to detect color contrast violations automatically.
 *
 * If a page has contrast issues (text-on-background ratio < 4.5:1 for normal text,
 * < 3:1 for large text), the test fails with details about the violating elements.
 */

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/equipes', name: 'Équipes' },
  { path: '/equipe/france', name: 'Équipe France' },
  { path: '/equipe/france', name: 'Équipe de France' },
  { path: '/groupes', name: 'Groupes' },
  { path: '/groupe/a', name: 'Groupe A' },
  { path: '/match/mexique-afrique-du-sud', name: 'Match' },
  { path: '/pronostic/vainqueur', name: 'Pronostic Vainqueur' },
  { path: '/pronostic/france', name: 'Pronostic France' },
  { path: '/buteurs', name: 'Buteurs' },
  { path: '/simulateur', name: 'Simulateur' },
  { path: '/calendrier', name: 'Calendrier' },
  { path: '/quiz', name: 'Quiz' },
  { path: '/stades', name: 'Stades' },
  { path: '/billets', name: 'Billets' },
  { path: '/newsletter', name: 'Newsletter' },
  { path: '/paris-sportifs', name: 'Paris Sportifs' },
  { path: '/actualites', name: 'Actualités' },
  { path: '/statistiques', name: 'Statistiques' },
  { path: '/histoire', name: 'Histoire' },
];

test.describe('Accessibility — Color Contrast', () => {
  for (const { path, name } of PAGES) {
    test(`${name} (${path}) should have no contrast violations`, async ({ page }) => {
      await page.goto(path, { waitUntil: 'domcontentloaded' });

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      // Log violations for debugging
      if (results.violations.length > 0) {
        const summary = results.violations.flatMap((v) =>
          v.nodes.map((n) => ({
            html: n.html.slice(0, 120),
            target: n.target.join(' > '),
            message: n.failureSummary?.split('\n')[1]?.trim() ?? v.help,
          }))
        );
        console.log(`\n❌ Contrast violations on ${name}:`);
        console.table(summary);
      }

      expect(results.violations).toHaveLength(0);
    });
  }
});

test.describe('Accessibility — Full WCAG 2.1 AA', () => {
  // Run full a11y audit on homepage only (to keep CI fast)
  test('Homepage should pass WCAG 2.1 AA', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('.hero-animated') // animated gradients can confuse axe
      .analyze();

    if (results.violations.length > 0) {
      console.log('\n❌ WCAG violations on Homepage:');
      for (const v of results.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
      }
    }

    // Allow minor violations but flag serious/critical ones
    const serious = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );
    expect(serious).toHaveLength(0);
  });
});
