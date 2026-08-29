import { test, expect } from '@playwright/test';

async function openLibrary(page: import('@playwright/test').Page) {
  await page.goto('/#bookmarks');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
}

test('impossible chapter routes fall back to the chapter archive', async ({ page }) => {
  await page.goto('/#chapter/1/999');
  await expect(page.getByRole('heading', { name: /Read The Quiet Regular/ })).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.reader-prose')).toHaveCount(0);
});

test('malformed percent-encoded hashes cannot crash the production shell', async ({ page }) => {
  await page.goto('/#%E0%A4%A');
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.content h2').first()).toBeVisible();
  await expect(page.locator('.app-boot--error')).toHaveCount(0);
});

test('Reader Library tabs support standard arrow, Home, and End keyboard navigation', async ({ page }) => {
  await openLibrary(page);
  const saved = page.getByRole('tab', { name: /Saved/ });
  await saved.focus();
  await page.keyboard.press('ArrowRight');
  const journey = page.getByRole('tab', { name: /Journey/ });
  await expect(journey).toBeFocused();
  await expect(journey).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: /Journey/ })).toBeVisible();

  await page.keyboard.press('End');
  const backup = page.getByRole('tab', { name: 'Backup' });
  await expect(backup).toBeFocused();
  await expect(backup).toHaveAttribute('aria-selected', 'true');

  await page.keyboard.press('Home');
  await expect(saved).toBeFocused();
  await expect(saved).toHaveAttribute('aria-selected', 'true');
});

test('global search exposes an accessible input and labelled dialog', async ({ page }) => {
  await page.goto('/#overview');
  const search = page.getByRole('textbox', { name: 'Search The Quiet Regular' });
  await expect(search).toBeVisible({ timeout: 20_000 });
  await expect(search).toHaveAttribute('aria-haspopup', 'dialog');
  await expect(search).toHaveAttribute('aria-controls', 'searchPalette');
  await expect(search).toHaveAttribute('aria-expanded', 'false');
  await search.fill('Sera');
  await expect(page.getByRole('dialog', { name: 'Search The Quiet Regular' })).toBeVisible();
  await expect(search).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Search The Quiet Regular' })).toHaveCount(0);
  await expect(search).toHaveAttribute('aria-expanded', 'false');
  await expect(search).toBeFocused();
});
