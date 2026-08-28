import { test, expect } from '@playwright/test';

async function open(page: import('@playwright/test').Page, hash: string) {
  await page.goto(`/#${hash}`);
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
}

test('lazy feature transitions use a structured loading surface', async ({ page }) => {
  await page.route(/CharactersRoute[^/]*\.(?:js|tsx|ts)(?:\?.*)?$/, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    await route.continue();
  });
  await open(page, 'overview');
  await expect(page.locator('.overview-dashboard')).toBeVisible({ timeout: 20_000 });

  const characterNav = page.locator('.primary-nav button:visible, .mobile-tabs button:visible').filter({ hasText: /Characters|Cast/ }).first();
  await characterNav.click();
  const fallback = page.locator('.route-loading');
  await expect(fallback).toBeVisible();
  await expect(fallback).toContainText('Opening section');
  const fallbackMetrics = await fallback.evaluate((node) => {
    const style = getComputedStyle(node);
    return { minHeight: Number.parseFloat(style.minHeight), borderStyle: style.borderStyle };
  });
  expect(fallbackMetrics.minHeight).toBeGreaterThanOrEqual(240);
  expect(fallbackMetrics.borderStyle).not.toBe('none');
  await expect(page.getByRole('heading', { name: 'Characters' })).toBeVisible({ timeout: 20_000 });
});

test('character quick navigator jumps through long profiles without overflow', async ({ page }, testInfo) => {
  await open(page, 'characters/sera');
  await expect(page.locator('.character-profile--v2')).toBeVisible({ timeout: 20_000 });
  const nav = page.locator('.character-section-nav');
  await expect(nav).toBeVisible();
  await expect(nav.getByRole('button')).toHaveCount(6);

  await nav.getByRole('button', { name: 'Legends' }).click();
  await expect.poll(async () => page.locator('#characterLegendsSection').evaluate((node) => Math.abs(node.getBoundingClientRect().top))).toBeLessThan(220);
  await nav.getByRole('button', { name: 'Episodes' }).click();
  await expect.poll(async () => page.locator('#characterAppearancesSection').evaluate((node) => Math.abs(node.getBoundingClientRect().top))).toBeLessThan(220);

  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('character-quick-nav.png'), fullPage: false });
});

test('visual diagnostics capture resolved archive and character surfaces', async ({ page }, testInfo) => {
  await open(page, 'chapters');
  await expect(page.locator('.arc-browser')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.route-loading')).toBeHidden();
  await page.screenshot({ path: testInfo.outputPath('resolved-chapters.png'), fullPage: false });

  await open(page, 'characters/sera');
  await expect(page.locator('.character-profile__hero')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.route-loading')).toBeHidden();
  await page.screenshot({ path: testInfo.outputPath('resolved-character.png'), fullPage: false });
});
