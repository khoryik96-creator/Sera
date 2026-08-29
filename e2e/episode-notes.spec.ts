import { test, expect } from '@playwright/test';

async function openChapter(page: import('@playwright/test').Page, season = 1, episode = 1) {
  await page.goto(`/#chapter/${season}/${episode}`);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.episode-note')).toBeVisible();
}

async function openLibrary(page: import('@playwright/test').Page) {
  await page.goto('/#bookmarks');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
}

test('episode note saves locally and survives reload', async ({ page }) => {
  await openChapter(page, 1, 1);
  await page.locator('.episode-note > summary').click();
  const textarea = page.locator('.episode-note textarea');
  await textarea.fill('Tea shop callback to revisit after the winter reveal.');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();

  await expect.poll(async () => page.evaluate(() => {
    const notes = JSON.parse(localStorage.getItem('tqr:episodeNotes:v1') || '[]') as Array<{ id: string; text: string }>;
    return notes.find((note) => note.id === 'ep-s1-e1')?.text || '';
  })).toBe('Tea shop callback to revisit after the winter reveal.');

  await page.reload();
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
  await expect(page.locator('.episode-note > summary')).toContainText('Note saved');
  await page.locator('.episode-note > summary').click();
  await expect(page.locator('.episode-note textarea')).toHaveValue('Tea shop callback to revisit after the winter reveal.');
});

test('Reader Library notes tab searches and opens saved episode notes', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem('tqr:episodeNotes:v1', JSON.stringify([
      { id: 'ep-s12-e3', season: 12, title: 'Pale Regent callback', text: 'Compare this with the Pale Regent setup.', updatedAt: 200 },
      { id: 'ep-s1-e1', season: 1, title: 'Opening tea shop', text: 'The first quiet clue.', updatedAt: 100 },
    ]));
  });
  await openLibrary(page);
  await page.getByRole('tab', { name: /Notes/ }).click();
  await expect(page.locator('.library-note-card')).toHaveCount(2);
  await page.getByRole('textbox', { name: 'Search episode notes' }).fill('Pale Regent');
  await expect(page.locator('.library-note-card')).toHaveCount(1);
  await expect(page.locator('.library-note-card')).toContainText('S12 · E3');
  await page.locator('.library-note-card__open').click();
  await expect(page).toHaveURL(/#chapter\/12\/3$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('note editor and notes library stay contained on phone and desktop', async ({ page }, testInfo) => {
  await openChapter(page, 1, 1);
  await page.locator('.episode-note > summary').click();
  await page.locator('.episode-note textarea').fill('Long mobile note '.repeat(250));
  let dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('episode-note-editor.png'), fullPage: true });

  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await openLibrary(page);
  await page.getByRole('tab', { name: /Notes/ }).click();
  dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('episode-notes-library.png'), fullPage: true });
});
