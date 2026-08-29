import { expect, test } from '@playwright/test';

test('chapter archive uses direct selectors instead of arc and season card carousels', async ({ page }) => {
  await page.goto('/#chapters');
  await expect(page.getByRole('heading', { name: 'Read The Quiet Regular' })).toBeVisible({ timeout: 20_000 });
  await expect(page.getByRole('combobox', { name: 'Story arc' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Season' })).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Jump to chapter' })).toBeVisible();
  await expect(page.locator('.arc-browser')).toHaveCount(0);
  await expect(page.locator('.season-browser')).toHaveCount(0);
});

test('season and chapter selectors jump directly without extra navigation layers', async ({ page }) => {
  await page.goto('/#chapters');
  await expect(page.getByRole('combobox', { name: 'Season' })).toBeVisible({ timeout: 20_000 });
  await page.getByRole('combobox', { name: 'Season' }).selectOption('43');
  await expect(page.getByRole('heading', { name: /Season 43/ })).toBeVisible();
  const chapterSelect = page.getByRole('combobox', { name: 'Jump to chapter' });
  await expect(chapterSelect).toBeEnabled();
  await chapterSelect.selectOption('1');
  await expect(page).toHaveURL(/#chapter\/43\/1$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('reader previous, chapters, and next controls stay on one compact row', async ({ page }, testInfo) => {
  await page.goto('/#chapter/43/8');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  const nav = page.getByRole('navigation', { name: 'Chapter navigation' });
  await expect(nav.getByRole('button')).toHaveCount(3);
  await expect(nav).toContainText('Chapters');

  const layout = await nav.evaluate((node) => {
    const buttons = Array.from(node.querySelectorAll('button')) as HTMLElement[];
    const rects = buttons.map((button) => button.getBoundingClientRect());
    const topSpread = Math.max(...rects.map((rect) => rect.top)) - Math.min(...rects.map((rect) => rect.top));
    const navRect = (node as HTMLElement).getBoundingClientRect();
    return { topSpread, height: navRect.height, pageWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth };
  });

  expect(layout.topSpread).toBeLessThan(4);
  expect(layout.height).toBeLessThan(90);
  expect(layout.scrollWidth).toBeLessThanOrEqual(layout.pageWidth + 2);
  await page.screenshot({ path: testInfo.outputPath('compact-chapter-nav.png'), fullPage: false });
});
