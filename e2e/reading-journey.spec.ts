import { test, expect } from '@playwright/test';

async function seedJourney(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    const now = Date.now();
    const earlier = now - 10 * 60_000;
    const previousSession = now - 2 * 60 * 60_000;
    localStorage.setItem('tqr:readingJourney:v2', JSON.stringify({
      visits: [
        { id: 'ep-s2-e2', season: 2, title: 'Second Season Return', openedAt: now },
        { id: 'ep-s2-e1', season: 2, title: 'Second Season Start', openedAt: earlier },
        { id: 'ep-s1-e1', season: 1, title: 'Second Spring', openedAt: previousSession },
        { id: 'ep-s1-e1', season: 1, title: 'Second Spring reread', openedAt: previousSession - 60_000 },
      ],
      seasonCompletions: [{ season: 1, completedAt: previousSession }],
    }));
    localStorage.setItem('tqr:readingHistory:v1', JSON.stringify([
      { id: 'ep-s2-e2', season: 2, title: 'Second Season Return', openedAt: now },
      { id: 'ep-s1-e1', season: 1, title: 'Second Spring', openedAt: previousSession },
    ]));
  });
}

async function openJourney(page: import('@playwright/test').Page) {
  await page.goto('/#bookmarks');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
  await page.getByRole('tab', { name: /Journey/ }).click();
  await expect(page.getByRole('heading', { name: 'Reading journey' })).toBeVisible();
}

test('Reader Library Journey shows visits, sessions, revisits, filters, and milestones', async ({ page }) => {
  await seedJourney(page);
  await openJourney(page);

  await expect(page.locator('.journey-stat-grid')).toContainText('4');
  await expect(page.locator('.journey-stat-grid')).toContainText('Revisits');
  await expect(page.getByRole('heading', { name: 'Recent sessions' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Season completions' })).toBeVisible();
  await expect(page.locator('.journey-timeline > button')).toHaveCount(4);

  await page.getByLabel('Filter reading journey by season').selectOption('2');
  await expect(page.locator('.journey-timeline > button')).toHaveCount(2);
  await page.getByLabel('Search reading journey').fill('Second Season Start');
  await expect(page.locator('.journey-timeline > button')).toHaveCount(1);
  await expect(page.locator('.journey-timeline')).toContainText('Second Season Start');
});

test('recent session resume opens its last chapter', async ({ page }) => {
  await seedJourney(page);
  await openJourney(page);
  await page.locator('.journey-session-grid button').first().click();
  await expect(page).toHaveURL(/#chapter\/2\/2$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('Reading Journey stays contained on mobile and desktop', async ({ page }, testInfo) => {
  await seedJourney(page);
  await openJourney(page);
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('reading-journey.png'), fullPage: true });
});
