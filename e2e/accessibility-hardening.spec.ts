import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectNoHighImpactViolations(page: import('@playwright/test').Page) {
  const result = await new AxeBuilder({ page }).analyze();
  const violations = result.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious');
  expect(violations, violations.map((violation) => `${violation.impact} ${violation.id}: ${violation.help}`).join('\n')).toEqual([]);
}

test('focused reader has no serious or critical automated accessibility violations', async ({ page }) => {
  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expectNoHighImpactViolations(page);
});

test('Reader Library Journey has no serious or critical automated accessibility violations', async ({ page }) => {
  await page.goto('/#bookmarks/journey');
  await expect(page.getByRole('heading', { name: 'Reading journey' })).toBeVisible({ timeout: 20_000 });
  await expectNoHighImpactViolations(page);
});

test('global search results have no serious or critical automated accessibility violations', async ({ page }) => {
  await page.goto('/#overview');
  const search = page.getByRole('combobox', { name: 'Search The Quiet Regular' });
  await search.fill('Sera');
  await expect(page.getByRole('dialog', { name: 'Search The Quiet Regular' })).toBeVisible({ timeout: 20_000 });
  await expectNoHighImpactViolations(page);
});
