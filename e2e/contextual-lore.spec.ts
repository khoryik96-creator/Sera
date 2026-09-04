import { test, expect } from '@playwright/test';

async function openReader(page: import('@playwright/test').Page) {
  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
}

test('chapter character references surface a visible compact lore tray', async ({ page }) => {
  await openReader(page);
  const sera = page.getByRole('button', { name: 'Open lore for Sera' }).first();
  await expect(sera).toBeVisible();
  await sera.click();
  const tray = page.locator('.reader-lore-context');
  await expect(tray).toBeVisible();
  await expect(tray).toContainText('Sera');
  await expect(tray.getByText('Ranking', { exact: true })).toBeVisible();
  await expect(tray.getByText('Strength', { exact: true })).toBeVisible();
  await expect(tray.getByText('Affiliation', { exact: true })).toBeVisible();
  await expect(tray.getByText('Role', { exact: true })).toBeVisible();
  await expect(tray.locator('.react-rank-badge, .rank-badge')).toBeVisible();
  await expect(tray.locator('.reader-lore-context__fact').nth(1)).not.toContainText('Not recorded');
  await expect(tray.locator('.reader-lore-context__fact').nth(2)).not.toContainText('Not recorded');
  await expect(tray.getByRole('button', { name: /Open profile/ })).toBeVisible();
  await expect.poll(async () => tray.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  })).toBe(true);
});

test('arc-only highlighted characters get the same quick facts card', async ({ page }) => {
  await page.goto('/#chapter/87/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  const sigrun = page.getByRole('button', { name: 'Open lore for Sigrun Veyrhald' }).first();
  await expect(sigrun).toBeVisible();
  await sigrun.click();
  const tray = page.locator('.reader-lore-context');
  await expect(tray).toBeVisible();
  await expect(tray.getByText('Ranking', { exact: true })).toBeVisible();
  await expect(tray.getByText('Strength', { exact: true })).toBeVisible();
  await expect(tray.getByText('Affiliation', { exact: true })).toBeVisible();
  await expect(tray.getByText('Role', { exact: true })).toBeVisible();
  await expect(tray.locator('.reader-lore-context__fact').nth(1)).toContainText('Paragon');
  await expect(tray.locator('.reader-lore-context__fact').nth(2)).not.toContainText('Not recorded');
  await expect(tray.locator('.reader-lore-context__fact').nth(3)).not.toContainText('No formal role recorded');
});

test('season-cast-only highlighted characters appear in the Isgard archive', async ({ page }) => {
  // Isgard-affiliated figures (incl. season-cast like Varok Skeldran) now live in
  // the dedicated Isgard tab rather than the Other Characters / Villains grid.
  await page.goto('/#isgard');
  await expect(page.getByRole('heading', { name: 'Isgard', exact: true })).toBeVisible({ timeout: 20_000 });
  await page.locator('.toolbar-row .filter-input').fill('Varok Skeldran');
  const card = page.locator('.lore-card').filter({ hasText: 'Varok Skeldran' }).first();
  await expect(card).toBeVisible();
  await card.locator('summary').click();
  await expect(card).toContainText('High Sovereign');
  await expect(card).toContainText('Skeldran — Thousandfold Hunt, Isgard');
  await expect(card).toContainText('White Huntmaster');
});

test('contextual lore card is fully opaque', async ({ page }) => {
  await openReader(page);
  await page.getByRole('button', { name: 'Open lore for Sera' }).first().click();
  const background = await page.locator('.reader-lore-context').evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(background).toMatch(/^rgb\(/);
  expect(background).not.toContain('rgba');
});

test('clicking a name deep in the episode produces visible feedback', async ({ page }) => {
  await openReader(page);
  const names = page.locator('.reader-prose [data-character-key]');
  const count = await names.count();
  expect(count).toBeGreaterThan(0);
  const target = names.nth(Math.max(0, count - 1));
  await target.scrollIntoViewIfNeeded();
  await target.click();
  const tray = page.locator('.reader-lore-context');
  await expect(tray).toBeVisible();
  await expect.poll(async () => tray.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  })).toBe(true);
});

test('dialogue speaker attribution stays smaller and compact', async ({ page }) => {
  await openReader(page);
  const speaker = page.locator('.reader-prose .dialogue-speaker').first();
  const quote = page.locator('.reader-prose .dialogue-card .dialogue-quote').first();
  await expect(speaker).toBeVisible();
  await expect(quote).toBeVisible();
  const typography = await page.evaluate(() => {
    const speakerNode = document.querySelector('.reader-prose .dialogue-speaker') as HTMLElement;
    const quoteNode = document.querySelector('.reader-prose .dialogue-card .dialogue-quote') as HTMLElement;
    const speakerStyle = getComputedStyle(speakerNode);
    const quoteStyle = getComputedStyle(quoteNode);
    return {
      speakerSize: Number.parseFloat(speakerStyle.fontSize),
      quoteSize: Number.parseFloat(quoteStyle.fontSize),
      letterSpacing: Number.parseFloat(speakerStyle.letterSpacing) || 0,
      textTransform: speakerStyle.textTransform,
    };
  });
  expect(typography.speakerSize).toBeLessThan(typography.quoteSize);
  expect(Math.abs(typography.letterSpacing)).toBeLessThanOrEqual(1);
  expect(typography.textTransform).toBe('none');
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

test('contextual lore stays non-fixed and does not overflow mobile', async ({ page }, testInfo) => {
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