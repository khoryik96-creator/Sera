import { test, expect } from '@playwright/test';

async function openOverview(page: import('@playwright/test').Page) {
  await page.goto('/#overview');
  await expect(page.locator('.overview-dashboard')).toBeVisible({ timeout: 20_000 });
}

test('overview dashboard exposes protagonists, Top Ten, and archive actions', async ({ page }) => {
  await openOverview(page);
  await expect(page.locator('.protagonist-card')).toHaveCount(2);
  await expect(page.locator('.overview-rank-list > button')).toHaveCount(10);
  await expect(page.getByText('Two legends. One quiet tea shop.')).toBeVisible();
  await expect(page.getByText('14 Story Arcs')).toBeVisible();

  await page.locator('.protagonist-card--sera').click();
  await expect(page).toHaveURL(/#characters\/sera$/);
  await expect(page.locator('.character-name-line')).toContainText('Sera');
});

test('overview restores reader position and continues the saved episode', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:lastRead', JSON.stringify({ id: 'ep-s12-e3', season: 12, title: 'Saved Pale Regent episode' }));
    localStorage.setItem('tqr:bookmarks', JSON.stringify([
      { id: 'ep-s1-e1', season: 1, title: 'First bookmark' },
      { id: 'ep-s12-e3', season: 12, title: 'Second bookmark' },
    ]));
  });
  await openOverview(page);
  await expect(page.locator('.overview-pulse')).toContainText('Season 12 · Episode 3');
  await expect(page.locator('.overview-pulse')).toContainText('Arc III — The Old War Awakens');
  await expect(page.locator('.overview-pulse__stats')).toContainText('2');
  await page.locator('.overview-primary-action').click();
  await expect(page).toHaveURL(/#chapter\/12\/3$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('overview remains contained and readable at every production viewport', async ({ page }, testInfo) => {
  await openOverview(page);
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);

  if (testInfo.project.name.includes('mobile')) {
    await expect(page.locator('.overview-hero')).toHaveCSS('grid-template-columns', /\d+px/);
    await expect(page.locator('.protagonist-card--sera')).toBeVisible();
    await expect(page.locator('.overview-explore-grid')).toBeVisible();
  }

  await page.screenshot({ path: testInfo.outputPath('overview-dashboard.png'), fullPage: true });
});

test('overview story-arc action opens the chapter archive', async ({ page }) => {
  await openOverview(page);
  await page.getByRole('button', { name: /Browse story arcs/ }).click();
  await expect(page).toHaveURL(/#chapters$/);
  await expect(page.locator('.chapter-browser-panel')).toBeVisible();
  await expect(page.getByRole('combobox', { name: 'Story arc' })).toBeVisible();
});
