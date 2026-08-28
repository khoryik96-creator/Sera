import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function waitForApp(page: import('@playwright/test').Page) {
  await page.locator('#appStatus').waitFor({ state: 'hidden' });
}

test('Sera gallery remains single-layered and reversible', async ({ page }, testInfo) => {
  await page.goto('/#characters/sera');
  await waitForApp(page);
  const gallery = page.locator('[data-portrait-gallery]');
  await expect(gallery).toBeVisible();
  await expect(gallery.locator('.portrait-gallery__main')).toHaveCount(1);
  const thumbs = gallery.locator('[data-portrait-index]');
  expect(await thumbs.count()).toBeGreaterThanOrEqual(4);

  const main = gallery.locator('.portrait-gallery__main');
  const firstSrc = await main.evaluate((img) => (img as HTMLImageElement).src);
  await thumbs.last().click();
  await expect.poll(() => main.evaluate((img) => (img as HTMLImageElement).src)).not.toBe(firstSrc);
  await thumbs.first().click();
  await expect.poll(() => main.evaluate((img) => (img as HTMLImageElement).src)).toBe(firstSrc);

  await page.screenshot({ path: testInfo.outputPath('sera-gallery.png'), fullPage: true });
});

test('mobile reader has no page-level horizontal overflow', async ({ page }) => {
  await page.goto('/#characters/rhen');
  await waitForApp(page);
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await expect(page.locator('.repo-nav .tab-strip')).toBeVisible();
});

test('episode deep link loads requested season without a screen-covering navigator', async ({ page }, testInfo) => {
  await page.goto('/#episodes/59/1');
  await waitForApp(page);
  const episode = page.locator('#ep-s59-e1');
  await expect(episode).toBeVisible();
  await expect(episode).toHaveAttribute('open', '');
  await expect(page).toHaveURL(/#episodes\/59\/1$/);

  const nav = page.locator('#episodeJumpBar');
  await expect(nav).toBeVisible();
  if (testInfo.project.name.includes('mobile')) {
    const style = await nav.evaluate((node) => getComputedStyle(node).position);
    expect(style).not.toBe('fixed');
    const box = await nav.boundingBox();
    expect(box?.height ?? 999).toBeLessThan(90);
  }
  await page.screenshot({ path: testInfo.outputPath('episode-59.png'), fullPage: false });
});

test('Lucy-style rank pills replace inline rank-name prefixes in episode prose', async ({ page }) => {
  await page.goto('/#episodes/1/1');
  await waitForApp(page);
  const prose = page.locator('#ep-s1-e1 .full-legend-text');
  await expect(prose).toBeVisible();
  await expect(prose.locator('.ranked-name .rank-badge').first()).toBeVisible();
  await expect(prose).not.toContainText(/#\d+\s*-\s*(Kael|Liang|Jin|Lei|Rui|Sera|Arin|Luo|Yun)/);

  await page.goto('/#characters/rhen');
  await waitForApp(page);
  await expect(page.locator('#charDetail .rank-badge--unranked').filter({ hasText: 'UNR' })).toHaveCount(1);
});

test('reader text size and spacing controls work without changing the app shell', async ({ page }) => {
  await page.goto('/#episodes/1/1');
  await waitForApp(page);
  const prose = page.locator('#ep-s1-e1 .full-legend-text');
  const before = await prose.evaluate((node) => getComputedStyle(node).fontSize);
  await page.locator('#readerScaleUp').click();
  const after = await prose.evaluate((node) => getComputedStyle(node).fontSize);
  expect(Number.parseFloat(after)).toBeGreaterThan(Number.parseFloat(before));

  const spacing = page.locator('#readerSpacing');
  await spacing.click();
  await expect(spacing).toHaveAttribute('aria-pressed', 'true');
});

test('core reader surface has no critical automated accessibility violations', async ({ page }) => {
  await page.goto('/#characters/sera');
  await waitForApp(page);
  const result = await new AxeBuilder({ page }).analyze();
  const critical = result.violations.filter((violation) => violation.impact === 'critical');
  expect(critical, critical.map((violation) => `${violation.id}: ${violation.help}`).join('\n')).toEqual([]);
});

test('manifest and install metadata are exposed', async ({ page }) => {
  await page.goto('/#characters/sera');
  await waitForApp(page);
  await expect(page.locator('link[rel="manifest"]')).toHaveAttribute('href', './manifest.webmanifest');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0f1115');
});
