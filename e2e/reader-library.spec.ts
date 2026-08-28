import { test, expect } from '@playwright/test';

async function openLibrary(page: import('@playwright/test').Page) {
  await page.goto('/#bookmarks');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
}

test('recently read history is recorded from opened chapters', async ({ page }) => {
  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await page.goto('/#chapter/1/2');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await openLibrary(page);
  await page.getByRole('tab', { name: /Recently Read/ }).click();
  await expect(page.locator('.library-history-list > button')).toHaveCount(2);
  await expect(page.locator('.library-history-list > button').first()).toContainText('S1 · E2');

  await page.locator('.library-history-list > button').first().click();
  await expect(page).toHaveURL(/#chapter\/1\/2$/);
});

test('reader backup exports with a portable JSON filename', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:bookmarks', JSON.stringify([{ id: 'ep-s1-e1', season: 1, title: 'Saved opening' }]));
  });
  await openLibrary(page);
  await page.getByRole('tab', { name: 'Backup' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Export backup' }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^quiet-regular-reader-\d{4}-\d{2}-\d{2}\.json$/);
  await expect(page.getByRole('status')).toContainText('Reader backup exported');
});

test('validated backup import refreshes reader state immediately', async ({ page }) => {
  await openLibrary(page);
  await page.getByRole('tab', { name: 'Backup' }).click();
  const backup = {
    product: 'The Quiet Regular',
    version: 1,
    exportedAt: '2026-08-28T00:00:00.000Z',
    bookmarks: [
      { id: 'ep-s3-e1', season: 3, title: 'Saved one' },
      { id: 'ep-s3-e2', season: 3, title: 'Saved two' },
    ],
    lastRead: { id: 'ep-s3-e2', season: 3, title: 'Imported continue position' },
    readEpisodes: ['ep-s3-e1', 'ep-s3-e2'],
    history: [{ id: 'ep-s3-e2', season: 3, title: 'Imported continue position', openedAt: 1787875200000 }],
    preferences: { scale: 1.08, font: 'book', spacing: 'relaxed', width: 'wide' },
  };
  await page.locator('input[type="file"]').setInputFiles({
    name: 'quiet-regular-reader.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify(backup)),
  });
  await expect(page.getByRole('status')).toContainText('restored on this device');
  await expect(page.locator('.library-summary__continue')).toContainText('S3 · E2');
  await expect(page.locator('.library-summary')).toContainText('2 / 1');

  await page.getByRole('tab', { name: /Saved/ }).click();
  await expect(page.locator('.library-bookmark-grid .bookmark-card')).toHaveCount(2);
  await page.getByRole('tab', { name: /Recently Read/ }).click();
  await expect(page.locator('.library-history-list > button')).toHaveCount(1);
});

test('invalid backup is rejected without replacing current reader state', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:lastRead', JSON.stringify({ id: 'ep-s1-e1', season: 1, title: 'Keep me' }));
  });
  await openLibrary(page);
  await page.getByRole('tab', { name: 'Backup' }).click();
  await page.locator('input[type="file"]').setInputFiles({
    name: 'broken.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ product: 'The Quiet Regular', version: 1, readEpisodes: ['ep-s64-e99'] })),
  });
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.locator('.library-summary__continue')).toContainText('S1 · E1');
});

test('Reader Library stays contained on phone and desktop', async ({ page }, testInfo) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:readingHistory:v1', JSON.stringify([
      { id: 'ep-s1-e1', season: 1, title: 'Opening', openedAt: 200 },
      { id: 'ep-s1-e2', season: 1, title: 'Second', openedAt: 100 },
    ]));
  });
  await openLibrary(page);
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.getByRole('tab', { name: /Recently Read/ }).click();
  await expect(page.locator('.library-history-list')).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath('reader-library.png'), fullPage: true });
});
