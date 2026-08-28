import { test, expect } from '@playwright/test';

async function openLibrary(page: import('@playwright/test').Page) {
  await page.goto('/#bookmarks');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
  await page.getByRole('tab', { name: /Organize/ }).click();
  await expect(page.getByRole('heading', { name: 'Collections, tags & favorites' })).toBeVisible();
}

async function seedLibrary(page: import('@playwright/test').Page) {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:bookmarks', JSON.stringify([
      { id: 'ep-s12-e3', season: 12, title: 'Saved Rhen episode' },
    ]));
    localStorage.setItem('tqr:episodeNotes:v1', JSON.stringify([
      { id: 'ep-s3-e2', season: 3, title: 'Sera investigation note', text: 'Track the Pale Orchid clue.', updatedAt: 200 },
    ]));
    localStorage.setItem('tqr:savedPassages:v1', JSON.stringify([
      { key: 'ep-s4-e2:300', id: 'ep-s4-e2', season: 4, title: 'Quiet tea passage', text: 'A line worth returning to later.', createdAt: 300 },
    ]));
  });
}

test('Reader Library organizes bookmarks, notes, and passages with collections tags and favorites', async ({ page }) => {
  await seedLibrary(page);
  await openLibrary(page);
  const collectionStrip = page.locator('.library-collection-strip');
  await expect(page.locator('.library-organize-card')).toHaveCount(3);

  await page.getByRole('textbox', { name: 'New collection name' }).fill('Best Rhen Moments');
  await page.getByRole('button', { name: 'Create collection' }).click();
  await expect(collectionStrip.getByRole('button', { name: /Best Rhen Moments/ })).toBeVisible();

  const bookmarkCard = page.locator('.library-organize-card').filter({ hasText: 'Saved Rhen episode' });
  await bookmarkCard.getByRole('button', { name: 'Add to favorites' }).click();
  await bookmarkCard.locator('.library-item-organizer > summary').click();
  await bookmarkCard.getByRole('checkbox', { name: 'Best Rhen Moments' }).check();
  const tags = bookmarkCard.getByRole('textbox', { name: 'Tags for Saved Rhen episode' });
  await tags.fill('Rhen, battle, favorite scene');
  await tags.press('Tab');

  await expect.poll(async () => page.evaluate(() => {
    const state = JSON.parse(localStorage.getItem('tqr:readerOrganization:v1') || '{}') as {
      collections?: Array<{ name: string }>;
      items?: Array<{ key: string; favorite: boolean; collectionIds: string[]; tags: string[] }>;
    };
    const item = state.items?.find((entry) => entry.key === 'bookmark:ep-s12-e3');
    return {
      collection: state.collections?.[0]?.name,
      favorite: item?.favorite,
      collectionCount: item?.collectionIds.length,
      tags: item?.tags,
    };
  })).toEqual({ collection: 'Best Rhen Moments', favorite: true, collectionCount: 1, tags: ['Rhen', 'battle', 'favorite scene'] });

  await page.reload();
  await page.getByRole('tab', { name: /Organize/ }).click();
  const reloadedCollectionStrip = page.locator('.library-collection-strip');
  await reloadedCollectionStrip.getByRole('button', { name: /Favorites/ }).click();
  await expect(page.locator('.library-organize-card')).toHaveCount(1);
  await expect(page.locator('.library-organize-card')).toContainText('Saved Rhen episode');
  await reloadedCollectionStrip.getByRole('button', { name: /Best Rhen Moments/ }).click();
  await expect(page.locator('.library-organize-card')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Search organized library' }).fill('battle');
  await expect(page.locator('.library-organize-card')).toHaveCount(1);
});

test('collection rename delete and organizer layout stay contained on phone and desktop', async ({ page }, testInfo) => {
  await seedLibrary(page);
  await openLibrary(page);
  const collectionStrip = page.locator('.library-collection-strip');
  await page.getByRole('textbox', { name: 'New collection name' }).fill('Romance');
  await page.getByRole('button', { name: 'Create collection' }).click();
  await collectionStrip.getByRole('button', { name: /Romance/ }).click();

  const rename = page.getByRole('textbox', { name: 'Rename selected collection' });
  await rename.fill('Rhen & Sera');
  await rename.press('Tab');
  await expect(collectionStrip.getByRole('button', { name: /Rhen & Sera/ })).toBeVisible();

  await collectionStrip.getByRole('button', { name: /All/ }).click();
  const firstCard = page.locator('.library-organize-card').first();
  await firstCard.locator('.library-item-organizer > summary').click();
  const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('reader-library-organize.png'), fullPage: true });

  await collectionStrip.getByRole('button', { name: /Rhen & Sera/ }).click();
  await page.getByRole('button', { name: 'Delete collection' }).click();
  await expect(collectionStrip.getByRole('button', { name: /Rhen & Sera/ })).toHaveCount(0);
});
