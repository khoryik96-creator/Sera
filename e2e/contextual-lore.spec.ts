import { test, expect } from '@playwright/test';

async function openReader(page: import('@playwright/test').Page) {
  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
}

test('chapter character references open a compact lore tray', async ({ page }) => {
  await openReader(page);
  const sera = page.getByRole('button', { name: 'Open lore for Sera' }).first();
  await expect(sera).toBeVisible();
  await sera.click();

  const tray = page.locator('.reader-lore-context');
  await expect(tray).toBeVisible();
  await expect(tray).toContainText('Sera');
  await expect(tray.locator('.react-rank-badge, .rank-badge')).toBeVisible();
  await expect(tray.getByRole('button', { name: /Open profile/ })).toBeVisible();
});

test('context tray links into the existing character profile', async ({ page }) => {
  await openReader(page);
  await page.getByRole('button', { name: 'Open lore for Sera' }).first().click();
  await page.locator('.reader-lore-context').getByRole('button', { name: /Open profile/ }).click();
  await expect(page).toHaveURL(/#characters\/sera$/);
  await expect(page.locator('.character-name-line')).toContainText('Sera', { timeout: 20_000 });
});

test('dialogue speakers can open contextual lore too', async ({ page }) => {
  await openReader(page);
  const speaker = page.locator('.dialogue-speaker.novel-lore-link').first();
  await expect(speaker).toBeVisible();
  const key = await speaker.getAttribute('data-character-key');
  expect(key).toBeTruthy();
  await speaker.click();
  await expect(page.locator('.reader-lore-context')).toBeVisible();
});

test('contextual lore stays in document flow and does not overflow mobile', async ({ page }, testInfo) => {
  await openReader(page);
  await page.getByRole('button', { name: 'Open lore for Sera' }).first().click();
  const tray = page.locator('.reader-lore-context');
  await expect(tray).toBeVisible();
  const position = await tray.evaluate((node) => getComputedStyle(node).position);
  expect(position).not.toBe('fixed');
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('contextual-lore-reader.png'), fullPage: true });
});
