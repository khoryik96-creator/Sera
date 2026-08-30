import { test, expect } from '@playwright/test';

async function openInsights(page: import('@playwright/test').Page) {
  await page.goto('/#insights');
  await expect(page.getByRole('heading', { name: 'Reading Insights' })).toBeVisible({ timeout: 20_000 });
}

async function seedReaderState(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    const now = Date.now();
    const yesterday = new Date(now); yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(now); twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const read = Array.from({ length: 10 }, (_, index) => `ep-s1-e${index + 1}`);
    localStorage.setItem('tqr:readEpisodes:v1', JSON.stringify(read));
    localStorage.setItem('tqr:lastRead', JSON.stringify({ id: 'ep-s1-e10', season: 1, title: 'Season One Finale' }));
    localStorage.setItem('tqr:readingHistory:v1', JSON.stringify([
      { id: 'ep-s1-e10', season: 1, title: 'Season One Finale', openedAt: now },
      { id: 'ep-s1-e9', season: 1, title: 'Episode Nine', openedAt: yesterday.getTime() },
      { id: 'ep-s1-e8', season: 1, title: 'Episode Eight', openedAt: twoDaysAgo.getTime() },
    ]));
    localStorage.setItem('tqr:readingJourney:v2', JSON.stringify({
      visits: [
        { id: 'ep-s1-e10', season: 1, title: 'Season One Finale', openedAt: now },
        { id: 'ep-s1-e9', season: 1, title: 'Episode Nine', openedAt: yesterday.getTime() },
        { id: 'ep-s1-e8', season: 1, title: 'Episode Eight', openedAt: twoDaysAgo.getTime() },
        { id: 'ep-s1-e10', season: 1, title: 'Season One Finale reread', openedAt: twoDaysAgo.getTime() - 60_000 },
      ],
      seasonCompletions: [{ season: 1, completedAt: now }],
    }));
    localStorage.setItem('tqr:bookmarks', JSON.stringify([{ id: 'ep-s1-e4', season: 1, title: 'Saved Episode' }]));
    localStorage.setItem('tqr:episodeNotes:v1', JSON.stringify([{ id: 'ep-s1-e5', season: 1, title: 'Note Episode', text: 'Private note', updatedAt: now }]));
    localStorage.setItem('tqr:savedPassages:v1', JSON.stringify([{ key: `ep-s1-e6:${now}`, id: 'ep-s1-e6', season: 1, title: 'Passage Episode', text: 'A saved line from the story.', createdAt: now }]));
  });
}

test('Reading Insights summarizes existing local reader state and journey', async ({ page }) => {
  await seedReaderState(page); await openInsights(page);
  await expect(page.locator('.insights-hero')).toContainText('10 of 683 episodes');
  await expect(page.locator('.insights-stat-grid')).toContainText('Current streak');
  await expect(page.locator('.insights-stat-grid')).toContainText('3');
  await expect(page.locator('.insights-library-panel .insights-library-grid')).toContainText('4');
  await expect(page.getByRole('heading', { name: 'How you move through the story' })).toBeVisible();
  await expect(page.getByText('episode revisits')).toBeVisible();
  await expect(page.locator('.insights-arc-card')).toHaveCount(14);
  await expect(page.locator('.insights-secondary')).toContainText('S2 E1');
});

test('next unread from Insights enters the reader', async ({ page }) => {
  await seedReaderState(page); await openInsights(page);
  await page.locator('.insights-secondary').click();
  await expect(page).toHaveURL(/#chapter\/2\/1$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('Reading Insights opens Reader Library without changing its legacy route', async ({ page }) => {
  await seedReaderState(page); await openInsights(page);
  await page.getByRole('button', { name: /Open Library/ }).click();
  await expect(page).toHaveURL(/#bookmarks$/);
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
});

test('Open Journey lands directly on the Journey tab', async ({ page }) => {
  await seedReaderState(page); await openInsights(page);
  await page.getByRole('button', { name: /Open Journey/ }).click();
  await expect(page).toHaveURL(/#bookmarks\/journey$/);
  await expect(page.getByRole('tab', { name: /Journey/ })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('heading', { name: 'Reading journey' })).toBeVisible({ timeout: 20_000 });
});

test('Reading Insights stays contained on production mobile and desktop viewports', async ({ page }, testInfo) => {
  await seedReaderState(page); await openInsights(page);
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  if (testInfo.project.name.includes('mobile')) {
    const active = page.locator('.mobile-tabs button.is-active');
    await expect(active).toHaveText('Stats');
    await expect.poll(async () => active.evaluate((node) => { const parent = node.parentElement; if (!parent) return false; const navRect = parent.getBoundingClientRect(); const rect = node.getBoundingClientRect(); return rect.left >= navRect.left - 2 && rect.right <= navRect.right + 2; })).toBe(true);
  } else {
    await expect(page.locator('.primary-nav button.is-active')).toContainText('Reading Insights');
  }
  await page.screenshot({ path: testInfo.outputPath('reading-insights.png'), fullPage: true });
});
