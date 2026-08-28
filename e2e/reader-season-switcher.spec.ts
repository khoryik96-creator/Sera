import { test, expect } from '@playwright/test';

async function openChapter(page: import('@playwright/test').Page, season = 12, episode = 3) {
  await page.goto(`/#chapter/${season}/${episode}`);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.reader-season-switcher')).toBeVisible();
}

test('reader season switcher exposes the loaded season without leaving the chapter', async ({ page }) => {
  await openChapter(page);
  const switcher = page.locator('.reader-season-switcher');
  await expect(switcher).not.toHaveAttribute('open', '');
  await expect(switcher.locator('summary')).toContainText('Season 12 episodes');
  await expect(switcher.locator('summary')).toContainText('Episode 3 of 10');
  await expect(switcher.locator('summary')).toContainText('1 / 10 opened');

  await switcher.locator('summary').click();
  await expect(switcher).toHaveAttribute('open', '');
  await expect(switcher.locator('.reader-season-switcher__episodes button')).toHaveCount(10);
  const current = switcher.locator('button[aria-current="page"]');
  await expect(current).toContainText('E3');
  await expect(current).toContainText('Reading now');
});

test('reader season switcher jumps directly to another episode and updates current state', async ({ page }) => {
  await openChapter(page);
  const switcher = page.locator('.reader-season-switcher');
  await switcher.locator('summary').click();
  await switcher.getByRole('button', { name: /E5/ }).click();

  await expect(page).toHaveURL(/#chapter\/12\/5$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.reader-meta-chips')).toContainText('Episode 5 / 10');

  const updated = page.locator('.reader-season-switcher');
  await updated.locator('summary').click();
  const current = updated.locator('button[aria-current="page"]');
  await expect(current).toContainText('E5');
  await expect(current).toContainText('Reading now');
});

test('season switcher remains usable inside Focus Mode', async ({ page }) => {
  await openChapter(page);
  await page.locator('.reader-focus-toggle').click();
  await expect(page.locator('body')).toHaveClass(/reader-focus-mode/);
  await expect(page.locator('.sidebar')).toBeHidden();

  const switcher = page.locator('.reader-season-switcher');
  await expect(switcher).toBeVisible();
  await switcher.locator('summary').click();
  await expect(switcher.locator('.reader-season-switcher__episodes')).toBeVisible();
  await switcher.getByRole('button', { name: /E4/ }).click();
  await expect(page).toHaveURL(/#chapter\/12\/4$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('body')).toHaveClass(/reader-focus-mode/);
});

test('open season switcher stays in-flow and contained on phone and desktop', async ({ page }, testInfo) => {
  await openChapter(page);
  const switcher = page.locator('.reader-season-switcher');
  await switcher.locator('summary').click();
  await expect(switcher.locator('.reader-season-switcher__episodes')).toBeVisible();

  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
    position: getComputedStyle(document.querySelector('.reader-season-switcher') as HTMLElement).position,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  expect(dimensions.position).not.toBe('fixed');

  if (testInfo.project.name.includes('mobile')) {
    await expect(switcher.locator('.reader-season-switcher__episodes')).toHaveCSS('grid-template-columns', /\d+px/);
  }

  await page.screenshot({ path: testInfo.outputPath('reader-season-switcher.png'), fullPage: true });
});
