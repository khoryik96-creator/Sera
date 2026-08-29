import { test, expect } from '@playwright/test';

async function openChapter(page: import('@playwright/test').Page) {
  await page.goto('/#chapter/1/1');
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
}

async function selectRenderedPassage(page: import('@playwright/test').Page): Promise<string> {
  const selected = await page.locator('.reader-prose').evaluate((root) => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node && (node.textContent || '').replace(/\s+/g, ' ').trim().length < 35) node = walker.nextNode();
    if (!node?.textContent) throw new Error('No selectable prose text was found');
    const start = Math.min(2, Math.max(0, node.textContent.length - 1));
    const end = Math.min(node.textContent.length, start + 60);
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    return selection?.toString().replace(/\s+/g, ' ').trim() || '';
  });
  await page.locator('.reader-surface').dispatchEvent('mouseup');
  return selected;
}

test('selected prose can be saved and reopened from Reader Library', async ({ page }) => {
  await openChapter(page);
  const selected = await selectRenderedPassage(page);
  expect(selected.length).toBeGreaterThan(3);

  const save = page.locator('.reader-passage-save');
  await expect(save).toBeVisible();
  await expect(save).toContainText('Save passage');
  await save.click();
  await expect(page.locator('.reader-passage-notice')).toContainText('Passage saved');

  const passages = await page.evaluate(() => JSON.parse(localStorage.getItem('tqr:savedPassages:v1') || '[]')) as Array<{ id: string; text: string }>;
  expect(passages).toHaveLength(1);
  expect(passages[0]?.id).toBe('ep-s1-e1');
  expect(passages[0]?.text).toBe(selected);

  await page.goto('/#bookmarks');
  await expect(page.getByRole('heading', { name: 'Reader Library' })).toBeVisible({ timeout: 20_000 });
  await page.getByRole('tab', { name: /Passages/ }).click();
  await expect(page.locator('.library-passage-card')).toHaveCount(1);
  await expect(page.locator('.library-passage-card blockquote')).toContainText(selected.slice(0, Math.min(20, selected.length)));

  const query = selected.split(/\s+/).find((word) => word.length >= 5) || selected.slice(0, 5);
  await page.getByRole('textbox', { name: 'Search saved passages' }).fill(query);
  await expect(page.locator('.library-passage-card')).toHaveCount(1);

  await page.locator('.library-passage-card__open').click();
  await expect(page).toHaveURL(/#chapter\/1\/1$/);
  await expect(page.locator('.reader-prose')).toBeVisible({ timeout: 20_000 });
});

test('duplicate selections stay deduplicated and saved passages can be deleted', async ({ page }) => {
  await openChapter(page);
  await selectRenderedPassage(page);
  await page.locator('.reader-passage-save').click();
  await selectRenderedPassage(page);
  await page.locator('.reader-passage-save').click();

  await page.goto('/#bookmarks');
  await page.getByRole('tab', { name: /Passages/ }).click();
  await expect(page.locator('.library-passage-card')).toHaveCount(1);
  await page.locator('.library-passage-card__meta button').click();
  await expect(page.locator('.library-passage-card')).toHaveCount(0);
  await expect(page.getByText('No saved passages yet')).toBeVisible();
});

test('saved passage surfaces stay contained on production phone and desktop widths', async ({ page }, testInfo) => {
  await openChapter(page);
  await selectRenderedPassage(page);
  await expect(page.locator('.reader-passage-save')).toBeVisible();
  let dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.locator('.reader-passage-save').click();

  await page.goto('/#bookmarks');
  await page.getByRole('tab', { name: /Passages/ }).click();
  await expect(page.locator('.library-passage-card')).toBeVisible();
  dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.width + 2);
  await page.screenshot({ path: testInfo.outputPath('saved-passages-library.png'), fullPage: true });
});
