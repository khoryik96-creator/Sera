import { test, expect } from '@playwright/test';

async function open(page: import('@playwright/test').Page, hash: string) {
  await page.goto(`/#${hash}`);
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 20_000 });
}

test('opening a chapter records progress and exposes reader v3 metadata', async ({ page }) => {
  await open(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.reader-meta-chips')).toContainText('Season 1');
  await expect(page.locator('.reader-meta-chips')).toContainText('Episode 1 / 10');
  await expect(page.locator('.reader-progress__copy')).toContainText('1 / 10 opened · 10%');
  await expect(page.locator('.reader-progress__track')).toHaveAttribute('aria-valuenow', '10');
  await expect(page.locator('.next-unread-button')).toContainText('S1 · E2');

  const read = await page.evaluate(() => JSON.parse(localStorage.getItem('tqr:readEpisodes:v1') || '[]')) as string[];
  expect(read).toContain('ep-s1-e1');
});

test('next episode advances persistent season progress', async ({ page }) => {
  await open(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.locator('.reader-nav--v3 > button').last().click();
  await expect(page).toHaveURL(/#chapter\/1\/2$/);
  await expect(page.locator('.reader-progress__copy')).toContainText('2 / 10 opened · 20%');
  await expect(page.locator('.next-unread-button')).toContainText('S1 · E3');
});

test('Back to Season returns to the current season and shows read state', async ({ page }) => {
  await open(page, 'chapter/12/3');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.getByRole('button', { name: 'Back to Season 12' }).click();
  await expect(page).toHaveURL(/#chapters$/);
  await expect(page.locator('.season-selected-heading__meta')).toHaveText('Season 12');
  await expect(page.locator('.season-selected-heading__progress')).toContainText('1/10 opened');
  await expect(page.locator('.chapter-row.is-read')).toHaveCount(1);
  await expect(page.locator('.season-next-unread-button')).toContainText('Next unread E4');
});

test('archive reports completed seasons and jumps to the next unread episode', async ({ page }) => {
  await page.addInitScript(() => {
    const read = Array.from({ length: 10 }, (_, index) => `ep-s1-e${index + 1}`);
    localStorage.setItem('tqr:readEpisodes:v1', JSON.stringify(read));
    localStorage.setItem('tqr:lastRead', JSON.stringify({ id: 'ep-s1-e10', season: 1, title: 'Season one finale' }));
  });
  await open(page, 'chapters');
  await expect(page.locator('.archive-progress-grid')).toContainText('1');
  await expect(page.locator('.archive-progress-grid')).toContainText('of 64 seasons fully opened');
  await expect(page.locator('.archive-next-unread')).toContainText('S2 · E1');
  await expect(page.locator('.season-card').first()).toContainText('✓ Done');

  await page.locator('.archive-next-unread').click();
  await expect(page).toHaveURL(/#chapter\/2\/1$/);
});

test('reader progress surfaces stay contained on phone and desktop', async ({ page }, testInfo) => {
  await open(page, 'chapters');
  const archiveDimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(archiveDimensions.scroll).toBeLessThanOrEqual(archiveDimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('reader-progress-archive.png'), fullPage: true });

  await open(page, 'chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  const readerDimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(readerDimensions.scroll).toBeLessThanOrEqual(readerDimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('reader-progress-chapter.png'), fullPage: true });
});
