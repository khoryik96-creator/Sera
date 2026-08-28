import { test, expect } from '@playwright/test';

async function openSera(page: import('@playwright/test').Page) {
  await page.goto('/#characters/sera');
  await expect(page.locator('.character-profile--v2')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.character-name-line')).toContainText('Sera');
}

test('Characters v2 exposes Sera rank history and lore sections', async ({ page }) => {
  await openSera(page);
  await expect(page.locator('.rank-journey__step')).toHaveCount(3);
  await expect(page.locator('.rank-journey')).toContainText('#7');
  await expect(page.locator('.rank-journey')).toContainText('#6');
  await expect(page.locator('.rank-journey')).toContainText('FORMER');
  await expect(page.getByRole('heading', { name: 'Connections', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What the martial world remembers' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Jump back into their chapters' })).toBeVisible();
});

test('relationship cards navigate between character profiles when links exist', async ({ page }) => {
  await openSera(page);
  const cards = page.locator('.relationship-grid button');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  const first = cards.first();
  const before = page.url();
  await first.click();
  await expect(page.locator('.character-profile--v2')).toBeVisible();
  expect(page.url()).not.toBe(before);
  await expect(page).toHaveURL(/#characters\/.+$/);
});

test('lazy appearance scan creates direct episode links without changing portraits', async ({ page }) => {
  test.setTimeout(60_000);
  await openSera(page);
  const originalPortrait = await page.locator('.portrait-card > img').first().getAttribute('src');
  await expect(page.locator('.appearance-season-strip button')).not.toHaveCount(0);
  await page.getByRole('button', { name: /Find exact episode links/ }).click();
  await expect(page.locator('.appearance-results')).toBeVisible({ timeout: 40_000 });
  await expect(page.locator('.appearance-episode-grid button').first()).toBeVisible();
  expect(await page.locator('.portrait-card > img').first().getAttribute('src')).toBe(originalPortrait);

  const firstEpisode = page.locator('.appearance-episode-grid button').first();
  await firstEpisode.click();
  await expect(page).toHaveURL(/#chapter\/\d+\/\d+$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('Characters v2 stays contained on production phone and desktop widths', async ({ page }, testInfo) => {
  await openSera(page);
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  if (testInfo.project.name.includes('mobile')) {
    await expect(page.locator('.character-browser__list')).toHaveCSS('display', 'flex');
    await expect(page.locator('.character-profile__hero')).toBeVisible();
  }
  await page.screenshot({ path: testInfo.outputPath('characters-v2-sera.png'), fullPage: true });
});
